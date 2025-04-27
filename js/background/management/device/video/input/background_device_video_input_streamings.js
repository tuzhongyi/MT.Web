if (!this.Client)
    imported.loadJS("js/client/client.js");
Property["StreamingList"] =
{
    value: new Object(),
    load: function (deviceId, inputId) {
        var response = tryCatch(function () {
            return Client.Management().Device.Video.Input.Streaming.List(deviceId, inputId);
            //var arr = new Array();
            //for (var i = 0; i < 10; i++) {
            //    var str = new StreamingChannel();
            //    str.No = i;
            //    str.VideoCodecType = VideoCodecType.None;
            //    str.VideoResolution = new Resolution();
            //    str.VideoQualityControlType = VideoQualityControlType.CBR
            //    str.VideoBitrateUpperCap = 0.0;
            //    str.FrameRate = 0.0;
            //    str.FixedQuality = 0.0;
            //    str.Url = "http://localhost:5645/management/devices.htm?id=" + i;
            //    str.UrlSpecified = true;
            //    arr.push(str);
            //}
            //return arr;
        });
        var result = new Object();
        if (response) {
            if (response) {
                for (var i = 0; i < response.length; i++) {
                    this.value[response[i].No] = response[i];
                    result[response[i].No] = this.value[response[i].No];
                }
            }
        }
        return result;
    },
    get: function (deviceId, inputId, no) {  
        return tryCatch(function () {
            return Client.Management().Device.Video.Input.Streaming.Get(deviceId, inputId, no);
        });
    }
}

Html.Control.PopoverWindow["StreamingList"] = {
    totalCount: {
        value: 0,
        set: function (value) {
            getTag("lbl_association_streaming_count").innerText = value;
            this.value = value;
        }
    },
    createItem: function (streaming) {
        var createCoontrol = {
            icon: function (streaming) {
                var btn = new IconButton("", "icon-random", 11, streaming.No);
                var a = new AlertWindow("", btn, "input/streaming/" + Property.Location.Streaming.Details.Value + "?deviceId=" + Property.DeviceId + "&inputId=" + Html.Control.AlertWindow.Device.Input.Details.get().Id + "&streamingId=" + streaming.No, -1, true);
                a.title = streaming.No;
                return a;
            },
            uri: function (streaming) {
                var lable = document.createElement("lable");
                if (streaming.Url) {
                    lable.innerText = streaming.Url;
                    lable.title = streaming.Url;
                }
                lable.className = "list-item-information uri";
                
                return lable;
            }
        };
        var item = null;

        item = new GroupListItem(Info.ControlIdPrefix.Device.Video.Input.Streaming.list);
        item.id = Info.ControlIdPrefix.Device.Video.Input.Streaming.list + streaming.No;

        item.className += " mouse_pointer";

        item.Content.appendChild(createCoontrol.icon(streaming));
        item.Content.appendChild(createCoontrol.uri(streaming));

        item.Content.className = "childpage-list-item-content";

        return item;
    },
    fillTable: function (streamings) {
        if (streamings) {
            var trs = new Array();
            for (var i = 0; i < streamings.length; i++) {
                var tds = new Array();
                var td = new TableBodyTd(streamings[i].No, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);
                td = new TableBodyTd(Language.Enum.VideoCodecType[streamings[i].VideoCodecType], "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);
                td = new TableBodyTd(streamings[i].VideoResolution.Width + "×" + streamings[i].VideoResolution.Height, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);
                td = new TableBodyTd(Language.Enum.VideoQualityControlType[streamings[i].VideoQualityControlType], "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);
                td = new TableBodyTd(streamings[i].VideoBitrateUpperCap, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);
                td = new TableBodyTd(streamings[i].FrameRate, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);
                td = new TableBodyTd(streamings[i].FixedQuality, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);
                td = new TableBodyTd(streamings[i].Url, "hidden-xs overflow-hidden-td");
                td.style.width = "100px";
                tds.push(td);

                trs.push(new TableBodyTr(tds));
            }
            Table.Create("tableStreamings", new TableBody(trs), [], streamings.length);
        }
    },
    createItems: function (streamings) {
        var items = new GroupListItemArray();
        if (streamings) {
            for (var i = 0; i < streamings.length; i++) {
                items.push(this.createItem(streamings[i]));
            }
        }
        return items;
    },
    createItemsByObj: function (obj) {
        if (obj) {
            var array = new Array();
            for (var id in obj) {
                array.push(obj[id]);
            }
            if (array.length > 0)
                return this.createItems(array);
        }
        return null;
    },
    clear: function (key) {
        getTag("glist_streamings").innerText = "";;
        this.totalCount.set(0);
    },
    list: function () {
        return Property.StreamingList.value;
    },
    load: function (index) {
        var result = Property.StreamingList.load(Property.DeviceId, Html.Control.AlertWindow.Device.Input.Details.get().Id);
        var items = this.createItemsByObj(result);
        if (items) {
            var glist = new GroupList("", items);
            getTag("glist_streamings").appendChild(glist);
        }
    },
    modify: function (streaming) {
        var item = Html.Control.PopoverWindow.StreamingList.createItem(streaming);
        var tag = getTag(Info.ControlIdPrefix.Device.Video.Input.Streaming.list + streaming.Id);
        if (item) {
            tag.parentElement.replaceChild(item, tag);
            return true;
        }
        return false;
    },
    AlertWindow: {

    }
};

PageEvent.Device.Video.Input.Streaming.ModifyStreamingListItem = function (streaming) {
    Html.Control.PopoverWindow.StreamingList.modify(streaming);
}