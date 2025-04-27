//完成按钮
function btnPermissionsUser_IOInput_Click() {
    var obj = Html.Control.PopoverWindow.IOInputList.AlertWindow.Permission;
    eval(obj.EventFunName())(obj.Values(), obj.EventId());
    AlertWindow.Close();
}
function user_device_permissions_load() {
    if (Html.Control.PopoverWindow.IOInputList.AlertWindow.Permission.EventFunName())
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}