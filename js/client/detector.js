/// <reference path="../BaseClient.js" />

function DetectorClient(host, port, cookieKey) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/intelligent_detectors";
    var base = new BaseClient(cookieKey);
    var contract =
    {
        version: baseUri + "/System/Version",
        detector: {
            list: function () {
                return baseUri + "/System/Detectors";
            },
            item: function (detectorId) {
                return this.list() + "/" + detectorId;
            },
            status: function (detectorId) {
                return this.item(detectorId) + "/Status";
            },
            transmitter: function (detectorId) {
                return this.item(detectorId) + "/Transmitter/Recovery";
            },
            industrial: function (detectorId) {
                return this.item(detectorId) + "/Industrial/Recovery";
            },
            detecting: function (detectorId) {
                return this.item(detectorId) + "/Detecting";
            },
            auxiliary: function (detectorId, No) {
                return this.item(detectorId) + "/Auxiliary/" + No + "/Status";
            },
            buzzer: function (detectorId) {
                return this.item(detectorId) + "/Buzzer/Status";
            },
            searching: function (id) {
                return baseUri + "/System/Detectors/Searching/" + id;
            }
        }
    }

    this.Detector = {
        List: function (pageIndex, pageSize, search) {
            var result = base.Get(contract.detector.list(), getParams(this.List));
            return Convert(result, new DetectorList());
        },
        Create: function (detector) {
            return base.Post(contract.detector.list(), detector);
        },
        Get: function (detectorId) {
            var result = base.Get(contract.detector.item(detectorId));
            return Convert(result, new Detector());
        },
        Set: function (detector) {
            return base.Put(contract.detector.item(detector.Id), detector);
        },
        Delete: function (detectorId) {
            return base.Delete(contract.detector.item(detectorId));
        },
        Status: function (detectorId) {
            var result = base.Get(contract.detector.status(detectorId));
            return Convert(result, new DetectorStatus());
        },
        Transmitter: {
            Recovery: function (detectorId) {
                return base.Post(contract.detector.transmitter(detectorId));
            }
        },
        Industrial: {
            Recovery: function (detectorId) {
                return base.Post(contract.detector.industrial(detectorId));
            }
        },
        Detecting: function (detectorId) {
            return base.Post(contract.detector.detecting(detectorId));
        },
        Auxiliary: {
            Status: {
                Get: function (detectorId, No) {
                    return base.Get(contract.detector.auxiliary(detectorId, No));

                },
                Set: function (detectorId, No, State) {
                    return base.Post(contract.detector.auxiliary(detectorId, No), getParams(this.Set, 2));
                }
            }
        },
        Buzzer: {
            Status: {
                Get: function (detectorId) {
                    return base.Get(contract.detector.buzzer(detectorId));
                },
                Set: function (detectorId, State) {
                    return base.Post(contract.detector.buzzer(detectorId), getParams(this.Set, 1))
                }
            }
        },
        Searching: {
            Start: function (id, timeout) {
                return base.Post(contract.detector.searching(id), null);
            },
            Stop: function (id) {
                return base.Delete(contract.detector.searching(id));
            },
            Get: function (id) {
                var result = base.Get(contract.detector.searching(id));
                return Convert(result, new Detector());
            },
            Set: function (id, detector) {
                return base.Put(contract.detector.searching(id), detector);
            },
        }
    };
}

//分页信息
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

//服务版本信息
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

