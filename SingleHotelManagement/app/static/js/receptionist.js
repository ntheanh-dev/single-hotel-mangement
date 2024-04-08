$(document).ready(function () {
    $(".confirmation-btn").click(function () {
        $(".overlay-confirm-booking").fadeIn();
        $(".modal-confirm-booking").fadeIn();
    });

    $(".close, .overlay-confirm-booking").click(function () {
        $(".overlay-confirm-booking").fadeOut();
        $(".modal-confirm-booking").fadeOut();
    });

    // ----------------- Show modal booking form -----------------
    $(".confirm-booking-online-btn").click(function () {
        $(".overlay-booking-form").fadeIn();
        $(".modal-booking-form").fadeIn();
    });

    $(".close-modal-booking-form").click(function () {
        $(".overlay-booking-form").fadeOut();
        $(".modal-booking-form").fadeOut();
    });

    $("#print-booking-form-btn").click(function () {
        var printSection = $("#print-section");
        if (printSection) {
            var printSection = document.createElement("div");
            printSection.id = "printSection";
            document.body.appendChild(printSection);
        }

        $("#print-booking-form").clone().appendTo("#printSection");
        window.print();

        $(".overlay-booking-form").fadeOut();
        $(".modal-booking-form").fadeOut();

    });


    // ----------------- Show modal leasing form -----------------
    $(".confirm-leasing-btn").click(function () {
        $(".overlay-leasing-form").fadeIn();
        $(".modal-leasing-form").fadeIn();
    });

    $(".close-modal-leasing-form").click(function () {
        $(".overlay-leasing-form").fadeOut();
        $(".modal-leasing-form").fadeOut();
    });

    $("#print-leasing-form-btn").click(function () {
        var printSection = $("#print-section");
        if (printSection) {
            var printSection = document.createElement("div");
            printSection.id = "printSection";
            document.body.appendChild(printSection);
        }

        $("#print-leasing-form").clone().appendTo("#printSection");
        window.print();

        $(".overlay-leasing-form").fadeOut();
        $(".modal-leasing-form").fadeOut();

    });

    //------------------Filter tất cả booking hiện tại--------------
    $('.list-booking-checkbox').change(() => {
        const checkedValues = $('input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get();
        let newUrl = ''
        if ($('input[type="checkbox"]:checked').length > 0) {
            // Tạo URL mới dựa trên các giá trị được chọn
            const params = 'trang-thai=' + checkedValues.join(',');
            newUrl = window.location.pathname + '?' + params;
        } else {
            newUrl = window.location.pathname
        }
        window.location.href = newUrl;
    })
    //--------------Xoa bo loc-----------------
    $('.clear-check-input-btn').click(() => {
        const newUrl = window.location.pathname;
        window.location.href = newUrl;
    })

});

$(window).on('load', function () {
    //--------------------Nếu tải lại trang mà đang có param thì checked vào checkbox tương ứng-------------
    var urlParams = new URLSearchParams(window.location.search);
    const statusParam = urlParams.get('trang-thai').split(',');
    statusParam.forEach(status => {
        var value = Number(status)
        $(`input[type="checkbox"][value="${value}"]`).prop('checked', true);
    })
});

change_booking_status = (booking_id, status) => {
    fetch("/api/receptionist/change-booking-status/", {
        method: 'post',
        body: JSON.stringify({
            'booking_id': booking_id,
            'status': status
        }),
        headers: {
            'Accept': 'application/json',
            'Context-Type': 'application/json',
        }
    }).then(res => res.json()).then(data => {
        window.location.reload();
    })
}