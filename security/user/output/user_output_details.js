//完成按钮
function btnDetailUser_Output_Click(sender, args) {
    var output = new VideoOutputChannelPermission();
    output.Name = getTag("txtPermissionName").value;
    output.NameSpecified = true;
    output.VideoOutputChannel = Html.Control.PopoverWindow.OutputList.AlertWindow.Details.Output.get();
    output.Id = output.VideoOutputChannel.Id;
    //output.Permission = Html.Control.PopoverWindow.OutputList.AlertWindow.Details.Permissions.getString();
    output.Permission = Html.Control.PopoverWindow.OutputList.AlertWindow.Details.Permissions.get();
    Html.Control.PopoverWindow.OutputList.AlertWindow.Details.modify(output);

    AlertWindow.Close(PageEvent.User.ModifyOutputListItem, output);
}
function user_output_detail_load(sender, args) {
    var outputId = Html.Control.PopoverWindow.OutputList.AlertWindow.Details.EventId();
    Html.Control.PopoverWindow.OutputList.AlertWindow.Details.load(Html.Current.Id.get(), outputId);
    //for (var p in Html.Control.PopoverWindow.OutputList.AlertWindow.Details.Permissions.value) {
    //    getTag("chk" + p).checked = true;
    //}
    //getTag("txtPermissions").value = Html.Control.PopoverWindow.OutputList.AlertWindow.Details.Permissions.getLanguageString();
}
//function getVideoOutSourcePermissionsCheckBox(sender, args) {
//    var value = sender.checked;
//    Html.Control.PopoverWindow.OutputList.AlertWindow.Details.Permissions.set(args, value);
//    getTag("txtPermissions").value = Html.Control.PopoverWindow.OutputList.AlertWindow.Details.Permissions.getLanguageString();
//}