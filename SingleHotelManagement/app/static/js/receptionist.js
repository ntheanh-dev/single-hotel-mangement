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


});