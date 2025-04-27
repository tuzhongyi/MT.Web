var searchControl = null;
var searchMode = "normal";
function createEnum() {
    var NewDeviceClassification = new Object();
    NewDeviceClassification["All"] = "All";
    for (var key in DeviceClassification) {
        NewDeviceClassification[key] = DeviceClassification[key];
    }
    return NewDeviceClassification;
}

function management_device_list_load() {
    if (Trigger) {
        var url = new Uri(Trigger.href);
        if (url.Querys && url.Querys.platformId) {
            Property.PlatformId = url.Querys.platformId;
        }
        Trigger = null;
    }
    var li = new Object();
    li["模糊搜索"] = changeSearchMode;
    searchControl = new DropDownListSearchControl("divSearchContent", btnSearchClick, new DropDownListAttributes("chkSearch", "chksSearch", li, "search-drop-down-ul"));
    searchControl.Div.style.width = "50%";
    searchControl.Div.className += " pull-right";
    getTag("divOperationControl").insertBefore(searchControl.Div, getTag("divOperationControl").childNodes[0]);

    document.title = "设备信息";
    //searchControl = new DropDownCheckListSearchControl("divSearchContent", btnSearchClick, new CheckListAttributes(dic, "chkSearch", "chksSearch", 2, 302));

    delete DeviceClassification["None"];
    delete Language.Display.DeviceClassification["None"];
    delete DeviceClassification["ExtensionUnit"];
    delete Language.Display.DeviceClassification["ExtensionUnit"];
    var classification = createEnum();
    DropDownList.Create("ddlClassification", ControlModel.EnumAndLanguage, classification, Language.Display.DeviceClassification);

    if (Property.PlatformId) {
        document.getElementById("divSearchContent").style.display = "none";
        document.getElementById("btnBatchSyncDevice").style.display = "none";
        document.getElementById("divAddDevice").style.display = "none";
    }

    Html.Control.GroupList.create();

    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
    //$("#divSearchContent").mouseleave(searchClose);
};

//列表项单击事件
function GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.GroupListItem);
        Html.Control.GroupList.select(id);
    })
};
//权限选择事件
function selectClassification_Click(args) {
    PopoverWindow.Close();
    tryCatch(function () {
        if (args == "All")
            args = null;
        if (Property.Classification == args)
            return false;
        Property.Classification = args ? args : null;
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
        Property.DeviceList.value[id].Selected = true;
    }
    Html.Control.GroupList.selectedCount = args.length;
};
function GroupListItem_Cancel() {
    for (var key in Property.DeviceList.value) {
        Property.DeviceList.value[key].Selected = false;
    }
    Html.Control.GroupList.selectedCount = 0;
};
function removeDevice_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要删除这个设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.remove(id)
        }
    });
};
function toStatistics_Click(sender, args) {
    stopPropagation();
    document.location = sender.href;
}
function batchRemoveDevices_Click(sender, args) {
    if (Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要删除所有选中的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.batchRemove();
        }
    });
};
function editDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function acquisitionDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}
function syncDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function batchSyncDevice_Click(sender, args) {
    if (Html.Control.GroupList.selectedCount <= 0)
        return false;
    AlertWindow.Show(sender, -1);
    return false;
}

//function wifi_Click(sender, args) {
//    stopPropagation();
//    AlertWindow.Show(sender, -1);
//    return false;
//}

function addDevice_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Html.Control.GroupList.load(index + 1, Property.PageSize, Property.Classification, Property.Search);
    });
}

//function btnScreenClick(sender, args) {
//    var divScreen = getTag("divScreen");
//    var _sender = $(sender);
//    if (divScreen.style.display == "none") {
//        _sender.html("搜&ensp;&ensp;索<span class='caret-reverse'></span>");
//        divScreen.style.display = "block";
//    }
//    else {
//        _sender.html("搜&ensp;&ensp;索<span class='caret'></span>");
//        divScreen.style.display = "none";
//    }
//}

function btnSearchClick(sender, args) {
    WindowClose();
    Property.Search = null;
    var txt = searchControl.Input.value;
    if (txt) {
        if (Property.Search == null)
            Property.Search = new Object();
        var key = searchMode == "normal" ? "Name" : "All";
        Property.Search[key] = txt;
    }
    Html.Control.GroupList.clear();
    Html.Control.GroupList.load(1, Property.PageSize, Property.Classification, Property.Search);
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