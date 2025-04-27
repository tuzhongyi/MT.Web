var userList = Html.Control.PopoverWindow.UserList;
//Association

//用户选择事件
function InputAssociationUser_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Video.Input.User.Association.list);
        userList.Association.select(id);
    });
}

//添加用户按钮
function To_User_Unassociation_Click(sender, args) {
    userList.Unassociation.load(1);
    userList.Association.clear();
    userList.Unassociation.show();
}

//删除单个用户
function GroupListItem_InputAssociationRemoveUser_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Video.Input.User.Association.remove);
        $.confirm({
            text: "确认要删除这个用户吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                userList.Association.remove(id);
            }
        });
    });
}

//已绑定用户页面改变事件
function InputAssociationUser_PageChange(index) {
    userList.Association.clear();
    userList.Association.load(index);
}
//删除单个用户关联事件
function btn_user_batch_remove_Click(sender, args) {
    if (userList.Association.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的用户吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            userList.Association.batchRemove();
        }
    });
}
//已绑定的用户当前页全部选中事件
function InputAssociationUser_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Video.Input.User.Association.list);
        if (userList.Association.selected.indexOf(id) < 0)
            userList.Association.selected.push(id);
    }
    userList.Association.selectAll();
}
//已绑定的用户当前页全部选择取消事件
function InputAssociationUser_SelectedCancel(items) {
    userList.Association.selected = new Array();
}
function InputAssociationUser_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Video.Input.User.Association.list);
        if (userList.Association.selected.indexOf(id) < 0)
            userList.Association.selected.push(id);
    }
}

function InputAssociationUser_SelectedInverse() {
    userList.Association.selectInverse();
}
//全部删除
function RemoveAllUser_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有用户吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                userList.Association.removeAll();
                userList.Association.clear();
                userList.Association.load(1);
            }
        });
    });
}


//Unassociation

//返回按钮
function To_User_Association_Click(sender, args) {
    if (args || userList.Unassociation.selected.length == 0) {
        tryCatch(function () {
            userList.Unassociation.selected = new Array();
            userList.Association.load(1);
            userList.Unassociation.clear();
            userList.Association.show();
        });
        return;
    }
    $.confirm({
        text: "已有选中用户确定不再添加吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            To_User_Association_Click(this, true)
        }
    });
}
//绑定完成按钮
function btn_user_association_Click(sender, args) {
    //if (userList.Unassociation.selected.length == 0) 
    //    return;
    //userList.Unassociation.batchAdd();
    //userList.Unassociation.clear();
    //userList.Association.clear();
    //userList.Association.load(1);
    //userList.Association.show();
    if (userList.Unassociation.selected.length > 0)
        AlertWindow.Show(sender, -1);
    else
        To_User_Association_Click();
    return false;
}
//未绑定用户绑定事件
function GroupListItem_InputUnassociationAddUser_Click(sender, args) {
    //stopPropagation();
    //tryCatch(function () {
    //    var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.User.Unassociation.add);
    //    userList.Unassociation.add(id);
    //    var index = userList.Unassociation.selected.indexOf(id);
    //    if (index > -1) {
    //        userList.Unassociation.selected.splice(index, 1);
    //    }
    //});
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}
//未绑定用户选择事件
function InputUnassociationUser_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Video.Input.User.Unassociation.list);
        userList.Unassociation.select(id);
    });
}

function InputUnassociationUser_PageChange(index) {
    userList.Unassociation.clear();
    userList.Unassociation.load(index);
}
function InputUnassociationUser_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Video.Input.User.Unassociation.list);
        if (userList.Unassociation.selected.indexOf(id) < 0)
            userList.Unassociation.selected.push(id);
    }
    userList.Unassociation.selectAll();
}
function InputUnassociationUser_SelectedCancel(items) {
    userList.Unassociation.selected = new Array();
}
function InputUnassociationUser_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Device.Video.Input.User.Unassociation.list);
        if (userList.Unassociation.selected.indexOf(id) < 0)
            userList.Unassociation.selected.push(id);
    }
}
function InputUnassociationUser_SelectedInverse() {
    userList.Unassociation.selectInverse();
}