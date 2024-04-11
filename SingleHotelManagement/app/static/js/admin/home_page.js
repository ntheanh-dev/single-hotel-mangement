$(document).ready(function () {
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