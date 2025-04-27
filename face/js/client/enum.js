///<var>设备分类</var>
var DeviceClassification =
{
    /// <field type='String'></field> 
    None: "None",
    /// <field type='String'></field> 
    IPCamera: "IPCamera",
    /// <field type='String'></field> 
    DVS: "DVS",
    /// <field type='String'></field> 
    NVR: "NVR",
    /// <field type='String'></field> 
    DVR: "DVR",
    /// <field type='String'></field> 
    DigitalMatrix: "DigitalMatrix",
    /// <field type='String'></field> 
    HDDecoder: "HDDecoder",
    /// <field type='String'></field> 
    AnalogMatrix: "AnalogMatrix",
    /// <field type='String'></field> 
    VAS: "VAS",
    /// <field type='String'></field> 
    AAM: "AAM",
    /// <field type='String'></field> 
    NAM: "NAM",
    /// <field type='String'></field> 
    VPS: "VPS",
    /// <field type='String'></field> 
    IntegratedMatrix: "IntegratedMatrix",
    /// <field type='String'></field> 
    MatrixControlUnit: "MatrixControlUnit",
    /// <field type='String'></field> 
    StreamingMediaServer: "StreamingMediaServer",
    /// <field type='String'></field> 
    DecodingUnit: "DecodingUnit",
    /// <field type='String'></field> 
    EncodingUnit: "EncodingUnit",
    /// <field type='String'></field> 
    NVS: "NVS",
    /// <field type='String'></field> 
    DataServer: "DataServer",
    /// <field type='String'></field> 
    AcquisitionServer: "AcquisitionServer",
    /// <field type='String'></field> 
    SystemGateway: "SystemGateway",
    /// <field type='String'></field> 
    Camera: "Camera",
    /// <field type='String'></field> 
    UltrasonicProbe: "UltrasonicProbe",
    /// <field type='String'></field> 
    RFIDAntenna: "RFIDAntenna",
    /// <field type='String'></field> 
    Detector: "Detector",
    /// <field type='String'></field> 
    ExtensionUnit: "ExtensionUnit",
    /// <field type='String'></field> 
    PDCCamera: "PDCCamera",
    /// <field type='String'></field> 
    RadarCamera: "RadarCamera",
    /// <field type='String'></field> 
    ParkingDetector: "ParkingDetector",
    /// <field type='String'></field> 
    GuideScreen: "GuideScreen",
    /// <field type='String'></field> 
    FDCamera: "FDCamera",
    /// <field type='String'></field> 
    FDNVR: "FDNVR"
};

///<var>摄像机类型</var>
var CameraType =
{
    /// <field type='String'></field> 
    None: "None",
    /// <field type='String'></field> 
    Gun: "Gun",
    /// <field type='String'></field> 
    Ball: "Ball",
    /// <field type='String'></field> 
    HalfBall: "HalfBall",
    /// <field type='String'></field> 
    AIO: "AIO"
};

///<var>下线原因</var>
var TeardownReason =
{
    /// <field type='String'></field> 
    None: "None",
    /// <field type='String'></field> 
    Manual: "Manual",
    /// <field type='String'></field> 
    Network: "Network",
    /// <field type='String'></field> 
    SystemAbnormal: "SystemAbnormal",
    /// <field type='String'></field> 
    StorageMediumAbnormal: "StorageMediumAbnormal",
    /// <field type='String'></field> 
    WatchDog: "WatchDog"
};
///<var>红外滤光片切换模式</var>
var IRCutState =
{
    /// <field type='String'></field> 
    OFF: "OFF",
    /// <field type='String'></field> 
    ON: "ON"
};
///<var>彩色转黑白模式</var>
var DayNightState =
{
    /// <field type='String'></field> 
    OFF: "OFF",
    /// <field type='String'></field> 
    ON: "ON"
}
///<var>摄像机或视频源信号状态</var>
var SignalState =
{
    /// <field type='String'></field> 
    Normal: "Normal",
    /// <field type='String'></field> 
    Interrupted: "Interrupted"
}
///<var>录像状态</var>
var RecordState =
{
    /// <field type='String'></field> 
    OFF: "OFF",
    /// <field type='String'></field> 
    ON: "ON"
}
///<var>存储方式</var>
var StorageType =
{
    /// <field type='String'></field> 
    None: "None",
    /// <field type='String'></field> 
    Internal: "Internal",
    /// <field type='String'></field> 
    External: "External"
}

