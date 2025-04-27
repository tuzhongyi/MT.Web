function createEventTypeEnum() {
    var NewEventType = new Object();
    NewEventType["All"] = "All";
    for (var key in EventType) {
        NewEventType[key] = EventType[key];
    }
    return NewEventType;
}

function linkage_list_load() {
    var eventType = createEventTypeEnum();
    DropDownList.Create("ddlEventType", ControlModel.EnumAndLanguage, eventType, Language.Display.EventType);
    var win = new AlertWindow("", "<a class='btn btn-xs btn-primary-outline pull-right div-xsgroup' style='font-size:14px;padding-left:14px;'><i class='icon-plus'></i></a>", "linkage/linkage_add.htm", -1);
    document.getElementById("btn-addLinkage").appendChild(win);

    Html.Control.GroupList.create();
}

//列表项单击事件
function GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.GroupListItem);
        Html.Control.GroupList.select(id);
    })
};

//事件类型选择事件
function selectEventType_Click(args) {
    PopoverWindow.Close();
    tryCatch(function () {
        if (args == "All")
            args = null;
        if (Property.EventType == args)
            return false;
        Property.EventType = args ? args : null;
        Html.Control.GroupList.clear();
        Html.Control.GroupList.load(Property.EventType);
    });
    GroupListItem_Cancel();
    return false;
};
function GroupListItem_SelectAll(args) {
    GroupListItem_Cancel();
    for (var i = 0; i < args.length; i++) {
        var id = Info.ControlIdPrefix.getId(args[i].id, Info.ControlIdPrefix.GroupListItem);
        Property.LinkageList.value[id].Selected = true;
    }
    Html.Control.GroupList.selectedCount = args.length;
};
function GroupListItem_Cancel() {
    for (var key in Property.LinkageList.value) {
        Property.LinkageList.value[key].Selected = false;
    }
    Html.Control.GroupList.selectedCount = 0;
};
function removeLinkage_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要删除这个联动吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.remove(id);
        }
    });
}
function btnBatchRemoveLinkages_Click(sender, args) {
    if (Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要删除所有选中的联动吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.batchRemove();
        }
    });
}
//function editLinkage_Click(sender, args) {
//    stopPropagation();
//    AlertWindow.Show(sender, -1);
//    return false;
//}
function popover_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}