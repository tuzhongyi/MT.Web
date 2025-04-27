if (!this.Client)
    imported.loadJS("/js/client/client.js");

GIS_Dispatch_Property["Map"] = {
    value: null,
    load: function (id) {
        var map = tryCatch(function () {
            return Client.Management().GIS.Map.Get(id);
        });
        if (map) {
            this.value = map
            if (GIS_Dispatch_Property.MapList.value[id]) {
                if (GIS_Dispatch_Property.MapList.value[id].Look)
                    this.value.Look = GIS_Dispatch_Property.MapList.value[id].Look;
                else
                    this.value.Look = GIS_Dispatch_Html.LookType.All;
            }
        }
        return this.value;
    },
    create: function (map) {
        return tryCatch(function () {
            return Client.Management().GIS.Map.Create(map);
        });
    },
    modify: function (map) {
        return tryCatch(function () {
            return Client.Management().GIS.Map.Set(map);
        });
    }
}

GIS_Dispatch_Html["AlertWindow"] = {
    load: function (id) {
        var result = GIS_Dispatch_Property.Map.load(id);
        this.Id.set(result.Id);
        this.Name.set(result.Name);
        this.Longitude.set(result.Longitude);
        this.Latitude.set(result.Latitude);
        this.Description.set(result.Description);
    },
    create: function (map) {
        var id = GIS_Dispatch_Property.Map.create(map);
        AlertWindow.Close();
        if (id) {
            map.Id = id;
            map.Look = GIS_Dispatch_Html.LookType.All;
            GIS_Dispatch_Html.MapList.addItem(map, 0, GIS_Dispatch_Html.TreeBtnCss.Map, "map");
        }
    },
    modify: function (map) {
        var result = GIS_Dispatch_Property.Map.modify(map);
        AlertWindow.Close();
        if (result)
            GIS_Dispatch_Html.MapList.changeItem(map, "map");
    },
    IsModify:
    {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("lblGISMapDetailTitle").innerText = value ? "设置GIS地图" : "创建GIS地图";
            this.value = value;
        }
    },
    Id: {
        set: function (value) {
            getTag("txtId").value = value;
        }
    },
    Name: {
        set: function (value) {
            getTag("txtName").value = value;
        }
    },
    Longitude: {
        set: function (value) {
            getTag("txtLongitude").value = value;
        }
    },
    Latitude: {
        set: function (value) {
            getTag("txtLatitude").value = value;
        }
    },
    Description: {
        set: function (value) {
            getTag("txtDescription").value = value;
        }
    }
}