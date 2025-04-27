if (!this.Client)
    imported.loadJS("/js/client/client.js");

Property["Device"] = {
    value: null,
    load: function (id) {
        var device = tryCatch(function () {
            return Client.Management().Device.Get(id);
        });
        if (device)
            this.value = device;
        return device;
    },
    create: function (device) {
        return tryCatch(function () {
            return Client.Management().Device.Create(device);
        });
    },
    modify: function (device) {
        return tryCatch(function () {
            return Client.Management().Device.Set(device);
        });
    },
    capabilities: function (classification) {
        return tryCatch(function () {
            return Client.Management().Device.Capabilities(classification);
        });
    },
    createVideoInput: function (id, input) {
        return tryCatch(function () {
            return Client.Management().Device.Video.Input.Create(id, input);
        });
    },
    createNetworkInterface: function (id, network) {
        return tryCatch(function () {
            return Client.Management().Device.Network.Create(id, network);
        });
    },
    createIOInput: function (id, input) {
        return tryCatch(function () {
            return Client.Management().Device.IO.Input.Create(id, input);
        });
    },
    createIOOutput: function (id, output) {
        return tryCatch(function () {
            return Client.Management().Device.IO.Output.Create(id, output);
        });
    }
}

Html.Control["AlertWindow"] = {
    deviceProtocolCapabilities: new Object(),
    load: function (id) {
        var result = Property.Device.load(id);
        this.Id.set(result.Id);
        this.PlatformId.set(result.PlatformId);
        this.PlatformAccessId.set(result.PlatformAccessId);
        this.Name.set(result.Name);
        this.Manufacturer.set(result.Manufacturer);
        this.Model.set(result.Model);
        this.Firmware.set(result.Firmware);
        this.Username.set(result.Username);
        this.Password.set(result.Password);
        this.SerialNumber.set(result.SerialNumber);
        this.PointOfSale.set(result.PointOfSale);
        this.Information.set(result.Information);
        this.Uri.set(result);
        this.Classification.set(result.Classification);
        this.BusAddress.set(result.BusAddress);
        this.HasSubDevice.set(result.HasSubDevice);
        this.PlatformFileSourceType.set(result.PlatformFileSourceType);
    },
    create: function (device) {
        var id = Property.Device.create(device);
        if (device.Classification == DeviceClassification.IPCamera && id) {
            var network = new NetworkInterface();
            network.InterfacePort = 1;
            network.PhyscialAddress = "00-00-00-00-00-00";
            network.IPAddress.IPv4Address.Address = "0.0.0.0";
            network.IPAddress.IPv4Address.Subnetmask = "0.0.0.0";
            network.IPAddress.IPv4Address.DefaultGateway = "0.0.0.0";
            Property.Device.createNetworkInterface(id, network);
            var videoInput = new VideoInputChannel();
            videoInput.Name = device.Name;
            Property.Device.createVideoInput(id, videoInput);
            var IOinput = new IOInputChannel();
            IOinput.Name = "IN_001"; //报警输入名称//N
            Property.Device.createIOInput(id, IOinput);
            var IOoutput = new IOOutputChannel();
            IOoutput.Name = "OUT_001";
            IOoutput.TriggeringTypeSpecified = true;
            Property.Device.createIOOutput(id, IOoutput);
        }
        AlertWindow.Close();
        PageEvent.Device.GroupListReload(1, Property.PageSize * LazyLoadPage.PageIndex, Property.Classification);
    },
    batchCreate: function (devices) {
        var count = 0;
        AlertWindow.Close();
        $.confirm({
            text: "<span>正在创建设备,请勿点击页面做任何操作...</span><span id='test'>0</span>/" + devices.length + "<i class='icon-spinner icon-spin'></i>",
            okButton: "",
            cancelButton: "",
            okButtonClass: "none-btn",
            cancelButtonClass: "none-btn",
        });
        var timer = setInterval(function () {
            var tag = document.getElementById("test");
            var id = Property.Device.create(devices[count]);
            if (devices[count].Classification == DeviceClassification.IPCamera && id) {
                var network = new NetworkInterface();
                network.InterfacePort = 1;
                network.PhyscialAddress = "00-00-00-00-00-00";
                network.IPAddress.IPv4Address.Address = "0.0.0.0";
                network.IPAddress.IPv4Address.Subnetmask = "0.0.0.0";
                network.IPAddress.IPv4Address.DefaultGateway = "0.0.0.0";
                Property.Device.createNetworkInterface(id, network);
                var videoInput = new VideoInputChannel();
                videoInput.Name = devices[count].Name;
                Property.Device.createVideoInput(id, videoInput);
                var IOinput = new IOInputChannel();
                IOinput.Name = "IN_001"; //报警输入名称//N
                Property.Device.createIOInput(id, IOinput);
                var IOoutput = new IOOutputChannel();
                IOoutput.Name = "OUT_001";
                IOoutput.TriggeringTypeSpecified = true;
                Property.Device.createIOOutput(id, IOoutput);
            }
            if (count == devices.length - 1) {
                clearInterval(timer);
                AlertWindow.Close();
                PageEvent.Device.GroupListReload(1, Property.PageSize * LazyLoadPage.PageIndex, Property.Classification);
            }
            count++;
            tag.innerText = count;
        }, 1000);
    },
    modify: function (device) {
        Property.Device.modify(device);
        if (!Property.DeviceList.value[device.Id]["Selected"])
            device["Selected"] = false;
        else
            device["Selected"] = Property.DeviceList.value[device.Id]["Selected"];
        Property.DeviceList.value[device.Id] = device;
        AlertWindow.Close(PageEvent.Device.GroupListItemChanged, device);
    },
    IsModify:
    {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            var title = "创建设备";
            if (value) {
                title = "设置设备";
                getTag("ddlDetailClassification").disabled = "disabled";
            }
            else {
                document.getElementById("txtBusAddress").value = 0;
                getTag("divId").style.display = "none";
                getTag("divPlatformId").style.display = "none";
                getTag("divPlatformAccessId").style.display = "none";
                getTag("divPlatformFileSourceType").style.display = "none";
            }
            getTag("lblDeviceDetailTitle").innerText = title;
            this.value = value;
        }
    },
    IsBatch: {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        }
    },
    Id: {
        set: function (value) {
            getTag("txtId").value = value;
        }
    },
    PlatformId: {
        set: function (value) {
            if (value)
                getTag("txtPlatformId").value = value;
        }
    },
    PlatformAccessId: {
        set: function (value) {
            if (value)
                getTag("txtPlatformAccessId").value = value;
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
    Uri: {
        set: function (value) {
            var uri = new Uri(value.Uri);
            var ipArray = uri.Host.split(".");
            for (var i = 0; i < ipArray.length; i++) {
                getTag("txtIP" + (i + 1).toString()).value = ipArray[i];
            }
            getTag("txtPort").value = uri.Port;
        }
    },
    Classification: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("ddlDetailClassification").value = value;
            this.value = value;
        }
    },
    BusAddress: {
        set: function (value) {
            getTag("txtBusAddress").value = value
        }
    },
    HasSubDevice: {
        set: function (value) {
            getTag("chkHasSubDevice").checked = value
        }
    },
    PlatformFileSourceType:{
        set: function (value) {
            //if (value || value == 0) {
                getTag("ddlPlatformFileSourceType").value = value
            //}
        }
    },
    Device: {
        Video: {},
        IO: {}
    }
}