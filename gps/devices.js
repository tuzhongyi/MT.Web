function gps_device_list_load() {
    GPS_Device_Html.Control.GroupList.create();
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
function GPS_Device_GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = GPS_Device_Info.ControlIdPrefix.getId(sender.id, GPS_Device_Info.ControlIdPrefix.GroupListItem);
        GPS_Device_Html.Control.GroupList.select(id);
    })
};

function GPS_Device_GroupListItem_SelectAll(args) {
    GPS_Device_GroupListItem_Cancel();
    for (var i = 0; i < args.length; i++) {
        var id = GPS_Device_Info.ControlIdPrefix.getId(args[i].id, GPS_Device_Info.ControlIdPrefix.GroupListItem);
        GPS_Device_Property.DeviceList.value[id].Selected = true;
    }
    GPS_Device_Html.Control.GroupList.selectedCount = args.length;
};
function GPS_Device_GroupListItem_Cancel() {
    for (var key in GPS_Device_Property.DeviceList.value) {
        GPS_Device_Property.DeviceList.value[key].Selected = false;
    }
    GPS_Device_Html.Control.GroupList.selectedCount = 0;
};
function removeGPSDevice_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要删除这个设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            GPS_Device_Html.Control.GroupList.remove(id)
        }
    });
};

function batchRemoveGPSDevices_Click(sender, args) {
    if (GPS_Device_Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要删除所有选中的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            GPS_Device_Html.Control.GroupList.batchRemove();
        }
    });
};
function editGPSDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function statusGPSDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function addGPSDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        GPS_Device_Html.Control.GroupList.load(index + 1, GPS_Device_Property.PageSize);
    });
}