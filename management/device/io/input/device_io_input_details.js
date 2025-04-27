//页面加载
function device_io_input_details_load() {
    DropDownList.Create("ddlProbeType", ControlModel.Language, AlarmInProbeType, Language.Enum.AlarmInProbeType);
    DropDownList.Create("ddlTriggeringType", ControlModel.Language, IOInputTriggeringType, Language.Enum.IOInputTriggeringType);
    Html.Control.AlertWindow.Device.IO ? Html.Control.AlertWindow.Device.IO.Input.Details.load() : Html.Control.AlertWindow.Device.Input.Details.load();
    if (booststrap_switch_already_initialized)
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}

//摄像机类型颜色
var cameraTypeColor = {
    //None: LabelTagColor.Red,
    //Gun: LabelTagColor.Green,
    //Ball: LabelTagColor.Yellow,
    //HalfBall: LabelTagColor.DoderBlue,
    //AIO: LabelTagColor.LightBlue
}
//改变摄像机类型事件
function ddlProbeType_Changed(sender, args) {
    //var pic = getTag("picCameraType");
    //pic.className = "background_icon camera-type " + args.toLowerCase();
    //pic.parentElement.className = "icon-color-btn-background "+ cameraTypeColor[args];
}

function btnIOInputDetails_Click(sender, args) {
    var input = new IOInputChannel();

    var url = new Uri(Trigger.href);
    if (url.Query) {
        input.Id = url.Querys.inputId;
    }

    input.ProbeType = getTag("ddlProbeType").value;
    input.ProbeTypeSpecified = true;

    input.TriggeringType = getTag("ddlTriggeringType").value;
    input.TriggeringTypeSpecified = true;

    input.DefenceZoneId = getTag("txtDefenceZoneId").value;
    input.DefenceZoneIdSpecified = true;

    input.Name = getTag("txtName").value;
    AlertWindow.Close(PageEvent.Device.IO.Input.GroupListChanged, input);
    return false;
}


