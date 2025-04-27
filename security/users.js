var searchControl = null;
var searchMode = "normal";
function security_user_list_load() {
    document.title = "用户列表";
    //searchControl = new DropDownCheckListSearchControl("divSearchContent", btnSearchClick, new CheckListAttributes(dic, "chkSearch", "chksSearch", 2, 302));
    var li = new Object();
    li["模糊搜索"] = changeSearchMode;
    searchControl = new DropDownListSearchControl("divSearchContent", btnSearchClick, new DropDownListAttributes("chkSearch", "chksSearch", li, "search-drop-down-ul"));
    searchControl.Div.className += " pull-right";
    getTag("divOperationControl").insertBefore(searchControl.Div, getTag("divOperationControl").childNodes[0]);
    var win = new AlertWindow("", "<a class='btn btn-xs btn-primary-outline pull-right div-xsgroup' style='font-size:14px;padding-left:14px;'><i class='icon-plus'></i></a>", "security/user/user_details.htm", -1);
    document.getElementById("btn-addUser").appendChild(win);

    Html.Control.GroupList.create();

    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
}

//列表项单击事件
function GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.GroupListItem);
        Html.Control.GroupList.select(id);
    })
};
//权限选择事件
function selectPermission_Click(sender, args) {
    PopoverWindow.Close();
    if (sender.className.indexOf("selected") > 0)
        return false;
    tryCatch(function () {
        $(".btn-permission.main").removeClass("selected");
        sender.className += " selected";
        Property.UserPermission = args ? args : null;
        Html.Control.GroupList.clear();
        Html.Control.GroupList.load(1, Property.PageSize, args, Property.Search);

    });
    GroupListItem_Cancel();
    return false;
};
function GroupListItem_SelectAll(args) {
    GroupListItem_Cancel();
    for (var i = 0; i < args.length; i++) {
        var id = Info.ControlIdPrefix.getId(args[i].id, Info.ControlIdPrefix.GroupListItem);
        Property.UserList.value[id].Selected = true;
    }
    Html.Control.GroupList.selectedCount = args.length;
};
function GroupListItem_Cancel() {
    for (var key in Property.UserList.value) {
        Property.UserList.value[key].Selected = false;
    }
    Html.Control.GroupList.selectedCount = 0;
};
function removeUser_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要删除这个用户吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.remove(id)
            
        }
    });
}
function batchRemoveUsers_Click(sender, args) {
    if (Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要删除所有选中的用户吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.batchRemove();
        }
    });
}
function editUser_Click(sender, args) {
    stopPropagation(arguments.callee.caller.arguments[0]);
    AlertWindow.Show(sender, -1);
    return false;
}
//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Html.Control.GroupList.load(index + 1, Property.PageSize, Property.UserPermission, Property.Search);
    });
}

//function btnSearchClick(sender, args) {
//    WindowClose();
//    Property.Search = null;
//    var txt = searchControl.Input.value;
//    var chks = getTag("chkSearch", getTagType.Name);
//    if (txt){
//        for (var i = 0; i < chks.length; i++) {
//            if (chks[i].checked) {
//                if (Property.Search == null)
//                    Property.Search = new Object();
//                Property.Search[chks[i].id.substr(7)] = txt;
//            }
//        }
//    }
//    Html.Control.GroupList.clear();
//    Html.Control.GroupList.load(1, Property.PageSize, Property.UserPermission, Property.Search);
//}
function btnSearchClick(sender, args) {
    WindowClose();
    Property.Search = null;
    var txt = searchControl.Input.value;
    if (txt) {
        if (Property.Search == null)
            Property.Search = new Object();
        var key = searchMode == "normal" ? "Username" : "All";
        Property.Search[key] = txt;
    }
    Html.Control.GroupList.clear();
    Html.Control.GroupList.load(1, Property.PageSize, Property.UserPermission, Property.Search);
}

function changeSearchMode(a) {
    if (searchMode == "normal") {
        searchMode = "fuzzy";
        a.innerText = "普通搜索";
        searchControl.Icon.className = "howell-icon-search fuzzy-search-btn";
        return;
    }
    searchControl.Icon.className = "icon-search";
    searchMode = "normal";
    a.innerText = "模糊搜索";
}