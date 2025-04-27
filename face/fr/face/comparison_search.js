var Property = {
    Face: {
        AnalysisImage: function (deviceId, stream, contentType) {
            return tryCatch(function () {
                return Client.Management().Device.Face.AnalysisImage(deviceId, stream, contentType);
            });
        }
    },
    FaceContrasts: {
        Faces: {
            value: new Dictionary(),
            search: function (deviceId, faceContrastSearchDescription, callback) {
                var result = tryCatch(function () {
                    return Client.Management().Device.FaceContrasts.Faces.Search(deviceId, faceContrastSearchDescription, callback);
                });
                // if (result && result.FaceContrastSearchResult) {
                //     this.value[result.FaceContrastSearchResult.ComponentId + "_" + result.FaceContrastSearchResult.AlarmTime] = result.FaceContrastSearchResult;
                // }
                return result;
            }
        },
        Pictrue: {
            get: function (deviceId, pictureId) {
                return tryCatch(function () {
                    return Client.Management().Device.FaceContrasts.Pictures.Data(deviceId, pictureId);
                });
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
        },
        Video: {
            Input: {
                value: new Dictionary(),
                list: function (deviceId) {
                    var result = tryCatch(function () {
                        return Client.Management().Device.Video.Input.List(deviceId);
                    });
                    if (result && result.VideoInputChannel) {
                        for (var i = 0; i < result.VideoInputChannel.length; i++) {
                            this.value[result.VideoInputChannel[i].Id] = result.VideoInputChannel[i];
                        }
                    }
                    return result;
                },
                get: function (deviceId, inputId) {
                    var result = Client.Management().Device.Video.Input.Get(deviceId, inputId);
                    if (result)
                        this.value[result.Id] = result;
                    return result;
                }
            }
        },
        FaceSet: {
            value: new Dictionary(),
            list: function (deviceId) {
                debugger;
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

var Html = {
    upperCount: 1200,
    loadCount: 0,
    pageIndex: 1,
    pageSize: 100,
    searchId: null,
    deviceId: null,
    faceSetId: new Array(),
    beginTime: null,
    endTime: null,
    sex: null,
    similarity: null,
    eyeGlass: null,
    modelData: new Array(),
    currentImg: null,
    channelId: new Array(),
    videoInput: new Dictionary(),
    Video: {
        Input: {
            List: {
                createItem: function (input) {
                    var template = document.createElement("div");
                    template.innerHTML = document.getElementsByClassName("template-tabs-list")[0].innerHTML;
                    template.getElementsByClassName("text")[0].innerHTML = input.Name;
                    template.getElementsByClassName("tabpanel")[0].id = input.Id;
                    template.getElementsByClassName("tabs-list-title")[0].href = "#" + input.Id;
                    template.getElementsByClassName("tabs-list-title")[0].addEventListener("click", closeVideoInputList);
                    return template.children[0];
                },
                add: function (input) {
                    var item = this.createItem(input);
                    var list = document.getElementById("videoInputList");
                    list.appendChild(item);
                }
            }
        }
    },
    Face: {
        List: {
            createList: function (input) {
                var template = document.createElement("div");
                template.innerHTML = document.getElementsByClassName("template-tabs-pane")[0].innerHTML;
                template.getElementsByClassName("tab-pane")[0].id = input.Id;
                var list = document.getElementById(input.Id).getElementsByClassName("tabpanel-content")[0];
                list.appendChild(template.children[0]);
            },
            addItem: function (paneId, face) {
                var list = document.getElementById(paneId).getElementsByClassName("card-group")[0];
                var box = this.createItem(face, "set col-xlg-3 col-lg-4 col-md-6 col-sm-12 group-item");
                if (list)
                    list.appendChild(box);
            },
            createItem: function (face, boxClass) {
                debugger;
                var template = document.getElementById("hidden-template2").getElementsByClassName("card picture")[0];
                var box = document.createElement("div");
                box.className += boxClass;
                // box.id = face.Id;
                box.innerHTML = template.outerHTML;
                box.style.overflow = "hidden";
                //box.addEventListener("click", function () {
                // devicesControl.selectedDeviceClick(this);
                //});
                var card = new PictureCard(box);
                var deviceId = new Id(face.ComponentId).getDeviceId();
                // var name = ""
                // var input = Property.Device.Video.Input.value[face.ComponentId];
                // if (!input)
                //     input = Property.Device.Video.Input.get(deviceId, face.ComponentId);
                // if (input)
                //     name = input.Name;
                // card.Text.setText(name);
                if (face.FaceSnapData && face.FaceSnapDataSpecified == true) {
                    var src = Property.FaceContrasts.Pictrue.get(Html.deviceId, face.FaceSnapData.FacePictureId);
                    card.Img.setSrc(src);
                    // var count = 0;
                    card.Img.Img.onerror = function () {
                        // count++;
                        this.src = this.src;
                        // if (count == 3)
                        this.onerror = null;
                    };
                }
                var data = new Array();
                // var time = new Object();
                // time.key = chinese.time;
                // time.value = "未知";
                // if (face.AlarmTime) {
                //     var date = new Date(face.AlarmTime);
                //     time.value = date.format("yyyy-MM-dd HH:mm:ss");
                // }
                // data.push(time);
                card.Text.setText("未知");
                if (face.AlarmTime) {
                    var date = new Date(face.AlarmTime);
                    card.Text.setText(date.format("yyyy-MM-dd HH:mm:ss"));
                }

                var confidence = new Object();
                confidence.key = "相似度";
                confidence.value = face.Confidence || face.Confidence == 0 ? face.Confidence + " %" : "未知";
                data.push(confidence);
                card.Data.setData(data);

                card.SetButton.setClick(function (e) {

                });
                card.setEnabled(false);
                box.card = card;
                return box;
            }
        }
    },
    Search: {
        load: function () {
            var faceContrastSearchDescription = new FaceContrastSearchDescription();
            faceContrastSearchDescription.SearchId = Html.searchId;
            faceContrastSearchDescription.PageIndex = Html.pageIndex;
            faceContrastSearchDescription.PageSize = Html.pageSize;
            if (Html.faceSetId && Html.faceSetId.length > 0) {
                faceContrastSearchDescription.FaceSetId = Html.faceSetId;
                faceContrastSearchDescription.FaceSetIdSpecified = true;
            }
            if (Html.channelId && Html.channelId.length > 0) {
                faceContrastSearchDescription.ChannelId = Html.channelId;
                faceContrastSearchDescription.ChannelIdSpecified = true;
            }
            if (Html.beginTime) {
                faceContrastSearchDescription.BeginTime = Html.beginTime;
                faceContrastSearchDescription.BeginTimeSpecified = true;
            }
            if (Html.endTime) {
                faceContrastSearchDescription.EndTime = Html.endTime;
                faceContrastSearchDescription.EndTimeSpecified = true;
            }
            if (Html.sex && Html.sex != "all") {
                faceContrastSearchDescription.Sex = Html.sex;
                faceContrastSearchDescription.SexSpecified = true;
            }
            if (Html.eyeGlass && Html.eyeGlass != "all") {
                faceContrastSearchDescription.EyeGlass = Html.eyeGlass == "true" ? true : false;
                faceContrastSearchDescription.EyeGlassSpecified = true;
            }
            if (Html.modelData && Html.modelData.length > 0) {
                faceContrastSearchDescription.ModelData = Html.modelData;
                if (Html.similarity) {
                    for (i = 0; i < faceContrastSearchDescription.ModelData.length; i++) {
                        faceContrastSearchDescription.ModelData[i].Similarity = parseInt(Html.similarity);
                        faceContrastSearchDescription.ModelData[i].SimilaritySpecified = true;
                    }
                }
                faceContrastSearchDescription.ModelDataSpecified = true;
            }
            Property.FaceContrasts.Faces.search(Html.deviceId, faceContrastSearchDescription, this.loadCallBack);
            // return faces;
        },
        loadCallBack: function (faces) {
            faces = Convert(faces, new FaceContrastSearchResultList(), null, "AlarmTime", true);
            if (faces && faces.FaceContrastSearchResult && faces.FaceContrastSearchResult.length > 0 && Html.upperCount > Html.loadCount) {
                Html.loadCount += faces.Page.RecordCount;
                $.toast({
                    heading: Html.loadCount,
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 3500,
                    stack: 6
                });
                for (var i = 0; i < faces.FaceContrastSearchResult.length; i++) {
                    faces.FaceContrastSearchResult[i].Id = Guid.NewGuid().ToString();
                    if (!Html.videoInput[faces.FaceContrastSearchResult[i].ComponentId]) {
                        var deviceId = new Id(faces.FaceContrastSearchResult[i].ComponentId).getDeviceId();
                        var input = Property.Device.Video.Input.get(deviceId, faces.FaceContrastSearchResult[i].ComponentId);
                        Html.videoInput[faces.FaceContrastSearchResult[i].ComponentId] = new Dictionary();
                        Html.Video.Input.List.add(input);
                        Html.Face.List.createList(input);
                    }
                    Html.videoInput[faces.FaceContrastSearchResult[i].ComponentId][faces.FaceContrastSearchResult[i].Id] = faces.FaceContrastSearchResult[i];
                    // Html.Face.List.addItem(faces.FaceContrastSearchResult[i].ComponentId, faces.FaceContrastSearchResult[i]);
                }
                Html.pageIndex = Html.pageIndex + 1;
                Html.Search.load();
            }
            else {
                var inputs = Html.videoInput.toArray();
                for (var i = 0; i < inputs.length; i++) {
                    var faces = inputs[i].toArray();
                    faces.sortBy("AlarmTime", true);
                    for (var j = 0; j < faces.length; j++) {
                        Html.Face.List.addItem(faces[j].ComponentId, faces[j]);
                    }
                }
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
            DropDownList.Create("comparison_search_Device", ControlModel.Language, deviceEnmu, deviceLag);
            var deviceId = document.getElementById("comparison_search_Device").value;
            if (deviceId) {
                this.FaceSetSelect(deviceId);
                this.VideoInputSelect(deviceId);
            }
        },
        FaceSetSelect: function (deviceId) {
            document.getElementById("comparison_search_FaceSet").innerHTML = "";
            var result = Property.Device.FaceSet.list(deviceId);
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
            DropDownList.Create("comparison_search_FaceSet", ControlModel.Language, facesetEnmu, facesetLag);
        },
        VideoInputSelect: function (deviceId) {
            document.getElementById("comparison_search_ChannelId").innerHTML = "";
            var result = Property.Device.Video.Input.list(deviceId)
            var facesetLag = new Object();
            var facesetEnmu = new Object();
            facesetLag["all"] = "不限";
            facesetEnmu["all"] = "all";
            if (result && result.VideoInputChannel) {
                for (var i = 0; i < result.VideoInputChannel.length; i++) {
                    facesetEnmu[result.VideoInputChannel[i].Id] = result.VideoInputChannel[i].Id;
                    facesetLag[result.VideoInputChannel[i].Id] = result.VideoInputChannel[i].Name;
                }
            }
            DropDownList.Create("comparison_search_ChannelId", ControlModel.Language, facesetEnmu, facesetLag);
        }
    }
}

function reductionParameters() {
    Html.loadCount = 0;
    Html.searchId = null;
    Html.pageIndex = 1;
    Html.pageSize = 100;
    Html.deviceId = null;
    Html.faceSetId = new Array();
    Html.channelId = new Array();
    Html.beginTime = null;
    Html.endTime = null;
    Html.sex = null;
    // Html.hasImg = false;
    Html.modelData = new Array();
    Html.similarity = null;
    Html.eyeGlass = null;
    Html.videoInput = new Dictionary();
    
    // document.getElementById("faceContrastList").innerHTML = "";
    // var div = document.getElementById('preview');
    // div.innerHTML = '<img width="110" height="126" height id="imghead" onclick=$("#previewImg").click()>';
}

function comparisonSearchCilik() {
    debugger;
    reductionParameters();
    document.getElementById("videoInputList").innerHTML = "";
    // document.getElementById("faceContrastList").innerHTML = "";
    Html.searchId = Guid.NewGuid().ToString();
    var deviceId = document.getElementById("comparison_search_Device").value;
    if (!deviceId)
        return;
    Html.deviceId = deviceId;

    var faceSetId = document.getElementById("comparison_search_FaceSet").value;
    if (faceSetId && faceSetId != "all")
        Html.faceSetId.push(faceSetId);

    var channelId = document.getElementById("comparison_search_ChannelId").value;
    if (channelId && channelId != "all")
        Html.channelId.push(channelId);

    var beginTime = document.getElementById("comparison_search_BeginTime").value;
    if (beginTime) {
        var arrTime = beginTime.split("-");
        var begin = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 0, 0, 0);
        Html.beginTime = begin.toISOString();
    }
    var endTime = document.getElementById("comparison_search_EndTime").value;
    if (endTime) {
        var arrTime = endTime.split("-");
        var end = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 23, 59, 59);
        Html.endTime = end.toISOString();
    }

    var sex = document.getElementById("comparison_search_Sex").value;
    if (sex && sex != "all")
        Html.sex = sex;

    var eyeGlass = document.getElementById("comparison_search_EyeGlass").value;
    if (eyeGlass && eyeGlass != "all")
        Html.eyeGlass = eyeGlass;

    var similarity = document.getElementById("comparison_search_Similarity").value;
    if (similarity)
        Html.similarity = similarity;

    if (Html.currentImg) {
        var faceModelData = Property.Face.AnalysisImage(Html.deviceId, Html.currentImg);
        if (faceModelData.length > 0) {
            var faceModelDataSearchDescription = new FaceModelDataSearchDescription();
            faceModelDataSearchDescription.ModelData = faceModelData[0].ModelData;
            // faceModelDataSearchDescription.Similarity = 90;
            // faceModelDataSearchDescription.SimilaritySpecified = true;
            Html.modelData.push(faceModelDataSearchDescription);
        }
    }
    Html.Search.create();
}

function selectSearchDeviceOnchange(sender) {
    if (sender.value) {
        Html.Initialization.FaceSetSelect(sender.value);
        Html.Initialization.VideoInputSelect(sender.value);
    }
}

function comparisonSearchInit() {
    init_language();
    $('.datetime-control').datetimepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        forceParse: false,
        language: 'zh-CN',
        initialDate: new Date(),
    });
    $('.datetime-control').val(new Date().format('yyyy-MM-dd'));
    $("#comparison_search_Similarity").TouchSpin({
        min: 1,
        max: 100,
        buttonup_class: 'btn btn-secondary btn-outline',
        buttondown_class: 'btn btn-secondary btn-outline ',
        step: 1,
    });
    // $('#videoInputList').slimScroll({
    //     height: "91%"
    // });
    Html.Initialization.DeviceSelect();
}

function previewImage(file) {
    debugger;
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

function closeVideoInputList() {
    var list = document.getElementById("videoInputList").getElementsByClassName("tabpanel");
    for (var i = 0; i < list.length; i++) {
        if ($(list[i]).hasClass("show")) {
            list[i].parentNode.getElementsByClassName("tabs-list-title")[0].click();
        }
    }
}

function emptySearchCondition() {
    reductionParameters();
    Html.currentImg = null;
    $('select').prop('selectedIndex', 0);
    document.getElementById("comparison_search_BeginTime").value = new Date().format("yyyy-MM-dd");
    document.getElementById("comparison_search_EndTime").value = new Date().format("yyyy-MM-dd");
    document.getElementById("comparison_search_Similarity").value = 80;
    document.getElementById("imghead").src = "img/upload_picture.png";
}

loadPageCallBcak = function(){
    var dateTimeDiv = document.getElementsByClassName("datetimepicker-dropdown-bottom-right");
    while (dateTimeDiv.length > 0) {
        dateTimeDiv[0].parentNode.removeChild(dateTimeDiv[0]);
    }
};