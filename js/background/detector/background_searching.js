/// <reference path="../../client/detector.js" />
/// <reference path="../../client/client.js" />
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
        scroll: 0,
        get: function () {
            if (!this.value)
                this.value = new Dictionary();
            var detector = null;

            try {
                detector = Client.Detector().Detector.Searching.Get(Property.Guid);
            }
            catch (e) {
                switch (e.number) {
                    case 404:
                    case 403:
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

            if (detector) {
                var gid = Guid.NewGuid().ToString();
                detector.Id = gid;
                this.value[gid] = detector;
                if (!this.value[gid]["Selected"])
                    this.value[gid]["Selected"] = false;
                if (getTag("chk_existed").checked && detector.ExistedInDatabase)
                    return null;
                return detector;
            }
            return null;
        },
        start: function () {
            tryCatch(function () {
                Client.Detector().Detector.Searching.Start(Property.Guid);
            });
        },
        stop: function () {
            tryCatch(function () {
                Client.Detector().Detector.Searching.Stop(Property.Guid);
            });
        },
        add: function () {
            var count = 0;
            var table = getTag("tbody");
            table.clear();
            Property.TotalCount.set(0);

            var arr = this.value.toArray();
            for (var i = 0; i < arr.length; i++) {
                var id = arr[i].Id;
                var name = arr[i].Name;
                if (this.value[id].Selected && this.value[id].ExistedInDatabase == false) {
                    try {
                        this.value[id].Id = "";
                        if (!this.value[id].Name)
                            this.value[id].Name = this.value[id].Uri;
                        Client.Detector().Detector.Create(this.value[id]);
                        this.value[id].Id = id;
                        this.value[id].Name = name;
                        this.value[id].Selected = false;
                        this.value[id].ExistedInDatabase = true;
                        ++count;
                    } catch (e) { };
                }
                if (getTag("chk_existed").checked && this.value[id].ExistedInDatabase)
                    continue;
                Html.Control.Table.load(this.value[id]);
            }
            return count;
        },
        set: function (detector) {
            tryCatch(function () {
                Client.Detector().Detector.Searching.Set(detector.Id, detector);
            });
        }
    },
}


var Html = {
    Control: {
        Table: {
            createItem: function (detector) {
                var tr = document.createElement("tr");
                tr.id = detector.Id;
                tr.appendChild(new TableBodyTd("<div title=" + detector.Name + " class='icon-color-btn-background " + LabelTagColor.LightBlue + "' style='margin-right: 10px;'><div class='arrow-left icon-color-btn-triangle'></div><div class='background_icon detector'></div></div>", "td-classification"));

                tr.className = Info.ControlIdPrefix.GroupListItem;

                var td = new TableBodyTd(detector.Name, "td-name");
                td.title = detector.Name;
                tr.appendChild(td);

                td = new TableBodyTd("<a>" + detector.Uri + "</a>", "td-uri");
                td.title = detector.Uri;
                tr.appendChild(td);

                td = new TableBodyTd(detector.ClientIPAddress +":"+ detector.ClientPort, "td-client");
                td.title = detector.ClientIPAddress + ":" + detector.ClientPort;
                tr.appendChild(td);

                tr.appendChild(new TableBodyTd(detector.ExistedInDatabase ? "保存" : "未保存", "td-existed-in-database"));
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
            getItem: function (detector) {
                return this.createItem(detector);
            },
            //加载列表
            load: function (detector) {
                var item = this.getItem(detector);
                var table = getTag("tbody");
                table.insertBefore(item, table.firstChild);
                var old = Property.TotalCount.get();
                Property.TotalCount.set(old + 1);
            },
            start: function () {
                this.clear();
                Property.Guid = Guid.NewGuid().ToString();
                Property.Searching.start();
                Property.Timer = setInterval(function () {
                    var detector = Property.Searching.get();
                    if (detector) {
                        Html.Control.Table.load(detector);
                    }
                }, 500);
            },
            stop: function () {
                clearInterval(Property.Timer);
            },
            clear: function () {
                var table = getTag("tbody");
                table.innerHTML = "";
                Property.Searching.value = null;
                Property.Searching.scroll = 0;
                this.selectedCount = 0;
                Property.TotalCount.set(0);
            },
            selectedCount: 0,
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
            clearSelected:function(){
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
                    this.load(arr[i]);
                }
            }
        }
    }
}
