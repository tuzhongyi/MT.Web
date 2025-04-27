var setting = {
    view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false,
        addDiyDom: addDiyDom,
        nameIsHTML: true,
        fontCss: setFontCss_ztree
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: ""
        }
    },
    callback: {
        //beforeClick: function (treeId, treeNode) {
        //    var zTree = $.fn.zTree.getZTreeObj("tree");
        //    if (treeNode.isParent) {
        //        zTree.expandNode(treeNode);
        //        return false;
        //    } else {
        //        demoIframe.attr("src", treeNode.file + ".html");
        //        return true;
        //    }
        //}
        onClick: function (event, treeId, treeNode) {
            var displayItem = GIS_Dispatch_Property.MapList.ItemList.displayValue.toArray();
            document.getElementById("div_right_window_status").style.display = "none";
            for (var i = 0; i < displayItem.length; i++) {
                GIS_Dispatch_Property.mapFrameHelper.DisableDragging(displayItem[i]);
                GIS_Dispatch_Property.mapFrameHelper.RemoveMarker(displayItem[i]);
            }
            GIS_Dispatch_Property.MapList.ItemList.displayValue = new Dictionary();
            var nodeId = treeNode.id;
            var mapId;
            if (GIS_Dispatch_Property.MapList.value[treeNode.id])
                mapId = treeNode.id;
            if (GIS_Dispatch_Property.MapList.LayerList.value[treeNode.id]) {
                mapId = GIS_Dispatch_Property.MapList.LayerList.value[treeNode.id].mapId;
            }
            var map = GIS_Dispatch_Property.MapList.value[mapId];
            var coordinate = new Object();
            if (map) {
                coordinate.lng = map.Longitude;
                coordinate.lat = map.Latitude;
            }
            if (GIS_Dispatch_Property.MapList.ItemList.value[treeNode.id]) {
                nodeId = GIS_Dispatch_Property.MapList.ItemList.value[treeNode.id].ParentLayerId;
                var item = GIS_Dispatch_Property.MapList.ItemList.value[treeNode.id];
                coordinate.lng = item.Longitude;
                coordinate.lat = item.Latitude;
                if (GIS_Dispatch_Html.EditMade == false) {
                    loadRightWindowStatus(item);
                    document.getElementById("div_right_window_status").style.display = "block";
                }
            }
            //var delArr = new Array();
            var delArr = GIS_Dispatch_Property.MapList.ItemList.value.toArray();
            var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
            //var node = treeObj.getNodeByParam("id", nodeId);
            //delArr = getAllTreeChildrenNodes(node, delArr);
            for (var i = 0; i < delArr.length; i++) {
                if (GIS_Dispatch_Property.MapList.ItemList.value[delArr[i].Id]) {
                    var disItem = GIS_Dispatch_Property.MapList.ItemList.value[delArr[i].Id];
                    if (GIS_Dispatch_Html.TreeDisplayType[GIS_Dispatch_Html.TreeDisplayIconTyep[disItem.IconType]]) {
                        var itemNode = treeObj.getNodeByParam("id", disItem.Id);
                        var pNode = itemNode.getParentNode();
                        //if (pNode && (GIS_Dispatch_Property.MapList.LayerList.value[pNode.id].Look == GIS_Dispatch_Html.LookType.All || GIS_Dispatch_Property.MapList.LayerList.value[pNode.id].Look == GIS_Dispatch_Html.LookType.Part)) {
                        if (disItem.Look == GIS_Dispatch_Html.LookType.All) {
                            GIS_Dispatch_Property.MapList.ItemList.displayValue[delArr[i].Id] = delArr[i].Id;
                            var rotation = 0;
                            if (disItem.Course)
                                rotation = disItem.Course;
                            var type = 0;
                            if (disItem.IconType)
                                type = disItem.IconType;
                            var name = "";
                            if (GIS_Dispatch_Html.isDisplayName)
                                name = disItem.Name;
                            var color = getColor(disItem);

                            var gcjCoordinate = wgs84togcj02(disItem.Longitude, disItem.Latitude);
                            var baiduCoordinate = gcj02tobd09(gcjCoordinate[0], gcjCoordinate[1]);

                            GIS_Dispatch_Property.mapFrameHelper.CreateMarker(disItem.Id, baiduCoordinate[0], baiduCoordinate[1], disItem.Name, 0, rotation, name, { "type": type });
                            GIS_Dispatch_Property.mapFrameHelper.SetMarkerColor(disItem.Id, color);
                            if (GIS_Dispatch_Html.EditMade == GIS_Dispatch_Html.EditType.Location)
                                GIS_Dispatch_Property.mapFrameHelper.EnableDragging(delArr[i].Id);
                        }
                        //}
                    }
                }
            }
            GIS_Dispatch_Property.mapFrameHelper.SetCenter(coordinate);
        }
    }
};

var GIS_Dispatch_Info = {
    ControlIdPrefix: {
        Add: "add_",
        Edit: "edit_",
        Remove: "remove_",
        Eye: "eye_",
        //获取ID
        getId: function (id, prefix) {
            return id.substr(prefix.length);
        }
    }
}

