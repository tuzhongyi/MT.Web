if (!this.Client)
    imported.loadJS("js/client/client.js");
Property["DepartmentList"] =
{
    Association: {
        value: new Object(),
        page: new Page(),
        load: function (inputId, index, size) {
            var response = tryCatch(function () {
                return Client.Security().Permission.Video.Input.Department.List(inputId, index, size)
            });
            var result = new Object();
            if (response) {
                if (response.Department) {
                    for (var i = 0; i < response.Department.length; i++) {
                        if (this.value[response.Department[i].Id])
                            response.Department[i]["Selected"] = this.value[response.Department[i].Id].Selected;
                        this.value[response.Department[i].Id] = response.Department[i];
                        result[response.Department[i].Id] = this.value[response.Department[i].Id];
                    }
                }
                this.page = response.Page;
            }
            return result;
        },
        remove: function (inputId, departmentId) {
            var result = tryCatch(function () {
                return Client.Security().Permission.Video.Input.Department.Delete(inputId, departmentId);
            })
            if (result)
                delete this.value[departmentId];
        },
        batchRemove: function (inputId) {
            var count = 0;
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        this.remove(inputId, id); ++count;
                    } catch (e) { }
                }
            }
            return count;
        },

    },
    Unassociation: {
        value: new Object(),
        page: new Page(),
        //加载：从服务器中读取数据，并把读取到的数据保存在本地，并添加是否选中的属性
        load: function (inputId, index, size) {
            var response = tryCatch(function () {
                return Client.Security().Permission.Video.Input.Department.List(inputId, index, size, true);
            });
            var result = new Object();
            if (response && response.Department) {
                for (var i = 0; i < response.Department.length; i++) {
                    if (this.value[response.Department[i].Id])
                        response.Department[i]["Selected"] = this.value[response.Department[i].Id].Selected;
                    this.value[response.Department[i].Id] = response.Department[i];
                    result[response.Department[i].Id] = this.value[response.Department[i].Id];
                }
            }
            this.page = response.Page;
            return result;
        },
        //关联：把未关联用户添加到已关联用户中，同时删除本地内存中未关联列表中的当前用户
        add: function (inputId, departmentId, permission) {
            var input = Client.Management().Device.Video.Input.Get(Property.DeviceId, inputId);
            var videoInputChannelPermission = new VideoInputChannelPermission();
            videoInputChannelPermission.Id = input.Id;
            videoInputChannelPermission.Name = input.Name;
            videoInputChannelPermission.Permission = permission;
            videoInputChannelPermission.VideoInputChannel = input;
            Client.Security().Department.Video.Input.Create(departmentId, videoInputChannelPermission);
            delete this.value[departmentId];
            --this.page.TotalRecordCount;
        }
    },
}

