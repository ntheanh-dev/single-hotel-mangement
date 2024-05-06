$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    // ----------------- Show modal search room form -----------------
    $(".btn-search-room").click(function () {
        $(".overlay-search-room").fadeIn();
        $(".search-room-form").fadeIn();
    });
    $(".close-search-room-form").click(function () {
        $(".overlay-search-room").fadeOut();
        $(".search-room-form").fadeOut();
    });

    //------------Clear tier fillter----------
    $('.clear-filter-btn2').click(function (event) {
        $('#flor-option option[value="all"]').prop('selected', true);
        $('#max_guest_option option[value="all"]').prop('selected', true);

        fetch("/api/reception/search-tier/", {
            method: 'post',
            body: JSON.stringify({
                'max_guests': $("#max_guest_option").val(),
                'floors': $("#flor-option").val(),
            }),
            headers: {
                'Accept': 'application/json',
                'Context-Type': 'application/json',
            }
        }).then(res => res.json()).then(data => {
            let row = ''
            data.forEach(t => {
                row += render_tier(t)
            });
            $('.available_room_list').html(row)
        })

    });
    // --------------------Search tier---------------
    $('.search-tier-btn2').click(function (event) {
        fetch("/api/reception/search-tier/", {
            method: 'post',
            body: JSON.stringify({
                'max_guests': $("#max_guest_option").val(),
                'floors': $("#flor-option").val(),
            }),
            headers: {
                'Accept': 'application/json',
                'Context-Type': 'application/json',
            }
        }).then(res => res.json()).then(data => {
            let row = ''
            data.forEach(t => {
                row += render_tier(t)
            });
            $('.available_room_list').html(row)
        })
    });
    //    ------------------Thay doi so luong khach trong booking detail hien tai---------------------
    $('.change_num_guest-btn').click(function () {
        var num_normal_guest = $('#vietnamese_num').val();
        var num_foreigner_guest = $('#foreigner_num').val();

        fetch("/api/reception/change-num-guest/", {
            method: 'post',
            body: JSON.stringify({
                'booking_id': urlParams.get('ma'),
                'room_id': urlParams.get('phong'),
                'num_normal_guest': num_normal_guest,
                'num_foreigner_guest': num_foreigner_guest
            }),
            headers: {
                'Context-Type': 'application/json',
            }
        }).then(res => res.json()).then(data => {
            if (!data) {
                Swal.fire({
                    title: 'Số khách vượt quá tối đa cho phép của phòng này',
                    text: '',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                })
            } else {
                window.location.reload();
            }
        })
    })
    // ----------------- Huỷ đơn đặt phòng online hiện tại-----------------
    $('.cancel-current-booking-btn').click(function () {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn hủy đơn đặt phòng này không?',
            text: '',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Huỷ bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("/api/receptionist/cancel/", {
                    method: 'post',
                    body: JSON.stringify({
                        'booking_id': urlParams.get('ma'),
                    }),
                    headers: {
                        'Context-Type': 'application/json',
                    }
                }).then(res => res.json()).then(data => {
                    if (data) {
                        Swal.fire({
                            title: 'Hủy đơn đặt phòng thành công!',
                            text: '',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok',
                        }).then((result) => {
                            // Lấy URL hiện tại
                            var currentUrl = window.location.href;

                            // Tách phần query string ra khỏi URL
                            var baseUrl = currentUrl.split('?')[0];

                            // Chuyển hướng về URL mới
                            window.location.href = baseUrl;
                        })
                    } else {
                        Swal.fire({
                            title: 'Hủy đơn đặt phòng thất bại!',
                            text: '',
                            icon: 'warning',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok',
                        })
                    }
                })
            }
        })
    })
    // ----------------- Đóng/mở nav thanh toán -----------------
    $(".payment-btn").click(function () {
        $(".overlay-payment").fadeIn();
        $(".payment-form").fadeIn();
        // ---------Lay thong tin booking hien tai---------------
        var booking_id = urlParams.get('ma')
        var current_booking_detail_id = urlParams.get('phong')

        fetch(`/api/booking/${booking_id}`, {
            method: 'get',
        }).then(res => res.json()).then(data => {
            var booking = data.booking
            var booking_details = data.booking_details
            var target = $('.payment-info-row')
            var row = ''
            booking_details.map(b => {
                row += `
                    <tr>
                        <td>${booking.id}</td>
                        <td><span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                            >${b.room_name}</span
                        ></td>
                        <td>${moment(booking.start_date).format('LLL')}</td>
                        <td>${moment(booking.end_date).format('LLL')}</td>
                        <td>${b.booking_detail.num_normal_guest}</td>
                        <td>${b.booking_detail.num_foreigner_guest}</td>
                        <td>${b.price}</td>
                    </tr>
                `
            })
            target.html(row)
        })


    });
    $(".close-search-room-form").click(function () {
        $(".overlay-payment").fadeOut();
        $(".payment-form").fadeOut();
    });
})
render_tier = (t) => {
    return `
        <div class="my-1 px-1 w-1/5">
        <article class="overflow-hidden rounded-lg shadow-lg">
        <img
            alt="Placeholder"
            class="block h-auto w-full"
            src="https://res.cloudinary.com/dqpo9h5s2/image/upload/v1711860957/rooms/room_2-1_c4yatw.png"
        />
        <header
            class="flex items-center justify-between leading-tight p-2 md:p-4"
        >
            <h1 class="text-lg">${t.name}</h1>
            <p class="text-grey-darker text-sm">Còn (${t.available})</p>
        </header>
        <footer
            class="flex-row items-center justify-between leading-none p-2 md:p-4"
        >
            <p class="text-sm text-gray-600">Tối đa: ${t.max_guest}</p>
            <p class="text-sm text-gray-600">
            Giá: ${t.base_price} (${t.normal_guest_count}/${t.max_guest}
            khách)
            </p>
            <p class="text-sm text-gray-600">
            Giá: ${t.surcharge} (>${t.normal_guest_count} khách)
            </p>
            <p class="text-sm text-gray-600">
            Nếu có khách nước ngoài : giá * ${t.foreign_guest_surcharge}
            </p>
        </footer>
        <button
            class="btn btn-success m-2"
            value="${t.id}"
            onClick="chooseRoom(${t.id})"
        >
            Chọn ngay
        </button>
        </article>
        <!-- END Article -->
    </div>
    <!-- END Column -->
        `
}
changeBookingStatus = (status) => {
    var urlParams = new URLSearchParams(window.location.search);

    if (status == 4) {
         Swal.fire({
            title: 'Bạn có chắc chắn muốn hủy đơn đặt phòng này không?',
            text: '',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Huỷ bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                 fetch("/api/receptionist/change-booking-status/", {
                    method: 'post',
                    body: JSON.stringify({
                        'booking_id': urlParams.get('ma'),
                        'status' : status
                    }),
                    headers: {
                        'Context-Type': 'application/json',
                    }
                }).then(res => res.json()).then(data => {
                    if (data == '01') {
                        const newUrl = window.location.pathname;
                        window.location.href = newUrl;
                    }
                })
        }})
    } else {
        fetch("/api/receptionist/change-booking-status/", {
            method: 'post',
            body: JSON.stringify({
                'booking_id': urlParams.get('ma'),
                'status' : status
            }),
            headers: {
                'Context-Type': 'application/json',
            }
        }).then(res => res.json()).then(data => {
            if (data == '01') {
                const newUrl = window.location.pathname;
                window.location.href = newUrl;
            } else {
                var alertTitle = status == 1 ? 'Đặt phòng thất bại!' : 'Nhận phòng thất bại!'
                Swal.fire({
                    title: alertTitle,
                    text: 'Hãy thử lại sau',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Xác nhận',
                })
            }
        })
    }
}
handlePayment = () => {
    var urlParams = new URLSearchParams(window.location.search);
    var booking_id = urlParams.get("ma")
    var current_booking_detail_id = urlParams.get("phong")
    fetch("/api/receptionist/payment/", {
        method: 'post',
        body: JSON.stringify({
            'booking_id': booking_id,
            'payment_method':$('input[type="radio"][name="payment-method"]:checked').val(),
            'current_booking_detail_id' : current_booking_detail_id
        }),
        headers: {
            'Accept': 'application/json',
            'Context-Type': 'application/json',
        }
        }).then(res => res.json()).then(data => {
        // 00: lỗi, 01: thanh toán thành công, 02: chưa hỗ trợ thanh toán bằng phương thức đó,
            switch (data) {
                case '00':
                    Swal.fire({
                            title: 'Thanh Toán Thất Bại',
                            text:'Hãy thử lại sau',
                            icon: 'warning',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Xác nhận',
                    })
                    break;
                case '01':
                    Swal.fire({
                            title: 'Thanh Toán Thành Công',
                            text:'Tải lại trang',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Xác nhận',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const newUrl = window.location.pathname;
                            window.location.href = newUrl;
                        }
                    })
                    break
                case '02':
                    Swal.fire({
                            title: 'Hiện chưa hỗ trợ phương thức thanh toán này',
                            text:'Hãy thử lại với phương thức khác',
                            icon: 'warning',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Xác nhận',
                    })
                    break;
                default:
                    window.location.href = data
            }
        })
}