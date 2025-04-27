/// <reference path="../../howell.js/howell.control.js" />
/// <reference path="../../client/struct.js" />
/// <reference path="../../jquery/jquery.js" />
/// <reference path="../../howell.js/howell.js" />

if (!this.Client)
    imported.loadJS("/js/client/client.js");
//信息
var Logs_User_Operations_Info =
{
    ControlIdPrefix:
    {
        GroupListItem: "group_",
        AlertWindow: "alert_",
        //获取ID
        getId: function (id, prefix) {
            return id.substr(prefix.length);
        }
    },
}

//属性
var Logs_User_Operations_Property =
{
    Count: {
        get: function (id, fn) {
            var result = fn.List(id, 1, 1);
            return result.Page.TotalRecordCount;
        },
    },
    PageSize: 20,//单页数据数量
    //当前数量
    CurrentCount: {
        value: 0,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("lblCurrentCount").innerText = value;
            this.value = value;
        }
    },
    //总数
    TotalCount: {
        value: 0,
        get: function () {
            return this.value;
        },
        set: function (value) {
            getTag("lblTotalCount").innerText = value;
            this.value = value;
        }
    },
    //权限
    UserList: {
        value: new Dictionary(),
        load: function () {
            var result = tryCatch(function () {
                return Client.Security().User.List();
            });
            if (result && result.User) {
                for (var i = 0; i < result.User.length; i++) {
                    var id = Logs_User_Operations_Html.Id.set(result.User[i]);
                    this.value[id] = result.User[i];
                    addOption(result.User[i], i);
                }
            }
            return result;
        }
    },
    OperationList:
    {
        value: new Dictionary(),
        load: function (beginTime, endTime, userId, userOperationType, objectId, pageIndex, pageSize) {
            var result = tryCatch(function () {
                return Client.Logs().User.Operations(beginTime, endTime, userId, userOperationType, objectId, pageIndex, pageSize);
            });

            if (result && result.UserOperationLog) {
                result.UserOperationLog = result.UserOperationLog.sortBy("Time", true);
                for (var i = 0; i < result.UserOperationLog.length; i++) {
                    var id = Logs_User_Operations_Html.Id.set(result.UserOperationLog[i]);
                    this.value[id] = result.UserOperationLog[i];
                }
            }
            return result;
        },
        get: function (id) {
            if (this.value)
                return this.value[id];
            return null;
        }
    },
}

