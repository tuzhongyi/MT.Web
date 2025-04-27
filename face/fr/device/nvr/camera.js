var Html = {
    Device: {
        List: {
            create: function (listId) {
                Property.Device.value = new Dictionary();
                Property.Device.list();
                var nvrs = Property.Device.value.toArray();
                for (var a = 0; a < nvrs.length; a++) {
                    var list = document.getElementById(listId);
                    var template = document.getElementById("hidden-template2").getElementsByClassName("card small")[0];
                    var box = document.createElement("div");
                    if (nvrs[a].FaceContrastSupported) {
                        box.className += "set"
                    }
                    box.className += " col-xlg-2 col-lg-3 col-md-4 col-sm-6 group-item";
                    box.id = nvrs[a].Id;
                    box.innerHTML = template.outerHTML;
                    box.style.overflow = "hidden";
                    //box.addEventListener("click", function () {
                    // devicesControl.selectedDeviceClick(this);
                    //});
                    var card = new SmallCard(box);
                    list.appendChild(box);
                    var uri = new Uri(nvrs[a].Uri);
                    card.Icon.setBackgroundClass("bg-info");
                    card.Icon.setIcon("howell-icon-camera-face-recognition");
                    card.Text.setText(nvrs[a].Name);
                    card.Text.setSubText(uri.Host);
                    //card.DeleteButton.setClick(function (e) {
                    // var id = e.currentTarget.elementId;
                    // $.confirm({
                    //     text: chinese.delete_prompt + chinese.device,
                    //     okButton: chinese.ok,
                    //     cancelButton: chinese.cancel,
                    //     okButtonClass: "btn btn-success p-r-20 p-l-20",
                    //     cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
                    //     top: -1,
                    //     confirm: function () {
                    //         devicesControl.delClick(id);
                    //     }
                    // });
                    // stopPropagation();
                    //});
                    card.SetButton.setClick(function (e) {
                        jumpHref.href = navigation.device.nvr.faceset.list + "?deviceId=" + e.currentTarget.elementId + "&type=camera";
                        loadContent('page', base64encode(setUrlRandomParams(navigation.device.nvr.faceset.list + "?deviceId=" + e.currentTarget.elementId)));
                        stopPropagation();
                    });
                    card.setEnabled(false);
                    box.card = card;
                }
            }
        }
    }
}

var Property = {
    Device: {
        value: new Dictionary(),
        list: function () {
            var result = tryCatch(function () {
                return Client.Management().Device.List(null, null, DeviceClassification.FDCamera, null);
            });
            if (result && result.Device) {
                for (var i = 0; i < result.Device.length; i++) {
                    this.value[result.Device[i].Id] = result.Device[i];
                    if (!this.value[result.Device[i].Id]["Selected"])
                        this.value[result.Device[i].Id]["Selected"] = false;
                }
            }
            return result;
        }
    }
}




































// var devicePage$ = {
//     index: 1,
//     pageSize: null
// }

