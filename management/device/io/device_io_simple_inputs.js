var IOInputList = Html.Control.PopoverWindow.IO.InputList;
//用户选择事件
function DeviceIOInput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IO.Input.list);
        IOInputList.select(id);
    });
}
//删除单个用户
function GroupListItem_DeviceRemoveIOInput_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IO.Input.remove);
        $.confirm({
            text: "确认要删除这个通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                IOInputList.remove(id);
            }
        });
    });
}

//已绑定用户页面改变事件
function DeviceIOInput_PageChange(index) {
    IOInputList.clear();
    IOInputList.load(index);
}
//删除单个用户关联事件
function btn_io_input_batch_remove_Click(sender, args) {
    if (IOInputList.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            IOInputList.batchRemove();
        }
    });
}
//已绑定的用户当前页全部选中事件
function DeviceAssociationIOInput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IO.Input.list);
        if (IOInputList.selected.indexOf(id) < 0)
            IOInputList.selected.push(id);
    }
    IOInputList.selectAll();
}
//已绑定的用户当前页全部选择取消事件
function DeviceAssociationIOInput_SelectedCancel(items) {
    IOInputList.selected = new Array();
}
function DeviceAssociationIOInput_SelectedInverse() {
    IOInputList.selectInverse();
}
function DeviceAssociationIOInput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IO.Input.list);
        if (IOInputList.selected.indexOf(id) < 0)
            IOInputList.selected.push(id);
    }
}
//全部删除
function RemoveAllIOInput_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                IOInputList.removeAll();
                IOInputList.clear();
                IOInputList.load(1);
            }
        });
    });
}

function btn_io_input_add_Click(sender, args) {
    AlertWindow.Show(sender, -1);
    return false;
}

function to_io_input_details_list() {
    var href = setUrlRandomParams(Info.ControlIdPrefix.IO.Input.Jump.list + "?deviceId=" + Html.Current.Id.get() + "&deviceClassification=" + Property.DeviceList.get(Html.Current.Id.get()).Classification + "&deviceName=" + base64encode(UTF8.fromChinese(Property.DeviceList.value[Html.Current.Id.get()].Name)));
    Trigger = document.createElement("a");
    Trigger.href = href;
    PopoverWindow.Close();
    loadContent(base64encode(href));
}

function editIOInput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}