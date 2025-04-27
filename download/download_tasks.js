var TaskListControl = {
    errorNum: new Array(),
    value: new Dictionary(),
    Dic: {
        refreshId: null,
        waitForCreate: new Array(),
        alreadyCreate: new Array(),
        map: new Dictionary()
    },
    createTaskObj: function (deviceId, channel, stream, beginTime, endTime, fileFormat) {
        var task = new FileDownloadTask();
        task.PageId = Guid.NewGuid().ToString();
        task.DeviceId = deviceId;
        task.Channel = channel;
        task.Stream = stream;
        task.CreationTime = null;
        task.BeginTime = beginTime;
        task.EndTime = endTime;
        task.ExpiredTime = null;
        task.FileFormat = fileFormat;
        task.IsRemove = false;
        return task;
    },
    createTask: function (deviceId, channel, stream, beginTime, endTime, fileFormat, channelName, deviceUri) {
        var id = null;
        //tryCatch(function () {
        //    id = Client.Download().Tasks.Create(deviceId, channel, stream, beginTime, endTime, fileFormat);
        //    if (id) {
        //        TaskListControl.value[TaskListControl.Dic.refreshId].Id = id;
        //        TaskListControl.Dic.map[TaskListControl.Dic.refreshId] = id;
        //        TaskListControl.Dic.alreadyCreate.push(TaskListControl.Dic.refreshId);
        //        TaskListControl.Dic.waitForCreate.splice(0, 1);
        //    }
        //});
        //if (!id) {
        //    this.createReloadBtn(TaskListControl.Dic.refreshId, channelName, deviceUri);
        //    TaskListControl.Dic.waitForCreate.splice(0, 1);
        //    TaskListControl.Dic.refreshId = null;
        //}
        //return id;
        var index = TaskListControl.errorNum.indexOf(TaskListControl.Dic.refreshId);
        if (index > -1)
            TaskListControl.errorNum.splice(index, 1);
        try {
            id = Client.Download().Tasks.Create(deviceId, channel, stream, beginTime, endTime, fileFormat);
            if (id) {
                TaskListControl.value[TaskListControl.Dic.refreshId].Id = id;
                TaskListControl.Dic.map[TaskListControl.Dic.refreshId] = id;
                TaskListControl.Dic.alreadyCreate.push(TaskListControl.Dic.refreshId);
                TaskListControl.Dic.waitForCreate.splice(0, 1);
            }
        }
        catch (ex) {
            if (TaskListControl.errorNum.indexOf(TaskListControl.Dic.refreshId) < 0)
                TaskListControl.errorNum.push(TaskListControl.Dic.refreshId);
        }
        finally {
            if (!id) {
                this.createReloadBtn(TaskListControl.Dic.refreshId, channelName, deviceUri);
                TaskListControl.Dic.waitForCreate.splice(0, 1);
                TaskListControl.Dic.refreshId = null;
            }
            return id;
        }
        return id;
    },
    loadTask: function (id, state) {
        var fn = null;
        if (state)
            fn = function () { };
        return tryCatch(function () {
            return Client.Download().Tasks.Get(id);
        }, fn);
    },
    removeTask: function (id) {
        tryCatch(function () {
            Client.Download().Tasks.Delete(TaskListControl.Dic.map[id]);
        });
    },
    createItem: function (task, channelName, deviceUri) {
        var item = new GroupListItem("taskItem");
        item.id = task.PageId;
        var divName = document.createElement("div");
        divName.id = "name_" + task.PageId;
        divName.className = "text-ellipsis task-name";
        //var date = Convert.ToDate(task.CreationTime);
        //divName.innerText = ChannelListControl.channelName[task.PageId] + "_" + date.format("yyyy-MM-dd HH:mm:ss");
        divName.innerText = channelName;
        divName.title = divName.innerText + "\n" + deviceUri;

        item.Content.appendChild(divName);


        //item.Content.appendChild(divProcessingProgress);

        var divFileFormat = document.createElement("div");
        divFileFormat.innerText = task.FileFormat;
        divFileFormat.className = "div-fileformat";
        item.Content.appendChild(divFileFormat);

        var divBeginTime = document.createElement("div");
        var date = Convert.ToDate(task.BeginTime);
        divBeginTime.className = "div-datetime";
        divBeginTime.innerText = date.format("yyyy-MM-dd HH:mm:ss");
        item.Content.appendChild(divBeginTime);

        var divEndTime = document.createElement("div");
        date = Convert.ToDate(task.EndTime);
        divEndTime.className = "div-datetime";
        divEndTime.innerText = date.format("yyyy-MM-dd HH:mm:ss");
        item.Content.appendChild(divEndTime);

        //var divCreationTime = document.createElement("div");
        //date = Convert.ToDate(task.CreationTime);
        //divCreationTime.className = "div-datetime";
        //divCreationTime.innerText = date.format("yyyy-MM-dd HH:mm:ss");
        //item.Content.appendChild(divCreationTime);

        //var divOperation = document.createElement("div");
        //divOperation.className = "div-operation";
        //divOperation.id = "operation-" + task.Id;

        var divProcessingProgress = document.createElement("div");
        divProcessingProgress.style.marginBottom = "0px";
        divProcessingProgress.className = "progress div-operation";
        divProcessingProgress.id = "operation-" + task.PageId;
        var divProcessingProgressContent = document.createElement("div");
        divProcessingProgressContent.className = "progress-bar";
        divProcessingProgressContent.id = "progress-" + task.PageId;
        divProcessingProgressContent.setAttribute("role", "progressbar");
        divProcessingProgress.appendChild(divProcessingProgressContent);
        //divOperation.appendChild(divProcessingProgress);
        item.Content.appendChild(divProcessingProgress);

        var divRemove = document.createElement("div");
        //var icon_remove = document.createElement("a");
        //icon_remove.className = "icon-remove";
        //icon_remove.style.color = "#007aff";
        //icon_remove.style.margin = "3px";
        //divRemove.appendChild(icon_remove);
        divRemove.innerHTML = "<a class='icon-remove' title='删除' style='color:#007aff;margin:3px' onclick=\"TaskListControl.removeClick('" + task.PageId + "')\"></a>";
        item.Content.appendChild(divRemove);

        item.onclick = null;

        return item;
    },
    appendTaskToList: function (task, channelName, deviceUri) {
        //        var channelName= ChannelListControl.channelName[task.PageId];
        //        var deviceUri = ChannelListControl.deviceUri[task.DeviceId];
        var item = this.createItem(task, channelName, deviceUri);
        var list = getTag("task_list");
        list.appendChild(item);
        this.refreshProgress("progress-" + task.PageId, 0, "等待");
    },
    clearTaskInList: function (id) {
        var tag = getTag(id);
        if (tag)
            tag.parentElement.removeChild(tag);
    },
    createReloadBtn: function (refreshId, channelName, deviceUri) {
        var a = document.createElement("a");
        a.innerText = "重新打包";
        a.name = "taskReDownloan";
        a.className = "mouse_pointer";
        var taskId = refreshId;
        a.onclick = function () {
            TaskListControl.value[taskId].CreationTime = null;
            var index = TaskListControl.Dic.alreadyCreate.indexOf(taskId);
            if (index > -1)
                TaskListControl.Dic.alreadyCreate.splice(index, 1);
            TaskListControl.clearTaskInList(taskId);
            TaskListControl.appendTaskToList(TaskListControl.value[taskId], channelName, deviceUri);
            TaskListControl.Dic.waitForCreate.push(taskId);
        }
        var operation = getTag("operation-" + this.Dic.refreshId);
        operation.className = "div-operation";
        operation.style.textAlign = "center";
        operation.innerHTML = "";
        operation.appendChild(a);
    },
    reloadAll: function () {
        var tags = getTag("taskReDownloan", getTagType.Name);
        for (var i = 0; i < tags.length; i++) {
            tags[i].click();
        }
    },
    removeItem: function (id) {
        var tag = document.getElementById(id);
        tag.parentElement.removeChild(tag);
        try {
            if (reduceNumber)
                reduceNumber();
        }
        catch (ex) { }
    },
    remove: function (id) {
        TaskListControl.value[id].IsRemove = true;
        if (TaskListControl.value[id].CreationTime == null) {
            TaskListControl.removeItem(id);
            delete TaskListControl.value[id];
            var index = TaskListControl.Dic.waitForCreate.indexOf(id);
            if (index > -1)
                TaskListControl.Dic.waitForCreate.splice(index, 1);
            return;
        }
        if (TaskListControl.value[id].Status.ProcessingProgress == 100) {
            TaskListControl.removeItem(id);
            delete TaskListControl.value[id];
            var index = TaskListControl.Dic.alreadyCreate.indexOf(id);
            if (index > -1)
                TaskListControl.Dic.alreadyCreate.splice(index, 1);
            TaskListControl.removeTask(TaskListControl.Dic.map[id]);
        }
    },
    removeAll: function () {
        $.confirm({
            text: "是否清空任务列表？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                var tags = getTag("taskItem", getTagType.Name);
                for (var i = 0; i < tags.length; i++) {
                    TaskListControl.remove(tags[i].id);
                }
            }
        });
    },
    removeClick: function (id) {
        $.confirm({
            text: "是否删除任务？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                TaskListControl.remove(id);
            }
        });
    },
    downloadAll: function () {
        var tags = getTag("taskDownload", getTagType.Name);
        for (var i = 0; i < tags.length; i++) {
            var iframe = document.createElement("iframe");
            iframe.className = "iframe-download";
            div = getTag("iframe-list");
            div.appendChild(iframe);
            iframe.src = Client.Download().Tasks.Data(tags[i].id);
        }
    },
    refreshItem: function (channelName, deviceUri) {
        var task = this.loadTask(this.value[this.Dic.refreshId].Id, this.value[this.Dic.refreshId].IsRemove);
        if (!task) {
            if (this.value[this.Dic.refreshId].IsRemove) {
                this.removeItem(this.Dic.refreshId);
                delete this.value[this.Dic.refreshId];
                this.Dic.refreshId = null;
            }
            else {
                this.createReloadBtn(this.Dic.refreshId, channelName, deviceUri);
                this.Dic.refreshId = null;
            }
            return;
        }
        if (this.value[this.Dic.refreshId].IsRemove) {
            if (task.Status.State != DownloadTaskState.None) {
                this.removeItem(this.Dic.refreshId);
                delete this.value[this.Dic.refreshId];
                this.Dic.refreshId = null;
                return;
            }
        }
        var tag = getTag(this.Dic.refreshId);
        if (tag) {
            if (this.value[this.Dic.refreshId].CreationTime == null) {
                this.value[this.Dic.refreshId].CreationTime = task.CreationTime;
                var divName = getTag("name_" + this.Dic.refreshId);
                var date = Convert.ToDate(task.CreationTime);
                if (divName) {
                    divName.innerText += "_" + date.format("yyyy-MM-dd HH:mm:ss");
                    divName.title = divName.innerText + "\n" + deviceUri;
                }
            }
            var processing = parseInt(task.Status.ProcessingProgress);
            this.refreshProgress("progress-" + this.Dic.refreshId, processing, "正在打包");
            var isFinished = false;
            if (processing == 100) {
                isFinished = true;
                var a = document.createElement("a");
                a.href = Client.Download().Tasks.Data(task.Id);
                a.onclick = function () {
                    var iframe = getTag("iframe-download");
                    iframe.src = "";
                    iframe.src = Client.Download().Tasks.Data(task.Id);
                    return false;
                }
                this.value[TaskListControl.Dic.refreshId].Status.ProcessingProgress = 100;
                var iframe = getTag("iframe-download");
                iframe.src = "";
                iframe.src = Client.Download().Tasks.Data(task.Id);
                a.innerText = "下载";
                a.name = "taskDownload"
                a.id = task.Id;
                var operation = getTag("operation-" + this.Dic.refreshId);
                operation.className = "div-operation";
                operation.style.textAlign = "center";
                operation.innerHTML = "";
                operation.appendChild(a);
            }
            if (task.Status.State == DownloadTaskState.Error || task.Status.State == DownloadTaskState.Broken) {
                isFinished = true;
                var a = document.createElement("a");
                a.innerText = "重新打包";
                a.name = "taskReDownloan";
                a.className = "mouse_pointer";
                var taskId = TaskListControl.Dic.refreshId;
                a.onclick = function () {
                    TaskListControl.value[taskId].CreationTime = null;
                    var index = TaskListControl.Dic.alreadyCreate.indexOf(taskId);
                    if (index > -1)
                        TaskListControl.Dic.alreadyCreate.splice(index, 1);
                    TaskListControl.clearTaskInList(taskId);
                    TaskListControl.appendTaskToList(TaskListControl.value[taskId], channelName, deviceUri);
                    TaskListControl.Dic.waitForCreate.push(taskId);
                }
                var operation = getTag("operation-" + this.Dic.refreshId);
                operation.className = "div-operation";
                operation.style.textAlign = "center";
                operation.innerHTML = "";
                operation.appendChild(a);
            }
            if (isFinished) {
                var tagNum = getTag("task_number");
                if (tagNum)
                    tagNum.innerText = parseInt(tagNum.innerText) - 1;
                if (this.Dic.waitForCreate.length == 0) {
                    this.Dic.refreshId = null;
                    return;
                }
                this.Dic.refreshId = TaskListControl.Dic.waitForCreate[0];
                var newTask = this.value[this.Dic.refreshId];
                this.createTask(newTask.DeviceId, newTask.Channel, newTask.Stream, newTask.BeginTime, newTask.EndTime, newTask.FileFormat, channelName, deviceUri);
            }
        }
    },
    refreshProgress: function (id, value, text) {
        var $pb = $('#' + id);
        $pb.attr('data-transitiongoal', value).progressbar({ display_text: text });
    }
}