//智能检测器
function Detector() {
    /// <signature>
    /// <summary>智能检测器</summary>
    /// <field name='Id' type='Id'>唯一表示符 N</field>
    /// <field name='Name' type='String'>设备名称 N</field>
    /// <field name='Username' type='String'>登录设备的用户名 Y</field>
    /// <field name='Password' type='String'>登录设备的密码 Y</field>
    /// <field name='Uri' type='String'>设备访问地址 N</field>
    /// <field name='ExistedInDatabase' type='Boolean'>是否已存在与数据库中(只读) N</field>
    /// <field name='AuxiliaryCount' type='Int32'>辅助控制器数量(只读) N</field>
    /// <field name='NetworkInterfaceCount' type='Int32'>网口数量(只读) N</field>
    /// <field name='NetworkInterface' type='NetworkInterface'>网络IP地址 N</field>
    /// <field name='ClientIPAddress' type='String'>客户端IP地址 N</field>
    /// <field name='ClientPort' type='Int32'>客户端端口号 N</field>
    /// <field name='ConnectionMode' type='ConnectionMode'>设备连接模式	N</field>
    /// <field name='BaudRate' type='BaudRate'>波特率 N</field>
    /// <field name='Status' type='DetectorStatus'>检测器状态 Y</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// </signature>
    this.Id = "";//唯一表示符 N
    this.Name = "";//设备名称 N
    this.Username = "";//登录设备的用户名 Y
    this.UsernameSpecified = false;
    this.Password = "";//登录设备的密码 Y
    this.PasswordSpecified = false;
    this.Uri = "";//设备访问地址 N
    this.ExistedInDatabase = false;//是否已存在与数据库中(只读) N
    this.AuxiliaryCount = 0;//辅助控制器数量(只读) N
    this.NetworkInterfaceCount = 0;//网口数量(只读) N
    this.NetworkInterface = new NetworkInterface();//网络IP地址 N
    this.ClientIPAddress = "";//客户端IP地址 N
    this.ClientPort = 0;//客户端端口号 N
    this.ConnectionMode = ConnectionMode.UDP;//设备连接模式	N
    this.BaudRate = BaudRate.BR1200;//波特率 N
    this.Status = new DetectorStatus();//检测器状态 Y
    this.StatusSpecified = false;
    this.Description = "";//描述信息 Y
    this.DescriptionSpecified = false;
}

//网络接口信息
function NetworkInterface() {
    /// <signature>
    /// <summary>网络接口信息</summary>
    /// <field name='Id' type='Id'>网口模块Id N</field>
    /// <field name='InterfacePort' type='Int32'>网口接口编码 [1-n] 如：1表示：PORT1,PORT2... N</field>
    /// <field name='IPVersion' type='IPVersion'>IP地址版本	N</field>
    /// <field name='AddressingType' type='NetworkAddressingType'>地址获取方式 N</field>
    /// <field name='IPAddress' type='IPAddress'>网络IP地址	N</field>
    /// <field name='PhyscialAddress' type='String'>物理地址 格式：00-00-00-00-00-00 N</field>
    /// <field name='CableType' type='NetworkCableType'>接口类型 Y</field>
    /// <field name='SpeedDuplex' type='NetworkSpeedDuplex'>网口速率 Y</field>
    /// <field name='WorkMode' type='NetworkInterfaceWorkMode'>工作模式	Y</field>
    /// <field name='Wireless' type='WirelessNetwork'>无线网络信息 Y</field>
    /// <field name='MTU' type='Int32'>最大传输单元 默认1500 v1.4 Y</field>
    /// </signature>
    this.Id = "";//网口模块Id N
    this.InterfacePort = 0;//网口接口编码 [1-n] 如：1表示：PORT1,PORT2... N
    this.IPVersion = IPVersion.IPv4;//IP地址版本 N
    this.AddressingType = NetworkAddressingType.Static;//地址获取方式 N
    this.IPAddress = new IPAddress();//网络IP地址 N
    this.PhyscialAddress = "";//物理地址 格式：00-00-00-00-00-00 N
    this.CableType = NetworkCableType.RJ45;//接口类型 Y
    this.CableTypeSpecified = false;
    this.SpeedDuplex = NetworkSpeedDuplex.Auto;//网口速率 Y
    this.SpeedDuplexSpecified = false;
    this.WorkMode = NetworkInterfaceWorkMode.Disable;//工作模式	Y
    this.WorkModeSpecified = false;
    this.Wireless = new WirelessNetwork();//无线网络信息 Y
    this.WirelessSpecified = false;
    this.MTU = 1500;//最大传输单元 默认1500 v1.4 Y
    this.MTUSpecified = false;
}

//网络IP地址
function IPAddress() {
    /// <signature>
    /// <summary>网络IP地址</summary>
    /// <field name='IPv4Address' type='IPv4Address'>IP version4 地址 N</field>
    /// <field name='IPv6Address' type='IPv6Address'>IP version6 地址 N</field>
    /// </signature>
    this.IPv4Address = new IPv4Address();//IP version4 地址 N
    this.IPv4AddressSpecified = false;
    this.IPv6Address = new IPv6Address();//IP version6 地址 N
    this.IPv6AddressSpecified = false;
}

