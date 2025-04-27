/// <reference path="enum.js" />

function GBT2260_2007(country) {
    this.country = country;
}
function County(code, name) {
    this.code = code;
    this.name = name;
}

function City(code, name, county) {
    this.code = code;
    this.name = name;
    this.county = county;
}

function Province(code, name, city) {
    this.code = code;
    this.name = name;
    this.city = city;
}

function Country(code, name, province) {
    this.code = code;
    this.name = name;
    this.province = province;
}
//错误信息
function Fault() {
    /// <signature>
    /// <summary>错误信息</summary>
    /// <field name='FaultCode' type='Int'>错误码间 N</field>
    /// <field name='FaultReason' type='String'>错误原因 N</field>
    /// <field name='Exception' type='ExceptionData'>异常信息 Y</field>
    /// <field name='Id' type='Id'>在创建对象时服务器返回的唯一标示符 Y</field>
    /// </signature>

    this.FaultCode = 0;
    this.FaultReason = "";
    this.Exception = new ExceptionData();
    this.ExceptionSpecified = false;
    this.Id = "";
    this.IdSpecified = false;
}
function ExceptionData() {
    /// <signature>
    /// <summary>错误信息</summary>
    /// <field name='Message' type='String'>异常消息 N</field>
    /// <field name='ExceptionType' type='String'>异常类型 N</field>
    /// </signature>

    this.Message = ""; //异常消息//N
    this.ExceptionType = ""; //异常类型//N
}

function ServiceVersion() {
    /// <signature>
    /// <summary>服务版本信息</summary>
    /// <field name='Version' type='String'>版本号 N</field>
    /// <field name='BuildDate' type='Date'>编译时间 N</field>
    /// <field name='Company' type='String'>公司名 N</field>
    /// </signature>
    this.Version = "";
    this.BuildDate = new Date();
    this.Company = "";
}
function UserTeardown() {
    /// <signature>
    /// <summary>用户注销信息</summary>
    /// <field name='TeardownReason' type='TeardownReason'>下线原因 N</field>    
    /// </signature>
    this.TeardownReason = TeardownReason.None;
}

function Page() {
    /// <signature>
    /// <summary>分页信息</summary>
    /// <field name='PageIndex' type='Int32'>页码 1.2.3 .....    N</field>
    /// <field name='PageSize' type='Int32'>分页大小 N</field>
    /// <field name='PageCount' type='Int32'>总页数 N</field>
    /// <field name='RecordCount' type='Int32'>当前页的记录数目    N</field>    
    /// <field name='TotalRecordCount' type='Int32'>总记录数目  N</field>
    /// </signature>
    this.PageIndex = 0;
    this.PageSize = 0;
    this.PageCount = 0;
    this.RecordCount = 0;
    this.TotalRecordCount = 0;
}
function User() {
    /// <signature>
    /// <summary>用户信息</summary>
    /// <field name='Id' type='Id'>Id用户唯一标识符 N</field>
    /// <field name='Username' type='String'>管理员的用户名，用户名必须全局唯一，不允许多个相同用户名用户在系统中出现。管理员的用户名必须符合系统指定的格式 N</field>
    /// <field name='Nickname' type='String'>昵称 Y</field>
    /// <field name='Password' type='String'>管理员的密码，管理员的密码必须符合系统指定的格式 N</field>
    /// <field name='Mobile' type='String'>手机号码 Y</field>
    /// <field name='Phone' type='String'>固话号码 Y</field>
    /// <field name='UniformedId' type='String'>用户制服编号，如：警员号等 Y</field>
    /// <field name='Duty' type='String'>用户职责 Y</field>
    /// <field name='Information' type='String'>用户描述信息 Y</field>
    /// <field name='Sex' type='Sex'>性别 Y</field>
    /// <field name='Permission' type='UserPermission'>用户权限 N</field>
    /// <field name='DetailPermission' type='UserPermissions'>详细用户权限，该值只有当Permission值为Extended时有效 Y</field>

    /// <field name='DeviceCount' type='Int32x'>关联设备数量 V2.2</field>
    /// <field name='VideoInputChannelCount' type='Int32x'>关联视频输入通道数量 V2.2</field>
    /// <field name='VideoOutputChannelCount' type='Int32x'>关联视频输出通道数量 V2.2</field>
    /// <field name='IOInputChannelCount' type='Int32x'>关联报警输入通道数量 V2.2</field>
    /// <field name='IOOutputChannelCount' type='Int32x'>关联报警输出通道数量 V2.2</field>
    /// <field name='DepartmentCount' type='Int32x'>关联部门数量 V2.2</field>


    /// </signature>
    this.Id = "";
    this.Username = "";
    this.Nickname = "";
    this.NicknameSpecified = false;
    this.Password = "";
    this.Mobile = "";
    this.MobileSpecified = false;
    this.Phone = "";
    this.PhoneSpecified = false;
    this.UniformedId = "";
    this.UniformedIdSpecified = false;
    this.Duty = "";
    this.DutySpecified = false;
    this.Information = "";
    this.InformationSpecified = false;
    this.Sex = Sex.None;
    this.SexSpecified = false;
    this.Permission = UserPermission.Anonymous;
    this.DetailPermission = UserPermissions.None;
    this.DetailPermissionSpecified = false;

    this.DeviceCount = 0;
    this.VideoInputChannelCount = 0;
    this.VideoOutputChannelCount = 0;
    this.IOInputChannelCount = 0;
    this.IOOutputChannelCount = 0;
    this.DepartmentCount = 0;


    this.DeviceCountSpecified = false;
    this.VideoInputChannelCountSpecified = false;
    this.VideoOutputChannelCountSpecified = false;
    this.IOInputChannelCountSpecified = false;
    this.IOOutputChannelCountSpecified = false;
    this.DepartmentCountSpecified = false;

}
function UserList() {
    /// <signature>
    /// <summary>用户信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果 Y</field>
    /// <field name='User' type='Array'>用户信息 N</field>
    /// </signature>
    this.Page = new Page();
    this.PageSpecified = false;
    this.User = new Array();
    this.UserSpecified = false;
}
//部门
function Department() {
    /// <signature>
    /// <summary>部门</summary>
    /// <field name='Id' type='String'>唯一表示符 N</field>
    /// <field name='Name' type='String'>名称 N</field>
    /// <field name='Information' type='String'>描述 Y</field>
    /// <field name='Permission' type='UserPermission'>部门权限 N</field>
    /// <field name='DetailPermission' type='UserPermissions'>详细用户权限，该值只有当Permission值为Extended时有效 Y</field>
    /// <field name='DeviceCount' type='Int32'>关联设备数量 V2.2</field>
    /// <field name='VideoInputChannelCount' type='Int32'>关联视频输入通道数量 V2.2</field>
    /// <field name='VideoOutputChannelCount' type='Int32'>关联视频输出通道数量V2.2</field>
    /// <field name='IOInputChannelCount' type='Int32'>关联报警输入通道数量 V2.2</field>
    /// <field name='IOOutputChannelCount' type='Int32'>关联报警输出通道数量 V2.2</field>
    /// <field name='UserCount' type='Int32'>关联用户数量 V2.2


    /// </signature>
    this.Id = "";
    this.Name = "";
    this.Information = "";
    this.InformationSpecified = false;
    this.Permission = UserPermission.Operator;
    this.DetailPermission = UserPermissions.None;
    this.DetailPermissionSpecified = false;


    this.DeviceCount = 0;
    this.VideoInputChannelCount = 0;
    this.VideoOutputChannelCount = 0;
    this.IOInputChannelCount = 0;
    this.IOOutputChannelCount = 0;
    this.UserCount = 0;

    this.DeviceCountSpecified = false;
    this.VideoInputChannelCountSpecified = false;
    this.VideoOutputChannelCountSpecified = false;
    this.IOInputChannelCountSpecified = false;
    this.IOOutputChannelCountSpecified = false;
    this.UserCountSpecified = false;

}
function DepartmentList() {
    /// <signature>
    /// <summary>部门列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果 Y</field>
    /// <field name='Department' type='Array'>部门列表 N</field>
    /// </signature>
    this.Page = new Page();
    this.PageSpecified = false;
    this.Department = new Array();
    this.DepartmentSpecified = false;
}
function Device() {
    /// <signature>
    /// <summary>设备信息</summary>
    /// <field name='Id' type='Id'>唯一表示符 N</field>    
    /// <field name='AuthenticationCode' type='String'>认证码，由数据服务器分配	N</field>    
    /// <field name='Name' type='String'>设备名称	N</field>    
    /// <field name='Manufacturer' type='String'>厂商信息  (只读)	Y</field>    
    /// <field name='Model' type='String'>设备型号  (只读)	Y</field>    
    /// <field name='Firmware' type='String'>固件版本信息  (只读)	Y</field>    
    /// <field name='SerialNumber' type='String'>设备序列号  (只读)	Y</field>    
    /// <field name='PointOfSale' type='String'>零售商信息  (只读)	Y</field>    
    /// <field name='Information' type='String'>设备描述	Y</field>    
    /// <field name='Username' type='String'>登录设备的用户名	Y</field>    
    /// <field name='Password' type='String'>登录设备的密码	Y</field>    
    /// <field name='Uri' type='String'>设备访问地址	N</field>    
    /// <field name='Classification' type='DeviceClassification'>设备分类 (只读)	N</field>    
    /// <field name='ProtocolType' type='String'>协议类型	N</field>    
    /// <field name='ParentDeviceId' type='String'>父设备唯一标识Id	Y</field>
    /// <field name='BusAddress' type='Int32'>设备总线地址	N</field>
    /// <field name='HasSubDevice' type='String'>是否包含子系统或子设备	N</field>
    /// <field name='Abilities' type='DeviceAbilities'>设备基本能力 (只读)	Y</field>
    /// <field name='RatedVoltage' type='Double'>额定电压 (只读)	Y</field>
    /// <field name='MaximumUserConnectionsNumber' type='Int32'>最大视频连接数 (只读)	Y</field>
    /// <field name='MaximumVideoConnectionsNumber' type='Int32'>最大视频连接数 (只读)	Y</field>
    /// <field name='ExistedInDatabase' type='Boolean'>是否已存在与数据库中(只读) V1.3.1	Y</field>
    /// <field name='DeviceStatus' type='DeviceStatus'>设备状态 (只读)  V2.1	Y</field>
    /// <field name='VideoInputChannelCount' type='Int32'>视频输入通道数量(只读) V2.2	Y</field>
    /// <field name='VideoOutputChannelCount' type='Int32'>视频输出通道数量(只读) V2.2	Y</field>
    /// <field name='IOInputChannelCount' type='Int32'>报警输入通道数量(只读) V2.2	Y</field>
    /// <field name='IOOutputChannelCount' type='Int32'>报警输出通道数量(只读) V2.2	Y</field>
    /// <field name='NetworkInterfaceCount' type='Int32'>网口数量(只读) V2.2	Y</field>
    /// <field name='StorageMediumCount' type='Int32'>存储介质数量(只读) V2.2	Y</field>
    /// <field name='DecodingChannelCount' type='Int32'>解码通道数量(只读) V2.2	Y</field>
    /// <field name='RelationUserCount' type='Int32'>关联用户数量(只读) V2.2	Y</field>
    /// <field name='RelationDepartmentCount' type='Int32'>关联部门数量(只读) V2.2	Y</field>
    /// </signature>

    this.Id = "";
    this.AuthenticationCode = "";

    this.Name = "";
    this.Manufacturer = "";
    this.ManufacturerSpecified = false;
    this.Model = "";
    this.ModelSpecified = false;
    this.Firmware = "";
    this.FirmwareSpecified = false;
    this.SerialNumber = "";
    this.SerialNumberSpecified = false;
    this.PointOfSale = ""; //零售商信息//Y
    this.PointOfSaleSpecified = false;
    this.Information = ""; //设备描述//Y
    this.InformationSpecified = false;
    this.Username = ""; //登录设备的用户名//Y
    this.UsernameSpecified = false;
    this.Password = ""; //登录设备的密码//Y
    this.PasswordSpecified = false;
    this.Uri = ""; //设备访问地址//N
    this.Classification = DeviceClassification.None; //设备分类//N
    this.ProtocolType = ""; //协议类型//N
    this.ParentDeviceId = ""; //父设备唯一标识Id//Y
    this.ParentDeviceIdSpecified = false;
    this.BusAddress = 0; //设备总线地址//N
    this.HasSubDevice = false; //是否包含子系统或子设备//N
    this.ExistedInDatabase = false; //数据库中是否存在
    this.ExistedInDatabaseSpecified = false;

    this.DeviceStatus = new DeviceStatus(); //2.1
    this.DeviceStatusSpecified = false;

    this.VideoInputChannelCount = 0;//	视频输入通道数量(只读) V2.2	Y
    this.VideoOutputChannelCount = 0;//	视频输出通道数量(只读) V2.2	Y
    this.IOInputChannelCount = 0;//	报警输入通道数量(只读) V2.2	Y
    this.IOOutputChannelCount = 0;//	报警输出通道数量(只读) V2.2	Y
    this.NetworkInterfaceCount = 0;//	网口数量(只读) V2.2	Y
    this.StorageMediumCount = 0;//	存储介质数量(只读) V2.2	Y
    this.DecodingChannelCount = 0;//	解码通道数量(只读) V2.2	Y
    this.RelationUserCount = 0;//	关联用户数量(只读) V2.2	Y
    this.RelationDepartmentCount = 0;//	关联部门数量(只读) V2.2	Y

    this.VideoInputChannelCountSpecified = false;
    this.VideoOutputChannelCountSpecified = false;
    this.IOInputChannelCountSpecified = false;
    this.IOOutputChannelCountSpecified = false;
    this.NetworkInterfaceCountSpecified = false;
    this.StorageMediumCountSpecified = false;
    this.DecodingChannelCountSpecified = false;
    this.RelationUserCountSpecified = false;
    this.RelationDepartmentCountSpecified = false;



}
//设备信息列表
function DeviceList() {
    this.Page = new Page();      //分页信息，如果没有分页信息，则表示一次性获取所有的结果。//Y
    this.PageSpecified = false;
    this.Device = new Array();    //设备信息//Y
    this.DeviceSpecified = false;
}

//设备详细信息
function DeviceDetails() {
    this.Id = ""; //Id//唯一表示符//N
    this.Name = ""; //设备名称//N
    this.Manufacturer = ""; //厂商信息//Y
    this.ManufacturerSpecified = false;
    this.Model = ""; //设备型号//Y
    this.ModelSpecified = false;
    this.Firmware = ""; //固件版本信息//Y
    this.FirmwareSpecified = false;
    this.SerialNumber = ""; //设备序列号//Y
    this.SerialNumberSpecified = false;
    this.PointOfSale = ""; //零售商信息//Y
    this.PointOfSaleSpecified = false;
    this.Information = ""; //设备描述//Y
    this.InformationSpecified = false;
    this.Username = ""; //登录设备的用户名//Y
    this.UsernameSpecified = false;
    this.Password = ""; //登录设备的密码//Y
    this.PasswordSpecified = false;
    this.Uri = ""; //设备访问地址//N
    this.Classification = DeviceClassification.None;    //设备分类//N
    this.ProtocolType = ""; //协议类型//N
    this.ParentDeviceId = ""; //父设备唯一标识Id//Y
    this.ParentDeviceIdSpecified = false;
    this.BusAddress = ""; //设备总线地址//N
    this.HasSubDevice = false; //是否包含子系统或子设备//N
    this.VideoInputChannelList = new VideoInputChannelList(); //VideoInputChannelList    this.视频输入通道列表//Y
    this.VideoInputChannelListSpecified = false;
    this.VideoOutputChannelList = new VideoOutputChannelList();    //视频输出通道列表//Y
    this.VideoOutputChannelListSpecified = false;
    this.IOInputChannelList = new IOInputChannelList();    //报警输入通道列表//Y
    this.IOInputChannelListSpecified = false;
    this.IOOutputChannelList = new IOOutputChannelList();    //报警输出通道列表//Y
    this.IOOutputChannelListSpecified = false;
    this.NetworkInterfaceList = new NetworkInterfaceList();    //网口列表//Y
    this.NetworkInterfaceListSpecified = false;
    this.StorageMediumList = new StorageMediumList()    //存储媒介列表//Y
    this.StorageMediumListSpecified = false;
}
//设备权限信息
function DevicePermission() {
    this.Id = ""; //设备权限唯一标识符//N
    this.Name = ""; //设备名称//N
    this.Permission = DevicePermissions.None;    //设备权限//N
    this.Device = new Device();    //设备信息//N
}
//设备权限信息列表
function DevicePermissionList() {
    this.Page = new Page();    //分页信息，如果没有分页信息，则表示一次性获取所有的结果。//N
    this.DevicePermission = new Array(); //设备权限信息//Y
    this.DevicePermissionSpecified = false;
}