Html.Control.PopoverWindow["DepartmentList"] = {
    Common: {
        createItem: function (key, department) {
            var createCoontrol = {
                icon: function (department) {
                    var btn = new IconButton("", "icon-group", 11, department.Name);
                    btn.style.maxWidth = "150px";
                    btn.title = department.Name;
                    return btn;

                },
                UnassociationOperationButton: function (department) {
                    var a = document.createElement("a");
                    a.className = "icon-plus-sign pull-right";
                    a.href = Property.Location.Department.Details.Value + "?fun=PageEvent.Device.Video.Input.Department.AddDepartmentToInput&inputId=" + Html.Control.AlertWindow.Device.Input.Details.get().Id + "&departmentId=" + department.Id
                    a.setAttribute("onclick", "return GroupListItem_InputUnassociationAddDepartment_Click(this, '" + department.Id + "')");
                    a.id = Info.ControlIdPrefix.Device.Video.Input.Department.Unassociation.add + department.Id;
                    a.title = "添加";
                    return a;
                },
                AssociationOperationButton: function (department) {
                    var a = document.createElement("a");
                    a.className = "icon-trash pull-right";
                    a.setAttribute("onclick", "GroupListItem_InputAssociationRemoveDepartment_Click(this, '" + department.Id + "')");
                    a.id = Info.ControlIdPrefix.Device.Video.Input.Department.Association.remove + department.Id;
                    a.title = "删除";
                    return a;
                },
                flag: function (department, control) {
                    var permissionColor = {
                        Information: LabelTagColor.Green,
                        System: LabelTagColor.Yellow,
                        User: LabelTagColor.DoderBlue,
                        Device: LabelTagColor.LightBlue,
                        All: LabelTagColor.Magenta
                    }
                    var div = document.createElement("div");
                    div.className = "lable-user-permission";
                    if (department.DetailPermission) {
                        var permissions = Flags.Parse(department.DetailPermission);
                        if (permissions && permissions.Value.indexOf(UserPermissions.None) < 0) {
                            if (permissions.Value.indexOf(UserPermissions.All) >= 0) {
                                permissions.Value = new Array();
                                //for (var p in UserPermissions) {
                                //    switch (p) {
                                //        case UserPermissions.All:
                                //        case UserPermissions.None:
                                //            continue;
                                //        default:
                                //            permissions.Value.push(UserPermissions[p]);
                                //    }
                                //}
                                permissions.Value.push(UserPermissions.All);
                            }
                            for (var i = 0; i < permissions.Value.length; i++) {
                                div.appendChild(new LabelTag(Language.Enum.UserPermissions[permissions.Value[i]], permissionColor[permissions.Value[i]]));
                            }
                        }
                    }
                    return div;
                }
            };
            var item = null;

            item = new GroupListItem(Info.ControlIdPrefix.Device.Video.Input.Department[key].list, eval("Input" + key + "Department_Selected"));
            item.id = Info.ControlIdPrefix.Device.Video.Input.Department[key].list + department.Id;
            item.Content.appendChild(createCoontrol[key + "OperationButton"](department));

            item.className += " mouse_pointer";
            if (Html.Control.PopoverWindow.DepartmentList[key].selected.indexOf(department.Id) >= 0)
                item.className += " selected";

            item.Content.appendChild(createCoontrol.icon(department));

            item.Content.appendChild(createCoontrol.flag(department));
            item.Content.className = "childpage-list-item-content";

            return item;
        },
        createItems: function (key, departments) {
            var items = new GroupListItemArray();
            if (departments) {
                for (var i = 0; i < departments.length; i++) {
                    items.push(this.createItem(key, departments[i]));
                }
            }
            return items;
        },
        createItemsByObj: function (key, obj) {
            if (obj) {
                var array = new Array();
                for (var id in obj) {
                    array.push(obj[id]);
                }
                if (array.length > 0)
                    return this.createItems(key, array);
            }
            return null;
        },
        clear: function (key) {
            getTag("glist_" + key.toLowerCase() + "_departments").innerText = "";
            getTag("div_" + key.toLowerCase() + "_department_paging").innerText = "";
        },
        dic: function (key) {
            return Property.DepartmentList[key].value;
        },
        load: function (key, index) {
            var result = Property.DepartmentList[key].load(Html.Control.AlertWindow.Device.Input.Details.get().Id, index, Html.Control.PopoverWindow.PageSize);
            var items = this.createItemsByObj(key, result);
            if (items) {
                var glist = new GroupList("", items);
                getTag("glist_" + key.toLowerCase() + "_departments").appendChild(glist);
                var page = Property.DepartmentList[key].page;

                pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("Input" + key + "Department_PageChange"));
                getTag("div_" + key.toLowerCase() + "_department_paging").appendChild(pagination);
            }
        },
        show: function (key) {
            $(".swith_control").css("display", "none");
            getTag("div_" + key.toLowerCase() + "_department").style.display = "block";
        }
    },
    Association: {
        Parent: function () {
            return Html.Control.PopoverWindow.DepartmentList;
        },
        key: "Association",
        list: function () {
            return this.Parent().Common.dic(this.key);
        },
        select: function (id) {
            var index = this.selected.indexOf(id);
            if (index < 0)
                this.selected.push(id);
            else
                this.selected.splice(index, 1);
        },
        selectAll: function () {
            Property.DepartmentList.Association.load(Html.Control.AlertWindow.Device.Input.Details.get().Id);
            for (var uid in Property.DepartmentList.Association.value) {
                if (departmentList.Association.selected.indexOf(uid) < 0)
                    departmentList.Association.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.DepartmentList.Association.load(Html.Control.AlertWindow.Device.Input.Details.get().Id);
            for (var uid in Property.DepartmentList.Association.value) {
                var tag = getTag(Info.ControlIdPrefix.Device.Video.Input.Department.Association.list + uid);
                var index = departmentList.Association.selected.indexOf(uid);
                if (!tag && index < 0)
                    departmentList.Association.selected.push(uid);
                if (!tag && index >= 0)
                    departmentList.Association.selected.splice(index, 1);
            }
        },
        load: function (index) {
            this.Parent().Common.load(this.key, index);
            this.totalCount.set(Property.DepartmentList.Association.page.TotalRecordCount);
            PageEvent.Device.Video.Input.GroupListDepartmentIconButtonChanged(Html.Control.AlertWindow.Device.Input.Details.get().Id, Property.DepartmentList.Association.page.TotalRecordCount);
        },
        clear: function () {
            return this.Parent().Common.clear(this.key);
            this.totalCount.set(0);
        },
        remove: function (departmentId) {
            Property.DepartmentList.Association.remove(Html.Control.AlertWindow.Device.Input.Details.get().Id, departmentId);
            this.clear();

            if (Property.DepartmentList.Association.page.RecordCount == 1 && Property.DepartmentList.Association.page.PageIndex == Property.DepartmentList.Association.page.PageCount &&
                Property.DepartmentList.Association.page.PageIndex != 1)
                --Property.DepartmentList.Association.page.PageIndex;

            this.load(Property.DepartmentList.Association.page.PageIndex);
            this.totalCount.set(Property.DepartmentList.Association.page.TotalRecordCount);

            var index = this.selected.indexOf(departmentId);
            if (index >= 0)
                this.selected.splice(index, 1);
        },
        batchRemove: function () {
            var count = 0;
            for (var i = 0; i < this.selected.length; i++) {
                Property.DepartmentList.Association.remove(Html.Control.AlertWindow.Device.Input.Details.get().Id, this.selected[i]);
                ++count;
            }

            this.totalCount.set(Property.DepartmentList.Association.page.TotalRecordCount);
            this.selected = new Array();

            if (count == Property.DepartmentList.Association.page.RecordCount && Property.DepartmentList.Association.page.PageIndex == Property.DepartmentList.Association.page.PageCount &&
                Property.DepartmentList.Association.page.PageIndex != 1)
                --Property.DepartmentList.Association.page.PageIndex;

            Html.Control.PopoverWindow.DepartmentList.Association.clear();
            Html.Control.PopoverWindow.DepartmentList.Association.load(Property.DepartmentList.Association.page.PageIndex);
        },
        removeAll: function () {
            var count = 0;
            var inputId = Html.Control.AlertWindow.Device.Input.Details.get().Id;
            for (var id in Property.DepartmentList.Association.value) {
                count += Try(function () {
                    Property.DepartmentList.Association.remove(inputId, id);
                    return 1;
                }, 0);
            }
            if (Property.DepartmentList.Association.page.TotalRecordCount != count) {
                Property.DepartmentList.Association.load(inputId, 1, Property.DepartmentList.Association.page.TotalRecordCount);
                for (var id in Property.DepartmentList.Association.value) {
                    count += Try(function () {
                        Property.DepartmentList.Association.remove(inputId, id);
                        return 1;
                    }, 0);
                }
            }
            return count;
        },
        selected: new Array(),
        totalCount: {
            value: 0,
            set: function (value) {
                getTag("lbl_association_department_count").innerText = value;
                this.value = value;
            }
        },
        show: function () {
            this.Parent().Common.show(this.key);
        }
    },
    Unassociation: {
        Parent: function () {
            return Html.Control.PopoverWindow.DepartmentList;
        },
        key: "Unassociation",
        list: function () {
            return this.Parent().Common.dic(this.key);
        },
        select: function (id) {
            if (this.selected.indexOf(id) < 0)
                this.selected.push(id);
            else
                this.selected.splice(this.selected.indexOf(id), 1);
        },
        selectAll: function () {
            Property.DepartmentList.Unassociation.load(Html.Control.AlertWindow.Device.Input.Details.get().Id);
            for (var uid in Property.DepartmentList.Unassociation.value) {
                if (departmentList.Unassociation.selected.indexOf(uid) < 0)
                    departmentList.Unassociation.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.DepartmentList.Unassociation.load(Html.Control.AlertWindow.Device.Input.Details.get().Id);
            for (var uid in Property.DepartmentList.Unassociation.value) {
                var tag = getTag(Info.ControlIdPrefix.Device.Video.Input.Department.Unassociation.list + uid);
                var index = departmentList.Unassociation.selected.indexOf(uid);
                if (!tag && index < 0)
                    departmentList.Unassociation.selected.push(uid);
                if (!tag && index >= 0)
                    departmentList.Unassociation.selected.splice(index, 1);
            }
        },
        add: function (id, permission) {
            Property.DepartmentList.Unassociation.add(Html.Control.AlertWindow.Device.Input.Details.get().Id, id, permission);

            if (Property.DepartmentList.Unassociation.page.RecordCount == 1 && Property.DepartmentList.Unassociation.page.PageIndex == Property.DepartmentList.Unassociation.page.PageCount &&
                Property.DepartmentList.Unassociation.page.PageIndex != 1)
                --Property.DepartmentList.Unassociation.page.PageIndex;

            this.load(Property.DepartmentList.Unassociation.page.PageIndex);
            var items = new GroupListItemArray();
            this.clear();
            for (var id in Property.DepartmentList.Unassociation.value) {
                var item = this.Parent().Common.createItem(this.key, Property.DepartmentList.Unassociation.value[id]);
                //items.push(Property.UserList.Unassociation.value[id]);
                getTag("glist_unassociation_departments").appendChild(item);
            }
            this.totalCount.set(Property.DepartmentList.Unassociation.page.TotalRecordCount);

            this.clear();
            this.load(Property.DepartmentList.Unassociation.page.PageIndex);

            var index = this.selected.indexOf(id);
            if (index >= 0)
                this.selected.splice(index, 1);
            PageEvent.Device.Video.Input.GroupListDepartmentIconButtonChanged(Html.Control.AlertWindow.Device.Input.Details.get().Id, ++Property.DepartmentList.Association.page.TotalRecordCount);
        },
        batchAdd: function (permission) {
            for (var i = 0; i < this.selected.length; i++) {
                try {
                    Property.DepartmentList.Unassociation.add(Html.Control.AlertWindow.Device.Input.Details.get().Id, this.selected[i], permission);
                } catch (e) {

                }
            }
            this.selected = new Array();
        },
        clear: function () {
            return this.Parent().Common.clear(this.key);
            this.totalCount.set(0);
        },
        load: function (index) {
            this.Parent().Common.load(this.key, index);
            this.totalCount.set(Property.DepartmentList.Unassociation.page.TotalRecordCount);
        },
        show: function () {
            this.Parent().Common.show(this.key);
        },
        selected: new Array(),
        totalCount: {
            value: 0,
            set: function (value) {
                getTag("lbl_unassociation_department_count").innerText = value;
                this.value = value;
            }
        }
    }
};

PageEvent.Device.Video.Input.Department.AddDepartmentToInput = function (permission, departmentId) {
    Html.Control.PopoverWindow.DepartmentList.Unassociation.add(departmentId, permission);
    var index = Html.Control.PopoverWindow.DepartmentList.Unassociation.selected.indexOf(departmentId);
    if (index > -1) {
        Html.Control.PopoverWindow.DepartmentList.Unassociation.selected.splice(index, 1);
    }
}

PageEvent.Device.Video.Input.Department.BatchAddInputsToDepartment = function (permission) {
    var count = Html.Control.PopoverWindow.DepartmentList.Unassociation.batchAdd(permission);
    Html.Control.PopoverWindow.DepartmentList.Unassociation.clear();//需要清理
    Html.Control.PopoverWindow.DepartmentList.Association.clear();
    Html.Control.PopoverWindow.DepartmentList.Association.load(1);
    Html.Control.PopoverWindow.DepartmentList.Association.show();
}