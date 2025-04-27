/// <reference path="../../language/chinese.js" />
/// <reference path="../../client/enum.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var Platform_Info =
{
    ControlIdPrefix:
    {
        GroupListItem: "group_",
        AlertWindow: "alert_",
        Edit: "edit_",
        Sync: "sync_",
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
        Device: {
            list: "platform_device_list_",
            remove: "platform_device_list_remove_",
            AlertUrl: {
                add: "device/medium/device_medium_add.htm",
                list: "device/medium/device_medium_details_list.htm"
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
var Platform_Property =
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
    PlatformList:
    {
        value: new Dictionary(),
        load: function (index, size) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                return Client.Management().Platforms.List(index, size);
            });
            if (result && result.Platform) {
                for (var i = 0; i < result.Platform.length; i++) {
                    this.value[result.Platform[i].Id] = result.Platform[i];
                    if (!this.value[result.Platform[i].Id]["Selected"])
                        this.value[result.Platform[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        loadDb: function (id) {
            return tryCatch(function () {
                var platform = Client.Management().Platforms.Get(id);
                if (platform) {
                    Platform_Property.PlatformList.value[platform.Id] = platform;
                    if (!Platform_Property.PlatformList.value[platform.Id]["Selected"])
                        Platform_Property.PlatformList.value[platform.Id]["Selected"] = false;
                }
                return Platform_Property.PlatformList.value[platform.Id];
            });
        },
        get: function (id) {
            if (this.value)
                return this.value[id];
            return null;
        },
        remove: function (id) {
            var result = tryCatch(function () {
                return Client.Management().Platforms.Delete(id);
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
        },
        sync: function (id) {
            var result = tryCatch(function () {
                var isSync = Client.Management().Platforms.Device.Sync(id);
                if (isSync) {
                    if (Platform_Property.PlatformList.value[id].Selected) {
                        Platform_Property.PlatformList.value[id].Selected = false;
                        Platform_Html.Control.GroupList.selectedCount = Platform_Html.Control.GroupList.selectedCount - 1;
                    }
                    var platform = Platform_Property.PlatformList.loadDb(id);
                    PageEvent.Platform.GroupListItemChanged(platform);
                }
                return isSync;
            });
            return result;
        }
    }
}

var Platform_Html = {
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.platformId;
                return null;
            },
        }
    },
    Control: {
        Popovers:
        {
            device: new Platform_Info.PopoverControls("设备", "howell-icon-device", "management/platform/platform_devices.htm?platformId=", "DeviceCount"),
        },
        IconButton: {
            create: function (id, key, className, count) {
                var style = "";
                if (key == "device")
                    style = "style='margin-left:-16px'";
                var strLabel = "<lable " + style + " id='" + Platform_Info.ControlIdPrefix.Popover.label(key) + id + "'>" + count + "</lable>"
                var icon = new IconButton(Platform_Info.ControlIdPrefix.Popover.icon(key) + id, className, 11, strLabel);
                icon.className = "popover_control_item";
                return icon;
            },
            Device: function (id, value) {
                try {
                    getTag(Platform_Info.ControlIdPrefix.Popover.label("device") + id).innerText = value;
                } catch (e) { }
            },
        },

        Popover: function (id, key, value, url, name) {
            var popover = new Popover(Platform_Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            popover.className = "popover-control";
            return popover;
        },
        GroupList: {
            createItem: function (platform) {
                //创建控件
                var createControl = {
                    //输入通道名称，点击后显示相信信息
                    details: function (platform, control) {
                        var span = document.createElement("span");
                        span.innerText = platform.Name;
                        span.title = platform.Name;
                        var bgColor = LabelTagColor.DarkGray;
                        if (platform.IsOnline)
                            bgColor = LabelTagColor.LightBlue;
                        var btn = new IconColorButton(Platform_Info.ControlIdPrefix.AlertWindow + id, "howell-icon-platform background-icon", bgColor, 10, span);
                        btn.title = platform.Name;
                        btn.href = "management/platform/platform_details.htm?platformId=" + platform.Id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        control.appendChild(btn);
                    },
                    //删除控件
                    remove: function (platform, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" name='a_platformId' class=\"table-actions mouse_pointer expand-btn\" onclick=\"removePlatform_Click(this, '" + platform.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (platform, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Platform_Info.ControlIdPrefix.Edit + platform.Id + "' href=\"management/platform/platform_details.htm?platformId=" + platform.Id + "\" class=\"table-actions expand-btn\" onclick=\"return editPlatform_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //同步控件
                    sync: function (platform, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"同步设备\" id='" + Platform_Info.ControlIdPrefix.Sync + platform.Id + "' class=\"table-actions expand-btn\" onclick=\"return syncPlatform_Click(this)\"><i class=\"icon-retweet\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //操作关联控件
                    popover: function (platform, control) {
                        var controls = new Array();
                        for (var key in Platform_Html.Control.Popovers) {
                            var pop = Platform_Html.Control.Popovers[key];
                            var icon = new Platform_Html.Control.IconButton.create(platform.Id, key, pop.ClassName, platform[pop.CountKey]);
                            var popover = new Platform_Html.Control.Popover(platform.Id, key, icon, pop.Url, pop.Name);
                            popover.onclick = function () {
                                var uri = "management/platform/platform_devices.htm?platformId=" + Platform_Info.ControlIdPrefix.getId(this.id, Platform_Info.ControlIdPrefix.Popover.control("device"));
                                Trigger = document.createElement("a");
                                Trigger.href = uri;
                                loadContent(base64encode(uri));
                            }
                            controls.push(popover);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0);

                        control.appendChild(bts);
                    },
                    information: function (platform, control) {
                        var div = document.createElement("div");
                        div.title = platform.Information;
                        div.className = "list-item-information security";
                        if (!platform.Information) {
                            div.title = "无描述信息"
                            div.className += " none";
                        }

                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                    uri: function (platform, control) {
                        var div = document.createElement("div");
                        div.title = platform.Uri;
                        div.className = "list-item-information security";
                        div.innerText = platform.Uri;
                        control.appendChild(div);
                    }
                };

                var id = platform.Id

                var item = new GroupListItem(Platform_Info.ControlIdPrefix.GroupListItem, Platform_GrouplistItem_Click);
                item.className = item.className + " mouse_pointer" + (Platform_Property.PlatformList.value[id].Selected ? " selected" : "");
                item.id = Platform_Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(platform, item.Content);//创建权限图标和输入通道名称
                createControl.remove(platform, item.Content);//创建删除按钮
                createControl.edit(platform, item.Content);//创建编辑按钮
                createControl.sync(platform, item.Content);//创建同步按钮
                createControl.popover(platform, item.Content);//创建关联弹出框按钮组
                createControl.uri(platform, item.Content)//创建设备访问地址
                createControl.information(platform, item.Content)//创建输入通道描述信息
                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (platforms) {
                var items = new GroupListItemArray();
                if (platforms) {
                    for (var i = 0; i < platforms.length; i++) {
                        items.push(this.createItem(platforms[i]));
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {
                var result = Platform_Property.PlatformList.load(1, Platform_Property.PageSize);
                if (result) {
                    var items = this.getItems(result.Platform);
                    getTag("dList").appendChild(new GroupList("platformGroupList", items));

                    Platform_Property.CurrentCount.set(result.Page.RecordCount);
                    Platform_Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size) {
                var result = Platform_Property.PlatformList.load(index, size);
                var items = this.getItems(result.Platform);
                var gList = getTag("platformGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                var old = Platform_Property.CurrentCount.get();
                Platform_Property.CurrentCount.set(old + result.Page.RecordCount);
                Platform_Property.TotalCount.set(result.Page.TotalRecordCount);
                LazyLoadPage = result.Page;
            },
            //清空列表
            clear: function () {
                var gList = getTag("platformGroupList");
                gList.innerText = "";
                Platform_Property.CurrentCount.set(0);
                Platform_Property.TotalCount.set(0);
                this.selectedCount = 0;
            },
            reload: function (platforms, page) {
                var list = new Array();
                var i = 0;
                for (var p in platforms) {
                    list[i++] = platforms[p];
                }

                this.clear();

                var items = this.getItems(list);
                var gList = getTag("platformGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                Platform_Property.CurrentCount.set(list.length);
                Platform_Property.TotalCount.set(page.TotalRecordCount);
            },
            remove: function (id) {
                Platform_Property.PlatformList.remove(id)
                var tag = getTag(Platform_Info.ControlIdPrefix.GroupListItem + id);
                tag.parentElement.removeChild(tag);
                Platform_Property.CurrentCount.set(Platform_Property.CurrentCount.get() - 1);
                LazyLoadPage.TotalRecordCount--;
                var page = LazyLoadPage;
                if (Platform_Property.CurrentCount.get() < Platform_Property.TotalCount.get()) {
                    this.load(Platform_Property.CurrentCount.get() + 1, 1);
                }
                LazyLoadPage = page
            },
            batchRemove: function () {
                var count = Platform_Property.PlatformList.batchRemove();//批量删除，并返回删除的条数
                this.selectedCount -= count;
                if (count == 0)
                    return;

                var index = Math.floor(count / Platform_Property.PageSize);
                LazyLoadPage.PageIndex -= index;

                if ((count % Platform_Property.PageSize) == 0)
                    LazyLoadPage.PageIndex++;

                this.clear();
                var page = LazyLoadPage;
                this.load(1, Platform_Property.PageSize * LazyLoadPage.PageIndex);
                LazyLoadPage = page;
            },
            sync: function (id) {
                var isSync = Platform_Property.PlatformList.sync(id);
                if (isSync) {
                    AlertWindow.Close();
                    $.confirm({
                        title: "提示",
                        text: "同步成功",
                        okButton: "确定",
                        alert: true,
                        top: -1,
                    });
                }
            },
            modify: function (platform) {
                var item = Platform_Html.Control.GroupList.createItem(platform);
                var tag = getTag(Platform_Info.ControlIdPrefix.GroupListItem + platform.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            selectedCount: 0,
            select: function (id) {
                Platform_Property.PlatformList.value[id].Selected = !Platform_Property.PlatformList.value[id].Selected;
                if (Platform_Property.PlatformList.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
        },
        PopoverWindow: {
            PageSize: 12
        }
    }
}

PageEvent.Platform.GroupListItemChanged = function (platform) {
    Platform_Html.Control.GroupList.modify(platform);
}
PageEvent.Platform.GroupListReload = function (index, size) {
    Platform_Html.Control.GroupList.clear();
    var page = LazyLoadPage;
    Platform_Html.Control.GroupList.load(index, size);
    page.TotalRecordCount = LazyLoadPage.TotalRecordCount;
    page.PageCount = Math.ceil(page.TotalRecordCount / Platform_Property.PageSize);
    LazyLoadPage = page;
}
PageEvent.Platform.GroupListDeviceIconButtonChanged = function (id, value) {
    Platform_Html.Control.IconButton.Device(id, value);
}