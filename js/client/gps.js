/// <reference path="../howell.js/howell.js" />
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




function GPSClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/gps_service";

    var base = new BaseClient();



    this.getVersion = function () {
        var result = base.Get(contract.version);
        return Convert(result, new ServiceVersion());
    }

    this.Device = {
        List: function (deviceId, pageIndex, pageSize) {
            /// <signature>
            /// <summary>查询GPS设备信息</summary>
            /// <param name="deviceId" type="String" >查询的设备Id列表，各Id之间使用逗号分隔</param>  
            /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
            /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
            /// <returns type="GPSDeviceList">GPS设备信息列表</returns> 
            /// </signature>
            var result = base.Get(contract.device.list(), getParams(this.List));
            return Convert(result, new GPSDeviceList());
        },
        Create: function (device) {
            /// <signature>
            /// <summary>查询GPS设备信息</summary>
            /// <param name="device" type="GPSDevice" >GPS设备信息</param>              
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Post(contract.device.list(), device);
        },
        Get: function (deviceId) {
            /// <signature>
            /// <summary>获取GPS设备信息</summary>
            /// <param name="deviceId" type="String">设备编号</param>
            /// <returns type="GPSDevice">GPS设备信息</returns> 
            /// </signature>
            var result = base.Get(contract.device.item(deviceId));
            return Convert(result, new GPSDevice())
        },
        Set: function (device) {
            /// <signature>
            /// <summary>修改GPS设备信息</summary>
            /// <param name="device" type="GPSDevice" >GPS设备信息</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Put(contract.device.item(device.Id), device);
        },
        Delete: function (deviceId) {
            /// <signature>
            /// <summary>删除GPS设备信息</summary>
            /// <param name="deviceId" type="String">设备编号</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Delete(contract.device.item(deviceId));
        },
        RMC: {
            List: function (deviceId, beginTime, endTime, status, interval, pageIndex, pageSize) {
                /// <signature>
                /// <summary>获取设备的RMC (推荐定位信息)历史记录信息</summary>
                /// <param name="deviceId" type="String" >设备编号</param>  
                /// <param name='BeginTime' type='DateTime'>开始时间</param>                
                /// <param name='EndTime' type='DateTime'>结束时间</param>
                /// <param name='Status' type='Int32'>有效状态</param>
                /// <param name='Interval' type='Int32'>采样数据统计实时间隔(单位：秒)</param>
                /// <param name='PageIndex' type='Int32'>页码[1-n]</param>
                /// <param name='PageSize' type='Int32'>分页大小[1-100]</param>
                /// <returns type="RMCList">RMC (推荐定位信息)历史记录信息</returns> 
                /// </signature>

                var params = getParams(this.List, 1);
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
                var result = base.Get(contract.device.rmc(deviceId), params);
                return Convert(result, new RMCList());
            },
            Create: function (deviceId, rmc) {
                /// <signature>
                /// <summary>创建定位信息</summary>
                /// <param name="deviceId" type="String">设备编号</param>  
                /// <param name='rmc' type='RMC'>定位信息</param>
                /// <returns>操作结果</returns> 
                /// </signature>
                return base.Post(contract.device.rmc(deviceId), rmc);
            }
        },
        Access: {
            List: function (accessId, pageIndex, pageSize) {
                /// <signature>
                /// <summary>查询GPS设备信息</summary>
                /// <param name="deviceId" type="String" >查询的设备平台接入Id列表，各Id之间使用逗号分隔</param>  
                /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
                /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
                /// <returns type="GPSDeviceList">GPS设备信息列表</returns> 
                /// </signature>
                var result = base.Get(contract.device.access.list(), getParams(this.List));
                return Convert(result, new GPSDeviceList());
            },
            RMC: {
                List: function (id, beginTime, endTime, status, interval, pageIndex, pageSize) {
                    /// <signature>
                    /// <summary>获取设备的RMC (推荐定位信息)历史记录信息</summary>
                    /// <param name="id" type="String" >查询的设备平台接入Id列表</param>  
                    /// <param name='BeginTime' type='DateTime'>开始时间</param>                
                    /// <param name='EndTime' type='DateTime'>结束时间</param>
                    /// <param name='Status' type='Int32'>有效状态</param>
                    /// <param name='Interval' type='Int32'>采样数据统计实时间隔(单位：秒)</param>
                    /// <param name='PageIndex' type='Int32'>页码[1-n]</param>
                    /// <param name='PageSize' type='Int32'>分页大小[1-100]</param>
                    /// <returns type="RMCList">RMC (推荐定位信息)历史记录信息</returns> 
                    /// </signature>

                    var params = getParams(this.List, 1);
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

                    var result = base.Get(contract.device.access.rmc(id), params);
                    return Convert(result, new RMCList());
                },
                Create: function (id, rmc) {
                    /// <signature>
                    /// <summary>创建定位信息</summary>
                    /// <param name="id" type="String">查询的设备平台接入Id</param>  
                    /// <param name='rmc' type='RMC'>定位信息</param>
                    /// <returns>操作结果</returns> 
                    /// </signature>
                    return base.Post(contract.device.access.rmc(id), rmc);
                }
            }
        }
    };


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
            rmc: function (deviceId) {
                return contract.device.item(deviceId) + "/RMC";
            },
            access:
            {
                list: function () {
                    return contract.device.list() + "/Access";
                },
                rmc: function (id) {
                    return this.list() + "/" + id + "/RMC";
                }
            }
        }
    }

}


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
    /// <summary>异常信息</summary>
    /// <field name='Message' type='String'>异常消息	N</field>
    /// <field name='ExceptionType' type='String'>异常类型	N</field>

    this.Message = "";
    this.ExceptionType = "";

}

