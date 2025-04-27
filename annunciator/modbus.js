function annunciator_device_list_load() {
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

function rebootDevice_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要重启这个设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.reboot(id);
        }
    });
};

function batchRebootDevices_Click(sender, args) {
    if (Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要重启所有选中的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.batchReboot();
        }
    });
}

function shutDownDevice_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要关闭这个设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.shutdown(id)
        }
    });
};

function batchShutDownDevices_Click(sender, args) {
    if (Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要关闭所有选中的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.batchShutdown();
        }
    });
}

function factoryDefaultDevice_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要将这个设备恢复出厂值吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.factoryDefault(id)
        }
    });
};

function batchFactoryDefaultDevices_Click(sender, args) {
    if (Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要将所有选中的设备恢复出厂值吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.batchFactoryDefault();
        }
    });
}
//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Html.Control.GroupList.load(index + 1, Property.PageSize, Property.Classification);
    });
}

function ultrasonic_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function wifi_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function networkInformation_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//function battery_Click(sender, args) {
//    stopPropagation();
//    AlertWindow.Show(sender, -1);
//    return false;
//}

function saveElectricity_Click(sender, args) {
    stopPropagation();
    var device = Property.DeviceList.value[args];
    if (device.Status.IsOnline) {
        Html.Control.GroupList.saveElectricity(args);
    }
    return false;
}

function batchSaveElectricity_Click(sender, args) {
    if (Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要" + (args == false ? "关闭" : "开启") + "所有选中设备的节电模式吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.batchSaveElectricity(args);
        }
    });
}