"undefined" == typeof jwplayer && (jwplayer = function (d) {
    if (jwplayer.api)
        return jwplayer.api.selectPlayer(d)
},
jwplayer.version = "6.6.3896", jwplayer.vid = document.createElement("video"), jwplayer.audio = document.createElement("audio"), jwplayer.source = document.createElement("source"), function (d) {
    function a(b) { return function () { return c(b) } } function k(b) { return function () { b("Error loading file") } } function f(m, a, e, g) {
        return function () {
            try { var c = m.responseXML; if (c && c.firstChild) return e(m) } catch (j) { } (c = b.parseXML(m.responseText)) &&
            c.firstChild ? (m = b.extend({}, m, { responseXML: c }), e(m)) : g && g(m.responseText ? "Invalid XML" : a)
        }
    } var h = document, e = window, j = navigator, b = d.utils = function () { }; b.exists = function (b) { switch (typeof b) { case "string": return 0 < b.length; case "object": return null !== b; case "undefined": return !1 } return !0 }; b.styleDimension = function (b) { return b + (0 < b.toString().indexOf("%") ? "" : "px") }; b.getAbsolutePath = function (a, e) {
        b.exists(e) || (e = h.location.href); if (b.exists(a)) {
            var c; if (b.exists(a)) {
                c = a.indexOf("://"); var g = a.indexOf("?");
                c = 0 < c && (0 > g || g > c)
            } else c = void 0; if (c) return a; c = e.substring(0, e.indexOf("://") + 3); var g = e.substring(c.length, e.indexOf("/", c.length + 1)), j; 0 === a.indexOf("/") ? j = a.split("/") : (j = e.split("?")[0], j = j.substring(c.length + g.length + 1, j.lastIndexOf("/")), j = j.split("/").concat(a.split("/"))); for (var f = [], t = 0; t < j.length; t++) j[t] && (b.exists(j[t]) && "." != j[t]) && (".." == j[t] ? f.pop() : f.push(j[t])); return c + g + "/" + f.join("/")
        }
    }; b.extend = function () {
        var a = b.extend.arguments; if (1 < a.length) {
            for (var e = 1; e < a.length; e++) b.foreach(a[e],
            function (e, g) { try { b.exists(g) && (a[0][e] = g) } catch (c) { } }); return a[0]
        } return null
    }; b.log = function (b, a) { "undefined" != typeof console && "undefined" != typeof console.log && (a ? console.log(b, a) : console.log(b)) }; var c = b.userAgentMatch = function (b) { return null !== j.userAgent.toLowerCase().match(b) }; b.isIE = a(/msie/i); b.isFF = a(/firefox/i); b.isChrome = a(/chrome/i); b.isIOS = a(/iP(hone|ad|od)/i); b.isIPod = a(/iP(hone|od)/i); b.isIPad = a(/iPad/i); b.isSafari602 = a(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i); b.isSafari = function () {
        return c(/safari/i) &&
        !c(/chrome/i) && !c(/chromium/i) && !c(/android/i)
    }; b.isAndroid = function (b) { return b ? c(RegExp("android.*" + b, "i")) : c(/android/i) }; b.isMobile = function () { return b.isIOS() || b.isAndroid() }; b.saveCookie = function (b, a) { h.cookie = "jwplayer." + b + "\x3d" + a + "; path\x3d/" }; b.getCookies = function () { for (var b = {}, a = h.cookie.split("; "), e = 0; e < a.length; e++) { var g = a[e].split("\x3d"); 0 == g[0].indexOf("jwplayer.") && (b[g[0].substring(9, g[0].length)] = g[1]) } return b }; b.typeOf = function (b) {
        var a = typeof b; return "object" === a ? !b ? "null" :
        b instanceof Array ? "array" : a : a
    }; b.translateEventResponse = function (a, e) {
        var c = b.extend({}, e);
        a == d.events.JWPLAYER_FULLSCREEN && !c.fullscreen ? (c.fullscreen = "true" == c.message ? !0 : !1, delete c.message) : "object" == typeof c.data ? (c = b.extend(c, c.data), delete c.data) : "object" == typeof c.metadata && b.deepReplaceKeyName(c.metadata, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"]); b.foreach(["position", "duration", "offset"], function (b, a) { c[a] && (c[a] = Math.round(1E3 * c[a]) / 1E3) }); return c
    }; b.flashVersion =
    function () { if (b.isAndroid()) return 0; var a = j.plugins, c; try { if ("undefined" !== a && (c = a["Shockwave Flash"])) return parseInt(c.description.replace(/\D+(\d+)\..*/, "$1")) } catch (f) { } if ("undefined" != typeof e.ActiveXObject) try { if (c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) return parseInt(c.GetVariable("$version").split(" ")[1].split(",")[0]) } catch (g) { } return 0 }; b.getScriptPath = function (b) {
        for (var a = h.getElementsByTagName("script"), c = 0; c < a.length; c++) {
            var g = a[c].src; if (g && 0 <= g.indexOf(b)) return g.substr(0,
            g.indexOf(b))
        } return ""
    }; b.deepReplaceKeyName = function (a, c, e) { switch (d.utils.typeOf(a)) { case "array": for (var g = 0; g < a.length; g++) a[g] = d.utils.deepReplaceKeyName(a[g], c, e); break; case "object": b.foreach(a, function (b, g) { var j; if (c instanceof Array && e instanceof Array) { if (c.length != e.length) return; j = c } else j = [c]; for (var f = b, h = 0; h < j.length; h++) f = f.replace(RegExp(c[h], "g"), e[h]); a[f] = d.utils.deepReplaceKeyName(g, c, e); b != f && delete a[b] }) } return a }; var n = b.pluginPathType = { ABSOLUTE: 0, RELATIVE: 1, CDN: 2 }; b.getPluginPathType =
    function (a) { if ("string" == typeof a) { a = a.split("?")[0]; var c = a.indexOf("://"); if (0 < c) return n.ABSOLUTE; var e = a.indexOf("/"); a = b.extension(a); return 0 > c && 0 > e && (!a || !isNaN(a)) ? n.CDN : n.RELATIVE } };
    b.getPluginName = function (b) {
        return b.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/, "$2")
    };
    b.getPluginVersion = function (b) { return b.replace(/[^-]*-?([^\.]*).*$/, "$1") }; b.isYouTube = function (b) { return /^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(b) }; b.youTubeID = function (b) {
        try {
            return /v[=\/]([^?&]*)|youtu\.be\/([^?]*)|^([\w-]*)$/i.exec(b).slice(1).join("").replace("?",
            "")
        } catch (a) { return "" }
    }; b.isRtmp = function (b, a) { return 0 == b.indexOf("rtmp") || "rtmp" == a }; b.foreach = function (a, c) { var e, g; for (e in a) "function" == b.typeOf(a.hasOwnProperty) ? a.hasOwnProperty(e) && (g = a[e], c(e, g)) : (g = a[e], c(e, g)) }; b.isHTTPS = function () { return 0 == e.location.href.indexOf("https") }; b.repo = function () { var a = "http://p.jwpcdn.com/" + d.version.split(/\W/).splice(0, 2).join("/") + "/"; try { b.isHTTPS() && (a = a.replace("http://", "https://ssl.")) } catch (c) { } return a }; b.ajax = function (a, c, j) {
        var g; 0 < a.indexOf("#") &&
        (a = a.replace(/#.*$/, "")); var h; h = (h = a) && 0 <= h.indexOf("://") && h.split("/")[2] != e.location.href.split("/")[2] ? !0 : !1; if (h && b.exists(e.XDomainRequest)) g = new XDomainRequest, g.onload = f(g, a, c, j), g.onerror = k(j, a, g); else if (b.exists(e.XMLHttpRequest)) { var d = g = new XMLHttpRequest, t = a; g.onreadystatechange = function () { if (4 === d.readyState) switch (d.status) { case 200: f(d, t, c, j)(); break; case 404: j("File not found") } }; g.onerror = k(j, a) } else j && j(); try { g.open("GET", a, !0), g.send(null) } catch (n) { j && j(a) } return g
    }; b.parseXML =
    function (b) { try { var a; if (e.DOMParser) { a = (new DOMParser).parseFromString(b, "text/xml"); try { if ("parsererror" == a.childNodes[0].firstChild.nodeName) return } catch (c) { } } else a = new ActiveXObject("Microsoft.XMLDOM"), a.async = "false", a.loadXML(b); return a } catch (g) { } }; b.filterPlaylist = function (a, c) {
        for (var e = [], g = 0; g < a.length; g++) { var j = b.extend({}, a[g]); j.sources = b.filterSources(j.sources); if (0 < j.sources.length) { for (var f = 0; f < j.sources.length; f++) { var h = j.sources[f]; h.label || (h.label = f.toString()) } e.push(j) } } if (c &&
        0 == e.length) for (g = 0; g < a.length; g++) if (j = b.extend({}, a[g]), j.sources = b.filterSources(j.sources, !0), 0 < j.sources.length) { for (f = 0; f < j.sources.length; f++) h = j.sources[f], h.label || (h.label = f.toString()); e.push(j) } return e
    }; b.filterSources = function (a, c) {
        var e, g, j = b.extensionmap; if (a) {
            g = []; for (var f = 0; f < a.length; f++) {
                var h = a[f].type, n = a[f].file; n && n.trim && (n = n.trim()); h || (h = j.extType(b.extension(n)), a[f].type = h); c ? d.embed.flashCanPlay(n, h) && (e || (e = h), h == e && g.push(b.extend({}, a[f]))) : b.canPlayHTML5(h) && (e ||
                (e = h), h == e && g.push(b.extend({}, a[f])))
            }
        } return g
    }; b.canPlayHTML5 = function (a) { if (b.isAndroid() && ("hls" == a || "m3u" == a || "m3u8" == a)) return !1; a = b.extensionmap.types[a]; return !!a && !!d.vid.canPlayType && d.vid.canPlayType(a) }; b.seconds = function (a) {
        a = a.replace(",", "."); var b = a.split(":"), c = 0; "s" == a.substr(-1) ? c = Number(a.substr(0, a.length - 1)) : "m" == a.substr(-1) ? c = 60 * Number(a.substr(0, a.length - 1)) : "h" == a.substr(-1) ? c = 3600 * Number(a.substr(0, a.length - 1)) : 1 < b.length ? (c = Number(b[b.length - 1]), c += 60 * Number(b[b.length -
        2]), 3 == b.length && (c += 3600 * Number(b[b.length - 3]))) : c = Number(a); return c
    }; b.serialize = function (a) { return null == a ? null : "true" == a.toString().toLowerCase() ? !0 : "false" == a.toString().toLowerCase() ? !1 : isNaN(Number(a)) || 5 < a.length || 0 == a.length ? a : Number(a) }
}(jwplayer), function (d) {
    var a = "video/", k = d.foreach, f = { mp4: a + "mp4", vorbis: "audio/ogg", ogg: a + "ogg", webm: a + "webm", aac: "audio/mp4", mp3: "audio/mpeg", hls: "application/vnd.apple.mpegurl" }, h = {
        mp4: f.mp4, f4v: f.mp4, m4v: f.mp4, mov: f.mp4, m4a: f.aac, f4a: f.aac, aac: f.aac,
        mp3: f.mp3, ogv: f.ogg, ogg: f.vorbis, oga: f.vorbis, webm: f.webm, m3u8: f.hls, hls: f.hls
    }, a = "video", a = { flv: a, f4v: a, mov: a, m4a: a, m4v: a, mp4: a, aac: a, f4a: a, mp3: "sound", smil: "rtmp", m3u8: "hls", hls: "hls" }, e = d.extensionmap = {}; k(h, function (a, b) { e[a] = { html5: b } }); k(a, function (a, b) { e[a] || (e[a] = {}); e[a].flash = b }); e.types = f; e.mimeType = function (a) { var b; k(f, function (c, e) { !b && e == a && (b = c) }); return b }; e.extType = function (a) { return e.mimeType(h[a]) }
}(jwplayer.utils), function (d) {
    var a = d.loaderstatus = { NEW: 0, LOADING: 1, ERROR: 2, COMPLETE: 3 },
    k = document; d.scriptloader = function (f) {
        function h() { j = a.ERROR; c.sendEvent(b.ERROR) } function e() { j = a.COMPLETE; c.sendEvent(b.COMPLETE) } var j = a.NEW, b = jwplayer.events, c = new b.eventdispatcher; d.extend(this, c); this.load = function () {
            var c = d.scriptloader.loaders[f]; if (c && (c.getStatus() == a.NEW || c.getStatus() == a.LOADING)) c.addEventListener(b.ERROR, h), c.addEventListener(b.COMPLETE, e); else if (d.scriptloader.loaders[f] = this, j == a.NEW) {
                j = a.LOADING; var m = k.createElement("script"); m.addEventListener ? (m.onload = e, m.onerror =
                h) : m.readyState && (m.onreadystatechange = function () { ("loaded" == m.readyState || "complete" == m.readyState) && e() }); k.getElementsByTagName("head")[0].appendChild(m); m.src = f
            }
        }; this.getStatus = function () { return j }
    }; d.scriptloader.loaders = {}
}(jwplayer.utils), function (d) {
    d.trim = function (a) { return a.replace(/^\s*/, "").replace(/\s*$/, "") }; d.pad = function (a, d, f) { for (f || (f = "0") ; a.length < d;) a = f + a; return a }; d.xmlAttribute = function (a, d) {
        for (var f = 0; f < a.attributes.length; f++) if (a.attributes[f].name && a.attributes[f].name.toLowerCase() ==
        d.toLowerCase()) return a.attributes[f].value.toString(); return ""
    }; d.extension = function (a) { if (!a || "rtmp" == a.substr(0, 4)) return ""; a = a.substring(a.lastIndexOf("/") + 1, a.length).split("?")[0].split("#")[0]; if (-1 < a.lastIndexOf(".")) return a.substr(a.lastIndexOf(".") + 1, a.length).toLowerCase() }; d.stringToColor = function (a) { a = a.replace(/(#|0x)?([0-9A-F]{3,6})$/gi, "$2"); 3 == a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2)); return parseInt(a, 16) }
}(jwplayer.utils), function (d) {
    var a =
    "touchmove", k = "touchstart"; d.touch = function (f) {
        function h(b) { b.type == k ? (c = !0, m = j(l.DRAG_START, b)) : b.type == a ? c && (p || (e(l.DRAG_START, b, m), p = !0), e(l.DRAG, b)) : (c && (p ? e(l.DRAG_END, b) : (b.cancelBubble = !0, e(l.TAP, b))), c = p = !1, m = null) } function e(a, b, c) { if (n[a] && (b.preventManipulation && b.preventManipulation(), b.preventDefault && b.preventDefault(), b = c ? c : j(a, b))) n[a](b) } function j(a, c) {
            var e = null; c.touches && c.touches.length ? e = c.touches[0] : c.changedTouches && c.changedTouches.length && (e = c.changedTouches[0]); if (!e) return null;
            var j = b.getBoundingClientRect(), e = { type: a, target: b, x: e.pageX - window.pageXOffset - j.left, y: e.pageY, deltaX: 0, deltaY: 0 }; a != l.TAP && m && (e.deltaX = e.x - m.x, e.deltaY = e.y - m.y); return e
        } var b = f, c = !1, n = {}, m = null, p = !1, l = d.touchEvents; document.addEventListener(a, h); document.addEventListener("touchend", function (a) { c && p && e(l.DRAG_END, a); c = p = !1; m = null }); document.addEventListener("touchcancel", h); f.addEventListener(k, h); f.addEventListener("touchend", h); this.addEventListener = function (a, b) { n[a] = b }; this.removeEventListener =
        function (a) { delete n[a] }; return this
    }
}(jwplayer.utils), function (d) { d.touchEvents = { DRAG: "jwplayerDrag", DRAG_START: "jwplayerDragStart", DRAG_END: "jwplayerDragEnd", TAP: "jwplayerTap" } }(jwplayer.utils), function (d) {
    d.key = function (a) {
        var k, f, h; this.edition = function () { return h && h.getTime() < (new Date).getTime() ? "invalid" : k }; this.token = function () { return f }; d.exists(a) || (a = ""); try {
            a = d.tea.decrypt(a, "36QXq4W@GSBV^teR"); var e = a.split("/"); (k = e[0]) ? /^(free|pro|premium|ads)$/i.test(k) ? (f = e[1], e[2] && 0 < parseInt(e[2]) &&
            (h = new Date, h.setTime(String(e[2])))) : k = "invalid" : k = "free"
        } catch (j) { k = "invalid" }
    }
}(jwplayer.utils), function (d) {
    var a = d.tea = {}; a.encrypt = function (h, e) { if (0 == h.length) return ""; var j = a.strToLongs(f.encode(h)); 1 >= j.length && (j[1] = 0); for (var b = a.strToLongs(f.encode(e).slice(0, 16)), c = j.length, d = j[c - 1], m = j[0], p, l = Math.floor(6 + 52 / c), g = 0; 0 < l--;) { g += 2654435769; p = g >>> 2 & 3; for (var q = 0; q < c; q++) m = j[(q + 1) % c], d = (d >>> 5 ^ m << 2) + (m >>> 3 ^ d << 4) ^ (g ^ m) + (b[q & 3 ^ p] ^ d), d = j[q] += d } j = a.longsToStr(j); return k.encode(j) }; a.decrypt = function (h,
    e) { if (0 == h.length) return ""; for (var j = a.strToLongs(k.decode(h)), b = a.strToLongs(f.encode(e).slice(0, 16)), c = j.length, d = j[c - 1], m = j[0], p, l = 2654435769 * Math.floor(6 + 52 / c) ; 0 != l;) { p = l >>> 2 & 3; for (var g = c - 1; 0 <= g; g--) d = j[0 < g ? g - 1 : c - 1], d = (d >>> 5 ^ m << 2) + (m >>> 3 ^ d << 4) ^ (l ^ m) + (b[g & 3 ^ p] ^ d), m = j[g] -= d; l -= 2654435769 } j = a.longsToStr(j); j = j.replace(/\0+$/, ""); return f.decode(j) }; a.strToLongs = function (a) {
        for (var e = Array(Math.ceil(a.length / 4)), j = 0; j < e.length; j++) e[j] = a.charCodeAt(4 * j) + (a.charCodeAt(4 * j + 1) << 8) + (a.charCodeAt(4 * j +
        2) << 16) + (a.charCodeAt(4 * j + 3) << 24); return e
    }; a.longsToStr = function (a) { for (var e = Array(a.length), j = 0; j < a.length; j++) e[j] = String.fromCharCode(a[j] & 255, a[j] >>> 8 & 255, a[j] >>> 16 & 255, a[j] >>> 24 & 255); return e.join("") }; var k = {
        code: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d", encode: function (a, e) {
            var j, b, c, d, m = [], p = "", l, g, q = k.code; g = ("undefined" == typeof e ? 0 : e) ? f.encode(a) : a; l = g.length % 3; if (0 < l) for (; 3 > l++;) p += "\x3d", g += "\x00"; for (l = 0; l < g.length; l += 3) j = g.charCodeAt(l), b = g.charCodeAt(l +
            1), c = g.charCodeAt(l + 2), d = j << 16 | b << 8 | c, j = d >> 18 & 63, b = d >> 12 & 63, c = d >> 6 & 63, d &= 63, m[l / 3] = q.charAt(j) + q.charAt(b) + q.charAt(c) + q.charAt(d); m = m.join(""); return m = m.slice(0, m.length - p.length) + p
        }, decode: function (a, e) {
            e = "undefined" == typeof e ? !1 : e; var j, b, c, d, m, p = [], l, g = k.code; l = e ? f.decode(a) : a; for (var q = 0; q < l.length; q += 4) j = g.indexOf(l.charAt(q)), b = g.indexOf(l.charAt(q + 1)), d = g.indexOf(l.charAt(q + 2)), m = g.indexOf(l.charAt(q + 3)), c = j << 18 | b << 12 | d << 6 | m, j = c >>> 16 & 255, b = c >>> 8 & 255, c &= 255, p[q / 4] = String.fromCharCode(j, b,
            c), 64 == m && (p[q / 4] = String.fromCharCode(j, b)), 64 == d && (p[q / 4] = String.fromCharCode(j)); d = p.join(""); return e ? f.decode(d) : d
        }
    }, f = {
        encode: function (a) { a = a.replace(/[\u0080-\u07ff]/g, function (a) { a = a.charCodeAt(0); return String.fromCharCode(192 | a >> 6, 128 | a & 63) }); return a = a.replace(/[\u0800-\uffff]/g, function (a) { a = a.charCodeAt(0); return String.fromCharCode(224 | a >> 12, 128 | a >> 6 & 63, 128 | a & 63) }) }, decode: function (a) {
            a = a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (a) {
                a = (a.charCodeAt(0) & 15) << 12 |
                (a.charCodeAt(1) & 63) << 6 | a.charCodeAt(2) & 63; return String.fromCharCode(a)
            }); return a = a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (a) { a = (a.charCodeAt(0) & 31) << 6 | a.charCodeAt(1) & 63; return String.fromCharCode(a) })
        }
    }
}(jwplayer.utils), function (d) {
    d.events = {
        COMPLETE: "COMPLETE", ERROR: "ERROR", API_READY: "jwplayerAPIReady", JWPLAYER_READY: "jwplayerReady", JWPLAYER_FULLSCREEN: "jwplayerFullscreen", JWPLAYER_RESIZE: "jwplayerResize", JWPLAYER_ERROR: "jwplayerError", JWPLAYER_SETUP_ERROR: "jwplayerSetupError", JWPLAYER_MEDIA_BEFOREPLAY: "jwplayerMediaBeforePlay",
        JWPLAYER_MEDIA_BEFORECOMPLETE: "jwplayerMediaBeforeComplete", JWPLAYER_COMPONENT_SHOW: "jwplayerComponentShow", JWPLAYER_COMPONENT_HIDE: "jwplayerComponentHide", JWPLAYER_MEDIA_BUFFER: "jwplayerMediaBuffer", JWPLAYER_MEDIA_BUFFER_FULL: "jwplayerMediaBufferFull", JWPLAYER_MEDIA_ERROR: "jwplayerMediaError", JWPLAYER_MEDIA_LOADED: "jwplayerMediaLoaded", JWPLAYER_MEDIA_COMPLETE: "jwplayerMediaComplete", JWPLAYER_MEDIA_SEEK: "jwplayerMediaSeek", JWPLAYER_MEDIA_TIME: "jwplayerMediaTime", JWPLAYER_MEDIA_VOLUME: "jwplayerMediaVolume",
        JWPLAYER_MEDIA_META: "jwplayerMediaMeta", JWPLAYER_MEDIA_MUTE: "jwplayerMediaMute", JWPLAYER_MEDIA_LEVELS: "jwplayerMediaLevels", JWPLAYER_MEDIA_LEVEL_CHANGED: "jwplayerMediaLevelChanged", JWPLAYER_CAPTIONS_CHANGED: "jwplayerCaptionsChanged", JWPLAYER_CAPTIONS_LIST: "jwplayerCaptionsList", JWPLAYER_PLAYER_STATE: "jwplayerPlayerState", state: { BUFFERING: "BUFFERING", IDLE: "IDLE", PAUSED: "PAUSED", PLAYING: "PLAYING" }, JWPLAYER_PLAYLIST_LOADED: "jwplayerPlaylistLoaded", JWPLAYER_PLAYLIST_ITEM: "jwplayerPlaylistItem", JWPLAYER_PLAYLIST_COMPLETE: "jwplayerPlaylistComplete",
        JWPLAYER_DISPLAY_CLICK: "jwplayerViewClick", JWPLAYER_CONTROLS: "jwplayerViewControls", JWPLAYER_USER_ACTION: "jwplayerUserAction", JWPLAYER_INSTREAM_CLICK: "jwplayerInstreamClicked", JWPLAYER_INSTREAM_DESTROYED: "jwplayerInstreamDestroyed", JWPLAYER_AD_TIME: "jwplayerAdTime", JWPLAYER_AD_ERROR: "jwplayerAdError", JWPLAYER_AD_CLICK: "jwplayerAdClicked", JWPLAYER_AD_COMPLETE: "jwplayerAdComplete", JWPLAYER_AD_IMPRESSION: "jwplayerAdImpression", JWPLAYER_AD_COMPANIONS: "jwplayerAdCompanions"
    }
}(jwplayer), function (d) {
    var a =
    jwplayer.utils; d.eventdispatcher = function (d, f) {
        var h, e; this.resetEventListeners = function () { h = {}; e = [] }; this.resetEventListeners(); this.addEventListener = function (e, b, c) { try { a.exists(h[e]) || (h[e] = []), "string" == a.typeOf(b) && (b = (new Function("return " + b))()), h[e].push({ listener: b, count: c }) } catch (f) { a.log("error", f) } return !1 }; this.removeEventListener = function (e, b) { if (h[e]) { try { for (var c = 0; c < h[e].length; c++) if (h[e][c].listener.toString() == b.toString()) { h[e].splice(c, 1); break } } catch (f) { a.log("error", f) } return !1 } };
        this.addGlobalListener = function (f, b) { try { "string" == a.typeOf(f) && (f = (new Function("return " + f))()), e.push({ listener: f, count: b }) } catch (c) { a.log("error", c) } return !1 }; this.removeGlobalListener = function (f) { if (f) { try { for (var b = 0; b < e.length; b++) if (e[b].listener.toString() == f.toString()) { e.splice(b, 1); break } } catch (c) { a.log("error", c) } return !1 } }; this.sendEvent = function (j, b) {
            a.exists(b) || (b = {}); a.extend(b, { id: d, version: jwplayer.version, type: j }); f && a.log(j, b); if ("undefined" != a.typeOf(h[j])) for (var c = 0; c < h[j].length; c++) {
                try { h[j][c].listener(b) } catch (n) {
                    a.log("There was an error while handling a listener: " +
                    n.toString(), h[j][c].listener)
                } h[j][c] && (1 === h[j][c].count ? delete h[j][c] : 0 < h[j][c].count && (h[j][c].count -= 1))
            } for (c = 0; c < e.length; c++) { try { e[c].listener(b) } catch (m) { a.log("There was an error while handling a listener: " + m.toString(), e[c].listener) } e[c] && (1 === e[c].count ? delete e[c] : 0 < e[c].count && (e[c].count -= 1)) }
        }
    }
}(jwplayer.events), function (d) {
    var a = {}, k = {}; d.plugins = function () { }; d.plugins.loadPlugins = function (f, h) { k[f] = new d.plugins.pluginloader(new d.plugins.model(a), h); return k[f] }; d.plugins.registerPlugin =
    function (f, h, e, j) { var b = d.utils.getPluginName(f); a[b] || (a[b] = new d.plugins.plugin(f)); a[b].registerPlugin(f, h, e, j) }
}(jwplayer), function (d) { d.plugins.model = function (a) { this.addPlugin = function (k) { var f = d.utils.getPluginName(k); a[f] || (a[f] = new d.plugins.plugin(k)); return a[f] }; this.getPlugins = function () { return a } } }(jwplayer), function (d) {
    var a = jwplayer.utils, k = jwplayer.events; d.pluginmodes = { FLASH: 0, JAVASCRIPT: 1, HYBRID: 2 }; d.plugin = function (f) {
        function h() {
            switch (a.getPluginPathType(f)) {
                case a.pluginPathType.ABSOLUTE: return f;
                case a.pluginPathType.RELATIVE: return a.getAbsolutePath(f, window.location.href)
            }
        } function e() { p = setTimeout(function () { b = a.loaderstatus.COMPLETE; l.sendEvent(k.COMPLETE) }, 1E3) } function j() { b = a.loaderstatus.ERROR; l.sendEvent(k.ERROR) } var b = a.loaderstatus.NEW, c, n, m, p, l = new k.eventdispatcher; a.extend(this, l); this.load = function () {
            if (b == a.loaderstatus.NEW) if (0 < f.lastIndexOf(".swf")) c = f, b = a.loaderstatus.COMPLETE, l.sendEvent(k.COMPLETE); else if (a.getPluginPathType(f) == a.pluginPathType.CDN) b = a.loaderstatus.COMPLETE,
            l.sendEvent(k.COMPLETE); else { b = a.loaderstatus.LOADING; var g = new a.scriptloader(h()); g.addEventListener(k.COMPLETE, e); g.addEventListener(k.ERROR, j); g.load() }
        }; this.registerPlugin = function (e, f, j, d) { p && (clearTimeout(p), p = void 0); m = f; j && d ? (c = d, n = j) : "string" == typeof j ? c = j : "function" == typeof j ? n = j : !j && !d && (c = e); b = a.loaderstatus.COMPLETE; l.sendEvent(k.COMPLETE) }; this.getStatus = function () { return b }; this.getPluginName = function () { return a.getPluginName(f) }; this.getFlashPath = function () {
            if (c) switch (a.getPluginPathType(c)) {
                case a.pluginPathType.ABSOLUTE: return c;
                case a.pluginPathType.RELATIVE: return 0 < f.lastIndexOf(".swf") ? a.getAbsolutePath(c, window.location.href) : a.getAbsolutePath(c, h())
            } return null
        }; this.getJS = function () { return n }; this.getTarget = function () { return m }; this.getPluginmode = function () { if ("undefined" != typeof c && "undefined" != typeof n) return d.pluginmodes.HYBRID; if ("undefined" != typeof c) return d.pluginmodes.FLASH; if ("undefined" != typeof n) return d.pluginmodes.JAVASCRIPT }; this.getNewInstance = function (a, b, c) { return new n(a, b, c) }; this.getURL = function () { return f }
    }
}(jwplayer.plugins),
function (d) {
    var a = d.utils, k = d.events, f = a.foreach; d.plugins.pluginloader = function (h, e) {
        function j() { m ? g.sendEvent(k.ERROR, { message: p }) : n || (n = !0, c = a.loaderstatus.COMPLETE, g.sendEvent(k.COMPLETE)) } function b() {
            l || j(); if (!n && !m) {
                var b = 0, c = h.getPlugins(); a.foreach(l, function (e) { e = a.getPluginName(e); var f = c[e]; e = f.getJS(); var g = f.getTarget(), f = f.getStatus(); if (f == a.loaderstatus.LOADING || f == a.loaderstatus.NEW) b++; else if (e && (!g || parseFloat(g) > parseFloat(d.version))) m = !0, p = "Incompatible player version", j() });
                0 == b && j()
            }
        } var c = a.loaderstatus.NEW, n = !1, m = !1, p, l = e, g = new k.eventdispatcher; a.extend(this, g); this.setupPlugins = function (b, c, e) {
            var g = { length: 0, plugins: {} }, j = 0, d = {}, n = h.getPlugins(); f(c.plugins, function (f, h) {
                var k = a.getPluginName(f), l = n[k], m = l.getFlashPath(), q = l.getJS(), p = l.getURL(); m && (g.plugins[m] = a.extend({}, h), g.plugins[m].pluginmode = l.getPluginmode(), g.length++); try {
                    if (q && c.plugins && c.plugins[p]) {
                        var A = document.createElement("div"); A.id = b.id + "_" + k; A.style.position = "absolute"; A.style.top = 0; A.style.zIndex =
                        j + 10; d[k] = l.getNewInstance(b, a.extend({}, c.plugins[p]), A); j++; b.onReady(e(d[k], A, !0));
                        b.onResize(e(d[k], A))
                    }
                } catch (D) { a.log("ERROR: Failed to load " + k + ".") }
            }); b.plugins = d; return g
        }; this.load = function () { if (!(a.exists(e) && "object" != a.typeOf(e))) { c = a.loaderstatus.LOADING; f(e, function (c) { a.exists(c) && (c = h.addPlugin(c), c.addEventListener(k.COMPLETE, b), c.addEventListener(k.ERROR, q)) }); var g = h.getPlugins(); f(g, function (a, b) { b.load() }) } b() }; var q = this.pluginFailed = function () { m || (m = !0, p = "File not found", j()) };
        this.getStatus = function () { return c }
    }
}(jwplayer), function () { jwplayer.parsers = { localName: function (d) { return d ? d.localName ? d.localName : d.baseName ? d.baseName : "" : "" }, textContent: function (d) { return d ? d.textContent ? d.textContent : d.text ? d.text : "" : "" }, getChildNode: function (d, a) { return d.childNodes[a] }, numChildren: function (d) { return d.childNodes ? d.childNodes.length : 0 } } }(jwplayer), function (d) {
    var a = d.parsers; (a.jwparser = function () { }).parseEntry = function (k, f) {
        for (var h = [], e = [], j = d.utils.xmlAttribute, b = 0; b < k.childNodes.length; b++) {
            var c =
            k.childNodes[b]; if ("jwplayer" == c.prefix) { var n = a.localName(c); "source" == n ? (delete f.sources, h.push({ file: j(c, "file"), "default": j(c, "default"), label: j(c, "label"), type: j(c, "type") })) : "track" == n ? (delete f.tracks, e.push({ file: j(c, "file"), "default": j(c, "default"), kind: j(c, "kind"), label: j(c, "label") })) : (f[n] = d.utils.serialize(a.textContent(c)), "file" == n && f.sources && delete f.sources) } f.file || (f.file = f.link)
        } if (h.length) {
            f.sources = []; for (b = 0; b < h.length; b++) 0 < h[b].file.length && (h[b]["default"] = "true" == h[b]["default"] ?
            !0 : !1, h[b].label.length || delete h[b].label, f.sources.push(h[b]))
        } if (e.length) { f.tracks = []; for (b = 0; b < e.length; b++) 0 < e[b].file.length && (e[b]["default"] = "true" == e[b]["default"] ? !0 : !1, e[b].kind = !e[b].kind.length ? "captions" : e[b].kind, e[b].label.length || delete e[b].label, f.tracks.push(e[b])) } return f
    }
}(jwplayer), function (d) {
    var a = jwplayer.utils, k = a.xmlAttribute, f = d.localName, h = d.textContent, e = d.numChildren, j = d.mediaparser = function () { }; j.parseGroup = function (b, c) {
        var d, m, p = []; for (m = 0; m < e(b) ; m++) if (d = b.childNodes[m],
        "media" == d.prefix && f(d)) switch (f(d).toLowerCase()) {
            case "content": k(d, "duration") && (c.duration = a.seconds(k(d, "duration"))); 0 < e(d) && (c = j.parseGroup(d, c)); k(d, "url") && (c.sources || (c.sources = []), c.sources.push({ file: k(d, "url"), type: k(d, "type"), width: k(d, "width"), label: k(d, "label") })); break; case "title": c.title = h(d); break; case "description": c.description = h(d); break; case "guid": c.mediaid = h(d); break; case "thumbnail": c.image || (c.image = k(d, "url")); break; case "group": j.parseGroup(d, c); break; case "subtitle": var l =
            {}; l.file = k(d, "url"); l.kind = "captions"; if (0 < k(d, "lang").length) { var g = l; d = k(d, "lang"); var q = { zh: "Chinese", nl: "Dutch", en: "English", fr: "French", de: "German", it: "Italian", ja: "Japanese", pt: "Portuguese", ru: "Russian", es: "Spanish" }; d = q[d] ? q[d] : d; g.label = d } p.push(l)
        } c.hasOwnProperty("tracks") || (c.tracks = []); for (m = 0; m < p.length; m++) c.tracks.push(p[m]); return c
    }
}(jwplayer.parsers), function (d) {
    function a(a) {
        for (var c = {}, e = 0; e < a.childNodes.length; e++) {
            var h = a.childNodes[e], p = j(h); if (p) switch (p.toLowerCase()) {
                case "enclosure": c.file =
                k.xmlAttribute(h, "url"); break; case "title": c.title = f(h); break; case "guid": c.mediaid = f(h); break; case "pubdate": c.date = f(h); break; case "description": c.description = f(h); break; case "link": c.link = f(h); break; case "category": c.tags = c.tags ? c.tags + f(h) : f(h)
            }
        } c = d.mediaparser.parseGroup(a, c); c = d.jwparser.parseEntry(a, c); return new jwplayer.playlist.item(c)
    } var k = jwplayer.utils, f = d.textContent, h = d.getChildNode, e = d.numChildren, j = d.localName; d.rssparser = {}; d.rssparser.parse = function (b) {
        for (var c = [], f = 0; f < e(b) ; f++) {
            var d =
            h(b, f); if ("channel" == j(d).toLowerCase()) for (var k = 0; k < e(d) ; k++) { var l = h(d, k); "item" == j(l).toLowerCase() && c.push(a(l)) }
        } return c
    }
}(jwplayer.parsers), function (d) { d.playlist = function (a) { var k = []; if ("array" == d.utils.typeOf(a)) for (var f = 0; f < a.length; f++) k.push(new d.playlist.item(a[f])); else k.push(new d.playlist.item(a)); return k } }(jwplayer), function (d) {
    var a = d.item = function (k) {
        var f = jwplayer.utils, h = f.extend({}, a.defaults, k); h.tracks = k && f.exists(k.tracks) ? k.tracks : []; 0 == h.sources.length && (h.sources =
        [new d.source(h)]); for (var e = 0; e < h.sources.length; e++) { var j = h.sources[e]["default"]; h.sources[e]["default"] = j ? "true" == j.toString() : !1; h.sources[e] = new d.source(h.sources[e]) } if (h.captions && !f.exists(k.tracks)) { for (k = 0; k < h.captions.length; k++) h.tracks.push(h.captions[k]); delete h.captions } for (e = 0; e < h.tracks.length; e++) h.tracks[e] = new d.track(h.tracks[e]); return h
    }; a.defaults = { description: "", image: "", mediaid: "", title: "", sources: [], tracks: [] }
}(jwplayer.playlist), function (d) {
    var a = jwplayer, k = a.utils,
    f = a.events, h = a.parsers; d.loader = function () {
        function a(e) { try { var j = e.responseXML.childNodes; e = ""; for (var k = 0; k < j.length && !(e = j[k], 8 != e.nodeType) ; k++); "xml" == h.localName(e) && (e = e.nextSibling); if ("rss" != h.localName(e)) b("Not a valid RSS feed"); else { var l = new d(h.rssparser.parse(e)); c.sendEvent(f.JWPLAYER_PLAYLIST_LOADED, { playlist: l }) } } catch (g) { b() } } function j(a) { b(a.match(/invalid/i) ? "Not a valid RSS feed" : "") } function b(a) { c.sendEvent(f.JWPLAYER_ERROR, { message: a ? a : "Error loading file" }) } var c = new f.eventdispatcher;
        k.extend(this, c); this.load = function (b) { k.ajax(b, a, j) }
    }
}(jwplayer.playlist), function (d) { var a = jwplayer.utils, k = { file: void 0, label: void 0, type: void 0, "default": void 0 }; d.source = function (f) { var d = a.extend({}, k); a.foreach(k, function (e) { a.exists(f[e]) && (d[e] = f[e], delete f[e]) }); d.type && 0 < d.type.indexOf("/") && (d.type = a.extensionmap.mimeType(d.type)); "m3u8" == d.type && (d.type = "hls"); "smil" == d.type && (d.type = "rtmp"); return d } }(jwplayer.playlist), function (d) {
    var a = jwplayer.utils, k = {
        file: void 0, label: void 0, kind: "captions",
        "default": !1
    }; d.track = function (d) { var h = a.extend({}, k); d || (d = {}); a.foreach(k, function (e) { a.exists(d[e]) && (h[e] = d[e], delete d[e]) }); return h }
}(jwplayer.playlist),
function (d) {
    var a = d.utils, k = d.events, f = !0, h = !1, e = document, j = d.embed = function (b) {
        function c(b, c) { a.foreach(c, function (a, c) { "function" == typeof b[a] && b[a].call(b, c) }) } function n() {
            if (r.sitecatalyst) try { null != s && s.hasOwnProperty("Media") || l() } catch (e) { l(); return } if ("array" == a.typeOf(r.playlist) && 2 > r.playlist.length && (0 == r.playlist.length || !r.playlist[0].sources ||
            0 == r.playlist[0].sources.length)) p(); else if (!z) if ("string" == a.typeOf(r.playlist)) { var g = new d.playlist.loader; g.addEventListener(k.JWPLAYER_PLAYLIST_LOADED, function (a) { r.playlist = a.playlist; z = h; n() }); g.addEventListener(k.JWPLAYER_ERROR, function (a) { z = h; p(a) }); z = f; g.load(r.playlist) } else if (y.getStatus() == a.loaderstatus.COMPLETE) {
                for (g = 0; g < r.modes.length; g++) if (r.modes[g].type && j[r.modes[g].type]) {
                    var u = a.extend({}, r), w = new j[r.modes[g].type](t, r.modes[g], u, y, b); if (w.supportsConfig()) return w.addEventListener(k.ERROR,
                    m), w.embed(), c(b, u.events), b
                } if (r.fallback) { var x = "No suitable players found and fallback enabled"; C = setTimeout(function () { q(x, f) }, 10); a.log(x); new j.download(t, r, p) } else x = "No suitable players found and fallback disabled", q(x, h), a.log(x), t.parentNode.replaceChild(v, t)
            }
        } function m(a) { g(t, B + a.message) } function p(a) { a && a.message ? g(t, "Error loading playlist: " + a.message) : g(t, B + "No playable sources found") } function l() { g(t, "Adobe SiteCatalyst Error: Could not find Media Module") } function g(b, c) {
            if (r.fallback) {
                var e =
                b.style; e.backgroundColor = "#000"; e.color = "#FFF"; e.width = a.styleDimension(r.width); e.height = a.styleDimension(r.height); e.display = "table"; e.opacity = 1; var e = document.createElement("p"), d = e.style; d.verticalAlign = "middle"; d.textAlign = "center"; d.display = "table-cell"; d.font = "15px/20px Arial, Helvetica, sans-serif"; e.innerHTML = c.replace(":", ":\x3cbr\x3e"); b.innerHTML = ""; b.appendChild(e); q(c, f)
            } else q(c, h)
        } function q(a, c) { C && (clearTimeout(C), C = null); b.dispatchEvent(k.JWPLAYER_SETUP_ERROR, { message: a, fallback: c }) }
        var r = new j.config(b.config), t, u, v, w = r.width, x = r.height, B = "Error loading player: ", y = d.plugins.loadPlugins(b.id, r.plugins), z = h, C = null; r.fallbackDiv && (v = r.fallbackDiv, delete r.fallbackDiv);
        r.id = b.id; u = e.getElementById(b.id); r.aspectratio ? b.config.aspectratio = r.aspectratio : delete b.config.aspectratio; t = e.createElement("div"); t.id = u.id; t.style.width = 0 < w.toString().indexOf("%") ? w : w + "px"; t.style.height = 0 < x.toString().indexOf("%") ? x : x + "px"; u.parentNode.replaceChild(t, u); d.embed.errorScreen = g; y.addEventListener(k.COMPLETE,
    n); y.addEventListener(k.ERROR, function (a) { g(t, "Could not load plugins: " + a.message) }); y.load(); return b
    }
}(jwplayer),
function (d) {
    function a(a) { if (a.playlist) for (var d = 0; d < a.playlist.length; d++) a.playlist[d] = new h(a.playlist[d]); else { var b = {}; f.foreach(h.defaults, function (c) { k(a, b, c) }); b.sources || (a.levels ? (b.sources = a.levels, delete a.levels) : (d = {}, k(a, d, "file"), k(a, d, "type"), b.sources = d.file ? [d] : [])); a.playlist = [new h(b)] } } function k(a, d, b) { f.exists(a[b]) && (d[b] = a[b], delete a[b]) } var f = d.utils, h = d.playlist.item;
    (d.embed.config = function (e) {
        var j = { fallback: !0, height: 270, primary: "html5", width: 480, base: e.base ? e.base : f.getScriptPath("jwplayer1.js"), aspectratio: "" }; e = f.extend(j, d.defaults, e); var j = { type: "html5", src: e.base + "jwplayer.html5.js" }, b = { type: "flash", src: e.base + "jwplayer.flash.swf" }; e.modes = "flash" == e.primary ? [b, j] : [j, b]; e.listbar && (e.playlistsize = e.listbar.size, e.playlistposition = e.listbar.position, e.playlistlayout = e.listbar.layout); e.flashplayer && (b.src = e.flashplayer); e.html5player && (j.src = e.html5player);
        a(e); b = e.aspectratio; if ("string" != typeof b || !f.exists(b)) j = 0; else { var c = b.indexOf(":"); -1 == c ? j = 0 : (j = parseFloat(b.substr(0, c)), b = parseFloat(b.substr(c + 1)), j = 0 >= j || 0 >= b ? 0 : 100 * (b / j) + "%") } -1 == e.width.toString().indexOf("%") ? delete e.aspectratio : j ? e.aspectratio = j : delete e.aspectratio; return e
    }).addConfig = function (e, d) { a(d); return f.extend(e, d) }
}(jwplayer),
function (d) {
    var a = d.utils, k = document; d.embed.download = function (d, h, e) {
        function j(b, c) {
            for (var e = k.querySelectorAll(b), d = 0; d < e.length; d++) a.foreach(c,
            function (a, b) { e[d].style[a] = b })
        } function b(a, b, c) { a = k.createElement(a); b && (a.className = "jwdownload" + b); c && c.appendChild(a); return a } var c = a.extend({}, h), n = c.width ? c.width : 480, m = c.height ? c.height : 320, p; h = h.logo ? h.logo : { prefix: a.repo(), file: "logo.png", margin: 10 }; var l, g, q, c = c.playlist, r, t = ["mp4", "aac", "mp3"]; if (c && c.length) {
            r = c[0]; p = r.sources; for (c = 0; c < p.length; c++) {
                var u = p[c], v = u.type ? u.type : a.extensionmap.extType(a.extension(u.file)); u.file && a.foreach(t, function (b) {
                    v == t[b] ? (l = u.file, g = r.image) : a.isYouTube(u.file) &&
                    (q = u.file)
                })
            } l ? (p = l, e = g, d && (c = b("a", "display", d), b("div", "icon", c), b("div", "logo", c), p && c.setAttribute("href", a.getAbsolutePath(p))), c = "#" + d.id + " .jwdownload", d.style.width = "", d.style.height = "", j(c + "display", { width: a.styleDimension(Math.max(320, n)), height: a.styleDimension(Math.max(180, m)), background: "black center no-repeat " + (e ? "url(" + e + ")" : ""), backgroundSize: "contain", position: "relative", border: "none", display: "block" }), j(c + "display div", { position: "absolute", width: "100%", height: "100%" }), j(c + "logo",
            { top: h.margin + "px", right: h.margin + "px", background: "top right no-repeat url(" + h.prefix + h.file + ")" }), j(c + "icon", { background: "center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNrs28lqwkAYB/CZqNVDDj2r6FN41QeIy8Fe+gj6BL275Q08u9FbT8ZdwVfotSBYEPUkxFOoks4EKiJdaDuTjMn3wWBO0V/+sySR8SNSqVRKIR8qaXHkzlqS9jCfzzWcTCYp9hF5o+59sVjsiRzcegSckFzcjT+ruN80TeSlAjCAAXzdJSGPFXRpAAMYwACGZQkSdhG4WCzehMNhqV6vG6vVSrirKVEw66YoSqDb7cqlUilE8JjHd/y1MQefVzqdDmiaJpfLZWHgXMHn8F6vJ1cqlVAkEsGuAn83J4gAd2RZymQygX6/L1erVQt+9ZPWb+CDwcCC2zXGJaewl/DhcHhK3DVj+KfKZrMWvFarcYNLomAv4aPRSFZVlTlcSPA5fDweW/BoNIqFnKV53JvncjkLns/n/cLdS+92O7RYLLgsKfv9/t8XlDn4eDyiw+HA9Jyz2eyt0+kY2+3WFC5hluej0Ha7zQQq9PPwdDq1Et1sNsx/nFBgCqWJ8oAK1aUptNVqcYWewE4nahfU0YQnk4ntUEfGMIU2m01HoLaCKbTRaDgKtaVLk9tBYaBcE/6Artdr4RZ5TB6/dC+9iIe/WgAMYADDpAUJAxjAAAYwgGFZgoS/AtNNTF7Z2bL0BYPBV3Jw5xFwwWcYxgtBP5OkE8i9G7aWGOOCruvauwADALMLMEbKf4SdAAAAAElFTkSuQmCC)" })) :
            q ? (h = q, d = b("embed", "", d), d.src = "http://www.youtube.com/v/" + a.youTubeID(h), d.type = "application/x-shockwave-flash", d.width = n, d.height = m) : e()
        }
    }
}(jwplayer),
function (d) {

    var a = d.utils, k = d.events, f = {}; (d.embed.flash = function (e, j, b, c, n) {
        function m(a, b, c) { var e = document.createElement("param"); e.setAttribute("name", b); e.setAttribute("value", c); a.appendChild(e) } function p(a, b, c) {
            return function () {
                try {
                    if (jwplayerOnResize)
                        jwplayerOnResize(a, b);
                    //c && document.getElementById(n.id + "_wrapper").appendChild(b);
                    //var e = document.getElementById(n.id).getPluginConfig("display");
                    //"function" == typeof a.resize && a.resize(e.width, e.height);
                    //b.style.left = e.x;
                    //b.style.top = e.h
                } catch (d) { }
            }
        } function l(b) { if (!b) return {}; var c = {}, e = []; a.foreach(b, function (b, d) { var g = a.getPluginName(b); e.push(b); a.foreach(d, function (a, b) { c[g + "." + a] = b }) }); c.plugins = e.join(","); return c } var g = new d.events.eventdispatcher, q = a.flashVersion(); a.extend(this, g); this.embed = function () {
            b.id = n.id; if (10 > q) return g.sendEvent(k.ERROR, { message: "Flash version must be 10.0 or greater" }), !1; var d, h, u = n.config.listbar, v = a.extend({},
            b); if (e.id + "_wrapper" == e.parentNode.id) d = document.getElementById(e.id + "_wrapper"); else {
                d = document.createElement("div"); h = document.createElement("div"); h.style.display = "none"; h.id = e.id + "_aspect"; d.id = e.id + "_wrapper"; d.style.position = "relative";

                d.style.display = "block";

                if (1 >= v.width && v.width >= 0)
                    d.style.width = v.width * 100 + "%";
                else
                    d.style.width = a.styleDimension(v.width);

                if (1 >= v.height && v.height >= 0)
                    d.style.height = v.height * 100 + "%";
                else
                    d.style.height = a.styleDimension(v.height);

                d.style.paddingTop = v.paddingTop;
                d.style.paddingBottom = v.paddingBottom;
                d.className = v.className;

                d.onclick = v.click;

                if (v.mask) {
                    var mask = document.createElement("div");
                    mask.style.position = "absolute";
                    mask.className = v.mask.className;
                    mask.ondblclick = v.mask.ondblclick;
                    d.appendChild(mask);

                }

                if (n.config.aspectratio) {
                    var w = parseFloat(n.config.aspectratio);
                    h.style.display = "block";
                    h.style.marginTop = n.config.aspectratio; d.style.height = "auto"; d.style.display =
            "inline-block"; u && ("bottom" == u.position ? h.style.paddingBottom = u.size + "px" : "right" == u.position && (h.style.marginBottom = -1 * u.size * (w / 100) + "px"))
                } e.parentNode.replaceChild(d, e); d.appendChild(e); d.appendChild(h)
            } d = c.setupPlugins(n, v, p); 0 < d.length ? a.extend(v, l(d.plugins)) : delete v.plugins; "undefined" != typeof v["dock.position"] && "false" == v["dock.position"].toString().toLowerCase() && (v.dock = v["dock.position"], delete v["dock.position"]); d = v.wmode ? v.wmode : v.height && 40 >= v.height ? "transparent" : "opaque"; h = "height width modes events primary base fallback volume".split(" ");
            for (u = 0; u < h.length; u++) delete v[h[u]]; h = a.getCookies(); a.foreach(h, function (a, b) { "undefined" == typeof v[a] && (v[a] = b) }); h = window.location.href.split("/"); h.splice(h.length - 1, 1); h = h.join("/"); v.base = h + "/"; f[e.id] = v; a.isIE() ? (h = '\x3cobject classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width\x3d"100%" height\x3d"100%"id\x3d"' + e.id + '" name\x3d"' + e.id + '" tabindex\x3d0""\x3e', h += '\x3cparam name\x3d"movie" value\x3d"' + j.src + '"\x3e', h += '\x3cparam name\x3d"allowfullscreen" value\x3d"true"\x3e\x3cparam name\x3d"allowscriptaccess" value\x3d"always"\x3e',
            h += '\x3cparam name\x3d"seamlesstabbing" value\x3d"true"\x3e', h += '\x3cparam name\x3d"wmode" value\x3d"' + d + '"\x3e', h += '\x3cparam name\x3d"bgcolor" value\x3d"#000000"\x3e', h += "\x3c/object\x3e", e.outerHTML = h,
            d = document.getElementById(e.id)) : (h = document.createElement("object"),
            h.setAttribute("type", "application/x-shockwave-flash"),
            h.setAttribute("data", j.src), h.setAttribute("width", "100%"),
            h.setAttribute("height", "100%"),
            h.setAttribute("bgcolor", "#000000"),
            h.setAttribute("id", e.id),
            h.setAttribute("name", e.id),
            h.setAttribute("tabindex", 0),

            m(h, "allowfullscreen", n.config.fullscreen == false ? "false" : "true"),
            m(h, "allowscriptaccess", "always"),
            m(h, "seamlesstabbing", "true"),
            m(h, "wmode", d + "_wrapper"),
            e.parentNode.replaceChild(h, e), d = h);
            n.config.aspectratio && (d.style.position = "absolute");
            n.container = d;
            jwplayerEvents = n;//把事件拿出来
            n.setPlayer(d, "flash")
        }; this.supportsConfig = function () {
            if (q) if (b) { if ("string" == a.typeOf(b.playlist)) return !0; try { var c = b.playlist[0].sources; if ("undefined" == typeof c) return !0; for (var d = 0; d < c.length; d++) if (c[d].file && h(c[d].file, c[d].type)) return !0 } catch (e) { } } else return !0;
            return !1
        }
    }).getVars = function (a) { return f[a] }; var h = d.embed.flashCanPlay = function (d, f) { if (a.isYouTube(d) || a.isRtmp(d, f) || "hls" == f) return !0; var b = a.extensionmap[f ? f : a.extension(d)]; return !b ? !1 : !!b.flash }
}(jwplayer),
function (d) {
    var a = d.utils, k = a.extensionmap, f = d.events; d.embed.html5 = function (h, e, j, b, c) {
        function n(a, b, c) {
            return function () {
                try {
                    var d = document.querySelector("#" + h.id + " .jwmain"); c && d.appendChild(b); "function" == typeof a.resize && (a.resize(d.clientWidth, d.clientHeight), setTimeout(function () {
                        a.resize(d.clientWidth,
                        d.clientHeight)
                    }, 400)); b.left = d.style.left; b.top = d.style.top
                } catch (e) { }
            }
        } function m(a) { p.sendEvent(a.type, { message: "HTML5 player not found" }) } var p = this, l = new f.eventdispatcher; a.extend(p, l); p.embed = function () { if (d.html5) { b.setupPlugins(c, j, n); h.innerHTML = ""; var g = d.utils.extend({}, j); delete g.volume; g = new d.html5.player(g); c.container = document.getElementById(c.id); c.setPlayer(g, "html5") } else g = new a.scriptloader(e.src), g.addEventListener(f.ERROR, m), g.addEventListener(f.COMPLETE, p.embed), g.load() };
        p.supportsConfig = function () { if (d.vid.canPlayType) try { if ("string" == a.typeOf(j.playlist)) return !0; for (var b = j.playlist[0].sources, c = 0; c < b.length; c++) { var e; var f = b[c].file, h = b[c].type; if (null !== navigator.userAgent.match(/BlackBerry/i) || a.isAndroid() && ("m3u" == a.extension(f) || "m3u8" == a.extension(f)) || a.isRtmp(f, h)) e = !1; else { var l = k[h ? h : a.extension(f)], m; if (!l || l.flash && !l.html5) m = !1; else { var n = l.html5, p = d.vid; if (n) try { m = p.canPlayType(n) ? !0 : !1 } catch (y) { m = !1 } else m = !0 } e = m } if (e) return !0 } } catch (z) { } return !1 }
    }
}(jwplayer),
function (d) {
    var a = d.embed, k = d.utils, f = k.extend(function (f) {
        var e = "jwplayer/new/", //k.repo(),
            j = k.extend({}, d.defaults), b = k.extend({}, j, f.config), c = f.config, n = b.plugins, m = b.analytics,
            p = e + "jwpsrv.js",
            l = e + "sharing.js", g = e + "related.js", q = e + "gapro.js", j = d.key ? d.key : j.key, r = (new d.utils.key(j)).edition(), n = n ? n : {}; "ads" == r && b.advertising && (b.advertising.client.match(".js$|.swf$") ? n[b.advertising.client] = b.advertising : n[e + b.advertising.client + ".js"] = b.advertising); delete c.advertising; c.key = j; b.analytics && (b.analytics.client &&
        b.analytics.client.match(".js$|.swf$")) && (p = b.analytics.client); delete c.analytics; if ("free" == r || !m || !1 !== m.enabled) n[p] = m ? m : {}; delete n.sharing; delete n.related; switch (r) {
            case "premium": case "ads": b.related && (b.related.client && b.related.client.match(".js$|.swf$") && (g = b.related.client), n[g] = b.related), b.ga && (b.ga.client && b.ga.client.match(".js$|.swf$") && (q = b.ga.client), n[q] = b.ga), c.sitecatalyst && new d.embed.sitecatalyst(f); case "pro": b.sharing && (b.sharing.client && b.sharing.client.match(".js$|.swf$") &&
            (l = b.sharing.client), n[l] = b.sharing), b.skin && (c.skin = b.skin.replace(/^(beelden|bekle|five|glow|modieus|roundster|stormtrooper|vapor)$/i, k.repo() + "skins/$1.xml"))
        } c.plugins = n; return new a(f)
    }, a); d.embed = f
}(jwplayer),
function (d) {
    var a = jwplayer.utils; d.sitecatalyst = function (d) {
        function f(b) { c.debug && a.log(b) } function h(a) { a = a.split("/"); a = a[a.length - 1]; a = a.split("?"); return a[0] } function e() { if (!g) { g = !0; var a = b.getPosition(); f("stop: " + m + " : " + a); s.Media.stop(m, a) } } function j() {
            q || (e(), q = !0, f("close: " +
            m), s.Media.close(m), r = !0, l = 0)
        } var b = d, c = a.extend({}, b.config.sitecatalyst), n = {
            onPlay: function () { if (!r) { var a = b.getPosition(); g = !1; f("play: " + m + " : " + a); s.Media.play(m, a) } }, onPause: e, onBuffer: e, onIdle: j, onPlaylistItem: function (d) { try { r = !0; j(); l = 0; var e; if (c.mediaName) e = c.mediaName; else { var g = b.getPlaylistItem(d.index); e = g.title ? g.title : g.file ? h(g.file) : g.sources && g.sources.length ? h(g.sources[0].file) : "" } m = e; p = c.playerName ? c.playerName : b.id } catch (f) { a.log(f) } }, onTime: function () {
                if (r) {
                    var a = b.getDuration();
                    if (-1 == a) return; q = g = r = !1; f("open: " + m + " : " + a + " : " + p); s.Media.open(m, a, p); f("play: " + m + " : 0"); s.Media.play(m, 0)
                } a = b.getPosition(); if (3 <= Math.abs(a - l)) { var c = l; f("seek: " + c + " to " + a); f("stop: " + m + " : " + c); s.Media.stop(m, c); f("play: " + m + " : " + a); s.Media.play(m, a) } l = a
            }, onComplete: j
        }, m, p, l, g = !0, q = !0, r; a.foreach(n, function (a) { b[a](n[a]) })
    }
}(jwplayer.embed),
function (d) {
    var a = [], k = d.utils, f = d.events, h = f.state, e = document, j = d.api = function (a) {
        function c(a, b) { return function (c) { return b(a, c) } } function n(a,
        b) { r[a] || (r[a] = [], p(f.JWPLAYER_PLAYER_STATE, function (b) { var c = b.newstate; b = b.oldstate; if (c == a) { var d = r[c]; if (d) for (var e = 0; e < d.length; e++) "function" == typeof d[e] && d[e].call(this, { oldstate: b, newstate: c }) } })); r[a].push(b); return g }
        function m(a, b) {
            try {
                a.jwAddEventListener(b, 'function(dat) { jwplayer("' + g.id + '").dispatchEvent("' + b + '", dat); }')
            } catch (c) { k.log("Could not add internal listener") }
        } function p(a, b) { q[a] || (q[a] = [], t && u && m(t, a)); q[a].push(b); return g }
        function l() {
            if (u) {
                for (var a = arguments[0], b = [], c = 1; c < arguments.length; c++)
                    b.push(arguments[c]);
                if ("undefined" != typeof t && "function" == typeof t[a])
                    switch (b.length) {
                        case 4:
                            return t[a](b[0], b[1], b[2], b[3]);
                        case 3:
                            return t[a](b[0], b[1], b[2]);
                        case 2:
                            return t[a](b[0], b[1]);
                        case 1:
                            return t[a](b[0]);
                        default:
                            return t[a]()
                    }
                return null
            }
            v.push(arguments)
        }
        var g = this, q = {}, r = {}, t = void 0, u = !1, v = [], w = void 0, x = {}, B = {}; g.container = a; g.id = a.id; g.getBuffer = function () { return l("jwGetBuffer") }; g.getContainer = function () { return g.container }; g.addButton = function (a,
        b, c, d) { try { B[d] = c, l("jwDockAddButton", a, b, "jwplayer('" + g.id + "').callback('" + d + "')", d) } catch (e) { k.log("Could not add dock button" + e.message) } }; g.removeButton = function (a) { l("jwDockRemoveButton", a) }; g.callback = function (a) { if (B[a]) B[a]() }; g.forceState = function (a) { l("jwForceState", a); return g }; g.releaseState = function () { return l("jwReleaseState") }; g.getDuration = function () { return l("jwGetDuration") }; g.getFullscreen = function () { return l("jwGetFullscreen") }; g.getHeight = function () { return l("jwGetHeight") }; g.getLockState =
        function () { return l("jwGetLockState") }; g.getMeta = function () { return g.getItemMeta() }; g.getMute = function () { return l("jwGetMute") }; g.getPlaylist = function () { var a = l("jwGetPlaylist"); "flash" == g.renderingMode && k.deepReplaceKeyName(a, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"]); return a }; g.getPlaylistItem = function (a) { k.exists(a) || (a = g.getPlaylistIndex()); return g.getPlaylist()[a] }; g.getPlaylistIndex = function () { return l("jwGetPlaylistIndex") }; g.getPosition = function () { return l("jwGetPosition") };
        g.getRenderingMode = function () { return g.renderingMode }; g.getState = function () { return l("jwGetState") }; g.getVolume = function () { return l("jwGetVolume") }; g.getWidth = function () { return l("jwGetWidth") };
        g.setFullscreen = function (a) {
            k.exists(a) ? l("jwSetFullscreen", a) : l("jwSetFullscreen", !l("jwGetFullscreen"));
            return g
        };
        g.setMute = function (a) { k.exists(a) ? l("jwSetMute", a) : l("jwSetMute", !l("jwGetMute")); return g }; g.lock = function () { return g }; g.unlock = function () { return g }; g.load = function (a) { l("jwLoad", a); return g };
        g.playlistItem = function (a) { l("jwPlaylistItem", parseInt(a)); return g }; g.playlistPrev = function () { l("jwPlaylistPrev"); return g }; g.playlistNext = function () { l("jwPlaylistNext"); return g };
        g.resize = function (a, b) {
            if ("flash" != g.renderingMode) {
                var c = document.getElementById(g.id);
                c.className = c.className.replace(/\s+aspectMode/, "");
                c.style.display = "block";
                l("jwResize", a, b)
            } else {
                var c = e.getElementById(g.id + "_wrapper"), d = e.getElementById(g.id + "_aspect");
                d && (d.style.display = "none");
                c && (c.style.display = "block", c.style.width =
                k.styleDimension(a), c.style.height = k.styleDimension(b))
            } return g
        }; g.play = function (a) { "undefined" == typeof a ? (a = g.getState(), a == h.PLAYING || a == h.BUFFERING ? l("jwPause") : l("jwPlay")) : l("jwPlay", a); return g }; g.pause = function (a) { "undefined" == typeof a ? (a = g.getState(), a == h.PLAYING || a == h.BUFFERING ? l("jwPause") : l("jwPlay")) : l("jwPause", a); return g }; g.stop = function () { l("jwStop"); return g }; g.seek = function (a) { l("jwSeek", a); return g }; g.setVolume = function (a) { l("jwSetVolume", a); return g }; g.loadInstream = function (a,
        b) { return w = new j.instream(this, t, a, b) }; g.getQualityLevels = function () { return l("jwGetQualityLevels") }; g.getCurrentQuality = function () { return l("jwGetCurrentQuality") }; g.setCurrentQuality = function (a) { l("jwSetCurrentQuality", a) }; g.getCaptionsList = function () { return l("jwGetCaptionsList") }; g.getCurrentCaptions = function () { return l("jwGetCurrentCaptions") }; g.setCurrentCaptions = function (a) { l("jwSetCurrentCaptions", a) }; g.getControls = function () { return l("jwGetControls") }; g.getSafeRegion = function () { return l("jwGetSafeRegion") };
        g.setControls = function (a) { l("jwSetControls", a) }; g.destroyPlayer = function () { l("jwPlayerDestroy") }; g.playAd = function (a) { l("jwPlayAd", a) }; var y = {
            onBufferChange: f.JWPLAYER_MEDIA_BUFFER, onBufferFull: f.JWPLAYER_MEDIA_BUFFER_FULL, onError: f.JWPLAYER_ERROR, onSetupError: f.JWPLAYER_SETUP_ERROR, onFullscreen: f.JWPLAYER_FULLSCREEN, onMeta: f.JWPLAYER_MEDIA_META, onMute: f.JWPLAYER_MEDIA_MUTE, onPlaylist: f.JWPLAYER_PLAYLIST_LOADED, onPlaylistItem: f.JWPLAYER_PLAYLIST_ITEM, onPlaylistComplete: f.JWPLAYER_PLAYLIST_COMPLETE,
            onReady: f.API_READY, onResize: f.JWPLAYER_RESIZE, onComplete: f.JWPLAYER_MEDIA_COMPLETE, onSeek: f.JWPLAYER_MEDIA_SEEK, onTime: f.JWPLAYER_MEDIA_TIME, onVolume: f.JWPLAYER_MEDIA_VOLUME, onBeforePlay: f.JWPLAYER_MEDIA_BEFOREPLAY, onBeforeComplete: f.JWPLAYER_MEDIA_BEFORECOMPLETE, onDisplayClick: f.JWPLAYER_DISPLAY_CLICK, onControls: f.JWPLAYER_CONTROLS, onQualityLevels: f.JWPLAYER_MEDIA_LEVELS, onQualityChange: f.JWPLAYER_MEDIA_LEVEL_CHANGED, onCaptionsList: f.JWPLAYER_CAPTIONS_LIST, onCaptionsChange: f.JWPLAYER_CAPTIONS_CHANGED,
            onAdError: f.JWPLAYER_AD_ERROR, onAdClick: f.JWPLAYER_AD_CLICK, onAdImpression: f.JWPLAYER_AD_IMPRESSION, onAdTime: f.JWPLAYER_AD_TIME, onAdComplete: f.JWPLAYER_AD_COMPLETE, onAdCompanions: f.JWPLAYER_AD_COMPANIONS
        }; k.foreach(y, function (a) { g[a] = c(y[a], p) }); var z = { onBuffer: h.BUFFERING, onPause: h.PAUSED, onPlay: h.PLAYING, onIdle: h.IDLE }; k.foreach(z, function (a) { g[a] = c(z[a], n) }); g.remove = function () { if (!u) throw "Cannot call remove() before player is ready"; v = []; j.destroyPlayer(this.id) }; g.setup = function (a) {
            if (d.embed) {
                var b =
                e.getElementById(g.id); b && (a.fallbackDiv = b); b = g; v = []; j.destroyPlayer(b.id); b = d(g.id); b.config = a; return new d.embed(b)
            } return g
        }; g.registerPlugin = function (a, b, c, e) { d.plugins.registerPlugin(a, b, c, e) }; g.setPlayer = function (a, b) { t = a; g.renderingMode = b }; g.detachMedia = function () { if ("html5" == g.renderingMode) return l("jwDetachMedia") }; g.attachMedia = function (a) { if ("html5" == g.renderingMode) return l("jwAttachMedia", a) };
        g.dispatchEvent = function (a, b) {
            if (q[a])
                for (var c = k.translateEventResponse(a, b), d = 0; d < q[a].length; d++)
                    if ("function" == typeof q[a][d])
                        try {
                            a == f.JWPLAYER_PLAYLIST_LOADED && k.deepReplaceKeyName(c.playlist, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"]), q[a][d].call(this, c)
                        } catch (e) {
                            k.log("There was an error calling back an event handler")
                        }
        };
        g.dispatchInstreamEvent = function (a) {
            w && w.dispatchEvent(a, arguments)
        };
        g.callInternal = l; g.playerReady = function (a) {
            u = !0; t || g.setPlayer(e.getElementById(a.id)); g.container = e.getElementById(g.id); k.foreach(q, function (a) { m(t, a) }); p(f.JWPLAYER_PLAYLIST_ITEM, function () {
                x =
                {}
            }); p(f.JWPLAYER_MEDIA_META, function (a) { k.extend(x, a.metadata) }); for (g.dispatchEvent(f.API_READY) ; 0 < v.length;) l.apply(this, v.shift())
        }; g.getItemMeta = function () { return x }; g.isBeforePlay = function () { return t.jwIsBeforePlay() }; g.isBeforeComplete = function () { return t.jwIsBeforeComplete() }; return g
    }; j.selectPlayer = function (b) { var c; k.exists(b) || (b = 0); b.nodeType ? c = b : "string" == typeof b && (c = e.getElementById(b)); return c ? (b = j.playerById(c.id)) ? b : j.addPlayer(new j(c)) : "number" == typeof b ? a[b] : null }; j.playerById =
    function (b) { for (var c = 0; c < a.length; c++) if (a[c].id == b) return a[c]; return null }; j.addPlayer = function (b) { for (var c = 0; c < a.length; c++) if (a[c] == b) return b; a.push(b); return b }; j.destroyPlayer = function (b) { for (var c = -1, d, f = 0; f < a.length; f++) a[f].id == b && (c = f, d = a[f]); 0 <= c && (b = d.id, f = e.getElementById(b + ("flash" == d.renderingMode ? "_wrapper" : "")), k.clearCss && k.clearCss("#" + b), f && ("html5" == d.renderingMode && d.destroyPlayer(), d = e.createElement("div"), d.id = b, f.parentNode.replaceChild(d, f)), a.splice(c, 1)); return null };
    d.playerReady = function (a) { var c = d.api.playerById(a.id); c ? c.playerReady(a) : d.api.selectPlayer(a.id).playerReady(a) }
}(jwplayer),
function (d) {
    var a = d.events, k = d.utils, f = a.state;
    d.api.instream = function (d, e, j, b) {
        function c(a, b) {
            l[a] || (l[a] = [], p.jwInstreamAddEventListener(a, 'function(dat) { jwplayer("' + m.id + '").dispatchInstreamEvent("' + a + '", dat); }')); l[a].push(b); return this
        }
        function n(b, d) {
            g[b] || (g[b] = [], c(a.JWPLAYER_PLAYER_STATE, function (a) {
                var c = a.newstate, d = a.oldstate; if (c == b) {
                    var e = g[c]; if (e) for (var f =
                    0; f < e.length; f++) "function" == typeof e[f] && e[f].call(this, { oldstate: d, newstate: c, type: a.type })
                }
            }));
            g[b].push(d); return this
        }
        var m = d, p = e, l = {}, g = {};
        this.dispatchEvent = function (a, b) {
            if (l[a])
                for (var c = k.translateEventResponse(a, b[1]), d = 0; d < l[a].length; d++)
                    "function" == typeof l[a][d] && l[a][d].call(this, c)
        };
        this.onError = function (b) {
            return c(a.JWPLAYER_ERROR, b)
        };
        this.onFullscreen = function (b) {
            return c(a.JWPLAYER_FULLSCREEN, b)
        }; this.onMeta = function (b) { return c(a.JWPLAYER_MEDIA_META, b) }; this.onMute = function (b) {
            return c(a.JWPLAYER_MEDIA_MUTE,
            b)
        }; this.onComplete = function (b) { return c(a.JWPLAYER_MEDIA_COMPLETE, b) }; this.onTime = function (b) { return c(a.JWPLAYER_MEDIA_TIME, b) }; this.onBuffer = function (a) { return n(f.BUFFERING, a) }; this.onPause = function (a) { return n(f.PAUSED, a) }; this.onPlay = function (a) { return n(f.PLAYING, a) }; this.onIdle = function (a) { return n(f.IDLE, a) }; this.onClick = function (b) { return c(a.JWPLAYER_INSTREAM_CLICK, b) }; this.onInstreamDestroyed = function (b) { return c(a.JWPLAYER_INSTREAM_DESTROYED, b) }; this.play = function (a) { p.jwInstreamPlay(a) };
        this.pause = function (a) { p.jwInstreamPause(a) }; this.destroy = function () { p.jwInstreamDestroy() }; this.setText = function (a) { p.jwInstreamSetText(a ? a : "") }; m.callInternal("jwLoadInstream", j, b ? b : {})
    }
}(jwplayer),
function (d) {
    var a = d.api,
        k = a.selectPlayer;
    a.selectPlayer = function (a) {
        return (a = k(a)) ? a : {
            registerPlugin: function (a, e, f) {
                d.plugins.registerPlugin(a, e, f)
            }
        }
    }
}(jwplayer));

var jwplayerOnResize;
var jwplayerEvents;