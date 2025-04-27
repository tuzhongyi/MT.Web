if (!this.Client)
    imported.loadJS("js/client/client.js");

Html.Control.PopoverWindow.OutputList.AlertWindow["Permission"] = {
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.outputId)
            return uri.Querys.outputId;
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
        var chks = getTag("chkUserAddVideoOutSourcePermissions", getTagType.Name);
        for (var i = 0; i < chks.length; i++) {
            if (chks[i].checked) {
                arrayPermission.push(chks[i].value);
            }
        }
        if (arrayPermission.length == 0) {
            return VideoOutSourcePermissions.None;
        }
        else if (arrayPermission.length == chks.length) {
            return VideoOutSourcePermissions.All;
        }
        return (new Flags(arrayPermission)).toString();
    }
}