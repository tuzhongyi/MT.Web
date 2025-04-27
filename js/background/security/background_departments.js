/// <reference path="../../language/chinese.js" />
/// <reference path="../../client/enum.js" />
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
        User: {
            Association: {
                list: "department_user_list_",
                remove: "department_user_list_remove_",
            },
            Unassociation: {
                list: "user_list_",
                add: "department_user_list_add_"
            },
        },
        Device:{
            Association: {
                list: "department_device_list_",
                item: "department_device_list_item",
                remove: "department_device_list_remove_",
                edit: "department_device_list_edit_",
            },
            Unassociation: {
                list: "device_list_",
                add: "department_device_list_add_"
            },
            AlertUrl: {
                details: "security/department/device/department_device_details.htm",
                permissions: "security/department/device/department_device_permissions.htm",
            }
        },
        Input: {
            Association: {
                list: "department_input_list_",
                item: "department_input_list_item",
                remove: "department_input_list_remove_",
                edit: "department_input_list_edit_",
            },
            Unassociation: {
                list: "input_list_",
                add: "department_input_list_add_"
            },
            AlertUrl: {
                details: "security/department/input/department_input_details.htm",
                permissions: "security/department/input/department_input_permissions.htm",
            }
        },
        Output: {
            Association: {
                list: "department_output_list_",
                item: "department_output_list_item",
                remove: "department_output_list_remove_",
                edit: "department_output_list_edit_",
            },
            Unassociation: {
                list: "output_list_",
                add: "department_output_list_add_"
            },
            AlertUrl: {
                details: "security/department/output/department_output_details.htm",
                permissions: "security/department/output/department_output_permissions.htm",
            }
        },
        IOInput: {
            Association: {
                list: "department_ioinput_list_",
                item: "department_ioinput_list_item",
                remove: "department_ioinput_list_remove_",
                edit: "department_ioinput_list_edit_",
            },
            Unassociation: {
                list: "ioinput_list_",
                add: "department_ioinput_list_add_"
            },
            AlertUrl: {
                details: "security/department/ioinput/department_ioinput_details.htm",
                permissions: "security/department/ioinput/department_ioinput_permissions.htm",
            }
        },
        IOOutput: {
            Association: {
                list: "department_iooutput_list_",
                item: "department_iooutput_list_item",
                remove: "department_iooutput_list_remove_",
                edit: "department_iooutput_list_edit_",
            },
            Unassociation: {
                list: "iooutput_list_",
                add: "department_iooutput_list_add_"
            },
            AlertUrl: {
                details: "security/department/iooutput/department_iooutput_details.htm",
                permissions: "security/department/iooutput/department_iooutput_permissions.htm",
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
    Search:null,
    DepartmentList:
    {
        value: new Dictionary(),
        load: function (index, size, permission, search) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                return Client.Security().Department.List(index, size, permission, search);
            });

            if (result && result.Department) {
                for (var i = 0; i < result.Department.length; i++) {
                    this.value[result.Department[i].Id] = result.Department[i];
                    if (!this.value[result.Department[i].Id]["Selected"])
                        this.value[result.Department[i].Id]["Selected"] = false;
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
                return Client.Security().Department.Delete(id);
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
                    return uri.Querys.departmentId;
                return null;
            },
        }
    },
    Control: {
        Popovers:
        {
            user: new Info.PopoverControls("用户", "icon-user", "security/department/department_users.htm?departmentId=", "UserCount"),
            device: new Info.PopoverControls("设备", "howell-icon-device", "security/department/department_devices.htm?departmentId=", "DeviceCount"),
            input: new Info.PopoverControls("视频输入通道", "icon-facetime-video", "security/department/department_inputs.htm?departmentId=", "VideoInputChannelCount"),
            output: new Info.PopoverControls("视频输出通道", "icon-desktop", "security/department/department_outputs.htm?departmentId=", "VideoOutputChannelCount"),
            ioinput: new Info.PopoverControls("报警输入通道", "icon-linkedin-sign", "security/department/department_ioinputs.htm?departmentId=", "IOInputChannelCount"),
            iooutput: new Info.PopoverControls("IO输出通道", "icon-flickr", "security/department/department_iooutputs.htm?departmentId=", "IOOutputChannelCount")
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
            User: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("user") + id).innerText = value;
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
            createItem: function (department) {
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
                    details: function (department, control) {
                        var span = document.createElement("span");
                        span.innerText = department.Name;
                        span.title = department.Name; 
                        var btn = new IconColorButton(Info.ControlIdPrefix.AlertWindow + id, "background_icon permission department " + department.Permission.toLowerCase(), permissionColor[department.Permission], 10, span);
                        btn.title = Language.Enum.UserPermission[department.Permission];
                        btn.href = "security/department/department_details.htm?departmentId=" + department.Id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        control.appendChild(btn);
                    },
                    //删除控件
                    remove: function (department, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" name='a_departmentId' class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeDepartment_Click(this, '" + department.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (department, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Info.ControlIdPrefix.Edit + department.Id + "' href=\"security/department/department_details.htm?departmentId=" + department.Id + "\" class=\"table-actions expand-btn\" onclick=\"return editDepartment_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //操作关联控件
                    popover: function (department, control) {
                        var controls = new Array();
                        for (var key in Html.Control.Popovers) {
                            var pop = Html.Control.Popovers[key];
                            var icon = new Html.Control.IconButton.create(department.Id, key, pop.ClassName, department[pop.CountKey]);
                            var popover = new Html.Control.Popover(department.Id, key, icon, pop.Url, pop.Name);
                            controls.push(popover);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0);

                        control.appendChild(bts);
                    },
                    //扩展权限标签
                    flag: function (department, control) {
                        var div = document.createElement("div");
                        div.className = "tag-maxdiv";
                        if (department.DetailPermission) {
                            var permissions = Flags.Parse(department.DetailPermission);
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
                    information: function (department, control) {
                        var div = document.createElement("div");
                        div.title = department.Information;
                        div.className = "list-item-information security";
                        if (!department.Information) {
                            div.title = "无描述信息"
                            div.className += " none";
                        }

                        div.innerText = div.title;
                        control.appendChild(div);
                    }
                };

                var id = department.Id

                var item = new GroupListItem(Info.ControlIdPrefix.GroupListItem, GrouplistItem_Click);
                item.className = item.className + " mouse_pointer" + (Property.DepartmentList.value[id].Selected ? " selected" : "");
                item.id = Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(department, item.Content);//创建权限图标和输入通道名称
                createControl.remove(department, item.Content);//创建删除按钮
                createControl.edit(department, item.Content);//创建编辑按钮
                createControl.popover(department, item.Content);//创建关联弹出框按钮组
                //createControl.flag(department, item.Content);//创建扩展权限标签
                createControl.information(department, item.Content)//创建输入通道描述信息
                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (departments) {
                var items = new GroupListItemArray();
                if (departments) {
                    for (var i = 0; i < departments.length; i++) {
                        items.push(this.createItem(departments[i]));
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {

                var result = Property.DepartmentList.load(1, Property.PageSize);

                if (result) {
                    var items = this.getItems(result.Department);
                    getTag("dList").appendChild(new GroupList("departmentGroupList", items));

                    Property.CurrentCount.set(result.Page.RecordCount);
                    Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size, permission, search) {
                var result = Property.DepartmentList.load(index, size, permission, search);
                var items = this.getItems(result.Department);
                var gList = getTag("departmentGroupList");
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
                var gList = getTag("departmentGroupList");
                gList.innerText = "";
                Property.CurrentCount.set(0);
                Property.TotalCount.set(0);
                this.selectedCount = 0;
            },
            reload: function (departments, page) {
                var list = new Array();
                var i = 0;
                for (var d in departments) {
                    list[i++] = departments[d];
                }

                this.clear();

                var items = this.getItems(list);
                var gList = getTag("departmentGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                Property.CurrentCount.set(list.length);
                Property.TotalCount.set(page.TotalRecordCount);
            },
            remove: function (id) {
                Property.DepartmentList.remove(id)
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + id);
                tag.parentElement.removeChild(tag);
                Property.CurrentCount.set(Property.CurrentCount.get() - 1);
                LazyLoadPage.TotalRecordCount--;
                var page = LazyLoadPage;
                if (Property.CurrentCount.get() < Property.TotalCount.get()) {
                    this.load(Property.CurrentCount.get() + 1, 1, Property.UserPermission, Property.Search);
                }
                LazyLoadPage = page
            },
            batchRemove: function () {
                var count = Property.DepartmentList.batchRemove();//批量删除，并返回删除的条数
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
            modify: function (department) {
                var item = Html.Control.GroupList.createItem(department);
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + department.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            selectedCount: 0,
            select: function (id) {
                Property.DepartmentList.value[id].Selected = !Property.DepartmentList.value[id].Selected;
                if (Property.DepartmentList.value[id].Selected)
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

PageEvent.Department.GroupListItemChanged = function (department) {
    Html.Control.GroupList.modify(department);
}
PageEvent.Department.GroupListReload = function (index, size, permission) {
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
PageEvent.Department.GroupListUserIconButtonChanged = function (id, value) {
    Html.Control.IconButton.User(id, value);
}
PageEvent.Department.GroupListDeviceIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Device(id, value);
}
PageEvent.Department.GroupListInputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Input(id, value);
}
PageEvent.Department.GroupListOutputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Output(id, value);
}
PageEvent.Department.GroupListIOInputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.IOInput(id, value);
}
PageEvent.Department.GroupListIOOutputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.IOOutput(id, value);
}