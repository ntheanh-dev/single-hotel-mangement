let chart = null
$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var report_revenue_type = urlParams.get('revenue')
  if (report_revenue_type) {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; // JavaScript đánh số tháng từ 0 đến 11
    var year = today.getFullYear();
    var body = {}
    if (report_revenue_type == 1) {
      $('.report-revenue-filter-title').text('Hôm nay')
      body = {
        'report_type': 'revenue',
        'day': day,
        'month': month,
        'year': year
      }
    }
    // -----------this month-----------
    else if (report_revenue_type == 2) {
      $('.report-revenue-filter-title').text('Tháng này')
      body = {
        'report_type': 'revenue',
        'day': null,
        'month': month,
        'year': year
      }
    }
    // ------------this year----------
    else {
      $('.report-revenue-filter-title').text('Năm nay')
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
  }
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
  //
  //  var myChart = new Chart($('#line-chart'), {
  //    type: 'line',
  //    data: {
  //      labels: ["Tokyo", "Mumbai", "Mexico City", "Shanghai", "Sao Paulo", "New York", "Karachi", "Buenos Aires", "Delhi", "Moscow"],
  //      datasets: [{
  //        label: 'Series 1', // Name the series
  //        data: [500, 50, 2424, 14040, 14141, 4111, 4544, 47, 5555, 6811], // Specify the data values array
  //        fill: false,
  //        borderColor: '#2196f3', // Add custom color border (Line)
  //        backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
  //        borderWidth: 1 // Specify bar border width
  //      },
  //      {
  //        label: 'Series 2', // Name the series
  //        data: [1288, 88942, 44545, 7588, 99, 242, 1417, 5504, 75, 457], // Specify the data values array
  //        fill: false,
  //        borderColor: '#4CAF50', // Add custom color border (Line)
  //        backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
  //        borderWidth: 1 // Specify bar border width
  //      }
  //      ]
  //    },
  //    options: {
  //      responsive: true, // Instruct chart js to respond nicely.
  //      maintainAspectRatio: false
  //    }
  //
  //  });

})