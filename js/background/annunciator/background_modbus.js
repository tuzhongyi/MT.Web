/// <reference path="../../client/modbus.js" />

if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var Info =
{
    ControlIdPrefix:
    {
        GroupListItem: "group_",
        AlertWindow: "alert_",
        //Edit: "edit_",
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
        Relay: {
            list: "modbus_relay_list_",
            switchBtn: "modbus_relay_list_switch_",
            input: "modbus_relay_list_switch_input_"
        },
        Signal: {
            list: "modbus_signal_list_",
            edit: "modbus_signal_list_edit_",
            AlertUrl: {
                details: "annunciator/modbus/signal/modbus_signal_details.htm",
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
    OperationIconControls: function (name, className, fun, url) {
        this.Name = name;
        this.ClassName = className;
        if (fun)
            this.Fun = fun;
        if (url)
            this.Url = url;
    }
}

//属性
var Property =
{
    Count: {
        //继电器总数
        Relay: function (device) {
            return device.RelayCount;
        },
        //信号量总数
        Signal: function (device) {
            return device.SignalCount;
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
    DeviceList:
    {
        value: null,
        load: function (index, size) {
            if (!this.value) {
                this.value = new Object();
            }
            var result = tryCatch(function () {
                return Client.Modbus().Device.List(index, size);
            });

            if (result && result.DeviceInformation) {
                for (var i = 0; i < result.DeviceInformation.length; i++) {
                    this.value[result.DeviceInformation[i].ProductCode] = result.DeviceInformation[i];
                    if (!this.value[result.DeviceInformation[i].ProductCode]["Selected"])
                        this.value[result.DeviceInformation[i].ProductCode]["Selected"] = false;
                }
            }
            result.DeviceInformation = result.DeviceInformation.sortBy("ProductCode");
            return result;
        },
        get: function (id) {
            if (this.value)
                return this.value[id];
            return null;
        },
        reboot: function (id) {
            try {
                return Client.Modbus().Device.Reboot(id);
            }
            catch (e) {
                return e.number;
            }
        },
        batchReboot: function () {
            var count = 0;
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        var code = this.reboot(id);
                        if (code) {
                            count++;
                            continue;
                        }
                        this.value[id].Selected = false;
                        Html.Control.GroupList.clearSelect(id);
                    } catch (e) { };
                }
            }
            return count;
        },
        shutdown: function (id) {
            try {
                Client.Modbus().Device.Shutdown(id);
            }
            catch (e) {
                return e.number;
            }
        },
        batchShutdown: function () {
            var count = 0;
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        var code = this.shutdown(id);
                        if (code) {
                            count++;
                            continue;
                        }
                        this.value[id].Selected = false;
                        Html.Control.GroupList.clearSelect(id);
                    } catch (e) { };
                }
            }
            return count;
        },
        factoryDefault: function (id) {
            try {
                Client.Modbus().Device.FactoryDefault(id);
            }
            catch (e) {
                return e.number;
            }
        },
        batchFactoryDefault: function () {
            var count = 0;
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        var code = this.factoryDefault(id);
                        if (code) {
                            count++;
                            continue;
                        }
                        this.value[id].Selected = false;
                        Html.Control.GroupList.clearSelect(id);
                    } catch (e) { };
                }
            }
            return count;
        },
        saveElectricity: function (id, enable) {
            try {
                Client.Modbus().Device.SaveElectricity(id, enable);
            }
            catch (e) {
                return e.number;
            }
        },
        batchSaveElectricity: function (enable) {
            var count = 0;
            for (var id in this.value) {
                if (this.value[id].Selected) {
                    try {
                        var code = this.saveElectricity(id, enable);
                        if (code) {
                            count++;
                            continue;
                        }
                        this.value[id].Selected = false;
                        this.value[id].Status.WorkMode = (enable == false ? WorkMode.Normal : WorkMode.SaveElectricity);
                        Html.Control.GroupList.clearSelect(id);
                        Html.Control.GroupList.modify(this.value[id]);
                    } catch (e) { };
                }
            }
            return count;
        },
        wifi: function (id) {
            try {
                return Client.Modbus().Device.Network.WiFi.Get(id);
            } catch (e) {
            }
        },
        networkInformation: function (id) {
            return tryCatch(function () {
                return Client.Modbus().Device.Network.Information.Get(id);
            });
        },
        signal: function (deviceId, index, size) {
            try {
                return Client.Modbus().Device.Signal.StatusList(deviceId, index, size);
            }
            catch (e) {

            }
        }
    },
}
var Html = {
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.deviceId;
                return null;
            }
        }
    },
    Control: {
        Popovers:
        {
            relay: new Info.PopoverControls("继电器", "icon-relay", "annunciator/modbus/modbus_relays.htm?deviceId=", Property.Count.Relay),
            signal: new Info.PopoverControls("信号量", "icon_signal", "annunciator/modbus/modbus_signals.htm?deviceId=", Property.Count.Signal)
        },
        OperationIcons: {
            Audio: new Info.OperationIconControls("声音报警信号", "audio-icon"),
            Light: new Info.OperationIconControls("光报警信号", "light-icon"),
            UploadAlert: new Info.OperationIconControls("自动上传报警", "up-load-alert-icon"),
            Heartbeat: new Info.OperationIconControls("定时心跳", "heartbeat-icon"),
            Reboot: new Info.OperationIconControls("重启", "reboot-icon", "rebootDevice_Click"),
            Shutdown: new Info.OperationIconControls("关机", "shutdown-icon", "shutDownDevice_Click"),
            FactoryDefault: new Info.OperationIconControls("恢复出厂值", "factory-default-icon", "factoryDefaultDevice_Click"),
            Ultrasonic: new Info.OperationIconControls("红外或超声波报警信号", "ultrasonic-icon", "return ultrasonic_Click", "annunciator/modbus/modbus_ultrasonics.htm?deviceId="),
            WiFi: new Info.OperationIconControls("无线信号强度:", "wifi-icon", "return wifi_Click", "annunciator/modbus/modbus_wifi.htm?deviceId="),
            SaveElectricity: new Info.OperationIconControls("开启节电模式", "save-electricity-close-icon", "return saveElectricity_Click"),
        },
        IconButton: {
            create: function (device, key, className, getCountFn) {
                var strLabel = "<lable id='" + Info.ControlIdPrefix.Popover.label(key) + device.ProductCode + "'>" + getCountFn(device) + "</lable>"
                var icon = new IconButton(Info.ControlIdPrefix.Popover.icon(key) + device.ProductCode, className, 11, strLabel);
                icon.className = "popover_control_item";
                return icon;
            },
            Relay: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("relay") + id).innerText = value;
                } catch (e) { }
            },
            Signal: function (id, value) {
                try {
                    getTag(Info.ControlIdPrefix.Popover.label("signal") + id).innerText = value;
                } catch (e) { }
            },
        },
        Popover: function (id, key, value, url, name) {
            var popover = new Popover(Info.ControlIdPrefix.Popover.control(key) + id, value, url + id, name);
            if (!Property.DeviceList.value[id].Status.IsOnline) {
                popover.onclick = function () {
                    stopPropagation();
                    return false;
                };
            }
            popover.className = "popover-control";
            return popover;
        },
        GroupList: {
            createItem: function (device) {
                var iconColor = {
                    Normal: LabelTagColor.Green,
                    Abnormal: LabelTagColor.Red,
                    SaveElectricity: LabelTagColor.Yellow,
                }
                //创建控件
                var createControl = {
                    //设备名称，点击后显示相信信息
                    details: function (device, control) {
                        var css = LabelTagColor.DarkGray;
                        if (device.Status.IsOnline)
                            css = iconColor[device.Status.WorkMode];
                        var div = document.createElement("div");
                        var btn = new IconColorButton(Info.ControlIdPrefix.AlertWindow + id, "background_icon deviceinformation", css, 10, device.Name);
                        btn.title = device.Name;
                        btn.href = "annunciator/modbus/modbus_details.htm?deviceId=" + device.ProductCode;
                        btn.className = btn.className + " list-group-item-name";
                        btn.onclick = function () {
                            AlertWindow.Show(btn, -1);
                            return stopPropagation();
                        };
                        div.className = "list-group-item-name-div";
                        div.appendChild(btn);
                        control.appendChild(div);
                    },
                    //无操作图标的控件
                    OperationIcon: function (key, control, device) {
                        var OperationIcon = Html.Control.OperationIcons[key];
                        var btn = document.createElement("a");
                        var ico = document.createElement("div");
                        ico.className = OperationIcon.ClassName;
                        btn.className = "pull-right list-lable-btn-operation";
                        if (OperationIcon.Fun)
                            btn.setAttribute("onclick", OperationIcon.Fun + "(this, '" + device.ProductCode + "')");
                        if (OperationIcon.Url)
                            btn.href = OperationIcon.Url + device.ProductCode;
                        ico.title = OperationIcon.Name;
                        btn.appendChild(ico);
                        control.appendChild(btn);
                    },
                    //操作关联控件
                    popover: function (key, device, controls) {
                        var pop = Html.Control.Popovers[key];
                        var icon = new Html.Control.IconButton.create(device, key, pop.ClassName, pop.Fun);
                        var popover = new Html.Control.Popover(device.ProductCode, key, icon, pop.Url, pop.Name);
                        controls.push(popover);
                    },
                    //电池控件
                    battery: function (device, control) {
                        var capacity = device.Status.BatteryRemaining;
                        if (capacity <= 5 && capacity >= 1)
                            capacity = 1;
                        else
                            capacity = Math.round(capacity / 5);
                        var btn = document.createElement("a");
                        btn.className = "pull-right list-lable-btn-battery";
                        var batteryHead = document.createElement("a");
                        batteryHead.className = "battery-head";

                        var batteryBody = document.createElement("a");
                        batteryBody.className = "battery-body";

                        var batteryCapacity = document.createElement("a");
                        batteryCapacity.className = "battery-capacity";
                        if (capacity <= 4)
                            batteryCapacity.style.backgroundColor = "red";
                        batteryCapacity.style.width = capacity + "px";
                        batteryBody.appendChild(batteryCapacity);
                        btn.appendChild(batteryHead);
                        btn.appendChild(batteryBody);
                        //btn.href = "device/device_users.htm?deviceId=" + device.ProductCode;
                        //btn.setAttribute("onclick", "battery_Click(this, '" + device.ProductCode + "')");
                        btn.title = "剩余电量:" + device.Status.BatteryRemaining + "%";
                        control.appendChild(btn);
                    },
                    saveElectricity: function (device, control) {
                        var OperationIcon = Html.Control.OperationIcons["SaveElectricity"];
                        var btn = document.createElement("a");
                        var ico = document.createElement("div");
                        var enable;
                        if (device.Status.WorkMode == WorkMode.SaveElectricity) {
                            ico.title = "关闭节电模式";
                            ico.className = "save-electricity-open-icon";
                            enable = false;
                        }
                        else {
                            ico.title = "开启节电模式";
                            ico.className = "save-electricity-close-icon";
                            enable = true;
                        }
                        btn.className = "pull-right list-lable-btn-operation";
                        btn.setAttribute("onclick", OperationIcon.Fun + "(this,'" + device.ProductCode + "')");
                        btn.appendChild(ico);
                        control.appendChild(btn);
                    },
                    wifi: function (device, control) {
                        var wifi = Property.DeviceList.wifi(device.ProductCode);
                        if (wifi)
                            var intensity = wifi.Intensity;
                        else
                            var intensity = 0;
                        var btn = document.createElement("a");
                        var ico = document.createElement("div");
                        var OperationIcon = Html.Control.OperationIcons["WiFi"];
                        ico.title = OperationIcon.Name + intensity;
                        if (intensity <= 25 && intensity >= 1)
                            intensity = 1;
                        else
                            intensity = Math.round(intensity / 25);
                        ico.className = OperationIcon.ClassName + intensity;
                        btn.className = "pull-right list-lable-btn-operation";
                        btn.setAttribute("onclick", OperationIcon.Fun + "(this, '" + device.ProductCode + "')");
                        btn.href = OperationIcon.Url + device.ProductCode;
                        btn.appendChild(ico);
                        control.appendChild(btn);
                    },
                    signal: function (device, controls) {
                        var className = "icon_signal gray";
                        if (device.Status.IsOnline) {
                            var isSignal = Html.Control.GroupList.isEliminate(device.ProductCode);
                            if (isSignal)
                                className = "icon_signal red";
                            else
                                className = "icon_signal green";
                        }
                        var icon = new Html.Control.IconButton.create(device, "signal", className, Property.Count.Signal);
                        var popover = new Html.Control.Popover(device.ProductCode, "signal", icon, "annunciator/modbus/modbus_signals.htm?deviceId=", "信号量");
                        controls.push(popover);
                    },
                    //设备能力控件
                    capabilities: function (device, control) {
                        var caps = device.Capabilities;
                        var isOnline = device.Status.IsOnline;
                        if (caps.indexOf("None") != -1)
                            return;
                        if (caps.indexOf("SaveElectricity") != -1 && isOnline)
                            this.saveElectricity(device, control);
                        if (caps.indexOf("Ultrasonic") != -1 && isOnline)
                            this.OperationIcon("Ultrasonic", control, device);
                        if (caps.indexOf("WiFi") != -1 && isOnline)
                            this.wifi(device, control);
                        //if (caps.indexOf("Signal") != -1 || caps.indexOf("Relay") != -1) {
                        //    var controls = new Array();
                        //    if (caps.indexOf("Signal") != -1) {
                        //        this.popover("signal", device, controls);
                        //    }
                        //    if (caps.indexOf("Relay") != -1) {
                        //        this.popover("relay", device, controls);
                        //    }
                        //    var bts = new TransverseButtonList(controls, 70, 0);
                        //    bts.className += " popover_control";
                        //    control.appendChild(bts);
                        //};
                        var controls = new Array();
                        this.signal(device, controls);
                        if (caps.indexOf("Relay") != -1 && device.RelayCount > 0) {
                            this.popover("relay", device, controls);
                        }
                        var bts = new TransverseButtonList(controls, 70, 0);
                        bts.className += " popover_control";
                        control.appendChild(bts);



                        var div = document.createElement("div");
                        div.className = "list-item-capabilities-div";



                        //if (caps.indexOf(DeviceCapabilities.Audio) != -1)
                        //    this.OperationIcon(DeviceCapabilities.Audio, div);
                        //if (caps.indexOf(DeviceCapabilities.Light) != -1)
                        //    this.OperationIcon(DeviceCapabilities.Light, div);
                        //if (caps.indexOf(DeviceCapabilities.UploadAlert) != -1)
                        //    this.OperationIcon(DeviceCapabilities.UploadAlert, div);
                        //if (caps.indexOf(DeviceCapabilities.Heartbeat) != -1)
                        //    this.OperationIcon(DeviceCapabilities.Heartbeat, div);
                        if (caps.indexOf(DeviceCapabilities.Battery) != -1 && isOnline)
                            this.battery(device, div);

                        control.appendChild(div);


                    },
                    networkInformation: function (device, control) {
                        if (device.Status.IsOnline) {
                            var networkInformation = Property.DeviceList.networkInformation(device.ProductCode);
                            var div = document.createElement("div");
                            div.className = "list-item-network-div";
                            var a = document.createElement("a");
                            a.title = networkInformation.IPAddress + ":" + networkInformation.Port;
                            a.className = "list-item-network ip";
                            if (networkInformation.IPAddress == "") {
                                a.title = "无IP地址"
                                a.className += " none";
                            }
                            a.href = "annunciator/modbus/modbus_network.htm?deviceId=" + device.ProductCode;
                            a.innerText = a.title;
                            a.setAttribute("onclick", "return networkInformation_Click(this, '" + device.ProductCode + "')");
                            div.appendChild(a);
                            control.appendChild(div);
                        }
                    },
                    productCode: function (device, control) {
                        var div = document.createElement("div");
                        div.className = "list-item-productcode-div";
                        div.title = device.ProductCode;
                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                };

                var id = device.ProductCode

                var item = new GroupListItem(Info.ControlIdPrefix.GroupListItem, GrouplistItem_Click);
                item.className = item.className + " mouse_pointer";
                item.id = Info.ControlIdPrefix.GroupListItem + id;

                var span = document.createElement("span");
                span.className = "list-label";

                createControl.details(device, item.Content);//创建权限图标和输入通道名称
                //createControl.OperationIcon("FactoryDefault", item.Content, device);//创建恢复出厂值按钮
                //createControl.OperationIcon("Shutdown", item.Content, device);//创建关机按钮
                //createControl.OperationIcon("Reboot", item.Content, device);//创建重启按钮
                createControl.productCode(device, item.Content);//创建设备序列号
                createControl.networkInformation(device, item.Content);//创建设备网络信息
                createControl.capabilities(device, item.Content);//创建设备能力



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
                    var items = this.getItems(result.DeviceInformation);
                    getTag("dList").appendChild(new GroupList("deviceGroupList", items));

                    Property.CurrentCount.set(result.Page.RecordCount);
                    Property.TotalCount.set(result.Page.TotalRecordCount);

                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size, classification) {
                var result = Property.DeviceList.load(index, size, classification);
                var items = this.getItems(result.DeviceInformation);
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
            isEliminate: function (deviceId) {
                var isSignal = false;
                var signals = Property.DeviceList.signal(deviceId);
                for (var i = 0; i < signals.SignalStatus.length; i++) {
                    isSignal = signals.SignalStatus[i].State == SwitchState.ON ? true : false;
                    if (signals.SignalStatus[i].StationaryState) {
                        if (signals.SignalStatus[i].StationaryState == signals.SignalStatus[i].State)
                            isSignal = false
                        else
                            isSignal = true;
                    }
                    if (signals.SignalStatus[i].Bypass && signals.SignalStatus[i].Bypass == SwitchState.ON)
                        isSignal = false;
                    if (isSignal) {
                        break;
                    }
                }
                return isSignal;
            },
            clearSelect: function (id) {
                var tag = document.getElementById(Info.ControlIdPrefix.GroupListItem + id);
                $(tag).removeClass("selected");
                this.selectedCount = this.selectedCount - 1;
                //var tags = $(".selected");
                //for (var i = 0; i < tags.length;) {
                //    $(tags[i]).removeClass("selected");
                //}
                //this.selectedCount = 0;
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
            reboot: function (id) {
                var code = Property.DeviceList.reboot(id);
                AlertWindow.Close(function (code) {
                    if (code) {
                        var txt = Language.service.exception.AlarmCenterException[code];
                        Html.Control.GroupList.exceptionConfirm(txt);
                        return;
                    }
                    Html.Control.GroupList.successConfirm();
                }, code);
            },
            batchReboot: function () {
                var count = Property.DeviceList.batchReboot();
                AlertWindow.Close(function () {
                    if (count == 0)
                        Html.Control.GroupList.successConfirm();
                    else
                        Html.Control.GroupList.failConfirm();
                });
            },
            shutdown: function (id) {
                var code = Property.DeviceList.shutdown(id);
                AlertWindow.Close(function (code) {
                    if (code) {
                        var txt = Language.service.exception.AlarmCenterException[code];
                        Html.Control.GroupList.exceptionConfirm(txt);
                        return;
                    }
                    Html.Control.GroupList.successConfirm();
                }, code);
            },
            batchShutdown: function () {
                var count = Property.DeviceList.batchShutdown();
                AlertWindow.Close(function () {
                    if (count == 0)
                        Html.Control.GroupList.successConfirm();
                    else
                        Html.Control.GroupList.failConfirm();
                });
            },
            saveElectricity: function (id) {
                var device = Property.DeviceList.get(id);
                var enable = device.Status.WorkMode == WorkMode.SaveElectricity ? false : true;
                var code;
                $.confirm({
                    text: "确定要" + (enable == false ? "关闭" : "开启") + "这个设备的节电模式吗？",
                    okButton: "确定",
                    cancelButton: "取消",
                    confirm: function () {
                        code = Property.DeviceList.saveElectricity(id, enable);
                        AlertWindow.Close(function (code) {
                            if (code) {
                                var txt = Language.service.exception.AlarmCenterException[code];
                                Html.Control.GroupList.exceptionConfirm(txt);
                                return;
                            }
                            var newDevice = Property.DeviceList.get(id);
                            if (enable)
                                newDevice.Status.WorkMode = WorkMode.SaveElectricity;
                            else
                                newDevice.Status.WorkMode = WorkMode.Normal;
                            Html.Control.GroupList.modify(newDevice);
                            Html.Control.GroupList.successConfirm();
                        }, code);
                    }
                });
            },
            batchSaveElectricity: function (enable) {
                var count = Property.DeviceList.batchSaveElectricity(enable);
                AlertWindow.Close(function () {
                    if (count == 0)
                        Html.Control.GroupList.successConfirm();
                    else
                        Html.Control.GroupList.failConfirm();
                });
            },
            factoryDefault: function (id) {
                var code = Property.DeviceList.factoryDefault(id);
                AlertWindow.Close(function (code) {
                    if (code) {
                        var txt = Language.service.exception.AlarmCenterException[code];
                        Html.Control.GroupList.exceptionConfirm(txt);
                        return;
                    }
                    Html.Control.GroupList.successConfirm();
                }, code);
            },
            batchFactoryDefault: function () {
                var count = Property.DeviceList.batchFactoryDefault();
                AlertWindow.Close(function () {
                    if (count == 0)
                        Html.Control.GroupList.successConfirm();
                    else
                        Html.Control.GroupList.failConfirm();
                });
            },
            modify: function (device) {
                var item = Html.Control.GroupList.createItem(device);
                var tag = getTag(Info.ControlIdPrefix.GroupListItem + device.ProductCode);
                if (item) {
                    if (device.Selected)
                        item.className = item.className + " selected";
                    tag.parentElement.replaceChild(item, tag);
                    return false;
                }
                return false;
            },
            modifySignalState: function (deviceId, className) {
                var tag = getTag("popover_signal_icon_" + deviceId);
                if (tag)
                    tag.childNodes[0].className = className;
            },
            selectedCount: 0,
            select: function (id) {
                Property.DeviceList.value[id].Selected = !Property.DeviceList.value[id].Selected;
                if (Property.DeviceList.value[id].Selected)
                    ++this.selectedCount;
                else
                    --this.selectedCount;
            },
            exceptionConfirm: function (txt) {
                if (!txt)
                    txt = "未知错误";
                $.confirm({
                    text: "操作失败,原因:" + txt,
                    okButton: "确定",
                    cancelButtonClass: "hide-tag",
                });
            },
            successConfirm: function () {
                $.confirm({
                    text: "操作成功",
                    okButton: "确定",
                    cancelButtonClass: "hide-tag",
                });
            },
            failConfirm: function () {
                $.confirm({
                    text: "部分选中项操作失败,失败选中项已保留",
                    okButton: "确定",
                    cancelButtonClass: "hide-tag",
                });
            },
        },
        PopoverWindow: {
            PageSize: 12,
        },
        AlertWindow: {

        },
    }
}
PageEvent.Device.GroupListItemChanged = function (device) {
    Html.Control.GroupList.modify(device);
}

PageEvent.Device.GroupListItemReload = function (deviceId) {
    var device = Property.DeviceList.get(deviceId)
    Html.Control.GroupList.modify(device);
}

PageEvent.Device.GroupListSignalIconButtonChanged = function (deviceId) {
    setTimeout(function () {
        var isSignal = Html.Control.GroupList.isEliminate(deviceId);
        var className = null;
        if (isSignal)
            className = "icon_signal red";
        else
            className = "icon_signal green";
        Html.Control.GroupList.modifySignalState(deviceId, className);
    }, 300)
}