var GIS_Dispatch_Property = {
    mapFrameHelper: null,
    treeObj: null,
    MapList: {
        value: new Dictionary(),
        load: function (index, size) {
            var result = tryCatch(function () {
                return Client.Management().GIS.Map.List(index, size);
            });
            if (result && result.GISMap) {
                for (var i = 0; i < result.GISMap.length; i++) {
                    result.GISMap[i].LayerCount = 0;
                    result.GISMap[i].ItemCount = 0;
                    var layer = this.LayerList.load(result.GISMap[i].Id, null);
                    if (layer && layer.Page) {
                        result.GISMap[i].LayerCount = layer.Page.TotalRecordCount;
                    }
                    var item = this.ItemList.load(result.GISMap[i].Id, null);
                    if (item && item.Page) {
                        result.GISMap[i].ItemCount = item.Page.TotalRecordCount;
                    }
                    if (result.GISMap[i].LayerCount > 0) {
                        this.LayerList.loadAll(result.GISMap[i].Id, layer.GISMapLayer);
                    }
                    result.GISMap[i].Look = GIS_Dispatch_Html.LookType.All;
                    this.value[result.GISMap[i].Id] = result.GISMap[i];
                    //if (!this.value[result.GISMap[i].Id]["Selected"])
                    //    this.value[result.GISMap[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        ItemList: {
            displayValue: new Dictionary(),
            value: new Dictionary(),
            load: function (mapId, itemId, index, size, parentLayerId) {
                var result = tryCatch(function () {
                    return Client.Management().GIS.Map.Item.List(mapId, itemId, index, size, parentLayerId);
                });
                if (result && result.GISMapItem) {
                    for (var i = 0; i < result.GISMapItem.length; i++) {
                        result.GISMapItem[i].Look = GIS_Dispatch_Html.LookType.All;
                        this.value[result.GISMapItem[i].Id] = result.GISMapItem[i];
                        this.value[result.GISMapItem[i].Id].mapId = mapId;
                    }
                }
                return result;
            }
        },
        LayerList: {
            value: new Dictionary(),
            load: function (mapId, parentId, index, size) {
                var result = tryCatch(function () {
                    return Client.Management().GIS.Map.Layer.List(mapId, index, size, parentId);
                });
                if (result && result.GISMapLayer) {
                    for (var i = 0; i < result.GISMapLayer.length; i++) {
                        result.GISMapLayer[i].Look = GIS_Dispatch_Html.LookType.All;
                        this.value[result.GISMapLayer[i].Id] = result.GISMapLayer[i];
                        this.value[result.GISMapLayer[i].Id].mapId = mapId;
                    }
                }
                return result;
            },
            loadAll: function (mapId, layers) {
                for (var i = 0; i < layers.length; i++) {
                    GIS_Dispatch_Property.MapList.ItemList.load(mapId, null, null, null, layers[i].Id);
                    var layer = this.load(mapId, layers[i].Id);
                    if (layer && layer.Page && layer.Page.TotalRecordCount > 0) {
                        this.loadAll(mapId, layer.GISMapLayer);
                    }
                }
            }
        },
        Layer: {
            load: function (mapId, layerId) {
                return tryCatch(function () {
                    return Client.Management().GIS.Map.Layer.Get(mapId, layerId);
                });
            },
            create: function (mapId, layer) {
                return tryCatch(function () {
                    return Client.Management().GIS.Map.Layer.Create(mapId, layer);
                });
            },
            remove: function (mapId, layerId) {
                var result = tryCatch(function () {
                    return Client.Management().GIS.Map.Layer.Delete(mapId, layerId);
                });
                if (result) {
                    var delArr = new Array();
                    var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
                    var node = treeObj.getNodeByParam("id", layerId);
                    delArr = getAllTreeChildrenNodes(node, delArr);
                    delete GIS_Dispatch_Property.MapList.LayerList.value[layerId];
                    for (var i = 0; i < delArr.length; i++) {
                        if (GIS_Dispatch_Property.MapList.LayerList.value[delArr[i]]) {
                            delete GIS_Dispatch_Property.MapList.LayerList.value[delArr[i]];
                            continue;
                        }
                        if (GIS_Dispatch_Property.MapList.ItemList.value[delArr[i]]) {
                            GIS_Dispatch_Property.mapFrameHelper.RemoveMarker(delArr[i]);
                            delete GIS_Dispatch_Property.MapList.ItemList.value[delArr[i]];
                        }
                    }
                }
                return result;
            },
            set: function (mapId, layer) {
                return tryCatch(function () {
                    return Client.Management().GIS.Map.Layer.Set(mapId, layer);
                });
            }
        },
        MapItem: {
            load: function (mapId, itemId) {
                return tryCatch(function () {
                    return Client.Management().GIS.Map.Item.Get(mapId, itemId);
                });
            },
            create: function (mapId, item) {
                return tryCatch(function () {
                    return Client.Management().GIS.Map.Item.Create(mapId, item);
                });
            },
            remove: function (mapId, itemId) {
                var result = tryCatch(function () {
                    return Client.Management().GIS.Map.Item.Delete(mapId, itemId);
                });
                if (result) {
                    var pid = GIS_Dispatch_Property.MapList.ItemList.value[itemId].ComponentId;
                    if (GIS_Dispatch_Property.MapList.ItemList.value[itemId].IconType == 2) {
                        tryCatch(function () {
                            Client.Management().Device.Delete(pid);
                        });
                    }
                    delete GIS_Dispatch_Property.MapList.ItemList.value[itemId];
                }
                return result;
            },
            set: function (mapId, item) {
                return tryCatch(function () {
                    return Client.Management().GIS.Map.Item.Set(mapId, item);
                });
            }
        },
        get: function (id) {
            if (this.value)
                return this.value[id];
            return null;
        },
        remove: function (id) {
            var result = tryCatch(function () {
                return Client.Management().GIS.Map.Delete(id);
            });
            if (result) {
                delete GIS_Dispatch_Property.MapList.value[id];
                var delArr = new Array();
                var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
                var node = treeObj.getNodeByParam("id", id);
                delArr = getAllTreeChildrenNodes(node, delArr);
                for (var i = 0; i < delArr.length; i++) {
                    if (GIS_Dispatch_Property.MapList.LayerList.value[delArr[i]]) {
                        delete GIS_Dispatch_Property.MapList.LayerList.value[delArr[i]];
                        continue;
                    }
                    if (GIS_Dispatch_Property.MapList.ItemList.value[delArr[i]]) {
                        GIS_Dispatch_Property.mapFrameHelper.RemoveMarker(delArr[i]);
                        delete GIS_Dispatch_Property.MapList.ItemList.value[delArr[i]];
                    }
                }
            }
            return result;
        },
        batchRemove: function () {
            var count = 0;
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        this.remove(id); ++count;
                    } catch (e) { };
                }
            }
            return count;
        }
    }
}

