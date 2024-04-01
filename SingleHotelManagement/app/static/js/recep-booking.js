$(document).ready(function () {
        $(".add-guest-btn").click(function () {
            $(".overlay-add-guest").fadeIn();
            $(".add-guest-form").fadeIn();
        });

        $(".close-add-guest-form").click(function () {
            $(".overlay-add-guest").fadeOut();
            $(".add-guest-form").fadeOut();
        });
    });