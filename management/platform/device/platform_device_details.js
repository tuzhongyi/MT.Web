var firstIPControl;
var endIPControl;
var ipControl;
var hasCapabilitiesDevice = {
    DigitalMatrix: "DigitalMatrix",
    DVR: "DVR",
    DVS: "DVS",
    HDDecoder: "HDDecoder",
    IPCamera: "IPCamera",
    NAM: "NAM",
    NVR: "NVR",
    UltrasonicProbe: "UltrasonicProbe"
}
function item_load() {
    tryCatch(function () {
        firstIPControl = new IPTextControl("txtFirstIP", IPTextSync);
        endIPControl = new IPTextControl("txtEndIP");
        ipControl = new IPTextControl("txtIP");
        document.getElementById("divFirstIPControl").appendChild(firstIPControl.div);
        document.getElementById("divEndIPControl").appendChild(endIPControl.div);
        document.getElementById("divIPControl").appendChild(ipControl.div);


        var id = Html.Current.Id.get();
        Html.Control.AlertWindow.IsBatch.set(false);
        if (id) {
            DropDownList.Create("ddlDetailClassification", ControlModel.EnumAndLanguage, DeviceClassification, Language.Enum.DeviceClassification);
            Html.Control.AlertWindow.load(id);
            Html.Control.AlertWindow.IsModify.set(true);

        }
        else {
            document.getElementById("page1").style.marginBottom = "162px";
            DropDownList.Create("ddlDetailClassification", ControlModel.EnumAndLanguage, hasCapabilitiesDevice, Language.Enum.DeviceClassification);
            detailClassification_Onchange(getTag("ddlDetailClassification"));
            Html.Control.AlertWindow.IsModify.set(false);
            var uri = new Uri(Trigger.href);
            if (uri.Query && uri.Querys.batch) {
                Html.Control.AlertWindow.IsBatch.set(true);
                document.getElementById("divDeviceName").style.display = "none";
                document.getElementById("HowellUriGroup").style.display = "none";
                document.getElementById("divFirstIP").style.display = "block";
                document.getElementById("divEndIP").style.display = "block";
            }
        }
    });
}

