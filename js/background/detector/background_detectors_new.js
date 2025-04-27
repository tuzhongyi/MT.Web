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
        //获取ID
        getId: function (id, prefix) {
            return id.substr(prefix.length);
        }
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
        GroupList: {
            Table: {
                create: function () {
                    var result = Property.DetectorList.load(1, Property.PageSize);
                    if (result) {
                        var table = document.createElement("table");
                        table.className = "table table-bordered";
                        var trs = new TableBodyTrs();
                        for (var i = 0; i < result.Detector.length; i++) {
                            var tds = new TableBodyTds();
                            tds.push(TableBodyTd(result.Detector[i].Name));

                            tds.push(TableBodyTd(result.Detector[i].Status.IsOnline == null ? "--" : result.Detector[i].Status.IsOnline ? "是" : "否", "td-box-opened text-center"));

                            tds.push(TableBodyTd(result.Detector[i].Status.BoxOpened == null ? "--" : result.Detector[i].Status.BoxOpened ? "开" : "关", "td-box-opened text-center"));
                            tds.push(TableBodyTd(result.Detector[i].Status.PowerOff == null ? "--" : result.Detector[i].Status.PowerOff ? "断电" : "正常", "td-power-off text-center"));
                            tds.push(TableBodyTd(result.Detector[i].Status.Buzzer == null ? "--" : result.Detector[i].Status.Buzzer ? "开" : "关", "td-buzzer text-center"));
                            tds.push(TableBodyTd(result.Detector[i].Status.Temperature ? result.Detector[i].Status.Temperature.toFixed(1) : "--", "text-center td-temperature"));
                            tds.push(TableBodyTd(result.Detector[i].Status.Humidity ? result.Detector[i].Status.Humidity.toFixed(1) : "--", "text-center td-humidity"));
                            tds.push(TableBodyTd(result.Detector[i].Status.DC12V_1 ? result.Detector[i].Status.DC12V_1.toFixed(1) + "V" : "--", "text-center td-electricity"));
                            tds.push(TableBodyTd(result.Detector[i].Status.DC12V_2 ? result.Detector[i].Status.DC12V_2.toFixed(1) + "V" : "--", "text-center td-electricity"));
                            tds.push(TableBodyTd(result.Detector[i].Status.DC24V ? result.Detector[i].Status.DC24V.toFixed(1) + "V" : "--", "text-center td-electricity"));
                            tds.push(TableBodyTd(result.Detector[i].Status.AC24V ? result.Detector[i].Status.AC24V.toFixed(1) + "V" : "--", "text-center td-electricity"));
                            tds.push(TableBodyTd(result.Detector[i].Status.AC220V ? result.Detector[i].Status.AC220V.toFixed(1) + "V" : "--", "text-center td-electricity"));
                            trs.push(TableBodyTr(tds));
                        }
                        var tBody = TableBody(trs);
                        table.appendChild(tBody);
                        getTag("dTable").appendChild(table);
                        Property.CurrentCount.set(result.Page.RecordCount);
                        Property.TotalCount.set(result.Page.TotalRecordCount);
                        LazyLoadPage = result.Page;
                    }
                },
            },

            createItem: function (detector) {
                //创建控件
                var createControl = {
                    //检测器名称，点击后显示相信信息
                    details: function (detector, control) {
                        var btn = document.createElement("div");
                        btn.title = detector.Name;
                        btn.className = "icon_btn list-group-item-name";
                        btn.id = Info.ControlIdPrefix.AlertWindow + id;
                        btn.innerText = detector.Name;
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        control.appendChild(btn);
                    },
                    //删除控件
                    remove: function (detector, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeDetector_Click(this, '" + detector.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation shrink";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (detector, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Info.ControlIdPrefix.Edit + detector.Id + "' href=\"details/detector_details.htm?userId=" + detector.Id + "\" class=\"table-actions expand-btn\" onclick=\"return editDetector_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation shrink";
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
                //createControl.information(detector, item.Content)//创建输入通道描述信息
                item.Content.className = "list-group-item-content shrink";

                return item;
            },
            //获取列表项
            getItems: function (detectors) {
                var items = new GroupListItemArray();
                if (detectors) {
                    //for (var i = 0; i < detectors.length; i++) {
                    //    items.push(this.createItem(detectors[i]));
                    //}
                    //return items;

                    for (var i = 0; i < 100; i++) {
                        items.push(this.createItem(detectors[i % 2]));
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

//PageEvent.User.GroupListItemChanged = function (user) {
//    Html.Control.GroupList.modify(user);
//}
//PageEvent.User.GroupListReload = function (index, size, permission) {
//    //Html.Control.GroupList.clear();
//    //var page = LazyLoadPage;
//    //Html.Control.GroupList.load(index, size, permission);
//    //LazyLoadPage = page;

//    Html.Control.GroupList.clear();
//    var page = LazyLoadPage;
//    Html.Control.GroupList.load(index, size, permission, Property.Search);
//    page.TotalRecordCount = LazyLoadPage.TotalRecordCount;
//    page.PageCount = Math.ceil(page.TotalRecordCount / Property.PageSize);
//    LazyLoadPage = page;
//}
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