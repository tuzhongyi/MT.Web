function ADCClient(host, port) {

    var baseUri = "ws://" + host + (port ? ":" + port : "") + "/howell/ver10/ADC";


    var timeKey = "start_time";

    var beginTime;
    var interval = 1000 * 60;
    var entity = this;
    var ws = new WebSocketServer(baseUri);

    this.NotificationEvent = null;
    this.Notice = null;


    this.Connection = function (session, username) {
        ws.Open(baseUri);
        var req = new WebSocketRequest();
        req.Message = RequestMessage.Connection;
        req.Request = new LoginRequest();
        req.Request.Session = session;
        req.Request.Username = username

        ws.Send(JSONstringify(req));
        return true;
    }
    ws.OnMessage = function (e) {
        Analyze(e.data);
    }
    ws.OnClose = function () { };
    ws.OnError = function () { }


    function KeepAliveStart() {
        beginTime = new Date();
        Heartbeat();
    }

    function Heartbeat() {
        var req = new WebSocketRequest();
        req.Message = RequestMessage.Heart;
        req.Request = new KeepAliveRequest();
        var now = new Date();
        var time = now.getTime() - beginTime.getTime();
        req.Request.KeepAlive.SystemUpTime = parseInt(time / 1000);
        ws.Send(JSONstringify(req));
    }


    function Analyze(data) {
        var res = JSON.parse(data);

        switch (res.Message) {
            case ResponseMessage.Heart:
                setTimeout(Heartbeat, interval);
                break;
            case RequestMessage.Event:
                if (entity.NotificationEvent)
                    entity.NotificationEvent(res.Request.EventNotify);
                break;
            case ResponseMessage.Connection:
                KeepAliveStart();
                break;
            case RequestMessage.Notify:
                if (entity.Notice)
                    entity.Notice(res.Request.Notice);
                break;
            default:
                break;

        }
    }


}

var RequestMessage = {
    Connection: 0x0001, //报警推送连接协议	0x0001
    Heart: 0x0002, //报警推送心跳协议	0x0002
    Event: 0x0003, //ADC事件递交协议	0x0003
    Notify: 0x0004//ADC信息通知协议	0x0004
}

var ResponseMessage = {
    Connection: 0x8001,
    Heart: 0x8002,
    Event: 0x8003,
    Notify: 0x8004
}



var Result = {
    OK: 0,  //成功
    RegistrationCodeIllegal: 1,  //非法的注册码
    RegistrationCodeMismatched: 2,  //注册码与设备不匹配
    RegistrationCodeUsed: 3,  //注册码已被使用
    NotImplement: 4,  //功能未实现
    NotSupported: 5,  //不支持的操作
    Offline: 6,  //设备下线
    SessionExpired: 7,  //会话已过期
    Busy: 8,  //服务繁忙请稍后再试
    NotFound: 9,  //资源不存在
    InvalidParameter: 10,  //非法的操作类型
    MobileTelFormat: 11,  //手机号码格式异常
    EmailFormat: 12,  //邮件格式异常
    UsernameFormat: 13,  //用户名格式异常
    NotSupportedApplicationId: 14,  //不支持的应用程序Id
    PasswordFormat: 15,  //密码格式异常
    UsernameExisted: 16,  //用户名已注册
    EmailExisted: 17,  //邮件已注册
    UsernamePasswordError: 18,  //用户名或密码错误
    ServerInternal: 253,  //服务器内部错误
    Timeout: 254,  //超时异常
    Unknown: 255  //未知的错误

}
var EventType = {
    None: "None",    //保留
    IO: "IO",    //IO输入，当IO输入状态改变时触发 （单元模块类型 摄像机/视频源）
    VMD: "VMD",    //运动侦测，当视频中有运动物体时触发 （单元模块类型 摄像机/视频源）
    Videoloss: "Videoloss",    //视频信号丢失，当视频输入信号中断时触发 （单元模块类型 摄像机/视频源）
    IRCut: "IRCut",    //红外滤光片切换模式ON/OFF
    DayNight: "DayNight",    //彩色转黑白模式ON/OFF
    RecordState: "RecordState",    //录像状态 ON/OFF
    StorageMediumFailure: "StorageMediumFailure",    //存储介质丢失或损坏，当硬盘无法识别或由于读写失败过于频繁而被卸载时触发 （单元模块类型 存储介质）
    RAIDFailure: "RAIDFailure",    //创建RAID(磁盘冗余阵列)失败（单元模块类型 存储介质）
    RecordingFailure: "RecordingFailure",    //录像状态异常，指定的视频源处于录像状态时无法正常录像 （单元模块类型 摄像机/视频源）
    BadVideo: "BadVideo",    //不正常的视频，当视频源有干扰或扭曲时触发 （单元模块类型 摄像机/视频源）
    POS: "POS",    //非法的销售点 （单元模块类型 设备本身）
    FanFailure: "FanFailure",    //风扇异常 （单元模块类型 设备本身）
    CpuUsage: "CpuUsage",    //CPU使用率异常，当CPU的使用率超过指定阀值时触发（单元模块类型 设备本身）
    MemoryUsage: "MemoryUsage",    //内存使用率异常，当Memory的使用率超过指定阀值时触发（单元模块类型 设备本身）
    Temperature: "Temperature",    //温度异常，当温度超过指定阀值时触发（单元模块类型 设备本身）
    Pressure: "Pressure",    //压力异常，当压力超过指定阀值时触发（单元模块类型 设备本身）
    Voltage: "Voltage",    //电压异常，当电压超出指定范围时触发（单元模块类型 设备本身）
    MaximumConnections: "MaximumConnections",    //超出视频连接上限, 当视频连接数已达上限时又有新的视频请求连接时触发（单元模块类型 摄像机/视频源）
    NetworkBitrate: "NetworkBitrate",    //网络码率异常，当网口码流超过指定阀值时触发（单元模块类型 网络接口）
    VideoBitrate: "VideoBitrate",    //视频码率异常，当视频码率低于或超过指定阀值时触发（单元模块类型 摄像机/视频源）
    Squint: "Squint",    //聚焦模糊
    VideoTurned: "VideoTurned",    //视频转动
    IntrusionArea: "IntrusionArea",   //区域入侵 （单元模块类型 摄像机/视频源）
    IntrusionLine: "IntrusionLine",   //越线 （单元模块类型 摄像机/视频源）
    Loitering: "Loitering",   //滞留/徘徊 （单元模块类型 摄像机/视频源）
    StationaryInserted: "StationaryInserted",   //抛弃物 （单元模块类型 摄像机/视频源）
    StationaryRemoved: "StationaryRemoved",   //物品遗失 （单元模块类型 摄像机/视频源）
    ReversedIntrustion: "ReversedIntrustion",   //逆向入侵 （单元模块类型 摄像机/视频源）
    Online: "Online",
    Offline: "Offline",
    Intrusion: "Intrusion",
    Tripwire: "Tripwire",
    Unattended: "Unattended",
    Removal: "Removal",
    Retrograde: "Retrograde",
    //Counting: "Counting",
    //Crowed: "Crowed"
    FaceDetect: "FaceDetect",
    FaceMatch: "FaceMatch"
}


