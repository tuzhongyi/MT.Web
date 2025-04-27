//完成按钮
function btnDetailDepartment_IOInput_Click(sender, args) {
    var ioinput = new IOInputChannelPermission();
    ioinput.Name = getTag("txtPermissionName").value;
    ioinput.NameSpecified = true;
    ioinput.IOInputChannel = Html.Control.PopoverWindow.IOInputList.AlertWindow.Details.IOInput.get();
    ioinput.Id = ioinput.IOInputChannel.Id;
    ioinput.Permission = Html.Control.PopoverWindow.IOInputList.AlertWindow.Details.Permissions.getString();
    Html.Control.PopoverWindow.IOInputList.AlertWindow.Details.modify(ioinput);

    AlertWindow.Close(PageEvent.Department.ModifyIOInputListItem, ioinput);
}
function department_ioinput_detail_load(sender, args) {
    var ioinputId = Html.Control.PopoverWindow.IOInputList.AlertWindow.Details.EventId();
    Html.Control.PopoverWindow.IOInputList.AlertWindow.Details.load(Html.Current.Id.get(), ioinputId);
    for (var p in Html.Control.PopoverWindow.IOInputList.AlertWindow.Details.Permissions.value) {
        getTag("chk" + p).checked = true;
    }
    getTag("txtPermissions").value = Html.Control.PopoverWindow.IOInputList.AlertWindow.Details.Permissions.getLanguageString();
}
function getIOInputPermissionsCheckBox(sender, args) {
    var value = sender.checked;
    Html.Control.PopoverWindow.IOInputList.AlertWindow.Details.Permissions.set(args, value);
    getTag("txtPermissions").value = Html.Control.PopoverWindow.IOInputList.AlertWindow.Details.Permissions.getLanguageString();
}