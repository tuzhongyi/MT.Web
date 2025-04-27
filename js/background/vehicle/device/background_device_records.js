/// <reference path="../../howell.js/howell.control.js" />
/// <reference path="../../client/struct.js" />
/// <reference path="../../jquery/jquery.js" />
/// <reference path="../../howell.js/howell.js" />

if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var Vehicle_Device_Record_Info =
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
    PopoverControls: function (name, className, url, fun) {
        this.Name = name;
        this.Url = url;
        this.ClassName = className;
        this.Fun = fun;
    },
}

//属性
var Vehicle_Device_Record_Property =
{
    Count: {
        get: function (id, fn) {
            var result = fn.List(id, 1, 1);
            return result.Page.TotalRecordCount;
        },
        ImageId: function (record) {
            return record.ImageId ? record.ImageId.length : 0;
        }
    },
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
    DeviceList:{
        value: new Dictionary(),
        load: function () {
            var result = tryCatch(function () {
                return Client.Vehicle().Device.List();
            });
            if (result && result.VehiclePlateDevice) {
                for (var i = 0; i < result.VehiclePlateDevice.length; i++) {
                    var id = Vehicle_Device_Record_Html.Id.set(result.VehiclePlateDevice[i]);
                    this.value[id] = result.VehiclePlateDevice[i];
                    addOption(result.VehiclePlateDevice[i], i);
                }
            }
            return result;
        }
    },
    RecordList:
    {
        value: new Dictionary(),
        load: function (deviceId, beginTime, endTime, plate, brand, name, accessId, pageIndex, pageSize) {
            var result = tryCatch(function () {
                return Client.Vehicle().Device.Record.List(deviceId, beginTime, endTime, plate, brand, name, accessId, pageIndex, pageSize);
            });
            //var result = new VehiclePlateRecordList();
            //result.Page.PageIndex = 1;
            //result.Page.PageSize = 20;
            //result.Page.PageCount = 5;
            //result.Page.RecordCount = 20;
            //result.Page.TotalRecordCount = 100;
            //for (var i = 0; i < 20; i++) {
            //    var item = new VehiclePlateRecord();
            //    item.DeviceId = i;
            //    item.CreationTime = "2017-05-18T04:44:57Z";
            //    item.AccessId = i;
            //    item.Name = "记录" + i;
            //    item.Plate = "沪A123456";
            //    item.PlateColor = PlateColor.Yellow;
            //    item.VehicleColor = VehicleColor.Red;
            //    item.Brand = "上汽";
            //    item.ChildBrand = "荣威";
            //    item.Credibility = 100;
            //    item.Speed = 0.0;
            //    item.PlatePosition.X = 1;
            //    item.PlatePosition.Y = 2;
            //    item.PlatePosition.Width = 20;
            //    item.PlatePosition.Height = 10;
            //    item.LaneId = "车道";
            //    item.Latitude = 0.0;
            //    item.Longitude = 0.0;
            //    item.Description = "";
            //    item.ImageId = new Array();

            //    item.NameSpecified = true;
            //    item.PlateColorSpecified = true;
            //    item.VehicleColorSpecified = true;
            //    item.BrandSpecified = true;
            //    item.ChildBrandSpecified = true;
            //    item.CredibilitySpecified = true;
            //    item.SpeedSpecified = true;
            //    item.PlatePositionSpecified = true;
            //    item.LaneIdSpecified = true;
            //    item.LatitudeSpecified = true;
            //    item.LongitudeSpecified = true;
            //    item.DescriptionSpecified = true;
            //    item.ImageIdSpecified = true;
            //    result.VehiclePlateRecord.push(item);
            //}

            if (result && result.VehiclePlateRecord) {
                result.VehiclePlateRecord = result.VehiclePlateRecord.sortBy("CreationTime", true);
                for (var i = 0; i < result.VehiclePlateRecord.length; i++) {
                    var id = Vehicle_Device_Record_Html.Id.set(result.VehiclePlateRecord[i]);
                    this.value[id] = result.VehiclePlateRecord[i];
                }
            }
            return result;
        },
        get: function (id) {
            if (this.value)
                return this.value[id];
            return null;
        }
    },
    Picture: {
        upload: function (contentType, obj) {
            tryCatch(function () {
                var picture = Client.Vehicle().Picture.Create(obj, contentType);
            });
        },
        get: function (id) {
            return tryCatch(function () {
                return Client.Vehicle().Picture.Get(id);
            });
        },
        load: function (id) {
            return tryCatch(function () {
                var picture = Client.Vehicle().Picture.Data(id);
                return picture;
            });
        }
    }
}