var EventState = {
    Inactive: "Inactive",    //当不符合事件触发条件时的状态
    Active: "Active"    //当符合事件触发条件时的状态
}




function LoginRequest() {
    /// <signature>
    /// <summary>报警推送心跳请求</summary>
    /// <field name='Session' type='String'>用户登录返回的会话</field>
    /// <field name='Username' type='String'>用户名</field>
    /// </signature>
    this.Session = "";
    this.Username = "";
}

function KeepAlive() {
    /// <signature>
    /// <summary>报警推送心跳请求</summary>
    /// <field name='SystemUpTime' type='Int64'>应用程序运行时间</field>
    /// <field name='Longitude' type='Double'>经度</field>
    /// <field name='Latitude' type='Double'>纬度</field>
    /// </signature>

    this.SystemUpTime = 0;
    //this.Longitude = 0.0;
    //this.LongitudeSpecified = false;
    //this.Latitude = 0.0;
    //this.LatitudeSpecified = false;
}
function KeepAliveRequest() {
    this.KeepAlive = new KeepAlive();
}

function KeepAliveResponse() {
    /// <signature>
    /// <summary>报警推送心跳响应</summary>
    /// <field name='Time' type='Date'>ADC服务器时间</field>
    /// <field name='HeartbeatInterval' type='Int32'>心跳间隔 单位：秒 默认：60</field>
    /// </signature>
    this.Time = new Date();
    this.HeartbeatInterval = 0;
}
function EventNotify() {
    /// <signature>
    /// <summary>事件递交</summary>
    /// <field name='Id' type='String'>触发组件唯一标识符</field>
    /// <field name='Name' type='String'>触发组件名称</field>
    /// <field name='EventType' type='EventType'>事件类型</field>
    /// <field name='EventState' type='EventState'>事件状态</field>
    /// <field name='Time' type='DateTime'>事件时间</field>
    /// <field name='Path' type='String'>事件路径</field>
    /// <field name='Description' type='String'>描述信息</field>
    /// <field name='ExtendInformation' type='String'>用于以后的刷卡信息等数据的扩展</field>
    /// <field name='EventId' type='String'>事件唯一标识符</field>
    /// <field name='ImageUrl' type='String[]'>联动抓图的图片访问地址</field>
    /// </signature>


    this.Id = "";
    this.Name = "";
    this.EventType = EventType.IO;
    this.EventState = EventState.Active;
    this.Time = new Date();
    this.Path = "";

    this.Description = "";
    this.ExtendInformation = "";
    this.EventId = "";
    this.ImageUrl = new Array();
    this.PathSpecified = false;
    this.DescriptionSpecified = false;
    this.ExtendInformationSpecified = false;
    this.EventIdSpecified = false;
    this.ImageUrlSpecified = false;

}

function Notice() {
    /// <signature>
    /// <summary>通知递交</summary>
    /// <field name='Id' type='String'>通知唯一标识符	N	</field>
    /// <field name='Message' type='String'>通知信息	N	</field>
    /// <field name='Classification' type='NoticeClassification'>通知分类	N	</field>
    /// <field name='Time' type='DateTime'>创建时间	N	</field>
    /// <field name='Status' type='NoticeStatusType'>通知状态	N	</field>
    /// <field name='Sender' type='String'>通知来源，如：网关设备的唯一标识符,某一个用户等等.	N	</field>
    /// <field name='ComponentId' type='String'>组件唯一标识符	Y	</field>
    /// <field name='ComponentName' type='String'>组件名称	Y	</field>
    /// <field name='NoticeType' type='NoticeType'>通知类型 	N	</field>
    /// </signature>
    this.Id = "";
    this.Message = "";
    this.Classification = NoticeClassification.None;
    this.Time = new Date();
    this.Status = NoticeStatusType.Unread;
    this.Sender = "";
    this.ComponentId = "";
    this.ComponentName = "";
    this.NoticeType = NoticeType.None;
}

var NoticeClassification = {
    None: "None", //未知/无	0
    Emergency: "Emergency", //紧急情况	1
    Warning: "Warning", //警告	2
    Info: "Info"//信息	3

}
var NoticeStatusType = {
    Unread: "Unread", //未读	0
    Read: "Read" //已读	1
}

var NoticeType = {
    None: "None", //未知/无	0
    AlertProcess: "AlertProcess"//报警处理	1
}