if (!this.Client)
    imported.loadJS("js/client/client.js");
Property["UserList"] =
{
    Association: {
        value: new Object(),
        page: new Page(),
        load: function (inputId, index, size) {
            var response = tryCatch(function () {
                return Client.Security().Permission.Video.Input.User.List(inputId, index, size)
            });
            var result = new Object();
            if (response) {
                if (response.User) {
                    for (var i = 0; i < response.User.length; i++) {
                        if (this.value[response.User[i].Id])
                            response.User[i]["Selected"] = this.value[response.User[i].Id].Selected;
                        this.value[response.User[i].Id] = response.User[i];
                        result[response.User[i].Id] = this.value[response.User[i].Id];
                    }
                }
                this.page = response.Page;
            }
            return result;
        },
        remove: function (inputId, userId) {
            var result = tryCatch(function () {
                return Client.Security().Permission.Video.Input.User.Delete(inputId, userId);
            })
            if (result)
                delete this.value[userId];
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
                return Client.Security().Permission.Video.Input.User.List(inputId, index, size, true);
            });
            var result = new Object();
            if (response && response.User) {
                for (var i = 0; i < response.User.length; i++) {
                    if (this.value[response.User[i].Id])
                        response.User[i]["Selected"] = this.value[response.User[i].Id].Selected;
                    this.value[response.User[i].Id] = response.User[i];
                    result[response.User[i].Id] = this.value[response.User[i].Id];
                }
            }
            this.page = response.Page;
            return result;
        },
        //关联：把未关联用户添加到已关联用户中，同时删除本地内存中未关联列表中的当前用户
        add: function (inputId, userId, permission) {
            var input = Client.Management().Device.Video.Input.Get(Property.DeviceId, inputId);
            var videoInputChannelPermission = new VideoInputChannelPermission();
            videoInputChannelPermission.Id = input.Id;
            videoInputChannelPermission.Name = input.Name;
            videoInputChannelPermission.Permission = permission;
            videoInputChannelPermission.VideoInputChannel = input;
            Client.Security().User.Video.Input.Create(userId, videoInputChannelPermission);
            delete this.value[userId];
            --this.page.TotalRecordCount;
        }
    },
}

