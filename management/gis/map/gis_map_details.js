function gis_map_item_load() {
    tryCatch(function () {
        var id = null;
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.mapId)
            id = uri.Querys.mapId;
        if (id) {
            GIS_Dispatch_Html.AlertWindow.load(id);
            GIS_Dispatch_Html.AlertWindow.IsModify.set(true);
        }
        else {
            GIS_Dispatch_Html.AlertWindow.IsModify.set(false);
            getTag("divId").style.display = "none";
            try {
                GIS_Dispatch_Property.mapFrameHelper.GetCenter();
            }
            catch (e) {

            }
        }
    });
}

function btnDetailGISMap_Click(sender, args) {
    var map = new GISMap();
    if (GIS_Dispatch_Property.Map.value)
        map = GIS_Dispatch_Property.Map.value;
    //map.Id = GIS_Dispatch_Html.Current.Id.get();
    map.Name = getTag("txtName").value;
    map.Longitude = getTag("txtLongitude").value;
    map.Latitude = getTag("txtLatitude").value;
    map.Description = getTag("txtDescription").value;
    map.DescriptionSpecified = true;

    if (GIS_Dispatch_Html.AlertWindow.IsModify.get())
        GIS_Dispatch_Html.AlertWindow.modify(map);
    else
        GIS_Dispatch_Html.AlertWindow.create(map);
    return false;
}