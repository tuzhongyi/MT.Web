/// <reference path="../../../client/client.js" />
/// <reference path="../../../howell.js/howell.convert.js" />
/// <reference path="../../../client/vehicle.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");

Vehicle_Property["Vehicle"] = {
    value: null,
    load: function (id) {
        var vehicle = tryCatch(function () {
            return Client.Vehicle().Vehicle.Get(id)
        });
        if (vehicle)
            this.value = vehicle;
        return vehicle;
    },
    create: function (vehicle) {
        return tryCatch(function () {
            return Client.Vehicle().Vehicle.Create(vehicle);
        });
    },
    modify: function (vehicle) {
        return tryCatch(function () {
            return Client.Vehicle().Vehicle.Set(vehicle);
        });
    },
}

Vehicle_Html.Control["AlertWindow"] = {
    load: function (id) {
        var result = Vehicle_Property.Vehicle.load(id);
        this.Id.set(result.Id);
        this.Name.set(result.Name);
        this.CreationTime.set(result.CreationTime);
        this.Plate.set(result.Plate);
        this.Description.set(result.Description);
        this.PlateColor.set(result.PlateColor);
        this.VehicleColor.set(result.VehicleColor);
        this.Brand.set(result.Brand);
        this.ChildBrand.set(result.ChildBrand);
        this.ExistedInBlackList.set(result.ExistedInBlackList);
        this.MatchingPercentage.set(result.MatchingPercentage);
    },
    create: function (vehicle) {
        var isTrue = Vehicle_Property.Vehicle.create(vehicle);
        if (isTrue) {
            AlertWindow.Close();
            VehiclePageEvent.Vehicle.GroupListReload(1, Vehicle_Property.PageSize * LazyLoadPage.PageIndex);
        }
    },
    modify: function (vehicle) {
        var isTrue = Vehicle_Property.Vehicle.modify(vehicle);
        if (isTrue) {
            if (!Vehicle_Property.VehicleList.value[vehicle.Id]["Selected"])
                vehicle["Selected"] = false;
            else
                vehicle["Selected"] = Vehicle_Property.VehicleList.value[vehicle.Id]["Selected"];
            Vehicle_Property.VehicleList.value[vehicle.Id] = vehicle;
            AlertWindow.Close(VehiclePageEvent.Vehicle.GroupListItemChanged, vehicle);
        }
    },
    IsModify:
    {
        value: false,
        get: function () {
            return this.value;
        },
        set: function (value) {
            var title = "创建车辆";
            if (value) {
                title = "设置车辆";
                document.getElementById("vehicle_details_alert_window").style.height = "730px";
            }
            else {
                getTag("divId").style.display = "none";
                getTag("divCreationTime").style.display = "none";
            }
            getTag("lblVehicleDetailTitle").innerText = title;
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
    Description: {
        set: function (value) {
            getTag("txtDescription").value = value;
        }
    },
    Plate: {
        set: function (value) {
            getTag("txtPlate").value = value;
        }
    },
    PlateColor: {
        set: function (value) {
            getTag("dllPlateColor").value = value;
            selectPlateColor_Click(value);
        }
    },
    VehicleColor: {
        set: function (value) {
            getTag("dllVehicleColor").value = value;
            selectVehicleColor_Click(value);
        }
    },
    Brand: {
        set: function (value) {
            getTag("txtBrand").value = value;
        }
    },
    ChildBrand: {
        set: function (value) {
            getTag("txtChildBrand").value = value;
        }
    },
    ExistedInBlackList: {
        set: function (value) {
            getTag("chkExistedInBlackList").checked = value;
            var divExistedInBlackList = document.getElementById("divExistedInBlackList");
            var chk = divExistedInBlackList.children[0];
            $(chk).removeClass("switch-off");
            $(chk).removeClass("switch-on");
            var css="switch-off";
            if (value)
                css = "switch-on"
            $(chk).addClass(css);
        }
    },
    MatchingPercentage: {
        set: function (value) {
            $(".slider-basic").slider({
                range: "min",
                max: 100,
                min: 0,
                value: value,
                slide: function (event, ui) {
                    return $(".slider-basic-amount").html(+ui.value);
                }
            });
            $(".slider-basic-amount").html($(".slider-basic").slider("value"));
        }
    }
}