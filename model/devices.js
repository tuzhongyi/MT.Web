function createEnum() {
    var NewDeviceClassification = new Object();
    NewDeviceClassification["All"] = "All";
    for (var key in DeviceClassification) {
        NewDeviceClassification[key] = DeviceClassification[key];
    }
    return NewDeviceClassification;
}

function management_device_list_load() {
    delete DeviceClassification["None"];
    delete Language.Display.DeviceClassification["None"];
    var classification = createEnum();
    DropDownList.Create("ddlClassification", ControlModel.EnumAndLanguage, classification, Language.Display.DeviceClassification);
    var win = new AlertWindow("", "<a class='btn btn-xs btn-primary-outline pull-right div-xsgroup' style='font-size:14px;padding-left:14px;'><i class='icon-plus'></i></a>", "device/device_details.htm",200);
    document.getElementById("btn-addDevice").appendChild(win);

    Html.Control.GroupList.create();

    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
};

//列表项单击事件
function GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.GroupListItem);
        Html.Control.GroupList.select(id);
    })
};
//权限选择事件
function selectClassification_Click(args) {
    PopoverWindow.Close();
    tryCatch(function () {
        if (args == "All")
            args = null;
        if (Property.Classification == args)
            return false;
        Property.Classification = args ? args : null;
        Html.Control.GroupList.clear();
        Html.Control.GroupList.load(1, Property.PageSize, args);
    });
    GroupListItem_Cancel();
    return false;
};
function GroupListItem_SelectAll(args) {
    GroupListItem_Cancel();
    for (var i = 0; i < args.length; i++) {
        var id = Info.ControlIdPrefix.getId(args[i].id, Info.ControlIdPrefix.GroupListItem);
        Property.DeviceList.value[id].Selected = true;
    }
    Html.Control.GroupList.selectedCount = args.length;
};
function GroupListItem_Cancel() {
    for (var key in Property.DeviceList.value) {
        Property.DeviceList.value[key].Selected = false;
    }
    Html.Control.GroupList.selectedCount = 0;
};
function removeDevice_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要删除这个设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.remove(id)
        }
    });
};
function toStatistics_Click(sender, args) {
    stopPropagation();
    document.location = sender.href;
}
function batchRemoveDevices_Click(sender, args) {
    if (Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要删除所有选中的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.batchRemove();
        }
    });
};
function editDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, 65);
    return false;
}

function acquisitionDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, 250);
    return false;
}

//function wifi_Click(sender, args) {
//    stopPropagation();
//    AlertWindow.Show(sender, 250);
//    return false;
//}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Html.Control.GroupList.load(index + 1, Property.PageSize, Property.Classification);
    });
}