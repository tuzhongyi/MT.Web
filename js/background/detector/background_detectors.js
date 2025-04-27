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
    Search: null,
    DetectorList:
    {
        value: null,
        load: function (index, size, search) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                return Client.Detector().Detector.List(index, size, search);
            });

            if (result && result.Detector) {
                for (var i = 0; i < result.Detector.length; i++) {
                    this.value[result.Detector[i].Id] = result.Detector[i];
                    if (!this.value[result.Detector[i].Id]["Selected"])
                        this.value[result.Detector[i].Id]["Selected"] = false;
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
                return Client.Detector().Detector.Delete(id);
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
}

var Html = {
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.detectorId;
                return null;
            }
        }
    },
    Control: {
        Popovers: {
            networkInterface: new Info.PopoverControls("网口", "icon-code-fork", "", "NetworkInterfaceCount"),
            auxiliary: new Info.PopoverControls("辅助控制器", "icon-flickr", "", "AuxiliaryCount"),
        },
        IconButton: {
            create: function (id, key, className, count) {
                var strLabel = "<lable id='" + Info.ControlIdPrefix.Popover.label(key) + id + "'>" + count + "</lable>"
                var icon = new IconButton(Info.ControlIdPrefix.Popover.icon(key) + id, className, 11, strLabel);
                icon.className = "popover_control_item";
                return icon;
            },
        },
        Popover: function (id, key, value, url, name) {
            var controlId = "popover_control";
            var a = document.createElement("a");
            a.appendChild(value);
            a.title = name;
            a.id = Info.ControlIdPrefix.Popover.control(key) + id;
            return a;
        },
        Popover: function (id, key, value, url, name) {
            var popover = new Popover(Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            popover.onclick = null;
            popover.className = "popover-control";
            return popover;
        },
        GroupList: {
            createItem: function (detector) {
                //创建控件
                var createControl = {
                    //检测器名称，点击后显示相信信息
                    details: function (detector, control) {
                        var bgColor = detector.Status.IsOnline ? "label-lightblue" : "label-darkgray";
                        var span = document.createElement("span");
                        span.innerText = detector.Name;
                        span.title = detector.Name;
                        var btn = new IconColorButton(Info.ControlIdPrefix.AlertWindow + id, "background_icon detector " + bgColor, bgColor, 10, span, detector.Status.IsOnline?"在线":"离线");

                        btn.href = "details/detector_details.htm?detectorId=" + detector.Id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        control.appendChild(btn);
                    },
                    //ip地址
                    ip: function (detector, control) {
                        //a.className = "list-item-information security";

                        var uri = new Uri(detector.Uri);
                        var inner = uri.Host + (uri.Port ? ":" + uri.Port : "");
                        var a = document.createElement("a");
                        a.className = "pull-right text-ellipsis  div-ip";
                        a.style.width = "220px";
                        a.title = inner;
                        a.innerText = inner;
                        a.href = "details/detector_details_networks.htm?detectorId=" + detector.Id;
                        a.onclick = function () {
                            AlertWindow.Show(a, -1);
                            return stopPropagation();
                        };
                        control.appendChild(a);
                    },
                    //波特率
                    //bd: function (detector, control) {
                    //    var div = document.createElement("div");
                    //    div.title = "波特率";
                    //    div.innerText = detector.BaudRate.substr(2) + "Bd";
                    //    div.className = "pull-right";
                    //    div.style.width = "100px";
                    //    control.appendChild(div);
                    //},
                    //connectionMode:function(detector, control){
                    //    var div = document.createElement("div");
                    //    div.title = "设备连接模式";
                    //    div.innerText = detector.ConnectionMode;
                    //    div.className = "pull-right";
                    //    div.style.width = "100px";
                    //    control.appendChild(div);
                    //},
                    description: function (detector, control) {
                        var div = document.createElement("div");
                        div.title = detector.Description;
                        div.className = "list-item-information detector_description";
                        if (!detector.Description) {
                            div.title = "无描述信息"
                            div.className += " none";
                        }

                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                    popover: function (detector, control) {
                        var controls = new Array();
                        for (var key in Html.Control.Popovers) {
                            var pop = Html.Control.Popovers[key];
                            var icon = new Html.Control.IconButton.create(detector.Id, key, pop.ClassName, detector[pop.CountKey]);
                            var popover = new Html.Control.Popover(detector.Id, key, icon, pop.Url, pop.Name);
                            controls.push(popover);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0)
                        bts.className += " popover_control";
                        control.appendChild(bts);
                    },
                    //删除控件
                    remove: function (detector, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeDetector_Click(this, '" + detector.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (detector, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Info.ControlIdPrefix.Edit + detector.Id + "' href=\"details/detector_details.htm?detectorId=" + detector.Id + "\" class=\"table-actions expand-btn\" onclick=\"return editDetector_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                };

                var id = detector.Id

                var item = new GroupListItem(Info.ControlIdPrefix.GroupListItem, GrouplistItem_Click);
                item.className = item.className + " mouse_pointer" + (Property.DetectorList.value[id].Selected ? " selected" : "");
                item.id = Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(detector, item.Content);//创建权限图标和输入通道名称               
                createControl.remove(detector, item.Content);//创建删除按钮
                createControl.edit(detector, item.Content);//创建编辑按钮


                createControl.popover(detector, item.Content);//创建关联弹出框按钮组
                //createControl.bd(detector, item.Content);
                //createControl.connectionMode(detector, item.Content);
                createControl.ip(detector, item.Content);
                createControl.description(detector, item.Content);

                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (detectors) {
                var items = new GroupListItemArray();
                if (detectors) {
                    for (var i = 0; i < detectors.length; i++) {
                        items.push(this.createItem(detectors[i]));
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {
                var result = Property.DetectorList.load(1, Property.PageSize);
                if (result) {
                    var items = this.getItems(result.Detector);
                    getTag("dList").appendChild(new GroupList("detectorGroupList", items));

                    Property.CurrentCount.set(result.Page.RecordCount);
                    Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size, search) {
                var result = Property.DetectorList.load(index, size, search);
                var items = this.getItems(result.Detector);
                var gList = getTag("detectorGroupList");
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
                var gList = getTag("detectorGroupList");
                gList.innerText = "";
                Property.CurrentCount.set(0);
                Property.TotalCount.set(0);
                this.selectedCount = 0;
            },
            reload: function (detectors, page) {
                var list = new Array();
                var i = 0;
                for (var d in detectors) {
                    list[i++] = detectors[d];
                }

                this.clear();

                var items = this.getItems(list);
                var gList = getTag("detectorGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                Property.CurrentCount.set(list.length);
                Property.TotalCount.set(page.TotalRecordCount);
            },
            remove: function (id) {
                Property.DetectorList.remove(id)
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + id);
                tag.parentElement.removeChild(tag);
                Property.CurrentCount.set(Property.CurrentCount.get() - 1);
                LazyLoadPage.TotalRecordCount--;
                var page = LazyLoadPage;
                if (Property.CurrentCount.get() < Property.TotalCount.get()) {
                    this.load(Property.CurrentCount.get() + 1, 1, Property.Search);
                }
                LazyLoadPage = page;
            },
            batchRemove: function () {
                var count = Property.DetectorList.batchRemove();//批量删除，并返回删除的条数                
                this.selectedCount -= count;
                if (count == 0)
                    return;
                var index = Math.floor(count / Property.PageSize);
                LazyLoadPage.PageIndex -= index;

                if ((count % Property.PageSize) == 0)
                    LazyLoadPage.PageIndex++;

                this.clear();
                var page = LazyLoadPage;
                this.load(1, Property.PageSize * LazyLoadPage.PageIndex, Property.Search);
                LazyLoadPage = page;
            },
            modify: function (detector) {
                var item = Html.Control.GroupList.createItem(detector);
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + detector.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            selectedCount: 0,
            select: function (id) {
                Property.DetectorList.value[id].Selected = !Property.DetectorList.value[id].Selected;
                if (Property.DetectorList.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
        },
        //AlertWindow
        PopoverWindow: {
            PageSize: 12
        }
    }
}

PageEvent.Detector.GroupListItemChanged = function (detector) {
    Html.Control.GroupList.modify(detector);
}
PageEvent.Detector.GroupListReload = function (index, size) {
    Html.Control.GroupList.clear();
    var page = LazyLoadPage;
    Html.Control.GroupList.load(index, size, Property.Search);
    page.TotalRecordCount = LazyLoadPage.TotalRecordCount;
    page.PageCount = Math.ceil(page.TotalRecordCount / Property.PageSize);
    LazyLoadPage = page;
}
//PageEvent.User.GroupListDepartmentIconButtonChanged = function (id, value) {
//    Html.Control.IconButton.Department(id, value);
//}
//PageEvent.User.GroupListDeviceIconButtonChanged = function (id, value) {
//    Html.Control.IconButton.Device(id, value);
//}
//PageEvent.User.GroupListInputIconButtonChanged = function (id, value) {
//    Html.Control.IconButton.Input(id, value);
//}
//PageEvent.User.GroupListOutputIconButtonChanged = function (id, value) {
//    Html.Control.IconButton.Output(id, value);
//}
//PageEvent.User.GroupListIOInputIconButtonChanged = function (id, value) {
//    Html.Control.IconButton.IOInput(id, value);
//}
//PageEvent.User.GroupListIOOutputIconButtonChanged = function (id, value) {
//    Html.Control.IconButton.IOOutput(id, value);
//}