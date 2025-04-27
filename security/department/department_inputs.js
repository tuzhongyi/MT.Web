var inputList = Html.Control.PopoverWindow.InputList;

//Association
//输入通道选择事件
function DepartmentAssociationInput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Input.Association.list);
        inputList.Association.select(id);
    });
}

//添加输入通道按钮
function To_Input_Unassociation_Click(sender, args) {
    inputList.Unassociation.load(1);
    inputList.Association.clear();
    inputList.Unassociation.show();
}

//删除单个输入通道
function GroupListItem_DepartmentAssociationRemoveInput_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Input.Association.remove);
        $.confirm({
            text: "确认要删除这个输入通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                inputList.Association.remove(id);
            }
        });
    });
}
function DepartmentAssociationInput_PageChange(index) {
    inputList.Association.clear();
    inputList.Association.load(index);
}
function btn_input_batch_remove_Click(sender, args) {
    if (inputList.Association.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的输入通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            inputList.Association.batchRemove();
        }
    });
}
function DepartmentAssociationInput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Input.Association.list);
        if (inputList.Association.selected.indexOf(id) < 0)
            inputList.Association.selected.push(id);
    }
    inputList.Association.selectAll();
}
function DepartmentAssociationInput_SelectedCancel(items) {
    inputList.Association.selected = new Array();
}
function DepartmentAssociationInput_SelectedInverse() {
    inputList.Association.selectInverse();
}
function DepartmentAssociationInput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Input.Association.list);
        if (inputList.Association.selected.indexOf(id) < 0)
            inputList.Association.selected.push(id);
    }
}
//全部删除
function RemoveAllInput_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有输入通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                inputList.Association.removeAll();
                inputList.Association.clear();
                inputList.Association.load(1);
            }
        });
    });
}

function GroupListItem_Department_Input_Detail_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function EditInput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//Unassociation
    //返回按钮
function To_Input_Association_Click(sender, args) {
    if (args || inputList.Unassociation.selected.length == 0) {
        tryCatch(function () {
            inputList.Unassociation.selected = new Array();
            inputList.Association.load(1);
            inputList.Unassociation.clear();//需要清理
            inputList.Association.show();
        });
        return;
    }
    $.confirm({
        text: "已有选中输入通道确定不再添加吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            To_Input_Association_Click(this, true)
        }
    });
}
//绑定完成按钮
function btn_input_association_Click(sender, args) {
    if (inputList.Unassociation.selected.length > 0)
        AlertWindow.Show(sender, -1);
    else
        To_Input_Association_Click();
    return false;
}
//未绑定输入通道绑定事件
function GroupListItem_DepartmentUnassociationAddInput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}
//未绑定输入通道选择事件
function DepartmentUnassociationInput_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Input.Unassociation.list);
        inputList.Unassociation.select(id);
    });
}

function DepartmentUnassociationInput_PageChange(index) {
    inputList.Unassociation.clear();
    inputList.Unassociation.load(index);
}
function DepartmentUnassociationInput_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Input.Unassociation.list);
        if (inputList.Unassociation.selected.indexOf(id) < 0)
            inputList.Unassociation.selected.push(id);
    }
    inputList.Unassociation.selectAll();
}
function DepartmentUnassociationInput_SelectedCancel(items) {
    inputList.Unassociation.selected = new Array();
}

function DepartmentUnassociationInput_SelectedInverse() {
    inputList.Unassociation.selectInverse();
}

function DepartmentUnassociationInput_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Input.Unassociation.list);
        if (inputList.Unassociation.selected.indexOf(id) < 0)
            inputList.Unassociation.selected.push(id);
    }
}