!function () {
    if (!window.WebVideoCtrl) {
        var e = function () {
            var h = "100%", f = "100%", u = "", c = "";
            oSecurityCap = {};
            var p = {
                szContainerID: szAESKey = "",
                szColorProperty: "",
                szOcxClassId: "clsid:FDF0038A-CF64-4634-81AB-80F0A7946D6C",
                szMimeTypes: "application/webvideo-plugin-kit",
                szBasePath: "",
                iWndowType: 1,
                iPlayMode: 2,
                bWndFull: !0,
                iPackageType: 2,
                bDebugMode: !1,
                bNoPlugin: !0,
                cbSelWnd: null,
                cbDoubleClickWnd: null,
                cbEvent: null,
                cbRemoteConfig: null,
                cbInitPluginComplete: null,
                proxyAddress: null
            },
                y = null, P = 0, s = !1, I = [], m = [], t = null, S = null, C = null, v = null, o = this, g = null, x = 1, d = "IPCamera", D = "IPDome", z = "IPZoom";
            window.GetSelectWndInfo = function (e) {
                if (Z()) {
                    P = e, (t = []).push("<RealPlayInfo>"), t.push("<SelectWnd>" + e + "</SelectWnd>"), t.push("</RealPlayInfo>"), p.cbSelWnd && p.cbSelWnd(v.loadXML(t.join("")))
                }
                else {
                    var t, n = v.loadXML(e);
                    if (0 < re.$XML(n).find("SelectWnd", !0).length) P = parseInt(re.$XML(n).find("SelectWnd").eq(0).text(), 10), null === g && R(), (t = []).push("<RealPlayInfo>"), t.push("<SelectWnd>" + P + "</SelectWnd>"), t.push("</RealPlayInfo>"), p.cbSelWnd && p.cbSelWnd(v.loadXML(t.join("")));
                    else if (0 < re.$XML(n).find("DoubleClickWnd", !0).length) {
                        var r = parseInt(re.$XML(n).find("DoubleClickWnd").eq(0).text(), 10);
                        s = "0" === re.$XML(n).find("IsFullScreen").eq(0).text(), p.cbDoubleClickWnd && p.cbDoubleClickWnd(r, s)
                    }
                }
            },
                window.WindowDblClick = function (e) {
                    s = e, p.cbDoubleClickWnd && p.cbDoubleClickWnd(P, s)
                },
                window.ZoomInfoCallback = function (e) {
                    var t = o.findWndIndexByIndex(P);
                    if (-1 != t) {
                        var n = m[t];
                        if (-1 != (t = o.findDeviceIndexByIP(n.szDeviceIdentify))) {
                            var r = I[t];
                            r.oProtocolInc.set3DZoom(r, n, e, {
                                success: function (e) { },
                                error: function () { }
                            })
                        }
                    }
                },
                window.PluginEventHandler = function (e, t, n) {
                    Z() ? p.cbEvent && p.cbEvent(e, t, n) : (0 == t || 2 == t ? o.I_Stop(e) : 21 == t ? o.I_StopRecord(e) : 3 == t && o.I_StopVoiceTalk(), p.cbEvent && p.cbEvent(t, e, n))
                },
                window.GetHttpInfo = function (e, t, n) {
                    K.prototype.processCallback(e, t)
                },
                window.RemoteConfigInfo = function (e) {
                    p.cbRemoteConfig && p.cbRemoteConfig(e)
                },
                window.KeyBoardEventInfo = function (e) {
                    100 === parseInt(e, 10) && (s = !1, p.cbDoubleClickWnd && p.cbDoubleClickWnd(P, s))
                };
            var T = function () {
                if (p.bDebugMode) {
                    var e = b(arguments);
                    t._alert(e)
                }
            },
                b = function () {
                    for (var e = arguments[0], t = 1; t < arguments.length; t++)
                        e = e.replace("%s", arguments[t]);
                    return e
                },
                A = function (e) {
                    var t = e.indexOf(":");
                    return -1 < t ? e.substring(0, t) : e
                },
                M = function (e) {
                    return void 0 === e
                },
                a = function (e) {
                    return "[object Object]" === Object.prototype.toString.call(e)
                },
                L = function (e, t) {
                    var n = "", r = {
                        type: "GET",
                        async: !1,
                        success: function (e) {
                            e && e.Token && (n = e.Token.value)
                        }
                    };
                    return o.I_SendHTTPRequest(t, "ISAPI/Security/token?format=json", r), n
                },
                l = function (e, t, n) {
                    o.I_GetSecurityVersion(e, {
                        success: function (e) {
                            oSecurityCap.iKeyIterateNum = parseInt(re.$XML(e).find("keyIterateNum").eq(0).text(), 10), oSecurityCap.oIrreversibleEncrypt = {
                                bSupport: "true" === re.$XML(e).find("isIrreversible").eq(0).text(),
                                salt: re.$XML(e).find("salt").eq(0).text()
                            }, szAESKey = v.strToAESKey(t, n)
                        }
                    })
                },
                q = function () {
                    var e = "";
                    if (v.browser().msie) e = "<object classid='" + p.szOcxClassId + "' codebase='' standby='Waiting...' id='" + u + "' width='" + h + "' height='" + f + "' align='center' ><param name='wndtype' value='" + p.iWndowType + "'><param name='playmode' value='" + p.iPlayMode + "'><param name='colors' value='" + p.szColorProperty + "'></object>";
                    else
                        for (var t = navigator.mimeTypes.length, n = 0; n < t; n++)
                            navigator.mimeTypes[n].type.toLowerCase() == p.szMimeTypes && (e = "<embed align='center' type='" + p.szMimeTypes + "' width='" + h + "' height='" + f + "' name='" + c + "' wndtype='" + p.iWndowType + "' playmode='" + p.iPlayMode + "' colors='" + p.szColorProperty + "'>");
                    return e
                },
                R = function () {
                    if (!Z() && null !== y) {
                        var e = y.HWP_GetLocalConfig();
                        g = v.loadXML(e)
                    }
                },
                w = function (s) {
                    o.I_GetDeviceInfo(s.szIP, {
                        success: function (e) {
                            s.szDeviceType = re.$XML(e).find("deviceType").eq(0).text()
                        }
                    }), o.I_GetAnalogChannelInfo(s.szIP, {
                        success: function (e) { }
                    }), o.I_GetAudioInfo(s.szIP, {
                        success: function (e) {
                            var t = re.$XML(e).find("audioCompressionType", !0);
                            if (0 < t.length) {
                                var n = re.$XML(t).eq(0).text(), r = 0;
                                "G.711ulaw" == n ? r = 1 : "G.711alaw" == n ? r = 2 : "G.726" == n ? r = 3 : "MP2L2" == n || "MPEL2" == n ? r = 4 : "G.722.1" == n ? r = 0 : "AAC" == n ? r = 5 : "PCM" == n && (r = 6), s.iAudioType = r
                            }
                            "" !== re.$XML(e).find("audioBitRate").eq(0).text() ? s.m_iAudioBitRate = 1e3 * parseInt(re.$XML(e).find("audioBitRate").eq(0).text(), 10) : s.m_iAudioBitRate = 0, "" !== re.$XML(e).find("audioSamplingRate").eq(0).text() ? s.m_iAudioSamplingRate = 1e3 * parseInt(re.$XML(e).find("audioSamplingRate").eq(0).text(), 10) : s.m_iAudioSamplingRate = 0
                        }
                    })
                },
                G = function (n) {
                    n.bSupportWebsocket = !1, n.bSupportSubStreamPlayback = !1, n.oProtocolInc.getSystemCapa(n, {
                        success: function (e) {
                            var t = re.$XML(e).find("NetworkCap").eq(0).find("isSupportWebsocket", !0);
                            0 < t.length && (n.bSupportWebsocket = "true" === re.$XML(e).find("NetworkCap").eq(0).find("isSupportWebsocket").eq(0).text()), n.bSupportWebsocket = !0, 0 < (t = re.$XML(e).find("RacmCap").eq(0).find("isSupportMainAndSubRecord", !0)).length && (n.bSupportSubStreamPlayback = "true" === re.$XML(e).find("RacmCap").eq(0).find("isSupportMainAndSubRecord").eq(0).text()), n.bSupportSubStreamPlayback = !0
                        }
                    })
                },
                W = function (e) {
                    var t = null;
                    if (k(e)) (t = X(e)).iRtspPort, t.iDevicePort;
                    else {
                        for (var n = H(e), r = !1, s = 0; s < n.length; s++)
                            if (n[s].ipv4 == e.szIP || n[s].ipv6 == e.szIP) {
                                r = !0;
                                break
                            }
                        r ? t = X(e) : -1 == (t = _(e)).iRtspPort && -1 == t.iDevicePort && (t = X(e)), t.iRtspPort, t.iHttpPort, t.iDevicePort
                    }
                    return t
                },
                X = function (e) {
                    var s = -1, o = -1, i = -1;
                    return e.oProtocolInc.getPortInfo(e, {
                        async: !1,
                        success: function (e) {
                            var t = re.$XML(e).find("AdminAccessProtocol", !0);
                            s = 554;
                            for (var n = 0, r = t.length; n < r; n++)
                                "rtsp" === re.$XML(t).eq(n).find("protocol").eq(0).text().toLowerCase() && (s = parseInt(re.$XML(t).eq(n).find("portNo").eq(0).text(), 10)), "http" === re.$XML(t).eq(n).find("protocol").eq(0).text().toLowerCase() && (o = parseInt(re.$XML(t).eq(n).find("portNo").eq(0).text(), 10)), "dev_manage" === re.$XML(t).eq(n).find("protocol").eq(0).text().toLowerCase() && (i = parseInt(re.$XML(t).eq(n).find("portNo").eq(0).text(), 10))
                        },
                        error: function () {
                            i = o = s = -1
                        }
                    }), {
                            iRtspPort: s,
                            iHttpPort: o,
                            iDevicePort: i
                        }
                },
                _ = function (e) {
                    var s = -1, o = -1, i = -1;
                    return e.oProtocolInc.getUPnPPortStatus(e, {
                        async: !1,
                        success: function (e) {
                            for (var t = re.$XML(e).find("portStatus", !0), n = 0, r = t.length; n < r; n++)
                                "rtsp" == re.$XML(t).eq(n).find("internalPort").eq(0).text().toLowerCase() && (s = parseInt(re.$XML(t).eq(n).find("externalPort").eq(0).text(), 10)), "http" == re.$XML(t).eq(n).find("internalPort").eq(0).text().toLowerCase() && (o = parseInt(re.$XML(t).eq(n).find("externalPort").eq(0).text(), 10)), "admin" == re.$XML(t).eq(n).find("internalPort").eq(0).text().toLowerCase() && (i = parseInt(re.$XML(t).eq(n).find("externalPort").eq(0).text(), 10))
                        },
                        error: function () {
                            i = o = s = -1
                        }
                    }), {
                            iRtspPort: s,
                            iHttpPort: o,
                            iDevicePort: i
                        }
                },
                H = function (t) {
                    var r = [];
                    return t.oProtocolInc.getNetworkBond(t, {
                        async: !1,
                        success: function (e) {
                            "true" == re.$XML(e).find("enabled").eq(0).text() ? r.push({
                                ipv4: re.$XML(e).find("ipAddress").eq(0).text(),
                                ipv6: re.$XML(e).find("ipv6Address").eq(0).text()
                            }) : t.oProtocolInc.getNetworkInterface(t, {
                                async: !1,
                                success: function (e) {
                                    for (var t = 0, n = re.$XML(e).find("NetworkInterface", !0).length; t < n; t++) {
                                        r.push({
                                            ipv4: re.$XML(e).find("ipAddress").eq(0).text(),
                                            ipv6: re.$XML(e).find("ipv6Address").eq(0).text()
                                        });
                                        break
                                    }
                                },
                                error: function () { }
                            })
                        },
                        error: function () {
                            t.oProtocolInc.getNetworkInterface(t, {
                                async: !1,
                                success: function (e) {
                                    for (var t = 0, n = re.$XML(e).find("NetworkInterface", !0).length; t < n; t++) {
                                        r.push({
                                            ipv4: re.$XML(e).find("ipAddress").eq(0).text(),
                                            ipv6: re.$XML(e).find("ipv6Address").eq(0).text()
                                        });
                                        break
                                    }
                                },
                                error: function () { }
                            })
                        }
                    }), r
                },
                k = function (e) {
                    var t = !1;
                    return e.oProtocolInc.getPPPoEStatus(e, {
                        async: !1,
                        success: function (e) {
                            t = 0 < re.$XML(e).find("ipAddress", !0).length || 0 < re.$XML(e).find("ipv6Address", !0).length
                        },
                        error: function () {
                            t = !1
                        }
                    }), t
                },
                E = function (t) {
                    // t.oProtocolInc instanceof e && t.oProtocolInc.getSDKCapa(t, {
                    //     async: !1,
                    //     success: function (e) {
                    //         t.oStreamCapa.bObtained = !0, t.oStreamCapa.bSupportShttpPlay = "true" === re.$XML(e).find("isSupportHttpPlay").eq(0).text(), t.oStreamCapa.bSupportShttpPlayback = "true" === re.$XML(e).find("isSupportHttpPlayback").eq(0).text(), t.oStreamCapa.bSupportShttpsPlay = "true" === re.$XML(e).find("isSupportHttpsPlay").eq(0).text(), t.oStreamCapa.bSupportShttpsPlayback = "true" === re.$XML(e).find("isSupportHttpsPlayback").eq(0).text(), t.oStreamCapa.bSupportShttpPlaybackTransCode = "true" === re.$XML(e).find("isSupportHttpTransCodePlayback").eq(0).text(), t.oStreamCapa.bSupportShttpsPlaybackTransCode = "true" === re.$XML(e).find("isSupportHttpsTransCodePlayback").eq(0).text(), 0 < re.$XML(e).find("ipChanBase", !0).length ? t.oStreamCapa.iIpChanBase = parseInt(re.$XML(e).find("ipChanBase").eq(0).text(), 10) : t.oStreamCapa.iIpChanBase = 1
                    //     },
                    //     error: function () {
                    //         t.oStreamCapa.bObtained = !0
                    //     }
                    // })
                },
                Z = function () {
                    if (p.bNoPlugin) {
                        var e = v.browser();
                        return !!(e.chrome && 45 < parseInt(e.version, 10) || e.mozilla && 52 < parseInt(e.version, 10))
                    }
                    return !1
                },
                B = function (e) {
                    var t = location.hostname, n = location.port || "80";
                    return p.proxyAddress && (t = p.proxyAddress.ip, n = p.proxyAddress.port), /^(http|https):\/\/([^\/]+)(.+)$/.test(e) && (e = e.replace(RegExp.$2, t + ":" + n)), v.cookie("webVideoCtrlProxy", RegExp.$2, {
                        raw: !0
                    }), e
                },
                N = function () {
                    return "<requestURL></requestURL>",
                        "<statusCode>4</statusCode>",
                        "<statusString>Invalid Operation</statusString>",
                        "<subStatusCode>notSupport</subStatusCode>",
                        "</ResponseStatus>",
                        v.loadXML("<ResponseStatus><requestURL></requestURL><statusCode>4</statusCode><statusString>Invalid Operation</statusString><subStatusCode>notSupport</subStatusCode></ResponseStatus>")
                };




            this.addDeviceInfo = function () {
                var device = new Object();
                device.bSupportSubStreamPlayback = true;
                device.bSupportWebsocket = true;
                device.bVoiceTalk = false
                device.iAnalogChannelNum = 0
                device.iAudioType = 1
                device.iCGIPort = "80"
                device.iDevicePort = -1
                device.iDeviceProtocol = 1
                device.iHttpPort = "80"
                device.iHttpsPort = -1
                device.iRtspPort = -1
                device.iWSPort = -1
                device.m_iAudioBitRate = -1
                device.m_iAudioSamplingRate = -1
                device.oAuthType = { "192.168.1.112": "" }
                device.oProtocolInc = {
                    CGI: {
                        startWsRealPlay: {

                            channels: "%s%s:%s/%s",
                            zeroChannels: "%s%s:%s/%s"
                        }
                    },
                    startRealPlay: function (t, n) {
                        var e = 100 * n.iChannelID + n.iStreamType, r = "", s = t.szIP;
                        if ("rtsp://" === n.urlProtocol && (s = A(s)), r = n.bZeroChannel ? (Z() && (e = 0), b(n.cgi.zeroChannels, n.urlProtocol, s, n.iPort, e)) : b(n.cgi.channels, n.urlProtocol, s, n.iPort, e), p.proxyAddress && Z()) {
                            v.cookie("webVideoCtrlProxy", s + ":" + n.iPort, {
                                raw: !0
                            }), r = b(n.cgi.zeroChannels, n.urlProtocol, p.proxyAddress.ip, p.proxyAddress.wsport, e);
                            var o = s + ":" + n.iPort;
                            -1 < r.indexOf("?") ? r += "&deviceIdentify=" + o : r += "?deviceIdentify=" + o
                        }
                        var i = function () {
                            var e = new J;
                            e.iIndex = n.iWndIndex, e.szIP = t.szIP, e.iCGIPort = t.iCGIPort, e.szDeviceIdentify = t.szDeviceIdentify, e.iChannelID = n.iChannelID, e.iPlayStatus = 1, m.push(e)
                        },
                            a = $.Deferred();
                        if (Z()) {
                            var u = {};
                            u = t.oAuthType[s] < 2
                                ? { sessionID: t.szAuth }
                                : { token: L(0, t.szDeviceIdentify) },
                                y.JS_Play(r, u, n.iWndIndex).then(function () {
                                    i(), a.resolve()
                                }, function () {
                                    a.reject()
                                })
                        }
                        else
                            0 == y.HWP_Play(r, t.szAuth, n.iWndIndex, "", "") ? (i(), a.resolve()) : a.reject();
                        return a
                    }
                }
                device.oStreamCapa = { bObtained: false, bSupportShttpPlay: false, bSupportShttpPlayback: false, bSupportShttpsPlay: false, bSupportShttpsPlayback: false }
                device.sessionFailed = 0
                device.szAuth = "e1c9986e9bd89ec0fdbc"
                device.szDeviceIdentify = "192.168.1.112_80"
                device.szDeviceType = ""
                device.szHostName = ""
                device.szHttpProtocol = "http=//"
                device.szIP = "192.168.1.112"
                I.push(device);
            };





            this.I_SupportNoPlugin = function () {
                return Z()
            },
                this.I_DestroyWorker = function () {
                    null !== y && Z() && y.JS_DestroyWorker()
                },
                this.I_Resize = function (e, t) {
                    null !== y && Z() && (h = e, f = t, y.JS_Resize(e, t))
                },
                this.I_InitPlugin = function (e, t, n) {
                    if (h = e, f = t, v.extend(p, n), Z()) {
                        var r = v.getDirName();
                        r && ("object" == typeof exports && "undefined" != typeof module || ("function" == typeof define && define.amd ? require([r + "/jsPlugin-1.2.0.min.js"], function (e) {
                            window.JSPlugin = e.JSPlugin, n.cbInitPluginComplete && n.cbInitPluginComplete()
                        }) : v.loadScript(r + "/jsPlugin-1.2.0.min.js", function () {
                            n.cbInitPluginComplete && n.cbInitPluginComplete()
                        }))), M(document.fullScreen) ? M(document.webkitIsFullScreen) ? M(document.mozFullScreen) || document.addEventListener("mozfullscreenchange", function (e) {
                            var t = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || !1;
                            s && !t && window.KeyBoardEventInfo(100)
                        }) : document.addEventListener("webkitfullscreenchange", function (e) {
                            var t = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || !1;
                            s && !t && window.KeyBoardEventInfo(100)
                        }) : document.addEventListener("fullscreenchange", function (e) {
                            var t = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || !1;
                            s && !t && window.KeyBoardEventInfo(100)
                        }), window.addEventListener("unload", function () {
                            null !== y && y.JS_DestroyWorker()
                        })
                    }
                    else n.cbInitPluginComplete && n.cbInitPluginComplete()
                },
                this.I_InsertOBJECTPlugin = function (e) {
                    if (M(e) || (p.szContainerID = e), null == document.getElementById(p.szContainerID))
                        return -1;
                    if (null != document.getElementById(u) || 0 != document.getElementsByName(u).length)
                        return -1;
                    if (Z()) {
                        var t = {
                            szId: e,
                            iType: 1,
                            iWidth: h,
                            iHeight: f,
                            iMaxSplit: 4,
                            iCurrentSplit: p.iWndowType,
                            szBasePath: v.getDirName()
                        },
                            n = p.szColorProperty;
                        if ("" != n) {
                            for (var r = {}, s = n.split(";"), o = "", i = 0, a = s.length; i < a; i++)
                                -1 < (o = s[i]).indexOf("sub-background") ? r.background = "#" + o.split(":")[1] : -1 < o.indexOf("sub-border-select") ? r.borderSelect = "#" + o.split(":")[1] : -1 < o.indexOf("sub-border") && (r.border = "#" + o.split(":")[1]);
                            t.oStyle = r
                        }
                        y = new JSPlugin(t)
                    }
                    else document.getElementById(p.szContainerID).innerHTML = q(), y = v.browser().msie ? document.getElementById(u) : document.getElementsByName(c)[0];
                    return null == y && null == y.object ? -1 : ("object" == typeof window.attachEvent && v.browser().msie && (y.attachEvent("GetSelectWndInfo", GetSelectWndInfo), y.attachEvent("ZoomInfoCallback", ZoomInfoCallback), y.attachEvent("GetHttpInfo", GetHttpInfo), y.attachEvent("PluginEventHandler", PluginEventHandler), y.attachEvent("RemoteConfigInfo", RemoteConfigInfo), y.attachEvent("KeyBoardEventInfo", KeyBoardEventInfo)), R(), 0)
                },
                this.I_WriteOBJECT_XHTML = function () {
                    return Z() ? -1 : (document.writeln(q()), null == (y = v.browser().msie ? document.getElementById(u) : document.getElementsByName(c)[0]) && null == y.object ? -1 : ("object" == typeof window.attachEvent && v.browser().msie && (y.attachEvent("GetSelectWndInfo", GetSelectWndInfo), y.attachEvent("ZoomInfoCallback", ZoomInfoCallback), y.attachEvent("GetHttpInfo", GetHttpInfo), y.attachEvent("PluginEventHandler", PluginEventHandler), y.attachEvent("RemoteConfigInfo", RemoteConfigInfo), y.attachEvent("KeyBoardEventInfo", KeyBoardEventInfo)), R(), 0))
                },
                this.I_OpenFileDlg = function (e) {
                    var t = "";
                    if (Z())
                        return t;
                    if (null == (t = y.HWP_OpenFileBrowser(e, "")))
                        return "";
                    if (1 == e) {
                        if (100 < t.length)
                            return -1
                    }
                    else if (130 < t.length)
                        return -1;
                    return t
                },
                this.I2_OpenFileDlg = function (t) {
                    var e = "", n = $.Deferred();
                    return Z() ? y.JS_OpenFileBrowser(t, "").then(function (e) {
                        null != e ? 1 == t ? 100 < e.length && n.resolve(-1) : 130 < e.length && n.resolve(-1) : n.resolve(), n.resolve(e)
                    }) : (null != (e = y.HWP_OpenFileBrowser(t, "")) ? 1 == t ? 100 < e.length && n.resolve(-1) : 130 < e.length && n.resolve(-1) : n.resolve(), n.resolve(e)), n
                },
                this.I_GetLocalCfg = function () {
                    var e = null;
                    if (Z())
                        return e;
                    var t = y.HWP_GetLocalConfig(), n = [];
                    return g = v.loadXML(t),
                        n.push("<LocalConfigInfo>"),
                        n.push("<ProtocolType>" + re.$XML(g).find("ProtocolType").eq(0).text() + "</ProtocolType>"),
                        n.push("<PackgeSize>" + re.$XML(g).find("PackgeSize").eq(0).text() + "</PackgeSize>"),
                        n.push("<PlayWndType>" + re.$XML(g).find("PlayWndType").eq(0).text() + "</PlayWndType>"),
                        n.push("<BuffNumberType>" + re.$XML(g).find("BuffNumberType").eq(0).text() + "</BuffNumberType>"),
                        n.push("<RecordPath>" + re.$XML(g).find("RecordPath").eq(0).text() + "</RecordPath>"),
                        n.push("<CapturePath>" + re.$XML(g).find("CapturePath").eq(0).text() + "</CapturePath>"),
                        n.push("<PlaybackFilePath>" + re.$XML(g).find("PlaybackFilePath").eq(0).text() + "</PlaybackFilePath>"),
                        n.push("<PlaybackPicPath>" + re.$XML(g).find("PlaybackPicPath").eq(0).text() + "</PlaybackPicPath>"),
                        n.push("<DeviceCapturePath>" + re.$XML(g).find("DeviceCapturePath").eq(0).text() + "</DeviceCapturePath>"),
                        n.push("<DownloadPath>" + re.$XML(g).find("DownloadPath").eq(0).text() + "</DownloadPath>"),
                        n.push("<IVSMode>" + re.$XML(g).find("IVSMode").eq(0).text() + "</IVSMode>"),
                        n.push("<CaptureFileFormat>" + re.$XML(g).find("CaptureFileFormat").eq(0).text() + "</CaptureFileFormat>"),
                        n.push("</LocalConfigInfo>"),
                        e = v.loadXML(n.join(""))
                },
                this.I_SetLocalCfg = function (e) {
                    if (Z())
                        return -1;
                    var t = v.loadXML(e);
                    return re.$XML(g).find("ProtocolType").eq(0).text(re.$XML(t).find("ProtocolType").eq(0).text()),
                        re.$XML(g).find("PackgeSize").eq(0).text(re.$XML(t).find("PackgeSize").eq(0).text()),
                        re.$XML(g).find("PlayWndType").eq(0).text(re.$XML(t).find("PlayWndType").eq(0).text()),
                        re.$XML(g).find("BuffNumberType").eq(0).text(re.$XML(t).find("BuffNumberType").eq(0).text()),
                        re.$XML(g).find("RecordPath").eq(0).text(re.$XML(t).find("RecordPath").eq(0).text()),
                        re.$XML(g).find("CapturePath").eq(0).text(re.$XML(t).find("CapturePath").eq(0).text()),
                        re.$XML(g).find("PlaybackFilePath").eq(0).text(re.$XML(t).find("PlaybackFilePath").eq(0).text()),
                        re.$XML(g).find("DeviceCapturePath").eq(0).text(re.$XML(t).find("DeviceCapturePath").eq(0).text()),
                        re.$XML(g).find("PlaybackPicPath").eq(0).text(re.$XML(t).find("PlaybackPicPath").eq(0).text()),
                        re.$XML(g).find("DownloadPath").eq(0).text(re.$XML(t).find("DownloadPath").eq(0).text()),
                        re.$XML(g).find("IVSMode").eq(0).text(re.$XML(t).find("IVSMode").eq(0).text()),
                        re.$XML(g).find("CaptureFileFormat").eq(0).text(re.$XML(t).find("CaptureFileFormat").eq(0).text()),
                        y.HWP_SetLocalConfig(v.toXMLStr(g)) ? 0 : -1
                };
            var F = function (r, s, o, i, a, u, c) {
                var e = {
                    protocol: s,
                    success: null,
                    error: null
                };
                v.extend(e, c), v.extend(e, {
                    success: function (e) {
                        var t, n = new O;
                        n.szIP = r, 2 == s ? (n.szHttpProtocol = "https://", n.iHttpsPort = o) : (n.szHttpProtocol = "http://", n.iHttpPort = o), n.iCGIPort = o, n.szDeviceIdentify = r + "_" + o, n.szAuth = i, n.iDeviceProtocol = a, n.oProtocolInc = u, T("使用%s协议登录成功", a), w(n), t = p.bWndFull ? 1 : 0, y.HWP_SetCanFullScreen(t), y.HWP_SetPackageType(p.iPackageType), G(n), I.push(jQuery.extend({}, n)), c.success && c.success(e)
                    },
                    error: function (e, t) {
                        c.error && c.error(e, t)
                    }
                }), u.login(r, o, i, e)
            };
            function U(e, t, n) {
                return (e << 16 | t << 8 | n).toString(16)
            }
            function V(e, t) {
                return (Array(t).join("0") + e).slice(-t)
            }
            function j(e) {
                if (e && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e)) {
                    if (4 === e.length) {
                        for (var t = "#", n = 1; n < 4; n += 1)
                            t += e.slice(n, n + 1).concat(e.slice(n, n + 1));
                        e = t
                    }
                    var r = [];
                    for (n = 1; n < 7; n += 2)
                        r.push(parseInt("0x" + e.slice(n, n + 2)));
                    return "[" + r.join(",") + ",0.6]"
                }
                return e
            }
            function O() {
                if (void 0 !== O.unique)
                    return O.unique;
                this.szIP = "",
                    this.szHostName = "",
                    this.szAuth = "",
                    this.szHttpProtocol = "http://",
                    this.iCGIPort = 80,
                    this.szDeviceIdentify = "",
                    this.iDevicePort = -1,
                    this.iHttpPort = -1,
                    this.iHttpsPort = -1,
                    this.iRtspPort = -1,
                    this.iWSPort = -1,
                    this.iAudioType = 1,
                    this.m_iAudioBitRate = -1,
                    this.m_iAudioSamplingRate = -1,
                    this.iDeviceProtocol = x,
                    this.oProtocolInc = null,
                    this.iAnalogChannelNum = 0,
                    this.szDeviceType = "",
                    this.bVoiceTalk = !1,
                    this.oAuthType = {},
                    this.oStreamCapa = {
                        bObtained: !1,
                        bSupportShttpPlay: !1,
                        bSupportShttpPlayback: !1,
                        bSupportShttpsPlay: !1,
                        bSupportShttpsPlayback: !1,
                        bSupportShttpPlaybackTransCode: !1,
                        bSupportShttpsPlaybackTransCode: !1,
                        iIpChanBase: 1
                    },
                    O.unique = this
            }
            this.getAuthType = function (t, n, e, r, s, o) {
                t.oAuthType[n] = 1;
                var i = {
                    async: !0,
                    success: function (e) {
                        t.oAuthType[n] = re.$XML(e).find("sessionIDVersion").eq(0).text(), o()
                    },
                    error: function (e) {
                        500 < e && (t.oAuthType[n] = e), o(e)
                    }
                };
                S.getSessionCap(n, e, r, s, i)
            },
                this.setDeviceInfo = function (e, t, n, r, s) {
                    return (t = new O).szIP = n, 2 == r ? (t.szHttpProtocol = "https://", t.iHttpsPort = s) : (t.szHttpProtocol = "http://", t.iHttpPort = s), t.iCGIPort = s, t.szDeviceIdentify = n + "_" + s, t.iDeviceProtocol = x, t.oProtocolInc = e, t
                },
                this.successV1cb = function (e, t, n, r, s, o, i, a) {
                    (t = this.setDeviceInfo(e, t, n, r, s)).szAuth = re.$XML(o).find("sessionID").eq(0).text(), w(t), T("使用%s协议登录成功", x), G(t), l(t.szDeviceIdentify, i, a), t.sessionFailed = 0;
                    var u = jQuery.extend({}, t);
                    I.push(u), u.sesstionTimer = setInterval(function () {
                        e.sessionHeartbeat(u, function () {
                            u.sessionFailed = 0
                        }, function () {
                            u.sessionFailed++ , 5 <= u.sessionFailed && (window.PluginEventHandler(null, -1, u.szDeviceIdentify), clearInterval(u.sesstionTimer))
                        })
                    }, 3e4)
                },
                this.successV2cb = function (e, t, n, r, s, o, i, a) {
                    (t = this.setDeviceInfo(e, t, n, r, s)).szAuth = L(0, t.szDeviceIdentify), w(t), T("使用%s协议登录成功", x), G(t), l(t.szDeviceIdentify, i, a), t.sessionFailed = 0;
                    var u = jQuery.extend({}, t);
                    I.push(u), u.sesstionTimer = setInterval(function () {
                        e.sessionHeartbeat(u, function () {
                            u.sessionFailed = 0
                        }, function () {
                            u.sessionFailed++ , 5 <= u.sessionFailed && (window.PluginEventHandler(null, -1, u.szDeviceIdentify), clearInterval(u.sesstionTimer))
                        })
                    }, 3e4)
                },
                this.I_LoginV1 = function (n, r, s, o, i, a, u, c) {
                    var l = this, e = {
                        success: null,
                        error: null
                    };
                    return v.extend(e, {
                        success: function (e) {
                            var t = {
                                success: null,
                                error: null
                            };
                            v.extend(t, {
                                success: function (e) {
                                    l.successV1cb(n, r, s, o, i, e, u, a), c.success && c.success(e)
                                },
                                error: function (e, t) {
                                    c.error && c.error(e, t)
                                }
                            }), n.sessionLogin(s, o, i, a, u, e, t)
                        },
                        error: function (e, t) {
                            c.error && c.error(e, t)
                        }
                    }), e
                },
                this.I_LoginV2 = function (n, r, s, o, i, a, u, c, l) {
                    var e = {
                        success: null,
                        error: null
                    }, d = this;
                    return v.extend(e, {
                        success: function (e) {
                            var t = {
                                success: null,
                                error: null
                            };
                            v.extend(t, {
                                success: function (e) {
                                    d.successV2cb(r, s, o, i, a, e, c, u), l.success && l.success(e)
                                },
                                error: function (e, t) {
                                    l.error && l.error(e, t)
                                }
                            }), r.sessionV2Login(n, o, i, a, u, c, e, t)
                        },
                        error: function (e, t) {
                            l.error && l.error(e, t)
                        }
                    }), e
                },
                this.I_Login = function (r, s, o, i, a, u) {
                    var e = r + "_" + o;
                    if (-1 != this.findDeviceIndexByIP(e))
                        return T("设备已经登录过"), -1;
                    var c = S, l = x;
                    if (M(u.cgi) || (l = x == u.cgi ? (c = S, x) : (c = C, 2)), Z())
                        if (x == l) {
                            var d = new O;
                            this.getAuthType(d, r, s, o, i, function () {
                                var e = d.oAuthType[r];
                                if (2 < e) u.error && u.error(e);
                                else if (e < 2) {
                                    var t = this.I_LoginV1(c, d, r, s, o, i, a, u);
                                    c.getSessionCap(r, s, o, i, t)
                                }
                                else {
                                    var n = MD5((new Date).getTime().toString()).substring(0, 8);
                                    n = parseInt(n.replace("#", ""), 16).toString().substring(0, 8);
                                    t = this.I_LoginV2(n, c, d, r, s, o, i, a, u);
                                    c.getSessionV2Cap(n, r, s, o, i, t)
                                }
                            })
                        }
                        else u.error && u.error(403, N());
                    else {
                        var p = "";
                        if (x == l) {
                            p = v.Base64.encode(":" + i + ":" + a);
                            var t = {
                                success: null,
                                error: null
                            };
                            v.extend(t, u), v.extend(t, {
                                error: function (t, n) {
                                    p = v.Base64.encode(i + ":" + a), l = x, c = S;
                                    var e = {
                                        success: null,
                                        error: null
                                    };
                                    v.extend(e, u), v.extend(e, {
                                        error: function () {
                                            if (M(u.cgi)) {
                                                p = v.Base64.encode(":" + i + ":" + a), l = 2, c = C;
                                                var e = {
                                                    success: null,
                                                    error: null
                                                };
                                                v.extend(e, u), v.extend(e, {
                                                    error: function (e, t) {
                                                        p = v.Base64.encode(i + ":" + a), l = 2, c = C;
                                                        var n = {
                                                            success: null,
                                                            error: null
                                                        };
                                                        v.extend(n, u), v.extend(n, {
                                                            error: function () {
                                                                u.error && u.error(e, t)
                                                            }
                                                        }), F(r, s, o, p, l, c, n)
                                                    }
                                                }), F(r, s, o, p, l, c, e)
                                            }
                                            else u.error && u.error(t, n)
                                        }
                                    }), F(r, s, o, p, l, c, e)
                                }
                            }), F(r, s, o, p, l, c, t)
                        }
                        else {
                            p = v.Base64.encode(":" + i + ":" + a), l = 2, c = C;
                            t = {
                                success: null,
                                error: null
                            };
                            v.extend(t, u), v.extend(t, {
                                error: function (e, t) {
                                    p = v.Base64.encode(i + ":" + a), l = 2, c = C;
                                    var n = {
                                        success: null,
                                        error: null
                                    };
                                    v.extend(n, u), v.extend(n, {
                                        error: function () {
                                            u.error && u.error(e, t)
                                        }
                                    }), F(r, s, o, p, l, c, n)
                                }
                            }), F(r, s, o, p, l, c, t)
                        }
                    }
                },
                this.I_Logout = function (e) {
                    var t = this.findDeviceIndexByIP(e);
                    if (-1 == t)
                        return -1;
                    if (Z()) {
                        var n = I[t];
                        clearInterval(n.sesstionTimer), n.oProtocolInc.sessionLogout(n, {})
                    }
                    return I.splice(t, 1), 0
                },
                this.I_GetAudioInfo = function (e, t) {
                    var n = this.findDeviceIndexByIP(e);
                    if (-1 != n) {
                        var r = I[n], s = {
                            success: null,
                            error: null
                        };
                        v.extend(s, t), r.oProtocolInc.getAudioInfo(r, s)
                    }
                },
                this.I_GetDeviceInfo = function (e, t) {
                    var n = this.findDeviceIndexByIP(e);
                    if (-1 != n) {
                        var r = I[n], s = {
                            success: null,
                            error: null
                        };
                        v.extend(s, t), r.oProtocolInc.getDeviceInfo(r, s)
                    }
                },
                this.I_GetAnalogChannelInfo = function (e, t) {
                    var n = this.findDeviceIndexByIP(e);
                    if (-1 != n) {
                        var r = I[n], s = {
                            success: null,
                            error: null
                        };
                        v.extend(s, t), r.oProtocolInc.getAnalogChannelInfo(r, s)
                    }
                },
                this.I_GetSecurityVersion = function (e, t) {
                    var n = this.findDeviceIndexByIP(e);
                    if (-1 != n) {
                        var r = I[n], s = {
                            success: null,
                            error: null
                        };
                        v.extend(s, t), r.oProtocolInc.getSecurityVersion(r, s)
                    }
                },
                this.I_GetDigitalChannelInfo = function (e, t) {
                    var n = this.findDeviceIndexByIP(e);
                    if (-1 != n) {
                        var r = I[n], s = {
                            success: null,
                            error: null
                        };
                        v.extend(s, t), r.oProtocolInc.getDigitalChannelInfo(r, s)
                    }
                },
                this.I_GetZeroChannelInfo = function (e, t) {
                    var n = this.findDeviceIndexByIP(e);
                    if (-1 != n) {
                        var r = I[n], s = {
                            success: null,
                            error: null
                        };
                        v.extend(s, t), r.oProtocolInc.getZeroChannelInfo(r, s)
                    }
                },
                this.getStream = function (e, t, n) {
                    var r = $.Deferred();
                    return Z() && y.JS_Play(e, t, n).then(function () {
                        addToWndSet(), r.resolve()
                    }, function () {
                        r.reject()
                    }), r
                },
                this.I_StartRealPlay = function (e, t) {
                    var n = this.findDeviceIndexByIP(e), r = "", s = "", o = -1, i = 0, a = 0, u = !1, c = {
                        iWndIndex: P,
                        iStreamType: 1,
                        iChannelID: 1,
                        bZeroChannel: !1
                    };
                    if (v.extend(c, t), -1 != n) {
                        E(I[n]);
                        var l = I[n];
                        if (Z()) {
                            if (!l.bSupportWebsocket)
                                return void (t.error && t.error(403, N()));
                            r = l.oProtocolInc.CGI.startWsRealPlay;
                            var d = location.protocol;
                            s = /^(https)(.*)$/.test(d) ? "wss://" : "ws://", M(c.iWSPort) ? l.iWSPort = 7681 : l.iWSPort = c.iWSPort, o = l.iWSPort, a = c.iStreamType,
                                i = c.iChannelID <= l.iAnalogChannelNum ? c.iChannelID : l.oStreamCapa.iIpChanBase + parseInt(c.iChannelID, 10) - l.iAnalogChannelNum - 1, u = !0
                            //查
                            i = 1;
                        }
                        else {
                            o = 0 == parseInt(re.$XML(g).find("ProtocolType").eq(0).text(), 10) && l.oStreamCapa.bSupportShttpPlay ? (T("SHTTP RealPlay"), r = l.oProtocolInc.CGI.startShttpRealPlay, s = "http://", a = c.iStreamType - 1, i = c.iChannelID <= l.iAnalogChannelNum ? c.iChannelID : l.oStreamCapa.iIpChanBase + parseInt(c.iChannelID, 10) - l.iAnalogChannelNum - 1, u = !0, M(c.iPort) ? "https://" == l.szHttpProtocol ? (-1 == l.iHttpPort && (l.iHttpPort = W(l).iHttpPort), l.iHttpPort) : l.iCGIPort : (l.iHttpPort = c.iPort, c.iPort)) : (T("RTSP RealPlay"), r = l.oProtocolInc.CGI.startRealPlay, s = "rtsp://", a = c.iStreamType, i = c.iChannelID, M(c.iRtspPort) || (l.iRtspPort = c.iRtspPort), -1 == l.iRtspPort && (l.iRtspPort = W(l).iRtspPort), l.iRtspPort)
                        }
                        if (-1 == o)
                            return T("获取端口号失败"), void (t.error && t.error());
                        v.extend(c, {
                            urlProtocol: s,
                            cgi: r,
                            iPort: o,
                            iStreamType: a,
                            iChannelID: i
                        }), n = this.findWndIndexByIndex(c.iWndIndex);
                        var p = this;
                        -1 == n && l.oProtocolInc.startRealPlay(l, c).then(function () {
                            n = p.findWndIndexByIndex(c.iWndIndex), m[n].bShttpIPChannel = u, t.success && t.success()
                        }, function () {
                            Z() || (l.iRtspPort = -1), t.error && t.error()
                        })
                    }
                    else t.error && t.error()
                },
                this.I_CloseWin = function (e) {
                    var t = this.findWndIndexByIndex(e);
                    m.splice(t, 1)
                },
                this.I_Stop = function (e) {
                    var t = {
                        iWndIndex: P
                    };
                    a(e) ? v.extend(t, e) : M(e) || (t.iWndIndex = e);
                    var n = this.findWndIndexByIndex(t.iWndIndex);
                    if (-1 != n) {
                        var r = m[n];
                        if (r.bRecord && (Z() || y.HWP_StopSave(r.iIndex)), r.bSound && (Z() || y.HWP_CloseSound()), r.bEZoom && (Z() || y.HWP_DisableZoom(r.iIndex)), Z()) y.JS_Stop(t.iWndIndex).then(function () {
                            m.splice(n, 1), t.success && t.success()
                        }, function () {
                            t.error && t.error()
                        });
                        else 0 == y.HWP_Stop(t.iWndIndex) ? (m.splice(n, 1), t.success && t.success()) : t.error && t.error()
                    }
                    else t.error && t.error()
                },
                this.I_OpenSound = function (e) {
                    e = M(e) ? P : e;
                    var t = this.findWndIndexByIndex(e), n = -1;
                    if (-1 != t) {
                        var r = m[t];
                        r.bSound || 0 == (n = Z() ? y.JS_OpenSound(e) : y.HWP_OpenSound(e)) && (r.bSound = !0)
                    }
                    return n
                },
                this.I_CloseSound = function (e) {
                    e = M(e) ? P : e;
                    var t = this.findWndIndexByIndex(e), n = -1;
                    if (-1 != t) {
                        var r = m[t];
                        r.bSound && 0 == (n = Z() ? y.JS_CloseSound() : y.HWP_CloseSound()) && (r.bSound = !1)
                    }
                    return n
                },
                this.I_SetVolume = function (e, t) {
                    var n = -1;
                    return e = parseInt(e, 10), isNaN(e) || e < 0 || 100 < e || (t = M(t) ? P : t, -1 != this.findWndIndexByIndex(t) && (n = Z() ? (y.JS_SetVolume(t, e), 0) : y.HWP_SetVolume(t, e))), n
                },
                this.I2_CapturePic = function (e, t) {
                    var n = {
                        iWndIndex: P,
                        bDateDir: !0
                    };
                    a(t) ? v.extend(n, t) : M(t) || (n.iWndIndex = t);
                    var r = this.findWndIndexByIndex(n.iWndIndex), s = $.Deferred();
                    if (-1 != r)
                        if (Z()) {
                            var o = "JPEG";
                            ".jpg" === e.slice(-4).toLowerCase() ? e = e.slice(0, -4) : ".jpeg" === e.slice(-5).toLowerCase() ? e = e.slice(0, -5) : ".bmp" === e.slice(-4).toLowerCase() && (e = e.slice(0, -4), o = "BMP"), y.JS_CapturePicture(n.iWndIndex, e, o).then(function () {
                                s.resolve()
                            }, function () {
                                s.reject()
                            })
                        }
                        else ".jpg" === e.slice(-4).toLowerCase() ? e = e.slice(0, -4) : ".jpeg" === e.slice(-5).toLowerCase() && (e = e.slice(0, -5)), 0 === y.HWP_CapturePicture(n.iWndIndex, e, n.bDateDir) ? s.resolve() : s.reject();
                    else s.reject();
                    return s
                },
                this.I2_CapturePicData = function (e) {
                    var t = {
                        iWndIndex: P,
                        bDateDir: !0
                    };
                    a(e) ? v.extend(t, e) : M(e) || (t.iWndIndex = e);
                    if (-1 != this.findWndIndexByIndex(t.iWndIndex)) {
                        var n = $.Deferred();
                        Z() ? y.JS_CapturePictureData(t.iWndIndex).then(function (e) {
                            n.resolve(e)
                        }, function (e) {
                            T(e), n.reject()
                        }) : n.reject()
                    }
                    else n.reject();
                    return n
                },
                this.I_StartRecord = function (e, t) {
                    var n = {
                        iWndIndex: P,
                        bDateDir: !0
                    };
                    a(t) ? v.extend(n, t) : M(t) || (n.iWndIndex = t);
                    var r = this.findWndIndexByIndex(n.iWndIndex);
                    if (-1 != r) {
                        var s = m[r];
                        if (s.bRecord) n.error && n.error();
                        else if (Z()) v.browser().chrome ? y.JS_StartSave(n.iWndIndex, e).then(function () {
                            s.bRecord = !0, n.success && n.success()
                        }, function () {
                            n.error && n.error()
                        }) : n.error && n.error();
                        else 0 == y.HWP_StartSave(n.iWndIndex, e, n.bDateDir) ? (s.bRecord = !0, n.success && n.success()) : n.error && n.error()
                    }
                    else n.error && n.error()
                },
                this.I_StopRecord = function (e) {
                    var t = {
                        iWndIndex: P
                    };
                    a(e) ? v.extend(t, e) : M(e) || (t.iWndIndex = e);
                    var n = this.findWndIndexByIndex(t.iWndIndex);
                    if (-1 != n) {
                        var r = m[n];
                        if (r.bRecord)
                            if (Z()) v.browser().chrome ? y.JS_StopSave(t.iWndIndex).then(function () {
                                r.bRecord = !1, t.success && t.success()
                            }, function () {
                                t.error && t.error()
                            }) : t.error && t.error();
                            else 0 == y.HWP_StopSave(t.iWndIndex) ? (r.bRecord = !1, t.success && t.success()) : t.error && t.error();
                        else t.error && t.error()
                    }
                    else t.error && t.error()
                },
                this.I_StartVoiceTalk = function (e, t) {
                    if (isNaN(parseInt(t, 10)))
                        return -1;
                    var n = this.findDeviceIndexByIP(e), r = -1;
                    if (-1 != n) {
                        var s = I[n];
                        s.bVoiceTalk || 0 == (r = Z() ? -1 : s.oProtocolInc.startVoiceTalk(s, t)) && (I[n].bVoiceTalk = !0)
                    }
                    return r
                },
                this.I_StopVoiceTalk = function () {
                    var e = -1;
                    if (!Z()) {
                        e = y.HWP_StopVoiceTalk();
                        for (var t = 0, n = I.length; t < n; t++)
                            if (I[t].bVoiceTalk) {
                                I[t].bVoiceTalk = !1;
                                break
                            }
                    }
                    return e
                },
                this.I_PTZControl = function (e, t, n) {
                    var r = {
                        iWndIndex: P,
                        iPTZIndex: e,
                        iPTZSpeed: 4
                    };
                    v.extend(r, n), v.extend(r, {
                        async: !1
                    });
                    var s = this.findWndIndexByIndex(r.iWndIndex);
                    if (-1 != s) {
                        var o = m[s];
                        if (-1 != (s = this.findDeviceIndexByIP(o.szIP))) {
                            var i = I[s];
                            9 == e ? i.oProtocolInc.ptzAutoControl(i, t, o, r) : i.oProtocolInc.ptzControl(i, t, o, r)
                        }
                    }
                },
                this.I_EnableEZoom = function (e) {
                    e = M(e) ? P : e;
                    var t = this.findWndIndexByIndex(e), n = -1;
                    if (-1 != t) {
                        var r = m[t];
                        r.bEZoom || 0 == (n = Z() ? y.JS_EnableZoom(e) : y.HWP_EnableZoom(e, 0)) && (r.bEZoom = !0)
                    }
                    return n
                },
                this.I_DisableEZoom = function (e) {
                    e = M(e) ? P : e;
                    var t = this.findWndIndexByIndex(e), n = -1;
                    if (-1 != t) {
                        var r = m[t];
                        r.bEZoom && 0 == (n = Z() ? y.JS_DisableZoom(e) : (y.HWP_DisableZoom(e), 0)) && (r.bEZoom = !1)
                    }
                    return n
                },
                this.I_Enable3DZoom = function (e) {
                    e = M(e) ? P : e;
                    var t = this.findWndIndexByIndex(e), n = -1;
                    if (-1 != t) {
                        var r = m[t];
                        r.b3DZoom || (Z() ? (n = 0, y.JS_Enable3DZoom(e, function (e) {
                            window.ZoomInfoCallback(e)
                        })) : n = y.HWP_EnableZoom(e, 1), 0 == n && (r.b3DZoom = !0))
                    }
                    return n
                },
                this.I_Disable3DZoom = function (e) {
                    e = M(e) ? P : e;
                    var t = this.findWndIndexByIndex(e), n = -1;
                    if (-1 != t) {
                        var r = m[t];
                        r.b3DZoom && 0 == (n = (Z() ? y.JS_Disable3DZoom(e) : y.HWP_DisableZoom(e), 0)) && (r.b3DZoom = !1)
                    }
                    return n
                },
                this.I_FullScreen = function () {
                    Z() ? y.JS_FullScreenSingle(P) : y.HWP_FullScreenDisplay(bFull)
                },
                this.I_SetPreset = function (e, t) {
                    var n = {
                        iWndIndex: P,
                        iPresetID: e
                    };
                    v.extend(n, t);
                    var r = this.findWndIndexByIndex(n.iWndIndex);
                    if (-1 != r) {
                        var s = m[r];
                        if (-1 != (r = this.findDeviceIndexByIP(s.szIP))) {
                            var o = I[r];
                            o.oProtocolInc.setPreset(o, s, n)
                        }
                    }
                },
                this.I_GoPreset = function (e, t) {
                    var n = {
                        iWndIndex: P,
                        iPresetID: e
                    };
                    v.extend(n, t);
                    var r = this.findWndIndexByIndex(n.iWndIndex);
                    if (-1 != r) {
                        var s = m[r];
                        if (-1 != (r = this.findDeviceIndexByIP(s.szIP))) {
                            var o = I[r];
                            o.oProtocolInc.goPreset(o, s, n)
                        }
                    }
                },
                this.I_RecordSearch = function (e, t, n, r, s) {
                    var o = this.findDeviceIndexByIP(e);
                    if (-1 != o) {
                        var i = I[o], a = {
                            iChannelID: t,
                            szStartTime: n,
                            szEndTime: r,
                            iSearchPos: 0,
                            iStreamType: 1,
                            success: null,
                            error: null
                        };
                        v.extend(a, s), i.oProtocolInc.recordSearch(i, a)
                    }
                },
                this.I_StartPlayback = function (e, t) {
                    var n = this.findDeviceIndexByIP(e), r = "", s = "", o = -1, i = 1, a = 0, u = v.dateFormat(new Date, "yyyy-MM-dd"), c = {
                        iWndIndex: P,
                        iStreamType: 1,
                        iChannelID: 1,
                        szStartTime: u + " 00:00:00",
                        szEndTime: u + " 23:59:59"
                    };
                    if (v.extend(c, t), -1 != n) {
                        // getSDKCapa
                        E(I[n]);
                        var l = I[n];
                        // getVersion
                        if (Z()) {
                            if (!l.bSupportWebsocket)
                                return void (t.error && t.error(403, N()));
                            if (!M(c.oTransCodeParam))
                                return void (t.error && t.error());
                            r = l.oProtocolInc.CGI.startWsPlayback;
                            var d = location.protocol;
                            s = /^(https)(.*)$/.test(d)
                                ? "wss://"
                                : "ws://",
                                M(c.iWSPort) ?
                                    l.iWSPort = 7681 :
                                    l.iWSPort = c.iWSPort,
                                o = l.iWSPort,
                                a = c.iStreamType,
                                i = 100 * (
                                    i = c.iChannelID <= l.iAnalogChannelNum
                                        ? c.iChannelID
                                        : l.oStreamCapa.iIpChanBase + parseInt(c.iChannelID, 10) - l.iAnalogChannelNum - 1) + a
                        }
                        else {
                            o = 0 == parseInt(re.$XML(g).find("ProtocolType").eq(0).text(), 10) && l.oStreamCapa.bSupportShttpPlay
                                ? (r = M(c.oTransCodeParam)
                                    ? l.oProtocolInc.CGI.startShttpPlayback
                                    : l.oProtocolInc.CGI.startTransCodePlayback,
                                    s = "http://",
                                    a = c.iStreamType - 1,
                                    i = c.iChannelID <= l.iAnalogChannelNum
                                        ? c.iChannelID
                                        : l.oStreamCapa.iIpChanBase + parseInt(c.iChannelID, 10) - l.iAnalogChannelNum - 1,
                                    l.bSupportSubStreamPlayback && (i = 100 * i + a),
                                    // return void 0 === e
                                    M(c.iPort)
                                        ? "https://" == l.szHttpProtocol
                                            ? (-1 == l.iHttpPort && (l.iHttpPort = W(l).iHttpPort), l.iHttpPort)
                                            : l.iCGIPort
                                        : (l.iHttpPort = c.iPort, c.iPort))
                                : (
                                    r = l.oProtocolInc.CGI.startPlayback,
                                    s = "rtsp://",
                                    a = c.iStreamType,
                                    i = 100 * c.iChannelID + a,
                                    // return void 0 === e
                                    M(c.iRtspPort) || (l.iRtspPort = c.iRtspPort),
                                    -1 == l.iRtspPort && (l.iRtspPort = W(l).iRtspPort),
                                    l.iRtspPort
                                )
                        }
                        if (-1 == o)
                            return T("获取端口号失败"), void (t.error && t.error());
                        v.extend(c, {
                            urlProtocol: s,
                            cgi: r,
                            iPort: o,
                            iChannelID: i
                        }),
                            -1 == (n = this.findWndIndexByIndex(c.iWndIndex)) && (
                                Z()
                                    ? (c.szStartTime = c.szStartTime.replace(" ", "T") + "Z", c.szEndTime = c.szEndTime.replace(" ", "T") + "Z", l.oProtocolInc.startPlayback(l, c).then(function () {
                                        t.success && t.success()
                                    },
                                        function () {
                                            t.error && t.error()
                                        })
                                    )
                                    : (c.szStartTime = c.szStartTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", c.szEndTime = c.szEndTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", l.oProtocolInc.startPlayback(l, c).then(function () {
                                        t.success && t.success()
                                    }, function () {
                                        l.iRtspPort = -1, t.error && t.error()
                                    }))
                            )
                    }
                    else t.error && t.error()
                },
                this.I_ReversePlayback = function (e, t) {
                    var n = this.findDeviceIndexByIP(e), r = -1, s = "", o = "", i = -1, a = -1, u = 0, c = v.dateFormat(new Date, "yyyy-MM-dd"), l = {
                        iWndIndex: P,
                        iStreamType: 1,
                        iChannelID: 1,
                        szStartTime: c + " 00:00:00",
                        szEndTime: c + " 23:59:59"
                    };
                    if (v.extend(l, t), -1 != n) {
                        E(I[n]);
                        var d = I[n];
                        if (Z())
                            return r;
                        if (-1 == (i = 0 == parseInt(re.$XML(g).find("ProtocolType").eq(0).text(), 10) && d.oStreamCapa.bSupportShttpPlay ? (s = d.oProtocolInc.CGI.startShttpReversePlayback, o = "http://", u = l.iStreamType - 1, a = 100 * (a = l.iChannelID <= d.iAnalogChannelNum ? l.iChannelID : d.oStreamCapa.iIpChanBase + parseInt(l.iChannelID, 10) - d.iAnalogChannelNum - 1) + u, M(l.iPort) ? "https://" == d.szHttpProtocol ? (-1 == d.iHttpPort && (d.iHttpPort = W(d).iHttpPort), d.iHttpPort) : d.iCGIPort : (d.iHttpPort = l.iPort, l.iPort)) : (s = d.oProtocolInc.CGI.startPlayback, o = "rtsp://", u = l.iStreamType, a = 100 * l.iChannelID + u, M(l.iRtspPort) || (d.iRtspPort = l.iRtspPort), -1 == d.iRtspPort && (d.iRtspPort = W(d).iRtspPort), d.iRtspPort)))
                            return T("获取端口号失败"), r;
                        v.extend(l, {
                            urlProtocol: o,
                            cgi: s,
                            iPort: i,
                            iChannelID: a
                        }), -1 == (n = this.findWndIndexByIndex(l.iWndIndex)) && (l.szStartTime = l.szStartTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", l.szEndTime = l.szEndTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", r = d.oProtocolInc.reversePlayback(d, l))
                    }
                    return -1 == r && (d.iRtspPort = -1), r
                },
                this.I_Frame = function (e) {
                    var t = {
                        iWndIndex: P
                    };
                    a(e) ? v.extend(t, e) : M(e) || (t.iWndIndex = e);
                    var n = this.findWndIndexByIndex(t.iWndIndex);
                    if (-1 != n) {
                        var r = m[n], s = r.iPlayStatus;
                        if (2 == s || 4 == s)
                            if (Z()) y.JS_FrameForward(t.iWndIndex).then(function () {
                                r.iPlayStatus = 4, t.success && t.success()
                            }, function () {
                                t.error && t.error()
                            });
                            else 0 == y.HWP_FrameForward(t.iWndIndex) ? (r.iPlayStatus = 4, t.success && t.success()) : t.error && t.error();
                        else t.error && t.error()
                    }
                    else t.error && t.error()
                },
                this.I_Pause = function (e) {
                    var t = {
                        iWndIndex: P
                    };
                    a(e) ? v.extend(t, e) : M(e) || (t.iWndIndex = e);
                    var n = this.findWndIndexByIndex(t.iWndIndex);
                    if (-1 != n) {
                        var r = m[n], s = r.iPlayStatus, o = -1;
                        if (2 == s) o = 3;
                        else {
                            if (5 != s)
                                return void (t.error && t.error());
                            o = 6
                        }
                        if (Z()) y.JS_Pause(t.iWndIndex).then(function () {
                            r.iPlayStatus = o, t.success && t.success()
                        }, function () {
                            t.error && t.error()
                        });
                        else 0 == y.HWP_Pause(t.iWndIndex) ? (r.iPlayStatus = o, t.success && t.success()) : t.error && t.error()
                    }
                    else t.error && t.error()
                },
                this.I_Resume = function (e) {
                    var t = {
                        iWndIndex: P
                    };
                    a(e) ? v.extend(t, e) : M(e) || (t.iWndIndex = e);
                    var n = this.findWndIndexByIndex(t.iWndIndex);
                    if (-1 != n) {
                        var r = m[n], s = r.iPlayStatus, o = -1;
                        if (3 == s || 4 == s) o = 2;
                        else {
                            if (6 != s)
                                return void (t.error && t.error());
                            o = 5
                        }
                        if (Z()) y.JS_Resume(t.iWndIndex).then(function () {
                            r.iPlayStatus = o, t.success && t.success()
                        }, function () {
                            t.error && t.error()
                        });
                        else 0 == y.HWP_Resume(t.iWndIndex) ? (r.iPlayStatus = o, t.success && t.success()) : t.error && t.error()
                    }
                    else t.error && t.error()
                },
                this.I_PlaySlow = function (e) {
                    var t = {
                        iWndIndex: P
                    };
                    a(e) ? v.extend(t, e) : M(e) || (t.iWndIndex = e);
                    var n = this.findWndIndexByIndex(t.iWndIndex);
                    -1 != n ? 2 == m[n].iPlayStatus ? Z() ? y.JS_GetWndStatus(t.iWndIndex).iRate <= -4 ? t.error && t.error() : y.JS_Slow(t.iWndIndex).then(function () {
                        t.success && t.success()
                    }, function () {
                        t.error && t.error()
                    }) : 0 == y.HWP_Slow(t.iWndIndex) ? t.success && t.success() : t.error && t.error() : t.error && t.error() : t.error && t.error()
                },
                this.I_PlayFast = function (e) {
                    var t = {
                        iWndIndex: P
                    };
                    a(e) ? v.extend(t, e) : M(e) || (t.iWndIndex = e);
                    var n = this.findWndIndexByIndex(t.iWndIndex);
                    -1 != n ? 2 == m[n].iPlayStatus ? Z() ? 8 <= y.JS_GetWndStatus(t.iWndIndex).iRate ? t.error && t.error() : y.JS_Fast(t.iWndIndex).then(function () {
                        t.success && t.success()
                    }, function () {
                        t.error && t.error()
                    }) : 0 == y.HWP_Fast(t.iWndIndex) ? t.success && t.success() : t.error && t.error() : t.error && t.error() : t.error && t.error()
                },
                this.I_GetOSDTime = function (e) {
                    var n = {
                        iWndIndex: P
                    };
                    if (a(e) ? v.extend(n, e) : M(e) || (n.iWndIndex = e), -1 != this.findWndIndexByIndex(n.iWndIndex)) {
                        if (Z()) y.JS_GetOSDTime(n.iWndIndex).then(function (e) {
                            if (n.success) {
                                var t = v.dateFormat(new Date(1e3 * e), "yyyy-MM-dd hh:mm:ss");
                                n.success(t)
                            }
                        }, function () {
                            n.error && n.error()
                        });
                        else if (n.success) {
                            var t = y.HWP_GetOSDTime(n.iWndIndex), r = v.dateFormat(new Date(1e3 * t), "yyyy-MM-dd hh:mm:ss");
                            n.success(r)
                        }
                    }
                    else n.error && n.error()
                },
                this.I_StartDownloadRecord = function (e, t, n, r) {
                    var s = this.findDeviceIndexByIP(e), o = -1;
                    if (-1 != s) {
                        var i = I[s], a = {
                            szPlaybackURI: t,
                            szFileName: n,
                            bDateDir: !0
                        };
                        M(r) || v.extend(a, r), o = i.oProtocolInc.startDownloadRecord(i, a)
                    }
                    return o
                },
                this.I_StartDownloadRecordByTime = function (e, t, n, r, s, o) {
                    var i = this.findDeviceIndexByIP(e), a = -1;
                    if (-1 != i) {
                        var u = I[i], c = {
                            szPlaybackURI: t = t.split("?")[0] + "?starttime=" + r.replace(" ", "T") + "Z&endtime=" + s.replace(" ", "T") + "Z",
                            szFileName: n,
                            bDateDir: !0
                        };
                        M(o) || v.extend(c, o), a = u.oProtocolInc.startDownloadRecord(u, c)
                    }
                    return a
                },
                this.I_GetDownloadStatus = function (e) {
                    var t = -1;
                    return Z() || 1 == (t = y.HWP_GetDownloadStatus(e)) && (t = -1), t
                },
                this.I_GetDownloadProgress = function (e) {
                    return Z() ? -1 : y.HWP_GetDownloadProgress(e)
                },
                this.I_StopDownloadRecord = function (e) {
                    return Z() ? -1 : y.HWP_StopDownload(e)
                },
                this.I_ExportDeviceConfig = function (e, t) {
                    var n = this.findDeviceIndexByIP(e), r = -1;
                    if (-1 != n) {
                        var s = I[n];
                        r = s.oProtocolInc.exportDeviceConfig(s, t)
                    }
                    return r
                },
                this.I_ImportDeviceConfig = function (e, t, n) {
                    var r = this.findDeviceIndexByIP(e), s = -1;
                    if (-1 != r) {
                        var o = I[r], i = {
                            szFileName: t
                        };
                        s = o.oProtocolInc.importDeviceConfig(o, i, n)
                    }
                    return s
                },
                this.I_RestoreDefault = function (e, t, n) {
                    var r = {
                        success: null,
                        error: null
                    };
                    v.extend(r, n);
                    var s = this.findDeviceIndexByIP(e);
                    if (-1 != s) {
                        var o = I[s];
                        o.oProtocolInc.restore(o, t, r)
                    }
                },
                this.I_Restart = function (e, t) {
                    var n = this.findDeviceIndexByIP(e), r = {
                        success: null,
                        error: null
                    };
                    if (v.extend(r, t), -1 != n) {
                        var s = I[n];
                        s.oProtocolInc.restart(s, r)
                    }
                },
                this.I_Reconnect = function (e, t) {
                    var n = this.findDeviceIndexByIP(e), r = {
                        success: null,
                        error: null
                    };
                    if (v.extend(r, t), -1 != n) {
                        var s = I[n];
                        s.oProtocolInc.login(s.szIP, s.iCGIPort, s.szAuth, r)
                    }
                },
                this.I_StartUpgrade = function (e, t) {
                    var n = this.findDeviceIndexByIP(e);
                    if (-1 == n)
                        return -1;
                    var r = I[n], s = {
                        szFileName: t
                    };
                    return Z() ? -1 : r.oProtocolInc.startUpgrade(r, s)
                },
                this.I2_StartUpgrade = function (e, t) {
                    var n = this.findDeviceIndexByIP(e);
                    if (-1 != n) {
                        var r = I[n], s = {
                            szFileName: t
                        };
                        return r.oProtocolInc.asyncstartUpgrade(r, s)
                    }
                },
                this.I_UpgradeStatus = function () {
                    return Z() ? y.JS_UpgradeStatus() : y.HWP_UpgradeStatus()
                },
                this.I_UpgradeProgress = function () {
                    return Z() ? y.JS_UpgradeProgress() : y.HWP_UpgradeProgress()
                },
                this.I_StopUpgrade = function () {
                    return Z() ? -1 : y.HWP_StopUpgrade()
                },
                this.I_CheckPluginInstall = function () {
                    var e = -1, t = v.browser();
                    if (Z()) e = 0;
                    else if (t.msie) try {
                        new ActiveXObject("WebVideoKitActiveX.WebVideoKitActiveXCtrl.1");
                        e = 0
                    }
                        catch (e) { }
                    else
                        for (var n = 0, r = navigator.mimeTypes.length; n < r; n++)
                            if ("application/webvideo-plugin-kit" == navigator.mimeTypes[n].type.toLowerCase()) {
                                e = 0;
                                break
                            }
                    return e
                },
                this.I_CheckPluginVersion = function () {
                    return Z() ? 0 : y.HWP_CheckPluginUpdate("<?xml version='1.0' encoding='utf-8'?><FileVersion><Platform name='win32'><npWebVideoKitPlugin.dll>3,0,6,2</npWebVideoKitPlugin.dll><WebVideoKitActiveX.ocx>3,0,6,2</WebVideoKitActiveX.ocx><PlayCtrl.dll>7,3,3,61</PlayCtrl.dll><StreamTransClient.dll>1,1,3,6</StreamTransClient.dll><SystemTransform.dll>2,5,2,8</SystemTransform.dll><NetStream.dll>1,0,5,59</NetStream.dll></Platform></FileVersion>") ? -1 : 0
                },
                this.I_SendHTTPRequest = function (e, t, n) {
                    var r = this.findDeviceIndexByIP(e);
                    if (!(r < 0)) {
                        var s = I[r], o = new K, i = {
                            type: "GET",
                            url: s.szHttpProtocol + s.szIP + ":" + s.iCGIPort + "/" + t,
                            auth: s.szAuth,
                            success: null,
                            error: null
                        };
                        v.extend(i, n), v.extend(i, {
                            success: function (e) {
                                n.success && n.success(e)
                            },
                            error: function (e, t) {
                                n.error && n.error(e, t)
                            }
                        }), o.setRequestParam(i), o.submitRequest()
                    }
                },
                this.I_RemoteConfig = function (e, t) {
                    var n = this.findDeviceIndexByIP(e), r = -1;
                    if (Z())
                        return -1;
                    var s = {
                        iLan: 0,
                        iDevicePort: -1,
                        iType: 0
                    };
                    if (v.extend(s, t), -1 == n)
                        return -1;
                    var o = I[n];
                    if (-1 == s.iDevicePort)
                        if (-1 == o.iDevicePort) {
                            if (o.iDevicePort = W(o).iDevicePort, -1 == (r = o.iDevicePort))
                                return -1
                        }
                        else r = o.iDevicePort;
                    else r = s.iDevicePort;
                    if (":" == v.Base64.decode(o.szAuth)[0])
                        var i = v.Base64.decode(o.szAuth).split(":")[1], a = v.Base64.decode(o.szAuth).split(":")[2];
                    else i = v.Base64.decode(o.szAuth).split(":")[0], a = v.Base64.decode(o.szAuth).split(":")[1];
                    var u = "<RemoteInfo><DeviceInfo><DeviceType>" + s.iType + "</DeviceType><LanType>" + s.iLan + "</LanType><IP>" + o.szIP + "</IP><Port>" + r + "</Port><UName>" + i + "</UName><PWD>" + v.Base64.encode(a) + "</PWD></DeviceInfo></RemoteInfo>";
                    return y.HWP_ShowRemConfig(u)
                },
                this.I_ChangeWndNum = function (e) {
                    return isNaN(parseInt(e, 10)) ? -1 : (Z() ? y.JS_ArrangeWindow(e) : y.HWP_ArrangeWindow(e), 0)
                },
                this.I_GetLastError = function () {
                    return Z() ? -1 : y.HWP_GetLastError()
                },
                this.I_GetWindowStatus = function (e) {
                    if (M(e)) {
                        var t = [];
                        return v.extend(t, m), t
                    }
                    var n = this.findWndIndexByIndex(e);
                    if (-1 == n)
                        return null;
                    t = {};
                    return v.extend(t, m[n]), t
                },
                this.I_GetIPInfoByMode = function (e, t, n, r) {
                    return Z() ? "" : y.HWP_GetIpInfoByMode(e, t, n, r)
                },
                this.I_SetPlayModeType = function (e) {
                    return Z() ? 0 : y.HWP_SetPlayModeType(e)
                },
                this.I_SetSnapDrawMode = function (e, t) {
                    return Z() ? -1 < t ? y.JS_SetDrawStatus(!0) : y.JS_SetDrawStatus(!1) : y.HWP_SetSnapDrawMode(e, t)
                },
                this.I2_SetSnapPolygonInfo = function (e, t) {
                    if (Z()) {
                        y.JS_GetPolygonInfo();
                        var n = v.loadXML(t), r = [];
                        for (nodeList = re.$XML(n).find("SnapPolygon", !0), i = 0, iLen = nodeList.length; i < iLen; i++) {
                            node = nodeList[i];
                            var s = U(re.$XML(node).find("r").eq(0).text(), re.$XML(node).find("g").eq(0).text(), re.$XML(node).find("b").eq(0).text());
                            s = "#" + (s = V(s, 6));
                            for (var o = [], a = re.$XML(node).find("point", !0), u = 0, c = a.length; u < c; u++)
                                oNodePoint = a[u], o.push([500 * re.$XML(oNodePoint).find("x").eq(0).text(), 300 * re.$XML(oNodePoint).find("y").eq(0).text()]);
                            r.push({
                                iPolygonType: 1,
                                id: re.$XML(node).find("id").eq(0).text(),
                                iEditType: 0,
                                aPoint: o,
                                bClosed: !0,
                                szTips: re.$XML(node).find("tips").eq(0).text(),
                                szDrawColor: s,
                                iTranslucent: .1
                            })
                        }
                        return y.JS_SetPolygonInfo(r)
                    }
                    return y.HWP_SetSnapPolygonInfo(e, t)
                },
                this.I_SetSnapPolygonInfo = function (e, t) {
                    if (Z()) {
                        var n = y.JS_GetPolygonInfo(), r = v.loadXML(t), s = [];
                        for (a = 0, u = (p = re.$XML(r).find("SnapPolygon", !0)).length; a < u; a++) {
                            h = p[a];
                            var o = U(re.$XML(h).find("r").eq(0).text(), re.$XML(h).find("g").eq(0).text(), re.$XML(h).find("b").eq(0).text());
                            o = "#" + (o = V(o, 6)), s.push({
                                id: re.$XML(h).find("id").eq(0).text(),
                                tips: re.$XML(h).find("tips").eq(0).text(),
                                iMaxShapeSupport: n.length + 1,
                                iMaxPointSupport: re.$XML(h).find("PointNumMax").eq(0).text(),
                                iMinPointSupport: re.$XML(h).find("MinClosed").eq(0).text(),
                                style: {
                                    szDrawColor: o,
                                    iTranslucent: .1
                                }
                            })
                        }
                        0 === p.length && s.push({
                            iMaxShapeSupport: 1,
                            iMaxPointSupport: 17,
                            iMinPointSupport: 1,
                            style: {
                                szDrawColor: "#FFFF00",
                                iTranslucent: .1
                            }
                        });
                        var i = [];
                        if ($.each(n, function (e, t) {
                            i.push(t.id)
                        }), S = "," + (S = i.join(",")) + ",", 32 < n.length + s.length)
                            return -3;
                        for (var a = 0, u = s.length; a < u; a++) {
                            var c = (h = s[a]).id;
                            if (!v.isInt(c))
                                return -2;
                            if ((f = parseInt(c, 10)) < 1 || 32 < f)
                                return -2;
                            if (-1 < S.indexOf("," + c + ","))
                                return -4;
                            if (32 < h.tips.length)
                                return -2;
                            if (!h.flag) {
                                var l = h.iMinPointSupport;
                                if (!v.isInt(l))
                                    return -2;
                                if ((P = parseInt(l, 10)) < 4 || 17 < P)
                                    return -2;
                                var d = h.iMaxPointSupport;
                                if (!v.isInt(d))
                                    return -2;
                                if ((I = parseInt(d, 10)) < P || 17 < I)
                                    return -2
                            }
                        }
                        return y.JS_SetDrawShapeInfo("Polygon", s[0])
                    }
                    var p, h, f, P, I, m = y.HWP_GetSnapPolygonInfo(e);
                    r = v.loadXML(m);
                    var S, C = (p = re.$XML(r).find("SnapPolygon", !0)).length;
                    i = [];
                    for (a = 0, u = p.length; a < u; a++)
                        h = p[a], i.push(re.$XML(h).find("id").eq(0).text());
                    if (S = "," + (S = i.join(",")) + ",", r = v.loadXML(t), 32 < C + (p = re.$XML(r).find("SnapPolygon", !0)).length)
                        return -3;
                    for (a = 0, u = p.length; a < u; a++) {
                        if (h = p[a], c = re.$XML(h).find("id").eq(0).text(), !v.isInt(c))
                            return -2;
                        if ((f = parseInt(c, 10)) < 1 || 32 < f)
                            return -2;
                        if (-1 < S.indexOf("," + c + ","))
                            return -4;
                        if (32 < re.$XML(h).find("tips").eq(0).text().length)
                            return -2;
                        if (!("true" === re.$XML(h).find("isClosed").eq(0).text())) {
                            if (l = re.$XML(h).find("MinClosed").eq(0).text(), !v.isInt(l))
                                return -2;
                            if ((P = parseInt(l, 10)) < 4 || 17 < P)
                                return -2;
                            if (d = re.$XML(h).find("PointNumMax").eq(0).text(), !v.isInt(d))
                                return -2;
                            if ((I = parseInt(d, 10)) < P || 17 < I)
                                return -2
                        }
                    }
                    return y.HWP_SetSnapPolygonInfo(e, t)
                },
                this.I_GetSnapPolygonInfo = function (e) {
                    if (Z()) {
                        for (var t = y.JS_GetPolygonInfo(e), n = '<?xml version="1.0" encoding="utf-8"?><SnapPolygonList>', r = 0; r < t.length; r++) {
                            n += "<SnapPolygon>";
                            var s = j(t[r].szDrawColor);
                            n += "<id>" + t[r].szTips.split("#")[1] + "</id><polygonType>1</polygonType><color><r>" + s[0] + "</r><g>" + s[1] + "</g><b>" + s[2] + "</b></color><tips>" + t[r].szTips + "</tips><isClosed>" + t[r].bClosed + "</isClosed><pointList>";
                            for (var o = 0; o < t[r].aPoint.length; o++)
                                n += "<point><x>" + t[r].aPoint[o][0] / h + "</x><y>" + t[r].aPoint[o][1] / f + "</y></point>";
                            n += "</pointList></SnapPolygon>"
                        }
                        return n += "</SnapPolygonList>"
                    }
                    return y.HWP_GetSnapPolygonInfo(e)
                },
                this.I_ClearSnapInfo = function (e) {
                    return Z() ? y.JS_ClearSnapInfo() : y.HWP_ClearSnapInfo(e, 1)
                },
                this.I_DeviceCapturePic = function (e, t, n, r) {
                    var s = this.findDeviceIndexByIP(e), o = -1;
                    if (-1 != s) {
                        var i = I[s], a = {
                            bDateDir: !0
                        };
                        if (v.extend(a, r), !M(a.iResolutionWidth) && !v.isInt(a.iResolutionWidth))
                            return o;
                        if (!M(a.iResolutionHeight) && !v.isInt(a.iResolutionHeight))
                            return o;
                        o = i.oProtocolInc.deviceCapturePic(i, t, n, a)
                    }
                    return o
                },
                this.I_SetPackageType = function (e) {
                    return Z() ? -1 : y.HWP_SetPackageType(e)
                },
                this.I_GetDevicePort = function (e) {
                    var t = this.findDeviceIndexByIP(e), n = null;
                    if (-1 != t) {
                        var r = I[t];
                        n = W(r)
                    }
                    return n
                },
                this.I_GetTextOverlay = function (e, t, n) {
                    var r = this.findDeviceIndexByIP(t);
                    if (-1 != r) {
                        var s = I[r], o = (m[r], {
                            async: !1,
                            type: "GET",
                            success: n.success,
                            error: n.error
                        });
                        this.I_SendHTTPRequest(s.szIP + "_" + s.iCGIPort, e, o)
                    }
                    return -1
                },
                this.findDeviceIndexByIP = function (e) {
                    if (-1 < e.indexOf("_")) {
                        for (var t = 0, n = I.length; t < n; t++)
                            if (I[t].szDeviceIdentify == e)
                                return t
                    }
                    else
                        for (t = 0, n = I.length; t < n; t++)
                            if (I[t].szIP == e)
                                return t;
                    return -1
                },
                this.findWndIndexByIndex = function (e) {
                    for (var t = 0, n = m.length; t < n; t++)
                        if (m[t].iIndex == e)
                            return t;
                    return -1
                };
            var J = function () {
                this.iIndex = 0,
                    this.szIP = "",
                    this.iCGIPort = 80,
                    this.szDeviceIdentify = "",
                    this.iChannelID = "",
                    this.iPlayStatus = 0,
                    this.bSound = !1,
                    this.bRecord = !1,
                    this.bPTZAuto = !1,
                    this.bEZoom = !1,
                    this.b3DZoom = !1
            },
                K = function () {
                    this.options = {
                        type: "GET",
                        url: "",
                        auth: "",
                        timeout: 1e4,
                        data: "",
                        async: !0,
                        success: null,
                        error: null
                    },
                        this.m_szHttpHead = "",
                        this.m_szHttpContent = "",
                        this.m_szHttpData = ""
                };
            K.prototype.m_httpRequestSet = [], K.prototype.setRequestParam = function (e) {
                v.extend(this.options, e)
            },
                K.prototype.submitRequest = function () {
                    var e, t = null, n = this;
                    if (Z()) {
                        this.options.auth ? v.cookie("WebSession", this.options.auth) : v.cookie("WebSession", null);
                        var r = B(this.options.url), s = new window.XMLHttpRequest;
                        s.open(this.options.type, r, this.options.async);
                        if (p.proxyAddress) {
                            s.withCredentials = !0;
                            var o = (e = this.options.url, /^(http|https):\/\/([^\/]+)(.+)$/.test(e) ? RegExp.$2 : "");
                            s.setRequestHeader("deviceIdentify", o)
                        }
                        s.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                            s.setRequestHeader("If-Modified-Since", "0"),
                            s.send(this.options.data || null);
                        var i = function () {
                            if (4 === s.readyState) {
                                t = {
                                    funSuccessCallback: n.options.success,
                                    funErrorCallback: n.options.error
                                };
                                var e = s.status + s.responseText;
                                0 === s.status && (e = ""), n.httpDataAnalyse(t, e)
                            }
                        };
                        this.options.async ? (s.timeout = this.options.timeout, s.onreadystatechange = function () {
                            i()
                        }) : i()
                    }
                    else {
                        var a = this.getHttpMethod(this.options.type);
                        if (this.options.async) {
                            var u = y.HWP_SubmitHttpRequest(a, this.options.url, this.options.auth, this.options.data, this.options.timeout);
                            -1 != u && (t = {
                                iRequestID: u,
                                funSuccessCallback: this.options.success,
                                funErrorCallback: this.options.error
                            },
                                this.m_httpRequestSet.push(t))
                        }
                        else {
                            var c = y.HWP_SendHttpSynRequest(a, this.options.url, this.options.auth, this.options.data, this.options.timeout);
                            t = {
                                funSuccessCallback: this.options.success,
                                funErrorCallback: this.options.error
                            },
                                this.httpDataAnalyse(t, c)
                        }
                    }
                },
                K.prototype.getHttpMethod = function (e) {
                    var t = {
                        GET: 1,
                        POST: 2,
                        PUT: 5,
                        DELETE: 6
                    }[e];
                    return t || -1
                },
                K.prototype.processCallback = function (e, t) {
                    for (var n = null, r = 0; r < this.m_httpRequestSet.length; r++)
                        if (e == this.m_httpRequestSet[r].iRequestID) {
                            n = this.m_httpRequestSet[r], this.m_httpRequestSet.splice(r, 1);
                            break
                        }
                    null != n && (this.httpDataAnalyse(n, t), delete n)
                },
                K.prototype.httpDataAnalyse = function (e, t) {
                    var n = "", r = 0;
                    "" == t || M(t) ? e.funErrorCallback() : (r = parseInt(t.substring(0, 3)), n = t.substring(3, t.length), isNaN(r) ? e.funErrorCallback() : 200 == r ? this.options && -1 < this.options.url.indexOf("?format=json") ? e.funSuccessCallback(JSON.parse(n)) : e.funSuccessCallback(v.loadXML(n)) : e.funErrorCallback && e.funErrorCallback(r, v.loadXML(n)))
                };
            var e = function () { };
            e.prototype.CGI = {
                login: "%s%s:%s/ISAPI/Security/userCheck",
                getAudioInfo: "%s%s:%s/ISAPI/System/TwoWayAudio/channels",
                getDeviceInfo: "%s%s:%s/ISAPI/System/deviceInfo",
                getAnalogChannelInfo: "%s%s:%s/ISAPI/System/Video/inputs/channels",
                getDigitalChannel: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels",
                getDigitalChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/status",
                getZeroChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels",
                getStreamChannels: {
                    analog: "%s%s:%s/ISAPI/Streaming/channels",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels"
                },
                getStreamDynChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels",
                startRealPlay: {
                    channels: "%s%s:%s/PSIA/streaming/channels/%s",
                    zeroChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"
                },
                startShttpRealPlay: {
                    channels: "%s%s:%s/SDK/play/%s/004",
                    zeroChannels: "%s%s:%s/SDK/play/100/004/ZeroStreaming"
                },
                startWsRealPlay: {
                    channels: "%s%s:%s/%s",
                    zeroChannels: "%s%s:%s/%s"
                },
                startVoiceTalk: {
                    open: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/open",
                    close: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/close",
                    audioData: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/audioData"
                },
                ptzControl: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/continuous",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/continuous"
                },
                ptzAutoControl: {
                    ipdome: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto",
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/autoPan",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/autoPan"
                },
                setPreset: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s"
                },
                goPreset: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s/goto"
                },
                ptzFocus: {
                    analog: "%s%s:%s/ISAPI/Image/channels/%s/focus",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/focus",
                    ipc: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/focus"
                },
                ptzIris: {
                    analog: "%s%s:%s/ISAPI/Image/channels/%s/iris",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/iris",
                    ipc: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/iris"
                },
                getNetworkBond: "%s%s:%s/ISAPI/System/Network/Bond",
                getNetworkInterface: "%s%s:%s/ISAPI/System/Network/interfaces",
                getUPnPPortStatus: "%s%s:%s/ISAPI/System/Network/UPnP/ports/status",
                getPPPoEStatus: "%s%s:%s/ISAPI/System/Network/PPPoE/1/status",
                getPortInfo: "%s%s:%s/ISAPI/Security/adminAccesses",
                recordSearch: "%s%s:%s/ISAPI/ContentMgmt/search",
                startPlayback: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s",
                startWsPlayback: "%s%s:%s/%s",
                startShttpPlayback: "%s%s:%s/SDK/playback/%s",
                startShttpReversePlayback: "%s%s:%s/SDK/playback/%s/reversePlay",
                startTransCodePlayback: "%s%s:%s/SDK/playback/%s/transcoding",
                startDownloadRecord: "%s%s:%s/ISAPI/ContentMgmt/download",
                downloaddeviceConfig: "%s%s:%s/ISAPI/System/configurationData",
                uploaddeviceConfig: "%s%s:%s/ISAPI/System/configurationData",
                restart: "%s%s:%s/ISAPI/System/reboot",
                restore: "%s%s:%s/ISAPI/System/factoryReset?mode=%s",
                startUpgrade: {
                    upgrade: "%s%s:%s/ISAPI/System/updateFirmware",
                    status: "%s%s:%s/ISAPI/System/upgradeStatus"
                },
                set3DZoom: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/position3D",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/position3D"
                },
                getSecurityVersion: "%s%s:%s/ISAPI/Security/capabilities?username=admin",
                SDKCapabilities: "%s%s:%s/SDK/capabilities",
                deviceCapture: {
                    channels: "%s%s:%s/ISAPI/Streaming/channels/%s/picture"
                },
                overlayInfo: {
                    analog: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/overlays/",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/overlays"
                },
                sessionCap: "%s%s:%s/ISAPI/Security/sessionLogin/capabilities?username=%s",
                sessionLogin: "%s%s:%s/ISAPI/Security/sessionLogin",
                sessionHeartbeat: "%s%s:%s/ISAPI/Security/sessionHeartbeat",
                sessionLogout: "%s%s:%s/ISAPI/Security/sessionLogout",
                systemCapabilities: "%s%s:%s/ISAPI/System/capabilities"
            },
                e.prototype.login = function (e, t, n, r) {
                    var s = 2 == r.protocol ? "https://" : "http://", o = b(this.CGI.login, s, e, t), i = new K, a = {
                        type: "GET",
                        url: o,
                        auth: n,
                        success: null,
                        error: null
                    };
                    v.extend(a, r), v.extend(a, {
                        success: function (e) {
                            r.success && r.success(e)
                        },
                        error: function (e, t) {
                            r.error && r.error(e, t)
                        }
                    }), i.setRequestParam(a), i.submitRequest()
                },
                e.prototype.getAudioInfo = function (e, n) {
                    var t = b(this.CGI.getAudioInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getSecurityVersion = function (e, n) {
                    var t = b(this.CGI.getSecurityVersion, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getDeviceInfo = function (e, n) {
                    var t = b(this.CGI.getDeviceInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            var t = [];
                            t.push("<DeviceInfo>"),
                                t.push("<deviceName>" + v.escape(re.$XML(e).find("deviceName").eq(0).text()) + "</deviceName>"),
                                t.push("<deviceID>" + re.$XML(e).find("deviceID").eq(0).text() + "</deviceID>"),
                                t.push("<deviceType>" + re.$XML(e).find("deviceType").eq(0).text() + "</deviceType>"),
                                t.push("<model>" + re.$XML(e).find("model").eq(0).text() + "</model>"),
                                t.push("<serialNumber>" + re.$XML(e).find("serialNumber").eq(0).text() + "</serialNumber>"),
                                t.push("<macAddress>" + re.$XML(e).find("macAddress").eq(0).text() + "</macAddress>"),
                                t.push("<firmwareVersion>" + re.$XML(e).find("firmwareVersion").eq(0).text() + "</firmwareVersion>"),
                                t.push("<firmwareReleasedDate>" + re.$XML(e).find("firmwareReleasedDate").eq(0).text() + "</firmwareReleasedDate>"),
                                t.push("<encoderVersion>" + re.$XML(e).find("encoderVersion").eq(0).text() + "</encoderVersion>"),
                                t.push("<encoderReleasedDate>" + re.$XML(e).find("encoderReleasedDate").eq(0).text() + "</encoderReleasedDate>"),
                                t.push("</DeviceInfo>"),
                                e = v.loadXML(t.join("")),
                                n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getAnalogChannelInfo = function (e, i) {
                    var aa = e;
                    var t = b(this.CGI.getAnalogChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), n = new K, r = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(r, i), v.extend(r, {
                        success: function (e) {
                            var t = [];
                            t.push("<VideoInputChannelList>");
                            aa.iAnalogChannelNum = re.$XML(e).find("VideoInputChannel", !0).length;
                            for (var n = re.$XML(e).find("VideoInputChannel", !0), r = 0, s = n.length; r < s; r++) {
                                var o = n[r];
                                t.push("<VideoInputChannel>"), t.push("<id>" + re.$XML(o).find("id").eq(0).text() + "</id>"), t.push("<inputPort>" + re.$XML(o).find("inputPort").eq(0).text() + "</inputPort>"), t.push("<name>" + v.escape(re.$XML(o).find("name").eq(0).text()) + "</name>"), t.push("<videoFormat>" + re.$XML(o).find("videoFormat").eq(0).text() + "</videoFormat>"), t.push("</VideoInputChannel>")
                            }
                            t.push("</VideoInputChannelList>"), e = v.loadXML(t.join("")), i.success && i.success(e)
                        },
                        error: function (e, t) {
                            i.error && i.error(e, t)
                        }
                    }), n.setRequestParam(r), n.submitRequest()
                },
                e.prototype.getDigitalChannel = function (e, i) {
                    var t = b(this.CGI.getDigitalChannel, e.szHttpProtocol, e.szIP, e.iCGIPort), n = new K, r = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(r, i), v.extend(r, {
                        success: function (e) {
                            var t = [];
                            t.push("<InputProxyChannelList>");
                            for (var n = re.$XML(e).find("InputProxyChannel", !0), r = 0, s = n.length; r < s; r++) {
                                var o = n[r];
                                t.push("<InputProxyChannel>"), t.push("<id>" + re.$XML(o).find("id").eq(0).text() + "</id>"), t.push("<name>" + v.escape(re.$XML(o).find("name").eq(0).text()) + "</name>"), t.push("</InputProxyChannel>")
                            }
                            t.push("</InputProxyChannelList>"), e = v.loadXML(t.join("")), i.success && i.success(e)
                        },
                        error: function (e, t) {
                            i.error && i.error(e, t)
                        }
                    }), n.setRequestParam(r), n.submitRequest()
                },
                e.prototype.getDigitalChannelInfo = function (e, a) {
                    var u = null, c = {};
                    if (this.getDigitalChannel(e, {
                        async: !1,
                        success: function (e) {
                            u = e;
                            for (var t = re.$XML(u).find("InputProxyChannel", !0), n = 0, r = t.length; n < r; n++) {
                                var s = t[n], o = re.$XML(s).find("id").eq(0).text(), i = re.$XML(s).find("name").eq(0).text();
                                c[o] = i
                            }
                        },
                        error: function (e, t) {
                            a.error && a.error(e, t)
                        }
                    }), null !== u) {
                        var t = b(this.CGI.getDigitalChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), n = new K, r = {
                            type: "GET",
                            url: t,
                            auth: e.szAuth,
                            success: null,
                            error: null
                        };
                        v.extend(r, a), v.extend(r, {
                            success: function (e) {
                                var t = [];
                                t.push("<InputProxyChannelStatusList>");
                                for (var n = re.$XML(e).find("InputProxyChannelStatus", !0), r = 0, s = n.length; r < s; r++) {
                                    var o = n[r], i = re.$XML(o).find("id").eq(0).text();
                                    t.push("<InputProxyChannelStatus>"),
                                        t.push("<id>" + i + "</id>"),
                                        t.push("<sourceInputPortDescriptor>"),
                                        t.push("<proxyProtocol>" + re.$XML(o).find("proxyProtocol").eq(0).text() + "</proxyProtocol>"),
                                        t.push("<addressingFormatType>" + re.$XML(o).find("addressingFormatType").eq(0).text() + "</addressingFormatType>"),
                                        t.push("<ipAddress>" + re.$XML(o).find("ipAddress").eq(0).text() + "</ipAddress>"),
                                        t.push("<managePortNo>" + re.$XML(o).find("managePortNo").eq(0).text() + "</managePortNo>"),
                                        t.push("<srcInputPort>" + re.$XML(o).find("srcInputPort").eq(0).text() + "</srcInputPort>"),
                                        t.push("<userName>" + v.escape(re.$XML(o).find("userName").eq(0).text()) + "</userName>"),
                                        t.push("<streamType>" + re.$XML(o).find("streamType").eq(0).text() + "</streamType>"),
                                        t.push("<online>" + re.$XML(o).find("online").eq(0).text() + "</online>"),
                                        t.push("<name>" + v.escape(c[i]) + "</name>"),
                                        t.push("</sourceInputPortDescriptor>"),
                                        t.push("</InputProxyChannelStatus>")
                                }
                                t.push("</InputProxyChannelStatusList>"), e = v.loadXML(t.join("")), a.success && a.success(e)
                            },
                            error: function (e, t) {
                                a.error && a.error(e, t)
                            }
                        }), n.setRequestParam(r), n.submitRequest()
                    }
                },
                e.prototype.getZeroChannelInfo = function (e, n) {
                    var t = b(this.CGI.getZeroChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getStreamChannels = function (e, n) {
                    if (0 != e.iAnalogChannelNum)
                        var t = b(this.CGI.getStreamChannels.analog, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    else t = b(this.CGI.getStreamChannels.digital, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    var r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getPPPoEStatus = function (e, n) {
                    var t = b(this.CGI.getPPPoEStatus, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getUPnPPortStatus = function (e, n) {
                    var t = b(this.CGI.getUPnPPortStatus, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getNetworkBond = function (e, n) {
                    var t = b(this.CGI.getNetworkBond, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getNetworkInterface = function (e, n) {
                    var t = b(this.CGI.getNetworkInterface, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getPortInfo = function (e, n) {
                    var t = b(this.CGI.getPortInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.startRealPlay = function (t, n) {
                    var e = 100 * n.iChannelID + n.iStreamType, r = "", s = t.szIP;
                    if ("rtsp://" === n.urlProtocol && (s = A(s)), r = n.bZeroChannel ? (Z() && (e = 0), b(n.cgi.zeroChannels, n.urlProtocol, s, n.iPort, e)) : b(n.cgi.channels, n.urlProtocol, s, n.iPort, e), p.proxyAddress && Z()) {
                        v.cookie("webVideoCtrlProxy", s + ":" + n.iPort, {
                            raw: !0
                        }), r = b(n.cgi.zeroChannels, n.urlProtocol, p.proxyAddress.ip, p.proxyAddress.wsport, e);
                        var o = s + ":" + n.iPort;
                        -1 < r.indexOf("?") ? r += "&deviceIdentify=" + o : r += "?deviceIdentify=" + o
                    }
                    var i = function () {
                        var e = new J;
                        e.iIndex = n.iWndIndex, e.szIP = t.szIP, e.iCGIPort = t.iCGIPort, e.szDeviceIdentify = t.szDeviceIdentify, e.iChannelID = n.iChannelID, e.iPlayStatus = 1, m.push(e)
                    }, a = $.Deferred();
                    if (Z()) {
                        var u = {};
                        u = t.oAuthType[s] < 2 ? {
                            sessionID: t.szAuth
                        }
                            : {
                                token: L(0, t.szDeviceIdentify)
                            }, y.JS_Play(r, u, n.iWndIndex).then(function () {
                                i(), a.resolve()
                            }, function () {
                                a.reject()
                            })
                    }
                    else 0 == y.HWP_Play(r, t.szAuth, n.iWndIndex, "", "") ? (i(), a.resolve()) : a.reject();
                    return a
                },
                e.prototype.startVoiceTalk = function (e, t) {
                    var n = b(this.CGI.startVoiceTalk.open, e.szHttpProtocol, e.szIP, e.iCGIPort, t), r = b(this.CGI.startVoiceTalk.close, e.szHttpProtocol, e.szIP, e.iCGIPort, t), s = b(this.CGI.startVoiceTalk.audioData, e.szHttpProtocol, e.szIP, e.iCGIPort, t);
                    return y.HWP_StartVoiceTalkEx(n, r, s, e.szAuth, e.iAudioType, e.m_iAudioBitRate, e.m_iAudioSamplingRate)
                },
                e.prototype.ptzAutoControl = function (s, e, o, i) {
                    var t = o.iChannelID, a = "", u = "";
                    if (i.iPTZSpeed = i.iPTZSpeed < 7 ? 15 * i.iPTZSpeed : 100, e && (i.iPTZSpeed = 0), s.szDeviceType != D) a = t <= s.iAnalogChannelNum ? b(this.CGI.ptzAutoControl.analog, s.szHttpProtocol, s.szIP, s.iCGIPort, o.iChannelID) : o.bShttpIPChannel ? b(this.CGI.ptzAutoControl.digital, s.szHttpProtocol, s.szIP, s.iCGIPort, o.iChannelID - s.oStreamCapa.iIpChanBase + 1 + s.iAnalogChannelNum) : b(this.CGI.ptzAutoControl.digital, s.szHttpProtocol, s.szIP, s.iCGIPort, o.iChannelID), u = "<?xml version='1.0' encoding='UTF-8'?><autoPanData><autoPan>" + i.iPTZSpeed + "</autoPan></autoPanData>";
                    else {
                        0 === i.iPTZSpeed && (e = !0);
                        var n = 99;
                        e && (n = 96), a = b(this.CGI.ptzAutoControl.ipdome, s.szHttpProtocol, s.szIP, s.iCGIPort, o.iChannelID, n)
                    }
                    var r = new K, c = {
                        type: "PUT",
                        url: a,
                        async: !1,
                        auth: s.szAuth,
                        data: u,
                        success: null,
                        error: null
                    }, l = this;
                    v.extend(c, i), v.extend(c, {
                        success: function (e) {
                            o.bPTZAuto = !o.bPTZAuto, i.success && i.success(e)
                        },
                        error: function (e, t) {
                            if (d == s.szDeviceType || z == s.szDeviceType) {
                                a = o.bShttpIPChannel ? b(l.CGI.ptzControl.analog, s.szHttpProtocol, s.szIP, s.iCGIPort, o.iChannelID - s.oStreamCapa.iIpChanBase + 1 + s.iAnalogChannelNum) : b(l.CGI.ptzControl.analog, s.szHttpProtocol, s.szIP, s.iCGIPort, o.iChannelID), u = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + i.iPTZSpeed + "</pan><tilt>0</tilt></PTZData>";
                                var n = new K, r = {
                                    type: "PUT",
                                    url: a,
                                    async: !1,
                                    auth: s.szAuth,
                                    data: u,
                                    success: null,
                                    error: null
                                };
                                v.extend(r, i), n.setRequestParam(r), n.submitRequest()
                            }
                            else i.error && i.error(e, t)
                        }
                    }), r.setRequestParam(c), r.submitRequest()
                },
                e.prototype.ptzControl = function (e, t, n, r) {
                    var s = n.iChannelID, o = "";
                    n.bPTZAuto && this.ptzAutoControl(e, !0, n, {
                        iPTZSpeed: 0
                    }), r.iPTZSpeed = t ? 0 : r.iPTZSpeed < 7 ? 15 * r.iPTZSpeed : 100;
                    var i = [
                        {},
                        { pan: 0, tilt: r.iPTZSpeed },
                        { pan: 0, tilt: -r.iPTZSpeed },
                        { pan: -r.iPTZSpeed, tilt: 0 },
                        { pan: r.iPTZSpeed, tilt: 0 },
                        { pan: -r.iPTZSpeed, tilt: r.iPTZSpeed },
                        { pan: -r.iPTZSpeed, tilt: -r.iPTZSpeed },
                        { pan: r.iPTZSpeed, tilt: r.iPTZSpeed },
                        { pan: r.iPTZSpeed, tilt: -r.iPTZSpeed },
                        {},
                        { speed: r.iPTZSpeed },
                        { speed: -r.iPTZSpeed },
                        { speed: r.iPTZSpeed },
                        { speed: -r.iPTZSpeed },
                        { speed: r.iPTZSpeed },
                        { speed: -r.iPTZSpeed }
                    ], a = "", u = {};
                    switch (r.iPTZIndex) {
                        case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
                            u = this.CGI.ptzControl, a = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + i[r.iPTZIndex].pan + "</pan><tilt>" + i[r.iPTZIndex].tilt + "</tilt></PTZData>";
                            break;
                        case 10: case 11:
                            u = this.CGI.ptzControl, a = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + i[r.iPTZIndex].speed + "</zoom></PTZData>";
                            break;
                        case 12: case 13:
                            u = this.CGI.ptzFocus, a = "<?xml version='1.0' encoding='UTF-8'?><FocusData><focus>" + i[r.iPTZIndex].speed + "</focus></FocusData>";
                            break;
                        case 14: case 15:
                            u = this.CGI.ptzIris, a = "<?xml version='1.0' encoding='UTF-8'?><IrisData><iris>" + i[r.iPTZIndex].speed + "</iris></IrisData>";
                            break;
                        default:
                            return void (r.error && r.error())
                    }o = u != this.CGI.ptzFocus && u != this.CGI.ptzIris || e.szDeviceType != d && e.szDeviceType != D && e.szDeviceType != z ? s <= e.iAnalogChannelNum ? b(u.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID) : n.bShttpIPChannel ? b(u.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : b(u.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID) : b(u.ipc, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID);
                    var c = new K, l = {
                        type: "PUT",
                        url: o,
                        async: !1,
                        auth: e.szAuth,
                        data: a,
                        success: null,
                        error: null
                    };
                    v.extend(l, r), v.extend(l, {
                        success: function (e) {
                            r.success && r.success(e)
                        },
                        error: function (e, t) {
                            r.error && r.error(e, t)
                        }
                    }), c.setRequestParam(l), c.submitRequest()
                },
                e.prototype.setPreset = function (e, t, n) {
                    var r = "", s = "";
                    r = t.iChannelID <= e.iAnalogChannelNum ? b(this.CGI.setPreset.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID) : t.bShttpIPChannel ? b(this.CGI.setPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum, n.iPresetID) : b(this.CGI.setPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID), s = "<?xml version='1.0' encoding='UTF-8'?>", s += "<PTZPreset>", s += "<id>" + n.iPresetID + "</id>", e.szDeviceType != D && (s += "<presetName>Preset" + n.iPresetID + "</presetName>"), s += "</PTZPreset>";
                    var o = new K, i = {
                        type: "PUT",
                        url: r,
                        auth: e.szAuth,
                        data: s,
                        success: null,
                        error: null
                    };
                    v.extend(i, n), v.extend(i, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), o.setRequestParam(i), o.submitRequest()
                },
                e.prototype.goPreset = function (e, t, n) {
                    var r = "";
                    r = t.iChannelID <= e.iAnalogChannelNum ? b(this.CGI.goPreset.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID) : t.bShttpIPChannel ? b(this.CGI.goPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum, n.iPresetID) : b(this.CGI.goPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID);
                    var s = new K, o = {
                        type: "PUT",
                        url: r,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(o, n), v.extend(o, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), s.setRequestParam(o), s.submitRequest()
                },
                e.prototype.overlayInfo = function () {
                    return szUrl = this.CGI.overlayInfo.analog, szUrl
                },
                e.prototype.recordSearch = function (e, i) {
                    var t, n, r = i.iChannelID, s = i.iStreamType, o = i.szStartTime.replace(" ", "T") + "Z", a = i.szEndTime.replace(" ", "T") + "Z";
                    t = b(this.CGI.recordSearch, e.szHttpProtocol, e.szIP, e.iCGIPort), n = "<?xml version='1.0' encoding='UTF-8'?><CMSearchDescription><searchID>" + new te + "</searchID><trackList><trackID>" + (100 * r + s) + "</trackID></trackList><timeSpanList><timeSpan><startTime>" + o + "</startTime><endTime>" + a + "</endTime></timeSpan></timeSpanList><maxResults>40</maxResults><searchResultPostion>" + i.iSearchPos + "</searchResultPostion><metadataList><metadataDescriptor>//metadata.ISAPI.org/VideoMotion</metadataDescriptor></metadataList></CMSearchDescription>";
                    var u = new K, c = {
                        type: "POST",
                        url: t,
                        auth: e.szAuth,
                        data: n,
                        success: null,
                        error: null
                    };
                    v.extend(c, i), v.extend(c, {
                        success: function (e) {
                            var t = [];
                            t.push("<CMSearchResult>"), t.push("<responseStatus>" + re.$XML(e).find("responseStatus").eq(0).text() + "</responseStatus>"), t.push("<responseStatusStrg>" + re.$XML(e).find("responseStatusStrg").eq(0).text() + "</responseStatusStrg>"), t.push("<numOfMatches>" + re.$XML(e).find("numOfMatches").eq(0).text() + "</numOfMatches>"), t.push("<matchList>");
                            for (var n = re.$XML(e).find("searchMatchItem", !0), r = 0, s = n.length; r < s; r++) {
                                var o = n[r];
                                t.push("<searchMatchItem>"), t.push("<trackID>" + re.$XML(o).find("trackID").eq(0).text() + "</trackID>"), t.push("<startTime>" + re.$XML(o).find("startTime").eq(0).text() + "</startTime>"), t.push("<endTime>" + re.$XML(o).find("endTime").eq(0).text() + "</endTime>"), t.push("<playbackURI>" + v.escape(re.$XML(o).find("playbackURI").eq(0).text()) + "</playbackURI>"), t.push("<metadataDescriptor>" + re.$XML(o).find("metadataDescriptor").eq(0).text().split("/")[1] + "</metadataDescriptor>"), t.push("</searchMatchItem>")
                            }
                            t.push("</matchList>"), t.push("</CMSearchResult>"), e = v.loadXML(t.join("")), i.success && i.success(e)
                        },
                        error: function (e, t) {
                            i.error && i.error(e, t)
                        }
                    }), u.setRequestParam(c), u.submitRequest()
                },
                e.prototype.startPlayback = function (t, n) {
                    var r = n.iWndIndex, e = "", s = n.szStartTime, o = n.szEndTime, i = t.szIP;
                    if ("rtsp://" === n.urlProtocol && (i = A(i)), Z())
                        if (p.proxyAddress) {
                            v.cookie("webVideoCtrlProxy", i + ":" + n.iPort, {
                                raw: !0
                            }), e = b(n.cgi, n.urlProtocol, p.proxyAddress.ip, p.proxyAddress.wsport, n.iChannelID);
                            var a = i + ":" + n.iPort;
                            -1 < e.indexOf("?") ? e += "&deviceIdentify=" + a : e += "?deviceIdentify=" + a
                        }
                        else e = b(n.cgi, n.urlProtocol, i, n.iPort, n.iChannelID, s, o);
                    else e = b(n.cgi, n.urlProtocol, i, n.iPort, n.iChannelID, s, o);
                    if (!M(n.oTransCodeParam)) {
                        var u = function (e) {
                            var t = {
                                TransFrameRate: "",
                                TransResolution: "",
                                TransBitrate: ""
                            };
                            if (v.extend(t, e), "" == t.TransFrameRate || "" == t.TransResolution || "" == t.TransBitrate)
                                return "";
                            var n = [];
                            return n.push("<?xml version='1.0' encoding='UTF-8'?>"), n.push("<CompressionInfo>"), n.push("<TransFrameRate>" + t.TransFrameRate + "</TransFrameRate>"), n.push("<TransResolution>" + t.TransResolution + "</TransResolution>"), n.push("<TransBitrate>" + t.TransBitrate + "</TransBitrate>"), n.push("</CompressionInfo>"), n.join("")
                        }(n.oTransCodeParam);
                        if ("" == u)
                            return -1;
                        y.HWP_SetTrsPlayBackParam(r, u)
                    }
                    var c = function () {
                        var e = new J;
                        e.iIndex = r, e.szIP = t.szIP, e.iCGIPort = t.iCGIPort, e.szDeviceIdentify = t.szDeviceIdentify, e.iChannelID = n.iChannelID, e.iPlayStatus = 2, m.push(e)
                    }, l = $.Deferred();
                    if (Z()) {
                        var d = {};
                        d = t.oAuthType[i] < 2 ? {
                            sessionID: t.szAuth
                        }
                            : {
                                token: L(0, t.szDeviceIdentify)
                            }, y.JS_Play(e, d, r, s, o).then(function () {
                                c(), l.resolve()
                            }, function () {
                                l.reject()
                            })
                    }
                    else {
                        0 == y.HWP_Play(e, t.szAuth, r, s, o) ? (c(), l.resolve()) : l.reject()
                    }
                    return l
                },
                e.prototype.reversePlayback = function (e, t) {
                    var n = t.iWndIndex, r = t.szStartTime, s = t.szEndTime, o = e.szIP;
                    "rtsp://" === t.urlProtocol && (o = A(o));
                    var i = b(t.cgi, t.urlProtocol, o, t.iPort, t.iChannelID, r, s), a = y.HWP_ReversePlay(i, e.szAuth, n, r, s);
                    if (0 == a) {
                        var u = new J;
                        u.iIndex = n, u.szIP = e.szIP, u.iCGIPort = e.iCGIPort, u.szDeviceIdentify = e.szDeviceIdentify, u.iChannelID = t.iChannelID, u.iPlayStatus = 5, m.push(u)
                    }
                    return a
                },
                e.prototype.startDownloadRecord = function (e, t) {
                    var n = b(this.CGI.startDownloadRecord, e.szHttpProtocol, e.szIP, e.iCGIPort), r = "<?xml version='1.0' encoding='UTF-8'?><downloadRequest><playbackURI> " + v.escape(t.szPlaybackURI) + "</playbackURI></downloadRequest>";
                    return Z() ? (n = B(n), y.JS_StartDownload(n, e.szAuth, t.szFileName, r)) : y.HWP_StartDownload(n, e.szAuth, t.szFileName, r, t.bDateDir)
                },
                e.prototype.exportDeviceConfig = function (e, t) {
                    var n = b(this.CGI.downloaddeviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    if (Z()) {
                        var r = {
                            type: "PUT",
                            url: n,
                            auth: e.szAuth,
                            success: function () { },
                            error: function () { }
                        }, s = new K;
                        return s.setRequestParam(r), s.submitRequest(), n = B(n), t && (n = v.exportPasswordDeviceConfig(n, t)), y.JS_ExportDeviceConfig(n)
                    }
                    return t && (n = v.exportPasswordDeviceConfig(n, t)), y.HWP_ExportDeviceConfig(n, e.szAuth, "", 0)
                },
                e.prototype.importDeviceConfig = function (e, t, n) {
                    var r = b(this.CGI.uploaddeviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    if (Z()) {
                        var s = {
                            type: "PUT",
                            url: r,
                            auth: e.szAuth,
                            success: function () { },
                            error: function () { }
                        }, o = new K;
                        return o.setRequestParam(s), o.submitRequest(), r = B(r), n && (r = v.exportPasswordDeviceConfig(r, n)), y.JS_UploadFile(r)
                    }
                    return n && (r = v.exportPasswordDeviceConfig(r, n)), y.HWP_ImportDeviceConfig(r, e.szAuth, t.szFileName, 0)
                },
                e.prototype.restart = function (e, n) {
                    var t = b(this.CGI.restart, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "PUT",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.restore = function (e, t, n) {
                    var r = b(this.CGI.restore, e.szHttpProtocol, e.szIP, e.iCGIPort, t), s = new K, o = {
                        type: "PUT",
                        url: r,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(o, n), v.extend(o, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), s.setRequestParam(o), s.submitRequest()
                },
                e.prototype.startUpgrade = function (e, t) {
                    $.Deferred();
                    var n = b(this.CGI.startUpgrade.upgrade, e.szHttpProtocol, e.szIP, e.iCGIPort), r = b(this.CGI.startUpgrade.status, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    return szRet = y.HWP_StartUpgrade(n, r, e.szAuth, t.szFileName)
                },
                e.prototype.asyncstartUpgrade = function (e, t) {
                    var n = $.Deferred(), r = b(this.CGI.startUpgrade.upgrade, e.szHttpProtocol, e.szIP, e.iCGIPort), s = b(this.CGI.startUpgrade.status, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    if (Z()) r = B(r), s = B(s), y.JS_StartUpgradeEx(r, s).then(function (e) {
                        n.resolve(e)
                    }, function () {
                        n.reject(o)
                    });
                    else {
                        var o = y.HWP_StartUpgrade(r, s, e.szAuth, t.szFileName);
                        0 === o ? n.resolve(o) : n.reject(o)
                    }
                    return n
                },
                e.prototype.set3DZoom = function (e, t, n, r) {
                    var s = "";
                    if (s = t.iChannelID <= e.iAnalogChannelNum ? b(this.CGI.set3DZoom.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID) : t.bShttpIPChannel ? b(this.CGI.set3DZoom.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : b(this.CGI.set3DZoom.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID), Z())
                        var o = v.loadXML(n), i = parseInt(n.startPos[0] / h * 255, 10), a = parseInt(n.startPos[1] / f * 255, 10), u = parseInt(n.endPos[0] / h * 255, 10), c = parseInt(n.endPos[1] / f * 255, 10);
                    else o = v.loadXML(n), i = parseInt(re.$XML(o).find("StartPoint").eq(0).find("positionX").eq(0).text(), 10), a = parseInt(re.$XML(o).find("StartPoint").eq(0).find("positionY").eq(0).text(), 10), u = parseInt(re.$XML(o).find("EndPoint").eq(0).find("positionX").eq(0).text(), 10), c = parseInt(re.$XML(o).find("EndPoint").eq(0).find("positionY").eq(0).text(), 10);
                    var l = "<?xml version='1.0' encoding='UTF-8'?><Position3D><StartPoint><positionX>" + i + "</positionX><positionY>" + (255 - a) + "</positionY></StartPoint><EndPoint><positionX>" + u + "</positionX><positionY>" + (255 - c) + "</positionY></EndPoint></Position3D>", d = new K, p = {
                        type: "PUT",
                        url: s,
                        data: l,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(p, r), v.extend(p, {
                        success: function (e) {
                            r.success && r.success(e)
                        },
                        error: function (e, t) {
                            r.error && r.error(e, t)
                        }
                    }), d.setRequestParam(p), d.submitRequest()
                },
                e.prototype.getSDKCapa = function (e, n) {
                    var t = b(this.CGI.SDKCapabilities, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        async: !1,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.deviceCapturePic = function (e, t, n, r) {
                    t = 100 * t + 1;
                    var s, o, i = -1, a = b(this.CGI.deviceCapture.channels, e.szHttpProtocol, e.szIP, e.iCGIPort, t), u = [];
                    if (v.isInt(r.iResolutionWidth) && u.push("videoResolutionWidth=" + r.iResolutionWidth), v.isInt(r.iResolutionHeight) && u.push("videoResolutionHeight=" + r.iResolutionHeight), 0 < u.length && (a += "?" + u.join("&")), Z()) {
                        a = B(a), s = a, o = n, $("body").append('<a id="jsplugin_download_a" href="' + s + '" download=' + o + '.jpg><li id="jsplugin_download_li"></li></a>'), $("#jsplugin_download_li").trigger("click"), $("#jsplugin_download_a").remove(), i = 0
                    }
                    else i = y.HWP_DeviceCapturePic(a, e.szAuth, n, r.bDateDir);
                    return i
                },
                e.prototype.getSessionV2Cap = function (e, t, n, r, s, o) {
                    var i = "";
                    i = 2 == n ? "https://" : "http://";
                    var a = b(this.CGI.sessionCap, i, t, r, encodeURIComponent(s));
                    a = a + "&random:" + e;
                    var u = new K, c = {
                        type: "GET",
                        url: a,
                        auth: "",
                        success: null,
                        error: null
                    };
                    v.extend(c, o), v.extend(c, {
                        success: function (e) {
                            o.success && o.success(e)
                        },
                        error: function (e, t) {
                            o.error && o.error(e, t)
                        }
                    }), u.setRequestParam(c), u.submitRequest()
                },
                e.prototype.getSessionCap = function (e, t, n, r, s) {
                    var o = "";
                    o = 2 == t ? "https://" : "http://";
                    var i = b(this.CGI.sessionCap, o, e, n, encodeURIComponent(r)), a = new K, u = {
                        type: "GET",
                        url: i,
                        auth: "",
                        success: null,
                        error: null
                    };
                    v.extend(u, s), v.extend(u, {
                        success: function (e) {
                            s.success && s.success(e)
                        },
                        error: function (e, t) {
                            s.error && s.error(e, t)
                        }
                    }), a.setRequestParam(u), a.submitRequest()
                },
                e.prototype.sessionV2Login = function (e, t, n, r, s, o, i, a) {
                    var u = "";
                    u = 2 == n ? "https://" : "http://";
                    var c = parseInt(re.$XML(i).find("sessionIDVersion").eq(0).text(), 10), l = "true" === re.$XML(i).find("isSessionIDValidLongTerm").eq(0).text(), d = b(this.CGI.sessionLogin, u, t, r), p = re.$XML(i).find("sessionID").eq(0).text(), h = re.$XML(i).find("challenge").eq(0).text(), f = parseInt(re.$XML(i).find("iterations").eq(0).text(), 10), P = !1, I = "";
                    0 < re.$XML(i).find("isIrreversible", !0).length && (P = "true" === re.$XML(i).find("isIrreversible").eq(0).text(), I = re.$XML(i).find("salt").eq(0).text()), this.m_oInfoForLocalPlgin = {
                        szRandom: e,
                        sessionID: p,
                        iterations: f,
                        challenge: h,
                        user: s
                    };
                    var m = v.encodePwd(o, {
                        challenge: h,
                        userName: s,
                        salt: I,
                        iIterate: f
                    }, P), S = "<SessionLogin>";
                    S += "<userName>" + v.escape(s) + "</userName>", S += "<password>" + m + "</password>", S += "<sessionID>" + p + "</sessionID>", S += "<isSessionIDValidLongTerm>" + l + "</isSessionIDValidLongTerm>", S += "<sessionIDVersion>" + c + "</sessionIDVersion>", S += "</SessionLogin>";
                    var C = new K, y = {
                        type: "POST",
                        url: d,
                        data: S,
                        auth: "",
                        success: null,
                        error: null
                    };
                    v.extend(y, a), v.extend(y, {
                        success: function (e) {
                            a.success && a.success(e)
                        },
                        error: function (e, t) {
                            a.error && a.error(e, t)
                        }
                    }), C.setRequestParam(y), C.submitRequest()
                },
                e.prototype.sessionLogin = function (e, t, n, r, s, o, i) {
                    var a = "";
                    a = 2 == t ? "https://" : "http://";
                    var u = b(this.CGI.sessionLogin, a, e, n), c = re.$XML(o).find("sessionID").eq(0).text(), l = re.$XML(o).find("challenge").eq(0).text(), d = parseInt(re.$XML(o).find("iterations").eq(0).text(), 10), p = !1, h = "";
                    0 < re.$XML(o).find("isIrreversible", !0).length && (p = "true" === re.$XML(o).find("isIrreversible").eq(0).text(), h = re.$XML(o).find("salt").eq(0).text());
                    var f = "";
                    if (p) {
                        f = v.sha256(r + h + s), f = v.sha256(f + l);
                        for (P = 2; P < d; P++)
                            f = v.sha256(f)
                    }
                    else {
                        f = v.sha256(s) + l;
                        for (var P = 1; P < d; P++)
                            f = v.sha256(f)
                    }
                    var I = "<SessionLogin>";
                    I += "<userName>" + v.escape(r) + "</userName>", I += "<password>" + f + "</password>", I += "<sessionID>" + c + "</sessionID>", I += "</SessionLogin>";
                    var m = new K, S = {
                        type: "POST",
                        url: u,
                        data: I,
                        auth: "",
                        success: null,
                        error: null
                    };
                    v.extend(S, i), v.extend(S, {
                        success: function (e) {
                            i.success && i.success(e)
                        },
                        error: function (e, t) {
                            i.error && i.error(e, t)
                        }
                    }), m.setRequestParam(S), m.submitRequest()
                },
                e.prototype.sessionHeartbeat = function (e, t, n) {
                    var r = b(this.CGI.sessionHeartbeat, e.szHttpProtocol, e.szIP, e.iCGIPort), s = new K, o = {
                        type: "PUT",
                        url: r,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(o, {
                        success: function (e) {
                            t && t(e)
                        },
                        error: function (e, t) {
                            n && n(e, t)
                        }
                    }), s.setRequestParam(o), s.submitRequest()
                },
                e.prototype.sessionLogout = function (e, n) {
                    var t = b(this.CGI.sessionLogout, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "PUT",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                e.prototype.getSystemCapa = function (e, n) {
                    var t = b(this.CGI.systemCapabilities, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        async: !1,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                };
            var n = function () { };
            n.prototype.CGI = {
                login: "%s%s:%s/PSIA/Custom/SelfExt/userCheck",
                getAudioInfo: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels",
                getDeviceInfo: "%s%s:%s/PSIA/System/deviceInfo",
                getAnalogChannelInfo: "%s%s:%s/PSIA/System/Video/inputs/channels",
                getDigitalChannel: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynVideo/inputs/channels",
                getDigitalChannelInfo: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynVideo/inputs/channels/status",
                getZeroChannelInfo: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroVideo/channels",
                getStreamChannels: {
                    analog: "%s%s:%s/PSIA/Streaming/channels",
                    digital: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels"
                },
                getStreamDynChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels",
                startRealPlay: {
                    channels: "%s%s:%s/PSIA/streaming/channels/%s",
                    zeroChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"
                },
                startVoiceTalk: {
                    open: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/open",
                    close: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/close",
                    audioData: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/audioData"
                },
                ptzControl: "%s%s:%s/PSIA/PTZ/channels/%s/continuous",
                ptzAutoControl: "%s%s:%s/PSIA/Custom/SelfExt/PTZ/channels/%s/autoptz",
                setPreset: "%s%s:%s/PSIA/PTZ/channels/%s/presets/%s",
                goPreset: "%s%s:%s/PSIA/PTZ/channels/%s/presets/%s/goto",
                ptzFocus: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/focus",
                ptzIris: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/iris",
                getNetworkBond: "%s%s:%s/PSIA/Custom/SelfExt/Bond",
                getNetworkInterface: "%s%s:%s/PSIA/System/Network/interfaces",
                getUPnPPortStatus: "%s%s:%s/PSIA/Custom/SelfExt/UPnP/ports/status",
                getPPPoEStatus: "%s%s:%s/PSIA/Custom/SelfExt/PPPoE/1/status",
                getPortInfo: "%s%s:%s/PSIA/Security/AAA/adminAccesses",
                recordSearch: "%s%s:%s/PSIA/ContentMgmt/search",
                startPlayback: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s",
                startDownloadRecord: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/download",
                deviceConfig: "%s%s:%s/PSIA/System/configurationData",
                restart: "%s%s:%s/PSIA/System/reboot",
                restore: "%s%s:%s/PSIA/System/factoryReset?mode=%s",
                startUpgrade: {
                    upgrade: "%s%s:%s/PSIA/System/updateFirmware",
                    status: "%s%s:%s/PSIA/Custom/SelfExt/upgradeStatus"
                },
                set3DZoom: "%s%s:%s/PSIA/Custom/SelfExt/PTZ/channels/%s/Set3DZoom",
                deviceCapture: {
                    channels: "%s%s:%s/PSIA/Streaming/channels/%s/picture"
                },
                systemCapabilities: "%s%s:%s/PSIA/System/capabilities"
            },
                n.prototype.login = function (e, t, n, r) {
                    var s = 2 == r.protocol ? "https://" : "http://", o = b(this.CGI.login, s, e, t), i = new K, a = {
                        type: "GET",
                        url: o,
                        auth: n,
                        success: null,
                        error: null
                    };
                    v.extend(a, r), v.extend(a, {
                        success: function (e) {
                            "200" == re.$XML(e).find("statusValue").eq(0).text() ? r.success && r.success(e) : r.error && r.error(401, e)
                        },
                        error: function (e, t) {
                            r.error && r.error(e, t)
                        }
                    }), i.setRequestParam(a), i.submitRequest()
                },
                n.prototype.getAudioInfo = function (e, n) {
                    var t = b(this.CGI.getAudioInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.getDeviceInfo = function (e, n) {
                    var t = b(this.CGI.getDeviceInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            var t = [];
                            t.push("<DeviceInfo>"),
                                t.push("<deviceName>" + v.escape(re.$XML(e).find("deviceName").eq(0).text()) + "</deviceName>"),
                                t.push("<deviceID>" + re.$XML(e).find("deviceID").eq(0).text() + "</deviceID>"),
                                t.push("<deviceType>" + re.$XML(e).find("deviceDescription").eq(0).text() + "</deviceType>"),
                                t.push("<model>" + re.$XML(e).find("model").eq(0).text() + "</model>"),
                                t.push("<serialNumber>" + re.$XML(e).find("serialNumber").eq(0).text() + "</serialNumber>"),
                                t.push("<macAddress>" + re.$XML(e).find("macAddress").eq(0).text() + "</macAddress>"),
                                t.push("<firmwareVersion>" + re.$XML(e).find("firmwareVersion").eq(0).text() + "</firmwareVersion>"),
                                t.push("<firmwareReleasedDate>" + re.$XML(e).find("firmwareReleasedDate").eq(0).text() + "</firmwareReleasedDate>"),
                                t.push("<encoderVersion>" + re.$XML(e).find("logicVersion").eq(0).text() + "</encoderVersion>"),
                                t.push("<encoderReleasedDate>" + re.$XML(e).find("logicReleasedDate").eq(0).text() + "</encoderReleasedDate>"),
                                t.push("</DeviceInfo>"),
                                e = v.loadXML(t.join("")),
                                n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.getSystemCapa = function (e, n) {
                    var t = b(this.CGI.systemCapabilities, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        async: !1,
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.getAnalogChannelInfo = function (e, i) {
                    var t = b(this.CGI.getAnalogChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), n = new K, r = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(r, i), v.extend(r, {
                        success: function (e) {
                            var t = [];
                            t.push("<VideoInputChannelList>");
                            e.iAnalogChannelNum = re.$XML(e).find("VideoInputChannel", !0).length;
                            for (var n = re.$XML(e).find("VideoInputChannel", !0), r = 0, s = n.length; r < s; r++) {
                                var o = n[r];
                                t.push("<VideoInputChannel>"), t.push("<id>" + re.$XML(o).find("id").eq(0).text() + "</id>"), t.push("<inputPort>" + re.$XML(o).find("inputPort").eq(0).text() + "</inputPort>"), t.push("<name>" + v.escape(re.$XML(o).find("name").eq(0).text()) + "</name>"), t.push("<videoFormat>" + re.$XML(o).find("videoFormat").eq(0).text() + "</videoFormat>"), t.push("</VideoInputChannel>")
                            }
                            t.push("</VideoInputChannelList>"), e = v.loadXML(t.join("")), i.success && i.success(e)
                        },
                        error: function (e, t) {
                            i.error && i.error(e, t)
                        }
                    }), n.setRequestParam(r), n.submitRequest()
                },
                n.prototype.getDigitalChannel = function (e, i) {
                    var t = b(this.CGI.getDigitalChannel, e.szHttpProtocol, e.szIP, e.iCGIPort), n = new K, r = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(r, i), v.extend(r, {
                        success: function (e) {
                            var t = [];
                            t.push("<InputProxyChannelList>");
                            for (var n = re.$XML(e).find("DynVideoInputChannel", !0), r = 0, s = n.length; r < s; r++) {
                                var o = n[r];
                                t.push("<InputProxyChannel>"), t.push("<id>" + re.$XML(o).find("id").eq(0).text() + "</id>"), t.push("<name>" + v.escape(re.$XML(o).find("name").eq(0).text()) + "</name>"), t.push("</InputProxyChannel>")
                            }
                            t.push("</InputProxyChannelList>"), e = v.loadXML(t.join("")), i.success && i.success(e)
                        },
                        error: function (e, t) {
                            i.error && i.error(e, t)
                        }
                    }), n.setRequestParam(r), n.submitRequest()
                },
                n.prototype.getDigitalChannelInfo = function (e, a) {
                    var u = null, c = {};
                    if (this.getDigitalChannel(e, {
                        async: !1,
                        success: function (e) {
                            u = e;
                            for (var t = re.$XML(u).find("InputProxyChannel", !0), n = 0, r = t.length; n < r; n++) {
                                var s = t[n], o = re.$XML(s).find("id").eq(0).text(), i = re.$XML(s).find("name").eq(0).text();
                                c[o] = i
                            }
                        },
                        error: function (e, t) {
                            a.error && a.error(e, t)
                        }
                    }), null !== u) {
                        var t = b(this.CGI.getDigitalChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), n = new K, r = {
                            type: "GET",
                            url: t,
                            auth: e.szAuth,
                            success: null,
                            error: null
                        };
                        v.extend(r, a), v.extend(r, {
                            success: function (e) {
                                var t = [];
                                t.push("<InputProxyChannelStatusList>");
                                for (var n = re.$XML(e).find("DynVideoInputChannelStatus", !0), r = 0, s = n.length; r < s; r++) {
                                    var o = n[r], i = re.$XML(o).find("id").eq(0).text();
                                    t.push("<InputProxyChannelStatus>"),
                                        t.push("<id>" + i + "</id>"),
                                        t.push("<sourceInputPortDescriptor>"),
                                        t.push("<proxyProtocol>" + re.$XML(o).find("adminProtocol").eq(0).text() + "</proxyProtocol>"),
                                        t.push("<addressingFormatType>" + re.$XML(o).find("addressingFormatType").eq(0).text() + "</addressingFormatType>"),
                                        t.push("<ipAddress>" + re.$XML(o).find("ipAddress").eq(0).text() + "</ipAddress>"),
                                        t.push("<managePortNo>" + re.$XML(o).find("adminPortNo").eq(0).text() + "</managePortNo>"),
                                        t.push("<srcInputPort>" + re.$XML(o).find("srcInputPort").eq(0).text() + "</srcInputPort>"),
                                        t.push("<userName>" + v.escape(re.$XML(o).find("userName").eq(0).text()) + "</userName>"),
                                        t.push("<streamType>" + re.$XML(o).find("streamType").eq(0).text() + "</streamType>"),
                                        t.push("<online>" + re.$XML(o).find("online").eq(0).text() + "</online>"),
                                        t.push("<name>" + v.escape(c[i]) + "</name>"),
                                        t.push("</sourceInputPortDescriptor>"),
                                        t.push("</InputProxyChannelStatus>")
                                }
                                t.push("</InputProxyChannelStatusList>"), e = v.loadXML(t.join("")), a.success && a.success(e)
                            },
                            error: function (e, t) {
                                a.error && a.error(e, t)
                            }
                        }), n.setRequestParam(r), n.submitRequest()
                    }
                },
                n.prototype.getZeroChannelInfo = function (e, n) {
                    var t = b(this.CGI.getZeroChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.getPPPoEStatus = function (e, n) {
                    var t = b(this.CGI.getPPPoEStatus, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.getUPnPPortStatus = function (e, n) {
                    var t = b(this.CGI.getUPnPPortStatus, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.getNetworkBond = function (e, n) {
                    var t = b(this.CGI.getNetworkBond, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.getNetworkInterface = function (e, n) {
                    var t = b(this.CGI.getNetworkInterface, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.getPortInfo = function (o, i) {
                    var e = b(this.CGI.getPortInfo, o.szHttpProtocol, o.szIP, o.iCGIPort), t = new K, n = {
                        type: "GET",
                        url: e,
                        auth: o.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(n, i), v.extend(n, {
                        success: function (e) {
                            var r = [];
                            r.push("<AdminAccessProtocolList>");
                            for (var t = re.$XML(e).find("AdminAccessProtocol", !0), n = 0, s = t.length; n < s; n++) {
                                t[n];
                                r.push("<AdminAccessProtocol>"), r.push("<id>" + re.$XML(e).find("id").eq(0).text() + "</id>"), r.push("<enabled>" + re.$XML(e).find("enabled").eq(0).text() + "</enabled>"), r.push("<protocol>" + re.$XML(e).find("protocol").eq(0).text().toUpperCase() + "</protocol>"), r.push("<portNo>" + re.$XML(e).find("portNo").eq(0).text() + "</portNo>"), r.push("</AdminAccessProtocol>")
                            }
                            C.getStreamChannels(o, {
                                async: !1,
                                success: function (e) {
                                    if (0 < re.$XML(e).find("rtspPortNo", !0).length) {
                                        var t = parseInt(re.$XML(e).find("rtspPortNo").eq(0).text(), 10);
                                        r.push("<AdminAccessProtocol>"), r.push("<id>4</id>"), r.push("<enabled>true</enabled>"), r.push("<protocol>RTSP</protocol>"), r.push("<portNo>" + t + "</portNo>"), r.push("</AdminAccessProtocol>"), r.push("</AdminAccessProtocolList>");
                                        var n = v.loadXML(r.join(""));
                                        i.success && i.success(n)
                                    }
                                    else C.getStreamDynChannels(o, {
                                        async: !1,
                                        success: function (e) {
                                            if (0 < re.$XML(e).find("rtspPortNo", !0).length) {
                                                var t = parseInt(re.$XML(e).find("rtspPortNo").eq(0).text(), 10);
                                                r.push("<AdminAccessProtocol>"), r.push("<id>4</id>"), r.push("<enabled>true</enabled>"), r.push("<protocol>RTSP</protocol>"), r.push("<portNo>" + t + "</portNo>"), r.push("</AdminAccessProtocol>"), r.push("</AdminAccessProtocolList>");
                                                var n = v.loadXML(r.join(""));
                                                i.success && i.success(n)
                                            }
                                        },
                                        error: function () {
                                            i.error && i.error()
                                        }
                                    })
                                },
                                error: function () {
                                    i.error && i.error()
                                }
                            })
                        },
                        error: function () {
                            var r = [];
                            r.push("<AdminAccessProtocolList>"), C.getStreamChannels(o, {
                                async: !1,
                                success: function (e) {
                                    if (0 < re.$XML(e).find("rtspPortNo", !0).length) {
                                        var t = parseInt(re.$XML(e).find("rtspPortNo").eq(0).text(), 10);
                                        r.push("<AdminAccessProtocol>"), r.push("<id>4</id>"), r.push("<enabled>true</enabled>"), r.push("<protocol>RTSP</protocol>"), r.push("<portNo>" + t + "</portNo>"), r.push("</AdminAccessProtocol>"), r.push("</AdminAccessProtocolList>");
                                        var n = v.loadXML(r.join(""));
                                        i.success && i.success(n)
                                    }
                                    else C.getStreamDynChannels(o, {
                                        async: !1,
                                        success: function (e) {
                                            if (0 < re.$XML(e).find("rtspPortNo", !0).length) {
                                                var t = parseInt(re.$XML(e).find("rtspPortNo").eq(0).text(), 10);
                                                r.push("<AdminAccessProtocol>"), r.push("<id>4</id>"), r.push("<enabled>true</enabled>"), r.push("<protocol>RTSP</protocol>"), r.push("<portNo>" + t + "</portNo>"), r.push("</AdminAccessProtocol>"), r.push("</AdminAccessProtocolList>");
                                                var n = v.loadXML(r.join(""));
                                                i.success && i.success(n)
                                            }
                                        },
                                        error: function () {
                                            i.error && i.error()
                                        }
                                    })
                                },
                                error: function () {
                                    i.error && i.error()
                                }
                            })
                        }
                    }), t.setRequestParam(n), t.submitRequest()
                },
                n.prototype.getStreamChannels = function (e, n) {
                    if (0 != e.iAnalogChannelNum)
                        var t = b(this.CGI.getStreamChannels.analog, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    else t = b(this.CGI.getStreamChannels.digital, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    var r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.getStreamDynChannels = function (e, n) {
                    var t = b(this.CGI.getStreamDynChannels, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "GET",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.startRealPlay = function (e, t) {
                    var n = 100 * t.iChannelID + t.iStreamType, r = "", s = e.szIP;
                    "rtsp://" === t.urlProtocol && (s = A(s)), r = t.bZeroChannel ? b(t.cgi.zeroChannels, t.urlProtocol, s, t.iPort, n) : b(t.cgi.channels, t.urlProtocol, s, t.iPort, n);
                    var o = y.HWP_Play(r, e.szAuth, t.iWndIndex, "", "");
                    if (0 == o) {
                        var i = new J;
                        i.iIndex = t.iWndIndex, i.szIP = e.szIP, i.iCGIPort = e.iCGIPort, i.szDeviceIdentify = e.szDeviceIdentify, i.iChannelID = t.iChannelID, i.iPlayStatus = 1, m.push(i)
                    }
                    return o
                },
                n.prototype.startVoiceTalk = function (e, t) {
                    var n = b(this.CGI.startVoiceTalk.open, e.szHttpProtocol, e.szIP, e.iCGIPort, t), r = b(this.CGI.startVoiceTalk.close, e.szHttpProtocol, e.szIP, e.iCGIPort, t), s = b(this.CGI.startVoiceTalk.audioData, e.szHttpProtocol, e.szIP, e.iCGIPort, t);
                    return y.HWP_StartVoiceTalkEx(n, r, s, e.szAuth, e.iAudioTypeoDeviceInfo.m_iAudioBitRate, e.m_iAudioSamplingRate)
                },
                n.prototype.ptzAutoControl = function (s, e, o, i) {
                    var t = o.iChannelID, a = "", u = "";
                    if (i.iPTZSpeed = i.iPTZSpeed < 7 ? 15 * i.iPTZSpeed : 100, e && (i.iPTZSpeed = 0), s.szDeviceType != D) a = b(this.CGI.ptzAutoControl, s.szHttpProtocol, s.szIP, s.iCGIPort, t), u = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + i.iPTZSpeed + "</pan><tilt>0</tilt></PTZData>";
                    else {
                        var n = 99;
                        e && (n = 96), a = b(this.CGI.goPreset, s.szHttpProtocol, s.szIP, s.iCGIPort, t, n)
                    }
                    var r = new K, c = {
                        type: "PUT",
                        url: a,
                        async: !1,
                        auth: s.szAuth,
                        data: u,
                        success: null,
                        error: null
                    }, l = this;
                    v.extend(c, i), v.extend(c, {
                        success: function (e) {
                            o.bPTZAuto = !o.bPTZAuto, i.success && i.success(e)
                        },
                        error: function (e, t) {
                            if (s.szDeviceType != D) {
                                a = b(l.CGI.ptzControl, s.szHttpProtocol, s.szIP, s.iCGIPort, o.iChannelID);
                                var n = new K, r = {
                                    type: "PUT",
                                    url: a,
                                    async: !1,
                                    auth: s.szAuth,
                                    data: u,
                                    success: null,
                                    error: null
                                };
                                v.extend(r, i), n.setRequestParam(r), n.submitRequest()
                            }
                            else i.error && i.error(e, t)
                        }
                    }), r.setRequestParam(c), r.submitRequest()
                },
                n.prototype.ptzControl = function (e, t, n, r) {
                    var s;
                    n.iChannelID;
                    n.bPTZAuto && this.ptzAutoControl(e, !0, n, {
                        iPTZSpeed: 0
                    }), r.iPTZSpeed = t ? 0 : r.iPTZSpeed < 7 ? 15 * r.iPTZSpeed : 100;
                    var o = [
                        {},
                        { pan: 0, tilt: r.iPTZSpeed },
                        { pan: 0, tilt: -r.iPTZSpeed },
                        { pan: -r.iPTZSpeed, tilt: 0 },
                        { pan: r.iPTZSpeed, tilt: 0 },
                        { pan: -r.iPTZSpeed, tilt: r.iPTZSpeed },
                        { pan: -r.iPTZSpeed, tilt: -r.iPTZSpeed },
                        { pan: r.iPTZSpeed, tilt: r.iPTZSpeed },
                        { pan: r.iPTZSpeed, tilt: -r.iPTZSpeed },
                        {},
                        { speed: r.iPTZSpeed },
                        { speed: -r.iPTZSpeed },
                        { speed: r.iPTZSpeed },
                        { speed: -r.iPTZSpeed },
                        { speed: r.iPTZSpeed },
                        { speed: -r.iPTZSpeed }
                    ], i = "", a = {};
                    switch (r.iPTZIndex) {
                        case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
                            a = this.CGI.ptzControl, i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + o[r.iPTZIndex].pan + "</pan><tilt>" + o[r.iPTZIndex].tilt + "</tilt></PTZData>";
                            break;
                        case 10: case 11:
                            a = this.CGI.ptzControl, i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + o[r.iPTZIndex].speed + "</zoom></PTZData>";
                            break;
                        case 12: case 13:
                            a = this.CGI.ptzFocus, i = "<?xml version='1.0' encoding='UTF-8'?><FocusData><focus>" + o[r.iPTZIndex].speed + "</focus></FocusData>";
                            break;
                        case 14: case 15:
                            a = this.CGI.ptzIris, i = "<?xml version='1.0' encoding='UTF-8'?><IrisData><iris>" + o[r.iPTZIndex].speed + "</iris></IrisData>";
                            break;
                        default:
                            return void (r.error && r.error())
                    }s = b(a, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID);
                    var u = new K, c = {
                        type: "PUT",
                        url: s,
                        async: !1,
                        auth: e.szAuth,
                        data: i,
                        success: null,
                        error: null
                    };
                    v.extend(c, r), v.extend(c, {
                        success: function (e) {
                            r.success && r.success(e)
                        },
                        error: function (e, t) {
                            r.error && r.error(e, t)
                        }
                    }), u.setRequestParam(c), u.submitRequest()
                },
                n.prototype.setPreset = function (e, t, n) {
                    t.iChannelID;
                    var r, s = "";
                    r = b(this.CGI.setPreset, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID), s = "<?xml version='1.0' encoding='UTF-8'?>", s += "<PTZPreset>", s += "<id>" + n.iPresetID + "</id>", e.szDeviceType != D && (s += "<presetName>Preset" + n.iPresetID + "</presetName>"), s += "</PTZPreset>";
                    var o = new K, i = {
                        type: "PUT",
                        url: r,
                        auth: e.szAuth,
                        data: s,
                        success: null,
                        error: null
                    };
                    v.extend(i, n), v.extend(i, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), o.setRequestParam(i), o.submitRequest()
                },
                n.prototype.goPreset = function (e, t, n) {
                    var r;
                    t.iChannelID;
                    r = b(this.CGI.goPreset, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID);
                    var s = new K, o = {
                        type: "PUT",
                        url: r,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(o, n), v.extend(o, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), s.setRequestParam(o), s.submitRequest()
                },
                n.prototype.recordSearch = function (e, i) {
                    var t, n, r = i.iChannelID, s = i.iStreamType, o = i.szStartTime.replace(" ", "T") + "Z", a = i.szEndTime.replace(" ", "T") + "Z";
                    t = b(this.CGI.recordSearch, e.szHttpProtocol, e.szIP, e.iCGIPort), n = "<?xml version='1.0' encoding='UTF-8'?><CMSearchDescription><searchID>" + new te + "</searchID><trackList><trackID>" + (100 * r + s) + "</trackID></trackList><timeSpanList><timeSpan><startTime>" + o + "</startTime><endTime>" + a + "</endTime></timeSpan></timeSpanList><maxResults>40</maxResults><searchResultPostion>" + i.iSearchPos + "</searchResultPostion><metadataList><metadataDescriptor>//metadata.psia.org/VideoMotion</metadataDescriptor></metadataList></CMSearchDescription>";
                    var u = new K, c = {
                        type: "POST",
                        url: t,
                        auth: e.szAuth,
                        data: n,
                        success: null,
                        error: null
                    };
                    v.extend(c, i), v.extend(c, {
                        success: function (e) {
                            var t = [];
                            t.push("<CMSearchResult>"), t.push("<responseStatus>" + re.$XML(e).find("responseStatus").eq(0).text() + "</responseStatus>"), t.push("<responseStatusStrg>" + re.$XML(e).find("responseStatusStrg").eq(0).text() + "</responseStatusStrg>"), t.push("<numOfMatches>" + re.$XML(e).find("numOfMatches").eq(0).text() + "</numOfMatches>"), t.push("<matchList>");
                            for (var n = re.$XML(e).find("searchMatchItem", !0), r = 0, s = n.length; r < s; r++) {
                                var o = n[r];
                                t.push("<searchMatchItem>"), t.push("<trackID>" + re.$XML(o).find("trackID").eq(0).text() + "</trackID>"), t.push("<startTime>" + re.$XML(o).find("startTime").eq(0).text() + "</startTime>"), t.push("<endTime>" + re.$XML(o).find("endTime").eq(0).text() + "</endTime>"), t.push("<playbackURI>" + v.escape(re.$XML(o).find("playbackURI").eq(0).text()) + "</playbackURI>"), t.push("<metadataDescriptor>" + re.$XML(o).find("metadataDescriptor").eq(0).text().split("/")[1] + "</metadataDescriptor>"), t.push("</searchMatchItem>")
                            }
                            t.push("</matchList>"),
                                t.push("</CMSearchResult>"),
                                e = v.loadXML(t.join("")),
                                i.success && i.success(e)
                        },
                        error: function (e, t) {
                            i.error && i.error(e, t)
                        }
                    }), u.setRequestParam(c), u.submitRequest()
                },
                n.prototype.startPlayback = function (e, t) {
                    var n = t.iWndIndex, r = t.szStartTime, s = t.szEndTime, o = e.szIP;
                    "rtsp://" === t.urlProtocol && (o = A(o));
                    var i = b(t.cgi, t.urlProtocol, o, t.iPort, t.iChannelID, r, s), a = y.HWP_Play(i, e.szAuth, n, r, s);
                    if (0 == a) {
                        var u = new J;
                        u.iIndex = n, u.szIP = e.szIP, u.iCGIPort = e.iCGIPort, u.szDeviceIdentify = e.szDeviceIdentify, u.iChannelID = t.iChannelID, u.iPlayStatus = 2, m.push(u)
                    }
                    return a
                },
                n.prototype.reversePlayback = function (e, t) {
                    var n = t.iWndIndex, r = t.szStartTime, s = t.szEndTime, o = e.szIP;
                    "rtsp://" === t.urlProtocol && (o = A(o));
                    var i = b(t.cgi, t.urlProtocol, o, t.iPort, t.iChannelID, r, s), a = y.HWP_ReversePlay(i, e.szAuth, n, r, s);
                    if (0 == a) {
                        var u = new J;
                        u.iIndex = n, u.szIP = e.szIP, u.iCGIPort = e.iCGIPort, u.szDeviceIdentify = e.szDeviceIdentify, u.iChannelID = t.iChannelID, u.iPlayStatus = 5, m.push(u)
                    }
                    return a
                },
                n.prototype.startDownloadRecord = function (e, t) {
                    var n = b(this.CGI.startDownloadRecord, e.szHttpProtocol, e.szIP, e.iCGIPort), r = "<?xml version='1.0' encoding='UTF-8'?><downloadRequest><playbackURI> " + v.escape(t.szPlaybackURI) + "</playbackURI></downloadRequest>";
                    return y.HWP_StartDownload(n, e.szAuth, t.szFileName, r, t.bDateDir)
                },
                n.prototype.exportDeviceConfig = function (e) {
                    var t = b(this.CGI.downloaddeviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    return Z() ? -1 : y.HWP_ExportDeviceConfig(t, e.szAuth, "", 0)
                },
                n.prototype.importDeviceConfig = function (e, t) {
                    var n = b(this.CGI.uploaddeviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    return y.HWP_ImportDeviceConfig(n, e.szAuth, t.szFileName, 0)
                },
                n.prototype.restart = function (e, n) {
                    var t = b(this.CGI.restart, e.szHttpProtocol, e.szIP, e.iCGIPort), r = new K, s = {
                        type: "PUT",
                        url: t,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(s, n), v.extend(s, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), r.setRequestParam(s), r.submitRequest()
                },
                n.prototype.restore = function (e, t, n) {
                    var r = b(this.CGI.restore, e.szHttpProtocol, e.szIP, e.iCGIPort, t), s = new K, o = {
                        type: "PUT",
                        url: r,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(o, n), v.extend(o, {
                        success: function (e) {
                            n.success && n.success(e)
                        },
                        error: function (e, t) {
                            n.error && n.error(e, t)
                        }
                    }), s.setRequestParam(o), s.submitRequest()
                },
                n.prototype.startUpgrade = function (e, t) {
                    var n = b(this.CGI.startUpgrade.upgrade, e.szHttpProtocol, e.szIP, e.iCGIPort), r = b(this.CGI.startUpgrade.status, e.szHttpProtocol, e.szIP, e.iCGIPort);
                    return y.HWP_StartUpgrade(n, r, e.szAuth, t.szFileName)
                },
                n.prototype.set3DZoom = function (e, t, n, r) {
                    var s = b(this.CGI.set3DZoom, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID), o = new K, i = {
                        type: "PUT",
                        url: s,
                        data: n,
                        auth: e.szAuth,
                        success: null,
                        error: null
                    };
                    v.extend(i, r), v.extend(i, {
                        success: function (e) {
                            r.success && r.success(e)
                        },
                        error: function (e, t) {
                            r.error && r.error(e, t)
                        }
                    }), o.setRequestParam(i), o.submitRequest()
                },
                n.prototype.deviceCapturePic = function (e, t, n, r) {
                    t = 100 * t + 1;
                    var s = b(this.CGI.deviceCapture.channels, e.szHttpProtocol, e.szIP, e.iCGIPort, t), o = [];
                    return v.isInt(r.iResolutionWidth) && o.push("videoResolutionWidth=" + r.iResolutionWidth), v.isInt(r.iResolutionHeight) && o.push("videoResolutionHeight=" + r.iResolutionHeight), 0 < o.length && (s += "?" + o.join("&")), y.HWP_DeviceCapturePic(s, e.szAuth, n, r.bDateDir)
                };
            var r, Y, Q = function () { };
            Q.prototype._alert = function (e) {
                p.bDebugMode && console.log(e)
            }, r = this, (Y = function (e) {
                this.elems = [],
                    this.length = 0,
                    this.length = this.elems.push(e)
            }).prototype.find = function (e, t) {
                var n = this.elems[this.length - 1] ? this.elems[this.length - 1].getElementsByTagName(e) : [];
                return this.length = this.elems.push(n), t ? n : this
            },
                Y.prototype.eq = function (e, t) {
                    var n = this.elems[this.length - 1].length, r = null;
                    return 0 < n && e < n && (r = this.elems[this.length - 1][e]), this.length = this.elems.push(r), t ? r : this
                },
                Y.prototype.text = function (e) {
                    return this.elems[this.length - 1] ? e ? void (window.DOMParser ? this.elems[this.length - 1].textContent = e : this.elems[this.length - 1].text = e) : window.DOMParser ? this.elems[this.length - 1].textContent : this.elems[this.length - 1].text : ""
                },
                Y.prototype.attr = function (e) {
                    if (this.elems[this.length - 1]) {
                        var t = this.elems[this.length - 1].attributes.getNamedItem(e);
                        return t ? t.value : ""
                    }
                }, r.$XML = function (e) {
                    return new Y(e)
                };
            var ee = function () { };
            function te() {
                this.id = this.createUUID()
            }
            ee.prototype.extend = function () {
                for (var e, t = arguments[0] || {}, n = 1, r = arguments.length; n < r; n++)
                    if (null != (e = arguments[n]))
                        for (var s in e) {
                            t[s];
                            var o = e[s];
                            t !== o && ("object" == typeof o
                                ?
                                t[s] = this.extend({}, o)
                                :
                                void 0 !== o && (t[s] = o))
                        }
                return t
            },
                ee.prototype.browser = function () {
                    var e = navigator.userAgent.toLowerCase(), t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(safari)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || /(trident.*rv:)([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(e) || ["unknow", "0"];
                    0 < t.length && -1 < t[1].indexOf("trident") && (t[1] = "msie");
                    var n = {};
                    return n[t[1]] = !0, n.version = t[2], n
                },
                ee.prototype.loadXML = function (e) {
                    if (null == e || "" == e)
                        return null;
                    var t = null;
                    window.DOMParser ? t = (new DOMParser).parseFromString(e, "text/xml") : ((t = new ActiveXObject("Microsoft.XMLDOM")).async = !1, t.loadXML(e));
                    return t
                },
                ee.prototype.toXMLStr = function (t) {
                    var n = "";
                    try {
                        n = (new XMLSerializer).serializeToString(t)
                    }
                    catch (e) {
                        try {
                            n = t.xml
                        }
                        catch (e) {
                            return ""
                        }
                    }
                    return -1 == n.indexOf("<?xml") && (n = "<?xml version='1.0' encoding='utf-8'?>" + n), n
                },
                ee.prototype.escape = function (e) {
                    return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e
                },
                ee.prototype.encodePwd = function (e, t, n) {
                    var r = "";
                    if (n) {
                        r = v.sha256(t.userName + t.salt + e), r = v.sha256(r + t.challenge);
                        for (s = 2; s < t.iIterate; s++)
                            r = v.sha256(r)
                    }
                    else {
                        r = v.sha256(e) + t.challenge;
                        for (var s = 1; s < t.iIterate; s++)
                            r = v.sha256(r)
                    }
                    return r
                },
                ee.prototype.dateFormat = function (e, t) {
                    var n = {
                        "M+": e.getMonth() + 1, "d+": e.getDate(), "h+": e.getHours(), "m+": e.getMinutes(), "s+": e.getSeconds(), "q+": Math.floor((e.getMonth() + 3) / 3),
                        S: e.getMilliseconds()
                    };
                    for (var r in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), n)
                        new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
                    return t
                },
                ee.prototype.Base64 = {
                    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    encode: function (e) {
                        var t, n, r, s, o, i, a, u = "", c = 0;
                        for (e = ee.prototype.Base64._utf8_encode(e); c < e.length;)
                            s = (t = e.charCodeAt(c++)) >> 2, o = (3 & t) << 4 | (n = e.charCodeAt(c++)) >> 4, i = (15 & n) << 2 | (r = e.charCodeAt(c++)) >> 6, a = 63 & r, isNaN(n) ? i = a = 64 : isNaN(r) && (a = 64), u = u + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(i) + this._keyStr.charAt(a);
                        return u
                    },
                    decode: function (e) {
                        var t, n, r, s, o, i, a = "", u = 0;
                        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < e.length;)
                            t = this._keyStr.indexOf(e.charAt(u++)) << 2 | (s = this._keyStr.indexOf(e.charAt(u++))) >> 4, n = (15 & s) << 4 | (o = this._keyStr.indexOf(e.charAt(u++))) >> 2, r = (3 & o) << 6 | (i = this._keyStr.indexOf(e.charAt(u++))), a += String.fromCharCode(t), 64 != o && (a += String.fromCharCode(n)), 64 != i && (a += String.fromCharCode(r));
                        return a = ee.prototype.Base64._utf8_decode(a)
                    },
                    _utf8_encode: function (e) {
                        e = e.replace(/\r\n/g, "\n");
                        for (var t = "", n = 0; n < e.length; n++) {
                            var r = e.charCodeAt(n);
                            r < 128 ? t += String.fromCharCode(r) : (127 < r && r < 2048 ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128)), t += String.fromCharCode(63 & r | 128))
                        }
                        return t
                    },
                    _utf8_decode: function (e) {
                        for (var t = "", n = 0, r = c1 = c2 = 0; n < e.length;)
                            (r = e.charCodeAt(n)) < 128 ? (t += String.fromCharCode(r), n++) : 191 < r && r < 224 ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((31 & r) << 6 | 63 & c2), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
                        return t
                    }
                },
                ee.prototype.createEventScript = function (e, t, n) {
                    var r = document.createElement("script");
                    r.htmlFor = e, r.event = t, r.innerHTML = n, document.body.parentNode.appendChild(r)
                },
                ee.prototype.isInt = function (e) {
                    return /^\d+$/.test(e)
                },
                ee.prototype.getDirName = function () {
                    var e = "";
                    if ("" !== p.szBasePath) e = p.szBasePath;
                    else {
                        var t = /[^?#]*\//, n = document.getElementById("videonode");
                        if (n) e = n.src.match(t)[0];
                        else {
                            for (var r = document.scripts, s = 0, o = r.length; s < o; s++)
                                if (-1 < r[s].src.indexOf("webVideoCtrl.js")) {
                                    n = r[s];
                                    break
                                }
                            n && (e = n.src.match(t)[0])
                        }
                    }
                    return e
                },
                ee.prototype.loadScript = function (e, t) {
                    var n = document.createElement("script");
                    n.type = "text/javascript", n.onload = function () {
                        t()
                    }, n.src = e, document.getElementsByTagName("head")[0].appendChild(n)
                },
                ee.prototype.encodeString = function (e) {
                    return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
                },
                ee.prototype.getIrreversibleKey = function (e, t) {
                    var n = e;
                    if (oSecurityCap.oIrreversibleEncrypt.bSupport) {
                        var r = oSecurityCap.oIrreversibleEncrypt.salt;
                        return v.sha256(t + r + e)
                    }
                    return n
                },
                ee.prototype.strToAESKey = function (e, t) {
                    var n = "";
                    if (0 < oSecurityCap.iKeyIterateNum) {
                        n = v.sha256(v.getIrreversibleKey(e, t) + "AaBbCcDd1234!@#$");
                        for (var r = 1; r < oSecurityCap.iKeyIterateNum; r++)
                            n = v.sha256(n)
                    }
                    return n = n && n.substring(0, 32)
                },
                ee.prototype.exportPasswordDeviceConfig = function (e, t) {
                    var n = MD5((new Date).getTime().toString());
                    return e + "?secretkey=" + v.encodeAES(v.Base64.encode(v.encodeString(t)), szAESKey, n) + "&security=1&iv=" + n
                },
                ee.prototype.encodeAES = function (e, t, n, r) {
                    var s = "";
                    if ("ecb" === r)
                        for (var o = e.length, i = 0; 0 < o;)
                            s += 16 < o ? aes_encrypt(e.substring(i, i + 16), t, !0) : aes_encrypt(e.substring(i), t, !0), o -= 16, i += 16;
                    else {
                        void 0 === n && (n = "6cd9616beb39d4034fdebe107df9a399");
                        var a = CryptoJS.enc.Hex.parse(t), u = CryptoJS.enc.Hex.parse(n);
                        s = CryptoJS.AES.encrypt(e, a, {
                            mode: CryptoJS.mode.CBC,
                            iv: u,
                            padding: CryptoJS.pad.Pkcs7
                        }).ciphertext.toString()
                    }
                    return s
                },
                ee.prototype.sha256 = function (e) {
                    function m(e, t) {
                        var n = (65535 & e) + (65535 & t);
                        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
                    }
                    function S(e, t) {
                        return e >>> t | e << 32 - t
                    }
                    return function (e) {
                        for (var t = "", n = 0; n < 4 * e.length; n++)
                            t += "0123456789abcdef".charAt(e[n >> 2] >> 8 * (3 - n % 4) + 4 & 15) + "0123456789abcdef".charAt(e[n >> 2] >> 8 * (3 - n % 4) & 15);
                        return t
                    }(function (e, t) {
                        var n, r, s, o, i, a, u, c, l, d, p, h,
                            f = [
                                1116352408, 1899447441, 3049323471, 3921009573, 961987163,
                                1508970993, 2453635748, 2870763221, 3624381080, 310598401,
                                607225278, 1426881987, 1925078388, 2162078206, 2614888103,
                                3248222580, 3835390401, 4022224774, 264347078, 604807628,
                                770255983, 1249150122, 1555081692, 1996064986, 2554220882,
                                2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
                                113926993, 338241895, 666307205, 773529912, 1294757372,
                                1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
                                2730485921, 2820302411, 3259730800, 3345764771, 3516065817,
                                3600352804, 4094571909, 275423344, 430227734, 506948616,
                                659060556, 883997877, 958139571, 1322822218, 1537002063,
                                1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
                                2428436474, 2756734187, 3204031479, 3329325298
                            ],
                            P = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
                            I = Array(64);
                        for (e[t >> 5] |= 128 << 24 - t % 32, e[15 + (t + 64 >> 9 << 4)] = t, l = 0;
                            l < e.length;
                            l += 16) {
                            for (n = P[0], r = P[1], s = P[2], o = P[3], i = P[4], a = P[5], u = P[6], c = P[7], d = 0;
                                d < 64;
                                d++)
                                I[d] = d < 16 ? e[d + l] : m(m(m(S(I[d - 2], 17) ^ S(I[d - 2], 19) ^ I[d - 2] >>> 10, I[d - 7]), S(I[d - 15], 7) ^ S(I[d - 15], 18) ^ I[d - 15] >>> 3), I[d - 16]), p = m(m(m(m(c, S(i, 6) ^ S(i, 11) ^ S(i, 25)), i & a ^ ~i & u), f[d]), I[d]), h = m(S(n, 2) ^ S(n, 13) ^ S(n, 22), n & r ^ n & s ^ r & s), c = u, u = a, a = i, i = m(o, p), o = s, s = r, r = n, n = m(p, h);
                            P[0] = m(n, P[0]), P[1] = m(r, P[1]), P[2] = m(s, P[2]), P[3] = m(o, P[3]), P[4] = m(i, P[4]), P[5] = m(a, P[5]), P[6] = m(u, P[6]), P[7] = m(c, P[7])
                        }
                        return P
                    }(function (e) {
                        for (var t = [], n = 0;
                            n < 8 * e.length;
                            n += 8)
                            t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << 24 - n % 32;
                        return t
                    }(e = function (e) {
                        e = e.replace(/\r\n/g, "\n");
                        for (var t = "", n = 0;
                            n < e.length;
                            n++) {
                            var r = e.charCodeAt(n);
                            r < 128 ? t += String.fromCharCode(r) : (127 < r && r < 2048 ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128)), t += String.fromCharCode(63 & r | 128))
                        }
                        return t
                    }(e)), 8 * e.length))
                },
                ee.prototype.cookie = function (e, t, n) {
                    if (1 < arguments.length && (null === t || "object" != typeof t)) {
                        if (n = this.extend({}, n), null === t && (n.expires = -1), "number" == typeof n.expires) {
                            var r = n.expires, s = n.expires = new Date;
                            s.setDate(s.getDate() + r)
                        }
                        return document.cookie = [encodeURIComponent(e), "=", n.raw ? String(t) : encodeURIComponent(String(t)), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "; path=/", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")
                    }
                    var o, i = (n = t || {}).raw ? function (e) {
                        return e
                    }
                        : decodeURIComponent;
                    return (o = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? i(o[1]) : null
                },
                te.prototype.valueOf = function () {
                    return this.id
                },
                te.prototype.toString = function () {
                    return this.id
                },
                te.prototype.createUUID = function () {
                    var e = new Date(1582, 10, 15, 0, 0, 0, 0), t = (new Date).getTime() - e.getTime();
                    return te.getIntegerBits(t, 0, 31) + "-" + te.getIntegerBits(t, 32, 47) + "-" + (te.getIntegerBits(t, 48, 59) + "1") + "-" + te.getIntegerBits(te.rand(4095), 0, 7) + te.getIntegerBits(te.rand(4095), 0, 7) + "-" + (te.getIntegerBits(te.rand(8191), 0, 7) + te.getIntegerBits(te.rand(8191), 8, 15) + te.getIntegerBits(te.rand(8191), 0, 7) + te.getIntegerBits(te.rand(8191), 8, 15) + te.getIntegerBits(te.rand(8191), 0, 15))
                },
                te.getIntegerBits = function (e, t, n) {
                    var r = te.returnBase(e, 16), s = new Array, o = "", i = 0;
                    for (i = 0;
                        i < r.length;
                        i++)
                        s.push(r.substring(i, i + 1));
                    for (i = Math.floor(t / 4);
                        i <= Math.floor(n / 4);
                        i++)
                        s[i] && "" != s[i] ? o += s[i] : o += "0";
                    return o
                },
                te.returnBase = function (e, t) {
                    var n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                    if (e < t)
                        var r = n[e];
                    else {
                        var s = "" + Math.floor(e / t), o = e - s * t;
                        if (t <= s) r = this.returnBase(s, t) + n[o];
                        else r = n[s] + n[o]
                    }
                    return r
                },
                te.rand = function (e) {
                    return Math.floor(Math.random() * e)
                },
                S = new e,
                C = new n,
                t = new Q;
            var ne = (v = new ee).dateFormat(new Date, "yyyyMMddhhmmss");
            return c = u = "webVideoCtrl" + ne, "object" != typeof window.attachEvent && v.browser().msie && (v.createEventScript(u, "GetSelectWndInfo(SelectWndInfo)", "GetSelectWndInfo(SelectWndInfo);"), v.createEventScript(u, "ZoomInfoCallback(szZoomInfo)", "ZoomInfoCallback(szZoomInfo);"), v.createEventScript(u, "GetHttpInfo(lID, lpInfo, lReverse)", "GetHttpInfo(lID, lpInfo, lReverse);"), v.createEventScript(u, "PluginEventHandler(iEventType, iParam1, iParam2)", "PluginEventHandler(iEventType, iParam1, iParam2);"), v.createEventScript(u, "RemoteConfigInfo(lID)", "RemoteConfigInfo(lID);"), v.createEventScript(u, "KeyBoardEventInfo(iKeyCode)", "KeyBoardEventInfo(iKeyCode);")), this
        }(), re = window.WebVideoCtrl = e;
        re.version = "1.1.0"
    }
}(), "object" == typeof exports && "undefined" != typeof module || ("function" == typeof define && define.amd ? define(function () {
    return WebVideoCtrl
}) : "function" == typeof define && define.cmd && define(function (e, t, n) {
    n.exports = WebVideoCtrl
}));