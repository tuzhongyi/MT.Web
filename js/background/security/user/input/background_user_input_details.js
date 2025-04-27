if (!this.Client)
    imported.loadJS("js/client/client.js");


Property["Input"] = {
    load: function (userId,inputId) {
        return tryCatch(function () {
            return Property.InputList.Association.get(userId, inputId);
        });
    },
    modify: function (input) {
        return tryCatch(function () {
            return Client.Security().User.Video.Input.Set(Html.Current.Id.get(), input);
        });
    },
}

Html.Control.PopoverWindow.InputList.AlertWindow["Details"] = {
    load: function (userId, inputId) {
        var result = Property.Input.load(userId, inputId);
        this.Permissions.value = new Object();
        this.Name.set(result.Name);
        this.Input.set(result.VideoInputChannel);
        this.Permissions.set(result.Permission);

        var permission = Flags.Parse(result.Permission);

        if (permission.Value.indexOf("All") >= 0)
            permission.AllToItems(VideoSourcePermissions);

        if (permission.Value[0] != VideoSourcePermissions.None) {
            for (var i = 0; i < permission.Value.length; i++) {
                this.Permissions.set(permission.Value[i], true);
            }
        }
    },
    modify: function (input) {
        Property.Input.modify(input);
    },
    Name: {
        set: function (value) {
            getTag("txtPermissionName").value = value;
            this.value = value;
        }
    },
    Input: {
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
                return VideoSourcePermissions.None;
            if (this.count() == 4)
                return VideoSourcePermissions.All;

            var flags = new Flags(this.value);
            return flags.toString();
        },
        getLanguageString: function () {
            if (this.count() == 0)
                return Language.Enum.VideoSourcePermissions.None;
            if (this.count() == 4)
                return Language.Enum.VideoSourcePermissions.All;

            var _enum = new Object();
            for (var v in this.value) {
                _enum[v] = Language.Enum.VideoSourcePermissions[v];
            }
            var flags = new Flags(_enum);
            return flags.toString();
        },
    },
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.inputId)
            return uri.Querys.inputId;
        return null;
    },
}