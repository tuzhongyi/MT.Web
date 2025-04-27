/// <reference path="../../../client/client.js" />
/// <reference path="../../../howell.js/howell.convert.js" />
/// <reference path="../../../client/vehicle.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");

Vehicle_Device_Property["Device"] = {
    value: null,
    load: function (id) {
        var device = tryCatch(function () {
            return Client.Vehicle().Device.Get(id)
        });
        if (device)
            this.value = device;
        return device;
    },
    create: function (device) {
        return tryCatch(function () {
            return Client.Vehicle().Device.Create(device);
        });
    },
    modify: function (device) {
        return tryCatch(function () {
            return Client.Vehicle().Device.Set(device);
        });
    },
}

Vehicle_Device_Html.Control["AlertWindow"] = {
    load: function (id) {
        var result = Vehicle_Device_Property.Device.load(id);
        this.Id.set(result.Id);
        this.Name.set(result.Name);
        this.CreationTime.set(result.CreationTime);
        this.Model.set(result.Model);
        this.Description.set(result.Description);
        this.Username.set(result.Username);
        this.Password.set(result.Password);
        this.AccessId.set(result.AccessId);
    },
    create: function (device) {
        var isTrue = Vehicle_Device_Property.Device.create(device);
        if (isTrue) {
            AlertWindow.Close();
            VehicleDevicePageEvent.Device.GroupListReload(1, Vehicle_Device_Property.PageSize * LazyLoadPage.PageIndex);
        }
    },
    modify: function (device) {
        var isTrue = Vehicle_Device_Property.Device.modify(device);
        if (isTrue) {
            if (!Vehicle_Device_Property.DeviceList.value[device.Id]["Selected"])
                device["Selected"] = false;
            else
                device["Selected"] = Vehicle_Device_Property.DeviceList.value[device.Id]["Selected"];
            Vehicle_Device_Property.DeviceList.value[device.Id] = device;
            AlertWindow.Close(VehicleDevicePageEvent.Device.GroupListItemChanged, device);
        }
    },
    IsModify:
    {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            var title = "创建车牌识别设备";
            if (value) {
                title = "设置车牌识别设备";
                getTag("txtAccessId").readOnly = "readonly";
            }
            else {
                getTag("divId").style.display = "none";
                getTag("divCreationTime").style.display = "none";
            }
            getTag("lblDeviceDetailTitle").innerText = title;
            this.value = value;
        }
    },
    Id: {
        set: function (value) {
            getTag("txtId").value = value;
        }
    },
    CreationTime: {
        set: function (value) {
            getTag("txtCreationTime").value = Convert.ToDate(value).format("yyyy-MM-dd HH:mm:ss");
        }
    },
    Name: {
        set: function (value) {
            getTag("txtName").value = value;
        }
    },
    Model: {
        set: function (value) {
            getTag("txtModel").value = value;
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
    Description: {
        set: function (value) {
            getTag("txtDescription").value = value;
        }
    },
    AccessId: {
        set: function (value) {
            getTag("txtAccessId").value = value;
        }
    }
}