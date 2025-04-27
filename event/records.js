/// <reference path="../js/client/management.js" />
/// <reference path="../js/client/client.js" />
/// <reference path="../js/howell.js/howell.convert.js" />
/// <reference path="../js/background/event/background_records.js" />
/// <reference path="../js/jquery/select2.js" />
function createEventTypeEnum() {
    var NewEventType = new Object();
    NewEventType["All"] = "All";
    for (var key in EventType) {
        NewEventType[key] = EventType[key];
    }
    delete NewEventType["None"];
    return NewEventType;
}

function record_list_load() {
    var uri = new Uri(document.location);
    if (uri.Query && uri.Querys.Map) {
        var back = $(".to-back");
        back.css("display", "block");
        switch (uri.Querys.Map.toLowerCase()) {
            case "map":
                break;
            case "video":
                back.attr("href", "../real_time_monitoring.htm");
                var nav = $(".navbar")
                nav.height(0);
                nav.find(".main-nav").hide();
                $("body").css("padding-top", "74px");
                break;
        }        
    }
    var date = new Date();
    $('#txt_begin_date').val(date.format("yyyy-MM-dd"));
    $('#txt_begin_date').datepicker();

    $('#txt_end_date').val(date.format("yyyy-MM-dd"));
    $('#txt_end_date').datepicker();

    nowTemp = new Date();
    now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    //checkin = $("#txt_date").datepicker({
    //    onRender: function (date) {
    //        if (date.valueOf() < now.valueOf()) {
    //            return "disabled";
    //        } else {
    //            //return "";
    //        }
    //    }
    //}).on("changeDate", function (ev) {
    //    checkin.hide();
    //}).data("datepicker");

    $('.select2able').select2({ formatNoMatches: function () { return "请选择联动类型"; } });
    var eventType = createEventTypeEnum();
    DropDownList.Create("ddlEventType", ControlModel.EnumAndLanguage, eventType, Language.Display.EventType);
    //var tag = document.getElementById("addOperation");
    delete EventType["None"];
    Html.Control.GroupList.create();
    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
    Property.Device.load();
}

function popover_Click(sender, args) {
    stopPropagation();
    var uri = new Uri(sender.href);
    if (uri.Query && uri.Querys.RecordId)
        if (uri.Querys.key == "Info" || Property.Count.PictureId(Property.RecordList.value[uri.Querys.RecordId]) > 0 || args == "playback")
            AlertWindow.Show(sender, -1);
    return false;
}

function info_Click(sender, args) {
    var uri = new Uri(sender.href);
    if (is.PC()) {
        stopPropagation();
        if (uri.Query && uri.Querys.RecordId)
            AlertWindow.Show(sender, -1);
        return false;
    }

    var record = Property.RecordList.value[uri.Querys.RecordId];

    var list = Client.Management().Event.Linkage.List(record.ComponentId);

    if (list.EventLinkage && list.EventLinkage.length > 0) {
        if (list.EventLinkage[0] && list.EventLinkage[0].VideoPlaybackIdentifier && list.EventLinkage[0].VideoPlaybackIdentifier.length > 0) {
            if (list.EventLinkage[0].VideoPlaybackIdentifier[0]) {
                var id = list.EventLinkage[0].VideoPlaybackIdentifier[0].VideoInputChannelId;
                var no = list.EventLinkage[0].VideoPlaybackIdentifier[0].StreamNo;
                var date = Convert.ToDate(record.AlarmTime);
                date.setSeconds(date.getSeconds() + list.EventLinkage[0].VideoPlaybackIdentifier[0].BeginTime);
                var beg = date.toISOString();
                date.setSeconds(date.getSeconds() - list.EventLinkage[0].VideoPlaybackIdentifier[0].BeginTime + list.EventLinkage[0].VideoPlaybackIdentifier[0].EndTime);
                var end = date.toISOString();
                location = getHref(id, no, beg, end);
            }
        }
    }
}



