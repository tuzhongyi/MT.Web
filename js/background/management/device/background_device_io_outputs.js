var Info = {
    ControlIdPrefix: {
        Device:
        {
            IO: {
                Output: {
                    list: "device_io_output_list_",
                    item: "device_io_output_item_",
                    edit: "edit_",
                    popover: {
                        User: {
                            value: "device_io_output_user_popover_",
                            label: "device_io_output_user_popover_label_"
                        },
                        Department: {
                            value: "device_io_output_department_popover_",
                            label: "device_io_output_department_popover_label_"
                        },
                    },
                    User: {
                        Association: {
                            list: "device_io_output_user_list_",
                            remove: "device_io_output_user_list_remove_",
                        },
                        Unassociation: {
                            list: "user_list_",
                            add: "device_io_output_user_list_add_"
                        },
                    },
                    Department: {
                        Association: {
                            list: "device_io_output_department_list_",
                            remove: "device_io_output_department_list_remove_",
                        },
                        Unassociation: {
                            list: "department_list_",
                            add: "device_io_output_department_list_add_"
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
    DeviceId: null,
    PageSize: 20,
    Search: null,
    Location: {
        Details: new Info.Location("management/device/io/output/device_io_output_details.htm"),
        User: {
            Users: new Info.Location("management/device/io/output/device_io_output_users.htm"),
            Details: new Info.Location("management/device/io/output/user/device_io_output_user_permissions.htm"),
        },
        Department: {
            Departments: new Info.Location("management/device/io/output/device_io_output_departments.htm"),
            Details: new Info.Location("management/device/io/output/department/device_io_output_department_permissions.htm"),
        }
    },
    Output: {
        value: new Object(),
        load: function (index, size, search) {
            var result = tryCatch(function () {
                return Client.Management().Device.IO.Output.List(Property.DeviceId, index, size, search);
            });
            if (result && result.IOOutputChannel) {
                for (var i = 0; i < result.IOOutputChannel.length; i++) {
                    this.value[result.IOOutputChannel[i].Id] = result.IOOutputChannel[i];
                    if (!this.value[result.IOOutputChannel[i].Id]["Selected"])
                        this.value[result.IOOutputChannel[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        remove: function (id) {
            var result = tryCatch(function (deviceId, outputId) {
                return Client.Management().Device.IO.Output.Delete(deviceId, outputId);
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
            return tryCatch(function (deviceId, outputId) {
                return Client.Management().Device.IO.Output.Get(deviceId, outputId);
            }, Property.DeviceId, id);
        },
        modify: function (output) {
            var result = tryCatch(function (deviceId, output) {
                return Client.Management().Device.IO.Output.Set(deviceId, output);
            }, Property.DeviceId, output);
            if (result) {
                return true;
            }
            return false;
        },
        create: function (output) {
            return tryCatch(function (deviceId, output) {
                return Client.Management().Device.IO.Output.Create(deviceId, output);
            }, Property.DeviceId, output);

        },
        Associated: {
            common: {
                count: function (key, outputId) {
                    var response = tryCatch(function () {
                        return Client.Security().Permission.IO.Output[key].List(outputId, 1, 1);
                    });
                    if (response && response.Page)
                        return response.Page.TotalRecordCount;
                    return 0;
                },
                load: function (key, outputId, index, size) {
                    var response = tryCatch(function () {
                        return Client.Security().Permission.IO.Output[key].List(outputId, index, size);
                    });
                    return response;
                },
                remove: function (key, outputId, id) {
                    return tryCatch(function () {
                        return Client.Security().Permission.IO.Output[key].Delete(outputId, id);
                    });
                }
            },
            User: {
                key: "User",
                value: new Object(),
                common: function () {
                    return Property.Output.Associated.common
                },
                Count: function (outputId) {
                    return this.common().count(this.key, outputId);
                },
                load: function (outputId, index, size) {
                    return this.common().list(this.key, outputId, index, size);
                },
                remove: function (outputId, userId) {
                    var response = this.common().remove(this.key, outputId, userId);
                    delete this.value[userId];
                }
            },
            Department: {
                key: "Department",
                value: new Object(),
                common: function () {
                    return Property.Output.Associated.common
                },
                Count: function (outputId) {
                    return this.common().count(this.key, outputId);
                },
                load: function (outputId, index, size) {
                    return this.common().list(this.key, outputId, index, size);
                },
                remove: function (outputId, userId) {
                    return this.common().remove(this.key, outputId, userId);

                }
            },
        }
    }
};

var Html = {
    OutputId: null,
    Control: {
        IconButton: {
            User: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Device.IO.Output.popover.User.label + id).innerText = value;
                } catch (e) { }
            },
            Department: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Device.IO.Output.popover.Department.label + id).innerText = value;
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
            Event: PageEvent.Device.IO.Output,
            createItem: function (output) {
                var ioOutputTriggeringType = {
                    None: LabelTagColor.DarkGray,
                    Low: LabelTagColor.Green,
                    High: LabelTagColor.Yellow,
                }

                var createControl = {
                    details: function (id, type, name, parent) {
                        var span = document.createElement("span");
                        span.innerText = name;
                        span.title = name;
                        var btn = new IconColorButton(Info.ControlIdPrefix.Device.IO.Output.item + id, "background_icon iooutput ", ioOutputTriggeringType[type], 10, span);
                        btn.title = Language.Enum.IOOutputTriggeringType[type];
                        btn.href = Property.Location.Details.Value + "?deviceId=" + Property.DeviceId + "&outputId=" + id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        parent.appendChild(btn);
                    },
                    popover: function (id, key, title, className, count, href) {

                        var strLabel = "<lable id='" + Info.ControlIdPrefix.Device.IO.Output.popover[key].label + id + "'>" + count + "</lable>"
                        var icon = new IconButton(Info.ControlIdPrefix.Device.IO.Output.popover[key].value + id, className, 11, strLabel);
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
                        btn.appendChild($("<a title=\"编辑\" id='" + Info.ControlIdPrefix.Device.IO.Output.edit + id + "' href=\"" + Property.Location.Details.Value + "?deviceId=" + Property.DeviceId + "&outputId=" + id + "\" class=\"table-actions expand-btn\" onclick=\"return editIOOutput_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
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

                var id = output.Id;
                var item = GroupListItem(Info.ControlIdPrefix.Device.IO.Output.item, this.Event.GroupListItemClick);
                item.className += (" mouse_pointer" + (Property.Output.value[id].Selected ? " selected" : ""));
                item.id = Info.ControlIdPrefix.Device.IO.Output.item + id;

                createControl.details(output.Id, output.TriggeringType ? output.TriggeringType : "None", output.Name, item.Content);
                createControl.remove(output.Id, "PageEvent.Device.IO.Output.GroupListItemRemoveButtonClick", item.Content);
                createControl.edit(output.Id, item.Content);

                var controls = new Array(
                    createControl.popover(output.Id, "User", "用户", "icon-user", Property.Output.Associated.User.Count(output.Id), Property.Location.User.Users.Value + "?deviceId=" + Property.DeviceId + "&outputId=" + output.Id)
                    //createControl.popover(output.Id, "Department", "部门", "icon-group", Property.Output.Associated.Department.Count(output.Id), Property.Location.Department.Departments.Value + "?deviceId=" + Property.DeviceId + "&outputId=" + output.Id)
                    );


                var bts = new TransverseButtonList(controls, 70, 0);
                item.Content.appendChild(bts);

                //createControl.No(output.Id, item.Content);

                item.Content.className = "list-group-item-content";



                return item;
            },
            createItems: function (outputs) {
                var items = new GroupListItemArray();
                if (outputs) {
                    for (var i = 0; i < outputs.length; i++) {
                        items.push(this.createItem(outputs[i]));
                    }
                }
                return items;
            },
            createItemsByObj: function (outputObj) {
                if (outputObj) {
                    var outputs = new Array();
                    var i = 0;
                    for (var key in outputObj) {
                        outputs[i++] = outputObj[key];
                    }
                    return this.createItems(outputs);
                }
                return null;
            },
            Create: function (deviceId, controlId) {
                Property.DeviceId = deviceId;
                var result = Property.Output.load(1, Property.PageSize);
                if (result) {
                    var items = this.createItems(result.IOOutputChannel);
                    getTag(controlId).appendChild(new GroupList(Info.ControlIdPrefix.Device.IO.Output.list, items));
                    this.Count.Record.Set(result.Page.RecordCount);
                    this.Count.Total.Set(result.Page.TotalRecordCount);
                    LazyLoadPage = result.Page;
                }
            },
            Load: function (index, size, search) {
                var result = Property.Output.load(index, size, search);
                var items = this.createItems(result.IOOutputChannel);
                var glist = getTag(Info.ControlIdPrefix.Device.IO.Output.list);
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
                var glist = getTag(Info.ControlIdPrefix.Device.IO.Output.list);
                glist.innerText = "";
                this.Count.Record.Set(0);
                this.Count.Total.Set(0);
                this.Count.Selected = 0;
            },
            Modify: function (output) {
                var item = this.createItem(output);
                var tag = getTag(Info.ControlIdPrefix.Device.IO.Output.item + output.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            Select: {
                All: function () {
                    this.Cancel();
                    for (var id in Property.Output.value) {
                        Property.Output.value[id].Selected = true;
                        ++Html.Control.GroupList.Count.Selected
                    }
                },
                Cancel: function () {
                    for (var id in Property.Output.value) {
                        Property.Output.value[id].Selected = false;
                    }
                    Html.Control.GroupList.Count.Selected = 0;
                },
                Item: function (id) {
                    Property.Output.value[id].Selected = !Property.Output.value[id].Selected;
                    if (Property.Output.value[id].Selected)
                        ++Html.Control.GroupList.Count.Selected;
                    else
                        --Html.Control.GroupList.Count.Selected;
                },
            },
            Remove: function (id) {
                var isSelected = Property.Output.value[id].Selected;
                if (Property.Output.remove(id)) {
                    var tag = getTag(Info.ControlIdPrefix.Device.IO.Output.item + id);
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
                for (var id in Property.Output.value) {
                    if (Property.Output.value[id].Selected) {
                        if (Property.Output.remove(id)) {
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
                Output: {
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
                        TriggeringType: {
                            value: null,
                            set: function (value) {
                                getTag("ddlTriggeringType").value = value
                                this.value = value;
                            }
                        },
                        load: function () {
                            var output = this.get();
                            this.Id.set(output.Id);
                            this.TriggeringType.set(output.TriggeringType);
                            this.Name.set(output.Name);
                        },
                        get: function () {
                            var url = new Uri(Trigger.href);
                            if (url.Query) {
                                Html.OutputId = url.Querys.outputId;
                            }
                            return Property.Output.get(Html.OutputId);
                        },
                        create: function (output) {
                            Property.Output.create(output);
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

PageEvent.Device.IO.Output.GroupListItemClick = function (sender, args) {
    var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Device.IO.Output.item);
    Html.Control.GroupList.Select.Item(id);
}
PageEvent.Device.IO.Output.GroupListChanged = function (output) {
    Property.Output.modify(output);
    Html.Control.GroupList.Modify(output);
}
PageEvent.Device.IO.Output.GroupListReload = function (sender, args) {
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
PageEvent.Device.IO.Output.GroupListUserIconButtonChanged = function (id, value) {
    Html.Control.IconButton.User(id, value);
}

PageEvent.Device.IO.Output.GroupListDepartmentIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Department(id, value);
}