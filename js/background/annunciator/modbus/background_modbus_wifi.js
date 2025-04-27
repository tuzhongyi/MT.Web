/// <reference path="../../../howell.js/httpService.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");

Property["WiFi"] = {
    load: function (deviceId) {
        return Client.Modbus().Device.Network.WiFi.Get(deviceId);

    },
    modify: function (deviceId, wifi) {
        try {
            Client.Modbus().Device.Network.WiFi.Set(deviceId, wifi);
        }
        catch (e) {
            return e.number;
        }
    },
}

Html.Control.AlertWindow["WiFi"] = {
    load: function (id) {
        var result = Property.WiFi.load(id);        
        this.DeviceName.set(Property.DeviceList.get(id).Name);
        this.Name.set(result.Name);
        this.Password.set(result.Password);
        this.Channel.set(result.Channel);
        this.Intensity.set(result.Intensity);
    },
    modify: function (wifi) {
        var code = Property.WiFi.modify(Html.Current.Id.get(), wifi);
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
    DeviceName: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtDeviceName").value = value;
            this.value = value;
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
    Password: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtPassword").value = value;
            this.value = value;
        }
    },
    Channel: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtChannel").value = value;
            this.value = value;
        }
    },
    Intensity: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtIntensity").value = value;
            this.value = value;
        }
    },
}