var Html = {
    selectInputId: null,
    selectDeviceId: null,
    faceContrasts: null,
    juicy: null,
    currentItemSchedule: null,
    Device: {
        List: {
            create: function (listId) {
                Property.Device.list();
                var devices = Property.Device.value.toArray();
                var list = document.getElementById(listId);
                for (var i = 0; i < devices.length; i++) {
                    if (devices[i].Classification == DeviceClassification.FDCamera || devices[i].Classification == DeviceClassification.FDNVR) {
                        if (devices[i].FaceContrastSupported) {
                            var item = this.createItem(devices[i]);
                            list.appendChild(item);
                        }
                    }
                }
                $('#' + listId).nestable({
                    group: 1
                });
                $('#' + listId).nestable('collapseAll');
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
                    a.className = "dd-item dd3-item cursor-pointer";
                    var divIcon = document.createElement("div");
                    divIcon.className = "dd-nodrag dd3-handle mdi mdi-video";
                    var divName = document.createElement("div");
                    divName.className = "dd3-content"
                    divName.innerText = inputs[i].Name;
                    a.appendChild(divIcon);
                    a.appendChild(divName);
                    a.id = inputs[i].Id;
                    a.onclick = function () {
                        $("#videoInputTreeList").find(".selected").removeClass("selected");
                        $(this).addClass("selected");
                        Html.Device.FaceSet.List.remove("facesetList");
                        Html.selectInputId = this.id;
                        Html.selectDeviceId = new Id(Html.selectInputId).getDeviceId();
                        Html.Device.FaceSet.List.create("facesetList", Html.selectDeviceId);
                        Html.faceContrasts = new Array();
                        Html.faceContrasts = Property.Device.Input.FaceContrasts.get(Html.selectDeviceId, Html.selectInputId);
                        if (Html.faceContrasts.length > 0) {
                            Html.FaceContrasts.fill(Html.faceContrasts[0]);
                            Html.Device.FaceSet.List.setSelected(Html.faceContrasts[0]);
                        }
                        var handle = Property.Device.Input.FaceContrasts.Alert.Handle.get(Html.selectDeviceId, Html.selectInputId);
                        if (handle) {
                            Html.FaceContrasts.Alert.Handle.fill(handle);
                        }
                        var schedule = Property.Device.Input.FaceContrasts.Alert.Schedule.get(Html.selectDeviceId, Html.selectInputId);
                        if (schedule) {
                            Html.FaceContrasts.Alert.Schedule.fill(schedule);
                        }
                    };
                    ol.appendChild(a);
                }
                return ol;
            }
        },
        FaceSet: {
            List: {
                create: function (listId, deviceId) {
                    Property.Device.FaceSet.value = new Dictionary();
                    Property.Device.FaceSet.list(deviceId);
                    var faceSets = Property.Device.FaceSet.value.toArray();
                    for (var a = 0; a < faceSets.length; a++) {
                        var list = document.getElementById(listId);
                        var template = document.getElementById("hidden-template2").getElementsByClassName("card small")[0];
                        var box = document.createElement("div");
                        box.className += " col-xlg-3 col-lg-4 col-md-6 col-sm-6 group-item";
                        box.id = faceSets[a].Id;
                        box.innerHTML = template.outerHTML;
                        box.style.overflow = "hidden";
                        //box.addEventListener("click", function () {
                        // devicesControl.selectedDeviceClick(this);
                        //});
                        var card = new SmallCard(box);
                        list.appendChild(box);
                        card.Icon.setBackgroundClass("bg-info");
                        card.Icon.setIcon("howell-icon-camera-passenger-flow");
                        card.Text.setText(faceSets[a].Name);
                        card.Text.setSubText(Language.Enum.FaceSetType[faceSets[a].Type]);
                        box.card = card;
                    }
                },
                remove: function (listId) {
                    var list = document.getElementById(listId);
                    if (list) {
                        list.innerHTML = "";
                    }
                },
                setSelected: function (faceContrast) {
                    if (faceContrast.FaceSetId && faceContrast.FaceSetId.length > 0) {
                        for (var i = 0; i < faceContrast.FaceSetId.length; i++) {
                            var faceSat = document.getElementById(faceContrast.FaceSetId[i]);
                            if (faceSat) {
                                faceSat.card.setSelected(true);
                            }
                        }
                    }
                },
                getSelected: function (listId) {
                    var selectedIds = new Array();
                    var list = document.getElementById(listId);
                    if (list) {
                        var items = list.getElementsByClassName("group-item");
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].card.getSelected()) {
                                selectedIds.push(items[i].id);
                            }
                        }
                    }
                    return selectedIds;
                }
            }
        }
    },
    FaceContrasts: {
        fill: function (faceContrast) {
            document.getElementById("Enabled").value = faceContrast.Enabled;
            document.getElementById("ContrastFailureAlarmUpload").value = faceContrast.ContrastFailureAlarmUpload ? true : false;
            document.getElementById("PluseEnable").value = faceContrast.PluseEnable ? true : false;
            document.getElementById("PluseTime").value = faceContrast.PluseTime ? faceContrast.PluseTime : 100;
            document.getElementById("Threshold").value = faceContrast.Threshold ? faceContrast.Threshold : 0;
        },
        set: function (deviceId, channelId, faceContrasts) {
            return Property.Device.Input.FaceContrasts.set(deviceId, channelId, faceContrasts);
        },
        Alert: {
            Handle: {
                fill: function (alertHandle) {
                    var checkBoxs = document.getElementsByClassName("handle-type");
                    for (var i = 0; i < checkBoxs.length; i++) {
                        checkBoxs[i].checked = false;
                    }
                    var handleTypes = getFlagsArray(alertHandle.AlertHandleType);
                    for (var i = 0; i < handleTypes.length; i++) {
                        var checkBox = document.getElementById(handleTypes[i]);
                        if (checkBox) {
                            checkBox.checked = "checked";
                        }
                    }
                },
                getSelected: function () {
                    var selected = "";
                    var checkBoxs = document.getElementsByClassName("handle-type");
                    for (var i = 0; i < checkBoxs.length; i++) {
                        if (checkBoxs[i].checked) {
                            if (selected != "") {
                                selected += ","
                            }
                            selected += checkBoxs[i].id;
                        }
                    }
                    if (!selected)
                        selected = AlertHandleType.None;
                    return selected;
                },
                set: function (deviceId, channelId, alertHandle) {
                    return Property.Device.Input.FaceContrasts.Alert.Handle.set(deviceId, channelId, alertHandle);
                }
            },
            Schedule: {
                DayOfWeek: {
                    Monday: 1, //星期一
                    Tuesday: 2,	//星期二
                    Wednesday: 3,	//星期三
                    Thursday: 4,//星期四
                    Friday: 5,//星期五
                    Saturday: 6,//星期六
                    Sunday: 7//星期日
                },
                fill: function (schedule) {
                    debugger;
                    this.clear();
                    var dailyScheduleDic = new Dictionary();
                    var dateStr = "2018-10-0";
                    var data = new Array();
                    for (var i = 0; i < schedule.DailySchedule.length; i++) {
                        if (schedule.DailySchedule[i].Period && schedule.DailySchedule[i].Period.length > 0) {
                            for (var j = 0; j < schedule.DailySchedule[i].Period.length; j++) {
                                var dataItem = new Object();
                                dataItem.startime = dateStr + this.DayOfWeek[schedule.DailySchedule[i].DayOfWeek] + " " + schedule.DailySchedule[i].Period[j].BeginTime;
                                dataItem.endtime = dateStr + this.DayOfWeek[schedule.DailySchedule[i].DayOfWeek] + " " + schedule.DailySchedule[i].Period[j].EndTime;
                                data.push(dataItem);
                            }
                        }
                    }
                    Html.juicy = $("#schedule").initJuicy({
                        width: document.getElementById("scheduleContainer").offsetWidth,
                        mondayDate: '2018-10-01',
                        timedata: data,
                        status: true, //false表示不能编辑，true可以编辑
                        itemOnclick: "juicyItemOnclick"
                    });
                    $("#scheduleCopyBtnContainer").removeClass("hide");
                },
                clear: function () {
                    Html.juicy = null;
                    var scheduleContainer = document.getElementById("scheduleContainer");
                    scheduleContainer.innerHTML = "";
                    var schedule = document.createElement("div");
                    schedule.id = "schedule";
                    schedule.className = "kaoqing";
                    scheduleContainer.appendChild(schedule);
                },
                set: function (deviceId, channelId) {
                    var weeklySchedule = new WeeklySchedule();
                    weeklySchedule.Enabled = true;
                    weeklySchedule.DailyScheduleSpecified = true;

                    var sunday = new DailySchedule();
                    sunday.DayOfWeek = DayOfWeek.Sunday;
                    sunday.PeriodSpecified = true;

                    var monday = new DailySchedule();
                    monday.PeriodSpecified = true;
                    monday.DayOfWeek = DayOfWeek.Monday;

                    var tuesday = new DailySchedule();
                    tuesday.PeriodSpecified = true;
                    tuesday.DayOfWeek = DayOfWeek.Tuesday;

                    var wednesday = new DailySchedule();
                    wednesday.PeriodSpecified = true;
                    wednesday.DayOfWeek = DayOfWeek.Wednesday;

                    var thursday = new DailySchedule();
                    thursday.PeriodSpecified = true;
                    thursday.DayOfWeek = DayOfWeek.Thursday;

                    var friday = new DailySchedule();
                    friday.PeriodSpecified = true;
                    friday.DayOfWeek = DayOfWeek.Friday;

                    var saturday = new DailySchedule();
                    saturday.PeriodSpecified = true;
                    saturday.DayOfWeek = DayOfWeek.Saturday;

                    weeklySchedule.DailySchedule.push(sunday);
                    weeklySchedule.DailySchedule.push(monday);
                    weeklySchedule.DailySchedule.push(tuesday);
                    weeklySchedule.DailySchedule.push(wednesday);
                    weeklySchedule.DailySchedule.push(thursday);
                    weeklySchedule.DailySchedule.push(friday);
                    weeklySchedule.DailySchedule.push(saturday);

                    if (Html.juicy) {
                        var backdata = Html.juicy.getdata();
                        for (var i = 0; i < backdata.length; i++) {
                            for (var j = 0; j < backdata[i].length; j++) {
                                if (backdata[i][j].BeginTime.indexOf("24:00:00") > -1) {
                                    backdata[i][j].BeginTime = backdata[i][j].BeginTime.replace("24:00:00", "23:59:00");
                                }
                                if (backdata[i][j].EndTime.indexOf("24:00:00") > -1) {
                                    backdata[i][j].EndTime = backdata[i][j].EndTime.replace("24:00:00", "23:59:00");
                                }
                            }
                        }
                        for (var i = 0; i < backdata.length; i++) {
                            if (i != 6)
                                weeklySchedule.DailySchedule[i + 1].Period = backdata[i];
                            else
                                weeklySchedule.DailySchedule[0].Period = backdata[i];
                        }
                    }

                    Property.Device.Input.FaceContrasts.Alert.Schedule.set(deviceId, channelId, weeklySchedule);
                }
            }
        }
    }
}

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
            },
            FaceContrasts: {
                get: function (deviceId, channelId) {
                    return tryCatch(function () {
                        return Client.Management().Device.Video.Input.FaceContrasts.List.Get(deviceId, channelId);
                    });
                },
                set: function (deviceId, channelId, faceContrastArray) {
                    return tryCatch(function () {
                        return Client.Management().Device.Video.Input.FaceContrasts.List.Set(deviceId, channelId, faceContrastArray);
                    });
                },
                Alert: {
                    Handle: {
                        get: function (deviceId, channelId) {
                            return Client.Management().Device.Video.Input.FaceContrasts.Alert.Handle.Get(deviceId, channelId);
                        },
                        set: function (deviceId, channelId, alertHandle) {
                            return Client.Management().Device.Video.Input.FaceContrasts.Alert.Handle.Set(deviceId, channelId, alertHandle);
                        }
                    },
                    Schedule: {
                        get: function (deviceId, channelId) {
                            return Client.Management().Device.Video.Input.FaceContrasts.Alert.Schedule.Get(deviceId, channelId);
                        },
                        set: function (deviceId, channelId, weeklySchedule) {
                            return Client.Management().Device.Video.Input.FaceContrasts.Alert.Schedule.Set(deviceId, channelId, weeklySchedule);
                        }
                    }
                }
            }
        },
        FaceSet: {
            value: new Dictionary(),
            list: function (deviceId) {
                var result = tryCatch(function () {
                    return Client.Management().Device.FaceSets.List(deviceId);
                });
                if (result && result.FaceSet) {
                    for (var i = 0; i < result.FaceSet.length; i++) {
                        this.value[result.FaceSet[i].Id] = result.FaceSet[i];
                    }
                }
                return result;
            }
        }
    }
}

