if (!this.Client)
    imported.loadJS("js/client/client.js");


Html.Control.PopoverWindow["IOOutputList"] = {
    Common: {
        createItem: function (key, iooutput) {
            var createCoontrol = {
                UnassociationIcon: function (iooutput) {
                    var btn = new IconButton("", "icon-flickr", 11, iooutput.Name);
                    btn.title = Html.DeviceName.get(iooutput.Id) + "\n" + iooutput.Name;
                    return btn
                },
                AssociationIcon: function (iooutput) {
                    var btn = new IconButton("", "icon-flickr", 11, iooutput.Name);
                    var a = new AlertWindow("", btn, Info.ControlIdPrefix.IOOutput.AlertUrl.details + "?userId=" + Html.Current.Id.get() + "&iooutputId=" + iooutput.Id, -1, true);
                    a.title = Html.DeviceName.get(iooutput.Id) + "\n" + iooutput.Name;
                    a.className = "alert-window-item";
                    return a;
                },
                UnassociationOperationButton: function (iooutput, control) {
                    var a = document.createElement("a");
                    a.className = "icon-plus-sign pull-right";
                    a.href = Info.ControlIdPrefix.IOOutput.AlertUrl.permissions + "?fun=PageEvent.IOOutput.AddIOOutputToUser&userId=" + Html.Current.Id.get() + "&iooutputId=" + iooutput.Id
                    a.setAttribute("onclick", "return GroupListItem_UserUnassociationAddIOOutput_Click(this, '" + iooutput.Id + "')");
                    a.id = Info.ControlIdPrefix.IOOutput.Unassociation.add + iooutput.Id;
                    a.title = "添加";
                    control.appendChild(a);
                },
                AssociationOperationButton: function (iooutput, control) {
                    var a = document.createElement("a");
                    a.className = "icon-trash pull-right";
                    a.setAttribute("onclick", "GroupListItem_UserAssociationRemoveIOOutput_Click(this, '" + iooutput.Id + "')");
                    a.id = Info.ControlIdPrefix.IOOutput.Association.remove + iooutput.Id;
                    a.title = "删除";
                    control.appendChild(a);

                    a = document.createElement("a");
                    a.className = "icon-edit pull-right";
                    a.href = Info.ControlIdPrefix.IOOutput.AlertUrl.details + "?userId=" + Html.Current.Id.get() + "&iooutputId=" + iooutput.Id;
                    a.setAttribute("onclick", "return EditIOOutput_Click(this)");
                    a.id = Info.ControlIdPrefix.IOOutput.Association.edit + iooutput.Id;
                    a.title = "编辑";
                    a.style.marginRight = "5px";
                    control.appendChild(a);
                },
                flag: function (iooutput, control) {
                    var permissionColor = {
                        All: LabelTagColor.Magenta
                    }
                    var div = document.createElement("div");
                    div.className = "lable-user-permission";
                    if (iooutput.Permission) {
                        var permissions = Flags.Parse(iooutput.Permission);
                        if (permissions && permissions.Value.indexOf(IOOutputPermissions.None) < 0) {
                            if (permissions.Value.indexOf(IOOutputPermissions.All) >= 0) {
                                permissions.Value = new Array();
                                //for (var p in IOOutputPermissions) {
                                //    switch (p) {
                                //        case IOOutputPermissions.All:
                                //        case IOOutputPermissions.None:
                                //            continue;
                                //        default:
                                //            permissions.Value.push(IOOutputPermissions[p]);
                                //    }
                                //}
                                permissions.Value.push(IOOutputPermissions.All);
                            }
                            for (var i = 0; i < permissions.Value.length; i++) {
                                div.appendChild(new LabelTag(Language.Enum.IOOutputPermissions[permissions.Value[i]], permissionColor[permissions.Value[i]]));
                            }
                        }
                    }
                    return div;
                }
            };
            var item = null;

            item = new GroupListItem(Info.ControlIdPrefix.IOOutput[key].list, eval("User" + key + "IOOutput_Selected"));
            item.id = Info.ControlIdPrefix.IOOutput[key].list + iooutput.Id;
            //item.Content.appendChild(createCoontrol[key + "OperationButton"](iooutput));
            createCoontrol[key + "OperationButton"](iooutput, item.Content);

            item.className += " mouse_pointer";
            if (Html.Control.PopoverWindow.IOOutputList[key].selected.indexOf(iooutput.Id) >= 0)
                item.className += " selected";

            item.Content.appendChild(createCoontrol[key + "Icon"](iooutput));
            //item.Content.appendChild(createCoontrol.flag(iooutput));
            item.Content.className = "childpage-list-item-content";

            return item;
        },
        createItems: function (key, iooutputs) {
            var items = new GroupListItemArray();
            if (iooutputs) {
                for (var i = 0; i < iooutputs.length; i++) {
                    items.push(this.createItem(key, iooutputs[i]));
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
            getTag("glist_" + key.toLowerCase() + "_iooutputs").innerText = "";
            getTag("div_" + key.toLowerCase() + "_iooutput_paging").innerText = "";
        },
        dic: function (key) {
            return Property.IOOutputList[key].value;
        },
        load: function (key, index) {
            var result = Property.IOOutputList[key].load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
            var items = this.createItemsByObj(key, result);
            if (items) {
                var glist = new GroupList("", items);
                getTag("glist_" + key.toLowerCase() + "_iooutputs").appendChild(glist);
                var page = Property.IOOutputList[key].page;

                pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("User" + key + "IOOutput_PageChange"));
                getTag("div_" + key.toLowerCase() + "_iooutput_paging").appendChild(pagination);
            }
        },
        show: function (key) {
            $(".swith_control").css("display", "none");
            getTag("div_" + key.toLowerCase() + "_iooutput").style.display = "block";
        }
    },
    Association: {
        Parent: function () {
            return Html.Control.PopoverWindow.IOOutputList;
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
            Property.IOOutputList.Association.load(Html.Current.Id.get());
            for (var uid in Property.IOOutputList.Association.value) {
                if (iooutputList.Association.selected.indexOf(uid) < 0)
                    iooutputList.Association.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.IOOutputList.Association.load(Html.Current.Id.get());
            for (var uid in Property.IOOutputList.Association.value) {
                var tag = getTag(Info.ControlIdPrefix.IOOutput.Association.list + uid);
                var index = iooutputList.Association.selected.indexOf(uid);
                if (!tag && index < 0)
                    iooutputList.Association.selected.push(uid);
                if (!tag && index >= 0)
                    iooutputList.Association.selected.splice(index, 1);
            }
        },
        load: function (index) {
            this.Parent().Common.load(this.key, index);
            this.totalCount.set(Property.IOOutputList.Association.page.TotalRecordCount);
            PageEvent.User.GroupListIOOutputIconButtonChanged(Html.Current.Id.get(), Property.IOOutputList.Association.page.TotalRecordCount);
        },
        clear: function () {
            return this.Parent().Common.clear(this.key);
            this.totalCount.set(0);
        },
        remove: function (iooutputId) {
            Property.IOOutputList.Association.remove(Html.Current.Id.get(), iooutputId);
            this.clear();

            if (Property.IOOutputList.Association.page.RecordCount == 1 && Property.IOOutputList.Association.page.PageIndex == Property.IOOutputList.Association.page.PageCount && Property.IOOutputList.Association.page.PageIndex != 1)
                --Property.IOOutputList.Association.page.PageIndex;

            this.load(Property.IOOutputList.Association.page.PageIndex, 11);
            this.totalCount.set(Property.IOOutputList.Association.page.TotalRecordCount);

            var index = this.selected.indexOf(iooutputId);
            if (index >= 0)
                this.selected.splice(index, 1);
        },
        batchRemove: function () {
            var count = 0;
            for (var i = 0; i < this.selected.length; i++) {
                Property.IOOutputList.Association.remove(Html.Current.Id.get(), this.selected[i]);
                ++count;
            }

            this.totalCount.set(Property.IOOutputList.Association.page.TotalRecordCount);
            this.selected = new Array();

            if (count == Property.IOOutputList.Association.page.RecordCount && Property.IOOutputList.Association.page.PageIndex == Property.IOOutputList.Association.page.PageCount && Property.IOOutputList.Association.page.PageIndex != 1)
                --Property.IOOutputList.Association.page.PageIndex;

            Html.Control.PopoverWindow.IOOutputList.Association.clear();
            Html.Control.PopoverWindow.IOOutputList.Association.load(Property.IOOutputList.Association.page.PageIndex);
        },
        modify: function (iooutput) {
            var item = this.Parent().Common.createItem(this.key, iooutput);
            var tag = getTag(Info.ControlIdPrefix.IOOutput.Association.list + iooutput.Id);
            if (item) {
                tag.parentElement.replaceChild(item, tag);
                return true;
            }

            return false;
        },
        removeAll: function () {
            var count = 0;
            var userId = Html.Current.Id.get();
            for (var id in Property.IOOutputList.Association.value) {
                count += Try(function () {
                    Property.IOOutputList.Association.remove(userId, id);
                    return 1;
                }, 0);
            }
            if (Property.IOOutputList.Association.page.TotalRecordCount != count) {
                Property.IOOutputList.Association.load(userId, 1, Property.IOOutputList.Association.page.TotalRecordCount);
                for (var id in Property.IOOutputList.Association.value) {
                    count += Try(function () {
                        Property.IOOutputList.Association.remove(userId, id);
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
                getTag("lbl_association_iooutput_count").innerText = value;
                this.value = value;
            }
        },
        show: function () {
            this.Parent().Common.show(this.key);
        }
    },
    Unassociation: {
        Parent: function () {
            return Html.Control.PopoverWindow.IOOutputList;
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
            Property.IOOutputList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.IOOutputList.Unassociation.value) {
                if (iooutputList.Unassociation.selected.indexOf(uid) < 0)
                    iooutputList.Unassociation.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.IOOutputList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.IOOutputList.Unassociation.value) {
                var tag = getTag(Info.ControlIdPrefix.IOOutput.Unassociation.list + uid);
                var index = iooutputList.Unassociation.selected.indexOf(uid);
                if (!tag && index < 0)
                    iooutputList.Unassociation.selected.push(uid);
                if (!tag && index >= 0)
                    iooutputList.Unassociation.selected.splice(index, 1);
            }
        },
        add: function (id, permission) {
            var iooutput = Property.IOOutputList.Unassociation.value[id];
            iooutput.Permission = permission;
            Property.IOOutputList.Unassociation.add(Html.Current.Id.get(), iooutput);

            if (Property.IOOutputList.Unassociation.page.RecordCount == 1 && Property.IOOutputList.Unassociation.page.PageIndex == Property.IOOutputList.Unassociation.page.PageCount && Property.IOOutputList.Unassociation.page.PageIndex != 1)
                --Property.IOOutputList.Unassociation.page.PageIndex;

            this.load(Property.IOOutputList.Unassociation.page.PageIndex);
            var items = new GroupListItemArray();
            this.clear();
            for (var Id in Property.IOOutputList.Unassociation.value) {
                var item = this.Parent().Common.createItem(this.key, Property.IOOutputList.Unassociation.value[Id]);
                getTag("glist_unassociation_iooutputs").appendChild(item);
            }
            this.totalCount.set(Property.IOOutputList.Unassociation.page.TotalRecordCount);

            this.clear();
            this.load(Property.IOOutputList.Unassociation.page.PageIndex);

            var index = this.selected.indexOf(id);
            if (index >= 0)
                this.selected.splice(index, 1);
            PageEvent.User.GroupListIOOutputIconButtonChanged(Html.Current.Id.get(), ++Property.IOOutputList.Association.page.TotalRecordCount);
        },
        batchAdd: function (permission) {
            for (var i = 0; i < this.selected.length; i++) {
                try {
                    var iooutput = Property.IOOutputList.Unassociation.value[this.selected[i]];
                    iooutput.Permission = permission;
                    Property.IOOutputList.Unassociation.add(Html.Current.Id.get(), iooutput);
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
            this.totalCount.set(Property.IOOutputList.Unassociation.page.TotalRecordCount);
        },
        show: function () {
            this.Parent().Common.show(this.key);
        },
        selected: new Array(),
        totalCount: {
            value: 0,
            set: function (value) {
                getTag("lbl_unassociation_iooutput_count").innerText = value;
                this.value = value;
            }
        }
    },
    AlertWindow: {

    }
}

Property["IOOutputList"] = {
    Association: {
        value: new Object(),
        page: new Page(),
        load: function (userId, index, size) {
            var response = tryCatch(function () {
                return Client.Security().User.IO.Output.List(userId, index, size)
            });
            var result = new Object();
            if (response) {
                if (response.IOOutputChannelPermission) {
                    for (var i = 0; i < response.IOOutputChannelPermission.length; i++) {
                        if (this.value[response.IOOutputChannelPermission[i].Id])
                            response.IOOutputChannelPermission[i]["Selected"] = this.value[response.IOOutputChannelPermission[i].Id].Selected;
                        this.value[response.IOOutputChannelPermission[i].Id] = response.IOOutputChannelPermission[i];
                        result[response.IOOutputChannelPermission[i].Id] = this.value[response.IOOutputChannelPermission[i].Id];
                    }
                }
                this.page = response.Page;
            }
            return result;
        },
        remove: function (userId, iooutputId) {
            var result = tryCatch(function () {
                return Client.Security().User.IO.Output.Delete(userId, iooutputId);
            })
            if (result)
                delete this.value[iooutputId];
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
        get: function (userId, iooutputId) {
            return tryCatch(function () {
                return Client.Security().User.IO.Output.Get(userId, iooutputId);
            });
        }

    },
    Unassociation: {
        value: new Object(),
        page: new Page(),
        //加载：从服务器中读取数据，并把读取到的数据保存在本地，并添加是否选中的属性
        load: function (userId, index, size) {

            var response = tryCatch(function () {
                return Client.Security().User.IO.Output.List(userId, index, size, true)
            });
            var result = new Object();
            if (response && response.IOOutputChannelPermission) {
                for (var i = 0; i < response.IOOutputChannelPermission.length; i++) {
                    if (this.value[response.IOOutputChannelPermission[i].Id])
                        response.IOOutputChannelPermission[i]["Selected"] = this.value[response.IOOutputChannelPermission[i].Id].Selected;
                    this.value[response.IOOutputChannelPermission[i].Id] = response.IOOutputChannelPermission[i];
                    result[response.IOOutputChannelPermission[i].Id] = this.value[response.IOOutputChannelPermission[i].Id];
                }
            }
            this.page = response.Page;
            return result;
        },
        //关联：把未关联输入通道添加到已关联输入通道中，同时删除本地内存中未关联列表中的当前输入通道
        add: function (userId, iooutput) {
            Client.Security().User.IO.Output.Create(userId, iooutput);
            delete this.value[iooutput.Id];
            --this.page.TotalRecordCount;
        }
    },
}

PageEvent.IOOutput.AddIOOutputToUser = function (permission, iooutputId) {
    Html.Control.PopoverWindow.IOOutputList.Unassociation.add(iooutputId, permission);
    var index = Html.Control.PopoverWindow.IOOutputList.Unassociation.selected.indexOf(iooutputId);
    if (index > -1) {
        Html.Control.PopoverWindow.IOOutputList.Unassociation.selected.splice(index, 1);
    }
}

PageEvent.User.ModifyIOOutputListItem = function (iooutput) {
    Html.Control.PopoverWindow.IOOutputList.Association.modify(iooutput);
}

PageEvent.IOOutput.BatchAddIOOutputsToUser = function (permission) {
    var count = Html.Control.PopoverWindow.IOOutputList.Unassociation.batchAdd(permission);
    Html.Control.PopoverWindow.IOOutputList.Unassociation.clear();//需要清理
    Html.Control.PopoverWindow.IOOutputList.Association.clear();
    Html.Control.PopoverWindow.IOOutputList.Association.load(1);
    Html.Control.PopoverWindow.IOOutputList.Association.show();
}
