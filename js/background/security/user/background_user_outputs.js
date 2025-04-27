if (!this.Client)
    imported.loadJS("js/client/client.js");


Html.Control.PopoverWindow["OutputList"] = {
    Common: {
        createItem: function (key, output) {
            var createCoontrol = {
                UnassociationIcon: function (output) {
                    var btn = new IconButton("", "icon-desktop", 11, output.Name);
                    btn.title = Html.DeviceName.get(output.Id) + "\n" + output.Name;
                    return btn
                },
                AssociationIcon: function (output) {
                    var btn = new IconButton("", "icon-desktop", 11, output.Name);
                    var a = new AlertWindow("", btn, Info.ControlIdPrefix.Output.AlertUrl.details + "?userId=" + Html.Current.Id.get() + "&outputId=" + output.Id, -1, true);
                    a.title = Html.DeviceName.get(output.Id) + "\n" + output.Name;
                    a.className = "alert-window-item";
                    return a;
                },
                UnassociationOperationButton: function (output, control) {
                    var a = document.createElement("a");
                    a.className = "icon-plus-sign pull-right";
                    a.href = Info.ControlIdPrefix.Output.AlertUrl.permissions + "?fun=PageEvent.Output.AddOutputToUser&userId=" + Html.Current.Id.get() + "&outputId=" + output.Id
                    a.setAttribute("onclick", "return GroupListItem_UserUnassociationAddOutput_Click(this, '" + output.Id + "')");
                    a.id = Info.ControlIdPrefix.Output.Unassociation.add + output.Id;
                    a.title = "添加";
                    control.appendChild(a);
                },
                AssociationOperationButton: function (output, control) {
                    var a = document.createElement("a");
                    a.className = "icon-trash pull-right";
                    a.setAttribute("onclick", "GroupListItem_UserAssociationRemoveOutput_Click(this, '" + output.Id + "')");
                    a.id = Info.ControlIdPrefix.Output.Association.remove + output.Id;
                    a.title = "删除";
                    control.appendChild(a);

                    a = document.createElement("a");
                    a.className = "icon-edit pull-right";
                    a.href = Info.ControlIdPrefix.Output.AlertUrl.details + "?userId=" + Html.Current.Id.get() + "&outputId=" + output.Id;
                    a.setAttribute("onclick", "return EditOutput_Click(this)");
                    a.id = Info.ControlIdPrefix.Output.Association.edit + output.Id;
                    a.title = "编辑";
                    a.style.marginRight = "5px";
                    control.appendChild(a);
                },
                flag: function (output, control) {
                    var permissionColor = {
                        All: LabelTagColor.Magenta
                    }
                    var div = document.createElement("div");
                    div.className = "lable-user-permission";
                    if (output.Permission) {
                        var permissions = Flags.Parse(output.Permission);
                        if (permissions && permissions.Value.indexOf(VideoOutSourcePermissions.None) < 0) {
                            if (permissions.Value.indexOf(VideoOutSourcePermissions.All) >= 0) {
                                permissions.Value = new Array();
                                //for (var p in VideoOutSourcePermissions) {
                                //    switch (p) {
                                //        case VideoOutSourcePermissions.All:
                                //        case VideoOutSourcePermissions.None:
                                //            continue;
                                //        default:
                                //            permissions.Value.push(VideoOutSourcePermissions[p]);
                                //    }
                                //}
                                permissions.Value.push(VideoOutSourcePermissions.All);
                            }
                            for (var i = 0; i < permissions.Value.length; i++) {
                                div.appendChild(new LabelTag(Language.Enum.VideoOutSourcePermissions[permissions.Value[i]], permissionColor[permissions.Value[i]]));
                            }
                        }
                    }
                    return div;
                }
            };
            var item = null;

            item = new GroupListItem(Info.ControlIdPrefix.Output[key].list, eval("User" + key + "Output_Selected"));
            item.id = Info.ControlIdPrefix.Output[key].list + output.Id;
            //item.Content.appendChild(createCoontrol[key + "OperationButton"](output));
            createCoontrol[key + "OperationButton"](output, item.Content);

            item.className += " mouse_pointer";
            if (Html.Control.PopoverWindow.OutputList[key].selected.indexOf(output.Id) >= 0)
                item.className += " selected";

            item.Content.appendChild(createCoontrol[key + "Icon"](output));
            //item.Content.appendChild(createCoontrol.flag(output));
            item.Content.className = "childpage-list-item-content";

            return item;
        },
        createItems: function (key, outputs) {
            var items = new GroupListItemArray();
            if (outputs) {
                for (var i = 0; i < outputs.length; i++) {
                    items.push(this.createItem(key, outputs[i]));
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
            getTag("glist_" + key.toLowerCase() + "_outputs").innerText = "";
            getTag("div_" + key.toLowerCase() + "_output_paging").innerText = "";
        },
        dic: function (key) {
            return Property.OutputList[key].value;
        },
        load: function (key, index) {
            var result = Property.OutputList[key].load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
            var items = this.createItemsByObj(key, result);
            if (items) {
                var glist = new GroupList("", items);
                getTag("glist_" + key.toLowerCase() + "_outputs").appendChild(glist);
                var page = Property.OutputList[key].page;

                pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("User" + key + "Output_PageChange"));
                getTag("div_" + key.toLowerCase() + "_output_paging").appendChild(pagination);
            }
        },
        show: function (key) {
            $(".swith_control").css("display", "none");
            getTag("div_" + key.toLowerCase() + "_output").style.display = "block";
        }
    },
    Association: {
        Parent: function () {
            return Html.Control.PopoverWindow.OutputList;
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
            Property.OutputList.Association.load(Html.Current.Id.get());
            for (var uid in Property.OutputList.Association.value) {
                if (outputList.Association.selected.indexOf(uid) < 0)
                    outputList.Association.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.OutputList.Association.load(Html.Current.Id.get());
            for (var uid in Property.OutputList.Association.value) {
                var tag = getTag(Info.ControlIdPrefix.Output.Association.list + uid);
                var index = outputList.Association.selected.indexOf(uid);
                if (!tag && index < 0)
                    outputList.Association.selected.push(uid);
                if (!tag && index >= 0)
                    outputList.Association.selected.splice(index, 1);
            }
        },
        load: function (index) {
            this.Parent().Common.load(this.key, index);
            this.totalCount.set(Property.OutputList.Association.page.TotalRecordCount);
            PageEvent.User.GroupListOutputIconButtonChanged(Html.Current.Id.get(), Property.OutputList.Association.page.TotalRecordCount);
        },
        clear: function () {
            return this.Parent().Common.clear(this.key);
            this.totalCount.set(0);
        },
        remove: function (outputId) {
            Property.OutputList.Association.remove(Html.Current.Id.get(), outputId);
            this.clear();

            if (Property.OutputList.Association.page.RecordCount == 1 && Property.OutputList.Association.page.PageIndex == Property.OutputList.Association.page.PageCount && Property.OutputList.Association.page.PageIndex != 1)
                --Property.OutputList.Association.page.PageIndex;

            this.load(Property.OutputList.Association.page.PageIndex, 11);
            this.totalCount.set(Property.OutputList.Association.page.TotalRecordCount);

            var index = this.selected.indexOf(outputId);
            if (index >= 0)
                this.selected.splice(index, 1);
        },
        batchRemove: function () {
            var count = 0;
            for (var i = 0; i < this.selected.length; i++) {
                Property.OutputList.Association.remove(Html.Current.Id.get(), this.selected[i]);
                ++count;
            }

            this.totalCount.set(Property.OutputList.Association.page.TotalRecordCount);
            this.selected = new Array();

            if (count == Property.OutputList.Association.page.RecordCount && Property.OutputList.Association.page.PageIndex == Property.OutputList.Association.page.PageCount &&
                Property.OutputList.Association.page.PageIndex != 1)
                --Property.OutputList.Association.page.PageIndex;

            Html.Control.PopoverWindow.OutputList.Association.clear();
            Html.Control.PopoverWindow.OutputList.Association.load(Property.OutputList.Association.page.PageIndex);
        },
        modify: function (output) {
            var item = this.Parent().Common.createItem(this.key, output);
            var tag = getTag(Info.ControlIdPrefix.Output.Association.list + output.Id);
            if (item) {
                tag.parentElement.replaceChild(item, tag);
                return true;
            }

            return false;
        },
        removeAll: function () {
            var count = 0;
            var userId = Html.Current.Id.get();
            for (var id in Property.OutputList.Association.value) {
                count += Try(function () {
                    Property.OutputList.Association.remove(userId, id);
                    return 1;
                }, 0);
            }
            if (Property.OutputList.Association.page.TotalRecordCount != count) {
                Property.OutputList.Association.load(userId, 1, Property.OutputList.Association.page.TotalRecordCount);
                for (var id in Property.OutputList.Association.value) {
                    count += Try(function () {
                        Property.OutputList.Association.remove(userId, id);
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
                getTag("lbl_association_output_count").innerText = value;
                this.value = value;
            }
        },
        show: function () {
            this.Parent().Common.show(this.key);
        }
    },
    Unassociation: {
        Parent: function () {
            return Html.Control.PopoverWindow.OutputList;
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
            Property.OutputList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.OutputList.Unassociation.value) {
                if (outputList.Unassociation.selected.indexOf(uid) < 0)
                    outputList.Unassociation.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.OutputList.Unassociation.load(Html.Current.Id.get());
            for (var uid in Property.OutputList.Unassociation.value) {
                var tag = getTag(Info.ControlIdPrefix.Output.Unassociation.list + uid);
                var index = outputList.Unassociation.selected.indexOf(uid);
                if (!tag && index < 0)
                    outputList.Unassociation.selected.push(uid);
                if (!tag && index >= 0)
                    outputList.Unassociation.selected.splice(index, 1);
            }
        },
        add: function (id, permission) {
            var output = Property.OutputList.Unassociation.value[id];
            output.Permission = permission;
            Property.OutputList.Unassociation.add(Html.Current.Id.get(), output);

            if (Property.OutputList.Unassociation.page.RecordCount == 1 && Property.OutputList.Unassociation.page.PageIndex == Property.OutputList.Unassociation.page.PageCount && Property.OutputList.Unassociation.page.PageIndex != 1)
                --Property.OutputList.Unassociation.page.PageIndex;

            this.load(Property.OutputList.Unassociation.page.PageIndex);
            var items = new GroupListItemArray();
            this.clear();
            for (var Id in Property.OutputList.Unassociation.value) {
                var item = this.Parent().Common.createItem(this.key, Property.OutputList.Unassociation.value[Id]);
                getTag("glist_unassociation_outputs").appendChild(item);
            }
            this.totalCount.set(Property.OutputList.Unassociation.page.TotalRecordCount);

            this.clear();
            this.load(Property.OutputList.Unassociation.page.PageIndex);

            var index = this.selected.indexOf(id);
            if (index >= 0)
                this.selected.splice(index, 1);
            PageEvent.User.GroupListOutputIconButtonChanged(Html.Current.Id.get(), ++Property.OutputList.Association.page.TotalRecordCount);
        },
        batchAdd: function (permission) {
            for (var i = 0; i < this.selected.length; i++) {
                try {
                    var output = Property.OutputList.Unassociation.value[this.selected[i]];
                    output.Permission = permission;
                    Property.OutputList.Unassociation.add(Html.Current.Id.get(), output);
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
            this.totalCount.set(Property.OutputList.Unassociation.page.TotalRecordCount);
        },
        show: function () {
            this.Parent().Common.show(this.key);
        },
        selected: new Array(),
        totalCount: {
            value: 0,
            set: function (value) {
                getTag("lbl_unassociation_output_count").innerText = value;
                this.value = value;
            }
        }
    },
    AlertWindow: {

    }
}

Property["OutputList"] = {
    Association: {
        value: new Object(),
        page: new Page(),
        load: function (userId, index, size) {
            var response = tryCatch(function () {
                return Client.Security().User.Video.Output.List(userId, index, size)
            });
            var result = new Object();
            if (response) {
                if (response.VideoOutputChannelPermission) {
                    for (var i = 0; i < response.VideoOutputChannelPermission.length; i++) {
                        if (this.value[response.VideoOutputChannelPermission[i].Id])
                            response.VideoOutputChannelPermission[i]["Selected"] = this.value[response.VideoOutputChannelPermission[i].Id].Selected;
                        this.value[response.VideoOutputChannelPermission[i].Id] = response.VideoOutputChannelPermission[i];
                        result[response.VideoOutputChannelPermission[i].Id] = this.value[response.VideoOutputChannelPermission[i].Id];
                    }
                }
                this.page = response.Page;
            }
            return result;
        },
        remove: function (userId, outputId) {
            var result = tryCatch(function () {
                return Client.Security().User.Video.Output.Delete(userId, outputId);
            })
            if (result)
                delete this.value[outputId];
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
        get: function (userId, outputId) {
            return tryCatch(function () {
                return Client.Security().User.Video.Output.Get(userId, outputId);
            });
        }

    },
    Unassociation: {
        value: new Object(),
        page: new Page(),
        //加载：从服务器中读取数据，并把读取到的数据保存在本地，并添加是否选中的属性
        load: function (userId, index, size) {

            var response = tryCatch(function () {
                return Client.Security().User.Video.Output.List(userId, index, size, true)
            });
            var result = new Object();
            if (response && response.VideoOutputChannelPermission) {
                for (var i = 0; i < response.VideoOutputChannelPermission.length; i++) {
                    if (this.value[response.VideoOutputChannelPermission[i].Id])
                        response.VideoOutputChannelPermission[i]["Selected"] = this.value[response.VideoOutputChannelPermission[i].Id].Selected;
                    this.value[response.VideoOutputChannelPermission[i].Id] = response.VideoOutputChannelPermission[i];
                    result[response.VideoOutputChannelPermission[i].Id] = this.value[response.VideoOutputChannelPermission[i].Id];
                }
            }
            this.page = response.Page;
            return result;
        },
        //关联：把未关联输入通道添加到已关联输入通道中，同时删除本地内存中未关联列表中的当前输入通道
        add: function (userId, output) {
            Client.Security().User.Video.Output.Create(userId, output);
            delete this.value[output.Id];
            --this.page.TotalRecordCount;
        }
    },
}

PageEvent.Output.AddOutputToUser = function (permission, outputId) {
    Html.Control.PopoverWindow.OutputList.Unassociation.add(outputId, permission);
    var index = Html.Control.PopoverWindow.OutputList.Unassociation.selected.indexOf(outputId);
    if (index > -1) {
        Html.Control.PopoverWindow.OutputList.Unassociation.selected.splice(index, 1);
    }
}

PageEvent.User.ModifyOutputListItem = function (output) {
    Html.Control.PopoverWindow.OutputList.Association.modify(output);
}

PageEvent.Output.BatchAddOutputsToUser = function (permission) {
    var count = Html.Control.PopoverWindow.OutputList.Unassociation.batchAdd(permission);
    Html.Control.PopoverWindow.OutputList.Unassociation.clear();//需要清理
    Html.Control.PopoverWindow.OutputList.Association.clear();
    Html.Control.PopoverWindow.OutputList.Association.load(1);
    Html.Control.PopoverWindow.OutputList.Association.show();
}
