if (!this.Client)
    imported.loadJS("js/client/client.js");

//信息
var Info =
{
    ControlIdPrefix:
    {
        GroupListItem: "group_",
        AlertWindow: "alert_",
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
            },
            Unassociation: {
                list: "device_list_",
                add: "user_device_list_add_"
            },
            AlertUrl: {
                details: "user/device/user_device_details.htm",
                permissions: "user/device/user_device_permissions.htm",
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
}

//属性
var Property =
{
    Count: {
        get: function (id, fn) {
            var result = fn.List(id, 1, 1);
            return result.Page.TotalRecordCount;
        },
        Department: function (id) {
            return Property.Count.get(id, Client.Security().User.Department);
        },
        //设备总数
        Device: function (id) {
            return Property.Count.get(id, Client.Security().User.Device);
        },
        //视频输入源总数
        VideoInputSource: function (id) {
            return Property.Count.get(id, Client.Security().User.Video.Input);
        },
        //视频输出源总数
        VideoOutputSource: function (id) {
            return Property.Count.get(id, Client.Security().User.Video.Output);
        }
    },

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
    UserList:
    {
        value: null,
        load: function (index, size, permission) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                return Client.Security().User.List(index, size, permission);
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
                        this.remove(id); count++;
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
            department: new Info.PopoverControls("输入通道", "icon-group", "user/user_departments.htm?userId=", Property.Count.Department),
            device: new Info.PopoverControls("设备", "icon-laptop", "user/user_devices.htm?userId=", Property.Count.Device),
            input: new Info.PopoverControls("输入通道", "icon-facetime-video", "user/user_inputs.htm?userId=", Property.Count.VideoInputSource),
            output: new Info.PopoverControls("输出通道", "icon-film", "user/user_outputs.htm?userId=", Property.Count.VideoOutputSource)
        },
        IconButton:  {
            create: function (id, key, className, getCountFn) {
                var strLabel = "<lable id='" + Info.ControlIdPrefix.Popover.label(key) + id + "'>" + getCountFn(id) + "</lable>"
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
            }
        },
        Popover: function (id, key, value, url, name) {
            var popover = new Popover(Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            popover.className = "popover-control";
            return popover;
        },
        GroupList: {
            createItem: function (user) {
                //扩展权限所使用的颜色
                var detailpermissionColor = {
                    Information: LabelTagColor.Green,
                    System: LabelTagColor.Yellow,
                    User: LabelTagColor.DoderBlue,
                    Device: LabelTagColor.LightBlue
                }
                var permissionColor = {
                    Anonymous: LabelTagColor.Yellow,
                    Operator: LabelTagColor.Green,
                    Administrator: LabelTagColor.Magenta,
                    Extended: LabelTagColor.LightBlue,
                }
                //创建控件
                var createControl = {
                    //输入通道名称，点击后显示相信信息
                    details: function (user, control) {
                        var span = document.createElement("span");
                        span.innerText = user.Username;
                        span.title = user.Username;
                        var btn = new IconColorButton("", "background_icon permission user " + user.Permission.toLowerCase(), permissionColor[user.Permission], 10, span);
                        var win = new AlertWindow(Info.ControlIdPrefix.AlertWindow + id, btn, "user/user_details.htm?userId=" + user.Id, -1);
                        win.className = "list-group-item-name";
                        win.title = Language.Enum.UserPermission[user.Permission];
                        control.appendChild(win);
                    },
                    //删除控件
                    remove: function (user, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" name='a_userId' class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeUser_Click(this, '" + user.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //操作关联控件
                    popover: function (user, control) {
                        var controls = new Array();
                        for (var key in Html.Control.Popovers) {
                            var pop = Html.Control.Popovers[key];
                            var icon = new Html.Control.IconButton.create(user.Id, key, pop.ClassName, pop.Fun);
                            var popover = new Html.Control.Popover(user.Id, key, icon, pop.Url, pop.Name);
                            controls.push(popover);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0)
                        //bts.className += " popover_control";
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
                                    div.appendChild(new LabelTag(Language.Enum.UserPermissions[permissions.Value[i]], detailpermissionColor[permissions.Value[i]]));
                                }
                            }
                        }
                        control.appendChild(div);
                    },
                    information: function (user, control) {
                        var div = document.createElement("div");
                        div.title = user.Information;
                        div.className = "list-item-information security";
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
                item.className = item.className + " mouse_pointer";
                item.id = Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(user, item.Content);//创建权限图标和输入通道名称
                createControl.remove(user, item.Content);//创建删除按钮
                createControl.popover(user, item.Content);//创建关联弹出框按钮组
                //createControl.flag(user, item.Content);//创建扩展权限标签
                createControl.information(user, item.Content);//创建描述信息

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
            load: function (index, size, permission) {
                var result = Property.UserList.load(index, size, permission);
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
        PopoverWindow: {
            PageSize: 12
            //DepartmentList
        }
    }
}