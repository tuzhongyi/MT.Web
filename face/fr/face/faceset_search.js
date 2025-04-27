var Property = {
    Face: {
        AnalysisImage: function (deviceId, stream, contentType) {
            return tryCatch(function () {
                return Client.Management().Device.Face.AnalysisImage(deviceId, stream, contentType);
            });
        }
    },
    FaceSets: {
        Faces: {
            search: function (deviceId, faceSetSearchDescription, callback) {
                var result = tryCatch(function () {
                    return Client.Management().Device.FaceSets.Faces.Search(deviceId, faceSetSearchDescription, callback);
                });
                return result;
            }
        },
        list: function (deviceId) {
            var result = tryCatch(function () {
                return Client.Management().Device.FaceSets.List(deviceId);
            });
            return result;
        },
        Face: {
            Pictrue: {
                get: function (deviceId, faceSetId, faceId) {
                    return tryCatch(function () {
                        return Client.Management().Device.FaceSets.Faces.PictureData(deviceId, faceSetId, faceId);
                    });
                }
            }
        }
    },
    Device: {
        value: new Dictionary(),
        list: function (deviceClassification) {
            var result = tryCatch(function () {
                return Client.Management().Device.List(null, null, deviceClassification, null);
            });
            if (result && result.Device) {
                for (var i = 0; i < result.Device.length; i++) {
                    this.value[result.Device[i].Id] = result.Device[i];
                }
            }
            return result;
        }
    }
}

