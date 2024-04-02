$(document).ready(function() {
    //----------------Neu dang co tham so tim phong thi khi submit xong hien lai form tim kiem -----------------
    var urlParams = new URLSearchParams(window.location.search);
    var max_guest = urlParams.has('max_guest')
    var floor = urlParams.has('floor')
    if (max_guest && floor) {
        $(".overlay-search-room").show();
        $(".search-room-form").show();

        $('#flor-option option[value="' + urlParams.get('floor') + '"]').prop('selected', true);
        $('#max_guest_option option[value="' + urlParams.get('max_guest') + '"]').prop('selected', true);
    }

    $(".choose-guest-btn, .search-guest, .add-guest-btn").click(function() {
        Toastify({
            text: "Hãy chọn phòng trước",
            duration: 3000,
            // destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FFAF45",
            },
        }).showToast();
    });
    $(".choose-this-room").click(function() {
        window.location.href = "/nhan-vien/dat-phong/?ma=3/";
    });

    // ----------------- Show modal search form -----------------
    $(".btn-search-room").click(function() {
        $(".overlay-search-room").fadeIn();
        $(".search-room-form").fadeIn();
    });

    $(".close-search-room-form").click(function() {
        $(".overlay-search-room").fadeOut();
        $(".search-room-form").fadeOut();
    });
    // --------------------Search tier---------------
    $('.search-tier-btn').click(function(event) {
        this.submit();
    });
    //------------Clear fillter----------
    $('.clear-filter-btn').click(function(event) {
        $('#flor-option option[value="' + urlParams.get('floor') + '"]').prop('selected', false);
        $('#max_guest_option option[value="' + urlParams.get('max_guest') + '"]').prop('selected', false);

        $('#flor-option option[value="all"]').prop('selected', true);
        $('#max_guest_option option[value="all"]').prop('selected', true);
        this.submit();
    });
});