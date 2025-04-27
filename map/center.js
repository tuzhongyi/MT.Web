/// <reference path="../js/client/client.js" />
/// <reference path="../js/client/management.js" />
/// <reference path="../js/client/enum.js" />

var ClassificationNodes = {
    VideoSource: {
        Node: ["Video", "Input"],
        Channel: ["VideoInputChannel"]
    },
    Annunciator: {
        Node: ["IO", "Input"],
        Channel: ["IOInputChannel"]
    }

}

var Property = {
    User: {
        status_count: function (online) {
            var list = tryCatch(function () {
                return Client.Security().User.Status.List(online, 1, 1);
            });
            if (list && list.Page) {
                return list.Page.TotalRecordCount;
            }
            return 0;

        }
    },
    Notice: function () {
        var list = tryCatch(function () {
            return Client.Management().Notice.List(null, NoticeStatusType.Unread, null, null, null, 1, 1);
        });
        if (list && list.Page) {
            return list.Page.TotalRecordCount;
        }
        return 0;
    },
    Record: function (startDate, endDate) {
        var list = tryCatch(function () {
            return Client.Management().Event.Record(null, null, startDate, endDate, 1, 1);
        });
        if (list && list.Page) {
            return list.Page.TotalRecordCount;
        }
        return 0;
    },
    Device: {
        value: new Dictionary(),
        load: function (classification) {
            var devices = tryCatch(function () {
                return Client.Management().Device.List(null, null, classification);
            })
            var array = new Array();
            for (var i = 0; i < devices.Device.length; i++) {
                var device = devices.Device[i];




                var type = classification == DeviceClassification.IPCamera ? MapItemType.Camera : MapItemType.Annunciator;

                var node = "";
                var channel = "";
                switch (type) {
                    case MapItemType.Camera:
                        node = "Video";
                        channel = "VideoInputChannel";
                        break;
                    case MapItemType.Annunciator:
                        node = "IO";
                        channel = "IOInputChannel";
                        break;
                }

                var result = tryCatch(function () {
                    return Client.Management().Device[node].Input.List(device.Id);
                })

                for (var j = 0; j < result[channel].length; j++) {
                    result[channel][j].SerialNumber = device.SerialNumber;
                    result[channel][j].MapItemType = type;

                    result[channel][j].DeviceName = device.Name;
                    this.value[result[channel][j].Id] = result[channel][j];

                    array.push(result[channel][j]);
                }
            }
            return array;
        },
    },
    Map: {
        value: new Dictionary(),
        load: function () {
            var result = tryCatch(function () {
                return Client.Management().Map.List();
            })
            for (var i = 0; i < result.Map.length; i++) {
                result.Map[i].Point = new Dictionary();
                result.Map[i].Name = UTF8.toChinese(base64decode(result.Map[i].Name));
                this.value[result.Map[i].Id] = result.Map[i];
            }

            return result.Map;
        },
        get: function (id) {
            var result = tryCatch(function () {
                return Client.Management().Map.Data(id);
            });
            return result;
        },
        set: function (id, name) {
            this.value[id].Name = name;
            var val = new Object();
            val.Id = id;
            val.Name = base64encode(UTF8.fromChinese(name));
            val.MapFormat = this.value[id].MapFormat;

            return 0 == tryCatch(function () {
                return Client.Management().Map.Set(val);
            });
        },
        create: function (contentType, obj, type, name) {
            var result = tryCatch(function () {
                return Client.Management().Map.Create(obj, contentType, type, base64encode(UTF8.fromChinese(name)));
            });
            return result;
        },
        "delete": function (mapId) {
            return tryCatch(function () {
                return Client.Management().Map.Delete(mapId);
            });
        },
        Point: {
            value: function (mapId) { if (mapId) return Property.Map.value[mapId].Point },
            load: function (mapId) {
                if (!mapId) return;
                var result = tryCatch(function () {
                    return Client.Management().Map.Point.List(mapId);
                });
                if (!this.value(mapId))
                    this.value(mapId) = new Dictionary();
                for (var i = 0; i < result.MapItem.length; i++) {
                    result.MapItem[i].MapId = mapId;
                    result.MapItem[i].MapIdSpecified = false;
                    if (result.MapItem[i].ComponentId && Property.Device.value[result.MapItem[i].ComponentId]) {
                        Property.Device.value[result.MapItem[i].ComponentId].MapId = mapId;
                        Property.Device.value[result.MapItem[i].ComponentId].MapIdSpecified = false;
                        Property.Device.value[result.MapItem[i].ComponentId].PointId = result.MapItem[i].Id
                        Property.Device.value[result.MapItem[i].ComponentId].PointIdSpecified = false;
                    }

                    this.value(mapId)[result.MapItem[i].Id] = result.MapItem[i];
                }
                return result.MapItem;
            },
            create: function (mapId, point) {
                var result = tryCatch(function () {
                    return Client.Management().Map.Point.Create(mapId, point);
                });
                var pointId = point.Id;
                delete this.value(mapId)[pointId];
                point.Id = result;
                this.value(mapId)[point.Id] = point;

                Property.Device.value[point.ComponentId].MapId = mapId;
                Property.Device.value[point.ComponentId].PointId = point.Id;

                return result;
            },
            "delete": function (mapId, pointId) {
                var result = tryCatch(function () {
                    return Client.Management().Map.Point.Delete(mapId, pointId);
                });

                var deviceId = this.value(mapId)[pointId].ComponentId;
                Property.Device.value[deviceId].PointId = null;
                Property.Device.value[deviceId].MapId = null;
                delete this.value(mapId)[pointId];

            },
            set: function (mapId, point) {
                var result = tryCatch(function () {
                    return Client.Management().Map.Point.Set(mapId, point);
                });
                this.value(mapId)[point.Id] = point;
                Property.Device.value[point.ComponentId].MapId = mapId;
            }
        }
    }

}

