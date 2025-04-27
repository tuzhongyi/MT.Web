/// <reference path="../../client/client.js" />
/// <reference path="../../client/gps.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var GPS_Device_Info =
{
    ControlIdPrefix:
    {
        GroupListItem: "group_",
        AlertWindow: "alert_",
        Edit: "edit_",
        Location: "location_",
        Status: "status_",
        //获取ID
        getId: function (id, prefix) {
            return id.substr(prefix.length);
        }
    },
}

//属性
var GPS_Device_Property =
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
    DeviceList:
    {
        value: null,
        load: function (index, size) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                return Client.GPS().Device.List(null, index, size);
            });

            if (result && result.GPSDevice) {
                for (var i = 0; i < result.GPSDevice.length; i++) {
                    this.value[result.GPSDevice[i].Id] = result.GPSDevice[i];
                    if (!this.value[result.GPSDevice[i].Id]["Selected"])
                        this.value[result.GPSDevice[i].Id]["Selected"] = false;
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
                return Client.GPS().Device.Delete(id)
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
var GPS_Device_Html = {
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.deviceId;
                return "";
            }
        }
    },
    Control: {
        GroupList: {
            createItem: function (device) {
                var deviceIsOnline = {
                    online: LabelTagColor.LightBlue,
                    offline: LabelTagColor.DarkGray
                }
                //创建控件
                var createControl = {
                    //设备名称，点击后显示相信信息
                    details: function (device, control) {
                        var span = document.createElement("span");
                        span.innerText = device.Name;
                        span.title = device.Name;
                        var backgroundCss = deviceIsOnline.offline;
                        if (device.GPSStatus && device.GPSStatusSpecified) {
                            if (device.GPSStatus.IsOnline && device.GPSStatus.IsOnline == true)
                                backgroundCss = deviceIsOnline.online;
                        }
                        var btn = new IconColorButton(GPS_Device_Info.ControlIdPrefix.AlertWindow + id, "icon-map-marker background-icon", backgroundCss, 10, span, backgroundCss == deviceIsOnline.offline ? "离线" : "在线");

                        btn.href = "gps/device/device_details.htm?deviceId=" + device.Id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        control.appendChild(btn);
                    },
                    //删除控件
                    remove: function (device, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"删除\" name='a_deviceId' class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeGPSDevice_Click(this, '" + device.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (device, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + GPS_Device_Info.ControlIdPrefix.Edit + device.Id + "' href=\"gps/device/device_details.htm?deviceId=" + device.Id + "\" class=\"table-actions expand-btn\" onclick=\"return editGPSDevice_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    accessId: function (device, control) {
                        var div = document.createElement("div");
                        div.title = device.AccessId;
                        div.className = "list-item-information security";
                        if (!device.AccessId) {
                            div.title = "无平台接入编号"
                            div.className += " none";
                        }
                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                    model: function (device, control) {
                        var div = document.createElement("div");
                        div.title = "型号";
                        div.className = "list-item-information security";
                        if (!device.Model) {
                            div.className += " none";
                            div.innerText = "未知型号"
                        }
                        else {
                            div.innerText = device.Model;
                        }
                        div.style.width = "100px";
                        control.appendChild(div);
                    },
                    lastTime: function (device, control) {
                        var div = document.createElement("div");
                        var css = " none";
                        div.innerText = "N/A"
                        if (device.GPSStatus && device.GPSStatusSpecified) {
                            div.innerText = Convert.ToDate(device.GPSStatus.Time).format("yyyy-MM-dd HH:mm:ss");
                            css = "";
                        }
                        div.className = "list-item-information time" + css;
                        div.title = "最后在线时间";
                        control.appendChild(div);
                    },
                    status: function (device, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"GPS设备状态\" id='" + GPS_Device_Info.ControlIdPrefix.Status + device.Id + "' href=\"gps/device/device_status.htm?deviceId=" + device.Id + "\" class=\"table-actions expand-btn\" onclick=\"return statusGPSDevice_Click(this)\"><i class=\"icon-bar-chart\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //定位状态
                    positioningStatus: function (device, control) {
                        var css = "text-danger";
                        var title = "定位状态:无效";
                        if (device.GPSStatus && device.GPSStatusSpecified) {
                            if (device.GPSStatus.Status == 1) {
                                title = "定位状态:有效";
                                css = "text-success";
                            }
                        }
                        var btn = document.createElement("div");
                        btn.appendChild($('<div class="icon-circle ' + css + '"></div>')[0]);
                        btn.className = "pull-right list-lable-btn-operation hidden-xs";
                        btn.style.marginLeft = "20px";
                        btn.title = title;
                        control.appendChild(btn);
                    },
                    location: function (device, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"查看定位\" id='" + GPS_Device_Info.ControlIdPrefix.Location + device.Id + "' href=\"#?deviceId=" + device.Id + "\" class=\"table-actions expand-btn\"><i class=\"icon-screenshot\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    }
                };

                var id = device.Id

                var item = new GroupListItem(GPS_Device_Info.ControlIdPrefix.GroupListItem, GPS_Device_GrouplistItem_Click);
                item.className = item.className + " mouse_pointer" + (GPS_Device_Property.DeviceList.value[id].Selected ? " selected" : "");
                item.id = GPS_Device_Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(device, item.Content);//创建权限图标和输入通道名称
                createControl.remove(device, item.Content);//创建删除按钮
                createControl.edit(device, item.Content);//创建编辑按钮
                createControl.status(device, item.Content);//创建设备状态

                createControl.location(device, item.Content);//创建定位按钮
                //createControl.positioningStatus(device, item.Content);//创建定位状态
                createControl.lastTime(device, item.Content);//创建设备创建时间
                createControl.accessId(device, item.Content);//创建设备接入编号
                createControl.model(device, item.Content);//创建型号

                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (devices) {
                var items = new GroupListItemArray();
                if (devices) {
                    for (var i = 0; i < devices.length; i++) {
                        items.push(this.createItem(devices[i]));
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {

                var result = GPS_Device_Property.DeviceList.load(1, GPS_Device_Property.PageSize);

                if (result) {
                    var items = this.getItems(result.GPSDevice);
                    getTag("dList").appendChild(new GroupList("deviceGroupList", items));

                    GPS_Device_Property.CurrentCount.set(result.Page.RecordCount);
                    GPS_Device_Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size) {
                var result = GPS_Device_Property.DeviceList.load(index, size);
                var items = this.getItems(result.GPSDevice);
                var gList = getTag("deviceGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                var old = GPS_Device_Property.CurrentCount.get();
                GPS_Device_Property.CurrentCount.set(old + result.Page.RecordCount);
                GPS_Device_Property.TotalCount.set(result.Page.TotalRecordCount);
                LazyLoadPage = result.Page;
            },
            //清空列表
            clear: function () {
                var gList = getTag("deviceGroupList");
                gList.innerText = "";
                GPS_Device_Property.CurrentCount.set(0);
                GPS_Device_Property.TotalCount.set(0);
                this.selectedCount = 0;
            },
            reload: function (devices, page) {
                var list = new Array();
                var i = 0;
                for (var d in devices) {
                    list[i++] = devices[d];
                }

                this.clear();

                var items = this.getItems(list);
                var gList = getTag("deviceGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                GPS_Device_Property.CurrentCount.set(list.length);
                GPS_Device_Property.TotalCount.set(page.TotalRecordCount);
            },
            remove: function (id) {
                GPS_Device_Property.DeviceList.remove(id)
                var tag = getTag(GPS_Device_Info.ControlIdPrefix.GroupListItem + id);
                tag.parentElement.removeChild(tag);
                GPS_Device_Property.CurrentCount.set(GPS_Device_Property.CurrentCount.get() - 1);
                LazyLoadPage.TotalRecordCount--;
                var page = LazyLoadPage;
                if (GPS_Device_Property.CurrentCount.get() < GPS_Device_Property.TotalCount.get()) {
                    this.load(GPS_Device_Property.CurrentCount.get() + 1, 1);
                }
                LazyLoadPage = page;
            },
            batchRemove: function () {
                var count = GPS_Device_Property.DeviceList.batchRemove();//批量删除，并返回删除的条数
                this.selectedCount -= count;
                if (count == 0)
                    return;

                var index = Math.floor(count / GPS_Device_Property.PageSize);
                LazyLoadPage.PageIndex -= index;

                if ((count % GPS_Device_Property.PageSize) == 0)
                    LazyLoadPage.PageIndex++;

                this.clear();
                var page = LazyLoadPage;
                this.load(1, GPS_Device_Property.PageSize * LazyLoadPage.PageIndex);
                LazyLoadPage = page;
            },
            modify: function (device) {
                var item = GPS_Device_Html.Control.GroupList.createItem(device);
                var tag = getTag(GPS_Device_Info.ControlIdPrefix.GroupListItem + device.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            selectedCount: 0,
            select: function (id) {
                GPS_Device_Property.DeviceList.value[id].Selected = !GPS_Device_Property.DeviceList.value[id].Selected;
                if (GPS_Device_Property.DeviceList.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
        },
    }
}
GPSDevicePageEvent.Device.GroupListItemChanged = function (device) {
    GPS_Device_Html.Control.GroupList.modify(device);
}
GPSDevicePageEvent.Device.GroupListReload = function (index, size) {
    GPS_Device_Html.Control.GroupList.clear();
    var page = LazyLoadPage;
    GPS_Device_Html.Control.GroupList.load(index, size);
    page.TotalRecordCount = LazyLoadPage.TotalRecordCount;
    page.PageCount = Math.ceil(page.TotalRecordCount / GPS_Device_Property.PageSize);
    LazyLoadPage = page;
}
