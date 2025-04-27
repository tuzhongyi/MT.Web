/// <reference path="../../../client/client.js" />
/// <reference path="../../../howell.js/howell.convert.js" />
/// <reference path="../../../client/gps.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");

GPS_Device_Property["Status"] = {
    load: function (id) {
        var device = tryCatch(function () {
            return Client.GPS().Device.Get(id)
        });
        return device;
    }
}

GPS_Device_Html.Control["Status"] = {
    load: function (id) {
        var result = GPS_Device_Property.Status.load(id);
        if (result && result.GPSStatus && result.GPSStatusSpecified) {
            if (result.GPSStatus.Latitude && result.GPSStatus.Longitude)
                document.getElementById("aLocation").style.display = "block";
            this.Time.set(result.GPSStatus.Time);
            this.LatitudeLongitude.set(result.GPSStatus);
            this.Speed.set(result.GPSStatus.Speed);
            this.Course.set(result.GPSStatus.Course);
            this.MagneticVariation.set(result.GPSStatus.MagneticVariation);
            this.Altitude.set(result.GPSStatus.Altitude);
            this.SystemUpTime.set(result.GPSStatus.SystemUpTime);
            this.Battery.set(result.GPSStatus.Battery);
            this.SignalIntensity.set(result.GPSStatus.SignalIntensity);
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
    Speed: {
        set: function (value) {
            if (value)
                getTag("txtSpeed").value = value + "Km/h";
        }
    },
    Course: {
        set: function (value) {
            if (value) {
                getTag("txtCourse").value = value + "°";
                var ico = document.getElementById("lblCourse");
                ico.style.display = "block";
                ico.style.transform = "rotate(" + (value - 45) + "deg)";
            }
        }
    },
    MagneticVariation: {
        set: function (value) {
            if (value) {
                getTag("txtMagneticVariation").value = value + "°";
                var ico = document.getElementById("lblMagneticVariation");
                ico.style.display = "block";
                ico.style.transform = "rotate(" + (value - 45) + "deg)";
            }
        }
    },
    Altitude: {
        set: function (value) {
            if (value)
                getTag("txtAltitude").value = value + "米";
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