function comparisonClick() {
    if (!Html.selectInputId || !Html.selectDeviceId || !Html.faceContrasts)
        return;
    Html.faceContrasts[0].FaceSetIdSpecified = false;
    var faceSetId = Html.Device.FaceSet.List.getSelected("facesetList");
    if (faceSetId.length > 0) {
        Html.faceContrasts[0].FaceSetId = faceSetId;
        Html.faceContrasts[0].FaceSetIdSpecified = true;
    }
    var enabled = document.getElementById("Enabled").value;
    Html.faceContrasts[0].Enabled = enabled == "true" ? true : false;

    var contrastFailureAlarmUpload = document.getElementById("ContrastFailureAlarmUpload").value;
    Html.faceContrasts[0].ContrastFailureAlarmUpload = contrastFailureAlarmUpload == "true" ? true : false;
    Html.faceContrasts[0].ContrastFailureAlarmUploadSpecified = true;

    var pluseEnable = document.getElementById("PluseEnable").value;
    Html.faceContrasts[0].PluseEnable = pluseEnable == "true" ? true : false;
    Html.faceContrasts[0].PluseEnableSpecified = true;

    var pluseTime = document.getElementById("PluseTime").value;
    Html.faceContrasts[0].PluseTime = pluseTime;
    Html.faceContrasts[0].PluseTimeSpecified = true;

    var threshold = document.getElementById("Threshold").value;
    Html.faceContrasts[0].Threshold = threshold;
    Html.faceContrasts[0].ThresholdSpecified = true;

    var faceContrastResult = Html.FaceContrasts.set(Html.selectDeviceId, Html.selectInputId, Html.faceContrasts);

    var alertHandle = new AlertHandle();
    alertHandle.AlertHandleType = Html.FaceContrasts.Alert.Handle.getSelected();
    alertHandle.IOOutputSpecified = false;
    alertHandle.CapturePictureSpecified = false;
    alertHandle.RecordSpecified = false;
    var alertHandleResult = Html.FaceContrasts.Alert.Handle.set(Html.selectDeviceId, Html.selectInputId, alertHandle);

    var scheduleResult = Html.FaceContrasts.Alert.Schedule.set(Html.selectDeviceId, Html.selectInputId);

    if (alertHandleResult && faceContrastResult) {
        $.toast({
            heading: chinese.save + chinese.success,
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'success',
            hideAfter: 3500,
            stack: 6
        });
    }
}

