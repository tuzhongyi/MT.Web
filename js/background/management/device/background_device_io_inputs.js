var Info = {
    ControlIdPrefix: {
        Device:
        {
            IO: {
                Input: {
                    list: "device_io_input_list_",
                    item: "device_io_input_item_",
                    edit: "edit_",
                    popover: {
                        User: {
                            value: "device_io_input_user_popover_",
                            label: "device_io_input_user_popover_label_"
                        },
                        Department: {
                            value: "device_io_input_department_popover_",
                            label: "device_io_input_department_popover_label_"
                        },
                    },
                    User: {
                        Association: {
                            list: "device_io_input_user_list_",
                            remove: "device_io_input_user_list_remove_",
                        },
                        Unassociation: {
                            list: "user_list_",
                            add: "device_io_input_user_list_add_"
                        },
                    },
                    Department: {
                        Association: {
                            list: "device_io_input_department_list_",
                            remove: "device_io_input_department_list_remove_",
                        },
                        Unassociation: {
                            list: "department_list_",
                            add: "device_io_input_department_list_add_"
                        },
                    },
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
    DeviceClassification: null,
    DeviceId: null,
    PageSize: 20,
    Device: {
        value: null,
        load: function (deviceId) {
            var device = null;
            try {
                device = Client.Management().Device.Get(deviceId);
            }
            catch (e) {

            }
            this.value = device;
        }
    },
    Location: {
        Details: new Info.Location("management/device/io/input/device_io_input_details.htm"),
        Ultrasonics: new Info.Location("management/device/io/input/device_io_input_ultrasonics.htm"),
        User: {
            Users: new Info.Location("management/device/io/input/device_io_input_users.htm"),
            Details: new Info.Location("management/device/io/input/user/device_io_input_user_permissions.htm"),
        },
        Department: {
            Departments: new Info.Location("management/device/io/input/device_io_input_departments.htm"),
            Details: new Info.Location("management/device/io/input/department/device_io_input_department_permissions.htm"),
        },
    },
    Input: {
        value: new Object(),
        load: function (index, size, search) {
            var result = tryCatch(function () {
                return Client.Management().Device.IO.Input.List(Property.DeviceId, index, size, search);
            });
            if (result && result.IOInputChannel) {
                for (var i = 0; i < result.IOInputChannel.length; i++) {
                    this.value[result.IOInputChannel[i].Id] = result.IOInputChannel[i];
                    if (!this.value[result.IOInputChannel[i].Id]["Selected"])
                        this.value[result.IOInputChannel[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        remove: function (id) {
            var result = tryCatch(function (deviceId, inputId) {
                return Client.Management().Device.IO.Input.Delete(deviceId, inputId);
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
            return tryCatch(function (deviceId, inputId) {
                return Client.Management().Device.IO.Input.Get(deviceId, inputId);
            }, Property.DeviceId, id);
        },
        modify: function (input) {
            var result = tryCatch(function (deviceId, input) {
                return Client.Management().Device.IO.Input.Set(deviceId, input);
            }, Property.DeviceId, input);
            if (result) {
                return true;
            }
            return false;
        },
        create: function (input) {
            return tryCatch(function (deviceId, input) {
                return Client.Management().Device.IO.Input.Create(deviceId, input);
            }, Property.DeviceId, input);

        },
        ultrasonic: function (id) {
            return tryCatch(function (deviceId, inputId) {
                return Client.Management().Device.IO.Input.Ultrasonic.Get(deviceId, inputId);
            }, Property.DeviceId, id);
        },
        Associated: {
            common: {
                count: function (key, inputId) {
                    var response = tryCatch(function () {
                        return Client.Security().Permission.IO.Input[key].List(inputId, 1, 1);
                    });
                    if (response && response.Page)
                        return response.Page.TotalRecordCount;
                    return 0;
                },
                load: function (key, inputId, index, size) {
                    var response = tryCatch(function () {
                        return Client.Security().Permission.IO.Input[key].List(inputId, index, size);
                    });
                    return response;
                },
                remove: function (key, inputId, id) {
                    return tryCatch(function () {
                        return Client.Security().Permission.IO.Input[key].Delete(inputId, id);
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
    Control: {
        IconButton: {
            User: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Device.IO.Input.popover.User.label + id).innerText = value;
                } catch (e) { }
            },
            Department: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Device.IO.Input.popover.Department.label + id).innerText = value;
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
            Event: PageEvent.Device.IO.Input,
            createItem: function (input) {
                var alarmInProbeType = {
                    None: LabelTagColor.DarkGray,
                    Panic: LabelTagColor.Red,
                    Perimeter: LabelTagColor.DoderBlue,
                    EntranceGuard: LabelTagColor.Taro
                }
                var createControl = {
                    details: function (id, type, name, parent) {
                        var span = document.createElement("span");
                        span.innerText = name;
                        span.title = name;
                        var btn = new IconColorButton(Info.ControlIdPrefix.Device.IO.Input.item + id, "background_icon probe-type ioinput " + type.toLowerCase(), alarmInProbeType[type], 10, span);
                        btn.title = Language.Enum.AlarmInProbeType[type];
                        btn.href = Property.Location.Details.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        parent.appendChild(btn);
                    },
                    popover: function (id, key, title, className, count, href) {

                        var strLabel = "<lable id='" + Info.ControlIdPrefix.Device.IO.Input.popover[key].label + id + "'>" + count + "</lable>"
                        var icon = new IconButton(Info.ControlIdPrefix.Device.IO.Input.popover[key].value + id, className, 11, strLabel);
                        icon.className = "popover_control_item";

                        var popover = new Popover("", icon, href, title);
                        popover.className = "popover-control";
                        return popover;
                    },
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
                    edit: function (id, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Info.ControlIdPrefix.Device.IO.Input.edit + id + "' href=\"" + Property.Location.Details.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + id + "\" class=\"table-actions expand-btn\" onclick=\"return editIOInput_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    ultrasonic: function (input, control, deviceName) {
                        var btn = document.createElement("a");
                        var ico = document.createElement("div");
                        ico.className = "ultrasonic-icon";
                        btn.className = "pull-right list-lable-btn-operation";
                        btn.setAttribute("onclick", "return ultrasonic_Click(this, '" + input.Id + "')");
                        btn.href = Property.Location.Ultrasonics.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + input.Id + "&deviceName=" + deviceName + "&inputName=" + input.Name;
                        ico.title = "超声波信息";
                        btn.appendChild(ico);
                        control.appendChild(btn);
                    },
                    No: function (id, control) {
                        var no = new Id(id).ModuleId.No;
                        var label = document.createElement("label");
                        label.innerText = no;
                        label.className = "pull-right"
                        label.style.marginRight = "30px";
                        control.appendChild(label);
                    }
                }

                var id = input.Id;
                var item = GroupListItem(Info.ControlIdPrefix.Device.IO.Input.item, this.Event.GroupListItemClick);
                item.className += (" mouse_pointer" + (Property.Input.value[id].Selected ? " selected" : ""));
                item.id = Info.ControlIdPrefix.Device.IO.Input.item + id;

                createControl.details(input.Id, input.ProbeType, input.Name, item.Content);
                createControl.remove(input.Id, "PageEvent.Device.IO.Input.GroupListItemRemoveButtonClick", item.Content);
                createControl.edit(input.Id, item.Content);
                if (Property.DeviceClassification == DeviceClassification.UltrasonicProbe) {
                    Property.Device.load(Property.DeviceId);
                    createControl.ultrasonic(input, item.Content, Property.Device.value.Name);
                }
                var controls = new Array(
                    createControl.popover(input.Id, "User", "用户", "icon-user", Property.Input.Associated.User.Count(input.Id), Property.Location.User.Users.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + input.Id)
                    //createControl.popover(input.Id, "Department", "部门", "icon-group", Property.Input.Associated.Department.Count(input.Id), Property.Location.Department.Departments.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + input.Id)
                    );


                var bts = new TransverseButtonList(controls, 70, 0);
                item.Content.appendChild(bts);

                //createControl.No(input.Id, item.Content);

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
            Create: function (deviceId, deviceClassification, controlId) {
                Property.DeviceId = deviceId;
                Property.DeviceClassification = deviceClassification;
                var result = Property.Input.load(1, Property.PageSize);
                if (result) {
                    var items = this.createItems(result.IOInputChannel);
                    getTag(controlId).appendChild(new GroupList(Info.ControlIdPrefix.Device.IO.Input.list, items));
                    this.Count.Record.Set(result.Page.RecordCount);
                    this.Count.Total.Set(result.Page.TotalRecordCount);
                    LazyLoadPage = result.Page;
                }
            },
            Load: function (index, size, search) {
                var result = Property.Input.load(index, size, search);
                var items = this.createItems(result.IOInputChannel);
                var glist = getTag(Info.ControlIdPrefix.Device.IO.Input.list);
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
                var glist = getTag(Info.ControlIdPrefix.Device.IO.Input.list);
                glist.innerText = "";
                this.Count.Record.Set(0);
                this.Count.Total.Set(0);
                this.Count.Selected = 0;
            },
            Modify: function (input) {
                var item = this.createItem(input);
                var tag = getTag(Info.ControlIdPrefix.Device.IO.Input.item + input.Id);
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
                    var tag = getTag(Info.ControlIdPrefix.Device.IO.Input.item + id);
                    tag.parentElement.removeChild(tag);
                    this.Count.Total.Set(this.Count.Total.Get() - 1);
                    this.Count.Record.Set(this.Count.Record.Get() - 1);
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
                        ProbeType: {
                            value: null,
                            set: function (value) {
                                getTag("ddlProbeType").value = value
                                this.value = value;
                            }
                        },
                        TriggeringType: {
                            value: null,
                            set: function (value) {
                                getTag("ddlTriggeringType").value = value
                                this.value = value;
                            }
                        },
                        DefenceZoneId: {
                            value: null,
                            set: function (value) {
                                getTag("txtDefenceZoneId").value = value
                                this.value = value;
                            }
                        },
                        load: function () {
                            var input = this.get();
                            this.Id.set(input.Id);
                            this.ProbeType.set(input.ProbeType);
                            this.TriggeringType.set(input.TriggeringType);
                            this.Name.set(input.Name);
                            this.DefenceZoneId.set(input.DefenceZoneId);
                        },
                        get: function () {
                            var url = new Uri(Trigger.href);
                            if (url.Query) {
                                Html.InputId = url.Querys.inputId;
                            }
                            return Property.Input.get(Html.InputId);
                        },
                        create: function (input) {
                            Property.Input.create(input);
                        }

                    }
                }
            }
        },
        PopoverWindow: {
            PageSize: 12,
        }
    }
};

PageEvent.Device.IO.Input.GroupListItemClick = function (sender, args) {
    var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.IO.Input.item);
    Html.Control.GroupList.Select.Item(id);
}
PageEvent.Device.IO.Input.GroupListChanged = function (input) {
    Property.Input.modify(input);
    Html.Control.GroupList.Modify(input);
}
PageEvent.Device.IO.Input.GroupListReload = function (sender, args) {
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

PageEvent.Device.IO.Input.GroupListUserIconButtonChanged = function (id, value) {
    Html.Control.IconButton.User(id, value);
}

PageEvent.Device.IO.Input.GroupListDepartmentIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Department(id, value);
}
