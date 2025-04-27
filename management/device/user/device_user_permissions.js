//完成按钮
function btnPermissionsDevice_User_Click() {
    var obj = Html.Control.PopoverWindow.UserList.PermissionWindow;
    eval(obj.EventFunName())(obj.Values(), obj.EventId());
    AlertWindow.Close();
}
function device_user_permissions_load() {
    if (Html.Control.PopoverWindow.UserList.PermissionWindow.EventFunName())
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
}