var dayOfWeekEunm = {
    0: chinese.monday,
    1: chinese.tuesday,
    2: chinese.wednesday,
    3: chinese.thursday,
    4: chinese.friday,
    5: chinese.saturday,
    6: chinese.sunday
}

function scheduleCopy(number) {
    $.confirm({
        text: chinese.whether + chinese.all + chinese.use + dayOfWeekEunm[number] + chinese.the + chinese.worksheet + chinese.setting,
        okButton: chinese.ok,
        cancelButton: chinese.cancel,
        okButtonClass: "btn btn-success p-r-20 p-l-20",
        cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
        top: -1,
        confirm: function () {
            if (Html.juicy) {
                var backdata = Html.juicy.getdata();
                var copyArray = backdata[number];
                var dateStr = "2018-10-0";
                var data = new Array();
                for (var i = 0; i < copyArray.length; i++) {
                    for (var j = 1; j < 8; j++) {
                        var dataItem = new Object();
                        dataItem.startime = dateStr + j + " " + copyArray[i].BeginTime;
                        dataItem.endtime = dateStr + j + " " + copyArray[i].EndTime;
                        data.push(dataItem);
                    }
                }
                Html.FaceContrasts.Alert.Schedule.clear();
                Html.juicy = $("#schedule").initJuicy({
                    width: document.getElementById("scheduleContainer").offsetWidth,
                    mondayDate: '2018-10-01',
                    timedata: data,
                    status: true, //false表示不能编辑，true可以编辑
                    itemOnclick: "juicyItemOnclick"
                });
            }
        }
    });
}

