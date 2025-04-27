/// <reference path="../howell.js/howell.js" />
/// <reference path="struct.js" />
/// <reference path="../howell.js/howell.convert.js" />
/// <reference path="BaseClient.js" />


(function (deviceId) {

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




function LogsClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/data_service/logs";

    var base = new BaseClient();

    this.User =
    {
        Operations: function (beginTime, endTime, userId, userOperationType, objectId, pageIndex, pageSize) {
            /// <signature>
            /// <summary>获取用户操作日志</summary>
            /// <param name='beginTime' type='DateTime'>开始时间</param>                
            /// <param name='endTime' type='DateTime'>结束时间</param>
            /// <param name='userId' type='String'>用户唯一标识符，多用户查询可以使用逗号分隔</param>
            /// <param name='userOperationType' type='UserOperationType'>用户操作类型</param>
            /// <param name='objectId' type='String'>操作对象唯一标识符</param>
            /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
            /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
            /// <returns type="UserOperationLogList">用户操作日志</returns> 
            /// </signature>
            var params = getParams(this.Operations, 0);
            if (!beginTime) {
                var begin = new Date();
                begin.setHours(0, 0, 0);
                beginTime = begin.toISOString();
                params["beginTime"] = beginTime;
            }
            if (!endTime) {
                var end = new Date();
                endTime = end.toISOString();
                params["endTime"] = endTime;
            }
            var result = base.Get(contract.user.operations(), params);
            return Convert(result, new UserOperationLogList());
        },
    };

    var contract =
    {
        user:
        {
            operations: function () {
                return baseUri + "/User/Operations";
            },
        },
    };
}
function UserOperationLog() {
    /// <signature>
    /// <summary>用户操作日志</summary>
    /// <field name='UserId' type='Id'>用户唯一标识符 N</field>
    /// <field name='Username' type='String'>用户名	N</field>
    /// <field name='UserOperationType' type='UserOperationType'>用户操作类型 N</field>
    /// <field name='Time' type='DateTime'>操作执行时间	N</field>
    /// <field name='ObjectId' type='String'>被操作的对象Id	Y</field>
    /// <field name='ObjectName' type='String'>被操作的对象名称	Y</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// <field name='RemoteClientInfo' type='String'>远程客户端信息	Y</field>
    /// <field name='RemoteClientType' type='String'>远程客户端类型	Y</field>
    /// </signature>

    this.UserId = "";
    this.Username = "";
    this.UserOperationType = UserOperationType.None;
    this.Time = new Date();
    this.ObjectId = "";
    this.ObjectName = "";
    this.Description = "";
    this.RemoteClientInfo = "";
    this.RemoteClientType = "";


    this.ObjectIdSpecified = false;
    this.ObjectNameSpecified = false;
    this.DescriptionSpecified = false;
    this.RemoteClientInfoSpecified = false;
    this.RemoteClientTypeSpecified = false;
}

function UserOperationLogList() {
    /// <signature>
    /// <summary>用户操作日志列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='UserOperationLog' type='UserOperationLog[]'>用户操作日志数组 Y</field>
    /// </signature>

    this.Page = new Page();
    this.UserOperationLog = new Array();

    this.PageSpecified = false;
    this.UserOperationLogSpecified = false;
}

function Page() {
    /// <signature>
    /// <summary>分页信息</summary>
    /// <field name='PageIndex' type='Int32'>页码 1.2.3 .....	N</field>
    /// <field name='PageSize' type='Int32'>分页大小	N</field>
    /// <field name='PageCount' type='Int32'>总页数	N</field>
    /// <field name='RecordCount' type='Int32'>当前页的记录数目	N</field>
    /// <field name='TotalRecordCount' type='Int32'>总记录数目	N</field>
    /// </signature>

    this.PageIndex = 0;
    this.PageSize = 0;
    this.PageCount = 0;
    this.RecordCount = 0;
    this.TotalRecordCount = 0;
}

//注意：1. 所有枚举类型在序列化为JSON后以字符串形式出现.
//      2. Flags枚举类型在序列化为JSON后以字符串形式出现，如果有多项则以逗号(,)分割

//用户操作类型
var UserOperationType = {
    //空
    None: "None",
    //用户登录
    Login: "Login",
    //用户注销
    Logout: "Logout",
    //预览视频
    RealPlay: "RealPlay",
    //回放视频
    VodPlay: "VodPlay",
    //下载视频
    Download: "Download",
    //云台控制
    PTZ: "PTZ",
    //解码器切换
    DecoderSwitch: "DecoderSwitch",
    //创建用户信息
    CreateUser: "CreateUser",
    //删除用户信息
    DeleteUser: "DeleteUser",
    //修改用户信息
    SetUser: "SetUser",
    //添加设备信息
    CreateDevice: "CreateDevice",
    //删除设备信息
    DeleteDevice: "DeleteDevice",
    //修改设备信息
    SetDevice: "SetDevice"
}


