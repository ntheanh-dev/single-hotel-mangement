$(document).ready(function () {
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
    // --------------------- Mở màn hình thêm khách mới --------------------------------
    $(".add-guest-btn").click(function () {
        $(".overlay-add-guest").fadeIn();
        $(".add-guest-form").fadeIn();
    });

    $(".close-add-guest-form").click(function () {
        $(".overlay-add-guest").fadeOut();
        $(".add-guest-form").fadeOut();
    });

    // $(".choose-guest-btn, .search-guest, .add-guest-btn").click(function () {
    //     Toastify({
    //         text: "Hãy chọn phòng trước",
    //         duration: 3000,
    //         // destination: "https://github.com/apvarun/toastify-js",
    //         newWindow: true,
    //         gravity: "bottom", // `top` or `bottom`
    //         position: "center", // `left`, `center` or `right`
    //         stopOnFocus: true, // Prevents dismissing of toast on hover
    //         style: {
    //             background: "#FFAF45",
    //         },
    //     }).showToast();
    // });
    $(".choose-this-room").click(function () {
        window.location.href = "/nhan-vien/dat-phong/?ma=3/";
    });

    // ----------------- Show modal search form -----------------
    $(".btn-search-room").click(function () {
        $(".overlay-search-room").fadeIn();
        $(".search-room-form").fadeIn();
    });

    $(".close-search-room-form").click(function () {
        $(".overlay-search-room").fadeOut();
        $(".search-room-form").fadeOut();
    });
    // --------------------Search tier---------------
    $('.search-tier-btn').click(function (event) {
        this.submit();
    });
    //------------Clear fillter----------
    $('.clear-filter-btn').click(function (event) {
        $('#flor-option option[value="' + urlParams.get('floor') + '"]').prop('selected', false);
        $('#max_guest_option option[value="' + urlParams.get('max_guest') + '"]').prop('selected', false);

        $('#flor-option option[value="all"]').prop('selected', true);
        $('#max_guest_option option[value="all"]').prop('selected', true);
        this.submit();
    });

    // ------------------Them mot khach hang moi---------------------

    $(".save_new_guest_btn").click(function () {
        //        event.preventDefault()
        fetch("/api/reception/add-guest/", {
            method: 'post',
            body: JSON.stringify({
                'last_name': $("#last_name").val(),
                'first_name': $("#first_name").val(),
                'birthdate': $("#birthdate").val(),
                'phone_number': $("#phone_number").val(),
                'city': $("#city").val(),
                'district': $("#district").val(),
                'address': $("#address").val(),
                'foreigner': $("#foreigner").val(),
            }),
            headers: {
                'Accept': 'application/json',
                'Context-Type': 'application/json',
            }
        }).then(res => res.json()).then(data => {
            if (data == '-1') {
                Swal.fire({
                    title: 'Thông tin bạn nhập không hợp lệ !!!',
                    text: 'Xin vui lòng thử lại',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                })
            } else if (data == '0') {
                Swal.fire({
                    title: 'Số điện thoại đã tồn tại !!!',
                    text: '',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                })
            } else {
                Swal.fire(
                    'Thêm khách mới thành công',
                    'success'
                )
            }
        })
    })

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

    //    -------------Huỷ don dat phong hien tai -------------------------
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

    //-----------Lay danh sach tinh thanh-------------
    const host = 'https://vapi.vnappmob.com/api/province/'
    var callAPI = (api) => {
        return axios.get(api)
            .then((response) => {
                renderData(response.data.results, "city", "city");
            });
    }
    callAPI(host);
    var callApiDistrict = (api) => {
        return axios.get(api)
            .then((response) => {
                renderData(response.data.results, "district", "district");
            });
    }

    var renderData = (array, select, type) => {
        let row = ' <option disable value="">Chọn</option>';
        if (type == "city") {
            array.forEach(element => {
                row += `<option data-id="${element.province_id}" value="${element.province_name}">${element.province_name}</option>`
            });
        } else if (type == "district") {
            array.forEach(element => {
                row += `<option data-id="${element.district_id}" value="${element.district_name}">${element.district_name}</option>`
            });
        }
        document.querySelector("#" + select).innerHTML = row
    }

    $("#city").change(() => {
        callApiDistrict(host + "district/" + $("#city").find(':selected').data('id'));
    });

});