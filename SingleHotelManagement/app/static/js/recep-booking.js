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

    // -----------------Tìm kiếm khách mới---------------------
    $(".search-guest-btn").click(function () {
        if ($("#search_guest").val() !== "") {
            fetch("/api/reception/search/", {
                method: 'post',
                body: JSON.stringify({
                    'search_type': $("#search_type").val(),
                    'search_guest': $("#search_guest").val(),
                    'foreigner': $("input[name='nationality']:checked").val(),
                }),
                headers: {
                    'Accept': 'application/json',
                    'Context-Type': 'application/json',
                }
            }).then(res => res.json()).then(data => {
                let row = ''
                data.forEach(ele => {
                    row += `<li>
                    <div class="py-3">
                      <div class="flex items-center justify-between">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                          ${ele.last_name} ${ele.first_name}
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">${ele.foreigner ? "Ngoại quốc" : "Trong nước"}</p>
                      </div>
                      <div class="mt-2 flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-500">
                          Địa chỉ:
                          <span class="text-green-600"
                            >${ele.address !== null ? ele.address : ''} ${ele.district !== null ? ele.district : ''} ${ele.city !== null ? ele.city : ''} </span
                          >
                        </p>
                      </div>
                      <div class="mt-2 flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-500">
                          SĐT: <span class="text-green-600">${ele.phone_number}</span>
                        </p>
                        <span
                            value="${ele.id}"
                            name="${ele.last_name} ${ele.first_name}"
                          class="font-medium text-indigo-600 hover:text-indigo-500 choose-guest-btn cursor-pointer"
                          onClick="setBooker('${ele.last_name} ${ele.first_name}','${ele.id}','${ele.foreigner}')"

                          >Thêm</
                        >
                      </div>
                    </div>
                  </li>`
                });
                document.querySelector(".list-guest").innerHTML = row
            })
        }
    });
    //-------------------Kiểm tra có từ khoá thì đổi màu nút tìm kiếm---------------
    $("#search_guest").on('keyup', function () {
        if ($("#search_guest").val() == "") {
            if (!$(".search-guest-btn").hasClass("newClass")) {
                $(".search-guest-btn").addClass("btn-secondary");
            }
            $(".search-guest-btn").removeClass("btn-success");
        } else {
            if (!$(".search-guest-btn").hasClass("btn-success")) {
                $(".search-guest-btn").addClass("btn-success");
            }
            $(".search-guest-btn").removeClass("btn-secondary");
        }
    })
    // ----------------- Show modal search form -----------------
    $(".btn-search-room").click(function () {
        $(".overlay-search-room").fadeIn();
        $(".search-room-form").fadeIn();
        // Lấy thời gian hiện tại bằng Moment.js
        var currentTime = moment().format('YYYY-MM-DDTHH:mm');
        var currentTimePlusOneDay = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm');


        // Thiết lập giá trị của input thành thời gian hiện tại
        $('#startdate').val(currentTime);
        $('#enddate').val(currentTimePlusOneDay);
        $('#time').val('1 ngày');
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
                Swal.fire({
                    title: 'Thêm khách mới thành công',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                })
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

    // ----------------Tính khoảng thời gian thuê phòng----------------
    $('#startdate, #enddate').change(function () {
        var startdate = moment($('#startdate').val().f);
        var enddate = moment($('#enddate').val());
        if (startdate.isValid() && enddate.isValid()) {
            var duration = moment.duration(enddate.diff(startdate));
            var days = duration.days();
            var hours = duration.hours();

            var total_time = '';

            if (days > 0) {
                total_time += days + ' ngày ';
            }
            if (hours > 0) {
                total_time += hours + ' giờ';
            }
            if (days === 0 && hours === 0) {
                total_time = '0 giờ';
            }

            $('#time').val(total_time); // Gán kết quả vào input total_time
        } else {
            $('#time').val(''); // Nếu ngày không hợp lệ, gán giá trị rỗng
        }
    });
});

function setBooker(name, id, foreigner) {
    $(".booker").fadeIn();
    $(".booker").html(
        `<div
            class="rounded-lg border border-success py-2 px-2 flex justify-center items-center space-x-2 color-green-600 booker-info"
            guest_id="${id}"
            foreigner="${foreigner}"
          >
            <i class="fa-solid fa-user"></i>
            <span class="ml-2 pr-3 font-bold text-success">${name}</span>
            <button
              type="button"
              class="btn-close close-search-room-form"
              aria-label="Close"
              onClick="removeBooker()"
            ></button>
          </div>`
    )
}
removeBooker = () => {
    $(".booker").html('');
}
chooseRoom = (room_id) => {
    // window.location.href = "/nhan-vien/dat-phong/?ma=3/";
    var currentHTML = $('.booker').html();
    if (currentHTML.trim() === '') {
        Swal.fire({
            title: 'Hãy chọn khách trước !!!',
            text: '',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        })
    } else {
        var booker_id = $('.booker-info').attr('guest_id')
        var foreigner = $('.booker-info').attr('foreigner')
        fetch("/api/reception/make-booking/", {
            method: 'post',
            body: JSON.stringify({
                'start_date': $("#startdate").val(),
                'end_date': $("#enddate").val(),
                'checkin': $("#startdate").val(),
                'checkout': $("#enddate").val(),
                'receptionist_id': 2,
                'booker_id': Number(booker_id),
                'tier_id': room_id,
                'foreigner': foreigner,
            }),
            headers: {
                'Accept': 'application/json',
                'Context-Type': 'application/json',
            }
        }).then(res => res.json()).then(data => {
            if (data == 'error') {
                Swal.fire({
                    title: 'Lỗi đặt phòng !!!',
                    text: 'Xin vui lòng thử lại hoặc chọn phòng khác',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                })
            } else {
                booking = data.booking
                room = data.room
                window.location.href = `/nhan-vien/dat-phong/?ma=${booking.id}&phong=${room.id}`;
            }
        })
    }
}