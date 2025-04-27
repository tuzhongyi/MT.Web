var Property = {
    Device: {
        value: new Dictionary(),
        list: function () {
            var userId = getCookie("uid");
            this.Input.list(userId);
        },
        get: function (deviceId) {
            var device = tryCatch(function () {
                return Client.Management().Device.Get(deviceId);
            });
            if (device) {
                this.value[device.Id] = device;
                this.value[device.Id].Inputs = new Array();
            }
        },
        Input: {
            value: new Dictionary(),
            list: function (userId) {
                var inputs = tryCatch(function () {
                    return Client.Security().User.Video.Input.List(userId);
                })
                if (inputs) {
                    for (var i = 0; i < inputs.VideoInputChannelPermission.length; i++) {
                        var input = inputs.VideoInputChannelPermission[i].VideoInputChannel;
                        var deviceId = new Id(input.Id).getDeviceId();
                        if (!Property.Device.value[deviceId]) {
                            Property.Device.get(deviceId);
                        }
                        Property.Device.value[deviceId].Inputs.push(input);
                    }
                }
            }
        }
    },
    Record: {
        value: new Dictionary(),
        get: function (recordId) {
            var record = tryCatch(function () {
                return Client.Management().Event.FaceDetect.Records.Get(recordId);
            });
            if (record)
                this.value[record.Id] = record;
            return record;
        }
    },
    Picture: {
        get: function (pictrueId) {
            return tryCatch(function () {
                return Client.Medium().Picture.Data(pictrueId);
            });
        }
    }
}