///<var>卷标类型</var>
var VolumeType =
{
    /// <field type='String'></field> 
    None: "None",
    /// <field type='String'></field> 
    VirtualDisk: "VirtualDisk",
    /// <field type='String'></field> 
    RAID0: "RAID0",
    /// <field type='String'></field> 
    RAID1: "RAID1",
    /// <field type='String'></field> 
    RAID0Plus1: "RAID0Plus1",
    /// <field type='String'></field> 
    RAID5: "RAID5",
    /// <field type='String'></field> 
    RAID6: "RAID6"
}
///<var>存储介质</var>
var StorageMediumType =
{
    /// <field type='String'></field> 
    None: "None",
    /// <field type='String'></field> 
    HDD: "HDD",
    /// <field type='String'></field> 
    Flash: "Flash",
    /// <field type='String'></field> 
    SDIO: "SDIO"
}
///<var>存储媒介状态</var>
var StorageMediumState =
{
    /// <field type='String'></field> 
    Normal: "Normal",
    /// <field type='String'></field> 
    Writing: "Writing",
    /// <field type='String'></field> 
    Unformatted: "Unformatted",
    /// <field type='String'></field> 
    Dormancy: "Dormancy",
    /// <field type='String'></field> 
    Offline: "Offline",
    /// <field type='String'></field> 
    Error: "Error"
}
///<var>IP地址版本</var>
var IPVersion = {
    /// <field type='String'></field> 
    IPv4: "IPv4",
    /// <field type='String'></field> 
    IPv6: "IPv6",
    /// <field type='String'></field> 
    Dual: "Dual"
}
///<var>网络地址获取方式</var>
var NetworkAddressingType =
{
    /// <field type='String'></field> 
    Static: "Static",
    /// <field type='String'></field> 
    Dynamic: "Dynamic",
    /// <field type='String'></field> 
    APIPA: "APIPA"
}
///<var>网口线缆类型</var>
var NetworkCableType =
{
    /// <field type='String'></field> 
    RJ45: "RJ45",
    /// <field type='String'></field> 
    Fiber: "Fiber",
    /// <field type='String'></field> 
    Wireless: "Wireless"
}


///<var>网口连接速率和双工模式</var>
var NetworkSpeedDuplex =
{
    Auto: "Auto",
    Half10MBase: "Half10MBase",
    Full10MBase: "Full10MBase",
    Half100MBase: "Half100MBase",
    Full100MBase: "Full100MBase",
    Half1000MBase: "Half1000MBase",
    Full1000MBase: "Full1000MBase"
}
///<var>网口工作模式</var>
var NetworkInterfaceWorkMode =
{
    Disable: "Disable",
    Enable: "Enable",
    Bridge: "Bridge",
    Balancing: "Balancing"
}
///<var>/ <var>事件类型</var> 
var EventType =
{
    /// <field type='String'>未知</field> 
    None: "None",
    IO: "IO",
    VMD: "VMD",
    Videoloss: "Videoloss",
    IRCut: "IRCut",
    DayNight: "DayNight",
    RecordState: "RecordState",
    StorageMediumFailure: "StorageMediumFailure",
    RAIDFailure: "RAIDFailure",
    RecordingFailure: "RecordingFailure",
    BadVideo: "BadVideo",
    POS: "POS",
    FanFailure: "FanFailure",
    CpuUsage: "CpuUsage",
    MemoryUsage: "MemoryUsage",
    Temperature: "Temperature",
    Pressure: "Pressure",
    Voltage: "Voltage",
    MaximumConnections: "MaximumConnections",
    NetworkBitrate: "NetworkBitrate",
    VideoBitrate: "VideoBitrate",
    Squint: "Squint",
    VideoTurned: "VideoTurned",
    //IntrusionArea: "IntrusionArea",
    //IntrusionLine: "IntrusionLine",
    Loitering: "Loitering",
    //StationaryInserted: "StationaryInserted",
    //StationaryRemoved: "StationaryRemoved",
    //ReversedIntrustion: "ReversedIntrustion",
    //ATMSlot:"ATMSlot",
    //ATMKeyBoard:"ATMKeyBoard",
    //ATMDamage:"ATMDamage",
    //BackRoomNumberLimit:"BackRoomNumberLimit",
    //BackRoomCrouched: "BackRoomCrouched",
    //Jitter:"Jitter",
    //Freeze: "Freeze",
    //Blocked: "Blocked",
    //LostFocus: "LostFocus",
    //Noise: "Noise",
    //ColorCast: "ColorCast",
    //AbnormalBrightness: "AbnormalBrightness",
    //AbnormalContrast: "AbnormalContrast",
    //SceneChanged: "SceneChanged",
    //Moved: "Moved",
    Online: "Online",
    Offline: "Offline",
    Intrusion: "Intrusion",
    Tripwire: "Tripwire",
    Unattended: "Unattended",
    Removal: "Removal",
    Retrograde: "Retrograde",
    //Counting: "Counting",
    //Crowed: "Crowed"
    FaceDetect:"FaceDetect",
    FaceMatch:"FaceMatch"
}
///<var>事件触发状态</var>
var EventState =
{
    Inactive: "Inactive",
    Active: "Active"
}

