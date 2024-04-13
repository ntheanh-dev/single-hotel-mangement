let choiceObject = {
  statisticType: 'revenue',
  statisticCondition: 'month_statistic',
  fromTime: null,
  toTime: null,
  tierName: null,
  hintIndex: null,
  flagTimeInput: null
}

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
    console.log((statisticData))
  })
}

$(document).ready(function () {
      $('#timeInput').hide()
      $('#tierNameInput').hide()
      $('#tierNameResultInput').hide()

      //-----------Thay doi kieu thong ke------------
      $('#statisticType').change(() => {
        choiceObject.statisticType = $('#statisticType').val()
        if($('#statisticType').val() == 'frequently_tier_booking') {
          $('#tierNameInput').show()

        } else {
          $('#tierNameInput').hide()
          $('#tierName').val('')
          $('#tierNameResultInput').html('')

          //----------- Lấy dữ lieu mới nhất----------------
          getStatisticData()
        }
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
              minVal = 2020
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
        if(keyword) {
            getTierHintName(keyword)
        } else {
            $('#tierNameResultInput').hide()
        }
      })
})

// Gửi thông tin từ khóa tìm kiếm tên sách lên server và nhận về danh sách tên sách tìm được
function getTierHintName(keyword) {
  fetch('/api/admin/tier-name/', {
    method: 'post',
    body: JSON.stringify({
      'keyword': keyword
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => {
    setHintResult(data)
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
    $('option.tier-name-option').each(function() {
        if ($(this).val() == tier_id) {
            $(this).css('background-color', '#04a9f5');
        } else {
            $(this).css('background-color', 'white');
        }
    })
}

// Click vao option gợi ý
function setOnClickHint(hint,id) {
  $('#tierName').val(hint.trim())
  $('#tierName').attr('tier_id', id);
  $('#tierNameResultInput').hide()

  //----------- Lấy dữ lieu mới nhất----------------
  getStatisticData()
}