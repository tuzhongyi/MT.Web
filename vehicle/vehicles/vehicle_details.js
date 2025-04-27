function vehicle_item_load() {
    DropDownList.Create("dllPlateColor", ControlModel.Language, PlateColor, Language.Enum.PlateColor);
    DropDownList.Create("dllVehicleColor", ControlModel.Language, VehicleColor, Language.Enum.VehicleColor);
    $(".slider-basic").slider({
        range: "min",
        max: 100,
        min: 0,
        value: 0,
        slide: function (event, ui) {
            return $(".slider-basic-amount").html(+ui.value);
        }
    });
    $(".slider-basic-amount").html($(".slider-basic").slider("value"));
    tryCatch(function () {
        var id = Vehicle_Html.Current.Id.get();
        if (id) {
            Vehicle_Html.Control.AlertWindow.load(id);
            Vehicle_Html.Control.AlertWindow.IsModify.set(true);
        }
        else {
            Vehicle_Html.Control.AlertWindow.IsModify.set(false);
        }
    });
}

function btnDetailVehicle_Click(sender, args) {
    var vehicle = new Vehicle();
    if (Vehicle_Property.Vehicle.value)
        vehicle = Vehicle_Property.Vehicle.value;
    var txtPlate = getTag("txtPlate");
    if (!txtPlate.value) {
        txtPlate.style.borderColor = "red";
        return false;
    }
    txtPlate.style.borderColor = "#ccc";
    vehicle.Plate = txtPlate.value;
    vehicle.Name = getTag("txtName").value;
    vehicle.NameSpecified = vehicle.Name ? true : false;
    vehicle.PlateColor = getTag("dllPlateColor").value;
    vehicle.PlateColorSpecified = vehicle.PlateColor ? true : false;
    vehicle.VehicleColor = getTag("dllVehicleColor").value;
    vehicle.VehicleColorSpecified = vehicle.VehicleColor ? true : false;
    vehicle.Brand = getTag("txtBrand").value;
    vehicle.BrandSpecified = vehicle.Brand ? true : false;
    vehicle.ChildBrand = getTag("txtChildBrand").value;
    vehicle.ChildBrandSpecified = vehicle.ChildBrand ? true : false;
    vehicle.Description = getTag("txtDescription").value;
    vehicle.DescriptionSpecified = vehicle.Description ? true : false;
    vehicle.ExistedInBlackList = getTag("chkExistedInBlackList").checked;
    vehicle.MatchingPercentage = parseInt(getTag("sliderMatchingPercentage").innerText);

    if (Vehicle_Html.Control.AlertWindow.IsModify.get())
        Vehicle_Html.Control.AlertWindow.modify(vehicle);
    else {
        vehicle.CreationTime = new Date();
        Vehicle_Html.Control.AlertWindow.create(vehicle);
    }
    return false;
}

function selectPlateColor_Click(value) {
    var div = document.getElementById("divPlateColor");
    div.style.backgroundColor = "";
    if (value != PlateColor.None) {
        var bgcolor = "#E4AD2E";
        if (value != PlateColor.Yellow)
            bgcolor = PlateColor[value];
        div.style.backgroundColor = bgcolor;
    }
}

function selectVehicleColor_Click(value) {
    var div = document.getElementById("divVehicleColor");
    div.style.backgroundColor = "";
    if (value != VehicleColor.None && value != VehicleColor.Other) {
        div.style.backgroundColor = VehicleColor[value];
    }
}