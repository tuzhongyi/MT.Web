
var devicePage$ = {
    index: 1,
    pageSize: null
}
var groupPage$ = {
    index: 1,
    pageSize: null
}

var templetGroups$ = {
    listViewId: null
}

var templetGroupDevices$ = {
    listViewId: null
}

var pdcGroups = function () {
    this.Groups = {
        requestData: function (index, pageSize) {
            var client = new PDCClient(RequestObj.host, RequestObj.port);

            return client.Group.List('', index, pageSize);
        },
        getHtml: function (pdcGroups, listViewId) {
            for (var a = 0; a < pdcGroups.length; a++) {
                groupsControl.allGroupsModel.push(pdcGroups[a]);
                var list = document.getElementById(listViewId);
                var template = document.getElementById("hidden-template2").getElementsByClassName("card small")[0];
                var box = document.createElement("div");
                box.className += "set del col-xlg-2 col-lg-3 col-md-4 col-sm-6 group-item";
                box.id = pdcGroups[a].Id;
                box.innerHTML = template.outerHTML;
                // box.style.display = "inline-table";
                box.style.overflow = "hidden";
                box.addEventListener("click", function () {
                    groupsControl.selectedGroupsClick(this);
                });
                var card = new SmallCard(box);
                list.appendChild(box);
                // var uri = new Uri(pdcGroups[a].Uri);
                card.Icon.setBackgroundClass("bg-info");
                card.Icon.setIcon("howell-icon-camera-group-passenger-flow");
                card.Text.setText(pdcGroups[a].Name);
                // card.Text.setSubText(uri.Host);
                card.DeleteButton.setClick(function (e) {
                    var id = e.currentTarget.elementId;
                    $.confirm({
                        text: chinese.delete_prompt + chinese.device + chinese.group,
                        okButton: chinese.ok,
                        cancelButton: chinese.cancel,
                        okButtonClass: "btn btn-success p-r-20 p-l-20",
                        cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
                        top: -1,
                        confirm: function () {
                            groupsControl.delGroup(id);
                        }
                    });
                    stopPropagation();
                });
                card.SetButton.setClick(function (e) {
                    var id = e.currentTarget.elementId;
                    groupsControl.editGroup(id);
                    stopPropagation();
                });
                box.card = card;
            }
        },
        requestGroupData: function (groupId) {
            var client = new PDCClient(RequestObj.host, RequestObj.port);
            return client.Group.Get(groupId);
        }
    }
    this.Devices = {
        requestData: function (groupId, inversed) {
            var client = new PDCClient(RequestObj.host, RequestObj.port);
            return client.Group.Device.List(groupId, '1', null, inversed);
        },
        getHtml: function (pdcDevices, listViewId) {
            for (var a = 0; a < pdcDevices.length; a++) {
                var list = document.getElementById(listViewId);
                var template = document.getElementById("hidden-template2").getElementsByClassName("card small")[0];
                var box = document.createElement("div");
                box.className += "del col-xlg-2 col-lg-3 col-md-4 col-sm-6 group-item";
                box.id = pdcDevices[a].Id;
                box.innerHTML = template.outerHTML;
                // box.style.display = "inline-table";
                box.style.overflow = "hidden";
                box.addEventListener("click", function () {
                    groupDevicesContrl.bindClick(this);
                });
                var card = new SmallCard(box);
                list.appendChild(box);
                var uri = new Uri(pdcDevices[a].Uri);
                card.Icon.setBackgroundClass("bg-info");
                card.Icon.setIcon("howell-icon-camera-passenger-flow");
                card.Text.setText(pdcDevices[a].Name);
                card.Text.setSubText(uri.Host);
                card.DeleteButton.setClick(function (e) {
                    var id = e.currentTarget.elementId;
                    $.confirm({
                        text: chinese.delete_prompt + chinese.device,
                        okButton: chinese.ok,
                        cancelButton: chinese.cancel,
                        okButtonClass: "btn btn-success p-r-20 p-l-20",
                        cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
                        top: -1,
                        confirm: function () {
                            groupDevicesContrl.delGroupDevice(id);
                        }
                    });
                    stopPropagation();
                });
                box.card = card;
            }
        },
        getInversedHtml: function (pdcDevices, listViewId) {
            for (var a = 0; a < pdcDevices.length; a++) {
                var list = document.getElementById(listViewId);
                var template = document.getElementById("hidden-template2").getElementsByClassName("card small")[0];
                var box = document.createElement("div");
                box.className += "col-xlg-2 col-lg-3 col-md-4 col-sm-6 group-item";
                box.id = pdcDevices[a].Id;
                box.innerHTML = template.outerHTML;
                // box.style.display = "inline-table";
                box.style.overflow = "hidden";
                box.addEventListener("click", function () {
                    groupDevicesContrl.unBindClick(this);
                });
                var card = new SmallCard(box);
                list.appendChild(box);
                var uri = new Uri(pdcDevices[a].Uri);
                card.Icon.setBackgroundClass("bg-info");
                card.Icon.setIcon("howell-icon-camera-passenger-flow");
                card.Text.setText(pdcDevices[a].Name);
                card.Text.setSubText(uri.Host);
                box.card = card;
            }
            $('.shade').show();
            return false;
        }
    },
        this.groupView = {
            initView: function (page, templet) {
                var pdc = new pdcGroups();
                var data = pdc.Groups.requestData(page.index, page.pageSize);
                pdc.Groups.getHtml(data.PDCDeviceGroup, templet.listViewId);
            },
            initEditView: function () {
                var pdc = new pdcGroups();
                groupsControl.editGroupModel = pdc.Groups.requestGroupData(groupsControl.editGroupId);

                $('#txtNameEd').val(groupsControl.editGroupModel.Name);
                $('#txtInformationEd').val(groupsControl.editGroupModel.Information);
                $('#txtLastNSecondsEd').val(groupsControl.editGroupModel.LastNSeconds);
            }

        }
        , this.devicesView = {
            initSomeView: function (templet) {
                $('#pdcGroupDevicesView').html("");
                var pdc = new pdcGroups();
                var data = pdc.Devices.requestData(groupsControl.editGroupId, false);
                pdc.Devices.getHtml(data.PDCDevice, templet.listViewId);
                var data2 = pdc.Devices.requestData(groupsControl.editGroupId, true);
            },
            initNotingView: function (templet) {
                var pdc = new pdcGroups();
                var data = pdc.Devices.requestData(groupsControl.editGroupId, true);
                pdc.Devices.getInversedHtml(data.PDCDevice, templet.listViewId);
            },
            releaseNotingView: function (view) {
                $(view).html('');
                groupDevicesContrl.selectNothingDevices = new Dictionary();
                $('#groupDevices_ModelWindow').addClass('hide');
                $('.shade').hide();
            }
        },
        this.Sample = {
            requestData: function (groupId, sampleUnit, beginTime, endTime) {
                var client = new PDCClient(RequestObj.host, RequestObj.port);
                return client.Group.Samples.Get(groupId, sampleUnit, beginTime, endTime);
            },
            getHtml: function (data, timeType) {
                var tr = '', start = null, end = null;
                var no = 1;
                for (var a = 0; a < data.length; a++) {
                    start = new Date(data[a].BeginTime);
                    end = new Date(data[a].EndTime);
                    start = timeType == 'Hour' ? start.format("yyyy-MM-dd HH") + ':00' : start.format("yyyy-MM-dd HH:mm:ss");
                    end = timeType == 'Hour' ? end.format("yyyy-MM-dd HH") + ':00' : end.format("yyyy-MM-dd HH:mm:ss");
                    tr += '<tr><td class="text-center box-text-color">' + no + '</td>';
                    tr += '<td  class="box-text-color text-center">' + data[a].LeaveNumber + '</td>';
                    tr += '<td  class="box-text-color text-center">' + data[a].EnterNumber + '</td>';
                    tr += '<td  class="box-text-color text-center">' + data[a].DeviationNumber + '</td>';
                    tr += '<td  class="box-text-color text-center">' + data[a].PassingNumber + '</td>';
                    tr += '<td  class="box-text-color text-center">' + start + '</td>';
                    tr += '<td  class="box-text-color text-center">' + end + '</td></tr>';
                    no++;

                }
                $('#sampleView').html(tr);
            }
        }
}
var groupsControl = {
    editGroupId: '',
    isAddGroupEvent: false,
    allGroupsModel: new Array(),
    selectedGroups: new Dictionary(),
    editGroupModel: null,
    getItems: function () {
        return document.getElementById(templetGroups$.listViewId).getElementsByClassName("group-item");
    },
    selectedGroupsClick: function (item) {
        stopPropagation();
        if (groupsControl.selectedGroups[item.id]) {
            delete groupsControl.selectedGroups[item.id];
        }
        else {
            groupsControl.selectedGroups[item.id] = item;
        }
        groupsControl.selectChanged();
    },
    selectChanged: function () {
        var e = document.getElementById(templetGroups$.listViewId);
        e.className = "card-group";
        var delBtn = document.getElementById("btn_del");
        var selectedGroups = groupsControl.selectedGroups.toArray();
        if (selectedGroups.length > 0) {
            e.className += " no-btns";
            delBtn.style.display = "";
        }
        else {
            delBtn.style.display = "none";
        }
    },
    allSelectGroup: function () {
        var items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            items[i].card.setSelected(true);
            groupsControl.selectedGroups[items[i].id] = items[i];
        }
        groupsControl.selectChanged();
    },
    unSelectGroup: function () {
        var items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            items[i].click();
        }
        groupsControl.selectChanged();
    },
    cancelSelectGroup: function () {
        var items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            items[i].card.setSelected(false);
            delete groupsControl.selectedGroups[items[i].id];
        }
        groupsControl.selectChanged();
    },
    delAllGroupClick: function () {
        $.confirm({
            text: chinese.delete_prompt + chinese.device + chinese.group,
            okButton: chinese.ok,
            cancelButton: chinese.cancel,
            okButtonClass: "btn btn-success p-r-20 p-l-20",
            cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
            confirm: function () {
                tryCatch(function () {
                    var items = groupsControl.selectedGroups.toArray()
                    var client = new PDCClient(RequestObj.host, RequestObj.port);
                    for (var a = 0; a < items.length; a++) {
                        var r = client.Group.Delete(items[a].id);
                        if (groupsControl.selectedGroups[items[a].id])
                            delete groupsControl.selectedGroups[items[a].id];
                        document.getElementById(templetGroups$.listViewId).removeChild(document.getElementById(items[a].id));
                    }
                    $.toast({
                        heading: chinese.delete + chinese.success,
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                });
                groupsControl.selectChanged();
            }
        });
    },
    groupTabsClick: function (title, sender) {
        if (title == '基本信息') {
            console.log($(sender).next());
            $('#editGroupView').removeClass('hide');
            $('#pdcGroupsDevicesViewDiv').addClass('hide');
            $('#groupFinishBtn').addClass('hide');
            $('#groupDevices_ModelWindow').addClass('hide');

        } else if (title == '设备信息') {
            $('#editGroupView').addClass('hide');
            $('#pdcGroupsDevicesViewDiv').removeClass('hide');
            $('#groupFinishBtn').addClass('hide');
        }
    },
    editGroup: function (groupId) {
        stopPropagation();
        $('#tabGroupInfo').addClass('active');
        $('#tabGroupDevice').removeClass('active');
        $('#navDeviceGroupList').addClass('hide');
        $('#navDeviceGroupInfo').removeClass('hide');
        var main = new pdcGroups();
        if (groupId != '') {
            groupsControl.editGroupId = groupId;
            templetGroupDevices$.listViewId = 'pdcGroupDevicesView';
            main.devicesView.initSomeView(templetGroupDevices$);
            main.groupView.initEditView();
            groupsControl.isAddGroupEvent = false;
            $('#tabGroupDevice').removeClass('hide');
            $('#tabGroupDeviceDisabled').addClass('hide');
        }
        else {
            groupsControl.editGroupId = '';
            groupsControl.editGroupModel = null;
            $('#resetGroupForm').click();
            groupsControl.isAddGroupEvent = true;
            $('#pdcGroupDevicesView').html('');
            $('#tabGroupDevice').addClass('hide');
            $('#tabGroupDeviceDisabled').removeClass('hide');
        }
        $("#pdcGroupsListDiv").addClass('hide');
        $('#setGroupsMainView').removeClass('hide');
        $('#editGroupView').removeClass('hide');
        $('#setGroupsMainView').show();
        $('#devicesMainView').addClass('hide');
        // $('#addGroupView').addClass('hide');
        $('#pdcGroupsDevicesViewDiv').addClass('hide');
    },
    editGroupClick: function () {
        var name = $('#txtNameEd').val();
        var information = $('#txtInformationEd').val();
        var lastNSeconds = $('#txtLastNSecondsEd').val();
        lastNSeconds = lastNSeconds == '' ? '60' : lastNSeconds;
        if (groupDevicesContrl.checkSaveGroupData($('#txtNameEd')) == false) return false;
        var client = new PDCClient(RequestObj.host, RequestObj.port);
        if (groupsControl.editGroupId != '') {
            var pdc = new pdcGroups();
            groupsControl.editGroupModel = pdc.Groups.requestGroupData(groupsControl.editGroupId);
            groupsControl.editGroupModel.Name = name;
            groupsControl.editGroupModel.Information = information;
            groupsControl.editGroupModel.LastNSeconds = lastNSeconds;
            groupsControl.editGroupModel.InformationSpecified = groupsControl.editGroupModel.Information.trim() == '' ? false : true;
            tryCatch(function () {
                var r = client.Group.Set(groupsControl.editGroupModel);
                //groupsControl.backGroupMainView();
            })
        }
        else {
            var model = new PDCDeviceGroup();
            model.Name = name;
            model.Information = information;
            model.ResetTime = '00:00:00';
            model.LastNSeconds = lastNSeconds;
            model.InformationSpecified = information == '' ? false : true;

            tryCatch(function () {
                var r = client.Group.Create(model);
                groupsControl.editGroupId = r;
                var main = new pdcGroups();
                templetGroupDevices$.listViewId = 'pdcGroupDevicesView';
                main.devicesView.initSomeView(templetGroupDevices$);
                $('#tabGroupDeviceDisabled').addClass('hide');
                $('#tabGroupDevice').removeClass('hide');
            });
        }
        $.toast({
            heading: chinese.save + chinese.success,
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'success',
            hideAfter: 3500,
            stack: 6
        });
    },
    delGroup: function (groupId) {
        tryCatch(function () {
            var client = new PDCClient(RequestObj.host, RequestObj.port);
            var r = client.Group.Delete(groupId);
            if (groupsControl.selectedGroups[groupId])
                delete groupsControl.selectedGroups[groupId];
            document.getElementById(templetGroups$.listViewId).removeChild(document.getElementById(groupId));
            $.toast({
                heading: chinese.delete + chinese.success,
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
        });
    },
    addGroupDevicesClick: function (sender) {
        closeModelWindowCallback = function () {
            groupDevicesContrl.selectNothingDevices = new Dictionary();
            groupsControl.devicesToGroup();
        }
        $('#groupDevices_ModelWindow').removeClass('hide');
        if (groupsControl.editGroupId == '') return false;
        var main = new pdcGroups();
        templetGroupDevices$.listViewId = 'groupDevicesView2';
        main.devicesView.initNotingView(templetGroupDevices$);
    },
    devicesToGroup: function () {
        tryCatch(function () {
            var main = new pdcGroups();
            if (groupsControl.editGroupId != '') {
                var client = new PDCClient(RequestObj.host, RequestObj.port);
                var devices = groupDevicesContrl.selectNothingDevices.toArray();
                if (devices.length > 0) {
                    for (var i = 0; i < devices.length; i++) {
                        client.Group.Device.Create(groupsControl.editGroupId, devices[i].id);
                    }
                    $.toast({
                        heading: chinese.save + chinese.success,
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                }
                templetGroupDevices$.listViewId = 'pdcGroupDevicesView';
                main.devicesView.releaseNotingView($('#groupDevicesView2'));
                document.getElementById("btn_unbind_plus").style.display = "none";
                main.devicesView.initSomeView(templetGroupDevices$);
            }
            main.devicesView.releaseNotingView($('#groupDevicesView2'));
        });
    },
    backGroupMainView: function () {
        $('#setGroupsMainView').addClass('hide');
        // $('#addGroupView').addClass('hide');
        $('#editGroupView').addClass('hide');
        $('#devicesMainView').removeClass('hide');
        $('#pdcGroupDevicesView').html("");
        $('#pdcGroupsList').html("");
        groupsControl.selectedGroups = new Dictionary();
        var main = new pdcGroups();
        templetGroups$.listViewId = 'pdcGroupsList';

        main.groupView.initView(groupPage$, templetGroups$);
        groupsControl.groupTabsClick('基本信息', $('#tabGroupInfo'));
        $('#groupDevicesView2').html('');
        $('#pdcGroupsListDiv').removeClass('hide');
    },
    mouseMoveControlArea: function (sender) {
        $(sender).children().eq(2).addClass('opacity-1');
        $(sender).children().eq(2).removeClass('opacity-0');
    },
    mouseOutControlArea: function (sender) {
        $(sender).children().eq(2).addClass('opacity-0');
        $(sender).children().eq(2).removeClass('opacity-1');
    }
}

var groupSampleControl = {
    searchClick: function (sender) {
        var t = /^(\d{4})-(\d{2})-(\d{2})$/
        var unit = $('#txtSampleUnit').val()
            , start = $('#txtStartDate').val()
            , end = $('#txtEndDate').val();
        if (unit == '')
            return false;
        else if (start == '')
            return false;
        else if (end == '')
            return false;
        if (!t.test(start)) {
            $('#txtStartDate').val('');
            return false;
        }
        else if (!t.test(end)) {
            $('#txtEndDate').val('');
            return false;
        }
        var pdc = new pdcGroups();
        start = new Date(start);
        end = new Date(end + ' 23:59:59');

        var data = pdc.Sample.requestData(groupsControl.editGroupId, unit, start.toISOString(), end.toISOString());
        pdc.Sample.getHtml(data.PDCSample, unit);
        console.log(data)
    }

}
var groupDevicesContrl = {
    selectNothingDevices: new Dictionary(),
    selectBindDevices: new Dictionary(),
    modelWindow: false,
    checkSaveGroupName: true,
    addDevicesToGroups: function () {
        $('#pdcGroupDevicesView').html("");
        groupsControl.devicesToGroup();
    },
    closeAddDevicesWindow: function () {
        groupDevicesContrl.selectNothingDevices = new Dictionary();
        $('#pdcGroupDevicesView').html("");
        groupsControl.devicesToGroup();
    },
    getUnBindItems: function () {
        return document.getElementById("groupDevicesView2").getElementsByClassName("group-item");
    },
    allUnBindSelect: function () {
        var items = this.getUnBindItems();
        for (var i = 0; i < items.length; i++) {
            items[i].card.setSelected(true);
            groupDevicesContrl.selectNothingDevices[items[i].id] = items[i];
        }
        groupDevicesContrl.selectUnBindChanged();
    },
    unUnBindSelect: function () {
        var items = this.getUnBindItems();
        for (var i = 0; i < items.length; i++) {
            items[i].click();
        }
        groupDevicesContrl.selectUnBindChanged();
    },
    cancelUnBindSelect: function () {
        var items = this.getUnBindItems();
        for (var i = 0; i < items.length; i++) {
            items[i].card.setSelected(false);
            delete groupDevicesContrl.selectNothingDevices[items[i].id];
        }
        groupDevicesContrl.selectUnBindChanged();
    },
    getBindItems: function () {
        return document.getElementById(templetGroupDevices$.listViewId).getElementsByClassName("group-item");
    },
    unBindClick: function (item) {
        stopPropagation();
        if (groupDevicesContrl.selectNothingDevices[item.id]) {
            delete groupDevicesContrl.selectNothingDevices[item.id];
        }
        else {
            groupDevicesContrl.selectNothingDevices[item.id] = item;
        }
        groupDevicesContrl.selectUnBindChanged();
    },
    bindClick: function (item) {
        stopPropagation();
        if (groupDevicesContrl.selectBindDevices[item.id]) {
            delete groupDevicesContrl.selectBindDevices[item.id];
        }
        else {
            groupDevicesContrl.selectBindDevices[item.id] = item;
        }
        groupDevicesContrl.selectBindChanged();
    },
    allBindSelect: function () {
        var items = this.getBindItems();
        for (var i = 0; i < items.length; i++) {
            items[i].card.setSelected(true);
            groupDevicesContrl.selectBindDevices[items[i].id] = items[i];
        }
        groupDevicesContrl.selectBindChanged();
    },
    unBindSelect: function () {
        var items = this.getBindItems();
        for (var i = 0; i < items.length; i++) {
            items[i].click();
        }
        groupDevicesContrl.selectBindChanged();
    },
    cancelBindSelect: function () {
        var items = this.getBindItems();
        for (var i = 0; i < items.length; i++) {
            items[i].card.setSelected(false);
            delete groupDevicesContrl.selectBindDevices[items[i].id];
        }
        groupDevicesContrl.selectBindChanged();
    },
    selectBindChanged: function () {
        var e = document.getElementById(templetGroupDevices$.listViewId);
        e.className = "card-group";
        var delBtn = document.getElementById("btn_bind_del");
        var selectedDevices = groupDevicesContrl.selectBindDevices.toArray();
        if (selectedDevices.length > 0) {
            e.className += " no-btns";
            delBtn.style.display = "";
        }
        else {
            delBtn.style.display = "none";
        }
    },
    selectUnBindChanged: function () {
        var e = document.getElementById(templetGroupDevices$.listViewId);
        e.className = "card-group";
        var addBtn = document.getElementById("btn_unbind_plus");
        var selectedDevices = groupDevicesContrl.selectNothingDevices.toArray();
        if (selectedDevices.length > 0) {
            e.className += " no-btns";
            addBtn.style.display = "";
        }
        else {
            addBtn.style.display = "none";
        }
    },
    delGroupDevice: function (deviceId) {
        var main = new pdcGroups();
        main.devicesView.releaseNotingView($('#groupDevicesView2'));
        tryCatch(function () {
            var client = new PDCClient(RequestObj.host, RequestObj.port);
            var r = client.Group.Device.Delete(groupsControl.editGroupId, deviceId);
            if (groupDevicesContrl.selectBindDevices[deviceId])
                delete groupDevicesContrl.selectBindDevices[deviceId];
            document.getElementById(templetGroupDevices$.listViewId).removeChild(document.getElementById(deviceId));
            $.toast({
                heading: chinese.delete + chinese.success,
                position: 'bottom-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 3500,
                stack: 6
            });
        });
        groupDevicesContrl.selectBindChanged();
    },
    delSelectedGroupDevice: function () {
        $.confirm({
            text: chinese.delete_prompt + chinese.device,
            okButton: chinese.ok,
            cancelButton: chinese.cancel,
            okButtonClass: "btn btn-success p-r-20 p-l-20",
            cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
            confirm: function () {
                tryCatch(function () {
                    var main = new pdcGroups();
                    main.devicesView.releaseNotingView($('#groupDevicesView2'));
                    var items = groupDevicesContrl.selectBindDevices.toArray()
                    var client = new PDCClient(RequestObj.host, RequestObj.port);
                    for (var a = 0; a < items.length; a++) {
                        var r = client.Group.Device.Delete(groupsControl.editGroupId, items[a].id);
                        if (groupDevicesContrl.selectBindDevices[items[a].id])
                            delete groupDevicesContrl.selectBindDevices[items[a].id];
                        document.getElementById(templetGroupDevices$.listViewId).removeChild(document.getElementById(items[a].id));
                    }
                    $.toast({
                        heading: chinese.delete + chinese.success,
                        position: 'bottom-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                    groupDevicesContrl.selectBindChanged();
                });
            }
        });
    },
    addGroupClick: function () {
        // $('#devicesMainView').addClass('hide');
        // $('#setGroupsMainView').addClass('hide');
        // $('#addGroupView').removeClass('hide'); 
        groupsControl.editGroup('');
    },
    checkSaveGroupData: function (sender) {
        var name = $(sender).val();
        if (name.trim() == '') {
            $(sender).parent().addClass('has-error');
            if (groupDevicesContrl.checkSaveGroupName == true) {
                $(sender).parent().append('<span class="help-block">设备访问路径不能为空</span>');
                groupDevicesContrl.checkSaveGroupName = false;
            }
            return false;
        } else {
            $(sender).parent().removeClass('has-error');
            $(sender).parent().find('span').remove();
            groupDevicesContrl.checkSaveGroupName = true;
            return true;
        }
    },
    saveGroupClick: function () {
        var name = $('#txtName').val();
        var information = $('#txtInformation').val();
        var lastNSeconds = $('#txtLastNSeconds').val();
        lastNSeconds = lastNSeconds == '' ? '60' : lastNSeconds;
        if (groupDevicesContrl.checkSaveGroupData($('#txtName')) == false) return false;
        var client = new PDCClient(RequestObj.host, RequestObj.port);
        var model = new PDCDeviceGroup();
        model.Name = name;
        model.Information = information;
        model.ResetTime = '00:00:00';
        model.LastNSeconds = lastNSeconds;
        model.InformationSpecified = information == '' ? false : true;

        tryCatch(function () {
            var r = client.Group.Create(model);
        });
        $.confirm({
            text: "保存成功!",
            alert: true,
            okButton: "确定"
        });
    },
    downOnmouseover: function (sender) {
        $(sender).children().attr('src', '../img/down1.png');
    },
    downOnmouseout: function (sender) {
        $(sender).children().attr('src', '../img/down2.png');
    }
}