function GroupListItem_SelectAll(args) {
    Html.Control.GroupList.Select.All();
};
function GroupListItem_Cancel(sender, args) {
    Html.Control.GroupList.Select.Cancel();
};
PageEvent.Device.IO.Output.GroupListItemRemoveButtonClick = function (sender, args) {
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
function batchRemoveIOOutputs_Click(sender, args) {
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
function editIOOutput_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
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