//视频源通道信息
function VideoInputChannel() {
    this.Id = ""; //Id    this.摄像机模块Id//N
    this.Name = ""; //摄像机名称//N
    this.PTZ = false; //是否为云台设备//Y
    this.PTZSpecified = false;
    this.Infrared = false; //是否为红外设备//Y
    this.InfraredSpecified = false;
    this.CameraType = CameraType.None    //摄像类型//Y
    this.CameraTypeSpecified = false;
    this.Terminal = false; //是否为终端设备，如：IPC、DVS//Y
    this.TerminalSpecified = false;
    this.Networked = false; //是否为网络输入通道，NVR的视频输入源就属于网络输入通道//Y
    this.NetworkedSpecified = false;
    this.VideoInterfaceType = VideoInterfaceType.None;    //非网络视频输入接口类型//Y
    this.VideoInterfaceTypeSpecified = false;
    this.StreamingChannel = new StreamingChannels();    //流通道信息//Y
    this.StreamingChannelSpecified = false;
    this.Association = new VideoInputAssociation();  //视频输入关联信息//Y
    this.AssociationSpecified = false;
    this.PseudoCode = 0;
    this.PseudoCodeSpecified = false;
}
//视频源通道信息
function VideoInputChannelList() {
    this.Page = new Page();    //分页信息，如果没有分页信息，则表示一次性获取所有的结果。//Y
    this.PageSpecified = false;
    this.VideoInputChannel = new Array(); //VideoInputChannel[]////Y
    this.VideoInputChannelSpecified = false;
}

//存储媒介信息
function StorageMedium() {
    this.Id = ""; //Id    //存储媒介模块Id//N
    this.StoragePort = 0; //存储接口编码 [1-n] 如: 1表示:SATA1,SATA2...//N
    this.MediumType = StorageMediumType.None; //媒介类型//N
    this.Manufacturer = ""; //厂商信息 如:Seagate//Y
    this.ManufacturerSpecified = false;
    this.Model = ""; //存储媒介型号 如:SV3200//Y
    this.ModelSpecified = false;
    this.Capacity = 0; //存储媒介容量 单位:Byte//N
    this.Freespace = 0; //剩余空间 单位:Byte//N
    this.StorageType = StorageType.None; //存储方式//Y
    this.StorageTypeSpecified = false;
}
//存储媒介信息
function StorageMediumList() {
    this.Page = new Page(); //分页信息，如果没有分页信息，则表示一次性获取所有的结果。//Y
    this.PageSpecified = false;
    this.StorageMedium = new Array(); //StorageMedium[]Y
    this.StorageMediumSpecified = false;
}

//网络接口信息
function NetworkInterface() {
    this.Id = ""; //Id this.网口模块Id//N
    this.InterfacePort = 0; //网口接口编码 [1-n] 如：1表示：PORT1,PORT2...//N
    this.IPVersion = IPVersion.IPv4; //IP地址版本//N
    this.AddressingType = NetworkAddressingType.Static;            //地址获取方式//N
    this.IPAddress = new IPAddress(); //网络IP地址//N
    this.PhyscialAddress = ""; //物理地址            this.格式：00 - 00 - 00 - 00 - 00 - 00//N
    this.CableType = NetworkCableType.Fiber; //接口类型//Y
    this.CableTypeSpecified = false;
    this.SpeedDuplex = NetworkSpeedDuplex.Auto;            //网口速率//Y
    this.SpeedDuplexSpecified = false;
    this.WorkMode = NetworkInterfaceWorkMode.Disable;            //工作模式//Y
    this.WorkModeSpecified = false;
    this.Wireless = new WirelessNetwork();            //无线网络信息//Y
    this.WirelessSpecified = false;
    this.MTU = 1500;
    this.MTUSpecified = false;
}
//网络接口信息
function NetworkInterfaceList() {
    //分页信息
    /*分页信息 */
    this.Page = new Page();    //分页信息，如果没有分页信息，则表示一次性获取所有的结果。//Y
    this.PageSpecified = false;
    this.NetworkInterface = new Array(); //NetworkInterface[]    Y
    this.NetworkInterfaceSpecified = false;
}

//网络IP地址
function IPAddress() {
    this.IPv4Address = new IPv4Address(); //IPv4Address IP version 4 地址//N
    this.IPv6Address = new IPv6Address(); //IPv6Address IP version 6 地址//N
}

//网络IPv4地址
function IPv4Address() {
    this.Address = ""; //IP地址//N
    this.Subnetmask = ""; //子网掩码//N
    this.DefaultGateway = ""; //默认网关//Y
    this.DefaultGatewaySpecified = false;
    this.PrimaryDNS = ""; //主DNS//Y
    this.PrimaryDNSSpecified = false;
    this.SecondaryDNS = ""; //次DNS//Y
    this.SecondaryDNSSpecified = false;
}
//网络IPv6地址
function IPv6Address() {
    this.Address = ""; //IP地址//N
    this.BitMask = ""; //位掩码//N
    this.DefaultGateway = ""; //默认网关//Y
    this.DefaultGatewaySpecified = false;
    this.PrimaryDNS = ""; //主DNS//Y
    this.PrimaryDNSSpecified = false;
    this.SecondaryDNS = ""; //次DNS//Y
    this.SecondaryDNSSpecified = false;
}
//无线网络
function WirelessNetwork() {
    this.SSID = ""; //无线网络的唯一Id的 SSID=BASE64(OriginSSID)//N
    this.Connected = false; //是否已建议连接//N
    this.Intensity = 0.0; //信号强度[0,1]//N
    this.Frequency = 0.0; //频段 单位：GHz//Y
    this.FrequencySpecified = false;
    this.Channel = 0; //无线网络通道 0-99//Y
    this.ChannelSpecified = false;
}
//视频输出源通道信息
function VideoOutputChannel() {
    this.Id = ""//Id视频输出源序列号//N
    this.Name = ""; //视频输出源名称//N
    this.Terminal = false; //是否为终端设备，如：解码器//Y
    this.TerminalSpecified = false;
    this.Networked = false; //是否为网络输出通道//Y
    this.NetworkedSpecified = false;
    this.InterfaceEquipped = false; //成功外接视频显示设备//Y
    this.InterfaceEquippedSpecified = false;
    this.Resolution = new Resolution();            //输出分辨率//Y
    this.ResolutionSpecified = false;
    this.Frequency = 0; //输出频率 单位：HZ//Y
    this.FrequencySpecified = false;
    this.VideoInterfaceType = VideoInterfaceType.None; //视频接口类型//Y
    this.VideoInterfaceTypeSpecified = false;
    this.DecodingChannel = new Array(); //解码通道信息//Y
    this.DecodingChannelSpecified = false;
    this.PseudoCode = 0;
    this.PseudoCodeSpecified = true;
}
//视频输出源通道信息
function VideoOutputChannelList() {
    this.Page = new Page(); //分页信息，如果没有分页信息，则表示一次性获取所有的结果。//Y
    this.PageSpecified = false;
    this.VideoOutputChannel = new Array(); //VideoOutputChannel [] Y
    this.VideoOutputChannelSpecified = false;
}
//解码通道信息
function DecodingChannel() {
    this.Id = ""; //Id    解码通道序列号//N
    this.Enabled = false; //是否启用解码通道//N
    this.SupportedCodecFormats = ""; //支持的视频编码格式 格式之间是有逗号隔开（只读）    H.264,MPEG4...  //Y
    this.SupportedCodecFormatsSpecified = false;
    this.getSupportedCodecFormatsArray = function () {
        return this.SupportedCodecFormats.split(",");
    }
    this.PseudoCode = 0;
    this.PseudoCodeSpecified = false;
}

//报警输入通道信息
function IOInputChannel() {
    this.Id = ""; //Id            this.报警输入序列号//N
    this.Name = ""; //报警输入名称//N
    this.ProbeType = AlarmInProbeType.None; //报警探头类型//Y
    this.ProbeTypeSpecified = false;
    this.TriggeringType = IOInputTriggeringType.Falling;            //报警触发类型//Y
    this.TriggeringTypeSpecified = false;
    this.DefenceZoneId = ""; //所属防区Id//Y
    this.DefenceZoneIdSpecified = false;
}
//报警输入通道信息
function IOInputChannelList() {
    this.Page = new Page();            //分页信息，如果没有分页信息，则表示一次性获取所有的结果。//Y
    this.PageSpecified = false;
    this.IOInputChannel = new Array(); //IOInputChannel[]        Y
    this.IOInputChannelSpecified = false;
}
//IO输出通道信息
function IOOutputChannelList() {
    this.Page = new Page();            //分页信息，如果没有分页信息，则表示一次性获取所有的结果。//Y
    this.PageSpecified = false;
    this.IOOutputChannel = new Array(); //IOOutputChannel[]            Y
    this.IOOutputChannelSpecified = false;
}
function IOOutputChannel() {
    this.Id = ""; //IO输出序列号	N
    this.Name = ""; //IO输出名称	N
    this.TriggeringType = IOOutputTriggeringType.Low; //IO输出触发类型 Y
    this.TriggeringTypeSpecified = false;
}
//分辨率
function Resolution() {
    this.Width = 0; //视频宽度 单位：像素//N
    this.Height = 0; //视频高度 单位：像素//N
    this.Description = ""; //视频分辨率描述信息，如CIF,4CIF,D1等...//Y
    this.DescriptionSpecified = false;
}
//设备分类能力信息
function DeviceClassificationCapabilities() {
    this.Classification = DeviceClassification.None; //设备分类//N
    this.DeviceProtocolCapabilities = new Array(); //协议能力//Y
    this.DeviceProtocolCapabilitiesSpecified = false;
}
//设备协议能力信息
function DeviceProtocolCapabilities() {
    this.ProtocolType = ""; //协议//N
    this.Comment = ""; //备注信息//Y
    this.CommentSpecified = false;
    this.UriFormat = ""; //设备Uri格式//N
    this.HasVideoInputChannel = false; //是否含有视频输入信息//N
    this.HasVideoOutputChannel = false; //是否含有视频输出信息//N
    this.HasIOInputChannel = false; //是否含有报警输入信息//N
    this.HasIOOutputChannel = false; //是否含有报警输出信息//N
    this.HasNetworkInterface = false; //是否含有网口信息//N
    this.HasStorageMedium = false; //是否含有存储媒介//N
    this.SupportedSearch = false; //是否支持设备搜索//N
}
//视频源通道状态
function VideoInputChannelStatus() {
    this.Id = ""; //Id 摄像机模块Id//N
    this.IRCutState = IRCutState.OFF; // 红外滤光片切换状态//Y
    this.IRCutStateSpecified = false;
    this.DayNightState = DayNightState.OFF; //彩转黑白状态//Y
    this.DayNightStateSpecified = false;
    this.SignalState = SignalState.Normal; //信号量状态//Y
    this.SignalStateSpecified = false;
    this.RecordState = RecordState.OFF; //录像状态//Y
    this.RecordStateSpecified = false;
    this.Shutter = 0; //当前快门速度 单位：1/n秒 n为当前Shutter的数值//Y
    this.ShutterSpecified = false;
    this.Luminance = 0.0; //摄像机亮度值 单位：流明//Y
    this.LuminanceSpecified = false;
    this.StreamingStatus = new Array(); //StreamingStatus[] 流状态列表//Y
    this.StreamingStatusSpecified = false;
}
//视频流信息
function StreamingChannel() {
    this.No = 0; //视频通道编码 [1,n]//N
    this.VideoCodecType = VideoCodecType.None; //视频编码格式//N
    this.VideoResolution = new Resolution(); //视频分辨率//N
    this.VideoQualityControlType = VideoQualityControlType.CBR//视频码率控制类型//N
    this.VideoBitrateUpperCap = 0.0; //码率上限 单位: Kbps//N
    this.FrameRate = 0.0; //帧率 单位：帧 [0,n]//N
    this.FixedQuality = 0.0; //图像质量 [0,1]//N
    this.Url = ""; //视频流访问地址//Y
    this.UrlSpecified = false;
    this.NetworkStreamingAssociation = new NetworkStreamingAssociation(); //视频流关联信息//Y
    this.NetworkStreamingAssociationSpecified = false;
}
function StreamingChannels() { }
StreamingChannels.prototype = new Array();
//视频流状态
function StreamingStatus() {
    this.No = 0; //视频流通道编号 [1,n]//N
    this.Bitrate = 0.0; //网络平均码率 单位：Kbps//N
    this.TotalPacket = 0; //总数据包数目//Y
    this.TotalPacketSpecified = false;
    this.LostPacket = 0; //丢包数目//Y
    this.LostPacketSpecified = false;
    this.ErrorPacket = 0; //错误包数目//Y
    this.ErrorPacketSpecified = false;
    this.ReceivedPacket = 0; //实际接收到的包数目//Y
    this.ReceivedPacketSpecified = false;
    this.StreamingSessionStatus = new Array(); //流会话状态列表//Y
    this.StreamingSessionStatusSpecified = false;
}
//视频流会话状态
function StreamingSessionStatus() {
    this.ClientAddress = new ClientAddress(); //ClientAddress//客户端地址//N
    this.ClientUserName = ""; //客户端用户名//Y
    this.ClientUserNameSpecified = false;
    this.StartDateTime = new Date(); //会话起始时间//Y
    this.StartDateTimeSpecified = false;
    this.ElapsedSeconds = 0; //会话持续时间//Y
    this.ElapsedSecondsSpecified = false;
    this.Bandwidth = 0.0; //占用带宽 Kbps//Y
    this.BandwidthSpecified = false;
}
//客户端地址
function ClientAddress() {
    this.IPv4Address = ""; //IPv4地址//Y
    this.IPv4AddressSpecified = false;
    this.IPv6Address = ""; //IPv6地址//Y
    this.IPv6AddressSpecified = false;
}
//设备状态
function DeviceStatus() {
    this.Id = ""; //Id this.设备注册Id，由数据服务器分配//N
    this.CpuUsage = 0.0; //当前Cpu使用率//百分比[0, 100]//N
    this.MemoryUsage = 0.0; //内存使用率//百分比[0, 100]//N
    this.WorkingSeconds = 0; //设备运行时间 单位：秒//N
    this.Temperature = 0.0; //设备温度 单位：摄氏度//Y
    this.TemperatureSpecified = false;
    this.Pressure = 0.0; //压力 单位：帕//Y
    this.PressureSpecified = false;
    this.Voltage = 0.0; //当前工作电压 单位：伏特//Y
    this.VoltageSpecified = false;

    this.WiFiIntensity = 0; //WiFi信号强度[0-100]（只读）V1.6	Y
    this.BatteryRemaining = 0; //电池剩余容量(只读)  V1.6	Y


}

