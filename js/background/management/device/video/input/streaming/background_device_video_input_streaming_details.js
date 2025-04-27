if (!this.Client)
    imported.loadJS("js/client/client.js");


Property["Streaming"] = {
    load: function (deviceId, inputId, no) {
        return tryCatch(function () {
            return Property.StreamingList.get(deviceId, inputId, no);
        });
    },
    modify: function (deviceId, inputId, streaming) {
        return tryCatch(function () {
            return Client.Management().Device.Video.Input.Streaming.Set(deviceId, inputId, streaming);
        });
    },
}

Html.Control.PopoverWindow.StreamingList.AlertWindow["Details"] = {
    load: function (deviceId, inputId, no) {
        var result = Property.Streaming.load(deviceId, inputId, no);
        this.No.set(result.No);
        this.VideoCodecType.set(result.VideoCodecType);
        this.VideoResolution.set(result.VideoResolution);
        this.VideoQualityControlType.set(result.VideoQualityControlType);
        this.VideoBitrateUpperCap.set(result.VideoBitrateUpperCap);
        this.FrameRate.set(result.FrameRate);
        this.FixedQuality.set(result.FixedQuality);
        this.Url.set(result.Url);
    },
    modify: function (deviceId, inputId, streaming) {
        Property.Streaming.modify(deviceId, inputId, streaming);
    },
    No: {
        set: function (value) {
            getTag("txtNo").value = value;
        }
    },
    VideoCodecType: {
        set: function (value) {
            getTag("ddlVideoCodecType").value = value;
        }
    },
    VideoResolution: {
        value: null,
        set: function (value) {
            getTag("ddlVideoCodecType").value = value.Width + "×" + value.Height;
            this.value = value;
        }
    },
    VideoQualityControlType: {
        set: function (value) {
            getTag("ddlVideoQualityControlType").value = value;
        }
    },
    VideoBitrateUpperCap: {
        set: function (value) {
            getTag("txtVideoBitrateUpperCap").value = value;
        }
    },
    FrameRate: {
        set: function (value) {
            getTag("txtFrameRate").value = value;
        }
    },
    FixedQuality: {
        set: function (value) {
            getTag("txtFixedQuality").value = value;
        }
    },
    Url: {
        set: function (value) {
            getTag("txtUrl").value = value;
        }
    },
    EventId: function () {
        var uri = new Uri(Trigger.href);
        if (uri.Querys && uri.Querys.streamingId)
            return uri.Querys.streamingId;
        return null;
    },
}