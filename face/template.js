
function convertAngle(angle) {
    angle = angle % 360;
    if (angle < 0)
        return;
    angle = angle + 270;
    angle = angle % 360;
    return angle * 2 / 360 * Math.PI;
}
function createArc(canvas, startAngle, endAngle, isAnticlockwise, lineWidth, color, radius) {
    var x = parseInt(canvas.parentElement.style.width) / 2;
    var y = parseInt(canvas.parentElement.style.height) / 2;
    var r = x - lineWidth / 2;
    if (radius)
        r = radius;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, r, convertAngle(startAngle), convertAngle(endAngle), isAnticlockwise);
    ctx.stroke();
}
var canvas = document.getElementById("template-pdc-arc").getElementsByClassName("canvas-circle")[0];
canvas.width = parseInt(canvas.parentElement.style.width);
canvas.height = parseInt(canvas.parentElement.style.height);
createArc(canvas, 140, 90, true, 10, Constant.PDC.Color.Default);
createArc(canvas, 85, 55, true, 10, Constant.PDC.Color.Default);
createArc(canvas, 50, 30, true, 10, Constant.PDC.Color.Default);
createArc(canvas, 220, 270, false, 10, Constant.PDC.Color.Default);
createArc(canvas, 275, 305, false, 10, Constant.PDC.Color.Default);
createArc(canvas, 310, 330, false, 10, Constant.PDC.Color.Default);
createArc(canvas, 140, 220, true, 40, Constant.PDC.Color.Default, 100);

