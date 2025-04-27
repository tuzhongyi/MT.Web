if (!this.Client)
    imported.loadJS("js/client/client.js");
Property.Video["OutputList"] =
{
    value: new Object(),
    page: new Page(),
    //tableSize: 12,
    //loadDB: function (deviceId, index, size) {
    //    return Client.Management().Device.Storage.List(deviceId, index, size);
    //},
    load: function (deviceId, index, size) {
        var response = tryCatch(function () {
            return Client.Management().Device.Video.Output.List(deviceId, index, size);
        });
        var result = new Object();
        if (response) {
            if (response.VideoOutputChannel) {
                for (var i = 0; i < response.VideoOutputChannel.length; i++) {
                    if (this.value[response.VideoOutputChannel[i].Id])
                        response.VideoOutputChannel[i]["Selected"] = this.value[response.VideoOutputChannel[i].Id].Selected;
                    this.value[response.VideoOutputChannel[i].Id] = response.VideoOutputChannel[i];
                    result[response.VideoOutputChannel[i].Id] = this.value[response.VideoOutputChannel[i].Id];
                }
            }
            this.page = response.Page;
        }
        return result;
    },
    create: function (deviceId, output) {
        tryCatch(function () {
            Client.Management().Device.Video.Output.Create(deviceId, output);
        });
    },
    remove: function (deviceId, outputId) {
        var result = tryCatch(function () {
            return Client.Management().Device.Video.Output.Delete(deviceId, outputId);
        })
        if (result)
            delete this.value[outputId];
    },
    modify: function (deviceId, output) {
        var result = tryCatch(function (deviceId, output) {
            return Client.Management().Device.Video.Output.Set(deviceId, output);
        }, deviceId, output);
        if (result) {
            this
            return true;
        }
        return false;
    },
    get: function (deviceId, outputId) {
        return tryCatch(function (deviceId, outputId) {
            return Client.Management().Device.Video.Output.Get(deviceId, outputId);
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

Html.Control.PopoverWindow.Video["OutputList"] = {
    selected: new Array(),
    select: function (id) {
        var index = this.selected.indexOf(id);
        if (index < 0)
            this.selected.push(id);
        else
            this.selected.splice(index, 1);
    },
    selectAll: function () {
        Property.Video.OutputList.load(Html.Current.Id.get());
        for (var uid in Property.Video.OutputList.value) {
            if (VideoOutputList.selected.indexOf(uid) < 0)
                VideoOutputList.selected.push(uid);
        }
    },
    selectInverse: function () {
        Property.Video.OutputList.load(Html.Current.Id.get());
        for (var uid in Property.Video.OutputList.value) {
            var tag = getTag(Info.ControlIdPrefix.Video.Output.list + uid);
            var index = VideoOutputList.selected.indexOf(uid);
            if (!tag && index < 0)
                VideoOutputList.selected.push(uid);
            if (!tag && index >= 0)
                VideoOutputList.selected.splice(index, 1);
        }
    },
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_video_output_count").innerText = value;
            this.value = value;
        },
        get: function () {
            return this.value
        }
    },
    createItem: function (output) {
        var createCoontrol = {
            icon: function (output) {
                var btn = new IconButton("", "icon-desktop", 11, output.Name);
                var a = new AlertWindow("", btn, Info.ControlIdPrefix.Video.Output.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&outputId=" + output.Id, -1, true);
                a.title = output.Name;
                a.className = "alert-window-item";
                return a;
            },
            OperationButton: function (output, control) {
                var a = document.createElement("a");
                a.className = "icon-trash pull-right";
                a.setAttribute("onclick", "GroupListItem_DeviceRemoveVideoOutput_Click(this, '" + output.Id + "')");
                a.id = Info.ControlIdPrefix.Video.Output.remove + output.Id;
                a.title = "删除";
                control.appendChild(a);

                a = document.createElement("a");
                a.className = "icon-edit pull-right";
                a.href = Info.ControlIdPrefix.Video.Output.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&outputId=" + output.Id;
                a.setAttribute("onclick", "return editVideoOutput_Click(this)");
                a.id = Info.ControlIdPrefix.Video.Output.edit + output.Id;
                a.title = "编辑";
                a.style.marginRight = "5px";
                control.appendChild(a);

                a = document.createElement("a");
                a.className = "icon-th-large pull-right";
                a.href = Info.ControlIdPrefix.Video.Output.AlertUrl.display + "?deviceId=" + Html.Current.Id.get() + "&outputId=" + output.Id;
                a.setAttribute("onclick", "return displayVideoOutput_Click(this)");
                a.id = Info.ControlIdPrefix.Video.Output.display + output.Id;
                a.title = "配置解码通道";
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

        item = new GroupListItem(Info.ControlIdPrefix.Video.Output.list, eval("DeviceVideoOutput_Selected"));
        item.id = Info.ControlIdPrefix.Video.Output.list + output.Id;
        createCoontrol.OperationButton(output,item.Content);

        item.className += " mouse_pointer";
        if (Html.Control.PopoverWindow.Video.OutputList.selected.indexOf(output.Id) >= 0)
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
        getTag("glist_video_outputs").innerText = "";
        getTag("div_video_output_paging").innerText = "";
        this.totalCount.set(0);
    },
    list: function () {
        return Property.Video.OutputList.value;
    },
    load: function (index) {
        var result = Property.Video.OutputList.load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_video_outputs").appendChild(glist);
            var page = Property.Video.OutputList.page;

            pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("DeviceVideoOutput_PageChange"));
            getTag("div_video_output_paging").appendChild(pagination);
        }
        this.totalCount.set(Property.Video.OutputList.page.TotalRecordCount);
        PageEvent.Device.GroupListVideoOutputIconButtonChanged(Html.Current.Id.get(), Property.Video.OutputList.page.TotalRecordCount);
    },
    remove: function (outputId) {
        Property.Video.OutputList.remove(Html.Current.Id.get(), outputId);
        this.clear();

        if (Property.Video.OutputList.page.RecordCount == 1 && Property.Video.OutputList.page.PageIndex == Property.Video.OutputList.page.PageCount &&
            Property.Video.OutputList.page.PageIndex != 1)
            --Property.Video.OutputList.page.PageIndex;

        this.load(Property.Video.OutputList.page.PageIndex);
        this.totalCount.set(Property.Video.OutputList.page.TotalRecordCount);

        var index = this.selected.indexOf(outputId);
        if (index >= 0)
            this.selected.splice(index, 1);
    },
    batchRemove: function () {
        var count = 0;
        for (var i = 0; i < this.selected.length; i++) {
            Property.Video.OutputList.remove(Html.Current.Id.get(), this.selected[i]);
            ++count;
        }
        this.totalCount.set(Property.Video.OutputList.page.TotalRecordCount);
        this.selected = new Array();

        if (count == Property.Video.OutputList.page.RecordCount && Property.Video.OutputList.page.PageIndex == Property.Video.OutputList.page.PageCount &&
            Property.Video.OutputList.page.PageIndex != 1)
            --Property.Video.OutputList.page.PageIndex;

        Html.Control.PopoverWindow.Video.OutputList.clear();
        Html.Control.PopoverWindow.Video.OutputList.load(Property.Video.OutputList.page.PageIndex);
    },
    removeAll: function () {
        var count = 0;
        var deviceId = Html.Current.Id.get();
        for (var id in Property.Video.OutputList.value) {
            count += Try(function () {
                Property.Video.OutputList.remove(deviceId, id);
                return 1;
            }, 0);
        }
        if (Property.Video.OutputList.page.TotalRecordCount != count) {
            Property.Video.OutputList.load(deviceId, 1, Property.Video.OutputList.page.TotalRecordCount);
            for (var id in Property.Video.OutputList.value) {
                count += Try(function () {
                    Property.Video.OutputList.remove(deviceId, id);
                    return 1;
                }, 0);
            }
        }
        return count;
    },
    create: function (output) {
        Property.Video.OutputList.create(Html.Current.Id.get(), output);
        PageEvent.Device.GroupListVideoOutputIconButtonChanged(Html.Current.Id.get(), ++Property.Video.OutputList.page.TotalRecordCount);
    },
    modify: function (output) {
        var item = this.createItem(output);
        var tag = getTag(Info.ControlIdPrefix.Video.Output.list + output.Id);
        if (item) {
            tag.parentElement.replaceChild(item, tag);
            return true;
        }
        return false;
    },
};

Html.Control.AlertWindow.Device.Video["Output"] = {
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
        PseudoCode: {
            value: null,
            set: function (value) {
                getTag("txtPseudoCode").value = value
                this.value = value;
            }
        },
        VideoInterfaceType: {
            value: null,
            set: function (value) {
                getTag("ddlVideoInterfaceType").value = value
                this.value = value;
            }
        },
        InterfaceEquipped: {
            value: null,
            set: function (value) {
                getTag("chkInterfaceEquipped").checked = value
                this.value = value;
            }
        },
        Terminal: {
            value: null,
            set: function (value) {
                getTag("chkTerminal").checked = value
                this.value = value;
            }
        },
        Networked: {
            value: null,
            set: function (value) {
                getTag("chkNetworked").checked = value
                this.value = value;
            }
        },
        Frequency: {
            value: null,
            set: function (value) {
                //getTag("sliderFrequency").value = value
                $(".slider-basic").slider({
                    range: "min",
                    max: 100,
                    min: 0,
                    value: value,
                    slide: function (event, ui) {
                        return $(".slider-basic-amount").html(+ui.value);
                    }
                });
                $(".slider-basic-amount").html($(".slider-basic").slider("value"));
                this.value = value;
            }
        },
        Resolution: {
            value: null,
            set: function (value) {
                getTag("ddlResolution").value = value ? value.Width + "×" + value.Height : 0 + "×" + 0;
                this.value = value;
            }
        },
        load: function () {
            var output = this.get();
            this.Id.set(output.Id);
            this.Resolution.set(output.Resolution);
            this.Name.set(output.Name);
            this.Networked.set(output.Networked);
            this.PseudoCode.set(output.PseudoCode);
            this.InterfaceEquipped.set(output.InterfaceEquipped);
            this.Frequency.set(output.Frequency);
            this.VideoInterfaceType.set(output.VideoInterfaceType);
            this.Terminal.set(output.Terminal);
        },
        get: function () {
            var url = new Uri(Trigger.href);
            var outputId = null;
            if (url.Query) {
                outputId = url.Querys.outputId;
            }
            return Property.Video.OutputList.get(Html.Current.Id.get(), outputId);
        },

    },
    create: function (output) {
        Property.Video.OutputList.create(Html.Current.Id.get(),output);
    }
}

PageEvent.Device.Video.Output.GroupListChanged = function (output) {
    Property.Video.OutputList.modify(Html.Current.Id.get(), output);
    Html.Control.PopoverWindow.Video.OutputList.modify(output);
}

PageEvent.Device.Video.Output.GroupListReload = function (sender, args) {
    Html.Control.PopoverWindow.Video.OutputList.clear();//需要清理
    Html.Control.PopoverWindow.Video.OutputList.load(1);
}