var GIS_Dispatch_Html = {
    isDisplayName: false,
    isRealTimeRefresh: false,
    isAllNodeOpen: false,
    mapItemColor: {
        black: "black",
        blue: "blue",
        red: "red",
        purple: "purple",
    },
    StartDrawingMode: {
        Marker: "marker",
        Circle: "circle",
        Rectangle: "rectangle",
        Polygon: "polygon"
    },
    Pos: {
        Longitude: null,
        Latitude: null
    },
    EditMade: false,
    EditType: {
        Vehicle: "Vehicle",
        VideoInput: "VideoInput",
        IOInput: "IOInput",
        Person: "Person",
        Location: "Location"
    },
    TreeBtnCss: {
        Map: "tree_map",
        ItemDefault: "tree_item_default",
        ItemVehicle: "tree_item_vehicle",
        ItemPerson: "tree_item_person",
        ItemVideo: "tree_item_video_input",
        ItemAnnunciator: "tree_item_io_output",
        LayerDefault: "tree_layer_default",
        LayerVehicle: "tree_layer_vehicle",
        LayerPerson: "tree_layer_person",
        LayerVideo: "tree_layer_video_input",
        LayerAnnunciator: "tree_layer_io_output",
    },
    ItemIconTypeDisplay: {
        0: "未知",
        1: "车",
        2: "人",
        3: "摄像机",
        4: "报警器"
    },
    ItemIconType: {
        0: "ItemDefault",
        1: "ItemVehicle",
        2: "ItemPerson",
        3: "ItemVideo",
        4: "ItemAnnunciator"
    },
    LayerIconType: {
        0: "LayerDefault",
        1: "LayerVehicle",
        2: "LayerPerson",
        3: "LayerVideo",
        4: "LayerAnnunciator"
    },
    TreeDisplayIconTyep: {
        1: "vehicle",
        2: "person",
        3: "video",
        4: "annunciator"
    },
    TreeDisplayType: {
        vehicle: true,
        person: true,
        video: true,
        annunciator: true
    },
    ItemStatus: {
        fault: "orange",
        normal: "red",
        selected: "blue",
        offline: "gray",
        green: "green"
    },
    LookType: {
        All: "All",
        Part: "Part",
        None: "None",
    },
    getSelectId: function () {
        var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
        var selectedNodes = treeObj.getSelectedNodes();
        if (selectedNodes.length > 0) {
            return selectedNodes[0].id;
        }
        return null;
    },
    MapList: {
        createMap: function (map) {
            var mapId = GIS_Dispatch_Property.MapList.create(map);
            if (mapId) {
                GIS_Dispatch_Property.MapList.value[mapId] = map;
                var newNode = { name: map.Name, id: map.Id, pId: 0, iconSkin: GIS_Dispatch_Html.TreeBtnCss.Map };
                newNode = GIS_Dispatch_Property.treeObj.addNodes(null, newNode);
            }
        },
        createTree: function () {
            var treeTag = document.getElementById("treeGISMapList");
            treeTag.style.display = "none";
            GIS_Dispatch_Property.MapList.load();
            var json = this.createJson();
            var t = $("#treeGISMapList");
            t = $.fn.zTree.init(t, setting, json);
            var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
            var nodes = treeObj.getNodes();
            if (nodes.length > 0) {
                treeObj.selectNode(nodes[0]);
                treeObj.setting.callback.onClick(null, "treeGISMapList", nodes[0]);
            }
            treeObj.expandAll(true);
            treeObj.expandAll(false);
            setTimeout(function () {
                treeTag.style.display = "block";
            }, 500);
        },
        createJson: function () {
            var json = new Array();
            var maps = GIS_Dispatch_Property.MapList.value.toArray();
            for (var i = 0; i < maps.length; i++) {
                var item = new Object();
                item.id = maps[i].Id;
                item.pId = 0;
                item.name = maps[i].Name;
                item.iconSkin = GIS_Dispatch_Html.TreeBtnCss.Map;
                json.push(item);
            }
            var layers = GIS_Dispatch_Property.MapList.LayerList.value.toArray();
            for (var i = 0; i < layers.length; i++) {
                var item = new Object();
                item.id = layers[i].Id;
                item.pId = layers[i].mapId;
                var iconSkin = GIS_Dispatch_Html.TreeBtnCss.LayerDefault;
                if (layers[i].IconType)
                    iconSkin = GIS_Dispatch_Html.TreeBtnCss[GIS_Dispatch_Html.LayerIconType[layers[i].IconType]];
                item.iconSkin = iconSkin;
                if (layers[i].ParentLayerId)
                    item.pId = layers[i].ParentLayerId;
                item.name = layers[i].Name;
                json.push(item);
            }
            var items = GIS_Dispatch_Property.MapList.ItemList.value.toArray();
            for (var i = 0; i < items.length; i++) {
                var item = new Object();
                item.id = items[i].Id;
                item.pId = items[i].mapId;
                var iconSkin = GIS_Dispatch_Html.TreeBtnCss.ItemDefault;
                if (items[i].IconType)
                    iconSkin = GIS_Dispatch_Html.TreeBtnCss[GIS_Dispatch_Html.ItemIconType[items[i].IconType]];
                item.iconSkin = iconSkin;
                if (items[i].ParentLayerId)
                    item.pId = items[i].ParentLayerId;
                item.name = items[i].Name;
                json.push(item);

                var rotation = 0;
                if (items[i].Course)
                    rotation = items[i].Course;
                var type = 0;
                if (items[i].IconType)
                    type = items[i].IconType;
            }
            return json;
        },
        addItem: function (item, pId, iconSkin, type) {
            var parentZNode = null;
            if (type == "map")
                GIS_Dispatch_Property.MapList.value[item.Id] = item;
            if (type == "layer")
                GIS_Dispatch_Property.MapList.LayerList.value[item.Id] = item;
            if (type == "item")
                GIS_Dispatch_Property.MapList.ItemList.value[item.Id] = item;
            var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
            var newNode = { name: item.Name, id: item.Id, pId: pId, iconSkin: iconSkin };
            if (pId) {
                var parentZNode = treeObj.getNodeByParam("id", pId, null);
            }
            newNode = treeObj.addNodes(parentZNode, newNode);
            var node = treeObj.getNodeByParam("id", item.Id);
            if (type == "layer") {
                var parentNode = node.getParentNode();
                var parentNodeLookType = null;
                var css = null;
                if (GIS_Dispatch_Property.MapList.LayerList.value[parentNode.id]) {
                    if (GIS_Dispatch_Property.MapList.LayerList.value[parentNode.id].Look == GIS_Dispatch_Html.LookType.None) {
                        parentNodeLookType = GIS_Dispatch_Html.LookType.None;
                        css = "icon-eye-close";
                    }
                    else {
                        parentNodeLookType = GIS_Dispatch_Html.LookType.All;
                        css = "icon-eye-open";
                    }
                }
                if (GIS_Dispatch_Property.MapList.value[parentNode.id]) {
                    if (GIS_Dispatch_Property.MapList.value[parentNode.id].Look == GIS_Dispatch_Html.LookType.None) {
                        parentNodeLookType = GIS_Dispatch_Html.LookType.None;
                        css = "icon-eye-close";
                    }
                    else {
                        parentNodeLookType = GIS_Dispatch_Html.LookType.All;
                        css = "icon-eye-open";
                    }
                }
                GIS_Dispatch_Property.MapList.LayerList.value[item.Id].Look = parentNodeLookType;
                var btn = $("#eye_" + item.Id);
                btn.removeClass("icon-eye-open");
                btn.removeClass("howell-icon-helf-eye");
                btn.removeClass("icon-eye-close");
                if (css)
                    btn.addClass(css);

            }
            if (type != "item") {
                treeObj.selectNode(node);
                treeObj.setting.callback.onClick(null, "treeGISMapList", node);
            }
        },
        //createItem: function (id) {
        //    Trigger = document.createElement("a");
        //    if (GIS_Dispatch_Property.MapList.value[id]) {
        //        Trigger.href = "management/gis/map/layer/gis_map_layer_details.htm?mapId=" + id;
        //    }
        //    if (GIS_Dispatch_Property.MapList.LayerList.value[id]) {
        //        Trigger.href = "";
        //    }
        //    AlertWindow.Show(Trigger, -1);
        //},
        removeItem: function (id) {
            var result = null;
            var fn = null;
            var mapId = null;
            var pId = null;
            var txt = "";
            if (GIS_Dispatch_Property.MapList.value[id]) {
                mapId = id;
                fn = GIS_Dispatch_Property.MapList.remove;
                txt = "地图";
            }
            if (GIS_Dispatch_Property.MapList.LayerList.value[id]) {
                mapId = GIS_Dispatch_Property.MapList.LayerList.value[id].mapId;
                fn = GIS_Dispatch_Property.MapList.Layer.remove;
                txt = "图层";
            }
            if (GIS_Dispatch_Property.MapList.ItemList.value[id]) {
                mapId = GIS_Dispatch_Property.MapList.ItemList.value[id].mapId;
                fn = GIS_Dispatch_Property.MapList.MapItem.remove;
                txt = "地图项";
            }
            $.confirm({
                text: "确定要删除该" + txt + "吗？",
                okButton: "确定",
                cancelButton: "取消",
                confirm: function () {
                    result = fn(mapId, id);
                    if (result) {
                        var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
                        var node = treeObj.getNodeByParam("id", id);
                        var pNodes = new Array();
                        pNodes = getAllTreeParentNodes(node, pNodes);
                        pId = node.pId;
                        treeObj.removeNode(node);
                        if (pId) {
                            checkParentNodeLookType(pNodes);
                            var pNode = treeObj.getNodeByParam("id", pId);
                            treeObj.selectNode(pNode);
                            treeObj.setting.callback.onClick(null, "treeGISMapList", pNode);
                        }
                        //GIS_Dispatch_Property.mapFrameHelper.RemoveMarker(id);
                    }
                }
            });
        },
        changeItem: function (item, type) {
            var iconSkin = GIS_Dispatch_Html.TreeBtnCss.Map;
            if (type == "map") {
                GIS_Dispatch_Property.MapList.value[item.Id] = item;
            }
            if (type == "layer") {
                GIS_Dispatch_Property.MapList.LayerList.value[item.Id] = item;
                iconSkin = GIS_Dispatch_Html.TreeBtnCss.LayerDefault;
                if (item.IconType)
                    iconSkin = GIS_Dispatch_Html.TreeBtnCss[GIS_Dispatch_Html.LayerIconType[item.IconType]];
            }
            if (type == "item") {
                GIS_Dispatch_Property.MapList.ItemList.value[item.Id] = item;
                iconSkin = GIS_Dispatch_Html.TreeBtnCss.ItemDefault;
                if (item.IconType)
                    iconSkin = GIS_Dispatch_Html.TreeBtnCss[GIS_Dispatch_Html.ItemIconType[item.IconType]];
            }
            var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
            var node = treeObj.getNodeByParam("id", item.Id);
            node.name = item.Name;
            node.iconSkin = iconSkin;
            treeObj.updateNode(node);
            treeObj.selectNode(node);
            treeObj.setting.callback.onClick(null, "treeGISMapList", node);
        },
        editItem: function (id) {
            Trigger = document.createElement("a");
            if (GIS_Dispatch_Property.MapList.value[id]) {
                Trigger.href = "management/gis/map/gis_map_details.htm?mapId=" + id;
            }
            if (GIS_Dispatch_Property.MapList.LayerList.value[id]) {
                Trigger.href = "management/gis/map/layer/gis_map_layer_details.htm?mapId=" + GIS_Dispatch_Property.MapList.LayerList.value[id].mapId + "&layerId=" + id;
            }
            if (GIS_Dispatch_Property.MapList.ItemList.value[id]) {
                var mapId = GIS_Dispatch_Property.MapList.ItemList.value[id].mapId;
                var iconType = 0;
                if (GIS_Dispatch_Property.MapList.ItemList.value[id].IconType)
                    iconType = GIS_Dispatch_Property.MapList.ItemList.value[id].IconType;
                Trigger.href = "management/gis/map/item/gis_map_item_details.htm?mapId=" + mapId + "&iconType=" + iconType + "&itemId=" + id;
            }
            AlertWindow.Show(Trigger, -1);
        },
        Layer: {
            create: function (mapId, layer) {
                var id = GIS_Dispatch_Property.MapList.Layer.create(mapId, layer);
                if (id) {
                    layer.Id = id;
                    layer.mapId = mapId;
                    var pid = mapId;
                    if (layer.ParentLayerId)
                        pid = layer.ParentLayerId;
                    var iconSkin = GIS_Dispatch_Html.TreeBtnCss.LayerDefault;
                    if (layer.IconType)
                        iconSkin = GIS_Dispatch_Html.TreeBtnCss[GIS_Dispatch_Html.LayerIconType[layer.IconType]];
                    layer.Look = GIS_Dispatch_Html.LookType.All;
                    GIS_Dispatch_Html.MapList.addItem(layer, pid, iconSkin, "layer");
                }
            },
            set: function (mapId, layer) {
                var result = GIS_Dispatch_Property.MapList.Layer.set(mapId, layer);
                if (result) {
                    if (GIS_Dispatch_Property.MapList.LayerList.value[layer.Id]) {
                        layer.Look = GIS_Dispatch_Property.MapList.LayerList.value[layer.Id].Look ? GIS_Dispatch_Property.MapList.LayerList.value[layer.Id].Look : GIS_Dispatch_Html.LookType.All;
                    }
                    GIS_Dispatch_Html.MapList.changeItem(layer, "layer");
                }
            }
        },
        MapItem: {
            create: function (mapId, item) {
                var id = GIS_Dispatch_Property.MapList.MapItem.create(mapId, item);
                if (id) {
                    item.Id = id;
                    item.mapId = mapId;
                    var pid = mapId;
                    if (item.ParentLayerId)
                        pid = item.ParentLayerId;
                    var iconSkin = GIS_Dispatch_Html.TreeBtnCss.ItemDefault;
                    if (item.IconType)
                        iconSkin = GIS_Dispatch_Html.TreeBtnCss[GIS_Dispatch_Html.ItemIconType[item.IconType]];
                    GIS_Dispatch_Html.MapList.addItem(item, pid, iconSkin, "item");
                    var rotation = 0;
                    if (item.Course)
                        rotation = item.Course;
                    var type = 0;
                    if (item.IconType)
                        type = item.IconType;
                    //GIS_Dispatch_Property.mapFrameHelper.CreateMarker(item.Id, item.Longitude, item.Latitude, item.Name, 0, rotation, item.Name, { "type": type });
                    var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
                    var node = treeObj.getNodeByParam("id", item.Id);
                    if (!GIS_Dispatch_Html.TreeDisplayType[GIS_Dispatch_Html.TreeDisplayIconTyep[item.IconType]])
                        treeObj.hideNode(node);

                    if (GIS_Dispatch_Property.MapList.LayerList.value[item.ParentLayerId].Look == GIS_Dispatch_Html.LookType.None) {
                        item.Look = GIS_Dispatch_Html.LookType.None;
                    }
                    else {
                        item.Look = GIS_Dispatch_Html.LookType.All;
                    }
                    var nodes = treeObj.getSelectedNodes();
                    if (nodes.length > 0) {
                        treeObj.selectNode(nodes[0]);
                        treeObj.setting.callback.onClick(null, "treeGISMapList", nodes[0]);
                    }
                    GIS_Dispatch_Html.Pos.Latitude = null;
                    GIS_Dispatch_Html.Pos.Longitude = null;
                    GIS_Dispatch_Property.mapFrameHelper.StopDrawing();
                    GIS_Dispatch_Property.mapFrameHelper.StartDrawing(GIS_Dispatch_Html.StartDrawingMode.Marker);
                    $.confirm({
                        text: "布置成功",
                        okButton: "确定",
                        cancelButtonClass: "hide-tag",
                    });
                }
            },
            set: function (mapId, item) {
                var result = GIS_Dispatch_Property.MapList.MapItem.set(mapId, item);
                if (result) {
                    item.mapId = mapId;
                    GIS_Dispatch_Property.mapFrameHelper.RemoveMarker(item.Id);
                    var type = 0;
                    if (item.IconType)
                        type = item.IconType;
                    var rotation = 0;
                    if (item.Course)
                        rotation = item.Course;
                    var name = "";
                    if (GIS_Dispatch_Html.isDisplayName)
                        name = item.Name;
                    if (item.Look == GIS_Dispatch_Html.LookType.All) {
                        var color = getColor(item);
                        GIS_Dispatch_Property.mapFrameHelper.CreateMarker(item.Id, item.Longitude, item.Latitude, item.Name, 0, rotation, name, { "type": type });
                        GIS_Dispatch_Property.mapFrameHelper.SetMarkerColor(item.Id, color);
                    }
                    GIS_Dispatch_Html.MapList.changeItem(item, "item");
                    $.confirm({
                        text: "编辑成功",
                        okButton: "确定",
                        cancelButtonClass: "hide-tag",
                    });
                }
            }
        }
    }
}

