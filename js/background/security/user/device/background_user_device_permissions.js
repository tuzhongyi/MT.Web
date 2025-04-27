if (!this.Client)
    imported.loadJS("js/client/client.js");

Html.Control.PopoverWindow.DeviceList.AlertWindow["Permission"] = {
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.deviceId)
            return uri.Querys.deviceId;
        return null;
    },
    EventFunName: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.fun)
            return uri.Querys.fun;
        return null;
    },
    //获取设备权限事件
    Values: function () {
        var arrayPermission = new Array();
        var chks = getTag("chkUserAddDevicePermissions", getTagType.Name);
        for (var i = 0; i < chks.length; i++) {
            if (chks[i].checked) {
                arrayPermission.push(chks[i].value);
            }
        }
        if (arrayPermission.length == 0) {
            return DevicePermissions.None;
        }
        else if (arrayPermission.length == chks.length) {
            return DevicePermissions.All;
        }
        return (new Flags(arrayPermission)).toString();
    }
}