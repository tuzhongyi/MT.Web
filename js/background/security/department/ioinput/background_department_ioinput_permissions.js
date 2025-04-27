if (!this.Client)
    imported.loadJS("js/client/client.js");

Html.Control.PopoverWindow.IOInputList.AlertWindow["Permission"] = {
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.ioinputId)
            return uri.Querys.ioinputId;
        return null;
    },
    EventFunName: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.fun)
            return uri.Querys.fun;
        return null;
    },
    //获取输入通道权限事件
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