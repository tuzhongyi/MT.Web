/// <reference path="../../../js/howell.js/howell.control.js" />
//完成按钮
function btnDetailUser_Input_Click(sender, args) {
    var input = new VideoInputChannelPermission();
    input.Name = getTag("txtPermissionName").value;
    input.NameSpecified = true;
    input.VideoInputChannel = Html.Control.PopoverWindow.InputList.AlertWindow.Details.Input.get();
    input.Id = input.VideoInputChannel.Id;
    input.Permission = Html.Control.PopoverWindow.InputList.AlertWindow.Details.Permissions.getString();
    Html.Control.PopoverWindow.InputList.AlertWindow.Details.modify(input);

    AlertWindow.Close(PageEvent.User.ModifyInputListItem, input);
}
function user_input_detail_load(sender, args) {
    var inputId = Html.Control.PopoverWindow.InputList.AlertWindow.Details.EventId();
    Html.Control.PopoverWindow.InputList.AlertWindow.Details.load(Html.Current.Id.get(), inputId);
    for (var p in Html.Control.PopoverWindow.InputList.AlertWindow.Details.Permissions.value) {
        getTag("chk" + p).checked = true;
    }
    getTag("txtPermissions").value = Html.Control.PopoverWindow.InputList.AlertWindow.Details.Permissions.getLanguageString();

    if (booststrap_switch_already_initialized)
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}
function getVideoSourcePermissionsCheckBox(sender, args) {
    var value = sender.checked;
    Html.Control.PopoverWindow.InputList.AlertWindow.Details.Permissions.set(args, value);
    getTag("txtPermissions").value = Html.Control.PopoverWindow.InputList.AlertWindow.Details.Permissions.getLanguageString();        
}