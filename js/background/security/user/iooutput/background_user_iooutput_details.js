if (!this.Client)
    imported.loadJS("js/client/client.js");


Property["IOOutput"] = {
    load: function (userId, iooutputId) {
        return tryCatch(function () {
            return Property.IOOutputList.Association.get(userId, iooutputId);
        });
    },
    modify: function (iooutput) {
        return tryCatch(function () {
            return Client.Security().User.IO.Output.Set(Html.Current.Id.get(), iooutput);
        });
    },
}

Html.Control.PopoverWindow.IOOutputList.AlertWindow["Details"] = {
    load: function (userId, iooutputId) {
        var result = Property.IOOutput.load(userId, iooutputId);
        if (result) {
            //this.Permissions.value = new Object();
            this.Name.set(result.Name);
            this.IOOutput.set(result.IOOutputChannel);
            this.Permissions.set(result.Permission);

            //var permission = Flags.Parse(result.Permission);

            //if (permission.Value.indexOf("All") >= 0)
            //    permission.AllToItems(IOOutputPermissions);

            //if (permission.Value[0] != IOOutputPermissions.None) {
            //    for (var i = 0; i < permission.Value.length; i++) {
            //        this.Permissions.set(permission.Value[i], true);
            //    }
            //}
        }
    },
    modify: function (iooutput) {
        Property.IOOutput.modify(iooutput);
    },
    Name: {
        set: function (value) {
            getTag("txtPermissionName").value = value;
            this.value = value;
        }
    },
    IOOutput: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        }
    },
    Permissions: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        }
        //value: new Object(),
        //count: function () {
        //    var result = 0;
        //    for (var key in this.value) {
        //        result++;
        //    }
        //    return result;
        //},
        //set: function (key, value) {
        //    if (value)
        //        this.value[key] = key;
        //    else
        //        delete this.value[key];
        //},
        //getString: function () {
        //    if (this.count() == 0)
        //        return IOOutputPermissions.None;
        //    if (this.count() == 1)
        //        return IOOutputPermissions.All;

        //    var flags = new Flags(this.value);
        //    return flags.toString();
        //},
        //getLanguageString: function () {
        //    if (this.count() == 0)
        //        return Language.Enum.IOOutputPermissions.None;
        //    if (this.count() == 1)
        //        return Language.Enum.IOOutputPermissions.All;

        //    var _enum = new Object();
        //    for (var v in this.value) {
        //        _enum[v] = Language.Enum.IOOutputPermissions[v];
        //    }
        //    var flags = new Flags(_enum);
        //    return flags.toString();
        //},
    },
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.iooutputId)
            return uri.Querys.iooutputId;
        return null;
    },
}