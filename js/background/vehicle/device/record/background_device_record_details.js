Vehicle_Device_Record_Property["Record"] = {
    load: function (id) {
        return tryCatch(function () {
            return Vehicle_Device_Record_Property.RecordList.get(id);
        });
    },
}

Vehicle_Device_Record_Html.Control.AlertWindow["Record"] = {
    load: function (id) {
        var result = Vehicle_Device_Record_Property.Record.load(id);
        this.DeviceId.set(result.DeviceId)
        this.Name.set(result.Name);
        this.AccessId.set(result.AccessId);
        this.Plate.set(result.Plate);
        this.Brand.set(result);
        this.CreationTime.set(Convert.ToDate(result.CreationTime).format("yyyy-MM-dd HH:mm:ss"));
        this.Description.set(result.Description);
        this.Speed.set(result.Speed);
        this.LaneId.set(result.LaneId);
        this.LatitudeLongitude.set(result);
        this.PlatePosition.set(result.PlatePosition);
        this.PlateColor.set(result.PlateColor)
        this.VehicleColor.set(result.VehicleColor);
    },
    DeviceId: {
        set: function (value) {
            getTag("txtDeviceId").value = value;
        }
    },
    Name: {
        set: function (value) {
            getTag("txtName").value = value;
        }
    },
    Speed: {
        set: function (value) {
            getTag("txtSpeed").value = value;
        }
    },
    Brand: {
        set: function (value) {
            var brand = "";
            if (value.BrandSpecified == true)
                brand = value.Brand;
            if (value.ChildBrandSpecified == true)
                brand = value.ChildBrand;
            if (value.BrandSpecified == true && value.ChildBrandSpecified == true)
                brand = value.Brand + "-" + value.ChildBrand;
            getTag("txtBrand").value = brand;
        }
    },
    Plate: {
        set: function (value) {
            getTag("txtPlate").value = value;
        }
    },
    CreationTime: {
        set: function (value) {
            getTag("txtCreationTime").value = value;
        }
    },
    LaneId: {
        set: function (value) {
            getTag("txtLaneId").value = value;
        }
    },
    Description: {
        set: function (value) {
            getTag("txtDescription").value = value;
        }
    },
    LatitudeLongitude: {
        set: function (value) {
            var latitude = value.LatitudeSpecified == true ? value.Latitude : "N/A";
            var longitude = value.LongitudeSpecified == true ? value.Longitude : "N/A";
            getTag("txtLatitudeLongitude").value = "经度:" + latitude + "   纬度:" + longitude;
        }
    },

    AccessId: {
        set: function (value) {
            getTag("txtAccessId").value = value;
        }
    },
    PlateColor: {
        set: function (value) {
            getTag("txtPlateColor").value = Language.Enum.PlateColor[value];
            var div = document.getElementById("divPlateColor");
            div.style.backgroundColor = "";
            if (value != PlateColor.None) {
                var bgcolor = "#E4AD2E";
                if (value != PlateColor.Yellow)
                    bgcolor = PlateColor[value];
                div.style.backgroundColor = bgcolor;
            }
        }
    },
    VehicleColor: {
        set: function (value) {
            getTag("txtVehicleColor").value = Language.Enum.VehicleColor[value];
            var div = document.getElementById("divVehicleColor");
            div.style.backgroundColor = "";
            if (value != VehicleColor.None && value != VehicleColor.Other) {
                div.style.backgroundColor = VehicleColor[value];
            }
        }
    },
    PlatePosition: {
        set: function (value) {
            var str = "";
            if (value) {
                str = "X坐标:" + value.X + "   Y坐标:" + value.Y + "   宽度:" + value.Width + "   高度:" + value.Height;
            }
            getTag("txtPlatePosition").value = str;
        }
    },
}
