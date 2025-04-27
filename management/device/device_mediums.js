var mediumList = Html.Control.PopoverWindow.MediumList;
//Association

//用户选择事件
function DeviceMedium_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Medium.list);
        mediumList.select(id);
    });
}

//删除单个用户
function GroupListItem_DeviceRemoveMedium_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Medium.remove);
        $.confirm({
            text: "确认要删除这个存储媒介吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                mediumList.remove(id);
            }
        });
    });
}

//已绑定用户页面改变事件
function DeviceMedium_PageChange(index) {
    mediumList.clear();
    mediumList.load(index);
}
//删除单个用户关联事件
function btn_medium_batch_remove_Click(sender, args) {
    if (mediumList.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的存储媒介吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            mediumList.batchRemove();
        }
    });
}
//已绑定的用户当前页全部选中事件
function DeviceAssociationMedium_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Medium.list);
        if (mediumList.selected.indexOf(id) < 0)
            mediumList.selected.push(id);
    }
    mediumList.selectAll();
}
//已绑定的用户当前页全部选择取消事件
function DeviceAssociationMedium_SelectedCancel(items) {
    mediumList.selected = new Array();
}
function DeviceAssociationMedium_SelectedInverse() {
    mediumList.selectInverse();
}
function DeviceAssociationMedium_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Medium.list);
        if (mediumList.selected.indexOf(id) < 0)
            mediumList.selected.push(id);
    }
}
//全部删除
function RemoveAllMedium_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有存储媒介吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                mediumList.removeAll();
                mediumList.clear();
                mediumList.load(1);
            }
        });
    });
}

function btn_medium_add_Click(sender, args) {
    AlertWindow.Show(sender, -1);
    return false;
}

function btn_medium_details_list_Click(sender, args) {
    AlertWindow.Show(sender, -1);
    return false;
}