function juicyItemOnclick(e) {
    var X = parseInt($(e).css('width')) / 2;
    var scheduleBeginTime = document.getElementById("scheduleBeginTime");
    var scheduleEndTime = document.getElementById("scheduleEndTime");
    var beginTime = e.getElementsByClassName("bleft")[0].title;
    var endTime = e.getElementsByClassName("bright")[0].title;
    scheduleBeginTime.value = beginTime;
    scheduleEndTime.value = endTime;
    tooltipControls.pop(e, '#scheduleDetailsSet', { sticky: true, position: 0, offsetY: 20, offsetX: X, maxWidth: 600 });
    var css = e.className.split(" ");
    Html.currentItemSchedule = "." + css[css.length - 1];
}

function deletejuicyItem() {
    if (Html.currentItemSchedule) {
        $(Html.currentItemSchedule).remove();
        document.getElementById("mcttCloseButton").click();
    }
}

function savejuicyItem() {
    function juicyItemError() {
        $.toast({
            heading: chinese.please + chinese.correct + chinese.input + chinese.time,
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500,
            stack: 6
        });
    }
    var startTime = document.getElementById("scheduleBeginTime").value;
    var endTime = document.getElementById("scheduleEndTime").value;
    if (!startTime || !endTime) {
        juicyItemError();
        return;
    }
    var starTimeArr = startTime.split(":");
    var endTimeArr = endTime.split(":");
    if (parseInt(starTimeArr[0]) > parseInt(endTimeArr[0])) {
        juicyItemError();
        return;
    }
    if (parseInt(starTimeArr[0]) == parseInt(endTimeArr[0]) && parseInt(starTimeArr[1]) > parseInt(endTimeArr[1])) {
        juicyItemError();
        return;
    }
    if (Html.currentItemSchedule)
        Html.juicy.update(startTime, endTime, Html.currentItemSchedule);
    document.getElementById("mcttCloseButton").click();
}