var Html = {
    upperCount: 500,
    loadCount: 0,
    pageIndex: 1,
    pageSize: 100,
    searchId: null,
    deviceId: null,
    faceSetId: null,
    bornBeginTime: null,
    bornEndTime: null,
    name: null,
    sex: null,
    province: null,
    city: null,
    cardType: null,
    cardNumber: null,
    modelData: new Array(),
    currentImg: null,
    Search: {
        load: function () {
            var faceSetSearchDescription = new FaceSetSearchDescription();
            faceSetSearchDescription.SearchId = Html.searchId;
            faceSetSearchDescription.PageIndex = Html.pageIndex;
            faceSetSearchDescription.PageSize = Html.pageSize;
            if (Html.faceSetId && Html.faceSetId != "all") {
                faceSetSearchDescription.FaceSetId = Html.faceSetId;
                faceSetSearchDescription.FaceSetIdSpecified = true;
            }
            if (Html.bornBeginTime) {
                faceSetSearchDescription.BornBeginTime = Html.bornBeginTime;
                faceSetSearchDescription.BornBeginTimeSpecified = true;
            }
            if (Html.bornEndTime) {
                faceSetSearchDescription.BornEndTime = Html.bornEndTime;
                faceSetSearchDescription.BornEndTimeSpecified = true;
            }
            if (Html.name) {
                faceSetSearchDescription.Name = Html.name;
                faceSetSearchDescription.NameSpecified = true;
            }
            if (Html.sex && Html.sex != "All") {
                faceSetSearchDescription.Sex = Html.sex;
                faceSetSearchDescription.SexSpecified = true;
            }
            if (Html.province) {
                faceSetSearchDescription.Province = Html.province;
                faceSetSearchDescription.ProvinceSpecified = true;
            }
            if (Html.city) {
                faceSetSearchDescription.City = Html.city;
                faceSetSearchDescription.CitySpecified = true;
            }
            if (Html.cardType) {
                faceSetSearchDescription.CardType = Html.cardType;
                faceSetSearchDescription.CardTypeSpecified = true;
            }
            if (Html.cardNumber) {
                faceSetSearchDescription.CardNumber = Html.cardNumber;
                faceSetSearchDescription.CardNumberSpecified = true;
            }
            if (Html.modelData && Html.modelData.length > 0) {
                faceSetSearchDescription.ModelData = Html.modelData;
                faceSetSearchDescription.ModelDataSpecified = true;
            }
            // var faces = Property.FaceSets.Faces.search(Html.deviceId, faceSetSearchDescription);
            // return faces;

            Property.FaceSets.Faces.search(Html.deviceId, faceSetSearchDescription, this.loadCallBack);
        },
        loadCallBack: function (faces) {
            faces = Convert(faces, new FaceAppendDataList());
            if (faces && faces.FaceAppendData && faces.FaceAppendData.length > 0 && Html.upperCount > Html.loadCount) {
                Html.loadCount += faces.Page.RecordCount;
                $.toast({
                    heading: Html.loadCount,
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 3500,
                    stack: 6
                });
                Html.Search.add(faces.FaceAppendData);
                Html.pageIndex = Html.pageIndex + 1;
                Html.Search.load();
            }
            else {
                $.toast({
                    heading: chinese.query + chinese.over,
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 3500,
                    stack: 6
                });
            }
        },
        create: function () {
            $.toast({
                heading: chinese.start + chinese.query,
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
            this.load();
        },
        add: function (faces) {
            var list = document.getElementById("faceAppendDataList");
            for (var i = 0; i < faces.length; i++) {
                var box = this.createItem(faces[i], "set col-xlg-3 col-lg-4 col-md-6 col-sm-12 group-item");
                list.appendChild(box);
            }
        },
        createItem: function (face, boxClass) {
            var template = document.getElementById("hidden-template2").getElementsByClassName("card picture")[0];
            var box = document.createElement("div");
            box.className += boxClass;
            box.id = face.Id;
            box.innerHTML = template.outerHTML;
            box.style.overflow = "hidden";
            //box.addEventListener("click", function () {
            // devicesControl.selectedDeviceClick(this);
            //});
            var card = new PictureCard(box);
            var src = Property.FaceSets.Face.Pictrue.get(Html.deviceId, face.FaceSetId, face.Id);
            card.Img.setSrc(src);
            // var count = 0;
            card.Img.Img.onerror = function () {
                // count++;
                this.src = this.src;
                // if (count == 3)
                this.onerror = null;
            };
            card.Text.setText(face.Name);
            var data = new Array();
            var sex = new Object();
            sex.key = "性别";
            sex.value = "未知";
            if (face.Sex) {
                sex.value = Language.Enum.Sex[face.Sex];
            }
            data.push(sex);
            var birthday = new Object();
            birthday.key = "生日";
            birthday.value = "未知";
            if (face.BirthDateSpecified && face.BirthDate) {
                var date = new Date(face.BirthDate);
                birthday.value = date.format("yyyy-MM-dd");
            }
            data.push(birthday);
            var phone = new Object();
            phone.key = "电话";
            phone.value = face.Phone ? face.Phone : "未知";
            data.push(phone);
            card.Data.setData(data);
            card.SetButton.setClick(function (e) {
                // Html.FaceSet.Face.FaceInfo.selectId = e.currentTarget.elementId
                // openFaceInfo();
            });
            card.setEnabled(false);
            box.card = card;
            return box;
        }
    },
    Initialization: {
        DeviceSelect: function () {
            Property.Device.list(DeviceClassification.FDNVR);
            Property.Device.list(DeviceClassification.FDCamera);
            var devices = Property.Device.value.toArray();
            var deviceLag = new Object();
            var deviceEnmu = new Object();
            for (var i = 0; i < devices.length; i++) {
                if (devices[i].FaceContrastSupported) {
                    deviceEnmu[devices[i].Id] = devices[i].Id;
                    deviceLag[devices[i].Id] = devices[i].Name;
                }
            }
            DropDownList.Create("faceset_search_Device", ControlModel.Language, deviceEnmu, deviceLag);
            var deviceId = document.getElementById("faceset_search_Device").value;
            if (deviceId) {
                this.FaceSet(deviceId);
            }

        },
        FaceSet: function (deviceId) {
            document.getElementById("faceset_search_FaceSet").innerHTML = "";
            var result = Property.FaceSets.list(deviceId);
            var facesetLag = new Object();
            var facesetEnmu = new Object();
            facesetLag["all"] = "不限";
            facesetEnmu["all"] = "all";
            if (result && result.FaceSet) {
                for (var i = 0; i < result.FaceSet.length; i++) {
                    facesetEnmu[result.FaceSet[i].Id] = result.FaceSet[i].Id;
                    facesetLag[result.FaceSet[i].Id] = result.FaceSet[i].Name;
                }
            }
            DropDownList.Create("faceset_search_FaceSet", ControlModel.Language, facesetEnmu, facesetLag);
        }
    }
}

function reductionParameters() {
    Html.loadCount = 0;
    Html.searchId = null;
    Html.pageIndex = 1;
    Html.pageSize = 100;
    Html.deviceId = null;
    Html.faceSetId = null;
    Html.bornBeginTime = null;
    Html.bornEndTime = null;
    Html.name = null;
    Html.sex = null;
    Html.province = null;
    Html.city = null;
    Html.cardType = null;
    Html.cardNumber = null;
    // Html.hasImg = false;
    Html.modelData = new Array();
    // var div = document.getElementById('preview');
    // div.innerHTML = '<img width="110" height="126" height id="imghead" onclick=$("#previewImg").click()>';
}

function faceSetSearchCilik() {
    reductionParameters();
    document.getElementById("faceAppendDataList").innerHTML = "";
    Html.searchId = Guid.NewGuid().ToString();
    var deviceId = document.getElementById("faceset_search_Device").value;
    if (!deviceId)
        return;
    Html.deviceId = deviceId;

    var faceSetId = document.getElementById("faceset_search_FaceSet").value;
    if (faceSetId)
        Html.faceSetId = faceSetId;

    var bornBeginTime = document.getElementById("faceset_search_BornBeginTime").value;
    if (bornBeginTime) {
        var arrTime = bornBeginTime.split("-");
        var begin = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 0, 0, 0);
        Html.bornBeginTime = begin.toISOString();
    }
    var bornEndTime = document.getElementById("faceset_search_BornEndTime").value;
    if (bornEndTime) {
        var arrTime = bornEndTime.split("-");
        var end = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 0, 0, 0);
        Html.bornEndTime = end.toISOString();
    }

    var name = document.getElementById("faceset_search_Name").value;
    if (name)
        Html.name = name;

    var sex = document.getElementById("faceset_search_Sex").value;
    if (sex && sex != "All")
        Html.sex = sex;

    var province = document.getElementById("faceset_search_Province").value;
    if (province)
        Html.province = province;

    var city = document.getElementById("faceset_search_City").value;
    if (city)
        Html.city = city;

    var cardType = document.getElementById("faceset_search_CardType").value;
    if (cardType)
        Html.cardType = cardType;

    var cardNumber = document.getElementById("faceset_search_CardNumber").value;
    if (cardNumber)
        Html.cardNumber = cardNumber;

    debugger;
    if (Html.currentImg) {
        var faceModelData = Property.Face.AnalysisImage(Html.deviceId, Html.currentImg);
        if (faceModelData.length > 0) {
            var faceModelDataSearchDescription = new FaceModelDataSearchDescription();
            faceModelDataSearchDescription.ModelData = faceModelData[0].ModelData;
            faceModelDataSearchDescription.Similarity = 90;
            faceModelDataSearchDescription.SimilaritySpecified = true;
            Html.modelData.push(faceModelDataSearchDescription);
        }
    }
    Html.Search.create();
}