// var templetDevice$ = {
//     listViewId: null
// }
// var pdcDevice = function () {
//     this.Devices = {
//         requestData: function (index, pageSize) {
//             var client = new PDCClient(RequestObj.host, RequestObj.port);
//             return client.Device.List('', index, pageSize);
//         },
//         getHtml: function (pdcDevices, listId) {
//             for (var a = 0; a < pdcDevices.length; a++) {
//                 devicesControl.allDevicesModel.push(pdcDevices[a]);
//                 var list = document.getElementById(listId);
//                 var template = document.getElementById("hidden-template2").getElementsByClassName("card small")[0];
//                 var box = document.createElement("div");
//                 box.className += "set del col-xlg-2 col-lg-3 col-md-4 col-sm-6 group-item";
//                 box.id = pdcDevices[a].Id;
//                 box.innerHTML = template.outerHTML;
//                 box.style.display = "inline-table";
//                 box.style.overflow = "hidden";
//                 box.addEventListener("click", function () {
//                     devicesControl.selectedDeviceClick(this);
//                 });
//                 var card = new SmallCard(box);
//                 list.appendChild(box);
//                 var uri = new Uri(pdcDevices[a].Uri);
//                 card.Icon.setBackgroundClass("bg-info");
//                 card.Icon.setIcon("howell-icon-camera-passenger-flow");
//                 card.Text.setText(pdcDevices[a].Name);
//                 card.Text.setSubText(uri.Host);
//                 card.DeleteButton.setClick(function (e) {
//                     var id = e.currentTarget.elementId;
//                     $.confirm({
//                         text: chinese.delete_prompt + chinese.device,
//                         okButton: chinese.ok,
//                         cancelButton: chinese.cancel,
//                         okButtonClass: "btn btn-success p-r-20 p-l-20",
//                         cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
//                         top: -1,
//                         confirm: function () {
//                             devicesControl.delClick(id);
//                         }
//                     });
//                     stopPropagation();
//                 });
//                 card.SetButton.setClick(function (e) {
//                     var id = e.currentTarget.elementId;
//                     devicesControl.editClick(id);
//                     stopPropagation();
//                 });
//                 box.card = card;
//             }
//         }
//     },
//         this.View = {
//             initView: function (page, templet) {
//                 var pdc = new pdcDevice();
//                 var data = pdc.Devices.requestData(page.index, page.pageSize);
//                 pdc.Devices.getHtml(data.PDCDevice, templet.listViewId);
//             },
//             initEditView: function () {
//                 var client = new PDCClient(RequestObj.host, RequestObj.port);
//                 var model = client.Device.Get(devicesControl.editDeviceId);
//                 $('#txtUsername').val(model.Username);
//                 $('#txtPassword').val(model.Password);
//                 $('#txtName').val(model.Name);
//                 $('#txtModel').val(model.Model);
//                 $('#txtUri').val(model.Uri);
//                 $('#txtProtocolType').val(model.ProtocolType);
//                 $('#txtDescription').val(model.Information);
//                 if (model.ProtocolType != '' && model.ProtocolType != 'Howell8000')
//                     $('#txtProtocolType').append('<option value="' + model.ProtocolType + '">' + model.ProtocolType + '</option>');
//                 $('#txtManufacturer').val(model.Manufacturer);
//                 $('#txtFirmware').val(model.Firmware);
//                 $('#txtSerialNumber').val(model.SerialNumber);
//                 $('#txtPointOfSale').val(model.PointOfSale);
//                 $('#txtTimeSynchronizing').val(model.TimeSynchronizing == true ? '1' : '0');
//                 $('#txtLastNSeconds').val(model.LastNSeconds);
//                 devicesControl.editDeviceModel = model;
//             }
//         },
//         this.Sample = {
//             requestData: function (deviceId, sampleUnit, beginTime, endTime, pageIndex, pageSize) {
//                 var client = new PDCClient(RequestObj.host, RequestObj.port);
//                 return client.Device.Samples.Get(deviceId, sampleUnit, beginTime, endTime, pageIndex, pageSize);
//             },
//             getHtml: function (data, timeType) {
//                 var tr = '', start = null, end = null;
//                 var no = 1;
//                 for (var a = 0; a < data.length; a++) {
//                     start = new Date(data[a].BeginTime);
//                     end = new Date(data[a].EndTime);
//                     start = timeType == 'Hour' ? start.format("yyyy-MM-dd HH") + ':00' : start.format("yyyy-MM-dd HH:mm:ss");
//                     end = timeType == 'Hour' ? end.format("yyyy-MM-dd HH") + ':00' : end.format("yyyy-MM-dd HH:mm:ss");
//                     tr += '<tr><td class="text-center box-text-color">' + no + '</td>';
//                     tr += '<td  class="box-text-color text-center">' + data[a].LeaveNumber + '</td>';
//                     tr += '<td  class="box-text-color text-center">' + data[a].EnterNumber + '</td>';
//                     tr += '<td  class="box-text-color text-center">' + data[a].DeviationNumber + '</td>';
//                     tr += '<td  class="box-text-color text-center">' + data[a].PassingNumber + '</td>';
//                     tr += '<td  class="box-text-color text-center">' + start + '</td>';
//                     tr += '<td  class="box-text-color text-center">' + end + '</td></tr>';
//                     no++;

//                 }
//                 $('#sampleView').html(tr);
//             }
//         }
// }

// var deviceSampleControl = {
//     searchClick: function (sender) {
//         var t = /^(\d{4})-(\d{2})-(\d{2})$/
//         var unit = $('#txtSampleUnit').val()
//             , start = $('#txtStartDate').val()
//             , end = $('#txtEndDate').val();
//         if (unit == '')
//             return false;
//         else if (start == '')
//             return false;
//         else if (end == '')
//             return false;
//         if (!t.test(start)) {
//             $('#txtStartDate').val('');
//             return false;
//         }
//         else if (!t.test(end)) {
//             $('#txtEndDate').val('');
//             return false;
//         }
//         var pdc = new pdcDevice();
//         start = new Date(start);
//         end = new Date(end + ' 23:59:59');
//         var data = pdc.Sample.requestData(devicesControl.editDeviceId, unit, start.toISOString(), end.toISOString(), null, null);
//         pdc.Sample.getHtml(data.PDCSample, unit);
//     }

