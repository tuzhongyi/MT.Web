var jumpHref = document.createElement("a");
var adc = null;
var IndexProperty = {
    Record: {
        MaxSaveCount: 50,
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
var IndexHtml = {
    Contrast: {
        count: 0,
        add: function (record) {
            if (record) {
                var list = document.getElementById("indexAlarmList");
                var item = this.createItem(record);
                if (list && item) {
                    var tags = list.getElementsByClassName("picture-contrast");
                    var tag = null;
                    if (tags && tags.length > 0) {
                        tag = tags[0];
                    }
                    list.insertBefore(item, tag);
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
                template.getElementsByClassName("left-picture")[0].src = IndexProperty.Picture.get(record.FaceSnapData.FacePictureId);
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
                    template.getElementsByClassName("right-picture")[0].src = IndexProperty.Picture.get(record.FaceAppendData.PictureId);
                }
            }
            template.getElementsByClassName("right-picture-info-text")[0].innerHTML = record.Confidence ? record.Confidence + "%" : "未知";
            return template.children[0];
        }
    }
}
function indexInit() {
    adc = Client.ADC();
    adc.NotificationEvent = function (notify) {
        if (notify) {
            switch (notify.EventType) {
                case EventType.FaceMatch:
                    var record = IndexProperty.Record.get(notify.EventId);
                    if (document.getElementById("monitorPictureContrastList")) {
                        Html.Contrast.add(record);
                        if (document.getElementById("monitorPictureSnapList")) {
                            Html.Snap.add(record);
                        }
                    }
                    else {
                        if (!$("#indexAlarmDiv").hasClass("show")) {
                            $("#indexAlarmBtn").find(".count").removeClass("hide");
                            // $("#indexAlarmDiv").removeClass("hide");
                            var elCount = document.getElementById("indexAlarmBtn").getElementsByClassName("point")[0];
                            elCount.innerText = parseInt(elCount.innerText) + 1;
                        }
                    }
                    IndexHtml.Contrast.add(record);
                    break;
                case EventType.FaceDetect:
                    var record = IndexProperty.Record.get(notify.EventId);
                    if (document.getElementById("monitorPictureSnapList")) {
                        Html.Snap.add(record);
                    }
                    break;
                default:
                    break;
            }
        }
    }
    $('#indexAlarmDiv2').slimScroll({
        height: "94%"
    });
    var session = getCookie("sid")
    var username = getCookie("username");
    adc.Connection(session, username);
    var page = loadPage("template.htm");
    $("#hidden-template").append($(page));
    var page2 = loadPage("template2.html");
    $("#hidden-template2").append($(page2));
    var url = new Uri(document.location);
    if (url.Querys && url.Querys.page) {
        loadContent(url.Querys.page);
    }
    else {
        loadContent("page", base64encode(navigation.monitor));
    }
}
function loadContent(id, uri) {
    $('body').css('overflow', 'auto');
    $(".shade").hide();
    if (loadPageCallBcak) {
        loadPageCallBcak();
    }
    closeModelWindowCallback = null;
    loadPageCallBcak = null;
    toClearInterval();
    LazyLoadPage = null;
    window.onresize = null;
    loadOtherPage(id, base64decode(uri));
}

function loadOtherPage(id, uri) {
    var element = document.createElement("div");
    var vessel = document.getElementById(id);
    vessel.innerHTML = "";
    var request = new XMLHttpRequest();
    request.open("GET", uri, false);
    request.send(null);
    var page = request.responseText;
    page = page.substr(page.indexOf("<body>"));
    page = page.substr(6, page.indexOf("</body>") - 6);
    element.innerHTML = page;
    $($.parseHTML(element.outerHTML, document, true)).appendTo(vessel);
}

var navigation =
    {
        index: {
            home: "fr/monitor/monitor.htm"
        },
        monitor: "fr/monitor/monitor.htm",
        face: {
            search: {
                faceset: "fr/face/faceset_search.htm",
                comparison: {
                    face:"fr/face/comparison_face_search.htm",
                    picture:"fr/face/comparison_search.htm",
                }
            }
        },
        device: {
            nvr: {
                faceset: {
                    list: "fr/device/nvr/facesets/faceset.htm",
                    details: "fr/device/nvr/facesets/faceset_details.htm"
                },
                list: "fr/device/nvr/nvr.htm",
            },
            camera: {
                list: "fr/device/nvr/camera.htm",
            },
            searching: {
                list: "fr/search/search.htm"
            }
        },
        groups: {
            list: "fr/group/group.htm"
        },
        set: {
            alarm: "fr/set/setAlarm.htm",
            comparison: "fr/set/setComparison.htm"
        },
        record: {
            list: "fr/record/records.htm",
        },
        help: "fr/help/help.html"
    }

function setUrlRandomParams(url) {
    var i = url.indexOf("?");
    url += i > -1 ? "&" : "?";
    url += "r=" + Math.random();

    return url;
}

function selectNav(element) {
    var navItems = document.getElementsByClassName("nav-item");
    for (var i = 0; i < navItems.length; i++) {
        $(navItems[i]).removeClass("selected")
    }
    $(element).addClass("selected")
}

var closeModelWindowCallback = null;
var loadPageCallBcak = null;

function closeModelWindow() {
    $(".shade").hide();
    // $('.model-window-div').addClass("hide");
    if (closeModelWindowCallback) {
        closeModelWindowCallback();
    }
}

function alarmBtnClick(element) {
    $(element).find(".count").addClass("hide");
    var elCount = element.getElementsByClassName("point")[0];
    elCount.innerText = 0;
}