if (!this.Client)
    imported.loadJS("js/client/client.js");
Property["MediumList"] =
{
    value: new Object(),
    page: new Page(),
    tableSize: 12,
    loadDB: function (deviceId, index, size) {
        return Client.Management().Device.Storage.List(deviceId, index, size);
    },
    load: function (deviceId, index, size) {
        var response = tryCatch(function () {
            return Client.Management().Device.Storage.List(deviceId, index, size);
        });
        var result = new Object();
        if (response) {
            if (response.StorageMedium) {
                for (var i = 0; i < response.StorageMedium.length; i++) {
                    if (this.value[response.StorageMedium[i].Id])
                        response.StorageMedium[i]["Selected"] = this.value[response.StorageMedium[i].Id].Selected;
                    this.value[response.StorageMedium[i].Id] = response.StorageMedium[i];
                    result[response.StorageMedium[i].Id] = this.value[response.StorageMedium[i].Id];
                }
            }
            this.page = response.Page;
        }
        return result;
    },
    create: function (deviceId, medium) {
        tryCatch(function () {
            Client.Management().Device.Storage.Create(deviceId, medium);
        });
    },
    remove: function (deviceId, mediumId) {
        var result = tryCatch(function () {
            return Client.Management().Device.Storage.Delete(deviceId, mediumId);
        })
        if (result)
            delete this.value[mediumId];
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

Html.Control.PopoverWindow["MediumList"] = {
    selected: new Array(),
    select: function (id) {
        var index = this.selected.indexOf(id);
        if (index < 0)
            this.selected.push(id);
        else
            this.selected.splice(index, 1);
    },
    selectAll: function () {
        Property.MediumList.load(Html.Current.Id.get());
        for (var uid in Property.MediumList.value) {
            if (mediumList.selected.indexOf(uid) < 0)
                mediumList.selected.push(uid);
        }
    },
    selectInverse: function () {
        Property.MediumList.load(Html.Current.Id.get());
        for (var uid in Property.MediumList.value) {
            var tag = getTag(Info.ControlIdPrefix.Medium.list + uid);
            var index = mediumList.selected.indexOf(uid);
            if (!tag && index < 0)
                mediumList.selected.push(uid);
            if (!tag && index >= 0)
                mediumList.selected.splice(index, 1);
        }
    },
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_medium_count").innerText = value;
            this.value = value;
        }
    },
    createItem: function (medium) {
        var createCoontrol = {
            icon: function (medium) {
                var name = new Id(medium.Id).ModuleId.No;
                var btn = new IconButton("", "icon-hdd", 11, name);
                btn.title = name;
                return btn;

                //var btn = new IconButton("", "icon-hdd", 11, name);
                //var a = new AlertWindow("", btn, Info.ControlIdPrefix.Medium.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&mediumId=" + medium.Id, -1, true);
                //a.title = name;
                //return a;

            },
            OperationButton: function (medium) {
                var a = document.createElement("a");
                a.className = "icon-trash pull-right";
                a.setAttribute("onclick", "GroupListItem_DeviceRemoveMedium_Click(this, '" + medium.Id + "')");
                a.id = Info.ControlIdPrefix.Medium.remove + medium.Id;
                a.title = "删除";
                return a;
            },
        };
        var item = null;

        item = new GroupListItem(Info.ControlIdPrefix.Medium.list, eval("DeviceMedium_Selected"));
        item.id = Info.ControlIdPrefix.Medium.list + medium.Id;
        item.Content.appendChild(createCoontrol.OperationButton(medium));

        item.className += " mouse_pointer";
        if (Html.Control.PopoverWindow.MediumList.selected.indexOf(medium.Id) >= 0)
            item.className += " selected";

        item.Content.appendChild(createCoontrol.icon(medium));

        item.Content.className = "childpage-list-item-content";

        return item;
    },
    fillTable: function (json) {
        var page = json.Page;
        var list = json.StorageMedium;

        if (list) {
            var trs = new Array();

            for (var i = 0; i < list.length; i++) {
                var tds = new Array();

                var td = new TableBodyTd(new Id(list[i].Id).ModuleId.No, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].StoragePort, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(Language.Enum.StorageMediumType[list[i].MediumType], "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].Manufacturer, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].Model, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(Language.Enum.StorageType[list[i].StorageType], "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].Capacity / 1024 < 1 ? parseInt(list[i].Capacity) + "b" : list[i].Capacity / 1024 / 1024 < 1 ? parseInt(list[i].Capacity / 1024) + "Kb" : list[i].Capacity / 1024 / 1024 / 1024 < 1 ? parseInt(list[i].Capacity / 1024 / 1024) + "Mb" : parseInt(list[i].Capacity / 1024 / 1024 / 1024) + "Gb", "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].Freespace / 1024 < 1 ? parseInt(list[i].Freespace) + "b" : list[i].Freespace / 1024 / 1024 < 1 ? parseInt(list[i].Freespace / 1024) + "Kb" : list[i].Freespace / 1024 / 1024 / 1024 < 1 ? parseInt(list[i].Freespace / 1024 / 1024) + "Mb" : parseInt(list[i].Freespace / 1024 / 1024 / 1024) + "Gb", "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                trs.push(new TableBodyTr(tds));
            }
            var tabId = "tableMediums";
            Table.Create(tabId, new TableBody(trs), [], page.TotalRecordCount);

            var paginationId = tabId + "_page";
            var pagination;
            if (pagination = document.getElementById(paginationId)) {
                pagination.parentElement.removeChild(pagination);
            }
            pagination = new Pagination(paginationId, page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, Medium_PageChange);
            var tab = document.getElementById("paging");
            tab.parentElement.appendChild(pagination);
        }
    },
    createItems: function (mediums) {
        var items = new GroupListItemArray();
        if (mediums) {
            for (var i = 0; i < mediums.length; i++) {
                items.push(this.createItem(mediums[i]));
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
        getTag("glist_mediums").innerText = "";
        getTag("div_medium_paging").innerText = "";
        this.totalCount.set(0);
    },
    list: function () {
        return Property.MediumList.value;
    },
    load: function (index) {
        var result = Property.MediumList.load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_mediums").appendChild(glist);
            var page = Property.MediumList.page;

            pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("DeviceMedium_PageChange"));
            getTag("div_medium_paging").appendChild(pagination);
        }
        this.totalCount.set(Property.MediumList.page.TotalRecordCount);
        PageEvent.Device.GroupListMediumIconButtonChanged(Html.Current.Id.get(), Property.MediumList.page.TotalRecordCount);
    },
    remove: function (mediumId) {
        Property.MediumList.remove(Html.Current.Id.get(), mediumId);
        this.clear();

        if (Property.MediumList.page.RecordCount == 1 && Property.MediumList.page.PageIndex == Property.MediumList.page.PageCount &&
            Property.MediumList.page.PageIndex != 1)
            --Property.MediumList.page.PageIndex;

        this.load(Property.MediumList.page.PageIndex);
        this.totalCount.set(Property.MediumList.page.TotalRecordCount);

        var index = this.selected.indexOf(mediumId);
        if (index >= 0)
            this.selected.splice(index, 1);
    },
    batchRemove: function () {
        var count = 0;
        for (var i = 0; i < this.selected.length; i++) {
            Property.MediumList.remove(Html.Current.Id.get(), this.selected[i]);
            ++count;
        }
        this.totalCount.set(Property.MediumList.page.TotalRecordCount);
        this.selected = new Array();

        if (count == Property.MediumList.page.RecordCount && Property.MediumList.page.PageIndex == Property.MediumList.page.PageCount &&
            Property.MediumList.page.PageIndex != 1)
            --Property.MediumList.page.PageIndex;

        Html.Control.PopoverWindow.MediumList.clear();
        Html.Control.PopoverWindow.MediumList.load(Property.MediumList.page.PageIndex);
    },
    removeAll: function () {
        var count = 0;
        var deviceId = Html.Current.Id.get();
        for (var id in Property.MediumList.value) {
            count += Try(function () {
                Property.MediumList.remove(deviceId, id);
                return 1;
            }, 0);
        }
        if (Property.MediumList.page.TotalRecordCount != count) {
            Property.MediumList.load(deviceId, 1, Property.MediumList.page.TotalRecordCount);
            for (var id in Property.MediumList.value) {
                count += Try(function () {
                    Property.MediumList.remove(deviceId, id);
                    return 1;
                }, 0);
            }
        }
        return count;
    },
    create: function (medium) {
        Property.MediumList.create(Html.Current.Id.get(), medium);
        PageEvent.Device.GroupListMediumIconButtonChanged(Html.Current.Id.get(), ++Property.MediumList.page.TotalRecordCount);
    }

};

PageEvent.Device.Medium.BatchAddMediumsToDevice = function () {
    //var count = Html.Control.PopoverWindow.UserList.Unassociation.batchAdd(permission);
    Html.Control.PopoverWindow.MediumList.clear();//需要清理
    Html.Control.PopoverWindow.MediumList.load(1);
}

