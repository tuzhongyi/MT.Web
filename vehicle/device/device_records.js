/// <reference path="../js/client/management.js" />
/// <reference path="../js/client/client.js" />
/// <reference path="../js/howell.js/howell.convert.js" />
/// <reference path="../js/background/event/background_records.js" />
/// <reference path="../js/jquery/select2.js" />

function vehicle_device_record_list_load() {
    document.title = "车牌识别历史记录";
    var date = new Date();
    $('#txt_begin_date').val(date.format("yyyy-MM-dd"));
    $('#txt_begin_date').datepicker();

    $('#txt_end_date').val(date.format("yyyy-MM-dd"));
    $('#txt_end_date').datepicker();

    Fileupload.prototype.listen = function () {
        this.$input.on('change.fileupload', $.proxy(vehicle_device_record_list_upload, this))
    }
    var up = $('.fileupload').fileupload();

    $('.select2able').select2({ formatNoMatches: function () { return "无"; } });
    Vehicle_Device_Record_Property.DeviceList.load();
    Vehicle_Device_Record_Html.Control.GroupList.create();
    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
    $('.select2-choices').css('cssText', 'max-height:65px !important;overflow-y:auto');
}

function vehicle_device_record_list_popover_Click(sender, args) {
    stopPropagation();
    var uri = new Uri(sender.href);
    if (uri.Query && uri.Querys.RecordId)
        if (Vehicle_Device_Record_Property.Count.ImageId(Vehicle_Device_Record_Property.RecordList.value[uri.Querys.RecordId]) > 0)
            AlertWindow.Show(sender, -1);
    return false;
}

function vehicle_device_record_list_info_Click(sender, args) {
    var uri = new Uri(sender.href);
    stopPropagation();
    if (uri.Query && uri.Querys.RecordId)
        AlertWindow.Show(sender, -1);
    return false;
}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Vehicle_Device_Record_Html.Control.GroupList.load(index + 1, Vehicle_Device_Record_Property.PageSize);
    });
}

function vehicle_device_record_list_search() {
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

    Vehicle_Device_Record_Html.Criteria.beginTime = beginTime;
    Vehicle_Device_Record_Html.Criteria.endTime = endTime;

    Vehicle_Device_Record_Html.Criteria.plate = getTag("txtSearchPlate").value ? getTag("txtSearchPlate").value : null;
    Vehicle_Device_Record_Html.Criteria.brand = getTag("txtSearchBrand").value ? getTag("txtSearchBrand").value : null;
    Vehicle_Device_Record_Html.Criteria.name = getTag("txtSearchName").value ? getTag("txtSearchName").value : null;
    data = $("#txtSearchDeviceId").select2("data");
    var ids = "";
    if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (i > 0)
                ids = ids + ',';
            ids = ids + data[i].id;
        }
    }
    Vehicle_Device_Record_Html.Criteria.deviceId = ids ? ids : null;
    //if (Vehicle_Device_Record_Html.MoreSearch)
    //    btnMoreSearchClick();
    Vehicle_Device_Record_Html.Control.GroupList.clear();
    Vehicle_Device_Record_Html.Control.GroupList.load(1, Vehicle_Device_Record_Property.PageSize);

}

function vehicle_device_record_list_upload(e, invoked) {
    var reader = new FileReader();
    var file = e.target.files !== undefined ? e.target.files[0] : (e.target.value ? { name: e.target.value.replace(/^.+\\/, '') } : null)
    if (!file) return;
    this.$hidden.val('')
    this.$hidden.attr('name', '')
    this.$input.attr('name', this.name)
    if ((typeof file.type !== "undefined" ? file.type.match('image.*') : file.name.match(/\.(gif|png|jpe?g)$/i)) && typeof FileReader !== "undefined") {
        var reader = new FileReader()

        var name = file.name.substr(0, file.name.lastIndexOf("."));
        var type = MapFormat.Jpeg;
        var ctype = file.type;
        for (var key in MapFormat) {
            if (file.type.indexOf(key.toLowerCase()) >= 0) {
                type = key;
                break;
            }
        }
        reader.onload = function (e) {
            var re = Vehicle_Device_Record_Property.Picture.upload(ctype, e.target.result);
        }
        reader.readAsArrayBuffer(file)
    } else {
        this.$preview.text(file.name)
        this.$element.addClass('fileupload-exists').removeClass('fileupload-new')
    }
}

function btnMoreSearchClick() {
    var div = $("#divMoreSearch");
    var span = document.getElementById("spanBtnMoreSearch");
    var i = document.getElementById("iBtnMoreSearch");
    if (Vehicle_Device_Record_Html.MoreSearch) {
        Vehicle_Device_Record_Html.MoreSearch = false;
        i.className = "icon-double-angle-down"
        span.innerText = "更多";
        div.slideUp(500);
        return;
    }
    Vehicle_Device_Record_Html.MoreSearch = true;
    i.className = "icon-double-angle-up";
    span.innerText = "收起";
    div.slideDown(500);
}

function addOption(obj, index) {

    id = obj.Id;
    name = obj.Name;

    //var option = document.createElement("option");

    //option.innerText = id;

    var option = document.createElement("option");
    option.innerText = name;
    option.value = id;
    getTag("txtSearchDeviceId").options[index] = option;
}