var Info = {
    ControlIdPrefix: {
        Device:
        {
            Video: {
                Decoding: {
                    list: "device_video_decoding_list_",
                    item: "device_video_decoding_item_",
                },
            },
        },
        getId: function (id, prefix) {
            return id.substr(prefix.length);
        }
    },
    Location: function (value, other) {
        this.Value = value;
        this.Other = other;
    }
};

if (!this.Property)
    this.Property = {};

Property = {
    DeviceId: null,
    PageSize: 20,

    Location: {
        Details: new Info.Location("device_video_decoding_details.htm"),
    },
    Decoding: {
        value: new Object(),
        load: function (index, size) {
            var result = tryCatch(function (deviceId, index, size) {
                return Client.Management().Device.Video.Decode.List(deviceId, index, size);
            }, Property.DeviceId, index, size);
            if (result && result.DecodingChannel) {
                for (var i = 0; i < result.DecodingChannel.length; i++) {
                    this.value[result.DecodingChannel[i].Id] = result.DecodingChannel[i];
                    if (!this.value[result.DecodingChannel[i].Id]["Selected"])
                        this.value[result.DecodingChannel[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        remove: function (id) {
            var result = tryCatch(function (deviceId, decodingId) {
                return Client.Management().Device.Video.Decode.Delete(deviceId, decodingId);
                
            }, Property.DeviceId, id);
            if (result) {
                delete this.value[id];
                return true;
            }
            return false;
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
        },
        get: function (id) {
            return tryCatch(function (deviceId, decodingId) {
                return Client.Management().Device.Video.Decode.Get(deviceId, decodingId);
            }, Property.DeviceId, id);
        },
        modify: function (decoding) {
            var result = tryCatch(function (deviceId, decoding) {
                return Client.Management().Device.Video.Decode.Set(deviceId, decoding);
            }, Property.DeviceId, decoding);
            if (result) {
                this
                return true;
            }
            return false;
        },
        create: function (decoding) {
            return tryCatch(function (deviceId, decoding) {
                return Client.Management().Device.Video.Decode.Create(deviceId, decoding);
            }, Property.DeviceId, decoding);

        },
    }
};

var Html = {
    DecodingId: null,
    Device: null,
    Control: {
        GroupList: {
            Count: {
                Record: {
                    value: 0,
                    Set: function (value) {
                        getTag("lblCurrentCount").innerText = value;
                        this.value = value;
                    },
                    Get: function () {
                        return this.value
                    }
                },
                Total: {
                    value: 0,
                    Set: function (value) {
                        getTag("lblTotalCount").innerText = value;
                        this.value = value;
                    },
                    Get: function () {
                        return this.value;
                    }
                },
                Selected: 0
            },
            Event: PageEvent.Device.Video.Decoding,
            createItem: function (decoding) {
                var enabled = {
                    "false": LabelTagColor.Yellow,
                    "true": LabelTagColor.Green,
                }
                var createControl = {
                    details: function (id, type, name, parent) {
                        var btn = new IconColorButton("", "background_icon decoding " + type, enabled[type], 10, name);
                        var win = new AlertWindow(
                            Info.ControlIdPrefix.Device.Video.Decoding.item + id,
                            btn,
                           "decoding/" + Property.Location.Details.Value + "?deviceId=" + Property.DeviceId + "&decodingId=" + id,
                            -1
                        );
                        win.className = "list-group-item-name";
                        win.title = name;
                        parent.appendChild(win);
                    },
                    //flag: function (language, color, parent) {
                    //    var a = document.createElement("a");
                    //    a.title = language;
                    //    a.appendChild(new LabelTag(language, color));
                    //    parent.appendChild(a);
                    //},
                    remove: function (id, event, control) {
                        var btn = document.createElement("div");
                        var a = document.createElement("a");
                        a.title = "删除";
                        a.className = "table-actions mouse_pointer expand-btn";
                        a.setAttribute("onclick", event + "(this, '" + id + "')");
                        var trash = document.createElement("div");
                        trash.className = "icon-trash";
                        a.appendChild(trash);
                        btn.className = "pull-right list-lable-btn-operation";
                        btn.appendChild(a);
                        control.appendChild(btn);
                    },
                    //label: function (value, is) {
                    //    var lbl = document.createElement("label");
                    //    lbl.innerText = value;
                    //    lbl.className = "list-item-information";
                    //    if (!is)
                    //        lbl.className += " none";
                    //    return lbl;
                    //},
                    //alert: function (id, title, count) {
                    //    var strLabel = "<lable id='" + Info.ControlIdPrefix.Device.Video.Output.Decode.label + id + "'>" + count + "</lable>"
                    //    var icon = new IconButton(Info.ControlIdPrefix.Device.Video.Output.Decode.value + id, "icon-random", 11, strLabel);
                    //    icon.className = "popover_control_item";
                    //    var win = new AlertWindow(id, icon, "");
                    //    win.className = "popover-control";
                    //    return win;
                    //}

                }

                var id = decoding.Id;
                var item = GroupListItem(Info.ControlIdPrefix.Device.Video.Decoding.item, this.Event.GroupListItemClick);
                item.className += " mouse_pointer";
                item.id = Info.ControlIdPrefix.Device.Video.Decoding.item + id;

                var name = new Id(decoding.Id).ModuleId.No;
                createControl.details(decoding.Id, decoding.Enabled, name, item.Content);
                createControl.remove(decoding.Id, "PageEvent.Device.Video.Decoding.GroupListItemRemoveButtonClick", item.Content);

                //var controls = new Array(
                //    createControl.alert(output.Id, "解码通道", output.DecodeingChannel ? output.DecodeingChannel.length : 0),
                //    createControl.popover(output.Id, "User", "用户", "icon-user", Property.Output.Associated.User.Count(output.Id), "output/" + Property.Location.User.Users.Value + "?deviceId=" + Property.DeviceId + "&outputId=" + output.Id),
                //    createControl.popover(output.Id, "Department", "部门", "icon-group", Property.Output.Associated.Department.Count(output.Id), "output/" + Property.Location.Department.Departments.Value + "?deviceId=" + Property.DeviceId + "&outputId=" + output.Id)

                //    );

                //var bts = new TransverseButtonList(controls, 70, 0);
                //item.Content.appendChild(bts);

                //终端
                //controls = new Array(
                //    createControl.label("终端", output.Terminal),
                //    createControl.label("网络", output.Networked),
                //    createControl.label("外接", output.InterfaceEquipped)
                //);
                //var lbls = new TransverseButtonList(controls, 70, 0);
                //lbls.style.marginRight = "150px";
                //item.Content.appendChild(lbls);

                item.Content.className = "list-group-item-content";



                return item;
            },
            createItems: function (decodings) {
                var items = new GroupListItemArray();
                if (decodings) {
                    for (var i = 0; i < decodings.length; i++) {
                        items.push(this.createItem(decodings[i]));
                    }
                }
                return items;
            },
            createItemsByObj: function (decodingObj) {
                if (decodingObj) {
                    var decodings = new Array();
                    var i = 0;
                    for (var key in decodingObj) {
                        decodings[i++] = decodingObj[key];
                    }
                    return this.createItems(decodings);
                }
                return null;
            },
            Create: function (deviceId, controlId) {
                Property.DeviceId = deviceId;
                var result = Property.Decoding.load(1, Property.PageSize);
                if (result) {
                    var items = this.createItems(result.DecodingChannel);
                    getTag(controlId).appendChild(new GroupList(Info.ControlIdPrefix.Device.Video.Decoding.list, items));
                    this.Count.Record.Set(result.Page.RecordCount);
                    this.Count.Total.Set(result.Page.TotalRecordCount);
                    LazyLoadPage = result.Page;
                }
            },
            Load: function (index, size) {
                var result = Property.Decoding.load(index, size);
                var items = this.createItems(result.DecodingChannel);
                var glist = getTag(Info.ControlIdPrefix.Device.Video.Decoding.list);
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        glist.appendChild(items[i]);
                    }
                }
                var old = this.Count.Record.Get();
                this.Count.Record.Set(old + result.Page.RecordCount);
                this.Count.Total.Set(result.Page.TotalRecordCount);
                LazyLoadPage = result.Page;
            },
            Clear: function () {
                var glist = getTag(Info.ControlIdPrefix.Device.Video.Decoding.list);
                glist.innerText = "";
                this.Count.Record.Set(0);
                this.Count.Total.Set(0);
                this.Count.Selected = 0;
            },
            Modify: function (decoding) {
                var item = this.createItem(decoding);
                var tag = getTag(Info.ControlIdPrefix.Device.Video.Decoding.item + decoding.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            Select: {
                All: function () {
                    this.Cancel();
                    for (var id in Property.Decoding.value) {
                        Property.Decoding.value[id].Selected = true;
                        ++Html.Control.GroupList.Count.Selected
                    }
                },
                Cancel: function () {
                    for (var id in Property.Decoding.value) {
                        Property.Decoding.value[id].Selected = false;
                    }
                    Html.Control.GroupList.Count.Selected = 0;
                },
                Item: function (id) {
                    Property.Decoding.value[id].Selected = !Property.Decoding.value[id].Selected;
                    if (Property.Decoding.value[id].Selected)
                        ++Html.Control.GroupList.Count.Selected;
                    else
                        --Html.Control.GroupList.Count.Selected;
                },
            },
            Remove: function (id) {
                var isSelected = Property.Decoding.value[id].Selected;
                if (Property.Decoding.remove(id)) {
                    var tag = getTag(Info.ControlIdPrefix.Device.Video.Decoding.item + id);
                    tag.parentElement.removeChild(tag);
                    this.Count.Record.Set(this.Count.Record.Get() - 1);
                    this.Count.Total.Set(this.Count.Total.Get() - 1);
                    if (isSelected)
                        --this.Count.Selected;
                    --LazyLoadPage.TotalRecordCount;

                    if (Html.Control.GroupList.Count.Record.Get() < Html.Control.GroupList.Count.Total.Get()) {
                        var page = LazyLoadPage;
                        Html.Control.GroupList.Load(Html.Control.GroupList.Count.Record.Get() + 1, 1);
                        LazyLoadPage = page;
                    }
                }
            },
            BatchRemove: function () {
                var old = Html.Control.GroupList.Count.Selected;
                for (var id in Property.Decoding.value) {
                    if (Property.Decoding.value[id].Selected) {
                        if (Property.Decoding.remove(id)) {
                            --Html.Control.GroupList.Count.Selected;
                        }
                    }
                }
                var count = old - Html.Control.GroupList.Count.Selected;
                if (count == 0)
                    return;

                var index = Math.floor(count / Property.PageSize);
                LazyLoadPage.PageIndex -= index;

                if ((count % Property.PageSize) == 0)
                    LazyLoadPage.PageIndex++;

                Html.Control.GroupList.Clear();
                var page = LazyLoadPage;
                Html.Control.GroupList.Load(1, Property.PageSize * LazyLoadPage.PageIndex);
                LazyLoadPage = page;
            }
        },
        AlertWindow: {
            Device: {
                Decoding: {
                    Details: {
                        Name: {
                            value: null,
                            set: function (value) {
                                getTag("txtName").value = value
                                this.value = value;
                            }
                        },
                        PseudoCode: {
                            value: null,
                            set: function (value) {
                                getTag("txtPseudoCode").value = value;
                                this.value = value;
                            }
                        },
                        Enabled: {
                            value: null,
                            set: function (value) {
                                getTag("chkEnabled").checked = value;
                                this.value = value;
                            }
                        },
                        SupportedCodecFormats: {
                            value: null,
                            set: function (value) {
                                getTag("txtSupportedCodecFormats").value = value;
                                this.value = value;
                            }
                        },
                        load: function () {
                            var decoding = this.get();
                            this.Name.set(new Id(decoding.Id).ModuleId.No);
                            this.PseudoCode.set(decoding.PseudoCode);
                            this.SupportedCodecFormats.set(decoding.SupportedCodecFormats);
                            this.Enabled.set(decoding.Enabled);
                        },
                        get: function () {
                            var url = new Uri(Trigger.href);
                            if (url.Query) {
                                Html.DecodingId = url.Querys.decodingId;
                            }
                            return Property.Decoding.get(Html.DecodingId);
                        },

                    },
                    create: function (decoding) {
                        Property.Decoding.create(decoding);
                    }
                }
            }
        },
    }
};

PageEvent.Device.Video.Decoding.GroupListItemClick = function (sender, args) {
    var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Video.Decoding.item);
    Html.Control.GroupList.Select.Item(id);
}

PageEvent.Device.Video.Decoding.GroupListChanged = function (decoding) {
    Property.Decoding.modify(decoding);
    Html.Control.GroupList.Modify(decoding);
}
PageEvent.Device.Video.Decoding.GroupListReload = function (sender, args) {
    var record = Html.Control.GroupList.Count.Record.Get()
    var index = Math.ceil(record / Property.PageSize);

    Html.Control.GroupList.Clear();
    if ((record % Property.PageSize) == 0) {
        index = record / Property.PageSize;
    }
    var page = LazyLoadPage;
    Html.Control.GroupList.Load(1, Property.PageSize * (index == 0 ? ++index : index));
    LazyLoadPage = page;
}