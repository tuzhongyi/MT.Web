
//var index = 0;
//var arr = new Array();
//arr.push("None");
//arr.push("IPCamera");
//arr.push("DVS");
//arr.push("NVR");
//arr.push("DVR");
//arr.push("DigitalMatrix");
//arr.push("HDDecoder");
//arr.push("AnalogMatrix");
//arr.push("VAS");
//arr.push("AAM");
//arr.push("NAM");
//arr.push("VPS");
//arr.push("IntegratedMatrix");
//arr.push("MatrixControlUnit");
//arr.push("StreamingMediaServer");
//arr.push("DecodingUnit");
//arr.push("EncodingUnit");
//arr.push("NVS");
//arr.push("DataServer");
//arr.push("AcquisitionServer");
//arr.push("SystemGateway");
/// <reference path="../../client/management.js" />
/// <reference path="../pdc.js" />
if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var Info =
{
    ControlIdPrefix:
    {
        GroupListItem: "group_",
        getId: function (id, prefix) {
            return id.substr(prefix.length);
        }
    },
}

//属性
var Property =
{
    PageSize: 20,//单页数据数量

    Guid: null,

    ProtocolType: null,

    Timer: null,
    //总数
    TotalCount: {
        value: 0,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("lblTotalCount").innerText = value;
            getTag("head_lblTotalCount").innerText = value;
            this.value = value;
        }
    },
    Searching:
    {
        value: new Dictionary(),
        type: null,
        scroll: 0,
        selectTypeValue: "all",
        get: function () {
            if (!this.value)
                this.value = new Dictionary();
            if (!this.type) {
                this.type = new Array();
            }
            var device = null;

            try {
                device = Client.PDC().Device.Searching.Get(Property.Guid);
            }
            catch (e) {
                switch (e.number) {
                    case 404:
                    case 403:
                    case 410:
                    case 3:
                        break;
                    default:
                        $.confirm({
                            text: e.name,
                            alert: true,
                            okButton: "确定"
                        });
                        searching_Click(getTag("head_btn_searching"));
                        break;
                }
            }

            if (device) {
                var gid = Guid.NewGuid().ToString();
                device.Id = gid;
                this.value[gid] = device;
                if (!this.value[gid]["Selected"])
                    this.value[gid]["Selected"] = false;
                if (this.type.indexOf(device.Classification) < 0)
                    this.type.push(device.Classification);
                if (getTag("chk_existed").checked && device.ExistedInDatabase)
                    return null;
                return device;
            }
            return null;

            ////测试代码 发布时删除

            //device = new Device();
            //var gid = Guid.NewGuid().ToString();
            //device.Id = gid;
            //device.Uri = "http://localhost:5645/management/searching.htm";
            //device.Name = "测试20150609";
            //device.Classification = arr[index];
            //this.value[gid] = device;
            //if (!this.value[gid]["Selected"])
            //    this.value[gid]["Selected"] = false;
            //if (this.type.indexOf(device.Classification) < 0)
            //    this.type.push(device.Classification);
            //++index;
            //return device;
        },
        start: function () {
            tryCatch(function () {
                // Client.Management().Device.Searching.Start(Property.Guid, Property.ProtocolType);
                Client.PDC().Device.Searching.Start(Property.Guid, Property.ProtocolType, "3600");
            });
        },
        stop: function () {
            tryCatch(function () {
                //    Client.Management().Device.Searching.Stop(Property.Guid);
                Client.PDC().Device.Searching.Stop(Property.Guid);
            });
        },
        add: function () {
            var count = 0;
            var table = getTag("tbody");
            //table.innerText = "";
            table.clear();
            Property.TotalCount.set(0);
            //for (var id in this.value) {
            //    if (this.value[id].Selected && this.value[id].ExistedInDatabase == false) {
            //        try {
            //            this.value[id].Id = "";
            //            Client.Management().Device.Create(this.value[id]);
            //            var tag = getTag(id);
            //            if (tag)
            //                tag.parentElement.removeChild(tag);
            //            this.value[id].Selected = false;
            //            this.value[id].ExistedInDatabase = true;
            //            Html.Control.Table.load(this.value[id]);
            //            ++count;
            //        } catch (e) { };
            //    }
            //    if (getTag("chk_existed").checked && this.value[id].ExistedInDatabase)
            //        continue;
            //    if (this.value[id].Classification == Property.Searching.selectTypeValue || Property.Searching.selectTypeValue == "all")
            //        Html.Control.Table.load(this.value[id]);
            //}

            var arr = this.value.toArray();
            for (var i = 0; i < arr.length; i++) {
                var id = arr[i].Id;
                var name = arr[i].Name;
                if (this.value[id].Selected && this.value[id].ExistedInDatabase == false) {
                    tryCatch(function () {
                        Property.Searching.value[id].Id = "";
                        if (!Property.Searching.value[id].Name || document.getElementById("chk_IPName").checked) {
                            var uri = new Uri(Property.Searching.value[id].Uri);
                            Property.Searching.value[id].Name = uri.Host;
                        }
                        Client.PDC().Device.Create(Property.Searching.value[id]);
                      //  Client.Management().Device.Create(Property.Searching.value[id]);
                        Property.Searching.value[id].Id = id;
                        Property.Searching.value[id].Name = name;
                        //var tag = getTag(id);
                        //if (tag)
                        //    tag.parentElement.removeChild(tag);
                        Property.Searching.value[id].Selected = false;
                        Property.Searching.value[id].ExistedInDatabase = true;
                        ++count;
                    });
                }
                if (getTag("chk_existed").checked && this.value[id].ExistedInDatabase)
                    continue;
                if (this.value[id].Classification == Property.Searching.selectTypeValue || Property.Searching.selectTypeValue == "all")
                    Html.Control.Table.load(this.value[id]);
            }
            return count;
        },
    },
}


