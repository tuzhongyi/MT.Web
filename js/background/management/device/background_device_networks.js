if (!this.Client)
    imported.loadJS("js/client/client.js");
Property["NetworkList"] =
{
    value: new Object(),
    page: new Page(),
    tableSize: 12,
    loadDB: function (deviceId, index, size) {
        return Client.Management().Device.Network.List(deviceId, index, size);
    },
    load: function (deviceId, index, size) {
        var response = tryCatch(function () {
            return Client.Management().Device.Network.List(deviceId, index, size);
        });
        var result = new Object();
        if (response) {
            if (response.NetworkInterface) {
                for (var i = 0; i < response.NetworkInterface.length; i++) {
                    if (this.value[response.NetworkInterface[i].Id])
                        response.NetworkInterface[i]["Selected"] = this.value[response.NetworkInterface[i].Id].Selected;
                    this.value[response.NetworkInterface[i].Id] = response.NetworkInterface[i];
                    result[response.NetworkInterface[i].Id] = this.value[response.NetworkInterface[i].Id];
                }
            }
            this.page = response.Page;
        }
        return result;
    },
    create: function (deviceId, network) {
        tryCatch(function () {
            Client.Management().Device.Network.Create(deviceId, network);
        });
    },
    remove: function (deviceId, networkId) {
        var result = tryCatch(function () {
            return Client.Management().Device.Network.Delete(deviceId, networkId);
        })
        if (result)
            delete this.value[networkId];
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

Html.Control.PopoverWindow["NetworkList"] = {
    selected: new Array(),
    select: function (id) {
        var index = this.selected.indexOf(id);
        if (index < 0)
            this.selected.push(id);
        else
            this.selected.splice(index, 1);
    },
    selectAll: function () {
        Property.NetworkList.load(Html.Current.Id.get());
        for (var uid in Property.NetworkList.value) {
            if (networkList.selected.indexOf(uid) < 0)
                networkList.selected.push(uid);
        }
    },
    selectInverse: function () {
        Property.NetworkList.load(Html.Current.Id.get());
        for (var uid in Property.NetworkList.value) {
            var tag = getTag(Info.ControlIdPrefix.Network.list + uid);
            var index = networkList.selected.indexOf(uid);
            if (!tag && index < 0)
                networkList.selected.push(uid);
            if (!tag && index >= 0)
                networkList.selected.splice(index, 1);
        }
    },
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_network_count").innerText = value;
            this.value = value;
        }
    },
    createItem: function (network) {
        var createCoontrol = {
            icon: function (network) {
                var name = new Id(network.Id).ModuleId.No;
                var btn = new IconButton("", "icon-code-fork", 11, name);
                btn.title = name;
                return btn;

                //var btn = new IconButton("", "icon-hdd", 11, name);
                //var a = new AlertWindow("", btn, Info.ControlIdPrefix.Network.AlertUrl.details + "?deviceId=" + Html.Current.Id.get() + "&networkId=" + network.Id, -1, true);
                //a.title = name;
                //return a;

            },
            OperationButton: function (network) {
                var a = document.createElement("a");
                a.className = "icon-trash pull-right";
                a.setAttribute("onclick", "GroupListItem_DeviceRemoveNetwork_Click(this, '" + network.Id + "')");
                a.id = Info.ControlIdPrefix.Network.remove + network.Id;
                a.title = "删除"
                return a;
            },
        };
        var item = null;

        item = new GroupListItem(Info.ControlIdPrefix.Network.list, eval("DeviceNetwork_Selected"));
        item.id = Info.ControlIdPrefix.Network.list + network.Id;
        item.Content.appendChild(createCoontrol.OperationButton(network));

        item.className += " mouse_pointer";
        if (Html.Control.PopoverWindow.NetworkList.selected.indexOf(network.Id) >= 0)
            item.className += " selected";

        item.Content.appendChild(createCoontrol.icon(network));

        item.Content.className = "childpage-list-item-content";

        return item;
    },
    fillTable: function (json) {
        var page = json.Page;
        var list = json.NetworkInterface;

        if (list) {
            var trs = new Array();

            for (var i = 0; i < list.length; i++) {
                var tds = new Array();

                //var td = new TableBodyTd(new Id(list[i].Id).ModuleId.No, "hidden-xs overflow-hidden-td");
                //td.style.width = "100px";
                //tds.push(td);

                td = new TableBodyTd(list[i].InterfacePort, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                //td = new TableBodyTd(Language.Enum.IPVersion[list[i].IPVersion], "hidden-xs overflow-hidden-td");
                //td.style.width = "100px";
                //tds.push(td);

                td = new TableBodyTd(Language.Enum.NetworkAddressingType[list[i].AddressingType], "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].IPAddress.IPv4Address.Address, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].IPAddress.IPv4Address.Subnetmask, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].IPAddress.IPv4Address.DefaultGateway, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].IPAddress.IPv4Address.PrimaryDNS, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(list[i].IPAddress.IPv4Address.SecondaryDNS, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                //td = new TableBodyTd(list[i].IPAddress.IPv6Address.Address, "hidden-xs overflow-hidden-td");
                //td.style.width = "100px";
                //tds.push(td);

                //td = new TableBodyTd(list[i].IPAddress.IPv6Address.BitMask, "hidden-xs overflow-hidden-td");
                //td.style.width = "100px";
                //tds.push(td);

                //td = new TableBodyTd(list[i].IPAddress.IPv6Address.DefaultGateway, "hidden-xs overflow-hidden-td");
                //td.style.width = "100px";
                //tds.push(td);

                //td = new TableBodyTd(list[i].IPAddress.IPv6Address.PrimaryDNS, "hidden-xs overflow-hidden-td");
                //td.style.width = "100px";
                //tds.push(td);

                //td = new TableBodyTd(list[i].IPAddress.IPv6Address.SecondaryDNS, "hidden-xs overflow-hidden-td");
                //td.style.width = "100px";
                //tds.push(td);

                td = new TableBodyTd(list[i].PhyscialAddress, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(Language.Enum.NetworkCableType[list[i].CableType], "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(Language.Enum.NetworkSpeedDuplex[list[i].SpeedDuplex], "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                td = new TableBodyTd(Language.Enum.NetworkInterfaceWorkMode[list[i].WorkMode], "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);
                
                td = new TableBodyTd(list[i].MTU, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                trs.push(new TableBodyTr(tds));
            }
            var tabId = "tableNetworks";
            Table.Create(tabId, new TableBody(trs), [], page.TotalRecordCount);

            var paginationId = tabId + "_page";
            var pagination;
            if (pagination = document.getElementById(paginationId)) {
                pagination.parentElement.removeChild(pagination);
            }
            pagination = new Pagination(paginationId, page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, Network_PageChange);
            var tab = document.getElementById("paging");
            tab.parentElement.appendChild(pagination);
        }
    },
    createItems: function (networks) {
        var items = new GroupListItemArray();
        if (networks) {
            for (var i = 0; i < networks.length; i++) {
                items.push(this.createItem(networks[i]));
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
        getTag("glist_networks").innerText = "";
        getTag("div_network_paging").innerText = "";
        this.totalCount.set(0);
    },
    list: function () {
        return Property.NetworkList.value;
    },
    load: function (index) {
        var result = Property.NetworkList.load(Html.Current.Id.get(), index, Html.Control.PopoverWindow.PageSize);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_networks").appendChild(glist);
            var page = Property.NetworkList.page;

            pagination = new Pagination("", page.PageIndex, page.PageSize, page.PageCount, page.RecordCount, page.TotalRecordCount, eval("DeviceNetwork_PageChange"));
            getTag("div_network_paging").appendChild(pagination);
        }
        this.totalCount.set(Property.NetworkList.page.TotalRecordCount);
        PageEvent.Device.GroupListNetworkIconButtonChanged(Html.Current.Id.get(), Property.NetworkList.page.TotalRecordCount);
    },
    remove: function (networkId) {
        Property.NetworkList.remove(Html.Current.Id.get(), networkId);
        this.clear();

        if (Property.NetworkList.page.RecordCount == 1 && Property.NetworkList.page.PageIndex == Property.NetworkList.page.PageCount &&
            Property.NetworkList.page.PageIndex != 1)
            --Property.NetworkList.page.PageIndex;

        this.load(Property.NetworkList.page.PageIndex);
        this.totalCount.set(Property.NetworkList.page.TotalRecordCount);

        var index = this.selected.indexOf(networkId);
        if (index >= 0)
            this.selected.splice(index, 1);
    },
    batchRemove: function () {
        var count = 0;
        for (var i = 0; i < this.selected.length; i++) {
            Property.NetworkList.remove(Html.Current.Id.get(), this.selected[i]);
            ++count;
        }

        this.totalCount.set(Property.NetworkList.page.TotalRecordCount);
        this.selected = new Array();

        if (count == Property.NetworkList.page.RecordCount && Property.NetworkList.page.PageIndex == Property.NetworkList.page.PageCount &&
            Property.NetworkList.page.PageIndex != 1)
            --Property.NetworkList.page.PageIndex;

        Html.Control.PopoverWindow.NetworkList.clear();
        Html.Control.PopoverWindow.NetworkList.load(Property.NetworkList.page.PageIndex);
    },
    removeAll: function () {
        var count = 0;
        var deviceId = Html.Current.Id.get();
        for (var id in Property.NetworkList.value) {
            count += Try(function () {
                Property.NetworkList.remove(deviceId, id);
                return 1;
            }, 0);
        }
        if (Property.NetworkList.page.TotalRecordCount != count) {
            Property.NetworkList.load(deviceId, 1, Property.NetworkList.page.TotalRecordCount);
            for (var id in Property.NetworkList.value) {
                count += Try(function () {
                    Property.NetworkList.remove(deviceId, id);
                    return 1;
                }, 0);
            }
        }
        return count;
    },
    create: function (network) {
        Property.NetworkList.create(Html.Current.Id.get(), network);
        PageEvent.Device.GroupListNetworkIconButtonChanged(Html.Current.Id.get(), ++Property.NetworkList.page.TotalRecordCount);
    }
};

PageEvent.Device.Network.BatchAddNetworksToDevice = function () {
    //var count = Html.Control.PopoverWindow.UserList.Unassociation.batchAdd(permission);
    Html.Control.PopoverWindow.NetworkList.clear();//需要清理
    Html.Control.PopoverWindow.NetworkList.load(1);
}