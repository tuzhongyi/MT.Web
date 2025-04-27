if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var Info =
{
    ControlIdPrefix:
    {
        GroupListItem: "group_",
        AlertWindow: "alert_",
        Edit:"edit_",
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
        Department: {
            Association: {
                list: "user_department_list_",
                remove: "user_department_list_remove_",
            },
            Unassociation: {
                list: "department_list_",
                add: "user_department_list_add_"
            },
        },
        Device: {
            Association: {
                list: "user_device_list_",
                item: "user_device_list_item",
                remove: "user_device_list_remove_",
                edit: "user_device_list_edit_",
            },
            Unassociation: {
                list: "device_list_",
                add: "user_device_list_add_"
            },
            AlertUrl: {
                details: "security/user/device/user_device_details.htm",
                permissions: "security/user/device/user_device_permissions.htm",
            }
        },
        Input: {
            Association: {
                list: "user_input_list_",
                item: "user_input_list_item",
                remove: "user_input_list_remove_",
                edit: "user_input_list_edit_",
            },
            Unassociation: {
                list: "input_list_",
                add: "user_input_list_add_"
            },
            AlertUrl: {
                details: "security/user/input/user_input_details.htm",
                permissions: "security/user/input/user_input_permissions.htm",
            }
        },
        Output: {
            Association: {
                list: "user_output_list_",
                item: "user_output_list_item",
                remove: "user_output_list_remove_",
                edit: "user_output_list_edit_",
            },
            Unassociation: {
                list: "output_list_",
                add: "user_output_list_add_"
            },
            AlertUrl: {
                details: "security/user/output/user_output_details.htm",
                permissions: "security/user/output/user_output_permissions.htm",
            }
        },
        IOInput: {
            Association: {
                list: "user_ioinput_list_",
                item: "user_ioinput_list_item",
                remove: "user_ioinput_list_remove_",
                edit: "user_ioinput_list_edit_",
            },
            Unassociation: {
                list: "ioinput_list_",
                add: "user_ioinput_list_add_"
            },
            AlertUrl: {
                details: "security/user/ioinput/user_ioinput_details.htm",
                permissions: "security/user/ioinput/user_ioinput_permissions.htm",
            }
        },
        IOOutput: {
            Association: {
                list: "user_iooutput_list_",
                item: "user_iooutput_list_item",
                remove: "user_iooutput_list_remove_",
                edit: "user_iooutput_list_edit_",
            },
            Unassociation: {
                list: "iooutput_list_",
                add: "user_iooutput_list_add_"
            },
            AlertUrl: {
                details: "security/user/iooutput/user_iooutput_details.htm",
                permissions: "security/user/iooutput/user_iooutput_permissions.htm",
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
var Property =
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
    UserPermission: null,
    Search: null,
    UserList:
    {
        value: null,
        load: function (index, size, permission, search) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                return Client.Security().User.List(index, size, permission, search);
            });

            if (result && result.User) {
                for (var i = 0; i < result.User.length; i++) {
                    this.value[result.User[i].Id] = result.User[i];
                    if (!this.value[result.User[i].Id]["Selected"])
                        this.value[result.User[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        get: function (id) {
            if (this.value)
                return this.value[id];
            return null;
        },
        remove: function (id) {
            var result = tryCatch(function () {
                return Client.Security().User.Delete(id);
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
    },
    DeviceName: {
        list: new Dictionary(),
        load: function (deviceId) {
            var result = tryCatch(function () {
                return Client.Management().Device.Get(deviceId);
            });
            if (result)
                this.list[result.Id] = result;
            return result;
        }
    }
    //Department:
    //UserList: 
}

var Html = {
    DeviceName: {
        get: function (inputId) {
            var id = new Id(inputId);
            var deviceId = id.getDeviceId();
            if (!Property.DeviceName.list[deviceId])
                Property.DeviceName.load(deviceId);
            if (Property.DeviceName.list[deviceId] && Property.DeviceName.list[deviceId].Name)
                return Property.DeviceName.list[deviceId].Name;
            return null;
        }
    },
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.userId;
                return null;
            }
        }
    },
    Control: {
        Popovers:
        {
            //department: new Info.PopoverControls("部门", "icon-group", "security/user/user_departments.htm?userId=", "DepartmentCount"),
            device: new Info.PopoverControls("设备", "howell-icon-device", "security/user/user_devices.htm?userId=", "DeviceCount"),
            input: new Info.PopoverControls("输入通道", "icon-facetime-video", "security/user/user_inputs.htm?userId=", "VideoInputChannelCount"),
            output: new Info.PopoverControls("输出通道", "icon-desktop", "security/user/user_outputs.htm?userId=", "VideoOutputChannelCount"),
            ioinput: new Info.PopoverControls("报警输入通道", "icon-linkedin-sign", "security/user/user_ioinputs.htm?userId=", "IOInputChannelCount"),
            iooutput: new Info.PopoverControls("IO输出通道", "icon-flickr", "security/user/user_iooutputs.htm?userId=", "IOOutputChannelCount")
        },
        IconButton: {
            create: function (id, key, className, count) {
                var style = "";
                if (key == "device")
                    style = "style='margin-left:-16px'";
                var strLabel = "<lable " + style + " id='" + Info.ControlIdPrefix.Popover.label(key) + id + "'>" + count + "</lable>"
                var icon = new IconButton(Info.ControlIdPrefix.Popover.icon(key) + id, className, 11, strLabel);
                icon.className = "popover_control_item";
                return icon;
            },
            Department: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("department") + id).innerText = value;
                } catch (e) { }
            },
            Device: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("device") + id).innerText = value;
                } catch (e) { }
            },
            Input: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("input") + id).innerText = value;
                } catch (e) { }

            },
            Output: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("output") + id).innerText = value;
                } catch (e) { }
            },
            IOInput: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("ioinput") + id).innerText = value;
                } catch (e) { }

            },
            IOOutput: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("iooutput") + id).innerText = value;
                } catch (e) { }
            },
        },

        Popover: function (id, key, value, url, name) {
            var popover = new Popover(Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            popover.className = "popover-control";
            return popover;
        },
        GroupList: {
            createItem: function (user) {
                //扩展权限所使用的颜色
                var detailPermissionColor = {
                    Information: LabelTagColor.Green,
                    System: LabelTagColor.Yellow,
                    User: LabelTagColor.DoderBlue,
                    Device: LabelTagColor.LightBlue
                }
                var permissionColor = {
                    Anonymous: LabelTagColor.Yellow,
                    Operator: LabelTagColor.Green,
                    Administrator: LabelTagColor.Magenta,
                    Extended: LabelTagColor.LightBlue
                };
                //创建控件
                var createControl = {
                    //输入通道名称，点击后显示相信信息
                    details: function (user, control) {
                        var span = document.createElement("span");
                        span.innerText = user.Username;
                        span.title = user.Username;
                        var btn = new IconColorButton(Info.ControlIdPrefix.AlertWindow + id, "background_icon permission user " + user.Permission.toLowerCase(), permissionColor[user.Permission], 10, user.Username);
                        btn.title = Language.Enum.UserPermission[user.Permission];
                        btn.href = "security/user/user_details.htm?userId=" + user.Id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        control.appendChild(btn);
                    },
                    //删除控件
                    remove: function (user, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" name='a_userId' class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeUser_Click(this, '" + user.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (user, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Info.ControlIdPrefix.Edit + user.Id + "' href=\"security/user/user_details.htm?userId=" + user.Id + "\" class=\"table-actions expand-btn\" onclick=\"return editUser_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //操作关联控件
                    popover: function (user, control) {
                        var controls = new Array();
                        for (var key in Html.Control.Popovers) {
                            var pop = Html.Control.Popovers[key];
                            var icon = new Html.Control.IconButton.create(user.Id, key, pop.ClassName, user[pop.CountKey]);
                            var popover = new Html.Control.Popover(user.Id, key, icon, pop.Url, pop.Name);
                            controls.push(popover);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0);

                        control.appendChild(bts);
                    },
                    //扩展权限标签
                    flag: function (user, control) {
                        var div = document.createElement("div");
                        div.className = "tag-maxdiv";
                        if (user.DetailPermission) {
                            var permissions = Flags.Parse(user.DetailPermission);
                            if (permissions && permissions.Value.indexOf(UserPermissions.None) < 0) {
                                if (permissions.Value.indexOf(UserPermissions.All) >= 0) {
                                    permissions.Value = new Array();
                                    for (var p in UserPermissions) {
                                        switch (p) {
                                            case UserPermissions.All:
                                            case UserPermissions.None:
                                                continue;
                                            default:
                                                permissions.Value.push(UserPermissions[p]);
                                        }
                                    }
                                }
                                for (var i = 0; i < permissions.Value.length; i++) {
                                    div.appendChild(new LabelTag(Language.Enum.UserPermissions[permissions.Value[i]], detailPermissionColor[permissions.Value[i]]));
                                }
                            }
                        }
                        control.appendChild(div);
                    },
                    nickname: function (user, control) {
                        var div = document.createElement("div");
                        div.title = user.Nickname;
                        div.className = "list-item-information nickname";
                        if (!user.Nickname) {
                            div.title = "无昵称"
                            div.className += " none";
                        }
                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                    information: function (user, control) {
                        var div = document.createElement("div");
                        div.title = user.Information;
                        div.className = "list-item-information user_info";
                        if (!user.Information) {
                            div.title = "无描述信息"
                            div.className += " none";
                        }

                        div.innerText = div.title;
                        control.appendChild(div);
                    }
                };

                var id = user.Id

                var item = new GroupListItem(Info.ControlIdPrefix.GroupListItem, GrouplistItem_Click);
                item.className = item.className + " mouse_pointer" + (Property.UserList.value[id].Selected ? " selected" : "");
                item.id = Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(user, item.Content);//创建权限图标和输入通道名称               
                createControl.remove(user, item.Content);//创建删除按钮
                createControl.edit(user, item.Content);//创建编辑按钮
                createControl.popover(user, item.Content);//创建关联弹出框按钮组
                //createControl.flag(user, item.Content);//创建扩展权限标签
                createControl.information(user, item.Content)//创建输入通道描述信息
                createControl.nickname(user, item.Content);//创建昵称
                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (users) {
                var items = new GroupListItemArray();
                if (users) {
                    for (var i = 0; i < users.length; i++) {
                        items.push(this.createItem(users[i]));
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {

                var result = Property.UserList.load(1, Property.PageSize);

                if (result) {
                    var items = this.getItems(result.User);
                    getTag("dList").appendChild(new GroupList("userGroupList", items));

                    Property.CurrentCount.set(result.Page.RecordCount);
                    Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size, permission, search) {
                var result = Property.UserList.load(index, size, permission, search);
                var items = this.getItems(result.User);
                var gList = getTag("userGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                var old = Property.CurrentCount.get();
                Property.CurrentCount.set(old + result.Page.RecordCount);
                Property.TotalCount.set(result.Page.TotalRecordCount);
                LazyLoadPage = result.Page;
            },
            //清空列表
            clear: function () {
                var gList = getTag("userGroupList");
                gList.innerText = "";
                Property.CurrentCount.set(0);
                Property.TotalCount.set(0);
                this.selectedCount = 0;
            },
            reload: function (users, page) {
                var list = new Array();
                var i = 0;
                for (var d in users) {
                    list[i++] = users[d];
                }

                this.clear();

                var items = this.getItems(list);
                var gList = getTag("userGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                Property.CurrentCount.set(list.length);
                Property.TotalCount.set(page.TotalRecordCount);
            },
            remove: function (id) {
                Property.UserList.remove(id)
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + id);
                tag.parentElement.removeChild(tag);
                Property.CurrentCount.set(Property.CurrentCount.get() - 1);
                LazyLoadPage.TotalRecordCount--;
                var page = LazyLoadPage;
                if (Property.CurrentCount.get() < Property.TotalCount.get()) {
                    this.load(Property.CurrentCount.get() + 1, 1, Property.UserPermission, Property.Search);
                }
                LazyLoadPage = page;
            },
            batchRemove:function()
            {
                var count = Property.UserList.batchRemove();//批量删除，并返回删除的条数                
                this.selectedCount -= count;
                if (count == 0)
                    return;
                var index = Math.floor(count / Property.PageSize);
                LazyLoadPage.PageIndex -= index;

                if ((count % Property.PageSize) == 0)
                    LazyLoadPage.PageIndex++;

                this.clear();
                var page = LazyLoadPage;
                this.load(1, Property.PageSize * LazyLoadPage.PageIndex, Property.UserPermission, Property.Search);
                LazyLoadPage = page;
            },
            modify: function (user) {
                var item = Html.Control.GroupList.createItem(user);
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + user.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            selectedCount: 0,
            select: function (id) {
                Property.UserList.value[id].Selected = !Property.UserList.value[id].Selected;
                if (Property.UserList.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
        },
        //AlertWindow
        PopoverWindow: {
            PageSize: 12
            //UserList
        }
    }
}

PageEvent.User.GroupListItemChanged = function (user) {
    Html.Control.GroupList.modify(user);
}
PageEvent.User.GroupListReload = function (index, size, permission) {
    //Html.Control.GroupList.clear();
    //var page = LazyLoadPage;
    //Html.Control.GroupList.load(index, size, permission);
    //LazyLoadPage = page;

    Html.Control.GroupList.clear();
    var page = LazyLoadPage;
    Html.Control.GroupList.load(index, size, permission, Property.Search);
    page.TotalRecordCount = LazyLoadPage.TotalRecordCount;
    page.PageCount = Math.ceil(page.TotalRecordCount / Property.PageSize);
    LazyLoadPage = page;
}
PageEvent.User.GroupListDepartmentIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Department(id, value);
}
PageEvent.User.GroupListDeviceIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Device(id, value);
}
PageEvent.User.GroupListInputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Input(id, value);
}
PageEvent.User.GroupListOutputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Output(id, value);
}
PageEvent.User.GroupListIOInputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.IOInput(id, value);
}
PageEvent.User.GroupListIOOutputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.IOOutput(id, value);
}