//网络IPv4地址
function IPv4Address() {
    /// <signature>
    /// <summary>网络IPv4地址</summary>
    /// <field name='Address' type='String'>IP地址 N</field>
    /// <field name='Subnetmask' type='String'>子网掩码	N</field>
    /// <field name='DefaultGateway' type='String'>默认网关 Y</field>
    /// <field name='PrimaryDNS' type='String'>主DNS Y</field>
    /// <field name='SecondaryDNS' type='String'>次DNS Y</field>
    /// </signature>
    this.Address = "";//IP地址 N
    this.Subnetmask = "";//子网掩码	N
    this.DefaultGateway = "";//默认网关 Y
    this.PrimaryDNS = "";//主DNS Y
    this.PrimaryDNSSpecified = false;
    this.SecondaryDNS = "";//次DNS Y
    this.SecondaryDNSSpecified = false;
}

//网络IPv6地址
function IPv6Address() {
    /// <signature>
    /// <summary>网络IPv6地址</summary>
    /// <field name='Address' type='String'>IP地址 N</field>
    /// <field name='BitMask' type='String'>位掩码 N</field>
    /// <field name='DefaultGateway' type='String'>默认网关 Y</field>
    /// <field name='PrimaryDNS' type='String'>主DNS Y</field>
    /// <field name='SecondaryDNS' type='String'>次DNS Y</field>
    /// </signature>
    this.Address = "";//IP地址 N
    this.BitMask = "";//位掩码 N
    this.DefaultGateway = "";//默认网关 Y
    this.PrimaryDNS = "";//主DNS Y
    this.PrimaryDNSSpecified = false;
    this.SecondaryDNS = "";//次DNS Y
    this.SecondaryDNSSpecified = false;
}

//无线网络
function WirelessNetwork() {
    /// <signature>
    /// <summary>无线网络</summary>
    /// <field name='SSID' type='String'>无线网络的唯一Id的 SSID=BASE64(OriginSSID)	N</field>
    /// <field name='Connected' type='Boolean'>是否已建议连接 N</field>
    /// <field name='Intensity' type='Double'>信号强度[0,1]	N</field>
    /// <field name='Frequency' type='Double'>频段 单位：GHz Y</field>
    /// <field name='Channel' type='Int32'>无线网络通道 0-99 Y</field>
    /// </signature>
    this.SSID = "";//无线网络的唯一Id的 SSID=BASE64(OriginSSID)	N
    this.Connected = false;//是否已建议连接	N
    this.Intensity = 0.0;//信号强度[0,1] N
    this.Frequency = 0.0;//频段 单位：GHz Y
    this.FrequencySpecified = false;
    this.Channel = 0;//无线网络通道 0-99 Y
    this.ChannelSpecified = false;
}

//智能检测器信息列表
function DetectorList() {
    /// <signature>
    /// <summary>智能检测器信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='Detector' type='Detector[]'>智能检测器信息	Y</field>
    /// </signature>
    this.Page = new Page();//分页信息，如果没有分页信息，则表示一次性获取所有的结果。 Y
    this.Detector = new Array();//智能检测器信息 Y
}

