var gisMapItemDetailsId = null;
var gisMapItemMapId = null;
var gisMapItemParentId = "";
var gisMapItemDetailsObj = null;
var gisMapItemLongitude = null;
var gisMapItemLatitude = null;
var gisMapItemComponentId = null;
var gisMapItemIconType = 0;
var gisMapItemVideoInput = new Object();
function gis_map_item_details_load() {
    loadGPSDevice();
    loadVehiclePlateDevice();
    var uri = new Uri(Trigger.href);
    if (uri.Querys && uri.Querys.mapId) {
        gisMapItemMapId = uri.Querys.mapId;
        if (uri.Querys.parentId)
            gisMapItemParentId = uri.Querys.parentId;
        if (uri.Querys.longitude) {
            gisMapItemLongitude = uri.Querys.longitude;
            document.getElementById("txtLongitude").value = gisMapItemLongitude;
        }
        if (uri.Querys.latitude) {
            gisMapItemLatitude = uri.Querys.latitude;
            document.getElementById("txtLatitude").value = gisMapItemLatitude;
        }
        if (uri.Querys.componentId) {
            gisMapItemComponentId = uri.Querys.componentId;
        }
        if (uri.Querys.iconType) {
            gisMapItemIconType = parseInt(uri.Querys.iconType);
            if (gisMapItemIconType != 3) {
                var ddlVideoInputId = document.getElementById("ddlVideoInputId");
                var ddlDeviceId = document.getElementById("ddlDeviceId");
                document.getElementById("divVideoInputId").style.display = "block";
                //document.getElementById("divDeviceId").style.display = "block";
                loadDdlDevice();
            }
        }
        if (uri.Querys.itemId) {
            gisMapItemDetailsId = uri.Querys.itemId;
            document.getElementById("divId").style.display = "block";
            document.getElementById("divOnline").style.display = "block";
            document.getElementById("divUpdatedTime").style.display = "block";
            document.getElementById("lblGISMapItemDetailsTitle").innerText = "修改地图项";
            GISMapItemDetailsLoad();
        }
        if (uri.Querys.componentName) {
            document.getElementById("txtName").placeholder = decodeURI(uri.Querys.componentName);
        }
    }
}
//
//
function GISMapItemDetailsLoad() {
    gisMapItemDetailsObj = GIS_Dispatch_Property.MapList.MapItem.load(gisMapItemMapId, gisMapItemDetailsId);
    document.getElementById("txtId").value = gisMapItemDetailsObj.Id;
    document.getElementById("txtName").value = gisMapItemDetailsObj.Name;
    document.getElementById("txtLongitude").value = gisMapItemDetailsObj.Longitude;
    document.getElementById("txtLatitude").value = gisMapItemDetailsObj.Latitude;
    document.getElementById("txtDescription").value = gisMapItemDetailsObj.Description;
    document.getElementById("txtStatus").value = gisMapItemDetailsObj.Status ? gisMapItemDetailsObj.Status : "";
    var time = "N/A";
    if (gisMapItemDetailsObj.UpdatedTime) {
        time = Convert.ToDate(gisMapItemDetailsObj.UpdatedTime).format("yyyy-MM-dd HH:mm:ss");
    }
    document.getElementById("txtUpdatedTime").value = time;

    var online = "N/A";
    if (gisMapItemDetailsObj.Online == true)
        online = "在线";
    if (gisMapItemDetailsObj.Online == false)
        online = "离线";
    document.getElementById("txtOnline").value = online;

    if (gisMapItemDetailsObj.GPSId) {
        var GPS = null;
        try {
            GPS = Client.GPS().Device.Get(gisMapItemDetailsObj.GPSId);
        }
        catch (e) {

        }
        if (GPS) {
            document.getElementById("ddlGPSId").value = gisMapItemDetailsObj.GPSId;
        }
    }
    if (gisMapItemDetailsObj.VehiclePlateId) {
        var vehiclePlateDevice = null;
        try {
            vehiclePlateDevice = Client.Vehicle().Device.Get(gisMapItemDetailsObj.VehiclePlateId);
        }
        catch (e) {

        }
        if (vehiclePlateDevice) {
            document.getElementById("ddlVehiclePlateId").value = gisMapItemDetailsObj.VehiclePlateId;
        }
    }
    if (gisMapItemDetailsObj.IconType != 3) {
        if (gisMapItemDetailsObj.VideoInputChannelId) {
            var videoInputChannel = null;
            var id = new Id(gisMapItemDetailsObj.VideoInputChannelId);
            var deviceId = id.getDeviceId();
            try {
                videoInputChannel = Client.Management().Device.Video.Input.Get(deviceId, gisMapItemDetailsObj.VideoInputChannelId);
            }
            catch (e) {

            }
            if (videoInputChannel) {
                document.getElementById("ddlDeviceId").value = deviceId;
                selectDeviceId_Click(deviceId);
                document.getElementById("ddlVideoInputId").value = gisMapItemDetailsObj.VideoInputChannelId;
            }
        }
    }
}

