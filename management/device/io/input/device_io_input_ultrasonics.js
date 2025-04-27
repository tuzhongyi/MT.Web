function device_io_input_ultrasonics_load() {
    tryCatch(function () {
        var uri = new Uri(Trigger.href);
        if (uri.Query && uri.Querys.deviceId && uri.Querys.inputId && uri.Querys.deviceName && uri.Querys.inputName) {
            Ultrasonic.Property.deviceId = uri.Querys.deviceId;
            Ultrasonic.Property.inputId = uri.Querys.inputId;
            var deviceName = uri.Querys.deviceName;
            var inputName = uri.Querys.inputName;
            Ultrasonic.Html.Control.load(Ultrasonic.Property.deviceId, Ultrasonic.Property.inputId, deviceName, inputName);
        }
    });
}

function btnUltrasonicInformation_Click(sender, args) {
    var ultrasonicInformation = new UltrasonicInformation();
    ultrasonicInformation.Interval = getTag("txtInterval").value;
    ultrasonicInformation.Range = getTag("txtRange").value;
    ultrasonicInformation.MaxRange = getTag("txtMaxRange").value;
    Ultrasonic.Html.Control.modify(Ultrasonic.Property.deviceId, Ultrasonic.Property.inputId, ultrasonicInformation);
    return false;
}