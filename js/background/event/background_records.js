/// <reference path="../../howell.js/howell.control.js" />
/// <reference path="../../client/struct.js" />
/// <reference path="../../jquery/jquery.js" />
/// <reference path="../../howell.js/howell.js" />

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
    PopoverControls: function (name, className, url, fun) {
        this.Name = name;
        this.Url = url;
        this.ClassName = className;
        this.Fun = fun;
    },
    DeviceProperty: {
        VideoInputChannel: ["Video", "Input"],
        IOInputChannel: ["IO", "Input"],
        StorageMedium: ["Storage"],
        RFIDAntenna: ["RFID"],
        NetworkInterface: ["Network"],
        ATMAddNotes: ["ATM", "AddNote"],
        ATMShield: ["ATM", "Shield"]
    }
}

//属性
var Property =
{
    Count: {
        get: function (id, fn) {
            var result = fn.List(id, 1, 1);
            return result.Page.TotalRecordCount;
        },
        PictureId: function (record) {
            return record.PictureId ? record.PictureId.length : 0;
        },
        RecordedFile: function (record) {
            return record.RecordedFile ? record.RecordedFile.length : 0;
        },
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
    RecordList:
    {
        value: new Dictionary(),
        load: function (componentId, eventType, beginTime, endTime, pageIndex, pageSize) {
            var result = tryCatch(function () {
                return Client.Management().Event.Record(componentId, eventType, beginTime, endTime, pageIndex, pageSize);
            });
            if (result && result.EventRecord) {
                result.EventRecord = result.EventRecord.sortBy("AlarmTime", true);
                for (var i = 0; i < result.EventRecord.length; i++) {
                    result.EventRecord[i] = result.EventRecord[i];
                    this.value[result.EventRecord[i].Id] = result.EventRecord[i];
                }
            }
            return result;
        },
        get: function (id) {
            if (this.value)
                return this.value[id];
            return null;
        },
    },
    Device: {
        value: new Dictionary(),
        load: function () {
            var devices = tryCatch(function () {
                return Client.Management().Device.List();
            });
            for (var i = 0; i < devices.Device.length; i++) {
                this.value[devices.Device[i].Id] = devices.Device[i];
            }
        },
        Channel: {
            value: function (deviceId, property, points) {
                if (Property.Device.value[deviceId]) {
                    if (!Property.Device.value[deviceId][property]) {
                        Property.Device.value[deviceId][property] = this.load(deviceId, property, points)
                    }
                    return Property.Device.value[deviceId][property];
                }
                return null;
            },
            getChild: function (obj, points, offset) {
                if (!points)
                    return obj;
                if (offset < points.length - 1)
                    return this.getChild(obj[points[offset++]], points, offset);
                return obj[points[offset]];
            },
            load: function (deviceId, property, points) {
                var client = this.getChild(Client.Management().Device, points, 0);
                var list = client.List(deviceId);
                return list[property];
            }
        }
    },
}

var Html = {
    //搜索条件
    Criteria: {
        componentId: null,
        eventType: null,
        beginTime: null,
        endTime: null
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
            //picture: new Info.PopoverControls("图片", "icon-picture", "record/record_details.htm?key=PictureId&RecordId=", Property.Count.PictureId),
            picture: new Info.PopoverControls("图片", "icon-picture", "event/record/record_pictures.htm?RecordId=", Property.Count.PictureId),
            playback: new Info.PopoverControls("回放", "icon-facetime-video", "event/record/record_playback.htm?RecordId=")
            //file: new Info.PopoverControls("录像文件信息", "icon-film", "record/record_details.htm?key=RecordedFile&RecordId=", Property.Count.RecordedFile),
        },
        IconButton: {
            create: function (record, key, className, getCountFn) {
                var strLabel = "";
                if (getCountFn)
                    strLabel = "<lable id='" + Info.ControlIdPrefix.Popover.label(key) + record.Id + "'>" + getCountFn(record) + "</lable>"
                var icon = new IconButton(Info.ControlIdPrefix.Popover.icon(key) + record.Id, className, 11, strLabel);
                icon.className = "popover_control_item";
                return icon;
            },
        },
        Popover: function (id, key, value, url, name) {
            var popover = new Popover(Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            popover.className = "popover-control";
            popover.onclick = function () {
                stopPropagation();
                return popover_Click(popover, key);
            }
            return popover;
        },
        GroupList: {
            createItem: function (record) {
                var severityColor = {
                    64: "text-danger",
                    1: "text-info",
                    0: "text-default",
                    16: "text-warning"
                }
                var severityLanguage = {
                    64: "紧急",
                    1: "一般信息",
                    0: "未知",
                    16: "重要/警告"
                }
                var eventTypeColor = {
                    None: LabelTagColor.DarkGray,
                    IO: LabelTagColor.LightBlue,
                    VMD: LabelTagColor.Prunus,
                    Videoloss: LabelTagColor.Prunus,
                    IRCut: LabelTagColor.Prunus,
                    DayNight: LabelTagColor.Prunus,
                    RecordState: LabelTagColor.LightBlue,
                    StorageMediumFailure: LabelTagColor.Green,
                    RAIDFailure: LabelTagColor.Green,
                    RecordingFailure: LabelTagColor.LightBlue,
                    BadVideo: LabelTagColor.Prunus,
                    POS: LabelTagColor.Taro,
                    FanFailure: LabelTagColor.Taro,
                    CpuUsage: LabelTagColor.Taro,
                    MemoryUsage: LabelTagColor.Taro,
                    Temperature: LabelTagColor.Taro,
                    Pressure: LabelTagColor.Taro,
                    Voltage: LabelTagColor.Taro,
                    MaximumConnections: LabelTagColor.LightBlue,
                    NetworkBitrate: LabelTagColor.DoderBlue,
                    VideoBitrate: LabelTagColor.LightBlue,
                    Squint: LabelTagColor.Prunus,
                    VideoTurned: LabelTagColor.Prunus,
                    Intrusion: LabelTagColor.Prunus,
                    Tripwire: LabelTagColor.Prunus,
                    Loitering: LabelTagColor.Prunus,
                    Unattended: LabelTagColor.Prunus,
                    Removal: LabelTagColor.Prunus,
                    Retrograde: LabelTagColor.Prunus,
                    ATMSlot: LabelTagColor.Magenta,
                    ATMKeyBoard: LabelTagColor.Magenta,
                    ATMDamage: LabelTagColor.Magenta,
                    BackRoomNumberLimit: LabelTagColor.Magenta,
                    BackRoomCrouched: LabelTagColor.Magenta,
                    Online: LabelTagColor.Green,
                    Offline: LabelTagColor.Prunus,
                };
                //创建控件
                var createControl = {
                    //联动名称，点击后显示相信信息
                    details: function (record, control) {
                        var recordName = record.Name;
                        if (!is.PC())
                            recordName = Language.Display.EventType[record.EventType] + " " + recordName
                        var span = document.createElement("span");
                        span.innerText = recordName;
                        span.title = recordName;
                        var btn = new IconColorButton(Info.ControlIdPrefix.AlertWindow + record.Id, "background_icon eventtype " + record.EventType.toLowerCase(), eventTypeColor[record.EventType], 10, span);
                        btn.href = "event/record/record_details.htm?RecordId=" + record.Id;
                        btn.title = Language.Display.EventType[record.EventType];
                        btn.className = btn.className + " list-group-item-name";

                        btn.onclick = function () {
                            stopPropagation();
                            return info_Click(btn);
                        }

                        control.appendChild(btn);
                    },
                    //操作关联控件
                    popover: function (record, control) {
                        var controls = new Array();
                        for (var key in Html.Control.Popovers) {
                            var pop = Html.Control.Popovers[key];
                            var icon = new Html.Control.IconButton.create(record, key, pop.ClassName, pop.Fun);
                            var popover = new Html.Control.Popover(record.Id, key, icon, pop.Url, pop.Name);

                            controls.push(popover);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0);
                        bts.className += " hidden-xs"
                        control.appendChild(bts);
                    },
                    //处理描述信息
                    description: function (record, control) {
                        var div = document.createElement("div");
                        div.title = record.ProcessDescription;
                        div.className = "list-item-information hidden-xs";
                        div.style.styleFloat = "left";
                        div.style.cssFloat = "left";
                        div.style.marginLeft = "20px";
                        div.style.maxWidth = "300px";
                        if (!record.ProcessDescription) {
                            div.title = "无信息"
                            div.className += " none";
                        }
                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                    //触发时间
                    time: function (date, control, title) {
                        var div = document.createElement("div");
                        if (date) {
                            var displayDate = Convert.ToDate(date);
                            if (is.PC())
                                div.innerText = displayDate.format("yyyy-MM-dd HH:mm:ss");
                            else
                                div.innerText = displayDate.format("HH:mm:ss");
                        }
                        div.title = title;
                        div.className = "list-item-information pull-right";
                        control.appendChild(div);
                    },
                    //重要级别
                    severity: function (record, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($('<div class="icon-circle ' + severityColor[record.Severity] + '"></div>')[0]);
                        btn.className = "pull-right list-lable-btn-operation hidden-xs";
                        btn.style.marginLeft = "20px";
                        btn.title = severityLanguage[record.Severity];
                        control.appendChild(btn);
                    },
                };

                var item = new GroupListItem(Info.ControlIdPrefix.GroupListItem, null, true);
                item.className = item.className + " mouse_pointer";
                item.id = record.Id;
                createControl.details(record, item.Content);//创建权限图标和输入通道名称               
                createControl.popover(record, item.Content);//创建关联弹出框按钮组
                createControl.description(record, item.Content);//创建处理描述信息
                createControl.severity(record, item.Content);//创建重要级别
                createControl.time(record.AlarmTime, item.Content, "触发时间");//创建触发时间
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
                var result = Property.RecordList.load(Html.Criteria.componentId, Html.Criteria.eventType, Html.Criteria.beginTime, Html.Criteria.endTime, 1, Property.PageSize);
                if (result) {
                    var items = this.getItems(result.EventRecord);
                    getTag("dList").appendChild(new GroupList("recordGroupList", items));

                    Property.CurrentCount.set(result.Page.RecordCount);
                    Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size) {
                var result = Property.RecordList.load(Html.Criteria.componentId, Html.Criteria.eventType, Html.Criteria.beginTime, Html.Criteria.endTime, index, size);
                var items = this.getItems(result.EventRecord);
                var gList = getTag("recordGroupList");
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
                var gList = getTag("recordGroupList");
                gList.innerText = "";
                gList.innerText = "";
                Property.CurrentCount.set(0);
                Property.TotalCount.set(0);
            },
        },
        AlertWindow: {

        }
    }
}