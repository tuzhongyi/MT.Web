var IOOutputList = Html.Control.PopoverWindow.IO.OutputList;
//用户选择事件
function DeviceIOOutput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IO.Output.list);
        IOOutputList.select(id);
    });
}
//删除单个用户
function GroupListItem_DeviceRemoveIOOutput_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IO.Output.remove);
        $.confirm({
            text: "确认要删除这个通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                IOOutputList.remove(id);
            }
        });
    });
}

//已绑定用户页面改变事件
function DeviceIOOutput_PageChange(index) {
    IOOutputList.clear();
    IOOutputList.load(index);
}
//删除单个用户关联事件
function btn_io_output_batch_remove_Click(sender, args) {
    if (IOOutputList.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            IOOutputList.batchRemove();
        }
    });
}
//已绑定的用户当前页全部选中事件
function DeviceAssociationIOOutput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IO.Output.list);
        if (IOOutputList.selected.indexOf(id) < 0)
            IOOutputList.selected.push(id);
    }
    IOOutputList.selectAll();
}
//已绑定的用户当前页全部选择取消事件
function DeviceAssociationIOOutput_SelectedCancel(items) {
    IOOutputList.selected = new Array();
}
function DeviceAssociationIOOutput_SelectedInverse() {
    IOOutputList.selectInverse();
}
function DeviceAssociationIOOutput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IO.Output.list);
        if (IOOutputList.selected.indexOf(id) < 0)
            IOOutputList.selected.push(id);
    }
}
//全部删除
function RemoveAllIOOutput_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                IOOutputList.removeAll();
                IOOutputList.clear();
                IOOutputList.load(1);
            }
        });
    });
}

function btn_io_output_add_Click(sender, args) {
    AlertWindow.Show(sender, -1);
    return false;
}

function to_io_output_details_list() {
    var href = setUrlRandomParams(Info.ControlIdPrefix.IO.Output.Jump.list + "?deviceId=" + Html.Current.Id.get() + "&deviceName=" + base64encode(UTF8.fromChinese(Property.DeviceList.value[Html.Current.Id.get()].Name)));
    Trigger = document.createElement("a");
    Trigger.href = href;
    PopoverWindow.Close();
    loadContent(base64encode(href));
}

function editIOOutput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}