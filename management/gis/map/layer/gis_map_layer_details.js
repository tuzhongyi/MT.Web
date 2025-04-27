var gisMapLayerDetailsId = null;
var gisMapLayerMapId = null;
var gisMapLayerParentId = "";
var gisMapLayerDetailsObj = null;
function gis_map_layer_details_load() {
    var uri = new Uri(Trigger.href);
    if (uri.Querys && uri.Querys.mapId) {
        gisMapLayerMapId = uri.Querys.mapId;
        if (uri.Querys.layerId) {
            gisMapLayerDetailsId = uri.Querys.layerId;
            document.getElementById("divId").style.display = "block";
            document.getElementById("lblGISMapLayerDetailsTitle").innerText = "修改图层";
            GISMapLayerDetailsLoad();
        }
        if (uri.Querys.parentId)
            gisMapLayerParentId = uri.Querys.parentId;
    }
}

function GISMapLayerDetailsLoad() {
    gisMapLayerDetailsObj = GIS_Dispatch_Property.MapList.Layer.load(gisMapLayerMapId, gisMapLayerDetailsId);
    gisMapLayerDetailsObj.mapId = gisMapLayerMapId;
    document.getElementById("txtId").value = gisMapLayerDetailsObj.Id;
    document.getElementById("txtName").value = gisMapLayerDetailsObj.Name;
    document.getElementById("ddlIconType").value = gisMapLayerDetailsObj.IconType;
    document.getElementById("txtDescription").value = gisMapLayerDetailsObj.Description;
}

function btnAddGISMapLayers_Click(sender, args) {
    var layer = new GISMapLayer();
    var fn = GIS_Dispatch_Html.MapList.Layer.create;
    if (gisMapLayerDetailsObj) {
        layer = gisMapLayerDetailsObj;
        fn = GIS_Dispatch_Html.MapList.Layer.set;
    }
    else {
        if (gisMapLayerParentId) {
            layer.ParentLayerId = gisMapLayerParentId;
            layer.ParentLayerIdSpecified = true;
        }
    }

    layer.Name = document.getElementById("txtName").value;
    layer.IconType = parseInt(document.getElementById("ddlIconType").value);
    layer.Description = document.getElementById("txtDescription").value;
    layer.IconTypeSpecified = true;
    if (document.getElementById("txtDescription").value)
        layer.DescriptionSpecified = true;

    fn(gisMapLayerMapId, layer);
    AlertWindow.Close();
    return false;
}