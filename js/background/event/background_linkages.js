/// <reference path="../../client/struct.js" />
/// <reference path="../../jquery/jquery.js" />

if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var Info =
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
        VideoPreviewIdentifier: {
            AlertUrl: {
                add: "event/linkage/linkage_add.htm",
            }
        },
        VideoPlaybackIdentifier: {
            AlertUrl: {
                add: "event/linkage/linkage_add.htm",
            }
        },
        VideoSnapIdentifier: {
            AlertUrl: {
                add: "event/linkage/linkage_add.htm",
            }
        },
        DecoderIdentifier: {
            AlertUrl: {
                add: "event/linkage/linkage_add.htm",
            }
        },
        //获取ID
        getId: function (id, prefix) {
            return id.substr(prefix.length);
        }
    },
    PopoverControls: function (name, className, url, fun) {
        this.Name = name;
        this.Url = url;
        this.ClassName = className;
        this.Fun = fun;
    },
    Id: {
        key: {
            ComponentId: 0,
            EventType: 1,
            EventState: 2
        },
        get: function (id) {
            var items = id.split("_");
            return items;
        },
        set: function (id, type, state) {
            return id + "_" + type + "_" + state;
        }
    }
}

//属性
var Property =
{
    Count: {
        get: function (id, fn) {
            var result = fn.List(id, 1, 1);
            return result.Page.TotalRecordCount;
        },
        VideoPreviewIdentifier: function (linkage) {
            return linkage.VideoPreviewIdentifier ? linkage.VideoPreviewIdentifier.length : 0;
        },
        VideoPlaybackIdentifier: function (linkage) {
            return linkage.VideoPlaybackIdentifier ? linkage.VideoPlaybackIdentifier.length : 0;
        },
        VideoSnapIdentifier: function (linkage) {
            return linkage.VideoSnapIdentifier ? linkage.VideoSnapIdentifier.length : 0;
        },
        DecoderIdentifier: function (linkage) {
            return linkage.DecoderIdentifier ? linkage.DecoderIdentifier.length : 0;
        }
    },
    Name: {
        ioinput: function (componentId) {
            var deviceId = new Id(componentId).getDeviceId();
            return Property.IOInput.get(deviceId, componentId).Name;
        },
        device: function (componentId) {
            var deviceId = new Id(componentId).getDeviceId();
            return Property.Device.get(deviceId).Name;
        },
        input: function (componentId) {
            var deviceId = new Id(componentId).getDeviceId();
            return Property.VideoInput.get(deviceId, componentId).Name;
        },
        get: function (componentId) {
            var deviceId = new Id(componentId).getDeviceId();
            var _this = this;
            return Try(function () { return _this.ioinput(componentId); },
                Try(function () { return _this.input(componentId); },
                    Try(function () { return _this.device(componentId); },
                        "已删除")
                )
            );
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
    EventType: null,
    ComponentId: null,
    LinkageList:
    {
        value: new Dictionary(),
        load: function (type) {
            var result = tryCatch(function () {
                return Client.Management().Event.Linkage.List(type, null);
            });
            if (result && result.EventLinkage) {
                result.EventLinkage = result.EventLinkage.sortBy("ComponentId");
                for (var i = 0; i < result.EventLinkage.length; i++) {
                    result.EventLinkage[i] = result.EventLinkage[i];
                    result.EventLinkage[i].Name = Property.Name.get(result.EventLinkage[i].ComponentId);
                    var id = Info.Id.set(result.EventLinkage[i].ComponentId, result.EventLinkage[i].EventType, result.EventLinkage[i].EventState);
                    this.value[id] = result.EventLinkage[i];
                    if (!this.value[id]["Selected"])
                        this.value[id]["Selected"] = false;
                    this.value[id]["SelectedSpecified"] = false;
                }
            }
            return result;
        },
        get: function (id) {
            if (this.value)
                return this.value[id];
            return null;
        },
        remove: function (id, type, state) {
            var result = tryCatch(function () {
                return Client.Management().Event.Linkage.Delete(id, type, state);
            });
            if (result) {
                delete this.value[Info.Id.set(id, type, state)];
            }
        },
        set: function (linkage) {
            var result = tryCatch(function () {
                return Client.Management().Event.Linkage.Set(linkage, linkage.EventType, linkage.EventState);
            });
            if (result) {
                this.value[Info.Id.set(linkage.ComponentId, linkage.EventType, linkage.EventState)].Selected = false;
            }
        },
        batchEditText: function (text) {
            var count = 0;
            var list = this.value.toArray();
            for (var i = 0; i < list.length; i++) {
                if (list[i].Selected) {
                    try {
                        var linkage = Convert(list[i], new Object());
                        linkage.TextIdentifier = text;
                        linkage.TextIdentifierSpecified = true;
                        this.set(linkage);
                        list[i] = Convert(linkage, list[i]);
                        var tag = getTag(Info.ControlIdPrefix.GroupListItem + Info.Id.set(linkage.ComponentId, linkage.EventType, linkage.EventState));
                        if (tag)
                            $(tag).removeClass("selected");
                        ++count;
                    } catch (e) { };
                }
            }
            return count;
        },
        batchRemove: function () {
            var count = 0;
            var list = this.value.toArray();
            for (var i = 0; i < list.length; i++) {
                if (list[i].Selected) {
                    try {
                        var linkage = list[i];
                        this.remove(linkage.ComponentId, linkage.EventType, linkage.EventState);
                        ++count;
                    } catch (e) { };
                }
            }
            return count;
        }
    },
    Device: {
        get: function (deviceId) {
            return Client.Management().Device.Get(deviceId);
        }
    },
    IOInput: {
        get: function (deviceId, ioInputId) {
            return Client.Management().Device.IO.Input.Get(deviceId, ioInputId);
        }
    },
    VideoInput: {
        get: function (deviceId, inputId) {
            return Client.Management().Device.Video.Input.Get(deviceId, inputId);
        }
    }
}

var Html = {
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.linkageId;
                return null;
            }
        },
        Key: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.key;
                return null;
            }
        }
    },
    Control: {
        Popovers:
        {
            preview: new Info.PopoverControls("视频预览操作", "icon-facetime-video", "event/linkage/linkage_set.htm?key=VideoPreviewIdentifier&linkageId=", Property.Count.VideoPreviewIdentifier),
            playback: new Info.PopoverControls("视频回放操作", "icon-film", "event/linkage/linkage_set.htm?key=VideoPlaybackIdentifier&linkageId=", Property.Count.VideoPlaybackIdentifier),
            snap: new Info.PopoverControls("视频抓图操作", "icon-camera", "event/linkage/linkage_set.htm?key=VideoSnapIdentifier&linkageId=", Property.Count.VideoSnapIdentifier),
            decoder: new Info.PopoverControls("解码器", "howell-icon-decoder", "event/linkage/linkage_set.htm?key=DecoderIdentifier&linkageId=", Property.Count.DecoderIdentifier)
        },
        IconButton: {
            create: function (linkage, key, className, getCountFn) {
                var id = Info.Id.set(linkage.ComponentId, linkage.EventType, linkage.EventState);
                var strLabel = "<lable id='" + Info.ControlIdPrefix.Popover.label(key) + id + "'>" + getCountFn(linkage) + "</lable>"
                var icon = new IconButton(Info.ControlIdPrefix.Popover.icon(key) + id, className, 11, strLabel);
                icon.className = "popover_control_item";
                return icon;
            },
        },

        Popover: function (id, key, value, url, name) {
            var popover = new Popover(Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            popover.className = "popover-control";
            popover.onclick = function () {
                stopPropagation();
                return popover_Click(popover);
            }
            return popover;
        },
        GroupList: {
            createItem: function (linkage) {
                var eventTypeColor = {
                    None: LabelTagColor.DarkGray,
                    IO: LabelTagColor.LightBlue,
                    VMD: LabelTagColor.Prunus,
                    Videoloss: LabelTagColor.Prunus,
                    IRCut: LabelTagColor.Prunus,
                    DayNight: LabelTagColor.Prunus,
                    RecordState: LabelTagColor.LightBlue,
                    StorageMediumFailure: LabelTagColor.Green,
                    RAIDFailure: LabelTagColor.Green,
                    RecordingFailure: LabelTagColor.LightBlue,
                    BadVideo: LabelTagColor.Prunus,
                    POS: LabelTagColor.Taro,
                    FanFailure: LabelTagColor.Taro,
                    CpuUsage: LabelTagColor.Taro,
                    MemoryUsage: LabelTagColor.Taro,
                    Temperature: LabelTagColor.Taro,
                    Pressure: LabelTagColor.Taro,
                    Voltage: LabelTagColor.Taro,
                    MaximumConnections: LabelTagColor.LightBlue,
                    NetworkBitrate: LabelTagColor.DoderBlue,
                    VideoBitrate: LabelTagColor.LightBlue,
                    Squint: LabelTagColor.Prunus,
                    VideoTurned: LabelTagColor.Prunus,
                    Intrusion: LabelTagColor.Prunus,
                    Tripwire: LabelTagColor.Prunus,
                    Loitering: LabelTagColor.Prunus,
                    Unattended: LabelTagColor.Prunus,
                    Removal: LabelTagColor.Prunus,
                    Retrograde: LabelTagColor.Prunus,
                    Online: LabelTagColor.Green,
                    Offline: LabelTagColor.Prunus
                };
                var eventState = {
                    Inactive: "inactive",
                    Active: "active",
                };
                //创建控件
                var createControl = {
                    //联动名称，点击后显示相信信息
                    details: function (linkage, control) {
                        var linkageName = linkage.Name;
                        var span = document.createElement("span");
                        span.innerText = linkageName;
                        span.title = linkageName;
                        var btn = new IconColorButton(Info.ControlIdPrefix.AlertWindow + id, "background_icon eventtype " + linkage.EventType.toLowerCase(), eventTypeColor[linkage.EventType], 10, span);
                        btn.title = Language.Display.EventType[linkage.EventType];
                        //btn.href = "linkage/linkage_details.htm?linkageId=" + id;
                        btn.className = btn.className + " list-group-item-name";
                        //btn.onclick = function () {
                        //    AlertWindow.Show(btn, -1);
                        //    return stopPropagation();
                        //};
                        control.appendChild(btn);
                    },
                    itemImg: function (linkage, control) {
                        var div = document.createElement("div");
                        div.className = "background_icon eventstate " + eventState[linkage.EventState];
                        div.style.marginRight = "420px";
                        div.style.marginTop = "16px";
                        div.style.styleFloat = "right";
                        div.style.cssFloat = "right";
                        div.title = Language.Display.EventState[linkage.EventState];
                        control.appendChild(div);
                    },
                    //删除控件
                    remove: function (linkage, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" name='a_linkageId' class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeLinkage_Click(this, '" + id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (linkage, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Info.ControlIdPrefix.Edit + id + "' href=\"event/linkage/linkage_details.htm?linkageId=" + id + "\" class=\"table-actions expand-btn\" onclick=\"return editLinkage_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //操作关联控件
                    popover: function (linkage, control) {
                        var controls = new Array();
                        for (var key in Html.Control.Popovers) {
                            var pop = Html.Control.Popovers[key];
                            var icon = new Html.Control.IconButton.create(linkage, key, pop.ClassName, pop.Fun);
                            var popover = new Html.Control.Popover(id, key, icon, pop.Url, pop.Name);
                            controls.push(popover);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0);
                        control.appendChild(bts);
                    },
                };

                var id = Info.Id.set(linkage.ComponentId, linkage.EventType, linkage.EventState);
                var item = new GroupListItem(Info.ControlIdPrefix.GroupListItem, GrouplistItem_Click);
                item.className = item.className + " mouse_pointer" + (Property.LinkageList.value[id].Selected ? " selected" : "");
                item.id = Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(linkage, item.Content);//创建权限图标和输入通道名称               
                createControl.remove(linkage, item.Content);//创建删除按钮
                //createControl.edit(linkage, item.Content);//创建编辑按钮
                createControl.popover(linkage, item.Content);//创建关联弹出框按钮组
                createControl.itemImg(linkage, item.Content);
                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (linkages, type, componentId) {
                var items = new GroupListItemArray();
                if (linkages) {
                    for (var i = 0; i < linkages.length; i++) {
                        if ((!type) || linkages[i].EventType == type) {
                            if ((!componentId) || linkages[i].ComponentId == componentId) {
                                items.push(this.createItem(linkages[i]));
                            }
                        }
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {
                var result = Property.LinkageList.load(null);
                if (result) {
                    var items = this.getItems(result.EventLinkage);
                    getTag("dList").appendChild(new GroupList("linkageGroupList", items));
                    Property.TotalCount.set(result.Page.TotalRecordCount);
                }
            },
            //加载列表
            load: function (type) {
                var result = Property.LinkageList.value.toArray();
                if (result) {
                    var items = this.getItems(result, type, Property.ComponentId);
                    getTag("dList").appendChild(new GroupList("linkageGroupList", items));
                    Property.TotalCount.set(result.length);
                }
                //var result = Property.LinkageList.value.toArray();

                //var result = Property.LinkageList.load(type);
                //var items = this.getItems(result.EventLinkage);
                //var gList = getTag("linkageGroupList");
                //if (items) {
                //    for (var i = 0; i < items.length; i++) {
                //        gList.appendChild(items[i]);
                //    }
                //}
                //Property.TotalCount.set(result.Page.TotalRecordCount);
            },
            //清空列表
            clear: function () {
                var gList = getTag("linkageGroupList");
                gList.innerText = "";
                Property.TotalCount.set(0);
                this.selectedCount = 0;
            },
            remove: function (id) {
                var linkage = Property.LinkageList.value[id];
                Property.LinkageList.remove(linkage.ComponentId, linkage.EventType, linkage.EventState);
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + id);
                tag.parentElement.removeChild(tag);
                var count = Property.TotalCount.get();
                Property.TotalCount.set(--count);
            },
            batchRemove: function () {
                var count = Property.LinkageList.batchRemove();//批量删除，并返回删除的条数                
                this.selectedCount -= count;
                if (count == 0)
                    return;

                this.clear();
                this.load(Property.EventType);
            },
            batchEditText: function (text) {
                var count = Property.LinkageList.batchEditText(text);//批量删除，并返回删除的条数                
                this.selectedCount -= count;
            },
            modify: function (linkage) {
                var id = Info.Id.set(linkage.ComponentId, linkage.EventType, linkage.EventState);
                Property.LinkageList.value[id] = linkage;
                var item = Html.Control.GroupList.createItem(linkage);
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            selectedCount: 0,
            select: function (id) {
                Property.LinkageList.value[id].Selected = !Property.LinkageList.value[id].Selected;
                if (Property.LinkageList.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
        },
        //AlertWindow
        //PopoverWindow: {
        //UserList
        //}
    }
}

PageEvent.Linkage.GroupListItemChanged = function (args) {
    Html.Control.GroupList.modify(args);
}
PageEvent.Linkage.GroupListReload = function (type) {
    Html.Control.GroupList.clear();
    Html.Control.GroupList.load(type);
}