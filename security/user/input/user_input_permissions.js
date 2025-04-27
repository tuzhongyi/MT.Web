//完成按钮
function btnPermissionsUser_Input_Click() {
    var obj = Html.Control.PopoverWindow.InputList.AlertWindow.Permission;
    eval(obj.EventFunName())(obj.Values(), obj.EventId());
    AlertWindow.Close();
}
function user_device_permissions_load() {
    if (Html.Control.PopoverWindow.InputList.AlertWindow.Permission.EventFunName())
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}