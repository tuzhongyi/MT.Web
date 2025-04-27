/// <reference path="../howell.js/howell.js" />
/// <reference path="../md5.js" />
/// <reference path="../jquery/jquery-1.10.2.min.js" />
/// <reference path="struct.js" />
/// <reference path="../howell.js/httpService.js" />

{
    if(!this.host)
        this.host = document.location.protocol + "//" + document.location.host;
    if (!this.hex_md5 && $head)
    {
        try { $head.append($('<script src="' + host + '/js/md5.js"></script>')[0]); } catch (e) { }
    }
    if(!this.HttpService)
    try { $head.append($('<script src="' + host + '/js/howell.js/httpService.js"></script>')[0]); } catch (e) { }
}

this.Cookie = {
    save: function (username, sid, domain, session, uid) {
        setCookie("username", username);
        setCookie("sid", sid);
        setCookie("domain", domain);
        //setCookie("clientsession", session);        
        setCookie("verifysession", session);
        setCookie("uid", uid);
    },
    Session: {
        encipher: function (method, url, session) {
            return hex_md5(
                method + ":" +
                url + ":" +
                session
            ).toLowerCase();
        },
        set: function (method, url) {
            var uri = new Uri(url);
            var index = uri.PathAndQuery.indexOf("?");
            var u = index < 0 ? uri.PathAndQuery : uri.PathAndQuery.substr(0, index)
                        
            var session = getCookie("clientsession");
            

            //var date = new Date();
            //date.setSeconds(date.getSeconds() + 1);
            var path = uri.Scheme + "://" + uri.Authority;
            //setCookie("verifysession", this.encipher(method, u, session), path);
            setCookie("verifysession", session);
        }
    }
}

function BaseClient() {    
    var service = new HttpService(ContentType.Json);

    function getResponse(response) {
        return response ? (function () {
            var fault = JSONDeserialization(response);
            if (fault.FaultCode != 0)
                throw new howellException(fault.FaultCode, "code_" + fault.FaultCode);
            if (fault.Id)
                return fault.Id;
            return fault.FaultCode;
        })() : response;
    }
    this.Get = function (url, params) {
        //Cookie.Session.set(HttpMethod.Get, url);
        var response = service.httpGet(url, params);
        return response ? JSONDeserialization(response) : response;
    }
    this.PostStream = function (url, body, contentType,params) {
        var s = new HttpService(contentType);
        var response = s.httpPost(url, body, params);
        return getResponse(response);
    }
    this.Post = function (url, body, params) {
        //Cookie.Session.set(HttpMethod.Post, url);
        var response = service.httpPost(url, body ? JSONstringify(body) : null, params);
        return getResponse(response);
    }
    this.Put = function (url, body, params) {
        //Cookie.Session.set(HttpMethod.Put, url);
        var response = service.httpPut(url, body ? JSONstringify(body) : null, params);
        return getResponse(response);
    }
    this.Delete = function (url, params) {
        //Cookie.Session.set(HttpMethod.Delete, url);
        var response = service.httpDelete(url, params);
        return getResponse(response);
    }
}

function getParams(fn, index) {
    if (!fn.arguments)
        return null;

    if (!index)
        index = 0;

    var names = getFuncArgNames(fn);
    var result = new Object();
    for (var i = index; i < fn.arguments.length; i++) {
        if (fn.arguments[i] || fn.arguments[i] == false)
            result[names[i]] = fn.arguments[i];
    }
    return result;
}

function getFuncArgNames(fn) {
    var str = fn.toString();
    var start = str.indexOf('(') + 1;
    var end = str.indexOf(')');
    var params = str.substr(start, end - start).replace(/\s/g, '').split(",");

    return params;
}