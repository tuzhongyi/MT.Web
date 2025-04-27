if (!this.Client)
    imported.loadJS("/js/client/client.js");

Html.Control.PopoverWindow.DepartmentList["PermissionWindow"] = {
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.departmentId)
            return uri.Querys.departmentId;
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
        var chks = getTag("chkDepartmentAddIOInputPermissions", getTagType.Name);
        for (var i = 0; i < chks.length; i++) {
            if (chks[i].checked) {
                arrayPermission.push(chks[i].value);
            }
        }
        if (arrayPermission.length == 0) {
            return IOInputPermissions.None;
        }
        else if (arrayPermission.length == chks.length) {
            return IOInputPermissions.All;
        }
        return (new Flags(arrayPermission)).toString();
    }
}