var Html = {
    DeviceId: null,
    FaceSetId: null,
    FaceSet: {
        fill: function (deviceId, faceSetId) {
            Property.FaceSet.get(deviceId, faceSetId);
            if (Property.FaceSet.value) {
                var faceSet = Property.FaceSet.value;
                document.getElementById("Name").value = faceSet.Name;
                document.getElementById("Type").value = faceSet.Type;
                document.getElementById("Priority").value = faceSet.Priority;
                document.getElementById("Threshold").value = faceSet.Threshold;
                document.getElementById("Capacity").value = faceSet.Capacity;
                document.getElementById("Description").value = faceSet.Description;
            }
        },
        save: function () {
            if (Html.FaceSetId) {
                this.modify();
                return;
            }
            this.create();
        },
        create: function () {
            var faceSet = this.getHtmlValue(new FaceSet());
            var result = Property.FaceSet.create(Html.DeviceId, faceSet);
            if (result) {
                Html.FaceSetId = result;
                Html.FaceSet.fill(Html.DeviceId, Html.FaceSetId);
                $("#btns_group").removeClass("hide");
                $.toast({
                    heading: chinese.save + chinese.success,
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 3500,
                    stack: 6
                });
            }
        },
        modify: function () {
            var faceSet = this.getHtmlValue(Property.FaceSet.value);
            var result = Property.FaceSet.modify(Html.DeviceId, Html.FaceSetId, faceSet);
            if (result) {
                Html.FaceSet.fill(Html.DeviceId, Html.FaceSetId);
                $.toast({
                    heading: chinese.save + chinese.success,
                    position: 'bottom-right',
                    loaderBg: '#ff6849',
                    icon: 'success',
                    hideAfter: 3500,
                    stack: 6
                });
            }
        },
        getHtmlValue: function (faceSet) {
            faceSet.Name = document.getElementById("Name").value;
            faceSet.Type = document.getElementById("Type").value;
            faceSet.Priority = document.getElementById("Priority").value;
            faceSet.Threshold = document.getElementById("Threshold").value;
            faceSet.Capacity = document.getElementById("Capacity").value;
            faceSet.Description = document.getElementById("Description").value;
            faceSet.ThresholdSpecified = true;
            faceSet.DescriptionSpecified = true;
            faceSet.CapacitySpecified = true;
            faceSet.PrioritySpecified = true;
            return faceSet;
        },
        Face: {
            selectId: null,
            getItems: function () {
                return document.getElementById("faceAppendDataList").getElementsByClassName("group-item");
            },
            Select: {
                value: new Dictionary(),
                selectedClick: function (item) {
                    stopPropagation();
                    if (this.value[item.id]) {
                        delete this.value[item.id];
                    }
                    else {
                        this.value[item.id] = item;
                    }
                    this.selectChanged();
                },
                selectChanged: function () {
                    debugger;
                    var e = document.getElementById("faceAppendDataList");
                    e.className = "card-group";
                    var delBtn = document.getElementById("btn_del");
                    var selectedfaces = this.value.toArray();
                    if (selectedfaces.length > 0) {
                        e.className += " no-btns";
                        $(delBtn).removeClass("hide");
                    }
                    else {
                        $(delBtn).addClass("hide");
                    }
                },
                allSelect: function () {
                    var items = Html.FaceSet.Face.getItems();
                    for (var i = 0; i < items.length; i++) {
                        items[i].card.setSelected(true);
                        this.value[items[i].id] = items[i];
                    }
                    this.selectChanged();
                },
                unSelect: function () {
                    var items = Html.FaceSet.Face.getItems();
                    for (var i = 0; i < items.length; i++) {
                        items[i].click();
                    }
                    this.selectChanged();
                },
                cancelSelect: function () {
                    var items = Html.FaceSet.Face.getItems();
                    for (var i = 0; i < items.length; i++) {
                        items[i].card.setSelected(false);
                        delete this.value[items[i].id];
                    }
                    this.selectChanged();
                }
            },
            createList: function (listId, deviceId, faceSetId, pageIndex, pageSize, name, sex, province, city, phoneNumber, cardType, cardNumber, bornBeginTime, bornEndTime) {
                Property.FaceSet.Face.value = new Dictionary();
                Property.FaceSet.Face.list(deviceId, faceSetId, pageIndex, pageSize, name, sex, province, city, phoneNumber, cardType, cardNumber, bornBeginTime, bornEndTime);
                var faces = Property.FaceSet.Face.value.toArray();
                for (var a = 0; a < faces.length; a++) {
                    var list = document.getElementById(listId);
                    var box = this.createItem(faces[a], "set del col-xlg-3 col-lg-4 col-md-6 col-sm-12 group-item");
                    list.appendChild(box);
                }
            },
            searchList: function (propertys, inner) {
                var newDic = Property.FaceSet.Face.value;
                if (inner)
                    newDic = Property.FaceSet.Face.value.searchByFuzzy(propertys, inner);
                var list = document.getElementById("faceAppendDataList");
                list.innerHTML = "";
                var faces = newDic.toArray();
                for (var a = 0; a < faces.length; a++) {
                    var box = this.createItem(faces[a], "set del col-xlg-3 col-lg-4 col-md-6 col-sm-12 group-item");
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
                box.addEventListener("click", function () {
                    Html.FaceSet.Face.Select.selectedClick(this);
                });
                var card = new PictureCard(box);
                var src = Property.FaceSet.Face.Pictrue.get(Html.DeviceId, Html.FaceSetId, face.Id);
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
                if (face.Sex && face.Sex != Sex.None) {
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
                card.DeleteButton.setClick(function (e) {
                    var id = e.currentTarget.elementId;
                    $.confirm({
                        text: chinese.delete_prompt + chinese.face + chinese.information,
                        okButton: chinese.ok,
                        cancelButton: chinese.cancel,
                        okButtonClass: "btn btn-success p-r-20 p-l-20",
                        cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
                        top: -1,
                        confirm: function () {
                            Html.FaceSet.Face.remove(Html.DeviceId, Html.FaceSetId, id);
                        }
                    });
                    stopPropagation();
                });
                card.SetButton.setClick(function (e) {
                    stopPropagation();
                    Html.FaceSet.Face.FaceInfo.selectId = e.currentTarget.elementId
                    openFaceInfo();
                });
                box.card = card;
                return box;
            },
            remove: function (deviceId, faceSetId, facesId) {
                var result = Property.FaceSet.Face.remove(deviceId, faceSetId, facesId);
                if (result) {
                    delete Property.FaceSet.Face.value[facesId];
                    if (facesId == Html.FaceSet.Face.FaceInfo.selectId) {
                        closeFaceInfo();
                    }
                    var div = document.getElementById(facesId);
                    div.parentElement.removeChild(div);
                    $.toast({
                        heading: chinese.delete + chinese.success,
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                }
            },
            batchRemove: function () {
                $.confirm({
                    text: chinese.delete_prompt + chinese.face + chinese.information,
                    okButton: chinese.ok,
                    cancelButton: chinese.cancel,
                    okButtonClass: "btn btn-success p-r-20 p-l-20",
                    cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
                    top: -1,
                    confirm: function () {
                        var count = 0;
                        var items = Html.FaceSet.Face.Select.value.toArray();
                        for (var i = 0; i < items.length; i++) {
                            var result = Property.FaceSet.Face.remove(Html.DeviceId, Html.FaceSetId, items[i].id);
                            if (result) {
                                delete Property.FaceSet.Face.value[items[i].id];
                                delete Html.FaceSet.Face.Select.value[items[i].id]
                                var div = document.getElementById(items[i].id);
                                div.parentElement.removeChild(div);
                                count++;
                            }
                        }
                        $.toast({
                            heading: chinese.success + chinese.delete + count + chinese.ge + chinese.face + chinese.information,
                            position: 'bottom-right',
                            loaderBg: '#ff6849',
                            icon: 'success',
                            hideAfter: 3500,
                            stack: 6
                        });
                        Html.FaceSet.Face.Select.selectChanged();
                    }
                });
            },
            FaceInfo: {
                selectId: null,
                fill: function () {
                    if (!this.selectId) {
                        document.getElementById("face_Name").value = "";
                        document.getElementById("face_Sex").value = Sex.None;
                        document.getElementById("face_Phone").value = "";
                        document.getElementById("face_BirthDate").value = "";
                        document.getElementById("face_Province").value = "";
                        document.getElementById("face_City").value = "";
                        document.getElementById("face_CardType").value = "";
                        document.getElementById("face_CardNumber").value = "";
                        document.getElementById("face_EmployeeId").value = "";
                        document.getElementById("face_Extend").value = "";
                        document.getElementById("imghead").src = "img/upload_picture.png";
                        return;
                    }
                    var face = Property.FaceSet.Face.value[this.selectId];
                    var src = Property.FaceSet.Face.Pictrue.get(Html.DeviceId, Html.FaceSetId, this.selectId);
                    document.getElementById("imghead").src = src;
                    document.getElementById("face_Name").value = face.Name;
                    document.getElementById("face_Sex").value = face.Sex ? face.Sex : Sex.None;
                    document.getElementById("face_Phone").value = face.Phone ? face.Phone : "";
                    var birthDate = ""
                    if (face.BirthDate) {
                        var date = new Date(face.BirthDate);
                        birthDate = date.format("yyyy-MM-dd");
                    }
                    document.getElementById("face_BirthDate").value = birthDate;
                    document.getElementById("face_Province").value = face.Province ? face.Province : "";
                    document.getElementById("face_City").value = face.City ? face.City : "";
                    document.getElementById("face_CardType").value = face.CardType ? face.CardType : "";
                    document.getElementById("face_CardNumber").value = face.CardNumber ? face.CardNumber : "";
                    document.getElementById("face_EmployeeId").value = face.EmployeeId ? face.EmployeeId : "";
                    document.getElementById("face_Extend").value = face.Extend ? face.Extend : "";
                },
                save: function () {
                    if (this.selectId) {
                        this.modify(this.selectId);
                        return;
                    }
                    this.create()
                },
                create: function () {
                    var face = new FaceAppendData();
                    face.Name = document.getElementById("face_Name").value;
                    face.Sex = document.getElementById("face_Sex").value;
                    face.Phone = document.getElementById("face_Phone").value;
                    var birthDate = document.getElementById("face_BirthDate").value;
                    var bd = ""
                    if (birthDate) {
                        var arrTime = birthDate.split("-");
                        var date = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 0, 0, 0);
                        var bd = date.toISOString();
                    }
                    face.BirthDate = bd;
                    face.Province = document.getElementById("face_Province").value;
                    face.City = document.getElementById("face_City").value;
                    face.CardType = document.getElementById("face_CardType").value;
                    face.CardNumber = document.getElementById("face_CardNumber").value;
                    face.EmployeeId = document.getElementById("face_EmployeeId").value;
                    face.Extend = document.getElementById("face_Extend").value;

                    face.SexSpecified = true;
                    face.PhoneSpecified = face.Phone ? true : false;
                    face.BirthDateSpecified = face.BirthDate ? true : false;
                    face.ProvinceSpecified = face.Province ? true : false;
                    face.CitySpecified = face.City ? true : false;
                    face.CardTypeSpecified = face.CardType ? true : false;
                    face.CardNumberSpecified = face.CardNumber ? true : false;
                    face.EmployeeIdSpecified = face.EmployeeId ? true : false;
                    face.ExtendSpecified = face.Extend ? true : false;

                    face.PictureData = getBase64Image(document.getElementById('imghead'));
                    var result = Property.FaceSet.Face.create(Html.DeviceId, Html.FaceSetId, face);
                    if (result) {
                        var list = document.getElementById("faceAppendDataList");
                        var newFace = Property.FaceSet.Face.get(Html.DeviceId, Html.FaceSetId, result);
                        var newItem = Html.FaceSet.Face.createItem(newFace, "set del col-xlg-4 col-lg-6 col-md-12 col-sm-12 group-item");
                        list.appendChild(newItem);
                        Html.FaceSet.Face.FaceInfo.selectId = result;
                        $.toast({
                            heading: chinese.save + chinese.success,
                            position: 'bottom-right',
                            loaderBg: '#ff6849',
                            icon: 'success',
                            hideAfter: 3500,
                            stack: 6
                        });
                    }
                },
                batchCreate: function (list) {
                    var count = 0;
                    for (var i = 0; i < list.length; i++) {
                        var face = new FaceAppendData();
                        face.Name = list[i].id;
                        face.PictureData = getBase64Image(list[i].getElementsByTagName("img")[0]);
                        face.Sex = Sex.None;
                        face.SexSpecified = true;
                        var result = Property.FaceSet.Face.create(Html.DeviceId, Html.FaceSetId, face);
                        if (result) {
                            var faceList = document.getElementById("faceAppendDataList");
                            // var newFace = Property.FaceSet.Face.get(Html.DeviceId, Html.FaceSetId, result);
                            face.Id = result;
                            var newFace = face;
                            Property.FaceSet.Face.value[face.Id] = newFace;
                            var newItem = Html.FaceSet.Face.createItem(newFace, "set del col-xlg-4 col-lg-6 col-md-12 col-sm-12 group-item");
                            faceList.appendChild(newItem);
                            count++;
                        }
                    }
                    $.toast({
                        heading: chinese.success + chinese.create + count + chinese.ge + chinese.face + chinese.information,
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                    closeAddFaces();
                },
                modify: function (id) {
                    var face = Property.FaceSet.Face.value[id];
                    face.Name = document.getElementById("face_Name").value;
                    face.Sex = document.getElementById("face_Sex").value;
                    face.Phone = document.getElementById("face_Phone").value;
                    var birthDate = document.getElementById("face_BirthDate").value;
                    var bd = ""
                    if (birthDate) {
                        var arrTime = birthDate.split("-");
                        var date = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], 0, 0, 0);
                        var bd = date.toISOString();
                    }
                    face.BirthDate = bd;
                    face.Province = document.getElementById("face_Province").value;
                    face.City = document.getElementById("face_City").value;
                    face.CardType = document.getElementById("face_CardType").value;
                    face.CardNumber = document.getElementById("face_CardNumber").value;
                    face.EmployeeId = document.getElementById("face_EmployeeId").value;
                    face.Extend = document.getElementById("face_Extend").value;

                    face.SexSpecified = true;
                    face.PhoneSpecified = face.Phone ? true : false;
                    face.BirthDateSpecified = face.BirthDate ? true : false;
                    face.ProvinceSpecified = face.Province ? true : false;
                    face.CitySpecified = face.City ? true : false;
                    face.CardTypeSpecified = face.CardType ? true : false;
                    face.CardNumberSpecified = face.CardNumber ? true : false;
                    face.EmployeeIdSpecified = face.EmployeeId ? true : false;
                    face.ExtendSpecified = face.Extend ? true : false;
                    face.PictureData = getBase64Image(document.getElementById('imghead'));
                    var result = Property.FaceSet.Face.modify(Html.DeviceId, Html.FaceSetId, id, face);
                    if (result) {
                        var newFace = Property.FaceSet.Face.get(Html.DeviceId, Html.FaceSetId, id);
                        var oldItem = document.getElementById(id);
                        if (oldItem) {
                            var newItem = Html.FaceSet.Face.createItem(newFace, "set del col-xlg-4 col-lg-6 col-md-12 col-sm-12 group-item");
                            oldItem.parentElement.replaceChild(newItem, oldItem);
                        }
                        Property.FaceSet.Face.value[id] = newFace;
                        $.toast({
                            heading: chinese.save + chinese.success,
                            position: 'bottom-right',
                            loaderBg: '#ff6849',
                            icon: 'success',
                            hideAfter: 3500,
                            stack: 6
                        });
                    }
                },
            }
        }
    },
    Imgs: {
        List: {
            create: function (file) {
                if (file.files && file.files.length > 0) {
                    this.addItem(file, 0);
                }
            },
            addItem: function (file, index) {
                var list = document.getElementById("uploadImgs");
                var template = document.createElement("div");
                var name = "";
                var nameArray = file.files[index].name.split(".");
                if (nameArray.length == 1)
                    name = nameArray[0];
                else {
                    for (var i = 0; i < nameArray.length; i++) {
                        if (i < nameArray.length - 1) {
                            name += nameArray[i];
                        }
                    }
                }
                template.innerHTML = document.getElementsByClassName("template-upload-small-pciture-info")[0].innerHTML;
                template.getElementsByClassName("upload-small-pciture-info")[0].className += " col-xlg-4 col-lg-6 col-md-12";
                template.getElementsByClassName("bottom-title")[0].innerHTML = name;
                template.getElementsByClassName("bottom-title")[0].title = name;
                var item = template.children[0];
                item.id = name;
                item.getElementsByClassName("ti-close")[0].onclick = function () {
                    Html.Imgs.List.removeItem(item);
                };
                list.appendChild(item);
                var reader = new FileReader();
                reader.onload = function (evt) {
                    item.getElementsByClassName("picture")[0].src = evt.target.result;
                    if (file.files[index + 1]) {
                        Html.Imgs.List.addItem(file, index + 1);
                    }
                }
                reader.readAsDataURL(file.files[index]);
            },
            removeItem: function (sender) {
                sender.parentElement.removeChild(sender);
            }
        }
    }
}

var Property = {
    FaceSet: {
        value: null,
        create: function (deviceId, faceSet) {
            return tryCatch(function () {
                return Client.Management().Device.FaceSets.Create(deviceId, faceSet);
            });
        },
        modify: function (deviceId, faceSetId, faceSet) {
            return tryCatch(function () {
                return Client.Management().Device.FaceSets.Set(deviceId, faceSetId, faceSet);
            });
        },
        get: function (deviceId, faceSetId) {
            this.value = tryCatch(function () {
                return Client.Management().Device.FaceSets.Get(deviceId, faceSetId);
            });
        },
        Face: {
            value: new Dictionary(),
            list: function (deviceId, faceSetId, pageIndex, pageSize, name, sex, province, city, phoneNumber, cardType, cardNumber, bornBeginTime, bornEndTime) {
                var result = tryCatch(function () {
                    return Client.Management().Device.FaceSets.Faces.List(deviceId, faceSetId, pageIndex, pageSize, name, sex, province, city, phoneNumber, cardType, cardNumber, bornBeginTime, bornEndTime);
                });
                if (result && result.FaceAppendData) {
                    for (var i = 0; i < result.FaceAppendData.length; i++) {
                        this.value[result.FaceAppendData[i].Id] = result.FaceAppendData[i];
                        if (!this.value[result.FaceAppendData[i].Id]["Selected"])
                            this.value[result.FaceAppendData[i].Id]["Selected"] = false;
                    }
                }
                return result;
            },
            create: function (deviceId, faceSetId, faceAppendData) {
                return tryCatch(function () {
                    return Client.Management().Device.FaceSets.Faces.Create(deviceId, faceSetId, faceAppendData);
                });
            },
            modify: function (deviceId, faceSetId, facesId, faceAppendData) {
                return tryCatch(function () {
                    return Client.Management().Device.FaceSets.Faces.Set(deviceId, faceSetId, facesId, faceAppendData);
                });
            },
            remove: function (deviceId, faceSetId, facesId) {
                return tryCatch(function () {
                    return Client.Management().Device.FaceSets.Faces.Delete(deviceId, faceSetId, facesId);
                });
            },
            get: function (deviceId, faceSetId, facesId) {
                var face = tryCatch(function () {
                    return Client.Management().Device.FaceSets.Faces.Get(deviceId, faceSetId, facesId);
                });
                if (face && face.Id) {
                    this.value[face.Id] = face;
                }
                return face;
            },
            Pictrue: {
                get: function (deviceId, faceSetId, faceId) {
                    return tryCatch(function () {
                        return Client.Management().Device.FaceSets.Faces.PictureData(deviceId, faceSetId, faceId);
                    });
                }
            }
        }
    }
}

function addFaceClick() {
    Html.FaceSet.Face.FaceInfo.selectId = null;
    openFaceInfo();
}

function addFacesClick(file) {
    Html.Imgs.List.create(file);
}

function openFaceInfo() {
    closeAddFaces();
    Html.FaceSet.Face.FaceInfo.fill();
    $("#divFaceList").attr("class", "col-xlg-6 col-lg-6 col-md-6");
    $("#divFaceList").find(".group-item").attr("class", "set del col-xlg-4 col-lg-6 col-md-12 col-sm-12 group-item");
    $("#divFaceInfo").removeClass("hide");
}

function closeFaceInfo() {
    Html.FaceSet.Face.FaceInfo.selectId = null;
    $("#divFaceInfo").addClass("hide");
    $("#divFaceList").attr("class", "col-xlg-9 col-lg-9 col-md-9");
    $("#divFaceList").find(".group-item").attr("class", "set del col-xlg-3 col-lg-4 col-md-6 col-sm-12 group-item");
}

function openAddFaces() {
    closeFaceInfo();
    $("#divFaceList").attr("class", "col-xlg-6 col-lg-6 col-md-6");
    $("#divFaceList").find(".group-item").attr("class", "set del col-xlg-4 col-lg-6 col-md-12 col-sm-12 group-item");
    $("#divAddFaces").removeClass("hide");
}

function closeAddFaces() {
    var list = document.getElementById("uploadImgs");
    list.innerHTML = "";
    var file = document.getElementById('addFacesInput');
    file.value = '';
    file.outerHTML = file.outerHTML;
    $("#divAddFaces").addClass("hide");
    $("#divFaceList").attr("class", "col-xlg-9 col-lg-9 col-md-9");
    $("#divFaceList").find(".group-item").attr("class", "set del col-xlg-3 col-lg-4 col-md-6 col-sm-12 group-item");
}

function batchCreateFaceInfo() {
    var list = document.getElementById("uploadImgs").getElementsByClassName("upload-small-pciture-info");
    if (list.length == 0) {
        $.toast({
            heading: chinese.please + chinese.upload + chinese.picture,
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3500,
            stack: 6
        });
        return;
    }
    Html.FaceSet.Face.FaceInfo.batchCreate(list);
}

//ͼƬ�ϴ�Ԥ��    IE�������˾���
function previewImage(file) {
    var div = document.getElementById('preview');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img width="110" height="126" height id="imghead" class="upload_img" onclick=$("#previewImg").click()>';
        var img = document.getElementById('imghead');
        var reader = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
            console.log(getBase64Image(document.getElementById('imghead')));
        }
        reader.readAsDataURL(file.files[0]);
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
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var dataURL = canvas.toDataURL("image/jpeg");
    return dataURL.replace("data:image/jpeg;base64,", "");
}

function faceSearchClick() {
    var input = document.getElementById("inputFaceSearch");
    Html.FaceSet.Face.searchList(["Name", "Phone"], input.value);
}