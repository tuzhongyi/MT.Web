var searchControl = null;
var searchMode = "normal";
function device_video_outputs_load() {
    document.title = "视频输出通道列表";
    //searchControl = new DropDownCheckListSearchControl("divSearchContent", btnSearchClick, new CheckListAttributes(dic, "chkSearch", "chksSearch", 2, 242));
    var li = new Object();
    li["模糊搜索"] = changeSearchMode;
    searchControl = new DropDownListSearchControl("divSearchContent", btnSearchClick, new DropDownListAttributes("chkSearch", "chksSearch", li, "search-drop-down-ul"));
    searchControl.Div.className += " pull-right";
    searchControl.Div.style.width = "55%";
    getTag("divOperationControl").insertBefore(searchControl.Div, getTag("divOperationControl").childNodes[0]);
    //$($.parseHTML(loadPage("device_video_outputs.js.htm"), document, true)).insertAfter(getTag("sc"));
    var url = new Uri(Trigger.href);
    if (url.Querys && url.Querys.deviceId)
        Html.Control.GroupList.Create(url.Querys.deviceId, "glistPanel");
    if (url.Querys && url.Querys.deviceName) {
        var win = new AlertWindow("", "<a class='btn btn-xs btn-primary-outline pull-right div-xsgroup' style='font-size:14px;padding-left:14px;'><i class='icon-plus'></i></a>", "management/device/video/output/device_video_output_add.htm?deviceName=" + url.Querys.deviceName, -1);
        document.getElementById("btnAdd").appendChild(win);
        getTag("listTitle").innerText = UTF8.toChinese(base64decode(url.Querys.deviceName));
    }


    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
}

function GroupListItem_SelectAll(args) {
    Html.Control.GroupList.Select.All();
};
function GroupListItem_Cancel(sender, args) {
    Html.Control.GroupList.Select.Cancel();
};
function batchRemoveVideoOutputs_Click(sender, args) {
    if (Html.Control.GroupList.Count.Selected > 0) {
        $.confirm({
            text: "确定要删除所有选中的通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                Html.Control.GroupList.BatchRemove();//批量删除，并返回删除的条数                           
            }
        });
    }

}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Html.Control.GroupList.Load(index + 1, Property.PageSize, Property.Search);
    });
}
function editOutput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}
PageEvent.Device.Video.Output.GroupListItemRemoveButtonClick = function (sender, args) {
    $.confirm({
        text: "确定要删除这个通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.Remove(args);
        }
    });
    stopPropagation();
}
//function btnSearchClick(sender, args) {
//    WindowClose();
//    Property.Search = null;
//    var txt = searchControl.Input.value;
//    var chks = getTag("chkSearch", getTagType.Name);
//    if (txt) {
//        for (var i = 0; i < chks.length; i++) {
//            if (chks[i].checked) {
//                if (Property.Search == null)
//                    Property.Search = new Object();
//                Property.Search[chks[i].id.substr(7)] = txt;
//            }
//        }
//    }
//    Html.Control.GroupList.Clear();
//    Html.Control.GroupList.Select.Cancel();
//    Html.Control.GroupList.Load(1, Property.PageSize, Property.Search);
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
    Html.Control.GroupList.Clear();
    Html.Control.GroupList.Select.Cancel();
    Html.Control.GroupList.Load(1, Property.PageSize, Property.Search);
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