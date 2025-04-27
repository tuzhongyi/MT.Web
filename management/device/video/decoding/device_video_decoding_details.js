//页面加载
function device_video_decoding_details_load() {
    Html.Control.AlertWindow.Device.Decoding.Details.load();
    if (booststrap_switch_already_initialized)
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}

function btnDecodingDetails_Click(sender, args) {
    var decoding = new DecodingChannel();

    decoding.Id = Html.DecodingId;
    decoding.PseudoCode = getTag("txtPseudoCode").value;

    decoding.SupportedCodecFormats = getTag("txtSupportedCodecFormats").value;
    decoding.SupportedCodecFormatsSpecified = true;

    decoding.Enabled = getTag("chkEnabled").checked;
    AlertWindow.Close(PageEvent.Device.Video.Decoding.GroupListChanged, decoding);
    return false;
}

