const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#courseMessage").animate({width:'toggle'},350);
};

//redirect
const redirect = (response) => {
    $("#courseMessage").animate({width:'hide'},350);
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};