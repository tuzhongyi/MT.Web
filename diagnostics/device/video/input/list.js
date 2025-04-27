var Info = {
    ControlId: function (id) {
        this.Id = id;
        for (var key in Info.ControlIdPrefix) {
            this[key] = Info.ControlIdPrefix[key] + id;
        }
        this.getId = function (id, key) {
            return id.substr(prefix.length);
        }
    },
    ControlIdPrefix:
    {
        //图
        chart: "chart_",
        //平均码率
        bitrate: "bitrate_",
        //总包数
        totalPacket: "totalPacket_",
        //丢包数
        lostPacket: "lostPacket_",
        //错误包数
        errorPacket: "errorPacket_",
        //实收包数
        receivedPacket: "receivedPacket_",
    }
};


var Property = {
    dataCount: 12,
    value: new Dictionary(),
    page: new Page(),
    load: function (index, size) {
        function getChannel(deviceId, channelId) {
            return Try(function () {
                return Client.Management().Device.Video.Input.Get(deviceId, channelId);
            }, null);
        };
        //获取列表
        var response = null;
        try {
            response = Client.Management().Device.Video.Input.Diagnostics.List(index, size);
        }
        catch (e) {
            $.confirm({
                text: e.name,
                alert: true,
                okButton: "确定"
            });
            return null;
        }
        if (response) {
            for (var i = 0; i < response.BitrateStatus.length; i++) {

                var channelId = response.BitrateStatus[i].Id;
                var id = new Id(channelId);
                var deviceId = id.getDeviceId();                            //获取设备ID

                var status = new BitrateStatus();                           //new一个数据对象
                for (var property in response.BitrateStatus[i]) {
                    status[property] = response.BitrateStatus[i][property];
                }                                                           //把从服务取到的数据转换成本地格式
                status.DeviceId = deviceId;                                 //添加设备ID

                if (this.value[channelId]) {                                  //如果当前通道在本地内存已存在，那么把之前的图表数据取出
                    status.BitrateArray = this.value[channelId].BitrateArray;
                    status.Name = this.value[channelId].Name;
                }
                else {
                    status.BitrateArray = new Array();                          //设置图表数据

                    while (status.BitrateArray.length < this.dataCount) {
                        status.BitrateArray.push(0);
                    }

                    var channel = getChannel(deviceId, channelId);         //从数据库获取通道
                    if (channel)
                        status.Name = channel.Name;                                 //通道名称
                }

                if (status.BitrateArray.length >= this.dataCount)            //如果图表数据长度大于已设长度，那么删除数组中的第一个数据
                    status.BitrateArray.shift();

                status.BitrateArray.push(status.Bitrate);                   //添加当前数据
                this.value[channelId] = status;                             //把数据保存到本地


            }
            this.page = response.Page;
        }
        return this.value.toArray();
    },
};

var Html = {
    Threshold: {
        lostPacket: 5,
        errorPacket: 5,
        receivedPacket: 90
    },
    IntervalTime: 2000,
    ControlId: new Dictionary(),
    create: function (controlId, index, size) {
        var createControl = {
            tr: function () {
                var tr = document.createElement("tr");
                tr.id = list[i].Id;
                tr.className = "compare-channel-table-tr";
                return tr;
            },
            td: {
                name: function (deviceId, channelId, channelName, tr) {
                    var td = document.createElement("td");
                    td.appendChild($("<a title='" + name + "' href='status.htm?deviceId=" + deviceId + "&channelId=" + channelId + "'>" + channelName + "</a>")[0]);
                    td.className = "compare-channel-table-name-td";
                    tr.appendChild(td);
                },
                chart: function (id, value) {
                    var td = document.createElement("td");
                    td.appendChild($("<div class='sparkslim' id='" + id + "'>0,0,0,0,0,0,0,0,0,0,0,0," + 0 + "</div>")[0]);
                    td.className = "compare-channel-table-chart-td";
                    tr.appendChild(td);
                },
                bitrate: function (id, value) {
                    var td = document.createElement("td");
                    td.innerText = 0;
                    td.id = id;
                    td.className = "compare-channel-table-bitrate-td";
                    tr.appendChild(td);
                },
                packet: function (id, value) {
                    var td = document.createElement("td");
                    td.appendChild($("<div id='" + id + "'>" + 0 + " %</div>")[0]);
                    td.className = "compare-channel-table-bitrate-td";
                    tr.appendChild(td);
                },
                total: function (id, value) {
                    var td = document.createElement("td");
                    td.innerText = 0;
                    td.id = id;
                    td.className = "compare-channel-table-total-td";
                    tr.appendChild(td);
                }
            },
        };

        var list = Property.load(index, size);
        if (list) {
            var table = document.getElementById(controlId);
            for (var i = 0; i < list.length; i++) {
                var id = list[i].Id

                for (var key in Info.ControlIdPrefix) {
                    this.ControlId[Info.ControlIdPrefix[key] + id] = id;
                }
                this.ControlId[id] = new Info.ControlId(id);

                var tr = createControl.tr();

                createControl.td.name(list[i].DeviceId, id, list[i].Name, tr);  //名称
                createControl.td.chart(this.ControlId[id].chart, list[i].Bitrate);               //图表
                createControl.td.bitrate(this.ControlId[id].bitrate, list[i].Bitrate);           //平均码率
                createControl.td.packet(this.ControlId[id].errorPacket, list[i].ErrorPacketRatio());        //错包率
                createControl.td.packet(this.ControlId[id].lostPacket, list[i].LostPacketRatio());         //丢包率
                createControl.td.packet(this.ControlId[id].receivedPacket, list[i].ReceivedPacketRatio());     //收包率
                createControl.td.total(this.ControlId[id].totalPacket, list[i].TotalPacket);         //总包数

                //填充Tr到table
                table.appendChild(tr);
            }
        }
        LazyLoadPage = Property.page;
        return list;
    },
    start: function () {
        var parent = this;

        var status = {
            in: "success",
            out: "danger",

        }

        var timer = setInterval(function () {
            //加载数据
            var result = Property.load(1, 20);
            if (!result) {
                clearInterval(timer);
                return;
            }
            for (var i = 0; i < result.length; i++) {

                var id = result[i].Id;

                var css = status.out;

                var lost = getTag(parent.ControlId[id].lostPacket);
                lost.innerText = Property.value[id].LostPacketRatio() + " %";
                lost.className = Property.value[id].LostPacketRatio() > parent.Threshold.lostPacket ? status.out : status.in;

                var error = getTag(parent.ControlId[id].errorPacket);
                error.innerText = Property.value[id].ErrorPacketRatio() + " %";
                error.className = Property.value[id].ErrorPacketRatio() > parent.Threshold.errorPacket ? status.out : status.in;

                var received = getTag(parent.ControlId[id].receivedPacket);
                received.innerText = Property.value[id].ReceivedPacketRatio() + " %";
                received.className = Property.value[id].ReceivedPacketRatio() <= parent.Threshold.receivedPacket ? status.out : status.in;

                var bitrate = getTag(parent.ControlId[id].bitrate);
                bitrate.innerText = Property.value[id].Bitrate;
                sparklineInitialization("#" + parent.ControlId[id].chart, Property.value[id].BitrateArray);

                var total = getTag(parent.ControlId[id].totalPacket);
                total.innerText = (Property.value[id].TotalPacket / 1024.0).toFixed(3);
            }
        }, this.IntervalTime);
    }
};