//页面加载
function device_io_output_details_load() {
    DropDownList.Create("ddlTriggeringType", ControlModel.Language, IOOutputTriggeringType, Language.Enum.IOOutputTriggeringType);
    Html.Control.AlertWindow.Device.IO ? Html.Control.AlertWindow.Device.IO.Output.Details.load() : Html.Control.AlertWindow.Device.Output.Details.load();
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

function btnIOOutputDetails_Click(sender, args) {
    var output = new IOOutputChannel();

    var url = new Uri(Trigger.href);
    if (url.Query) {
        output.Id = url.Querys.outputId;
    }

    output.TriggeringType = getTag("ddlTriggeringType").value;
    output.TriggeringTypeSpecified = true;

    output.Name = getTag("txtName").value;
    AlertWindow.Close(PageEvent.Device.IO.Output.GroupListChanged, output);
    return false;
}