var Control = {
    Device: {
        selectedId: "",
        selectedType: "",
        load: function (controlId, classification) {
            var cameras = Property.Device.load(classification);
            var control = document.getElementById(controlId);

            for (var i = 0; i < cameras.length; i++) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.className = "text-ellipsis";

                a.innerHTML = cameras[i].Name;
                a.title = a.innerHTML;

                if (cameras[i].Point) {
                    var p = document.createElement("a");
                    p.className = "p pull-right";
                    li.appendChild(p);
                }


                li.onclick = function () {
                    var _this = this;
                    var d = $(".delete")
                    if (d && d.length > 0) {
                        d[0].parentNode.removeChild(d[0]);
                    }
                    Control.Device.selectedId = this.id;
                    $("ul .selected").removeClass("selected");
                    this.className += " selected";

                    if ($(this).hasClass("bind")) {
                        var del = document.createElement("a");
                        del.className = "delete icon-trash pull-right";
                        del.name = Property.Device.value[this.id].PointId;

                        del.onclick = function () {
                            var _this = this;
                            var device = Property.Device.value[Control.Device.selectedId];
                            var pointId = device.PointId;
                            var mapId = device.MapId;
                            if (mapId) {
                                var _img = Control.Map.get(mapId);
                                map.Load.Image(_img);
                                _img.addEventListener("load", function () {
                                    Control.Map.Point.load(mapId);
                                    var point = document.getElementById(pointId);
                                    $.confirm({
                                        text: "是否删除关联？",
                                        okButton: "确定",
                                        cancelButton: "取消",
                                        confirm: function () {
                                            Control.Map.Point["delete"](point);
                                            $(".delete").remove();
                                        }
                                    })
                                }, false);
                            }
                        }
                        this.appendChild(del);
                    }
                }
                li.onblur = function () {

                }
                li.ondblclick = function () {
                    var mapId = Property.Device.value[this.id].MapId
                    if (mapId) {
                        var _img = Control.Map.get(mapId);
                        map.Load.Image(_img);
                        _img.addEventListener("load", function () {
                            Control.Map.Point.load(mapId);
                            var point = getTag(Property.Device.value[this.id].PointId);
                            point.click();
                        }, false);
                        return;
                    }
                    if (!map.CanEdit)
                        return;
                    if (point_bind_device(this, Property.Device.value[this.id].MapItemType)) {
                        var point = getTag(Property.Device.value[this.id].PointId);
                        for (var type in MapItemType) {
                            $(point).find(".img").removeClass(MapItemType[type].toLowerCase());
                        }
                        $(point).find(".img").addClass(Property.Device.value[this.id].MapItemType.toLowerCase());
                        point.click();
                        this.className += " bind";
                    }
                }
                li.id = cameras[i].Id;
                li.appendChild(a);

                li.appendChild(document.createElement("div"));

                control.appendChild(li);
            }
        },
        bind: function (id, control, type) {
            var point = map.Point().List[control.id];
            if (point.Binding) {
                $("#" + point.Binding + ".bind").removeClass("bind");
                Property.Map.value[point.Binding].Point = null;
            }
            point.bind(id, Property.Map.value[id].Name, control, type);
            this.value[id].Point = point;
            return true;
        }
    },
    Map: {
        text: {
            isShow: true,
            set: function (sender) {

                this.isShow = !this.isShow;

                var value = "none"
                if (this.isShow) {
                    value = "";
                    sender.innerHTML = "隐藏名称";
                }
                else {
                    sender.innerHTML = "显示名称";
                }
                $(".point label").css("display", value);
            },
            get: function () {
                var value = "none"
                if (this.isShow)
                    value = "";
                $(".point label").css("display", value);
            }
        },
        selectedId: "",
        load: function (controlId) {
            Property.Map.load();
            var maps = Property.Map.value.order("Name");
            var control = document.getElementById(controlId);
            control.innerHTML = "";
            for (var i = 0; i < maps.length; i++) {
                var li = document.createElement("li");
                li.id = maps[i].Id;

                var mapName = document.createElement("div");
                mapName.className = "text-ellipsis";
                mapName.innerHTML = maps[i].Name;
                mapName.title = maps[i].Name;
                li.appendChild(mapName);




                li.onclick = function () {

                    var _img = Control.Map.get(this.id);
                    var _this = this;

                    map.Load.Image(_img);
                    _img.addEventListener("load", function () {
                        Control.Map.Point.load(_this.id);
                    }, false);
                    try {
                        var d = $(".delete");
                        if (d && d.length > 0) {
                            d[0].parentNode.removeChild(d[0]);
                        }



                        var del = document.createElement("a");
                        del.className = "delete icon-trash pull-right";

                        del.onclick = function () {
                            var _this = this;
                            $.confirm({
                                text: "是否删除地图？",
                                okButton: "确定",
                                cancelButton: "取消",
                                confirm: function () {
                                    Property.Map["delete"](Control.Map.selectedId);
                                    document.location = document.location;

                                }
                            })
                        }
                        this.appendChild(del);
                    } catch (e) {

                    }
                    try {
                        var ed = $(".edit")
                        if (ed && ed.length > 0) {
                            ed[0].parentNode.removeChild(ed[0]);
                        }

                        var edit = document.createElement("a");
                        edit.className = "edit icon-edit pull-right";
                        edit.onclick = function () {
                            var control = $("#" + Control.Map.selectedId + " .text-ellipsis")[0];
                            $.confirm({
                                text: '<div class="page-title"><h3 class="list-heading-div"><label id="lblDeviceDetailTitle">地图名称</label></h3></div><div class="row"><div class="col-md-12"><div class="widget-content padded"><input id="txtMapNmae" class="form-control" type="text" value="' + control.innerHTML + '"/></div></div></div>',
                                okButton: "确定",
                                cancelButton: "取消",
                                confirm: function () {
                                    var name = document.getElementById("txtMapNmae").value;
                                    if (Property.Map.set(Control.Map.selectedId, name)) {
                                        control.innerHTML = name;
                                        control.title = name;
                                    }
                                }
                            });
                        }

                        this.appendChild(edit);
                    } catch (e) {

                    }
                }



                control.appendChild(li);
            }
        },
        upload: function (e, invoked) {
            var reader = new FileReader();
            var file = e.target.files !== undefined ? e.target.files[0] : (e.target.value ? { name: e.target.value.replace(/^.+\\/, '') } : null)
            if (!file) return;
            this.$hidden.val('')
            this.$hidden.attr('name', '')
            this.$input.attr('name', this.name)
            if ((typeof file.type !== "undefined" ? file.type.match('image.*') : file.name.match(/\.(gif|png|jpe?g)$/i)) && typeof FileReader !== "undefined") {
                var reader = new FileReader()

                var name = file.name.substr(0, file.name.lastIndexOf("."));
                var type = MapFormat.Jpeg;
                var ctype = file.type;
                for (var key in MapFormat) {
                    if (file.type.indexOf(key.toLowerCase()) >= 0) {
                        type = key;
                        break;
                    }
                }
                reader.onload = function (e) {
                    Property.Map.create(ctype, e.target.result, type, name);

                    Control.Map.load("ulMap");
                }
                reader.readAsArrayBuffer(file)
            } else {
                this.$preview.text(file.name)
                this.$element.addClass('fileupload-exists').removeClass('fileupload-new')
            }
        },
        get: function (id) {
            var img = document.createElement("img");
            var src = Property.Map.get(id);
            img.src = src;

            this.selectedId = id;
            return img;
        },
        Point: {
            load: function (mapId) {
                map.Point().clear();
                var points = Property.Map.Point.load(mapId);
                if (!points) return;

                $("#ulCamera.bind").removeClass("bind");
                for (var i = 0; i < points.length; i++) {
                    var p = points[i];

                    var x = p.Coordinate.X * map.getImage().width;
                    var y = p.Coordinate.Y * map.getImage().height;

                    var device = Property.Device.value[p.ComponentId];
                    if (device) {
                        $("#" + device.Id).addClass("bind");

                        var point = new Point(p.Id, x, y, map.getImage().width, map.getImage().height, p.ComponentId, device.Name);
                        point.Type = device.MapItemType;
                        point.Angle = p.Angle;
                        map.Point().List[p.Id] = point;
                    }
                }
                map.Load.Point();
                Control.Map.text.get();
            },
            bind: function (deviceId, control, type) {
                //id, control
                var mapId = Control.Map.selectedId;

                var point = map.Point().List[control.id];
                if (point.Binding) {
                    $("#" + point.Binding + ".bind").removeClass("bind");
                    try {
                        Property.Map.Point["delete"](mapId, point.Id);
                    } catch (e)
                    { }
                }


                var mapItem = new MapItem();
                mapItem.Id = point.Id;
                mapItem.ComponentId = deviceId;
                mapItem.ItemType = type;

                var coordinate = new Coordinate();
                coordinate.X = point.Percentage.X();
                coordinate.Y = point.Percentage.Y();

                mapItem.Coordinate = coordinate;


                var mapItems = Property.Map.Point.value(mapId);
                var result = Property.Map.Point.create(mapId, mapItem);

                var controlId = control.id;


                map.Point().List[result] = map.Point().List[controlId];
                delete map.Point().List[controlId]
                map.Point().List[result].Id = result;
                control.id = result;






                point.bind(deviceId, Property.Device.value[deviceId].Name, control, type);
                return true;
            },
            "delete": function (control) {

                var deviceId = Property.Map.Point.value(Control.Map.selectedId)[control.id].ComponentId;
                Property.Map.Point["delete"](Control.Map.selectedId, control.id);
                $("#" + deviceId + ".bind").removeClass("bind");
                map.Point()["Delete"](control.id);
            },
            selected: function () {
                var ps = $(".point.selected");
                if (ps.length > 0)
                    return ps[0];
                return null;
            },
            rotate: function (sender) {
                map.CanDrag = !map.CanDrag;

                var css = "primary";
                if (!map.CanDrag)
                    css = "danger"

                sender.className = "btn btn-" + css + "-outline";

                var tempAngle = 0;
                var parent = this;
                MapPointAngleEvent.onmouseup = function () {
                    var point = parent.selected();
                    if (point) {
                        var mapId = Control.Map.selectedId;
                        var point = Property.Map.Point.value(mapId)[point.id];
                        point.Angle = tempAngle < 0 ? 360 + tempAngle : tempAngle;

                        Property.Map.Point.set(Control.Map.selectedId, point);
                    }
                }

                MapPointAngleEvent.onmousseover = function (angle) {
                    tempAngle = angle;
                }
            }
        }
    }
}