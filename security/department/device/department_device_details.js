//完成按钮
function btnDetailDepartment_Device_Click() {
    var device = new DevicePermission();
    device.Name = getTag("txtPermissionName").value;
    device.Device = Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.Device.get();
    device.Id = device.Device.Id;
    device.Permission = Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.Permissions.getString();
    Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.modify(device);

    AlertWindow.Close(PageEvent.Department.ModifyDeviceListItem, device);
}
function department_device_detail_load() {
    var deviceId = Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.EventId();
    Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.load(Html.Current.Id.get(), deviceId);
    for (var p in Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.Permissions.value) {
        getTag("chk" + p).checked = true;
    }
    getTag("txtPermissions").value = Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.Permissions.getLanguageString();
}
function getDevicePermissionsCheckBox(sender, args) {
    var value = sender.checked;
    Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.Permissions.set(args, value);
    getTag("txtPermissions").value = Html.Control.PopoverWindow.DeviceList.AlertWindow.Details.Permissions.getLanguageString();
}