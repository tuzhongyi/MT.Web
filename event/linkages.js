var searchControl = null;
function createEventTypeEnum() {
    var NewEventType = new Object();
    NewEventType["All"] = "All";
    for (var key in EventType) {
        NewEventType[key] = EventType[key];
    }
    delete NewEventType["None"];
    return NewEventType;
}

function linkage_list_load() {
    searchControl = new SearchControl("divSearchContent", btnSearchClick);
    searchControl.Div.className += " pull-right";
    searchControl.Div.style.width = "42%";
    getTag("divOperationControl").insertBefore(searchControl.Div, getTag("divOperationControl").childNodes[0]);
    var eventType = createEventTypeEnum();
    DropDownList.Create("ddlEventType", ControlModel.EnumAndLanguage, eventType, Language.Display.EventType);
    var tag = document.getElementById("addOperation");
    delete EventType["None"];
    for (var key in EventType) {
        var li = createLi(key);
        tag.appendChild(li);
    }
    Html.Control.GroupList.create();
}

function createLi(key) {
    var li = document.createElement("li");
    li.className = "mouse_pointer";
    var a = document.createElement("a");
    a.innerText = Language.Display.EventType[key];
    a.className = "xsgroupdown-menu-ul-li-a";
    a.href = "event/linkage/linkage_add.htm?type=" + key;
    a.onclick = function () {
        Trigger = a;
        loadContent(base64encode(setUrlRandomParams("event/linkage/linkage_add.htm?type=" + key)));
        return false;
    }
    a.id = "add_" + key;
    //a.onclick = function () { return add_Click(a); }
    li.appendChild(a);
    return li;
}

//列表项单击事件
function GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.GroupListItem);
        Html.Control.GroupList.select(id);
    })
    changeBtnColor();
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
    changeBtnColor();
};
function GroupListItem_Cancel() {
    for (var key in Property.LinkageList.value) {
        Property.LinkageList.value[key].Selected = false;
    }
    Html.Control.GroupList.selectedCount = 0;
    changeBtnColor();
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
            changeBtnColor();
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
            changeBtnColor();
        }
    });
}
function editLinkage_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}
//function add_Click(sender) {
//    stopPropagation();
//    AlertWindow.Show(sender, -1);
//    return false;
//}
function popover_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}
function btnBatchEditText_Click(sender, args) {
    stopPropagation();
    if (Html.Control.GroupList.selectedCount <= 0)
        return false;
    AlertWindow.Show(sender, -1);
    return false;
    //$.confirm({
    //    text: "<div class='edit_text_icon_div'></div><div style='font-size:24px;color:#007aff;float:left;margin-left:10px'>修改联动显示信息</div><div style='margin-top:40px'><textarea id='textareaTextIdentifier' style='height:200px;width:496px;margin-left:20px;margin-top:20px;border:1px solid #ddd'></textarea></div>",
    //    okButton: "保存",
    //    cancelButton: "取消",
    //    confirm: function () {
    //        Html.Control.GroupList.batchEditText();
    //    }
    //});
}
function changeBtnColor() {
    var btnBatchRemoveLinkages = getTag("btnBatchRemoveLinkages");
    var btnBatchEditText = getTag("btnBatchEditText");
    if (Html.Control.GroupList.selectedCount > 0) {
        if (btnBatchRemoveLinkages.className.indexOf("btn-default") >= 0) {
            $(btnBatchRemoveLinkages).removeClass("btn-default");
        }
        if (btnBatchEditText.className.indexOf("btn-default") >= 0) {
            $(btnBatchEditText).removeClass("btn-default");
        }
        if (btnBatchEditText.className.indexOf("edit_text_default_btn") >= 0) {
            $(btnBatchEditText).removeClass("edit_text_default_btn");
        }
        $(btnBatchRemoveLinkages).addClass("btn-primary");
        $(btnBatchEditText).addClass("btn-primary");
        $(btnBatchEditText).addClass("edit_text_primary_btn");
    }
    else {
        if (btnBatchRemoveLinkages.className.indexOf("btn-primary") >= 0) {
            $(btnBatchRemoveLinkages).removeClass("btn-primary");
        }
        if (btnBatchEditText.className.indexOf("btn-primary") >= 0) {
            $(btnBatchEditText).removeClass("btn-primary");
        }
        if (btnBatchEditText.className.indexOf("edit_text_primary_btn") >= 0) {
            $(btnBatchEditText).removeClass("edit_text_primary_btn");
        }
        $(btnBatchRemoveLinkages).addClass("btn-default");
        $(btnBatchEditText).addClass("btn-default");
        $(btnBatchEditText).addClass("edit_text_default_btn");
    }
}

function btnSearchClick() {
    PopoverWindow.Close();
    Property.ComponentId = null;
    var txt = searchControl.Input.value;
    if (txt) {
        Property.ComponentId = txt
    }
    Html.Control.GroupList.clear();
    Html.Control.GroupList.load(Property.EventType);
    GroupListItem_Cancel();
}