var Html = {
    sid: null,
    username: null,
    Video: {
        List: {
            create: function () {
                Property.Device.list();
                var devices = Property.Device.value.toArray();
                var list = document.getElementById("videoInputTreeList");
                for (var i = 0; i < devices.length; i++) {
                    if (devices[i].Classification == DeviceClassification.FDCamera || devices[i].Classification == DeviceClassification.FDNVR) {
                        var item = this.createItem(devices[i]);
                        list.appendChild(item);
                    }
                }
                $('#videoInputTreeList').nestable({
                    group: 1
                });
                $('#videoInputTreeList').nestable('collapseAll');
            },
            createItem: function (device) {
                var ol = document.createElement("ol");
                ol.className = "dd-list";
                var li = document.createElement("li");
                li.className = "dd-item dd3-item";
                var divIcon = document.createElement("div");

                var iconClass;
                switch (device.Classification) {
                    case DeviceClassification.FDCamera:
                        iconClass = "howell-icon-camera-face-recognition";
                        break;
                    case DeviceClassification.FDNVR:
                        iconClass = "howell-icon-servernetwork";
                        break;
                    default: iconClass = "mdi mdi-file-video";
                }
                divIcon.className = "dd-nodrag dd3-handle " + iconClass;
                var divName = document.createElement("div");
                divName.className = "dd3-content"
                divName.innerText = device.Name;
                li.appendChild(divIcon);
                li.appendChild(divName);
                var childItem = this.createChildItem(device.Inputs);
                li.appendChild(childItem);
                ol.appendChild(li);
                return ol;
            },
            createChildItem: function (inputs) {
                var ol = document.createElement("ol");
                ol.className = "dd-list";
                for (var i = 0; i < inputs.length; i++) {
                    var a = document.createElement("a");
                    a.className = "dd-item dd3-item";
                    var divIcon = document.createElement("div");
                    divIcon.className = "dd-nodrag dd3-handle mdi mdi-video";
                    var divName = document.createElement("div");
                    divName.className = "dd3-content"
                    divName.innerText = inputs[i].Name;
                    a.appendChild(divIcon);
                    a.appendChild(divName);
                    var example = "rtmp://192.168.18.245/stream?dev_id=00310101031111111000002000000000&slot=1&stream=2&mode=live&user=admin&password=12345"
                    var uri = new Uri(example);
                    uri.Host = Client.Host;

                    var id = new Id(inputs[i].Id);

                    uri.Querys.dev_id = id.getDeviceId();
                    uri.Querys.slot = parseInt(id.ModuleId.No);
                    uri.Querys.stream = 1;
                    uri.Querys.user = Html.username;
                    uri.Querys.password = Html.sid;
                    a.href = uri.toString();
                    a.onclick = preview;
                    ol.appendChild(a);
                }
                return ol;
            }
        },
        Preview: {

        }
    },
    Alarm: {
        closeMode: "auto",
        closeWindewInterval: 10000,
        closeWindewTimer: null,
        createWindewTimer: function () {
            this.closeWindewTimer = toSetInterval(function () {
                var alarms = Property.Record.value.toArray();
                if (alarms && alarms.length > 0) {
                    var alarmElement = document.getElementById("alarm_" + alarms[alarms.length - 1].Id);
                    if (alarmElement) {
                        alarmElement.parentNode.removeChild(alarmElement);
                    }
                    delete Property.Record.value[alarms[alarms.length - 1].Id];
                }
                else {
                    Html.Alarm.clearWindewTimer();
                }
            }, Html.Alarm.closeWindewInterval);
        },
        clearWindewTimer: function () {
            if (this.closeWindewTimer) {
                toClearInterval(this.closeWindewTimer);
            }
            this.closeWindewTimer = null;
        },
        show: function (record) {
            Property.Record.value[record.Id] = record;
            var template = document.createElement("div");
            template.innerHTML = document.getElementsByClassName("template-match-info")[0].innerHTML;

            template.getElementsByClassName("left-content-text-title-words")[0].innerHTML = "抓拍信息";
            template.getElementsByClassName("left-content-text-title-icon")[0].className += " howell-icon-camera-face-recognition";
            template.getElementsByClassName("right-content-text-title-icon")[0].className += " mdi mdi-account-box";
            template.getElementsByClassName("right-content-text-title-words")[0].innerHTML = "数据库信息";
            template.getElementsByClassName("center-title-text-container")[0].innerHTML = "目标警告";
            template.getElementsByClassName("left-title-text-container-words")[0].innerHTML = record.Name;
            template.getElementsByClassName("left-title-text-container-icon")[0].className += " fa fa-video-camera";
            template.getElementsByClassName("right-title-text-container-icon")[0].className += " mdi mdi-clock";
            var date = new Date(record.AlarmTime);
            template.getElementsByClassName("right-title-text-container-words")[0].innerHTML = date.format("yyyy年MM月dd日 HH:mm:ss");
            template.getElementsByClassName("contrast-title")[0].innerHTML = "匹配度";
            template.getElementsByClassName("contrast-content")[0].innerHTML = record.Confidence ? record.Confidence + "%" : "未知";

            if (record.FaceSnapData) {
                if (record.FaceSnapData.Feature) {
                    var leftContainer = template.getElementsByClassName("left-content-container")[0];
                    if (record.FaceSnapData.Feature.Age || record.FaceSnapData.Feature.Age == 0) {
                        var age = document.createElement("div");
                        age.className = "content-text";
                        age.innerHTML = record.FaceSnapData.Feature.Age + "岁";
                        leftContainer.appendChild(age)
                    }
                    if (record.FaceSnapData.Feature.Sex && record.FaceSnapData.Feature.Sex != Sex.None) {
                        var sex = document.createElement("div");
                        sex.className = "content-text";
                        sex.innerHTML = Language.Enum.Sex[record.FaceSnapData.Feature.Sex];
                        leftContainer.appendChild(sex);
                    }
                    if (record.FaceSnapData.Feature.EyeGlass || record.FaceSnapData.Feature.EyeGlass == false) {
                        var eyeGlass = document.createElement("div");
                        eyeGlass.className = "content-text";
                        eyeGlass.innerHTML = record.FaceSnapData.Feature.EyeGlass ? "戴眼镜" : "不戴眼镜";
                        leftContainer.appendChild(eyeGlass);
                    }
                }
                template.getElementsByClassName("left-picture")[0].src = Property.Picture.get(record.FaceSnapData.FacePictureId);
            }

            if (record.FaceAppendData) {
                var rightContainer = template.getElementsByClassName("right-content-container")[0];
                var name = document.createElement("div");
                name.className = "content-text text-highlight";
                name.innerHTML = record.FaceAppendData.Name;
                rightContainer.appendChild(name);
                if (record.FaceAppendData.Sex && record.FaceAppendData.Sex != Sex.None) {
                    var sex = document.createElement("div");
                    sex.className = "content-text";
                    sex.innerHTML = Language.Enum.Sex[record.FaceAppendData.Sex];
                    rightContainer.appendChild(sex);
                }
                if (record.FaceAppendData.BirthDate) {
                    var birthDate = document.createElement("div");
                    birthDate.className = "content-text";
                    var date = new Date(record.FaceAppendData.BirthDate);
                    birthDate.innerHTML = date.format("yyyy年MM月dd日");
                    rightContainer.appendChild(birthDate);
                }
                if (record.FaceAppendData.Phone) {
                    var phone = document.createElement("div");
                    phone.className = "content-text";
                    phone.innerHTML = record.FaceAppendData.Phone;
                    rightContainer.appendChild(phone);
                }
                if (record.FaceAppendData.Province || record.FaceAppendData.City) {
                    var province = document.createElement("div");
                    province.className = "content-text";
                    province.innerHTML = "";
                    if (record.FaceAppendData.Province) {
                        province.innerHTML = record.FaceAppendData.Province + " ";
                    }
                    if (record.FaceAppendData.City) {
                        province.innerHTML += record.FaceAppendData.City;
                    }
                    rightContainer.appendChild(province);
                }
                if (record.FaceAppendData.CardType) {
                    var cardType = document.createElement("div");
                    cardType.className = "content-text";
                    cardType.innerHTML = record.FaceAppendData.CardType;
                    rightContainer.appendChild(cardType);
                }
                if (record.FaceAppendData.CardNumber) {
                    var cardNumber = document.createElement("div");
                    cardNumber.className = "content-text";
                    cardNumber.innerHTML = record.FaceAppendData.CardNumber;
                    rightContainer.appendChild(cardNumber);
                }
                if (record.FaceSet) {
                    template.getElementsByClassName("right-picture")[0].src = Property.Picture.get(record.FaceAppendData.PictureId);
                }
            }
            template.children[0].className += " background-color-danger alarm-window";
            template.getElementsByClassName("fr-match-container-title")[0].className += " danger";
            template.children[0].id = "alarm_" + record.Id;
            template.getElementsByClassName("ti-close")[0].onclick = function () {
                this.parentNode.parentNode.removeChild(this.parentNode);
            };
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(template.children[0]);
            if (Html.Alarm.closeMode == "auto") {
                if (Html.Alarm.closeWindewTimer) {
                    Html.Alarm.clearWindewTimer();
                }
                Html.Alarm.createWindewTimer();
            }
        }
    },
    Snap: {
        count: 0,
        add: function (record, isAcs) {
            if (record) {
                var list = document.getElementById("monitorPictureSnapList");
                var item = this.createItem(record);
                if (list && item) {
                    if (isAcs)
                        list.appendChild(item);
                    else {
                        var tags = list.getElementsByClassName("small-pciture-info");
                        var tag = null;
                        if (tags && tags.length > 0) {
                            tag = tags[0];
                        }
                        list.insertBefore(item, tag);
                    }
                    this.count++;
                    if (this.count > IndexProperty.Record.MaxSaveCount) {
                        var items = list.getElementsByClassName("small-pciture-info");
                        if (items && items.length > 0) {
                            var delItem = items[items.length - 1];
                            if (delItem) {
                                delItem.parentNode.removeChild(delItem);
                            }
                        }
                    }
                }
            }
        },
        createItem: function (record) {
            var template = document.createElement("div");
            template.innerHTML = document.getElementsByClassName("template-small-pciture-info")[0].innerHTML;
            template.getElementsByClassName("small-pciture-info")[0].className += " col-xlg-2 col-lg-2 col-md-2";
            template.getElementsByClassName("top-title")[0].innerHTML = record.Name;
            template.getElementsByClassName("top-title")[0].title = record.Name;
            var date = new Date(record.AlarmTime);
            template.getElementsByClassName("bottom-title")[0].innerHTML = date.format("HH:mm:ss");
            template.getElementsByClassName("bottom-title")[0].innerHTML.title = date.format("HH:mm:ss");
            if (record.FaceSnapData) {
                template.getElementsByClassName("picture")[0].src = Property.Picture.get(record.FaceSnapData.FacePictureId);
            }
            return template.children[0];
        }
    },
    Contrast: {
        count: 0,
        add: function (record, isAcs, isOld) {
            if (record) {
                var list = document.getElementById("monitorPictureContrastList");
                var item = this.createItem(record);
                if (list && item) {
                    if (isAcs)
                        list.appendChild(item)
                    else {
                        var tags = list.getElementsByClassName("picture-contrast");
                        var tag = null;
                        if (tags && tags.length > 0) {
                            tag = tags[0];
                        }
                        list.insertBefore(item, tag);
                    }
                    if (!isOld)
                        Html.Alarm.show(record);
                    this.count++;
                    if (this.count > IndexProperty.Record.MaxSaveCount) {
                        var items = list.getElementsByClassName("picture-contrast");
                        if (items && items.length > 0) {
                            var delItem = items[items.length - 1];
                            if (delItem) {
                                delItem.parentNode.removeChild(delItem);
                            }
                        }
                    }
                }
            }
        },
        createItem: function (record) {
            var template = document.createElement("div");
            template.innerHTML = document.getElementsByClassName("template-contrast-info")[0].innerHTML;
            template.getElementsByClassName("left-title-words")[0].innerHTML = record.Name;
            template.getElementsByClassName("left-title-icon")[0].className += " fa fa-video-camera";
            template.getElementsByClassName("right-title-icon")[0].className += " mdi mdi-clock";
            var date = new Date(record.AlarmTime);
            template.getElementsByClassName("right-title-words")[0].innerHTML = date.format("HH:mm:ss");
            template.getElementsByClassName("left-content-title-words")[0].innerHTML = "抓拍信息";
            template.getElementsByClassName("right-content-title-words")[0].innerHTML = "数据库信息";
            template.getElementsByClassName("left-content-title-icon")[0].className += " howell-icon-camera-face-recognition";
            template.getElementsByClassName("right-content-title-icon")[0].className += " mdi mdi-account-box";

            if (record.FaceSnapData) {
                if (record.FaceSnapData.Feature) {
                    var leftContainer = template.getElementsByClassName("left-info-container")[0];
                    if (record.FaceSnapData.Feature.Sex && record.FaceSnapData.Feature.Sex != Sex.None) {
                        var sex = document.createElement("div");
                        sex.className = "info-text";
                        sex.innerHTML = Language.Enum.Sex[record.FaceSnapData.Feature.Sex];
                        leftContainer.appendChild(sex);
                    }
                    if (record.FaceSnapData.Feature.Age || record.FaceSnapData.Feature.Age == 0) {
                        var age = document.createElement("div");
                        age.className = "info-text";
                        age.innerHTML = record.FaceSnapData.Feature.Age + "岁";
                        leftContainer.appendChild(age)
                    }
                    if (record.FaceSnapData.Feature.EyeGlass || record.FaceSnapData.Feature.EyeGlass == false) {
                        var eyeGlass = document.createElement("div");
                        eyeGlass.className = "info-text";
                        eyeGlass.innerHTML = record.FaceSnapData.Feature.EyeGlass ? "戴眼镜" : "不戴眼镜";
                        leftContainer.appendChild(eyeGlass);
                    }
                }
                template.getElementsByClassName("left-picture")[0].src = Property.Picture.get(record.FaceSnapData.FacePictureId);
            }

            if (record.FaceAppendData) {
                var rightContainer = template.getElementsByClassName("right-info-container")[0];
                var name = document.createElement("div");
                name.className = "font-color-danger";
                name.innerHTML = record.FaceAppendData.Name;
                rightContainer.appendChild(name);
                if (record.FaceAppendData.Sex && record.FaceAppendData.Sex != Sex.None) {
                    var sex = document.createElement("div");
                    sex.className = "info-text";
                    sex.innerHTML = Language.Enum.Sex[record.FaceAppendData.Sex];
                    rightContainer.appendChild(sex);
                }
                if (record.FaceAppendData.BirthDate) {
                    var birthDate = document.createElement("div");
                    birthDate.className = "info-text";
                    var date = new Date(record.FaceAppendData.BirthDate);
                    birthDate.innerHTML = date.format("yyyy年MM月dd日");
                    rightContainer.appendChild(birthDate);
                }
                if (record.FaceSet) {
                    var faceSetName = document.createElement("div");
                    faceSetName.className = "content-text";
                    faceSetName.innerHTML = record.FaceSet.Name
                    rightContainer.appendChild(faceSetName);
                    template.getElementsByClassName("right-picture")[0].src = Property.Picture.get(record.FaceAppendData.PictureId);
                }
            }
            template.getElementsByClassName("right-picture-info-text")[0].innerHTML = record.Confidence ? record.Confidence + "%" : "未知";
            return template.children[0];
        }
    }
}

