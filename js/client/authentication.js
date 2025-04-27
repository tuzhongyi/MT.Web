/// <reference path="../howell.js/howell.js" />
/// <reference path="../BaseClient.js" />
/// <reference path="../enum.js" />
/// <reference path="../howell.js" />
/// <reference path="../struct.js" />
/// <reference path="../../howell.js/guid.js" />
/// <reference path="../../howell.js" />
/// <reference path="../../jquery/jquery-3.6.0.min.js" />
/// <reference path="../../md5.js" />
/// <reference path="../../howell.js/httpService.js" />
/// <reference path="../../howell.js/howell.js" />
/// <reference path="../../imported.js" />
/// <reference path="BaseClient.js" />





(function () {

  var hadScript =
  {
    httpService: "/js/howell.js/httpService.js",
    convert: "/js/howell.js/howell.convert.js",
    BaseClient: "/js/client/BaseClient.js"
  };
  for (var id in hadScript) {
    if (!document.getElementById(id)) {
      loadJS(id, document.location.protocol + "//" + document.location.host + hadScript[id]);
    }
  }
})();

function AuthenticationClient (host, port, cookieKey) {

  var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/user_authentication";
  var contract =
  {
    varsion: baseUri + "System/Version",
    authentication: {
      nonce: baseUri + "/Authentication/Nonce",
      authenticate: baseUri + "/Authentication/Authenticate",
      methodValidate: baseUri + "/Authentication/MethodValidate",
      teardown: baseUri + "/Authentication/Teardown",
      activation: baseUri + "/Activation/Key"
    }
  }

  var service = new HttpService();
  service.ContentType = ContentType.Json;

  var howell_cookie = "howell_cookie";






  function getNonce (username) {
    /// <signature>
    /// <summary>获取Nonce</summary>
    /// <param name='username' type='String' >用户名</param>
    /// <returns type='String'>Nonce</returns>
    /// </signature>
    var response = service.httpGet(contract.authentication.nonce, getParams(getNonce, 0));
    return Convert(JSONDeserialization(response), new ServerNonce());
  }


  function getClientCredential (username, password, nonce, domain, md5) {
    var credential = new ClientCredential();
    credential.UserName = username;
    credential.Nonce = nonce;
    credential.Domain = domain;
    credential.ClientNonce = Guid.NewGuid().ToString("N");
    credential.SetVerifySession(username, password, md5);
    return credential;
  }

  //var _IsActived = false;
  //this.IsActived;

  //this.__defineGetter__("IsActived", function () {
  //    try {
  //        getNonce("howell")
  //        _IsActived = true;
  //    } catch (e) {
  //        if (e.number == 403)
  //            _IsActived = false;
  //    }
  //    return _IsActived;
  //});
  //this.__defineSetter__("IsActived", function (value) {
  //    throw { message: "read only" };        
  //});
  var _IsActived = false;
  this.IsActived = function () {
    //try {
    //    getNonce("howell")
    //    _IsActived = true;
    //} catch (e) {
    //    if (e.number == 403)
    //        _IsActived = false;
    //}
    _IsActived = false;
    var activedInfo = this.getExpiredInfo();
    if (activedInfo && activedInfo.IsExpired == false)
      _IsActived = true;
    return _IsActived;
  }


  this.getVersion = function () {
    /// <signature>
    /// <summary>获取版本信息</summary>
    /// <returns type='String'>版本信息</returns>
    /// </signature>
    return httpGet(contract.version);
  };

  this.load_auto = function (page) {
    var pid = getCookie("pid");
    var username = getCookie("username");
    if (pid && username) {
      return this.login(username, pid, true, true, page);
    }
    return false;
  }

  this.login = function (username, password, auto, md5, page) {
    /// <signature>
    /// <summary>登录</summary>
    /// <param name='username' type='String' >用户名</param>
    /// <param name='password' type='String' >密码</param>
    /// <returns type='String'>是否成功</returns>
    /// </signature>

    var nonce = getNonce(username);
    var credential = getClientCredential(username, password, nonce.Nonce, nonce.Domain, md5);
    var json = JSONstringify(credential);
    var response = service.httpPost(contract.authentication.authenticate, json);
    var fault = response ? JSONDeserialization(response) : null;
    if (fault && fault.FaultCode == 0) {
      var pid = null;
      if (auto && !md5)
        pid = hex_md5(password).toString().toLowerCase();
      Cookie.save(username, fault.Id, credential.Domain, credential.VerifySession, nonce.UserId, pid, page)
      return true;
    }



    throw new howellException(fault.FaultCode, fault.FaultReason, fault.Exception);
  }

  this.logout = function () {
    var username = getCookie("username");
    var sid = getCookie("sid");

    var t = new TeardownCredential();
    t.UserName = username;
    t.SessionId = sid;
    var response = service.httpPost(contract.authentication.teardown, JSONstringify(t));
    var fault = response ? JSONDeserialization(response) : null;
    return fault && fault.FaultCode == 0;
  }

  this.Activation = function () {
    return contract.authentication.activation;
  }
  this.getExpiredInfo = function () {
    var url = this.Activation();
    var info = null;
    try {
      xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", url, false);
      xmlHttp.setRequestHeader("Content-Type", "application/octet-stream");
      xmlHttp.send();
      if (xmlHttp.status == 200)
        return xmlHttp.responseText ? JSONDeserialization(xmlHttp.responseText) : null;
      throw new howellException(xmlHttp.status, xmlHttp.statusText, xmlHttp.responseText);
    } finally {

    }
  }
}
//AuthenticationClient.prototype = {
//    get IsActived() {
//        return this._IsActived;
//    },
//    set IsActived(val) {
//        this._IsActived = val;
//    }
//}