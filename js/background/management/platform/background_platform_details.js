if (!this.Client)
    imported.loadJS("/js/client/client.js");

Platform_Property["Platform"] = {
    value: null,
    load: function (id) {
        var platform = tryCatch(function () {
            return Client.Management().Platforms.Get(id)
        });
        if (platform)
            this.value = platform
        return platform;
    },
    create: function (platform) {
        return tryCatch(function () {
            return Client.Management().Platforms.Create(platform);
        });
    },
    modify: function (platform) {
        return tryCatch(function () {
            return Client.Management().Platforms.Set(platform);
        });
    },
    capabilities: {
        value: new Array(),
        get: function () {
            return tryCatch(function () {
                return Client.Management().Platforms.Capabilities();
            });
        }
    }
}

Platform_Html.Control["AlertWindow"] = {
    load: function (id) {
        var result = Platform_Property.Platform.load(id);
        this.Id.set(result.Id);
        this.AuthenticationCode.set(result.AuthenticationCode);
        this.Name.set(result.Name);
        this.Manufacturer.set(result.Manufacturer);
        this.Model.set(result.Model);
        this.Firmware.set(result.Firmware);
        this.SerialNumber.set(result.SerialNumber);
        this.PointOfSale.set(result.PointOfSale);
        this.Information.set(result.Information);
        this.Username.set(result.Username);
        this.Password.set(result.Password);
        this.Uri.set(result.Uri);
        this.ProtocolType.set(result.ProtocolType);
    },
    create: function (platform) {
        Platform_Property.Platform.create(platform);
        AlertWindow.Close();
        PageEvent.Platform.GroupListReload(1, Platform_Property.PageSize * LazyLoadPage.PageIndex);
    },
    modify: function (platform) {
        Platform_Property.Platform.modify(platform);
        AlertWindow.Close(PageEvent.Platform.GroupListItemChanged, platform);
    },
    IsModify:
    {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("lblPlatformDetailTitle").value = value ? "设置平台信息" : "创建平台信息";
            this.value = value;
        }
    },
    Id: {
        set: function (value) {
            getTag("txtId").value = value;
        }
    },
    AuthenticationCode: {
        set: function (value) {
            getTag("txtAuthenticationCode").value = value;
        }
    },
    Name: {
        set: function (value) {
            getTag("txtName").value = value;
        }
    },
    Manufacturer: {
        set: function (value) {
            getTag("txtManufacturer").value = value;
        }
    },
    Model: {
        set: function (value) {
            getTag("txtModel").value = value;
        }
    },
    Firmware: {
        set: function (value) {
            getTag("txtFirmware").value = value;
        }
    },
    SerialNumber: {
        set: function (value) {
            getTag("txtSerialNumber").value = value;
        }
    },
    PointOfSale: {
        set: function (value) {
            getTag("txtPointOfSale").value = value;
        }
    },
    Information: {
        set: function (value) {
            getTag("txtInformation").value = value;
        }
    },
    Username: {
        set: function (value) {
            getTag("txtUsername").value = value;
        }
    },
    Password: {
        set: function (value) {
            getTag("txtPassword").value = value;
        }
    },
    Uri: {
        set: function (value) {
            var uri = new Uri(value);
            var ipArray = uri.Host.split(".");
            for (var i = 0; i < ipArray.length; i++) {
                getTag("txtIP" + (i + 1).toString()).value = ipArray[i];
            }
            getTag("txtPort").value = uri.Port;
        }
    },
    ProtocolType: {
        set: function (value) {
            getTag("ddlProtocolType").value = value;
        }
    },
}