// Thông tin các loại lựa chọn báo cáo
let gChoiceInfo = {
    reportType: 'revenue',
    month: null,
    quarter: null,
    year: null,
}
// Gửi các thông tin lựa chọn lên server để lấy dữ liệu bao cao
function getReportData(choiceInfo) {
  fetch('/api/admin/report/', {
    method: 'post',
    body: JSON.stringify({
        'report_type': choiceInfo.reportType,
        'month': choiceInfo.month,
        'quarter': choiceInfo.quarter,
        'year': choiceInfo.year,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => {
    setReportDataTable(data)
  })
}


$(document).ready(function () {
    $('.quarterSelection').hide()
    setTimeSelections()
    getReportData(gChoiceInfo)

    $('#reportType').change(function () {
        gChoiceInfo.reportType = $('#reportType').val()
        getReportData(gChoiceInfo)
    })

    $('#reportCondition').change(function () {
        if ($(this).val() == 'month_report') {
            $('.monthSelection').show()
            $('.quarterSelection').hide()
            gChoiceInfo.month = parseInt($('#monthInput').val())
            gChoiceInfo.quarter = null
        }

        if ($(this).val() == 'quarter_report') {
            $('.monthSelection').hide()
            $('.quarterSelection').show()
            gChoiceInfo.month = null
            gChoiceInfo.quarter = parseInt($('#quarterInput').val())
        }

        if ($(this).val() == 'year_report') {
            $('.monthSelection').hide()
            $('.quarterSelection').hide()
            gChoiceInfo.month = null
            gChoiceInfo.quarter = null
        }

        gChoiceInfo.year = parseInt($('#yearInput').val())
        getReportData(gChoiceInfo)
    })

    $('#monthInput').change(function () {
        gChoiceInfo.month = parseInt($(this).val())
        getReportData(gChoiceInfo)
    })

    $('#quarterInput').change(function () {
        gChoiceInfo.quarter = parseInt($(this).val())
        getReportData(gChoiceInfo)
    })

    $('#yearInput').change(function () {
        gChoiceInfo.year = parseInt($(this).val())
        getReportData(gChoiceInfo)
    })

})

function setTimeSelections() {
    var options = ''
    for (let i = 1; i <= 12; i++)
        options += `<option value=${i}>${i}</option>`
    $('#monthInput').html(options)
    options = ''
    for (let i = 1; i <= 4; i++)
        options += `<option value=${i}>${i}</option>`
    $('#quarterInput').html(options)
    options = ''
    for (let i = 2020; i <= 2100; i++)
        options += `<option value=${i}>${i}</option>`
    $('#yearInput').html(options)

    gChoiceInfo.month = $('#monthInput').val()
    gChoiceInfo.year = $('#yearInput').val()
}

function setReportDataTable(reportDatas) {
    var headers = ''
    var rows = ''
    var total = ''

    $('#titleReportTable').html('')
    $('#reportDataTable').html('')
    $('#total').text('')

    sum = 0
    if ($('#reportType').val() == 'revenue') {
        headers += `<tr>
                            <th> ${'Số thứ tự'}</th>
                            <th> ${'Ngày đặt phòng'}</th>
                            <th> ${'Doanh thu'}</th>
                        </tr>`
        for (let i = 0; i < reportDatas.length; i++) {
            rows += `<tr>
                            <td>${i + 1}</td>
                            <td>${reportDatas[i]['paid_at']}</td>
                            <td>${reportDatas[i]['revenue_total'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                    </tr>`
            sum += parseInt(reportDatas[i]['revenue_total'])
        }
        total = `Tổng doanh thu: ${sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`
    }

    if ($('#reportType').val() == 'frequently_tier_booking') {
        headers += `<tr>
                            <th> ${'Số thứ tự'}</th>
                            <th> ${'Tên phòng'}</th>
                            <th> ${'Số lượng'}</th>
                        </tr>`
        for (let i = 0; i < reportDatas.length; i++) {
            rows += `<tr>
                            <td>${i + 1}</td>
                            <td>${reportDatas[i]['room_name']}</td>
                            <td>${reportDatas[i]['total_usage']}</td>
                    </tr>`
            sum += parseInt(reportDatas[i]['total_usage'])
        }
        total = `Tổng số lượt đặt phòng: ${sum}`
    }

    $('#titleReportTable').html(headers)
    $('#dataReportTable').html(rows)
    $('#total').text(total)

}