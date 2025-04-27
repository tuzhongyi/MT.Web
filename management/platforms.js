function platform_list_load() {
    document.title = "软件平台信息";
    var win = new AlertWindow("", "<a class='btn btn-xs btn-primary-outline pull-right div-xsgroup' style='font-size:14px;padding-left:14px;'><i class='icon-plus'></i></a>", "management/platform/platform_details.htm", -1);
    document.getElementById("btn-addPlatform").appendChild(win);

    Platform_Html.Control.GroupList.create();

    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
}

//列表项单击事件
function Platform_GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = Platform_Info.ControlIdPrefix.getId(sender.id, Platform_Info.ControlIdPrefix.GroupListItem);
        Platform_Html.Control.GroupList.select(id);
    })
};
function Platform_GroupListItem_SelectAll(args) {
    Platform_GroupListItem_Cancel();
    for (var i = 0; i < args.length; i++) {
        var id = Platform_Info.ControlIdPrefix.getId(args[i].id, Platform_Info.ControlIdPrefix.GroupListItem);
        Platform_Property.PlatformList.value[id].Selected = true;
    }
    Platform_Html.Control.GroupList.selectedCount = args.length;
};
function Platform_GroupListItem_Cancel() {
    for (var key in Platform_Property.PlatformList.value) {
        Platform_Property.PlatformList.value[key].Selected = false;
    }
    Platform_Html.Control.GroupList.selectedCount = 0;
};
function removePlatform_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要删除这个平台吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Platform_Html.Control.GroupList.remove(id)
        }
    });
}
function batchRemovePlatforms_Click(sender, args) {
    if (Platform_Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要删除所有选中的平台吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Platform_Html.Control.GroupList.batchRemove();
        }
    });
}
function editPlatform_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function syncPlatform_Click(sender, args) {
    stopPropagation();
    $.confirm({
        text: "确定要同步该平台下的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Platform_Html.Control.GroupList.sync(Platform_Info.ControlIdPrefix.getId(sender.id, Platform_Info.ControlIdPrefix.Sync));
        }
    });
}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Platform_Html.Control.GroupList.load(index + 1, Platform_Property.PageSize, Platform_Property.UserPermission, Platform_Property.Search);
    });
}