///<var>视频编码类型</var>
var VideoCodecType =
{
    None: "None",
    H264: "H264",
    MJPEG: "MJPEG",
    MPEG4: "MPEG4"
}

///<var>视频码率控制类型</var>
var VideoQualityControlType =
{
    VBR: "VBR",
    CBR: "CBR"
}

///<var>用户操作类型</var>
var OperationType =
{
    None: "None",
    RealPlay: "RealPlay",
    PlayBack: "PlayBack",
    Download: "Download",
    RecordStopped: "RecordStopped",
    Reboot: "Reboot",
    IPAddressModified: "IPAddressModified",
    NetworkSpeedDiagnosticsStarted: "NetworkSpeedDiagnosticsStarted",
    NetworkSpeedDiagnosticsStopped: "NetworkSpeedDiagnosticsStopped"
}

///<var>视频接口类型</var>
var VideoInterfaceType =
{
    None: "None",
    BNC: "BNC",
    HDMI: "HDMI",
    VGA: "VGA",
    DVI: "DVI",
    DisplayPort: "DisplayPort",
    Bus: "Bus"
}

///<var>解码通道状态</var>
var DecodingChannelState =
{
    Disabled: "Disabled",
    Dormant: "Dormant",
    Connecting: "Connecting",
    Connected: "Connected",
    Decoding: "Decoding",
    Abnormal: "Abnormal"
}

///<var>报警探头类型</var>
var AlarmInProbeType =
{
    None: "None",
    Panic: "Panic",
    Perimeter: "Perimeter",
    EntranceGuard: "EntranceGuard"
}

///<var>报警输入触发类型</var>
var IOInputTriggeringType =
{
    Low: "Low",
    High: "High",
    Falling: "Falling",
    Rasing: "Rasing"
}

///<var>IO输出触发类型</var>
var IOOutputTriggeringType =
{
    Low: "Low",
    High: "High"
}

///<var>IO输入输出状态</var>
var IOState =
{
    Inactive: "Inactive",
    Active: "Active"
}

///<var>布撤防类型</var>
var ArmType =
{
    Disarm: "Disarm",
    Arm: "Arm",
    ByPass: "ByPass"
}

///<var>性别</var>
var Sex =
{
    None: "None",
    Male: "Male",
    Female: "Female"
}
///<var>用户权限</var>
var UserPermission =
{
    Anonymous: "Anonymous",
    Operator: "Operator",
    Administrator: "Administrator",
    Extended: "Extended"
}

///<var>用户详细权限</var>
var UserPermissions =
{
    None: "None",
    Information: "Information",
    System: "System",
    User: "User",
    Device: "Device",
    All: "All"
}

///<var>设备权限</var>
var DevicePermissions =
{
    None: "None",
    System: "System",
    Media: "Media",
    Logs: "Logs",
    All: "All"
}

///<var>视频源权限</var>
var VideoSourcePermissions =
{
    None: "None",
    Preview: "Preview",
    Playback: "Playback",
    PTZ: "PTZ",
    Download: "Download",
    All: "All"
}

