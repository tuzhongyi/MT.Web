if (!this.Client)
    imported.loadJS("js/client/client.js");


Html.Control.PopoverWindow["IOInputList"] = {
    Common: {
        createItem: function (key, ioinput) {
            var createCoontrol = {
                UnassociationIcon: function (ioinput) {
                    var btn = new IconButton("", "icon-linkedin-sign", 11, ioinput.Name);
                    btn.title = Html.DeviceName.get(ioinput.Id) + "\n" + ioinput.Name;
                    return btn
                },
                AssociationIcon: function (ioinput) {
                    var btn = new IconButton("", "icon-linkedin-sign", 11, ioinput.Name);
                    btn.style.maxWidth = "240px";
                    var a = new AlertWindow("", btn, Info.ControlIdPrefix.IOInput.AlertUrl.details + "?userId=" + Html.Current.Id.get() + "&ioinputId=" + ioinput.Id, -1, true);
                    a.title = Html.DeviceName.get(ioinput.Id) + "\n" + ioinput.Name;
                    a.className = "alert-window-item";
                    return a;
                },
                UnassociationOperationButton: function (ioinput, control) {
                    var a = document.createElement("a");
                    a.className = "icon-plus-sign pull-right";
                    a.href = Info.ControlIdPrefix.IOInput.AlertUrl.permissions + "?fun=PageEvent.IOInput.AddIOInputToUser&userId=" + Html.Current.Id.get() + "&ioinputId=" + ioinput.Id
                    a.setAttribute("onclick", "return GroupListItem_UserUnassociationAddIOInput_Click(this, '" + ioinput.Id + "')");
                    a.id = Info.ControlIdPrefix.IOInput.Unassociation.add + ioinput.Id;
                    a.title = "添加";
                    control.appendChild(a);
                },
                AssociationOperationButton: function (ioinput, control) {
                    var a = document.createElement("a");
                    a.className = "icon-trash pull-right";
                    a.setAttribute("onclick", "GroupListItem_UserAssociationRemoveIOInput_Click(this, '" + ioinput.Id + "')");
                    a.id = Info.ControlIdPrefix.IOInput.Association.remove + ioinput.Id;
                    a.title = "删除";
                    control.appendChild(a);

                    a = document.createElement("a");
                    a.className = "icon-edit pull-right";
                    a.href = Info.ControlIdPrefix.IOInput.AlertUrl.details + "?userId=" + Html.Current.Id.get() + "&ioinputId=" + ioinput.Id;
                    a.setAttribute("onclick", "return EditIOInput_Click(this)");
                    a.id = Info.ControlIdPrefix.IOInput.Association.edit + ioinput.Id;
                    a.title = "编辑";
                    a.style.marginRight = "5px";
                    control.appendChild(a);
                },
                flag: function (ioinput, control) {
                    var permissionColor = {
                        Receiving: LabelTagColor.Green,
                        Bypass: LabelTagColor.Yellow,
                    }
                    var div = document.createElement("div");
                    div.className = "lable-user-permission";
                    if (ioinput.Permission) {
                        var permissions = Flags.Parse(ioinput.Permission);
                        if (permissions && permissions.Value.indexOf(IOInputPermissions.None) < 0) {
                            if (permissions.Value.indexOf(IOInputPermissions.All) >= 0) {
                                permissions.Value = new Array();
                                for (var p in IOInputPermissions) {
                                    switch (p) {
                                        case IOInputPermissions.All:
                                        case IOInputPermissions.None:
                                            continue;
                                        default:
                                            permissions.Value.push(IOInputPermissions[p]);
                                    }
                                }
                            }
                            for (var i = 0; i < permissions.Value.length; i++) {
                                div.appendChild(new LabelTag(Language.Enum.IOInputPermissions[permissions.Value[i]], permissionColor[permissions.Value[i]]));
                            }
                        }
                    }
                    return div;
                }
            };
            var item = null;

            item = new GroupListItem(Info.ControlIdPrefix.IOInput[key].list, eval("User" + key + "IOInput_Selected"));
            item.id = Info.ControlIdPrefix.IOInput[key].list + ioinput.Id;
            //item.Content.appendChild(createCoontrol[key + "OperationButton"](input));
            createCoontrol[key + "OperationButton"](ioinput, item.Content);

            item.className += " mouse_pointer";
            if (Html.Control.PopoverWindow.IOInputList[key].selected.indexOf(ioinput.Id) >= 0)
                item.className += " selected";

            item.Content.appendChild(createCoontrol[key + "Icon"](ioinput));
            item.Content.appendChild(createCoontrol.flag(ioinput));
            item.Content.className = "childpage-list-item-content";

            return item;
        },
        createItems: function (key, ioinputs) {
            var items = new GroupListItemArray();
            if (ioinputs) {
                for (var i = 0; i < ioinputs.length; i++) {
                    items.push(this.createItem(key, ioinputs[i]));
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
            getTag("glist_" + key.toLowerCase() + "_ioinputs").innerText = "";
            getTag("div_" + key.toLowerCase() + "_ioinput_paging").innerText = "";
        },
        dic: function (key) {
            return Property.IOInputList[key].value;
        },
        load: function (key, index) {
            var result = Property.IOInputList[key].load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
            var items = this.createItemsByObj(key, result);
            if (items) {
                var glist = new GroupList("", items);
                getTag("glist_" + key.toLowerCase() + "_ioinputs").appendChild(glist);
                var page = Property.IOInputList[key].page;

                pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("User" + key + "IOInput_PageChange"));
                getTag("div_" + key.toLowerCase() + "_ioinput_paging").appendChild(pagination);
            }
        },
        show: function (key) {
            $(".swith_control").css("display", "none");
            getTag("div_" + key.toLowerCase() + "_ioinput").style.display = "block";
        }
    },
    Association: {
        Parent: function () {
            return Html.Control.PopoverWindow.IOInputList;
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
            Property.IOInputList.Association.load(Html.Current.Id.get());
            for (var uid in Property.IOInputList.Association.value) {
                if (ioinputList.Association.selected.indexOf(uid) < 0)
                    ioinputList.Association.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.IOInputList.Association.load(Html.Current.Id.get());
            for (var uid in Property.IOInputList.Association.value) {
                var tag = getTag(Info.ControlIdPrefix.IOInput.Association.list + uid);
                var index = ioinputList.Association.selected.indexOf(uid);
                if (!tag && index < 0)
                    ioinputList.Association.selected.push(uid);
                if (!tag && index >= 0)
                    ioinputList.Association.selected.splice(index, 1);
            }
        },
        load: function (index) {
            this.Parent().Common.load(this.key, index);
            this.totalCount.set(Property.IOInputList.Association.page.TotalRecordCount);
            PageEvent.User.GroupListIOInputIconButtonChanged(Html.Current.Id.get(), Property.IOInputList.Association.page.TotalRecordCount);
        },
        clear: function () {
            return this.Parent().Common.clear(this.key);
            this.totalCount.set(0);
        },
        remove: function (ioinputId) {
            Property.IOInputList.Association.remove(Html.Current.Id.get(), ioinputId);
            this.clear();
            if (Property.IOInputList.Association.page.RecordCount == 1 && Property.IOInputList.Association.page.PageIndex == Property.IOInputList.Association.page.PageCount &&
                Property.IOInputList.Association.page.PageIndex != 1)
                --Property.IOInputList.Association.page.PageIndex;

            this.load(Property.IOInputList.Association.page.PageIndex, 11);
            this.totalCount.set(Property.IOInputList.Association.page.TotalRecordCount);

            var index = this.selected.indexOf(ioinputId);
            if (index >= 0)
                this.selected.splice(index, 1);
        },
        batchRemove: function () {
            var count = 0;
            for (var i = 0; i < this.selected.length; i++) {
                Property.IOInputList.Association.remove(Html.Current.Id.get(), this.selected[i]);
                ++count;
            }

            this.totalCount.set(Property.IOInputList.Association.page.TotalRecordCount);
            this.selected = new Array();

            if (count == Property.IOInputList.Association.page.RecordCount && Property.IOInputList.Association.page.PageIndex == Property.IOInputList.Association.page.PageCount &&
                Property.IOInputList.Association.page.PageIndex != 1)
                --Property.IOInputList.Association.page.PageIndex;


            Html.Control.PopoverWindow.IOInputList.Association.clear();
            Html.Control.PopoverWindow.IOInputList.Association.load(Property.IOInputList.Association.page.PageIndex);
        },
        modify: function (ioinput) {
            var item = this.Parent().Common.createItem(this.key, ioinput);
            var tag = getTag(Info.ControlIdPrefix.IOInput.Association.list + ioinput.Id);
            if (item) {
                tag.parentElement.replaceChild(item, tag);
                return true;
            }

            return false;
        },
        removeAll: function () {
            var count = 0;
            var userId = Html.Current.Id.get();
            for (var id in Property.IOInputList.Association.value) {
                count += Try(function () {
                    Property.IOInputList.Association.remove(userId, id);
                    return 1;
                }, 0);
            }
            if (Property.IOInputList.Association.page.TotalRecordCount != count) {
                Property.IOInputList.Association.load(userId, 1, Property.IOInputList.Association.page.TotalRecordCount);
                for (var id in Property.IOInputList.Association.value) {
                    count += Try(function () {
                        Property.IOInputList.Association.remove(userId, id);
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
                getTag("lbl_association_ioinput_count").innerText = value;
                this.value = value;
            }
        },
        show: function () {
            this.Parent().Common.show(this.key);
        }
    },
    Unassociation: {
        Parent: function () {
            return Html.Control.PopoverWindow.IOInputList;
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
            Property.IOInputList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.IOInputList.Unassociation.value) {
                if (ioinputList.Unassociation.selected.indexOf(uid) < 0)
                    ioinputList.Unassociation.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.IOInputList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.IOInputList.Unassociation.value) {
                var tag = getTag(Info.ControlIdPrefix.IOInput.Unassociation.list + uid);
                var index = ioinputList.Unassociation.selected.indexOf(uid);
                if (!tag && index < 0)
                    ioinputList.Unassociation.selected.push(uid);
                if (!tag && index >= 0)
                    ioinputList.Unassociation.selected.splice(index, 1);
            }
        },
        add: function (id, permission) {
            var ioinput = Property.IOInputList.Unassociation.value[id];
            ioinput.Permission = permission;
            Property.IOInputList.Unassociation.add(Html.Current.Id.get(), ioinput);

            if (Property.IOInputList.Unassociation.page.RecordCount == 1 && Property.IOInputList.Unassociation.page.PageIndex == Property.IOInputList.Unassociation.page.PageCount &&
                Property.IOInputList.Unassociation.page.PageIndex != 1)
                --Property.IOInputList.Unassociation.page.PageIndex;

            this.load(Property.IOInputList.Unassociation.page.PageIndex);
            var items = new GroupListItemArray();
            this.clear();
            for (var Id in Property.IOInputList.Unassociation.value) {
                var item = this.Parent().Common.createItem(this.key, Property.IOInputList.Unassociation.value[Id]);
                getTag("glist_unassociation_ioinputs").appendChild(item);
            }
            this.totalCount.set(Property.IOInputList.Unassociation.page.TotalRecordCount);

            this.clear();
            this.load(Property.IOInputList.Unassociation.page.PageIndex);

            var index = this.selected.indexOf(id);
            if (index >= 0)
                this.selected.splice(index, 1);
            PageEvent.User.GroupListIOInputIconButtonChanged(Html.Current.Id.get(), ++Property.IOInputList.Association.page.TotalRecordCount);
        },
        batchAdd: function (permission) {
            for (var i = 0; i < this.selected.length; i++) {
                try {
                    var ioinput = Property.IOInputList.Unassociation.value[this.selected[i]];
                    ioinput.Permission = permission;
                    Property.IOInputList.Unassociation.add(Html.Current.Id.get(), ioinput);
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
            this.totalCount.set(Property.IOInputList.Unassociation.page.TotalRecordCount);
        },
        show: function () {
            this.Parent().Common.show(this.key);
        },
        selected: new Array(),
        totalCount: {
            value: 0,
            set: function (value) {
                getTag("lbl_unassociation_ioinput_count").innerText = value;
                this.value = value;
            }
        }
    },
    AlertWindow: {

    }
}

Property["IOInputList"] = {
    Association: {
        value: new Object(),
        page: new Page(),
        load: function (userId, index, size) {
            var response = tryCatch(function () {
                return Client.Security().User.IO.Input.List(userId, index, size)
            });
            var result = new Object();
            if (response) {
                if (response.IOInputChannelPermission) {
                    for (var i = 0; i < response.IOInputChannelPermission.length; i++) {
                        if (this.value[response.IOInputChannelPermission[i].Id])
                            response.IOInputChannelPermission[i]["Selected"] = this.value[response.IOInputChannelPermission[i].Id].Selected;
                        this.value[response.IOInputChannelPermission[i].Id] = response.IOInputChannelPermission[i];
                        result[response.IOInputChannelPermission[i].Id] = this.value[response.IOInputChannelPermission[i].Id];
                    }
                }
                this.page = response.Page;
            }
            return result;
        },
        remove: function (userId, ioinputId) {
            var result = tryCatch(function () {
                return Client.Security().User.IO.Input.Delete(userId, ioinputId);
            })
            if (result)
                delete this.value[ioinputId];
        },
        batchRemove: function (userId) {
            var count = 0;
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        this.remove(userId, id); ++count;
                    } catch (e) { }
                }
            }
            return count;
        },
        get: function (userId, ioinputId) {
            return tryCatch(function () {
                return Client.Security().User.IO.Input.Get(userId, ioinputId);
            });
            //    if (response)
            //    {
            //        response["Selected"] = this.value[ioinputId].Selected;
            //        this.value = response;
            //    }
            //    else {
            //        delete this.value[ioinputId];
            //    }
            //    return this.value[ioinputId];
            //},
        }
    },
    Unassociation: {
        value: new Object(),
        page: new Page(),
        //加载：从服务器中读取数据，并把读取到的数据保存在本地，并添加是否选中的属性
        load: function (userId, index, size) {

            var response = tryCatch(function () {
                return Client.Security().User.IO.Input.List(userId, index, size, true)
            });
            var result = new Object();
            if (response && response.IOInputChannelPermission) {
                for (var i = 0; i < response.IOInputChannelPermission.length; i++) {
                    if (this.value[response.IOInputChannelPermission[i].Id])
                        response.IOInputChannelPermission[i]["Selected"] = this.value[response.IOInputChannelPermission[i].Id].Selected;
                    this.value[response.IOInputChannelPermission[i].Id] = response.IOInputChannelPermission[i];
                    result[response.IOInputChannelPermission[i].Id] = this.value[response.IOInputChannelPermission[i].Id];
                }
            }
            this.page = response.Page;
            return result;
        },
        //关联：把未关联输入通道添加到已关联输入通道中，同时删除本地内存中未关联列表中的当前输入通道
        add: function (userId, ioinput) {
            Client.Security().User.IO.Input.Create(userId, ioinput);
            delete this.value[ioinput.Id];
            --this.page.TotalRecordCount;
        }
    },
}

PageEvent.IOInput.AddIOInputToUser = function (permission, ioinputId) {
    Html.Control.PopoverWindow.IOInputList.Unassociation.add(ioinputId, permission);
    var index = Html.Control.PopoverWindow.IOInputList.Unassociation.selected.indexOf(ioinputId);
    if (index > -1) {
        Html.Control.PopoverWindow.IOInputList.Unassociation.selected.splice(index, 1);
    }
}

PageEvent.User.ModifyIOInputListItem = function (ioinput) {
    Html.Control.PopoverWindow.IOInputList.Association.modify(ioinput);
}

PageEvent.IOInput.BatchAddIOInputsToUser = function (permission) {
    var count = Html.Control.PopoverWindow.IOInputList.Unassociation.batchAdd(permission);
    Html.Control.PopoverWindow.IOInputList.Unassociation.clear();//需要清理
    Html.Control.PopoverWindow.IOInputList.Association.clear();
    Html.Control.PopoverWindow.IOInputList.Association.load(1);
    Html.Control.PopoverWindow.IOInputList.Association.show();
}
