function vehicle_list_load() {
    document.title = "车辆信息";
    Vehicle_Html.Control.GroupList.create();
    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));

    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
};

//列表项单击事件
function Vehicle_GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = Vehicle_Info.ControlIdPrefix.getId(sender.id, Vehicle_Info.ControlIdPrefix.GroupListItem);
        Vehicle_Html.Control.GroupList.select(id);
    })
};

function Vehicle_GroupListItem_SelectAll(args) {
    Vehicle_GroupListItem_Cancel();
    for (var i = 0; i < args.length; i++) {
        var id = Vehicle_Info.ControlIdPrefix.getId(args[i].id, Vehicle_Info.ControlIdPrefix.GroupListItem);
        Vehicle_Property.VehicleList.value[id].Selected = true;
    }
    Vehicle_Html.Control.GroupList.selectedCount = args.length;
};
function Vehicle_GroupListItem_Cancel() {
    for (var key in Vehicle_Property.VehicleList.value) {
        Vehicle_Property.VehicleList.value[key].Selected = false;
    }
    Vehicle_Html.Control.GroupList.selectedCount = 0;
};
function removeVehicle_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要删除这个设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Vehicle_Html.Control.GroupList.remove(id)
        }
    });
};

function batchRemoveVehicles_Click(sender, args) {
    if (Vehicle_Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要删除所有选中的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Vehicle_Html.Control.GroupList.batchRemove();
        }
    });
};
function editVehicle_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function statusVehicle_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function addVehicle_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Vehicle_Html.Control.GroupList.load(index + 1, Vehicle_Property.PageSize);
    });
}