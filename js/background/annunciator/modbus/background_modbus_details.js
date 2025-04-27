if (!this.Client)
    imported.loadJS("/js/client/client.js");

Property["Device"] = {
    load: function (id) {
        return Property.DeviceList.get(id);
    },
    modify: function (device) {
        try {
            Client.Modbus().Device.Set(device.ProductCode, device);
        }
        catch (e) {
            return e.number;
        }
    },
}

Html.Control.AlertWindow["Details"] = {
    load: function (id) {
        var result = Property.Device.load(id);
        this.Name.set(result.Name);
        this.Factory.set(result.Factory);
        this.Version.set(result.Version);
        this.SoftwareVersion.set(result.SoftwareVersion);
        this.ProtocolVersion.set(result.ProtocolVersion);
        this.HardwareVersion.set(result.HardwareVersion);
    },
    modify: function (name) {
        var newDeviceInformation = new DeviceInformation();
        var oldDeviceInformation = Property.Device.load(Html.Current.Id.get());
        var deviceInformation = Convert(oldDeviceInformation, newDeviceInformation);
        var oldName = deviceInformation.Name;
        deviceInformation.Name = name;
        delete deviceInformation["Selected"];
        var code = Property.Device.modify(deviceInformation);
        if (code) {
            deviceInformation.Name = oldName;
            AlertWindow.Close(function (code) {
                var txt = Language.service.exception.AlarmCenterException[code];
                Html.Control.GroupList.exceptionConfirm(txt);
            }, code);
        }
        else {
            PageEvent.Device.GroupListItemChanged(deviceInformation);
            AlertWindow.Close(function () {
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
    Factory: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtFactory").value = value;
            this.value = value;
        }
    },
    Version: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtVersion").value = value;
            this.value = value;
        }
    },
    SoftwareVersion: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtSoftwareVersion").value = value;
            this.value = value;
        }
    },
    ProtocolVersion: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtProtocolVersion").value = value;
            this.value = value;
        }
    },
    HardwareVersion: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtHardwareVersion").value = value;
            this.value = value;
        }
    },
}