function addGISMapClick(sender) {
    AlertWindow.Show(sender, -1);
    return false;
}

function addDiyDom(treeId, treeNode) {
    var aObj = $("#" + treeNode.tId + "_a");
    //if (!GIS_Dispatch_Property.MapList.ItemList.value[treeNode.id]) {
    //    var addBtn = "<a class='icon-plus-sign diy-tree-btn' id='" + GIS_Dispatch_Info.ControlIdPrefix.Add + treeNode.id
    //    + "' title='添加' onfocus='this.blur();'></a>"
    //    aObj.append(addBtn);
    //    var btnAdd = $("#" + GIS_Dispatch_Info.ControlIdPrefix.Add + treeNode.id);
    //    if (btnAdd) {
    //        btnAdd.bind("click", function () {
    //            GIS_Dispatch_Html.MapList.createItem(treeNode.id);
    //        });
    //    }
    //}
    var editBtn = "<a class='icon-edit diy-tree-btn' style='margin-left:20px !important' id='" + GIS_Dispatch_Info.ControlIdPrefix.Edit + treeNode.id
    + "' title='编辑' onfocus='this.blur();'></a>"
    aObj.append(editBtn);
    var btnEdit = $("#" + GIS_Dispatch_Info.ControlIdPrefix.Edit + treeNode.id);
    if (btnEdit) {
        btnEdit.bind("click", function () {
            GIS_Dispatch_Html.MapList.editItem(treeNode.id);
        });
    }
    var removeBtn = "<a class='icon-trash diy-tree-btn' id='" + GIS_Dispatch_Info.ControlIdPrefix.Remove + treeNode.id
    + "' title='删除' onfocus='this.blur();'></a>";
    aObj.append(removeBtn);
    var btnRemove = $("#" + GIS_Dispatch_Info.ControlIdPrefix.Remove + treeNode.id);
    if (btnRemove) {
        btnRemove.bind("click", function () {
            GIS_Dispatch_Html.MapList.removeItem(treeNode.id);
        });
    }

    if (GIS_Dispatch_Property.MapList.value[treeNode.id] || GIS_Dispatch_Property.MapList.LayerList.value[treeNode.id]) {
        var eyeBtn = "<a class='icon-eye-open diy-tree-btn' id='" + GIS_Dispatch_Info.ControlIdPrefix.Eye + treeNode.id
        + "' title='查看' onfocus='this.blur();'></a>";
        aObj.append(eyeBtn);
        var btnEye = $("#" + GIS_Dispatch_Info.ControlIdPrefix.Eye + treeNode.id);
        if (btnEye) {
            btnEye.bind("click", function () {
                var oldType = null;
                var currentType = null;
                var addCss = null;
                var pNodes = new Array();
                var cNodes = new Array();
                var node = $("#eye_" + treeNode.id);
                node.removeClass("icon-eye-open");
                node.removeClass("howell-icon-helf-eye");
                node.removeClass("icon-eye-close");
                if (GIS_Dispatch_Property.MapList.value[treeNode.id]) {
                    oldType = GIS_Dispatch_Property.MapList.value[treeNode.id].Look;
                }
                if (GIS_Dispatch_Property.MapList.LayerList.value[treeNode.id]) {
                    oldType = GIS_Dispatch_Property.MapList.LayerList.value[treeNode.id].Look;
                }
                if (oldType == GIS_Dispatch_Html.LookType.All || oldType == GIS_Dispatch_Html.LookType.Part) {
                    currentType = GIS_Dispatch_Html.LookType.None;
                    addCss = "icon-eye-close";
                }
                if (oldType == GIS_Dispatch_Html.LookType.None) {
                    currentType = GIS_Dispatch_Html.LookType.All;
                    addCss = "icon-eye-open";
                }
                if (addCss) {
                    node.addClass(addCss);
                }
                pNodes = getAllTreeParentNodes(treeNode, pNodes);
                cNodes = getAllTreeChildrenNodes(treeNode, cNodes);
                if (cNodes.length > 0) {
                    for (var i = 0; i < cNodes.length; i++) {
                        if (GIS_Dispatch_Property.MapList.LayerList.value[cNodes[i]]) {
                            var cNode = $("#eye_" + cNodes[i]);
                            cNode.removeClass("icon-eye-open");
                            cNode.removeClass("howell-icon-helf-eye");
                            cNode.removeClass("icon-eye-close");
                            if (addCss) {
                                cNode.addClass(addCss);
                            }
                            GIS_Dispatch_Property.MapList.LayerList.value[cNodes[i]].Look = currentType;
                        }
                        if (GIS_Dispatch_Property.MapList.ItemList.value[cNodes[i]]) {
                            GIS_Dispatch_Property.MapList.ItemList.value[cNodes[i]].Look = currentType;
                        }
                    }
                }
                if (GIS_Dispatch_Property.MapList.value[treeNode.id]) {
                    GIS_Dispatch_Property.MapList.value[treeNode.id].Look = currentType;
                }
                if (GIS_Dispatch_Property.MapList.LayerList.value[treeNode.id]) {
                    GIS_Dispatch_Property.MapList.LayerList.value[treeNode.id].Look = currentType;
                }
                if (pNodes.length > 0) {
                    var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList")
                    for (var i = 0; i < pNodes.length; i++) {
                        var p_cNodes = new Array();
                        p_cNodes = getAllTreeChildrenNodes(treeObj.getNodeByParam("id", pNodes[i]), p_cNodes);
                        var pNode = $("#eye_" + pNodes[i]);
                        pNode.removeClass("icon-eye-open");
                        pNode.removeClass("howell-icon-helf-eye");
                        pNode.removeClass("icon-eye-close");
                        if (p_cNodes.length > 0) {
                            var layerLength = 0;
                            var layerAllLength = 0;
                            for (var j = 0; j < p_cNodes.length; j++) {
                                layerLength++;
                                if (GIS_Dispatch_Property.MapList.LayerList.value[p_cNodes[j]]) {
                                    if (GIS_Dispatch_Property.MapList.LayerList.value[p_cNodes[j]].Look == GIS_Dispatch_Html.LookType.All) {
                                        layerAllLength++;
                                    }
                                }
                                if (GIS_Dispatch_Property.MapList.ItemList.value[p_cNodes[j]]) {
                                    if (GIS_Dispatch_Property.MapList.ItemList.value[p_cNodes[j]].Look == GIS_Dispatch_Html.LookType.All) {
                                        layerAllLength++;
                                    }
                                }
                            }
                            var pType = null;
                            var pCss = null;
                            if (layerLength == layerAllLength) {
                                pType = GIS_Dispatch_Html.LookType.All;
                                pCss = "icon-eye-open";
                            }
                            else if (layerAllLength == 0) {
                                pCss = "icon-eye-close";
                                pType = GIS_Dispatch_Html.LookType.None;
                            }
                            else if (layerLength > layerAllLength && layerAllLength > 0) {
                                pCss = "howell-icon-helf-eye";
                                pType = GIS_Dispatch_Html.LookType.Part;
                            }
                            if (pCss) {
                                pNode.addClass(pCss);
                            }
                            if (GIS_Dispatch_Property.MapList.value[pNodes[i]]) {
                                GIS_Dispatch_Property.MapList.value[pNodes[i]].Look = pType;
                            }
                            if (GIS_Dispatch_Property.MapList.LayerList.value[pNodes[i]]) {
                                GIS_Dispatch_Property.MapList.LayerList.value[pNodes[i]].Look = pType;
                            }
                        }
                    }
                }
            });
        };
    }
};


