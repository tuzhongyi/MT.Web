var departmentList = Html.Control.PopoverWindow.DepartmentList;
//Association

//部门选择事件
function OutputAssociationDepartment_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Video.Output.Department.Association.list);
        departmentList.Association.select(id);
    });
}

//添加部门按钮
function To_Department_Unassociation_Click(sender, args) {
    departmentList.Unassociation.load(1);
    departmentList.Association.clear();
    departmentList.Unassociation.show();
}

//删除单个部门
function GroupListItem_OutputAssociationRemoveDepartment_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Video.Output.Department.Association.remove);
        $.confirm({
            text: "确认要删除这个部门吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                departmentList.Association.remove(id);
            }
        });
    });
}

//已绑定部门页面改变事件
function OutputAssociationDepartment_PageChange(index) {
    departmentList.Association.clear();
    departmentList.Association.load(index);
}
//删除单个部门关联事件
function btn_department_batch_remove_Click(sender, args) {
    if (departmentList.Association.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的部门吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            departmentList.Association.batchRemove();
        }
    });
}
//已绑定的部门当前页全部选中事件
function OutputAssociationDepartment_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Video.Output.Department.Association.list);
        if (departmentList.Association.selected.indexOf(id) < 0)
            departmentList.Association.selected.push(id);
    }
    departmentList.Association.selectAll();
}
//已绑定的部门当前页全部选择取消事件
function OutputAssociationDepartment_SelectedCancel(items) {
    departmentList.Association.selected = new Array();
}
function OutputAssociationDepartment_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Video.Output.Department.Association.list);
        if (departmentList.Association.selected.indexOf(id) < 0)
            departmentList.Association.selected.push(id);
    }
}

function OutputAssociationDepartment_SelectedInverse() {
    departmentList.Association.selectInverse();
}
//全部删除
function RemoveAllDepartment_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有部门吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                departmentList.Association.removeAll();
                departmentList.Association.clear();
                departmentList.Association.load(1);
            }
        });
    });
}


//Unassociation

//返回按钮
function To_Department_Association_Click(sender, args) {
    if (args || departmentList.Unassociation.selected.length == 0) {
        tryCatch(function () {
            departmentList.Unassociation.selected = new Array();
            departmentList.Association.load(1);
            departmentList.Unassociation.clear();
            departmentList.Association.show();
        });
        return;
    }
    $.confirm({
        text: "已有选中部门确定不再添加吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            To_Department_Association_Click(this, true)
        }
    });
}
//绑定完成按钮
function btn_department_association_Click(sender, args) {
    //if (departmentList.Unassociation.selected.length == 0) 
    //    return;
    //departmentList.Unassociation.batchAdd();
    //departmentList.Unassociation.clear();
    //departmentList.Association.clear();
    //departmentList.Association.load(1);
    //departmentList.Association.show();

    if (departmentList.Unassociation.selected.length > 0)
        PageEvent.Device.Video.Output.Department.BatchAddOutputsToDepartment(VideoOutSourcePermissions.All);
    else
        To_Department_Association_Click();
        //AlertWindow.Show(sender, -1);
    return false;
}
//未绑定部门绑定事件
function GroupListItem_OutputUnassociationAddDepartment_Click(sender, args) {
    //stopPropagation();
    //tryCatch(function () {
    //    var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Department.Unassociation.add);
    //    departmentList.Unassociation.add(id);
    //    var index = departmentList.Unassociation.selected.indexOf(id);
    //    if (index > -1) {
    //        departmentList.Unassociation.selected.splice(index, 1);
    //    }
    //});

    stopPropagation();
    PageEvent.Device.Video.Output.Department.AddDepartmentToOutput(VideoOutSourcePermissions.All, args);
    //AlertWindow.Show(sender, -1);
    return false;
}
//未绑定部门选择事件
function OutputUnassociationDepartment_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Video.Output.Department.Unassociation.list);
        departmentList.Unassociation.select(id);
    });
}

function OutputUnassociationDepartment_PageChange(index) {
    departmentList.Unassociation.clear();
    departmentList.Unassociation.load(index);
}
function OutputUnassociationDepartment_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Video.Output.Department.Unassociation.list);
        if (departmentList.Unassociation.selected.indexOf(id) < 0)
            departmentList.Unassociation.selected.push(id);
    }
    departmentList.Unassociation.selectAll();
}
function OutputUnassociationDepartment_SelectedCancel(items) {
    departmentList.Unassociation.selected = new Array();
}
function OutputUnassociationDepartment_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Video.Output.Department.Unassociation.list);
        if (departmentList.Unassociation.selected.indexOf(id) < 0)
            departmentList.Unassociation.selected.push(id);
    }
}
function OutputUnassociationDepartment_SelectedInverse() {
    departmentList.Unassociation.selectInverse();
}
