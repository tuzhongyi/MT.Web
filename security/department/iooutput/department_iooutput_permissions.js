//完成按钮
function btnPermissionsDepartment_IOOutput_Click() {
    var obj = Html.Control.PopoverWindow.IOOutputList.AlertWindow.Permission;
    eval(obj.EventFunName())(obj.Values(), obj.EventId());
    AlertWindow.Close();
}
function department_device_permissions_load() {
    if (Html.Control.PopoverWindow.IOOutputList.AlertWindow.Permission.EventFunName())
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}