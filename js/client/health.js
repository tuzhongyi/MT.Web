/// <reference path="../BaseClient.js" />



(function () {

    var hadScript =
    {
        httpService: "/js/howell.js/httpService.js",
        digest: "/js/howell.js/digest.js",
        base:"/js/client/BaseClient.js"
    };
    for (var id in hadScript) {
        if (!document.getElementById(id)) {
            loadJS(id, document.location.protocol + "//" + document.location.host + hadScript[id]);
        }
    }
})();

function HealthClient(host, port, cookieKey) {

    var base = new BaseClient(cookieKey);

    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/data_service/statistics";    
    var contract =
    {
        health: baseUri + "/Health",
        report:{
            fault: baseUri + "/Health/Faults/Reports",
            warning: baseUri + "/Health/Warnings/Reports",
        }
    }

    this.Health = function ()
    {
        return base.Get(contract.health);        
    }
    this.Report = {
        Fault: function (pageIndex, pageSize, faultType)
        {
            return base.Get(contract.report.fault, getParams(this.Fault));            
        },
        Warning: function (pageIndex, pageSize, faultType)
        {
            return base.Get(contract.report.warning, getParams(this.Warning));
        }
    }
}