function monitorInit() {
    $("#indexAlarmBtn").find(".count").addClass("hide");
    $("#indexAlarmDiv").addClass("hide");
    var elCount = document.getElementById("indexAlarmBtn").getElementsByClassName("point")[0];
    elCount.innerText = 0;
    loadOldRecord();

    var autoCloseMode = getCookie("autoCloseMode");
    var alarmAutoCloseInterval = getCookie("alarmAutoCloseInterval");
    if (alarmAutoCloseInterval) {
        Html.Alarm.closeWindewInterval = parseInt(alarmAutoCloseInterval) * 1000;
    }
    if (autoCloseMode) {
        Html.Alarm.closeMode = autoCloseMode;
    }
    var session = getCookie("sid")
    var username = getCookie("username");
    Html.sid = session;
    Html.username = username;
    $('#monitorPictureContrastList').slimScroll({
        height: "94%"
    });
    $('#monitorPictureSnapListContainer').slimScroll({
        height: "83.5%"
    });
    $('#videoInputTreeList').slimScroll({
        height: "92%"
    });


    // var bars = '.jspHorizontalBar, .jspVerticalBar';

    // $('#test').bind('jsp-initialised', function (event, isScrollable) {

    //     //hide the scroll bar on first load
    //     $(this).find(bars).hide();

    // }).jScrollPane().hover(

    //     //hide show scrollbar
    //     function () {
    //         $(this).find(bars).stop().fadeTo('fast', 0.9);
    //     },
    //     function () {
    //         $(this).find(bars).stop().fadeTo('fast', 0);
    //     }

    //     );


    Html.Video.List.create();
}

