if (!this.Client)
    imported.loadJS("/js/client/client.js");

Property.Device["Acquisition"] = {
    load: function (id) {
        return tryCatch(function () {
        
            return Client.Management().Device.Acquisition.Get(id);
        });
        
    },
    set: function (id, acq) {
        return tryCatch(function () {
            return Client.Management().Device.Acquisition.Put(id, acq);
        });
    },
}

Html.Control.AlertWindow["Acquisition"] = {
    load: function (id) {
        var result = Property.Device.Acquisition.load(id);
        if (result) {
            this.Address.set(result.Address);
            this.Port.set(result.Port);
            var device = Property.DeviceList.get(id);
            this.AuthenticationCode.set(device.AuthenticationCode)
            if (result.ProtocolVersion) {
                this.ProtocolVersion.set(result.ProtocolVersion);
            }
            if (result.TimeSynchronization) {
                this.TimeSynchronization.set(result.TimeSynchronization);
            }
        }
    },
    set: function (id, acq) {
        Property.Device.Acquisition.set(id, acq);
        AlertWindow.Close();
    },
    Address: {
        set: function (value) {
            getTag("txtAddress").value = value;
        }
    },
    Port: {
        set: function (value) {
            getTag("txtPort").value = value;
        }
    },
    AuthenticationCode:{
        set: function (value) {
            getTag("txtAuthenticationCode").value = value;
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
    TimeSynchronization: {
        set: function (value) {
            getTag("chkTimeSynchronization").checked = value
        }
    },
}