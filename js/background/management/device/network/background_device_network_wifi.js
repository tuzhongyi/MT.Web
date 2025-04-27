if (!this.Client)
    imported.loadJS("/js/client/client.js");

Property["WiFi"] = {
    load: function (deviceId) {
        return Client.Management().Device.WiFi.Get(deviceId);
    },
    modify: function (deviceId, wifi) {
        try {
            Client.Management().Device.WiFi.Set(deviceId, wifi);
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
                $.confirm({
                    text: "操作失败",
                    okButton: "确定",
                    cancelButtonClass: "hide-tag",
                });
            }, code);
        }
        else {
            AlertWindow.Close(function () {
                PageEvent.Device.GroupListItemChanged(Property.DeviceList.get(Html.Current.Id.get()));
                $.confirm({
                    text: "操作成功",
                    okButton: "确定",
                    cancelButtonClass: "hide-tag",
                });
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