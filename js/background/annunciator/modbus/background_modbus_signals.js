if (!this.Client)
    imported.loadJS("js/client/client.js");
Property["SignalList"] =
{
    value: new Object(),
    page: new Page(),
    load: function (deviceId, index, size) {
        var response = tryCatch(function () {
            return Client.Modbus().Device.Signal.StatusList(deviceId, index, size);
        });
        var result = new Object();
        if (response) {
            if (response.SignalStatus) {
                for (var i = 0; i < response.SignalStatus.length; i++) {
                    if (this.value[response.SignalStatus[i].No])
                        response.SignalStatus[i]["Selected"] = this.value[response.SignalStatus[i].No].Selected;
                    this.value[response.SignalStatus[i].No] = response.SignalStatus[i];
                    result[response.SignalStatus[i].No] = this.value[response.SignalStatus[i].No];
                }
            }
            this.page = response.Page;
        }
        return result;
    },
    loadSignal: function (deviceId, No) {
        var signal = tryCatch(function () {
            return Client.Modbus().Device.Signal.Status.Get(deviceId, No);
        });
        if (signal) {
            if (this.value[signal.No])
                signal["Selected"] = this.value[signal.No].Selected;
            this.value[signal.No] = signal;
        }
        return signal;
    },
    modify: function (deviceId, signal) {
        try {
            Client.Modbus().Device.Signal.Status.Set(deviceId, signal.No, signal);
        }
        catch (e) {
            return e.number;
        }
    },
    eliminate: function (deviceId, No) {
        try{
            Client.Modbus().Device.Signal.Eliminate(deviceId, No);
        }
        catch (e) {
            return e.number;
        }
    },
    batchEliminate: function (deviceId) {
        var count = 0;
        for (var id in this.value) {
            if (this.value[id].Selected) {
                try {
                    var code = this.eliminate(deviceId, this.value[id].No);
                    if (code) {
                        count++;
                        continue;
                    }
                    this.value[id].Selected = false;
                    if (this.value[id].State == SwitchState.ON)
                        this.value[id].State = SwitchState.OFF
                    else
                        this.value[id].State = SwitchState.ON
                    Html.Control.PopoverWindow.SignalList.modifyTag(deviceId, this.value[id].No);
                } catch (e) { };
            }
        }
        return count;
    },
    batchModify: function (deviceId, values) {
        var count = 0;
        for (var No in this.value) {
            if (this.value[No].Selected) {
                var signal = new SignalStatus();
                signal.ProductCode = this.value[No].ProductCode;
                signal.No = this.value[No].No;
                signal.State = this.value[No].State;
                signal.StationaryState = values.StationaryState;
                signal.Bypass = values.Bypass;
                signal.Audio = values.Audio;
                signal.Light = values.Light;
                signal.StationaryStateSpecified = true;
                signal.BypassSpecified = true;
                signal.AudioSpecified = true;
                signal.LightSpecified = true;
                try {
                    var code = this.modify(deviceId, signal);
                    if (code) {
                        count++;
                        continue;
                    }
                    this.value[No] = signal;
                    this.value[No]["Selected"] = false;
                    Html.Control.PopoverWindow.SignalList.modifyTag(deviceId, No);
                } catch (e) { };
            }
        }
        return count;
    },
    get: function (No) {
        return this.value[No];
    }
}

