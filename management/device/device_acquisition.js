
function device_acquisition_load() {
    tryCatch(function () {
        var id = Html.Current.Id.get();
        Html.Control.AlertWindow.Acquisition.load(id);
    });
}

function btnAcquisitionDevice_Click(sender, args) {
    var serverInformation = new ServerInformation();
    serverInformation.Address = getTag("txtAddress").value;
    serverInformation.Port = getTag("txtPort").value;
    serverInformation.TimeSynchronization = getTag("chkTimeSynchronization").checked;
    serverInformation.TimeSynchronizationSpecified = true;
    if (getTag("txtProtocolVersion").value != "") {
        serverInformation.ProtocolVersion = getTag("txtProtocolVersion").value;
        serverInformation.ProtocolVersionSpecified = true;
    }
    var device = Property.DeviceList.get(Html.Current.Id.get());
    device.AuthenticationCode = getTag("txtAuthenticationCode").value;
    Property.Device.modify(device);
    Html.Control.AlertWindow.Acquisition.set(Html.Current.Id.get(), serverInformation);
    return false;
}