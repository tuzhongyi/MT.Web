//完成按钮
function btnDetailUser_IOOutput_Click(sender, args) {
    var iooutput = new IOOutputChannelPermission();
    iooutput.Name = getTag("txtPermissionName").value;
    iooutput.NameSpecified = true;
    iooutput.IOOutputChannel = Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.IOOutput.get();
    iooutput.Id = iooutput.IOOutputChannel.Id;
    //iooutput.Permission = Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.Permissions.getString();
    iooutput.Permission = Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.Permissions.get();
    Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.modify(iooutput);

    AlertWindow.Close(PageEvent.User.ModifyIOOutputListItem, iooutput);
}
function user_iooutput_detail_load(sender, args) {
    var iooutputId = Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.EventId();
    Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.load(Html.Current.Id.get(), iooutputId);
    //for (var p in Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.Permissions.value) {
    //    getTag("chk" + p).checked = true;
    //}
    //getTag("txtPermissions").value = Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.Permissions.getLanguageString();
}
//function getIOOutputPermissionsCheckBox(sender, args) {
//    var value = sender.checked;
//    Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.Permissions.set(args, value);
//    getTag("txtPermissions").value = Html.Control.PopoverWindow.IOOutputList.AlertWindow.Details.Permissions.getLanguageString();
//}