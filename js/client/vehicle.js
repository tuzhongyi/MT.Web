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

function VehicleClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/vehicle_service";

    var base = new BaseClient();

    this.getVersion = function () {
        var result = base.Get(contract.version);
        return Convert(result, new ServiceVersion());
    }

    this.Device = {
        List: function (deviceId, pageIndex, pageSize) {
            /// <signature>
            /// <summary>查询车牌识别设备信息</summary>
            /// <param name="deviceId" type="String" >查询的设备Id列表，各Id之间使用逗号分隔</param>  
            /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
            /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
            /// <returns type="VehiclePlateDeviceList">GPS设备信息列表</returns> 
            /// </signature>
            var result = base.Get(contract.device.list(), getParams(this.List));
            return Convert(result, new VehiclePlateDeviceList());
        },
        Create: function (device) {
            /// <signature>
            /// <summary>创建车牌识别设备信息</summary>
            /// <param name="device" type="VehiclePlateDevice" >车牌识别设备信息</param>              
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Post(contract.device.list(), device);
        },
        Get: function (deviceId) {
            /// <signature>
            /// <summary>获取车牌识别设备信息</summary>
            /// <param name="deviceId" type="String">设备编号</param>
            /// <returns type="VehiclePlateDevice">车牌识别设备信息</returns> 
            /// </signature>
            var result = base.Get(contract.device.item(deviceId));
            return Convert(result, new VehiclePlateDevice())
        },
        Set: function (device) {
            /// <signature>
            /// <summary>修改车牌识别设备信息</summary>
            /// <param name="device" type="VehiclePlateDevice" >车牌识别设备信息</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Put(contract.device.item(device.Id), device);
        },
        Delete: function (deviceId) {
            /// <signature>
            /// <summary>删除车牌识别设备信息</summary>
            /// <param name="deviceId" type="String">设备编号</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Delete(contract.device.item(deviceId));
        },
        Record: {
            List: function (deviceId, beginTime, endTime, plate, brand, name, accessId, pageIndex, pageSize) {
                /// <signature>
                /// <summary>获取车牌识别历史记录信息</summary>
                /// <param name="deviceId" type="String" >设备唯一标识符，使用逗号分隔</param>  
                /// <param name='beginTime' type='DateTime'>开始时间</param>                
                /// <param name='endTime' type='DateTime'>结束时间</param>
                /// <param name='plate' type='String'>车牌模糊查询，缺省字符用*代替</param>
                /// <param name='brand' type='String'>车辆品牌</param>
                /// <param name='name' type='String'>车辆名称</param>
                /// <param name='accessId' type='String'>接入唯一标识符，使用逗号分隔</param>
                /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
                /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
                /// <returns type="VehiclePlateRecordList">车牌识别历史记录信息</returns> 
                /// </signature>
                var params = getParams(this.List, 0);
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
                var result = base.Get(contract.device.record.list(), params);
                return Convert(result, new VehiclePlateRecordList());
            },
            Create: function (record) {
                /// <signature>
                /// <summary>创建车牌识别历史记录信息</summary>
                /// <param name='record' type='VehiclePlateRecord'>车牌识别历史记录信息</param>
                /// <returns>操作结果</returns> 
                /// </signature>
                return base.Post(contract.device.record.list(), record);
            },
            Item:{
                List: function (deviceId, beginTime, endTime, pageIndex, pageSize) {
                    /// <signature>
                    /// <summary>获取车牌识别历史记录信息</summary>
                    /// <param name="deviceId" type="String" >设备唯一标识符</param>  
                    /// <param name='beginTime' type='DateTime'>开始时间</param>                
                    /// <param name='endTime' type='DateTime'>结束时间</param>
                    /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
                    /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
                    /// <returns type="VehiclePlateRecordList">车牌识别历史记录信息</returns> 
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
                    var result = base.Get(contract.device.record.item(deviceId), params);
                    return Convert(result, new VehiclePlateRecordList());
                },
                Create: function (deviceId, record) {
                    /// <signature>
                    /// <summary>创建车牌识别历史记录信息</summary>
                    /// <param name='deviceId' type='String'>设备唯一标识符</param>
                    /// <param name='record' type='VehiclePlateRecord'>车牌识别历史记录信息</param>
                    /// <returns>操作结果</returns> 
                    /// </signature>
                    return base.Post(contract.device.record.item(deviceId), record);
                }
            } 
        },
        Access: {
            List: function (accessId, pageIndex, pageSize) {
                /// <signature>
                /// <summary>查询车牌识别设备信息</summary>
                /// <param name="accessId" type="String" >查询的设备平台接入Id列表，各Id之间使用逗号分隔</param>  
                /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
                /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
                /// <returns type="VehiclePlateDeviceList">车牌识别设备信息</returns> 
                /// </signature>
                var result = base.Get(contract.device.access.list(), getParams(this.List));
                return Convert(result, new VehiclePlateDeviceList());
            },
            Get: function (accessId) {
                /// <signature>
                /// <summary>查询车牌识别设备信息</summary>
                /// <param name="accessId" type="String" >查询的设备平台接入Id</param>  
                /// <returns type="VehiclePlateDevice">车牌识别设备信息</returns> 
                /// </signature>
                var result = base.Get(contract.device.access.item(accessId));
                return Convert(result, new VehiclePlateDevice())
            },
            Record: {
                List: function (accessId, beginTime, endTime, pageIndex, pageSize) {
                    /// <signature>
                    /// <summary>获取车牌识别历史记录信息</summary>
                    /// <param name="accessId" type="String" >查询的设备平台接入Id列表</param>  
                    /// <param name='beginTime' type='DateTime'>开始时间</param>                
                    /// <param name='endTime' type='DateTime'>结束时间</param>
                    /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
                    /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
                    /// <returns type="VehiclePlateRecordList">车牌识别记录信息列表</returns> 
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

                    var result = base.Get(contract.device.access.record(accessId), params);
                    return Convert(result, new VehiclePlateRecordList());
                },
                Create: function (accessId, record) {
                    /// <signature>
                    /// <summary>创建车牌识别记录信息</summary>
                    /// <param name="accessId" type="String">查询的设备平台接入Id</param>  
                    /// <param name='record' type='VehiclePlateRecord'>车牌识别记录信息</param>
                    /// <returns>操作结果</returns> 
                    /// </signature>
                    return base.Post(contract.device.access.record(accessId), record);
                }
            }
        }
    };

    this.Picture = {
        Create: function (stream, contentType) {
            /// <signature>
            /// <summary>手动上传图片</summary>
            /// <param name="stream" type="BINARY_STREAM">图片流</param>
            /// <returns type="contentType">内容类型</returns> 
            /// </signature>
            return base.PostStream(contract.picture.base(), stream, contentType);
        },
        Get: function (pictureId) {
            /// <signature>
            /// <summary>获取图片信息</summary>
            /// <param name="pictureId" type="String">图片唯一标识符</param>
            /// <returns type="VehiclePlatePicture">车牌识别图片信息</returns> 
            /// </signature>
            var result = base.Get(contract.picture.item(pictureId));
            return Convert(result, new VehiclePlatePicture())
        },
        Data: function (pictureId) {
            /// <signature>
            /// <summary>获取图片数据</summary>
            /// <param name="pictureId" type="String">图片唯一标识符</param>
            /// <returns type="String">图片地址</returns> 
            /// </signature>
            return contract.picture.data(pictureId);
        },
        Detection: function () {
            /// <signature>
            /// <summary>检测图片识别车牌</summary>
            /// <param name="pictureId" type="String">图片唯一标识符</param>
            /// <returns type="VehicleDetectionResult">车辆识别结果</returns> 
            /// </signature>
            var result = base.Get(contract.picture.detection(pictureId));
            return Convert(result, new VehicleDetectionResult())
        }
    };

    this.Vehicle = {
        List: function (plate, brand, existedInBlackList, pageIndex, pageSize) {
            /// <signature>
            /// <summary>查询车辆信息列表</summary>
            /// <param name="plate" type="String" >车牌模糊查询，缺省字符用*代替</param>  
            /// <param name="brand" type="String" >车辆品牌</param>  
            /// <param name="existedInBlackList" type="Boolean" >是否存在与黑名单内</param>  
            /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
            /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
            /// <returns type="VehicleList">车辆信息列表</returns> 
            /// </signature>
            var result = base.Get(contract.vehicle.list(), getParams(this.List));
            return Convert(result, new VehicleList());
        },
        Get: function (vehicleId) {
            /// <signature>
            /// <summary>获取车辆设备信息</summary>
            /// <param name="vehicleId" type="String">车辆编号</param>
            /// <returns type="Vehicle ">车辆信息</returns> 
            /// </signature>
            var result = base.Get(contract.vehicle.item(vehicleId));
            return Convert(result, new Vehicle())
        },
        Set: function (vehicle) {
            /// <signature>
            /// <summary>修改车辆设备信息</summary>
            /// <param name="vehicle" type="Vehicle" >车辆信息</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Put(contract.vehicle.item(vehicle.Id), vehicle);
        },
        Delete: function (vehicleId) {
            /// <signature>
            /// <summary>删除车辆设备信息</summary>
            /// <param name="vehicleId" type="String">车辆编号</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Delete(contract.vehicle.item(vehicleId));
        },
        Create: function (vehicle) {
            /// <signature>
            /// <summary>创建车辆信息</summary>
            /// <param name="vehicle" type="Vehicle" >车辆信息</param>              
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Post(contract.vehicle.list(), vehicle);
        },
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
            access: {
                list: function () {
                    return contract.device.list() + "/Access";
                },
                item: function (id) {
                    return this.list() + "/" + id;
                },
                record: function (id) {
                    return this.item(id) + "/Records"
                },
            },
            record: {
                list: function () {
                    return contract.device.list() + "/Records";
                },
                item: function (id) {
                    return contract.device.item(id) + "/Records"
                }
            }
        },
        picture: {
            base: function () {
                return baseUri + "/System/Pictures";
            },
            item: function (id) {
                return this.base() + "/" + id;
            },
            data: function (id) {
                return this.item(id) + "/Data";
            },
            detection: function (id) {
                return this.item(id) + "/Detection";
            }
        },
        vehicle: {
            list: function () {
                return baseUri + "/System/Vehicles";
            },
            item: function (id) {
                return this.list() + "/" + id;
            }
        }
    }

}

