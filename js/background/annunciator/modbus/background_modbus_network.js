if (!this.Client)
    imported.loadJS("/js/client/client.js");

Property["Network"] = {
    load: function (deviceId) {
        return Client.Modbus().Device.Network.Information.Get(deviceId);
    },
    modify: function (deviceId, network) {
        try {
            Client.Modbus().Device.Network.Information.Set(deviceId, network)
        }
        catch (e) {
            return e.number;
        }
    },
}

Html.Control.AlertWindow["Network"] = {
    load: function (id) {
        var result = Property.Network.load(id);
        this.Name.set(Property.DeviceList.get(id).Name);
        this.IPAddress.set(result.IPAddress);
        this.Port.set(result.Port);
        this.Submask.set(result.Submask);
        this.Gateway.set(result.Gateway);
        this.PhysicalAddress.set(result.PhysicalAddress);
        this.DNS.set(result.DNS);
        if (result.CentralServer) {
            this.CentralServerIPAddress.set(result.CentralServer.IPAddress);
            this.CentralServerPort.set(result.CentralServer.Port);
        }
    },
    modify: function (network) {
        var code = Property.Network.modify(Html.Current.Id.get(), network);
        if (code) {
            AlertWindow.Close(function (code) {
                var txt = Language.service.exception.AlarmCenterException[code];
                Html.Control.GroupList.exceptionConfirm(txt);
            }, code);
        }
        else {
            AlertWindow.Close(function () {
                PageEvent.Device.GroupListItemReload(Html.Current.Id.get());
                Html.Control.GroupList.successConfirm();
            });
        }
    },
    Name: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtName").value = value;
            this.value = value;
        }
    },
    IPAddress: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtIPAddress").value = value;
            this.value = value;
        }
    },
    Port: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtPort").value = value;
            this.value = value;
        }
    },
    Submask: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtSubmask").value = value;
            this.value = value;
        }
    },
    Gateway: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtGateway").value = value;
            this.value = value;
        }
    },
    PhysicalAddress: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtPhysicalAddress").value = value;
            this.value = value;
        }
    },
    DNS: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtDNS").value = value;
            this.value = value;
        }
    },
    CentralServerIPAddress: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtCentralServerIPAddress").value = value;
            this.value = value;
        }
    },
    CentralServerPort: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtCentralServerPort").value = value;
            this.value = value;
        }
    },
}