function addGISMapLayerClick() {
    var seletcId = GIS_Dispatch_Html.getSelectId();
    if (seletcId && (GIS_Dispatch_Property.MapList.value[seletcId] || GIS_Dispatch_Property.MapList.LayerList.value[seletcId])) {
        var mapId = "";
        var parentId = "";
        if (GIS_Dispatch_Property.MapList.value[seletcId])
            mapId = seletcId;
        if (GIS_Dispatch_Property.MapList.LayerList.value[seletcId]) {
            mapId = GIS_Dispatch_Property.MapList.LayerList.value[seletcId].mapId;
            parentId = seletcId;
        }
        Trigger = document.createElement("a");
        Trigger.href = "management/gis/map/layer/gis_map_layer_details.htm?update=20170620&mapId=" + mapId;
        if (parentId)
            Trigger.href = Trigger.href + "&parentId=" + parentId;
        AlertWindow.Show(Trigger, -1);
        return false
    }
    else {
        alertPrompt("请选择一张地图或者图层");
    }
}

function gis_dispatch_load() {
    document.title = "GIS地图布控";
    document.getElementById("ifrMap").src = "http://" + Client.Host + ":" + Client.OfflineMapPort;
    var urls = new Array();
    urls.push("http://" + Client.Host + ":" + Client.OfflineMapPort + "/js/OfflineMap.js?update=20170620");
    urls.push("http://" + Client.Host + ":" + Client.OfflineMapPort + "/js/CoordinateTransform.js");

    document.getElementById("ifrMap").onload = function () {
        loadScripts(urls, function () {
            GIS_Dispatch_Property.mapFrameHelper = new iFrameHelper("ifrMap");
            GIS_Dispatch_Property.mapFrameHelper.CreateProxy("proxy", "http://" + Client.Host + ":" + Client.ProxyPort + "/management/gis/proxy.htm");
            GIS_Dispatch_Property.treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
            //GIS_Dispatch_Property.mapFrameHelper.StartDrawing();
            MapEvent.getcenter = function (pos) {
                if (pos) {
                    getTag("txtLongitude").value = pos.lng;
                    getTag("txtLatitude").value = pos.lat;
                }
            }
            MapEvent.markercomplete = function (pos) {
                GIS_Dispatch_Html.Pos.Latitude = pos.lat;
                GIS_Dispatch_Html.Pos.Longitude = pos.lng;
                if (GIS_Dispatch_Html.EditMade == GIS_Dispatch_Html.EditType.Person) {
                    var seletcId = GIS_Dispatch_Html.getSelectId();
                    if (seletcId && (GIS_Dispatch_Property.MapList.LayerList.value[seletcId] || GIS_Dispatch_Property.MapList.ItemList.value[seletcId])) {
                        var mapId;
                        var parentId;
                        var name;
                        if (GIS_Dispatch_Property.MapList.ItemList.value[seletcId]) {
                            mapId = GIS_Dispatch_Property.MapList.ItemList.value[seletcId].mapId;
                            parentId = GIS_Dispatch_Property.MapList.ItemList.value[seletcId].ParentLayerId;
                            name = GIS_Dispatch_Property.MapList.LayerList.value[parentId].Name
                        }
                        if (GIS_Dispatch_Property.MapList.LayerList.value[seletcId]) {
                            mapId = GIS_Dispatch_Property.MapList.LayerList.value[seletcId].mapId;
                            parentId = seletcId;
                            name = GIS_Dispatch_Property.MapList.LayerList.value[seletcId].Name;
                        }
                        Trigger = document.createElement("a");
                        Trigger.href = "management/gis/map/item/gis_map_item_details.htm?iconType=2&mapId=" + mapId + "&parentId=" + parentId + "&longitude=" + GIS_Dispatch_Html.Pos.Longitude + "&componentName=" + name + "&latitude=" + GIS_Dispatch_Html.Pos.Latitude;
                        AlertWindow.Show(Trigger, -1);
                    }
                    else {
                        alertPrompt("请选择一张图层");
                        GIS_Dispatch_Property.mapFrameHelper.StopDrawing();
                        GIS_Dispatch_Property.mapFrameHelper.StartDrawing(GIS_Dispatch_Html.StartDrawingMode.Marker);
                    }
                }
            },
            MapEvent.draggingcomplete = function (obj) {
                var item = GIS_Dispatch_Property.MapList.ItemList.value[obj.id];
                if (item) {
                    item.Longitude = obj.point.lng;
                    item.Latitude = obj.point.lat;
                    var isSet = GIS_Dispatch_Property.MapList.MapItem.set(item.mapId, item);
                    if (isSet) {
                        GIS_Dispatch_Property.MapList.ItemList.value[obj.id].Longitude = obj.point.lng;
                        GIS_Dispatch_Property.MapList.ItemList.value[obj.id].Latitude = obj.point.lat;
                    }
                }
            },
            MapEvent.throwException = function (e) {
                $.confirm({
                    title: "报错了",
                    text: e,
                    okButton: "确定",
                    alert: true,
                    top: -1,
                });
            },
            MapEvent.markerclick = function (id) {
                if (GIS_Dispatch_Property.MapList.ItemList.value[id]) {
                    var item = GIS_Dispatch_Property.MapList.ItemList.value[id];
                    if (GIS_Dispatch_Html.EditMade == false) {
                        loadRightWindowStatus(item);
                        document.getElementById("div_right_window_status").style.display = "block";
                    }
                }
            },
            GIS_Dispatch_Html.MapList.createTree();
        });
    }
}

