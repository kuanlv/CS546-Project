$(function() {
    $("#username_error_message").hide();
    $("#email_error_message").hide();
    $("#password_error_message").hide();
    $("#confirmPassword_error_message").hide();
    $('#contactInfo_error_message').hide();
    $('#age_error_message').hide();

    let error_username = false;
    let error_email = false;
    let error_password = false;
    let error_confirmPassword = false;
    let error_age = false;
    let error_contactInfo = false;

    $("#username").focusout(function(){    
        check_username();
    });
    $("#email").focusout(function() {
        check_email();
    });
    $("#password").focusout(function() {
        check_password();
    });
    $("#confirmPassword").focusout(function() {
        check_confirmPassword();
    });
    $("#age").focusout(function() {
        check_age();
    });
    $("#contactInfo").focusout(function() {
        check_contactInfo();
    });

    function check_username() {
        var pattern = /^[a-zA-Z]*$/;
        let username = $("#username").val();
        if (pattern.test(username) && username.length > 2) {
           $("#username_error_message").hide();
           $("#username").css("border-bottom","2px solid #34F458");
           error_username = false;
        } else {
           $("#username_error_message").html("Should contain only Characters and at least three characters long");
           $("#username_error_message").show();
           $("#username").css("border-bottom","2px solid #F90A0A");
           error_username = true;
        }
    };

    function check_email() {
        var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $("#email").val();
        if (pattern.test(email) && email !== '') {
           $("#email_error_message").hide();
           $("#email").css("border-bottom","2px solid #34F458");
           error_email = false;
        } else {
           $("#email_error_message").html("Invalid Email");
           $("#email_error_message").show();
           $("#email").css("border-bottom","2px solid #F90A0A");
           error_email = true;
        }
    };

    function check_password() {
        let password_length = $("#password").val().length;
        if (password_length < 6) {
           $("#password_error_message").html("password should be at least 6 Characters");
           $("#password_error_message").show();
           $("#password").css("border-bottom","2px solid #F90A0A");
           error_password = true;
        } else {
           $("#password_error_message").hide();
           $("#password").css("border-bottom","2px solid #34F458");
           error_password = false;
        }
    };

    function check_confirmPassword() {
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        if (password !== confirmPassword) {
           $("#confirmPassword_error_message").html("Passwords Did not Matched");
           $("#confirmPassword_error_message").show();
           $("#confirmPassword").css("border-bottom","2px solid #F90A0A");
           error_retype_password = true;
        } else {
           $("#confirmPassword_error_message").hide();
           $("#confirmPassword").css("border-bottom","2px solid #34F458");
           error_confirmPassword = false;
        }
    };

    function check_age() {
        let ageinfo = $('#age').val();
        let age = Number(ageinfo);
        if (!Number.isInteger(age)) {
            $('#age_error_message').html("Age must be an integer");
            $('#age_error_message').show();
            $("#age").css("border-bottom","2px solid #F90A0A");
            error_age = true;
        } else if (age < 18 || age > 120) {
            $('#age_error_message').html("Invalid age !");
            $('#age_error_message').show();
            $("#age").css("border-bottom","2px solid #F90A0A");
            error_age = true;
        } else {
            $("#age_error_message").hide();
            $("#age").css("border-bottom","2px solid #34F458");
            error_age = false;
         }
    };

    function check_contactInfo() {
        let phone_number = $('#contactInfo').val();
        let pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
        if (pattern.test(phone_number)) {
            $("#contactInfo_error_message").hide();
            $("#contactInfo").css("border-bottom","2px solid #34F458");
            error_contactInfo = false;
        } else {
            $('#contactInfo_error_message').html("Invalid phone number pattern !");
            $('#contactInfo_error_message').show();
            $("#contactInfo").css("border-bottom","2px solid #F90A0A");
            error_contactInfo = true;
        }
    }

    $('#signup-form').submit(function(e) {
        check_username();
        check_password();
        check_confirmPassword();
        check_email();
        check_contactInfo();
        if (error_username || error_password || error_confirmPassword || error_email || error_age || error_contactInfo) {
            e.preventDefault();
            alert("Correct the form please");
        } else {
            $('#signup-form').submit();
        }
    })
})