function btnAddGISMapItems_Click(sender, args) {
    var item = new GISMapItem();
    var fn = GIS_Dispatch_Html.MapList.MapItem.create;
    if (gisMapItemDetailsObj) {
        item = gisMapItemDetailsObj;
        item.Look = GIS_Dispatch_Property.MapList.ItemList.value[item.Id].Look;
        fn = GIS_Dispatch_Html.MapList.MapItem.set;
    }
    else {
        if (gisMapItemParentId) {
            item.ComponentId = gisMapItemComponentId;
            if (gisMapItemIconType == 2) {
                var person = new Device();
                person.Name = document.getElementById("txtName").value;
                person.Uri = Client.Host;
                person.Classification = "ExtensionUnit";
                person.ProtocolType = "none";
                var id = Client.Management().Device.Create(person);
                if (id)
                    item.ComponentId = id;
            }
            item.ParentLayerId = gisMapItemParentId;
            course = 0;
            item.Course = course;
            item.CourseSpecified = true;
        }
    }

    item.Name = document.getElementById("txtName").value ? document.getElementById("txtName").value : document.getElementById("txtName").placeholder;
    item.IconType = gisMapItemIconType;
    item.Longitude = document.getElementById("txtLongitude").value
    item.Latitude = document.getElementById("txtLatitude").value
    item.Description = document.getElementById("txtDescription").value;
    item.GPSId = document.getElementById("ddlGPSId").value
    item.VehiclePlateId = document.getElementById("ddlVehiclePlateId").value;
    item.Status = document.getElementById("txtStatus").value;
    item.IconTypeSpecified = true;
    if (item.IconType != 3) {
        item.VideoInputChannelId = document.getElementById("ddlVideoInputId").value;
        if (document.getElementById("ddlVideoInputId").value) {
            item.VideoInputChannelIdSpecified = true;
        }
        else {
            item.VideoInputChannelIdSpecified = false;
        }
    }
    else {
        item.VideoInputChannelId = item.ComponentId;
        item.VideoInputChannelIdSpecified = true;
    }
    if (document.getElementById("txtStatus").value)
        item.StatusSpecified = true;
    else
        item.StatusSpecified = false;

    if (document.getElementById("txtDescription").value)
        item.DescriptionSpecified = true;
    else
        item.DescriptionSpecified = false;

    if (document.getElementById("ddlGPSId").value)
        item.GPSIdSpecified = true;
    else
        item.GPSIdSpecified = false;

    if (document.getElementById("ddlVehiclePlateId").value)
        item.VehiclePlateIdSpecified = true;
    else
        item.VehiclePlateIdSpecified = false;

    AlertWindow.Close();
    fn(gisMapItemMapId, item);
    return false;
}

function createSelectOption(id, arr, firstTxt) {
    var select = document.getElementById(id);
    var defaultOption = document.createElement("option");
    defaultOption.innerHTML = firstTxt ? firstTxt : "未绑定";
    defaultOption.value = "";
    select.appendChild(defaultOption);
    for (var i = 0; i < arr.length; i++) {
        var option = document.createElement("option");
        option.value = arr[i].Id;
        option.innerHTML = arr[i].Name;
        select.appendChild(option);
    }
}

function loadGPSDevice() {
    var result = tryCatch(function () {
        return Client.GPS().Device.List();
    });
    if (result && result.GPSDevice) {
        createSelectOption("ddlGPSId", result.GPSDevice);
    }
}

function loadVehiclePlateDevice() {
    var result = tryCatch(function () {
        return Client.Vehicle().Device.List();
    });
    if (result && result.VehiclePlateDevice) {
        createSelectOption("ddlVehiclePlateId", result.VehiclePlateDevice);
    }
}

function loadDdlDevice() {
    var result = tryCatch(function () {
        return Client.Management().Device.List();
    });
    if (result && result.Device) {
        createSelectOption("ddlDeviceId", result.Device, "未选择");
    }
}

function selectDeviceId_Click(value) {
    var ddlVideoInputId = document.getElementById("ddlVideoInputId");
    ddlVideoInputId.innerHTML = "";
    if (value) {
        ddlVideoInputId.disabled = "";
        if (!gisMapItemVideoInput[value]) {
            gisMapItemVideoInput[value] = new Dictionary();
            var result = tryCatch(function () {
                return Client.Management().Device.Video.Input.List(value);
            });
            if (result && result.VideoInputChannel) {
                for (var i = 0; i < result.VideoInputChannel.length; i++) {
                    gisMapItemVideoInput[value][result.VideoInputChannel[i].Id] = result.VideoInputChannel[i];
                }
            }
        }
        var inputs = gisMapItemVideoInput[value].toArray();
        createSelectOption("ddlVideoInputId", inputs, "未选择");
        return;
    }
    createSelectOption("ddlVideoInputId", new Array(), "未选择");
    ddlVideoInputId.disabled = "disabled";
}