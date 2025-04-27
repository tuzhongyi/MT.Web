if (!this.Client)
    imported.loadJS("js/client/client.js");

Html.Control.PopoverWindow.SignalList.AlertWindow["Details"] = {
    No: null,
    deviceId:null,
    load: function () {
        var signal = null;
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.deviceId) 
            this.deviceId = uri.Querys.deviceId;
        if (uri.Querys && uri.Querys.signalNo) {
            this.No = uri.Querys.signalNo;
            signal = Property.SignalList.loadSignal(uri.Querys.deviceId, uri.Querys.signalNo);
        }
        if (signal) {
            getTag("lblDeviceName").innerText = Property.DeviceList.get(this.deviceId).Name + ":" + signal.No;
            if (signal.StationaryState && signal.StationaryState == SwitchState.ON)
                getTag("chkStationaryState").checked = "checked";
            if (signal.Bypass && signal.Bypass == SwitchState.ON)
                getTag("chkBypass").checked = "checked";
            if (signal.Audio && signal.Audio == SwitchState.ON)
                getTag("chkAudio").checked = "checked";
            if (signal.Light && signal.Light == SwitchState.ON)
                getTag("chkLight").checked = "checked";
        }

    },
    getValues: function () {
        var obj = new Object();
        obj["StationaryState"] = getTag("chkStationaryState").checked ? SwitchState.ON : SwitchState.OFF;
        obj["Bypass"] = getTag("chkBypass").checked ? SwitchState.ON : SwitchState.OFF;
        obj["Audio"] = getTag("chkAudio").checked ? SwitchState.ON : SwitchState.OFF;
        obj["Light"] = getTag("chkLight").checked ? SwitchState.ON : SwitchState.OFF;
        return obj;
    }
}