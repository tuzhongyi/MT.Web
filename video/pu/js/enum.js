///<var>云台方向控制</var>
var PTZDirection = {
    /// <field type='String'>停止	0</field>
    Stop: "Stop",
    /// <field type='String'>上	1</field>
    Up: "Up",
    /// <field type='String'>下	2</field>
    Down: "Down",
    /// <field type='String'>左	3</field>
    Left: "Left",
    /// <field type='String'>右	4</field>
    Right: "Right"
}
///<var>镜头控制</var>
var PTZLens = {
    /// <field type='String'>停止	0</field>
    Stop: "Stop",
    /// <field type='String'>光圈开	1</field>
    IrisOpen: "IrisOpen",
    /// <field type='String'>光圈关	2</field>
    IrisClose: "IrisClose",
    /// <field type='String'>镜头拉远	3</field>
    ZoomTele: "ZoomTele",
    /// <field type='String'>镜头拉近	4</field>
    ZoomWide: "ZoomWide",
    /// <field type='String'>聚焦变远	5</field>
    FocusFar: "FocusFar",
    /// <field type='String'>聚焦变近	6</field>
    FocusNear: "FocusNear"
}

function Uri(uri) {
    /// <signature>
    /// <summary>网络连接字符串</summary>
    /// <field name='Origin' type='String'>原始 URI 字符串。</field>
    /// <field name='AbsoluteUri' type='String'>绝对 URI。</field>
    /// <field name='Scheme' type='String'>方案名称</field>
    /// <field name='UserInfo' type='String'>用户名、密码或其他与指定 URI 关联的特定于用户的信息。</field>
    /// <field name='Authority' type='String'>域名系统 (DNS) 主机名或 IP 地址和端口号</field>
    /// <field name='Port' type='Int'>端口号</field>
    /// <field name='Host' type='String'>主机</field>
    /// <field name='PathAndQuery' type='String'>用问号 (?) 分隔的 AbsolutePath 和 Query</field>
    /// <field name='AbsolutePath' type='String'>URI 的绝对路径</field>
    /// <field name='Query' type='String'>URI 中包括的任何查询信息</field>
    /// <field name='Querys' type='Object'>URI 中包括的任何查询信息集合</field>
    /// <field name='Segments' type='String'>构成指定 URI 的路径段的数组</field>
    /// </signature>

    uri = uri.toString();
    if (uri.lastIndexOf("#") == uri.length - 1)
        uri = uri.substr(0, uri.length - 1);
    var temp;
    var schemeIndex = uri.indexOf(":") + 3;
    var userInfoIndex = uri.indexOf("@");
    var authorityIndex = uri.indexOf("/", schemeIndex);
    if (authorityIndex < 0)
        authorityIndex = uri.length;
    var queryIndex = uri.indexOf("?");

    this.Origin = uri;
    if (queryIndex > 0) {
        this.Origin = uri.substr(0, queryIndex);
    }
    this.AbsoluteUri = uri;
    this.Scheme = uri.substr(0, schemeIndex - 3);
    this.UserInfo = null;
    this.Authority = null;
    if (userInfoIndex > 0) {
        this.UserInfo = uri.substr(schemeIndex, userInfoIndex - schemeIndex);
        this.Authority = uri.substr(userInfoIndex + 1, authorityIndex - userInfoIndex - 1);
    } else {
        this.Authority = uri.substr(schemeIndex, authorityIndex - schemeIndex);
    }
    this.Port = 80;
    this.Host = this.Authority;
    if (this.Authority.indexOf(":") > 0) {
        temp = this.Authority.split(":");
        this.Host = temp[0];
        this.Port = temp[1];
    }

    this.PathAndQuery = uri.substr(authorityIndex);

    this.AbsolutePath = this.PathAndQuery;

    this.Query = "";
    this.Querys = {};
    if (queryIndex > 0) {
        temp = this.PathAndQuery.split("?");
        this.AbsolutePath = temp[0];
        this.Query = temp[1];
    }
    if (this.Query) {
        var items = this.Query.split("&");
        for (var i = 0; i < items.length; i++) {
            var index = items[i].indexOf("=");
            this.Querys[items[i].substr(0, index)] = items[i].substr(index + 1);
        }
    }


    this.Segments = null;
    if (this.AbsolutePath != "") {
        this.Segments = this.AbsolutePath.split("/");
    }
}
Uri.prototype.toString = function () {
    var param = "";
    if (this.Querys) {
        var i = 0;
        for (var q in this.Querys) {
            if (i == 0)
                param = "?";
            if (i++ > 0)
                param += "&";
            param += (q + "=" + this.Querys[q]);
        }
    }

    var result = this.Scheme + "://";
    if (this.UserInfo)
        result += this.UserInfo + "@";
    result += this.Host;
    if (this.Origin.indexOf(":", 6) > 0)
        result += ":" + this.Port;

    result += this.AbsolutePath + param;
    return result;
    //return this.Origin + param;
}

