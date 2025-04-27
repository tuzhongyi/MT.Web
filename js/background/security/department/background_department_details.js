if (!this.Client)
    imported.loadJS("/js/client/client.js");

Property["Department"] = {
    value: null,
    load: function (id) {
        var department = tryCatch(function () {
            return Client.Security().Department.Get(id);
        });
        if (department)
            this.value = department
        return department;
    },
    create: function (department) {
        return tryCatch(function () {
            return Client.Security().Department.Create(department);
        });
    },
    modify: function (department) {
        return tryCatch(function () {
            return Client.Security().Department.Set(department);
        });
    },
}

Html.Control["AlertWindow"] = {
    load: function (id) {
        var result = Property.Department.load(id);
        this.Permission.value = new Object();
        this.Name.set(result.Name);
        this.Information.set(result.Information);
        this.Permission.set(result.Permission);

        var permission = Flags.Parse(result.DetailPermission);

        if (permission.Value.indexOf("All") >= 0)
            permission.AllToItems(UserPermissions);

        if (permission.Value[0] != UserPermissions.None) {
            for (var i = 0; i < permission.Value.length; i++) {
                this.DetailPermission.set(permission.Value[i], true);
            }
        }
    },
    create: function (department) {
        Property.Department.create(department);
        AlertWindow.Close();
        PageEvent.Department.GroupListReload(1, Property.PageSize * LazyLoadPage.PageIndex, Property.UserPermission);
    },
    modify: function (department) {
        Property.Department.modify(department);
        AlertWindow.Close(PageEvent.Department.GroupListItemChanged, department);
    },
    IsModify:
    {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("lblDepartmentDetailTitle").value = value ? "设置输入通道" : "创建输入通道";
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
    Information: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtInformation").value = value;
            this.value = value;
        }
    },
    Permission: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("ddlPermission").value = value;
            var status = value == UserPermission.Extended ? "block" : "none";
            document.getElementById("divTitleDetailPermission").style.display = status;
            document.getElementById("divDetailPermission").style.display = status;
            this.value = value;
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