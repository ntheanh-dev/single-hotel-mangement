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