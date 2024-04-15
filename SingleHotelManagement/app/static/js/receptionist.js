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
    //--------------Dong form thanh toan--------------
    $(".close-search-room-form").click(function () {
        $(".overlay-payment").fadeOut();
        $(".payment-form").fadeOut();
    });

});

$(window).on('load', function () {
    //--------------------Nếu tải lại trang mà đang có param thì checked vào checkbox tương ứng-------------
    var urlParams = new URLSearchParams(window.location.search);
    let statusParam = urlParams.get('trang-thai');
    if (statusParam) {
        statusParam.split(',').forEach(status => {
            var value = Number(status)
            $(`input[type="checkbox"][value="${value}"]`).prop('checked', true);
        })
    }
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

check_out = (booking_id) => {
    fetch("/api/receptionist/check_out/", {
        method: 'post',
        body: JSON.stringify({
            'booking_id': booking_id,
        }),
        headers: {
            'Accept': 'application/json',
            'Context-Type': 'application/json',
        }
    }).then(res => res.json()).then(data => {
        // 00: unpaid, 01: paid
        if (data == '00') {
    //      window.location.reload();
        } else {
            Swal.fire({
                title: 'Trả phòng và thanh toán?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Huỷ bỏ'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch("/api/receptionist/get-booking-info/", {
                        method: 'post',
                        body: JSON.stringify({
                            'booking_id': booking_id,
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Context-Type': 'application/json',
                        }
                    }).then(resp => resp.json()).then(result => {
                        // Lưu booking_id để gọi api từ một chỗ khác
                        localStorage.setItem('payment-booking', booking_id);

                        var booking = result.booking
                        var booking_details = result.booking_details
                        $('.payment-form-title').text("THANH TOÁN")
                        $('.checkin-time-payment-form').text(moment(booking.start_date).format('LLL'))
                        $('.checkout-time-payment-form').text(moment(booking.end_date).format('LLL'))
                        let row = ''
                        total = 0
                        duration = calculate_booking_time(booking.start_date, booking.end_date)
                        booking_details.map(ele => {
                            total += ele.price
                            row +=
                                `<tr class="border-b border-blue-gray-200">
                                <td class="py-2 px-2">
                                  ${ele.tier_name}
                                  <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">${ele.room_name}</span>
                                </td>
                                <td class="py-2 px-2">${duration}</td>
                                <td class="py-2 px-2">${ele.booking_detail.num_normal_guest}</td>
                                <td class="py-2 px-2">${ele.booking_detail.num_foreigner_guest}</td>
                                <td class="py-2 px-2 font-medium text-black-600">${ele.price}</td>
                              </tr>`
                        })
                        row += `
                            <tr class="border-b border-blue-gray-200">
                                <td class="py-2 px-2 font-medium">Tổng cộng</td>
                                <td class="py-2 px-2"></td>
                                <td class="py-2 px-2"></td>
                                <td class="py-2 px-2 font-medium payment_amount">${total}</td>
                                <td class="py-2 px-2"></td>
                            </tr>
                        `
                        $('.payment-form-table-body').html(row)
                        $(".overlay-payment").fadeIn();
                        $(".payment-form").fadeIn();
                    })
                }
            })
        }
    })
}

function handlePayment() {
    var booking_id = localStorage.getItem('payment-booking')
    var amount = $('.payment_amount').text()
    if (booking_id) {
        fetch("/api/receptionist/payment/", {
        method: 'post',
        body: JSON.stringify({
            'booking_id': booking_id,
            'payment_method':$('input[type="radio"][name="payment-method"]:checked').val(),
            'amount': amount
        }),
        headers: {
            'Accept': 'application/json',
            'Context-Type': 'application/json',
        }
        }).then(res => res.json()).then(data => {
        // 00: lỗi, 01: thanh toán thành công, 02: chưa hỗ trợ thanh toán bằng phương thức đó,
            console.log(data)
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
            }
        })
    } else {
        Swal.fire({
                title: 'Thanh Toán Thất Bại',
                text:'Hãy thử lại sau',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Xác nhận',
        })
    }
}

function calculate_booking_time(start_date, end_date) {
    var startdate = moment(start_date);
    var enddate = moment(end_date);
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
        return total_time
    }
    return ''
}