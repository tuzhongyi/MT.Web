/// <reference path="../howell.js/howell.js" />
/// <reference path="../md5.js" />
/// <reference path="../jquery/jquery-1.10.2.min.js" />
/// <reference path="struct.js" />
/// <reference path="../howell.js/httpService.js" />

{
    if (!this.host)
        this.host = document.location.protocol + "//" + document.location.host;
    if (!this.hex_md5 && $head) {
        try { $head.append($('<script src="' + host + '/js/md5.js"></script>')[0]); } catch (e) { }
    }
    if (!this.HttpService)
        try { $head.append($('<script src="' + host + '/js/howell.js/httpService.js"></script>')[0]); } catch (e) { }
}

this.Cookie = {
    save: function (username, sid, domain, session, uid, pid, page, servicePath) {
        var date = new Date();
        date.setMonth(date.getMonth() + 1)
        setCookie("username", username, servicePath, date);
        setCookie("sid", sid, servicePath);
        setCookie("domain", domain, servicePath);
        //setCookie("clientsession", session,servicePath);        
        setCookie("verifysession", session, servicePath);
        setCookie("uid", uid, servicePath, date);
        if (pid)
            setCookie("pid", pid, servicePath, date);
        if (page)
            setCookie("page", page, servicePath);
    },
    Session: {
        encipher: function (method, url, session) {
            return hex_md5(
                method + ":" +
                url + ":" +
                session
            ).toLowerCase();
        },
        set: function (method, url, servicePath) {
            var uri = new Uri(url);
            var index = uri.PathAndQuery.indexOf("?");
            var u = index < 0 ? uri.PathAndQuery : uri.PathAndQuery.substr(0, index)

            var session = getCookie("clientsession");


            //var date = new Date();
            //date.setSeconds(date.getSeconds() + 1);
            var path = uri.Scheme + "://" + uri.Authority;
            //setCookie("verifysession", this.encipher(method, u, session), path);
            setCookie("verifysession", session, servicePath);
        }
    }
}

