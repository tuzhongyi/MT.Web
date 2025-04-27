var deviceList = Html.Control.PopoverWindow.DeviceList;

//Association
//设备选择事件
function UserAssociationDevice_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Association.list);
        deviceList.Association.select(id);
    });
}

//添加设备按钮
function To_Device_Unassociation_Click(sender, args) {
    deviceList.Unassociation.load(1);
    deviceList.Association.clear();
    deviceList.Unassociation.show();
}

//删除单个设备
function GroupListItem_UserAssociationRemoveDevice_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Association.remove);
        $.confirm({
            text: "确认要删除这个设备吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                deviceList.Association.remove(id);
            }
        });
    });
}
function UserAssociationDevice_PageChange(index) {
    deviceList.Association.clear();
    deviceList.Association.load(index);
}
function btn_device_batch_remove_Click(sender, args) {
    if (deviceList.Association.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            deviceList.Association.batchRemove();
        }
    });
}
function UserAssociationDevice_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Association.list);
        if (deviceList.Association.selected.indexOf(id) < 0)
            deviceList.Association.selected.push(id);
    }
    deviceList.Association.selectAll();
}

function UserAssociationDevice_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Association.list);
        if (deviceList.Association.selected.indexOf(id) < 0)
            deviceList.Association.selected.push(id);
    }
}

function UserAssociationDevice_SelectedInverse() {
    deviceList.Association.selectInverse();
}

function UserAssociationDevice_SelectedCancel(items) {
    deviceList.Association.selected = new Array();
}

//全部删除
function RemoveAllDevice_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有设备吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                deviceList.Association.removeAll();
                deviceList.Association.clear();
                deviceList.Association.load(1);
            }
        });
    });
}

function GroupListItem_User_Device_Detail_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function EditDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//Unassociation
    //返回按钮
function To_Device_Association_Click(sender, args) {
    if (args || deviceList.Unassociation.selected.length == 0) {
        tryCatch(function () {
            deviceList.Unassociation.selected = new Array();
            deviceList.Association.load(1);
            deviceList.Unassociation.clear();//需要清理
            deviceList.Association.show();
        });
        return;
    }
    $.confirm({
        text: "已有选中设备确定不再添加吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            To_Device_Association_Click(this, true)
        }
    });
}
//绑定完成按钮
function btn_device_association_Click(sender, args) {
    if (deviceList.Unassociation.selected.length > 0)
        AlertWindow.Show(sender, -1);
    else
        To_Device_Association_Click();
    return false;
}
//未绑定设备绑定事件
function GroupListItem_UserUnassociationAddDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}
//未绑定设备选择事件
function UserUnassociationDevice_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Unassociation.list);
        deviceList.Unassociation.select(id);
    });
}

function UserUnassociationDevice_PageChange(index) {
    deviceList.Unassociation.clear();
    deviceList.Unassociation.load(index);
}
function UserUnassociationDevice_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Unassociation.list);
        if (deviceList.Unassociation.selected.indexOf(id) < 0)
            deviceList.Unassociation.selected.push(id);
    }
    deviceList.Unassociation.selectAll();
}

function UserUnassociationDevice_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Unassociation.list);
        if (deviceList.Unassociation.selected.indexOf(id) < 0)
            deviceList.Unassociation.selected.push(id);
    }
}

function UserUnassociationDevice_SelectedInverse() {
    deviceList.Unassociation.selectInverse();
}

function UserUnassociationDevice_SelectedCancel(items) {
    deviceList.Unassociation.selected = new Array();
}