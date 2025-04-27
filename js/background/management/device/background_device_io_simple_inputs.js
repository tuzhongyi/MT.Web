if (!this.Client)
    imported.loadJS("js/client/client.js");
Property.IO["InputList"] =
{
    value: new Object(),
    page: new Page(),
    //tableSize: 12,
    //loadDB: function (deviceId, index, size) {
    //    return Client.Management().Device.Storage.List(deviceId, index, size);
    //},
    load: function (deviceId, index, size) {
        var response = tryCatch(function () {
            return Client.Management().Device.IO.Input.List(deviceId, index, size);
        });
        var result = new Object();
        if (response) {
            if (response.IOInputChannel) {
                for (var i = 0; i < response.IOInputChannel.length; i++) {
                    if (this.value[response.IOInputChannel[i].Id])
                        response.IOInputChannel[i]["Selected"] = this.value[response.IOInputChannel[i].Id].Selected;
                    this.value[response.IOInputChannel[i].Id] = response.IOInputChannel[i];
                    result[response.IOInputChannel[i].Id] = this.value[response.IOInputChannel[i].Id];
                }
            }
            this.page = response.Page;
        }
        return result;
    },
    create: function (deviceId, input) {
        tryCatch(function () {
            Client.Management().Device.IO.Input.Create(deviceId, input);
        });
    },
    remove: function (deviceId, inputId) {
        var result = tryCatch(function () {
            return Client.Management().Device.IO.Input.Delete(deviceId, inputId);
        })
        if (result)
            delete this.value[inputId];
    },
    modify: function (deviceId, input) {
        var result = tryCatch(function (deviceId, input) {
            return Client.Management().Device.IO.Input.Set(deviceId, input);
        }, deviceId, input);
        if (result) {
            return true;
        }
        return false;
    },
    get: function (deviceId, inputId) {
        return tryCatch(function (deviceId, inputId) {
            return Client.Management().Device.IO.Input.Get(deviceId, inputId);
        }, deviceId, inputId);
    },
    batchRemove: function (deviceId) {
        var count = 0;
        for (var id in this.value) {
            if (this.value[id].Selected) {
                try {
                    this.remove(deviceId, id); ++count;
                } catch (e) { }
            }
        }
        return count;
    },
}

