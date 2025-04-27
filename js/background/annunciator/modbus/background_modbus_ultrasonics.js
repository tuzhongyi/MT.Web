if (!this.Client)
    imported.loadJS("/js/client/client.js");

Property["Ultrasonic"] = {
    load: function (deviceId) {
        return Client.Modbus().Device.Ultrasonic.Get(deviceId);
    },
    modify: function (deviceId, ultrasonic) {
        try {
            Client.Modbus().Device.Ultrasonic.Set(deviceId, ultrasonic);
        }
        catch (e) {
            return e.number;
        }
    },
}

Html.Control.AlertWindow["Ultrasonic"] = {
    load: function (id) {
        var result = Property.Ultrasonic.load(id);
        this.Name.set(Property.DeviceList.get(id).Name);
        this.Interval.set(result.Interval);
        this.Range.set(result.Range);
        this.MaxRange.set(result.MaxRange);
    },
    modify: function (ultrasonicInformation) {
        var code = Property.Ultrasonic.modify(Html.Current.Id.get(), ultrasonicInformation);
        if (code) {
            AlertWindow.Close(function (code) {
                var txt = Language.service.exception.AlarmCenterException[code];
                Html.Control.GroupList.exceptionConfirm(txt);
            }, code);
        }
        else {
            AlertWindow.Close(function () {
                Html.Control.GroupList.successConfirm();
            });
        }
    },
    Name:{
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtName").value = value;
            this.value = value;
        }
    },
    Interval: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtInterval").value = value;
            this.value = value;
        }
    },
    Range: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtRange").value = value;
            this.value = value;
        }
    },
    MaxRange: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtMaxRange").value = value;
            this.value = value;
        }
    },
}