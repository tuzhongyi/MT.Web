 if (!this.Client)
    imported.loadJS("js/client/client.js");
 Property["RelayList"] =
{
    value: new Object(),
    page: new Page(),
    load: function (deviceId, index, size) {
        var response = tryCatch(function () {
            return Client.Modbus().Device.Relay.StatusList(deviceId, index, size);
        });
        var result = new Object();
        if (response) {
            if (response.RelayStatus) {
                for (var i = 0; i < response.RelayStatus.length; i++) {
                    if (this.value[response.RelayStatus[i].No])
                        response.RelayStatus[i]["Selected"] = this.value[response.RelayStatus[i].No].Selected;
                    this.value[response.RelayStatus[i].No] = response.RelayStatus[i];
                    result[response.RelayStatus[i].No] = this.value[response.RelayStatus[i].No];
                }
            }
            this.page = response.Page;
        }
        return result;
    },
    modify: function (deviceId, No, relay) {
        try{
            Client.Modbus().Device.Relay.Status.Set(deviceId, No, relay);
        }
        catch (e) {
            return e.number;
        }
    },
    batchModify: function (deviceId, switchState) {
        var count = 0;
        for (var id in this.value) {
            if (this.value[id].Selected) {
                var oldState = this.value[id].State;
                this.value[id].State = switchState;
                try {
                    var code = this.modify(deviceId, this.value[id].No, this.value[id]);
                    if (code) {
                        this.value[id].State = oldState;
                        count++;
                        continue;
                    }
                    this.value[id].Selected = false;
                    Html.Control.PopoverWindow.RelayList.clearSelect(id, switchState);
                } catch (e) { };
            }
        }
        return count;
    },
    get:function(No){
        return this.value[No];
    }
}

 Html.Control.PopoverWindow["RelayList"] = {
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_relay_count").innerText = value;
            this.value = value;
        },
        get: function () {
            return this.value
        }
    },
    createItem: function (relay) {
        var createCoontrol = {
            icon: function (relay) {
                var btn = new IconButton("", "icon-relay simple item", 11, relay.No);
                btn.title = relay.No;
                return btn;
            },
            switchBtn: function (relay) {
                var btn = document.createElement("div");
                btn.className = "toggle-switch switch-mini pull-right";
                btn.setAttribute("data-off-label", "关");
                btn.setAttribute("data-off", "default");
                btn.setAttribute("data-on", "primary");
                btn.setAttribute("data-on-label", "开");
                var ipt = document.createElement("input");
                ipt.type = "checkbox";
                if (relay.State == SwitchState.ON)
                    ipt.checked = "checked";
                ipt.onchange = function () {
                    Html.Control.PopoverWindow.RelayList.modify(relay.No, ipt.checked)
                }

                //ipt.setAttribute("onchange", "Html.Control.PopoverWindow.RelayList.modify('" + relay.No + "', '" + ipt.checked + "')");

                ipt.id = Info.ControlIdPrefix.Relay.input + relay.No;
                btn.appendChild(ipt);
                btn.id = Info.ControlIdPrefix.Relay.switchBtn + relay.No;
                return btn;
            }
        };
        var item = null;

        item = new GroupListItem(Info.ControlIdPrefix.Relay.list, eval("Relay_Selected"));
        item.id = Info.ControlIdPrefix.Relay.list + relay.No;

        item.className += " mouse_pointer";
        if (Property.RelayList.get(relay.No).Selected)
            item.className += " selected";

        item.Content.appendChild(createCoontrol.icon(relay));
        item.Content.appendChild(createCoontrol.switchBtn(relay));
        item.Content.className = "childpage-list-item-content";

        return item;
    },
    createItems: function (relays) {
        var items = new GroupListItemArray();
        if (relays) {
            for (var i = 0; i < relays.length; i++) {
                items.push(this.createItem(relays[i]));
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
    clearSelect: function (id, switchState) {
        var tag = document.getElementById(Info.ControlIdPrefix.Relay.list + id);
        if(tag){
            $(tag).removeClass("selected");
            var tagSwitch = getTag(Info.ControlIdPrefix.Relay.switchBtn + id);
            tagSwitch.childNodes[0].className = "switch-animate switch-" + switchState.toLocaleLowerCase();
            var tagInput = getTag(Info.ControlIdPrefix.Relay.input + id);
            tagInput.checked = switchState == SwitchState.OFF ? "" : "checked";
        }
        this.selectedCount = this.selectedCount - 1;
        
    },
    clear: function () {
        getTag("glist_relays").innerText = "";
        getTag("div_relay_paging").innerText = "";
        this.totalCount.set(0);
    },
    clearValue: function () {
        Property.RelayList.value = new Object();
    },
    list: function () {
        return Property.RelayList.value;
    },
    load: function (index) {
        var result = Property.RelayList.load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_relays").appendChild(glist);
            var page = Property.RelayList.page;

            pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("Relay_PageChange"));
            getTag("div_relay_paging").appendChild(pagination);
        }
        this.totalCount.set(Property.RelayList.page.TotalRecordCount);
        (function ($) { $(function () { $('.toggle-switch')['bootstrapSwitch']() }) })(jQuery);
    },
    modify: function (No, checkde) {
        stopPropagation();
        var relay = Property.RelayList.get(No);
        var oldState = relay.State;
        relay.State = (checkde == false ? SwitchState.OFF : SwitchState.ON);
        var code = Property.RelayList.modify(Html.Current.Id.get(), relay.No, relay);
        if (code) {
            relay.State = oldState;
            var item = this.createItem(relay);
            var tag = getTag(Info.ControlIdPrefix.Relay.switchBtn + relay.No);
            tag.childNodes[0].className = "switch-animate switch-" + oldState.toLocaleLowerCase();
            var txt = Language.service.exception.AlarmCenterException[code];
            Html.Control.GroupList.exceptionConfirm(txt);
            return;
        }
        Html.Control.GroupList.successConfirm();
    },
    batchModify: function (switchState) {
        var count = Property.RelayList.batchModify(Html.Current.Id.get(), switchState);
        AlertWindow.Close(function () {
            if (count == 0)
                Html.Control.GroupList.successConfirm();
            else
                Html.Control.GroupList.failConfirm();
        });
    },
    selectedCount: 0,
    select: function (id) {
        Property.RelayList.value[id].Selected = !Property.RelayList.value[id].Selected;
        if (Property.RelayList.value[id].Selected)
            ++this.selectedCount;
        else
            --this.selectedCount;
    },
    selectAll: function () {
        Property.RelayList.load(Html.Current.Id.get());
        for (var No in Property.RelayList.value) {
            if (!Property.RelayList.value[No].Selected)
                this.select(No);
        }
    },
    selectCancel: function () {
        Property.RelayList.load(Html.Current.Id.get());
        for (var No in Property.RelayList.value) {
            if (Property.RelayList.value[No].Selected)
                this.select(No);
        }
    },
    selectInverse: function () {
        Property.RelayList.load(Html.Current.Id.get());
        for (var No in Property.RelayList.value) {
            var tag = getTag(Info.ControlIdPrefix.Signal.list + No);
            if (!tag)
                this.select(No);
        }
    },
};