function btnDetailDevice_Click(sender, args) {
    if (Html.Control.AlertWindow.IsBatch.get()) {
        var firstIPArr = firstIPControl.toIntArray();
        var endIPArr = endIPControl.toIntArray();

        var manufacturer = getTag("txtManufacturer").value;
        var model = getTag("txtModel").value;
        var firmware = getTag("txtFirmware").value;
        var serialNumber = getTag("txtSerialNumber").value;
        var pointOfSale = getTag("txtPointOfSale").value;
        var information = getTag("txtInformation").value;
        var protocolType = getTag("ddlProtocolType").value;
        var busAddress = getTag("txtBusAddress").value;
        var hasSubDevice = getTag("chkHasSubDevice").checked;
        var username = getTag("txtUsername").value;
        var password = getTag("txtPassword").value;
        var classification = getTag("ddlDetailClassification").value;
        var port = getTag("txtBatchPort").value;
        var deviceProtocolCapabilities = Html.Control.AlertWindow.deviceProtocolCapabilities[protocolType];
        var uri = new Uri(deviceProtocolCapabilities.UriFormat);
        var devices = new Array();
        while (firstIPArr[3] <= endIPArr[3]) {
            var device = new Device();
            device.Id = "";

            device.Manufacturer = manufacturer;
            device.ManufacturerSpecified = true;

            device.Model = model;
            device.ModelSpecified = true;

            device.Firmware = firmware;
            device.FirmwareSpecified = true;

            device.SerialNumber = serialNumber;
            device.SerialNumberSpecified = true;

            device.PointOfSale = pointOfSale;
            device.PointOfSaleSpecified = true;

            device.Information = information;
            device.InformationSpecified = true;

            device.ProtocolType = protocolType;

            device.Uri = uri.Scheme + "://" + firstIPArr[0].toString() + "." + firstIPArr[1].toString() + "." + firstIPArr[2].toString() + "." + firstIPArr[3].toString() + ":" + port + "/";

            device.BusAddress = busAddress;

            device.HasSubDevice = hasSubDevice;

            device.Username = username;
            device.Password = password;

            device.PasswordSpecified = true;

            device.UsernameSpecified = true;
            device.Classification = classification;
            device.Name = device.Uri;

            devices.push(device);
            firstIPArr[3] = firstIPArr[3] + 1;
        }
        Html.Control.AlertWindow.batchCreate(devices);
    }
    else {
        var IP1 = parseInt(document.getElementById("txtIP1").value);
        var IP2 = parseInt(document.getElementById("txtIP2").value);
        var IP3 = parseInt(document.getElementById("txtIP3").value);
        var IP4 = parseInt(document.getElementById("txtIP4").value);
        var device = new Device();
        if (Property.Device.value)
            device = Property.Device.value;
        device.Id = Html.Current.Id.get();

        device.Name = getTag("txtName").value;

        device.Manufacturer = getTag("txtManufacturer").value;
        device.ManufacturerSpecified = true;

        device.Model = getTag("txtModel").value;
        device.ModelSpecified = true;

        device.Firmware = getTag("txtFirmware").value;
        device.FirmwareSpecified = true;

        device.SerialNumber = getTag("txtSerialNumber").value;
        device.SerialNumberSpecified = true;

        device.PointOfSale = getTag("txtPointOfSale").value;
        device.PointOfSaleSpecified = true;

        device.Information = getTag("txtInformation").value;
        device.InformationSpecified = true;


        device.BusAddress = getTag("txtBusAddress").value;

        device.HasSubDevice = getTag("chkHasSubDevice").checked;

        device.Username = getTag("txtUsername").value;
        device.Password = getTag("txtPassword").value;

        device.PasswordSpecified = true;
        device.UsernameSpecified = true;

        if (Html.Control.AlertWindow.IsModify.get()) {
            device.Classification = Html.Control.AlertWindow.Classification.get();
            var deviceProtocolCapabilities = Html.Control.AlertWindow.deviceProtocolCapabilities[device.ProtocolType];
            var uri = new Uri(device.Uri);
            uri.Host = ipControl.toString();
            uri.Port = getTag("txtPort").value;
            device.Uri = uri.toString();
            if (!getTag("txtName").value)
                device.Name = device.Classification + device.Uri;
            if (getTag("ddlPlatformFileSourceType").value || getTag("ddlPlatformFileSourceType").value == 0) {
                device.PlatformFileSourceType = parseInt(getTag("ddlPlatformFileSourceType").value);
            }
            Html.Control.AlertWindow.modify(device);
        }
        else {
            device.Classification = getTag("ddlDetailClassification").value;
            device.ProtocolType = getTag("ddlProtocolType").value;
            var deviceProtocolCapabilities = Html.Control.AlertWindow.deviceProtocolCapabilities[device.ProtocolType];
            var uri = new Uri(deviceProtocolCapabilities.UriFormat);
            device.Uri = uri.Scheme + "://" + ipControl.toString() + ":" + getTag("txtPort").value + "/";
            if (!getTag("txtName").value)
                device.Name = device.Classification + device.Uri;
            Html.Control.AlertWindow.create(device);
        }
    }
    return false;
}

function btnNextStep_Click(sender, args) {
    if (!Html.Control.AlertWindow.IsBatch.get()) {
        if (ipControl.toString() == null) {
            ipControl.div.style.borderColor = "red";
            return false;
        }
        ipControl.div.style.borderColor = "#ccc";
    }
    else {
        var firstIPArr = firstIPControl.toIntArray();
        var endIPArr = endIPControl.toIntArray();
        if (firstIPArr == null || endIPArr == null || firstIPArr[3] > endIPArr[3]) {
            firstIPControl.div.style.borderColor = "red";
            endIPControl.div.style.borderColor = "red";
            return false;
        }
        firstIPControl.div.style.borderColor = "#ccc";
        endIPControl.div.style.borderColor = "#ccc";
    }
    getTag("btnLastStep").style.display = "block";
    getTag("btnNextStep").style.display = "none";
    getTag("btnDetailDevice").style.display = "block";
    getTag("page1").style.display = "none";
    getTag("page2").style.display = "block";
}

function btnLastStep_Click(sender, args) {
    getTag("btnLastStep").style.display = "none";
    getTag("btnNextStep").style.display = "block";
    getTag("btnDetailDevice").style.display = "none";
    getTag("page1").style.display = "block";
    getTag("page2").style.display = "none";
}

function IPTextSync(sender) {
    var num = parseInt(sender.id.substr(sender.id.length - 1));
    if (num < 4) {
        endIPControl["Text" + num].value = sender.value;
    }
}