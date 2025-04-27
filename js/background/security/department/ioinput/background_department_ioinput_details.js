if (!this.Client)
    imported.loadJS("js/client/client.js");


Property["IOInput"] = {
    load: function (departmentId, ioinputId) {
        return tryCatch(function () {
            return Property.IOInputList.Association.get(departmentId, ioinputId);
        });
    },
    modify: function (ioinput) {
        return tryCatch(function () {
            return Client.Security().Department.IO.Input.Set(Html.Current.Id.get(), ioinput);
        });
    },
}

Html.Control.PopoverWindow.IOInputList.AlertWindow["Details"] = {
    load: function (departmentId, ioinputId) {
        var result = Property.IOInput.load(departmentId, ioinputId);
        this.Permissions.value = new Object();
        this.Name.set(result.Name);
        this.IOInput.set(result.IOInputChannel);
        this.Permissions.set(result.Permission);

        var permission = Flags.Parse(result.Permission);

        if (permission.Value.indexOf("All") >= 0)
            permission.AllToItems(IOInputPermissions);

        if (permission.Value[0] != IOInputPermissions.None) {
            for (var i = 0; i < permission.Value.length; i++) {
                this.Permissions.set(permission.Value[i], true);
            }
        }
    },
    modify: function (ioinput) {
        Property.IOInput.modify(ioinput);
    },
    Name: {
        set: function (value) {
            getTag("txtPermissionName").value = value;
            this.value = value;
        }
    },
    IOInput: {
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
                return IOInputPermissions.None;
            if (this.count() == 2)
                return IOInputPermissions.All;

            var flags = new Flags(this.value);
            return flags.toString();
        },
        getLanguageString: function () {
            if (this.count() == 0)
                return Language.Enum.IOInputPermissions.None;
            if (this.count() == 2)
                return Language.Enum.IOInputPermissions.All;

            var _enum = new Object();
            for (var v in this.value) {
                _enum[v] = Language.Enum.IOInputPermissions[v];
            }
            var flags = new Flags(_enum);
            return flags.toString();
        },
    },
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.ioinputId)
            return uri.Querys.ioinputId;
        return null;
    },
}