function selectSearchDeviceOnchange(sender) {
    if (sender.value)
        Html.Initialization.FaceSet(sender.value);
}

function faceSetSearchInit() {
    Html.Initialization.DeviceSelect();
}

function previewImage(file) {
    var div = document.getElementById('preview');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img width="110" class="upload_img" height="126" height id="imghead" onclick=$("#previewImg").click()>';
        var img = document.getElementById('imghead');
        var reader = new FileReader();
        var reader2 = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
        }
        reader2.onload = function (evt) {
            Html.currentImg = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
        reader2.readAsArrayBuffer(file.files[0]);
    }
    else //����IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }

}
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = { top: 0, left: 0, width: width, height: height };
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

function faceSetSearchCondition() {
    reductionParameters();
    Html.currentImg = null;
    document.getElementById("imghead").src = "img/upload_picture.png";
    Html.searchId = Guid.NewGuid().ToString();
    $('select').prop('selectedIndex', 0);
    document.getElementById("faceset_search_BornBeginTime").value = "";
    document.getElementById("faceset_search_BornEndTime").value = "";
    document.getElementById("faceset_search_Name").value = "";
    document.getElementById("faceset_search_Province").value = "";
    document.getElementById("faceset_search_City").value = "";
    document.getElementById("faceset_search_CardType").value = "";
    document.getElementById("faceset_search_CardNumber").value = "";
}

loadPageCallBcak = function () {
    var dateTimeDiv = document.getElementsByClassName("datetimepicker-dropdown-bottom-right");
    while (dateTimeDiv.length > 0) {
        dateTimeDiv[0].parentNode.removeChild(dateTimeDiv[0]);
    }
};