//完成按钮
function btnPermissionsIOInput_Department_Click() {
    var obj = Html.Control.PopoverWindow.DepartmentList.PermissionWindow;
    eval(obj.EventFunName())(obj.Values(), obj.EventId());
    AlertWindow.Close();
}
function device_io_input_department_permissions_load() {
    if (Html.Control.PopoverWindow.DepartmentList.PermissionWindow.EventFunName())
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}