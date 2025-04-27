/// <reference path="../enum.js" />
/// <reference path="../struct.js" />
/// <reference path="../../howell.js/howell.js" />
/// <reference path="../struct.js" />
/// <reference path="../BaseClient.js" />


(function (deviceId) {

    var hadScript =
    {
        httpService: "/js/howell.js/httpService.js",
        convert:"/js/howell.js/howell.convert.js",
        BaseClient: "/js/client/BaseClient.js",
    };
    for (var id in hadScript) {
        if (!document.getElementById(id)) {
            loadJS(id, document.location.protocol + "//" + document.location.host + hadScript[id]);
        }
    }
})();



function ModbusClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/Annunciator/Modbus";
    var base = new BaseClient();

    var contract =
    {
        version: baseUri + "/System/Version",
        device: {
            list: function () {
                return baseUri + "/System/Devices";
            },
            item: function (id) {
                return this.list() + "/" + id;
            },
            network: {
                base: function (id) {
                    return contract.device.item(id) + "/Network";
                },
                information: function (id) {
                    return this.base(id);
                },
                wifi: function (id) {
                    return this.base(id) + "/WiFi";
                },
                centralserver: function (id) {
                    return this.base(id) + "/CentralServer";
                }
            },
            ultrasonic: function (id) {
                return this.item(id) + "/Ultrasonic";
            },
            signal: {
                base: function (id) {
                    return contract.device.item(id) + "/Signals";
                },
                status: function (id) {
                    return this.base(id) + "/Status"
                },
                item: {
                    base: function (deviceId, signalId) {
                        return contract.device.signal.base(deviceId) + "/" + signalId;
                    },
                    status: function (deviceId, signalId) {
                        return this.base(deviceId, signalId) + "/Status";
                    },
                    eliminate: function (deviceId, signalId) {
                        return this.base(deviceId, signalId) + "/Eliminate";
                    }
                }
            },
            relay: {
                base: function (id) {
                    return contract.device.item(id) + "/Relays"
                },
                status: function (id) {
                    return this.base(id) + "/Status";
                },
                item: {
                    base: function (deviceId, relayId) {
                        return contract.device.relay.base(deviceId) + "/" + relayId;
                    },
                    status: function (deviceId, relayId) {
                        return this.base(deviceId, relayId) + "/Status";
                    },
                }
            },
            status: function (id) {
                return this.item(id) + "/Status"
            },
            reboot: function (id) {
                return this.item(id) + "/Reboot";
            },
            shutdown: function (id) {
                return this.item(id) + "/Shutdown";
            },
            factorydefault: function (id) {
                return this.item(id) + "/FactoryDefault";
            },
            saveelectricity: function (id) {
                return this.item(id) + "/SaveElectricity";
            }
        }

    };

    this.getVersion = function () {
        return base.Get(contract.version);
    }
    this.Device = {
        List: function (pageIndex, pageSize) {
            return base.Get(contract.device.list(), getParams(this.List));
        },

        Get: function (deviceId) {
            var response = base.Get(contract.device.item(deviceId));
            if (!response) {
                return null;
            }

            var result = new DeviceInformation();
            result = Convert(response, result)
            return result;
        },
        Set: function (deviceId, device) {
            return base.Put(contract.device.item(deviceId), device)
        },
        Network: {
            Information: {
                Get: function (deviceId) {
                    var response = base.Get(contract.device.network.information(deviceId));
                    if (!response)
                        return null;
                    var result = new NetworkInformation();
                    result = Convert(response, result);
                    return result;
                },
                Set: function (deviceId, information) {
                    return base.Put(contract.device.network.information(deviceId), information);
                }
            },
            WiFi: {
                Get: function (deviceId) {
                    var response = base.Get(contract.device.network.wifi(deviceId));
                    if (!response)
                        return null;
                    var result = new WiFiInformation();
                    result = Convert(response, result);
                    return result;
                },
                Set: function (deviceId, wifi) {
                    return base.Put(contract.device.network.wifi(deviceId), wifi);
                }
            },
            CentralServer: {
                Get: function (deviceId) {
                    var response = base.Get(contract.device.network.centralserver(deviceId));
                    if (!response)
                        return null;
                    var result = new CentralServerInformation();
                    result = Convert(response, result);
                    return result;
                },
                Set: function (deviceId, wifi) {
                    return base.Put(contract.device.network.centralserver(deviceId), wifi);
                }
            }
        },
        Ultrasonic: {
            Get: function (deviceId) {
                var response = base.Get(contract.device.ultrasonic(deviceId));
                if (!response)
                    return null;
                var result = new UltrasonicInformation();
                result = Convert(response, result);
                return result;
            },
            Set: function (deviceId, ultrasonic) {
                return base.Put(contract.device.ultrasonic(deviceId), ultrasonic);
            }
        },
        Signal: {
            StatusList: function (deviceId, pageIndex, pageSize) {
                var response = base.Get(contract.device.signal.status(deviceId), getParams(this.StatusList, 1));
                if (!response)
                    return null;
                var result = new SignalStatusList();
                result = Convert(response, result);
                return result;
            },
            Status: {
                Get: function (deviceId, signalId) {
                    var response = base.Get(contract.device.signal.item.status(deviceId, signalId));
                    if (!response)
                        return null;
                    var result = new SignalStatus();
                    result = Convert(response, result);
                    return result;
                },
                Set: function (deviceId, signalId, status) {
                    return base.Put(contract.device.signal.item.status(deviceId, signalId), status);
                }
            },
            Eliminate: function (deviceId, signalId) {
                return base.Post(contract.device.signal.item.eliminate(deviceId, signalId));
            }
        },
        Relay: {
            StatusList: function (deviceId, pageIndex, pageSize) {
                var response = base.Get(contract.device.relay.status(deviceId), getParams(this.StatusList, 1));
                if (!response)
                    return null;
                var result = new RelayStatusList();
                result = Convert(response, result);
                return result;
            },
            Status: {
                Get: function (deviceId, relayId) {
                    var response = base.Get(contract.device.relay.status(deviceId, relayId));
                    if (!response)
                        return null;
                    var result = new RelayStatus();
                    result = Convert(response, result);
                    return result;
                },
                Set: function (deviceId, relayId, status) {
                    return base.Put(contract.device.relay.item.status(deviceId, relayId), status);
                }
            }
        },
        Status: function (deviceId) {
            var response = base.Get(contract.device.status(deviceId));
            if (!response)
                return null;
            var result = new DeviceStatus();
            result = Convert(response, result);
            return result;
        },
        Reboot: function (deviceId) {
            return base.Post(contract.device.reboot(deviceId));
        },
        Shutdown: function (deviceId) {
            return base.Post(contract.device.shutdown(deviceId));
        },
        FactoryDefault: function (deviceId) {
            return base.Post(contract.device.factorydefault(deviceId));
        },
        SaveElectricity: function (deviceId, enable) {

            if (enable != false)
                enable = true;

            return base.Post(contract.device.saveelectricity(deviceId), null, getParams(this.SaveElectricity, 1));
        }
    };
}
function DeviceInformation() {
    /// <signature>
    /// <summary>设备信息</summary>
    /// <field name='ProductCode' type='String' >产品唯一标识符(只读) N</field>
    /// <field name='Version' type='String' >修订版本号(只读) N</field>    
    /// <field name='Factory' type='String' >厂商信息(只读) N</field>
    /// <field name='Name' type='String' >名称 Y</field>    
    /// <field name='SoftwareVersion' type='String' >软件版本号(只读) N</field>
    /// <field name='ProtocolVersion' type='String' >协议版本号(只读) N</field>    
    /// <field name='HardwareVersion' type='String' >硬件版本号(只读) N</field>
    /// <field name='SignalCount' type='Int32' >报警器数目(只读) N</field>    
    /// <field name='RelayCount' type='Int32' >继电器数目(只读) N</field>
    /// <field name='Capabilities' type='DeviceCapabilities' >设备能力(只读) N</field>
    /// <field name='Status' type='DeviceStatus' >设备状态(只读) N</field>
    /// </signature>    
    this.ProductCode = "";
    this.Version = "";
    this.Factory = "";
    this.Name = "";
    this.SoftwareVersion = "";
    this.ProtocolVersion = "";
    this.HardwareVersion = "";
    this.SignalCount = 0;
    this.RelayCount = 0;
    this.Capabilities = DeviceCapabilities.None;
    this.Status = new DeviceStatus();
}

