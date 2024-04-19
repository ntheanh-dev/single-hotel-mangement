$(document).ready(function () {
    const roomClassList = document.querySelector('.room-class-list');
    const saveButton = document.getElementById('saveButton');
    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus');
    const confirmBookingDateSpan = document.querySelector('.confirm-booking-date');
    const confirmQuantity = document.querySelector('.quantity-of-customer');
    const totalPayment = document.querySelector('.total-payment');
    const priceElements = document.querySelectorAll('.price');
    let totalPrice = 0;
    // Fetch data from the API endpoint
    localStorage.clear();

    minusButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            const inputField = this.parentElement.parentElement.querySelector('.quantity');
            let value = parseInt(inputField.value);
            if (priceElements[index - 2] && totalPrice > 0 && inputField.value > 0) {
                const priceText = priceElements[index - 2].textContent.trim();
                const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                totalPrice -= price;
                console.log("price of", index, totalPrice)
                totalPayment.textContent = totalPrice.toLocaleString();
            }
            if (!isNaN(value) && value > 0) {
                console.log(inputField.value, value)
                inputField.value = value - 1;
            }
        });
    });

    plusButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            const inputField2 = this.parentElement.parentElement.querySelector('.quantity');

            let value = parseInt(inputField2.value);
            if (!isNaN(value)) {
                console.log(inputField2.value, value)
                inputField2.value = value + 1;
            }
            if (priceElements[index - 2]) {
                const priceText = priceElements[index - 2].textContent.trim();
                const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                totalPrice += price;
                console.log("price of", index, totalPrice)
                totalPayment.textContent = totalPrice.toLocaleString();
            }
        });
    });

    // Lấy thời gian hiện tại bằng Moment.js
    var currentTime = moment().format('YYYY-MM-DDTHH:mm');
    var currentTimePlusOneDay = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm');

    // Thiết lập giá trị của input thành thời gian hiện tại
    $('#start_date').val(currentTime);
    $('#end_date').val(currentTimePlusOneDay);

    $('.search').click(function () {
        localStorage.removeItem("booking");
        var foreignNum =  Number($('.foreign').val())
        var domestic =  Number($('.domestic').val())
        if (foreignNum + domestic <= 0) {
            Swal.fire({
                    title: 'Chọn tối thiểu số khách là 1',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Xác nhận',
            })
            return
        }
        fetch(`/api/room/?max_guest=${foreignNum + domestic}`, {
            method: 'get',
        }).then(res => res.json()).then(data => {
            localStorage.setItem('searched_tiers', JSON.stringify(data));
            localStorage.setItem('total_price', JSON.stringify(0));
            let row = ''
            data.map(room => {
                row += `
                    <article class="room-class-item">
                        <div class="room-class-item-thumbs">
                          <img alt="" src="https://d30s6klq0kc2zb.cloudfront.net/sample_data_20230310/room-class/room_1-3.png">
                        </div>
                        <div class="room-class-item-info">
                          <div class="room-class-detail">
                            <h3 class="room-class-item-name">${room.name}</h3>
                            <div class="room-class-item-attributes ht-text-gray">
                              <i class="bi bi-people-fill mr-2"></i>Tối đa ${room.max_guest} khách
                              <a placement="bottom" outsideclick="true" triggers="mouseenter:mouseleave" class="ht-text-gray ht-ml-1">
                                <i class="bi bi-info-circle"></i>
                              </a>
                            </div>
                            <div class="room-class-item-desc ht-mt-3" style="max-height: unset;">
                              <p class="text-sm text-gray-600">
                                Giá: <span class="price">${room.surcharge}</span> nếu số khách > ${room.normal_guest_count}
                              </p>
                              <p class="text-sm text-gray-600">
                                Có khách nước ngoài: giá * ${room.foreign_guest_surcharge}
                              </p>
                            </div>
                          </div>
                          <div class="room-class-item-view-more">
                            <a class="ht-text-primary">Chi tiết <i class="bi bi-arrow-right ml-2"></i></a>
                          </div>
                        </div>
                        <div class="room-class-item-action">
                          <div class="room-class-item-price">
                            <h2 class="price-value ht-mb-0 ht-d-flex align-items-center">
                              <span class="ht-mr-2 price">${room.base_price}</span>
                            </h2>
                            <div><span class="ht-text-danger">Còn ${room.available} phòng trống</span></div>
                          </div>

                          <div class="ht-col-form-control">
                            <div class="ht-form-number ht-form-number-sm ht-width-130">
                              <button onClick="downNumChooseRoom(${room.available},${room.ma},'${room.name}')"
                                type="button" class="ht-btn ht-btn-icon-only ht-btn-outline-gray down minus">
                                -
                              </button>
                              <input id=${room.ma} type="number" inputmode="decimal" value="0" class="ht-form-control ng-untouched ng-pristine ng-valid quantity" readonly>
                              <button  onClick="upNumChooseRoom(${room.available},${room.ma},'${room.name}')"  type="button" class="ht-btn ht-btn-icon-only ht-btn-outline-gray up plus">
                                <i class="far fa-plus icon-btn"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                    </article>
                `
            })
            $('.room-class-list').html(row)
        })
        $('.quantity-of-customer').text(`${foreignNum} khách nước ngoài - ${domestic} khách nội địa`)
        $('.confirm-booking-date').text(`${ moment( $('#start_date').val() ).format('lll') } - ${ moment( $('#end_date').val() ).format('lll') }`)
    });

    $('#nextBtn').click(() => {
        var total_price = JSON.parse(localStorage.getItem('total_price')) || 0
        if (total_price == 0) {
            Swal.fire({
                title: 'Chọn Tối Thiểu Một Phòng',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Xác nhận',
            })
            return
        }

        localStorage.setItem('foreign', JSON.stringify($('.foreign').val()));
        localStorage.setItem('domestic', JSON.stringify($('.domestic').val()));
        localStorage.setItem('start_date', JSON.stringify($('#start_date').val()));
        localStorage.setItem('end_date', JSON.stringify($('#end_date').val()));

        window.location.href = 'trang-chu/dat-phong/'
    })
});
downNumChooseRoom = (avail,ma,room_name) => {
    var foreign_count =  Number($('.foreign').val())
    var normal_guest_count =  Number($('.domestic').val())
    var quanInput = Number($(`#${ma}`).val())
    console.log(quanInput)
    if (quanInput - 1 >= 0) {
        $(`#${ma}`).val(quanInput - 1)

        var booking = JSON.parse(localStorage.getItem('booking')) || []
        booking.map(bd => {
            if (bd.id == Number(ma)) {
                var total_price = JSON.parse(localStorage.getItem('total_price'))
                var pr = calculate_price(ma)
                total_price -= pr

                $('.total-payment').text(total_price)
                localStorage.setItem('total_price', JSON.stringify(total_price));

                bd.quantity -=1
                bd.price = Number(pr) * bd. quantity
            }
            return bd
        })
        if (quanInput - 1 == 0) {
            booking = booking.filter(b => b.id != Number(ma))
        }
        localStorage.setItem('booking', JSON.stringify(booking));
    }
}
upNumChooseRoom = (avail,ma,room_name) => {
    var foreignNum =  Number($('.foreign').val())
    var domesticNum =  Number($('.domestic').val())
    var quanInput = Number($(`#${ma}`).val())
    if (quanInput + 1 <= Number(avail)) {
        $(`#${ma}`).val(quanInput + 1)

        var booking = JSON.parse(localStorage.getItem('booking')) || []
        var booking_detail = booking.find(bd => bd.id == Number(ma))

        if (booking_detail == undefined) {
            var total_price = JSON.parse(localStorage.getItem('total_price'))
            var pr = calculate_price(ma)
            total_price += pr

            $('.total-payment').text(total_price)
            localStorage.setItem('total_price', JSON.stringify(total_price));

            booking.push({
                id: Number(ma),
                quantity: 1,
                price : pr,
                name: room_name,
                foreignNum: foreignNum,
                domesticNum: domesticNum
            })
        } else {
            var new_booking = booking.map(bd => {
                if (bd.id == Number(ma)) {
                    var total_price = JSON.parse(localStorage.getItem('total_price'))
                    var pr = calculate_price(ma)
                    total_price += pr

                    $('.total-payment').text(total_price)
                    localStorage.setItem('total_price', JSON.stringify(total_price));

                    bd.quantity +=1
                    bd.price = Number(pr) * bd.quantity
                }
                return bd
            })
        }
        localStorage.setItem('booking', JSON.stringify(booking));
    }
}
calculate_price = (ma) => {
    var searched_tiers = JSON.parse(localStorage.getItem('searched_tiers')) || []
    var tier = searched_tiers.find(bd => bd.ma == Number(ma))
    if (tier == undefined) return 0

    var foreignNum =  Number($('.foreign').val())
    var domesticNum =  Number($('.domestic').val())
    var price = Number(tier.base_price)
    if (foreignNum + domesticNum > Number(tier.normal_guest_count)) {
        price = Number(tier.surcharge)
    }
    if (foreignNum > 0) {
        price *= Number(tier.foreign_guest_surcharge)
    }
    return price

}
function saveCartItems() {
    const cartItems = [];
    const roomItems = document.querySelectorAll('.room-class-item');
    roomItems.forEach(item => {
        const roomName = item.querySelector('.room-class-item-name').textContent;
        const roomImage = item.querySelector('.room-class-item-thumbs img').getAttribute('src');
        const roomPrice = parseFloat(item.querySelector('.price').textContent);
        const roomQuantity = parseInt(item.querySelector('.quantity').value);

        if (roomQuantity > 0) {
            cartItems.push({ name: roomName, price: roomPrice * 1000, image: roomImage, quantity: roomQuantity });
        }
    });

    // Save cartItems array to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

