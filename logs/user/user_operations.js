/// <reference path="../js/client/management.js" />
/// <reference path="../js/client/client.js" />
/// <reference path="../js/howell.js/howell.convert.js" />
/// <reference path="../js/background/event/background_records.js" />
/// <reference path="../js/jquery/select2.js" />
function createEnum() {
    var newEnum = new Object();
    newEnum["All"] = "All";
    for (var key in UserOperationType) {
        newEnum[key] = UserOperationType[key];
    }
    return newEnum;
}

function logs_user_operations_load() {
    delete UserOperationType["None"];
    delete Language.Display.UserOperationType["None"];

    var userOperationType = createEnum();
    DropDownList.Create("dllSearchUserOperationType", ControlModel.Language, userOperationType, Language.Display.UserOperationType);

    document.title = "用户操作日志";
    var date = new Date();
    $('#txt_begin_date').val(date.format("yyyy-MM-dd"));
    $('#txt_begin_date').datepicker();

    $('#txt_end_date').val(date.format("yyyy-MM-dd"));
    $('#txt_end_date').datepicker();

    $('.select2able').select2({ formatNoMatches: function () { return "无"; } });
    Logs_User_Operations_Property.UserList.load();
    Logs_User_Operations_Html.Control.GroupList.create();
    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
    $('.select2-choices').css('cssText', 'max-height:65px !important;overflow-y:auto');
}

//function vehicle_device_record_list_popover_Click(sender, args) {
//    stopPropagation();
//    var uri = new Uri(sender.href);
//    if (uri.Query && uri.Querys.RecordId)
//        if (Logs_User_Operations_Property.Count.ImageId(Logs_User_Operations_Property.OperationList.value[uri.Querys.RecordId]) > 0)
//            AlertWindow.Show(sender, -1);
//    return false;
//}

function user_operations_info_Click(sender, args) {
    var uri = new Uri(sender.href);
    stopPropagation();
    if (uri.Query && uri.Querys.OperationId)
        AlertWindow.Show(sender, -1);
    return false;
}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Logs_User_Operations_Html.Control.GroupList.load(index + 1, Logs_User_Operations_Property.PageSize);
    });
}

function user_operations_search() {
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

    Logs_User_Operations_Html.Criteria.beginTime = beginTime;
    Logs_User_Operations_Html.Criteria.endTime = endTime;

    Logs_User_Operations_Html.Criteria.userOperationType = getTag("dllSearchUserOperationType").value == "All" ? null : getTag("dllSearchUserOperationType").value;
    data = $("#txtSearchUserId").select2("data");
    var ids = "";
    if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (i > 0)
                ids = ids + ',';
            ids = ids + data[i].id;
        }
    }
    Logs_User_Operations_Html.Criteria.userId = ids ? ids : null;
    //if (Logs_User_Operations_Html.MoreSearch)
    //    btnMoreSearchClick();
    Logs_User_Operations_Html.Control.GroupList.clear();
    Logs_User_Operations_Html.Control.GroupList.load(1, Logs_User_Operations_Property.PageSize);

}

function btnMoreSearchClick() {
    var div = $("#divMoreSearch");
    var span = document.getElementById("spanBtnMoreSearch");
    var i = document.getElementById("iBtnMoreSearch");
    if (Logs_User_Operations_Html.MoreSearch) {
        Logs_User_Operations_Html.MoreSearch = false;
        i.className = "icon-double-angle-down"
        span.innerText = "更多";
        div.slideUp(500);
        return;
    }
    Logs_User_Operations_Html.MoreSearch = true;
    i.className = "icon-double-angle-up";
    span.innerText = "收起";
    div.slideDown(500);
}

function addOption(obj, index) {

    id = obj.Id;
    name = obj.Username;

    //var option = document.createElement("option");

    //option.innerText = id;

    var option = document.createElement("option");
    option.innerText = name;
    option.value = id;
    getTag("txtSearchUserId").options[index] = option;
}

function selectSearchUserOperationType(sender) {
    Logs_User_Operations_Html.Criteria.userOperationType = sender.value;
}