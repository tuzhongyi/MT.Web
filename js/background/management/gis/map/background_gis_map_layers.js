if (!this.Client)
    imported.loadJS("js/client/client.js");
GIS_Map_Property["LayerList"] =
{
    mapId: null,
    parentLayerId: null,
    value: new Object(),
    page: new Page(),
    tableSize: 12,
    loadSingle: function (mapId, layerId) {
        return Client.Management().GIS.Map.Layer.Get(mapId, layerId);
    },
    load: function (mapId, index, size, parentLayerId) {
        var response = tryCatch(function () {
            return Client.Management().GIS.Map.Layer.List(mapId, index, size, parentLayerId)
        });
        var result = new Object();
        if (response) {
            if (response.Device) {
                for (var i = 0; i < response.Device.length; i++) {
                    if (this.value[response.Device[i].Id])
                        response.Device[i]["Selected"] = this.value[response.Device[i].Id].Selected;
                    this.value[response.Device[i].Id] = response.Device[i];
                    result[response.Device[i].Id] = this.value[response.Device[i].Id];
                }
            }
            this.page = response.Page;
        }
        return result;
    },
    create: function (mapId, layer) {
        return tryCatch(function () {
            return Client.Management().GIS.Map.Layer.Create(mapId, layer);
        });
    },
    set: function (mapId, layer) {
        return tryCatch(function () {
            return Client.Management().GIS.Map.Layer.Set(mapId, layer);
        });
    },
    remove: function (mapId, layerId) {
        var result = tryCatch(function () {
            return Client.Management().GIS.Map.Layer.Delete(mapId, layerId);
        })
        //if (result)
        //    delete this.value[mediumId];
    },
    batchRemove: function (mapId) {
        var count = 0;
        for (var id in this.value) {
            if (this.value[id].Selected) {
                try {
                    this.remove(mapId, id); ++count;
                } catch (e) { }
            }
        }
        return count;
    },
}