function getHref(channelId, no, beg, end) {
    //var beg = datetime.toISOString();
    //datetime.setMinutes(datetime.getMinutes() + 3);
    //var end = datetime.toISOString();

    var id = new Id(channelId);
    var deviceId = id.getDeviceId();
    var no = parseInt(id.ModuleId.No);

    var example_url = "http://127.0.0.1:8800/hls/Media/vod/" + deviceId + "/" + no + "/2/" + beg + "_" + end + "/vod.m3u8?user=admin&password=12345";
    var uri = new Uri(example_url);
    uri.Host = Client.Host;
    uri.Port = Client.HlsPort;
    uri.Querys.user = getCookie("username");
    uri.Querys.password = getCookie("sid");

    return uri.toString();
}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Html.Control.GroupList.load(index + 1, Property.PageSize);
    });
}


function getNameByEventType(type) {
    var name = null;
    switch (type) {
        case EventType.IO:
            name = "IOInputChannel";
            break;
        case EventType.VMD:
        case EventType.Videoloss:
        case EventType.IRCut:
        case EventType.DayNight:
        case EventType.BadVideo:
        case EventType.VideoBitrate:
        case EventType.Squint:
        case EventType.VideoTurned:
        case EventType.Intrusion:
        case EventType.Tripwire:
        case EventType.Loitering:
        case EventType.Unattended:
        case EventType.Removal:
        case EventType.Retrograde:
        case EventType.MaximumConnections:
            name = "VideoInputChannel";
            break;
        case EventType.RecordState:
        case EventType.StorageMediumFailure:
        case EventType.RecordingFailure:
            name = "StorageMedium";
            break;
        case EventType.RAIDFailure:
            name = "RFIDAntenna";
            break;
        case EventType.NetworkBitrate:
            name = "NetworkInterface";
            break;
        case EventType.ATMSlot:
        case EventType.ATMKeyBoard:
        case EventType.ATMDamage:
            name = "ATMShield";
            break;
        case EventType.BackRoomNumberLimit:
        case EventType.BackRoomCrouched:
            name = "ATMAddNotes";
            break;
        default:
            break;
    }
    return name;
}

function addOption(obj, index) {

    id = obj.Id;
    name = obj.Name;

    var option = document.createElement("option");

    option.innerText = id;

    option = document.createElement("option");
    option.innerText = name;
    option.value = id;
    getTag("search_name").options[index] = option;
}

//事件类型选择事件
function selectEventType_Click(args) {

    if (args == EventType.None)
        args = null;

    var propertyName = getNameByEventType(args);
    var index = 0;
    Property.Device.value.forIn(function (deviceId) {
        var obj = null;
        if (!propertyName) {
            obj = Property.Device.value[deviceId]
        }
        else {
            obj = Property.Device.Channel.value(deviceId, propertyName, Info.DeviceProperty[propertyName]);
        }
        if (is.Array(obj)) {
            for (var i = 0; i < obj.length; i++) {
                addOption(obj[i], index);
                index++
            }
        }
        else {
            addOption(obj, index);
            index++
        }
    })
    return false;
};
function _search() {
    var strBeginTime = getTag("txt_begin_date").value;
    if (!strBeginTime)
        strBeginTime = "1970-01-01";

    var strEndTime = getTag("txt_end_date").value


    var arrTime = strBeginTime.split("-");

    var begin = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 0, 0, 0);
    var beginTime = begin.toISOString();

    var end;
    if (strEndTime) {
        arrTime = strEndTime.split("-");
        end = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 23, 59, 59);
    }
    else
        end = new Date();
    var endTime = end.toISOString();

    Html.Criteria.beginTime = beginTime;
    Html.Criteria.endTime = endTime;

    var eventType = getTag("ddlEventType").value;
    if (eventType == "All")
        eventType = null;
    Html.Criteria.eventType = eventType;

    Html.Control.GroupList.clear();


    data = $("#search_name").select2("data")

    if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            componentId = data[i].id;
            Html.Criteria.componentId = componentId;

            var old = Property.TotalCount.get();
            Html.Control.GroupList.load();
            Property.TotalCount.set(old + Property.TotalCount.get());
        }
        return;
    }
    Html.Criteria.componentId = null;
    Html.Control.GroupList.load(1, Property.PageSize);

}