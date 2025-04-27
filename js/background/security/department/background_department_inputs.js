if (!this.Client)
    imported.loadJS("js/client/client.js");


Html.Control.PopoverWindow["InputList"] = {
    Common: {
        createItem: function (key, input) {
            var createCoontrol = {
                UnassociationIcon: function (input) {
                    var btn = new IconButton("", "icon-facetime-video", 11, input.Name);
                    btn.title = Html.DeviceName.get(input.Id) + "\n" + input.Name;
                    return btn
                },
                AssociationIcon: function (input) {
                    var btn = new IconButton("", "icon-facetime-video", 11, input.Name);
                    btn.style.maxWidth = "150px";
                    var a = new AlertWindow("", btn, Info.ControlIdPrefix.Input.AlertUrl.details + "?departmentId=" + Html.Current.Id.get() + "&inputId=" + input.Id, -1, true);
                    a.title = Html.DeviceName.get(input.Id) + "\n" + input.Name;
                    a.className = "alert-window-item";
                    return a;
                },
                UnassociationOperationButton: function (input, control) {
                    var a = document.createElement("a");
                    a.className = "icon-plus-sign pull-right";
                    a.href = Info.ControlIdPrefix.Input.AlertUrl.permissions + "?fun=PageEvent.Input.AddInputToDepartment&departmentId=" + Html.Current.Id.get() + "&inputId=" + input.Id
                    a.setAttribute("onclick", "return GroupListItem_DepartmentUnassociationAddInput_Click(this, '" + input.Id + "')");
                    a.id = Info.ControlIdPrefix.Input.Unassociation.add + input.Id;
                    a.title = "添加";
                    control.appendChild(a);
                },
                AssociationOperationButton: function (input, control) {
                    var a = document.createElement("a");
                    a.className = "icon-trash pull-right";
                    a.setAttribute("onclick", "GroupListItem_DepartmentAssociationRemoveInput_Click(this, '" + input.Id + "')");
                    a.id = Info.ControlIdPrefix.Input.Association.remove + input.Id;
                    a.title = "删除";
                    control.appendChild(a);

                    a = document.createElement("a");
                    a.className = "icon-edit pull-right";
                    a.href = Info.ControlIdPrefix.Input.AlertUrl.details + "?departmentId=" + Html.Current.Id.get() + "&inputId=" + input.Id;
                    a.setAttribute("onclick", "return EditInput_Click(this)");
                    a.id = Info.ControlIdPrefix.Input.Association.edit + input.Id;
                    a.title = "编辑";
                    a.style.marginRight = "5px";
                    control.appendChild(a);
                },
                flag: function (input, control) {
                    var permissionColor = {
                        Preview: LabelTagColor.Green,
                        Playback: LabelTagColor.Yellow,
                        PTZ: LabelTagColor.Red,
                        Download: LabelTagColor.Magenta
                    }
                    var div = document.createElement("div");
                    div.className = "lable-user-permission";
                    if (input.Permission) {
                        var permissions = Flags.Parse(input.Permission);
                        if (permissions && permissions.Value.indexOf(VideoSourcePermissions.None) < 0) {
                            if (permissions.Value.indexOf(VideoSourcePermissions.All) >= 0) {
                                permissions.Value = new Array();
                                for (var p in VideoSourcePermissions) {
                                    switch (p) {
                                        case VideoSourcePermissions.All:
                                        case VideoSourcePermissions.None:
                                            continue;
                                        default:
                                            permissions.Value.push(VideoSourcePermissions[p]);
                                    }
                                }
                            }
                            for (var i = 0; i < permissions.Value.length; i++) {
                                div.appendChild(new LabelTag(Language.Enum.VideoSourcePermissions[permissions.Value[i]], permissionColor[permissions.Value[i]]));
                            }
                        }
                    }
                    return div;
                }
            };
            var item = null;

            item = new GroupListItem(Info.ControlIdPrefix.Input[key].list, eval("Department" + key + "Input_Selected"));
            item.id = Info.ControlIdPrefix.Input[key].list + input.Id;
            //item.Content.appendChild(createCoontrol[key + "OperationButton"](input));
            createCoontrol[key + "OperationButton"](input, item.Content);

            item.className += " mouse_pointer";
            if (Html.Control.PopoverWindow.InputList[key].selected.indexOf(input.Id) >= 0)
                item.className += " selected";

            item.Content.appendChild(createCoontrol[key + "Icon"](input));
            item.Content.appendChild(createCoontrol.flag(input));
            item.Content.className = "childpage-list-item-content";

            return item;
        },
        createItems: function (key, inputs) {
            var items = new GroupListItemArray();
            if (inputs) {
                for (var i = 0; i < inputs.length; i++) {
                    items.push(this.createItem(key, inputs[i]));
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
            getTag("glist_" + key.toLowerCase() + "_inputs").innerText = "";
            getTag("div_" + key.toLowerCase() + "_input_paging").innerText = "";
        },
        dic: function (key) {
            return Property.InputList[key].value;
        },
        load: function (key, index) {
            var result = Property.InputList[key].load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
            var items = this.createItemsByObj(key, result);
            if (items) {
                var glist = new GroupList("", items);
                getTag("glist_" + key.toLowerCase() + "_inputs").appendChild(glist);
                var page = Property.InputList[key].page;

                pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("Department" + key + "Input_PageChange"));
                getTag("div_" + key.toLowerCase() + "_input_paging").appendChild(pagination);
            }
        },
        show: function (key) {
            $(".swith_control").css("display", "none");
            getTag("div_" + key.toLowerCase() + "_input").style.display = "block";
        }
    },
    Association: {
        Parent: function () {
            return Html.Control.PopoverWindow.InputList;
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
            Property.InputList.Association.load(Html.Current.Id.get());
            for (var uid in Property.InputList.Association.value) {
                if (inputList.Association.selected.indexOf(uid) < 0)
                    inputList.Association.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.InputList.Association.load(Html.Current.Id.get());
            for (var uid in Property.InputList.Association.value) {
                var tag = getTag(Info.ControlIdPrefix.Input.Association.list + uid);
                var index = inputList.Association.selected.indexOf(uid);
                if (!tag && index < 0)
                    inputList.Association.selected.push(uid);
                if (!tag && index >= 0)
                    inputList.Association.selected.splice(index, 1);
            }
        },
        load: function (index) {
            this.Parent().Common.load(this.key, index);
            this.totalCount.set(Property.InputList.Association.page.TotalRecordCount);
            PageEvent.Department.GroupListInputIconButtonChanged(Html.Current.Id.get(), Property.InputList.Association.page.TotalRecordCount);
        },
        clear: function () {
            return this.Parent().Common.clear(this.key);
            this.totalCount.set(0);
        },
        remove: function (inputId) {
            Property.InputList.Association.remove(Html.Current.Id.get(), inputId);
            this.clear();
            if (Property.InputList.Association.page.RecordCount == 1 && Property.InputList.Association.page.PageIndex == Property.InputList.Association.page.PageCount && Property.InputList.Association.page.PageIndex != 1)
                --Property.InputList.Association.page.PageIndex;

            this.load(Property.InputList.Association.page.PageIndex, 11);
            this.totalCount.set(Property.InputList.Association.page.TotalRecordCount);

            var index = this.selected.indexOf(inputId);
            if (index >= 0)
                this.selected.splice(index, 1);
        },
        batchRemove: function () {
            var count = 0;
            for (var i = 0; i < this.selected.length; i++) {
                Property.InputList.Association.remove(Html.Current.Id.get(), this.selected[i]);
                ++count;
            }

            this.totalCount.set(Property.InputList.Association.page.TotalRecordCount);
            this.selected = new Array();

            if (count == Property.InputList.Association.page.RecordCount && Property.InputList.Association.page.PageIndex == Property.InputList.Association.page.PageCount &&
                Property.InputList.Association.page.PageIndex != 1)
                --Property.InputList.Association.page.PageIndex;

            Html.Control.PopoverWindow.InputList.Association.clear();
            Html.Control.PopoverWindow.InputList.Association.load(Property.InputList.Association.page.PageIndex);
        },
        modify: function (input) {
            var item = this.Parent().Common.createItem(this.key, input);
            var tag = getTag(Info.ControlIdPrefix.Input.Association.list + input.Id);
            if (item) {
                tag.parentElement.replaceChild(item, tag);
                return true;
            }

            return false;
        },
        removeAll: function () {
            var count = 0;
            var departmentId = Html.Current.Id.get();
            for (var id in Property.InputList.Association.value) {
                count += Try(function () {
                    Property.InputList.Association.remove(departmentId, id);
                    return 1;
                }, 0);
            }
            if (Property.InputList.Association.page.TotalRecordCount != count) {
                Property.InputList.Association.load(departmentId, 1, Property.InputList.Association.page.TotalRecordCount);
                for (var id in Property.InputList.Association.value) {
                    count += Try(function () {
                        Property.InputList.Association.remove(departmentId, id);
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
                getTag("lbl_association_input_count").innerText = value;
                this.value = value;
            }
        },
        show: function () {
            this.Parent().Common.show(this.key);
        }
    },
    Unassociation: {
        Parent: function () {
            return Html.Control.PopoverWindow.InputList;
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
            Property.InputList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.InputList.Unassociation.value) {
                if (inputList.Unassociation.selected.indexOf(uid) < 0)
                    inputList.Unassociation.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.InputList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.InputList.Unassociation.value) {
                var tag = getTag(Info.ControlIdPrefix.Input.Unassociation.list + uid);
                var index = inputList.Unassociation.selected.indexOf(uid);
                if (!tag && index < 0)
                    inputList.Unassociation.selected.push(uid);
                if (!tag && index >= 0)
                    inputList.Unassociation.selected.splice(index, 1);
            }
        },
        add: function (id, permission) {
            var input = Property.InputList.Unassociation.value[id];
            input.Permission = permission;
            Property.InputList.Unassociation.add(Html.Current.Id.get(), input);

            if (Property.InputList.Unassociation.page.RecordCount == 1 && Property.InputList.Unassociation.page.PageIndex == Property.InputList.Unassociation.page.PageCount && Property.InputList.Unassociation.page.PageIndex != 1)
                --Property.InputList.Unassociation.page.PageIndex;

            this.load(Property.InputList.Unassociation.page.PageIndex);
            var items = new GroupListItemArray();
            this.clear();
            for (var id in Property.InputList.Unassociation.value) {
                var item = this.Parent().Common.createItem(this.key, Property.InputList.Unassociation.value[id]);
                getTag("glist_unassociation_inputs").appendChild(item);
            }
            this.totalCount.set(Property.InputList.Unassociation.page.TotalRecordCount);

            this.clear();
            this.load(Property.InputList.Unassociation.page.PageIndex);

            var index = this.selected.indexOf(id);
            if (index >= 0)
                this.selected.splice(index, 1);
            PageEvent.Department.GroupListInputIconButtonChanged(Html.Current.Id.get(), ++Property.InputList.Association.page.TotalRecordCount);
        },
        batchAdd: function (permission) {
            for (var i = 0; i < this.selected.length; i++) {
                try {
                    var input = Property.InputList.Unassociation.value[this.selected[i]];
                    input.Permission = permission;
                    Property.InputList.Unassociation.add(Html.Current.Id.get(), input);
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
            this.totalCount.set(Property.InputList.Unassociation.page.TotalRecordCount);
        },
        show: function () {
            this.Parent().Common.show(this.key);
        },
        selected: new Array(),
        totalCount: {
            value: 0,
            set: function (value) {
                getTag("lbl_unassociation_input_count").innerText = value;
                this.value = value;
            }
        }
    },
    AlertWindow: {

    }
}

Property["InputList"] = {
    Association: {
        value: new Object(),
        page: new Page(),
        load: function (departmentId, index, size) {
            var response = tryCatch(function () {
                return Client.Security().Department.Video.Input.List(departmentId, index, size)
            });
            var result = new Object();
            if (response) {
                if (response.VideoInputChannelPermission) {
                    for (var i = 0; i < response.VideoInputChannelPermission.length; i++) {
                        if (this.value[response.VideoInputChannelPermission[i].Id])
                            response.VideoInputChannelPermission[i]["Selected"] = this.value[response.VideoInputChannelPermission[i].Id].Selected;
                        this.value[response.VideoInputChannelPermission[i].Id] = response.VideoInputChannelPermission[i];
                        result[response.VideoInputChannelPermission[i].Id] = this.value[response.VideoInputChannelPermission[i].Id];
                    }
                }
                this.page = response.Page;
            }
            return result;
        },
        remove: function (departmentId, inputId) {
            var result = tryCatch(function () {
                return Client.Security().Department.Video.Input.Delete(departmentId, inputId);
            })
            if (result)
                delete this.value[inputId];
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
        get: function (departmentId, inputId) {
            return tryCatch(function () {
                return Client.Security().Department.Video.Input.Get(departmentId, inputId);
            });
            //    if (response)
            //    {
            //        response["Selected"] = this.value[inputId].Selected;
            //        this.value = response;
            //    }
            //    else {
            //        delete this.value[inputId];
            //    }
            //    return this.value[inputId];
            //},
        }
    },
    Unassociation: {
        value: new Object(),
        page: new Page(),
        //加载：从服务器中读取数据，并把读取到的数据保存在本地，并添加是否选中的属性
        load: function (departmentId, index, size) {

            var response = tryCatch(function () {
                return Client.Security().Department.Video.Input.List(departmentId, index, size, true)
            });
            var result = new Object();
            if (response && response.VideoInputChannelPermission) {
                for (var i = 0; i < response.VideoInputChannelPermission.length; i++) {
                    if (this.value[response.VideoInputChannelPermission[i].Id])
                        response.VideoInputChannelPermission[i]["Selected"] = this.value[response.VideoInputChannelPermission[i].Id].Selected;
                    this.value[response.VideoInputChannelPermission[i].Id] = response.VideoInputChannelPermission[i];
                    result[response.VideoInputChannelPermission[i].Id] = this.value[response.VideoInputChannelPermission[i].Id];
                }
            }
            this.page = response.Page;
            return result;
        },
        //关联：把未关联输入通道添加到已关联输入通道中，同时删除本地内存中未关联列表中的当前输入通道
        add: function (departmentId, input) {
            Client.Security().Department.Video.Input.Create(departmentId, input);
            delete this.value[input.Id];
            --this.page.TotalRecordCount;
        }
    },
}

PageEvent.Input.AddInputToDepartment = function (permission, inputId) {
    Html.Control.PopoverWindow.InputList.Unassociation.add(inputId, permission);
    var index = Html.Control.PopoverWindow.InputList.Unassociation.selected.indexOf(inputId);
    if (index > -1) {
        Html.Control.PopoverWindow.InputList.Unassociation.selected.splice(index, 1);
    }
}

PageEvent.Department.ModifyInputListItem = function (input) {
    Html.Control.PopoverWindow.InputList.Association.modify(input);
}

PageEvent.Input.BatchAddInputsToDepartment = function (permission) {
    var count = Html.Control.PopoverWindow.InputList.Unassociation.batchAdd(permission);
    Html.Control.PopoverWindow.InputList.Unassociation.clear();//需要清理
    Html.Control.PopoverWindow.InputList.Association.clear();
    Html.Control.PopoverWindow.InputList.Association.load(1);
    Html.Control.PopoverWindow.InputList.Association.show();
}
