$(document).ready(function() {
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
        window.location.href = "/nhan-vien/dat-phong/them-khach/";
    });
});