function DeviceInformationList() {
    this.Page = new Page();
    this.DeviceInformation = new Array();
}

function DeviceStatus() {
    /// <signature>
    /// <summary>设备状态信息</summary>
    /// <field name='WorkMode' type='WorkMode' >工作模式 N</field>
    /// <field name='BatteryRemaining' type='Int32' >电池剩余容量(只读) Y</field>    
    /// </signature>   
    this.WorkMode = WorkMode.Normal;
    this.BatteryRemaining = 0;

}

function CentralServerInformation() {
    /// <signature>
    /// <summary>中心服务器信息</summary>
    /// <field name='IPAddress' type='String' >IPv4地址 N</field>
    /// <field name='Port' type='Int32' >端口号（默认：8802） Y</field>    
    /// </signature>  
    this.IPAddress = "";
    this.Port = "0";
}

function UltrasonicInformation() {
    /// <signature>
    /// <summary>超声波信息</summary>
    /// <field name='Interval' type='Int32' >探测间隔 （单位：毫秒) N</field>
    /// <field name='Range' type='Int32' >探测距离 (单位：CM厘米) N</field>    
    /// <field name='MaxRange' type='Int32' >最大探测距离 (单位：CM厘米) N</field>
    /// </signature> 
    this.Interval = 0;
    this.Range = 0;
    this.MaxRange = 0;
}

