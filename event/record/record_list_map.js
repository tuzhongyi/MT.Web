var severityColor = {
    64: "text-danger",
    1: "text-info",
    0: "text-default",
    16: "text-warning"
}
var severityLanguage = {
    64: "紧急",
    1: "一般信息",
    0: "未知",
    16: "重要/警告"
}

function record_list() {
    this.Severity = null;
    //var date = new Date();
    //$('#txt_date').val(date.format("yyyy-MM-dd"));
    //$('#txt_date').datepicker();
    //$('#txt_date').data("datepicker").picker.click(function () {
    //    stopPropagation();
    //});
    //$('#txt_date').css("cursor", "pointer");
    //$('#txt_date').data("datepicker").picker.addClass("date_table");
    //$('#txt_date').change(function () {
    //    date = Convert.ToDate($('#txt_date').val());
    //    var beginTime = date.toISOString();
    //    date.setHours(23,59,59);
    //    var endTime = date.toISOString();
    //    list = new Dictionary();
    //    load(beginTime, endTime);
    //    record.Show(record.Severity);
    //})

    var list = new Dictionary();
    this.getRecord = function (id) {
        return list[id];
    }
    function init() {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        var startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(date.getDate() - 1);
        var endDate = new Date();
        endDate.setDate(date.getDate() + 1);
        endDate.setHours(0, 0, 0, 0);
        load(startDate.toISOString(), endDate.toISOString());
    }

    function load(startDate, endDate) {
        var val = tryCatch(function () {
            return Client.Management().Event.Record(null, null, startDate, endDate, 1, 100);
        });
        //getTag("record_number").innerHTML = 0;
        if (val && val.EventRecord) {
            //getTag("record_number").innerHTML = val.Page.TotalRecordCount;
            for (var i = 0; i < val.EventRecord.length; i++) {
                list[val.EventRecord[i].Id] = val.EventRecord[i];
            }
        }
    }

    this.reload = function (severity) {
        init();
        this.Show(severity);
    }

    function createItem(record) {
        var btn = new IconButton(record.Id, "icon-bell-alt " + severityColor[record.Severity], 11, record.Name);
        btn.title = record.Name;
        btn.children[0].title = severityLanguage[record.Severity];
        var item = new GroupListItem();
        item.id = record.Id;

        item.Content.appendChild(btn);
        var time = document.createElement("div");
        var date = Convert.ToDate(record.AlarmTime);
        time.innerText = date.format("yyyy-MM-dd HH:mm:ss");
        time.title = "报警时间"
        item.Content.appendChild(time);



        item.onclick = function (e) {
            var a = document.createElement("a");
            a.href = "../event/record/record_details.htm";
            a.href += "?RecordId=" + this.id;
            AlertWindow.Show(a, -1);
            record_details.load(this.id);
        }

        return item;
    }
    init();

    this.Show = function (severity) {
        var items = new GroupListItemArray();

        var a = list.order("AlarmTime", true);
        //a = a.sortBy("Severity", true);
        for (var i = 0; i < a.length; i++) {
            if ((!severity && severity != 0) || a[i].Severity == severity)
                items.push(createItem(a[i]));
        }
        var gl = new GroupList("", items);
        document.getElementById("glist_record_content").innerHTML = "\n ";
        document.getElementById("glist_record_content").appendChild(gl);
    }
}

function show_Click(sender, args) {
    if (sender) {
        $(".list-permission-btn").removeClass("selected");
        sender.className += " selected";
    }
    record.Severity = args;
    record.Show(args);
}

var record_details = {
    load: function (id) {
        var result = record.getRecord(id);
        this.ComponentId.set(result.ComponentId)
        this.Name.set(result.Name);
        this.EventType.set(Language.Enum.EventType[result.EventType]);
        this.AlarmTime.set(Convert.ToDate(result.AlarmTime).format("yyyy-MM-dd HH:mm:ss"));
        this.Severity.set(severityLanguage[result.Severity]);
        var DisalarmTimeDate = "无";
        var ProcessTimeDate = "无";
        if (result.DisalarmTime)
            DisalarmTimeDate = Convert.ToDate(result.DisalarmTime).format("yyyy-MM-dd HH:mm:ss");
        if (result.ProcessTime)
            ProcessTimeDate = Convert.ToDate(result.ProcessTime).format("yyyy-MM-dd HH:mm:ss");
        if (DisalarmTimeDate == "1970-01-01 00:00:00")
            DisalarmTimeDate = "未撤销";
        if (ProcessTimeDate == "1970-01-01 00:00:00")
            ProcessTimeDate = "未处理";
        this.DisalarmTime.set(DisalarmTimeDate);
        this.ProcessTime.set(ProcessTimeDate);
        this.ProcessDescription.set(result.ProcessDescription);
        this.Description.set(result.Description);
        this.ObjectType.set(result.ObjectType ? Language.Enum.ObjectType[result.ObjectType] : "无");
        this.TriggerValue.set(result.TriggerValue ? result.TriggerValue : "无");
    },
    ComponentId: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtComponentId").value = value;
            this.value = value;
        }
    },
    Name: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtName").value = value;
            this.value = value;
        }
    },
    EventType: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtEventType").value = value;
            this.value = value;
        }
    },
    AlarmTime: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtAlarmTime").value = value;
            this.value = value;
        }
    },
    Severity: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtSeverity").value = value;
            this.value = value;
        }
    },
    DisalarmTime: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtDisalarmTime").value = value;
            this.value = value;
        }
    },
    ProcessTime: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtProcessTime").value = value;
            this.value = value;
        }
    },
    ProcessDescription: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtProcessDescription").value = value;
            this.value = value;
        }
    },
    Description: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtDescription").value = value;
            this.value = value;
        }
    },
    ObjectType: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtObjectType").value = value;
            this.value = value;
        }
    },
    TriggerValue: {
        value: null,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("txtTriggerValue").value = value;
            this.value = value;
        }
    },
}

function record_details_load() {

}