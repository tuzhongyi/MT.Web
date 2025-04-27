if (!this.Client)
    imported.loadJS("js/client/client.js");


Html.Control.PopoverWindow["DeviceList"] = {
    Common: {
        createItem: function (key, device) {
            var createCoontrol = {
                UnassociationIcon: function (device) {                 
                    var btn = new IconButton("", "howell-icon-device", 11, device.Name);
                    btn.title = device.Name;
                    return btn;
                },
                AssociationIcon: function (device) {
                    var btn = new IconButton("", "howell-icon-device", 11, device.Name);
                    btn.style.maxWidth = "190px";
                    var a = new AlertWindow("", btn, Info.ControlIdPrefix.Device.AlertUrl.details + "?departmentId=" + Html.Current.Id.get() + "&deviceId=" + device.Id, -1, true);
                    a.title = device.Name;
                    //a.className = "list-group-item-name little";
                    a.className = "alert-window-item";
                    return a;
                },
                UnassociationOperationButton: function (device, control) {
                    var a = document.createElement("a");
                    a.title = "添加";
                    //a.className = "icon-plus-sign pull-right expand-btn little";
                    a.className = "icon-plus-sign pull-right";
                    a.href = Info.ControlIdPrefix.Device.AlertUrl.permissions + "?fun=PageEvent.Device.AddDeviceToDepartment&departmentId=" + Html.Current.Id.get() + "&deviceId=" + device.Id
                    a.setAttribute("onclick", "return GroupListItem_DepartmentUnassociationAddDevice_Click(this, '" + device.Id + "')");
                    a.id = Info.ControlIdPrefix.Device.Unassociation.add + device.Id;
                    control.appendChild(a);
                },
                AssociationOperationButton: function (device, control) {
                    var a = document.createElement("a");
                    a.title = "删除";
                    //a.className = "icon-trash pull-right expand-btn little";
                    a.className = "icon-trash pull-right";
                    a.setAttribute("onclick", "GroupListItem_DepartmentAssociationRemoveDevice_Click(this, '" + device.Id + "')");
                    a.id = Info.ControlIdPrefix.Device.Association.remove + device.Id;
                    control.appendChild(a);

                    a = document.createElement("a");
                    a.className = "icon-edit pull-right";
                    a.href = Info.ControlIdPrefix.Device.AlertUrl.details + "?departmentId=" + Html.Current.Id.get() + "&deviceId=" + device.Id;
                    a.setAttribute("onclick", "return EditDevice_Click(this)");
                    a.id = Info.ControlIdPrefix.Device.Association.edit + device.Id;
                    a.title = "编辑";
                    a.style.marginRight = "5px";
                    control.appendChild(a);
                },
                flag: function (device, control) {
                    var permissionColor = {
                        System: LabelTagColor.Green,
                        Media: LabelTagColor.Yellow,
                        Logs: LabelTagColor.Red,
                    }
                    var div = document.createElement("div");
                    div.className = "lable-user-permission";
                    if (device.Permission) {
                        var permissions = Flags.Parse(device.Permission);
                        if (permissions && permissions.Value.indexOf(DevicePermissions.None) < 0) {
                            if (permissions.Value.indexOf(DevicePermissions.All) >= 0) {
                                permissions.Value = new Array();
                                for (var p in DevicePermissions) {
                                    switch (p) {
                                        case DevicePermissions.All:
                                        case DevicePermissions.None:
                                            continue;
                                        default:
                                            permissions.Value.push(DevicePermissions[p]);
                                    }
                                }
                            }
                            for (var i = 0; i < permissions.Value.length; i++) {
                                div.appendChild(new LabelTag(Language.Enum.DevicePermissions[permissions.Value[i]], permissionColor[permissions.Value[i]]));
                            }
                        }
                    }
                    return div;
                }
            };
            var item = null;

            item = new GroupListItem(Info.ControlIdPrefix.Device[key].list, eval("Department" + key + "Device_Selected"));
            item.id = Info.ControlIdPrefix.Device[key].list + device.Id;
            //item.Content.appendChild(createCoontrol[key + "OperationButton"](device));
            createCoontrol[key + "OperationButton"](device, item.Content);

            item.className += " mouse_pointer";
            if (Html.Control.PopoverWindow.DeviceList[key].selected.indexOf(device.Id) >= 0)
                item.className += " selected";

            item.Content.appendChild(createCoontrol[key + "Icon"](device));
            item.Content.appendChild(createCoontrol.flag(device));
            item.Content.className = "childpage-list-item-content";

            return item;
        },
        createItems: function (key, devices) {
            var items = new GroupListItemArray();
            if (devices) {
                for (var i = 0; i < devices.length; i++) {
                    items.push(this.createItem(key, devices[i]));
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
            getTag("glist_" + key.toLowerCase() + "_devices").innerText = "";
            getTag("div_" + key.toLowerCase() + "_device_paging").innerText = "";
        },
        dic: function (key) {
            return Property.DeviceList[key].value;
        },
        load: function (key, index) {
            var result = Property.DeviceList[key].load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
            var items = this.createItemsByObj(key, result);
            if (items) {
                var glist = new GroupList("", items);
                getTag("glist_" + key.toLowerCase() + "_devices").appendChild(glist);
                var page = Property.DeviceList[key].page;

                pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("Department" + key + "Device_PageChange"));
                getTag("div_" + key.toLowerCase() + "_device_paging").appendChild(pagination);
            }
        },
        show: function (key) {
            $(".swith_control").css("display", "none");
            getTag("div_" + key.toLowerCase() + "_device").style.display = "block";
        }
    },
    Association: {
        Parent: function () {
            return Html.Control.PopoverWindow.DeviceList;
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
            Property.DeviceList.Association.load(Html.Current.Id.get());
            for (var uid in Property.DeviceList.Association.value) {
                if (deviceList.Association.selected.indexOf(uid) < 0)
                    deviceList.Association.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.DeviceList.Association.load(Html.Current.Id.get());
            for (var uid in Property.DeviceList.Association.value) {
                var tag = getTag(Info.ControlIdPrefix.Device.Association.list + uid);
                var index = deviceList.Association.selected.indexOf(uid);
                if (!tag && index < 0)
                    deviceList.Association.selected.push(uid);
                if (!tag && index >= 0)
                    deviceList.Association.selected.splice(index, 1);
            }
        },
        load: function (index) {
            this.Parent().Common.load(this.key, index);
            this.totalCount.set(Property.DeviceList.Association.page.TotalRecordCount);
            PageEvent.Department.GroupListDeviceIconButtonChanged(Html.Current.Id.get(), Property.DeviceList.Association.page.TotalRecordCount);
        },
        clear: function () {
            return this.Parent().Common.clear(this.key);
            this.totalCount.set(0);
        },
        remove: function (deviceId) {
            Property.DeviceList.Association.remove(Html.Current.Id.get(), deviceId);
            this.clear();

            if (Property.DeviceList.Association.page.RecordCount == 1 && Property.DeviceList.Association.page.PageIndex == Property.DeviceList.Association.page.PageCount && Property.DeviceList.Association.page.PageIndex != 1)
                --Property.DeviceList.Association.page.PageIndex;

            this.load(Property.DeviceList.Association.page.PageIndex, 11);
            this.totalCount.set(Property.DeviceList.Association.page.TotalRecordCount);

            var index = this.selected.indexOf(deviceId);
            if (index >= 0)
                this.selected.splice(index, 1);
        },
        batchRemove: function () {
            var count = 0;
            for (var i = 0; i < this.selected.length; i++) {
                Property.DeviceList.Association.remove(Html.Current.Id.get(), this.selected[i]);
                ++count;
            }

            this.totalCount.set(Property.DeviceList.Association.page.TotalRecordCount);
            this.selected = new Array();

            if (count == Property.DeviceList.Association.page.RecordCount && Property.DeviceList.Association.page.PageIndex == Property.DeviceList.Association.page.PageCount && Property.DeviceList.Association.page.PageIndex != 1)
                --Property.DeviceList.Association.page.PageIndex;

            Html.Control.PopoverWindow.DeviceList.Association.clear();
            Html.Control.PopoverWindow.DeviceList.Association.load(Property.DeviceList.Association.page.PageIndex);
        },
        modify: function (device) {
            var item = this.Parent().Common.createItem(this.key, device);
            var tag = getTag(Info.ControlIdPrefix.Device.Association.list + device.Id);
            if (item) {
                tag.parentElement.replaceChild(item, tag);
                return true;
            }

            return false;
        },
        removeAll: function () {
            var count = 0;
            var departmentId = Html.Current.Id.get();
            for (var id in Property.DeviceList.Association.value) {
                count += Try(function () {
                    Property.DeviceList.Association.remove(departmentId, id);
                    return 1;
                }, 0);
            }
            if (Property.DeviceList.Association.page.TotalRecordCount != count) {
                Property.DeviceList.Association.load(departmentId, 1, Property.DeviceList.Association.page.TotalRecordCount);
                for (var id in Property.DeviceList.Association.value) {
                    count += Try(function () {
                        Property.DeviceList.Association.remove(departmentId, id);
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
                getTag("lbl_association_device_count").innerText = value;
                this.value = value;
            }
        },
        show: function () {
            this.Parent().Common.show(this.key);
        }
    },
    Unassociation: {
        Parent: function () {
            return Html.Control.PopoverWindow.DeviceList;
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
            Property.DeviceList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.DeviceList.Unassociation.value) {
                if (deviceList.Unassociation.selected.indexOf(uid) < 0)
                    deviceList.Unassociation.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.DeviceList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.DeviceList.Unassociation.value) {
                var tag = getTag(Info.ControlIdPrefix.Device.Unassociation.list + uid);
                var index = deviceList.Unassociation.selected.indexOf(uid);
                if (!tag && index < 0)
                    deviceList.Unassociation.selected.push(uid);
                if (!tag && index >= 0)
                    deviceList.Unassociation.selected.splice(index, 1);
            }
        },
        add: function (id, permission) {
            var device = Property.DeviceList.Unassociation.value[id];
            device.Permission = permission;
            Property.DeviceList.Unassociation.add(Html.Current.Id.get(), device);

            if (Property.DeviceList.Unassociation.page.RecordCount == 1 && Property.DeviceList.Unassociation.page.PageIndex == Property.DeviceList.Unassociation.page.PageCount &&
                Property.DeviceList.Unassociation.page.PageIndex != 1)
                --Property.DeviceList.Unassociation.page.PageIndex;

            this.load(Property.DeviceList.Unassociation.page.PageIndex);
            var items = new GroupListItemArray();
            this.clear();
            for (var Id in Property.DeviceList.Unassociation.value) {
                var item = this.Parent().Common.createItem(this.key, Property.DeviceList.Unassociation.value[Id]);
                getTag("glist_unassociation_devices").appendChild(item);
            }
            this.totalCount.set(Property.DeviceList.Unassociation.page.TotalRecordCount);

            this.clear();
            this.load(Property.DeviceList.Unassociation.page.PageIndex);

            var index = this.selected.indexOf(id);
            if (index >= 0)
                this.selected.splice(index, 1);
            PageEvent.Department.GroupListDeviceIconButtonChanged(Html.Current.Id.get(), ++Property.DeviceList.Association.page.TotalRecordCount);
        },
        batchAdd: function (permission) {
            for (var i = 0; i < this.selected.length; i++) {
                try {
                    var device = Property.DeviceList.Unassociation.value[this.selected[i]];
                    device.Permission = permission;
                    Property.DeviceList.Unassociation.add(Html.Current.Id.get(), device);
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
            this.totalCount.set(Property.DeviceList.Unassociation.page.TotalRecordCount);
        },
        show: function () {
            this.Parent().Common.show(this.key);
        },
        selected: new Array(),
        totalCount: {
            value: 0,
            set: function (value) {
                getTag("lbl_unassociation_device_count").innerText = value;
                this.value = value;
            }
        }
    },
    AlertWindow: {

    }
}

Property["DeviceList"] = {
    Association: {
        value: new Object(),
        page: new Page(),
        load: function (departmentId, index, size) {
            var response = tryCatch(function () {
                return Client.Security().Department.Device.List(departmentId, index, size)
            });
            var result = new Object();
            if (response) {
                if (response.DevicePermission) {
                    for (var i = 0; i < response.DevicePermission.length; i++) {                        
                        if (this.value[response.DevicePermission[i].Id])
                            response.DevicePermission[i]["Selected"] = this.value[response.DevicePermission[i].Id].Selected;
                        this.value[response.DevicePermission[i].Id] = response.DevicePermission[i];
                        result[response.DevicePermission[i].Id] = this.value[response.DevicePermission[i].Id];
                    }
                }
                this.page = response.Page;
            }
            return result;
        },
        remove: function (departmentId, deviceId) {
            var result = tryCatch(function () {
                return Client.Security().Department.Device.Delete(departmentId, deviceId);
            })
            if (result)
                delete this.value[deviceId];
        },
        batchRemove: function (departmentId) {
            var count = 0;
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        this.remove(departmentId, id); ++count;
                    } catch (e) { }
                }
            }
            return count;
        },
        get: function (departmentId, deviceId)
        {
            return tryCatch(function () {
                return Client.Security().Department.Device.Get(departmentId, deviceId);
            });
        }

    },
    Unassociation: {
        value: new Object(),
        page: new Page(),
        //加载：从服务器中读取数据，并把读取到的数据保存在本地，并添加是否选中的属性
        load: function (departmentId, index, size) {

            var response = tryCatch(function () {
                return Client.Security().Department.Device.List(departmentId, index, size, true)
            });
            var result = new Object();
            if (response && response.DevicePermission) {
                for (var i = 0; i < response.DevicePermission.length; i++) {
                    if (this.value[response.DevicePermission[i].Id])
                        response.DevicePermission[i]["Selected"] = this.value[response.DevicePermission[i].Id].Selected;
                    this.value[response.DevicePermission[i].Id] = response.DevicePermission[i];
                    result[response.DevicePermission[i].Id] = this.value[response.DevicePermission[i].Id];
                }
            }
            this.page = response.Page;
            return result;
        },
        //关联：把未关联设备添加到已关联设备中，同时删除本地内存中未关联列表中的当前设备
        add: function (departmentId, device) {
            Client.Security().Department.Device.Create(departmentId, device);
            delete this.value[device.Id];
            --this.page.TotalRecordCount;
        }
    },
}

PageEvent.Device.AddDeviceToDepartment = function (permission, deviceId) {
    Html.Control.PopoverWindow.DeviceList.Unassociation.add(deviceId, permission);
    var index = Html.Control.PopoverWindow.DeviceList.Unassociation.selected.indexOf(deviceId);
    if (index > -1) {
        Html.Control.PopoverWindow.DeviceList.Unassociation.selected.splice(index, 1);
    }
}

PageEvent.Department.ModifyDeviceListItem = function (device) {
    Html.Control.PopoverWindow.DeviceList.Association.modify(device);
}

PageEvent.Device.BatchAddDevicesToDepartment = function (permission) {
    var count = Html.Control.PopoverWindow.DeviceList.Unassociation.batchAdd(permission);
    Html.Control.PopoverWindow.DeviceList.Unassociation.clear();//需要清理
    Html.Control.PopoverWindow.DeviceList.Association.clear();
    Html.Control.PopoverWindow.DeviceList.Association.load(1);
    Html.Control.PopoverWindow.DeviceList.Association.show();
}