var Logs_User_Operations_Html = {
    //搜索条件
    MoreSearch: false,
    Criteria: {
        beginTime: null,
        endTime: null,
        userId: null,
        userOperationType: null,
    },
    Id: {
        set: function (operation) {
            var id = operation.UserId + "_" + operation.UserOperationType + "_" + operation.Time;
            return id;
        }
    },
    Current: {
        Id: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.OperationId;
                return null;
            }
        },
        Key: {
            get: function () {
                var uri = new Uri(Trigger.href);
                if (uri.Query)
                    return uri.Querys.key;
                return null;
            }
        }
    },
    Control: {
        GroupList: {
            IconType: {
                Login: "howell-icon-login",
                Logout: "howell-icon-logout",
                RealPlay: "howell-icon-real-play",
                VodPlay: "howell-icon-vod-play",
                Download: "howell-icon-download",
                PTZ: "howell-icon-ptz",
                DecoderSwitch: "howell-icon-decoder-switch",
                CreateUser: "howell-icon-create-user",
                DeleteUser: "howell-icon-delete-user",
                SetUser: "howell-icon-set-user",
                CreateDevice: "howell-icon-create-device",
                DeleteDevice: "howell-icon-delete-device",
                SetDevice: "howell-icon-set-device"
            },
            IconColor:{
                Login: LabelTagColor.LightBlue,
                Logout: LabelTagColor.LightBlue,
                RealPlay: LabelTagColor.LightBlue,
                VodPlay: LabelTagColor.LightBlue,
                Download: LabelTagColor.Yellow,
                PTZ: LabelTagColor.Yellow,
                DecoderSwitch: LabelTagColor.LightBlue,
                CreateUser: LabelTagColor.LightBlue,
                DeleteUser: LabelTagColor.Red,
                SetUser: LabelTagColor.Yellow,
                CreateDevice: LabelTagColor.LightBlue,
                DeleteDevice: LabelTagColor.Red,
                SetDevice: LabelTagColor.Yellow
            },
            createItem: function (operation) {
                //创建控件

                var createControl = {
                    //联动名称，点击后显示相信信息
                    details: function (operation, control) {
                        var id = Logs_User_Operations_Html.Id.set(operation);
                        var userName = operation.Username;
                        var span = document.createElement("span");
                        span.innerText = userName;
                        span.title = userName;
                        var btn = new IconColorButton(Logs_User_Operations_Info.ControlIdPrefix.AlertWindow + id, Logs_User_Operations_Html.Control.GroupList.IconType[operation.UserOperationType] + " background-icon", Logs_User_Operations_Html.Control.GroupList.IconColor[operation.UserOperationType], 10, span);
                        btn.href = "logs/user/operation/user_operation_details.htm?OperationId=" + id;
                        btn.className = btn.className + " list-group-item-name";
                        btn.style.width = "230px";

                        btn.onclick = function () {
                            stopPropagation();
                            var a = document.createElement("a");
                            a.href = btn.href;
                            return user_operations_info_Click(a);
                        }

                        control.appendChild(btn);
                    },
                    //处理描述信息
                    description: function (operation, control) {
                        var div = document.createElement("div");
                        div.title = operation.Description;
                        div.className = "list-item-information security";
                        div.style.width = "430px";
                        if (!operation.Description) {
                            div.title = "无描述信息"
                            div.className += " none";
                        }
                        div.innerText = div.title;
                        control.appendChild(div);
                    },
                    //操作执行时间
                    time: function (date, control) {
                        var div = document.createElement("div");
                        if (date) {
                            var displayDate = Convert.ToDate(date);
                            div.innerText = displayDate.format("yyyy-MM-dd HH:mm:ss");
                        }
                        div.title = "操作执行时间";
                        div.className = "list-item-information time";
                        control.appendChild(div);
                    },
                    //远程客户端信息
                    remoteClientInfo: function (operation, control) {
                        var div = document.createElement("div");
                        div.title = "远程客户端信息";
                        div.className = "pull-right list-item-information security";
                        div.style.width = "120px";
                        div.innerText = operation.RemoteClientInfo;
                        control.appendChild(div);
                    },
                };

                var item = new GroupListItem(Logs_User_Operations_Info.ControlIdPrefix.GroupListItem, null, true);
                item.className = item.className + " mouse_pointer";
                item.id = Logs_User_Operations_Html.Id.set(operation);
                createControl.details(operation, item.Content);//创建权限图标和输入通道名称               
                createControl.time(operation.Time, item.Content);//创建触发时间
                createControl.remoteClientInfo(operation, item.Content);//创建远程客户端信息
                createControl.description(operation, item.Content);//创建处理描述信息
                item.Content.className = "list-group-item-content";

                return item;
            },
            //获取列表项
            getItems: function (operations) {
                var items = new GroupListItemArray();
                if (operations) {
                    for (var i = 0; i < operations.length; i++) {
                        items.push(this.createItem(operations[i]));
                    }
                    return items;
                }
            },
            //创建列表
            create: function () {
                var beginTime = Logs_User_Operations_Html.Criteria.beginTime;
                var endTime = Logs_User_Operations_Html.Criteria.endTime;
                var userId = Logs_User_Operations_Html.Criteria.userId;
                var userOperationType = Logs_User_Operations_Html.Criteria.userOperationType;
                var result = Logs_User_Operations_Property.OperationList.load(beginTime, endTime, userId, userOperationType, null, 1, Logs_User_Operations_Property.PageSize);
                if (result) {
                    var items = this.getItems(result.UserOperationLog);
                    getTag("dList").appendChild(new GroupList("operationGroupList", items));
                    Logs_User_Operations_Property.CurrentCount.set(result.Page.RecordCount);
                    Logs_User_Operations_Property.TotalCount.set(result.Page.TotalRecordCount);
                    LazyLoadPage = result.Page;
                }
            },
            //加载列表
            load: function (index, size) {
                var beginTime = Logs_User_Operations_Html.Criteria.beginTime;
                var endTime = Logs_User_Operations_Html.Criteria.endTime;
                var userId = Logs_User_Operations_Html.Criteria.userId;
                var userOperationType = Logs_User_Operations_Html.Criteria.userOperationType;

                var result = Logs_User_Operations_Property.OperationList.load(beginTime, endTime, userId, userOperationType, null, index, size);
                var items = this.getItems(result.UserOperationLog);
                var gList = getTag("operationGroupList");
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        gList.appendChild(items[i]);
                    }
                }
                var old = Logs_User_Operations_Property.CurrentCount.get();
                Logs_User_Operations_Property.CurrentCount.set(old + result.Page.RecordCount);
                Logs_User_Operations_Property.TotalCount.set(result.Page.TotalRecordCount);
                LazyLoadPage = result.Page;
            },
            //清空列表
            clear: function () {
                var gList = getTag("operationGroupList");
                gList.innerText = "";
                gList.innerText = "";
                Logs_User_Operations_Property.CurrentCount.set(0);
                Logs_User_Operations_Property.TotalCount.set(0);
            },
        },
        AlertWindow: {

        }
    }
}