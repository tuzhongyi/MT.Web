function gps_device_status_load() {
    tryCatch(function () {
        var id = GPS_Device_Html.Current.Id.get();
        if (id) {
            document.getElementById("aLocation").href += id;
            GPS_Device_Html.Control.Status.load(id);
        }
    });
}