function alertPrompt(txt) {
    $.confirm({
        title: "",
        text: txt,
        okButton: "确定",
        alert: true,
        top: -1,
    });
}

function startDragging() {
    var items = GIS_Dispatch_Property.MapList.ItemList.value.toArray();
    for (var i = 0; i < items.length; i++) {
        GIS_Dispatch_Property.mapFrameHelper.EnableDragging(items[i].Id);
    }
}

function stopDragging() {
    var items = GIS_Dispatch_Property.MapList.ItemList.value.toArray();
    for (var i = 0; i < items.length; i++) {
        GIS_Dispatch_Property.mapFrameHelper.DisableDragging(items[i].Id);
    }
}

function addMapItemClick(sander, type) {
    document.getElementById("div_right_window_status").style.display = "none";
    if (GIS_Dispatch_Html.EditMade == GIS_Dispatch_Html.EditType.Location)
        stopDragging();
    GIS_Dispatch_Property.mapFrameHelper.StopDrawing();
    $(".gis-map-edit-btn").removeClass("btn-danger-outline");
    $(".gis-map-edit-btn").addClass("btn-primary-outline");
    var list = document.getElementById("div_right_window_list");
    list.innerHTML = "";
    list.style.display = "none";
    if (GIS_Dispatch_Html.EditMade == type) {
        GIS_Dispatch_Html.EditMade = false;
        GIS_Dispatch_Html.Pos.Latitude = null;
        GIS_Dispatch_Html.Pos.Longitude = null;
        return;
    }
    $(sander).removeClass("btn-primary-outline");
    $(sander).addClass("btn-danger-outline");
    GIS_Dispatch_Html.EditMade = type;
    var href = "";
    if (GIS_Dispatch_Html.EditMade == GIS_Dispatch_Html.EditType.Vehicle) {
        href = "management/gis/map/gis_map_vehicle.htm";
    }
    if (GIS_Dispatch_Html.EditMade == GIS_Dispatch_Html.EditType.VideoInput) {
        href = "management/gis/map/gis_map_videoinput.htm";
    }
    if (GIS_Dispatch_Html.EditMade == GIS_Dispatch_Html.EditType.IOInput) {
        href = "management/gis/map/gis_map_ioinput.htm";
    }

    if (GIS_Dispatch_Html.EditMade == GIS_Dispatch_Html.EditType.Location) {
        if (GIS_Dispatch_Html.isRealTimeRefresh) {
            GIS_Dispatch_Html.isRealTimeRefresh = false;
            $("#realTimeRefresh").removeClass("btn-danger-outline");
            $("#realTimeRefresh").addClass("btn-primary-outline");
            toClearInterval();
        }
        startDragging();
    }
    else {
        GIS_Dispatch_Property.mapFrameHelper.StartDrawing(GIS_Dispatch_Html.StartDrawingMode.Marker);
        if (GIS_Dispatch_Html.EditMade != GIS_Dispatch_Html.EditType.Person)
            showRightWindow(href);
    }
}

function showRightWindow(url) {
    var div = getTag("div_right_window_list");
    div.innerHTML = "\n ";
    var page = loadPage(url);
    $("#div_right_window_list").append($(page));
    //div.style.height = (sender.offsetTop - 140) + "px";
    div.style.display = "block";
}

function getAllTreeChildrenNodes(treeNode, arr) {
    if (treeNode.isParent) {
        var childrenNodes = treeNode.children;
        if (childrenNodes) {
            for (var i = 0; i < childrenNodes.length; i++) {
                arr.push(childrenNodes[i].id);
                getAllTreeChildrenNodes(childrenNodes[i], arr);
            }
        }
    }
    return arr;
}

function getAllTreeParentNodes(treeNode, arr) {
    var parentNode = treeNode.getParentNode();
    if (parentNode) {
        arr.push(parentNode.id);
        getAllTreeParentNodes(parentNode, arr);
    }
    return arr;
}

function switchTreeDisplay(sender, args) {
    $(sender.children[0]).removeClass("selected");
    GIS_Dispatch_Html.TreeDisplayType[args] = !GIS_Dispatch_Html.TreeDisplayType[args];
    if (GIS_Dispatch_Html.TreeDisplayType[args])
        $(sender.children[0]).addClass("selected");
    var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
    var node = treeObj.getNodes();
    var oldSelectedNodes = treeObj.getSelectedNodes();
    var oldSelectedNode = null;
    if (oldSelectedNodes.length > 0) {
        oldSelectedNode = oldSelectedNodes[0];
    }
    var allNodes = treeObj.transformToArray(node);
    for (var i = 0; i < allNodes.length; i++) {
        if (GIS_Dispatch_Property.MapList.ItemList.value[allNodes[i].id]) {
            var item = GIS_Dispatch_Property.MapList.ItemList.value[allNodes[i].id];
            if (GIS_Dispatch_Html.TreeDisplayType[GIS_Dispatch_Html.TreeDisplayIconTyep[item.IconType]])
                treeObj.showNode(allNodes[i]);
            else
                treeObj.hideNode(allNodes[i]);
        }
    }
    var loadNode = oldSelectedNode.getParentNode();
    var selectedNodes = treeObj.getSelectedNodes();
    if (selectedNodes.length > 0) {
        loadNode = selectedNodes[0];
    }
    if (loadNode) {
        treeObj.selectNode(loadNode);
        treeObj.setting.callback.onClick(null, "treeGISMapList", loadNode);
    }
}

/**
     * 展开树
     * @param treeId  
     */
function expand_ztree(treeId) {
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    treeObj.expandAll(true);
}

/**
 * 收起树：只展开根节点下的一级节点
 * @param treeId
 */
function close_ztree(treeId) {
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var nodes = treeObj.transformToArray(treeObj.getNodes());
    var nodeLength = nodes.length;
    for (var i = 0; i < nodeLength; i++) {
        if (nodes[i].id == '0') {
            //根节点：展开
            treeObj.expandNode(nodes[i], true, true, false);
        } else {
            //非根节点：收起
            treeObj.expandNode(nodes[i], false, true, false);
        }
    }
}

/**
 * 搜索树，高亮显示并展示【模糊匹配搜索条件的节点s】
 * @param treeId
 * @param searchConditionId 文本框的id
 */
function search_ztree(treeId, searchConditionId) {
    searchByFlag_ztree(treeId, searchConditionId, "");
}

/**
 * 搜索树，高亮显示并展示【模糊匹配搜索条件的节点s】
 * @param treeId
 * @param searchConditionId     搜索条件Id
 * @param flag                  需要高亮显示的节点标识
 */
function searchByFlag_ztree(treeId, searchConditionId, flag) {
    //<1>.搜索条件
    var searchCondition = $('#' + searchConditionId).val();
    //<2>.得到模糊匹配搜索条件的节点数组集合
    var highlightNodes = new Array();
    if (searchCondition != "") {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        highlightNodes = treeObj.getNodesByParamFuzzy("name", searchCondition, null);
    }
    //<3>.高亮显示并展示【指定节点s】
    highlightAndExpand_ztree(treeId, highlightNodes, flag);
}

/**
 * 高亮显示并展示【指定节点s】
 * @param treeId
 * @param highlightNodes 需要高亮显示的节点数组
 * @param flag           需要高亮显示的节点标识
 */
function highlightAndExpand_ztree(treeId, highlightNodes, flag) {
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    //<1>. 先把全部节点更新为普通样式
    var treeNodes = treeObj.transformToArray(treeObj.getNodes());
    for (var i = 0; i < treeNodes.length; i++) {
        treeNodes[i].highlight = false;
        treeObj.updateNode(treeNodes[i]);
    }
    //<2>.收起树, 只展开根节点下的一级节点
    //close_ztree(treeId);
    //<3>.把指定节点的样式更新为高亮显示，并展开
    if (highlightNodes != null) {
        for (var i = 0; i < highlightNodes.length; i++) {
            if (flag != null && flag != "") {
                if (highlightNodes[i].flag == flag) {
                    //高亮显示节点，并展开
                    highlightNodes[i].highlight = true;
                    treeObj.updateNode(highlightNodes[i]);
                    //高亮显示节点的父节点的父节点....直到根节点，并展示
                    var parentNode = highlightNodes[i].getParentNode();
                    var parentNodes = getParentNodes_ztree(treeId, parentNode);
                    treeObj.expandNode(parentNodes, true, false, true);
                    treeObj.expandNode(parentNode, true, false, true);
                }
            } else {
                //高亮显示节点，并展开
                highlightNodes[i].highlight = true;
                treeObj.updateNode(highlightNodes[i]);
                //高亮显示节点的父节点的父节点....直到根节点，并展示
                var parentNode = highlightNodes[i].getParentNode();
                var parentNodes = getParentNodes_ztree(treeId, parentNode);
                treeObj.expandNode(parentNodes, true, false, true);
                treeObj.expandNode(parentNode, true, false, true);
            }
        }
    }
}

