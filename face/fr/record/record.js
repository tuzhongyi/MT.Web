var Property = {
    Record: {
        value: new Dictionary(),
        list: function (beginTime, endTime, componentId, eventType, sex, age, faceSetId, faceAppendDataId, pageIndex, pageSize) {
            var result = tryCatch(function () {
                return Client.Management().Event.FaceDetect.Records.List(beginTime, endTime, componentId, eventType, sex, age, faceSetId, faceAppendDataId, pageIndex, pageSize);
            });
            if (result && result.FaceDetectEventRecord) {
                for (var i = 0; i < result.FaceDetectEventRecord.length; i++) {
                    this.value[result.FaceDetectEventRecord[i].Id] = result.FaceDetectEventRecord[i];
                    if (!this.value[result.FaceDetectEventRecord[i].Id]["Selected"])
                        this.value[result.FaceDetectEventRecord[i].Id]["Selected"] = false;
                }
            }
            return result;
        },
        get: function (recordId) {
            var record = tryCatch(function () {
                return Client.Management().Event.FaceDetect.Records.Get(recordId);
            });
            if (record && record.Id) {
                this.value[record.Id] = record;
            }
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
    Criteria: {
        beginTime: null,
        endTime: null
    },
    Record: {
        severity: {
            0: "未知",
            1: "信息",
            16: "警告",
            64: "紧急"
        },
        list: function (tableId, beginTime, endTime, componentId, eventType, sex, age, faceSetId, faceAppendDataId, pageIndex, pageSize) {
            Property.Record.value = new Dictionary();
            Property.Record.list(beginTime, endTime, componentId, eventType, sex, age, faceSetId, faceAppendDataId, pageIndex, pageSize);
            var list = Property.Record.value.toArray();
            var table = document.getElementById(tableId);
            for (var i = 0; i < list.length; i++) {
                var tr = this.createItem(i + 1, list[i]);
                table.appendChild(tr);
            }
        },
        clear: function (tableId) {
            var table = document.getElementById(tableId);
            if (table)
                table.innerHTML = "";
        },
        createItem: function (no, record) {
            var tr = document.createElement("tr");

            var td = document.createElement("td");
            td.className = "report-table-td-no-w";
            td.innerHTML = no;
            tr.appendChild(td);

            var td = document.createElement("td");
            var date = new Date(record.AlarmTime);
            td.className = "report-table-td-date-w";
            td.innerHTML = date.format("yyyy年MM月dd日 HH:mm:ss");
            tr.appendChild(td);

            var td = document.createElement("td");
            td.className = "report-table-td-name-w";
            td.innerHTML = record.Name;
            tr.appendChild(td);

            var td = document.createElement("td");
            td.className = "report-table-td-data-w";
            td.innerHTML = Language.Display.EventType[record.EventType];
            tr.appendChild(td);

            var td = document.createElement("td");
            td.className = "report-table-td-data-w";
            td.innerHTML = Html.Record.severity[record.Severity];
            tr.appendChild(td);

            var td = document.createElement("td");
            td.className = "report-table-td-data-w";
            td.innerHTML = (record.Confidence || record.Confidence == 0) ? record.Confidence + "%" : "未知";
            tr.appendChild(td);

            var td = document.createElement("td");
            td.className = "report-table-td-info-w";
            td.innerHTML = record.Description ? record.Description : "未知"
            tr.appendChild(td);

            var td = document.createElement("td");
            td.className = "report-table-td-detail-info-w";
            td.innerHTML = "未知";
            if (record.EventType == EventType.FaceDetect || record.EventType == EventType.FaceMatch)
                td.innerHTML = "<i class='mdi mdi-information' onclick='detailInfoCilck(\"" + record.Id + "\")'></i>";
            tr.appendChild(td);

            return tr;
        },
        FaceDetect: {
            createDetailsInfo: function (record) {
                var tag = document.getElementById("facePictureInfo");
                tag.innerHTML = "";
                var template = document.createElement("div");
                template.innerHTML = document.getElementsByClassName("template-snap-info")[0].innerHTML;
                template.getElementsByClassName("content-text-title-words")[0].innerHTML = "抓拍信息";
                template.getElementsByClassName("content-text-title-icon")[0].className += " howell-icon-camera-face-recognition";
                template.getElementsByClassName("center-title-text-container")[0].innerHTML = "人脸识别";
                template.getElementsByClassName("left-title-text-container-words")[0].innerHTML = record.Name;
                template.getElementsByClassName("left-title-text-container-icon")[0].className += " fa fa-video-camera";
                template.getElementsByClassName("right-title-text-container-icon")[0].className += " mdi mdi-clock";
                var date = new Date(record.AlarmTime);
                template.getElementsByClassName("right-title-text-container-words")[0].innerHTML = date.format("yyyy年MM月dd日 HH:mm:ss");
                if (record.FaceSnapData) {
                    if (record.FaceSnapData.Feature) {
                        var container = template.getElementsByClassName("content-container")[0];
                        if (record.FaceSnapData.Feature.Age || record.FaceSnapData.Feature.Age == 0) {
                            var age = document.createElement("div");
                            age.className = "content-text";
                            age.innerHTML = record.FaceSnapData.Feature.Age + "岁";
                            container.appendChild(age)
                        }
                        if (record.FaceSnapData.Feature.Sex && record.FaceSnapData.Feature.Sex != Sex.None) {
                            var sex = document.createElement("div");
                            sex.className = "content-text";
                            sex.innerHTML = Language.Enum.Sex[record.FaceSnapData.Feature.Sex];
                            container.appendChild(sex);
                        }
                        if (record.FaceSnapData.Feature.EyeGlass || record.FaceSnapData.Feature.EyeGlass == false) {
                            var eyeGlass = document.createElement("div");
                            eyeGlass.className = "content-text";
                            eyeGlass.innerHTML = record.FaceSnapData.Feature.EyeGlass ? "戴眼镜" : "不戴眼镜";
                            container.appendChild(eyeGlass);
                        }
                    }
                    template.getElementsByClassName("picture")[0].src = Property.Picture.get(record.FaceSnapData.FacePictureId);
                }
                template.children[0].className += " background-color-info";
                template.getElementsByClassName("ti-close")[0].onclick = closeFacePictureInfo;
                tag.appendChild(template.children[0]);
            }
        },
        FaceMatch: {
            createDetailsInfo: function (record) {
                var tag = document.getElementById("facePictureInfo");
                tag.innerHTML = "";
                var template = document.createElement("div");
                template.innerHTML = document.getElementsByClassName("template-match-info")[0].innerHTML;

                template.getElementsByClassName("left-content-text-title-words")[0].innerHTML = "抓拍信息";
                template.getElementsByClassName("left-content-text-title-icon")[0].className += " howell-icon-camera-face-recognition";
                template.getElementsByClassName("right-content-text-title-icon")[0].className += " mdi mdi-account-box";
                template.getElementsByClassName("right-content-text-title-words")[0].innerHTML = "数据库信息";
                template.getElementsByClassName("center-title-text-container")[0].innerHTML = "人脸比中";
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
                template.children[0].className += " background-color-info";
                template.getElementsByClassName("fr-match-container-title")[0].className += " info";
                template.getElementsByClassName("ti-close")[0].onclick = closeFacePictureInfo;
                tag.appendChild(template.children[0]);
            }
        }
    },
}

function closeFacePictureInfo() {
    var tag = document.getElementById("facePictureInfo");
    tag.innerHTML = "";
}

function detailInfoCilck(recordId) {
    var record = Property.Record.value[recordId];
    if (record)
        Html.Record[record.EventType].createDetailsInfo(record);
}

function searchCilck() {
    Html.Record.clear("recordTable");
    var strBeginTime = getTag("txtStartDate").value;
    if (!strBeginTime)
        strBeginTime = "1970-01-01";

    var strEndTime = getTag("txtEndDate").value


    var arrTime = strBeginTime.split("-");

    var begin = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 0, 0, 0);
    var beginTime = begin.toISOString();

    var end;
    if (strEndTime) {
        arrTime = strEndTime.split("-");
        end = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 23, 59, 59);
    }
    else
        end = new Date();
    var endTime = end.toISOString();

    Html.Criteria.beginTime = beginTime;
    Html.Criteria.endTime = endTime;
    Html.Record.list("recordTable", Html.Criteria.beginTime, Html.Criteria.endTime);
}
//<tr><td class="text-center" colspan="6">没数据</td></tr>