let chart = null

// Gửi các thông tin lựa chọn lên server để lấy dữ liệu thống kê
function getStatisticData() {
  fetch('/api/admin/statistic/', {
    method: 'post',
    body: JSON.stringify({
      'statistic_type': $('#statisticType').val(),
      'statistic_condition': $('#statisticCondition').val(),
      'from_time': $('#leftTime').val(),
      'to_time': $('#rightTime').val(),
      'tier_id': $('#tierName').attr('tier_id')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(statisticData => {
    if (statisticData.length <= 0) {
      chart.destroy()
    }
    buildChart(statisticData)
    setStatisticDataTable(statisticData)
  })
}

$(document).ready(function () {
  $('#timeInput').hide()
  $('#tierNameInput').hide()
  $('#tierNameResultInput').hide()

  getStatisticData()

  //-----------Thay doi kieu thong ke------------
  $('#statisticType').change(() => {
    if ($('#statisticType').val() == 'frequently_tier_booking') {
      $('#tierNameInput').show()

    } else {
      $('#tierNameInput').hide()
      $('#tierName').val('')
      $('#tierNameResultInput').html('')

      //----------- Lấy dữ lieu mới nhất----------------
      getStatisticData()
    }
  })
  //-----------Thay đổi loại biểu đồ-------------------
  $('#chartType').change(function () {
    getStatisticData()
  })
  //-----------Thay doi dieu kien thong ke-------------
  $('#statisticCondition').change(function () {
    if ($(this).val() == 'month_to_month_statistic' ||
      $(this).val() == 'quarter_to_quarter_statistic' ||
      $(this).val() == 'year_to_year_statistic') {
      var minVal = null
      var maxVal = null
      if ($(this).val() == 'month_to_month_statistic') {
        minVal = 1
        maxVal = 12
      }

      if ($(this).val() == 'quarter_to_quarter_statistic') {
        minVal = 1
        maxVal = 4
      }

      if ($(this).val() == 'year_to_year_statistic') {
        minVal = 2024
        maxVal = 2100
      }

      $('#timeInput').show()
      var selection = ''
      for (let i = minVal; i <= maxVal; i++) {
        selection += `<option value=${i}>${i}</option>`
      }
      $('#leftTime').html(selection)
      $('#rightTime').html(selection)
    } else {
      $('#timeInput').hide()
      $('#leftTime').val(null)
      $('#rightTime').val(null)
    }

    //----------- Lấy dữ lieu mới nhất----------------
    getStatisticData()
  })
  //--------- Ngan khong cho chọn khoảng thời gian không hợp lý (vd: từ 7 -> 2)--------------
  $('#leftTime').data('lastSelectedIndex', 0)
  $('#leftTime').click(function () {
    $(this).data('lastSelectedIndex', this.selectedIndex)
  })

  $('#rightTime').data('lastSelectedIndex', 0)
  $('#rightTime').click(function () {
    $(this).data('lastSelectedIndex', this.selectedIndex)
  })

  $('#leftTime').change(function () {
    if (parseInt($(this).val()) > parseInt($('#rightTime').val())) {
      this.selectedIndex = $(this).data('lastSelectedIndex')
    } else {
      //----------- Lấy dữ lieu mới nhất----------------
      getStatisticData()
    }
  })

  $('#rightTime').change(function () {
    if (parseInt($(this).val()) < parseInt($('#leftTime').val())) {
      this.selectedIndex = $(this).data('lastSelectedIndex')
    } else {
      //----------- Lấy dữ lieu mới nhất----------------
      getStatisticData()
    }
  })
  //------------Bat su kien thay doi tier name-------------
  $('#tierName').on('input', () => {
    keyword = $('#tierName').val() == undefined ? null : $('#tierName').val()
    if (keyword) {
      getTierHintName(keyword)
    } else {
      $('#tierNameResultInput').hide()
    }
  })

  //-----------In du lieu thong ke----------------
  $(".printResult").click(() => {
    window.print();
  })
})

// Gửi thông tin từ khóa tìm kiếm tên hang phong lên server và nhận về danh sách hạng phòng tìm được
function getTierHintName(keyword) {
  var loading = $("#loading")
  loading.addClass("loading")
  fetch('/api/admin/tier-name/', {
    method: 'post',
    body: JSON.stringify({
      'keyword': keyword
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => {
    loading.removeClass("loading")
    setHintResult(data)
  }).catch((err) => {
    loading.removeClass("loading")
    console.error(err);
  })
}

// Hiển thị gợi ý khi tìm hang phong
function setHintResult(hintResult) {
  var row = ''
  if (hintResult.length > 0) {
    $('#tierNameResultInput').show()
    hintResult.map(hint => {
      row += `<option class="tier-name-option cursor-pointer" onclick = "setOnClickHint('${hint.tier_name}','${hint.tier_id}')" value=${hint.tier_id}
      onmouseover="setOnMouseOverHint('${hint.tier_id}')">${hint.tier_name}</option>
      `
    })
    $('#tierNameResultInput').html(row)
  } else {
    $('#tierNameResultInput').hide()
  }
}

// Hiệu ứng khi hover qua danh sách gợi ý
function setOnMouseOverHint(tier_id) {
  $('option.tier-name-option').each(function () {
    if ($(this).val() == tier_id) {
      $(this).css('background-color', '#04a9f5');
    } else {
      $(this).css('background-color', 'white');
    }
  })
}

// Click vao option gợi ý
function setOnClickHint(hint, id) {
  $('#tierName').val(hint.trim())
  $('#tierName').attr('tier_id', id);
  $('#tierNameResultInput').hide()

  //----------- Lấy dữ lieu mới nhất----------------
  getStatisticData()
}
// ----------Build chart-----------
function buildChart(data) {
  //----------Vi du:data = [{revenue_total: '1.000.000', time:1},{revenue_total: '2.000.000', time:3}]
  if (data.length == 0) return
  //------------- Random background color----------------
  var backgroundColor = [];
  for (let i = 0; i < data.length; i++) {
    r = Math.floor(Math.random() * 255 + 1);
    g = Math.floor(Math.random() * 255 + 1);
    b = Math.floor(Math.random() * 255 + 1);
    backgroundColor.push(`rgba(${r},${g}, ${b}, 0.7)`);
  }

  var result = data.reduce((acc, curr) => {
    if ($('#statisticType').val() == 'revenue') {
      acc.data.push(curr.revenue_total)
    } else {
      acc.data.push(curr.total)
    }
    var condition = $('#statisticCondition').val()
    if (condition.includes('month')) {
      acc.label.push(`Tháng: ${curr.time}`)
    } else if (condition.includes('quarter')) {
      acc.label.push(`Quý: ${curr.time}`)
    } else {
      acc.label.push(`Năm: ${curr.time}`)
    }
    return acc
  }, {
    label: [],
    dataLabel: [],
    data: []
  })

  if (chart) {
    chart.destroy()
  }
  chart = new Chart($('#chart'), {
    type: $('#chartType').val(),
    data: {
      labels: result.label,
      datasets: [{
        label: "Thống kê doanh thu",
        data: result.data,
        backgroundColor: backgroundColor,
        borderWidth: 1
      }]
    }
  })
}

function setStatisticDataTable(statisticData) {
  var headCol2 = $('#statisticCondition').val().includes('month') ? 'Tháng' :
    ($('#statisticCondition').val().includes('quarter') ? 'Quý' : 'Năm')
  var headCol3 = 'Tổng doanh thu'
  var row = ''
  var header = `<tr>
                  <th>${'Số thứ tự'}</th>
                  <th>${headCol2}</th>
                  <th>${headCol3}</th>
              </tr>`

  for (let i = 0; i < statisticData.length; i++)
    if ($('#statisticType').val().includes('revenue')) {
      // Chuyển đổi giá trị thành số
        var number = parseFloat(statisticData[i]['revenue_total']);
        // Định dạng lại giá trị
        var formattedValue = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });

      row += `<tr>
                  <td>${i + 1}</td>
                  <td>${statisticData[i]['time']}</td>
                  <td>${formattedValue}</td>
              </tr>`
    }
    else {
        var number = parseFloat(statisticData[i]['total']);
        // Định dạng lại giá trị
        var formattedValue = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
      row += `<tr>
          <td>${i + 1}</td>
          <td>${statisticData[i]['time']}</td>
          <td>${formattedValue}</td>
      </tr>`
    }

  $('#titleStatisticTable').html(header)
  $('#dataStatisticTable').html(row)
}