Html.Control.PopoverWindow.IO["InputList"] = {
    selected: new Array(),
    select: function (id) {
        var index = this.selected.indexOf(id);
        if (index < 0)
            this.selected.push(id);
        else
            this.selected.splice(index, 1);
    },
    selectAll: function () {
        Property.IO.InputList.load(Html.Current.Id.get());
        for (var uid in Property.IO.InputList.value) {
            if (IOInputList.selected.indexOf(uid) < 0)
                IOInputList.selected.push(uid);
        }
    },
    selectInverse: function () {
        Property.IO.InputList.load(Html.Current.Id.get());
        for (var uid in Property.IO.InputList.value) {
            var tag = getTag(Info.ControlIdPrefix.IO.Input.list + uid);
            var index = IOInputList.selected.indexOf(uid);
            if (!tag && index < 0)
                IOInputList.selected.push(uid);
            if (!tag && index >= 0)
                IOInputList.selected.splice(index, 1);
        }
    },
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_io_input_count").innerText = value;
            this.value = value;
        },
        get: function () {
            return this.value
        }
    },
    createItem: function (input) {
        var createCoontrol = {
            icon: function (input) {
                var btn = new IconButton("", "icon-linkedin-sign", 11, input.Name);
                var a = new AlertWindow("", btn, Info.ControlIdPrefix.IO.Input.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&inputId=" + input.Id, -1, true);
                a.title = input.Name;
                a.className = "alert-window-item";
                return a;
            },
            OperationButton: function (input, control) {
                var a = document.createElement("a");
                a.className = "icon-trash pull-right";
                a.setAttribute("onclick", "GroupListItem_DeviceRemoveIOInput_Click(this, '" + input.Id + "')");
                a.id = Info.ControlIdPrefix.IO.Input.remove + input.Id;
                a.title = "删除";
                control.appendChild(a);

                a = document.createElement("a");
                a.className = "icon-edit pull-right";
                a.href = Info.ControlIdPrefix.IO.Input.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&inputId=" + input.Id;
                a.setAttribute("onclick", "return editIOInput_Click(this)");
                a.id = Info.ControlIdPrefix.IO.Input.edit + input.Id;
                a.title = "编辑";
                a.style.marginRight = "5px";
                control.appendChild(a);
            },
            No: function (input, control) {
                var no = new Id(input.Id).ModuleId.No;
                var label = document.createElement("label");
                label.innerText = no;
                label.className = "pull-right";
                control.appendChild(label);
            }
        };
        var item = null;

        item = new GroupListItem(Info.ControlIdPrefix.IO.Input.list, eval("DeviceIOInput_Selected"));
        item.id = Info.ControlIdPrefix.IO.Input.list + input.Id;
        createCoontrol.OperationButton(input,item.Content);

        item.className += " mouse_pointer";
        if (Html.Control.PopoverWindow.IO.InputList.selected.indexOf(input.Id) >= 0)
            item.className += " selected";

        item.Content.appendChild(createCoontrol.icon(input));
        createCoontrol.No(input, item.Content);

        item.Content.className = "childpage-list-item-content";

        return item;
    },
    createItems: function (inputs) {
        var items = new GroupListItemArray();
        if (inputs) {
            for (var i = 0; i < inputs.length; i++) {
                items.push(this.createItem(inputs[i]));
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
    clear: function () {
        getTag("glist_io_inputs").innerText = "";
        getTag("div_io_input_paging").innerText = "";
        this.totalCount.set(0);
    },
    list: function () {
        return Property.IO.InputList.value;
    },
    load: function (index) {
        var result = Property.IO.InputList.load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_io_inputs").appendChild(glist);
            var page = Property.IO.InputList.page;

            pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("DeviceIOInput_PageChange"));
            getTag("div_io_input_paging").appendChild(pagination);
        }
        this.totalCount.set(Property.IO.InputList.page.TotalRecordCount);
        PageEvent.Device.GroupListIOInputIconButtonChanged(Html.Current.Id.get(), Property.IO.InputList.page.TotalRecordCount);
    },
    remove: function (inputId) {
        Property.IO.InputList.remove(Html.Current.Id.get(), inputId);
        this.clear();

        if (Property.IO.InputList.page.RecordCount == 1 && Property.IO.InputList.page.PageIndex == Property.IO.InputList.page.PageCount &&
            Property.IO.InputList.page.PageIndex != 1)
            --Property.IO.InputList.page.PageIndex;

        this.load(Property.IO.InputList.page.PageIndex);
        this.totalCount.set(Property.IO.InputList.page.TotalRecordCount);

        var index = this.selected.indexOf(inputId);
        if (index >= 0)
            this.selected.splice(index, 1);
    },
    batchRemove: function () {
        var count = 0;
        for (var i = 0; i < this.selected.length; i++) {
            Property.IO.InputList.remove(Html.Current.Id.get(), this.selected[i]);
            ++count;
        }

        this.totalCount.set(Property.IO.InputList.page.TotalRecordCount);
        this.selected = new Array();

        if (count == Property.IO.InputList.page.RecordCount && Property.IO.InputList.page.PageIndex == Property.IO.InputList.page.PageCount &&
            Property.IO.InputList.page.PageIndex != 1)
            --Property.IO.InputList.page.PageIndex;

        Html.Control.PopoverWindow.IO.InputList.clear();
        Html.Control.PopoverWindow.IO.InputList.load(Property.IO.InputList.page.PageIndex);
    },
    removeAll: function () {
        var count = 0;
        var deviceId = Html.Current.Id.get();
        for (var id in Property.IO.InputList.value) {
            count += Try(function () {
                Property.IO.InputList.remove(deviceId, id);
                return 1;
            }, 0);
        }
        if (Property.IO.InputList.page.TotalRecordCount != count) {
            Property.IO.InputList.load(deviceId, 1, Property.IO.InputList.page.TotalRecordCount);
            for (var id in Property.IO.InputList.value) {
                count += Try(function () {
                    Property.IO.InputList.remove(deviceId, id);
                    return 1;
                }, 0);
            }
        }
        return count;
    },
    create: function (input) {
        Property.IO.InputList.create(Html.Current.Id.get(), input);
        PageEvent.Device.GroupListIOInputIconButtonChanged(Html.Current.Id.get(), ++Property.IO.InputList.page.TotalRecordCount);
    },
    modify: function (input) {
        var item = this.createItem(input);
        var tag = getTag(Info.ControlIdPrefix.IO.Input.list + input.Id);
        if (item) {
            tag.parentElement.replaceChild(item, tag);
            return true;
        }
        return false;
    },
};

Html.Control.AlertWindow.Device.IO["Input"] = {
    Details: {
        Id:{
            value: null,
            set: function (value) {
                getTag("txtId").value = value
                this.value = value;
            }
        },
        Name: {
            value: null,
            set: function (value) {
                getTag("txtName").value = value
                this.value = value;
            }
        },
        ProbeType: {
            value: null,
            set: function (value) {
                getTag("ddlProbeType").value = value
                this.value = value;
            }
        },
        TriggeringType: {
            value: null,
            set: function (value) {
                getTag("ddlTriggeringType").value = value
                this.value = value;
            }
        },
        DefenceZoneId: {
            value: null,
            set: function (value) {
                getTag("txtDefenceZoneId").value = value
                this.value = value;
            }
        },
        load: function () {
            var input = this.get();
            this.Id.set(input.Id);
            this.ProbeType.set(input.ProbeType);
            this.TriggeringType.set(input.TriggeringType);
            this.Name.set(input.Name);
            this.DefenceZoneId.set(input.DefenceZoneId);
        },
        get: function () {
            var url = new Uri(Trigger.href);
            var inputId = null;
            if (url.Query) {
                inputId = url.Querys.inputId;
            }
            return Property.IO.InputList.get(Html.Current.Id.get(), inputId);
        },
        create: function (input) {
            Property.IO.InputList.create(Html.Current.Id.get(), input);
        }
    }
}

PageEvent.Device.IO.Input.GroupListChanged = function (input) {
    Property.IO.InputList.modify(Html.Current.Id.get(), input);
    Html.Control.PopoverWindow.IO.InputList.modify(input);
}

PageEvent.Device.IO.Input.GroupListReload = function (sender, args) {
    Html.Control.PopoverWindow.IO.InputList.clear();//需要清理
    Html.Control.PopoverWindow.IO.InputList.load(1);
}