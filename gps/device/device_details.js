function gps_device_item_load() {
    tryCatch(function () {
        var id = GPS_Device_Html.Current.Id.get();
        if (id) {
            GPS_Device_Html.Control.AlertWindow.load(id);
            document.getElementById("gps_device_details_alert_window").style.height = "580px";
            GPS_Device_Html.Control.AlertWindow.IsModify.set(true);
        }
        else {
            GPS_Device_Html.Control.AlertWindow.IsModify.set(false);
        }
    });
}

function btnDetailGPSDevice_Click(sender, args) {
    var device = new GPSDevice();
    if (GPS_Device_Property.Device.value)
        device = GPS_Device_Property.Device.value;
    var txtAccessId = getTag("txtAccessId");
    if (!txtAccessId.value) {
        txtAccessId.style.borderColor = "red";
        return false;
    }
    txtAccessId.style.borderColor = "#ccc";
    device.AccessId = txtAccessId.value;
    device.Name = getTag("txtName").value;
    device.NameSpecified = device.Name ? true : false;
    device.Username = getTag("txtUsername").value;
    device.UsernameSpecified = device.Username ? true : false;
    device.Password = getTag("txtPassword").value;
    device.PasswordSpecified = device.Password ? true : false;
    device.Model = getTag("txtModel").value;
    device.ModelSpecified = device.Model ? true : false;
    device.Description = getTag("txtDescription").value;
    device.DescriptionSpecified = device.Description ? true : false;

    if (GPS_Device_Html.Control.AlertWindow.IsModify.get())
        GPS_Device_Html.Control.AlertWindow.modify(device);
    else {
        device.CreationTime = new Date();
        GPS_Device_Html.Control.AlertWindow.create(device);
    }
    return false;
}
