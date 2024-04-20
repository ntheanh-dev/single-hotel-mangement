let chart = null
$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var report_revenue_type = urlParams.get('revenue')
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; // JavaScript đánh số tháng từ 0 đến 11
    var year = today.getFullYear();
    var body = {}
    if (report_revenue_type == 1) {
      $('.report-revenue-filter-title').text('| Hôm nay')
      body = {
        'report_type': 'revenue',
        'day': day,
        'month': month,
        'year': year
      }
    }
    // -----------this month-----------
    else if (report_revenue_type == 2) {
      $('.report-revenue-filter-title').text('| Tháng này')
      body = {
        'report_type': 'revenue',
        'day': null,
        'month': month,
        'year': year
      }
    }
    // ------------this year----------
    else {
      $('.report-revenue-filter-title').text('| Năm nay')
      body = {
        'report_type': 'revenue',
        'day': null,
        'month': null,
        'year': year
      }
    }
    fetch('/api/admin/revenue/', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      if (data.length == 0) return
      var chart_dom = $('#line-chart')
      if (!chart_dom) return

      var result = data.reduce((acc, curr) => {
        acc.data.push(curr.revenue_total)

        if (report_revenue_type == 1) {
          acc.label.push(`${curr.paid_at}h`)
        }
        // -----------this month-----------
        else if (report_revenue_type == 2) {
          acc.label.push(`Ngày ${curr.paid_at}`)
        }
        // ------------this year----------
        else {
          acc.label.push(`Tháng ${curr.paid_at}`)
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

      chart = new Chart(chart_dom, {
        type: 'line',
        data: {
          labels: result.label,
          datasets: [{
            label:"Doanh Thu",
            data: result.data,
            borderColor: '#4CAF50', // Add custom color border (Line)
            backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
          }]
        },
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false
        }
      })
    })
  var pieChart = new Chart($('#pie-chart'), {
    type: 'pie',
    data: {
      labels: [
        "Saudi Arabia",
        "Russia",
        "Iraq",
        "United Arab Emirates",
        "Canada"
      ],
      datasets: [{
        data: [133.3, 86.2, 52.2, 51.2, 50.2],
        backgroundColor: [
          "#FF6384",
          "#63FF84",
          "#84FF63",
          "#8463FF",
          "#6384FF"
        ]
      }]
    }
  });
  //--------------Tinh toan thoi gian thong bao duoc tao ra------------------
  $('.created-notif').each(function() {
    const createdAt = $(this).text();
    const diffInSeconds = moment().diff(moment(createdAt), 'seconds');
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInSeconds / 3600);
    const diffInDays = Math.floor(diffInSeconds / 86400);
    const diffInWeeks = Math.floor(diffInSeconds / 604800);
    const diffInMonths = Math.floor(diffInSeconds / 2592000);

    let timeAgo;
    if (diffInMinutes < 60) {
        timeAgo = diffInMinutes + ' phút trước';
    } else if (diffInHours < 24) {
        timeAgo = diffInHours + ' giờ trước';
    } else if (diffInDays < 7) {
        timeAgo = diffInDays + ' ngày trước';
    } else if (diffInWeeks < 4) {
        timeAgo = diffInWeeks + ' tuần trước';
    } else {
        timeAgo = diffInMonths + ' tháng trước';
    }

    $(this).text(timeAgo);
  })

  var colors = ['text-success','text-primary','text-info','text-warning','text-muted','']
  $('.notif-badge').each(function () {
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    $(this).addClass(randomColor)
  })
})