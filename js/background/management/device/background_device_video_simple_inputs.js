 if (!this.Client)
    imported.loadJS("js/client/client.js");
Property.Video["InputList"] =
{
    value: new Object(),
    page: new Page(),
    //tableSize: 12,
    //loadDB: function (deviceId, index, size) {
    //    return Client.Management().Device.Storage.List(deviceId, index, size);
    //},
    load: function (deviceId, index, size) {
        var response = tryCatch(function () {
             return Client.Management().Device.Video.Input.List(deviceId, index, size);
        });
        var result = new Object();
        if (response) {
            if (response.VideoInputChannel) {
                for (var i = 0; i < response.VideoInputChannel.length; i++) {
                    if (this.value[response.VideoInputChannel[i].Id])
                        response.VideoInputChannel[i]["Selected"] = this.value[response.VideoInputChannel[i].Id].Selected;
                    this.value[response.VideoInputChannel[i].Id] = response.VideoInputChannel[i];
                    result[response.VideoInputChannel[i].Id] = this.value[response.VideoInputChannel[i].Id];
                }
            }
            this.page = response.Page;
        }
        return result;
    },
    create: function (deviceId, input) {
        tryCatch(function () {
            Client.Management().Device.Video.Input.Create(deviceId, input);
        });
    },
    remove: function (deviceId, inputId) {
        var result = tryCatch(function () {
            return Client.Management().Device.Video.Input.Delete(deviceId, inputId);
        })
        if (result)
            delete this.value[inputId];
    },
    modify: function (deviceId,input) {
        var result = tryCatch(function (deviceId, input) {
            return Client.Management().Device.Video.Input.Set(deviceId, input);
        }, deviceId, input);
        if (result) {
            this
            return true;
        }
        return false;
    },
    get: function (deviceId, inputId) {
        return tryCatch(function (deviceId, inputId) {
            return Client.Management().Device.Video.Input.Get(deviceId, inputId);
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

Html.Control.PopoverWindow.Video["InputList"] = {
    selected: new Array(),
    select: function (id) {
        var index = this.selected.indexOf(id);
        if (index < 0)
            this.selected.push(id);
        else
            this.selected.splice(index, 1);
    },
    selectAll: function () {
        Property.Video.InputList.load(Html.Current.Id.get());
        for (var uid in Property.Video.InputList.value) {
            if (VideoInputList.selected.indexOf(uid) < 0)
                VideoInputList.selected.push(uid);
        }
    },
    selectInverse: function () {
        Property.Video.InputList.load(Html.Current.Id.get());
        for (var uid in Property.Video.InputList.value) {
            var tag = getTag(Info.ControlIdPrefix.Video.Input.list + uid);
            var index = VideoInputList.selected.indexOf(uid);
            if (!tag && index < 0)
                VideoInputList.selected.push(uid);
            if (!tag && index >= 0)
                VideoInputList.selected.splice(index, 1);
        }
    },
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_video_input_count").innerText = value;
            this.value = value;
        },
        get: function () {
            return this.value
        }
    },
    createItem: function (input) {
        var createCoontrol = {
            icon: function (input) {
                var btn = new IconButton("", "icon-facetime-video", 11, input.Name);
                var a = new AlertWindow("", btn, Info.ControlIdPrefix.Video.Input.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&inputId=" + input.Id, -1, true);
                a.title = input.Name;
                a.className = "alert-window-item";
                return a;
            },
            OperationButton: function (input, control) {
                var a = document.createElement("a");
                a.className = "icon-trash pull-right";
                a.setAttribute("onclick", "GroupListItem_DeviceRemoveVideoInput_Click(this, '" + input.Id + "')");
                a.id = Info.ControlIdPrefix.Video.Input.remove + input.Id;
                a.title = "删除";
                control.appendChild(a);

                a = document.createElement("a");
                a.className = "icon-edit pull-right";
                a.href = Info.ControlIdPrefix.Video.Input.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&inputId=" + input.Id;
                a.setAttribute("onclick", "return editVideoInput_Click(this)");
                a.id = Info.ControlIdPrefix.Video.Input.edit + input.Id;
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

        item = new GroupListItem(Info.ControlIdPrefix.Video.Input.list, eval("DeviceVideoInput_Selected"));
        item.id = Info.ControlIdPrefix.Video.Input.list + input.Id;
        createCoontrol.OperationButton(input,item.Content);

        item.className += " mouse_pointer";
        if (Html.Control.PopoverWindow.Video.InputList.selected.indexOf(input.Id) >= 0)
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
        getTag("glist_video_inputs").innerText = "";
        getTag("div_video_input_paging").innerText = "";
        this.totalCount.set(0);
    },
    list: function () {
        return Property.Video.InputList.value;
    },
    load: function (index) {
        var result = Property.Video.InputList.load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_video_inputs").appendChild(glist);
            var page = Property.Video.InputList.page;

            pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("DeviceVideoInput_PageChange"));
            getTag("div_video_input_paging").appendChild(pagination);
        }
        this.totalCount.set(Property.Video.InputList.page.TotalRecordCount);
        PageEvent.Device.GroupListVideoInputIconButtonChanged(Html.Current.Id.get(), Property.Video.InputList.page.TotalRecordCount);
    },
    remove: function (inputId) {
        Property.Video.InputList.remove(Html.Current.Id.get(), inputId);
        this.clear();

        if (Property.Video.InputList.page.RecordCount == 1 && Property.Video.InputList.page.PageIndex == Property.Video.InputList.page.PageCount &&
            Property.Video.InputList.page.PageIndex != 1)
            --Property.Video.InputList.page.PageIndex;

        this.load(Property.Video.InputList.page.PageIndex);
        this.totalCount.set(Property.Video.InputList.page.TotalRecordCount);

        var index = this.selected.indexOf(inputId);
        if (index >= 0)
            this.selected.splice(index, 1);
    },
    batchRemove: function () {
        var count = 0;
        for (var i = 0; i < this.selected.length; i++) {
            Property.Video.InputList.remove(Html.Current.Id.get(), this.selected[i]);
            ++count;
        }
        this.totalCount.set(Property.Video.InputList.page.TotalRecordCount);
        this.selected = new Array();

        if (count == Property.Video.InputList.page.RecordCount && Property.Video.InputList.page.PageIndex == Property.Video.InputList.page.PageCount &&
            Property.Video.InputList.page.PageIndex != 1)
            --Property.Video.InputList.page.PageIndex;

        Html.Control.PopoverWindow.Video.InputList.clear();
        Html.Control.PopoverWindow.Video.InputList.load(Property.Video.InputList.page.PageIndex);
    },
    removeAll: function () {
        var count = 0;
        var deviceId = Html.Current.Id.get();
        for (var id in Property.Video.InputList.value) {
            count += Try(function () {
                Property.Video.InputList.remove(deviceId, id);
                return 1;
            }, 0);
        }
        if (Property.Video.InputList.page.TotalRecordCount != count) {
            Property.Video.InputList.load(deviceId, 1, Property.Video.InputList.page.TotalRecordCount);
            for (var id in Property.Video.InputList.value) {
                count += Try(function () {
                    Property.Video.InputList.remove(deviceId, id);
                    return 1;
                }, 0);
            }
        }
        return count;
    },
    create: function (input) {
        Property.Video.InputList.create(Html.Current.Id.get(), input);
        PageEvent.Device.GroupListVideoInputIconButtonChanged(Html.Current.Id.get(), ++Property.Video.InputList.page.TotalRecordCount);
    },
    modify: function (input) {
        var item = this.createItem(input);
        var tag = getTag(Info.ControlIdPrefix.Video.Input.list + input.Id);
        if (item) {
            tag.parentElement.replaceChild(item, tag);
            return true;
        }
        return false;
    },
};

Html.Control.AlertWindow.Device.Video["Input"] = {
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
        CameraType: {
            value: null,
            set: function (value) {
                getTag("ddlCameraType").value = value
                this.value = value;
            }
        },
        PTZ: {
            value: null,
            set: function (value) {
                getTag("chkPTZ").checked = value
                this.value = value;
            }
        },
        Infrared: {
            value: null,
            set: function (value) {
                getTag("chkInfrared").checked = value
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
        load: function () {
            var input = this.get();
            this.Id.set(input.Id);
            this.CameraType.set(input.CameraType);
            this.Infrared.set(input.Infrared);
            this.Name.set(input.Name);
            this.Networked.set(input.Networked);
            this.PseudoCode.set(input.PseudoCode);
            this.PTZ.set(input.PTZ);
            this.Terminal.set(input.Terminal);
            this.VideoInterfaceType.set(input.VideoInterfaceType)
        },
        get: function () {
            var url = new Uri(Trigger.href);
            var inputId = null;
            if (url.Query) {
                inputId = url.Querys.inputId;
            }
            return Property.Video.InputList.get(Html.Current.Id.get(), inputId);
        },

    },
    create: function (input) {
        Property.Video.InputList.create(Html.Current.Id.get(),input);
    }
}

PageEvent.Device.Video.Input.GroupListChanged = function (input) {
    Property.Video.InputList.modify(Html.Current.Id.get(),input);
    Html.Control.PopoverWindow.Video.InputList.modify(input);
}

PageEvent.Device.Video.Input.GroupListReload = function (sender, args) {
    Html.Control.PopoverWindow.Video.InputList.clear();//需要清理
    Html.Control.PopoverWindow.Video.InputList.load(1);
}