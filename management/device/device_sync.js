function syncDevice_load() {
    var uri = new Uri(Trigger.href);
    if (uri.Querys && uri.Querys.mode) {
        syncDeviceMode = uri.Querys.mode;
    }
    if (Property["TimerNumber"]) {
        try{
            clearInterval(Property["TimerNumber"]);
        }
        catch(ex){}
    }
    Property["TimerNumber"] = setInterval(function () {
        try {
            var tags = document.getElementsByName("circle");
            for (var i = 0; i < tags.length; i++) {
                tags[i].className = "icon-circle";
            }
            if (direction == "Right") {
                if (circleIndex == tags.length) {
                    circleIndex = 1;
                }
                else {
                    circleIndex = circleIndex + 1;
                }
                document.getElementById("circle" + circleIndex).className = "icon-circle-arrow-right";
            }
            if (direction == "Left") {
                if (circleIndex == 1) {
                    circleIndex = tags.length;
                }
                else {
                    circleIndex = circleIndex - 1;
                }
                document.getElementById("circle" + circleIndex).className = "icon-circle-arrow-left";
            }
        }
        catch (ex) {

        }
    }, 500);
}
function btnSyncDevice_Click() {
    try{
        clearInterval(Property["TimerNumber"]);
    }
    catch(ex){

    }
    AlertWindow.Close();
    $.confirm({
        title: "",
        text: "确定要进行同步吗?",
        okButton: "确定",
        cancelButton: "取消",
        top: -1,
        confirm: function () {
            tryCatch(function () {
                if (syncDeviceMode == "single")
                    Html.Control.GroupList.sync(Html.Current.Id.get(), syncSource);
                if (syncDeviceMode == "batch")
                    Html.Control.GroupList.batchSync(syncSource);
            });
        },
    });
    return false;
}

function btnSyncDeviceCancel_Click() {
    try{    
        clearInterval(Property["TimerNumber"]);
    }
    catch(ex){}
    AlertWindow.Close();
    return false;
}

function picture_Click(sender, args) {
    var title = document.getElementById("titleSync");
    var pics = document.getElementsByClassName("picture-selection");
    for (var i = 0; i < pics.length; i++) {
        $(pics[i]).removeClass("selected");
    }
    $(sender).addClass("selected");
    syncSource = args;
    if (args == SyncSource.Device) {
        direction = "Right";
        title.innerHTML = "设备同步到数据库";
        return
    }
    direction = "Left";
    title.innerHTML = "数据库同步到设备";
}