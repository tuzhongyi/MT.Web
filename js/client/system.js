


(function () {

    var hadScript =
    {
        httpService: "/js/howell.js/httpService.js"
    };
    for (var id in hadScript) {
        if (!document.getElementById(id)) {
            loadJS(id, document.location.protocol + "//" + document.location.host + hadScript[id]);
        }
    }
})();

function SystemClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/data_service/system";
    var contract =
    {
        info: baseUri + "/Info",
        administrator: baseUri + "/Administrator"
    }

    var service = new HttpService();
    service.ContentType = ContentType.Json;
    this.getInfo = function () {
        var response = service.httpGet(contract.info);
        return response ? JSONDeserialization(response) : response;
    }

    this.setInfo = function (info) {
        var response = service.httpPost(contract.info, JSONstringify(info));
        return response ? JSONDeserialization(response) : response;
    }

    this.createAdmin = function (user) {
        var response = service.httpPost(contract.administrator,JSONstringify(user));
        return response ? JSONDeserialization(response) : response;
    }
    this.hadAdmin = function () {
        var response = service.httpGet(contract.administrator);
        if (response) {
            response = JSONDeserialization(response);
            if (response.FaultCode == 0)
                return true;
        }
        return false;
    }
}