// }

// var devicesControl = {
//     editDeviceId: '',
//     addDeviceControl: false,
//     editDeviceModel: null,
//     checkName: true,
//     checkUri: true,
//     checkProtocolType: true,
//     selectedDevices: new Dictionary(),
//     allDevicesModel: new Array(),
//     getItems: function () {
//         return document.getElementById(templetDevice$.listViewId).getElementsByClassName("group-item");
//     },
//     selectedDeviceClick: function (item) {
//         stopPropagation();
//         if (devicesControl.selectedDevices[item.id]) {
//             delete devicesControl.selectedDevices[item.id];
//         }
//         else {
//             devicesControl.selectedDevices[item.id] = item;
//         }
//         devicesControl.selectChanged();
//     },
//     selectChanged: function () {
//         var e = document.getElementById(templetDevice$.listViewId);
//         e.className = "card-group";
//         var delBtn = document.getElementById("btn_del");
//         var selectedDevices = devicesControl.selectedDevices.toArray();
//         if (selectedDevices.length > 0) {
//             e.className += " no-btns";
//             delBtn.style.display = "";
//         }
//         else {
//             delBtn.style.display = "none";
//         }
//     },
//     allSelect: function () {
//         var items = this.getItems();
//         for (var i = 0; i < items.length; i++) {
//             items[i].card.setSelected(true);
//             devicesControl.selectedDevices[items[i].id] = items[i];
//         }
//         devicesControl.selectChanged();
//     },
//     unSelect: function () {
//         var items = this.getItems();
//         for (var i = 0; i < items.length; i++) {
//             items[i].click();
//         }
//         devicesControl.selectChanged();
//     },
//     cancelSelect: function () {
//         var items = this.getItems();
//         for (var i = 0; i < items.length; i++) {
//             items[i].card.setSelected(false);
//             delete devicesControl.selectedDevices[items[i].id];
//         }
//         devicesControl.selectChanged();
//     },
//     delDevicesClick: function () {
//         $.confirm({
//             text: chinese.delete_prompt + chinese.device,
//             okButton: chinese.ok,
//             cancelButton: chinese.cancel,
//             okButtonClass: "btn btn-success p-r-20 p-l-20",
//             cancelButtonClass: "btn btn-danger p-r-20 p-l-20",
//             top: -1,
//             confirm: function () {
//                 tryCatch(function () {
//                     var items = devicesControl.selectedDevices.toArray()
//                     for (var a = 0; a < items.length; a++) {
//                         var client = new PDCClient(RequestObj.host, RequestObj.port);
//                         var r = client.Device.Delete(items[a].id);
//                         if (devicesControl.selectedDevices[items[a].id])
//                             delete devicesControl.selectedDevices[items[a].id];
//                         document.getElementById(templetDevice$.listViewId).removeChild(document.getElementById(items[a].id));
//                     }
//                     $.toast({
//                         heading: chinese.delete + chinese.success,
//                         position: 'bottom-right',
//                         loaderBg: '#ff6849',
//                         icon: 'success',
//                         hideAfter: 3500,
//                         stack: 6
//                     });
//                 });
//                 devicesControl.selectChanged();
//             }
//         });
//     },
//     delClick: function (deviceId) {
//         tryCatch(function () {
//             var client = new PDCClient(RequestObj.host, RequestObj.port);
//             var r = client.Device.Delete(deviceId);
//             if (devicesControl.selectedDevices[deviceId])
//                 delete devicesControl.selectedDevices[deviceId];
//             document.getElementById(templetDevice$.listViewId).removeChild(document.getElementById(deviceId));
//             $.toast({
//                 heading: chinese.delete + chinese.success,
//                 position: 'bottom-right',
//                 loaderBg: '#ff6849',
//                 icon: 'success',
//                 hideAfter: 3500,
//                 stack: 6
//             });
//         });
//     },
//     editClick: function (deivceId) {
//         stopPropagation();
//         devicesControl.editDeviceId = deivceId;
//         devicesControl.addDeviceControl == false;
//         $('#setDevicesView').removeClass('hide');
//         $('#nvrsListDiv').addClass('hide');
//         $('#navDeviceInfo').removeClass('hide');
//         $('#navDeviceList').addClass('hide');
//         var main = new pdcDevice();
//         main.View.initEditView();
//     },
//     saveClick: function () {
//         var userName = $('#txtUsername').val();
//         var pwd = $('#txtPassword').val();
//         var uri = $('#txtUri').val();
//         var protocolType = $('#txtProtocolType').val();
//         var name = $('#txtName').val();
//         var manufacturer = $('#txtManufacturer').val();
//         var firmware = $('#txtFirmware').val();
//         var serialNumber = $('#txtSerialNumber').val();
//         var pointOfSale = $('#txtPointOfSale').val();
//         var timeSynchronizing = $('#txtTimeSynchronizing').val() == "0" ? false : true;
//         var lastNSeconds = $('#txtLastNSeconds').val();
//         if (devicesControl.checkMustInputText == false) return false;

