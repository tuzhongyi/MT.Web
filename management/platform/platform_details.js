var platformDeteilsIPControl;
function platform_item_load() {
    var returnValue = Platform_Property.Platform.capabilities.get();
    if (returnValue.PlatformCapabilities) {
        var ddlProtocolType = document.getElementById("ddlProtocolType");
        for (var i = 0; i < returnValue.PlatformCapabilities.length; i++) {
            var option = document.createElement("option");
            option.innerHTML = returnValue.PlatformCapabilities[i].Comment;
            option.value = returnValue.PlatformCapabilities[i].ProtocolType;
            ddlProtocolType.appendChild(option);
            Platform_Property.Platform.capabilities.value.push(returnValue.PlatformCapabilities[i]);
        }
    }
    platformDeteilsIPControl = new IPTextControl("txtIP");
    document.getElementById("divIPControl").appendChild(platformDeteilsIPControl.div);
    tryCatch(function () {
        var id = Platform_Html.Current.Id.get();
        if (id) {
            Platform_Html.Control.AlertWindow.load(id);
            Platform_Html.Control.AlertWindow.IsModify.set(true);
            getTag("page2").style.marginBottom = "122px";
            getTag("txtManufacturer").readOnly = "readOnly";
            getTag("txtModel").readOnly = "readOnly";
            getTag("txtFirmware").readOnly = "readOnly";
            getTag("txtSerialNumber").readOnly = "readOnly";
            getTag("txtPointOfSale").readOnly = "readOnly";
        }
        else {
            Platform_Html.Control.AlertWindow.IsModify.set(false);
            getTag("divId").style.display = "none";
            getTag("divAuthenticationCode").style.display = "none";
        }
    });
}

function btnDetailPlatform_Click(sender, args) {
    var platform = new Platform();
    if (Platform_Property.Platform.value)
        platform = Platform_Property.Platform.value;
    platform.Id = Platform_Html.Current.Id.get();
    platform.Name = getTag("txtName").value;

    platform.Manufacturer = getTag("txtManufacturer").value;
    platform.ManufacturerSpecified = true;
    platform.Model = getTag("txtModel").value;
    platform.ModelSpecified = true;
    platform.Firmware = getTag("txtFirmware").value;
    platform.FirmwareSpecified = true;
    platform.SerialNumber = getTag("txtSerialNumber").value;
    platform.SerialNumberSpecified = true;
    platform.PointOfSale = getTag("txtPointOfSale").value;
    platform.PointOfSaleSpecified = true;
    platform.Information = getTag("txtInformation").value;
    platform.InformationSpecified = true;
    platform.Username = getTag("txtUsername").value;
    platform.UsernameSpecified = true;
    platform.Password = getTag("txtPassword").value;
    platform.PasswordSpecified = true;


    platform.ProtocolType = Platform_Property.Platform.capabilities.value[getTag("ddlProtocolType").selectedIndex].ProtocolType;
    platform.Uri = Platform_Property.Platform.capabilities.value[getTag("ddlProtocolType").selectedIndex].UriFormat.toString(); + ":" + getTag("txtPort").value;
    platform.Uri = platform.Uri.replace("[host]", platformDeteilsIPControl.toString());
    platform.Uri = platform.Uri.replace("[port]", getTag("txtPort").value);

    if (Platform_Html.Control.AlertWindow.IsModify.get())
        Platform_Html.Control.AlertWindow.modify(platform);
    else
        Platform_Html.Control.AlertWindow.create(platform);
    return false;
}

function btnDetailPlatformNextStep_Click(sender, args) {
    var txtName = getTag("txtName");
    if (!txtName.value) {
        txtName.style.borderColor = "red";
        return false;
    }
    txtName.style.borderColor = "#ccc";

    if (platformDeteilsIPControl.toString() == null) {
        platformDeteilsIPControl.div.style.borderColor = "red";
        return false;
    }
    platformDeteilsIPControl.div.style.borderColor = "#ccc";

    var txtPort = getTag("txtPort");
    if (!txtPort.value) {
        txtPort.style.borderColor = "red";
        return false;
    }
    txtPort.style.borderColor = "#ccc";
    getTag("btnDetailPlatformLastStep").style.display = "block";
    getTag("btnDetailPlatformNextStep").style.display = "none";
    getTag("btnDetailPlatform").style.display = "block";
    getTag("page1").style.display = "none";
    getTag("page2").style.display = "block";
}

function btnDetailPlatformLastStep_Click(sender, args) {
    getTag("btnDetailPlatformLastStep").style.display = "none";
    getTag("btnDetailPlatformNextStep").style.display = "block";
    getTag("btnDetailPlatform").style.display = "none";
    getTag("page1").style.display = "block";
    getTag("page2").style.display = "none";
}