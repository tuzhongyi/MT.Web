

function modbus_details_load() {
    tryCatch(function () {
        var id = Html.Current.Id.get();
        Html.Control.AlertWindow.Details.load(id);
    });
}

function btnDetailDeviceInformation_Click(sender, args) {
    Html.Control.AlertWindow.Details.modify(getTag("txtName").value);
    return false;
}