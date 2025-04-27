//完成按钮
function btnPermissionsDepartment_IOInput_Click() {
    var obj = Html.Control.PopoverWindow.IOInputList.AlertWindow.Permission;
    eval(obj.EventFunName())(obj.Values(), obj.EventId());
    AlertWindow.Close();
}
function department_device_permissions_load() {
    if (Html.Control.PopoverWindow.IOInputList.AlertWindow.Permission.EventFunName())
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}