//智能检测器状态
function DetectorStatus() {
    /// <signature>
    /// <summary>智能检测器状态</summary>
    /// <field name='IsOnline' type='Boolean'>是否在线 N</field>
    /// <field name='LastUpdatedTime' type='DateTime'>最后更新时间 N</field>
    /// <field name='BoxOpened' type='Boolean'>设备箱，关：False|开：True Y</field>
    /// <field name='PowerOff' type='Boolean'>断电，交流电正常工作：False|交流电断电：True Y</field>
    /// <field name='TransmitterRecovery' type='Boolean'>光端机复位状态 正常：False|复位成功：True Y</field>
    /// <field name='IndustrialRecovery' type='Boolean'>工控机复位状态 正常：False|复位成功：True Y</field>
    /// <field name='Auxiliary' type='Boolean[]'>辅助状态，关：False|开：True Y</field>
    /// <field name='Buzzer' type='Boolean'>蜂鸣器状态，关：False|开：True Y</field>
    /// <field name='Temperature' type='Double'>温度，摄氏度 Y</field>
    /// <field name='Humidity' type='Double'>湿度 Y</field>
    /// <field name='DC12V_1' type='Double'>直流12V Y</field>
    /// <field name='DC12V_2' type='Double'>直流12V Y</field>
    /// <field name='DC24V' type='Double'>直流24V Y</field>
    /// <field name='AC24V' type='Double'>交流24V Y</field>
    /// <field name='AC220V' type='Double'>交流220V Y</field>
    /// </signature>
    this.IsOnline = false;//是否在线 N
    this.LastUpdatedTime = new Date();//最后更新时间 N
    this.BoxOpened = false;//设备箱，关：False|开：True Y
    this.BoxOpenedSpecified = false;
    this.PowerOff = false;//断电，交流电正常工作：False|交流电断电：True Y
    this.PowerOffSpecified = false;
    this.TransmitterRecovery = false;//光端机复位状态 正常：False|复位成功：True	Y
    this.TransmitterRecoverySpecified = false;
    this.IndustrialRecovery = false;//工控机复位状态 正常：False|复位成功：True Y
    this.IndustrialRecoverySpecified = false;
    this.Auxiliary = new Array();//辅助状态，关：False|开：True Y
    this.AuxiliarySpecified = false;
    this.Buzzer = false;//蜂鸣器状态，关：False|开：True	Y
    this.BuzzerSpecified = false;
    this.Temperature = 0.0;//温度，摄氏度 Y
    this.TemperatureSpecified = false;
    this.Humidity = 0.0;//湿度 Y
    this.HumiditySpecified = false;
    this.DC12V_1 = 0.0;//直流12V Y
    this.DC12V_1Specified = false;
    this.DC12V_2 = 0.0;//直流12V Y
    this.DC12V_2Specified = false;
    this.DC24V = 0.0;//直流24V Y
    this.DC24VSpecified = false;
    this.AC24V = 0.0;//交流24V Y
    this.AC24VSpecified = false;
    this.AC220V = 0.0;//交流220V Y
    this.AC220VSpecified = false;
}

///<var>IP地址版本
var IPVersion =
{
    IPv4: "IPv4", //IPv4	0
    IPv6: "IPv6", //IPv6	1
    Dual: "Dual", //IPv4+IPv6	2
}

///<var>网络地址获取方式
var NetworkAddressingType =
{
    Static: "Static", //静态获取	0
    Dynamic: "Dynamic", //动态获取	1
    APIPA: "APIPA", //自动私有IP地址获取  Automatic Private IP Addressing  2
}

///<var>网口线缆类型
var NetworkCableType =
{
    RJ45: "RJ45", //RJ45接口	0
    Fiber: "Fiber", //光纤接口 	1
    Wireless: "Wireless", //无线设备	2
}

///<var>网口连接速率和双工模式
var NetworkSpeedDuplex =
{
    Auto: "Auto", //自适应	0
    Half10MBase: "Half10MBase", //10Mbps 半双工 	1
    Full10MBase: "Full10MBase", //10Mbps 全双工	    2
    Half100MBase: "Half100MBase", //100Mbps 半双工	3
    Full100MBase: "Full100MBase", //100Mbps 全双工	4
    Half1000MBase: "Half1000MBase", //1000Mbps 半双工	5
    Full1000MBase: "Full1000MBase", //1000Mbps 全双工	6
}

///<var>网口工作模式
var NetworkInterfaceWorkMode =
{
    Disable: "Disable", //禁用	0
    Enable: "Enable", //启用 	1
    Bridge: "Bridge", //桥接或对等	2
    Balancing: "Balancing"//负载均衡	3
}

///<var>设备连接模式
var ConnectionMode =
{
    UDP: "UDP", //UDP传输	1
    TCPServer: "TCPServer", //TCP服务端被连接	2
    TCPClient: "TCPClient", //TCP客户端连接中心服务器	3
}

///<var>波特率
var BaudRate =
{
    BR1200: "BR1200", //1200	0
    BR2400: "BR2400", //2400	1
    BR4800: "BR4800", //4800	2
    BR9600: "BR9600", //9600	3
    BR19200: "BR19200", //19200	4
    BR38400: "BR38400", //38400	5
    BR57600: "BR57600", //57600	6
    BR115200: "BR115200", //115200	7
}













