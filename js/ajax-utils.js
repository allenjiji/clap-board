(function (global) {
    var obj = {};
    var getRequestObject = function () {
        if (window.XMLHttpRequest) {
            var requestObject = new XMLHttpRequest();
            return requestObject;
        }
        else {
            global.alert("AJAX NOT SUPORTED!!");
            return (null);
        }

    };

    obj.sendRequest = function (url, responseHandler, isJson) {
        var request = getRequestObject();
        request.open('GET', url);
        request.onreadystatechange = function () {
            handleReponse(request, responseHandler, isJson);
                    };
        request.send();
    };

    function handleReponse(request, responseHandler, isJson) {

        if ((request.readystate == 4) || (request.status == 200)) {
            //console.log('successfully entered handleresponse');
            if (isJson == undefined) {
                isJson = true;
            }
            if (isJson) {
                responseHandler(JSON.parse(request.responseText));
            }
            else {
                responseHandler(request.responseText);
            }
        }
        else {
            console.log(request.readystate);
            console.log(request.status);



        }
    };

    global.$obj = obj;
})(window);