var VideoOutputList = Html.Control.PopoverWindow.Video.OutputList;
//Association
//用户选择事件
function DeviceVideoOutput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Video.Output.list);
        VideoOutputList.select(id);
    });
}
//删除单个用户
function GroupListItem_DeviceRemoveVideoOutput_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Video.Output.remove);
        $.confirm({
            text: "确认要删除这个通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                VideoOutputList.remove(id);
            }
        });
    });
}

//已绑定用户页面改变事件
function DeviceVideoOutput_PageChange(index) {
    VideoOutputList.clear();
    VideoOutputList.load(index);
}
//删除单个用户关联事件
function btn_video_output_batch_remove_Click(sender, args) {
    if (VideoOutputList.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            VideoOutputList.batchRemove();
        }
    });
}
//已绑定的用户当前页全部选中事件
function DeviceAssociationVideoOutput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Video.Output.list);
        if (VideoOutputList.selected.indexOf(id) < 0)
            VideoOutputList.selected.push(id);
    }
    VideoOutputList.selectAll();
}
//已绑定的用户当前页全部选择取消事件
function DeviceAssociationVideoOutput_SelectedCancel(items) {
    VideoOutputList.selected = new Array();
}
function DeviceAssociationVideoOutput_SelectedInverse() {
    VideoOutputList.selectInverse();
}
function DeviceAssociationVideoOutput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Video.Output.list);
        if (VideoOutputList.selected.indexOf(id) < 0)
            VideoOutputList.selected.push(id);
    }
}
//全部删除
function RemoveAllVideoOutput_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                VideoOutputList.removeAll();
                VideoOutputList.clear();
                VideoOutputList.load(1);
            }
        });
    });
}

function btn_video_output_add_Click(sender, args) {
    AlertWindow.Show(sender, -1);
    return false;
}

function to_video_output_details_list() {
    var href = setUrlRandomParams(Info.ControlIdPrefix.Video.Output.Jump.list + "?deviceId=" + Html.Current.Id.get() + "&deviceName=" + base64encode(UTF8.fromChinese(Property.DeviceList.value[Html.Current.Id.get()].Name)));
    Trigger = document.createElement("a");
    Trigger.href = href;
    PopoverWindow.Close();
    loadContent(base64encode(href));
}

function editVideoOutput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function displayVideoOutput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}