document.addEventListener('DOMContentLoaded', function () {
    const cartItemLength = JSON.parse(localStorage.getItem('booking')).length
    let domestic = Number(JSON.parse(localStorage.getItem('domestic'))) * cartItemLength;
    let foreign =  Number(JSON.parse(localStorage.getItem('foreign')))  * cartItemLength;
    let date = localStorage.getItem('date');
    function loadCartItems() {
        const cartItemsJSON = localStorage.getItem('booking');
        const cartItems = JSON.parse(cartItemsJSON);

        const cartList = document.querySelector('.cart-list');

        cartList.innerHTML = '';
        console.log('Items already saved:', cartItems);

        cartItems.forEach(item => {
            if (item.price > 0) {
                const article = document.createElement('article');
                article.classList.add('cart-item', 'order-page-box', 'ht-mb-3');
                article.setAttribute('ma', item.id);
                article.innerHTML = `
                  <div class="ht-row">
                    <div class="ht-col cart-item-thumb">
                      <div class="cart-item-thumb-image">
                        <img src="https://d30s6klq0kc2zb.cloudfront.net/sample_data_20230310/room-class/room_1-3.png">
                      </div>
                    </div>
                    <div class="ht-col">
                      <h3><span class="ht-mr-2">${item.name}</span><span class="d-inline-block ht-text-primary">${item.quantity} phòng</span></h3>
                      <div class="ht-text-gray ht-mb-2"><i class="fa-regular fa-user-group ht-mr-2"></i> ${item.domesticNum} nội địa, ${item.foreignNum} nước ngoài </div>
                      <div class="cart-item-info">
                        <div><span class="ht-text-gray">Giá: </span><strong class="ht-font-medium">${item.price.toLocaleString()} VNĐ</strong></div>
                        <div><span class="ht-text-gray">Số lượng: </span><strong class="ht-font-medium">${item.quantity}</strong></div>
                      </div>
                      <a class="cart-item-note"><i class="far fa-pen-to-square ht-mr-1"></i> Nhập ghi chú... </a>
                    </div>
                    <div class="ht-col cart-item-price  ht-h3">${(item.price)} VNĐ</div>
                    <div class="ht-col cart-item-action ht-text-right">
                      <button onclick="removeOrderCart(this)" href="javascript:void(0);" class="ht-btn ht-btn-xs ht-btn-icon-only ht-btn-text-gray hover-light-danger ht-btn-circle ht-d-none ht-d-lg-inline-block" title="Xoá"><i class="far fa-trash-can icon-btn"></i></button>
                      <button href="javascript:void(0);" class="ht-btn ht-btn-sm ht-btn-light-danger ht-d-lg-none" title="Xoá"> Xoá </button>
                    </div>
                  </div>
                    `;
                cartList.appendChild(article);
            }
        });
    }

    // Call the function to load cart items when needed, such as when the page loads
    loadCartItems();

    const confirmQuantity = document.querySelector('.quantity-of-customer');
    const confirmBookingDateSpan = document.querySelector('.confirm-booking-date');
    confirmQuantity.textContent = foreign + ' khách nước ngoài - ' + domestic + " khách nội địa";
    confirmBookingDateSpan.textContent = date;
    const paymentTotal = document.querySelector('.payment-total');
    const paymentTotalAmount = document.querySelector('.payment-total-amount');
    const paymentBonus = document.querySelector('.payment-total-bonus');
    const selectedPRice = document.querySelector('.selected-price');
    function calculateTotalPrice() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalPrice = 0;
        cartItems.forEach(item => {
            const priceElement = item.querySelector('.cart-item-price');
            const priceText = priceElement.textContent.trim().replace(',', ''); // Remove commas if present
            const price = parseFloat(priceText);
            totalPrice += price;
        });
        const bonusValue = parseInt(paymentBonus.value);
        const totalAmount = totalPrice + (isNaN(bonusValue) ? 0 : bonusValue); // Check if bonusValue is NaN

        paymentTotal.textContent = totalPrice;
        paymentTotalAmount.textContent = totalAmount;
        console.log('Total Price:', totalPrice);
        console.log('Bonus Value:', bonusValue);
        console.log('Total Amount:', totalAmount);
    }

    calculateTotalPrice(); // Initial calculation when the page loads

    // Add event listener to remove buttons
    const removeButtons = document.querySelectorAll('.ht-btn-icon-only');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            removeOrderCart(this); // Call the removeOrderCart function passing the button element
        });
    });

    function removeOrderCart(button) {
        var article = button.closest('article');
        var ma = article.getAttribute("ma");
        if (article) {
            article.remove();
            var booking = JSON.parse(localStorage.getItem('booking'))
            booking = booking.filter(b => b.id != Number(ma))
            localStorage.setItem('booking', JSON.stringify(booking));
            calculateTotalPrice(); // Recalculate total price after removal

            const cartItemLength = JSON.parse(localStorage.getItem('booking')).length
            let domestic = Number(JSON.parse(localStorage.getItem('domestic'))) * cartItemLength;
            let foreign =  Number(JSON.parse(localStorage.getItem('foreign')))  * cartItemLength;
            const confirmBookingDateSpan = document.querySelector('.confirm-booking-date');
            confirmQuantity.textContent = foreign + ' khách nước ngoài - ' + domestic + " khách nội địa";
        } else {
            console.error('Parent article not found');
        }
    }

    //-----------Lay danh sach tinh thanh-------------
    const host = 'https://vapi.vnappmob.com/api/province/'
    var callAPI = (api) => {
        return fetch(api, {
            method: 'get',
        }).then(res => res.json()).then(data => {
            renderData(data.results, "city", "city");
        })
    }
    callAPI(host);
    var callApiDistrict = (api) => {
        return fetch(api, {
            method: 'get',
        }).then(res => res.json()).then(data => {
            renderData(data.results, "district", "district");
        })

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
        var a = document.querySelector("#" + select)
        if (a) {
            a.innerHTML = row
        }

    }

    $("#city").change(() => {
        callApiDistrict(host + "district/" + $("#city").find(':selected').data('id'));
    });

    // --------------- xác nhận đặt phòng-------------------
    $(".confirmBookingBtn").click(function () {
        if( $("#last_name").val() == '' || $("#first_name").val() == "" || $("#phone_number").val() =="" ||
            $("#email").val() == ''
        ) {
            Swal.fire({
                    title: 'Vui lòng nhập đầy đủ thông tin',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                })
        } else {
            var loading = $("#loading")
            loading.addClass("loading")
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
                    loading.removeClass("loading")
                    Swal.fire({
                        title: 'Thông tin bạn nhập không hợp lệ !!!',
                        text: 'Xin vui lòng thử lại',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok',
                    })
                } else if (data == '0') {
                    loading.removeClass("loading")
                    Swal.fire({
                        title: 'Hãy thử với số điện thoại khách!!!',
                        text: '',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok',
                    })
                } else {
                    var booker_id = data.id
                        var domestic = Number(JSON.parse(localStorage.getItem('domestic'))) * cartItemLength;
                        var foreign =  Number(JSON.parse(localStorage.getItem('foreign')))  * cartItemLength;
                        fetch("/api/reception/make-booking-online/", {
                            method: 'post',
                            body: JSON.stringify({
                                'start_date': JSON.parse(localStorage.getItem('start_date')),
                                'end_date': JSON.parse(localStorage.getItem('end_date')),
                                'booked_room': JSON.parse(localStorage.getItem('booking')),
                                'booker_id': booker_id,
                                'full_name': `${$("#first_name").val()} ${$("#last_name").val()}`,
                                'email': $("#email").val()
                            }),
                            headers: {
                                'Accept': 'application/json',
                                'Context-Type': 'application/json',
                            }
                        }).then(res => res.json()).then(data => {
                            if (data == 'error') {
                                loading.removeClass("loading")
                                Swal.fire({
                                    title: 'Lỗi đặt phòng !!!',
                                    text: 'Xin vui lòng thử lại hoặc chọn phòng khác',
                                    icon: 'warning',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Ok',
                                })
                            } else {
                                loading.removeClass("loading")
                                Swal.fire({
                                    title: 'Đặt phòng thành công Thành Công',
                                    text:'Trở về trang chủ?',
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Xác nhận',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = `/trang-chu/`;
                                    }
                                })
                            }
                        })
                }
            })
        }
    })
});