function WiFiInformation() {
    /// <signature>
    /// <summary>无线设备信息</summary>
    /// <field name='Name' type='String' >WiFi连接名称 N</field>
    /// <field name='Password' type='String' >WiFi连接密码 N</field>    
    /// <field name='Channel' type='Int32' >WiFi信道[0-15] N</field>
    /// <field name='Intensity' type='Int32' >WiFi信号强度[0-100]（只读） N</field>
    /// </signature> 

    this.Name = "";
    this.Password = "";
    this.Channel = 0;
    this.Intensity = 0;
}

function NetworkInformation() {
    /// <signature>
    /// <summary>无线设备信息</summary>
    /// <field name='Name' type='String' >IPv4地址 N</field>
    /// <field name='Name' type='Int32' >端口号（Modbus:502） N</field>
    /// <field name='Name' type='String' >子网掩码 N</field>
    /// <field name='Name' type='String' >默认网关 N</field>
    /// <field name='Name' type='String' >物理地址 00-00-00-00-00-00 N</field>
    /// <field name='Name' type='String' >DNS地址 Y</field>
    /// <field name='Name' type='WiFiInformation' >WiFi信号 Y</field>
    /// <field name='Name' type='CentralServerInformation' >中心服务器 Y</field>
    /// </signature> 


    this.IPAddress = "";
    this.Port = 0;
    this.Submask = "";
    this.Gateway = "";
    this.PhysicalAddress = "";
    this.DNS = "";
    this.WiFi = new WiFiInformation();
    this.CentralServer = new CentralServerInformation();


    this.DNSSpecified = false;
    this.WiFiSpecified = false;
    this.CentralServerSpecified = false;
}

function RelayStatus() {
    /// <signature>
    /// <summary>继电器状态</summary>
    /// <field name='ProductCode' type='String' >产品唯一标识符(只读) N</field>
    /// <field name='No' type='Int32' >继电器编号[1-n] N</field>
    /// <field name='State' type='SwitchState' >继电器状态 N</field>
    /// </signature>
    this.ProductCode = "";
    this.No = 1;
    this.State = SwitchState.OFF;

}

function RelayStatusList() {
    /// <signature>
    /// <summary>继电器状态列表</summary>
    /// <field name='Page' type='Page' >分页信息，如果没有分页信息，则表示一次性获取所有的结果。 N</field>
    /// <field name='RelayStatus' type='RelayStatus[]' >继电器状态 N</field>
    /// </signature> 

    this.Page = new Page();
    this.RelayStatus = new Array();
}

function SignalStatus() {
    /// <signature>
    /// <summary>信号量状态</summary>    
    /// <field name='ProductCode' type='String' >产品唯一标识符(只读) N</field>
    /// <field name='No' type='Int32' >信号量编号[1-n] (只读) N</field>
    /// <field name='State' type='SwitchState' >信号开关量状态(只读) N</field>
    /// <field name='StationaryState' type='SwitchState' >信号开关量常态 N</field>
    /// <field name='Bypass' type='SwitchState' >旁路状态 N</field>
    /// <field name='Audio' type='SwitchState' >音频信号联动状态 N</field>
    /// <field name='Light' type='SwitchState' >光信号联动状态 N</field>
    /// </signature> 

    this.ProductCode = "";
    this.No = 1;
    this.State = SwitchState.OFF;
    this.StationaryState = SwitchState.OFF;
    this.Bypass = SwitchState.OFF;
    this.Audio = SwitchState.OFF;
    this.Light = SwitchState.OFF;

    this.StationaryStateSpecified = false;
    this.BypassSpecified = false;
    this.AudioSpecified = false;
    this.LightSpecified = false;
}

function SignalStatusList() {
    /// <signature>
    /// <summary>信号量状态列表</summary>
    /// <field name='Page' type='Page' >分页信息，如果没有分页信息，则表示一次性获取所有的结果。 N</field>
    /// <field name='SignalStatus' type='SignalStatus[]' >信号量状态 N</field>
    /// </signature> 
    this.Page = new Page();
    this.SignalStatus = new Array();
}


//工作模式
var WorkMode = {
    Normal: "Normal",                    //正常
    Abnormal: "Abnormal",                //异常
    SaveElectricity: "SaveElectricity"   //节电模式

};
//开关量状态
var SwitchState = {
    OFF: "OFF", //关闭
    ON: "ON"     //打开
};
//设备能力
var DeviceCapabilities = {
    None: "None",   //无
    Signal: "Signal",//报警信号量
    Relay: "Relay",//继电器信号量
    WiFi: "WiFi",//无线信号
    Audio: "Audio",//声音报警信号
    Light: "Light",//光报警信号
    Ultrasonic: "Ultrasonic",//红外或超声波报警信号
    Battery: "Battery",//电池
    UploadAlert: "UploadAlert",//自动上传报警
    SaveElectricity: "SaveElectricity",//节电模式
    Heartbeat: "Heartbeat"//定时心跳
}