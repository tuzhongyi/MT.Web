//var index = 1;

var searchDevices = function () {
    this.Devices = {
        startSearch: function (guid, protocolType) {
            return tryCatch(function () {
                return Client.Management().Device.Searching.Start(guid, protocolType, searchDeviceControl.outTime);
            });
        },
        stopSearch: function (guid) {
            return tryCatch(function () {
                return Client.Management().Device.Searching.Stop(guid);
            });
        },
        set: function (id, physicalAddress, iPAddress, submask, gateway, port, password) {
            return Client.Management().Device.Searching.Set(id, physicalAddress, iPAddress, submask, gateway, port, password);
        },
        getData: function () {
            searchDeviceControl.ErrorCount++;
            var data = Client.Management().Device.Searching.Get(searchDeviceControl.guid);
            //測試代碼開始
            // var data = new Object();
            // data.CreationTime = "2018-03-20T07:47:16.803Z";
            // data.Name = "测试";
            // data.Id = "";
            // data.Model = "测试型";
            // data.Uri = "http://192.168.1.1";
            // data.ProtocolType = "Howell8000";
            // data.TimeSynchronizing = true;
            // data.ResetTime = "00:00:00";
            // data.StructuredAbilities = 0;
            // data.LastNSeconds = 60;
            // data.ExistedInDatabase = index % 2 == 1;
            // index++;
            //測試代碼結束
            data.Id = (data.Id == '' || data.Id == null) ? Guid.NewGuid().ToString() : data.Id;
            searchDeviceControl.allDevices[data.Id] = data;
            searchDeviceControl.ErrorCount = 0;
            return data;
        },
        create: function (device) {
            return tryCatch(function () {
                return Client.Management().Device.Create(device);
            });
        }
    }
}

