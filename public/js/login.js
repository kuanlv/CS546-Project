$(function() {
    $('#username_error_message').hide();
    let error_username = false;
    let error_password = false;

    $("#username").focusout(function(){
        check_username();
    });
    
    $("#password").focusout(function() {
        check_password();
    });

    function check_username() {
        var pattern = /^[a-zA-Z]*$/;
        let username = $("#username").val();
        if (pattern.test(username) && username.length > 2) {
           $("#username_error_message").hide();
           $("#username").css("border-bottom","2px solid #34F458");
           error_username = false;
        } else {
           $("#username_error_message").html("Should contain only characters and at least three characters long");
           $("#username_error_message").show();
           $("#username").css("border-bottom","2px solid #F90A0A");
           error_username = true;
        }
    };

    function check_password() {
        let password_length = $("#password").val().length;
        if (password_length < 6) {
           $("#password_error_message").html("password should be at least 6 characters");
           $("#password_error_message").show();
           $("#password").css("border-bottom","2px solid #F90A0A");
           error_password = true;
        } else {
           $("#password_error_message").hide();
           $("#password").css("border-bottom","2px solid #34F458");
           error_password = false;
        }
    };

    $('#login-form').submit(function(e) {
        check_username();
        check_password();
        if (error_password || error_username) {
            e.preventDefault();
            alert("Please fill out correct username and password");
        } else {
            $('#login-form').submit();
        }
    })
})