function preview() {
    // var selected = $(".video.selected");
    // if (!selected && selected.length == 0)
    //     return;

    var div = document.getElementById("divVideo");
    var id = div.id;

    $("#videoInputTreeList").find(".selected").removeClass("selected");
    $(this).addClass("selected");
    // $(".preview .selected").removeClass("selected");
    // this.className += " selected";


    inputId = this.id;
    deviceId = new Id(inputId).getDeviceId();

    // var PTZBtns = getTag("btnPTZ", getTagType.Name);
    // var permission = player.Devices[inputId].Permission;
    // if (permission == VideoSourcePermissions.All || permission.indexOf(VideoSourcePermissions.PTZ) > -1) {
    //     for (var i = 0; i < PTZBtns.length; i++) {
    //         PTZBtns.removeClass("disable");
    //     }
    // }
    // else {
    //     for (var i = 0; i < PTZBtns.length; i++) {
    //         PTZBtns.addClass("disable");
    //     }
    // }

    var uri = new Uri(this.href);
    // uri.Querys.stream = streamNo;

    var height = div.offsetWidth / 16.0 * 9.0;


    var jw = jwplayer(id).setup({
        file: uri.toString(),
        height: 1,
        width: 1,
        className: "video-control selected",
        //paddingTop: paddingTop,
        //paddingBottom: paddingBottom,
        stretching: "exactfit",
        controlbar: "none",
        click: function (e) {
            $(".video-control").removeClass("selected");
            e.currentTarget.className += " selected";
        },
        autostart: true,
        rtmp: {
            bufferlength: 0.1
        },
        fullscreen: false,
        mask: {
            className: "mask",
            ondblclick: function () {
                isdblclick = true;
                if (isFullScreen.get())
                    isFullScreen.set(false);
                else
                    single_full_screen();
            }
        },
        primary: "html5",
        events: {
            onPause: function (e) {
                //jwplayer(id).play();
                //jwplayer(id).pause(false);

            },
            onFullscreen: function (obj) {
                //isFullScreen = obj.fullscreen;
            },
            onDisplayClick: function (e) {
                this.pause(false);
            },

        }


    });

    // var jw = jwplayer(id).setup({
    //     file: uri.toString(),
    //     height: 1,
    //     width: 1,
    //     className: "video selected",
    //     stretching: "exactfit",
    //     controlbar: "none",
    //     click: function (e) {
    //         // $(".video").removeClass("selected");
    //         // e.currentTarget.className += " selected";
    //     },
    //     autostart: true,
    //     rtmp: {
    //         bufferlength: 0.1
    //     },
    //     fullscreen: false,
    //     mask: {
    //         className: "mask",
    //         ondblclick: function () {
    //             // isdblclick = true;
    //             // if (isFullScreen.get())
    //             //     isFullScreen.set(false);
    //             // else
    //             //     single_full_screen();
    //         }
    //     },
    //     primary: "html5",
    //     events: {
    //         onPause: function (e) {

    //         },
    //         onFullscreen: function (obj) {
    //         },
    //         onDisplayClick: function (e) {
    //             this.pause(false);
    //         },

    //     }


    // });
    return false;
}

