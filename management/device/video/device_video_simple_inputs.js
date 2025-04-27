var VideoInputList = Html.Control.PopoverWindow.Video.InputList;
//Association

//用户选择事件
function DeviceVideoInput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Video.Input.list);
        VideoInputList.select(id);
    });
}
//删除单个用户
function GroupListItem_DeviceRemoveVideoInput_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Video.Input.remove);
        $.confirm({
            text: "确认要删除这个通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                VideoInputList.remove(id);
            }
        });
    });
}

//已绑定用户页面改变事件
function DeviceVideoInput_PageChange(index) {
    VideoInputList.clear();
    VideoInputList.load(index);
}
//删除单个用户关联事件
function btn_video_input_batch_remove_Click(sender, args) {
    if (VideoInputList.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            VideoInputList.batchRemove();
        }
    });
}
//已绑定的用户当前页全部选中事件
function DeviceAssociationVideoInput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Video.Input.list);
        if (VideoInputList.selected.indexOf(id) < 0)
            VideoInputList.selected.push(id);
    }
    VideoInputList.selectAll();
}
//已绑定的用户当前页全部选择取消事件
function DeviceAssociationVideoInput_SelectedCancel(items) {
    VideoInputList.selected = new Array();
}
function DeviceAssociationVideoInput_SelectedInverse() {
    VideoInputList.selectInverse();
}
function DeviceAssociationVideoInput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Video.Input.list);
        if (VideoInputList.selected.indexOf(id) < 0)
            VideoInputList.selected.push(id);
    }
}
//全部删除
function RemoveAllVideoInput_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                VideoInputList.removeAll();
                VideoInputList.clear();
                VideoInputList.load(1);
            }
        });
    });
}

function btn_video_input_add_Click(sender, args) {
    AlertWindow.Show(sender, -1);
    return false;
}

function to_video_input_details_list() {
    var href = setUrlRandomParams(Info.ControlIdPrefix.Video.Input.Jump.list + "?deviceId=" + Html.Current.Id.get() + "&deviceName=" + base64encode(UTF8.fromChinese(Property.DeviceList.value[Html.Current.Id.get()].Name)));
    Trigger = document.createElement("a");
    Trigger.href = href;
    PopoverWindow.Close();
    loadContent(base64encode(href));
}

function editVideoInput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}