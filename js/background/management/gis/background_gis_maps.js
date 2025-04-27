/// <reference path="../../language/chinese.js" />
/// <reference path="../../client/enum.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var GIS_Map_Info =
{
    ControlIdPrefix:
    {
        GroupListItem: "group_",
        AlertWindow: "alert_",
        Edit: "edit_",
        Popover: {
            control: function (key) {
                return "popover_" + key + "_";
            },
            icon: function (key) {
                return "popover_" + key + "_icon_";
            },
            label: function (key) {
                return "popover_" + key + "_lbl_";
            }
        },
        Map: {
            list: "gis_map_list_",
            remove: "gis_map_list_remove_",
            AlertUrl: {
                add: "device/medium/device_medium_add.htm",
                list: "device/medium/device_medium_details_list.htm"
            },
            Layer: {
                list: "gis_map_layer_list_",
                remove: "gis_map_layer_list_remove_"
            }
        },
        //获取ID
        getId: function (id, prefix) {
            return id.substr(prefix.length);
        }
    },
    PopoverControls: function (name, className, url, countKey) {
        this.Name = name;
        this.Url = url;
        this.ClassName = className;
        this.CountKey = countKey;
    },
}

//属性
var GIS_Map_Property =
{
    PageSize: 20,//单页数据数量
    //当前数量
    CurrentCount: {
        value: 0,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("lblCurrentCount").innerText = value;
            this.value = value;
        }
    },
    //总数
    TotalCount: {
        value: 0,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("lblTotalCount").innerText = value;
            this.value = value;
        }
    },
    //权限
    MapList:
    {
        value: new Dictionary(),
        load: function (index, size) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                return Client.Management().GIS.Map.List(index, size);
            });
            if (result && result.GISMap) {
                for (var i = 0; i < result.GISMap.length; i++) {
                    result.GISMap[i].LayerCount = 0;
                    var layer = GIS_Map_Property.MapList.layerCount.load(result.GISMap[i].Id, null, 1, 1);
                    if (layer && layer.Page) {
                        result.GISMap[i].LayerCount = layer.Page.TotalRecordCount;
                    }
                    this.value[result.GISMap[i].Id] = result.GISMap[i];
                    if (!this.value[result.GISMap[i].Id]["Selected"])
                        this.value[result.GISMap[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        loadDb: function (id) {
            return tryCatch(function () {
                var map = Client.Management().GIS.Map.Get(id)
                if (map) {
                    map.LayerCount = 0;
                    var layer = GIS_Map_Property.MapList.layerCount.load(map.Id, null, 1.1);
                    if (layer && layer.Page) {
                        map.LayerCount = layer.Page.TotalRecordCount;
                    }
                    GIS_Map_Property.MapList.value[map.Id] = map;
                    if (!GIS_Map_Property.MapList.value[map.Id]["Selected"])
                        GIS_Map_Property.MapList.value[map.Id]["Selected"] = false;
                }
                return GIS_Map_Property.MapList.value[map.Id];
            });
        },
        layerCount: {
            load: function (mapId, parentId, index, size) {
                return tryCatch(function () {
                    return Client.Management().GIS.Map.Layer.List(mapId, index, size, parentId);
                });
            },
            loadItem: function (mapId, layerId) {
                return tryCatch(function () {
                    return Client.Management().GIS.Map.Layer.Get(mapId, layerId);
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
                delete this.value[id];
            }
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

var GIS_Map_Html = {
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.mapId;
                return null;
            },
        }
    },
    Control: {
        Popovers:
        {
            layer: new GIS_Map_Info.PopoverControls("图层", "icon-picture", "management/gis/map/gis_map_layers.htm?mapId=", "LayerCount"),
        },
        IconButton: {
            create: function (id, key, className, count) {
                var strLabel = "<lable id='" + GIS_Map_Info.ControlIdPrefix.Popover.label(key) + id + "'>" + count + "</lable>"
                var icon = new IconButton(GIS_Map_Info.ControlIdPrefix.Popover.icon(key) + id, className, 11, strLabel);
                icon.className = "popover_control_item";
                return icon;
            },
            //Device: function (id, value) {
            //    try {
            //        getTag(GIS_Map_Info.ControlIdPrefix.Popover.label("device") + id).innerText = value;
            //    } catch (e) { }
            //},
        },

        Popover: function (id, key, value, url, name) {
            var popover = new Popover(GIS_Map_Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            popover.className = "popover-control";
            return popover;
        },
        GroupList: {
            createItem: function (map) {
                //创建控件
                var createControl = {
                    //输入通道名称，点击后显示相信信息
                    details: function (map, control) {
                        var span = document.createElement("span");
                        span.innerText = map.Name;
                        span.title = map.Name;
                        var btn = new IconColorButton(GIS_Map_Info.ControlIdPrefix.AlertWindow + id, "howell-icon-platform background-icon", LabelTagColor.LightBlue, 10, span);
                        btn.title = map.Name;
                        btn.href = "management/gis/map/gis_map_details.htm?mapId=" + map.Id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        control.appendChild(btn);
                    },
                    //删除控件
                    remove: function (map, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" name='a_mapId' class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeGIS_Map_Click(this, '" + map.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (map, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + GIS_Map_Info.ControlIdPrefix.Edit + map.Id + "' href=\"management/gis/map/gis_map_details.htm?mapId=" + map.Id + "\" class=\"table-actions expand-btn\" onclick=\"return editGIS_Map_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //操作关联控件
                    popover: function (map, control) {
                        var controls = new Array();
                        for (var key in GIS_Map_Html.Control.Popovers) {
                            var pop = GIS_Map_Html.Control.Popovers[key];
                            var icon = new GIS_Map_Html.Control.IconButton.create(map.Id, key, pop.ClassName, map[pop.CountKey]);
                            var popover = new GIS_Map_Html.Control.Popover(map.Id, key, icon, pop.Url, pop.Name);
                            controls.push(popover);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0);

                        control.appendChild(bts);
                    },
                    description: function (map, control) {
                        var div = document.createElement("div");
                        div.title = map.Description;
                        div.className = "list-item-information security";
                        if (!map.Description) {
                            div.title = "无描述信息"
                            div.className += " none";
                        }
                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                };

                var id = map.Id;

                var item = new GroupListItem(GIS_Map_Info.ControlIdPrefix.GroupListItem, GIS_Map_GrouplistItem_Click);
                item.className = item.className + " mouse_pointer" + (GIS_Map_Property.MapList.value[id].Selected ? " selected" : "");
                item.id = GIS_Map_Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(map, item.Content);//创建权限图标和输入通道名称
                createControl.remove(map, item.Content);//创建删除按钮
                createControl.edit(map, item.Content);//创建编辑按钮
                createControl.popover(map, item.Content);//创建关联弹出框按钮组
                createControl.description(map, item.Content)//创建输入通道描述信息
                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (maps) {
                var items = new GroupListItemArray();
                if (maps) {
                    for (var i = 0; i < maps.length; i++) {
                        items.push(this.createItem(maps[i]));
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {
                var result = GIS_Map_Property.MapList.load(1, GIS_Map_Property.PageSize);
                if (result) {
                    var items = this.getItems(result.GISMap);
                    getTag("dList").appendChild(new GroupList("gis_map_GroupList", items));

                    GIS_Map_Property.CurrentCount.set(result.Page.RecordCount);
                    GIS_Map_Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size) {
                var result = GIS_Map_Property.MapList.load(index, size);
                var items = this.getItems(result.GISMap);
                var gList = getTag("gis_map_GroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                var old = GIS_Map_Property.CurrentCount.get();
                GIS_Map_Property.CurrentCount.set(old + result.Page.RecordCount);
                GIS_Map_Property.TotalCount.set(result.Page.TotalRecordCount);
                LazyLoadPage = result.Page;
            },
            //清空列表
            clear: function () {
                var gList = getTag("gis_map_GroupList");
                gList.innerText = "";
                GIS_Map_Property.CurrentCount.set(0);
                GIS_Map_Property.TotalCount.set(0);
                this.selectedCount = 0;
            },
            reload: function (maps, page) {
                var list = new Array();
                var i = 0;
                for (var p in maps) {
                    list[i++] = maps[p];
                }

                this.clear();

                var items = this.getItems(list);
                var gList = getTag("gis_map_GroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                GIS_Map_Property.CurrentCount.set(list.length);
                GIS_Map_Property.TotalCount.set(page.TotalRecordCount);
            },
            remove: function (id) {
                GIS_Map_Property.MapList.remove(id);
                var tag = getTag(GIS_Map_Info.ControlIdPrefix.GroupListItem + id);
                tag.parentElement.removeChild(tag);
                GIS_Map_Property.CurrentCount.set(GIS_Map_Property.CurrentCount.get() - 1);
                LazyLoadPage.TotalRecordCount--;
                var page = LazyLoadPage;
                if (GIS_Map_Property.CurrentCount.get() < GIS_Map_Property.TotalCount.get()) {
                    this.load(GIS_Map_Property.CurrentCount.get() + 1, 1);
                }
                LazyLoadPage = page
            },
            batchRemove: function () {
                var count = GIS_Map_Property.MapList.batchRemove();//批量删除，并返回删除的条数
                this.selectedCount -= count;
                if (count == 0)
                    return;

                var index = Math.floor(count / GIS_Map_Property.PageSize);
                LazyLoadPage.PageIndex -= index;

                if ((count % GIS_Map_Property.PageSize) == 0)
                    LazyLoadPage.PageIndex++;

                this.clear();
                var page = LazyLoadPage;
                this.load(1, GIS_Map_Property.PageSize * LazyLoadPage.PageIndex);
                LazyLoadPage = page;
            },
            modify: function (map) {
                var item = GIS_Map_Html.Control.GroupList.createItem(map);
                var tag = getTag(GIS_Map_Info.ControlIdPrefix.GroupListItem + map.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            selectedCount: 0,
            select: function (id) {
                GIS_Map_Property.MapList.value[id].Selected = !GIS_Map_Property.MapList.value[id].Selected;
                if (GIS_Map_Property.MapList.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
        },
        PopoverWindow: {
            PageSize: 12
        }
    }
}

PageEvent.GIS.Map.GroupListItemChanged = function (map) {
    GIS_Map_Html.Control.GroupList.modify(map);
}
PageEvent.GIS.Map.GroupListReload = function (index, size) {
    GIS_Map_Html.Control.GroupList.clear();
    var page = LazyLoadPage;
    GIS_Map_Html.Control.GroupList.load(index, size);
    page.TotalRecordCount = LazyLoadPage.TotalRecordCount;
    page.PageCount = Math.ceil(page.TotalRecordCount / GIS_Map_Property.PageSize);
    LazyLoadPage = page;
}
PageEvent.GIS.Map.GroupListLayerIconButtonChanged = function (id, value) {
    GIS_Map_Html.Control.IconButton.Layer(id, value);
}