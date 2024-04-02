$(document).ready(function() {

    //-----------Lay danh sach tinh thanh-------------
    const host = 'https://vapi.vnappmob.com/api/province/'
    var callAPI = (api) => {
        return axios.get(api)
            .then((response) => {
                console.log(response.data.results);
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



    //  ----------------- Show modal add guest form -----------------
    $(".add-guest-btn").click(function() {
        $(".overlay-add-guest").fadeIn();
        $(".add-guest-form").fadeIn();
    });

    $(".close-add-guest-form").click(function() {
        $(".overlay-add-guest").fadeOut();
        $(".add-guest-form").fadeOut();
    });

    //    --------------Tabs-----------------

})