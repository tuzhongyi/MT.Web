if (!this.Client)
    imported.loadJS("js/client/client.js");


Property["Device"] = {
    load: function (userId,deviceId) {
        return tryCatch(function () {
            return Property.DeviceList.Association.get(userId, deviceId);
        });
    },
    modify: function (device) {
        return tryCatch(function () {
            return Client.Security().User.Device.Set(Html.Current.Id.get(), device);
        });
    },
}

Html.Control.PopoverWindow.DeviceList.AlertWindow["Details"] = {
    load: function (userId, deviceId) {
        var result = Property.Device.load(userId, deviceId);
        this.Permissions.value = new Object();
        this.Name.set(result.Name);
        this.Device.set(result.Device);
        this.Permissions.set(result.Permission);

        var permission = Flags.Parse(result.Permission);

        if (permission.Value.indexOf("All") >= 0)
            permission.AllToItems(DevicePermissions);

        if (permission.Value[0] != DevicePermissions.None) {
            for (var i = 0; i < permission.Value.length; i++) {
                this.Permissions.set(permission.Value[i], true);
            }
        }
    },
    modify: function (device) {
        Property.Device.modify(device);
    },
    Name: {
        set: function (value) {
            getTag("txtPermissionName").value = value;
            this.value = value;
        }
    },
    Device: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        }
    },
    Permissions: {
        value: new Object(),
        count: function () {
            var result = 0;
            for (var key in this.value) {
                result++;
            }
            return result;
        },
        set: function (key, value) {
            if (value)
                this.value[key] = key;
            else
                delete this.value[key];
        },
        getString: function () {
            if (this.count() == 0)
                return DevicePermissions.None;
            if (this.count() == 3)
                return DevicePermissions.All;

            var flags = new Flags(this.value);
            return flags.toString();
        },
        getLanguageString: function () {
            if (this.count() == 0)
                return Language.Enum.DevicePermissions.None;
            if (this.count() == 3)
                return Language.Enum.DevicePermissions.All;

            var _enum = new Object();
            for (var v in this.value) {
                _enum[v] = Language.Enum.DevicePermissions[v];
            }
            var flags = new Flags(_enum);
            return flags.toString();
        },
    },
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.deviceId)
            return uri.Querys.deviceId;
        return null;
    },
}