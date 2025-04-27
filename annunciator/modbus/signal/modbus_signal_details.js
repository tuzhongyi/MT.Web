//完成按钮
function btnSignalDetails_Click() {
    var values = Html.Control.PopoverWindow.SignalList.AlertWindow.Details.getValues();
    var No = Html.Control.PopoverWindow.SignalList.AlertWindow.Details.No;
    var deviceId = Html.Control.PopoverWindow.SignalList.AlertWindow.Details.deviceId;
    AlertWindow.Close(function () {
        if (No)
            PageEvent.Signal.ModifySignal(deviceId, No, values);
        else
            PageEvent.Signal.BatchModifySignal(deviceId, values);
    });
}
function modbus_signal_details_load() {
    Html.Control.PopoverWindow.SignalList.AlertWindow.Details.No = null;
    Html.Control.PopoverWindow.SignalList.AlertWindow.Details.deviceId = null;
    Html.Control.PopoverWindow.SignalList.AlertWindow.Details.load();
    (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}