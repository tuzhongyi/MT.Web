var networkList = Html.Control.PopoverWindow.NetworkList;
//Association

//用户选择事件
function DeviceNetwork_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Network.list);
        networkList.select(id);
    });
}

//删除单个用户
function GroupListItem_DeviceRemoveNetwork_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Network.remove);
        $.confirm({
            text: "确认要删除这个网络接口吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                networkList.remove(id);
            }
        });
    });
}

//已绑定用户页面改变事件
function DeviceNetwork_PageChange(index) {
    networkList.clear();
    networkList.load(index);
}
//删除单个用户关联事件
function btn_network_batch_remove_Click(sender, args) {
    if (networkList.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的网络接口吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            networkList.batchRemove();
        }
    });
}
//已绑定的用户当前页全部选中事件
function DeviceAssociationNetwork_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Network.list);
        if (networkList.selected.indexOf(id) < 0)
            networkList.selected.push(id);
    }
    networkList.selectAll();
}
//已绑定的用户当前页全部选择取消事件
function DeviceAssociationNetwork_SelectedCancel(items) {
    networkList.selected = new Array();
}
function DeviceAssociationNetwork_SelectedInverse() {
    networkList.selectInverse();
}
function DeviceAssociationNetwork_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Network.list);
        if (networkList.selected.indexOf(id) < 0)
            networkList.selected.push(id);
    }
}
//全部删除
function RemoveAllNetwork_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有网络接口吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                networkList.removeAll();
                networkList.clear();
                networkList.load(1);
            }
        });
    });
}

function btn_network_add_Click(sender, args) {
    AlertWindow.Show(sender, -1);
    return false;
}

function wifi_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}