/// <reference path="../../client/management.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var Info =
{
    ControlIdPrefix:
    {
        GroupListItem: "group_",
        getId: function (id, prefix) {
            return id.substr(prefix.length);
        }
    },
}

//属性
var Property =
{
    PageSize: 20,//单页数据数量

    Guid: null,

    ProtocolType: null,

    Timer: null,
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
    Searching:
    {
        value: null,
        get: function () {
            if (!this.value) {
                this.value = new Object();
            }
            var device = tryCatch(function () {
                return Client.Management().Device.Searching.Get(Property.Guid);
            });
            if (device && device.ExistedInDatabase == false) {
                var gid = Guid.NewGuid().ToString();
                device.Id = gid;
                this.value[gid] = device;
                if (!this.value[gid]["Selected"])
                    this.value[gid]["Selected"] = false;
                return device;
            }
            return null;

            ////测试代码 发布时删除
            //device = Client.Management().Device.Get("00310101011111111000003000000000");
            //var gid = Guid.NewGuid().ToString();
            //device.Id = gid;
            //this.value[gid] = device;
            //if (!this.value[gid]["Selected"])
            //    this.value[gid]["Selected"] = false;
            //return device;
        },
        start: function () {
            tryCatch(function () {
                Client.Management().Device.Searching.Start(Property.Guid, Property.ProtocolType);
            });
        },
        stop: function () {
            tryCatch(function () {
                Client.Management().Device.Searching.Stop(Property.Guid);
            });
        },
        add: function () {
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        this.value[id].Id = "";
                        Client.Management().Device.Create(this.value[id]);
                    } catch (e) { };
                }
            }
        },
    },
}

var Html = {
    Control: {
        GroupList: {
            createItem: function (device) {
                var classificationColor = {
                    None: LabelTagColor.DarkGray,
                    IPCamera: LabelTagColor.LightBlue,
                    DVS: LabelTagColor.LightBlue,
                    NVR: LabelTagColor.Red,
                    DVR: LabelTagColor.Red,
                    DigitalMatrix: LabelTagColor.Green,
                    HDDecoder: LabelTagColor.Green,
                    AnalogMatrix: LabelTagColor.Green,
                    VAS: LabelTagColor.Color_66cc99,
                    AAM: LabelTagColor.Taro,
                    NAM: LabelTagColor.Taro,
                    VPS: LabelTagColor.Color_66cc99,
                    IntegratedMatrix: LabelTagColor.Green,
                    MatrixControlUnit: LabelTagColor.DoderBlue,
                    StreamingMediaServer: LabelTagColor.Color_ffae71,
                    DecodingUnit: LabelTagColor.DoderBlue,
                    EncodingUnit: LabelTagColor.DoderBlue,
                    NVS: LabelTagColor.LightBlue,
                    DataServer: LabelTagColor.Color_66cc99,
                    AcquisitionServer: LabelTagColor.Color_66cc99,
                    SystemGateway: LabelTagColor.Color_66cc99,
                }
                //创建控件
                var createControl = {
                    //设备名称，点击后显示相信信息
                    details: function (device, control) {
                        var btn = new IconColorButton("", "background_icon classification device " + device.Classification.toLowerCase(), classificationColor[device.Classification], 10, device.Name);
                        var win = new AlertWindow(Info.ControlIdPrefix.AlertWindow + id, btn, "device/device_details.htm?deviceId=" + device.Id, -1);
                        win.className = "list-group-item-name";
                        win.title = device.Name;
                        control.appendChild(win);
                    },
                    uri: function (device, control) {
                        var div = document.createElement("div");
                        div.title = device.Uri;
                        div.className = "list-item-information security";
                        div.style.marginRight = "350px";
                        div.innerText = div.title;
                        control.appendChild(div);
                    }
                };

                var id = device.Id

                var item = new GroupListItem(Info.ControlIdPrefix.GroupListItem, GrouplistItem_Click);
                item.className = item.className + " mouse_pointer";
                item.id = Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(device, item.Content);//创建权限图标和输入通道名称
                createControl.uri(device, item.Content);//创建设备描述信息
                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItem: function (device) {      
                return this.createItem(device);
            },
            //加载列表
            load: function (device) {
                var item = this.getItem(device);
                var gList = getTag("deviceGroupList");
                gList.appendChild(item);
                var old = Property.TotalCount.get();
                Property.TotalCount.set(old + 1);
            },
            start: function (protocolType) {
                this.clear();
                Property.Guid = Guid.NewGuid().ToString();
                Property.ProtocolType = protocolType;
                Property.Searching.start();
                Property.Timer = setInterval(function () {
                    var device = Property.Searching.get();
                    if (device) {
                        Html.Control.GroupList.load(device);
                    }
                }, 500);
            },
            stop: function () {
                clearInterval(Property.Timer);
            },
            //清空列表
            clear: function () {
                var gList = getTag("deviceGroupList");
                gList.innerText = "";
                Property.TotalCount.set(0);
                Property.Searching.value = null;
                this.selectedCount = 0;
            },
            selectedCount: 0,
            select: function (id) {
                Property.Searching.value[id].Selected = !Property.Searching.value[id].Selected;
                if (Property.Searching.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
        },
    }
}