///<var>视频输出源权限</var>
var VideoOutSourcePermissions =
{
    None: "None",
    All: "All"
}
///<var>错误说明</var>
var FaultCode =
{
    OK: "OK",
    LoginFailure: "LoginFailure",
    InsufficientSecurityPermission: "InsufficientSecurityPermission",
    ResourceNotFound: "ResourceNotFound",
    FormatIncorrect: "FormatIncorrect",
    ResourceAlreadyExists: "ResourceAlreadyExists",
    ResourceBeingUsed: "ResourceBeingUsed",
    SelfDeletionError: "SelfDeletionError",
    NotFirstTimeLogin: "NotFirstTimeLogin",
    NotSupported: "NotSupported",
    DeviceError: "DeviceError",
    InvalidOperation: "InvalidOperation",
    ExistingAssociation: "ExistingAssociation",
    Nonunique: "Nonunique",
    NoReachableCamera: "NoReachableCamera",
    UniqueResourceExisted: "UniqueResourceExisted",
    SystemInfoNotExisted: "SystemInfoNotExisted",
    IdentityFormatIllegal: "IdentityFormatIllegal",
    IdentityExisted: "IdentityExisted",
    UsernameDuplicated: "UsernameDuplicated",
    RequestError: "RequestError",
    Unauthorized: "Unauthorized",
    ServerInternal: "ServerInternal"
};
///<var>分辨率</var>
var ResolutionFormat =
{
    None: "0×0",
    QCIF: "176×144",
    CIF: "352×288",
    CIF2: "704×288",
    DCIF: "528×384",
    CIF4: "704×576",
    VGA: "640×480",
    D1: "720×480",
    SVGA: "800×600",
    XVGA: "1024×768",
    HD720P: "1280×720",
    SXGA: "1280×1024",
    UXGA: "1600×1200",
    FullHD1080P: "1920×1080"
};
///<var>协议类型</var>
var ProtocolType =
{
    Howell5198: "Howell5198",
    Howell5201: "Howell5201",
    ONVIF: "ONVIF",
    Howell8000: "Howell8000",
    GB28181: "GB28181"
}
///<var></var>
var SystemFaultType = {
    None: "None",
    Offline: "Offline",
    StorageMediumAbnormal: "StorageMediumAbnormal",
    Videoloss: "Videoloss"
}
///<var></var>
var SystemWarningType = {
    None: "None",
    CPUUsage: "CPUUsage",
    MemoryUsage: "MemoryUsage",
    NetworkUsage: "NetworkUsage",
    SuperHeat: "SuperHeat",
    VoltageInstability: "VoltageInstability",
    VideoHighLoad: "VideoHighLoad",
    VideoNetworkInstability: "VideoNetworkInstability",
    Teardown: "Teardown",
    VideoConnectionFailure: "VideoConnectionFailure"
}
///<var></var>
var StorageMediumAbnormalType =
{
    None: "None",
    ReadTimeout: "ReadTimeout",
    WriteTimeout: "WriteTimeout",
    Dormancy: "Dormancy",
    Offline: "Offline",
    Online: "Online",
    Full: "Full",
    BeginFormat: "BeginFormat",
    EndFormat: "EndFormat",
    SMARTAbnormal: "SMARTAbnormal"
}
///<var></var>
var VideoDisconnectReason = {
    None: "None",
    ClientClosed: "ClientClosed",
    ServerClosed: "ServerClosed",
    FrontEndClosed: "FrontEndClosed",
    SendTimeout: "SendTimeout"

}
///<var></var>
var VideoConnectFailedReason = {
    None: "None",
    Idle: "Idle",
    BeyondLoad: "BeyondLoad",
    FrontEndClosed: "FrontEndClosed",
    SendTimeout: "SendTimeout"

}
///<var></var>
var VideoNetworkState = {
    None: "None",
    Idle: "Idle",
    Established: "Established",
    Closed: "Closed"

}
///<var></var>
var PictureFormat = {
    Bmp: "Bmp", //BMP格式的位图0
    Jpeg: "Jpeg"//Jpeg图片1

}
///<var></var>
var MapFormat = {
    Bmp: "Bmp", //BMP格式的位图
    Jpeg: "Jpeg", //Jpeg图片
    Png: "Png", //Png图片
    Tiff: "Tiff"//Tiff图片

}
///<var></var>
var MapItemType = {
    None: "None", //未知
    Camera: "Camera", //摄像机
    Annunciator: "Annunciator"//信号报警器

};

///<var>报警输出访问权限
var IOOutputPermissions = {
    None: "None", //无
    All: "All"//全部权限
}
///<var>报警输入访问权限
var IOInputPermissions = {
    None: "None", //无
    Receiving: "Receiving", //接收
    Bypass: "Bypass", //旁路
    All: "All"//全部权限
}
///<var>对象类型
var ObjectType = {
    None: "None", //未知
    People: "People", //人
    Vehicle: "Vehicle"//车
};


