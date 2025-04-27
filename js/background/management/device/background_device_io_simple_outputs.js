if (!this.Client)
    imported.loadJS("js/client/client.js");
Property.IO["OutputList"] =
{
    value: new Object(),
    page: new Page(),
    //tableSize: 12,
    //loadDB: function (deviceId, index, size) {
    //    return Client.Management().Device.Storage.List(deviceId, index, size);
    //},
    load: function (deviceId, index, size) {
        var response = tryCatch(function () {
            return Client.Management().Device.IO.Output.List(deviceId, index, size);
        });
        var result = new Object();
        if (response) {
            if (response.IOOutputChannel) {
                for (var i = 0; i < response.IOOutputChannel.length; i++) {
                    if (this.value[response.IOOutputChannel[i].Id])
                        response.IOOutputChannel[i]["Selected"] = this.value[response.IOOutputChannel[i].Id].Selected;
                    this.value[response.IOOutputChannel[i].Id] = response.IOOutputChannel[i];
                    result[response.IOOutputChannel[i].Id] = this.value[response.IOOutputChannel[i].Id];
                }
            }
            this.page = response.Page;
        }
        return result;
    },
    create: function (deviceId, output) {
        tryCatch(function () {
            Client.Management().Device.IO.Output.Create(deviceId, output);
        });
    },
    remove: function (deviceId, outputId) {
        var result = tryCatch(function () {
            return Client.Management().Device.IO.Output.Delete(deviceId, outputId);
        })
        if (result)
            delete this.value[outputId];
    },
    modify: function (deviceId, output) {
        var result = tryCatch(function (deviceId, output) {
            return Client.Management().Device.IO.Output.Set(deviceId, output);
        }, deviceId, output);
        if (result) {
            return true;
        }
        return false;
    },
    get: function (deviceId, outputId) {
        return tryCatch(function (deviceId, outputId) {
            return Client.Management().Device.IO.Output.Get(deviceId, outputId);
        }, deviceId, outputId);
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

Html.Control.PopoverWindow.IO["OutputList"] = {
    selected: new Array(),
    select: function (id) {
        var index = this.selected.indexOf(id);
        if (index < 0)
            this.selected.push(id);
        else
            this.selected.splice(index, 1);
    },
    selectAll: function () {
        Property.IO.OutputList.load(Html.Current.Id.get());
        for (var uid in Property.IO.OutputList.value) {
            if (IOOutputList.selected.indexOf(uid) < 0)
                IOOutputList.selected.push(uid);
        }
    },
    selectInverse: function () {
        Property.IO.OutputList.load(Html.Current.Id.get());
        for (var uid in Property.IO.OutputList.value) {
            var tag = getTag(Info.ControlIdPrefix.IO.Output.list + uid);
            var index = IOOutputList.selected.indexOf(uid);
            if (!tag && index < 0)
                IOOutputList.selected.push(uid);
            if (!tag && index >= 0)
                IOOutputList.selected.splice(index, 1);
        }
    },
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_io_output_count").innerText = value;
            this.value = value;
        },
        get: function () {
            return this.value
        }
    },
    createItem: function (output) {
        var createCoontrol = {
            icon: function (output) {
                var btn = new IconButton("", "icon-flickr", 11, output.Name);
                var a = new AlertWindow("", btn, Info.ControlIdPrefix.IO.Output.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&outputId=" + output.Id, -1, true);
                a.title = output.Name;
                a.className = "alert-window-item";
                return a;
            },
            OperationButton: function (output, control) {
                var a = document.createElement("a");
                a.className = "icon-trash pull-right";
                a.setAttribute("onclick", "GroupListItem_DeviceRemoveIOOutput_Click(this, '" + output.Id + "')");
                a.id = Info.ControlIdPrefix.IO.Output.remove + output.Id;
                a.title = "删除";
                control.appendChild(a);

                a = document.createElement("a");
                a.className = "icon-edit pull-right";
                a.href = Info.ControlIdPrefix.IO.Output.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&outputId=" + output.Id;
                a.setAttribute("onclick", "return editIOOutput_Click(this)");
                a.id = Info.ControlIdPrefix.IO.Output.edit + output.Id;
                a.title = "编辑";
                a.style.marginRight = "5px";
                control.appendChild(a);
            },
            No: function (output, control) {
                var no = new Id(output.Id).ModuleId.No;
                var label = document.createElement("label");
                label.innerText = no;
                label.className = "pull-right";
                control.appendChild(label);
            }
        };
        var item = null;

        item = new GroupListItem(Info.ControlIdPrefix.IO.Output.list, eval("DeviceIOOutput_Selected"));
        item.id = Info.ControlIdPrefix.IO.Output.list + output.Id;
        createCoontrol.OperationButton(output, item.Content);

        item.className += " mouse_pointer";
        if (Html.Control.PopoverWindow.IO.OutputList.selected.indexOf(output.Id) >= 0)
            item.className += " selected";

        item.Content.appendChild(createCoontrol.icon(output));
        createCoontrol.No(output, item.Content);

        item.Content.className = "childpage-list-item-content";

        return item;
    },
    createItems: function (outputs) {
        var items = new GroupListItemArray();
        if (outputs) {
            for (var i = 0; i < outputs.length; i++) {
                items.push(this.createItem(outputs[i]));
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
        getTag("glist_io_outputs").innerText = "";
        getTag("div_io_output_paging").innerText = "";
        this.totalCount.set(0);
    },
    list: function () {
        return Property.IO.OutputList.value;
    },
    load: function (index) {
        var result = Property.IO.OutputList.load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_io_outputs").appendChild(glist);
            var page = Property.IO.OutputList.page;

            pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("DeviceIOOutput_PageChange"));
            getTag("div_io_output_paging").appendChild(pagination);
        }
        this.totalCount.set(Property.IO.OutputList.page.TotalRecordCount);
        PageEvent.Device.GroupListIOOutputIconButtonChanged(Html.Current.Id.get(), Property.IO.OutputList.page.TotalRecordCount);
    },
    remove: function (outputId) {
        Property.IO.OutputList.remove(Html.Current.Id.get(), outputId);
        this.clear();

        if (Property.IO.OutputList.page.RecordCount == 1 && Property.IO.OutputList.page.PageIndex == Property.IO.OutputList.page.PageCount &&
            Property.IO.OutputList.page.PageIndex != 1)
            --Property.IO.OutputList.page.PageIndex;

        this.load(Property.IO.OutputList.page.PageIndex);
        this.totalCount.set(Property.IO.OutputList.page.TotalRecordCount);

        var index = this.selected.indexOf(outputId);
        if (index >= 0)
            this.selected.splice(index, 1);
    },
    batchRemove: function () {
        var count = 0;
        for (var i = 0; i < this.selected.length; i++) {
            Property.IO.OutputList.remove(Html.Current.Id.get(), this.selected[i]);
            ++count;
        }
        this.totalCount.set(Property.IO.OutputList.page.TotalRecordCount);
        this.selected = new Array();

        if (count == Property.IO.OutputList.page.RecordCount && Property.IO.OutputList.page.PageIndex == Property.IO.OutputList.page.PageCount &&
            Property.IO.OutputList.page.PageIndex != 1)
            --Property.IO.OutputList.page.PageIndex;

        Html.Control.PopoverWindow.IO.OutputList.clear();
        Html.Control.PopoverWindow.IO.OutputList.load(Property.IO.OutputList.page.PageIndex);
    },
    removeAll: function () {
        var count = 0;
        var deviceId = Html.Current.Id.get();
        for (var id in Property.IO.OutputList.value) {
            count += Try(function () {
                Property.IO.OutputList.remove(deviceId, id);
                return 1;
            }, 0);
        }
        if (Property.IO.OutputList.page.TotalRecordCount != count) {
            Property.IO.OutputList.load(deviceId, 1, Property.IO.OutputList.page.TotalRecordCount);
            for (var id in Property.IO.OutputList.value) {
                count += Try(function () {
                    Property.IO.OutputList.remove(deviceId, id);
                    return 1;
                }, 0);
            }
        }
        return count;
    },
    create: function (output) {
        Property.IO.OutputList.create(Html.Current.Id.get(), output);
        PageEvent.Device.GroupListIOOutputIconButtonChanged(Html.Current.Id.get(), ++Property.IO.OutputList.page.TotalRecordCount);
    },
    modify: function (output) {
        var item = this.createItem(output);
        var tag = getTag(Info.ControlIdPrefix.IO.Output.list + output.Id);
        if (item) {
            tag.parentElement.replaceChild(item, tag);
            return true;
        }
        return false;
    },
};

Html.Control.AlertWindow.Device.IO["Output"] = {
    Details: {
        Id: {
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
        TriggeringType: {
            value: null,
            set: function (value) {
                getTag("ddlTriggeringType").value = value
                this.value = value;
            }
        },
        load: function () {
            var output = this.get();
            this.Id.set(output.Id);
            this.TriggeringType.set(output.TriggeringType);
            this.Name.set(output.Name);
        },
        get: function () {
            var url = new Uri(Trigger.href);
            var outputId = null;
            if (url.Query) {
                outputId = url.Querys.outputId;
            }
            return Property.IO.OutputList.get(Html.Current.Id.get(), outputId);
        },
        create: function (output) {
            Property.IO.OutputList.create(Html.Current.Id.get(), output);
        }
    }
}

PageEvent.Device.IO.Output.GroupListChanged = function (output) {
    Property.IO.OutputList.modify(Html.Current.Id.get(), output);
    Html.Control.PopoverWindow.IO.OutputList.modify(output);
}

PageEvent.Device.IO.Output.GroupListReload = function (sender, args) {
    Html.Control.PopoverWindow.IO.OutputList.clear();//需要清理
    Html.Control.PopoverWindow.IO.OutputList.load(1);
}