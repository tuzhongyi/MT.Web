var iooutputList = Html.Control.PopoverWindow.IOOutputList;

//Association
//输出通道选择事件
function DepartmentAssociationIOOutput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IOOutput.Association.list);
        iooutputList.Association.select(id);
    });
}

//添加输出通道按钮
function To_IOOutput_Unassociation_Click(sender, args) {
    iooutputList.Unassociation.load(1);
    iooutputList.Association.clear();
    iooutputList.Unassociation.show();
}

//删除单个输出通道
function GroupListItem_DepartmentAssociationRemoveIOOutput_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IOOutput.Association.remove);
        $.confirm({
            text: "确认要删除这个输出通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                iooutputList.Association.remove(id);
            }
        });
    });
}
function DepartmentAssociationIOOutput_PageChange(index) {
    iooutputList.Association.clear();
    iooutputList.Association.load(index);
}
function btn_iooutput_batch_remove_Click(sender, args) {
    if (iooutputList.Association.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的输出通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            iooutputList.Association.batchRemove();
        }
    });
}
function DepartmentAssociationIOOutput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IOOutput.Association.list);
        if (iooutputList.Association.selected.indexOf(id) < 0)
            iooutputList.Association.selected.push(id);
    }
    iooutputList.Association.selectAll();
}
function DepartmentAssociationIOOutput_SelectedCancel(items) {
    iooutputList.Association.selected = new Array();
}
function DepartmentAssociationIOOutput_SelectedInverse() {
    iooutputList.Association.selectInverse();
}
function DepartmentAssociationIOOutput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IOOutput.Association.list);
        if (iooutputList.Association.selected.indexOf(id) < 0)
            iooutputList.Association.selected.push(id);
    }
}

//全部删除
function RemoveAllIOOutput_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有输出通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                iooutputList.Association.removeAll();
                iooutputList.Association.clear();
                iooutputList.Association.load(1);
            }
        });
    });
}

function GroupListItem_Department_IOOutput_Detail_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function EditIOOutput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//Unassociation
//返回按钮
function To_IOOutput_Association_Click(sender, args) {
    if (args || iooutputList.Unassociation.selected.length == 0) {
        tryCatch(function () {
            iooutputList.Unassociation.selected = new Array();
            iooutputList.Association.load(1);
            iooutputList.Unassociation.clear();//需要清理
            iooutputList.Association.show();
        });
        return;
    }
    $.confirm({
        text: "已有选中输出通道确定不再添加吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            To_IOOutput_Association_Click(this, true)
        }
    });
}
//绑定完成按钮
function btn_iooutput_association_Click(sender, args) {
    if (iooutputList.Unassociation.selected.length > 0)
        PageEvent.IOOutput.BatchAddIOOutputsToDepartment(IOOutputPermissions.All);
    else
        To_IOOutput_Association_Click();
    //AlertWindow.Show(sender, -1);    
    return false;
}
//未绑定输出通道绑定事件
function GroupListItem_DepartmentUnassociationAddIOOutput_Click(sender, args) {
    stopPropagation();
    //AlertWindow.Show(sender, -1);
    PageEvent.IOOutput.AddIOOutputToDepartment(IOOutputPermissions.All, args);
    return false;
}
//未绑定输出通道选择事件
function DepartmentUnassociationIOOutput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.IOOutput.Unassociation.list);
        iooutputList.Unassociation.select(id);
    });
}

function DepartmentUnassociationIOOutput_PageChange(index) {
    iooutputList.Unassociation.clear();
    iooutputList.Unassociation.load(index);
}
function DepartmentUnassociationIOOutput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IOOutput.Unassociation.list);
        if (iooutputList.Unassociation.selected.indexOf(id) < 0)
            iooutputList.Unassociation.selected.push(id);
    }
    iooutputList.Unassociation.selectAll();
}
function DepartmentUnassociationIOOutput_SelectedCancel(items) {
    iooutputList.Unassociation.selected = new Array();
}
function DepartmentUnassociationIOOutput_SelectedInverse() {
    iooutputList.Unassociation.selectInverse();
}
function DepartmentUnassociationIOOutput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.IOOutput.Unassociation.list);
        if (iooutputList.Unassociation.selected.indexOf(id) < 0)
            iooutputList.Unassociation.selected.push(id);
    }
}