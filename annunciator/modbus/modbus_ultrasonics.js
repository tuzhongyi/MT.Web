function modbus_ultrasonics_load() {
    tryCatch(function () {
        var id = Html.Current.Id.get();
        Html.Control.AlertWindow.Ultrasonic.load(id);
    });
}

function btnUltrasonicInformation_Click(sender, args) {
    var ultrasonicInformation = new UltrasonicInformation();
    ultrasonicInformation.Interval = getTag("txtInterval").value;
    ultrasonicInformation.Range = getTag("txtRange").value;
    ultrasonicInformation.MaxRange = getTag("txtMaxRange").value;
    Html.Control.AlertWindow.Ultrasonic.modify(ultrasonicInformation);
    return false;
}