//         if (devicesControl.addDeviceControl == false) {
//             devicesControl.editDeviceModel.Username = userName;
//             devicesControl.editDeviceModel.Password = pwd;
//             devicesControl.editDeviceModel.Uri = uri;
//             devicesControl.editDeviceModel.ProtocolType = protocolType;
//             devicesControl.editDeviceModel.Name = name;
//             devicesControl.editDeviceModel.Model = $('#txtModel').val();
//             devicesControl.editDeviceModel.TimeSynchronizing = timeSynchronizing;
//             devicesControl.editDeviceModel.ResetTime = "00:00:00";
//             devicesControl.editDeviceModel.StructuredAbilities = 0;
//             devicesControl.editDeviceModel.LastNSeconds = lastNSeconds;
//             devicesControl.editDeviceModel.Manufacturer = manufacturer;
//             devicesControl.editDeviceModel.Firmware = firmware;
//             devicesControl.editDeviceModel.SerialNumber = serialNumber;
//             devicesControl.editDeviceModel.PointOfSale = pointOfSale;
//             devicesControl.editDeviceModel.Information = $('#txtDescription').val();

//             devicesControl.editDeviceModel.ManufacturerSpecified = manufacturer == '' ? false : true;
//             devicesControl.editDeviceModel.ModelSpecified = devicesControl.editDeviceModel.Model == '' ? false : true;
//             devicesControl.editDeviceModel.FirmwareSpecified = firmware == '' ? false : true;
//             devicesControl.editDeviceModel.SerialNumberSpecified = serialNumber == '' ? false : true;
//             devicesControl.editDeviceModel.PointOfSaleSpecified = pointOfSale == '' ? false : true;
//             devicesControl.editDeviceModel.InformationSpecified = devicesControl.editDeviceModel.Information == '' ? false : true;
//             devicesControl.editDeviceModel.UsernameSpecified = userName == '' ? false : true;
//             devicesControl.editDeviceModel.PasswordSpecified = pwd == '' ? false : true;
//             tryCatch(function () {
//                 var client = new PDCClient(RequestObj.host, RequestObj.port);
//                 client.Device.Set(devicesControl.editDeviceModel);
//                 devicesControl.editDeviceId = '';
//                 devicesControl.editDeviceModel = null;
//                 devicesControl.backPrevView();
//             });
//         }
//         else {
//             var model = new PDCDevice();
//             model.Username = userName;
//             model.Password = pwd;
//             model.Uri = uri;
//             model.ProtocolType = protocolType;
//             model.Name = name;
//             model.Model = $('#txtModel').val();
//             model.TimeSynchronizing = timeSynchronizing;
//             model.ResetTime = "00:00:00";
//             model.StructuredAbilities = 0;
//             model.LastNSeconds = lastNSeconds == '' ? 60 : parseInt(lastNSeconds);
//             model.Manufacturer = manufacturer;
//             model.Firmware = firmware;
//             model.SerialNumber = serialNumber;
//             model.PointOfSale = pointOfSale;
//             model.Information = $('#txtDescription').val();

