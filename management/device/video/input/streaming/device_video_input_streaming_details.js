//完成按钮
function btnDetailInput_Streaming_Click() {
    var streaming = new StreamingChannel();
    streaming.No = getTag("txtNo").value;
    streaming.VideoCodecType = getTag("ddlVideoCodecType").value;
    streaming.VideoResolution = getResolution(getTag("ddlVideoResolution").value);
    streaming.VideoQualityControlType = getTag("ddlVideoQualityControlType").value;
    streaming.VideoBitrateUpperCap = getTag("txtVideoBitrateUpperCap").value;
    streaming.FrameRate = getTag("txtFrameRate").value;
    streaming.FixedQuality = getTag("txtFixedQuality").value;
    streaming.Url = getTag("txtUrl").value;
    streaming.UrlSpecified = true;
    Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.modify(streaming);

    AlertWindow.Close(PageEvent.Device.Video.Input.Streaming.ModifyStreamingListItem, streaming);
}
function input_streaming_detail_load() {
    DropDownList.Create("ddlVideoCodecType", ControlModel.EnumAndLanguage, VideoCodecType, Language.Enum.VideoCodecType);
    DropDownList.Create("ddlVideoQualityControlType", ControlModel.EnumAndLanguage, VideoQualityControlType, Language.Enum.VideoQualityControlType);
    DropDownList.Create("ddlVideoResolution", ControlModel.Value, ResolutionFormat);
    var streamingId = Html.Control.PopoverWindow.StreamingList.AlertWindow.Details.EventId();
    Html.Control.PopoverWindow.StreamingList.AlertWindow.Details.load(Property.DeviceId, Html.Control.AlertWindow.Device.Input.Details.get().Id, streamingId);
}
function getResolution(frequency) {
    var resolutionArr = new Array();
    resolutionArr = frequency.split("×");
    var resolution = new Resolution();
    resolution.Width = resolutionArr[0];
    resolution.Height = resolutionArr[1];
    return resolution;
}

