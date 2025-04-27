if (!this.Client)
    imported.loadJS("js/client/client.js");

Property["User"] = {
    value: null,
    load: function (id) {
        var user = tryCatch(function () {
            return Client.Security().User.Get(id);
        });
        if (user)
            this.value = user;
        return user
    },
    create: function (user) {
        return tryCatch(function () {
            return Client.Security().User.Create(user);
        });
    },
    modify: function (user) {
        return tryCatch(function () {
            return Client.Security().User.Set(user);
        });
    },
}


Html.Control["AlertWindow"] = {
    load: function (id) {
        var result = Property.User.load(id);
        this.Name.set(result.Username);
        this.Nickname.set(result.Nickname);
        this.Sex.set(result.Sex);
        this.Password.set(result.Password);
        this.Mobile.set(result.Mobile);
        this.Phone.set(result.Phone);
        this.UniformedId.set(result.UniformedId);
        this.Information.set(result.Information);
        this.Permission.set(result.Permission);
        this.Duty.set(result.Duty);

        var permission = Flags.Parse(result.DetailPermission);

        if (permission.Value.indexOf("All") >= 0)
            permission.AllToItems(UserPermissions);

        if (permission.Value[0] != UserPermissions.None) {
            for (var i = 0; i < permission.Value.length; i++) {
                this.DetailPermission.set(permission.Value[i], true);
            }
        }
    },
    create: function (user) {
        Property.User.create(user);
        AlertWindow.Close();
        PageEvent.User.GroupListReload(1, Property.PageSize * LazyLoadPage.PageIndex, Property.UserPermission);
    },
    modify: function (user) {
        Property.User.modify(user);
        AlertWindow.Close(PageEvent.User.GroupListItemChanged, user);
    },
    IsModify:
    {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            var title = "创建用户";
            if (value) {
                title = "设置用户";
            }
            getTag("lblUserDetailTitle").innerText = title;
            this.value = value;
        }
    },
    Name: {
        set: function (value) {
            getTag("txtName").value = value;
        }
    },
    Nickname: {
        set: function (value) {
            getTag("txtNickname").value = value;
        }
    },
    Sex: {
        set: function (value) {
            if (value != Sex.None) {
                getTag("rdo" + value).checked = true;
            }
        }
    },
    Password: {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        },
    },
    Mobile: {
        set: function (value) {
            getTag("txtMobile").value = value;
        }
    },
    Phone: {
        set: function (value) {
            getTag("txtPhone").value = value;
        }
    },
    UniformedId: {
        set: function (value) {
            getTag("txtUniformedId").value = value;
        }
    },
    Duty: {
        set: function (value) {
            getTag("txtDuty").value = value;
        }
    },
    Information: {
        set: function (value) {
            getTag("txtInformation").value = value;
        }
    },
    Permission: {
        set: function (value) {
            getTag("ddlPermission").value = value;
            var status = value == UserPermission.Extended ? "block" : "none";
            getTag("divTitleDetailPermission").style.display = status;
            getTag("divDetailPermission").style.display = status;
        }
    },
    DetailPermission: {
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
                return UserPermissions.None;
            if (this.count() == 4)
                return UserPermissions.All;

            var flags = new Flags(this.value);
            return flags.toString();
        },
        getLanguageString: function () {
            if (this.count() == 0)
                return Language.Enum.UserPermissions.None;
            if (this.count() == 4)
                return Language.Enum.UserPermissions.All;

            var _enum = new Object();
            for (var v in this.value) {
                _enum[v] = Language.Enum.UserPermissions[v];
            }
            var flags = new Flags(_enum);
            return flags.toString();
        },
    }
}