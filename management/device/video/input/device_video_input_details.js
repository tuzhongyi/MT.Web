//页面加载
function device_video_input_details_load() {
    DropDownList.Create("ddlVideoInterfaceType", ControlModel.Language, VideoInterfaceType, Language.Enum.VideoInterfaceType);
    DropDownList.Create("ddlCameraType", ControlModel.Language, CameraType, Language.Enum.CameraType);
    Html.Control.AlertWindow.Device.Video ? Html.Control.AlertWindow.Device.Video.Input.Details.load() : Html.Control.AlertWindow.Device.Input.Details.load();
    if (booststrap_switch_already_initialized)
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}


//摄像机类型颜色
var cameraTypeColor = {
    None: LabelTagColor.Red,
    Gun: LabelTagColor.Green,
    Ball: LabelTagColor.Yellow,
    HalfBall: LabelTagColor.DoderBlue,
    AIO: LabelTagColor.LightBlue
}
//改变摄像机类型事件
function ddlCameraType_Changed(sender, args) {
    //var pic = getTag("picCameraType");
    //pic.className = "background_icon camera-type " + args.toLowerCase();
    //pic.parentElement.className = "icon-color-btn-background "+ cameraTypeColor[args];
}

function btnVideoInputDetails_Click(sender, args) {
    var input = new VideoInputChannel();

    var url = new Uri(Trigger.href);
    if (url.Query) {
        input.Id = url.Querys.inputId;
    }
    input.CameraType = getTag("ddlCameraType").value;
    input.CameraTypeSpecified = true;

    input.Infrared = getTag("chkInfrared").checked;
    input.InfraredSpecified = true;

    input.Networked = getTag("chkNetworked").checked;
    input.NetworkedSpecified = true;

    input.PTZ = getTag("chkPTZ").checked;
    input.PTZSpecified = true;

    input.Terminal = getTag("chkTerminal").checked;
    input.TerminalSpecified = true;

    input.Name = getTag("txtName").value;
    input.PseudoCode = parseInt(getTag("txtPseudoCode").value);
    input.VideoInterfaceType = getTag("ddlVideoInterfaceType").value;
    input.VideoInterfaceTypeSpecified = true;
    AlertWindow.Close(PageEvent.Device.Video.Input.GroupListChanged, input);
    return false;
}


