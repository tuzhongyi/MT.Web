function gis_map_list_load() {
    document.title = "GIS地图信息";
    var win = new AlertWindow("", "<a class='btn btn-xs btn-primary-outline pull-right div-xsgroup' style='font-size:14px;padding-left:14px;'><i class='icon-plus'></i></a>", "management/gis/map/gis_map_details.htm", -1);
    document.getElementById("btn-addGISMap").appendChild(win);

    GIS_Map_Html.Control.GroupList.create();

    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
}

//列表项单击事件
function GIS_Map_GrouplistItem_Click(sender, args) {
    tryCatch(function () {
        var id = GIS_Map_Info.ControlIdPrefix.getId(sender.id, GIS_Map_Info.ControlIdPrefix.GroupListItem);
        GIS_Map_Html.Control.GroupList.select(id);
    })
};
function GIS_Map_GroupListItem_SelectAll(args) {
    GIS_Map_GroupListItem_Cancel();
    for (var i = 0; i < args.length; i++) {
        var id = GIS_Map_Info.ControlIdPrefix.getId(args[i].id, GIS_Map_Info.ControlIdPrefix.GroupListItem);
        GIS_Map_Property.MapList.value[id].Selected = true;
    }
    GIS_Map_Html.Control.GroupList.selectedCount = args.length;
};
function GIS_Map_GroupListItem_Cancel() {
    for (var key in GIS_Map_Property.MapList.value) {
        GIS_Map_Property.MapList.value[key].Selected = false;
    }
    GIS_Map_Html.Control.GroupList.selectedCount = 0;
};
function removeGIS_Map_Click(sender, args) {
    var id = args;
    stopPropagation();
    $.confirm({
        text: "确定要删除这个平台吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            GIS_Map_Html.Control.GroupList.remove(id)
        }
    });
}
function batchRemoveGIS_Maps_Click(sender, args) {
    if (GIS_Map_Html.Control.GroupList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要删除所有选中的平台吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            GIS_Map_Html.Control.GroupList.batchRemove();
        }
    });
}
function editGIS_Map_Click(sender, args) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        GIS_Map_Html.Control.GroupList.load(index + 1, GIS_Map_Property.PageSize);
    });
}