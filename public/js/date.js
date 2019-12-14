$(document).ready(function() {
    $('.dislike-btn').hide();
    $('.like-btn').click(function() {
        const name = $(this).attr("id");
        $(this).hide();
        $(`button[value = ${name}]`).show();
        data = {
            "operation": "like",
            "name": name
        };
        $.ajax('http://localhost:3000/date', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function() { console.log('success');},
            error  : function() { console.log('error');}
        });
    });

    $('.dislike-btn').click(function() {
        const name = $(this).attr("value");
        $(this).hide();
        $(`button[id = ${name}]`).show();
        data = {
            "operation": "dislike",
            "name": name
        };
        $.ajax('http://localhost:3000/date', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function() { console.log('success');},
            error  : function() { console.log('error');}
        });
    });
});