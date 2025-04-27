/// <reference path="../../../client/client.js" />
/// <reference path="../../../howell.js/howell.convert.js" />
/// <reference path="../../../client/vehicle.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");

Vehicle_Device_Property["Status"] = {
    load: function (id) {
        var device = tryCatch(function () {
            return Client.Vehicle().Device.Get(id)
        });
        return device;
    }
}

Vehicle_Device_Html.Control["Status"] = {
    load: function (id) {
        var result = Vehicle_Device_Property.Status.load(id);
        if (result && result.VehiclePlateDeviceStatus && result.VehiclePlateDeviceStatusSpecified) {
            if (result.VehiclePlateDeviceStatus.Latitude && result.VehiclePlateDeviceStatus.Longitude)
                document.getElementById("aLocation").style.display = "block";
            this.Time.set(result.VehiclePlateDeviceStatus.Time);
            this.LatitudeLongitude.set(result.VehiclePlateDeviceStatus);
            this.SystemUpTime.set(result.VehiclePlateDeviceStatus.SystemUpTime);
            this.Battery.set(result.VehiclePlateDeviceStatus.Battery);
            this.SignalIntensity.set(result.VehiclePlateDeviceStatus.SignalIntensity);
        }
    },
    Time: {
        set: function (value) {
            getTag("txtTime").value = Convert.ToDate(value).format("yyyy-MM-dd HH:mm:ss");
        }
    },
    LatitudeLongitude: {
        set: function (value) {
            var latitude = "N/A";
            var longitude = "N/A";
            if (value.Latitude || value.Latitude == 0)
                latitude = value.Latitude;
            if (value.Longitude || value.Longitude == 0)
                longitude = value.Longitude;
            getTag("txtLatitudeLongitude").value = "经度:" + latitude + "   纬度:" + longitude;
        }
    },
    SystemUpTime: {
        set: function (value) {
            if (value)
                getTag("txtSystemUpTime").value = value + "秒";
        }
    },
    Battery: {
        set: function (value) {
            if (value)
                getTag("txtBattery").value = value + "%";
        }
    },
    SignalIntensity: {
        set: function (value) {
            if (value)
                getTag("txtSignalIntensity").value = value + "%";
        }
    },
}