function Fault() {
    /// <signature>
    /// <summary>错误信息</summary>
    /// <field name='FaultCode' type='Int32'>错误码间 N</field>
    /// <field name='FaultReason' type='String'>错误原因 N</field>
    /// <field name='Exception' type='ExceptionData'>异常信息 Y</field>
    /// <field name='Id' type='String'>在创建对象时服务器返回的唯一标示符 Y</field>
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

function VehiclePlateRecord() {
    /// <signature>
    /// <summary>车牌识别记录信息</summary>
    /// <field name='DeviceId' type='String'>设备唯一表示符	N</field>
    /// <field name='CreationTime' type='DateTime'>信息创建时间 N</field>
    /// <field name='AccessId' type='String'>接入设备唯一标识符	N</field>
    /// <field name='Name' type='String'>车辆名称 Y</field>
    /// <field name='Plate' type='String'>车牌 N</field>
    /// <field name='PlateColor' type='PlateColor'>车牌颜色	Y</field>
    /// <field name='VehicleColor' type='VehicleColor'>车辆颜色	Y</field>
    /// <field name='Brand' type='String'>车辆品牌 Y</field>
    /// <field name='ChildBrand' type='String'>车辆子品牌 Y</field>
    /// <field name='Credibility' type='Int32'>置信度，百分比 Y</field>
    /// <field name='Speed' type='Double'>车辆速度 Km/h	Y</field>
    /// <field name='PlatePosition' type='Rectangle'>车牌位置 Y</field>
    /// <field name='LaneId' type='String'>车道ID Y</field>
    /// <field name='Latitude' type='Double'>经度 Y</field>
    /// <field name='Longitude' type='Double'>维度 Y</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// <field name='ImageId' type='String[]'>图片唯一标识符 Y</field>
    /// </signature>

    this.DeviceId = "";
    this.CreationTime = new Date();
    this.AccessId = "";
    this.Name = "";
    this.Plate = "";
    this.PlateColor = PlateColor.None;
    this.VehicleColor = VehicleColor.None;
    this.Brand = "";
    this.ChildBrand = "";
    this.Credibility = 0;
    this.Speed = 0.0;
    this.PlatePosition = new Rectangle();
    this.LaneId = "";
    this.Latitude = 0.0;
    this.Longitude = 0.0;
    this.Description = "";
    this.ImageId = new Array();

    this.NameSpecified = false;
    this.PlateColorSpecified = false;
    this.VehicleColorSpecified = false;
    this.BrandSpecified = false;
    this.ChildBrandSpecified = false;
    this.CredibilitySpecified = false;
    this.SpeedSpecified = false;
    this.PlatePositionSpecified = false;
    this.LaneIdSpecified = false;
    this.LatitudeSpecified = false;
    this.LongitudeSpecified = false;
    this.DescriptionSpecified = false;
    this.ImageIdSpecified = false;
}

function VehiclePlateRecordList() {
    /// <signature>
    /// <summary>车牌识别记录信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='VehiclePlateRecord' type='VehiclePlateRecord[]'>车牌识别记录信息 Y</field>
    /// </signature>

    this.Page = new Page();
    this.VehiclePlateRecord = new Array();

    this.PageSpecified = false;
    this.VehiclePlateRecordSpecified = false;
}

function VehiclePlateDevice() {
    /// <signature>
    /// <summary>车牌识别设备信息</summary>
    /// <field name='Id' type='Id'>设备唯一标识符(用户指定)	N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间 N</field>
    /// <field name='Name' type='String'>设备名称 Y</field>
    /// <field name='Username' type='String'>用户名	Y</field>
    /// <field name='Password' type='String'>密码 Y</field>
    /// <field name='Model' type='String'>型号 Y</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// <field name='AccessId' type='String'>平台接入设备唯一标识符 N</field>
    /// <field name='VehiclePlateDeviceStatus' type='VehiclePlateDeviceStatus'>设备当前状态	Y</field>
    /// </signature>

    this.Id = "";
    this.CreationTime = new Date();
    this.Name = "";
    this.Username = "";
    this.Password = "";
    this.Model = "";
    this.Description = "";
    this.AccessId = "";
    this.VehiclePlateDeviceStatus = new VehiclePlateDeviceStatus();


    this.NameSpecified = false;
    this.UsernameSpecified = false;
    this.PasswordSpecified = false;
    this.ModelSpecified = false;
    this.DescriptionSpecified = false;
    this.VehiclePlateDeviceStatusSpecified = false;
}

function VehiclePlateDeviceList() {
    /// <signature>
    /// <summary>车牌识别设备信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='VehiclePlateDevice' type='VehiclePlateDevice[]'>设备信息 Y</field>
    /// </signature>

    this.Page = new Page();
    this.VehiclePlateDevice = new Array();

    this.PageSpecified = false;
    this.VehiclePlateDeviceSpecified = false;
}

function VehiclePlateDeviceStatus() {
    /// <signature>
    /// <summary>车牌识别设备状态</summary>
    /// <field name='Time' type='DateTime'>最后在线时间 N</field>
    /// <field name='IsOnline' type='Boolean'>是否在线 Y</field>
    /// <field name='Status' type='Int32'>设备状态（保留）Y</field>
    /// <field name='Latitude' type='Double'>纬度，(-90,90)正数N，负数S	Y</field>
    /// <field name='Longitude' type='Double'>经度，(-180,180)正数E,负数W Y</field>
    /// <field name='SystemUpTime' type='Int64'>系统在线时间，单位：秒 Y</field>
    /// <field name='Battery' type='Int32'>电池剩余容量百分比 Y</field>
    /// <field name='SignalIntensity' type='Int32'>信号强度百分比 Y</field>
    /// </signature>

    this.Time = new Date();
    this.IsOnline = false;
    this.Status = 0;
    this.Latitude = 0.0;
    this.Longitude = 0.0;
    this.SystemUpTime = 0;
    this.Battery = 0;
    this.SignalIntensity = 0;


    this.IsOnlineSpecified = false;
    this.StatusSpecified = false;
    this.LatitudeSpecified = false;
    this.LongitudeSpecified = false;
    this.SystemUpTimeSpecified = false;
    this.BatterySpecified = false;
    this.SignalIntensitySpecified = false;
}

function VehiclePlatePicture() {
    /// <signature>
    /// <summary>车牌识别图片信息</summary>
    /// <field name='Id' type='String'>图片唯一标识符 N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间	N</field>
    /// <field name='MD5String' type='String'>MD5码字符串 N</field>
    /// <field name='PictureType' type='PictureType'>图片类型 N</field>
    /// <field name='PictureSize' type='Size'>图片宽高 Y</field>
    /// <field name='PictureLength' type='Int32'>图片长度 Y</field>
    /// <field name='PictureFormat' type='PictureFormat'>图片格式 N</field>
    /// <field name='DeviceId' type='String'>车牌识别设备唯一标识符	Y</field>
    /// <field name='Data' type='String'>BASE64编码的图片数据 N</field>
    /// <field name='Description' type='String'>描述 Y</field>
    /// </signature>

    this.Id = "";
    this.CreationTime = new Date();
    this.MD5String = "";
    this.PictureType = PictureType.None;
    this.PictureSize = new Size();
    this.PictureLength = 0;
    this.PictureFormat = PictureFormat.Bmp;
    this.DeviceId = "";
    this.Data = "";
    this.Description = "";


    this.PictureSizeSpecified = false;
    this.PictureLengthSpecified = false;
    this.DeviceIdSpecified = false;
    this.DescriptionSpecified = false;
}

function Vehicle() {
    /// <signature>
    /// <summary>车辆信息</summary>
    /// <field name='Id' type='Id'>唯一标识符 N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间	N</field>
    /// <field name='Name' type='String'>车辆名称 Y</field>
    /// <field name='Plate' type='String'>车牌(唯一) N</field>
    /// <field name='PlateColor' type='PlateColor'>车牌颜色 Y</field>
    /// <field name='VehicleColor' type='VehicleColor'>车辆颜色	Y</field>
    /// <field name='Brand' type='String'>车辆品牌 Y</field>
    /// <field name='ChildBrand' type='String'>车辆子品牌 Y</field>
    /// <field name='ExistedInBlackList' type='Boolean'>是否为黑名单 N</field>
    /// <field name='MatchingPercentage' type='Int32'>匹配百分比，当写入黑名单的车辆匹配达到百分比后报警 N</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// </signature>

    this.Id = "";
    this.CreationTime = new Date();
    this.Name = "";
    this.Plate = "";
    this.PlateColor = PlateColor.None;
    this.VehicleColor = VehicleColor.None;
    this.Brand = "";
    this.ChildBrand = "";
    this.ExistedInBlackList = false;
    this.MatchingPercentage = 0;
    this.Description = "";


    this.NameSpecified = false;
    this.PlateColorSpecified = false;
    this.VehicleColorSpecified = false;
    this.BrandSpecified = false;
    this.ChildBrandSpecified = false;
    this.DescriptionSpecified = false;
}



function VehicleList() {
    /// <signature>
    /// <summary>车辆信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='Vehicle' type='Vehicle[]'>车辆信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.Vehicle = new Array();

    this.PageSpecified = false;
    this.VehicleSpecified = false;
}

function Rectangle() {
    /// <signature>
    /// <summary>矩形结构</summary>
    /// <field name='X' type='Int32'>左上角横坐标 N</field>
    /// <field name='Y' type='Int32'>左上角纵坐标 N</field>
    /// <field name='Width' type='Int32'>宽度 N</field>
    /// <field name='Height' type='Int32'>高度 N</field>
    /// </signature>

    this.X = 0;
    this.Y = 0;
    this.Width = 0;
    this.Height = 0;
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




function VehicleDetectionResult() {
    /// <signature>
    /// <summary>车辆识别结果</summary>
    /// <field name='Result' type='Int32'>检测结果 0-标识识别成功，其它为没有发现结果。	N</field>
    /// <field name='ExistedInDataBase' type='Boolean'>是否存在与匹配库中 Y</field>
    /// <field name='ExistedInBlackList' type='Boolean'>是否为黑名单 Y</field>
    /// <field name='Plate' type='String'>车牌 Y</field>
    /// <field name='Id' type='Id'>匹配库中的唯一标识符	Y</field>
    /// <field name='PlateColor' type='PlateColor'>车牌颜色	Y</field>
    /// <field name='VehicleColor' type='VehicleColor'>车辆颜色	Y</field>
    /// <field name='Brand' type='String'>车辆品牌 Y</field>
    /// <field name='ChildBrand' type='String'>车辆子品牌 Y</field>
    /// <field name='Description' type='String'>描述信息 Y</field>
    /// </signature>

    this.Result = 0;
    this.ExistedInDataBase = false;
    this.ExistedInBlackList = false;
    this.Plate = "";
    this.Id = "";
    this.PlateColor = PlateColor.None;
    this.VehicleColor = VehicleColor.None;
    this.Brand = "";
    this.ChildBrand = "";
    this.Description = "";


    this.ExistedInDataBaseSpecified = false;
    this.ExistedInBlackListSpecified = false;
    this.PlateSpecified = false;
    this.IdSpecified = false;
    this.PlateColorSpecified = false;
    this.VehicleColorSpecified = false;
    this.BrandSpecified = false;
    this.ChildBrandSpecified = false;
    this.DescriptionSpecified = false;
}

//注意：1. 所有枚举类型在序列化为JSON后以字符串形式出现.
//      2. Flags枚举类型在序列化为JSON后以字符串形式出现，如果有多项则以逗号(,)分割

//车牌颜色
var PlateColor = {
    //空
    None: "None",
    //蓝色
    Blue: "Blue",
    //白色
    White: "White",
    //黑色
    Black: "Black",
    //黄色
    Yellow: "Yellow"
}

//车辆颜色
var VehicleColor = {
    //空
    None: "None",
    //白色
    White: "White",
    //灰色
    Gray: "Gray",
    //黄色
    Yellow: "Yellow",
    //粉色
    Pink: "Pink",
    //红色
    Red: "Red",
    //紫色
    Purple: "Purple",
    //绿色
    Green: "Green",
    //蓝色
    Blue: "Blue",
    //棕色
    Brown: "Brown",
    //黑色
    Black: "Black",
    //其它颜色
    Other: "Other"
}

//图片类型
var PictureType = {
    //空
    None: "None",
    //全景图片
    Full: "Full",
    //局部图片
    Special: "Special"
}

//图片格式
var PictureFormat = {
    //BMP格式的位图
    Bmp: "Bmp",
    //Jpeg图片
    Jpeg: "Jpeg"
}






















