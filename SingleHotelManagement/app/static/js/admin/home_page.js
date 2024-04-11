$(document).ready(function () {
    //-------------count guest--------------
    fetch('/api/admin/count-guest/', {method: 'get'})
        .then(res => res.json()).then(data => {
            $('#totalGuest').text(data)
        })
    //-------------count booking --------------
    fetch('/api/admin/count-booking/', {method: 'get'})
        .then(res => res.json()).then(data => {
            $('#totalBooking').text(data)
        })
    //-------------get revenue--------------
    fetch('/api/admin/revenue/', {method: 'get'})
        .then(res => res.json()).then(data => {
            var revenue = data === null ? 0 : data
            $('#revenue').text(revenue + ' VND')
        })

    //-------------get booking--------------
    fetch('/api/admin/booking/', {method: 'get'})
        .then(res => res.json()).then(data => {
            let row = ''
            data.map(ele => {
                const booking = ele.booking
                let rooms = ''
                ele.rooms.split(',').map(r => {
                    rooms+= ` <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                            >${r}</span> `
                })
                var status = ''
                switch (ele.booking.status) {
                    case 'REQUESTED':
                        status = '<span class="badge bg-warning">Yêu Cầu</span>';
                        break;
                    case 'CONFIRMED':
                        status = '<span class="badge bg-success">Đặt Trước</span>'
                        break;
                    case 'CHECKED_IN':
                        status = '<span class="badge bg-success">Checked In</span>'
                        break;
                    case 'CHECK_OUT':
                        status = '<span class="badge bg-success">Checked Out</span>'
                        break;
                    case 'CANCELED':
                        status = '<span class="badge bg-danger">Đã Huỷ</span>'
                        break;
                }
                row += `
                      <tr>
                        <td>#${booking.id}</td>
                        <td>${ele.booker}</td>
                        <td>
                            ${rooms}
                        </td>
                        <td>${ele.price}</td>
                        <td>
                            ${status}
                        </td>
                      </tr>
                `
            })
            $('#list-booking-admin-home').html(row)
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

  var myChart = new Chart($('#line-chart'), {
    type: 'line',
    data: {
      labels: ["Tokyo", "Mumbai", "Mexico City", "Shanghai", "Sao Paulo", "New York", "Karachi", "Buenos Aires", "Delhi", "Moscow"],
      datasets: [{
        label: 'Series 1', // Name the series
        data: [500, 50, 2424, 14040, 14141, 4111, 4544, 47, 5555, 6811], // Specify the data values array
        fill: false,
        borderColor: '#2196f3', // Add custom color border (Line)
        backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
        borderWidth: 1 // Specify bar border width
      },
      {
        label: 'Series 2', // Name the series
        data: [1288, 88942, 44545, 7588, 99, 242, 1417, 5504, 75, 457], // Specify the data values array
        fill: false,
        borderColor: '#4CAF50', // Add custom color border (Line)
        backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
        borderWidth: 1 // Specify bar border width
      }
      ]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false
    }
  });

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function (e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
})