function loadOldRecord() {
    var recordArray = IndexProperty.Record.value.toArray();
    var matchCount = 0;
    var detectCount = 0;
    debugger;
    for (var i = recordArray.length - 1; i > -1; i--) {
        if (matchCount > IndexProperty.Record.MaxSaveCount) {
            break;
        }
        if (detectCount > IndexProperty.Record.MaxSaveCount && recordArray[i].EventType != EventType.FaceMatch) {
            continue;
        }
        if (recordArray[i].EventType == EventType.FaceMatch) {
            Html.Contrast.add(recordArray[i], true, true);
            Html.Snap.add(recordArray[i], true);
            matchCount++;
            detectCount++;
        }
        if (recordArray[i].EventType == EventType.FaceDetect) {
            Html.Snap.add(recordArray[i], true);
            detectCount++;
        }
    }
}

loadPageCallBcak = function () {
    $("#indexAlarmDiv").removeClass("hide");
    var alarmWindows = document.getElementsByClassName("alarm-window");
    while (alarmWindows.length > 0) {
        alarmWindows[0].parentNode.removeChild(alarmWindows[0]);
    }
}

// $(window).resize(function() {
//     $('#test').bind('jsp-initialised', function (event, isScrollable) {

//                 //hide the scroll bar on first load
//                 $(this).find(bars).hide();

