function vehicle_device_record_details_load() {
    var id = Vehicle_Device_Record_Html.Current.Id.get();
    Vehicle_Device_Record_Html.Control.AlertWindow.Record.load(id);
}