function ServiceVersion() {
    /// <signature>
    /// <summary>服务版本信息</summary>
    /// <field name='Version' type='String'>版本号 1.0.1	N</field>
    /// <field name='BuildDate' type='DateTime'>编译时间	N</field>
    /// <field name='Company' type='String'>公司名	N</field>
    /// </signature>
    this.Version = "";
    this.BuildDate = new Date();
    this.Company = "";
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


function RMC() {
    /// <signature>
    /// <summary>推荐地理位置信息</summary>
    /// <field name='DeviceId' type='String'>GPS设备唯一表示符	N</field>
    /// <field name='Time' type='DateTime'>信息创建时间	N</field>
    /// <field name='Status' type='EventState'>定位状态 1-有效数据 0-无效	N</field>
    /// <field name='Latitude' type='Double'>纬度，(-90,90)正数N，负数S	N</field>
    /// <field name='Longitude' type='Double'>经度，(-180,180)正数E,负数W	N</field>
    /// <field name='Speed' type='Double'>地面速度，单位：Km/h	Y</field>
    /// <field name='Course' type='Double'>地面航向[000.0~360)度，以正北为参考基准	Y</field>
    /// <field name='MagneticVariation' type='Double'>磁偏角 以正北为参考基准	Y</field>
    /// <field name='Altitude' type='Double'>海拔高度，单位：米	Y</field>
    /// <field name='Description' type='String'>描述信息	Y</field>
    /// <field name='AccessId' type='String'>平台接入设备唯一标识符	N</field>
    /// </signature>

    this.DeviceId = "";
    this.Time = new Date();
    this.Status = EventState.Inactive;
    this.Latitude = 0.0;
    this.Longitude = 0.0;
    this.Speed = 0.0;
    this.Course = 0.0;
    this.MagneticVariation = 0.0;
    this.Altitude = 0.0;
    this.Description = "";
    this.AccessId = "";

    this.SpeedSpecified = false;
    this.CourseSpecified = false;
    this.MagneticVariationSpecified = false;
    this.AltitudeSpecified = false;
    this.DescriptionSpecified = false;
}


function RMCList() {
    /// <signature>
    /// <summary>推荐地理位置信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='RMC' type='RMC[]'>推荐地理位置信息	Y</field>
    /// </signature>


    this.Page = new Page();
    this.RMC = new Array();

    this.PageSpecified = false;
    this.RMCSpecified = false;
}


function GPSDevice() {
    /// <signature>
    /// <summary>GPS设备信息</summary>
    /// <field name='Id' type='String'>设备唯一标识符（平台分配） N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间	N</field>
    /// <field name='Name' type='String'>设备名称	Y</field>
    /// <field name='Username' type='String'>用户名	Y</field>
    /// <field name='Password' type='String'>密码	Y</field>
    /// <field name='Model' type='String'>型号	Y</field>
    /// <field name='Description' type='String'>描述信息	Y</field>
    /// <field name='AccessId' type='String'>平台接入设备唯一标识符，（用户设置，唯一） N</field>
    /// <field name='GPSStatus' type='GPSStatus'>设备当前状态	Y</field>
    /// </signature>

    this.Id = "";
    this.CreationTime = new Date();
    this.Name = "";
    this.Username = "";
    this.Password = "";
    this.Model = "";
    this.Description = "";
    this.AccessId = "";
    this.GPSStatus = new GPSStatus();

    this.NameSpecified = false;
    this.UsernameSpecified = false;
    this.PasswordSpecified = false;
    this.ModelSpecified = false;
    this.DescriptionSpecified = false;
    this.GPSStatusSpecified = false;
}



function GPSDeviceList() {
    /// <signature>
    /// <summary>GPS设备信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='GPSDevice' type='GPSDevice[]'>GPS设备信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.GPSDevice = new Array();

    this.PageSpecified = false;
    this.GPSDeviceSpecified = false;
}

function GPSStatus() {
    /// <signature>
    /// <summary>GPS设备状态</summary>
    /// <field name='Time' type='DateTime'>最后在线时间	N</field>
    /// <field name='IsOnline' type='Boolean'>是否在线	Y</field>
    /// <field name='Status' type='EventState'>定位状态 1-有效数据 0-无效	Y</field>
    /// <field name='Latitude' type='Double'>纬度，(-90,90)正数N，负数S	Y</field>
    /// <field name='Longitude' type='Double'>经度，(-180,180)正数E,负数W	Y</field>
    /// <field name='Speed' type='Double'>地面速度，单位：Km/h	Y</field>
    /// <field name='Course' type='Double'>地面航向[000.0~360)度，以正北为参考基准	Y</field>
    /// <field name='MagneticVariation' type='Double'>磁偏角 以正北为参考基准	Y</field>
    /// <field name='Altitude' type='Double'>海拔高度，单位：米	Y</field>
    /// <field name='SystemUpTime' type='Int64'>系统在线时间，单位：秒	Y</field>
    /// </signature>

    this.Time = new Date();
    this.IsOnline = false;
    this.Status = EventState.Inactive;
    this.Latitude = 0.0;
    this.Longitude = 0.0;
    this.Speed = 0.0;
    this.Course = 0.0;
    this.MagneticVariation = 0.0;
    this.Altitude = 0.0;
    this.SystemUpTime = 0;

    this.IsOnlineSpecified = false;
    this.StatusSpecified = false;
    this.LatitudeSpecified = false;
    this.LongitudeSpecified = false;
    this.SpeedSpecified = false;
    this.CourseSpecified = false;
    this.MagneticVariationSpecified = false;
    this.AltitudeSpecified = false;
    this.SystemUpTimeSpecified = false;
}

//注意：1. 所有枚举类型在序列化为JSON后以字符串形式出现.
//      2. Flags枚举类型在序列化为JSON后以字符串形式出现，如果有多项则以逗号(,)分割
var EventState = {
    //当不符合事件触发条件时的状态 0
    Inactive: 0,
    //当符合事件触发条件时的状态 1
    Active: 1
}

