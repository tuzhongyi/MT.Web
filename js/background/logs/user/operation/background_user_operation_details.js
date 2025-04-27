Logs_User_Operations_Property["Operation"] = {
    load: function (id) {
        return tryCatch(function () {
            return Logs_User_Operations_Property.OperationList.get(id);
        });
    },
}

Logs_User_Operations_Html.Control.AlertWindow["Operation"] = {
    load: function (id) {
        var result = Logs_User_Operations_Property.Operation.load(id);
        this.UserId.set(result.UserId)
        this.Username.set(result.Username);
        this.UserOperationType.set(result.UserOperationType);
        this.Time.set(Convert.ToDate(result.Time).format("yyyy-MM-dd HH:mm:ss"));
        this.ObjectId.set(result.ObjectId);
        this.ObjectName.set(result.ObjectName);
        this.Description.set(result.Description);
        this.RemoteClientInfo.set(result.RemoteClientInfo);
        this.RemoteClientType.set(result.RemoteClientType);

    },
    UserId: {
        set: function (value) {
            getTag("txtUserId").value = value;
        }
    },
    Username: {
        set: function (value) {
            getTag("txtUsername").value = value;
        }
    },

    UserOperationType: {
        set: function (value) {
            getTag("txtUserOperationType").value = Language.Display.UserOperationType[value];
        }
    },
    Time: {
        set: function (value) {
            getTag("txtTime").value = value;
        }
    },
    ObjectId:{
        set: function (value) {
            getTag("txtObjectId").value = value;
        }
    },
    ObjectName:{
        set: function (value) {
            getTag("txtObjectName").value = value;
        }
    },
    RemoteClientInfo:{
        set: function (value) {
            getTag("txtRemoteClientInfo").value = value;
        }
    },
    RemoteClientType:{
        set: function (value) {
            getTag("txtRemoteClientType").value = value;
        }
    },
    Username: {
        set: function (value) {
            getTag("txtUsername").value = value;
        }
    },
    Username: {
        set: function (value) {
            getTag("txtUsername").value = value;
        }
    },
    Description: {
        set: function (value) {
            getTag("txtDescription").value = value;
        }
    },
}
