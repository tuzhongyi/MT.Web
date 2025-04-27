/// <reference path="../client/struct.js" />

var ContentType = {
    Json: "application/json; charset=utf-8",
    Html: "text/html",
    Stream: "application/octet-stream",
    Xml: "text/xml"
}
var HttpMethod =
{
    Post: "POST",
    Delete: "DELETE",
    Put: "PUT",
    Get: "GET"
}
function getHttpRequest() {
    //    var xhr = new XMLHttpRequest();
    //    if ("open" in xhr) {
    //        xhr.withCredentials
    //    } else if (typeof XDomainRequest != "undefined") {
    //        // 检测是否XDomainRequest可用
    //        xhr = new XDomainRequest();
    //    } else {
    //        // 看起来CORS根本不被支持
    //        xhr = null;
    //    }
    var xhr = null;

    if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {// code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }


    return xhr;
}

//function Browser() {
//    this.Chrome = navigator.userAgent.toLowerCase().indexOf("chrome") > 0;

//    
//    
//}


function HttpService(contentType) {
    var xmlHttp = getHttpRequest();

    //function setParams(url, index, args) {
    //    if (args > index) {
    //        url += "?";
    //        for (var i = index; i < args.length; i++) {
    //            if (i > index)
    //                url += "&";
    //            url += args[i];
    //        }
    //    }
    //    return url;
    //}

    function setParams(url, param) {
        var i = 0;
        for (var p in param) {
            url += i++ > 0 ? "&" : "?";
            url += p + "=" + param[p];
        }

        url += i == 0 ? "?" : "&";
        url += "r=" + Math.random();

        return url;
    }


    function setContentHeader() {
        for (var item in m_Headers) {
            xmlHttp.setRequestHeader(item.replace("_", "-"), m_Headers[item]);
        }
        //try {
        //    xmlHttp.withCredentials = true;
        //} catch (e) { }
    }
    function showMsg(msg) {
        var inner = document.getElementById("inner");
        inner.innerHTML += (msg + "<br/>");
    }
    var i = 0;
    function pushEvent() {
        var inner = document.getElementById("inner");
        inner.innerHTML += (++i + "<br/>" + xmlHttp.responseText);
    }
    var m_Headers =
    {
        Accept: "application/json, text/javascript, */*; q=0.01",
        If_Modified_Since: 0,
        Cache_Control: "no-cache"
    }

    this.ContentType = contentType;


    this.getResponseHeaders = function () {
        return xmlHttp.getAllResponseHeaders();
    }
    this.getResponseHeaders = function (key) {
        return xmlHttp.getResponseHeader(key);
    }
    this.addHeaders = function (key, value) {
        m_Headers[key] = value;
    }
    this.removeHeaders = function (key) {
        delete m_Headers[key];
    }


    this.httpGet = function (url, param) {
        url = setParams(url, param);
        try {
            if (!xmlHttp)
                xmlHttp = getHttpRequest();


            //if (m_Headers.Cookie) {
            //    xmlHttp.open("OPTIONS", url, false);
            //    setContentHeader();
            //    xmlHttp.setRequestHeader("Set-Cookie",m_Headers.Cookie);
            //    xmlHttp.withCredentials = true;
            //    xmlHttp.send();
            //    if (xmlHttp.status != 200)
            //        return;
            //}



            xmlHttp.open(HttpMethod.Get, url, false);

            setContentHeader();

            xmlHttp.send();
            if (xmlHttp.status == 200) return xmlHttp.responseText;
            throw new howellException(xmlHttp.status, xmlHttp.statusText, xmlHttp.responseText);
        } finally {
        }
    }
    this.servicePushClient = function (url, param) {
        if (validateParam(param)) {
            url += ("?" + param);
        }
        xmlHttp.multipart = true;
        xmlHttp.open(HttpMethod.Get, url, false);
        xmlHttp.onload = showMsg;
        //        xmlHttp.onreadystatechange = function () {
        //            var inner = document.getElementById("inner");
        //            inner.innerHTML += (xmlHttp.status+ ":"+xmlHttp.responseText + "<br/>");
        //        }
        xmlHttp.send("");


    }


    this.httpPost = function (url, data, args) {
        url = setParams(url, args);
        try {
            if (!xmlHttp)
                xmlHttp = getHttpRequest();

            xmlHttp.open(HttpMethod.Post, url, false);
            setContentHeader();
            if (this.ContentType != null)
                xmlHttp.setRequestHeader("Content-Type", this.ContentType);

            xmlHttp.send(data);

            if (xmlHttp.status == 200) return xmlHttp.responseText;
            throw new howellException(xmlHttp.status, xmlHttp.statusText, xmlHttp.responseText);
        } finally {
            //xmlHttp.abort();
        }
    }

    this.httpPut = function (url, data, args) {
        url = setParams(url, args);
        try {
            if (!xmlHttp)
                xmlHttp = getHttpRequest();

            xmlHttp.open(HttpMethod.Put, url, false);
            setContentHeader();
            if (this.ContentType != null)
                xmlHttp.setRequestHeader("Content-Type", this.ContentType);

            xmlHttp.send(data);

            if (xmlHttp.status == 200) return xmlHttp.responseText;
            throw new howellException(xmlHttp.status, xmlHttp.statusText, xmlHttp.responseText);
        } finally {
            //xmlHttp.abort();
        }

    }

    this.httpDelete = function (url, param) {
        url = setParams(url, param);
        if (!xmlHttp)
            xmlHttp = getHttpRequest();
        xmlHttp.open(HttpMethod.Delete, url, false);
        setContentHeader();
        xmlHttp.send(null);
        if (xmlHttp.status == 200) return xmlHttp.responseText;
        throw new howellException(xmlHttp.status, xmlHttp.statusText, xmlHttp.responseText);
    }

}
function howellException(code, message, text) {
    this.Number = code;
    this.Message = message;
    this.Description = text;
}