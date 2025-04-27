/// <reference path="../howell.js/howell.js" />
/// <reference path="struct.js" />
/// <reference path="../howell.js/howell.convert.js" />
/// <reference path="BaseClient.js" />


(function (deviceId) {

    var hadScript =
        {
            httpService: "/face/js/howell.js/httpService.js",
            convert: "/face/js/howell.js/howell.convert.js",
            BaseClient: "/face/js/client/BaseClient.js"
            //发布时使用下面的三句
            // httpService: "/js/howell.js/httpService.js",
            // convert: "/js/howell.js/howell.convert.js",
            // BaseClient: "/js/client/BaseClient.js"
        };
    for (var id in hadScript) {
        if (!document.getElementById(id)) {
            loadJS(id, document.location.protocol + "//" + document.location.host + hadScript[id]);
        }
    }
})();




function ManagementClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/data_service/management";
    var base = new BaseClient();
    var baseAsyn = new BaseAsynClient();

    this.Picture = function (id) {
        return "http://" + host + ":" + port + "/howell/ver10/Medium/Pictures/" + id + "/Data";
    }


    this.getVersion = function () {
        var result = base.Get(contract.version);
        return Convert(result, new ServiceVersion());
    }
    this.Device =
        {
            List: function (pageIndex, pageSize, classification, search) {
                var result = base.Get(contract.device.list(), getParams(this.List));
                return Convert(result, new DeviceList());
            },
            Get: function (deviceId) {
                var result = base.Get(contract.device.item(deviceId));
                return Convert(result, new Device());
            },
            Create: function (device) {
                return base.Post(contract.device.list(), device);
            },
            Set: function (device) {
                return base.Put(contract.device.item(device.Id), device);
            },
            Delete: function (deviceId) {
                return base.Delete(contract.device.item(deviceId));
            },
            Details: function (deviceId) {
                var result = base.Get(contract.device.details(deviceId));
                return Convert(result, new DeviceDetails());
            },
            Status: function (deviceId) {
                var result = base.Get(contract.device.status(deviceId));
                return Convert(result, new DeviceStatus());
            },
            Capabilities: function (classification) {
                var result = base.Get(contract.device.capabilities(classification));
                return Convert(result, new DeviceClassificationCapabilities());
            },
            Face: {
                AnalysisImage: function (deviceId, stream, contentType) {
                    return base.Options("PostStream", contract.device.face.analysisImage(deviceId), stream, null, contentType);
                }
            },
            FaceContrasts: {
                Faces: {
                    Search: function (deviceId, faceContrastSearchDescription, callback) {
                        var result = baseAsyn.Options(HttpMethod.Post, callback, null, contract.device.facecontrasts.faces.search(deviceId), faceContrastSearchDescription);
                    }
                },
                Pictures: {
                    Data: function (deviceId, pictureId) {
                        return contract.device.facecontrasts.pictures.data(deviceId, pictureId);
                    }
                }
            },
            FaceSets: {
                List: function (deviceId, pageIndex, pageSize) {
                    /// <summary>获取人脸比对库</summary>
                    /// <param name="deviceId" type="Id">设备Id</param>
                    /// <param name="pageIndex" type="Int32">页码[1-n]</param>
                    /// <param name="pageSize" type="Int32">分页大小[1-100]</param>
                    /// <returns type="FaceSetList">人脸库列表</returns>
                    var result = base.Get(contract.device.facesets.list(deviceId), getParams(this.List, 1));
                    return Convert(result, new FaceSetList());
                },
                Create: function (deviceId, faceSet) {
                    /// <summary>创建人脸比对库</summary>
                    /// <param name="deviceId" type="Id">设备Id</param>
                    /// <param name="faceSet" type="FaceSet">人脸库信息</param>
                    /// <returns type="Fault">错误信息</returns>
                    return base.Post(contract.device.facesets.list(deviceId), faceSet);
                },
                Get: function (deviceId, faceSetId) {
                    /// <summary>获取人脸比对库</summary>
                    /// <param name="deviceId" type="Id">设备Id</param>
                    /// <param name="faceSetId" type="Id">人脸库Id</param>
                    /// <returns type="FaceSet">人脸库信息</returns>
                    var result = base.Get(contract.device.facesets.item(deviceId, faceSetId));
                    return Convert(result, new FaceSet());
                },
                Set: function (deviceId, faceSetId, faceSet) {
                    /// <summary>设置人脸比对库</summary>
                    /// <param name="deviceId" type="Id">设备Id</param>
                    /// <param name="faceSetId" type="Id">人脸库Id</param>
                    /// <param name="faceSet" type="FaceSet">人脸库信息</param>
                    /// <returns type="Fault">错误信息</returns>
                    return base.Put(contract.device.facesets.item(deviceId, faceSetId), faceSet);
                },
                Delete: function (deviceId, faceSetId) {
                    /// <summary>删除人脸比对库</summary>
                    /// <param name="deviceId" type="Id">设备Id</param>
                    /// <param name="faceSetId" type="Id">人脸库Id</param>
                    /// <returns type="Fault">错误信息</returns>
                    return base.Delete(contract.device.facesets.item(deviceId, faceSetId));
                },
                Faces: {
                    Create: function (deviceId, faceSetId, faceAppendData) {
                        /// <summary>创建人脸比对库下的人脸信息</summary>
                        /// <param name="deviceId" type="Id">设备Id</param>
                        /// <param name="faceSetId" type="Id">人脸库Id</param>
                        /// <param name="faceAppendData" type="FaceAppendData">人脸信息附加数据</param>
                        /// <returns type="Fault">错误信息</returns>
                        return base.Post(contract.device.facesets.faces.list(deviceId, faceSetId), faceAppendData);
                    },
                    List: function (deviceId, faceSetId, pageIndex, pageSize, name, sex, province, city, phoneNumber, cardType, cardNumber, bornBeginTime, bornEndTime) {
                        /// <summary>获取人脸比对库下的人脸信息</summary>
                        /// <param name="deviceId" type="Id">设备Id</param>
                        /// <param name="faceSetId" type="Id">人脸库Id</param>
                        /// <param name="pageIndex" type="Int32">页码[1-n]</param>
                        /// <param name="pageSize" type="Int32">分页大小[1-100]</param>
                        /// <param name="name" type="String">姓名</param>
                        /// <param name="sex" type="Sex">  性别（gender）</param>
                        /// <param name="province" type="String">省份</param>
                        /// <param name="city" type="String">城市</param>
                        /// <param name="phoneNumber" type="String">电话号码</param>
                        /// <param name="cardType" type="String">证件类型</param>
                        /// <param name="cardNumber" type="String">证件编号</param>
                        /// <param name="bornBeginTime" type="DateTime">开始出生年月</param>
                        /// <param name="bornEndTime" type="DateTime">结束出生年月</param>
                        /// <returns type="FaceAppendDataList">人脸信息附加数据列表</returns>
                        var result = base.Get(contract.device.facesets.faces.list(deviceId, faceSetId), getParams(this.List, 2));
                        return Convert(result, new FaceAppendDataList());
                    },
                    Get: function (deviceId, faceSetId, facesId) {
                        /// <summary>获取人脸比对库下的人脸信息</summary>
                        /// <param name="deviceId" type="Id">设备Id</param>
                        /// <param name="faceSetId" type="Id">人脸库Id</param>
                        /// <param name="facesId" type="Id">人脸信息附加数据Id</param>
                        /// <returns type="FaceAppendData">人脸信息附加数据</returns>
                        var result = base.Get(contract.device.facesets.faces.item(deviceId, faceSetId, facesId));
                        return Convert(result, new FaceAppendData());
                    },
                    Set: function (deviceId, faceSetId, facesId, faceAppendData) {
                        /// <summary>设置人脸比对库下的人脸信息</summary>
                        /// <param name="deviceId" type="Id">设备Id</param>
                        /// <param name="faceSetId" type="Id">人脸库Id</param>
                        /// <param name="facesId" type="Id">人脸信息附加数据Id</param>
                        /// <param name="faceAppendData " type="FaceAppendData">人脸信息附加数据</param>
                        /// <returns type="Fault">错误信息</returns>
                        return base.Put(contract.device.facesets.faces.item(deviceId, faceSetId, facesId), faceAppendData);
                    },
                    Delete: function (deviceId, faceSetId, facesId) {
                        /// <summary>删除人脸比对库下的人脸信息</summary>
                        /// <param name="deviceId" type="Id">设备Id</param>
                        /// <param name="faceSetId" type="Id">人脸库Id</param>
                        /// <param name="facesId" type="Id">人脸信息附加数据Id</param>
                        /// <returns type="Fault">错误信息</returns>
                        return base.Delete(contract.device.facesets.faces.item(deviceId, faceSetId, facesId));
                    },
                    PictureData: function (deviceId, faceSetId, facesId) {
                        return contract.device.facesets.faces.picturedata(deviceId, faceSetId, facesId)
                    },
                    Search: function (deviceId, faceSetSearchDescription,callback) {
                        var result = baseAsyn.Options(HttpMethod.Post,callback,null, contract.device.facesets.faces.search(deviceId), faceSetSearchDescription);
                    }
                }
            },
            WiFi:
            {
                Get: function (deviceId) {
                    var result = base.Get(contract.device.wifi(deviceId));
                    return Convert(result, new WiFiInformation());
                },
                Set: function (deviceId, wifi) {
                    return base.Put(contract.device.wifi(deviceId), wifi);
                }
            },
            Searching:
            {
                Start: function (id, protocolType, timeout) {
                    return base.Post(contract.device.search(id), null, getParams(this.Start, 1));
                },
                Stop: function (id) {
                    return base.Delete(contract.device.search(id));
                },
                Get: function (id) {
                    var result = base.Get(contract.device.search(id));
                    return Convert(result, new Device());
                },
                Set: function (id, physicalAddress, iPAddress, submask, gateway, port) {
                    return base.Put(contract.device.search(id), null, getParams(this.Set, 1));
                }
            },
            Information:
            {
                Get: function (deviceId) {
                    var result = base.Get(contract.device.information(deviceId));
                    return Convert(result, new DeviceInformation());
                },
                Set: function (information) {
                    return base.Put(contract.device.information(information.Id), information);
                }
            },
            Video:
            {
                Input:
                {
                    List: function (deviceId, pageIndex, pageSize, search) {
                        var result = base.Get(contract.device.video.input.list(deviceId), getParams(this.List, 1));
                        return Convert(result, new VideoInputChannelList());
                    },
                    Create: function (deviceId, input) {
                        return base.Post(contract.device.video.input.list(deviceId), input);
                    },
                    Get: function (deviceId, inputId) {
                        var result = base.Get(contract.device.video.input.item(deviceId, inputId));
                        return Convert(result, new VideoInputChannel());
                    },
                    Set: function (deviceId, input) {
                        return base.Put(contract.device.video.input.item(deviceId, input.Id), input);
                    },
                    Delete: function (deviceId, inputId) {
                        return base.Delete(contract.device.video.input.item(deviceId, inputId));
                    },
                    Status: function (deviceId, inputId) {
                        var result = base.Get(contract.device.video.input.status(deviceId, inputId));
                        return Convert(result, new VideoInputChannel());
                    },
                    Association:
                    {
                        Get: function (deviceId, inputId) {
                            var result = base.Get(contract.device.video.input.association.item(deviceId, inputId));
                            return Convert(result, new VideoInputAssociation());
                        },
                        Set: function (deviceId, inputId, association) {
                            return base.Put(contract.device.video.input.association.item(deviceId, inputId), association);
                        },
                        Delete: function (deviceId, inputId) {
                            return base.Delete(contract.device.video.input.association.item(deviceId, inputId));
                        }
                    },
                    Streaming:
                    {
                        List: function (deviceId, inputId) {
                            return base.Get(contract.device.video.input.stream.list(deviceId, inputId));
                        },
                        Get: function (deviceId, inputId, streamNo) {
                            var result = base.Get(contract.device.video.input.stream.item(deviceId, inputId, streamNo));
                            return Convert(result, new StreamingChannel());
                        },
                        Set: function (deviceId, inputId, stream) {
                            return base.Put(contract.device.video.input.stream.item(deviceId, inputId, stream.No), stream);
                        },
                        Status: function (deviceId, inputId, streamNo) {
                            var result = base.Get(contract.device.video.input.stream.status(deviceId, inputId, streamNo));
                            return Convert(result, new StreamingStatus());
                        },
                        NetworkAssociation:
                        {
                            Get: function (deviceId, inputId, streamNo) {
                                var result = base.Get(contract.device.video.input.stream.networkAssociation(deviceId, inputId, streamNo));
                                return Convert(result, new NetworkStreamingAssociation());
                            },
                            Set: function (deviceId, inputId, streamNo, networkAssociation) {
                                return base.Put(contract.device.video.input.stream.networkAssociation(deviceId, inputId, streamNo), networkAssociation);
                            },
                            Delete: function (deviceId, inputId, streamNo) {
                                return base.Delete(contract.device.video.input.stream.networkAssociation(deviceId, inputId, streamNo));
                            }
                        },
                        Picture: function (deviceId, inputId, pictureId, format, quality) {
                            return base.Get(contract.device.video.input.stream.picture(deviceId, inputId, pictureId), getParams(this.Picture, 3));
                        },

                    },
                    Diagnostics:
                    {
                        List: function () {
                            var result = base.Get(contract.device.video.input.diagnostics.list());
                            return Convert(result, new BitrateStatusList());
                        },
                        Get: function (deviceId, inputId, sessionId) {
                            var result = base.Get(contract.device.video.input.diagnostics.item(deviceId, inputId, sessionId));
                            return Convert(result, new BitrateStatus());
                        },
                        Start: function (deviceId, inputId, sessionId, bandwidth, duration) {
                            return base.Post(contract.device.video.input.diagnostics.item(deviceId, inputId, sessionId), null, getParams(this.Start, 3));
                        },
                        Stop: function (deviceId, inputId, sessionId) {
                            return base.Delete(contract.device.video.input.diagnostics.item(deviceId, inputId, sessionId));
                        }
                    },
                    Preview:
                    {
                        List: function (deviceId, inputId, pageIndex, pageSize) {
                            var result = base.Get(contract.device.video.input.previews.list(deviceId, inputId), getParams(this.List, 2));
                            return Convert(result, new PreviewSourceList());
                        },
                        Create: function (deviceId, inputId, preview) {
                            return base.Post(contract.device.video.input.previews.list(deviceId, inputId), preview);
                        },
                        Get: function (deviceId, inputId, previewId) {
                            var result = base.Get(contract.device.video.input.previews.item(deviceId, inputId, previewId));
                            return Convert(result, new PreviewSource());
                        },
                        Set: function (deviceId, inputId, preview) {
                            return base.Put(contract.device.video.input.previews.item(deviceId, inputId, preview.Id), preview);
                        },
                        Delete: function (deviceId, inputId, previewId) {
                            return base.Delete(contract.device.video.input.previews.item(deviceId, inputId, previewId));
                        }
                    },
                    Playback:
                    {
                        List: function (deviceId, inputId, pageIndex, pageSize) {
                            var result = base.Get(contract.device.video.input.playbacks.list(deviceId, inputId), getParams(this.List, 2));
                            return Convert(result, new PlaybackSourceList());
                        },
                        Create: function (deviceId, inputId, playback) {
                            return base.Post(contract.device.video.input.playbacks.list(deviceId, inputId), playback);
                        },
                        Get: function (deviceId, inputId, playbackId) {
                            var result = base.Get(contract.device.video.input.playbacks.item(deviceId, inputId, playbackId));
                            return Convert(result, new PlaybackSource());
                        },
                        Set: function (deviceId, inputId, playback) {
                            return base.Put(contract.device.video.input.playbacks.item(deviceId, inputId, playback.Id), playback);
                        },
                        Delete: function (deviceId, inputId, playbackId) {
                            return base.Delete(contract.device.video.input.playbacks.item(deviceId, inputId, playbackId));
                        }
                    },
                    PseudoCode: {
                        List: function (pageIndex, pageSize, hasPseudoCode) {
                            /// <summary>查询带有伪码的视频输入通道信息列表</summary>
                            /// <param name="pageIndex" type="Int32">页码[1-n]</param>
                            /// <param name="pageSize" type="Int32">分页大小[1-100]</param>
                            /// <param name="hasPseudoCode" type="Boolean">查询是否含有伪码的</param>
                            /// <returns type="VideoInputChannelList">视频输入通道列表</returns>
                            var result = base.Get(contract.device.video.input.pseudoCode.list(), getParams(this.List));
                            return Convert(result, new VideoInputChannelList());
                        },
                        Get: function (code) {
                            /// <summary>查询带有伪码的视频输入通道信息</summary>
                            /// <param name="code" type="String">伪码</param>
                            /// <returns type="VideoInputChannelList">视频输入通道</returns>
                            var result = base.Get(contract.device.video.input.pseudoCode.item(code));
                            return Convert(result, new VideoInputChannel());
                        },
                        Set: function (code, channelId) {
                            /// <summary>设置伪码，如果新修改的Code已经被占用，则原有的Code对应的通道的伪码将被删除</summary>
                            /// <param name="code" type="String">伪码</param>
                            /// <param name="channelId" type="String">视频输入通道编号</param>
                            /// <returns type="Int32">返回值</returns>
                            return base.Put(contract.device.video.input.pseudoCode.item(code), null, getParams(this.Set, 1));
                        },
                        Delete: function (code) {
                            /// <summary>删除伪码</summary>
                            /// <param name="code" type="String">伪码</param>
                            /// <returns type="Int32">返回值</returns>
                            return base.Delete(contract.device.video.input.pseudoCode.item(code));
                        }
                    },
                    Effect:
                    {
                        Get: function (deviceId, inputId) {
                            var result = base.Get(contract.device.video.input.effect(deviceId, inputId));
                            return Convert(result, new VideoEffect());
                        },
                        Set: function (deviceId, inputId, effect) {
                            return base.Put(contract.device.video.input.effect(deviceId, inputId), effect);
                        }
                    },
                    Decoder:
                    {
                        Get: function (deviceId, inputId) {
                            var result = base.Get(contract.device.video.input.decoder.item(deviceId, inputId));
                            return Convert(result, new PTZDecoder());
                        },
                        Set: function (deviceId, inputId, ptzDecoder) {
                            return base.Put(contract.device.video.input.decoder.item(deviceId, inputId), ptzDecoder);
                        },
                        Protocol: function (deviceId, inputId) {
                            var result = base.Get(contract.device.video.input.decoder.protocol(deviceId, inputId));
                            return Convert(result, new PTZProtocolList());
                        }
                    },
                    PTZ:
                    {
                        Directions: function (deviceId, inputId, control, speed) {
                            return base.Put(contract.device.video.input.ptz.direction(deviceId, inputId), null, getParams(this.Directions, 2));
                        },
                        Lens: function (deviceId, inputId, control, speed) {
                            return base.Put(contract.device.video.input.ptz.len(deviceId, inputId), null, getParams(this.Lens, 2));
                        },
                        Preset: function (deviceId, inputId, control, presetNo, speed) {
                            return base.Put(contract.device.video.input.ptz.preset(deviceId, inputId), null, getParams(this.Preset, 2));
                        }
                    },
                    FaceContrasts: {
                        List: {
                            Get: function (deviceId, channelId) {
                                /// <summary>获取视频输入通道关联的人脸比对库</summary>
                                /// <param name="deviceId" type="Id">设备Id</param>
                                /// <param name="channelId" type="Id">视频输入通道Id</param>
                                /// <returns type="FaceContrast[]">视频源通道关联的比对库信息数组</returns>
                                var result = base.Get(contract.device.video.input.faceContrasts.list(deviceId, channelId));
                                return result;
                            },
                            Set: function (deviceId, channelId, faceContrastArray) {
                                /// <summary>修改视频输入通道关联的人脸比对库</summary>
                                /// <param name="deviceId" type="Id">设备Id</param>
                                /// <param name="channelId" type="Id">视频输入通道Id</param>
                                /// <param name="faceContrastArray" type="FaceContrast[]">视频源通道关联的比对库信息数组</param>
                                /// <returns type="Fault">错误信息</returns>
                                return base.Put(contract.device.video.input.faceContrasts.list(deviceId, channelId), faceContrastArray);
                            }
                        },
                        Item: {
                            Get: function (deviceId, channelId, faceContrastsId) {
                                /// <summary>获取视频输入通道关联的人脸比对库</summary>
                                /// <param name="deviceId" type="Id">设备Id</param>
                                /// <param name="channelId" type="Id">视频输入通道Id</param>
                                /// <param name="faceContrastsId" type="Id">视频源通道关联的比对库信息Id</param>
                                /// <returns type="FaceContrast">视频源通道关联的比对库信息</returns>
                                var result = base.Get(contract.device.video.input.faceContrasts.item(deviceId, channelId, faceContrastsId));
                                return Convert(result, new FaceContrast());
                            },
                            Set: function (deviceId, channelId, faceContrast) {
                                /// <summary>修改视频输入通道关联的人脸比对库</summary>
                                /// <param name="deviceId" type="Id">设备Id</param>
                                /// <param name="channelId" type="Id">视频输入通道Id</param>
                                /// <param name="faceContrast" type="FaceContrast">视频源通道关联的比对库信息</param>
                                /// <returns type="Fault">错误信息</returns>
                                return base.Put(contract.device.video.input.faceContrasts.item(deviceId, channelId, faceContrast.Id), faceContrast);
                            }
                        },
                        Alert: {
                            Schedule: {
                                Get: function (deviceId, channelId) {
                                    /// <summary>获取人脸比对工作表</summary>
                                    /// <param name="deviceId" type="Id">设备Id</param>
                                    /// <param name="channelId" type="Id">视频输入通道Id</param>
                                    /// <returns type="WeeklySchedule">周工作时刻表</returns>
                                    var result = base.Get(contract.device.video.input.faceContrasts.alert.schedule(deviceId, channelId));
                                    return Convert(result, new WeeklySchedule());
                                },
                                Set: function (deviceId, channelId, weeklySchedule) {
                                    /// <summary>修改人脸比对工作表</summary>
                                    /// <param name="deviceId" type="Id">设备Id</param>
                                    /// <param name="channelId" type="Id">视频输入通道Id</param>
                                    /// <param name="weeklySchedule" type="WeeklySchedule">周工作时刻表</param>
                                    /// <returns type="Fault">错误信息</returns>
                                    return base.Put(contract.device.video.input.faceContrasts.alert.schedule(deviceId, channelId), weeklySchedule);
                                }
                            },
                            Handle: {
                                Get: function (deviceId, channelId) {
                                    /// <summary>获取人脸比对报警联动</summary>
                                    /// <param name="deviceId" type="Id">设备Id</param>
                                    /// <param name="channelId" type="Id">视频输入通道Id</param>
                                    /// <returns type="AlertHandle">报警处理</returns>
                                    var result = base.Get(contract.device.video.input.faceContrasts.alert.handle(deviceId, channelId));
                                    return Convert(result, new AlertHandle());
                                },
                                Set: function (deviceId, channelId, alertHandle) {
                                    /// <summary>修改人脸比对报警联动</summary>
                                    /// <param name="deviceId" type="Id">设备Id</param>
                                    /// <param name="channelId" type="Id">视频输入通道Id</param>
                                    /// <param name="alertHandle" type="AlertHandle">报警处理</param>
                                    /// <returns type="Fault">错误信息</returns>
                                    return base.Put(contract.device.video.input.faceContrasts.alert.handle(deviceId, channelId), alertHandle);
                                }
                            }
                        }
                    }
                },
                Output:
                {
                    List: function (deviceId, pageIndex, pageSize, search) {
                        var result = base.Get(contract.device.video.output.list(deviceId), getParams(this.List, 1));
                        return Convert(result, new VideoOutputChannelList());
                    },
                    Create: function (deviceId, output) {
                        return base.Post(contract.device.video.output.list(deviceId), output);
                    },
                    Get: function (deviceId, outputId) {
                        var result = base.Get(contract.device.video.output.item(deviceId, outputId));
                        return Convert(result, new VideoOutputChannel());
                    },
                    Set: function (deviceId, output) {
                        return base.Put(contract.device.video.output.item(deviceId, output.Id), output);
                    },
                    Delete: function (deviceId, outputId) {
                        return base.Delete(contract.device.video.output.item(deviceId, outputId));
                    },
                    Status: function (deviceId, outputId) {
                        var result = base.Get(contract.device.video.output.status(deviceId, outputId));
                        return Convert(result, new VideoOutputChannelStatus());
                    },
                    DisplayMode: {
                        Get: function (deviceId, outputId) {
                            var result = base.Get(contract.device.video.output.displayMode(deviceId, outputId));
                            return Convert(result, new VideoOutputDisplayMode());
                        },
                        Set: function (deviceId, outputId, videoOutputDisplayMode) {
                            return base.Put(contract.device.video.output.displayMode(deviceId, outputId), videoOutputDisplayMode);
                        }
                    },
                    Capabilities: {
                        Get: function (deviceId, outputId) {
                            var result = base.Get(contract.device.video.output.capabilities(deviceId, outputId));
                            return Convert(result, new VideoOutputChannelCapabilities());
                        }
                    },
                    Decode:
                    {
                        List: function (deviceId, outputId, pageIndex, pageSize) {
                            var result = base.Get(contract.device.video.output.decode.list(deviceId, outputId), getParams(this.List, 2));
                            return Convert(result, new DecodingChannelList());
                        },
                        Get: function (deviceId, outputId, decodeId) {
                            var result = base.Get(contract.device.video.output.decode.item(deviceId, outputId, decodeId));
                            return Convert(result, new DecodingChannel());
                        },
                        Association: function (deviceId, outputId, decodeId) {
                            return base.Post(contract.device.video.output.decode.item(deviceId, outputId, decodeId));
                        },
                        Delete: function (deviceId, outputId, decodeId) {
                            return base.Delete(contract.device.video.output.decode.item(deviceId, outputId, decodeId));
                        },
                        Status: {
                            Get: function (deviceId, outputId, decodeId) {
                                var result = base.Get(contract.device.video.output.decode.status(deviceId, outputId, decodeId));
                                return Convert(result, new DecodingChannelStatus());
                            },
                            Set: function (deviceId, outputId, decodeId, decodingChannelStatus) {
                                return base.Put(contract.device.video.output.decode.status(deviceId, outputId, decodeId), decodingChannelStatus);
                            }
                        },
                        Switching: {
                            Get: function (deviceId, outputId, decodeId) {
                                var result = base.Get(contract.device.video.output.decode.switching.item(deviceId, outputId, decodeId));
                                return Convert(result, new DecodingChannelSwitching());
                            },
                            Set: function (deviceId, outputId, decodeId, decodingChannelSwitching) {
                                return base.Put(contract.device.video.output.decode.switching.item(deviceId, outputId, decodeId), decodingChannelSwitching);
                            },
                            Status: {
                                Get: function (deviceId, outputId, decodeId) {
                                    var result = base.Get(contract.device.video.output.decode.switching.status(deviceId, outputId, decodeId));
                                    return Convert(result, new DecodingChannelSwitchingStatus());
                                },
                                Set: function (deviceId, outputId, decodeId, decodingChannelSwitchingStatus) {
                                    return base.Put(contract.device.video.output.decode.switching.status(deviceId, outputId, decodeId), decodingChannelSwitchingStatus);
                                }
                            }
                        }
                    }
                },
                Decode:
                {
                    List: function (deviceId, pageIndex, pageSize) {
                        var result = base.Get(contract.device.video.decode.list(deviceId), getParams(this.List, 1));
                        return Convert(result, new DecodingChannelList());
                    },
                    Create: function (deviceId, decode) {
                        return base.Post(contract.device.video.decode.list(deviceId), decode);
                    },
                    Get: function (deviceId, decodeId) {
                        var result = base.Get(contract.device.video.decode.item(deviceId, decodeId));
                        return Convert(result, new DecodingChannel());
                    },
                    Set: function (deviceId, decode) {
                        return base.Put(contract.device.video.decode.item(deviceId, decode.Id), decode);
                    },
                    Delete: function (deviceId, decodeId) {
                        return base.Delete(contract.device.video.decode.item(deviceId, decodeId));
                    },
                    Status: function (deviceId, decodeId) {
                        var result = base.Get(contract.device.video.decode.status(deviceId, decodeId));
                        return Convert(result, new DecodingChannelStatus());
                    }
                }
            },
            IO:
            {
                Input:
                {
                    List: function (deviceId, pageIndex, pageSize, search) {
                        var result = base.Get(contract.device.io.input.list(deviceId), getParams(this.List, 1));
                        return Convert(result, new IOInputChannelList());
                    },
                    Get: function (deviceId, inputId) {
                        var result = base.Get(contract.device.io.input.item(deviceId, inputId));
                        return Convert(result, new IOInputChannel());
                    },
                    Create: function (deviceId, input) {
                        return base.Post(contract.device.io.input.list(deviceId), input);
                    },
                    Set: function (deviceId, input) {
                        return base.Put(contract.device.io.input.item(deviceId, input.Id), input);
                    },
                    Delete: function (deviceId, inputId) {
                        return base.Delete(contract.device.io.input.item(deviceId, inputId));
                    },
                    Status: function (deviceId, inputId) {
                        var result = base.Get(contract.device.io.input.status(deviceId, inputId));
                        return Convert(result, new IOInputChannelStatus());
                    },
                    Ultrasonic:
                    {
                        Get: function (deviceId, channelId) {
                            var result = base.Get(contract.device.io.input.ultrasonic(deviceId, channelId));
                            return Convert(result, new UltrasonicInformation());
                        },
                        Set: function (deviceId, channelId, ultrasonic) {
                            return base.Put(contract.device.io.input.ultrasonic(deviceId, channelId), ultrasonic);
                        }
                    }
                },
                Output:
                {
                    List: function (deviceId, pageIndex, pageSize, search) {
                        var result = base.Get(contract.device.io.output.list(deviceId), getParams(this.List, 1))
                        return Convert(result, new IOOutputChannelList());
                    },
                    Get: function (deviceId, outputId) {
                        var result = base.Get(contract.device.io.output.item(deviceId, outputId));
                        return Convert(result, new IOOutputChannel());
                    },
                    Create: function (deviceId, output) {
                        return base.Post(contract.device.io.output.list(deviceId), output);
                    },
                    Set: function (deviceId, output) {
                        return base.Put(contract.device.io.output.item(deviceId, output.Id), output);
                    },
                    Delete: function (deviceId, outputId) {
                        return base.Delete(contract.device.io.output.item(deviceId, outputId));
                    },
                    Status: function (deviceId, outputId) {
                        var result = base.Get(contract.device.io.output.status(deviceId, outputId));
                        return Convert(result, new IOOutputChannelStatus());
                    }
                }
            },
            Network:
            {
                List: function (deviceId, pageIndex, pageSize) {
                    var result = base.Get(contract.device.network.list(deviceId), getParams(this.List, 1));
                    return Convert(result, new NetworkInterfaceList());
                },
                Get: function (deviceId, networkId) {
                    var result = base.Get(contract.device.network.item(deviceId, networkId));
                    return Convert(result, new NetworkInterface());
                },
                Create: function (deviceId, network) {
                    return base.Post(contract.device.network.list(deviceId), network);
                },
                Set: function (deviceId, network) {
                    return base.Put(contract.device.network.item(deviceId, network.Id), network);
                },
                Delete: function (deviceId, networkId) {
                    return base.Delete(contract.device.network.item(deviceId, networkId));
                },
                Status: function (deviceId, networkId) {
                    var result = base.Get(contract.device.network.status(deviceId, networkId));
                    return Convert(result, new NetworkInterfaceStatus());
                },
                Diagnostics:
                {
                    Get: function (deviceId, networkId, sessionId, bandwidth, duration) {
                        var result = base.Get(contract.device.network.diagnostics(device, networkId, sessionId), getParams(this.Diagnostics, 3));
                        return Convert(result, new BitrateStatus());
                    }
                }
            },
            Storage:
            {
                List: function (deviceId, pageIndex, pageSize, search) {
                    var result = base.Get(contract.device.storage.list(deviceId), getParams(this.List, 1));
                    return Convert(result, new StorageMediumList());
                },
                Get: function (deviceId, storageId) {
                    var result = base.Get(contract.device.storage.item(deviceId, storageId));
                    return Convert(result, new StorageMedium());
                },
                Create: function (deviceId, storage) {
                    return base.Post(contract.device.storage.list(deviceId), storage);
                },
                Set: function (deviceId, storage) {
                    return base.Put(contract.device.storage.item(deviceId, storage.Id), storage);
                },
                Delete: function (deviceId, storageId) {
                    return base.Delete(contract.device.storage.item(deviceId, storageId));
                },
                Status: function (deviceId, storageId) {
                    var result = base.Get(contract.device.storage.status(deviceId, storageId));
                    return Convert(result, new StorageMediumStatus());
                }
            },
            Heartbeat: function (deviceId, beginTime, endTime, index, size) {
                var result = base.Get(contract.device.heartbeat(deviceId), getParams(this.Heartbeat, 1));
                return Convert(result, new HeartbeatLogList());
            },
            Acquisition:
            {
                Get: function (deviceId) {
                    var result = base.Get(contract.device.acq(deviceId));
                    return Convert(result, new ServerInformation());
                },
                Put: function (deviceId, acq) {
                    return base.Put(contract.device.acq(deviceId), acq);
                }
            },
            Sync: function (deviceId, source) {
                return base.Post(contract.device.sync(deviceId), null, getParams(this.Sync, 1));
            },
            RFID:
            {
                List: function (deviceId, pageIndex, pageSize) {
                    var result = base.Get(contract.device.rfid.list(deviceId), getParams(this.List, 1));
                    return Convert(result, new RFIDAntennaList());
                },
                Create: function (deviceId, rfid) {
                    return base.Post(contract.device.rfid.list(deviceId), rfid);
                },
                Get: function (deviceId, id) {
                    var result = base.Get(contract.device.rfid.item(deviceId, id));
                    return Convert(result, new RFIDAntenna());
                },
                Set: function (deviceId, rfid) {
                    return base.Put(contract.device.rfid.item(deviceId, rfid.Id), rfid);
                },
                Delete: function (deviceId, id) {
                    return base.Delete(contract.device.rfid.item(deviceId, id));
                }
            },
            ATM:
            {
                Shield:
                {
                    List: function (deviceId, pageIndex, pageSize) {
                        var result = base.Get(contract.device.atm.shield.list(deviceId), getParams(this.List, 1));
                        return Convert(result, new ATMShieldList());
                    },
                    Create: function (deviceId, atmShield) {
                        return base.Post(contract.device.atm.shield.list(deviceId), atmShield);
                    },
                    Get: function (deviceId, shieldId) {
                        var result = base.Get(contract.device.atm.shield.item(deviceId, shieldId));
                        return Convert(result, new ATMAddNotes());
                    },
                    Set: function (device, shield) {
                        return base.Put(contract.device.atm.shield.item(device, shield.Id), shield);
                    },
                    Delete: function (deviceId, shieldId) {
                        return base.Delete(contract.device.atm.shield.item(deviceId, shieldId));
                    }
                },
                AddNote:
                {
                    List: function (deviceId, pageIndex, pageSize) {
                        var result = base.Get(contract.device.atm.addNote.list(deviceId), getParams(this.List, 1));
                        return Convert(result, new ATMAddNotesList());
                    },
                    Create: function (deviceId, atmAddNote) {
                        return base.Post(contract.device.atm.addNote.list(deviceId), atmAddNote);
                    },
                    Get: function (deviceId, noteId) {
                        var result = base.Get(contract.device.atm.addNote.item(deviceId, noteId));
                        return Convert(result, new ATMAddNotes());
                    },
                    Set: function (deviceId, atmAddNote) {
                        return base.Put(contract.device.atm.addNote.item(deviceId, atmAddNote.Id), atmAddNote);
                    },
                    Delete: function (deviceId, noteId) {
                        return base.Delete(contract.device.atm.addNote.item(deviceId, noteId));
                    }
                }
            }
        };

    this.RFID =
        {
            Card:
            {
                List: function (pageIndex, pageSize) {
                    var result = base.Get(contract.rfid.list(), getParams(this.List));
                    return Convert(result, new RFIDCardList());
                },
                Create: function (card) {
                    return base.Post(contract.rfid.list(), card);
                },
                Get: function (cardId) {
                    var result = base.Get(contract.rfid.item(cardId));
                    return Convert(result, new RFIDCard());
                },
                Set: function (card) {
                    return base.Put(contract.rfid.item(card.Id), card);
                },
                Delete: function (cardId) {
                    return base.Delete(contract.rfid.item(cardId));
                }
            },
            Group:
            {
                List: function (pageIndex, pageSize) {
                    var result = base.Get(contract.rfid.group.list(), getParams(this.List));
                    return Convert(result, new RFIDGroupList());
                },
                Create: function (group) {
                    return base.Post(contract.rfid.group.list(), group);
                },
                Get: function (groupId) {
                    var result = base.Get(contract.rfid.group.item(groupId));
                    return Convert(result, new RFIDGroup());
                },
                Set: function (group) {
                    return base.Put(contract.rfid.group.item(group.Id), group);
                },
                Delete: function (groupId) {
                    return base.Delete(contract.rfid.group.item(groupId));
                },
                Card:
                {
                    List: function (groupId, inversed) {
                        var result = base.Get(contract.rfid.group.card.list(groupId), getParams(this.List, 1));
                        return Convert(result, new RFIDCardList());
                    },
                    Create: function (groupId, card) {
                        return base.Post(contract.rfid.group.card.list(groupId), card);
                    },
                    Get: function (groupId, cardId) {
                        var result = base.Get(contract.rfid.group.card.item(groupId, cardId));
                        return Convert(result, new RFIDCard());
                    },
                    Delete: function (groupId, cardId) {
                        return base.Delete(contract.rfid.group.card.item(groupId, cardId));
                    }
                },
                Antenna:
                {
                    List: function (groupId) {
                        var result = base.Get(contract.rfid.group.antenna.list(groupId));
                        return Convert(result, new RFIDGroupPriorityList());
                    },
                    Create: function (groupId, rfidGroupPriority) {
                        return base.Post(contract.rfid.group.antenna.list(groupId), rfidGroupPriority);
                    },
                    Get: function (groupId, antennaId) {
                        var result = base.Get(contract.rfid.group.antenna.item(groupId, antennaId));
                        return Convert(result, new RFIDGroupPriority());
                    },
                    Set: function (groupId, rfidGroupPriority) {
                        return base.Put(contract.rfid.group.antenna.item(groupId, priority.RFIDAntennaId), priority);
                    },
                    Delete: function (groupId, antennaId) {
                        return base.Delete(contract.rfid.group.antenna.item(groupId, antennaId));
                    }
                }
            },
            Antenna:
            {
                List: function () {
                    var result = base.Get(contract.rfid.antenna.list());
                    return Convert(result, new RFIDAntennaList());
                },
                Get: function (id) {
                    var result = base.Get(contract.rfid.antenna.item(id));
                    return Convert(result, new RFIDAntenna());
                },
                Set: function (rfidAntenna) {
                    return base.Put(contract.rfid.antenna.item(rfidAntenna.Id), rfidAntenna);
                },
                Group:
                {
                    List: function (antennaId) {
                        var result = base.Get(contract.rfid.antenna.group.list(antennaId));
                        return Convert(result, new RFIDGroupPriorityList());
                    },
                    Create: function (antennaId, rfidGroupPriority) {
                        return base.Post(contract.rfid.antenna.group.list(rfidGroupPriority.RFIDAntennaId), rfidGroupPriority);
                    },
                    Get: function (antennaId, groupId) {
                        var result = base.Get(contract.rfid.antenna.group.item(antennaId, groupId));
                        return Convert(result, new RFIDGroupPriority());
                    },
                    Set: function (rfidGroupPriority) {
                        return base.Put(contract.rfid.antenna.group.item(rfidGroupPriority.RFIDAntennaId, rfidGroupPriority.RFIDGroupId), rfidGroupPriority);
                    },
                    Delete: function (antennaId, groupId) {
                        return base.Delete(contract.rfid.antenna.group.item(antennaId, groupId));
                    }
                }
            }
        };


    this.Map =
        {
            List: function (pageIndex, pageSize) {
                var result = base.Get(contract.map.list(), getParams(this.List, 0));
                return Convert(result, new MapList());
            },
            Create: function (mapStream, contentType, mapFormat, name, comment) {
                return base.PostStream(contract.map.list(), mapStream, contentType, getParams(this.Create, 2));
            },
            Get: function (mapId) {
                var result = base.Get(contract.map.item(mapId));
                return Convert(result, new Map());
            },
            Set: function (map) {
                return base.Put(contract.map.item(map.Id), map);
            },
            Delete: function (mapId) {
                return base.Delete(contract.map.item(mapId));
            },
            Data: function (mapId) {
                //var result = base.Get(contract.map.data(mapId));
                return contract.map.data(mapId);
            },
            Point:
            {
                List: function (mapId, pageIndex, pageSize) {
                    var result = base.Get(contract.map.point.list(mapId), getParams(this.List, 1));
                    return Convert(result, new MapItemList());
                },
                Create: function (mapId, point) {
                    return base.Post(contract.map.point.list(mapId), point)
                },
                Get: function (mapId, pointId) {
                    var result = base.Get(contract.map.point.item(mapId, pointId));
                    return Convert(result, new MapItem());
                },
                Delete: function (mapId, pointId) {
                    return base.Delete(contract.map.point.item(mapId, pointId));
                },
                Set: function (mapId, point) {
                    return base.Put(contract.map.point.item(mapId, point.Id), point);
                }
            }

        };
    this.Linkage =
        {
            List: function (pageIndex, pageSize) {
                var result = base.Get(contract.linkage.list(), getParams(this.List, 0));
                return Convert(result, new LinkageTemplateList());
            },
            Create: function (linkage) {
                return base.Post(contract.linkage.list(), linkage);
            },
            Get: function (linkageId) {
                var result = base.Get(contract.linkage.item(linkageId));
                return Convert(result, new LinkageTemplate());
            },
            Set: function (linkage) {
                return base.Put(contract.linkage.item(linkage.Id), linkage);
            },
            Delete: function (linkageId) {
                return base.Delete(contract.linkage.item(linkageId));
            }
        };
    this.Event =
        {
            Record: function (componentId, eventType, beginTime, endTime, pageIndex, pageSize) {
                var params = getParams(this.Record, 0);
                if (!beginTime) {
                    var begin = new Date();
                    begin.setHours(0, 0, 0);

                    beginTime = begin.toISOString();
                    params["beginTime"] = beginTime;
                }
                if (!endTime) {
                    var end = new Date();
                    endTime = end.toISOString();
                    params["endTime"] = endTime;
                }
                var result = base.Get(contract.event.records(), params);
                return Convert(result, new EventRecordList());
            },
            Linkage:
            {
                List: function (componentId, eventType, eventState, pageIndex, pageSize, search) {
                    var result = base.Get(contract.event.linkage.list(), getParams(this.List, 0));
                    return Convert(result, new EventLinkageList())
                },
                Create: function (linkage) {
                    return base.Post(contract.event.linkage.list(), linkage);
                },
                Get: function (linkageId, type, state) {
                    var result = base.Get(contract.event.linkage.item(linkageId, type, state));
                    return Convert(result, new EventLinkage());
                },
                Set: function (linkage, type, state) {
                    return base.Put(contract.event.linkage.item(linkage.ComponentId, type, state), linkage);

                },
                Delete: function (linkageId, type, state) {
                    return base.Delete(contract.event.linkage.item(linkageId, type, state));
                }
            },
            FaceDetect: {
                Records: {
                    List: function (beginTime, endTime, componentId, eventType, sex, age, faceSetId, faceAppendDataId, pageIndex, pageSize) {
                        /// <summary>查询人脸识别事件记录</summary>
                        /// <param name="beginTime" type="DateTime">开始时间 N</param>
                        /// <param name="endTime" type="DateTime">结束时间 N</param>
                        /// <param name="componentId" type="Id">设备单元唯一标识符 Y</param>
                        /// <param name="eventType" type="EventType">事件类型 Y</param>
                        /// <param name="sex" type="Sex">性别 Y</param>
                        /// <param name="age" type="Int32">年龄	Y</param>
                        /// <param name="faceSetId" type="String">人脸比对库ID Y</param>
                        /// <param name="faceAppendDataId" type="String">比对库人脸ID Y</param>
                        /// <param name="pageIndex" type="Int32">页码[1-n] Y</param>
                        /// <param name="pageSize" type="Int32">分页大小[1-100]	Y</param>
                        /// <returns type="FaceDetectEventRecordList">人脸识别记录列表</returns>
                        var result = base.Get(contract.event.facedetect.records.list(), getParams(this.List, 0));
                        return Convert(result, new FaceDetectEventRecordList());
                    },
                    Get: function (recordId) {
                        /// <summary>查询指定ID的人脸识别的事件记录</summary>
                        /// <param name="recordId" type="Id">人脸识别记录Id</param>
                        /// <returns type="FaceDetectEventRecord">人脸识别记录</returns>
                        var result = base.Get(contract.event.facedetect.records.item(recordId));
                        return Convert(result, new FaceDetectEventRecord());
                    }
                }
            }
        };
    this.Notice =
        {
            List: function (classification, status, noticeType, sender, userId, pageIndex, pageSize) {
                var result = base.Get(contract.notice.list(), getParams(this.List));
                return Convert(result, new NoticeList());
            },
            Get: function (id) {
                var result = base.Get(contract.notice.item(id));
                return Convert(result, new Notice());
            },
            Read: function (id) {
                return base.Post(contract.notice.read(id));
            }
        };

    this.Platforms = {
        List: function (pageIndex, pageSize) {
            var result = base.Get(contract.platforms.list(), getParams(this.List, 0));
            return Convert(result, new PlatformList());
        },
        Get: function (id) {
            var result = base.Get(contract.platforms.item(id));
            return Convert(result, new Platform());
        },
        Create: function (platform) {
            return base.Post(contract.platforms.list(), platform);
        },
        Set: function (platform) {
            return base.Put(contract.platforms.item(platform.Id), platform);
        },
        Delete: function (id) {
            return base.Delete(contract.platforms.item(id));
        },
        Capabilities: function (pageIndex, pageSize) {
            var result = base.Get(contract.platforms.capabilities(), getParams(this.List, 0));
            return Convert(result, new PlatformCapabilitiesList());
        },
        Device: {
            List: function (platformId, pageIndex, pageSize, classification) {
                var result = base.Get(contract.platforms.device.list(platformId), getParams(this.List, 1));
                return Convert(result, new DeviceList());
            },
            Sync: function (platformId) {
                return base.Post(contract.platforms.device.sync(platformId));
            },
            Get: function (platformId, deviceId) {
                var result = base.Get(contract.platforms.device.item(platformId, deviceId));
                return Convert(result, new Device());
            },
            Delete: function (platformId, deviceId) {
                return base.Delete(contract.platforms.device.item(platformId, deviceId));
            }
        }
    },
        this.GIS = {
            Map: {
                List: function (pageIndex, pageSize) {
                    var result = base.Get(contract.gis.map.list(), getParams(this.List, 0));
                    return Convert(result, new GISMapList());
                },
                Create: function (map) {
                    return base.Post(contract.gis.map.list(), map);
                },
                Get: function (id) {
                    var result = base.Get(contract.gis.map.item(id));
                    return Convert(result, new GISMap());
                },
                Set: function (map) {
                    return base.Put(contract.gis.map.item(map.Id), map);
                },
                Delete: function (id) {
                    return base.Delete(contract.gis.map.item(id));
                },
                Layer: {
                    List: function (mapId, pageIndex, pageSize, parentLayerId) {
                        var result = base.Get(contract.gis.map.layers.list(mapId), getParams(this.List, 1));
                        return Convert(result, new GISMapLayerList());
                    },
                    Create: function (mapId, layer) {
                        return base.Post(contract.gis.map.layers.list(mapId), layer);
                    },
                    Get: function (mapId, layerId) {
                        var result = base.Get(contract.gis.map.layers.item(mapId, layerId));
                        return Convert(result, new GISMapLayer());
                    },
                    Set: function (mapId, layer) {
                        return base.Put(contract.gis.map.layers.item(mapId, layer.Id), layer);
                    },
                    Delete: function (mapId, layerId) {
                        return base.Delete(contract.gis.map.layers.item(mapId, layerId));
                    },
                },
                Item: {
                    List: function (mapId, itemId, pageIndex, pageSize, parentLayerId, GPSId, hasGPSId, vehiclePlateId, hasVehiclePlateId, faceRecognitionId, hasFaceRecognitionId) {
                        var result = base.Get(contract.gis.map.items.list(mapId), getParams(this.List, 1));
                        return Convert(result, new GISMapItemList());
                    },
                    Create: function (mapId, item) {
                        return base.Post(contract.gis.map.items.list(mapId), item);
                    },
                    Get: function (mapId, itemId) {
                        var result = base.Get(contract.gis.map.items.item(mapId, itemId));
                        return Convert(result, new GISMapItem());
                    },
                    Set: function (mapId, item) {
                        return base.Put(contract.gis.map.items.item(mapId, item.Id), item);
                    },
                    Delete: function (mapId, itemId) {
                        return base.Delete(contract.gis.map.items.item(mapId, itemId));
                    },
                }
            }
        }

    var contract =
        {
            version: baseUri + "/System/Version",
            device:
            {
                list: function () {
                    return baseUri + "/System/Devices";
                },
                item: function (deviceId) {
                    return this.list() + "/" + deviceId;
                },
                del: function (deviceId) {
                    return this.item(deviceId) + "/Delete";
                },
                details: function (deviceId) {
                    return this.item(deviceId) + "/Details";
                },
                status: function (deviceId) {
                    return this.item(deviceId) + "/Status";
                },
                capabilities: function (classification) {
                    return this.list() + "/Classifications/" + classification + "/Capabilities";
                },
                search: function (id) {
                    return this.list() + "/Searching/" + id;
                },
                information: function (deviceId) {
                    return this.item(deviceId) + "/Information";
                },
                wifi: function (deviceId) {
                    return this.item(deviceId) + "/Network/WiFi";
                },
                face: {
                    analysisImage: function (deviceId) {
                        return contract.device.item(deviceId) + "/Face/AnalysisImage";
                    }
                },
                facecontrasts: {
                    faces: {
                        search: function (deviceId) {
                            return contract.device.item(deviceId) + "/FaceContrasts/Faces/Search";
                        }
                    },
                    pictures: {
                        data: function (deviceId, pictureId) {
                            return contract.device.item(deviceId) + "/FaceContrasts/Pictures/" + pictureId + "/Data";
                        }
                    }
                },
                facesets: {
                    list: function (deviceId) {
                        return contract.device.item(deviceId) + "/FaceSets"
                    },
                    item: function (deviceId, facesetsId) {
                        return this.list(deviceId) + "/" + facesetsId;
                    },
                    faces: {
                        list: function (deviceId, facesetsId) {
                            return contract.device.facesets.item(deviceId, facesetsId) + "/Faces";
                        },
                        item: function (deviceId, facesetsId, facesId) {
                            return this.list(deviceId, facesetsId) + "/" + facesId;
                        },
                        picturedata: function (deviceId, facesetsId, facesId) {
                            return this.item(deviceId, facesetsId, facesId) + "/" + "PictureData";
                        },
                        search: function (deviceId) {
                            return contract.device.item(deviceId) + "/FaceSets/Faces/Search"
                        }
                    }
                },
                video:
                {
                    base: function (deviceId) {
                        return contract.device.item(deviceId) + "/Video";
                    },
                    input:
                    {
                        list: function (deviceId) {
                            return contract.device.video.base(deviceId) + "/Inputs/Channels";
                        },
                        item: function (deviceId, channelId) {
                            return this.list(deviceId) + "/" + channelId;
                        },
                        del: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Delete";
                        },
                        status: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Status";
                        },
                        association:
                        {
                            item: function (deviceId, channelId) {
                                return contract.device.video.input.item(deviceId, channelId) + "/Association";
                            },
                            del: function (deviceId, channelId) {
                                return this.item(deviceId, channelId) + "/Delete";
                            }
                        },
                        effect: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Effect";
                        },
                        stream:
                        {
                            list: function (deviceId, channelId) {
                                return contract.device.video.input.item(deviceId, channelId) + "/Streaming";
                            },
                            item: function (deviceId, channelId, streamId) {
                                return this.list(deviceId, channelId) + "/" + streamId;
                            },
                            status: function (deviceId, channelId, streamId) {
                                return this.item(deviceId, channelId, streamId) + "/Status";
                            },
                            networkAssociation: function (deviceId, channelId, streamId) {
                                return this.item(deviceId, channelId, streamId) + "/NetworkAssociation";
                            },
                            del: function (deviceId, channelId, streamId) {
                                return this.networkAssociation(deviceId, channelId, streamId) + "/Delete";
                            },
                            picture: function (deviceId, channelId, pictureId) {
                                return this.item(deviceId, channelId, pictureId) + "/Picture";
                            }
                        },
                        decoder: {
                            item: function (deviceId, channelId) {
                                return contract.device.video.input.item(deviceId, channelId) + "/Decoder";
                            },
                            protocol: function (deviceId, channelId) {
                                return this.item(deviceId, channelId) + "/Protocols";
                            }
                        },
                        ptz: {
                            item: function (deviceId, channelId) {
                                return contract.device.video.input.item(deviceId, channelId) + "/PTZ";
                            },
                            direction: function (deviceId, channelId) {
                                return this.item(deviceId, channelId) + "/Direction";
                            },
                            len: function (deviceId, channelId) {
                                return this.item(deviceId, channelId) + "/Lens";
                            },
                            preset: function (deviceId, channelId) {
                                return this.item(deviceId, channelId) + "/Preset";
                            }
                        },
                        diagnostics:
                        {
                            list: function () {
                                return contract.device.list() + "/Diagnostics/Bitrate/Status";
                            },
                            item: function (deviceId, channelId, sessionId) {
                                return contract.device.video.input.item(deviceId, channelId) + "/Diagnostics/Bitrate/Status/" + sessionId;
                            }
                        },
                        previews:
                        {
                            list: function (deviceId, channelId) {
                                return contract.device.video.input.item(deviceId, channelId) + "/Previews";
                            },
                            item: function (deviceId, channelId, previewId) {
                                return this.list(deviceId, channelId) + "/" + previewId;
                            }
                        },
                        playbacks:
                        {
                            list: function (deviceId, channelId) {
                                return contract.device.video.input.item(deviceId, channelId) + "/Playbacks";
                            },
                            item: function (deviceId, channelId, playbackId) {
                                return this.list(deviceId, channelId) + "/" + playbackId;
                            }
                        },
                        pseudoCode: {
                            list: function () {
                                return contract.device.list() + "/Video/Inputs/Channels/PseudoCode";
                            },
                            item: function (code) {
                                return this.list() + "/" + code;
                            }
                        },
                        faceContrasts: {
                            list: function (deviceId, channelId) {
                                return contract.device.video.input.item(deviceId, channelId) + "/FaceContrasts";
                            },
                            item: function (deviceId, channelId, faceContrastsId) {
                                return this.list(deviceId, channelId) + "/" + faceContrastsId;
                            },
                            alert: {
                                base: function (deviceId, channelId) {
                                    return contract.device.video.input.faceContrasts.list(deviceId, channelId) + "/Alert"
                                },
                                schedule: function (deviceId, channelId) {
                                    return this.base(deviceId, channelId) + "/Schedule";
                                },
                                handle: function (deviceId, channelId) {
                                    return this.base(deviceId, channelId) + "/Handle";
                                }
                            }
                        }
                    },
                    output:
                    {
                        list: function (deviceId) {
                            return contract.device.video.base(deviceId) + "/Outputs/Channels";
                        },
                        item: function (deviceId, channelId) {
                            return this.list(deviceId) + "/" + channelId;
                        },
                        del: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Delete";
                        },
                        status: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Status";
                        },
                        displayMode: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/DisplayMode";
                        },
                        capabilities: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Capabilities";
                        },
                        decode:
                        {
                            list: function (deviceId, channelId) {
                                return contract.device.video.output.item(deviceId, channelId) + "/Decoding";
                            },
                            item: function (deviceId, channelId, decodeId) {
                                return this.list(deviceId, channelId) + "/" + decodeId;
                            },
                            del: function (deviceId, channelId, decodeId) {
                                return this.item(deviceId, channelId, decodeId) + "/Delete";
                            },
                            status: function (deviceId, channelId, decodeId) {
                                return this.item(deviceId, channelId, decodeId) + "/Status";
                            },
                            switching: {
                                item: function (deviceId, channelId, decodeId) {
                                    return contract.device.video.output.decode.item(deviceId, channelId, decodeId) + "/Switching";
                                },
                                status: function (deviceId, channelId, decodeId) {
                                    return this.item(deviceId, channelId, decodeId) + "/Status";
                                }
                            }
                        }

                    },
                    decode:
                    {
                        list: function (deviceId) {
                            return contract.device.video.base(deviceId) + "/Decoding/Channels";
                        },
                        item: function (deviceId, channelId) {
                            return this.list(deviceId) + "/" + channelId;
                        },
                        del: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Delete";
                        },
                        status: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Status";
                        }
                    }
                },
                io:
                {
                    base: function (deviceId) {
                        return contract.device.item(deviceId) + "/IO";
                    },
                    input:
                    {
                        list: function (deviceId) {
                            return contract.device.io.base(deviceId) + "/Inputs/Channels";
                        },
                        item: function (deviceId, channelId) {
                            return this.list(deviceId) + "/" + channelId;
                        },
                        del: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Delete";
                        },
                        status: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Status";
                        },
                        //v1.4
                        alert: {
                            base: function (deviceId, channelId) {
                                return contract.device.io.input.item(deviceId, channelId) + "/Alert";
                            },
                            //v1.4
                            schedule: function (deviceId, channelId) {
                                return this.base(deviceId, channelId) + "/Schedule";
                            },
                            //v1.4
                            handle: function (deviceId, channelId) {
                                return this.base(deviceId, channelId) + "/Handle";
                            }
                        },
                        //v1.6
                        ultrasonic: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Ultrasonic";
                        }
                    },
                    output:
                    {
                        list: function (deviceId) {
                            return contract.device.io.base(deviceId) + "/Outputs/Channels";
                        },
                        item: function (deviceId, channelId) {
                            return this.list(deviceId) + "/" + channelId;
                        },
                        del: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Delete";
                        },
                        status: function (deviceId, channelId) {
                            return this.item(deviceId, channelId) + "/Status";
                        }
                    }

                },
                network:
                {
                    list: function (deviceId) {
                        return contract.device.item(deviceId) + "/Network/Interfaces";
                    },
                    item: function (deviceId, networkId) {
                        return this.list(deviceId) + "/" + networkId;
                    },
                    del: function (deviceId, networkId) {
                        return this.item(deviceId, networkId) + "/Delete";
                    },
                    status: function (deviceId, networkId) {
                        return this.item(deviceId, networkId) + "/Status";
                    },
                    diagnostics: function (deviceId, networkId, sessionId) {
                        return this.item(deviceId, networkId) + "/Diagnostics/Bitrate/Status/" + sessionId;
                    }

                },
                acq: function (deviceId) {
                    return this.item(deviceId) + "/Acquisition";
                },
                sync: function (deviceId) {
                    return this.item(deviceId) + "/Synchronization/Video/Inputs/Channels";
                },
                storage:
                {
                    list: function (deviceId) {
                        return contract.device.item(deviceId) + "/Storage/Medium";
                    },
                    item: function (deviceId, storageId) {
                        return this.list(deviceId) + "/" + storageId;
                    },
                    del: function (deviceId, storageId) {
                        return this.item(deviceId, storageId) + "/Delete";
                    },
                    status: function (deviceId, storageId) {
                        return this.item(deviceId, storageId) + "/Status";
                    }
                },
                heartbeat: function (deviceId) {
                    return baseUri + "/System/Logs/Devices/" + deviceId + "/Heartbeats";
                },
                rfid:
                {
                    list: function (deviceId) {
                        return contract.device.item(deviceId) + "/RFID/Antennas";
                    },
                    item: function (deviceId, id) {
                        return this.list(deviceId) + "/" + id;
                    }
                },
                atm:
                {
                    base: function (deviceId) {
                        return contract.device.item(deviceId) + "/ATM";
                    },
                    shield:
                    {
                        list: function (deviceId) {
                            return contract.device.atm.base(deviceId) + "/Shields";
                        },
                        item: function (deviceId, shieldId) {
                            return this.list(deviceId) + "/" + shieldId;
                        }
                    },
                    addNote:
                    {
                        list: function (deviceId) {
                            return contract.device.atm.base(deviceId) + "/AddNotes";
                        },
                        item: function (deviceId, noteId) {
                            return this.list(deviceId) + "/" + noteId;
                        }
                    }
                }
            },
            map:
            {
                list: function () {
                    return baseUri + "/System/Maps"
                },
                item: function (mapId) {
                    return this.list() + "/" + mapId;
                },
                data: function (mapId) {
                    return this.item(mapId) + "/Data";
                },
                point: {
                    list: function (mapId) {
                        return contract.map.item(mapId) + "/Items";
                    },
                    item: function (mapId, id) {
                        return this.list(mapId) + "/" + id;
                    }
                }
            },
            linkage:
            {
                list: function () {
                    return baseUri + "/System/Linkage/Templates";
                },
                item: function (linkageId) {
                    return baseUri + "/System/Linkage/Templates/" + linkageId;
                }
            },
            event:
            {
                records: function () {
                    return baseUri + "/System/Events/Records";
                },
                linkage:
                {
                    list: function () {
                        return baseUri + "/System/Events/Linkages";
                    },
                    item: function (linkageId, type, state) {
                        return baseUri + "/System/Events/Linkages/Components/" + linkageId + "/" + type + "/" + state;
                    }
                },
                facedetect: {
                    base: function () {
                        return baseUri + "/System/Events/FaceDetect";
                    },
                    records: {
                        list: function () {
                            return contract.event.facedetect.base() + "/Records";
                        },
                        item: function (recordId) {
                            return this.list() + "/" + recordId;
                        }
                    }
                }
            },
            notice:
            {
                list: function () {
                    return baseUri + "/System/Notices";
                },
                item: function (id) {
                    return this.list() + "/" + id;
                },
                read: function (id) {
                    return this.item(id) + "/Read";
                }
            },
            rfid:
            {
                list: function () {
                    return baseUri + "/System/RFID/Cards";
                },
                item: function (cardId) {
                    return this.list() + "/" + cardId;
                },
                group:
                {
                    list: function () {
                        return baseUri + "/System/RFID/Groups";
                    },
                    item: function (groupId) {
                        return this.list() + "/" + groupId;
                    },
                    card:
                    {
                        list: function (groupId) {
                            return contract.rfid.group.item(groupId) + "/Cards";
                        },
                        item: function (grouupId, cardId) {
                            return this.list(grouupId) + "/" + cardId;
                        }
                    },
                    antenna:
                    {
                        list: function (groupId) {
                            return contract.rfid.group.item(groupId) + "/Priorites/Antennas";
                        },
                        item: function (groupId, id) {
                            return this.list(groupId) + "/" + id;
                        }
                    }
                },
                antenna:
                {
                    list: function () {
                        return baseUri + "/System/RFID/Antennas";
                    },
                    item: function (id) {
                        return this.list() + "/" + id;
                    },
                    group:
                    {
                        list: function (id) {
                            return contract.rfid.antenna.item(id) + "/Priorites/Groups";
                        },
                        item: function (id, groupId) {
                            return this.list(id) + "/" + groupId;
                        }
                    }
                }
            },
            platforms: {
                list: function () {
                    return baseUri + "/System/Platforms";
                },
                item: function (id) {
                    return this.list() + "/" + id;
                },
                capabilities: function () {
                    return this.list() + "/Capabilities";
                },
                device: {
                    list: function (platformId) {
                        return contract.platforms.item(platformId) + "/Devices";
                    },
                    sync: function (platformId) {
                        return this.list(platformId) + "/Sync";
                    },
                    item: function (platformId, deviceId) {
                        return this.list(platformId) + "/" + deviceId;
                    }
                }
            },
            gis: {
                map: {
                    list: function () {
                        return baseUri + "/System/GIS/Maps";
                    },
                    item: function (id) {
                        return this.list() + "/" + id;
                    },
                    layers: {
                        list: function (mapId) {
                            return contract.gis.map.item(mapId) + "/Layers";
                        },
                        item: function (mapId, layerId) {
                            return this.list(mapId) + "/" + layerId;
                        }
                    },
                    items: {
                        list: function (mapId) {
                            return contract.gis.map.item(mapId) + "/Items";
                        },
                        item: function (mapId, itemId) {
                            return this.list(mapId) + "/" + itemId;
                        }
                    }
                }
            }
        };
}