//测速的二进制结构数据包结构(每个数据包的大小为1Kb，即：128字节):
function BitrateBinaryData() {
    this.StartCode = 0; //起始标记：“HWNW”//对应十六进制值：0x48574E57//4
    this.CSeq = 0; //序列号,从0开始递增，每个数据包都增加1.//8
    this.SendTime = 0; //发送时间，单位：微妙，相对于第一个数据的时间。//8保留 104字节数据，随机内存数据。
    this.CheckSum = 0; //校验值 CRC32对上面所有数据计算校验值//4
}
//视频码流测试状态
function BitrateStatus() {
    this.Id = ""; //Id//摄像机、视频源Id//N
    this.Bitrate = 0.0; //网络平均码率 单位：Kbps//N
    this.TotalPacket = 0; //总数据包数目//Y
    this.TotalPacketSpecified = false;
    this.LostPacket = 0; //丢包数目//Y
    this.LostPacketSpecified = false;
    this.ErrorPacket = 0; //错误包数目//Y
    this.ErrorPacketSpecified = false;
    this.ReceivedPacket = 0; //实际接收到的包数目//Y
    this.ReceivedPacketSpecified = false;
}

//存储媒介状态信息
function StorageMediumStatus() {
    this.Id = ""; //Id//存储媒介模块Id//N
    this.MediumState = StorageMediumState.Normal; //存储媒介状态//N
    this.WritingBps = 0; //当前写入速度 单位：Bps//Y
    this.WritingBpsSpecified = false;
    this.ReadingBps = 0; //当前写入速度 单位：Bps//Y
    this.ReadingBpsSpecified = false;
    this.BadBlockNumber = 0; //坏块数量//Y
    this.BadBlockNumberSpecified = false;
    this.TotalBlockNumber = 0; //总块数//Y
    this.TotalBlockNumberSpecified = false;
}
//网络接口状态
function NetworkInterfaceStatus() {
    this.Id = ""; //Id//网口列号//N
    this.InputRate = 0.0; //输入速率//Y
    this.InputRateSpecified = false;
    this.OutputRate = 0.0; //输出速率//Y
    this.OutputRateSpecified = false;
}
//解码通道状态信息
function VideoOutputChannelStatus() {
    this.Id = ""; //Id//视频输出源序列号//N
    this.State = SignalState.Normal; //输出信号状态//N
    this.DecodingChannelStatus = new Array(); //解码通道状态//Y
    this.DecodingChannelStatusSpecified = false;
}
//解码通道状态信息
function DecodingChannelStatus() {
    this.Id = ""; //Id//解码通道序列号//N
    this.State//DecodingChannelState//解码通道状态//N
    this.Url = ""; //视频连接地址//Y
    this.UrlSpecified = false;
    this.Fps = 0.0; //每秒的解码帧率//Y
    this.FpsSpecified = false;
    this.Bitrate = 0.0; //视频平均码率 单位：Kbps//Y
    this.BitrateSpecified = false;

    this.ChannelNo = 0;//视频通编号 1-n//Y
    this.ChannelNoSpecified = false;
    this.VideoInputChannelId = "";//视频输入通道唯一标识符//Y
    this.VideoInputChannelIdSpecified = false;
    this.PesudoCode = 0;//视频输入通道对应的伪码//Y
    this.PesudoCodeSpecified = false;
    this.StreamSourceType = StreamSourceType.Auto;//视频流来源类型//Y
    this.StreamSourceTypeSpecified = false;
}
//报警输入通道状态
function IOInputChannelStatus() {
    this.Id = ""; //Idthis.报警输入序列号//N
    this.State = IOState.Inactive; //IOState//报警输入状态//N
    this.ArmType = ArmType.Disarm; //ArmType//布撤防类型//N
}
//IO输出通道状态
function IOOutputChannelStatus() {
    this.Id = ""; //Id//IO输出序列号//N
    this.State = IOState.Inactive; //IOState//IO输出状态//N
}
//视频关联流信息
function NetworkStreamingAssociation() {
    this.No = 0; //视频流通道编号 [1,n]//N
    this.Url = ""; //视频流Url地址//N
    this.Username = ""; //用户名//Y
    this.UsernameSpecified = false;
    this.Password = ""; //密码//Y
    this.PasswordSpecified = false;
    this.TCPTransport = false; //是否使用TCP传输模式//Y
    this.TCPTransportSpecified = false;
    this.FromId = ""; //视频来源序列号(VideoInput)//Y
    this.FromIdSpecified = false;
} ////

//视频输入源关联信息
function VideoInputAssociation() {
    this.FromId = ""; //视频来源序列号(VideoInput)//N
    this.Url = ""; //来源地址//Y
    this.UrlSpecified = false;
    this.Username = ""; //用户名//Y
    this.UsernameSpecified = false;
    this.Password = ""; //密码//Y
    this.PasswordSpecified = false;
    this.TCPTransport = false; //是否使用TCP传输模式//Y
    this.TCPTransportSpecified = false;
}

//视频输入源信息
function VideoSource() {
    this.Id = ""; //视频输入源序列号//N
    this.Name = ""; //视频源名称//Y
    this.NameSpecified = false;
    this.PseudoCode = 0; //伪码//Y
    this.PseudoCodeSpecified = false;
    this.Permission = VideoSourcePermissions.None//视频源权限//N
    this.PreviewFrom = new Array(); //预览来源的视频输入通道//Y
    this.PreviewFromSpecified = false;
    this.PlaybackFrom = new Array(); //VideoInputChannel[]//回放来源的视频输入通道//Y
    this.PlaybackFromSpecified = false;
}
//视频输入源列表信息
function VideoSourceList() {
    this.Page = new Page(); //分页信息//Y
    this.PageSpecified = false;
    this.VideoSource = new Array(); //VideoSource[]//视频输入源//Y
    this.VideoSourceSpecified = false;
}

//视频输出源信息
function VideoOutSource() {
    this.Id = ""; //视频输出源序列号//N
    this.Name = ""; //视频源名称//Y
    this.NameSpecified = false;
    this.PseudoCode = 0; //伪码//Y
    this.PseudoCodeSpecified = false;
    this.Permission = VideoOutSourcePermissions.None//VideoOutSourcePermissions//视频输出源权限//N
    this.DecodingChannel = new DecodingChannel(); //DecodingChannel//视频解码通道//Y
    this.DecodingChannelSpecified = false;
}
//视频输出源列表信息
function VideoOutSourceList() {
    this.Page = new Page(); //分页信息//Y
    this.PageSpecified = false;
    this.VideoOutSource = new Array(); //VideoOutSource[]//视频输出源//Y
    this.VideoOutSourceSpecified = false;
}
//设备基本信息
function DeviceInformation() {
    this.Id = ""; //Id//设备注册Id，由数据服务器分配//N
    this.AuthenticationCode = ""; //认证码，由数据服务器分配//N//以下数据为只读信息
    this.SystemTime = new Date(); //系统时间//N
    this.Classification = DeviceClassification //设备分类//N
    this.Manufacturer = ""; //厂商信息 如：Howell//N
    this.Model = ""; //设备型号 如：ST-9100//N
    this.Firmware = ""; //固件版本号 如：1.0.1//N
    this.Software = ""; //软件版本号 如：1.0.1//N
    this.SerialNumber = ""; //厂商设备序列号//N
    this.Infrared = false; //是否为红外设备//Y
    this.InfraredSpecified = false;
    this.Wireless = false; //是否为无线设备//Y
    this.WirelessSpecified = false;
    this.TemperatureSensor = false; //是否装备温度探测器//Y
    this.TemperatureSensorSpecified = false;
    this.PressureSensor = false; //是否装备压力传感器//Y
    this.PressureSensorSpecified = false;
    this.Storable = false; //是否支持存储媒介//Y
    this.StorableSpecified = false;
    this.RatedVoltage = 0.0; //工作额定电压 单位：伏特//Y
    this.RatedVoltageSpecified = false;
    this.MaximumUserConnectionsNumber = 0; //用户连接上限//Y
    this.MaximumUserConnectionsNumberSpecified = false;
    this.MaximumVideoConnectionsNumber = 0; //视频连接上限//Y
    this.MaximumVideoConnectionsNumberSpecified = false;
    this.ServiceUrl = ""; //服务访问地址//N
} //

//系统信息

function SystemInformation() {
    this.Id = ""; //Id 数据中心唯一标识符 (只读)//N
    this.Nation = 0; //国家区域码(保留,暂时为0)//N
    this.Province = 0; //省级编码 参见：GT-2260-2007//N
    this.City = 0; //市级编码 参见：GT-2260-2007//N
    this.County = 0; //区级编码 参见：GT-2260-2007//N
    this.ProjectNumber = 0; //公司内部项目编码 7位数字如果该值没有被正确设置怎服务器将无法正常处理Internet网络的服务业务//Y
    this.ProjectNumberSpecified = false;
    this.CreationTime = new Date(); //创建时间 (只读)//Y
    this.CreationTimeSpecified = false;
    this.ProjectName = ""; //项目名称//Y
    this.ProjectNameSpecified = false;
    this.Version = ""; //系统服务软件版本信息(只读)//Y
    this.VersionSpecified = false;
} //
//解码通道列表信息

