function vehicle_device_list_load() {
    document.title = "车牌识别设备";
    Vehicle_Device_Html.Control.GroupList.create();
    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));

    //for (var i = 0; i < 101; i++) {
    //    var device = new GPSDevice();
    //    device.AccessId = i.toString();
    //    device.Name = "测试GPS设备" + i;
    //    device.NameSpecified = true;
    //    device.Username = "Username";
    //    device.UsernameSpecified = true;
    //    device.Password = "Password";
    //    device.PasswordSpecified = true;
    //    device.Model = "型号";
    //    device.ModelSpecified = true;
    //    device.Description = "描述信息";
    //    device.DescriptionSpecified = true;
    //    Client.GPS().Device.Create(device);
    //}

    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
};

//列表项单击事件
function Vehicle_Device_GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = Vehicle_Device_Info.ControlIdPrefix.getId(sender.id, Vehicle_Device_Info.ControlIdPrefix.GroupListItem);
        Vehicle_Device_Html.Control.GroupList.select(id);
    })
};

function Vehicle_Device_GroupListItem_SelectAll(args) {
    Vehicle_Device_GroupListItem_Cancel();
    for (var i = 0; i < args.length; i++) {
        var id = Vehicle_Device_Info.ControlIdPrefix.getId(args[i].id, Vehicle_Device_Info.ControlIdPrefix.GroupListItem);
        Vehicle_Device_Property.DeviceList.value[id].Selected = true;
    }
    Vehicle_Device_Html.Control.GroupList.selectedCount = args.length;
};
function Vehicle_Device_GroupListItem_Cancel() {
    for (var key in Vehicle_Device_Property.DeviceList.value) {
        Vehicle_Device_Property.DeviceList.value[key].Selected = false;
    }
    Vehicle_Device_Html.Control.GroupList.selectedCount = 0;
};
function removeVehicleDevice_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要删除这个设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Vehicle_Device_Html.Control.GroupList.remove(id)
        }
    });
};

function batchRemoveVehicleDevices_Click(sender, args) {
    if (Vehicle_Device_Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要删除所有选中的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Vehicle_Device_Html.Control.GroupList.batchRemove();
        }
    });
};
function editVehicleDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function statusVehicleDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function addVehicleDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Vehicle_Device_Html.Control.GroupList.load(index + 1, Vehicle_Device_Property.PageSize);
    });
}