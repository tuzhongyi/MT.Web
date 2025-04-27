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
            return Client.Management().Event.Record(null, null, startDate, endDate, 1, 150);
        });
        if (val && val.EventRecord) {
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
        $(btn).addClass("can-not-click");
        btn.children[0].title = severityLanguage[record.Severity];
        var item = new GroupListItem();
        item.id = record.Id;
        item.onclick = null;

        item.Content.appendChild(btn);
        var time = document.createElement("div");
        var date = Convert.ToDate(record.AlarmTime);
        time.innerText = date.format("yyyy-MM-dd HH:mm:ss");
        time.title = "报警时间"
        item.Content.appendChild(time);

        var inputs = Property.Inputs.toArray();
        for (var i = 0; i < inputs.length; i++) {
            if (record.ComponentId == inputs[i].AssociationId) {
                var inputId = inputs[i].InputId;
                item.onclick = function (e) {
                    playbackWithEventRecord(record, inputId);
                }
                $(btn).removeClass("can-not-click");
            }
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