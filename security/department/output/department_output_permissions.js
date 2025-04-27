//完成按钮
function btnPermissionsDepartment_Output_Click() {
    var obj = Html.Control.PopoverWindow.OutputList.AlertWindow.Permission;
    eval(obj.EventFunName())(obj.Values(), obj.EventId());
    AlertWindow.Close();
}
function department_device_permissions_load() {
    if (Html.Control.PopoverWindow.OutputList.AlertWindow.Permission.EventFunName())
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}