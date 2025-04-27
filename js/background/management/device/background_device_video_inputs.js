/// <reference path="../../../client/enum.js" />
/// <reference path="../../../client/struct.js" />
var Info = {
    ControlIdPrefix: {
        Device:
        {
            Video: {
                Input: {
                    list: "device_video_input_list_",
                    item: "device_video_input_item_",
                    edit: "edit_",
                    popover: {
                        User: {
                            value: "device_video_input_user_popover_",
                            label: "device_video_input_user_popover_label_"
                        },
                        Department: {
                            value: "device_video_input_department_popover_",
                            label: "device_video_input_department_popover_label_"
                        },
                        Streaming: {
                            value: "device_video_input_streaming_popover_",
                            label: "device_video_input_streaming_popover_label_"
                        }
                    },
                    User: {
                        Association: {
                            list: "device_video_input_user_list_",
                            remove: "device_video_input_user_list_remove_",
                        },
                        Unassociation: {
                            list: "user_list_",
                            add: "device_video_input_user_list_add_"
                        },
                    },
                    Department: {
                        Association: {
                            list: "device_video_input_department_list_",
                            remove: "device_video_input_department_list_remove_",
                        },
                        Unassociation: {
                            list: "department_list_",
                            add: "device_video_input_department_list_add_"
                        },
                    },
                    Streaming: {
                        value: "device_video_input_streaming_",
                        label: "device_video_input_streaming_label_"
                    }
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
    Search: null,
    CameraType: null,
    DeviceId: null,
    PageSize: 20,

    Location: {
        Details: new Info.Location("management/device/video/input/device_video_input_details.htm"),
        User: {
            Users: new Info.Location("management/device/video/input/device_video_input_users.htm"),
            Details: new Info.Location("management/device/video/input/user/device_video_input_user_permissions.htm"),
        },
        Department: {
            Departments: new Info.Location("management/device/video/input/device_video_input_departments.htm"),
            Details: new Info.Location("management/device/video/input/department/device_video_input_department_permissions.htm"),
        },
        Streaming: {
            Streamings: new Info.Location("management/device/video/input/device_video_input_streamings.htm"),
            Details: new Info.Location("management/device/video/input/streaming/device_video_input_streaming_details.htm"),
        }
    },
    Input: {
        value: new Object(),
        load: function (index, size, search) {
            var result = tryCatch(function () {
                return Client.Management().Device.Video.Input.List(Property.DeviceId, index, size, search);
            });
            if (result && result.VideoInputChannel) {
                for (var i = 0; i < result.VideoInputChannel.length; i++) {
                    this.value[result.VideoInputChannel[i].Id] = result.VideoInputChannel[i];
                    if (!this.value[result.VideoInputChannel[i].Id]["Selected"])
                        this.value[result.VideoInputChannel[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        remove: function (id) {
            var result = tryCatch(function (deviceId, inputId) {
                return Client.Management().Device.Video.Input.Delete(deviceId, inputId);
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
        batchCompare: function () {
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        Client.Management().Device.Video.Input.Diagnostics.Start(Property.DeviceId, id, Guid.NewGuid());
                    } catch (e) { };
                }
            }
        },
        get: function (id) {
            return tryCatch(function (deviceId, inputId) {
                return Client.Management().Device.Video.Input.Get(deviceId, inputId);
            }, Property.DeviceId, id);
        },
        modify: function (input) {
            var result = tryCatch(function (deviceId, input) {
                return Client.Management().Device.Video.Input.Set(deviceId, input);
            }, Property.DeviceId, input);
            if (result) {
                this
                return true;
            }
            return false;
        },
        create: function (input) {
            return tryCatch(function (deviceId, input) {
                return Client.Management().Device.Video.Input.Create(deviceId, input);
            }, Property.DeviceId, input);

        },
        Associated: {
            common: {
                count: function (key, inputId) {
                    var response = tryCatch(function () {
                        return Client.Security().Permission.Video.Input[key].List(inputId, 1, 1);
                    });
                    if (response && response.Page)
                        return response.Page.TotalRecordCount;
                    return 0;
                },
                load: function (key, inputId, index, size) {
                    var response = tryCatch(function () {
                        return Client.Security().Permission.Video.Input[key].List(inputId, index, size);
                    });
                    return response;
                },
                remove: function (key, inputId, id) {
                    return tryCatch(function () {
                        return Client.Security().Permission.Video.Input[key].Delete(inputId, id);
                    });
                }
            },
            User: {
                key: "User",
                value: new Object(),
                common: function () {
                    return Property.Input.Associated.common
                },
                Count: function (inputId) {
                    return this.common().count(this.key, inputId);
                },
                load: function (inputId, index, size) {
                    return this.common().list(this.key, inputId, index, size);
                },
                remove: function (inputId, userId) {
                    var response = this.common().remove(this.key, inputId, userId);
                    delete this.value[userId];
                }
            },
            Department: {
                key: "Department",
                value: new Object(),
                common: function () {
                    return Property.Input.Associated.common
                },
                Count: function (inputId) {
                    return this.common().count(this.key, inputId);
                },
                load: function (inputId, index, size) {
                    return this.common().list(this.key, inputId, index, size);
                },
                remove: function (inputId, userId) {
                    return this.common().remove(this.key, inputId, userId);

                }
            },
        }
    }
};

var Html = {
    InputId: null,
    Device: null,
    Control: {
        IconButton: {
            User: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Device.Video.Input.popover.User.label + id).innerText = value;
                } catch (e) { }
            },
            Department: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Device.Video.Input.popover.Department.label + id).innerText = value;
                } catch (e) { }
            },
        },
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
            Event: PageEvent.Device.Video.Input,
            createItem: function (input) {
                var cameraTypeColor = {
                    None: LabelTagColor.DarkGray,
                    Gun: LabelTagColor.Green,
                    Ball: LabelTagColor.Magenta,
                    HalfBall: LabelTagColor.DoderBlue,
                    AIO: LabelTagColor.Taro
                }


                var createControl = {
                    details: function (id, type, name, parent) {
                        var span = document.createElement("span");
                        span.innerText = name;
                        span.title = name;
                        var btn = new IconColorButton("", "background_icon camera-type " + type.toLowerCase(), cameraTypeColor[type], 10, span);
                        var win = new AlertWindow(
                            Info.ControlIdPrefix.Device.Video.Input.item + id, btn, Property.Location.Details.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + id, -1);
                        win.className = "list-group-item-name";
                        win.title = Language.Enum.CameraType[type];
                        parent.appendChild(win);
                    },
                    flag: function (language, color, parent) {
                        var a = document.createElement("a");
                        a.title = language;
                        a.appendChild(new LabelTag(language, color));
                        parent.appendChild(a);
                    },
                    popover: function (id, key, title, className, count, href) {

                        var strLabel = "<lable id='" + Info.ControlIdPrefix.Device.Video.Input.popover[key].label + id + "'>" + count + "</lable>"
                        var icon = new IconButton(Info.ControlIdPrefix.Device.Video.Input.popover[key].value + id, className, 11, strLabel);
                        icon.className = "popover_control_item";

                        var popover = new Popover("", icon, href, title);
                        popover.className = "popover-control";
                        return popover;
                    },
                    remove: function (id, event, control) {
                        var btn = document.createElement("div");
                        var a = document.createElement("a");
                        a.className = "table-actions mouse_pointer expand-btn";
                        a.setAttribute("onclick", event + "(this, '" + id + "')");
                        var trash = document.createElement("div");
                        trash.className = "icon-trash";
                        trash.title = "删除";
                        a.appendChild(trash);
                        btn.className = "pull-right list-lable-btn-operation";
                        btn.appendChild(a);
                        control.appendChild(btn);
                    },
                    edit: function (id, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Info.ControlIdPrefix.Device.Video.Input.edit + id + "' href='" + Property.Location.Details.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + id + "' class=\"table-actions expand-btn\" onclick=\"return editInput_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    compare: function (id, control) {
                        var btn = document.createElement("a");
                        var compare = document.createElement("div");
                        compare.className = "compare-icon";
                        btn.className = "pull-right list-lable-btn-operation";
                        btn.href = "diagnostics/device/video/input/status.htm?deviceId=" + Property.DeviceId + "&inputId=" + id;
                        btn.setAttribute("onclick", "document.location=this.href;stopPropagation();");
                        compare.title = "测速";
                        btn.appendChild(compare);
                        control.appendChild(btn);
                    },
                    label: function (value, is) {
                        var lbl = document.createElement("label");
                        lbl.innerText = value;
                        lbl.className = "list-item-information";
                        if (!is)
                            lbl.className += " none";
                        return lbl;
                    },
                    No: function (id, control) {
                        var no = new Id(id).ModuleId.No;
                        var label = document.createElement("label");
                        label.innerText = no;
                        label.className = "pull-right"
                        label.style.marginRight = "30px";
                        control.appendChild(label);
                    }
                    //alert: function (id, title, count) {
                    //    var strLabel = "<lable id='" + Info.ControlIdPrefix.Device.Video.Input.Streaming.label + id + "'>" + count + "</lable>"
                    //    var icon = new IconButton(Info.ControlIdPrefix.Device.Video.Input.Streaming.value + id, "icon-random", 11, strLabel);
                    //    icon.className = "popover_control_item";
                    //    var win = new AlertWindow(id, icon, "");
                    //    win.className = "popover-control";
                    //    return win;
                    //}

                }

                var id = input.Id;
                var item = GroupListItem(Info.ControlIdPrefix.Device.Video.Input.item, this.Event.GroupListItemClick);
                item.className += (" mouse_pointer" + (Property.Input.value[id].Selected ? " selected" : ""));
                item.id = Info.ControlIdPrefix.Device.Video.Input.item + id;

                createControl.details(input.Id, input.CameraType, input.Name, item.Content);
                createControl.remove(input.Id, "PageEvent.Device.Video.Input.GroupListItemRemoveButtonClick", item.Content);
                createControl.edit(input.Id, item.Content);
                createControl.compare(input.Id, item.Content);

                var controls = new Array(
                    //createControl.popover(input.Id, "Streaming", "流通道", "icon-random", input.StreamingChannel ? input.StreamingChannel.length : 0, "input/" + Property.Location.Streaming.Streamings.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + input.Id),
                    createControl.popover(input.Id, "User", "用户", "icon-user", Property.Input.Associated.User.Count(input.Id), Property.Location.User.Users.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + input.Id)
                    //createControl.popover(input.Id, "Department", "部门", "icon-group", Property.Input.Associated.Department.Count(input.Id), Property.Location.Department.Departments.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + input.Id)
                    );


                var bts = new TransverseButtonList(controls, 70, 0);
                item.Content.appendChild(bts);

                //终端
                controls = new Array(
                    createControl.label("终端", input.Terminal),
                    createControl.label("红外", input.Infrared),
                    createControl.label("云台", input.PTZ),
                    createControl.label("网络", input.Networked)
                );


                //createControl.No(input.Id, item.Content);


                var lbls = new TransverseButtonList(controls, 70, 0);
                lbls.style.marginRight = "84px";
                item.Content.appendChild(lbls);


                item.Content.className = "list-group-item-content";



                return item;
            },
            createItems: function (inputs) {
                var items = new GroupListItemArray();
                if (inputs) {
                    for (var i = 0; i < inputs.length; i++) {
                        items.push(this.createItem(inputs[i]));
                    }
                }
                return items;
            },
            createItemsByObj: function (inputObj) {
                if (inputObj) {
                    var inputs = new Array();
                    var i = 0;
                    for (var key in inputObj) {
                        inputs[i++] = inputObj[key];
                    }
                    return this.createItems(inputs);
                }
                return null;
            },
            Create: function (deviceId, controlId) {
                Property.DeviceId = deviceId;
                var result = Property.Input.load(1, Property.PageSize);
                if (result) {
                    var items = this.createItems(result.VideoInputChannel);
                    getTag(controlId).appendChild(new GroupList(Info.ControlIdPrefix.Device.Video.Input.list, items));
                    this.Count.Record.Set(result.Page.RecordCount);
                    this.Count.Total.Set(result.Page.TotalRecordCount);
                    LazyLoadPage = result.Page;
                }
            },
            Load: function (index, size, search) {
                var result = Property.Input.load(index, size, search);
                var items = this.createItems(result.VideoInputChannel);
                var glist = getTag(Info.ControlIdPrefix.Device.Video.Input.list);
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
                var glist = getTag(Info.ControlIdPrefix.Device.Video.Input.list);
                glist.innerText = "";
                this.Count.Record.Set(0);
                this.Count.Total.Set(0);
                this.Count.Selected = 0;
            },
            Modify: function (input) {
                var item = this.createItem(input);
                var tag = getTag(Info.ControlIdPrefix.Device.Video.Input.item + input.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            Select: {
                All: function () {
                    this.Cancel();
                    for (var id in Property.Input.value) {
                        Property.Input.value[id].Selected = true;
                        ++Html.Control.GroupList.Count.Selected
                    }
                },
                Cancel: function () {
                    for (var id in Property.Input.value) {
                        Property.Input.value[id].Selected = false;
                    }
                    Html.Control.GroupList.Count.Selected = 0;
                },
                Item: function (id) {
                    Property.Input.value[id].Selected = !Property.Input.value[id].Selected;
                    if (Property.Input.value[id].Selected)
                        ++Html.Control.GroupList.Count.Selected;
                    else
                        --Html.Control.GroupList.Count.Selected;
                },
            },
            Remove: function (id) {
                var isSelected = Property.Input.value[id].Selected;
                if (Property.Input.remove(id)) {
                    var tag = getTag(Info.ControlIdPrefix.Device.Video.Input.item + id);
                    tag.parentElement.removeChild(tag);
                    this.Count.Record.Set(this.Count.Record.Get() - 1);
                    this.Count.Total.Set(this.Count.Total.Get() - 1);
                    if (isSelected)
                        --this.Count.Selected;
                    --LazyLoadPage.TotalRecordCount;

                    if (Html.Control.GroupList.Count.Record.Get() < Html.Control.GroupList.Count.Total.Get()) {
                        var page = LazyLoadPage;
                        Html.Control.GroupList.Load(Html.Control.GroupList.Count.Record.Get() + 1, 1, Property.Search);
                        LazyLoadPage = page;
                    }
                }
            },
            BatchRemove: function () {
                var old = Html.Control.GroupList.Count.Selected;
                for (var id in Property.Input.value) {
                    if (Property.Input.value[id].Selected) {
                        if (Property.Input.remove(id)) {
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
                Html.Control.GroupList.Load(1, Property.PageSize * LazyLoadPage.PageIndex, Property.Search);
                LazyLoadPage = page;
            }
        },
        AlertWindow: {
            Device: {
                Input: {
                    Details: {
                        Id: {
                            value: null,
                            set: function (value) {
                                getTag("txtId").value = value
                                this.value = value;
                            }
                        },
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
                                getTag("txtPseudoCode").value = value
                                this.value = value;
                            }
                        },
                        VideoInterfaceType: {
                            value: null,
                            set: function (value) {
                                getTag("ddlVideoInterfaceType").value = value
                                this.value = value;
                            }
                        },
                        CameraType: {
                            value: null,
                            set: function (value) {
                                getTag("ddlCameraType").value = value
                                this.value = value;
                            }
                        },
                        PTZ: {
                            value: null,
                            set: function (value) {
                                getTag("chkPTZ").checked = value
                                this.value = value;
                            }
                        },
                        Infrared: {
                            value: null,
                            set: function (value) {
                                getTag("chkInfrared").checked = value
                                this.value = value;
                            }
                        },
                        Terminal: {
                            value: null,
                            set: function (value) {
                                getTag("chkTerminal").checked = value
                                this.value = value;
                            }
                        },
                        Networked: {
                            value: null,
                            set: function (value) {
                                getTag("chkNetworked").checked = value
                                this.value = value;
                            }
                        },
                        load: function () {
                            var input = this.get();
                            this.Id.set(input.Id);
                            this.CameraType.set(input.CameraType);
                            this.Infrared.set(input.Infrared);
                            this.Name.set(input.Name);
                            this.Networked.set(input.Networked);
                            this.PseudoCode.set(input.PseudoCode);
                            this.PTZ.set(input.PTZ);
                            this.Terminal.set(input.Terminal);
                            this.VideoInterfaceType.set(input.VideoInterfaceType)
                        },
                        get: function () {
                            var url = new Uri(Trigger.href);
                            if (url.Query) {
                                Html.InputId = url.Querys.inputId;
                            }
                            return Property.Input.get(Html.InputId);
                        },

                    },
                    create: function (input) {
                        Property.Input.create(input);
                    }
                }
            }
        },
        PopoverWindow: {
            PageSize: 12,
        }
    }
};

PageEvent.Device.Video.Input.GroupListItemClick = function (sender, args) {
    var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.Video.Input.item);
    Html.Control.GroupList.Select.Item(id);
}

PageEvent.Device.Video.Input.GroupListChanged = function (input) {
    Property.Input.modify(input);
    Html.Control.GroupList.Modify(input);
}
PageEvent.Device.Video.Input.GroupListReload = function (sender, args) {
    var record = Html.Control.GroupList.Count.Record.Get()
    var index = Math.ceil(record / Property.PageSize);

    Html.Control.GroupList.Clear();
    if ((record % Property.PageSize) == 0) {
        index = record / Property.PageSize;
    }
    var page = LazyLoadPage;
    Html.Control.GroupList.Load(1, Property.PageSize * (index == 0 ? ++index : index), Property.Search);
    LazyLoadPage = page;
}

PageEvent.Device.Video.Input.GroupListUserIconButtonChanged = function (id, value) {
    Html.Control.IconButton.User(id, value);
}

PageEvent.Device.Video.Input.GroupListDepartmentIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Department(id, value);
}