///<var>通知分类 v2.1
var NoticeClassification =
{
    None: "None", //未知	0
    Emergency: "Emergency", //紧急	1
    Warning: "Warning", //重要/警告	2
    Info: "Info"//一般信息	3
}
///<var>通知状态 v2.1
var NoticeStatusType = {
    Unread: "Unread", //未读	0
    Read: "Read"//已读	1
}
///<var>通知类型 v2.1
var NoticeType = {
    None: "None", //无	0
    AlertProcess: "AlertProcess"//报警处理	1
};
///<var>协议版本号
var ProtocolVersion = {
    ver10: "ver10"   //1.0版本	0
};
var LinkageTemplateScriptType = {
    None: "None", //无或未知	0x00
    Event: "Event"//事件联动模板类型名称	0x01
};
///<var>证件类型
var IdNumberType = {
    IDCard: "IDCard", //身份证	0
    Passport: "Passport"//护照	1
};

///<var></var>
var Classification = {
    Device: {
        VideoSource: [DeviceClassification.IPCamera, DeviceClassification.DVS, DeviceClassification.NVS, DeviceClassification.Camera],
        NetworkVideo: [DeviceClassification.DVR, DeviceClassification.NVR],
        Data: [DeviceClassification.DataServer, DeviceClassification.AcquisitionServer, DeviceClassification.SystemGateway],
        StreamingMedia: [DeviceClassification.StreamingMediaServer],
        Unit: [DeviceClassification.MatrixControlUnit, DeviceClassification.DecodingUnit, DeviceClassification.EncodingUnit],
        Matrix: [DeviceClassification.DigitalMatrix, DeviceClassification.HDDecoder, DeviceClassification.AnalogMatrix, DeviceClassification.IntegratedMatrix],
        Analysis: [DeviceClassification.VPS, DeviceClassification.VAS],
        Annunciator: [DeviceClassification.AAM, DeviceClassification.NAM, DeviceClassification.UltrasonicProbe]
    },
    EventType: {
        IO: [EventType.IO],
        Video: [EventType.VMD, EventType.Videoloss, EventType.IRCut, EventType.DayNight, EventType, EventType.BadVideo, EventType.MaximumConnections, EventType.VideoBitrate, EventType.Squint, EventType.VideoTurned, EventType],
        StorageMedium: [EventType.RecordState, EventType.StorageMediumFailure, EventType.RAIDFailure, EventType.RecordingFailure],
        Device: [EventType.POS, EventType.FanFailure, EventType.MemoryUsage, EventType.Temperature, EventType.Pressure, EventType.Voltage],
        Network: [EventType.NetworkBitrate]

    }
}


///<var>停止位数 V1.4</var>
var StopBits = {
    /// <field type='String'>不使用停止位</field> 
    None: "None",
    /// <field type='String'>一个停止位</field> 
    One: "One",
    /// <field type='String'>两个停止位</field> 
    Two: "Two",
    /// <field type='String'>1.5个停止位</field> 
    OnePointFive: "OnePointFive"
}

///<var>奇偶校验位 V1.4</var>
var Parity = {
    /// <field type='String'>不发生奇偶校验检查	0</field>
    None: "None",
    /// <field type='String'>设置奇偶校验位，使位数等于奇数	1</field>
    Odd: "Odd",
    /// <field type='String'>设置奇偶校验位，使位数等于偶数	2</field>
    Even: "Even",
    /// <field type='String'>将奇偶校验位保留为 1	3</field>
    Mask: "Mask",
    /// <field type='String'>将奇偶校验位保留为 0	4</field>
    Space: "Space"
}
///<var>星期几 V1.4</var>

var DayOfWeek = {
    /// <field type='String'>星期日</field>
    Sunday: "Sunday",
    /// <field type='String'>星期一</field>
    Monday: "Monday",
    /// <field type='String'>星期二</field>
    Tuesday: "Tuesday",
    /// <field type='String'>星期三</field>
    Wednesday: "Wednesday",
    /// <field type='String'>星期四</field>
    Thursday: "Thursday",
    /// <field type='String'>星期五</field>
    Friday: "Friday",
    /// <field type='String'>星期六</field>
    Saturday: "Saturday"
}
///<var>处理报警类型 [Flags] V1.4</var>