/**
 * 递归得到指定节点的父节点的父节点....直到根节点
 */
function getParentNodes_ztree(treeId, node) {
    if (node != null) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var parentNode = node.getParentNode();
        return getParentNodes_ztree(treeId, parentNode);
    } else {
        return node;
    }
}

/**
 * 设置树节点字体样式
 */
function setFontCss_ztree(treeId, treeNode) {
    if (treeNode.id == 0) {
        //根节点
        return { color: "#333", "font-weight": "bold" };
    } else if (treeNode.isParent == false) {
        //叶子节点
        return (!!treeNode.highlight) ? { color: "#ff0000", "font-weight": "bold" } : { color: "#333", "font-weight": "normal" };
    } else {
        //父节点
        return (!!treeNode.highlight) ? { color: "#ff0000", "font-weight": "bold" } : { color: "#333", "font-weight": "normal" };
    }
}

function checkParentNodeLookType(pNodes) {
    if (pNodes.length > 0) {
        var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList")
        for (var i = 0; i < pNodes.length; i++) {
            var p_cNodes = new Array();
            p_cNodes = getAllTreeChildrenNodes(treeObj.getNodeByParam("id", pNodes[i]), p_cNodes);
            var pNode = $("#eye_" + pNodes[i]);
            pNode.removeClass("icon-eye-open");
            pNode.removeClass("howell-icon-helf-eye");
            pNode.removeClass("icon-eye-close");
            if (p_cNodes.length > 0) {
                var layerLength = 0;
                var layerAllLength = 0;
                for (var j = 0; j < p_cNodes.length; j++) {
                    layerLength++;
                    if (GIS_Dispatch_Property.MapList.LayerList.value[p_cNodes[j]]) {
                        if (GIS_Dispatch_Property.MapList.LayerList.value[p_cNodes[j]].Look == GIS_Dispatch_Html.LookType.All) {
                            layerAllLength++;
                        }
                    }
                    if (GIS_Dispatch_Property.MapList.ItemList.value[p_cNodes[j]]) {
                        if (GIS_Dispatch_Property.MapList.ItemList.value[p_cNodes[j]].Look == GIS_Dispatch_Html.LookType.All) {
                            layerAllLength++;
                        }
                    }
                }
                var pType = null;
                var pCss = null;
                if (layerLength == layerAllLength) {
                    pType = GIS_Dispatch_Html.LookType.All;
                    pCss = "icon-eye-open";
                }
                else if (layerAllLength == 0) {
                    pCss = "icon-eye-close";
                    pType = GIS_Dispatch_Html.LookType.None;
                }
                else if (layerLength > layerAllLength && layerAllLength > 0) {
                    pCss = "howell-icon-helf-eye";
                    pType = GIS_Dispatch_Html.LookType.Part;
                }
                if (pCss) {
                    pNode.addClass(pCss);
                }
                if (GIS_Dispatch_Property.MapList.value[pNodes[i]]) {
                    GIS_Dispatch_Property.MapList.value[pNodes[i]].Look = pType;
                }
                if (GIS_Dispatch_Property.MapList.LayerList.value[pNodes[i]]) {
                    GIS_Dispatch_Property.MapList.LayerList.value[pNodes[i]].Look = pType;
                }
            }
        }
    }
}

//function setMarkerColor(color) {
//    GIS_Dispatch_Property.mapFrameHelper.SetMarkerColor(color);
//    document.getElementById("divMarkerColor").style.backgroundColor = color;
//}

function loadRightWindowStatus(item) {
    var font = "div_right_window_status_";
    document.getElementById(font + "Name").innerText = item.Name ? item.Name : "N/A";
    var isOnline = "N/A";
    if (item.Online == true)
        isOnline = "在线";
    if (item.Online == false)
        isOnline = "离线";
    document.getElementById(font + "Online").innerText = isOnline;
    var iconType = "N/A";
    if (GIS_Dispatch_Html.ItemIconTypeDisplay[item.IconType])
        iconType = GIS_Dispatch_Html.ItemIconTypeDisplay[item.IconType];
    document.getElementById(font + "IconType").innerText = iconType;
    document.getElementById(font + "Longitude").innerText = item.Longitude ? item.Longitude : "N/A";
    document.getElementById(font + "Latitude").innerText = item.Latitude ? item.Latitude : "N/A";
    var speed = "N/A";
    if (item.SpeedSpecified) {
        if (item.Speed || item.Speed == 0) {
            speed = item.Speed + " km/h";
        }
    }
    document.getElementById(font + "Speed").innerText = speed;
    var course = "N/A";
    if (item.CourseSpecified) {
        if (item.Course || item.Course == 0) {
            course = item.Course + " °";
        }
    }
    document.getElementById(font + "Course").innerText = course;
    document.getElementById(font + "Status").innerText = item.Status ? item.Status : "N/A";

    var GPSName = "N/A";
    var GPSNameColor = "#666666"
    if (item.GPSId) {
        var GPS = null;
        try {
            GPS = Client.GPS().Device.Get(item.GPSId);
        }
        catch (e) {

        }
        if (GPS) {
            GPSName = GPS.Name;
            //if (item.GPSOnlineSpecified) {
            if (GPS.GPSStatus) {
                if (GPS.GPSStatus.IsOnline == true)
                    GPSNameColor = "#60c560";
                if (GPS.GPSStatus.IsOnline == false)
                    GPSNameColor = "#b94a48";
            }
            //}
        }
    }
    document.getElementById(font + "GPSId").innerText = GPSName;
    document.getElementById(font + "GPSId").style.color = GPSNameColor;

    var VehiclePlateName = "N/A";
    var VehiclePlateNameColor = "#666666"
    if (item.VehiclePlateId) {
        var VehiclePlate = null;
        try {
            VehiclePlate = Client.Vehicle().Device.Get(item.VehiclePlateId);
        }
        catch (e) {

        }
        if (VehiclePlate) {
            VehiclePlateName = VehiclePlate.Name;
            //if (item.VehiclePlateOnlineSpecified) {
            if (VehiclePlate.VehiclePlateDeviceStatus) {
                if (VehiclePlate.VehiclePlateDeviceStatus.IsOnline == true)
                    VehiclePlateNameColor = "#60c560";
                if (VehiclePlate.VehiclePlateDeviceStatus.IsOnline == false)
                    VehiclePlateNameColor = "#b94a48";
            }
            //}
        }
    }
    document.getElementById(font + "VehiclePlateId").innerText = VehiclePlateName;
    document.getElementById(font + "VehiclePlateId").style.color = VehiclePlateNameColor;

    var VideoInputName = "N/A";
    var VideoInputNameColor = "#666666"
    if (item.VideoInputChannelId) {
        var id = new Id(item.VideoInputChannelId);
        var deviceId = id.getDeviceId();
        var VideoInput = null;
        try {
            VideoInput = Client.Management().Device.Video.Input.Get(deviceId, item.VideoInputChannelId);
        }
        catch (e) {

        }
        if (VideoInput) {
            VideoInputName = VideoInput.Name;
            //if (item.VideoInputChannelOnlineSpecified) {
            if (VideoInput.IsOnline == true)
                VideoInputNameColor = "#60c560";
            if (VideoInput.IsOnline == false)
                VideoInputNameColor = "#b94a48";
            //}
        }
    }
    document.getElementById(font + "VideoInputChannelId").innerText = VideoInputName;
    document.getElementById(font + "VideoInputChannelId").style.color = VideoInputNameColor;

    document.getElementById(font + "Description").innerText = item.Description ? item.Description : "N/A";
    var time = "N/A";
    if (item.UpdatedTime) {
        time = Convert.ToDate(item.UpdatedTime).format("yyyy-MM-dd HH:mm:ss");
    }
    document.getElementById(font + "UpdatedTime").innerText = time;
}

