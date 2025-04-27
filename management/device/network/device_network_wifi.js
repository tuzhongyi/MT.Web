function device_network_wifi_load() {
    tryCatch(function () {
        var id = Html.Current.Id.get();
        Html.Control.AlertWindow.WiFi.load(id);
    });
}

function btnWiFiInformation_Click(sender, args) {
    var wifiInformation = new WiFiInformation();
    wifiInformation.Name = getTag("txtName").value;
    wifiInformation.Password = getTag("txtPassword").value;
    wifiInformation.Channel = getTag("txtChannel").value;
    wifiInformation.Intensity = getTag("txtIntensity").value;
    Html.Control.AlertWindow.WiFi.modify(wifiInformation);
    return false;
}