function BaseClient() {
    var service = new HttpService(ContentType.Json);

    function getResponse(response) {
        return response ? (function () {
            var fault = JSONDeserialization(response);
            if (fault.FaultCode != 0) {
                var ex = new howellException(fault.FaultCode);
                if (fault.FaultReason)
                    ex.stack = fault.FaultReason;
                if (fault.Exception) {
                    ex.name = fault.Exception.ExceptionType;
                    ex.message = fault.Exception.Message;
                }
                throw ex;
            }
            if (fault.Id)
                return fault.Id;
            return true;
        })() : response;
    }
    this.Get = function (url, params) {
        //Cookie.Session.set(HttpMethod.Get, url);
        var response = service.httpGet(url, params);
        return response ? JSONDeserialization(response) : response;
    }
    this.PostStream = function (url, body, contentType, params) {
        var s = new HttpService(contentType);
        var response = s.httpPost(url, body, params);
        return getResponse(response);
    }
    this.Post = function (url, body, params) {
        //Cookie.Session.set(HttpMethod.Post, url);
        var response = service.httpPost(url, body ? JSONstringify(body) : null, params);
        return getResponse(response);
    }
    this.Options = function (option, url, body, params, contentType) {
        var response;
        switch (option) {
            case HttpMethod.Get:
                response = service.httpGet(url, params);
                break;
            case HttpMethod.Post:
                response = service.httpPost(url, body ? JSONstringify(body) : null, params);
                break;
            case HttpMethod.Put:
                response = service.httpPut(url, body ? JSONstringify(body) : null, params);
                break;
            case HttpMethod.Delete:
                response = service.httpDelete(url, params);
                break;
            case "PostStream":
                var s = new HttpService(contentType);
                response = s.httpPost(url, body, params);
                break;
            default:
                return false;
        }
        return response ? JSONDeserialization(response) : response;
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

function BaseAsynClient() {

    this.OnError = function (code, text, response) {

    }

    this.Timeout = 1 * 60 * 1000;

    this.Get = function (callback, error, url, params, timeout) {

        var service = new AsynHttpService(ContentType.Json);
        if (timeout)
            service.setTimeout(timeout)
        else
            service.setTimeout(this.Timeout);
        service.OnComplete = function (text, xml) {
            if (text)
                callback(JSONDeserialization(text))
            else
                callback(text);
        };
        service.OnAbort = function (text, xml) {
            if (error)
                error(0, "timeout")
            else
                this.OnError(0, "timeout");
        };
        if (error)
            service.OnError = error;
        else
            service.OnError = this.OnError;
        service.httpGet(url, params);
    }
    this.PostStream = function (callback, error, url, body, contentType, params) {
        var service = new AsynHttpService(contentType);
        service.setTimeout(this.Timeout);
        service.OnComplete = function (text, xml) {
            if (text)
                callback(JSONDeserialization(text))
            else
                callback(text);
        };
        if (error)
            service.OnError = error;
        else
            service.OnError = this.OnError;
        service.httpPost(url, body, params);
    }
    this.Post = function (callback, error, url, body, params) {
        var service = new AsynHttpService(ContentType.Json);
        service.setTimeout(this.Timeout);
        service.OnComplete = function (text, xml) {
            if (text)
                callback(JSONDeserialization(text))
            else
                callback(text);
        };

        if (error)
            service.OnError = error;
        else
            service.OnError = this.OnError;

        service.httpPost(url, body ? JSONstringify(body) : body, params);
    }
    this.Options = function (option, callback, error, url, body, params, timeout, contentType) {
        var response;
        var service = new AsynHttpService(ContentType.Json);
        if (timeout)
            service.setTimeout(timeout)
        else
            service.setTimeout(this.Timeout);
        
        service.OnComplete = function (text, xml) {
            if (text)
                callback(JSONDeserialization(text))
            else
                callback(text);
        };
        if (error)
            service.OnError = error;
        else
            service.OnError = this.OnError;

        switch (option) {
            case HttpMethod.Get:
                response = service.httpGet(url, params);
                break;
            case HttpMethod.Post:
                response = service.httpPost(url, body ? JSONstringify(body) : body, params);
                break;
            case HttpMethod.Put:
                response = service.httpPut(url, body ? JSONstringify(body) : body, params);
                break;
            case HttpMethod.Delete:
                response = service.httpDelete(url, params);
                break;
            case "PostStream":
                service = new AsynHttpService(contentType);
                service.setTimeout(this.Timeout);
                response = service.httpPost(url, body, params);
                service.OnComplete = function (text, xml) {
                    if (text)
                        callback(JSONDeserialization(text))
                    else
                        callback(text);
                };
                if (error)
                    service.OnError = error;
                else
                    service.OnError = this.OnError;
                break;
            default:
                return false;
        }
        return response ? JSONDeserialization(response) : response;
    }
    this.Put = function (callback, error, url, body, params) {
        var service = new AsynHttpService(ContentType.Json);
        service.setTimeout(this.Timeout);
        service.OnComplete = function (text, xml) {
            if (text)
                callback(JSONDeserialization(text))
            else
                callback(text);
        };
        if (error)
            service.OnError = error;
        else
            service.OnError = this.OnError;
        service.httpPut(url, body ? JSONstringify(body) : body, params);
    }
    this.Delete = function (callback, error, url, params) {
        var service = new AsynHttpService(ContentType.Json);
        service.setTimeout(this.Timeout);
        service.OnComplete = function (text, xml) {
            if (text)
                callback(JSONDeserialization(text))
            else
                callback(text);
        };
        if (error)
            service.OnError = error;
        else
            service.OnError = this.OnError;
        service.httpDelete(url, params);
    }
}


function getParams(fn, index, queryString) {
    if (!fn.arguments)
        return null;

    if (!index)
        index = 0;

    var names = getFuncArgNames(fn);
    var result = new Object();
    for (var i = index; i < fn.arguments.length; i++) {
        if (names[i] == "search") {
            result["key"] = "";
            result["value"] = "";
            var j = 0;
            for (var key in fn.arguments[i]) {
                if (j > 0) {
                    result["key"] += ",";
                    result["value"] += ",";
                }
                result["key"] += key;
                result["value"] += UTF8.fromChinese((fn.arguments[i][key]));
                j++;
            }
            continue;
        }
        if (fn.arguments[i] || fn.arguments[i] === false)
            result[names[i]] = fn.arguments[i];
        else if (queryString) {
            if (queryString[names[i] + "Fixed"]) {
                result[names[i]] = fn.arguments[i];
            }
        } else { }
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