//             model.ManufacturerSpecified = manufacturer == '' ? false : true;
//             model.ModelSpecified = model.Model == '' ? false : true;
//             model.FirmwareSpecified = firmware == '' ? false : true;
//             model.SerialNumberSpecified = serialNumber == '' ? false : true;
//             model.PointOfSaleSpecified = pointOfSale == '' ? false : true;
//             model.InformationSpecified = model.Information == '' ? false : true;
//             model.UsernameSpecified = userName == '' ? false : true;
//             model.PasswordSpecified = pwd == '' ? false : true;
//             tryCatch(function () {
//                 var client = new PDCClient(RequestObj.host, RequestObj.port);
//                 client.Device.Create(model);
//                 devicesControl.addDeviceControl = false;
//                 devicesControl.backPrevView();
//             });
//         }
//         var main = new pdcDevice();
//         document.getElementById("nvrsList").innerHTML = "";
//         templetDevice$.listViewId = 'nvrsList';
//         main.View.initView(devicePage$, templetDevice$);
//         $.toast({
//             heading: chinese.save + chinese.success,
//             position: 'bottom-right',
//             loaderBg: '#ff6849',
//             icon: 'success',
//             hideAfter: 3500,
//             stack: 6
//         });
//     },
//     addClick: function () {
//         devicesControl.addDeviceControl = true;
//         $('#setDevicesView').removeClass('hide');
//         $('#nvrsListDiv').addClass('hide');
//         $('#navDeviceInfo').removeClass('hide');
//         $('#navDeviceList').addClass('hide');

//         document.getElementById("txtName").value = "";
//         document.getElementById("txtUsername").value = "";
//         document.getElementById("txtPassword").value = "";
//         document.getElementById("txtModel").value = "";
//         document.getElementById("txtUri").value = "";
//         document.getElementById("txtManufacturer").value = "";
//         document.getElementById("txtFirmware").value = "";
//         document.getElementById("txtSerialNumber").value = "";
//         document.getElementById("txtPointOfSale").value = "";
//         document.getElementById("txtLastNSeconds").value = "60";
//         document.getElementById("txtDescription").value = "";
//         document.getElementById("txtProtocolType").value = "Howell8000";
//         document.getElementById("txtTimeSynchronizing").value = "1";

//         var main = new pdcDevice();
//         main.View.initEditView();
//     },
//     checkMustInputText: function () {
//         var uri = $('#txtUri').val();
//         var protocolType = $('#txtProtocolType').val();
//         var name = $('#txtName').val();
//         var check = true;
//         if (uri.trim() == '') {
//             $('#txtUri').parent().addClass('has-error');
//             if (devicesControl.checkUri == true) {
//                 $('#txtUri').parent().append('<span class="help-block">设备访问路径不能为空</span>');
//                 devicesControl.checkUri = false;
//             }
//             check = false;
//         } else {
//             $('#txtUri').parent().removeClass('has-error');
//             $('#txtUri').parent().find('span').remove();
//             devicesControl.checkUri = true;
//         }

//         if (protocolType.trim() == '') {
//             if (devicesControl.checkProtocolType == true) {
//                 $('#txtProtocolType').parent().append('<span class="help-block">协议类型不能为空</span>');
//                 devicesControl.checkProtocolType = false;
//             }
//             $('#txtProtocolType').parent().addClass('has-error');
//             check = false;
//         }
//         else {
//             $('#txtProtocolType').parent().removeClass('has-error');
//             $('#txtProtocolType').parent().find('span').remove();
//             devicesControl.checkProtocolType = true;
//         }

//         if (name.trim() == '') {
//             if (devicesControl.checkName == true) {
//                 $('#txtName').parent().append('<span class="help-block">设备名称不能为空</span>');
//                 devicesControl.checkName = false;
//             }
//             $('#txtName').parent().addClass('has-error');
//             check = false;
//         }
//         else {
//             $('#txtName').parent().removeClass('has-error');
//             $('#txtName').parent().find('span').remove();
//             devicesControl.checkName = true;
//         }
//         return check;
//     },
//     mouseMoveControlArea: function (sender) {
//         $(sender).children().eq(2).addClass('opacity-1');
//         $(sender).children().eq(2).removeClass('opacity-0');
//     },
//     mouseOutControlArea: function (sender) {
//         $(sender).children().eq(2).addClass('opacity-0');
//         $(sender).children().eq(2).removeClass('opacity-1');
//     },
//     backPrevView: function () {
//         devicesControl.editDeviceId = '';
//         $('#resetBtn').click();
//         $('#setDevicesView').addClass('hide');
//         $('#navDeviceInfo').addClass('hide');
//         $('#navDeviceList').removeClass('hide');
//         $('#nvrsListDiv').removeClass('hide');
//     }
// }