var AlertHandleType = {
    /// <field type='String'>无响应</field>
    None: "None",
    /// <field type='String'>在监视器上显示报警信息</field>
    Monitor: "Monitor",
    /// <field type='String'>报警输出声音</field>
    Audio: "Audio",
    /// <field type='String'>上传中心</field>
    Upload: "Upload",
    /// <field type='String'>报警输出</field>
    IOOutput: "IOOutput",
    /// <field type='String'>联动光输出信号 v1.6</field>
    Lighting: "Lighting",
    /// <field type='String'>截图</field>
    CapturePicture: "CapturePicture"
}
///<var>校时模式 V1.4</var>

var TimeMode = {
    /// <field type='String'>手动校时</field>
    Manual: "Manual",
    /// <field type='String'>NTP校时</field>
    NTP: "NTP"

}
///<var>云台方向控制</var>
var PTZDirection = {
    /// <field type='String'>停止</field>
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
    /// <field type='String'>停止</field>
    Stop: "Stop",
    /// <field type='String'>光圈开</field>
    IrisOpen: "IrisOpen",
    /// <field type='String'>光圈关</field>
    IrisClose: "IrisClose",
    /// <field type='String'>镜头拉远</field>
    ZoomTele: "ZoomTele",
    /// <field type='String'>镜头拉近</field>
    ZoomWide: "ZoomWide",
    /// <field type='String'>聚焦变远</field>
    FocusFar: "FocusFar",
    /// <field type='String'>聚焦变近</field>
    FocusNear: "FocusNear"
}
///<var>下载任务状态</var>
var DownloadTaskState = {
    /// <field type='String'>无/正常</field>
    None: "None",
    /// <field type='String'>出现异常现象</field>
    Error: "Error",
    /// <field type='String'>任务被中断或取消</field>
    Broken: "Broken",
    /// <field type='String'>完成</field>
    Finished: "Finished"
}
///<var>下载文件格式状态</var>
var DownloadFileFormat = {
    /// <field type='String'>厂商格式 0</field>
    Factory: "Factory",
    /// <field type='String'>标准Mpeg-4格式(没有音频) 1</field>
    MP4: "MP4",
    /// <field type='String'>AVI格式 2</field>
    AVI: "AVI"
}
///<var>数据与设备信息同步数据源</var>
var SyncSource = {
    /// <field type='String'>表示将设备信息同步到数据库中</field>
    Device: "Device",
    /// <field type='String'>表示将数据库信息同步到设备上。</field>
    Database: "Database"
}
///<var>视频流来源类型</var>
var StreamSourceType = {
    /// <field type='String'>自适应</field>
    Auto: "Auto",
    /// <field type='String'>设备来源</field>
    Device: "Device",
    /// <field type='String'>平台来源</field>
    Platform: "Platform"
}
///<var>分组类型</var>
var GroupType = {
    /// <field type='String'>未知类型，可以是多个分组的组合模式</field>
    None: "None",
    /// <field type='String'>设备分组</field>
    Device: "Device",
    /// <field type='String'>视频通道分组</field>
    VideoInput: "VideoInput",
    /// <field type='String'>报警输入分组</field>
    IOInput: "IOInput",
    /// <field type='String'>停车位分组</field>
    ParkingSpace: "ParkingSpace",
    /// <field type='String'>引导灯分组</field>
    Lamp: "Lamp",
    /// <field type='String'>地图分组</field>
    Map: "Map"
}
///<var>分组项类型</var>
var GroupItemType = {
    /// <field type='String'>未知类型</field>
    None: "None",
    /// <field type='String'>组件</field>
    Component: "Component",
    /// <field type='String'>分组</field>
    Group: "Group"
}

///<var>人脸库类型</var>
var FaceSetType = {
    /// <field type='String'>全部</field>
    None: "None",
    /// <field type='String'>白名单(不记录数据)</field>
    WhiteList: "WhiteList",
    /// <field type='String'>黑名单(记录数据&匹配报警)</field>
    BlackList: "BlackList"
}

///<var>人脸建模状态</var>
var FaceModelingStatus = {
    /// <field type='String'>未知类型</field>
    None: "None",
    /// <field type='String'>建模成功</field>
    Succeed: "Succeed",
    /// <field type='String'>建模失败</field>
    Failed: "Failed"
}
