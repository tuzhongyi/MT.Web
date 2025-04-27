function user_operation_details_load() {
    var id = Logs_User_Operations_Html.Current.Id.get();
    Logs_User_Operations_Html.Control.AlertWindow.Operation.load(id);
}