function treeAllNodeOpen() {
    var treeObj = $.fn.zTree.getZTreeObj("treeGISMapList");
    var btn = document.getElementById("btnTreeAllNodeOpen");
    if (GIS_Dispatch_Html.isAllNodeOpen) {
        GIS_Dispatch_Html.isAllNodeOpen = false;
        btn.innerText = "全部展开";
        treeObj.expandAll(false);
    }
    else {
        GIS_Dispatch_Html.isAllNodeOpen = true;
        btn.innerText = "全部收起";
        treeObj.expandAll(true);
    }
}

function realTimeRefresh(sender) {
    $(sender).removeClass("btn-danger-outline");
    $(sender).removeClass("btn-primary-outline");
    if (GIS_Dispatch_Html.isRealTimeRefresh) {
        GIS_Dispatch_Html.isRealTimeRefresh = false;
        $(sender).addClass("btn-primary-outline");
        toClearInterval();
        return;
    }
    if (GIS_Dispatch_Html.EditMade == GIS_Dispatch_Html.EditType.Location) {
        GIS_Dispatch_Html.EditMade = false;
        stopDragging();
        $("#editItemLocation").removeClass("btn-danger-outline");
        $("#editItemLocation").addClass("btn-primary-outline");
    }
    GIS_Dispatch_Html.isRealTimeRefresh = true;
    $(sender).addClass("btn-danger-outline");
    toSetInterval(function () {
        var disIds = GIS_Dispatch_Property.MapList.ItemList.displayValue.toArray();
        for (var i = 0; i < disIds.length; i++) {
            if (GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]] && GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]].GPSId) {
                //var gps=Client.GPS().Device.Get(GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]].GPSId);
                var newItem = GIS_Dispatch_Property.MapList.MapItem.load(GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]].mapId, disIds[i]);
                if (newItem) {
                    newItem.Look = GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]].Look;
                    newItem.mapId = GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]].mapId;
                    GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]] = newItem;
                    var rotation = 0;
                    if (newItem.Course)
                        rotation = newItem.Course;
                    var name = "";
                    if (GIS_Dispatch_Html.isDisplayName)
                        name = newItem.Name;
                    var color = getColor(newItem);
                    var gcjCoordinate = wgs84togcj02(newItem.Longitude, newItem.Latitude);
                    var baiduCoordinate = gcj02tobd09(gcjCoordinate[0], gcjCoordinate[1]);
                    GIS_Dispatch_Property.mapFrameHelper.SetMarker(newItem.Id, baiduCoordinate[0], baiduCoordinate[1], rotation);
                    //alert(baiduCoordinate[0] + "," + baiduCoordinate[1])
                    GIS_Dispatch_Property.mapFrameHelper.SetMarkerColor(newItem.Id, color);
                }
                //if (gps.GPSStatus) {
                //    GIS_Dispatch_Property.mapFrameHelper.SetMarker(newItem.Id, gps.Longitude, gps.Latitude, gps.Course, GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]].Name);
                //}
            }
        }
    }, 10000);
}

function displayMapItemName(sender) {
    $(sender).removeClass("btn-danger-outline");
    $(sender).removeClass("btn-primary-outline");
    if (GIS_Dispatch_Html.isDisplayName) {
        GIS_Dispatch_Html.isDisplayName = false;
        $(sender).addClass("btn-primary-outline");
    }
    else {
        GIS_Dispatch_Html.isDisplayName = true;
        $(sender).addClass("btn-danger-outline");
    }
    var disIds = GIS_Dispatch_Property.MapList.ItemList.displayValue.toArray();
    for (var i = 0; i < disIds.length; i++) {
        if (GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]]) {
            var item = GIS_Dispatch_Property.MapList.ItemList.value[disIds[i]];
            //var rotation = 0;
            //if (item.Course)
            //    rotation = item.Course;
            var name = "";
            if (GIS_Dispatch_Html.isDisplayName)
                name = item.Name;
            //var color = getColor(item);
            //GIS_Dispatch_Property.mapFrameHelper.SetMarker(item.Id, item.Longitude, item.Latitude, rotation);
            //GIS_Dispatch_Property.mapFrameHelper.SetMarkerColor(item.Id, color);
            GIS_Dispatch_Property.mapFrameHelper.SetMarkerTitle(item.Id, name);
        }
    }
}

function getColor(item) {
    //var color;
    //var bindCount = 0;
    //var inlineCount = 0;
    //if (item.GPSId) {
    //    var GPS = null;
    //    try {
    //        GPS = Client.GPS().Device.Get(item.GPSId);
    //    }
    //    catch (e) {

    //    }
    //    if (GPS) {
    //        bindCount++;
    //        if (GPS.GPSStatus && GPS.GPSStatus.IsOnline) {
    //            inlineCount++;
    //        }
    //    }
    //}
    //if (item.VehiclePlateId) {
    //    var vehiclePlateDevice = null;
    //    try {
    //        vehiclePlateDevice = Client.Vehicle().Device.Get(item.VehiclePlateId);
    //    }
    //    catch (e) {

    //    }
    //    if (vehiclePlateDevice) {
    //        bindCount++;
    //        if (vehiclePlateDevice.VehiclePlateDeviceStatus && vehiclePlateDevice.VehiclePlateDeviceStatus.IsOnline) {
    //            inlineCount++;
    //        }
    //    }
    //}
    //if (item.IconType != 3) {
    //    if (item.VideoInputChannelId) {
    //        var VideoInputChannel = null;
    //        var id = new Id(item.VideoInputChannelId);
    //        var deviceId = id.getDeviceId();
    //        try {
    //            VideoInputChannel = Client.Management().Device.Video.Input.Get(deviceId, item.VideoInputChannelId);
    //        }
    //        catch (e) {

    //        }
    //        if (VideoInputChannel) {
    //            bindCount++;
    //            if (VideoInputChannel.IsOnline) {
    //                inlineCount++;
    //            }
    //        }
    //    }
    //}
    //if (bindCount == 0) {
    //    color = GIS_Dispatch_Html.ItemStatus.normal;
    //}
    //else if (bindCount > 0) {
    //    if (bindCount == inlineCount) {
    //        color = GIS_Dispatch_Html.ItemStatus.normal;
    //    }
    //    else if (inlineCount == 0) {
    //        color = GIS_Dispatch_Html.ItemStatus.offline;
    //    }
    //    else if (inlineCount > 0 && bindCount > inlineCount) {
    //        color = GIS_Dispatch_Html.ItemStatus.fault;
    //    }
    //}
    //return color;
    var color;
    var bindCount = 0;
    var inlineCount = 0;
    if (item.GPSId) {
        var GPS = null;
        try {
            GPS = Client.GPS().Device.Get(item.GPSId);
        }
        catch (e) {

        }
        if (GPS) {
            bindCount++;
            if (GPS.GPSStatus && GPS.GPSStatus.IsOnline) {
                inlineCount++;
            }
        }
    }
    if (item.VehiclePlateId) {
        var vehiclePlateDevice = null;
        try {
            vehiclePlateDevice = Client.Vehicle().Device.Get(item.VehiclePlateId);
        }
        catch (e) {

        }
        if (vehiclePlateDevice) {
            bindCount++;
            if (vehiclePlateDevice.VehiclePlateDeviceStatus && vehiclePlateDevice.VehiclePlateDeviceStatus.IsOnline) {
                inlineCount++;
            }
        }
    }
    if (item.VideoInputChannelId) {
        var VideoInputChannel = null;
        var id = new Id(item.VideoInputChannelId);
        var deviceId = id.getDeviceId();
        try {
            VideoInputChannel = Client.Management().Device.Video.Input.Get(deviceId, item.VideoInputChannelId);
        }
        catch (e) {

        }
        if (VideoInputChannel) {
            bindCount++;
            if (VideoInputChannel.IsOnline) {
                inlineCount++;
            }
        }
    }
    if (bindCount == 0) {
        color = GIS_Dispatch_Html.ItemStatus.normal;
    }
    else if (bindCount > 0) {
        if (bindCount == inlineCount) {
            color = GIS_Dispatch_Html.ItemStatus.normal;
        }
        else if (inlineCount == 0) {
            color = GIS_Dispatch_Html.ItemStatus.offline;
        }
        else if (inlineCount > 0 && bindCount > inlineCount) {
            color = GIS_Dispatch_Html.ItemStatus.offline;
        }
    }
    return color;
}