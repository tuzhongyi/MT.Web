/// <reference path="../../client/client.js" />
/// <reference path="../../client/vehicle.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var Vehicle_Info =
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
var Vehicle_Property =
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
    VehicleList:
    {
        value: null,
        load: function (index, size) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                return Client.Vehicle().Vehicle.List(null, null, null, index, size);
            });

            if (result && result.Vehicle) {
                for (var i = 0; i < result.Vehicle.length; i++) {
                    this.value[result.Vehicle[i].Id] = result.Vehicle[i];
                    if (!this.value[result.Vehicle[i].Id]["Selected"])
                        this.value[result.Vehicle[i].Id]["Selected"] = false;
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
                return Client.Vehicle().Vehicle.Delete(id)
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
                        this.remove(id); count++;
                    } catch (e) { };
                }
            }
            return count;
        },
    },
}
var Vehicle_Html = {
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.vehicleId;
                return "";
            }
        }
    },
    Control: {
        GroupList: {
            createItem: function (vehicle) {
                var isBlackList = {
                    not: LabelTagColor.LightBlue,
                    is: LabelTagColor.Red
                }
                //创建控件
                var createControl = {
                    //车辆名称，点击后显示相信信息
                    details: function (vehicle, control) {
                        var span = document.createElement("span");
                        span.innerText = vehicle.Name;
                        span.title = vehicle.Name;
                        var backgroundCss = isBlackList.not;
                        if (vehicle.ExistedInBlackList) {
                            backgroundCss = isBlackList.is;
                        }
                        var btn = new IconColorButton(Vehicle_Info.ControlIdPrefix.AlertWindow + id, "howell-icon-vehicle background-icon", backgroundCss, 10, span, backgroundCss == isBlackList.is ? "黑名单" : "正常");

                        btn.href = "vehicle/vehicles/vehicle_details.htm?vehicleId=" + vehicle.Id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        control.appendChild(btn);
                    },
                    //删除控件
                    remove: function (vehicle, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" name='a_vehicleId' class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeVehicle_Click(this, '" + vehicle.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (vehicle, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Vehicle_Info.ControlIdPrefix.Edit + vehicle.Id + "' href=\"vehicle/vehicles/vehicle_details.htm?vehicleId=" + vehicle.Id + "\" class=\"table-actions expand-btn\" onclick=\"return editVehicle_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    description: function (vehicle, control) {
                        var div = document.createElement("div");
                        div.title = vehicle.Description;
                        div.className = "list-item-information security";
                        if (!vehicle.Description) {
                            div.title = "无描述信息"
                            div.className += " none";
                        }
                        div.style.width = "380px";
                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                    matchingPercentage: function (vehicle, control) {
                        var div = document.createElement("div");
                        div.title = "匹配百分比";
                        div.className = "pull-right";
                        div.style.width = "80px";
                        div.innerText = vehicle.MatchingPercentage + "%";
                        control.appendChild(div);
                    },
                    plate: function (vehicle, control) {
                        var div = document.createElement("div");
                        div.title = "车牌";
                        div.className = "pull-right list-item-information security";
                        div.style.width = "180px";
                        div.innerText = vehicle.Plate;
                        control.appendChild(div);
                    }
                };

                var id = vehicle.Id

                var item = new GroupListItem(Vehicle_Info.ControlIdPrefix.GroupListItem, Vehicle_GrouplistItem_Click);
                item.className = item.className + " mouse_pointer" + (Vehicle_Property.VehicleList.value[id].Selected ? " selected" : "");
                item.id = Vehicle_Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(vehicle, item.Content);//创建权限图标和输入通道名称
                createControl.remove(vehicle, item.Content);//创建删除按钮
                createControl.edit(vehicle, item.Content);//创建编辑按钮
                createControl.matchingPercentage(vehicle, item.Content);//创建匹配百分比
                createControl.description(vehicle, item.Content);//创建设备描述信息
                createControl.plate(vehicle, item.Content);//创建车牌

                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (vehicles) {
                var items = new GroupListItemArray();
                if (vehicles) {
                    for (var i = 0; i < vehicles.length; i++) {
                        items.push(this.createItem(vehicles[i]));
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {
                var result = Vehicle_Property.VehicleList.load(1, Vehicle_Property.PageSize);
                if (result) {
                    var items = this.getItems(result.Vehicle);
                    getTag("dList").appendChild(new GroupList("vehicleGroupList", items));

                    Vehicle_Property.CurrentCount.set(result.Page.RecordCount);
                    Vehicle_Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size) {
                var result = Vehicle_Property.VehicleList.load(index, size);
                var items = this.getItems(result.Vehicle);
                var gList = getTag("vehicleGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                var old = Vehicle_Property.CurrentCount.get();
                Vehicle_Property.CurrentCount.set(old + result.Page.RecordCount);
                Vehicle_Property.TotalCount.set(result.Page.TotalRecordCount);
                LazyLoadPage = result.Page;
            },
            //清空列表
            clear: function () {
                var gList = getTag("vehicleGroupList");
                gList.innerText = "";
                Vehicle_Property.CurrentCount.set(0);
                Vehicle_Property.TotalCount.set(0);
                this.selectedCount = 0;
            },
            reload: function (vehicles, page) {
                var list = new Array();
                var i = 0;
                for (var d in vehicles) {
                    list[i++] = vehicles[d];
                }

                this.clear();

                var items = this.getItems(list);
                var gList = getTag("vehicleGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                Vehicle_Property.CurrentCount.set(list.length);
                Vehicle_Property.TotalCount.set(page.TotalRecordCount);
            },
            remove: function (id) {
                Vehicle_Property.VehicleList.remove(id)
                var tag = getTag(Vehicle_Info.ControlIdPrefix.GroupListItem + id);
                tag.parentElement.removeChild(tag);
                Vehicle_Property.CurrentCount.set(Vehicle_Property.CurrentCount.get() - 1);
                LazyLoadPage.TotalRecordCount--;
                var page = LazyLoadPage;
                if (Vehicle_Property.CurrentCount.get() < Vehicle_Property.TotalCount.get()) {
                    this.load(Vehicle_Property.CurrentCount.get() + 1, 1);
                }
                LazyLoadPage = page;
            },
            batchRemove: function () {
                var count = Vehicle_Property.VehicleList.batchRemove();//批量删除，并返回删除的条数
                this.selectedCount -= count;
                if (count == 0)
                    return;

                var index = Math.floor(count / Vehicle_Property.PageSize);
                LazyLoadPage.PageIndex -= index;

                if ((count % Vehicle_Property.PageSize) == 0)
                    LazyLoadPage.PageIndex++;

                this.clear();
                var page = LazyLoadPage;
                this.load(1, Vehicle_Property.PageSize * LazyLoadPage.PageIndex);
                LazyLoadPage = page;
            },
            modify: function (vehicle) {
                var item = Vehicle_Html.Control.GroupList.createItem(vehicle);
                var tag = getTag(Vehicle_Info.ControlIdPrefix.GroupListItem + vehicle.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            selectedCount: 0,
            select: function (id) {
                Vehicle_Property.VehicleList.value[id].Selected = !Vehicle_Property.VehicleList.value[id].Selected;
                if (Vehicle_Property.VehicleList.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
        },
    }
}
VehiclePageEvent.Vehicle.GroupListItemChanged = function (vehicle) {
    Vehicle_Html.Control.GroupList.modify(vehicle);
}
VehiclePageEvent.Vehicle.GroupListReload = function (index, size) {
    Vehicle_Html.Control.GroupList.clear();
    var page = LazyLoadPage;
    Vehicle_Html.Control.GroupList.load(index, size);
    page.TotalRecordCount = LazyLoadPage.TotalRecordCount;
    page.PageCount = Math.ceil(page.TotalRecordCount / Vehicle_Property.PageSize);
    LazyLoadPage = page;
}