var Template = {
    FeedsItem: {
        create: function (id, name, icon, color) {
            var div = document.createElement("div");
            div.innerHTML = document.getElementById("template-feeds-list-item").innerHTML;
            div.getElementsByClassName("name")[0].innerHTML = name;
            div.getElementsByClassName("icon")[0].className += " " + icon;
            div.getElementsByClassName("icon-container")[0].className += " " + color;
            div.children[0].id = id;
            return div;
        }
    },
    AddItem: {
        create: function (bgColorCss) {
            var div = document.createElement("div");
            div.innerHTML = document.getElementById("template-pdc-add").innerHTML;
            return div;
        }
    },
    SetItem: {
        create: function (setName, imgClass, bgColorCss) {
            var div = document.createElement("div");
            div.innerHTML = document.getElementById("template-set").innerHTML;
            div.getElementsByClassName("name")[0].innerHTML = setName;
            div.getElementsByClassName("img")[0].className += " " + imgClass;
            if (bgColorCss) {
                var children = $(div.children[0].children[0]);
                children.removeClass("pdc-set-bgcolor");
                children.addClass(bgColorCss);
            }
            return div;
        }
    },
    DeviceCountItem: {
        create: function (devices, hasRemoveBtn) {
            var div = document.createElement("div");
            div.innerHTML = document.getElementById("template-count").innerHTML;
            var inlineCount = 0;
            var totalCount = 0;
            if (devices) {
                if (devices.Page)
                    totalCount = devices.Page.TotalRecordCount;
                for (var i = 0; i < devices.PDCDevice.length; i++) {
                    if (devices.PDCDevice[i].DeviceStatus && devices.PDCDevice[i].DeviceStatus.IsOnline)
                        inlineCount++;
                }
            }
            div.getElementsByClassName("data")[0].innerHTML = inlineCount + " <i class='howell-icon-forward-slash'></i> " + totalCount;
            div.getElementsByClassName("data-type-icon")[0].className += " howell-icon-camera-passenger-flow";
            div.getElementsByClassName("round")[0].className += " pdc-enter-leave-bgcolor";
            if (!hasRemoveBtn) {
                var removeBtn = div.getElementsByClassName("ti-close")[0];
                removeBtn.parentElement.removeChild(removeBtn);
            }
            return div;
        }
    },
    DateTimeItem: {
        dayCycleArray: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        create: function (date, hasRemoveBtn) {
            var div = document.createElement("div");
            div.innerHTML = document.getElementById("template-date-time-1").innerHTML;
            var dayCycle = this.dayCycleArray[date.getDay()];
            div.getElementsByClassName("week")[0].innerText = dayCycle;
            div.getElementsByClassName("date")[0].innerText = date.format("yyyy年MM月dd日");
            div.getElementsByClassName("hour")[0].innerText = date.format("HH");
            div.getElementsByClassName("minute")[0].innerText = date.format("mm");
            if (!hasRemoveBtn) {
                var removeBtn = div.getElementsByClassName("ti-close")[0];
                removeBtn.parentElement.removeChild(removeBtn);
            }
            return div;
        }
    },
    SingleDataItem: {
        attr: {
            DeviationNumber: {
                title: "滞留人数",
                icon: "howell-icon-passenger-stay-num",
                bgColor: "pdc-deviation-bgcolor"
            },
            LeaveNumber: {
                title: "离开人数",
                icon: "howell-icon-passenger-leave-num",
                bgColor: "pdc-leave-bgcolor"
            },
            EnterNumber: {
                title: "进入人数",
                icon: "howell-icon-passenger-enter-num",
                bgColor: "pdc-enter-bgcolor"
            },
            PassingNumber: {
                title: "经过人数",
                icon: "howell-icon-passenger-enter-num",
                bgColor: "pdc-deviation-bgcolor"
            },
            LastNLeaveNumber: {
                title: "实时离开人数",
                icon: "howell-icon-passenger-leave-num-time-record",
                bgColor: "pdc-leave-bgcolor"
            },
            LastNEnterNumber: {
                title: "实时进入人数",
                icon: "howell-icon-passenger-enter-num-time-record",
                bgColor: "pdc-enter-bgcolor"
            }
        },
        create: function (type, itemType, item, hasRemoveBtn) {
            var div = document.createElement("div");
            div.innerHTML = document.getElementById("template-single-data-2").innerHTML;

            //div.getElementsByClassName("data-type")[0].innerText = this.attr[type].title;

            div.getElementsByClassName("round")[0].className += " " + this.attr[type].bgColor;
            div.getElementsByClassName("round")[0].title = this.attr[type].title;
            div.getElementsByClassName("name")[0].innerText = item.Name;
            div.getElementsByClassName("data-type-icon")[0].className += " " + this.attr[type].icon;
            if (item[itemType] && (item[itemType][type] || item[itemType][type] == 0))
                div.getElementsByClassName("data")[0].innerText = item[itemType][type];
            if (!hasRemoveBtn) {
                var removeBtn = div.getElementsByClassName("ti-close")[0];
                removeBtn.parentElement.removeChild(removeBtn);
            }
            return div;
        }
    },
    DoubleDataItem: {
        attr: {
            icon: {
                GroupStatus: "howell-icon-camera-group-passenger-flow",
                DeviceStatus: "howell-icon-camera-passenger-flow"
            },
            LastNEnterLeaveNumber: {
                enterText: "进入人数",
                leaveText: "离开人数",
                unit: "<i class='howell-icon-forward-slash'></i>分钟"
            },
            EnterLeaveNumber: {
                enterText: "进入人数",
                leaveText: "离开人数",
                unit: ""
            }
        },
        create: function (type, itemType, item, hasRemoveBtn) {
            var div = document.createElement("div");
            div.innerHTML = document.getElementById("template-double-data-1").innerHTML;
            div.getElementsByClassName("title-icon")[0].className += " " + this.attr.icon[itemType];
            div.getElementsByClassName("name")[0].innerHTML = item.Name;
            div.getElementsByClassName("data-text-1")[0].innerHTML = this.attr[type].enterText;
            div.getElementsByClassName("data-text-2")[0].innerHTML = this.attr[type].leaveText;
            var typeEnter;
            var typeLeave;
            if (type == "LastNEnterLeaveNumber") {
                typeEnter = "LastNEnterNumber";
                typeLeave = "LastNLeaveNumber";
            }
            if (type == "EnterLeaveNumber") {
                typeEnter = "EnterNumber";
                typeLeave = "LeaveNumber";
            }
            if (item[itemType] && (item[itemType][typeEnter] || item[itemType][typeEnter] == 0))
                div.getElementsByClassName("data-1")[0].innerHTML = item[itemType][typeEnter] + " " + this.attr[type].unit;
            if (item[itemType] && (item[itemType][typeLeave] || item[itemType][typeLeave] == 0))
                div.getElementsByClassName("data-2")[0].innerHTML = item[itemType][typeLeave] + " " + this.attr[type].unit;
            if (!hasRemoveBtn) {
                var removeBtn = div.getElementsByClassName("ti-close")[0];
                removeBtn.parentElement.removeChild(removeBtn);
            }
            return div;
        }
    },
    Chart: {
        create: function (beginTime, endTime, samples, unit, item, tpyeText, chart) {
            var arrayObj = this.getData(beginTime, unit, samples);
            var hasChart = true;
            if (!chart) {
                hasChart = false;
                var chart = document.createElement("div");
                chart.innerHTML = document.getElementById("template-line-chart").innerHTML;
                chart.getElementsByClassName("name")[0].innerText = item.Name;
                chart.getElementsByClassName("type")[0].innerText = tpyeText;
            }
            var bodyObj = {
                firstSeries: {
                    name: '',
                    type: 'line',
                    smooth: true,
                    data: arrayObj.leaveData,
                    areaStyle: { //区域填充样式
                        normal: {
                            //线性渐变
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#ffbc34' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ffbc34' // 100% 处的颜色
                            }], false),
                            opacity: 0.1
                        }
                    }
                },
                otherSeries: {
                    name: '',
                    type: 'line',
                    smooth: true,
                    data: arrayObj.enterData,
                    areaStyle: { //区域填充样式
                        normal: {
                            //线性渐变
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#289afb' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#289afb' // 100% 处的颜色
                            }], false),
                            opacity: 0.1
                        }
                    }
                },
                colors: ['#ffbc34', '#289afb', '#675bba'],
                legendData: [],
                xAxisObj1: {
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: ''
                        }
                    },
                    data: arrayObj.scale,
                    axisLabel: {
                        textStyle: {
                            color: '#DCE2EC',
                            //fontSize:'16'
                        },//ed
                        //formatter: function (value, index) {
                        //    // 格式化成月/日，只在第一个刻度显示年份
                        //    return 1;
                        //}
                    }
                },
                // xAxisObj2: {
                //     type: 'category',
                //     axisTick: {
                //         alignWithLabel: true
                //     },
                //     axisLine: {
                //         onZero: false,
                //         lineStyle: {
                //             color: ''
                //         }
                //     },
                //     data: []
                // },
                xAxisObjArr: []
            };

            var option = {
                axisPointer: {
                    label: {
                        backgroundColor: '#5793f3'
                    }//ed
                },
                title: {
                    // text: item.Name,
                    // subtext: tpyeText,
                    textStyle: {
                        color: '#DCE2EC'
                    },
                    left: '80px'
                },
                //backgroundColor: 'white',//背景色
                color: bodyObj.colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: bodyObj.legendData,
                    textStyle: {
                        color: '#DCE2EC'
                    },
                    // left: 90
                },
                grid: {
                    top: 70,
                    bottom: 25,
                    right: 15,
                    left: arrayObj.maxLength * 10 + 10
                },
                xAxis: bodyObj.xAxisObjArr,
                yAxis: [
                    {
                        type: 'value'
                        , axisLabel: {
                            textStyle: {
                                color: '#DCE2EC',
                                //fontSize:'16'
                            }

                        },
                        axisLine: {
                            lineStyle: {
                                color: '#DCE2EC'
                                //                            width:8,//这里是为了突出显示加上的，可以去掉
                            }
                        }, splitLine: {
                            show: false,
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#b1e3fe'],
                                width: '1',
                                type: 'dashed'
                            }

                        }
                    }
                ],
                series: [
                    bodyObj.firstSeries,
                    bodyObj.otherSeries
                ]
            };
            var myChart = echarts.init(hasChart ? chart : chart.children[0].children[0].children[0].children[0]);
            bodyObj.firstSeries.name = '离开人数';
            bodyObj.otherSeries.name = '进入人数';
            bodyObj.legendData = ['离开人数', '进入人数'];
            bodyObj.xAxisObjArr.push(bodyObj.xAxisObj1);
            // bodyObj.xAxisObjArr.push(bodyObj.xAxisObj2);
            myChart.setOption(option);
            return myChart;
        },
        getData: function (beginTime, unit, samples) {
            var maxLength = 1;
            var maxData = 0;
            var scale = getTimeSpan(beginTime, unit);
            if (unit == "Hour") {
                scale = timeOfCompletion(scale);
            }
            var dataObj = new Object();
            for (var i = 0; i < scale.length; i++) {
                dataObj[scale[i]] = new Object();
                dataObj[scale[i]].LeaveNumber = 0;
                dataObj[scale[i]].EnterNumber = 0;
            }
            var leaveData = new Array();
            var enterData = new Array();
            for (var i = 0; i < samples.length; i++) {
                var samplesDate = Convert.ToDate(samples[i].BeginTime);
                if (unit == "Hour") {
                    samplesDate.setMinutes(0);
                }
                if (scale.indexOf(samplesDate.format("HH:mm")) < 0)
                    scale.push(samplesDate.format("HH:mm"));
                dataObj[samplesDate.format("HH:mm")] = new Object();
                dataObj[samplesDate.format("HH:mm")].LeaveNumber = samples[i].LeaveNumber;
                dataObj[samplesDate.format("HH:mm")].EnterNumber = samples[i].EnterNumber;
                var maxSamplesData = samples[i].LeaveNumber > samples[i].EnterNumber ? samples[i].LeaveNumber : samples[i].EnterNumber;
                maxData = maxData > maxSamplesData ? maxData : maxSamplesData;
            }
            scale.sort(function (a, b) {
                var arrayA = a.split(":");
                arrayA[0] = parseInt(arrayA[0]);
                arrayA[1] = parseInt(arrayA[1])
                var arrayB = b.split(":");
                arrayB[0] = parseInt(arrayB[0]);
                arrayB[1] = parseInt(arrayB[1])
                if (arrayA[0] > arrayB[0])
                    return 1;
                else if (arrayA[0] < arrayB[0])
                    return -1;
                else if (arrayA[0] == arrayB[0]) {
                    return arrayA[1] > arrayB[1] ? 1 : -1;
                }
            });
            for (var i = 0; i < scale.length; i++) {
                leaveData.push(dataObj[scale[i]].LeaveNumber);
                enterData.push(dataObj[scale[i]].EnterNumber);
            }
            var obj = new Object();
            obj.leaveData = leaveData;
            obj.enterData = enterData;
            obj.scale = scale;
            obj.maxLength = maxData.toString().length;
            if (obj.maxLength == 1) {
                obj.maxLength++;
            }
            return obj;
        },
        getItem: function (hasRemoveBtn) {
            var chart = document.createElement("div");
            chart.innerHTML = document.getElementById("template-line-chart").innerHTML;
            if (!hasRemoveBtn) {
                var removeBtn = chart.getElementsByClassName("ti-close")[0];
                removeBtn.parentElement.removeChild(removeBtn);
            }
            return chart;
        }
    },
    Histogram: {
        create: function (beginTime, endTime, samples, unit, item, tpyeText, chart) {
            var arrayObj = this.getData(beginTime, unit, samples);
            var hasChart = true;
            if (!chart) {
                hasChart = false;
                var chart = document.createElement("div");
                chart.innerHTML = document.getElementById("template-histogram-chart").innerHTML;
                chart.getElementsByClassName("name")[0].innerText = item.Name;
                chart.getElementsByClassName("type")[0].innerText = tpyeText;
            }
            var bodyObj = {
                firstSeries: {
                    name: '',
                    type: 'bar',
                    smooth: true,
                    data: arrayObj.leaveData,
                    areaStyle: { //区域填充样式
                        normal: {
                            //线性渐变
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#ffbc34' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ffbc34' // 100% 处的颜色
                            }], false),
                            opacity: 0.1
                        }
                    }
                },
                otherSeries: {
                    name: '',
                    type: 'bar',
                    smooth: true,
                    data: arrayObj.enterData,
                    areaStyle: { //区域填充样式
                        normal: {
                            //线性渐变
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#289afb' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#289afb' // 100% 处的颜色
                            }], false),
                            opacity: 0.1
                        }
                    }
                },
                colors: ['#ffbc34', '#289afb', '#675bba'],
                legendData: [],
                xAxisObj1: {
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: ''
                        }
                    },
                    data: arrayObj.scale,
                    axisLabel: {
                        textStyle: {
                            color: '#DCE2EC',
                            //fontSize:'16'
                        },//ed
                        //formatter: function (value, index) {
                        //    // 格式化成月/日，只在第一个刻度显示年份
                        //    return 1;
                        //}
                    }
                },
                // xAxisObj2: {
                //     type: 'category',
                //     axisTick: {
                //         alignWithLabel: true
                //     },
                //     axisLine: {
                //         onZero: false,
                //         lineStyle: {
                //             color: ''
                //         }
                //     },
                //     data: []
                // },
                xAxisObjArr: []
            };

            var option = {
                axisPointer: {
                    label: {
                        backgroundColor: '#5793f3'
                    }//ed
                },
                title: {
                    // text: item.Name,
                    // subtext: tpyeText,
                    textStyle: {
                        color: '#DCE2EC'
                    },
                    left: '80px'
                },
                //backgroundColor: '#30323E',//背景色
                color: bodyObj.colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: bodyObj.legendData,
                    textStyle: {
                        color: '#DCE2EC'
                    },
                    // left: 90
                },
                grid: {
                    top: 70,
                    bottom: 25,
                    right: 15,
                    left: arrayObj.maxLength * 10 + 10
                },
                xAxis: bodyObj.xAxisObjArr,
                yAxis: [
                    {
                        type: 'value'
                        , axisLabel: {
                            textStyle: {
                                color: '#DCE2EC',
                                //fontSize:'16'
                            }

                        },
                        axisLine: {
                            lineStyle: {
                                color: '#DCE2EC'
                                //                            width:8,//这里是为了突出显示加上的，可以去掉
                            }
                        }, splitLine: {
                            show: false,
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#b1e3fe'],
                                width: '1',
                                type: 'dashed'
                            }

                        }
                    }
                ],
                series: [
                    bodyObj.firstSeries,
                    bodyObj.otherSeries
                ]
            };
            var myChart = echarts.init(hasChart ? chart : chart.children[0].children[0].children[0].children[0]);
            bodyObj.firstSeries.name = '离开人数';
            bodyObj.otherSeries.name = '进入人数';
            bodyObj.legendData = ['离开人数', '进入人数'];
            bodyObj.xAxisObjArr.push(bodyObj.xAxisObj1);
            // bodyObj.xAxisObjArr.push(bodyObj.xAxisObj2);
            myChart.setOption(option);
            return myChart;
        },
        getData: function (beginTime, unit, samples) {
            var maxLength = 1;
            var maxData = 0;
            var scale = getTimeSpan(beginTime, unit);
            if (unit == "Hour") {
                scale = timeOfCompletion(scale);
            }
            var dataObj = new Object();
            for (var i = 0; i < scale.length; i++) {
                dataObj[scale[i]] = new Object();
                dataObj[scale[i]].LeaveNumber = 0;
                dataObj[scale[i]].EnterNumber = 0;
            }
            var leaveData = new Array();
            var enterData = new Array();
            for (var i = 0; i < samples.length; i++) {
                var samplesDate = Convert.ToDate(samples[i].BeginTime);
                if (unit == "Hour") {
                    samplesDate.setMinutes(0);
                }
                if (scale.indexOf(samplesDate.format("HH:mm")) < 0)
                    scale.push(samplesDate.format("HH:mm"));
                dataObj[samplesDate.format("HH:mm")] = new Object();
                dataObj[samplesDate.format("HH:mm")].LeaveNumber = samples[i].LeaveNumber;
                dataObj[samplesDate.format("HH:mm")].EnterNumber = samples[i].EnterNumber;
                var maxSamplesData = samples[i].LeaveNumber > samples[i].EnterNumber ? samples[i].LeaveNumber : samples[i].EnterNumber;
                maxData = maxData > maxSamplesData ? maxData : maxSamplesData;
            }
            scale.sort(function (a, b) {
                var arrayA = a.split(":");
                arrayA[0] = parseInt(arrayA[0]);
                arrayA[1] = parseInt(arrayA[1])
                var arrayB = b.split(":");
                arrayB[0] = parseInt(arrayB[0]);
                arrayB[1] = parseInt(arrayB[1])
                if (arrayA[0] > arrayB[0])
                    return 1;
                else if (arrayA[0] < arrayB[0])
                    return -1;
                else if (arrayA[0] == arrayB[0]) {
                    return arrayA[1] > arrayB[1] ? 1 : -1;
                }
            });
            for (var i = 0; i < scale.length; i++) {
                leaveData.push(dataObj[scale[i]].LeaveNumber);
                enterData.push(dataObj[scale[i]].EnterNumber);
            }
            var obj = new Object();
            obj.leaveData = leaveData;
            obj.enterData = enterData;
            obj.scale = scale;
            obj.maxLength = maxData.toString().length;
            if (obj.maxLength == 1) {
                obj.maxLength++;
            }
            return obj;
        },
        getItem: function (hasRemoveBtn) {
            var chart = document.createElement("div");
            chart.innerHTML = document.getElementById("template-histogram-chart").innerHTML;
            if (!hasRemoveBtn) {
                var removeBtn = chart.getElementsByClassName("ti-close")[0];
                removeBtn.parentElement.removeChild(removeBtn);
            }
            return chart;
        }
    },
    Arc: {
        totalPercentileValue: 2.8,
        circleSection: {
            first: 20,
            firstPercentileValue: 0.5,
            second: 200,
            secondPercentileValue: 0.33,
            third: 1000,
            thirdPercentileValue: 0.2,
        },
        create: function (item, itemType, hasRemoveBtn) {
            var arcDiv = document.createElement("div");
            arcDiv.innerHTML = document.getElementById("template-pdc-arc").innerHTML;
            var arcDiv = this.update(item, itemType, arcDiv);
            if (!hasRemoveBtn) {
                var removeBtn = arcDiv.getElementsByClassName("ti-close")[0];
                removeBtn.parentElement.removeChild(removeBtn);
            }
            return arcDiv;
        },
        createRealTimeArc: function (canvas, number, circleSection, fontCircleSection, start, end, percentileValue, color, isAnticlockwise, isReduce) {
            if (number >= circleSection) {
                createArc(canvas, start, end, isAnticlockwise, 10, Constant.PDC.Color[color]);
            }
            else if (number < circleSection && number > fontCircleSection) {
                number = number - fontCircleSection;
                var percent = Math.ceil(Math.round(number / circleSection * 10000) / 100.00);
                createArc(canvas, start, isReduce ? start - (percentileValue * percent) : start + (percentileValue * percent), isAnticlockwise, 10, Constant.PDC.Color[color]);
            }
        },
        update: function (item, itemType, arcDiv) {
            arcDiv.getElementsByClassName("name")[0].innerText = item.Name;
            var canvas = arcDiv.getElementsByClassName("canvas-circle")[0];
            createArc(canvas, 140, 90, true, 10, Constant.PDC.Color.Default);
            createArc(canvas, 85, 55, true, 10, Constant.PDC.Color.Default);
            createArc(canvas, 50, 30, true, 10, Constant.PDC.Color.Default);
            createArc(canvas, 220, 270, false, 10, Constant.PDC.Color.Default);
            createArc(canvas, 275, 305, false, 10, Constant.PDC.Color.Default);
            createArc(canvas, 310, 330, false, 10, Constant.PDC.Color.Default);
            createArc(canvas, 140, 220, true, 40, Constant.PDC.Color.Default, 100);

            if (item[itemType]) {
                arcDiv.getElementsByClassName("template-pdc-LeaveNumber")[0].innerText = item[itemType].LeaveNumber;
                arcDiv.getElementsByClassName("template-pdc-EnterNumber")[0].innerText = item[itemType].EnterNumber;
                arcDiv.getElementsByClassName("template-pdc-DeviationNumber")[0].innerText = item[itemType].DeviationNumber;
                if (item[itemType].LastNLeaveNumber)
                    arcDiv.getElementsByClassName("template-pdc-LastNLeaveNumber")[0].innerText = item[itemType].LastNLeaveNumber;
                if (item[itemType].LastNEnterNumber)
                    arcDiv.getElementsByClassName("template-pdc-LastNEnterNumber")[0].innerText = item[itemType].LastNEnterNumber;

                var total = item[itemType].EnterNumber + item[itemType].LeaveNumber;
                var enterNumberPercent = parseInt(Math.round(item[itemType].EnterNumber / total * 10000) / 100.00);
                var leaveNumberPercent = 100 - enterNumberPercent;
                var enterNumberEndAngle = 0;
                if (enterNumberPercent > 0) {
                    if (enterNumberPercent > 50) {
                        enterNumberEndAngle = 360 - (enterNumberPercent - 50) * this.totalPercentileValue;
                    }
                    else if (enterNumberPercent < 50) {
                        enterNumberEndAngle = 140 - enterNumberPercent * this.totalPercentileValue;
                    }
                    createArc(canvas, 140, enterNumberEndAngle, true, 40, Constant.PDC.Color.Enter, 100);//总进入人数
                }
                if (leaveNumberPercent > 0) {
                    createArc(canvas, 220, enterNumberEndAngle, false, 40, Constant.PDC.Color.Leave, 100);//总离开人数
                }
                if (item[itemType].LastNEnterNumber > 0) {
                    this.createRealTimeArc(canvas, item[itemType].LastNEnterNumber, this.circleSection.first, 0, 140, 90, this.circleSection.firstPercentileValue, "Enter", true, true);//实时进入人数下
                    this.createRealTimeArc(canvas, item[itemType].LastNEnterNumber, this.circleSection.second, this.circleSection.first, 85, 55, this.circleSection.secondPercentileValue, "Enter", true, true);//实时进入人数中
                    this.createRealTimeArc(canvas, item[itemType].LastNEnterNumber, this.circleSection.third, this.circleSection.second, 50, 30, this.circleSection.thirdPercentileValue, "Enter", true, true);//实时进入人数上
                }

                if (item[itemType].LastNLeaveNumber > 0) {
                    this.createRealTimeArc(canvas, item[itemType].LastNLeaveNumber, this.circleSection.first, 0, 220, 270, this.circleSection.firstPercentileValue, "Leave", false);//实时离开人数下
                    this.createRealTimeArc(canvas, item[itemType].LastNLeaveNumber, this.circleSection.second, this.circleSection.first, 275, 305, this.circleSection.secondPercentileValue, "Leave", false);//实时离开人数中
                    this.createRealTimeArc(canvas, item[itemType].LastNLeaveNumber, this.circleSection.third, this.circleSection.second, 310, 330, this.circleSection.thirdPercentileValue, "Leave", false);//实时离开人数上
                }
            }
            return arcDiv;
        }
    }
}