//             }).jScrollPane().hover(

//                 //hide show scrollbar
//                 function () {
//                     $(this).find(bars).stop().fadeTo('fast', 0.9);
//                 },
//                 function () {
//                     $(this).find(bars).stop().fadeTo('fast', 0);
//                 }

//                 );
//   });

var IsFullScreen = function () {
    var is = false;
    this.get = function () {
        return is;
    }
    this.set = function (val) {
        if (is == val) return;
        is = val;
        if (onfullscreenchanged)
            onfullscreenchanged(is);
    }
}
var onfullscreenchanged = function (is) {
    if (!is) {
        var video = $(".video-control.selected");
        video.css("width", beforeFullScreen.width).css("height", beforeFullScreen.height);
        fullExit();
    }
}
var isFullScreen = new IsFullScreen();

function fullExit() {
    var element = document.documentElement;//若要全屏页面中div，var element= document.getElementById("divID");
    //IE ActiveXObject
    if (window.ActiveXObject) {
        var WsShell = new ActiveXObject('WScript.Shell')
        WsShell.SendKeys('{ESC}');
    }
        //HTML5 W3C 提议
    else if (element.requestFullScreen) {
        document.exitFullscreen();
    }
        //IE 11
    else if (element.msRequestFullscreen) {
        document.msExitFullscreen();
    }
        // Webkit (works in Safari5.1 and Chrome 15)
    else if (element.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    }
        // Firefox (works in nightly)
    else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
}

var beforeFullScreen = {
    width: "100%",
    height: "100%",
    changed: false
};

function single_full_screen() {
    var video = $(".video-control.selected");
    beforeFullScreen.width = video[0].style.width;
    beforeFullScreen.height = video[0].style.height;
    beforeFullScreen.changed = false;
    video.css("width", "100%").css("height", "100%");
    full_screen(video[0]);
}

function full_screen(element) {
    isEsc = true;
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) {
        requestMethod.call(element);
        isFullScreen.set(true);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
            isFullScreen.set(true);
        }
    }
}