Html.Control.PopoverWindow["UserList"] = {
    Common: {
        createItem: function (key, user) {
            var createCoontrol = {
                icon: function (user) {
                    var btn = new IconButton("", "icon-user", 11, user.Username);
                    btn.style.maxWidth = "150px";
                    btn.title = user.Username;
                    return btn;

                },
                UnassociationOperationButton: function (user) {
                    var a = document.createElement("a");
                    a.className = "icon-plus-sign pull-right";
                    a.href = Property.Location.User.Details.Value + "?fun=PageEvent.Device.Video.Input.User.AddUserToInput&inputId=" + Html.Control.AlertWindow.Device.Input.Details.get().Id + "&userId=" + user.Id
                    a.setAttribute("onclick", "return GroupListItem_InputUnassociationAddUser_Click(this, '" + user.Id + "')");
                    a.id = Info.ControlIdPrefix.Device.Video.Input.User.Unassociation.add + user.Id;
                    a.title = "添加";
                    return a;
                },
                AssociationOperationButton: function (user) {
                    var a = document.createElement("a");
                    a.className = "icon-trash pull-right";
                    a.setAttribute("onclick", "GroupListItem_InputAssociationRemoveUser_Click(this, '" + user.Id + "')");
                    a.id = Info.ControlIdPrefix.Device.Video.Input.User.Association.remove + user.Id;
                    a.title = "删除";
                    return a;
                },
                flag: function (user, control) {
                    var permissionColor = {
                        Information: LabelTagColor.Green,
                        System: LabelTagColor.Yellow,
                        User: LabelTagColor.DoderBlue,
                        Device: LabelTagColor.LightBlue,
                        All: LabelTagColor.Magenta
                    }
                    var div = document.createElement("div");
                    div.className = "lable-user-permission";
                    if (user.DetailPermission) {
                        var permissions = Flags.Parse(user.DetailPermission);
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

            item = new GroupListItem(Info.ControlIdPrefix.Device.Video.Input.User[key].list, eval("Input" + key + "User_Selected"));
            item.id = Info.ControlIdPrefix.Device.Video.Input.User[key].list + user.Id;
            item.Content.appendChild(createCoontrol[key + "OperationButton"](user));

            item.className += " mouse_pointer";
            if (Html.Control.PopoverWindow.UserList[key].selected.indexOf(user.Id) >= 0)
                item.className += " selected";

            item.Content.appendChild(createCoontrol.icon(user));

            item.Content.appendChild(createCoontrol.flag(user));
            item.Content.className = "childpage-list-item-content";

            return item;
        },
        createItems: function (key, users) {
            var items = new GroupListItemArray();
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    items.push(this.createItem(key, users[i]));
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
            getTag("glist_" + key.toLowerCase() + "_users").innerText = "";
            getTag("div_" + key.toLowerCase() + "_user_paging").innerText = "";
        },
        dic: function (key) {
            return Property.UserList[key].value;
        },
        load: function (key, index) {
            var result = Property.UserList[key].load(Html.Control.AlertWindow.Device.Input.Details.get().Id, index, Html.Control.PopoverWindow.PageSize);
            var items = this.createItemsByObj(key, result);
            if (items) {
                var glist = new GroupList("", items);
                getTag("glist_" + key.toLowerCase() + "_users").appendChild(glist);
                var page = Property.UserList[key].page;

                pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("Input" + key + "User_PageChange"));
                getTag("div_" + key.toLowerCase() + "_user_paging").appendChild(pagination);
            }
        },
        show: function (key) {
            $(".swith_control").css("display", "none");
            getTag("div_" + key.toLowerCase() + "_user").style.display = "block";
        }
    },
    Association: {
        Parent: function () {
            return Html.Control.PopoverWindow.UserList;
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
            Property.UserList.Association.load(Html.Control.AlertWindow.Device.Input.Details.get().Id);
            for (var uid in Property.UserList.Association.value) {
                if (userList.Association.selected.indexOf(uid) < 0)
                    userList.Association.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.UserList.Association.load(Html.Control.AlertWindow.Device.Input.Details.get().Id);
            for (var uid in Property.UserList.Association.value) {
                var tag = getTag(Info.ControlIdPrefix.Device.Video.Input.User.Association.list + uid);
                var index = userList.Association.selected.indexOf(uid);
                if (!tag && index < 0)
                    userList.Association.selected.push(uid);
                if (!tag && index >= 0)
                    userList.Association.selected.splice(index, 1);
            }
        },
        load: function (index) {
            this.Parent().Common.load(this.key, index);
            this.totalCount.set(Property.UserList.Association.page.TotalRecordCount);
            PageEvent.Device.Video.Input.GroupListUserIconButtonChanged(Html.Control.AlertWindow.Device.Input.Details.get().Id, Property.UserList.Association.page.TotalRecordCount);
        },
        clear: function () {
            return this.Parent().Common.clear(this.key);
            this.totalCount.set(0);
        },
        remove: function (userId) {
            Property.UserList.Association.remove(Html.Control.AlertWindow.Device.Input.Details.get().Id, userId);
            this.clear();

            if (Property.UserList.Association.page.RecordCount == 1 && Property.UserList.Association.page.PageIndex == Property.UserList.Association.page.PageCount &&
                Property.UserList.Association.page.PageIndex != 1)
                --Property.UserList.Association.page.PageIndex;

            this.load(Property.UserList.Association.page.PageIndex);
            this.totalCount.set(Property.UserList.Association.page.TotalRecordCount);

            var index = this.selected.indexOf(userId);
            if (index >= 0)
                this.selected.splice(index, 1);
        },
        batchRemove: function () {
            var count = 0;
            for (var i = 0; i < this.selected.length; i++) {
                Property.UserList.Association.remove(Html.Control.AlertWindow.Device.Input.Details.get().Id, this.selected[i]);
                ++count;
            }

            this.totalCount.set(Property.UserList.Association.page.TotalRecordCount);
            this.selected = new Array();

            if (count == Property.UserList.Association.page.RecordCount && Property.UserList.Association.page.PageIndex == Property.UserList.Association.page.PageCount &&
                Property.UserList.Association.page.PageIndex != 1)
                --Property.UserList.Association.page.PageIndex;

            Html.Control.PopoverWindow.UserList.Association.clear();
            Html.Control.PopoverWindow.UserList.Association.load(Property.UserList.Association.page.PageIndex);
        },
        removeAll: function () {
            var count = 0;
            var inputId = Html.Control.AlertWindow.Device.Input.Details.get().Id;
            for (var id in Property.UserList.Association.value) {
                count += Try(function () {
                    Property.UserList.Association.remove(inputId, id);
                    return 1;
                }, 0);
            }
            if (Property.UserList.Association.page.TotalRecordCount != count) {
                Property.UserList.Association.load(inputId, 1, Property.UserList.Association.page.TotalRecordCount);
                for (var id in Property.UserList.Association.value) {
                    count += Try(function () {
                        Property.UserList.Association.remove(inputId, id);
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
                getTag("lbl_association_user_count").innerText = value;
                this.value = value;
            }
        },
        show: function () {
            this.Parent().Common.show(this.key);
        }
    },
    Unassociation: {
        Parent: function () {
            return Html.Control.PopoverWindow.UserList;
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
            Property.UserList.Unassociation.load(Html.Control.AlertWindow.Device.Input.Details.get().Id);
            for (var uid in Property.UserList.Unassociation.value) {
                if (userList.Unassociation.selected.indexOf(uid) < 0)
                    userList.Unassociation.selected.push(uid);
            }
        },
        selectInverse: function () {
            Property.UserList.Unassociation.load(Html.Control.AlertWindow.Device.Input.Details.get().Id);
            for (var uid in Property.UserList.Unassociation.value) {
                var tag = getTag(Info.ControlIdPrefix.Device.Video.Input.User.Unassociation.list + uid);
                var index = userList.Unassociation.selected.indexOf(uid);
                if (!tag && index < 0)
                    userList.Unassociation.selected.push(uid);
                if (!tag && index >= 0)
                    userList.Unassociation.selected.splice(index, 1);
            }
        },
        add: function (id, permission) {
            Property.UserList.Unassociation.add(Html.Control.AlertWindow.Device.Input.Details.get().Id, id, permission);

            if (Property.UserList.Unassociation.page.RecordCount == 1 && Property.UserList.Unassociation.page.PageIndex == Property.UserList.Unassociation.page.PageCount &&
                Property.UserList.Unassociation.page.PageIndex != 1)
                --Property.UserList.Unassociation.page.PageIndex;

            this.load(Property.UserList.Unassociation.page.PageIndex);
            var items = new GroupListItemArray();
            this.clear();
            for (var id in Property.UserList.Unassociation.value) {
                var item = this.Parent().Common.createItem(this.key, Property.UserList.Unassociation.value[id]);
                //items.push(Property.UserList.Unassociation.value[id]);
                getTag("glist_unassociation_users").appendChild(item);
            }
            this.totalCount.set(Property.UserList.Unassociation.page.TotalRecordCount);

            this.clear();
            this.load(Property.UserList.Unassociation.page.PageIndex);

            var index = this.selected.indexOf(id);
            if (index >= 0)
                this.selected.splice(index, 1);
            PageEvent.Device.Video.Input.GroupListUserIconButtonChanged(Html.Control.AlertWindow.Device.Input.Details.get().Id, ++Property.UserList.Association.page.TotalRecordCount);
        },
        batchAdd: function (permission) {
            for (var i = 0; i < this.selected.length; i++) {
                try {
                    Property.UserList.Unassociation.add(Html.Control.AlertWindow.Device.Input.Details.get().Id, this.selected[i], permission);
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
            this.totalCount.set(Property.UserList.Unassociation.page.TotalRecordCount);
        },
        show: function () {
            this.Parent().Common.show(this.key);
        },
        selected: new Array(),
        totalCount: {
            value: 0,
            set: function (value) {
                getTag("lbl_unassociation_user_count").innerText = value;
                this.value = value;
            }
        }
    }
};

PageEvent.Device.Video.Input.User.AddUserToInput = function (permission, userId) {
    Html.Control.PopoverWindow.UserList.Unassociation.add(userId, permission);
    var index = Html.Control.PopoverWindow.UserList.Unassociation.selected.indexOf(userId);
    if (index > -1) {
        Html.Control.PopoverWindow.UserList.Unassociation.selected.splice(index, 1);
    }
}

PageEvent.Device.Video.Input.User.BatchAddInputsToUser = function (permission) {
    var count = Html.Control.PopoverWindow.UserList.Unassociation.batchAdd(permission);
    Html.Control.PopoverWindow.UserList.Unassociation.clear();//需要清理
    Html.Control.PopoverWindow.UserList.Association.clear();
    Html.Control.PopoverWindow.UserList.Association.load(1);
    Html.Control.PopoverWindow.UserList.Association.show();
}