var Html = {
    Control: {
        Table: {
            createItem: function (device) {
                var tr = document.createElement("tr");
                tr.id = device.Id;
                var name = device.Name;
                if (getTag("chk_IPName").checked) {
                    var uri = new Uri(device.Uri);
                    name = uri.Host
                }
                tr.appendChild(new TableBodyTd("<div class='icon-color-btn-background " + LabelTagColor.LightBlue + "' style='margin-right: 10px;'><div class='arrow-left icon-color-btn-triangle'></div><div class='background_icon classification device camera" + "'></div></div>", "td-classification"));

                tr.className = Info.ControlIdPrefix.GroupListItem;

                var td = new TableBodyTd(name, "td-name");
                td.title = name;
                tr.appendChild(td);

                td = new TableBodyTd(device.SerialNumber, "td-serial-number");
                td.title = device.SerialNumber;
                tr.appendChild(td);

                td = new TableBodyTd(device.Model, "td-model");
                td.title = device.Model;
                tr.appendChild(td);

                td = new TableBodyTd(device.Uri, "td-uri");
                td.title = device.Uri;
                tr.appendChild(td);

                tr.appendChild(new TableBodyTd(device.ExistedInDatabase ? "保存" : "未保存", "td-existed-in-database"));
                tr.onclick = function () { TableTr_Click(tr) };

                tr.onclick = function () {

                    if (this.className.indexOf("selected") >= 0) {
                        $(this).removeClass("selected");
                        Property.Searching.value[this.id].Selected = false;
                        --Html.Control.Table.selectedCount;
                    }
                    else {
                        $(this).addClass("selected");
                        Property.Searching.value[this.id].Selected = true;
                        ++Html.Control.Table.selectedCount;
                    }

                    changeAddBtn()
                    return false;
                }

                return tr;
            },
            //获取列表项
            getItem: function (device) {
                return this.createItem(device);
            },
            //加载列表
            load: function (device) {
                var item = this.getItem(device);
                var table = getTag("tbody");
                //table.appendChild(item);
                table.insertBefore(item, table.firstChild);
                var old = Property.TotalCount.get();
                Property.TotalCount.set(old + 1);
            },
            start: function (protocolType) {
                this.clear();
                Property.Guid = Guid.NewGuid().ToString();
                Property.ProtocolType = protocolType;
                Property.Searching.start();
                Property.Timer = setInterval(function () {
                    var device_ = Property.Searching.get();
                    if (device_) {
                        Html.Control.Table.load(device_);
                    }
                }, 500);
            },
            stop: function () {
                clearInterval(Property.Timer);
                if (Property.Searching.type && Property.Searching.type.length > 0) {
                    var headList = document.createElement("ul");
                    headList.id = "head_classificationItemList";
                    headList.className = "dropdown-menu";
                    headList.style.overflow = "auto";
                    headList.style.maxHeight = "500px";
                    headList.onscroll = function () { classificationFilter_Onscroll(headList) };
                    var list = document.createElement("ul");
                    list.id = "classificationItemList";
                    list.className = "dropdown-menu";
                    list.style.overflow = "auto";
                    list.style.maxHeight = "500px";
                    list.onscroll = function () { classificationFilter_Onscroll(list) };
                    var all = document.createElement("li");
                    all.appendChild($("<a class='device-type all xsgroupdown-menu-ul-li-a selected' onclick=\"Html.Control.Table.selectType(this,'all')\">全部</a>")[0]);
                    var headAll = document.createElement("li");
                    headAll.appendChild($("<a class='device-type all xsgroupdown-menu-ul-li-a selected' onclick=\"Html.Control.Table.selectType(this,'all')\">全部</a>")[0]);
                    headList.appendChild(headAll);
                    list.appendChild(all);
                    for (var i = 0; i < Property.Searching.type.length; i++) {
                        var li = document.createElement("li");
                        li.appendChild($("<a class='device-type " + Property.Searching.type[i] + " xsgroupdown-menu-ul-li-a' onclick=\"Html.Control.Table.selectType(this,'" + Property.Searching.type[i] + "')\">" + Property.Searching.type[i] + "-" + Language.Enum.DeviceClassification[Property.Searching.type[i]] + "</a>")[0]);
                        var headLi = document.createElement("li");
                        headLi.appendChild($("<a class='device-type " + Property.Searching.type[i] + " xsgroupdown-menu-ul-li-a' onclick=\"Html.Control.Table.selectType(this,'" + Property.Searching.type[i] + "')\">" + Property.Searching.type[i] + "-" + Language.Enum.DeviceClassification[Property.Searching.type[i]] + "</a>")[0]);
                        list.appendChild(li);
                        headList.appendChild(headLi);
                    }
                    getTag("head_classificationFilter").appendChild(headList);
                    getTag("classificationFilter").appendChild(list);
                }
            },
            selectType: function (sender, args) {
                if (args == Property.Searching.selectTypeValue)
                    return;
                var table = getTag("tbody");
                table.clear();
                //table.innerText = "";
                Property.TotalCount.set(0);
                this.clearSelected();
                var arr = Property.Searching.value.toArray();
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].Classification == args || args == "all") {
                        if (getTag("chk_existed").checked && arr[i].ExistedInDatabase)
                            continue;
                        Html.Control.Table.load(arr[i]);
                    }
                }
                Property.Searching.selectTypeValue = args;
                while ($(".selected").length > 0) {
                    $(".selected")[0].className = $(".selected")[0].className.replace("selected", "");
                }
                var a = $(".device-type." + args.toLowerCase());
                for (var i = 0; i < a.length; i++) {
                    a[i].className = a[i].className + " selected";
                }
            },
            clear: function () {
                var headList = getTag("head_classificationItemList");
                var list = getTag("classificationItemList");
                if (headList && list) {
                    headList.parentElement.removeChild(headList);
                    list.parentElement.removeChild(list);
                }
                var table = getTag("tbody");
                table.innerHTML = "";
                Property.TotalCount.set(0);
                Property.Searching.type = null;
                Property.Searching.value = null;
                Property.Searching.scroll = 0;
                Property.Searching.selectTypeValue = "all";
                this.selectedCount = 0;
            },
            selectedCount: 0,
            //select: function (id) {
            //    Property.Searching.value[id].Selected = !Property.Searching.value[id].Selected;
            //    if (Property.Searching.value[id].Selected)
            //        ++this.selectedCount;
            //    else
            //        --this.selectedCount;
            //},
            selectAll: function (name, fn) {
                var items = $("." + name);
                for (var i = 0; i < items.length; i++) {
                    if (items[i].className.indexOf("selected") < 0)
                        $(items[i]).addClass("selected");
                }
                if (fn)
                    fn(items);
            },
            selectCancel: function (name, fn) {
                var items = $("." + name);
                for (var i = 0; i < items.length; i++) {
                    if (items[i].className.indexOf("selected") >= 0)
                        $(items[i]).removeClass("selected");
                }
                if (fn)
                    fn(items);
            },
            selectInverse: function (name) {
                var items = $("." + name);
                for (var i = 0; i < items.length; i++) {
                    items[i].click();
                }
            },
            clearSelected: function () {
                var arr = Property.Searching.value.toArray();
                for (var i = 0; i < arr.length; i++) {
                    Property.Searching.value[arr[i].Id].Selected = false;
                }
            },
            changeDisplay: function () {
                var table = getTag("tbody");
                table.innerHTML = "";
                Property.TotalCount.set(0);
                this.clearSelected();
                var arr = Property.Searching.value.toArray();
                for (var i = 0; i < arr.length; i++) {
                    if (getTag("chk_existed").checked && arr[i].ExistedInDatabase)
                        continue;
                    if (arr[i].Classification == Property.Searching.selectTypeValue || Property.Searching.selectTypeValue == "all")
                        this.load(arr[i]);
                }
            }
        }
    }
}
