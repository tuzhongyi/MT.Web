if (!this.Client)
    imported.loadJS("/js/client/client.js");

Property["Detector"] = {
    value: null,
    load: function (id) {
        var detector = tryCatch(function () {
            return Client.Detector().Detector.Get(id)
        });
        if (detector)
            this.value = detector;
        return detector;
    },
    create: function (detector) {
        return tryCatch(function () {
            return Client.Detector().Detector.Create(detector);
        });
    },
    modify: function (detector) {
        return tryCatch(function () {
            return Client.Detector().Detector.Set(detector);
        });
    },
}

Html.Control["AlertWindow"] = {
    load: function (id) {
        var result = Property.Detector.load(id);
        this.Name.set(result.Name);
        this.Uri.set(result.Uri);
        this.Username.set(result.Username);
        this.Password.set(result.Password);
        this.ClientIPAddress.set(result.ClientIPAddress);
        this.ClientPort.set(result.ClientPort);
        this.BaudRate.set(result.BaudRate);
        this.Description.set(result.Description);
        this.ConnectionMode.set(result.ConnectionMode);
    },
    create: function (detector) {
        Property.Detector.create(detector);
        AlertWindow.Close();
        PageEvent.Detector.GroupListReload(1, Property.PageSize * LazyLoadPage.PageIndex);
    },
    modify: function (detector) {
        Property.Detector.modify(detector);
        if (!Property.DetectorList.value[detector.Id]["Selected"])
            detector["Selected"] = false;
        else
            detector["Selected"] = Property.DetectorList.value[detector.Id]["Selected"];
        Property.DetectorList.value[detector.Id] = detector;
        AlertWindow.Close(PageEvent.Detector.GroupListItemChanged, detector);
    },
    IsModify:
    {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            var title = "创建智能检测器";
            if (value) {
                title = "设置智能检测器";
            }
            getTag("lblDetectorDetailTitle").innerText = title;
            this.value = value;
        }
    },
    Name: {
        set: function (value) {
            getTag("txtName").value = value;
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
            getTag("txtUri").value = value;
        }
    },
    ClientIPAddress: {
        set: function (value) {
            var ipArray = value.split(".");
            for (var i = 0; i < ipArray.length; i++) {
                getTag("txtClientIP" + (i + 1).toString()).value = ipArray[i];
            }
        }
    },
    ClientPort: {
        set: function (value) {
            getTag("txtClientPort").value = value;
        }
    },
    BaudRate: {
        set: function (value) {
            getTag("ddlBaudRate").value = value;
        }
    },
    Description: {
        set: function (value) {
            getTag("txtDescription").value = value;
        }
    },
    ConnectionMode: {
        set: function (value) {
            getTag("ddlConnectionMode").value = value;
        }
    }
}