function Id(value) {
    function createSystemId(v) {
        var result = new SystemId();
        result.CountryId = v.substr(0, 2);
        result.ProvinceId = v.substr(2, 2);
        result.CityId = v.substr(4, 2);
        result.CountyId = v.substr(6, 2);
        return result;
    }
    function createModuleId(v) {
        var result = new ModuleId();
        result.Type = v.substr(0, 2);
        result.Area = v.substr(2, 2);
        result.No = v.substr(4, 4);
        return result;
    }
    function addZero(size) {
        var result = "";
        for (var i = 0; i < size; i++) {
            result += "0";
        }
        return result;
    }
    this.Value = value;
    this.SystemId = createSystemId(value);
    this.TypeId = value.substr(8, 2);
    this.ProjectId = value.substr(10, 7);
    this.DeviceId = value.substr(17, 6);
    this.NetworkId = value.substr(23, 1);
    this.ModuleId = createModuleId(value.substr(24));

    this.getSystemId = function (zero) {
        var systemId = this.SystemId.CountryId + this.SystemId.ProvinceId + this.SystemId.CityId + this.SystemId.CountyId;
        if (!zero)
            return systemId + addZero(24);
        return systemId;
    }
    this.getTypeId = function () {
        return this.getSystemId(true) + this.TypeId + addZero(22);
    }
    this.getProjectId = function () {
        return this.getSystemId(true) + this.TypeId + this.ProjectId + addZero(15);
    }
    this.getDeviceId = function () {
        return this.getSystemId(true) + this.TypeId + this.ProjectId + this.DeviceId + addZero(9);
    }
    this.getNetworkId = function () {
        return this.getSystemId(true) + this.TypeId + this.ProjectId + this.DeviceId + this.NetworkId + addZero(8);
    }
}
function ModuleId() {
    this.Type = "";
    this.Area = "";
    this.No = "";
}
ModuleId.prototype.toString = function () {
    return this.Type + this.Area + this.No;
}
function SystemId() {
    this.CountryId = "";
    this.ProvinceId = "";
    this.CityId = "";
    this.CountyId = "";
}
SystemId.prototype.toString = function () {
    return this.CountryId + this.ProvinceId + this.CityId + this.CountyId;
}

function JSONstringify(obj) {
    obj = JSONSerialization(obj);
    return JSON.stringify(obj);
}

function JSONSerialization(obj) {
    for (var i in obj) {
        if (i.indexOf("Fixed") > 0) {
            var key = i.substr(0, i.indexOf("Fixed"));
            delete obj[key];
            delete obj[i];
        }
        else if (i.indexOf("Specified") > 0) {
            if (!obj[i]) {
                var key = i.substr(0, i.indexOf("Specified"));
                delete obj[key];
            }
            delete obj[i];
        }
        if (is.Object(obj[i])) {
            obj[i] = JSONSerialization(obj[i]);
        }
        if (is.Array(obj[i])) {
            for (var j = 0; j < obj[i].length; j++) {
                obj[i][j] = JSONSerialization(obj[i][j]);
            }
        }
    }
    return obj;
}
var is =
{
    types: ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
}

for (var i = 0, c; c = is.types[i++];) {
    is[c] = (function (type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) == "[object " + type + "]";
        }
    }
    )(c);
}