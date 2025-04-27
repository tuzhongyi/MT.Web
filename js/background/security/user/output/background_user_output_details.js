if (!this.Client)
    imported.loadJS("js/client/client.js");


Property["Output"] = {
    load: function (userId, outputId) {
        return tryCatch(function () {
            return Property.OutputList.Association.get(userId, outputId);
        });
    },
    modify: function (output) {
        return tryCatch(function () {
            return Client.Security().User.Video.Output.Set(Html.Current.Id.get(), output);
        });
    },
}

Html.Control.PopoverWindow.OutputList.AlertWindow["Details"] = {
    load: function (userId, outputId) {
        var result = Property.Output.load(userId, outputId);
        if (result) {
            //this.Permissions.value = new Object();
            this.Name.set(result.Name);
            this.Output.set(result.VideoOutputChannel);
            this.Permissions.set(result.Permission);

            //var permission = Flags.Parse(result.Permission);

            //if (permission.Value.indexOf("All") >= 0)
            //    permission.AllToItems(VideoOutSourcePermissions);

            //if (permission.Value[0] != VideoOutSourcePermissions.None) {
            //    for (var i = 0; i < permission.Value.length; i++) {
            //        this.Permissions.set(permission.Value[i], true);
            //    }
            //}
        }
    },
    modify: function (output) {
        Property.Output.modify(output);
    },
    Name: {
        set: function (value) {
            getTag("txtPermissionName").value = value;
            this.value = value;
        }
    },
    Output: {
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
        //        return VideoOutSourcePermissions.None;
        //    if (this.count() == 1)
        //        return VideoOutSourcePermissions.All;

        //    var flags = new Flags(this.value);
        //    return flags.toString();
        //},
        //getLanguageString: function () {
        //    if (this.count() == 0)
        //        return Language.Enum.VideoOutSourcePermissions.None;
        //    if (this.count() == 1)
        //        return Language.Enum.VideoOutSourcePermissions.All;

        //    var _enum = new Object();
        //    for (var v in this.value) {
        //        _enum[v] = Language.Enum.VideoOutSourcePermissions[v];
        //    }
        //    var flags = new Flags(_enum);
        //    return flags.toString();
        //},
    },
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.outputId)
            return uri.Querys.outputId;
        return null;
    },
}