/// <reference path="../../client/management.js" />
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
        Acquisition: "acquisition_",
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
        User: {
            Association: {
                list: "device_user_list_",
                remove: "device_user_list_remove_",
            },
            Unassociation: {
                list: "user_list_",
                add: "device_user_list_add_"
            },
            AlertUrl: {
                permissions: "management/device/user/device_user_permissions.htm",
            }
        },
        Department: {
            Association: {
                list: "device_department_list_",
                remove: "device_department_list_remove_",
            },
            Unassociation: {
                list: "department_list_",
                add: "device_department_list_add_"
            },
            AlertUrl: {
                permissions: "management/device/department/device_department_permissions.htm",
            }
        },
        Medium: {
            list: "device_medium_list_",
            remove: "device_medium_list_remove_",
            AlertUrl: {
                add: "management/device/medium/device_medium_add.htm",
                list: "management/device/medium/device_medium_details_list.htm"
            }
        },
        Network: {
            list: "device_network_list_",
            remove: "device_network_list_remove_",
            AlertUrl: {
                add: "management/device/network/device_network_add.htm",
                list: "management/device/network/device_network_details_list.htm",
                wifi: "management/device/network/device_network_wifi.htm"
            }
        },
        Video: {
            Input: {
                list: "device_video_input_list_",
                remove: "device_video_input_list_remove_",
                edit: "device_video_input_list_edit_",
                AlertUrl: {
                    add: "management/device/video/input/device_video_input_add.htm",
                    details: "management/device/video/input/device_video_input_details.htm",
                },
                Jump: {
                    list: "management/device/video/device_video_inputs.htm",
                }
            },
            Output: {
                list: "device_video_output_list_",
                remove: "device_video_output_list_remove_",
                edit: "device_video_output_list_edit_",
                AlertUrl: {
                    add: "management/device/video/output/device_video_output_add.htm",
                    details: "management/device/video/output/device_video_output_details.htm"
                },
                Jump: {
                    list: "management/device/video/device_video_outputs.htm",
                }
            },
        },
        IO: {
            Input: {
                list: "device_io_input_list_",
                remove: "device_io_input_list_remove_",
                edit: "device_io_input_list_edit_",
                AlertUrl: {
                    add: "management/device/io/input/device_io_input_add.htm",
                    details: "management/device/io/input/device_io_input_details.htm"
                },
                Jump: {
                    list: "management/device/io/device_io_inputs.htm",
                }
            },
            Output: {
                list: "device_io_output_list_",
                remove: "device_io_output_list_remove_",
                edit: "device_io_output_list_edit_",
                AlertUrl: {
                    add: "management/device/io/output/device_io_output_add.htm",
                    details: "management/device/io/output/device_io_output_details.htm"
                },
                Jump: {
                    list: "management/device/io/device_io_outputs.htm",
                }
            },
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
    Count: {
        get: function (id, fn) {
            return tryCatch(function () {
                var result = fn.List(id, 1, 1);
                return result.Page.TotalRecordCount;
            });
        },
        //用户总数
        User: function (id) {
            return Property.Count.get(id, Client.Security().Permission.Device.User);
        },
        //输入通道总数
        Department: function (id) {
            return Property.Count.get(id, Client.Security().Permission.Device.Departments);
        },
        //视频输入源总数
        VideoInputSource: function (id) {
            return Property.Count.get(id, Client.Management().Device.Video.Input);
        },
        //视频输出源总数
        VideoOutputSource: function (id) {
            return Property.Count.get(id, Client.Management().Device.Video.Output);
        },
        //IO输入通道
        IoInput: function (id) {
            return Property.Count.get(id, Client.Management().Device.IO.Input);
        },
        //IO输出通道
        IoOutput: function (id) {
            return Property.Count.get(id, Client.Management().Device.IO.Output);
        },
        //网口总数
        Network: function (id) {
            return Property.Count.get(id, Client.Management().Device.Network);
        },
        //存储媒介总数
        Medium: function (id) {
            return Property.Count.get(id, Client.Management().Device.Storage);
        },
        //解码通道
        Decoding: function (id) {
            return Property.Count.get(id, Client.Management().Device.Video.Decode)
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
    Classification: null,
    Search: null,
    PlatformId: null,
    DeviceList:
    {
        value: null,
        load: function (index, size, classification, search) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                //var search = new Object();
                //search["Name"] = "HD";
                //return classification ? Client.Management().Device.List(index, size, classification, search) : Client.Management().Device.List(index, size, null, search);
                if (Property.PlatformId)
                    return Client.Management().Platforms.Device.List(Property.PlatformId, index, size, classification);
                return Client.Management().Device.List(index, size, classification, search);
            });

            if (result && result.Device) {
                for (var i = 0; i < result.Device.length; i++) {
                    this.value[result.Device[i].Id] = result.Device[i];
                    if (!this.value[result.Device[i].Id]["Selected"])
                        this.value[result.Device[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        get: function (id) {
            if (this.value)
                return this.value[id];
            return null;
        },
        wifi: function (id) {
            var result = tryCatch(function () {
                return Client.Management().Device.WiFi.Get(id);
            });
            return result;
        },
        remove: function (id) {
            var result = tryCatch(function () {
                return Client.Management().Platforms.Device.Delete(Property.PlatformId, id);
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
        sync: function (id, source) {
            var result = tryCatch(function () {
                return Client.Management().Device.Sync(id, source);
            });
            return result;
        },
    },
    Video: {

    },
    IO: {

    }
}
var Html = {
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
        Popovers:
        {
            user: new Info.PopoverControls("用户", "icon-user", "management/device/device_users.htm?deviceId=", "RelationUserCount"),
            department: new Info.PopoverControls("部门", "icon-group", "management/device/device_departments.htm?deviceId=", "RelationDepartmentCount"),
            network: new Info.PopoverControls("网络接口", "icon-code-fork", "management/device/device_networks.htm?deviceId=", "NetworkInterfaceCount"),
            medium: new Info.PopoverControls("存储媒介", "icon-hdd", "management/device/device_mediums.htm?deviceId=", "StorageMediumCount"),
            video_input: new Info.PopoverControls("视频输入通道", "icon-facetime-video", "management/device/video/device_video_simple_inputs.htm?deviceId=", "VideoInputChannelCount"),
            video_output: new Info.PopoverControls("视频输出通道", "icon-desktop", "management/device/video/device_video_simple_outputs.htm?deviceId=", "VideoOutputChannelCount"),
            io_input: new Info.PopoverControls("IO输入通道", "icon-linkedin-sign", "management/device/io/device_io_simple_inputs.htm?deviceId=", "IOInputChannelCount"),
            io_output: new Info.PopoverControls("IO输出通道", "icon-flickr", "management/device/io/device_io_simple_outputs.htm?deviceId=", "IOOutputChannelCount"),
            //decoding: new Info.PopoverControls("解码通道", "icon-dc", "management/device/video/device_video_decodings.htm?deviceId=", "DecodingChannelCount"),
        },
        //JumpPopovers:
        //{
        //    input: new Info.PopoverControls("视频输入通道", "icon-facetime-video", "device/video/device_video_inputs.htm?deviceId=", Property.Count.VideoInputSource),
        //    output: new Info.PopoverControls("视频输出通道", "icon-desktop", "device/video/device_video_outputs.htm?deviceId=", Property.Count.VideoOutputSource),
        //    ioInput: new Info.PopoverControls("IO输入通道", "icon-linkedin-sign", "device/io/device_io_inputs.htm?deviceId=", Property.Count.IoInput),
        //    ioOutput: new Info.PopoverControls("IO输出通道", "icon-flickr", "device/io/device_io_outputs.htm?deviceId=", Property.Count.IoOutput),
        //    //decoding: new Info.PopoverControls("解码通道", "icon-dc", "device/video/device_video_decodings.htm?deviceId=", Property.Count.Decoding ),
        //},
        IconButton: {
            create: function (id, key, className, count) {
                var strLabel = "<lable id='" + Info.ControlIdPrefix.Popover.label(key) + id + "'>" + count + "</lable>"
                var icon = new IconButton(Info.ControlIdPrefix.Popover.icon(key) + id, className, 11, strLabel);
                icon.className = "popover_control_item";
                return icon;
            },
            User: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("user") + id).innerText = value;
                } catch (e) { }
            },
            Department: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("department") + id).innerText = value;
                } catch (e) { }
            },
            Medium: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("medium") + id).innerText = value;
                } catch (e) { }
            },
            Network: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("network") + id).innerText = value;
                } catch (e) { }
            },
            Video: {
                Input: function (id, value) {
                    try {
                        getTag(Info.ControlIdPrefix.Popover.label("video_input") + id).innerText = value;
                    } catch (e) { }
                },
                Output: function (id, value) {
                    try {
                        getTag(Info.ControlIdPrefix.Popover.label("video_output") + id).innerText = value;
                    } catch (e) { }
                },
            },
            IO: {
                Input: function (id, value) {
                    try {
                        getTag(Info.ControlIdPrefix.Popover.label("io_input") + id).innerText = value;
                    } catch (e) { }
                },
                Output: function (id, value) {
                    try {
                        getTag(Info.ControlIdPrefix.Popover.label("io_output") + id).innerText = value;
                    } catch (e) { }
                },
            },
        },
        Popover: function (id, key, value, url, name) {
            var popover = new Popover(Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            popover.className = "popover-control";
            return popover;
        },
        CreateLinkButton: function (url, value, name) {
            var a = document.createElement("a");
            a.appendChild(value);
            a.href = url;
            a.title = name;
            a.className = "popover-control";
            a.onclick = function () {
                stopPropagation();
            }
            return a;
        },
        GroupList: {
            createItem: function (device) {
                var classificationColor = {
                    //None: LabelTagColor.DarkGray,
                    IPCamera: LabelTagColor.LightBlue,
                    DVS: LabelTagColor.LightBlue,
                    NVR: LabelTagColor.Red,
                    DVR: LabelTagColor.Red,
                    DigitalMatrix: LabelTagColor.Green,
                    HDDecoder: LabelTagColor.Green,
                    AnalogMatrix: LabelTagColor.Green,
                    VAS: LabelTagColor.Tomato,
                    AAM: LabelTagColor.Taro,
                    NAM: LabelTagColor.Taro,
                    VPS: LabelTagColor.Tomato,
                    IntegratedMatrix: LabelTagColor.Green,
                    MatrixControlUnit: LabelTagColor.DoderBlue,
                    StreamingMediaServer: LabelTagColor.Color_ffae71,
                    DecodingUnit: LabelTagColor.DoderBlue,
                    EncodingUnit: LabelTagColor.DoderBlue,
                    NVS: LabelTagColor.LightBlue,
                    DataServer: LabelTagColor.Color_66cc99,
                    AcquisitionServer: LabelTagColor.Color_66cc99,
                    SystemGateway: LabelTagColor.Color_66cc99,
                    Camera: LabelTagColor.LightBlue,
                    UltrasonicProbe: LabelTagColor.Taro,
                    ExtensionUnit: LabelTagColor.Yellow
                }
                //创建控件
                var createControl = {
                    //设备名称，点击后显示相信信息
                    details: function (device, control) {
                        var span = document.createElement("span");
                        span.innerHTML = device.Name;
                        span.title = device.Name;
                        var bgcolor = LabelTagColor.DarkGray;
                        if (device.DeviceStatus && device.DeviceStatus.Online) {
                            bgcolor = classificationColor[device.Classification];
                        }
                        var btn = new IconColorButton(Info.ControlIdPrefix.AlertWindow + id, "background_icon classification device " + device.Classification.toLowerCase(), bgcolor, 10, span, Language.Enum.DeviceClassification[device.Classification]);

                        btn.href = "management/platform/device/platform_device_details.htm?deviceId=" + device.Id;
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
                        btn.appendChild($("<a title=\"删除\" name='a_deviceId' class=\"table-actions mouse_pointer expand-btn\" onclick=\"removeDevice_Click(this, '" + device.Id + "')\"><i class=\"icon-trash\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //编辑控件
                    edit: function (device, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"编辑\" id='" + Info.ControlIdPrefix.Edit + device.Id + "' href=\"management/platform/device/platform_device_details.htm?deviceId=" + device.Id + "\" class=\"table-actions expand-btn\" onclick=\"return editDevice_Click(this)\"><i class=\"icon-edit\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //云控件
                    acquisition: function (device, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"数据采集中心信息\" id='" + Info.ControlIdPrefix.Acquisition + device.Id + "' href=\"management/device/device_acquisition.htm?deviceId=" + device.Id + "\" class=\"table-actions expand-btn\" onclick=\"return acquisitionDevice_Click(this)\"><i class=\"icon-cloud-upload\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //同步控件
                    sync: function (device, control) {
                        var btn = document.createElement("div");
                        btn.appendChild($("<a title=\"同步\" id='" + Info.ControlIdPrefix.Sync + device.Id + "' href=\"management/device/device_sync.htm?mode=single&deviceId=" + device.Id + "\" class=\"table-actions expand-btn\" onclick=\"return syncDevice_Click(this)\"><i class=\"icon-retweet\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //统计控件
                    statistics: function (device, control) {
                        var btn = document.createElement("div");
                        //var a = document.createElement("a");
                        //a.title = "统计";
                        //a.href = "management/device/device_statistics.htm?deviceId=" + device.Id;
                        //a.className = "table-actions expand-btn";
                        ////a.appendChild($("<i class=\"icon-bar-chart\"></i>")[0]);
                        //var i = document.createElement("i");
                        //i.className = "icon-bar-chart";
                        //a.appendChild(i);
                        //btn.appendChild(a);
                        btn.appendChild($("<a title=\"统计\" href=\"management/device/device_statistics.htm?deviceId=" + device.Id + "\" onclick=\"toStatistics_Click(this)\" class=\"table-actions expand-btn\"><i class=\"icon-bar-chart\"></i></a>")[0]);
                        btn.className = "pull-right list-lable-btn-operation";
                        control.appendChild(btn);
                    },
                    //无线控件
                    //wifi: function (device, control) {
                    //    var div = document.createElement("div");
                    //    div.className = "pull-right list-lable-btn-operation";
                    //    if (device.Abilities.indexOf("Wireless") != -1) {
                    //        var wifi = Property.DeviceList.wifi(device.Id);
                    //        var btn = document.createElement("a");
                    //        var ico = document.createElement("div");
                    //        var intensity = wifi.Intensity;
                    //        ico.title = "无线信号强度:" + intensity;
                    //        if (intensity <= 25 && intensity >= 1)
                    //            intensity = 1;
                    //        else
                    //            intensity = Math.round(intensity / 25);
                    //        ico.className = "wifi-icon" + intensity;
                    //        btn.setAttribute("onclick", "return wifi_Click(this, '" + device.Id + "')");
                    //        btn.href = Info.ControlIdPrefix.Network.AlertUrl.wifi + "?deviceId=" + device.Id;
                    //        btn.appendChild(ico);
                    //        div.appendChild(btn);
                    //    }
                    //    control.appendChild(div);
                    //},
                    //操作关联控件
                    popover: function (device, control) {
                        var controls = new Array();
                        for (var key in Html.Control.Popovers) {
                            var pop = Html.Control.Popovers[key];
                            var icon = new Html.Control.IconButton.create(device.Id, key, pop.ClassName, device[pop.CountKey]);
                            var popover = new Html.Control.Popover(device.Id, key, icon, pop.Url, pop.Name);
                            controls.push(popover);
                        }
                        //for (var key in Html.Control.JumpPopovers) {
                        //    var pop = Html.Control.JumpPopovers[key];
                        //    var icon = new Html.Control.IconButton.create(device.Id, key, pop.ClassName, pop.Fun);
                        //    var popover = new Html.Control.CreateLinkButton(pop.Url + device.Id, icon, pop.Name);
                        //    controls.push(popover);
                        //}
                        var bts = new TransverseButtonList(controls, 70, 0)
                        bts.className += " popover_control";
                        control.appendChild(bts);
                    },
                    information: function (device, control) {
                        var div = document.createElement("div");
                        div.title = device.Information;
                        div.className = "list-item-information security";
                        if (!device.Information) {
                            div.title = "无描述信息"
                            div.className += " none";
                        }
                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                    platformInfo: function (device, control) {
                        var div = document.createElement("div");
                        div.title = device.PlatformId;
                        div.className = "list-item-platformInfo";
                        div.innerText = div.title;
                        control.appendChild(div);
                    }
                };

                var id = device.Id

                var item = new GroupListItem(Info.ControlIdPrefix.GroupListItem, GrouplistItem_Click);
                item.className = item.className + " mouse_pointer" + (Property.DeviceList.value[id].Selected ? " selected" : "");
                item.id = Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(device, item.Content);//创建权限图标和输入通道名称
                createControl.remove(device, item.Content);//创建删除按钮
                createControl.edit(device, item.Content);//创建编辑按钮

                if (!Property.PlatformId) {
                    createControl.statistics(device, item.Content);//创建统计按钮
                    createControl.acquisition(device, item.Content);//创建云控件
                    createControl.sync(device, item.Content)//创建同步控件
                }

                //createControl.wifi(device, item.Content);//创建无线图标
                createControl.popover(device, item.Content);//创建关联弹出框按钮组
                //if (Property.PlatformId) {
                //    createControl.platformInfo(device, item.Content);
                //}
                //createControl.information(device, item.Content);//创建设备描述信息
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

                var result = Property.DeviceList.load(1, Property.PageSize);

                if (result) {
                    var items = this.getItems(result.Device);
                    getTag("dList").appendChild(new GroupList("deviceGroupList", items));

                    Property.CurrentCount.set(result.Page.RecordCount);
                    Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size, classification, search) {
                var result = Property.DeviceList.load(index, size, classification, search);
                var items = this.getItems(result.Device);
                var gList = getTag("deviceGroupList");
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
                var gList = getTag("deviceGroupList");
                gList.innerText = "";
                Property.CurrentCount.set(0);
                Property.TotalCount.set(0);
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
                Property.CurrentCount.set(list.length);
                Property.TotalCount.set(page.TotalRecordCount);
            },
            remove: function (id) {
                Property.DeviceList.remove(id)
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + id);
                tag.parentElement.removeChild(tag);
                Property.CurrentCount.set(Property.CurrentCount.get() - 1);
                LazyLoadPage.TotalRecordCount--;
                var page = LazyLoadPage;
                if (Property.CurrentCount.get() < Property.TotalCount.get()) {
                    this.load(Property.CurrentCount.get() + 1, 1, Property.Classification, Property.Search);
                }
                LazyLoadPage = page;
            },
            batchRemove: function () {
                var count = Property.DeviceList.batchRemove();//批量删除，并返回删除的条数
                this.selectedCount -= count;
                if (count == 0)
                    return;

                var index = Math.floor(count / Property.PageSize);
                LazyLoadPage.PageIndex -= index;

                if ((count % Property.PageSize) == 0)
                    LazyLoadPage.PageIndex++;

                this.clear();
                var page = LazyLoadPage;
                this.load(1, Property.PageSize * LazyLoadPage.PageIndex, Property.Classification, Property.Search);
                LazyLoadPage = page;
            },
            modify: function (device) {
                var item = Html.Control.GroupList.createItem(device);
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + device.Id);
                if (item) {
                    tag.parentElement.replaceChild(item, tag);
                    return true;
                }
                return false;
            },
            sync: function (id, source) {
                Property.DeviceList.sync(id, source);
            },
            batchSync: function (source) {
                for (var id in Property.DeviceList.value) {
                    if (Property.DeviceList.value[id].Selected) {
                        try {
                            Property.DeviceList.sync(id, source);
                            getTag(Info.ControlIdPrefix.GroupListItem + id).click();
                        } catch (e) { };
                    }
                }
            },
            selectedCount: 0,
            select: function (id) {
                Property.DeviceList.value[id].Selected = !Property.DeviceList.value[id].Selected;
                if (Property.DeviceList.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
        },
        PopoverWindow: {
            PageSize: 12,
            Video: {

            },
            IO: {

            }
        }
    }
}
PageEvent.Device.GroupListItemChanged = function (device) {
    Html.Control.GroupList.modify(device);
}
PageEvent.Device.GroupListReload = function (index, size, permission) {
    //Html.Control.GroupList.clear();
    //var page = LazyLoadPage;
    //Html.Control.GroupList.load(index, size, permission);
    //LazyLoadPage = page;

    Html.Control.GroupList.clear();
    var page = LazyLoadPage;
    Html.Control.GroupList.load(index, size, permission, Property.Search);
    page.TotalRecordCount = LazyLoadPage.TotalRecordCount;
    page.PageCount = Math.ceil(page.TotalRecordCount / Property.PageSize);
    LazyLoadPage = page;
}
PageEvent.Device.GroupListUserIconButtonChanged = function (id, value) {
    Html.Control.IconButton.User(id, value);
}
PageEvent.Device.GroupListDepartmentIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Department(id, value);
}
PageEvent.Device.GroupListNetworkIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Network(id, value);
}
PageEvent.Device.GroupListIOInputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.IO.Input(id, value);
}
PageEvent.Device.GroupListIOOutputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.IO.Output(id, value);
}
PageEvent.Device.GroupListMediumIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Medium(id, value);
}
PageEvent.Device.GroupListVideoInputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Video.Input(id, value);
}
PageEvent.Device.GroupListVideoOutputIconButtonChanged = function (id, value) {
    Html.Control.IconButton.Video.Output(id, value);
}