Html.Control.PopoverWindow["SignalList"] = {
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_signal_count").innerText = value;
            this.value = value;
        },
        get: function () {
            return this.value
        }
    },
    createItem: function (signal) {
        var createCoontrol = {
            icon: function (signal) {
                var className = signal.State == SwitchState.ON ? "icon_signal simple item red" : "icon_signal simple item green";
                if (signal.StationaryState) {
                    if (signal.StationaryState == signal.State)
                        className = "icon_signal simple item green"
                    else
                        className = "icon_signal simple item red";
                }
                if (signal.Bypass && signal.Bypass == SwitchState.ON) {
                    className ="icon_signal simple item green";
                }
                var btn = new IconButton("", className, 11, signal.No);
                var a = document.createElement("a");
                a.title = signal.No;
                a.className = "alert-window-item";
                a.appendChild(btn);
                a.childNodes[0].style.width = "66px";
                a.setAttribute("onclick", "SignalEliminate_Click(this, '" + signal.No + "')");
                return a;
            },
            edit: function (signal) {
                var btn = document.createElement("div");
                btn.className = "pull-right little-operation-btn";
                var a = document.createElement("a");
                a.className = "icon-edit";
                a.href = Info.ControlIdPrefix.Signal.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&signalNo=" + signal.No;
                a.setAttribute("onclick", "return SignalEdit_Click(this, '" + signal.No + "')");
                a.id = Info.ControlIdPrefix.Signal.edit + signal.No;
                a.title = "修改";
                btn.appendChild(a);
                return btn;
            },
            flag: function (signal) {
                var switchColor = {
                    ON: LabelTagColor.Green,
                    OFF: LabelTagColor.Yellow,
                }
                var switchName = {
                    StationaryState: "开关常量",
                    Bypass: "旁路",
                    Audio: "音频",
                    Light: "光信号",
                }
                var div = document.createElement("div");
                div.className = "lable-user-permission";
                for (var key in switchName) {
                    if (signal[key])
                        div.appendChild(new LabelTag(switchName[key] + ":" + (signal[key] == SwitchState.ON ? "开" : "关"), switchColor[signal[key]]));
                }
                return div;
            }
        };
        var item = null;

        item = new GroupListItem(Info.ControlIdPrefix.Signal.list, eval("Signal_Selected"));
        item.id = Info.ControlIdPrefix.Signal.list + signal.No;

        item.className += " mouse_pointer";
        if (Property.SignalList.get(signal.No).Selected)
            item.className += " selected";

        item.Content.appendChild(createCoontrol.icon(signal));
        item.Content.appendChild(createCoontrol.edit(signal));
        item.Content.appendChild(createCoontrol.flag(signal));
        item.Content.className = "childpage-list-item-content";

        return item;
    },
    createItems: function (signals) {
        var items = new GroupListItemArray();
        if (signals) {
            for (var i = 0; i < signals.length; i++) {
                items.push(this.createItem(signals[i]));
            }
        }
        return items;
    },
    createItemsByObj: function (obj) {
        if (obj) {
            var array = new Array();
            for (var id in obj) {
                array.push(obj[id]);
            }
            if (array.length > 0)
                return this.createItems(array);
        }
        return null;
    },
    clearValue: function () {
        Property.SignalList.value = new Object();
    },
    clear: function () {
        getTag("glist_signals").innerText = "";
        getTag("div_signal_paging").innerText = "";
        this.totalCount.set(0);
    },
    list: function () {
        return Property.SignalList.value;
    },
    load: function (index) {
        var result = Property.SignalList.load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_signals").appendChild(glist);
            var page = Property.SignalList.page;

            pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("Signal_PageChange"));
            getTag("div_signal_paging").appendChild(pagination);
        }
        this.totalCount.set(Property.SignalList.page.TotalRecordCount);
        //(function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
    },
    selectedCount: 0,
    select: function (id) {
        Property.SignalList.value[id].Selected = !Property.SignalList.value[id].Selected;
        if (Property.SignalList.value[id].Selected)
            ++this.selectedCount;
        else
            --this.selectedCount;
    },
    selectAll: function () {
        Property.SignalList.load(Html.Current.Id.get());
        for (var No in Property.SignalList.value) {
            if (!Property.SignalList.value[No].Selected)
                this.select(No);
        }
    },
    selectCancel: function () {
        Property.SignalList.load(Html.Current.Id.get());
        for (var No in Property.SignalList.value) {
            if (Property.SignalList.value[No].Selected)
                this.select(No);
        }
    },
    selectInverse:function(){
        Property.SignalList.load(Html.Current.Id.get());
        for (var No in Property.SignalList.value) {
            var tag = getTag(Info.ControlIdPrefix.Signal.list + No);
            if (!tag)
                this.select(No);
        }
    },
    eliminate: function (No) {
        var code = Property.SignalList.eliminate(Html.Current.Id.get(), No);
        AlertWindow.Close(function () {
            if (code) {
                var txt = Language.service.exception.AlarmCenterException[code];
                Html.Control.GroupList.exceptionConfirm(txt);
                return;
            }
            PageEvent.Device.GroupListSignalIconButtonChanged(Html.Current.Id.get());
            if (Property.SignalList.value[No].State == SwitchState.ON)
                Property.SignalList.value[No].State = SwitchState.OFF
            else
                Property.SignalList.value[No].State = SwitchState.ON
            Html.Control.PopoverWindow.SignalList.modifyTag(Html.Current.Id.get(), No);
            Html.Control.GroupList.successConfirm();
        });    
    },

    batchEliminate: function () {
        var count = Property.SignalList.batchEliminate(Html.Current.Id.get());
        AlertWindow.Close(function () {
            if (count == 0)
                Html.Control.GroupList.successConfirm();
            else
                Html.Control.GroupList.failConfirm();
            Html.Control.PopoverWindow.SignalList.selectedCount = count;
            PageEvent.Device.GroupListSignalIconButtonChanged(Html.Current.Id.get());
        });
    },
    batchModify: function (deviceId, values) {
        var count = Property.SignalList.batchModify(deviceId, values);
        AlertWindow.Close(function () {
            if (count == 0)
                Html.Control.GroupList.successConfirm();
            else
                Html.Control.GroupList.failConfirm();
            Html.Control.PopoverWindow.SignalList.selectedCount = count;
            PageEvent.Device.GroupListSignalIconButtonChanged(Html.Current.Id.get());
        });
    },
    modify: function (deviceId, signal) {
        var code = Property.SignalList.modify(deviceId, signal);
        if (code) {
            var txt = Language.service.exception.AlarmCenterException[code];
            Html.Control.GroupList.exceptionConfirm(txt);
            return;
        }
        signal["Selected"] = Property.SignalList.value[signal.No].Selected;
        Property.SignalList.value[signal.No] = signal;
        Html.Control.PopoverWindow.SignalList.modifyTag(deviceId, signal.No);
        PageEvent.Device.GroupListSignalIconButtonChanged(Html.Current.Id.get());
        Html.Control.GroupList.successConfirm();
    },
    modifyTag: function (deviceId, No) {
        //var signal = Property.SignalList.loadSignal(deviceId, No);
        var tag = getTag(Info.ControlIdPrefix.Signal.list + No);
        if (tag) {
            //var item = Html.Control.PopoverWindow.SignalList.createItem(signal);
            var item = Html.Control.PopoverWindow.SignalList.createItem(Property.SignalList.value[No]);
            tag.parentElement.replaceChild(item, tag);
        }
    },
    AlertWindow:{

    }
};
PageEvent.Signal.ModifySignal = function (deviceId, No, values) {
    var oldSignal = Property.SignalList.value[No];
    var signal = new SignalStatus();
    signal.ProductCode = oldSignal.ProductCode;
    signal.No = oldSignal.No;
    signal.State = oldSignal.State;
    signal.StationaryState = values.StationaryState;
    signal.Bypass = values.Bypass;
    signal.Audio = values.Audio;
    signal.Light = values.Light;
    signal.StationaryStateSpecified = true;
    signal.BypassSpecified = true;
    signal.AudioSpecified = true;
    signal.LightSpecified = true;

    Html.Control.PopoverWindow.SignalList.modify(deviceId, signal);
}

PageEvent.Signal.BatchModifySignal = function (deviceId, values) {
    Html.Control.PopoverWindow.SignalList.batchModify(deviceId, values);
}