function vehicle_device_status_load() {
    tryCatch(function () {
        var id = Vehicle_Device_Html.Current.Id.get();
        if (id) {
            Vehicle_Device_Html.Control.Status.load(id);
        }
    });
}