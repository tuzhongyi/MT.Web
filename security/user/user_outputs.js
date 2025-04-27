var outputList = Html.Control.PopoverWindow.OutputList;

//Association
//输出通道选择事件
function UserAssociationOutput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Output.Association.list);
        outputList.Association.select(id);
    });
}

//添加输出通道按钮
function To_Output_Unassociation_Click(sender, args) {
    outputList.Unassociation.load(1);
    outputList.Association.clear();
    outputList.Unassociation.show();
}

//删除单个输出通道
function GroupListItem_UserAssociationRemoveOutput_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Output.Association.remove);
        $.confirm({
            text: "确认要删除这个输出通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                outputList.Association.remove(id);
            }
        });
    });
}
function UserAssociationOutput_PageChange(index) {
    outputList.Association.clear();
    outputList.Association.load(index);
}
function btn_output_batch_remove_Click(sender, args) {
    if (outputList.Association.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的输出通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            outputList.Association.batchRemove();
        }
    });
}
function UserAssociationOutput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Output.Association.list);
        if (outputList.Association.selected.indexOf(id) < 0)
            outputList.Association.selected.push(id);
    }
    outputList.Association.selectAll();
}
function UserAssociationOutput_SelectedCancel(items) {
    outputList.Association.selected = new Array();
}
function UserAssociationOutput_SelectedInverse() {
    outputList.Association.selectInverse();
}
function UserAssociationOutput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Output.Association.list);
        if (outputList.Association.selected.indexOf(id) < 0)
            outputList.Association.selected.push(id);
    }
}

//全部删除
function RemoveAllOutput_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有输出通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                outputList.Association.removeAll();
                outputList.Association.clear();
                outputList.Association.load(1);
            }
        });
    });
}

function GroupListItem_User_Output_Detail_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function EditOutput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//Unassociation
//返回按钮
function To_Output_Association_Click(sender, args) {
    if (args || outputList.Unassociation.selected.length == 0) {
        tryCatch(function () {
            outputList.Unassociation.selected = new Array();
            outputList.Association.load(1);
            outputList.Unassociation.clear();//需要清理
            outputList.Association.show();
        });
        return;
    }
    $.confirm({
        text: "已有选中输出通道确定不再添加吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            To_Output_Association_Click(this, true)
        }
    });
}
//绑定完成按钮
function btn_output_association_Click(sender, args) {
    if (outputList.Unassociation.selected.length > 0)
        PageEvent.Output.BatchAddOutputsToUser(VideoOutSourcePermissions.All);
    else
        To_Output_Association_Click();
        //AlertWindow.Show(sender, -1);    
    return false;
}
//未绑定输出通道绑定事件
function GroupListItem_UserUnassociationAddOutput_Click(sender, args) {
    stopPropagation();
    //AlertWindow.Show(sender, -1);
    PageEvent.Output.AddOutputToUser(VideoOutSourcePermissions.All, args);
    return false;
}
//未绑定输出通道选择事件
function UserUnassociationOutput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Output.Unassociation.list);
        outputList.Unassociation.select(id);
    });
}

function UserUnassociationOutput_PageChange(index) {
    outputList.Unassociation.clear();
    outputList.Unassociation.load(index);
}
function UserUnassociationOutput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Output.Unassociation.list);
        if (outputList.Unassociation.selected.indexOf(id) < 0)
            outputList.Unassociation.selected.push(id);
    }
    outputList.Unassociation.selectAll();
}
function UserUnassociationOutput_SelectedCancel(items) {
    outputList.Unassociation.selected = new Array();
}
function UserUnassociationOutput_SelectedInverse() {
    outputList.Unassociation.selectInverse();
}
function UserUnassociationOutput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Output.Unassociation.list);
        if (outputList.Unassociation.selected.indexOf(id) < 0)
            outputList.Unassociation.selected.push(id);
    }
}