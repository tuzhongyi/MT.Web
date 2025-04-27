var gisMapLayerList = GIS_Map_Html.Control.PopoverWindow.LayerList;
//Association

//用户选择事件
function GISMapLayer_Selected(sender, args) {
    tryCatch(function () {
        var id = GIS_Map_Info.ControlIdPrefix.getId(sender.id, GIS_Map_Info.ControlIdPrefix.Layer.list);
        gisMapLayerList.select(id);
    });
}

//删除单个用户
function GroupListItem_GISMapRemoveLayer_Click(sender, args) {
    stopPropagation();
    tryCatch(function () {
        var id = GIS_Map_Info.ControlIdPrefix.getId(sender.id, GIS_Map_Info.ControlIdPrefix.Layer.remove);
        $.confirm({
            text: "确认要删除这个图层吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                gisMapLayerList.remove(id);
            }
        });
    });
}

//已绑定用户页面改变事件
function GISMapLayer_PageChange(index) {
    gisMapLayerList.clear();
    gisMapLayerList.load(index);
}
//删除单个用户关联事件
function btn_gis_map_layer_batch_remove_Click(sender, args) {
    if (gisMapLayerList.selected.length == 0)
        return;
    $.confirm({
        text: "确认要删除选中的图层吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            gisMapLayerList.batchRemove();
        }
    });
}
//已绑定的用户当前页全部选中事件
function LayerAssociationGISMap_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = GIS_Map_Info.ControlIdPrefix.getId(items[i].id, GIS_Map_Info.ControlIdPrefix.Layer.list);
        if (gisMapLayerList.selected.indexOf(id) < 0)
            gisMapLayerList.selected.push(id);
    }
    gisMapLayerList.selectAll();
}
//已绑定的用户当前页全部选择取消事件
function LayerAssociationGISMap_SelectedCancel(items) {
    gisMapLayerList.selected = new Array();
}
function LayerAssociationGISMap_SelectedInverse() {
    gisMapLayerList.selectInverse();
}
function LayerAssociationGISMap_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = GIS_Map_Info.ControlIdPrefix.getId(items[i].id, GIS_Map_Info.ControlIdPrefix.Layer.list);
        if (gisMapLayerList.selected.indexOf(id) < 0)
            gisMapLayerList.selected.push(id);
    }
}
//全部删除
function RemoveAllGISMapLayer_Click(sender, args) {
    tryCatch(function () {
        $.confirm({
            text: "确定要删除所有图层吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                gisMapLayerList.removeAll();
                gisMapLayerList.clear();
                gisMapLayerList.load(1);
            }
        });
    });
}

function btn_add_map_layers_Click(sender) {
    AlertWindow.Show(sender, -1);
    return false;
}