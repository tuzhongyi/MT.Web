var ioinputList = Html.Control.PopoverWindow.IOInputList;

//Association
//输入通道选择事件
function UserAssociationIOInput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IOInput.Association.list);
        ioinputList.Association.select(id);
    });
}

//添加输入通道按钮
function To_IOInput_Unassociation_Click(sender, args) {
    ioinputList.Unassociation.load(1);
    ioinputList.Association.clear();
    ioinputList.Unassociation.show();
}

//删除单个输入通道
function GroupListItem_UserAssociationRemoveIOInput_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IOInput.Association.remove);
        $.confirm({
            text: "确认要删除这个通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                ioinputList.Association.remove(id);
            }
        });
    });
}
function UserAssociationIOInput_PageChange(index) {
    ioinputList.Association.clear();
    ioinputList.Association.load(index);
}
function btn_ioinput_batch_remove_Click(sender, args) {
    if (ioinputList.Association.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            ioinputList.Association.batchRemove();
        }
    });
}
function UserAssociationIOInput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IOInput.Association.list);
        if (ioinputList.Association.selected.indexOf(id) < 0)
            ioinputList.Association.selected.push(id);
    }
    ioinputList.Association.selectAll();
}
function UserAssociationIOInput_SelectedCancel(items) {
    ioinputList.Association.selected = new Array();
}
function UserAssociationIOInput_SelectedInverse() {
    ioinputList.Association.selectInverse();
}
function UserAssociationIOInput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IOInput.Association.list);
        if (ioinputList.Association.selected.indexOf(id) < 0)
            ioinputList.Association.selected.push(id);
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
                ioinputList.Association.removeAll();
                ioinputList.Association.clear();
                ioinputList.Association.load(1);
            }
        });
    });
}

function GroupListItem_User_IOInput_Detail_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function EditIOInput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//Unassociation
//返回按钮
function To_IOInput_Association_Click(sender, args) {
    if (args || ioinputList.Unassociation.selected.length == 0) {
        tryCatch(function () {
            ioinputList.Unassociation.selected = new Array();
            ioinputList.Association.load(1);
            ioinputList.Unassociation.clear();//需要清理
            ioinputList.Association.show();
        });
        return;
    }
    $.confirm({
        text: "已有选中通道确定不再添加吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            To_IOInput_Association_Click(this, true)
        }
    });
}
//绑定完成按钮
function btn_ioinput_association_Click(sender, args) {
    if (ioinputList.Unassociation.selected.length > 0)
        AlertWindow.Show(sender, -1);
    else
        To_IOInput_Association_Click();
    return false;
}
//未绑定输入通道绑定事件
function GroupListItem_UserUnassociationAddIOInput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}
//未绑定输入通道选择事件
function UserUnassociationIOInput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IOInput.Unassociation.list);
        ioinputList.Unassociation.select(id);
    });
}

function UserUnassociationIOInput_PageChange(index) {
    ioinputList.Unassociation.clear();
    ioinputList.Unassociation.load(index);
}
function UserUnassociationIOInput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IOInput.Unassociation.list);
        if (ioinputList.Unassociation.selected.indexOf(id) < 0)
            ioinputList.Unassociation.selected.push(id);
    }
    ioinputList.Unassociation.selectAll();
}
function UserUnassociationIOInput_SelectedCancel(items) {
    ioinputList.Unassociation.selected = new Array();
}
function UserUnassociationIOInput_SelectedInverse() {
    ioinputList.Unassociation.selectInverse();
}
function UserUnassociationIOInput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IOInput.Unassociation.list);
        if (ioinputList.Unassociation.selected.indexOf(id) < 0)
            ioinputList.Unassociation.selected.push(id);
    }
}