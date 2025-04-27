//页面加载
function device_video_output_details_load() {
    DropDownList.Create("ddlVideoInterfaceType", ControlModel.EnumAndLanguage, VideoInterfaceType, Language.Enum.VideoInterfaceType);
    DropDownList.Create("ddlResolution", ControlModel.Value, ResolutionFormat);
    Html.Control.AlertWindow.Device.Video ? Html.Control.AlertWindow.Device.Video.Output.Details.load() : Html.Control.AlertWindow.Device.Output.Details.load();
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

function btnVideoOutputDetails_Click(sender, args) {
    var output = new VideoOutputChannel();

    var url = new Uri(Trigger.href);
    if (url.Query) {
        output.Id = url.Querys.outputId;
    }
    output.VideoInterfaceType = getTag("ddlVideoInterfaceType").value;
    output.VideoInterfaceTypeSpecified = true;

    output.InterfaceEquipped = getTag("chkInterfaceEquipped").checked;
    output.InterfaceEquippedSpecified = true;

    output.Networked = getTag("chkNetworked").checked;
    output.NetworkedSpecified = true;

    output.Terminal = getTag("chkTerminal").checked;
    output.TerminalSpecified = true;

    output.Frequency = parseInt(getTag("sliderFrequency").innerText);
    output.FrequencySpecified = true;

    output.Resolution = getResolution(getTag("ddlResolution").value);
    output.ResolutionSpecified = true;

    output.Name = getTag("txtName").value;
    output.PseudoCode = getTag("txtPseudoCode").value;
    AlertWindow.Close(PageEvent.Device.Video.Output.GroupListChanged, output);
    return false;
}

function getResolution(frequency) {
    var resolutionArr = new Array();
    resolutionArr = frequency.split("×");
    var resolution = new Resolution();
    resolution.Width = resolutionArr[0];
    resolution.Height = resolutionArr[1];
    return resolution;
}