function DecodingChannelList() {
    this.Page = new Page(); //分页信息//Y
    this.PageSpecified = false;
    this.VideoOutSource = new Array(); //DecodingChannel[]    解码通道//Y
    this.VideoOutSourceSpecified = false;
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

//视频输入通道权限
function VideoInputChannelPermission() {
    this.Id = "";
    this.Name = ""; //视频源名称
    this.Permission = VideoSourcePermissions.None; //视频源权限    
    this.VideoInputChannel = new VideoInputChannel(); //视频输入通道信息
}

//视频输入权限列表
function VideoInputChannelPermissionList() {
    this.Page = new Page();
    this.VideoInputChannelPermission = new Array();
}


//视频输出通道权限
function VideoOutputChannelPermission() {
    this.Id = "";
    this.Name = ""; //视频源名称
    this.Permission = VideoOutSourcePermissions.None; //视频源权限    
    this.VideoOutputChannel = new VideoOutputChannel(); //视频输入通道信息
}

//视频输出权限列表
function VideoOutputChannelPermissionList() {
    this.Page = new Page();
    this.VideoOutputChannelPermission = new Array();
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

function BitrateStatus() {
    this.Id = "";           //摄像机、视频源Id
    this.Bitrate = 0.0;     //网络平均码率 单位：Kbps
    this.TotalPacket = 0;     //总数据包数目
    this.TotalPacketSpecified = false;
    this.LostPacket = 0;      //丢包数目
    this.LostPacketSpecified = false;
    this.ErrorPacket = 0;     //错误包数目
    this.ErrorPacketSpecified = false;
    this.ReceivedPacket = 0;  //实际接收到的包数目
    this.ReceivedPacketSpecified = false;
    this.SessionID = "";         //测速任务的会话唯一标识符 v1.4b

}

BitrateStatus.prototype.LostPacketRatio = function () {
    return ((this.LostPacket * 100.0) / this.TotalPacket).toFixed(2);
}
BitrateStatus.prototype.ErrorPacketRatio = function () {
    return ((this.ErrorPacket * 100.0) / this.TotalPacket).toFixed(2);
}
BitrateStatus.prototype.ReceivedPacketRatio = function () {
    return ((this.ReceivedPacket * 100.0) / this.TotalPacket).toFixed(2);
}

//视频码流测试状态列表
function BitrateStatusList() {
    this.Page = new Page();    //分页信息 Y
    this.BitrateStatus = new Array(); //视频码流测试状态列表 Y
}

/*   Flags    */
function Flags(enums) {
    this.Value = new Array();


    if (Array.isArray(enums)) {
        for (var i = 0; i < enums.length; i++) {
            this.Value.push(enums[i]);
        }

    }
    else {
        for (var index in enums) {
            this.Value.push(enums[index]);
        }
    }
}
Flags.Parse = function (str) {
    var result = new Flags();
    result.Value = str.split(",");

    if (result.Value) {
        for (var i = 0; i < result.Value.length; i++) {
            result.Value[i] = result.Value[i].trim();
        }
    }

    return result;
}
Flags.prototype.AllToItems = function (_enum) {
    this.Value = new Array();
    var i = 0;
    for (var e in _enum) {
        if (e == "All" || e == "None")
            continue;
        this.Value[i++] = _enum[e];
    }
}
Flags.prototype.TryToNone = function () {
    delete this.Value["None"];
    for (var v in this.Value) {
        return false;
    }
    this.Value["None"] = "None";
    return true;
}

Flags.prototype.toString = function () {
    var result = "";
    for (var i = 0; i < this.Value.length; i++) {
        if (i > 0)
            result += ",";
        result += this.Value[i];
    }
    return result;
}

//系统故障统计信息
function SystemFaultStatistics() {
    this.FaultNumber = 0;                 //故障数目	N
    this.OfflineNumber = 0;               //离线设备数目	N
    this.StorageMediumAbnormalNumber = 0; //出错的存储媒介数目	N
    this.VideolossNumber = 0;             //视频丢失通道数目	N
}
//系统警告统计信息
function SystemWarningStatistics() {

    this.WarningNumber = 0;                 //警告数目	N
    this.CPUUsageNumber = 0;                //CPU过高设备数目	N
    this.MemoryUsageNumber = 0;             //内存过高设备数目	N
    this.NetworkUsageNumber = 0;            //网口使用率过高数目	N
    this.SuperHeatNumber = 0;               //过热设备数目	Y
    this.SuperHeatNumberSpecified = false;
    this.VoltageInstabilityNumber = 0;      //电压不稳数目	Y
    this.VoltageInstabilityNumberSpecified = false;
    this.VideoHighLoadNumber = 0;           //设备视频负载过高数目	Y
    this.VideoHighLoadNumberSpecified = false;
    this.VideoNetworkInstabilityNumber = 0; //视频网络状态不稳定通道数目	Y
    this.VideoNetworkInstabilityNumberSpecified = false;
    this.TeardownNumber = 0;                 //异常上下线设备数目	Y
    this.TeardownNumbeSpecified = false;
    this.VideoConnectionFailureNumber = 0;  //系统视频连接失败率过高或数目	Y
    this.VideoConnectionFailureNumberSpecified = false;
}

//系统健康度统计信息
function SystemHealthStatistics() {
    this.Id = "";                                   //统计信息唯一标识符
    //健康度百分比
    this.Percentage = 100.0;                        //健康度百分比
    this.Faults = new SystemFaultStatistics();      //系统故障统计信息
    this.Warnings = new SystemWarningStatistics();  //系统警告统计信息
}

function SystemFaultReport() {
    this.Id = ""; //报告唯一标识符
    this.CreationTime = new Date(); //创建时间
    this.FaultType = SystemFaultType.None; //系统故障类型
    this.ComponentId = ""; //故障对象的唯一标识符，Offline则是设备唯一标识符，Videoloss 则是视频输入通道唯一标识符
    this.Recovered = false; //是否已恢复
    this.RecoveryTime = new Date(); //恢复时间
    this.Description = ""; //描述信息
    this.ComponentName = ""; //故障对象的名称 v1.4b
}
function SystemFaultReportList() {
    this.Page = new Page();
    this.SystemFaultReport = new Array();
}
function SystemWarningReport() {
    this.Id = ""; //报告唯一标识符
    this.CreationTime = new Date(); //创建时间
    this.WarningType = SystemWarningType.None;  //系统警告类型
    this.ComponentId = ""; //警告对象的唯一标识符
    this.Description = ""; //描述信息
    this.ComponentName = ""; //警告对象的名称 v1.4b

}

function SystemWarningReportList() {
    this.Page = new Page();
    this.SystemWarningReport = new Array();
}
function HeartbeatLog() {
    this.Id = "";                           //设备注册Id，由数据服务器分配	N
    this.Time = new Date();                 //日志时间	N
    this.CpuUsage = 0.0;                    //当前Cpu使用率     百分比[0,100]	N
    this.MemoryUsage = 0.0;                 //内存使用率     百分比[0,100]	N
    this.WorkingSeconds = 0;                //设备运行时间 单位：秒	N
    this.Temperature = 0.0;                 //设备温度 单位：摄氏度	Y    
    this.Pressure = 0.0;                    //压力 单位：帕	Y
    this.Voltage = 0.0;                     //当前工作电压 单位：伏特	Y
    this.NetworkSpeedRate = 0.0;            //心跳间隔时间内的平均网络速度, 单位：Kbps	Y
    this.NetworkUsage = 0.0;                //网络使用率[0,100] 	Y
    this.VideoConnectionNumber = 0;         //当前视频连接数目 	Y
    this.StorageMediumAbnormalNumber = 0;   //异常的存储媒介数目	Y


    //this.TemperatureSpecified = false;
    //this.PressureSpecified = false;
    //this.VoltageSpecified = false;
    //this.NetworkSpeedRateSpecified = false;
    //this.NetworkUsageSpecified = false;
    //this.VideoConnectionNumberSpecified = false;
    //this.StorageMediumAbnormalNumberSpecified = false;
}

function HeartbeatLogList() {
    this.Page = new Page();
    this.HeartbeatLog = new Array();
}
//事件联动参数
function EventLinkageParameter() {
    this.Name = ""; //参数名称	N
    this.Type = ""; //参数类型	N
    this.DefaultValue = ""; //默认值	N
}
//视频预览操作唯一标识符
function VideoPreviewIdentifier() {
    this.VideoInputChannelId = ""; //视频输入通道唯一标识符	N
    this.StreamNo = 1; //视频流编号 1-n	N
    this.Protocol = ""; //视频流连接协议	Y
    this.ProtocolSpecified = false;

}

//视频回放操作唯一标识符
function VideoPlaybackIdentifier() {
    this.VideoInputChannelId = ""; //视频输入通道唯一标识符
    this.StreamNo = 1; //视频流编号 1-n
    this.Protocol = ""; //视频流连接协议
    this.BeginTime = 0; //开始时间，正数表示触发时间往后多少单位时间，负数表示触发事件往前多少单位时间,(单位：秒) ，如果该值为null或0则表示报警时间开始回放
    this.EndTime = 0; //结束时间，正数表示触发时间往后多少单位时间，负数表示触发事件往前多少单位时间,(单位：秒) ，如果该值为null则表示回放到自动结束

}

function Font() {
    this.FontSize = 0.0; //字体大小	N
    this.FontColor = 0; //字体颜色 ARGB格式	N
    this.FontFamily = ""; //字体	N
    this.Bold = false; //粗体	N
}

//联动显示信息
function TextIdentifier() {
    this.Text = ""; //文本信息	N
    this.Duration = 0; //持续时间(单位:秒)，0表示始终显示	N
    this.Font = new Font(); //显示文本字体	Y
    this.FontSpecified = false;

}

//联动音频
function AudioPlayerIdentifier() {
    this.AudioUrl = ""; //音频文件路径	N
    this.RepeatTimes = 0; //音频文件重复播放次数	Y
    this.RepeatTimesSpecified = false;
    this.Duration = 0; //音频文件播放持续时间，单位：秒	Y
    this.DurationSpecified = false;

}

//视频抓图操作唯一标识符
function VideoSnapIdentifier() {
    this.VideoInputChannelId = ""; //视频输入通道唯一标识符	N
    this.StreamNo = 1; //视频流编号 1-n	N
    this.PictureFormat = PictureFormat.Jpeg; //   图片格式，默认：Jpeg	Y
    this.PictureFormatSpecified = false;
}
function EventLinkage() {
    /// <signature>
    /// <summary>事件联动</summary>
    /// <field name='ComponentId' type='String'>组件唯一标识符	N</field>
    /// <field name='EventType' type='EventType'>事件类型	N</field>
    /// <field name='EventState' type='EventState'>事件状态	N</field>
    /// <field name='VideoPreviewIdentifier' type='VideoPreviewIdentifier[]'>视频预览操作唯一标识符	Y</field>
    /// <field name='VideoPlaybackIdentifier' type='VideoPlaybackIdentifier[]'>视频回放操作唯一标识符	Y</field>
    /// <field name='TextIdentifier' type='TextIdentifier'>联动显示信息	Y</field>
    /// <field name='AudioPlayerIdentifier' type='AudioPlayerIdentifier'>联动音频	Y</field>
    /// <field name='VideoSnapIdentifier' type='VideoSnapIdentifier[]'>视频抓图操作唯一标识符	Y</field>
    /// <field name='Executor' type='String[]'>执行者	Y</field>
    /// <field name='DecoderIdentifier' type='DecoderIdentifier[]'>解码器视频预览联动的解码器设备列表 V2.1	Y</field>
    /// </signature>


    this.ComponentId = ""; //组件唯一标识符	N
    this.EventType = EventType.None; //事件类型	N
    this.EventState = EventState.Inactive; //事件状态	N
    this.VideoPreviewIdentifier = new Array(); //视频预览操作唯一标识符	Y
    this.VideoPreviewIdentifierSpecified = false;
    this.VideoPlaybackIdentifier = new Array(); //视频回放操作唯一标识符	Y
    this.VideoPlaybackIdentifierSpecified = false;
    this.TextIdentifier = new TextIdentifier() //联动显示信息	Y
    this.TextIdentifierSpecified = false;
    this.AudioPlayerIdentifier = new AudioPlayerIdentifier(); //联动音频	Y
    this.AudioPlayerIdentifierSpecified = false;
    this.VideoSnapIdentifier = new Array(); //视频抓图操作唯一标识符	Y
    this.VideoSnapIdentifierSpecified = false;
    this.Executor = new Array(); //执行者	Y
    this.ExecutorSpecified = false;

    this.DecoderIdentifier = new Array();
    this.DecoderIdentifierSpecified = false;
}



//事件联动模板
function EventLinkageTemplate() {
    this.Id = ""; //唯一标识符	N
    this.Name = ""; //模板名称	N
    this.Parameter = new Array(); //联动模板参数列表	Y
    this.ParameterSpecified = false;
    this.EventLinkage = new EventLinkage(); //事件联动对象	N
}

//事件联动模板列表
function EventLinkageTemplateList() {
    this.Page = new Page(); //分页信息	Y
    this.EventLinkageTemplate = new Array()//事件联动模板列表	Y
}



//服务器随机数
function ServerNonce() {
    this.Nonce = "";    //随机数[A-Za-z0-9]{32}	N
    this.Domain = "";   //域信息	N
    this.UserId = "";
}


//客户端凭证
function ClientCredential() {
    /// <signature>
    /// <summary>客户端凭证</summary>
    /// <field name='UserName' type='String'>用户名 N</field>
    /// <field name='Domain' type='String'>域信息 N</field>
    /// <field name='Nonce' type='String'>随机数[A-Za-z0-9]{32}	N</field>
    /// <field name='ClientNonce' type='String'>随机数[A-Za-z0-9]{32} N</field>
    /// <field name='VerifySession' type='String'>认证信息 MD5 UserName@Domain:Nonce:ClientNonce:MD5(Password)) N</field>
    /// <field name='PhysicalAddress' type='String'>物理地址 00-00-00-00-00-00 Y</field>
    /// </signature>
    this.UserName = "";
    this.Nonce = "";
    this.Domain = "";
    this.ClientNonce = "";
    this.VerifySession = "";
    this.PhysicalAddress = "";
    this.PhysicalAddressSpecified = false;
}

ClientCredential.prototype.SetVerifySession = function (username, password, md5) {
    /// <signature>
    /// <param name='username' type='String' >用户名</param>
    /// <param name='password' type='String' >密码</param>
    /// <returns type='String'/>
    /// </signature>
    var pwd = hex_md5(password).toLowerCase();
    if (md5)
        pwd = password;
    this.VerifySession = hex_md5(
        username + "@" +
        this.Domain + ":" +
        this.Nonce + ":" +
        this.ClientNonce + ":" +
        pwd
    ).toLowerCase();
}


//方法有效性认证

function MethodValidation() {

    this.UserName = "";    //	用户名	N
    this.SessionId = "";    //	会话ID	N
    this.Method = "";    //	REST方法：    GET,POST,PUT,DELET	N
    this.URL = "";    //	访问路径地址	N
    this.MethodVerifySession = "";    //	认证信息    MD5(METHOD:URL:Verifysession)	N
}


//注销凭证

function TeardownCredential() {
    this.UserName = "";    //	用户名	N
    this.SessionId = "";    //	会话ID	N
    this.TeardownReason = "";    //	注销原因	Y
    this.TeardownReasonSpecified = false;
}

function MapItem() {
    /// <signature>
    /// <summary>地图子项</summary>
    /// <field name='Id' type='String'>地图子项唯一标识符 N</field>
    /// <field name='ItemType' type='MapItemType'>地图子项类型 N</field>
    /// <field name='ComponentId' type='String'>组件唯一标识符，如：报警器探头、摄像机等 N</field>
    /// <field name='Coordinate' type='Coordinate'>子项中心点坐标 N</field>
    /// <field name='VerifySession' type='String'>认证信息 MD5 UserName@Domain:Nonce:ClientNonce:MD5(Password)) N</field>
    /// <field name='Angle' type='Double'>顺时针旋转角度[0-360],默认：0 Y</field>
    /// </signature>

    this.Id = "";
    this.ItemType = MapItemType.None;
    this.ComponentId = "";
    this.Coordinate = new Coordinate();
    this.Angle = 0.0;
    this.AngleSpecified = false;

}

function Coordinate() {
    this.X = 0.0;
    this.Y = 0.0;
}

function IOInputChannelPermission() {
    /// <signature>
    /// <summary>报警输入权限</summary>
    /// <field name='Id' type='String'>报警输入通道唯一标识符 N</field>
    /// <field name='Name' type='String'>报警输入通道名称 N</field>
    /// <field name='Permission' type='String'>报警输入通道权限 N</field>
    /// <field name='IOInputChannel' type='IOInputPermissions'>报警输入通道信息 N</field>
    /// <field name='IsFromDepartment' type='Boolean'>是否来自部门共享 Y</field>
    /// </signature>


    this.Id = "";
    this.Name = "";
    this.Permission = IOInputPermissions.None;
    this.IOInputChannel = new IOInputChannel();
    this.IsFromDepartment = false;
    this.IsFromDepartmentSpecified = false;

}

function IOInputChannelPermissionList() {
    /// <signature>
    /// <summary>报警输入权限列表</summary>
    /// <field name='Page' type='Page'>分页信息</field>
    /// <field name='IOInputChannelPermission' type='IOInputChannelPermission[]'>报警输入通道权限列表</field>
    /// </signature>

    this.Page = new Page();
    this.IOInputChannelPermission = new Array();
}

function IOOutputChannelPermission() {
    /// <signature>
    /// <summary>报警输出权限</summary>
    /// <field name='Id' type='String'>报警输出通道唯一标识符 N</field>
    /// <field name='Name' type='String'>报警输出通道名称 N</field>
    /// <field name='Permission' type='String'>报警输出通道权限 N</field>
    /// <field name='IOOutputChannel' type='IOOutputPermissions'>报警输出通道信息 N</field>
    /// <field name='IsFromDepartment' type='Boolean'>是否来自部门共享 Y</field>
    /// </signature>


    this.Id = "";
    this.Name = "";
    this.Permission = IOOutputPermissions.None;
    this.IOOutputChannel = new IOOutputChannel();
    this.IsFromDepartment = false;
    this.IsFromDepartmentSpecified = false;

}

function IOOutputChannelPermissionList() {
    /// <signature>
    /// <summary>报警输出权限列表</summary>
    /// <field name='Page' type='Page'>分页信息</field>
    /// <field name='IOOutputChannelPermission' type='IOOutputChannelPermission[]'>报警输出通道权限列表</field>
    /// </signature>

    this.Page = new Page();
    this.IOOutputChannelPermission = new Array();
}


function WiFiInformation() {
    /// <signature>
    /// <summary>WiFi设备信息</summary>
    /// <field name='Name' type='String'>WiFi连接名称	N</field>    
    /// <field name='Password' type='String'>WiFi连接密码	N</field>
    /// <field name='Channel' type='Int32'>WiFi信道[0-15] 默认：0 N</field>
    /// <field name='Intensity' type='Int32'>WiFi信号强度[0-100] 默认：0（只读）	N</field>
    /// </signature>
    this.Name = "";
    this.Password = "";
    this.Channel = 0;
    this.Intensity = 0;
}

function UltrasonicInformation() {
    /// <signature>
    /// <summary>超声波信息</summary>
    /// <field name='Interval' type='Int32'>探测间隔 （单位：毫秒) 默认：50 N</field>    
    /// <field name='Range' type='Int32'>探测距离 (单位：CM厘米)默认：50 N</field>
    /// <field name='MaxRange' type='Int32'>最大探测距离 (单位：CM厘米) 默认：150 N</field>
    /// </signature>

    this.Interval = 50;
    this.Range = 50;
    this.MaxRange = 150;
}

function UserSessionList() {
    /// <signature>
    /// <summary>用户会话信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。Y</field>    
    /// <field name='UserSession' type='Array'>用户会话信息	Y</field>    
    /// </signature>

    this.Page = new Page();
    this.UserSession = new Array();
}

function UserSession() {
    /// <signature>
    /// <summary>用户会话信息</summary>
    /// <field name='Id' type='String'>会话唯一标识符	N</field>
    /// <field name='Username' type='String'>管理员的用户名，用户名必须全局唯一，不允许多个相同用户名用户在系统中出现。管理员的用户名必须符合系统指定的格式	N</field>
    /// <field name='CreationTime' type='Date'>会话创建时间	N/field>
    /// <field name='TeardownTime' type='Date'>会话关闭时间	N</field>
    /// <field name='IPAddress' type='String'>客户端IP地址	N</field>
    /// <field name='PhysicalAddress' type='String'>客户端物理地址	Y</field>
    /// <field name='TeardownReason' type='String'>关闭原因	Y</field>


    this.Id = "";
    this.Username = "";
    this.CreationTime = new Date();
    this.TeardownTime = new Date();
    this.IPAddress = "";
    this.PhysicalAddress = "";
    this.PhysicalAddressSpecified = false;
    this.TeardownReason = "";
    this.TeardownReasonSpecified = false;
}

function EventRecord() {
    /// <signature>
    /// <summary>事件记录</summary>
    /// <field name='Id' type='String'>事件唯一标识符（设备产生的）	N</field>
    /// <field name='ComponentId' type='Id'>报警单元模块唯一标识符	N</field>
    /// <field name='Name' type='String'>报警单元模块名称或描述信息	N</field>
    /// <field name='EventType' type='EventType'>事件类型	N</field>
    /// <field name='AlarmTime' type='Date'>报警/触发时间	N</field>
    /// <field name='Severity' type='Int32'>重要级别	N</field>
    /// <field name='DisalarmTime' type='Date'>报警撤销时间	Y</field>
    /// <field name='ProcessTime' type='Date'>处理时间	Y</field>
    /// <field name='ProcessDescription' type='String'>处理描述信息	Y</field>
    /// <field name='Description' type='String'>描述信息 v2.1	Y</field>
    /// <field name='ObjectType' type='ObjectType'>目标对象类型 v2.1	Y</field>
    /// <field name='TriggerValue' type='Double'>触发事件时的数值 v2.1	Y</field>
    /// <field name='PictureId' type='String[]'>图片ID列表 v2.1	Y</field>
    /// <field name='RecordedFile' type='EventRecordedFile[]'>录像文件信息列表 v2.1	Y</field>
    /// </signature>
    this.Id = "";
    this.ComponentId = "";
    this.Name = "";
    this.EventType = EventType.None;
    this.AlarmTime = new Date()
    this.Severity = 0;
    this.DisalarmTime = new Date()
    this.ProcessTime = new Date()
    this.ProcessDescription = "";
    this.ProcessDescriptionSpecified = false;
    this.Description = "";
    this.DescriptionSpecified = false;
    this.ObjectType = ObjectType.None;
    this.ObjectTypeSpecified = false;
    this.TriggerValue = 0.0;
    this.TriggerValueSpecified = false;
    this.PictureId = new Array();
    this.PictureIdSpecified = false;
    this.RecordedFile = new Array();
    this.RecordedFileSpecified = false;
}

function EventRecordedFile() { //v2.1
    /// <signature>
    /// <summary>事件录像文件信息</summary>
    /// <field name='RecordedFileId' type='String'>录像文件唯一标识符 //v2.1	N</field>
    /// <field name='RecordedFileTimestamp' type='Int64'>录像文件相对的开始时标(单位 ：微秒)//v2.1	Y</field>
    /// </signature>

    this.RecordedFileId = "";
    this.RecordedFileTimestamp = 0;
    this.RecordedFileTimestampSpecified = false;
}

function ATMShield() //v2.1
{
    /// <signature>
    /// <summary>ATM防护舱信息</summary>
    /// <field name='Id' type='Id'>ATM防护舱序列号	N</field>
    /// <field name='Name' type='String'>ATM防护舱名称	N</field>
    /// <field name='VideoInputChannel' type='VideoInputChannel[]'>ATM防护舱关联的视频输入通道	Y</field>
    /// </signature>

    this.Id = "";
    this.Name = "";
    this.VideoInputChannel = new Array();
    this.VideoInputChannelSpecified = false;
}

function ATMShieldList() //v2.1
{
    /// <signature>
    /// <summary>ATM防护舱信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='ATMShield' type='ATMShield[]'>ATM防护舱信息列表	Y</field>
    /// </signature>

    this.Page = new Page();
    this.ATMShield = new Array();

}
function ATMAddNotes() //v2.1
{
    /// <signature>
    /// <summary>ATM加钞间</summary>
    /// <field name='Id' type='Id'>ATM加钞间序列号	N</field>
    /// <field name='Name' type='String'>ATM加钞间名称	N</field>
    /// <field name='VideoInputChannel' type='VideoInputChannel[]'>ATM加钞间关联的视频输入通道	Y
    /// </signature>


    this.Id = "";
    this.Name = "";
    this.VideoInputChannel = new Array();
    this.VideoInputChannelSpecified = false;

}
function ATMAddNotesList() //v2.1
{
    /// <signature>
    /// <summary>ATM加钞间信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='ATMAddNotes' type='ATMAddNotes[]'>ATM加钞间信息列表	Y</field>
    /// </signature>

    this.Page = new Page();
    this.ATMAddNotes = new Array();


}
function UserStatus() //v2.1
{
    /// <signature>
    /// <summary>用户状态信息</summary>
    /// <field name='Id' type='Id'>用户唯一标识符	N</field>
    /// <field name='Username' type='String'>管理员的用户名，用户名必须全局唯一，不允许多个相同用户名用户在系统中出现。管理员的用户名必须符合系统指定的格式	N</field>
    /// <field name='Online' type='Boolean'>是否在线	N</field>
    /// <field name='LastOnlineTime' type='DateTime'>最后在线时间	N</field>
    /// <field name='Status' type='Int32 '>状态信息(保留)	Y</field>
    /// </signature>

    this.Id = "";
    this.Username = "";
    this.Online = false;
    this.LastOnlineTime = new Date();
    this.Status = 0;
    this.StatusSpecified = false;


}
function UserStatusList() //v2.1
{
    /// <signature>
    /// <summary>用户状态信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='UserStatus' type='UserStatus[]'>用户状态信息	Y</field>
    /// </signature>
    this.Page = new Page();
    this.UserStatus = new Array();

}

function Notice() {
    /// <signature>
    /// <summary>通知信息 v2.1</summary>
    /// <field name='Id' type='String'>通知信息唯一标识符	N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间	N</field>
    /// <field name='Message' type='String'>通知信息内容	N</field>
    /// <field name='Classification' type='NoticeClassification'>通知分类	N</field>
    /// <field name='Status' type='NoticeStatusType'>通知信息状态	N</field>
    /// <field name='Sender' type='String'>通知发送者	N</field>
    /// <field name='ComponentId' type='String'>通知报警或其它组件唯一标识符	Y</field>
    /// <field name='ComponentName' type='String'>组件名称	Y</field>
    /// <field name='PictureIds' type='String'>联动后的图片信息唯一标识符，多个图片唯一标识符直接使用（，逗号）分割	Y</field>
    /// <field name='NoticeType' type='NoticeType'>通知类型	N</field>
    /// <field name='UserId' type='Id'>用户唯一标识符(消息所属用户，一般是接收者)	N</field>
    /// </signature>

    this.Id = "";
    this.CreationTime = new Date();
    this.Message = "";
    this.Classification = NoticeClassification.None;
    this.Status = NoticeStatusType.Unread;
    this.Sender = "";
    this.ComponentId = "";
    //this.ComponentIdSpecified = false;
    this.ComponentName = "";
    //this.ComponentNameSpecified = false;
    this.PictureIds = "";
    //this.PictureIdsSpecified = false;
    this.NoticeType = NoticeType.None;
    this.UserId = "";

}
function NoticeList() {
    /// <signature>
    /// <summary>通知信息列表 v2.1</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='Notice' type='Notice[]'>通知信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.Notice = new Array();
}
function ServerInformation() {
    /// <signature>
    /// <summary>中心服务器信息 v2.1</summary>
    /// <field name='Address' type='String'>服务器地址,可能是域名也可能是IP	N</field>
    /// <field name='Port' type='Int32'>端口号	N</field>
    /// <field name='TimeSynchronization' type='Boolean'>是否自动时间同步,默认:false	Y</field>
    /// <field name='ProtocolVersion' type='ProtocolVersion'>协议版本,默认:ver10 （只读）	Y</field>
    /// </signature>

    this.Address = "0.0.0.0";
    this.Port = 8800;
    this.TimeSynchronization = false;
    this.TimeSynchronizationSpecified = false;
    this.ProtocolVersion = ProtocolVersion.ver10;
    this.ProtocolVersionSpecified = false;
}
function PreviewSourceList() {
    /// <signature>
    /// <summary>预览来源列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='PreviewSource' type='PreviewSource[]'>预览来源	Y</field>
    /// </signature>

    this.Page = new Page();
    this.PreviewSource = new Array();
}

function PreviewSource() {
    /// <signature>
    /// <summary>预览来源</summary>
    /// <field name='Id' type='String'>GUID	N</field>
    /// <field name='PreviewFromId' type='Id'>视频预览来源的通道/设备标识符	N</field>
    /// <field name='PreviewFromUrl' type='String'>视频源来自的Url地址	Y</field>
    /// </signature>

    this.Id = "";
    this.PreviewFromId = "";
    this.PreviewFromUrl = "";
    this.PreviewFromUrlSpecified = false;
}
function PlaybackSource() {
    /// <signature>
    /// <summary>回放来源</summary>
    /// <field name='Id' type='String'>GUID	N</field>
    /// <field name='PlaybackFromId' type='Id'>视频回放来源的通道/设备标识符	N</field>
    /// <field name='PlaybackFromUrl' type='String'>视频回放来源的Url地址	Y</field>
    /// </signature>
    this.Id = "";
    this.PlaybackFromId = "";
    this.PlaybackFromUrl = "";
    this.PlaybackFromUrlSpecified = false;
}
function PlaybackSourceList() {
    /// <signature>
    /// <summary>回放来源列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='PlaybackSource' type='PlaybackSource[]'>回放来源	Y</field>
    /// </signature>

    this.Page = new Page();
    this.PlaybackSource = new Array();
}
function MapList() {
    /// <signature>
    /// <summary>回放来源列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='Map' type='Map[]'>地图信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.Map = new Array();
}
function Map() {
    /// <signature>
    /// <summary>地图信息</summary>
    /// <field name='Id' type='Id'>地图唯一标识符 (只读)	N</field>
    /// <field name='Name' type='String'>地图名称Base64(UTF-8)	N</field>
    /// <field name='Comment' type='String'>地图注释信息Base64(UTF-8)	Y</field>
    /// <field name='MapFormat' type='MapFormat'>地图格式 	N</field>
    /// <field name='MD5Code' type='String'>地图数据的MD5码,如果已缓存地图数据与MD5码必配则无需下载地图数据	Y</field>
    /// <field name='LastModificationTime' type='DateTime'>地图及其子项的最后修改时间,客户端可以对比此时间来确定是否需要更新地图信息	Y</field>
    /// </signature>
    this.Id = "";
    this.Name = "";
    this.Comment = "";
    this.MapFormat = MapFormat.Jpeg;
    this.MD5Code = "";
    this.MD5CodeSpecified = false;
    this.LastModificationTime = new Date();
    this.LastModificationTimeSpecified = false;
}
function MapItemList() {
    /// <signature>
    /// <summary>地图子项列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='Map' type='MapItem[]'>地图子项	Y</field>
    /// </signature>
    this.Page = new Page();
    this.MapItem = new Array();
}

function LinkageTemplate() {
    /// <signature>
    /// <summary>联动模板信息</summary>
    /// <field name='Id' type='String'>联动模板唯一标识符GUID (只读)	N</field>
    /// <field name='Name' type='String'>联动模板名称	N</field>
    /// <field name='ScriptType' type='LinkageTemplateScriptType'>联动脚本对应的类型名称v1.5	N</field>
    /// <field name='Script' type='String'>联动条件及行为，使用 BASE64(UTF-8(Script))编码后的数据	N</field>
    /// <field name='Comment' type='String'>联动模板注释信息	Y</field>
    /// </signature>
    this.Id = "";
    this.Name = "";
    this.ScriptType = LinkageTemplateScriptType.None;
    this.Script = "";
    this.Comment = "";
    this.CommentSpecified = false;
}
function LinkageTemplateList() {
    /// <signature>
    /// <summary>联动模板信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='LinkageTemplate' type='LinkageTemplate[]'>联动模板信息	Y</field>
    /// </signature>
    this.Page = new Page();
    this.LinkageTemplate = new Array();
}
function EventRecordList() {
    /// <signature>
    /// <summary>事件记录列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='EventRecord' type='EventRecord[]'>事件记录	Y</field>
    /// </signature>
    this.Page = new Page();
    this.EventRecord = new Array();
}

function EventLinkageList() {
    /// <signature>
    /// <summary>事件联动列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='EventLinkage' type='EventLinkage[]'>事件联动列表	Y</field>
    /// </signature>
    this.Page = new Page();
    this.EventLinkage = new Array();
}

function MapGroup() {
    /// <signature>
    /// <summary>地图分组信息</summary>
    /// <field name='Id' type='Id'>地图分组唯一标识符 (只读)	N</field>
    /// <field name='Name' type='String'>地图分组名称	N</field>
    /// <field name='Comment' type='String'>地图注释信息	Y</field>
    /// <field name='ParentId' type='Id'>父节点的分组唯一标识符 (只读)	Y</field>
    /// </signature>

    this.Id = "";
    this.Name = "";
    this.Comment = "";
    this.CommentSpecified = false;
    this.ParentId = "";
    this.ParentIdSpecified = false;
}
function MapGroupList() {
    /// <signature>
    /// <summary>地图分组列表信息</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='EventLinkage' type='MapGroup[]'>地图信息	Y</field>
    /// </signature>
    this.Page = new Page();
    this.MapGroup = new Array();
}

function VideoInputChannelGroup() {
    /// <signature>
    /// <summary>视频输入通道分组信息</summary>
    /// <field name='Id' type='String'>视频分组唯一标识符GUID (只读)	N</field>
    /// <field name='Name' type='String'>视频分组名称	N</field>
    /// <field name='Comment' type='String'>视频注释信息	Y</field>
    /// <field name='ParentId' type='String'>父节点的分组唯一标识符GUID (只读)	Y</field>

    this.Id = "";
    this.Name = "";
    this.Comment = "";
    this.CommentSpecified = false;
    this.ParentId = "";
    this.ParentIdSpecified = false;

}
function VideoInputChannelGroupList() {
    /// <signature>
    /// <summary>视频输入通道分组信息</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='VideoInputChannelGroup' type='VideoInputChannelGroup[]'>视频输入分组信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.VideoInputChannelGroup = new Array();
}
function Linkage() {
    /// <signature>
    /// <summary>联动信息</summary>
    /// <field name='Id' type='String'>联动唯一标识符 GUID (只读)	N</field>
    /// <field name='Name' type='String'>联动名称	N</field>
    /// <field name='ScriptType' type='LinkageTemplateScriptType'>联动脚本对应的类型名称v1.5	N</field>
    /// <field name='Script' type='String'>联动条件及行为，使用 BASE64(UTF-8(Script))编码后的数据	N</field>
    /// <field name='DeviceId' type='String'>联动所属设备唯一标识符	N</field>
    /// </signature>

    this.Id = "";
    this.Name = "";
    this.ScriptType = LinkageTemplateScriptType.None;
    this.Script = "";
    this.DeviceId = "";

}
function LinkageList() {
    /// <signature>
    /// <summary>联动信息列表</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='Linkage' type='Linkage[]'>联动信息	Y</field>
    /// </signature>
    this.Page = new Page();
    this.Linkage = new Array();
}

function RFIDAntenna() {
    /// <signature>
    /// <summary>RFID天线 v2.0</summary>
    /// <field name='Id' type='Id'>RFID天线序列号	N</field>
    /// <field name='MaxDistance' type='Int32'>最大接收距离(单位:CM)	N</field>
    /// <field name='Manufacturer' type='String'>生产厂商 (只读)	Y</field>
    /// <field name='Model' type='String'>型号 (只读)	Y</field>
    /// <field name='Description' type='String'>描述信息	Y</field>
    /// </signature>
    this.Id = "";
    this.MaxDistance = 0;
    this.Manufacturer = "";
    this.Model = "";
    this.Description = "";

}

function RFIDAntennaList() {
    /// <signature>
    /// <summary>RFID天线列表 v2.0</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='RFIDAntenna' type='RFIDAntenna[]'>RFID天线列表	Y</field>
    /// </signature>
    this.Page = new Page();
    this.RFIDAntenna = new Array();
}

function RFIDCard() {
    /// <signature>
    /// <summary>RFID芯片卡 v2.0</summary>
    /// <field name='Id' type='String'>RFID芯片唯一标识符	N</field>
    /// <field name='Manufacturer' type='String'>厂商信息	Y</field>
    /// <field name='Model' type='String'>型号	Y</field>
    /// <field name='Description' type='String'>描述信息	Y</field>
    /// </signature>
    this.Id = "";
    this.Manufacturer = "";
    this.Model = "";
    this.Description = "";

}

function RFIDCardList() {
    /// <signature>
    /// <summary>RFID芯片列表 v2.0</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='RFIDCard' type='RFIDCard[]'>RFID芯片卡列表	Y</field>
    /// </signature>
    this.Page = new Page();
    this.RFIDCard = new Array();
}

function RFIDGroup() {
    /// <signature>
    /// <summary>RFID芯片卡分组 v2.0</summary>
    /// <field name='Id' type='String'>RFID芯片卡分组唯一标识符	N</field>
    /// <field name='Name' type='String'>分组名称	N</field>
    /// <field name='Description' type='String'>描述信息	Y</field>
    /// </signature>
    this.Id = "";
    this.Name = "";
    this.Description = "";

}

function RFIDGroupList() {
    /// <signature>
    /// <summary>RFID芯片卡分组列表 v2.0</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='RFIDGroup' type='RFIDGroup[]'>RFID芯片卡分组列表	Y</field>
    /// </signature>
    this.Page = new Page();
    this.RFIDGroup = new Array();
}

function RFIDGroupPriority() {
    /// <signature>
    /// <summary>RFID芯片卡分组权限 v2.0</summary>
    /// <field name='RFIDGroupId' type='String'>RFID芯片卡分组唯一标识符	N</field>
    /// <field name='RFIDAntennaId' type='String'>RFID接收天线唯一标识符	N</field>
    /// <field name='MaxDuration' type='Int32'>最大停留时间，默认：0，表示没有限制	N</field>
    /// </signature>
    this.RFIDGroupId = "";
    this.RFIDAntennaId = "";
    this.MaxDuration = 0;
}

function RFIDGroupPriorityList() {
    /// <signature>
    /// <summary>RFID芯片卡分组权限列表 v2.0</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='RFIDGroupPriority' type='RFIDGroupPriority[]'>RFID芯片卡分组权限列表	Y</field>
    /// </signature>
    this.Page = new Page();
    this.RFIDGroupPriority = new Array();

}

function Visitor() {
    /// <signature>
    /// <summary>访客信息 v2.0</summary>
    /// <field name='Id' type='String'>访客唯一标识符	N</field>
    /// <field name='Name' type='String'>姓名	N</field>
    /// <field name='IdNumberType' type='IdNumberType'>证件类型	N</field>
    /// <field name='IdNumber' type='String'>证件编号	N</field>
    /// <field name='Sex' type='Sex'>性别	N</field>
    /// <field name='Age' type='Int32'>年龄	N</field>
    /// <field name='Nationality' type='String'>国籍	N</field>
    /// <field name='Nation' type='String'>民族	N</field>
    /// <field name='Description' type='String'>描述信息	Y</field>
    /// <field name='Mobile' type='String'>电话号码	Y</field>
    /// <field name='VisitedCount' type='Int32'>已访问次数（包括当前这次）	</field>
    /// </signature>

    this.Id = "";
    this.Name = "";
    this.IdNumberType = IdNumberType.IDCard;
    this.IdNumber = "";
    this.Sex = Sex.None;
    this.Age = 0;
    this.Nationality = "";
    this.Nation = "";
    this.Description = "";
    this.Mobile = "";
    this.VisitedCount = 1;
}

function VisitorList() {
    /// <signature>
    /// <summary>访客信息列表 v2.0</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='Visitor' type='Visitor[]'>访客信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.Visitor = new Array();
}

function VisitorRecord() {
    /// <signature>
    /// <summary>访客记录信息 v2.0</summary>
    /// <field name='Id' type='String'>访客记录唯一标识符	N</field>
    /// <field name='EntryTime' type='DateTime'>进入时间	N</field>
    /// <field name='DepartureTime' type='DateTime'>离开时间	N</field>
    /// <field name='VisitedUnit' type='String'>受访房间，地址	Y</field>
    /// <field name='VisitedStaff' type='String'>受访人员	Y</field>
    /// <field name='VisitedDepartment' type='String'>受访部门	Y</field>
    /// <field name='PermissionLevel' type='Int32'>访问权限级别 0-n	N</field>
    /// <field name='Description' type='String'>描述信息	Y</field>
    /// <field name='VisitorRecordNumber' type='String'>访客单号（唯一，由登记系统生成）	N</field>
    /// <field name='VisitorCount' type='Int32'>访客数目（一般是1）	N</field>
    /// <field name='Visitor' type='Visitor'>关联的访客信息	N</field>
    /// </signature>

    this.Id = "";
    this.EntryTime = new Date();
    this.DepartureTime = new Date();
    this.VisitedUnit = "";
    this.VisitedStaff = "";
    this.VisitedDepartment = "";
    this.PermissionLevel = Int32
    this.Description = "";
    this.VisitorRecordNumber = "";
    this.VisitorCount = 1;
    this.Visitor = new Visitor();
}


function VisitorRecordList() {
    /// <signature>
    /// <summary>访客记录信息列表 v2.0</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='VisitorRecord' type='VisitorRecord[]'>访客记录信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.VisitorRecord = new Array();

}

function DecoderIdentifier() {
    /// <signature>
    /// <summary>联动解码器唯一标识符 v2.1</summary>
    /// <field name='DeviceId' type='String'>解码器唯一标识符	N</field>    
    /// </signature>
    this.DeviceId = "";
}


function VideoEffect() {
    /// <signature>
    /// <summary>视频显示参数 v1.5</summary>
    /// <field name='Brightness' type='Double'>亮度[0,100] N</field>
    /// <field name='Contrast' type='Double'>对比度[0,100] N</field>
    /// <field name='Saturation' type='Double'>饱和度[0,100] N</field>
    /// <field name='Hue' type='Double'>色调[0,100]	N</field>
    /// </signature>
    this.Brightness = 0;
    this.Contrast = 0;
    this.Saturation = 0;
    this.Hue = 0;
}
function PTZDecoder() {
    /// <signature>
    /// <summary>云台解码器参数配置 v1.4</summary>
    /// <field name='BaudRate' type='Int32'>波特率(bps)					N</field>
    /// <field name='DataBit' type='Int32'>停止位						N</field>
    /// <field name='StopBit' type='StopBits'>数据位					N</field>
    /// <field name='Parity' type='Parity'>奇偶校验位					N</field>
    /// <field name='DtrEnable' type='Boolean'>启用数据终端就绪 (DTR)	Y</field>
    /// <field name='RtsEnable' type='Boolean'>启用请求发送 (RTS)		Y</field>
    /// <field name='Protocol' type='String'>PTZ协议					N</field>
    /// <field name='Address' type='Int32'>总线地址[0,255]				N</field>
    /// </signature>

    this.BaudRate = 0;
    this.DataBit = 0;
    this.StopBit = StopBits.None;
    this.Parity = Parity.None;
    this.DtrEnable = false;
    this.RtsEnable = false;
    this.Protocol = "";
    this.Address = 0;
}


function PTZProtocol() {
    /// <signature>
    /// <summary>PTZ协议 V1.4</summary>
    /// <field name='Protocol' type='String'>协议类型	N</field>
    /// <field name='Description' type='String'>描述信息	Y</field>
    /// </signature>

    this.Protocol = "";
    this.Description = "";
}

function PTZProtocolList() {
    /// <signature>
    /// <summary>PTZ协议列表 V1.4</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='PTZProtocol' type='PTZProtocol[] '>支持的协议类型	Y</field>
    /// </signature>

    this.Page = new Page();
    this.PTZProtocol = new Array();
}
function TimeRange() {
    /// <signature>
    /// <summary>时间范围 V1.4</summary>
    /// <field name='BeginTime' type='String'>开始时间 格式：00:00:00	N</field>
    /// <field name='EndTime' type='String'>结束时间 格式：00:00:00	N</field>
    /// </signature>

    this.BeginTime = "00:00:00";
    this.EndTime = "00:00:00";
}
function TimeBlock() {
    /// <signature>
    /// <summary>时间块 V1.4</summary>
    /// <field name='DayOfWeek' type='TimeRange'>星期几	N</field>
    /// <field name='TimeRange' type='DayOfWeek'>时间范围	N</field>
    /// </signature>

    this.DayOfWeek = DayOfWeek.Sunday;
    this.TimeRange = new TimeRange();
}

function TimeBlockList() {
    /// <signature>
    /// <summary>时间块列表 V1.4</summary>
    /// <field name='TimeBlock' type='TimeBlock[] '>时间块列表	Y</field>    
    /// </signature>

    this.TimeBlock = new Array();
}


function AlertHandle() {
    /// <signature>
    /// <summary>报警处理 V1.4</summary>
    /// <field name='HandleType' type='AlertHandleType'>报警处理类型	N</field>
    /// <field name='IOOutput' type='String[]'>报警输出联动,联动的报警输出通道的唯一标识符	Y</field>
    /// <field name='CapturePicture' type='String[]'>联动抓图,视频输入通道的唯一标识符	Y</field>
    /// <field name='Record' type='String[]	'>录像,视频输入通道的唯一标识符	Y</field>
    /// </signature>

    this.AlertHandleType = AlertHandleType.None;
    this.IOOutput = new Array();
    this.CapturePicture = new Array();
    this.Record = new Array();
}

function SystemTime() {
    /// <signature>
    /// <summary>校时参数 V1.4</summary>
    /// <field name='TimeMode' type='TimeMode'>校时模式	N</field>
    /// <field name='LocalTime' type='DateTime'>本地时间	N</field>
    /// <field name='TimeZone' type='String'>POSIX时区字符串	Y</field>
    /// </signature>

    this.TimeMode = TimeMode.NTP;
    this.LocalTime = new Date();
    this.TimeZone = "";
}
function IOOutputPortData() {
    /// <signature>
    /// <summary>IO输出口数据 V1.4</summary>
    /// <field name='State' type='IOState'>输出状态	N</field>    
    /// </signature>

    this.State = IOState.Inactive;
}
function NTPServer() {
    /// <signature>
    /// <summary>NTP校时服务器信息 V1.4</summary>
    /// <field name='Id' type='String'>NTP服务器唯一标识符	N</field>
    /// <field name='HostName' type='String'>NTP服务器主机名(三选一)	Y</field>
    /// <field name='IPAddress' type='String'>NTP服务器IPv4地址(三选一)	Y</field>
    /// <field name='IPv6Address' type='String'>NTP服务器IPv6地址(三选一)	Y</field>
    /// <field name='Port' type='Int32'>NTP服务器端口号	N</field>
    /// </signature>

    this.Id = "";
    this.HostName = "";
    this.IPAddress = "";
    this.IPv6Address = "";
    this.Port = 0;
}
function NTPServerList() {
    /// <signature>
    /// <summary>NTP校时服务器信息 V1.4</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='NTPServer' type='NTPServer[]'>NTP校时服务器地址	Y</field>
    /// </signature>

    this.Page = new Page();
    this.NTPServer = new Array();
}
function BitrateStatusList() {
    /// <signature>
    /// <summary>视频码流测试状态列表 V1.4b</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='BitrateStatus' type='BitrateStatus[]'>视频码流测试状态列表	Y</field>
    /// </signature>

    this.Page = new Page();
    this.BitrateStatus = new Array();
}


function FileDownloadTask() {
    /// <signature>
    /// <summary>文件下载任务</summary>
    /// <field name='Id' type='String'>下载任务唯一标识符 N</field>
    /// <field name='DeviceId' type='Id'>设备唯一标识符	N</field>
    /// <field name='Channel' type='Int32'>通道号 [1,n]	N</field>
    /// <field name='Stream' type='Int32'>流编号 [1,2] 1-主码率	N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间	N</field>
    /// <field name='BeginTime' type='DateTime'>开始时间 N</field>
    /// <field name='EndTime' type='DateTime'>结束时间 N</field>
    /// <field name='ExpiredTime' type='DateTime'>任务过期时间 (半小时) N</field>
    /// <field name='FileFormat' type='DownloadFileFormat'>文件格式 MP4|Factory|AVI 默认：Factory为厂商格式 N</field>
    /// <field name='AvgSpeed' type='Double'>文件平均处理速度 KB/s N</field>
    /// <field name='URL' type='String'>文件处理完成后的下载路径 Y</field>
    /// <field name='Status' type='FileDownloadStatus'>任务状态 N</field>
    /// </signature>

    this.Id = "";
    this.DeviceId = "";
    this.Channel = 0;
    this.Stream = 0;
    this.CreationTime = new Date();
    this.BeginTime = new Date();
    this.EndTime = new Date();
    this.ExpiredTime = new Date();
    this.FileFormat = DownloadFileFormat.Factory;
    this.AvgSpeed = 0.0;
    this.URL = "";
    this.URLSpecified = false;
    this.Status = new FileDownloadStatus();
}

function FileDownloadStatus() {
    /// <signature>
    /// <summary>NTP校时服务器信息 V1.4</summary>
    /// <field name='ProcessingProgress' type='Double'>下载处理进度 [0,100]	N</field>
    /// <field name='Speed' type='Double'>下载处理速度 KB/s N</field>
    /// <field name='State' type='DownloadTaskState'>下载任务状态 N</field>
    /// <field name='ErrorInformation' type='String'>错误信息 Y</field>
    /// </signature>

    this.ProcessingProgress = 0.0;
    this.Speed = 0.0;
    this.State = DownloadTaskState.None;
    this.ErrorInformation = "";
    this.ErrorInformationSpecified = false;
}

function FileDownloadTaskRecord() {
    /// <signature>
    /// <summary>文件下载任务记录</summary>
    /// <field name='Id' type='String'>下载任务唯一标识符 N</field>
    /// <field name='DeviceId' type='Id'>设备唯一标识符	N</field>
    /// <field name='Channel' type='Int32'>通道号 [1,n]	N</field>
    /// <field name='Stream' type='Int32'>流编号 [1,2] 1-主码率	N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间	N</field>
    /// <field name='BeginTime' type='DateTime'>开始时间 N</field>
    /// <field name='EndTime' type='DateTime'>结束时间 N</field>
    /// <field name='ExpiredTime' type='DateTime'>任务过期时间 (半小时) N</field>
    /// <field name='FileFormat' type='DownloadFileFormat'>文件格式 MP4|Factory|AVI 默认：Factory为厂商格式 N</field>
    /// <field name='AvgSpeed' type='Double'>文件平均处理速度 KB/s N</field>
    /// <field name='URL' type='String'>文件处理完成后的下载路径 Y</field>
    /// <field name='UserName' type='String'>下载请求用户名称 N</field>
    /// <field name='State' type='DownloadTaskState'>下载任务最终状态 N</field>
    /// </signature>

    this.Id = "";
    this.DeviceId = "";
    this.Channel = 0;
    this.Stream = 0;
    this.CreationTime = new Date();
    this.BeginTime = new Date();
    this.EndTime = new Date();
    this.ExpiredTime = new Date();
    this.FileFormat = DownloadFileFormat.Factory;
    this.AvgSpeed = 0.0;
    this.URL = "";
    this.URLSpecified = false;
    this.UserName = "";
    this.State = DownloadTaskState.None;
}

function FileDownloadTaskRecordList() {
    /// <signature>
    /// <summary>文件下载任务记录列表</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='FileDownloadTaskRecord' type='FileDownloadTaskRecord[]'>记录信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.FileDownloadTaskRecord = new Array();
}

function ActivationKey() {
    /// <signature>
    /// <summary>激活KEY信息</summary>
    /// <field name='CreationTime' type='DateTime'>创建时间	N</field>
    /// <field name='ExpiredTime' type='DateTime'>过期时间	N</field>
    /// <field name='SerialNumber' type='String'>序列码	N</field>
    /// <field name='IsExpired' type='Boolean'>是否已过期	N</field>
    /// </signature>

    this.CreationTime = new Date();
    this.ExpiredTime = new Date();
    this.SerialNumber = "";
    this.IsExpired = false;
}

function Platform() {
    /// <signature>
    /// <summary>软件平台信息</summary>
    /// <field name='Id' type='Id'>唯一表示符 N</field>
    /// <field name='AuthenticationCode' type='String'>认证码，由数据服务器分配 N</field>
    /// <field name='Name' type='String'>平台名称 N</field>
    /// <field name='Manufacturer' type='String'>厂商信息(只读) Y</field>
    /// <field name='Model' type='String'>型号(只读) Y</field>
    /// <field name='Firmware' type='String'>固件版本信息(只读) Y</field>
    /// <field name='SerialNumber' type='String'>序列号(只读) Y</field>
    /// <field name='PointOfSale' type='String'>零售商信息(只读) Y</field>
    /// <field name='Information' type='String'>设备描述 Y</field>
    /// <field name='Username' type='String'>登录设备的用户名 Y</field>
    /// <field name='Password' type='String'>登录设备的密码	Y</field>
    /// <field name='Uri' type='String'>访问地址 N</field>
    /// <field name='ProtocolType' type='String'>协议类型 N</field>
    /// <field name='DeviceCount' type='Int32'>设备总数量(只读) N</field>
    /// </signature>

    this.Id = "";
    this.AuthenticationCode = "";
    this.Name = "";
    this.Manufacturer = "";
    this.Model = "";
    this.Firmware = "";
    this.SerialNumber = "";
    this.PointOfSale = "";
    this.Information = "";
    this.Username = "";
    this.Password = "";
    this.Uri = "";
    this.ProtocolType = "";
    this.DeviceCount = 0;

    this.ManufacturerSpecified = false;
    this.ModelSpecified = false;
    this.FirmwareSpecified = false;
    this.SerialNumberSpecified = false;
    this.PointOfSaleSpecified = false;
    this.InformationSpecified = false;
    this.UsernameSpecified = false;
    this.PasswordSpecified = false;
}

function PlatformList() {
    /// <signature>
    /// <summary>软件平台信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='Platform' type='Platform[]'>软件平台信息 Y</field>
    /// </signature>

    this.Page = new Page();
    this.Platform = new Array();
}

function PlatformCapabilities() {
    /// <signature>
    /// <summary>平台能力信息</summary>
    /// <field name='ProtocolType' type='String'>协议 N</field>
    /// <field name='Comment' type='String'>备注信息 Y</field>
    /// <field name='UriFormat' type='String'>设备Uri格式 N</field>
    /// </signature>

    this.ProtocolType = "";
    this.Comment = "";
    this.UriFormat = "";

    this.CommentSpecified = false;
}

function PlatformCapabilitiesList() {
    /// <signature>
    /// <summary>平台能力信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='PlatformCapabilities' type='PlatformCapabilities[]'>平台能力信息 Y</field>
    /// </signature>

    this.Page = new Page();
    this.PlatformCapabilities = new Array();
}

function GISMap() {
    /// <signature>
    /// <summary>GIS地图信息</summary>
    /// <field name='Id' type='Id'>GIS地图唯一标识符 N</field>
    /// <field name='Name' type='String'>地图名称 N</field>
    /// <field name='Longitude' type='Double'>启动位置的经度值 N</field>
    /// <field name='Latitude' type='Double'>启动位置的纬度值 N</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// </signature>

    this.Id = "";
    this.Name = "";
    this.Longitude = 0.0;
    this.Latitude = 0.0;
    this.Description = "";

    this.DescriptionSpecified = false;
}

function GISMapList() {
    /// <signature>
    /// <summary>GIS地图列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='GISMap' type='GISMap[]'>GIS地图信息 Y</field>
    /// </signature>

    this.Page = new Page();
    this.GISMap = new Array();
}

function GISMapLayer() {
    /// <signature>
    /// <summary>GIS地图图层</summary>
    /// <field name='Id' type='Id'>GIS地图唯一标识符 N</field>
    /// <field name='ParentLayerId' type='Id'>GIS父地图图层唯一标识符 Y</field>
    /// <field name='Name' type='String'>图层名称 N</field>
    /// <field name='IconType' type='Int32'>图标类型 Y</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// </signature>

    this.Id = "";
    this.ParentLayerId = "";
    this.Name = "";
    this.IconType = 0;
    this.Description = "";

    this.ParentLayerIdSpecified = false;
    this.IconTypeSpecified = false;
    this.DescriptionSpecified = false;
}

function GISMapLayerList() {
    /// <signature>
    /// <summary>GIS地图图层列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='GISMapLayer' type='GISMapLayer[]'>GIS地图图层信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.GISMapLayer = new Array();
}

function GISMapItem() {
    /// <signature>
    /// <summary>GIS地图子项</summary>
    /// <field name='Id' type='Id'>GIS地图子项唯一标识符 N</field>
    /// <field name='ParentLayerId' type='Id'>GIS父地图图层唯一标识符 N</field>
    /// <field name='ComponentId' type='Id'>子项的组件ID，如报警器就是报警探头的ID，摄像机就是视频输入通道VideoInputChannel的ID，以此类推。允许绑定的项包括：VideoInputChannelId IOInputChannelId Vehicle Person	 N</field>
    /// <field name='Name' type='String'>名称 N</field>
    /// <field name='IconType' type='Int32'>图标类型 Y</field>
    /// <field name='Online' type='Boolean'>是否在线 Y</field>
    /// <field name='Longitude' type='Double'>经度值 N</field>
    /// <field name='Latitude' type='Double'>纬度值	N</field>
    /// <field name='Course' type='Double'>巡航角度[0.360]，正北为0	Y</field>
    /// <field name='Status' type='String'>状态，包括发现嫌疑车辆 Y</field>
    /// <field name='GPSId' type='Id'>绑定的GPS设备唯一标识符 Y</field>
    /// <field name='VehiclePlateId' type='Id'>绑定的车牌识别设备唯一标识符	Y</field>
    /// <field name='FaceRecognitionId' type='Id'>绑定的人脸识别设备唯一标识符 Y</field>
    /// <field name='Description' type='String'>描述信息 可以GPS的AccessId	Y</field>
    /// <field name='UpdatedTime' type='DateTime'>最后更新时间	N</field>
    /// <field name='Speed' type='Double'>速度 km/h	Y</field>
    /// <field name='VideoInputChannelId' type='Id'>绑定的视频源信息唯一标识符	Y</field>
    /// <field name='GPSOnline' type='Boolean'>GPS设备是否在线	Y</field>
    /// <field name='VehiclePlateOnline' type='Boolean'>车牌识别设备是否在线 Y</field>
    /// <field name='FaceRecognitionOnline' type='Boolean'>人脸识别设备是否在线 Y</field>
    /// <field name='VideoInputChannelOnline' type='Boolean'>视频源设备是否在线	Y</field>
    /// </signature>

    this.Id = "";
    this.ParentLayerId = "";
    this.ComponentId = "";
    this.Name = "";
    this.IconType = 0;
    this.Online = false;
    this.Longitude = 0.0;
    this.Latitude = 0.0;
    this.Course = 0.0;
    this.Status = "";
    this.GPSId = "";
    this.VehiclePlateId = "";
    this.FaceRecognitionId = "";
    this.Description = "";
    this.UpdatedTime = new Date();
    this.Speed = 0.0;
    this.VideoInputChannelId = "";
    this.GPSOnline = false;
    this.VehiclePlateOnline = false;
    this.FaceRecognitionOnline = false;
    this.VideoInputChannelOnline = false;

    this.IconTypeSpecified = false;
    this.OnlineSpecified = false;
    this.CourseSpecified = false;
    this.StatusSpecified = false;
    this.GPSIdSpecified = false;
    this.VehiclePlateIdSpecified = false;
    this.FaceRecognitionIdSpecified = false;
    this.DescriptionSpecified = false;
    this.SpeedSpecified = false;
    this.VideoInputChannelIdSpecified = false;
    this.GPSOnlineSpecified = false;
    this.VehiclePlateOnlineSpecified = false;
    this.FaceRecognitionOnlineSpecified = false;
    this.VideoInputChannelOnlineSpecified = false;
}

function GISMapItemList() {
    /// <signature>
    /// <summary>GIS地图子项列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='GISMapItem' type='GISMapItem[]'>GIS地图子项信息 Y</field>
    /// </signature>

    this.Page = new Page();
    this.GISMapItem = new Array();
}

function VideoOutputDisplayMode() {
    /// <signature>
    /// <summary>视频输出显示模式</summary>
    /// <field name='FirstChannel' type='Id'>第一路显示的解码通道Id	Y</field>
    /// <field name='DisplayMode' type='Int32'>显示模式，1，4，9，16 N</field>
    /// </signature>
    this.FirstChannel = "";
    this.DisplayMode = 0;

    this.FirstChannelSpecified = false;
}

function VideoOutputChannelCapabilities() {
    /// <signature>
    /// <summary>视频输出能力</summary>
    /// <field name='Id' type='Id'>视频输出源序列号	N</field>
    /// <field name='SupportedInterfaceType' type='VideoInterfaceType[]'>支持的视频接口	Y</field>
    /// <field name='SupportedDisplayMode' type='Int32[]'>支持的输出模式 Y</field>
    /// <field name='SupportedResolution' type='VideoInterfaceResolution[]'>支持的输出分辨率 Y</field>
    /// <field name='SupportedMultiScreen' type='Boolean'>是否支持多屏幕模式 Y</field>
    /// </signature>

    this.Id = "";
    this.SupportedInterfaceType = new Array();
    this.SupportedDisplayMode = new Array();
    this.SupportedResolution = new Array();
    this.SupportedMultiScreen = false;

    this.SupportedInterfaceTypeSpecified = false;
    this.SupportedDisplayModeSpecified = false;
    this.SupportedResolutionSpecified = false;
    this.SupportedMultiScreenSpecified = false;
}

function VideoInterfaceResolution() {
    /// <signature>
    /// <summary>视频输出分辨率</summary>
    /// <field name='Width' type='Int32'>宽	N</field>
    /// <field name='Height' type='Int32'>高 N</field>
    /// <field name='Frequency' type='Int32'>频率：HZ N</field>
    /// </signature>

    this.Width = 0;
    this.Height = 0;
    this.Frequency = 0;
}

function DecodingChannelSwitching() {
    /// <signature>
    /// <summary>解码通道切换信息</summary>
    /// <field name='Status' type='DecodingChannelSwitchingStatus'>切换状态	N</field>
    /// <field name='Interval' type='Int32'>切换间隔，单位，秒 [5-60] N</field>
    /// <field name='Item' type='DecodingChannelSwitchingItem[]'>切换项	Y</field>
    /// </signature>

    this.Status = new DecodingChannelSwitchingStatus();
    this.Interval = 0;
    this.Item = new Array();

    this.ItemSpecified = false;
}



function DecodingChannelSwitchingStatus() {
    /// <signature>
    /// <summary>解码通道切换状态</summary>
    /// <field name='Enabled' type='Boolean'>是否启动切换 N</field>
    /// </signature>

    this.Enabled = false;
}

function DecodingChannelSwitchingItem() {
    /// <signature>
    /// <summary>解码通道切换项</summary>
    /// <field name='Url' type='String'>视频连接地址 Y</field>
    /// <field name='ChannelNo' type='Int32'>视频通编号 1-n	Y</field>
    /// <field name='VideoInputChannelId' type='String'>视频输入通道唯一标识符	Y</field>
    /// <field name='PesudoCode' type='Int32'>视频输入通道对应的伪码 Y</field>
    /// <field name='StreamSourceType' type='StreamSourceType'>视频流来源类型 Y</field>
    /// </signature>

    this.Url = "";
    this.ChannelNo = 0;
    this.VideoInputChannelId = "";
    this.PesudoCode = 0;
    this.StreamSourceType = StreamSourceType.Auto;

    this.UrlSpecified = false;
    this.ChannelNoSpecified = false;
    this.VideoInputChannelIdSpecified = false;
    this.PesudoCodeSpecified = false;
    this.StreamSourceTypeSpecified = false;
}

function FaceSetList() {
    /// <signature>
    /// <summary>人脸库列表</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='FaceSet' type='FaceSet[]'>人脸库 Y</field>
    /// </signature>

    this.Page = new Page();
    this.FaceSet = new Array();
}

function FaceSet() {
    /// <signature>
    /// <summary>人脸库信息</summary>
    /// <field name='Id' type='String'>人脸库ID	N</field>
    /// <field name='Type' type='FaceSetType'>人脸库类型 N</field>
    /// <field name='Name' type='String'>人脸库名称	N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间	N</field>
    /// <field name='Threshold' type='Int32'>触发阈值，比对相似度[0,100] Y</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// <field name='Capacity' type='Int32'>最大人脸容量 Y</field>
    /// <field name='Priority' type='Int32'>优先级：0-默认值，1-低，2-中，3-高	Y</field>
    /// </signature>

    this.Id = "";
    this.Type = FaceSetType.None;
    this.Name = "";
    this.CreationTime = new Date();
    this.Threshold = 0;
    this.Description = "";
    this.Capacity = 0;
    this.Priority = 0;

    this.ThresholdSpecified = false;
    this.DescriptionSpecified = false;
    this.CapacitySpecified = false;
    this.PrioritySpecified = false;
}

function FaceAppendDataList() {
    /// <signature>
    /// <summary>人脸信息附加数据列表</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='FaceAppendData' type='FaceAppendData[]'>人脸信息附加数据 Y</field>
    /// </signature>

    this.Page = new Page();
    this.FaceAppendData = new Array();
}

function FaceAppendData() {
    /// <signature>
    /// <summary>人脸信息附加数据</summary>
    /// <field name='Id' type='String'>人脸附加信息ID N</field>
    /// <field name='Name' type='String'>姓名 N</field>
    /// <field name='Sex' type='Sex'>性别（gender）	Y</field>
    /// <field name='Phone' type='String'>电话号码 Y</field>
    /// <field name='BirthDate' type='DateTime'>出生年月 Y</field>
    /// <field name='Province' type='String'>省份 Y</field>
    /// <field name='City' type='String'>城市 Y</field>
    /// <field name='CardType' type='String'>证件类型 Y</field>
    /// <field name='CardNumber' type='String'>证件编号	Y</field>
    /// <field name='EmployeeId' type='String'>员工ID Y</field>
    /// <field name='Extend' type='String'>附加信息	Y</field>
    /// <field name='Model' type='String'>人脸建模数据, BASE64编码的字符串 Y</field>
    /// <field name='PictureId' type='String'>图片唯一标识符（只读，获取时必须包含）N/Y</field>
    /// <field name='PictureData' type='String'>BASE64编码的字符串（创建时必须包含该项） N/Y</field>
    /// <field name='ModelingStatus' type='FaceModelingStatus'>人脸建模状态	Y</field>
    /// </signature>

    this.Id = "";
    this.Name = "";
    this.Sex = Sex.None;
    this.Phone = "";
    this.BirthDate = new Date();
    this.Province = "";
    this.City = "";
    this.CardType = "";
    this.CardNumber = "";
    this.EmployeeId = "";
    this.Extend = "";
    this.Model = "";
    this.PictureId = "";
    this.PictureData = "";
    this.ModelingStatus = FaceModelingStatus.None;

    this.SexSpecified = false;
    this.PhoneSpecified = false;
    this.BirthDateSpecified = false;
    this.ProvinceSpecified = false;
    this.CitySpecified = false;
    this.CardTypeSpecified = false;
    this.CardNumberSpecified = false;
    this.EmployeeIdSpecified = false;
    this.ExtendSpecified = false;
    this.ModelSpecified = false;
    this.PictureIdSpecified = false;
    this.ModelingStatusSpecified = false;
}

function FaceContrast() {
    /// <signature>
    /// <summary>视频源通道关联的比对库信息</summary>
    /// <field name='Id' type='String'>唯一标识符 N</field>
    /// <field name='Enabled' type='Boolean'>是否启用 N</field>
    /// <field name='FaceSetId' type='String[]'>关联的人脸比对库ID Y</field>
    /// <field name='Threshold' type='Int32'>检测阈值，阈值越大检测准确率越高, 范围[0,100]	N</field>
    /// <field name='ContrastFailureAlarmUpload' type='Boolean'>人脸比对失败报警上传使能(即抓拍图片和人脸库图片比对比不成功也会将比对报警信息上传中心): true-启用, false-不启用(默认), 仅人脸比对支持 Y</field>
    /// <field name='PluseEnable' type='Boolean'>是否联动脉冲输出 Y</field>
    /// <field name='PluseTime' type='Int32'>脉冲输出持续时间，单位：ms	Y</field>
    /// </signature>

    this.Id = "";
    this.Enabled = false;
    this.FaceSetId = new Array();
    this.Threshold = 0;
    this.ContrastFailureAlarmUpload = false;
    this.PluseEnable = false;
    this.PluseTime = 0;

    this.FaceSetIdSpecified = false;
    this.ContrastFailureAlarmUploadSpecified = false;
    this.PluseEnableSpecified = false;
    this.PluseTimeSpecified = false;
}

function WeeklySchedule() {
    /// <signature>
    /// <summary>周工作时刻表</summary>
    /// <field name='Enabled' type='Boolean'>是否启用，如果不启用则24小时全天候监控	N</field>
    /// <field name='DailySchedule' type='DailySchedule[]'>日工作时刻表，按顺序[0-6] 0-Sunday, 6-Saturday Y</field>
    /// </signature>

    this.Enabled = false;
    this.DailySchedule = new Array();

    this.DailyScheduleSpecified = false;
}


function DailySchedule() {
    /// <signature>
    /// <summary>日工作表</summary>
    /// <field name='DayOfWeek' type='DayOfWeek'>星期几	N</field>
    /// <field name='Period' type='TimePeriod[]'>时间段	Y</field>
    /// </signature>

    this.DayOfWeek = DayOfWeek.Sunday;
    this.Period = new Array();

    this.PeriodSpecified = false;
}

function TimePeriod() {
    /// <signature>
    /// <summary>时间段</summary>
    /// <field name='BeginTime' type='Time'>开始时间 格式: hh:mm:ss 二十四小时制 N</field>
    /// <field name='EndTime' type='Time'>结束时间 格式: hh:mm:ss 二十四小时制 N</field>
    /// </signature>

    this.BeginTime = "";
    this.EndTime = "";
}

function FaceDetectEventRecordList() {
    /// <signature>
    /// <summary>人脸识别记录列表</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='EventRecord' type='FaceDetectEventRecord[]'>事件记录 Y</field>
    /// </signature>

    this.Page = new Page();
    this.EventRecord = new Array();
}

function FaceDetectEventRecord() {
    /// <signature>
    /// <summary>人脸识别记录</summary>
    /// <field name='Id' type='String'>事件唯一标识符（设备产生的）	N</field>
    /// <field name='ComponentId' type='Id'>报警单元模块唯一标识符	N</field>
    /// <field name='Name' type='String'>报警单元模块名称或描述信息	N</field>
    /// <field name='EventType' type='EventType'>事件类型 N</field>
    /// <field name='AlarmTime' type='DateTime'>报警/触发时间 N</field>
    /// <field name='Severity' type='Int32'>重要级别 0x00: None 0x01: Information 0x10: Warning 0x40: Emergency	N</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// <field name='ObjectType' type='ObjectType'>目标对象类型 Y</field>
    /// <field name='TriggerValue' type='Double'>触发事件时的数值 Y</field>
    /// <field name='Confidence' type='Int32'>置信度[0,100]	Y</field>
    /// <field name='FaceSnapData' type='FaceSnapData'>人脸抓拍数据	Y</field>
    /// <field name='FaceSet' type='FaceSet'>比中的黑名单库	Y</field>
    /// <field name='FaceAppendData' type='FaceAppendData'>比中的黑名单库中的人脸信息 Y</field>
    /// </signature>

    this.Id = "";
    this.ComponentId = "";
    this.Name = "";
    this.EventType = EventType.None;
    this.AlarmTime = new Date();
    this.Severity = 0;
    this.Description = "";
    this.ObjectType = ObjectType.None;
    this.TriggerValue = 0.0;
    this.Confidence = 0;
    this.FaceSnapData = new FaceSnapData();
    this.FaceSet = new FaceSet();
    this.FaceAppendData = new FaceAppendData();

    this.DescriptionSpecified = false;
    this.ObjectTypeSpecified = false;
    this.TriggerValueSpecified = false;
    this.ConfidenceSpecified = false;
    this.FaceSnapDataSpecified = false;
    this.FaceSetSpecified = false;
    this.FaceAppendDataSpecified = false;
}

function FaceSnapData() {
    /// <signature>
    /// <summary>人脸抓拍数据</summary>
    /// <field name='FacePictureId' type='String'>人脸图片ID N</field>
    /// <field name='BackgroundPictureId' type='String'>背景图片ID Y</field>
    /// <field name='Position' type='RectN'>人脸位置 Y</field>
    /// <field name='Score' type='Int32'>人脸评分[0-100] Y</field>
    /// <field name='ModelData' type='String'>建模数据BASE64的字符串 Y</field>
    /// <field name='Feature' type='FaceFeature'>人脸特征 Y</field>
    /// </signature>

    this.FacePictureId = "";
    this.BackgroundPictureId = "";
    this.Position = new RectN();
    this.Score = 0;
    this.ModelData = "";
    this.Feature = new FaceFeature();

    this.BackgroundPictureIdSpecified = false;
    this.PositionSpecified = false;
    this.ScoreSpecified = false;
    this.ModelDataSpecified = false;
    this.FeatureSpecified = false;
}

function RectN() {
    /// <signature>
    /// <summary>归一化矩形结构</summary>
    /// <field name='X' type='Double'>左上角横坐标 [0,1] N</field>
    /// <field name='Y' type='Double'>左上角纵坐标 [0,1] N</field>
    /// <field name='Width' type='Double'>宽度 [0,1] N</field>
    /// <field name='Height' type='Double'>高度 [0,1] N</field>
    /// </signature>

    this.X = 0.0;
    this.Y = 0.0;
    this.Width = 0.0;
    this.Height = 0.0;
}

function FaceFeature() {
    /// <signature>
    /// <summary>人脸特征</summary>
    /// <field name='Age' type='Int32'>年龄	Y</field>
    /// <field name='AgeConfidence' type='Int32'>置信度[0,100] Y</field>
    /// <field name='Sex' type='Sex'>性别（gender）Y</field>
    /// <field name='SexConfidence' type='Int32'>置信度[0,100] Y</field>
    /// <field name='EyeGlass' type='Boolean'>是否带眼镜 Y</field>
    /// </signature>

    this.Age = 0;
    this.AgeConfidence = 0;
    this.Sex = Sex.None;
    this.SexConfidence = 0;
    this.EyeGlass = false;

    this.AgeSpecified = false;
    this.AgeConfidenceSpecified = false;
    this.SexSpecified = false;
    this.SexConfidenceSpecified = false;
    this.EyeGlassSpecified = false;
}

function Picture() {
    /// <signature>
    /// <summary>图片信息</summary>
    /// <field name='Id' type='String'>唯一标识符 N</field>
    /// <field name='CreationTime' type='DateTime'>图片创建时间	N</field>
    /// <field name='ExpirationTime' type='DateTime'>图片过期时间 N</field>
    /// <field name='PictureFormat' type='PictureFormat'>图片格式 N</field>
    /// <field name='VideoInputChannelId' type='String'>视频输入通道唯一标识符	Y</field>
    /// <field name='Data' type='String'>BASE64编码的图片数据(注意列表模式下，不包含文件数据) Y</field>
    /// <field name='MD5String' type='String'>MD5验证字符串	N</field>
    /// <field name='PictureSize' type='Size'>图片尺寸 Y</field>
    /// <field name='PictureLength' type='Int32'>图片大小(字节) Y</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// <field name='PictureFromDevice' type='Boolean'>图片是否来自设备,如果没有该项则表示本地图片	Y</field>
    /// <field name='PictureDeviceUrl' type='String'>图片在设备上的访问地址	Y</field>
    /// </signature>

    this.Id = "";
    this.CreationTime = new Date();
    this.ExpirationTime = new Date();
    this.PictureFormat = PictureFormat.Jpeg;
    this.VideoInputChannelId = "";
    this.Data = "";
    this.MD5String = "";
    this.PictureSize = new Size();
    this.PictureLength = 0;
    this.Description = "";
    this.PictureFromDevice = false;
    this.PictureDeviceUrl = "";

    this.VideoInputChannelIdSpecified = false;
    this.DataSpecified = false;
    this.PictureSizeSpecified = false;
    this.PictureLengthSpecified = false;
    this.DescriptionSpecified = false;
    this.PictureFromDeviceSpecified = false;
    this.PictureDeviceUrlSpecified = false;
}

function Size() {
    /// <signature>
    /// <summary>图片尺寸</summary>
    /// <field name='Width' type='Int32'>宽	N</field>
    /// <field name='Height' type='Int32'>高 N</field>
    /// </signature>

    this.Width = 0;
    this.Height = 0;
}

function PictureList() {
    /// <signature>
    /// <summary>图片列表信息</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='Picture' type='Picture[]'>Y</field>
    /// </signature>

    this.Page = new Page();
    this.Picture = new Array();
}

function FaceContrastSearchDescription() {
    /// <signature>
    /// <summary>人脸比对查询描述</summary>
    /// <field name='SearchId' type='String'>查询唯一标识符 N</field>
    /// <field name='PageIndex' type='Int32'>页码[1,n] N</field>
    /// <field name='PageSize' type='Int32'>页大小[1,100] N</field>
    /// <field name='BeginTime' type='DateTime'>比中开始时间 N</field>
    /// <field name='EndTime' type='DateTime'>比中结束时间 N</field>
    /// <field name='Similarity' type='Double'>相似度[0,100] Y</field>
    /// <field name='FaceSetId' type='String[]'>关联搜索的人脸库ID Y</field>
    /// <field name='Sex' type='Sex'>性别	Y</field>
    /// <field name='EyeGlass' type='Boolean'>是否佩戴眼镜 Y</field>
    /// <field name='ModelData' type='FaceModelDataSearchDescription[]'>以图搜图的时候人脸建模数据 Y</field>
    /// <field name='ChannelId' type='Id[]'>关联的通道ID	Y</field>
    /// <field name='FaceAppendDataId' type='FaceAppendDataIdentifier[]'>人脸库人脸唯一标识符	Y</field>
    /// </signature>

    this.SearchId = "";
    this.PageIndex = 0;
    this.PageSize = 0;
    this.BeginTime = new Date();
    this.EndTime = new Date();
    this.Similarity = 0.0;
    this.FaceSetId = new Array();
    this.Sex = Sex.None;
    this.EyeGlass = false;
    this.ModelData = new Array();
    this.ChannelId = new Array();
    this.FaceAppendDataId = new Array();

    this.SimilaritySpecified = false;
    this.FaceSetIdSpecified = false;
    this.SexSpecified = false;
    this.EyeGlassSpecified = false;
    this.ModelDataSpecified = false;
    this.ChannelIdSpecified = false;
    this.FaceAppendDataIdSpecified = false;
}

function FaceContrastSearchResultList() {
    /// <signature>
    /// <summary>人脸比对查询结果列表</summary>
    /// <field name='Page' type='Page'>分页信息	Y</field>
    /// <field name='FaceContrastSearchResult' type='FaceContrastSearchResult[]'>人脸比对查询结果 Y</field>
    /// </signature>

    this.Page = new Page();
    this.FaceContrastSearchResult = new Array();
}


function FaceContrastSearchResult() {
    /// <signature>
    /// <summary>人脸比对查询结果</summary>
    /// <field name='ComponentId' type='Id'>报警单元模块唯一标识符 N</field>
    /// <field name='AlarmTime' type='DateTime'>报警/触发时间 N</field>
    /// <field name='Confidence' type='Int32'>置信度/相似度[0,100] 以图索图时返回 Y</field>
    /// <field name='FaceSnapData' type='FaceSnapData'>人脸抓拍数据	Y</field>
    /// <field name='FaceSet' type='FaceSet'>比中的黑名单库 Y</field>
    /// <field name='FaceAppendData' type='FaceAppendData'>比中的黑名单库中的人脸信息 Y</field>
    /// </signature>

    this.ComponentId = "";
    this.AlarmTime = new Date();
    this.Confidence = 0;
    this.FaceSnapData = new FaceSnapData();
    this.FaceSet = new FaceSet();
    this.FaceAppendData = new FaceAppendData();

    this.ConfidenceSpecified = false;
    this.FaceSnapDataSpecified = false;
    this.FaceSetSpecified = false;
    this.FaceAppendDataSpecified = false;
}

function FaceModelDataSearchDescription() {
    /// <signature>
    /// <summary>人脸建模数据查询条件</summary>
    /// <field name='Similarity' type='Double'>相似度[0,100] Y</field>
    /// <field name='ModelData' type='String'>建模数据BASE64的字符串 N</field>
    /// </signature>

    this.Similarity = 0.0;
    this.ModelData = "";

    this.SimilaritySpecified = false;
}

function FaceAppendDataIdentifier() {
    /// <signature>
    /// <summary>人脸库人脸唯一标识符</summary>
    /// <field name='Id' type='String'>人脸库人脸唯一标识符	N</field>
    /// <field name='FaceSetId' type='String'>人脸库唯一标识符 N</field>
    /// </signature>

    this.Id = "";
    this.FaceSetId = "";
}

function FaceModelData() {
    /// <signature>
    /// <summary>人脸建模数据</summary>
    /// <field name='Position' type='RectN'>人脸位置 N</field>
    /// <field name='Score' type='Int32'>人脸评分[0-100] Y</field>
    /// <field name='ModelData' type='String'>建模数据BASE64的字符串 N</field>
    /// </signature>

    this.Position = new RectN();
    this.Score = 0;
    this.ModelData = "";

    this.ScoreSpecified = false;
}

function FaceSetSearchDescription() {
    /// <signature>
    /// <summary>人脸库查询描述</summary>
    /// <field name='SearchId' type='String'>查询唯一标识符	N</field>
    /// <field name='PageIndex' type='Int32'>页码[1,n] N</field>
    /// <field name='PageSize' type='Int32'>页大小[1,100] N</field>
    /// <field name='FaceSetId' type='String'>人脸库ID，如果该项为空，则在所有的人脸库上进行查询 Y</field>
    /// <field name='BornBeginTime' type='DateTime'>出生年月开始时间 Y</field>
    /// <field name='BornEndTime' type='DateTime'>出生年月结束时间 Y</field>
    /// <field name='Name' type='String'>姓名 Y</field>
    /// <field name='Sex' type='Sex'>性别 Y</field>
    /// <field name='Province' type='String'>省份 Y</field>
    /// <field name='City' type='String'>城市 Y</field>
    /// <field name='CardType' type='String'>卡类型	Y</field>
    /// <field name='CardNumber' type='String'>卡编号 Y</field>
    /// <field name='ModelData' type='FaceModelDataSearchDescription[]'>以图搜图的时候人脸建模数据 Y</field>
    /// </signature>

    this.SearchId = "";
    this.PageIndex = 0;
    this.PageSize = 0;
    this.FaceSetId = "";
    this.BornBeginTime = new Date();
    this.BornEndTime = new Date();
    this.Name = "";
    this.Sex = Sex.None;
    this.Province = "";
    this.City = "";
    this.CardType = "";
    this.CardNumber = "";
    this.ModelData = new Array();

    this.FaceSetIdSpecified = false;
    this.BornBeginTimeSpecified = false;
    this.BornEndTimeSpecified = false;
    this.NameSpecified = false;
    this.SexSpecified = false;
    this.ProvinceSpecified = false;
    this.CitySpecified = false;
    this.CardTypeSpecified = false;
    this.CardNumberSpecified = false;
    this.ModelDataSpecified = false;
}


