function convertAngle(angle) {
    angle = angle % 360;
    if (angle < 0)
        return;
    angle = angle + 270;
    angle = angle % 360;
    return angle * 2 / 360 * Math.PI;
}

function createArc(canvas, startAngle, endAngle, isAnticlockwise, lineWidth, color, radius) {
    var x = parseInt(canvas.parentElement.style.width) / 2;
    var y = parseInt(canvas.parentElement.style.height) / 2;
    var r = x - lineWidth / 2;
    if (radius)
        r = radius;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, r, convertAngle(startAngle), convertAngle(endAngle), isAnticlockwise);
    ctx.stroke();
}



var TemplateElements = {
    getDateTime: function () {
        return document.getElementById(template).getElementsByClassName("template-date-time-1")[0];
    }
}

var TemplateItems = {
    DateTime: function (element, date) {
        this.Element = element;
        function DayOfWeekElement(element, callback) {
            this.Element = element.getElementsByClassName("week")[0];

            var _value, _callback;
            _callback = callback;

            if (!window.chinese)
                window.chinese = {
                    sunday: '星期日',
                    monday: '星期一',
                    tuesday: '星期二',
                    wednesday: '星期三',
                    thursday: '星期四',
                    friday: '星期五',
                    saturday: '星期六'
                }
            var weeks = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            this.get = function () {
                return _value;
            }
            this.set = function (value) {
                if (_value == value) return;
                _value = value;
                this.Element.innerHTML = chinese[weeks[_value]];
                if (_callback) _callback(_value);
            }
        }
        function TimeElement(element) {
            this.Element = element.getElementsByClassName("time")[0];
            var _this = this;
            var _value = new Date();
            this.Hour = new ValueElement(this.Element, "hour", function (hour) {
                var date = _this.get();
                date.setHours(hour);
                _this.set(date);
            });
            this.Minute = new ValueElement(this.Element, "minute", function (minute) {
                var date = _this.get();
                date.setMinutes(minute);
                _this.set(date);
            });
            this.Second = new ValueElement(this.Element, "second", function (second) {
                var date = _this.get();
                date.setSeconds(second);
                _this.set(date);
            });

            this.get = function () {
                return _value;
            }
            this.set = function (value) {
                if (_value == value) return;
                _value = value;
                this.Hour.set(_value.getHours());
                this.Minute.set(_value.getMinutes());
                this.Second.set(_value.getSeconds());
            }
        }

        function DateElement(element, date) {
            this.Element = element.getElementsByClassName("date")[0];
            var _this = this;
            var _value = new Date();

            this.Year = new ValueElement(this.Element, "year", function (year) {
                var date = _this.get();
                date.setYear(year);
                _this.set(date);
            })
            this.Month = new ValueElement(this.Element, "month", function (month) {
                var date = _this.get();
                date.setLocationMonth(month);
                _this.set(date);
            })
            this.Day = new ValueElement(this.Element, "day", function (day) {
                var date = _this.get();
                date.setDate(day);
                _this.set(date);
            })
            this.DayOfWeek = new DayOfWeekElement(this.Element, function (day) {
                var date = _this.get();
                date.setDate(day);
                _this.set(date);
            })

            this.get = function () {
                return _value;
            }
            this.set = function (value) {
                if (_value == value) return;
                _value = value;
                this.Year.set(_value.getFullYear());
                this.Month.set(_value.getLocationMonth());
                this.Day.set(_value.getDate());
                this.DayOfWeek.set(_value.getDay());
            }
        }
        var _value;

        this.Time = new TimeElement(this.Element);

        this.Date = new DateElement(this.Element);

        this.get = function () {
            return _value;
        }
        this.set = function (value) {
            this.Time.set(value);
            this.Date.set(value);
        }

        if (date) this.set(date);
    }
}

function ValueElement(element, classname, callback) {
    this.Element = element.getElementsByClassName(classname)[0];
    var _value, _callback;
    _callback = callback;
    this.get = function () {
        return _value;
    }
    this.set = function (value) {
        if (_value == value) return;
        _value = value;
        this.Element.innerHTML = _value;
        if (_callback) _callback(_value);
    }
}