var searchDeviceControl = {
    ErrorCount: 0,
    protocolType: 'Howell8000',
    guid: null,
    outTime: '3600',
    isSearching: false,
    selectedDevices: new Array(),
    allDevices: new Dictionary(),
    getIntervalTime: function () {
        return Math.pow(2, this.ErrorCount) * 400;
    },
    getDevice: function (deiviceId) {
        return searchDeviceControl.allDevices[deiviceId];
    },
    changeProtocolType: function (sender) {
        searchDeviceControl.protocolType = sender.innerText;
        document.getElementById("txtProtocolType").innerText = searchDeviceControl.protocolType;
    },
    searchClick: function (sender) {
        if (searchDeviceControl.isSearching) {
            this.stop(sender);
        }
        else {
            this.start(sender);
        }
    },
    start: function (sender) {
        searchDeviceControl.NetWork.Form.AnimationEaseOut();
        var obj = new searchDevices();
        $('#devicesView').html('');
        searchDeviceControl.allDevices = new Dictionary();
        searchDeviceControl.guid = Guid.NewGuid().ToString();
        obj.Devices.startSearch(searchDeviceControl.guid, searchDeviceControl.protocolType);
        toSetInterval(function () {
            if (searchDeviceControl.ErrorCount > 8) {
                searchDeviceControl.stop(document.getElementById("btnSearchPDCDevice"));
            }
            var data = obj.Devices.getData();
            if (data && (!document.getElementById("unCheckbox").checked || !data.ExistedInDatabase)) {
                if (data.Classification == DeviceClassification.FDCamera || data.Classification == DeviceClassification.FDNVR) {
                    searchDeviceControl.addItem(data);
                }
            }
        }, searchDeviceControl.getIntervalTime());
        sender.innerHTML = "<i class='fa fa-search'></i> " + chinese.stop;
        $(sender).removeClass("btn-info");
        $(sender).addClass("btn-danger");
        searchDeviceControl.isSearching = true;
    },
    stop: function (sender) {
        var obj = new searchDevices();
        sender.innerHTML = "<i class='fa fa-search'></i> " + chinese.search;
        $(sender).removeClass("btn-danger");
        $(sender).addClass("btn-info")
        toClearInterval();
        obj.Devices.stopSearch(searchDeviceControl.guid);
        searchDeviceControl.isSearching = false;
        searchDeviceControl.ErrorCount = 0;
        $.toast({
            text: chinese.search + chinese.over,
            position: {
                bottom: "10px",
                right: "70px"
            },
            loaderBg: '#05ce63',
            icon: 'success',
            hideAfter: 1000,
            stack: 6
        });
    },
    addItem: function (data) {
        var list = document.getElementById("devicesView");
        var template = document.getElementById("hidden-template2").getElementsByClassName("card small")[0];
        var box = document.createElement("div");
        box.className += "set col-xlg-2 col-lg-3 col-md-4 col-sm-6 group-item";
        box.id = data.Id;
        box.innerHTML = template.outerHTML;
        box.style.display = "inline-table";
        box.addEventListener("click", function () {
            if (!searchDeviceControl.allDevices[this.id].ExistedInDatabase) {
                var el = document.getElementById(this.id).card;
                var isSelected = el.getSelected();
                if (isSelected) {//取消
                    var index = searchDeviceControl.selectedDevices.indexOf(this.id);
                    if (index > -1)
                        searchDeviceControl.selectedDevices.splice(index, 1);
                }
                else {//加入
                    searchDeviceControl.selectedDevices.push(this.id);
                }
            }
            searchDeviceControl.checkAddBtn();
        });
        var card = new SmallCard(box);
        list.appendChild(box);
        var uri = new Uri(data.Uri);
        card.Icon.setBackgroundClass("bg-info");
        var iconClass;
        switch (data.Classification) {
            case DeviceClassification.FDCamera:
                iconClass = "howell-icon-camera-face-recognition";
                break;
            case DeviceClassification.FDNVR:
                iconClass = "howell-icon-servernetwork";
                break;
            default: iconClass = "mdi mdi-file-video";
        }
        card.Icon.setIcon(iconClass);
        card.Text.setText(data.Name);
        card.Text.setSubText(uri.Host);

        card.SetButton.setClick(function (e) {
            var network = data.NetworkInterface;
            searchDeviceControl.NetWork.device = data;
            if (network) {
                searchDeviceControl.NetWork.Form.AnimationEaseIn();
                searchDeviceControl.NetWork.Set(network.PhyscialAddress,
                    network.IPAddress.IPv4Address.Address,
                    network.IPAddress.IPv4Address.Subnetmask,
                    network.IPAddress.IPv4Address.DefaultGateway);
                searchDeviceControl.NetWork.Form.Set(network.PhyscialAddress,
                    network.IPAddress.IPv4Address.Address,
                    network.IPAddress.IPv4Address.Subnetmask,
                    network.IPAddress.IPv4Address.DefaultGateway);
            }
            else {
                searchDeviceControl.NetWork.Form.Set('', '', '', '');
                searchDeviceControl.NetWork.ClearValue();
            }
            stopPropagation();
        });

        card.addStatus("ExistedInDatabase", chinese.yet + chinese.save + chinese.to + chinese.database, chinese.yet + chinese.save, "label label-success");
        card.setStatus("ExistedInDatabase", data.ExistedInDatabase);
        card.setEnabled(!data.ExistedInDatabase);
        // card.SetButton.setClick(function (e) {
        //     //设置
        //     stopPropagation();
        // });
        box.card = card;
    },
    getItems: function () {
        return document.getElementById("devicesView").getElementsByClassName("group-item");
    },
    allSelect: function () {
        var items = this.getItems();
        searchDeviceControl.selectedDevices = new Array();
        for (var i = 0; i < items.length; i++) {
            if (document.getElementById(items[i].id).card.getEnabled()) {
                document.getElementById(items[i].id).card.setSelected(true);
                searchDeviceControl.selectedDevices.push(items[i].id);
            }
        }
        searchDeviceControl.checkAddBtn();
    },
    unSelect: function () {
        var items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            items[i].click();
        }
        searchDeviceControl.checkAddBtn();
    },
    cancelSelect: function () {
        var items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            items[i].card.setSelected(false);
        }
        searchDeviceControl.selectedDevices = new Array();
        searchDeviceControl.checkAddBtn();
    },
    showSaveUserModel: function () {
        document.getElementById("txtNameS").value = "";
        document.getElementById("txtPwdS").value = "";
        $('#userModel').modal('show');
    },
    chanceClick: function () {
        $('#userModel').modal('hide');
    },
    toBSClick: function () {
        var userName = $('#txtNameS').val(), pwd = $('#txtPwdS').val();
        var addNum = 0;
        var obj = new searchDevices();
        for (var i = 0; i < searchDeviceControl.selectedDevices.length; i++) {
            var id = searchDeviceControl.selectedDevices[i];
            var device = searchDeviceControl.allDevices[id];
            if (!device.Name || document.getElementById("ipCheckbox").checked) { //以ip地址为名称
                var uri = new Uri(device.Uri);
                device.Name = uri.Host;
            }
            device.Username = userName;
            device.Password = pwd;
            device.UsernameSpecified = true;
            device.PasswordSpecified = true;
            obj.Devices.create(device);
            var tag = document.getElementById(id);
            tag.card.setSelected(false);
            tag.card.setEnabled(false);
            tag.card.setStatus("ExistedInDatabase", true);
            searchDeviceControl.allDevices[id].ExistedInDatabase == true;
            addNum++;
        }
        searchDeviceControl.selectedDevices = new Array();
        if (addNum == 0)
            return;
        $('#userModel').modal('hide');
        $.toast({
            text: addNum + "个设备添加至数据库",
            position: {
                bottom: "10px",
                right: "70px"
            },
            loaderBg: '#05ce63',
            icon: 'success',
            hideAfter: 1000,
            stack: 6
        });
        addNum = 0;
        searchDeviceControl.checkAddBtn();
    },
    checkAddBtn: function () {
        var btn = document.getElementById("btn_plus");
        btn.style.display = searchDeviceControl.selectedDevices.length > 0 ? "inline-block" : "none";
    },
    showDevicesTabsClick: function (sender) {
        $('#devicesView').html('');
        searchDeviceControl.selectedDevices = new Array();
        var devices = searchDeviceControl.allDevices.toArray();
        for (var i = 0; i < devices.length; i++) {
            if (sender.checked && devices[i].ExistedInDatabase)
                continue;
            if (devices[i].Classification == DeviceClassification.FDCamera || devices[i].Classification == DeviceClassification.FDNVR) {
                searchDeviceControl.addItem(devices[i]);
            }
        }
    },
    NetWork: {
        device: null,
        value: null,
        Model: function () {
            this.PhyscialAddress = ''
            this.IPAddress = ''
            this.Submask = ''
            this.Gateway = ''
            this.Port = ''
            this.Password = ''
        },
        Get: function () {
            debugger;
            var uri = new Uri(searchDeviceControl.NetWork.device.Uri);
            var model = searchDeviceControl.NetWork.Value,
                updateModel = new searchDeviceControl.NetWork.Model();
            var address = $('#addressText').val(),
                submask = $('#subnetmaskText').val(),
                gateway = $('#defaultGatewayText').val(),
                password = $('#passwordText').val(),
                port = uri.Port;
            updateModel.IPAddress = address;
            updateModel.Submask = submask;
            updateModel.Gateway = gateway;
            updateModel.PhyscialAddress = model.PhyscialAddress;
            updateModel.Port = port;
            updateModel.Password = password;
            return updateModel;
        },
        Set: function (PhyscialAddress, IPAddress, Submask, Gateway) {
            var model = new searchDeviceControl.NetWork.Model();
            model.PhyscialAddress = PhyscialAddress;
            model.IPAddress = IPAddress;
            model.Submask = Submask;
            model.Gateway = Gateway;
            searchDeviceControl.NetWork.Value = model;
        },
        Update: function () {
            var model = searchDeviceControl.NetWork.Get();
            var obj = new searchDevices();
            if (model) {
                debugger;
                var guid = Guid.NewGuid().ToString();
                obj.Devices.startSearch(guid, searchDeviceControl.protocolType);
                setTimeout(function () {
                    obj.Devices.set(guid, model.PhyscialAddress, model.IPAddress, model.Submask, model.Gateway, model.Port, model.Password);
                }, 500);
                setTimeout(function () {
                    obj.Devices.stopSearch(guid);
                    $.toast({
                        text: chinese.modify + chinese.success,
                        position: {
                            bottom: "10px",
                            right: "70px"
                        },
                        loaderBg: '#05ce63',
                        icon: 'success',
                        hideAfter: 1000,
                        stack: 6
                    });
                }, 1000);
            }
        },
        ClearValue: function () {
            searchDeviceControl.NetWork.Value = null;
        },
        Form: {
            Set: function (PhyscialAddress, IPAddress, Submask, Gateway) {
                $('#addressText').val(IPAddress);
                $('#subnetmaskText').val(Submask);
                $('#defaultGatewayText').val(Gateway);
                $('#physcialAddressText').val(PhyscialAddress);
            },
            AnimationEaseIn: function () {
                var internet = $('#internetIPv4'), searchContent = $('#searchContentDiv'), set = $('.set');
                if (internet.hasClass('hide') || internet.is(':hidden')) {
                    internet.removeClass('hide');
                }
                searchContent.animate({
                    maxWidth: '75%'
                }, null);
                searchDeviceControl.NetWork.Form.UpdateCardClass(set, true);
                if (!internet.hasClass('hide')) {
                    // internet.css('opacity', 0);
                    // setTimeout(function () {
                    //     internet.css('opacity', 1);
                    // }, 500);
                }
            },
            AnimationEaseOut: function (clear) {
                var internet = $('#internetIPv4'), searchContent = $('#searchContentDiv'), set = $('.set');
                searchContent.animate({
                    maxWidth: '100%'
                }, null);
                searchDeviceControl.NetWork.Form.UpdateCardClass(set, false);
                internet.addClass('hide');
            },
            UpdateCardClass: function (set, inOrOut) {
                var class_ = {
                    in: 'col-xlg-2 col-lg-3 col-md-6 col-sm-5',
                    out: 'col-xlg-3 col-lg-4 col-md-5 col-sm-5'
                }
                if (inOrOut) {
                    set.removeClass(class_.in);
                    set.addClass(class_.out);
                }
                else {
                    set.addClass(class_.in);
                    set.removeClass(class_.out);
                }
            }
        }
    }
}
