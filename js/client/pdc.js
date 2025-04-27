///<var>(采样单位)</var>
var SampleUnit = {
    /// <field type='String'>分</field>
    Minute: "Minute",
    /// <field type='String'>时</field>
    Hour: "Hour",
    /// <field type='String'>日</field>
    Day: "Day",
    /// <field type='String'>月</field>
    Month: "Month",
}
///<var>(事件类型)</var>
var EventType = {
    /// <field type='String'>保留</field>
    None: "None",
    /// <field type='String'>设备上线</field>
    Online: "Online",
    /// <field type='String'>设备下线</field>
    Offline: "Offline",
    /// <field type='String'>人流总数超出阀值</field>
    DeviationNumber: "DeviationNumber",
    /// <field type='String'>最近N秒进入人数</field>
    LastNEnterNumber: "LastNEnterNumber",
    /// <field type='String'>最近N秒离开人数</field>
    LastNLeaveNumber: "LastNLeaveNumber"
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

function PDCDevice() {
    /// <signature>
    /// <summary>客流统计设备信息</summary>
    /// <field name='Id' type='Id'>唯一表示符 N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间 N</field>
    /// <field name='Name' type='String'>设备名称 N</field>
    /// <field name='Manufacturer' type='String'>厂商信息 Y</field>
    /// <field name='Model' type='String'>设备型号 Y</field>
    /// <field name='Firmware' type='String'>固件版本信息 Y</field>
    /// <field name='SerialNumber' type='String'>设备序列号 Y</field>
    /// <field name='PointOfSale' type='String'>零售商信息 Y</field>
    /// <field name='Information' type='String'>设备描述 Y</field>
    /// <field name='Username' type='String'>登录设备的用户名 Y</field>
    /// <field name='Password' type='String'>登录设备的密码 Y</field>
    /// <field name='Uri' type='String'>设备访问地址 N</field>
    /// <field name='ProtocolType' type='String'>协议类型 N</field>
    /// <field name='ParentDeviceId' type='String'>父设备唯一标识Id Y</field>
    /// <field name='AccessId' type='String'>平台接入设备唯一标识符，（用户设置，唯一）(只读) Y</field>
    /// <field name='TimeSynchronizing' type='Boolean'>是否启用时间同步 N</field>
    /// <field name='ResetTime' type='Timespan'>每日重置时间，默认00:00:00 N</field>
    /// <field name='StructuredAbilities' type='Int32'>是否支持人员信息结构化，按位参看支持那些结构化信息，0-表示不支持结构化功能。 N</field>
    /// <field name='LastNSeconds' type='Int32'>最近N秒的数值，用于统计进出人数流量，默认是：60 N</field>
    /// <field name='ExistedInDatabase' type='Boolean'>是否已存在与数据库中(只读)  Y</field>
    /// <field name='DeviceStatus' type='PDCDeviceStatus'>设备当前状态（只读）GET时有效 Y</field>
    /// <field name='Threshold' type='PDCThreshold'>报警阈值 Y</field>
    /// </signature>

    this.Id = "";
    this.CreationTime = new Date();
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
    this.ParentDeviceId = "";
    this.AccessId = "";
    this.TimeSynchronizing = false;
    this.ResetTime = "";
    this.StructuredAbilities = 0;
    this.LastNSeconds = 0;
    this.ExistedInDatabase = false;
    this.DeviceStatus = new PDCDeviceStatus();
    this.Threshold = new PDCThreshold();

    this.ManufacturerSpecified = false;
    this.ModelSpecified = false;
    this.FirmwareSpecified = false;
    this.SerialNumberSpecified = false;
    this.PointOfSaleSpecified = false;
    this.InformationSpecified = false;
    this.UsernameSpecified = false;
    this.PasswordSpecified = false;
    this.ParentDeviceIdSpecified = false;
    this.AccessIdSpecified = false;
    this.DeviceStatusSpecified = false;
    this.ThresholdSpecified = false;

}

function PDCDeviceList() {
    /// <signature>
    /// <summary>PDC设备信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='PDCDevice' type='PDCDevice[]'>PDC设备信息	Y</field>
    /// </signature>

    this.Page = new Page();
    this.PDCDevice = new Array();

    this.PageSpecified = false;
    this.PDCDeviceSpecified = false;
}

function PDCDeviceStatus() {
    /// <signature>
    /// <summary>PDC设备状态</summary>
    /// <field name='Id' type='Id'>设备注册Id，由数据服务器分配	N</field>
    /// <field name='IsOnline' type='Boolean'>是否在线 N</field>
    /// <field name='LastUpdateTime' type='DateTime'>最后更新时间 N</field>
    /// <field name='LeaveNumber' type='Int32'>重置后的总离开人数 N</field>
    /// <field name='EnterNumber' type='Int32'>重置后的总进入人数 N</field>
    /// <field name='DeviationNumber' type='Int32'>进出人数差值	N</field>
    /// <field name='PassingNumber' type='Int32'>经过人数（进入区域后徘徊没有触发进入、离开的人数） Y</field>
    /// <field name='LastResetTime' type='DateTime'>最后重置时间 Y</field>
    /// <field name='LastNLeaveNumber' type='Int32'>最近N秒内离开的人数	Y</field>
    /// <field name='LastNEnterNumber' type='Int32'>最近N秒内进入的人数	Y</field>
    /// </signature>

    this.Id = "";
    this.IsOnline = false;
    this.LastUpdateTime = new Date();
    this.LeaveNumber = 0;
    this.EnterNumber = 0;
    this.DeviationNumber = 0;
    this.PassingNumber = 0;
    this.LastResetTime = new Date();
    this.LastNLeaveNumber = 0;
    this.LastNEnterNumber = 0;

    this.PassingNumberSpecified = false;
    this.LastResetTimeSpecified = false;
    this.LastNLeaveNumberSpecified = false;
    this.LastNEnterNumberSpecified = false;
}

function PDCDeviceGroup() {
    /// <signature>
    /// <summary>PDC设备分组</summary>
    /// <field name='Id' type='Id'>设备注册Id，由数据服务器分配	N</field>
    /// <field name='CreationTime' type='DateTime'>创建时间	N</field>
    /// <field name='Name' type='String'>设备名称 N</field>
    /// <field name='ResetTime' type='Timespan'>每日重置时间，默认00:00:00	N</field>
    /// <field name='IconType' type='Int32'>分组标签类型 Y</field>
    /// <field name='Information' type='String'>描述 Y</field>
    /// <field name='LastNSeconds' type='Int32'>最近N秒的数值，用于统计进出人数流量，默认是：60	N</field>
    /// <field name='PDCDevice' type='PDCDevice[]'>分组下包含的PDC设备信息（只读）GET时有效	Y</field>
    /// <field name='GroupStatus' type='PDCDeviceGroupStatus'>分组状态	Y</field>
    /// <field name='Threshold' type='PDCThreshold'>报警阈值 Y</field>
    /// </signature>

    this.Id = "";
    this.CreationTime = new Date();
    this.Name = "";
    this.ResetTime = "";
    this.IconType = 0;
    this.Information = "";
    this.LastNSeconds = 0;
    this.PDCDevice = new Array();
    this.GroupStatus = new PDCDeviceGroupStatus();
    this.Threshold = new PDCThreshold();

    this.IconTypeSpecified = false;
    this.InformationSpecified = false;
    this.PDCDeviceSpecified = false;
    this.GroupStatusSpecified = false;
    this.ThresholdSpecified = false;
}

function PDCDeviceGroupStatus() {
    /// <signature>
    /// <summary>PDC设备分组状态</summary>
    /// <field name='Id' type='Id'>设备注册Id，由数据服务器分配	N</field>
    /// <field name='LastUpdateTime' type='DateTime'>最后更新时间 N</field>
    /// <field name='LeaveNumber' type='Int32'>重置后的总离开人数 N</field>
    /// <field name='EnterNumber' type='Int32'>重置后的总进入人数 N</field>
    /// <field name='DeviationNumber' type='Int32'>进出人数差值	N</field>
    /// <field name='PassingNumber' type='Int32'>经过人数，（进入区域后徘徊没有触发进入、离开的人数）Y</field>
    /// <field name='LastResetTime' type='DateTime'>最后重置时间 Y</field>
    /// <field name='LastNLeaveNumber' type='Int32'>最近N秒内离开的人数	Y</field>
    /// <field name='LastNEnterNumber' type='Int32'>最近N秒内进入的人数	Y</field>
    /// </signature>

    this.Id = "";
    this.LastUpdateTime = new Date();
    this.LeaveNumber = 0;
    this.EnterNumber = 0;
    this.DeviationNumber = 0;
    this.PassingNumber = 0;
    this.LastResetTime = new Date();
    this.LastNLeaveNumber = 0;
    this.LastNEnterNumber = 0;

    this.PassingNumberSpecified = false;
    this.LastResetTimeSpecified = false;
    this.LastNLeaveNumberSpecified = false;
    this.LastNEnterNumberSpecified = false;
}

function PDCDeviceGroupList() {
    /// <signature>
    /// <summary>PDC设备分组列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='PDCDeviceGroup' type='PDCDeviceGroup[]'>PDC设备分组信息 Y</field>
    /// </signature>

    this.Page = new Page();
    this.PDCDeviceGroup = new Array();

    this.PageSpecified = false;
    this.PDCDeviceGroupSpecified = false;
}

function Threshold() {
    /// <signature>
    /// <summary>阈值</summary>
    /// <field name='Max' type='Int32'>上限	Y</field>
    /// <field name='Min' type='Int32'>下限	Y</field>
    /// </signature>

    this.Max = 0;
    this.Min = 0;

    this.MaxSpecified = false;
    this.MinSpecified = false;
}

function PeriodThreshold() {
    /// <signature>
    /// <summary>单位时间内的阈值</summary>
    /// <field name='Period' type='Int32'>时间长度，单位：秒 N</field>
    /// <field name='Max' type='Int32'>上限	Y</field>
    /// <field name='Min' type='Int32'>下限	Y</field>
    /// </signature>

    this.Period = 0;
    this.Max = 0;
    this.Min = 0;

    this.MaxSpecified = false;
    this.MinSpecified = false;
}

function PDCThreshold() {
    /// <signature>
    /// <summary>PDC阈值</summary>
    /// <field name='Enabled' type='Boolean'>是否启用 N</field>
    /// <field name='DeviationNumber' type='Threshold'>进出人数差值阈值	Y</field>
    /// <field name='LastNLeaveNumber' type='Threshold'>最近N秒内离开的人数	Y</field>
    /// <field name='LastNEnterNumber' type='Threshold'>最近N秒内进入的人数	Y</field>
    /// </signature>

    this.Enabled = false;
    this.DeviationNumber = new Threshold();
    this.LastNLeaveNumber = new Threshold();
    this.LastNEnterNumber = new Threshold();;

    this.DeviationNumberSpecified = false;
    this.LastNLeaveNumberSpecified = false;
    this.LastNEnterNumberSpecified = false;
}




function PDCFlavour() {
    /// <signature>
    /// <summary>喜好信息</summary>
    /// <field name='Id' type='String'>唯一标识符 N</field>
    /// <field name='Name' type='String'>名称 N</field>
    /// <field name='Layout' type='PDCFlavourLayout'>布局 Y</field>
    /// </signature>

    this.Id = "";
    this.Name = "";
    this.Layout = new PDCFlavourLayout();

    this.LayoutSpecified = false;
}

function PDCFlavourLayout() {
    /// <signature>
    /// <summary>喜好信息</summary>
    /// <field name='RowCount' type='Int32'>行数量	Y</field>
    /// <field name='ColumnCount' type='Int32'>列数量 Y</field>
    /// <field name='Item' type='PDCFlavourLayoutItem[]'>布局子项 Y</field>
    /// </signature>

    this.RowCount = 0;
    this.ColumnCount = 0;
    this.Item = Array();

    this.RowCountSpecified = false;
    this.ColumnCountSpecified = false;
    this.ItemSpecified = false;
}

function PDCFlavourLayoutItem() {
    /// <signature>
    /// <summary>喜好排列项</summary>
    /// <field name='Id' type='String'>子项唯一标识符，可以是PDCDevice的Id，也可以是PDCDeviceGroup的Id	N</field>
    /// <field name='Row' type='Int32'>行索引[0,n]	N</field>
    /// <field name='Column' type='Int32'>列索引[0,n] N</field>
    /// <field name='RowSpan' type='Int32'>合并行数量 Y</field>
    /// <field name='ColumnSpan' type='Int32'>合并列数量 Y</field>
    /// <field name='Classification' type='Int32'>子项类型 1-LeaveNumber 2-EnterNumber 3-DeviationNumber…	N</field>
    /// <field name='Size' type='Int32'>子项大小 Y</field>
    /// </signature>

    this.Id = "";
    this.Row = 0;
    this.Column = 0;
    this.RowSpan = 0;
    this.ColumnSpan = 0;
    this.Classification = 0;
    this.Size = 0;

    this.RowSpanSpecified = false;
    this.ColumnSpanSpecified = false;
    this.SizeSpecified = false;
}

function PDCFlavourItem() {
    /// <signature>
    /// <summary>喜好排列项</summary>
    /// <field name='Id' type='String'>子项唯一标识符，可以是PDCDevice的Id，也可以是PDCDeviceGroup的Id	N</field>
    /// <field name='Index' type='Int32'>顺序索引[0,n] N</field>
    /// <field name='Classification' type='Int32'>子项类型 31-PDCDevice 32-PDCDeviceGroup N</field>
    /// <field name='Size' type='Int32'>子项大小 Y</field>
    /// </signature>

    this.Id = "";
    this.Index = 0;
    this.Classification = 0;
    this.Size = new Array();

    this.SizeSpecified = false;
}

function PDCFlavourList() {
    /// <signature>
    /// <summary>PDC喜好信息列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='PDCFlavour' type='PDCFlavour[]'>PDC喜欢信息 Y</field>
    /// </signature>

    this.Page = new Page();
    this.PDCFlavour = new Array();

    this.PageSpecified = false;
    this.PDCFlavourSpecified = false;
}

function PDCSample() {
    /// <signature>
    /// <summary>客流统计信息样本</summary>
    /// <field name='LeaveNumber' type='Int32'>采样间隔内离开人数 N</field>
    /// <field name='EnterNumber' type='Int32'>采样间隔内进入人数 N</field>
    /// <field name='DeviationNumber' type='Int32'>采样间隔内进出人数差值 N</field>
    /// <field name='PassingNumber' type='Int32'>经过人数，（进入区域后徘徊没有触发进入、离开的人数） Y</field>
    /// <field name='BeginTime' type='DateTime'>样本开始时间 N</field>
    /// <field name='EndTime' type='DateTime'>样本结束时间 N</field>
    /// </signature>

    this.LeaveNumber = 0;
    this.EnterNumber = 0;
    this.DeviationNumber = 0;
    this.PassingNumber = 0;
    this.BeginTime = 0;
    this.EndTime = 0;

    this.PassingNumberSpecified = false;
}

function PDCSampleList() {
    /// <signature>
    /// <summary>客流统计信息样本列表</summary>
    /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
    /// <field name='PDCSample' type='PDCSample[]'>客流统计信息样本	Y</field>
    /// </signature>

    this.Page = new Page();
    this.PDCSample = new Array();

    this.PageSpecified = false;
    this.PDCSampleSpecified = false;
}

function EventRecord() {
    /// <signature>
    /// <summary>事件记录</summary>
    /// <field name='Id' type='String'>事件唯一标识符（设备产生的） N</field>
    /// <field name='ComponentId' type='Id'>报警单元模块唯一标识符 N</field>
    /// <field name='Name' type='String'>报警单元模块名称或描述信息 N</field>
    /// <field name='EventType' type='EventType'>事件类型 N</field>
    /// <field name='AlarmTime' type='DateTime'>报警/触发时间 N</field>
    /// <field name='Severity' type='Int32'>重要级
    /* 0x00: None
    0x01: Information
    0x10: Warning
    0x40: Emergency
     N</field>*/
    /// <field name='DisalarmTime' type='DateTime'>报警撤销时间 Y</field>
    /// <field name='ProcessTime' type='DateTime'>处理时间 Y</field>
    /// <field name='ProcessDescription' type='String'>处理描述信息 Y</field>
    /// <field name='Description' type='String'>描述信息  Y</field>
    /// <field name='ObjectType' type='ObjectType'>目标对象类型 Y</field>
    /// <field name='TriggerValue' type='Double'>触发事件时的数值 Y</field>
    /// </signature>
    this.Id = "";
    this.ComponentId = "";
    this.Name = "";
    this.EventType = EventType.None;
    this.AlarmTime = new Date();
    this.Severity = 0;
    this.DisalarmTime = new Date();
    this.ProcessTime = new Date();
    this.ProcessDescription = "";
    this.Description = "";
    ///问题///
    this.ObjectType = new ObjectType();
    this.TriggerValue = 0.0;

    this.DisalarmTimeSpecified = false;
    this.ProcessTimeSpecified = false;
    this.ProcessDescriptionSpecified = false;
    this.DescriptionSpecified = false;
    this.ObjectTypeSpecified = false;
    this.TriggerValueSpecified = false;
}

function EventRecordList() {
    /// <signature>
    /// <summary>事件记录列表</summary>
    /// <field name='Page' type='Page'>分页信息 Y</field>
    /// <field name='EventRecord' type='EventRecord[]'>事件记录 Y</field>
    /// </signature>
    this.Page = new Page();
    this.EventRecord = new Array();

    this.PageSpecified = false;
    this.EventRecordSpecified = false;

}

function PDCUser() {
    /// <signature>
    /// <summary>客流权限用户</summary>
    /// <field name='Id' type='String'>事件唯一标识符（设备产生的） N</field>
    /// <field name='Username' type='String'>用户名 N</field>
    /// <field name='Priorities' type='Int32'>用户权限，默认：0 N</field>
    /// </signature>
    this.Id = "";
    this.Username = "";
    this.Priorities = 0;
}

function PDCUserList() {
    /// <signature>
    /// <summary>客流权限用户列表</summary>
    /// <field name='Page' type='Page'>分页信息 Y</field>
    /// <field name='PDCUser' type='PDCUser[]'>用户列表 Y</field>
    /// </signature>
    this.Page = new Page();
    this.PDCUser = new Array();
    this.PageSpecified = false;
    this.PDCUserSpecified = false;
}

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

function PDCClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/pdc_service";
    var base = new BaseClient();

    this.getVersion = function () {
        var result = base.Get(contract.version);
        return Convert(result, new ServiceVersion());
    }

    this.Device = {
        List: function (deviceId, pageIndex, pageSize) {
            /// <signature>
            /// <summary>查询PDC设备信息</summary>
            /// <param name="deviceId" type="String" >查询的设备Id列表，各Id之间使用逗号分隔</param>  
            /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
            /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
            /// <returns type="PDCDeviceList">PDC设备信息列表</returns> 
            /// </signature>
            var result = base.Get(contract.device.list(), getParams(this.List));
            return Convert(result, new PDCDeviceList());
        },
        Create: function (device) {
            /// <signature>
            /// <summary>创建PDC设备信息</summary>
            /// <param name="device" type="PDCDevice" >PDC设备信息</param>              
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Post(contract.device.list(), device);
        },
        Get: function (deviceId) {
            /// <signature>
            /// <summary>获取PDC设备信息</summary>
            /// <param name="deviceId" type="String">设备编号</param>
            /// <returns type="PDCDevice">PDC设备信息</returns> 
            /// </signature>
            var result = base.Get(contract.device.item(deviceId));
            return Convert(result, new PDCDevice())
        },
        Set: function (device) {
            /// <signature>
            /// <summary>修改PDC设备信息</summary>
            /// <param name="device" type="PDCDevice" >PDC设备信息</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Put(contract.device.item(device.Id), device);
        },
        Delete: function (deviceId) {
            /// <signature>
            /// <summary>删除PDC设备信息</summary>
            /// <param name="deviceId" type="String">设备编号</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Delete(contract.device.item(deviceId));
        },
        Status: {
            Get: function (deviceId) {
                /// <signature>
                /// <summary>获取PDC设备状态</summary>
                /// <param name="deviceId" type="String">设备编号</param>
                /// <returns type="PDCDeviceStatus">PDC设备状态</returns> 
                /// </signature>
                var result = base.Get(contract.device.status(deviceId));
                return Convert(result, new PDCDeviceStatus());
            },
            Reset: function (deviceId) {
                /// <signature>
                /// <summary>手动重置PDC状态</summary>
                /// <param name="deviceId" type="String">设备编号</param>
                /// <returns>操作结果</returns> 
                /// </signature>
                return base.Post(contract.device.status(deviceId));
            }
        },
        Samples: {
            Get: function (deviceId, sampleUnit, beginTime, endTime, pageIndex, pageSize) {
                /// <signature>
                /// <summary>查询设备采样信息</summary>
                /// <param name='deviceId' type='String'>设备编号</param>
                /// <param name="sampleUnit" type="String">采样单位：Minute-分,Hour-时,Day-日,Month-月</param>  
                /// <param name='beginTime' type='DateTime'>开始时间</param>                
                /// <param name='endTime' type='DateTime'>结束时间</param>
                /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
                /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
                /// <returns type="PDCSampleList">客流统计信息样本列表</returns> 
                /// </signature>

                var result = base.Get(contract.device.samples(deviceId), getParams(this.Get, 1));
                var newResult = Convert(result, new PDCSampleList());
                if (newResult && newResult.PDCSample) {
                    newResult.PDCSample.sortBy("BeginTime");
                }
                return newResult;
            }
        },
        Threshold: {
            Get: function (deviceId) {
                /// <signature>
                /// <summary>获取PDC设备报警阈值</summary>
                /// <param name="deviceId" type="String" >设备编号</param>  
                /// <returns type="PDCThreshold">PDC阈值</returns> 
                /// </signature>
                var result = base.Get(contract.device.threshold(deviceId));
                return Convert(result, new PDCThreshold());
            },
            Set: function (deviceId, threshold) {
                /// <signature>
                /// <summary>修改PDC设备报警阈值</summary>
                /// <param name="deviceId" type="String">设备编号</param>  
                /// <param name='threshold' type='PDCThreshold '>PDC阈值</param>
                /// <returns>操作结果</returns> 
                /// </signature>
                return base.Post(contract.device.threshold(deviceId), threshold);
            }
        },
        Searching: {
            Start: function (id, protocolType, timeout) {
                return base.Post(contract.device.search(id), null, getParams(this.Start, 1));
            },
            Stop: function (id) {
                return base.Delete(contract.device.search(id));
            },
            Get: function (id) {
                var result = base.Get(contract.device.search(id));
                return Convert(result, new PDCDevice());
            },
            Set: function (id, physicalAddress, iPAddress, submask, gateway, port) {
                var result = base.Put(contract.device.search(id), nul, getParams(this.Set, 1));
            }
        }
    }

    this.Group = {
        List: function (groupId, pageIndex, pageSize) {
            /// <signature>
            /// <summary>查询PDC设备分组信息</summary>
            /// <param name="groupId" type="String" >查询的设备分组Id列表，各Id之间使用逗号分隔</param>  
            /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
            /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
            /// <returns type="PDCDeviceGroupList">PDC设备分组列表</returns> 
            /// </signature>
            var result = base.Get(contract.group.list(), getParams(this.List));
            return Convert(result, new PDCDeviceGroupList());
        },
        Create: function (deviceGroup) {
            /// <signature>
            /// <summary>创建PDC设备分组信息</summary>
            /// <param name="deviceGroup" type="PDCDeviceGroup" >PDC设备分组信息</param>              
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Post(contract.group.list(), deviceGroup);
        },
        Get: function (groupId) {
            /// <signature>
            /// <summary>获取PDC设备分组信息</summary>
            /// <param name="groupId" type="String">设备分组编号</param>
            /// <returns type="PDCDeviceGroup">PDC设备分组</returns> 
            /// </signature>
            var result = base.Get(contract.group.item(groupId));
            return Convert(result, new PDCDeviceGroup())
        },
        Set: function (deviceGroup) {
            /// <signature>
            /// <summary>修改PDC设备分组信息</summary>
            /// <param name="deviceGroup" type="PDCDeviceGroup" >PDC设备分组信息</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Put(contract.group.item(deviceGroup.Id), deviceGroup);
        },
        Delete: function (groupId) {
            /// <signature>
            /// <summary>删除PDC设备分组信息</summary>
            /// <param name="groupId" type="String">设备分组编号</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Delete(contract.group.item(groupId));
        },
        Status: {
            Get: function (groupId) {
                /// <signature>
                /// <summary>获取PDC设备分组状态</summary>
                /// <param name="groupId" type="String">设备分组编号</param>
                /// <returns type="PDCDeviceGroupStatus">PDC设备分组状态</returns> 
                /// </signature>
                var result = base.Get(contract.group.status(groupId));
                return Convert(result, new PDCDeviceGroupStatus());
            },
            Reset: function (groupId) {
                /// <signature>
                /// <summary>手动重置PDC分组状态</summary>
                /// <param name="groupId" type="String">设备分组编号</param>
                /// <returns>操作结果</returns> 
                /// </signature>
                return base.Post(contract.group.status(groupId));
            }
        },
        Device: {
            List: function (groupId, pageIndex, pageSize, inversed) {
                /// <signature>
                /// <summary>获取PDC设备分组下的设备信息</summary>
                /// <param name="groupId" type="String" >设备分组编号</param>  
                /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
                /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
                /// <param name='inversed' type='Boolean'>是否使用反向集合数据</param>
                /// <returns type="PDCDeviceList">PDC设备列表</returns> 
                /// </signature>
                var result = base.Get(contract.group.device.list(groupId), getParams(this.List, 1));
                return Convert(result, new PDCDeviceList());
            },
            Create: function (groupId, deviceId) {
                /// <signature>
                /// <summary>创建PDC设备分组信息下的设备</summary>
                /// <param name="groupId" type="String" >PDC设备分组编号</param>
                /// <param name="deviceId" type="String" >PDC设备编号</param>  
                /// <returns>操作结果</returns> 
                /// </signature>
                return base.Post(contract.group.device.item(groupId, deviceId));
            },
            Get: function (groupId, deviceId) {
                /// <signature>
                /// <summary>获取PDC设备分组信息下的设备</summary>
                /// <param name="groupId" type="String">设备分组编号</param>
                /// <param name="deviceId" type="String">设备编号</param>
                /// <returns type="PDCDevice">PDC设备信息</returns> 
                /// </signature>
                var result = base.Get(contract.group.device.item(groupId, deviceId));
                return Convert(result, new PDCDevice())
            },
            Delete: function (groupId, deviceId) {
                /// <signature>
                /// <summary>删除PDC设备分组信息下的设备</summary>
                /// <param name="groupId" type="String">设备分组编号</param>
                /// <param name="deviceId" type="String">设备编号</param>
                /// <returns>操作结果</returns> 
                /// </signature>
                return base.Delete(contract.group.device.item(groupId, deviceId));
            }
        },
        Samples: {
            Get: function (groupId, sampleUnit, beginTime, endTime) {
                /// <signature>
                /// <summary>查询设备分组采样信息</summary>
                /// <param name='groupId' type='String'>设备分组编号</param>
                /// <param name="sampleUnit" type="String">采样单位：Minute-分,Hour-时,Day-日,Month-月</param>  
                /// <param name='beginTime' type='DateTime'>开始时间</param>                
                /// <param name='endTime' type='DateTime'>结束时间</param>
                /// <returns type="PDCSampleList">客流统计信息样本列表</returns> 
                /// </signature>

                var result = base.Get(contract.group.samples(groupId), getParams(this.Get, 1));
                var newResult = Convert(result, new PDCSampleList());
                if (newResult && newResult.PDCSample) {
                    newResult.PDCSample.sortBy("BeginTime");
                }
                return newResult;
            }
        },
        Threshold: {
            Get: function (groupId) {
                /// <signature>
                /// <summary>获取PDC设备分组报警阈值</summary>
                /// <param name="groupId" type="String" >设备分组编号</param>  
                /// <returns type="PDCThreshold">PDC阈值</returns> 
                /// </signature>
                var result = base.Get(contract.group.threshold(groupId));
                return Convert(result, new PDCThreshold());
            },
            Set: function (groupId, threshold) {
                /// <signature>
                /// <summary>修改PDC设备分组报警阈值</summary>
                /// <param name="groupId" type="String">设备分组编号</param>  
                /// <param name='threshold' type='PDCThreshold '>PDC阈值</param>
                /// <returns>操作结果</returns> 
                /// </signature>
                return base.Post(contract.group.threshold(groupId), threshold);
            }
        }
    }

    this.Flavour = {
        List: function (pageIndex, pageSize) {
            /// <signature>
            /// <summary>查询用户喜好信息列表</summary>
            /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
            /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
            /// <returns type="PDCFlavourList">PDC喜好信息列表</returns> 
            /// </signature>
            var result = base.Get(contract.flavour.list(), getParams(this.List));
            return Convert(result, new PDCFlavourList());
        },
        Create: function (flavour) {
            /// <signature>
            /// <summary>创建用户喜好信息列表</summary>
            /// <param name="flavour" type="PDCFlavour">喜好信息</param>              
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Post(contract.flavour.list(), flavour);
        },
        Get: function (flavourId) {
            /// <signature>
            /// <summary>获取用户喜好信息</summary>
            /// <param name="flavourId" type="String">喜好信息编号</param>
            /// <returns type="PDCFlavour">用户喜好信息</returns>
            /// </signature>
            var result = base.Get(contract.flavour.item(flavourId));
            return Convert(result, new PDCFlavour())
        },
        Set: function (flavour) {
            /// <signature>
            /// <summary>修改用户喜好信息</summary>
            /// <param name="flavour" type="PDCFlavour" >喜好信息</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Put(contract.flavour.item(flavour.Id), flavour);
        },
        Delete: function (flavourId) {
            /// <signature>
            /// <summary>删除用户喜好信息</summary>
            /// <param name="flavourId" type="String">喜好信息编号</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Delete(contract.flavour.item(flavourId));
        }
    }

    this.Event = {
        Records: function (beginTime, endTime, componentId, eventType, pageIndex, pageSize) {
            /// <signature>
            /// <summary>查询系统内的事件记录</summary>
            /// <param name="beginTime" type="DateTime" >开始时间</param>  
            /// <param name='endTime' type='DateTime'>结束时间</param>
            /// <param name='componentId' type='String'>设备单元唯一标识符</param>
            /// <param name="eventType" type="EventType" >事件类型</param>  
            /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
            /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
            /// <returns type="EventRecordList">事件记录列表</returns> 
            /// </signature>
            var result = base.Get(contract.event.records(), getParams(this.Records));
            return Convert(result, new EventRecordList());
        }
    }

    this.User = {
        List: function (pageIndex, pageSize) {
            /// <signature>
            /// <summary>查询PDC用户权限信息</summary>
            /// <param name='pageIndex' type='Int32'>页码[1-n]</param>
            /// <param name='pageSize' type='Int32'>分页大小[1-100]</param>
            /// <returns type="PDCUserList">客流权限用户列表</returns> 
            /// </signature>
            var result = base.Get(contract.users.list(), getParams(this.List));
            return Convert(result, new PDCUserList());
        },
        Create: function (user) {
            /// <signature>
            /// <summary>创建PDC用户权限信息</summary>
            /// <param name="user" type="PDCUser">客流权限用户</param>              
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Post(contract.users.list(), user);
        },
        Get: function (userId) {
            /// <signature>
            /// <summary>获取PDC权限用户</summary>
            /// <param name="userId" type="String">用户编号</param>
            /// <returns type="PDCUser">客流权限用户</returns>
            /// </signature>
            var result = base.Get(contract.users.item(userId));
            return Convert(result, new PDCUser());
        },
        Set: function (user) {
            /// <signature>
            /// <summary>修改PDC权限用户</summary>
            /// <param name="user" type="PDCUser" >客流权限用户</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Put(contract.users.item(user.Id), user);
        },
        Delete: function (userId) {
            /// <signature>
            /// <summary>删除PDC权限用户</summary>
            /// <param name="userId" type="String">PDC权限用户编号</param>
            /// <returns>操作结果</returns> 
            /// </signature>
            return base.Delete(contract.users.item(userId));
        }
    }

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
            status: function (id) {
                return this.list() + "/" + id + "/Status";
            },
            samples: function (id) {
                return this.list() + "/" + id + "/Samples";
            },
            threshold: function (id) {
                return this.list() + "/" + id + "/Threshold";
            },
            search: function (id) {
                return this.list() + "/Searching/" + id;
            },
        },
        group: {
            list: function () {
                return baseUri + "/System/Groups";
            },
            item: function (id) {
                return this.list() + "/" + id;
            },
            status: function (id) {
                return this.list() + "/" + id + "/Status";
            },
            device: {
                list: function (id) {
                    return contract.group.list() + "/" + id + "/Devices";
                },
                item: function (groupId, deviceId) {
                    return this.list(groupId) + "/" + deviceId;
                }
            },
            samples: function (id) {
                return this.list() + "/" + id + "/Samples";
            },
            threshold: function (id) {
                return this.list() + "/" + id + "/Threshold";
            }
        },
        flavour: {
            list: function () {
                return baseUri + "/System/Flavours";
            },
            item: function (id) {
                return this.list() + "/" + id;
            }
        },
        event: {
            records: function () {
                return baseUri + "/System/Events/Records";
            }
        },
        users: {
            list: function () {
                return baseUri + "System/Users";
            },
            item: function (id) {
                return this.list() + "/" + id;
            }
        }
    }
}