GIS_Map_Html.Control.PopoverWindow["LayerList"] = {
    selected: new Array(),
    select: function (id) {
        var index = this.selected.indexOf(id);
        if (index < 0)
            this.selected.push(id);
        else
            this.selected.splice(index, 1);
    },
    selectAll: function () {
        GIS_Map_Property.LayerList.load(GIS_Map_Property.LayerList.mapId);
        for (var uid in GIS_Map_Property.LayerList.value) {
            if (gisMapLayerList.selected.indexOf(uid) < 0)
                gisMapLayerList.selected.push(uid);
        }
    },
    selectInverse: function () {
        GIS_Map_Property.LayerList.load(GIS_Map_Property.LayerList.mapId);
        for (var uid in GIS_Map_Property.LayerList.value) {
            var tag = getTag(Platform_Info.ControlIdPrefix.Device.list + uid);
            var index = gisMapLayerList.selected.indexOf(uid);
            if (!tag && index < 0)
                gisMapLayerList.selected.push(uid);
            if (!tag && index >= 0)
                gisMapLayerList.selected.splice(index, 1);
        }
    },
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_platform_device_count").innerText = value;
            this.value = value;
        }
    },
    createItem: function (device) {
        var createCoontrol = {
            icon: function (device) {
                var name = device.Name;
                var btn = new IconButton("", "howell-icon-device", 0, name);
                btn.title = name;
                return btn;
            },
            OperationButton: function (device) {
                var a = document.createElement("a");
                a.className = "icon-trash pull-right";
                a.setAttribute("onclick", "GroupListItem_PlatformRemoveDevice_Click(this, '" + device.Id + "')");
                a.id = Platform_Info.ControlIdPrefix.Device.remove + device.Id;
                a.title = "删除";
                return a;
            },
        };
        var item = null;

        item = new GroupListItem(Platform_Info.ControlIdPrefix.Device.list, eval("PlatformDevice_Selected"));
        item.id = Platform_Info.ControlIdPrefix.Device.list + device.Id;
        item.Content.appendChild(createCoontrol.OperationButton(device));

        item.className += " mouse_pointer";
        if (GIS_Map_Html.Control.PopoverWindow.LayerList.selected.indexOf(device.Id) >= 0)
            item.className += " selected";

        item.Content.appendChild(createCoontrol.icon(device));

        item.Content.className = "childpage-list-item-content";

        return item;
    },
    createItems: function (devices) {
        var items = new GroupListItemArray();
        if (devices) {
            for (var i = 0; i < devices.length; i++) {
                items.push(this.createItem(devices[i]));
            }
        }
        return items;
    },
    createItemsByObj: function (obj) {
        if (obj) {
            var array = new Array();
            for (var id in obj) {
                array.push(obj[id]);
            }
            if (array.length > 0)
                return this.createItems(array);
        }
        return null;
    },
    clear: function () {
        getTag("glist_platform_devices").innerText = "";
        getTag("div_platform_device_paging").innerText = "";
        this.totalCount.set(0);
    },
    list: function () {
        return GIS_Map_Property.LayerList.value;
    },
    load: function (index) {
        var result = GIS_Map_Property.LayerList.load(GIS_Map_Property.LayerList.mapId, index, GIS_Map_Html.Control.PopoverWindow.PageSize);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_platform_devices").appendChild(glist);
            var page = GIS_Map_Property.LayerList.page;

            pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("PlatformDevice_PageChange"));
            getTag("div_platform_device_paging").appendChild(pagination);
        }
        this.totalCount.set(GIS_Map_Property.LayerList.page.TotalRecordCount);
        PageEvent.Platform.GroupListDeviceIconButtonChanged(GIS_Map_Property.LayerList.mapId, GIS_Map_Property.LayerList.page.TotalRecordCount);
    },
    remove: function (deviceId) {
        GIS_Map_Property.LayerList.remove(GIS_Map_Property.LayerList.mapId, deviceId);
        this.clear();

        if (GIS_Map_Property.LayerList.page.RecordCount == 1 && GIS_Map_Property.LayerList.page.PageIndex == GIS_Map_Property.LayerList.page.PageCount &&
            GIS_Map_Property.LayerList.page.PageIndex != 1)
            --GIS_Map_Property.LayerList.page.PageIndex;

        this.load(GIS_Map_Property.LayerList.page.PageIndex);
        this.totalCount.set(GIS_Map_Property.LayerList.page.TotalRecordCount);

        var index = this.selected.indexOf(deviceId);
        if (index >= 0)
            this.selected.splice(index, 1);
    },
    batchRemove: function () {
        var count = 0;
        for (var i = 0; i < this.selected.length; i++) {
            GIS_Map_Property.LayerList.remove(GIS_Map_Property.LayerList.mapId, this.selected[i]);
            ++count;
        }
        this.totalCount.set(GIS_Map_Property.LayerList.page.TotalRecordCount);
        this.selected = new Array();

        if (count == GIS_Map_Property.LayerList.page.RecordCount && GIS_Map_Property.LayerList.page.PageIndex == GIS_Map_Property.LayerList.page.PageCount &&
            GIS_Map_Property.LayerList.page.PageIndex != 1)
            --GIS_Map_Property.LayerList.page.PageIndex;

        GIS_Map_Html.Control.PopoverWindow.LayerList.clear();
        GIS_Map_Html.Control.PopoverWindow.LayerList.load(GIS_Map_Property.LayerList.page.PageIndex);
    },
    removeAll: function () {
        var count = 0;
        var platformId = GIS_Map_Property.LayerList.mapId;
        for (var id in GIS_Map_Property.LayerList.value) {
            count += Try(function () {
                GIS_Map_Property.LayerList.remove(platformId, id);
                return 1;
            }, 0);
        }
        if (GIS_Map_Property.LayerList.page.TotalRecordCount != count) {
            GIS_Map_Property.LayerList.load(platformId, 1, GIS_Map_Property.LayerList.page.TotalRecordCount);
            for (var id in GIS_Map_Property.LayerList.value) {
                count += Try(function () {
                    GIS_Map_Property.LayerList.remove(platformId, id);
                    return 1;
                }, 0);
            }
        }
        return count;
    },
};

