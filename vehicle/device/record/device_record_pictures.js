function vehicle_device_record_pictures_load() {
    var id = Vehicle_Device_Record_Html.Current.Id.get();
    Vehicle_Device_Record_Html.Control.Picture.load(id);
}