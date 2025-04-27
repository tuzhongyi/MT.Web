Property["Record"] = {
    load: function (id) {
        return tryCatch(function () {
            return Property.RecordList.get(id);
        });
    },
}

Html.Control.AlertWindow["Record"] = {
    severityLanguage: {
        64: "紧急",
        1: "一般信息",
        0: "未知",
        16: "重要/警告"
    },
    load: function (id) {
        var result = Property.Record.load(id);
        this.ComponentId.set(result.ComponentId)
        this.Name.set(result.Name);
        this.EventType.set(Language.Enum.EventType[result.EventType]);
        this.AlarmTime.set(Convert.ToDate(result.AlarmTime).format("yyyy-MM-dd HH:mm:ss"));
        this.Severity.set(this.severityLanguage[result.Severity]);
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