var Vehicle_Device_Record_Html = {
    //搜索条件
    MoreSearch: false,
    Criteria: {
        beginTime: null,
        endTime: null,
        plate: null,
        brand: null,
        name: null,
        deviceId: null
    },
    Id: {
        set: function (record) {
            var id = record.DeviceId + "_" + record.AccessId + "_" + record.CreationTime;
            return id;
        }
    },
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.RecordId;
                return null;
            }
        },
        Key: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.key;
                return null;
            }
        }
    },
    Control: {
        Popovers:
        {
            picture: new Vehicle_Device_Record_Info.PopoverControls("图片", "icon-picture", "vehicle/device/record/device_record_pictures.htm?RecordId=", Vehicle_Device_Record_Property.Count.ImageId),
        },
        IconButton: {
            create: function (record, key, className, getCountFn) {
                var strLabel = "";
                var id = Vehicle_Device_Record_Html.Id.set(record);
                if (getCountFn)
                    strLabel = "<lable id='" + Vehicle_Device_Record_Info.ControlIdPrefix.Popover.label(key) + id + "'>" + getCountFn(record) + "</lable>"
                var icon = new IconButton(Vehicle_Device_Record_Info.ControlIdPrefix.Popover.icon(key) + id, className, 11, strLabel);
                icon.className = "popover_control_item";
                return icon;
            },
        },
        Popover: function (id, key, value, url, name) {
            var popover = new Popover(Vehicle_Device_Record_Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            popover.className = "popover-control";
            popover.onclick = function () {
                stopPropagation();
                return vehicle_device_record_list_popover_Click(popover, key);
            }
            return popover;
        },
        GroupList: {
            createItem: function (record) {
                //创建控件
                var createControl = {
                    //联动名称，点击后显示相信信息
                    details: function (record, control) {
                        var id = Vehicle_Device_Record_Html.Id.set(record);
                        var recordName = record.Name;
                        var span = document.createElement("span");
                        span.innerText = recordName;
                        span.title = recordName;
                        var btn = new IconColorButton(Vehicle_Device_Record_Info.ControlIdPrefix.AlertWindow + id, "howell-icon-vehicle-plate-device background-icon", "label-lightblue", 10, span);
                        btn.href = "vehicle/device/record/device_record_details.htm?RecordId=" + id;
                        btn.className = btn.className + " list-group-item-name";

                        btn.onclick = function () {
                            stopPropagation();
                            var a = document.createElement("a");
                            a.href = btn.href;
                            return vehicle_device_record_list_info_Click(a);
                        }

                        control.appendChild(btn);
                    },
                    //操作关联控件
                    popover: function (record, control) {
                        var controls = new Array();
                        for (var key in Vehicle_Device_Record_Html.Control.Popovers) {
                            var pop = Vehicle_Device_Record_Html.Control.Popovers[key];
                            var icon = new Vehicle_Device_Record_Html.Control.IconButton.create(record, key, pop.ClassName, pop.Fun);
                            var id = Vehicle_Device_Record_Html.Id.set(record);
                            var popover = new Vehicle_Device_Record_Html.Control.Popover(id, key, icon, pop.Url, pop.Name);

                            controls.push(popover);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0);
                        bts.className += " hidden-xs"
                        control.appendChild(bts);
                    },
                    //处理描述信息
                    description: function (record, control) {
                        var div = document.createElement("div");
                        div.title = record.Description;
                        div.className = "list-item-information security";
                        if (!record.Description) {
                            div.title = "无描述信息"
                            div.className += " none";
                        }
                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                    //触发时间
                    creationTime: function (date, control) {
                        var div = document.createElement("div");
                        if (date) {
                            var displayDate = Convert.ToDate(date);
                            div.innerText = displayDate.format("yyyy-MM-dd HH:mm:ss");
                        }
                        div.title = "信息创建时间";
                        div.className = "list-item-information time";
                        control.appendChild(div);
                    },
                    //车牌
                    plate: function (record, control) {
                        var div = document.createElement("div");
                        div.title = "车牌";
                        div.className = "pull-right list-item-information security";
                        div.style.width = "120px";
                        div.innerText = record.Plate;
                        control.appendChild(div);
                    },
                    //置信度
                    credibility: function (record, control) {
                        var div = document.createElement("div");
                        div.title = "置信度";
                        css = "";
                        if (record.CredibilitySpecified == false) {
                            css = " none"
                            div.innerText = "N/A";
                        }
                        else {
                            div.innerText = record.Credibility + "%";
                        }
                        div.className = "pull-right" + css;
                        div.style.width = "80px";

                        control.appendChild(div);
                    }
                };

                var item = new GroupListItem(Vehicle_Device_Record_Info.ControlIdPrefix.GroupListItem, null, true);
                item.className = item.className + " mouse_pointer";
                item.id = Vehicle_Device_Record_Html.Id.set(record);
                createControl.details(record, item.Content);//创建权限图标和输入通道名称               
                createControl.popover(record, item.Content);//创建关联弹出框按钮组
                createControl.credibility(record, item.Content);//创建置信度
                createControl.creationTime(record.CreationTime, item.Content);//创建触发时间
                createControl.description(record, item.Content);//创建处理描述信息
                createControl.plate(record, item.Content);//创建车牌
                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (records) {
                var items = new GroupListItemArray();
                if (records) {
                    for (var i = 0; i < records.length; i++) {
                        items.push(this.createItem(records[i]));
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {
                var beginTime = Vehicle_Device_Record_Html.Criteria.beginTime;
                var endTime = Vehicle_Device_Record_Html.Criteria.endTime;
                var plate = Vehicle_Device_Record_Html.Criteria.plate;
                var brand = Vehicle_Device_Record_Html.Criteria.brand;
                var name = Vehicle_Device_Record_Html.Criteria.name;
                var deviceId = Vehicle_Device_Record_Html.Criteria.deviceId;
                var result = Vehicle_Device_Record_Property.RecordList.load(deviceId, beginTime, endTime, plate, brand, name, null, 1, Vehicle_Device_Record_Property.PageSize);
                if (result) {
                    var items = this.getItems(result.VehiclePlateRecord);
                    getTag("dList").appendChild(new GroupList("recordGroupList", items));
                    Vehicle_Device_Record_Property.CurrentCount.set(result.Page.RecordCount);
                    Vehicle_Device_Record_Property.TotalCount.set(result.Page.TotalRecordCount);
                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size) {
                var beginTime = Vehicle_Device_Record_Html.Criteria.beginTime;
                var endTime = Vehicle_Device_Record_Html.Criteria.endTime;
                var plate = Vehicle_Device_Record_Html.Criteria.plate;
                var brand = Vehicle_Device_Record_Html.Criteria.brand;
                var name = Vehicle_Device_Record_Html.Criteria.name;
                var deviceId = Vehicle_Device_Record_Html.Criteria.deviceId;

                var result = Vehicle_Device_Record_Property.RecordList.load(deviceId, beginTime, endTime, plate, brand, name, null, index, size);
                var items = this.getItems(result.VehiclePlateRecord);
                var gList = getTag("recordGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                var old = Vehicle_Device_Record_Property.CurrentCount.get();
                Vehicle_Device_Record_Property.CurrentCount.set(old + result.Page.RecordCount);
                Vehicle_Device_Record_Property.TotalCount.set(result.Page.TotalRecordCount);
                LazyLoadPage = result.Page;
            },
            //清空列表
            clear: function () {
                var gList = getTag("recordGroupList");
                gList.innerText = "";
                gList.innerText = "";
                Vehicle_Device_Record_Property.CurrentCount.set(0);
                Vehicle_Device_Record_Property.TotalCount.set(0);
            },
        },
        AlertWindow: {

        }
    }
}