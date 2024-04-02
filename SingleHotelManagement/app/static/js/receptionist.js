$(document).ready(function () {
    $(".confirmation-btn").click(function () {
        $(".overlay-confirm-booking").fadeIn();
        $(".modal-confirm-booking").fadeIn();
    });

    $(".close, .overlay-confirm-booking").click(function () {
        $(".overlay-confirm-booking").fadeOut();
        $(".modal-confirm-booking").fadeOut();
    });
});

$(document).ready(function () {
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

    $(".cancel-booking-online-btn").click(function () {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn huỷ đơn đặt phòng online này?',
            text: 'Mọi thao tác sau khi thực hiện không thể phục hồi lại',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Huỷ bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                // fetch('/gio-hang/api/delete-to-cart', {
                //     method: 'post',
                //     body: JSON.stringify({
                //         'book_id': bookId,
                //     }),
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // }).then(res => res.json()).then(result => {
                //     if (result['result']) {
                //         Swal.fire(
                //             'Xóa thành công',
                //             'Giỏ hàng của bạn đã được cập nhật.',
                //             'success'
                //         ).then(function () {
                //             getBookInCart()
                //             getCartDetailAmount()
                //         })

                //     } else
                //         Swal.fire({
                //             title: 'Xóa thất bại',
                //             text: 'Xin vui lòng kiểm tra lại',
                //             icon: 'warning',
                //             confirmButtonColor: '#3085d6',
                //             confirmButtonText: 'Ok',
                //         })
                // })
            }
        })
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

    $(".cancel-leasing-btn").click(function () {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn huỷ đơn đặt thuê phòng này?',
            text: 'Mọi thao tác sau khi thực hiện không thể phục hồi lại',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Huỷ bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                // fetch('/gio-hang/api/delete-to-cart', {
                //     method: 'post',
                //     body: JSON.stringify({
                //         'book_id': bookId,
                //     }),
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // }).then(res => res.json()).then(result => {
                //     if (result['result']) {
                //         Swal.fire(
                //             'Xóa thành công',
                //             'Giỏ hàng của bạn đã được cập nhật.',
                //             'success'
                //         ).then(function () {
                //             getBookInCart()
                //             getCartDetailAmount()
                //         })

                //     } else
                //         Swal.fire({
                //             title: 'Xóa thất bại',
                //             text: 'Xin vui lòng kiểm tra lại',
                //             icon: 'warning',
                //             confirmButtonColor: '#3085d6',
                //             confirmButtonText: 'Ok',
                //         })
                // })
            }
        })
    });
});