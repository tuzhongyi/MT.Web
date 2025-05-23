!function (t, e) {
if ("object" == typeof exports && "object" == typeof module) module.exports = e();
else if ("function" == typeof define && define.amd) define([], e);
else
{
var n = e();

for (var i in n) ("object" == typeof exports ? exports : t)[i] = n[i] } }(this, function () {
return function (n) {
var i = {};
function r(t) {
if (i[t])
return i[t].exports;
var e = i[t] = { exports: {}, id: t, loaded: !1 };
return n[t].call(e.exports, e, e.exports, r), e.loaded = !0, e.exports }
return r.m = n, r.c = i, r.p = "", r(0) }([function (t, e, n) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 }), e.JSPlugin = void 0;
var i, M = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }(), R = n(1), E = n(2), z = n(14), I = n(15), A = n(16), r = n(17), F = (i = r) && i.__esModule ? i : { default: i };
var o = function () {
if ("undefined" != typeof Symbol) {
var v = null, o = -1, l = 4194304, a = 2002, u = new E.StreamClient, c = null, d = null, p = Symbol("OPTIONS"), r = Symbol("CURRENTPLAYRATE"), s = Symbol("CURRENTSOUNDWND"), y = Symbol("MAXWNDNUM"), f = Symbol("MAXWNDNUM"), g = Symbol("DRAWCANVAS"), h = Symbol("SHAPEID"), m = Symbol("WINDOWFULL"), S = Symbol("SINGLEWINDOW"), b = Symbol("FILETMP"), w = Symbol("STATUSTMP"), _ = Symbol("UPGRADESTATUSURL"), P = Symbol("CURWNDINDEX"), C = Symbol("CALLBACKFUNCTION");
return function () { function i(t) { !function (t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, i);
(v = this)[p] = Object.assign({ szId: "playWnd", iType: 1, iWidth: 400, iHeight: 300, iMaxSplit: 4, iCurrentSplit: 2, szBasePath: "./" }, t);
var e = { border: "#343434", borderSelect: "#FFCC00", background: "#4C4B4B" };
e = Object.assign(e, t.oStyle), this[p].oStyle = e, this[p].iCurrentSplit > this[p].iMaxSplit && (this[p].iCurrentSplit = this[p].iMaxSplit), this[r] = 1, this[s] = -1, this[y] = this[p].iMaxSplit * this[p].iMaxSplit, this[h] = "", this[m] = !1, this[S] = null, this[b] = null, this[w] = "", this[_] = "", this[P] = -1, this[C] = null, c = new I.StorageManager(this[p].szBasePath + "/transform"), d = (0, F.default)("#" + v[p].szId), this[f] = [];

for (var n = 0;
n < this[y];
n++)
this[f][n] = {}, this[f][n].bSelect = !1, this[f][n].bPlay = !1, this[f][n].bRecord = !1, this[f][n].bPause = !1, this[f][n].oPlayCtrl = null, this[f][n].szPlayType = "", this[f][n].szStorageUUID = "", this[f][n].szStreamUUID = "", this[f][n].aHead = [], this[f][n].bLoad = !1, this[f][n].windowID = "canvas" + n, this[f][n].drawID = "canvas_draw" + n, this[f][n].iRate = 1, this[f][n].bEZoom = !1, this[f][n].b3DZoom = !1, this[f][n].szSecretKey = "", this[f][n].bFrameForward = !1, this[f][n].iDecodeType = 0, this[f][n].bFirstFrame = !1;
document.addEventListener("visibilitychange", function () {
if (document.hidden) 
for (var t = 0;
t < 16;
t++)
v[f][t] && v[f][t].bLoad && v[f][t].oPlayCtrl.PlayM4_IsVisible(!1);
else

for (var e = 0;
e < 16;
e++)
v[f][e] && v[f][e].bLoad && v[f][e].oPlayCtrl.PlayM4_IsVisible(!0) }, !1), x(), this[g] = new A.ESCanvas("canvas_draw0"), 0 === this[p].iType && (0, F.default)("#" + v[p].szId).hide(), T(), v.EventCallback.windowEventSelect(0) }
return M(i, [{ key: "JS_ArrangeWindow", value: function (t) {
if (t < v[p].iMaxSplit ? v[p].iCurrentSplit = t : v[p].iCurrentSplit = v[p].iMaxSplit, R.oTool.isFirefox()) 
for (var e = 0;
e < v[p].iMaxSplit * v[p].iMaxSplit;
e++)
v[f][e].oPlayCtrl && v[f][e].oPlayCtrl.PlayM4_ClearCanvas();
k(), v.EventCallback.windowEventSelect(0) } }, { key: "JS_SetSecretKey", value: function (t, e) {
return t < 0 ? -1 : "" === e || void 0 === e ? -1 : (this[f][t].szSecretKey = e, 0) } }, { key: "JS_Play", value: function (i, r, o, a, s) {
return new Promise(function (e, n) { o < 0 || o > v[y] - 1 ? n() : v[f][o].bFrameForward ? n() : (v[f][o].bPlay && v.JS_Stop(o), v[f][o].bFirstFrame = !1, v[f][o].iDecodeType = 0, v[f][o].oPlayCtrl ? D(i, r, o, a, s, e, n) : v[f][o].oPlayCtrl = new z.JSPlayCtrl(v[p].szBasePath + "/playctrl/", function (t) { "loaded" !== t.cmd || v[f][o].bLoad ? "OnebyOne" === t.cmd ? t.status ? v[f][o].bPause && (u.resume(v[f][o].szStreamUUID), v[f][o].bPause = !1) : v[f][o].bPause || (u.pause(v[f][o].szStreamUUID), v[f][o].bPause = !0) : "GetFrameData" === t.cmd && v.EventCallback.pluginErrorHandler(o, 2001) : D(i, r, o, a, s, e, n) }, o)) }) } }, { key: "JS_Seek", value: function (n, i, r) {
return new Promise(function (t, e) { n < 0 || n > v[y] - 1 ? e() : v[f][n].bPlay ? u.seek(v[f][n].szStreamUUID, i, r).then(function () { t() }, function (t) { e(t) }) : e() }) } }, { key: "JS_GetSdkVersion", value: function () {
return v[f][0].oPlayCtrl.PlayM4_GetSdkVersion() } }, { key: "JS_DestroyWorker", value: function () { v[f].forEach(function (t) { t.bPlay && t.oPlayCtrl.PlayM4_CloseStream(), t.oPlayCtrl && (t.oPlayCtrl.PlayM4_Destroy(), t.oPlayCtrl = null, t.bLoad = !1) }) } }, { key: "JS_Stop", value: function (n) {
return new Promise(function (t, e) { n < 0 || n > v[y] - 1 ? e() : (v[f][n].szStorageUUID && v.JS_StopSave(n), v[f][n].bEZoom && v.JS_DisableZoom(n), v[s] === n && (v[s] = -1), u.stop(v[f][n].szStreamUUID).then(function () { v[f][n].bPlay = !1, v[f][n].bFrameForward = !1, v[f][n].iRate = 1, v[f][n].oPlayCtrl && (v[f][n].oPlayCtrl.PlayM4_Stop(), v[f][n].oPlayCtrl.PlayM4_CloseStream()), setTimeout(function () { t() }, 500) }, function () { setTimeout(function () { e() }, 500) })) }) } }, { key: "JS_Pause", value: function (n) {
return new Promise(function (t, e) { n < 0 || n > v[y] - 1 ? e() : v[f][n].bPlay ? v[f][n].bFrameForward ? e() : u.pause(v[f][n].szStreamUUID).then(function () { v[f][n].oPlayCtrl.PlayM4_Pause(!0), v[f][n].bPause = !0, t() }, function (t) { e(t) }) : e() }) } }, { key: "JS_Resume", value: function (n) {
return new Promise(function (t, e) { n < 0 || n > v[y] - 1 ? e() : v[f][n].bPlay ? u.resume(v[f][n].szStreamUUID).then(function () { 1 !== v[r] && (v[f][n].iRate = v[r], u.setPlayRate(v[f][n].szStreamUUID, v[f][n].iRate), v[f][n].oPlayCtrl.PlayM4_PlayRate(v[f][n].iRate), 1 < v[r] ? v[f][n].oPlayCtrl.PlayM4_SetDecodeFrameType(1) : v[f][n].oPlayCtrl.PlayM4_SetDecodeFrameType(0)), v[f][n].bFrameForward ? (v[f][n].oPlayCtrl.PlayM4_Play(v[f][n].windowID), v[f][n].bFrameForward = !1) : v[f][n].oPlayCtrl.PlayM4_Pause(!1), v[f][n].bPause = !1, t() }, function (t) { e(t) }) : e() }) } }, { key: "JS_Slow", value: function (n) {
return new Promise(function (t, e) { n < 0 || n > v[y] - 1 ? e() : v[f][n].bPlay && "playback" === v[f][n].szPlayType && -8 !== v[f][n].iRate ? v[f][n].bFrameForward ? e() : (v[f][n].iRate < 0 && -8 < v[f][n].iRate && (v[f][n].iRate *= 2), 1 === v[f][n].iRate && (v[f][n].iRate *= -2), 1 < v[f][n].iRate && (v[f][n].iRate /= 2), u.setPlayRate(v[f][n].szStreamUUID, v[f][n].iRate).then(function () { v[f][n].iRate < 2 ? v[f][n].oPlayCtrl.PlayM4_SetDecodeFrameType(0) : (v[f][n].oPlayCtrl.PlayM4_SetDecodeFrameType(1), v[f][n].oPlayCtrl.PlayM4_SetIFrameDecInterval(0)), v[f][n].oPlayCtrl.PlayM4_PlayRate(v[f][n].iRate), t() }, function (t) { e(t) })) : e() }) } }, { key: "JS_Fast", value: function (n) {
return new Promise(function (t, e) { n < 0 || n > v[y] - 1 ? e() : v[f][n].bPlay && "playback" === v[f][n].szPlayType ? v[f][n].bFrameForward ? e() : 8 !== v[f][n].iRate ? (-2 === v[f][n].iRate ? v[f][n].iRate = 1 : v[f][n].iRate < -2 ? v[f][n].iRate /= 2 : 0 < v[f][n].iRate && v[f][n].iRate < 8 && (v[f][n].iRate *= 2), u.setPlayRate(v[f][n].szStreamUUID, v[f][n].iRate).then(function () { v[f][n].iRate < 2 ? v[f][n].oPlayCtrl.PlayM4_SetDecodeFrameType(0) : (v[f][n].oPlayCtrl.PlayM4_SetDecodeFrameType(1), 8 === v[f][n].iRate ? v[f][n].oPlayCtrl.PlayM4_SetIFrameDecInterval(2) : v[f][n].oPlayCtrl.PlayM4_SetIFrameDecInterval(0)), v[f][n].oPlayCtrl.PlayM4_PlayRate(v[f][n].iRate), t() }, function (t) { e(t) })) : e() : e() }) } }, { key: "JS_Transmission", value: function (t, i) {
return new Promise(function (e, n) { t < 0 || t > v[y] - 1 ? n() : v[f][t].szStreamUUID ? u.transmission(v[f][t].szStreamUUID, i).then(function (t) { e(t) }, function (t) { n(t) }) : n() }) } }, { key: "JS_FrameForward", value: function (n) {
return new Promise(function (t, e) { n < 0 || n > v[y] - 1 ? e() : v[f][n].bPlay ? (1 !== v[f][n].iRate ? (v[f][n].iRate = 1, v[r] = v[f][n].iRate, u.setPlayRate(v[f][n].szStreamUUID, v[f][n].iRate).then(function () { v[f][n].oPlayCtrl.PlayM4_PlayRate(v[f][n].iRate), v[f][n].oPlayCtrl.PlayM4_SetDecodeFrameType(0), v[f][n].oPlayCtrl.PlayM4_OneByOne(), v[f][n].bFrameForward = !0 }, function (t) { e(t) })) : (v[f][n].oPlayCtrl.PlayM4_PlayRate(v[f][n].iRate), v[f][n].oPlayCtrl.PlayM4_SetDecodeFrameType(0), v[f][n].oPlayCtrl.PlayM4_OneByOne(), v[f][n].bFrameForward = !0), t()) : e() }) } }, { key: "JS_GetOSDTime", value: function (e) {
return new Promise(function (n, t) { e < 0 || e > v[y] - 1 ? t(o) : v[f][e].bPlay && 0 === v[f][e].oPlayCtrl.PlayM4_GetOSDTime(function (t) {
var e = Date.parse(t.replace(/-/g, " ")) / 1e3;
n(e) }) || t(o) }) } }, { key: "JS_OpenSound", value: function (t) {
return t < 0 || t > v[y] - 1 ? o : v[f][t].bPlay ? v[s] === t ? o : (-1 !== v[s] && v[f][v[s]].oPlayCtrl.PlayM4_StopSound(), 0 !== v[f][t].oPlayCtrl.PlayM4_PlaySound(t) ? o : (v[s] = t, 0)) : o } }, { key: "JS_GetVolume", value: function (t, e) { v[f][t].oPlayCtrl.PlayM4_GetVolume(function (t) { e(t) }) } }, { key: "JS_SetVolume", value: function (t, e) {
return 0 !== v[f][t].oPlayCtrl.PlayM4_SetVolume(e) ? o : 0 } }, { key: "JS_CloseSound", value: function () {
var t = v[s];
return t < 0 || t > v[y] - 1 ? o : v[f][t].bPlay ? 0 !== v[f][t].oPlayCtrl.PlayM4_StopSound() ? o : (v[s] = -1, 0) : o } }, { key: "JS_EnableZoom", value: function (e) {
return e < 0 || e > v[y] - 1 ? o : v[f][e].bPlay ? ((0, F.default)(".draw-window").unbind(), this[g] = new A.ESCanvas("canvas_draw" + e), this[g].setShapeType("Rect"), this[g].setDrawStyle("#ff0000", "", 0), this[g].setDrawStatus(!0, function (t) { t.startPos && t.endPos && (t.startPos[0] > t.endPos[0] ? v[f][e].oPlayCtrl.PlayM4_SetDisplayRegion(null, !1) : v[f][e].oPlayCtrl.PlayM4_SetDisplayRegion({ left: t.startPos[0], top: t.startPos[1], right: t.endPos[0], bottom: t.endPos[1] }, !0)) }), v[f][e].bEZoom = !0, 0) : o } }, { key: "JS_DisableZoom", value: function (t) {
return t < 0 || t > v[y] - 1 ? o : v[f][t].bPlay ? (this[g].setDrawStatus(!1), 0 !== this[f][t].oPlayCtrl.PlayM4_SetDisplayRegion(null, !1) ? o : (this[f][t].bEZoom = !1, 0)) : o } }, { key: "JS_Enable3DZoom", value: function (t, e) {
return t < 0 || t > v[y] - 1 ? o : v[f][t].bPlay ? ((0, F.default)(".draw-window").unbind(), this[C] = e, this[g] = new A.ESCanvas("canvas_draw" + t), this[g].setShapeType("Rect"), this[g].setDrawStyle("#ff0000", "", 0), this[g].setDrawStatus(!0, function (t) { e(t) }), v[f][t].b3DZoom = !0, 0) : o } }, { key: "JS_Disable3DZoom", value: function (t) {
return t < 0 || t > v[y] - 1 ? o : v[f][t].bPlay ? (this[g].setDrawStatus(!1), this[f][t].b3DZoom = !1, 0) : o } }, { key: "JS_CapturePictureData", value: function (t) {
return new Promise(function (e, n) { t < 0 || t > v[y] - 1 ? n() : v[f][t].bPlay ? v[f][t].oPlayCtrl.PlayM4_GetBMP(function (t) { 6 === t ? n(a) : e(t) }) : n() }) } }, { key: "JS_CapturePicture", value: function (t, i, r) {
return new Promise(function (e, n) { t < 0 || t > v[y] - 1 ? n() : v[f][t].bPlay ? (r || (r = "JPEG"), "BMP" === r ? v[f][t].oPlayCtrl.PlayM4_GetBMP(function (t) { 6 === t ? n(a) : (R.oTool.downloadFile(t, i + ".BMP"), e()) }) : "JPEG" === r && v[f][t].oPlayCtrl.PlayM4_GetJPEG(function (t) { 6 === t ? n(a) : (R.oTool.downloadFile(t, i + ".jpeg"), e()) })) : n() }) } }, { key: "JS_StopRealPlayAll", value: function () { u.stopAll(), v[f].forEach(function (t, e) { t.bPlay && (t.szStorageUUID && v.JS_StopSave(e), t.bEZoom && v.JS_DisableZoom(e), t.oPlayCtrl.PlayM4_Stop(), t.oPlayCtrl.PlayM4_CloseStream()), t.bPlay = !1 }), v[s] = -1 } }, { key: "JS_StartSave", value: function (r, o) {
return new Promise(function (e, t) {
if (r < 0 || r > v[y] - 1) t();
else if (v[f][r].bPlay) { o.indexOf(".mp4") < 0 && (o += ".mp4");
var n = v[f][r].aHead, i = 0;
"playback" === v[f][r].szPlayType && (i = 1), c.startRecord(o, n, 2, i, { cbEventHandler: function (t) { v.EventCallback.pluginErrorHandler(r, t) } }).then(function (t) { v[f][r].szStorageUUID = t, e() }, function () { t() }) }
else
t() }) } }, { key: "JS_StopSave", value: function (n) {
return new Promise(function (t, e) { v[f][n].szStorageUUID ? c.stopRecord(v[f][n].szStorageUUID).then(function () { v[f][n].szStorageUUID = "", t() }, function (t) { e(t) }) : e() }) } }, { key: "JS_GetLocalConfig", value: function () {
return "" } }, { key: "JS_SetLocalConfig", value: function () {
return !0 } }, { key: "JS_SetGridInfo", value: function (t) {
if (null == t)
return -1;
var e = "#ff0000";
return t.style && t.style.drawColor && (e = t.style.drawColor), this[g].setDrawStyle(e), this[g].setShapesInfoByType("Grid", [{ szGridMap: t.gridMap, iGridColNum: t.gridColNum, iGridRowNum: t.gridRowNum }]), 0 } }, { key: "JS_GetGridInfo", value: function () {
if (!this[g])
return {};
var t = this[g].getShapesInfoByType("Grid")[0];
return t ? { gridColNum: t.iGridColNum, gridRowNum: t.iGridRowNum, gridMap: t.szGridMap } : { iGridRowNum: 18, iGridColNum: 22, szGridMap: "" } } }, { key: "JS_SetDrawShapeInfo", value: function (t, e) {
if (void 0 === t || "" === t)
return -1;
this[g].setShapeType(t), e.style && this[g].setDrawStyle(e.style.szDrawColor || "", e.style.szFillColor || "", e.style.iTranslucent || 0), e.iMaxShapeSupport && 0 < e.iMaxShapeSupport && this[g].setMaxShapeSupport(e.iMaxShapeSupport), this[g].setCurrentShapeInfo({ szId: e.id, szTips: e.tips, iMinClosed: 3, iMaxPointNum: e.iMaxPointSupport, iPolygonType: 1, szDrawColor: e.style.szDrawColor || "", szFillColor: e.style.szFillColor || "", iTranslucent: e.style.iTranslucent || 0 }) } }, { key: "JS_SetPolygonInfo", value: function (t) {
if (void 0 === t || !t.length)
return -1;
var e = [];
if (0 < t.length) 
for (var n = 0, i = t.length;
n < i;
n++) { 0 < t[n].aPoint.length && e.push(t[n]) }
return 0 < e.length ? (this[g].setShapesInfoByType("Polygon", e), 0) : -1 } }, { key: "JS_GetPolygonInfo", value: function () { 
for (var t = [], e = this[g].getShapesInfoByType("Polygon"), n = 0, i = e.length;
n < i;
n++) {
var r = e[n], o = { aPoint: r.aPoint, bClosed: r.bClosed, szTips: r.szTips, id: r.szId, szDrawColor: r.szDrawColor };
t.push(o) }
return t } }, { key: "JS_SetLineInfo", value: function (t) {
if (void 0 === t || !t.length)
return -1;
var e = [];
if (0 < t.length) 
for (var n = 0, i = t.length;
n < i;
n++) { 0 < t[n].aPoint.length && e.push(t[n]) }
return 0 < e.length ? (this[g].setShapesInfoByType("Line", e), 0) : -1 } }, { key: "JS_GetLineInfo", value: function () { 
for (var t = [], e = this[g].getShapesInfoByType("Line"), n = 0, i = e.length;
n < i;
n++) {
var r = e[n], o = { iLineType: r.iLineType, aPoint: r.aPoint, szTips: r.szTips };
t.push(o) }
return t } }, { key: "JS_SetRectInfo", value: function (t) {
if (void 0 === t || !t.length)
return -1;
var e = [];
if (0 < t.length) 
for (var n = 0, i = t.length;
n < i;
n++) { 0 < t[n].aPoint.length && e.push(t[n]) }
return 0 < e.length ? (this[g].setShapesInfoByType("Rect", e), 0) : -1 } }, { key: "JS_GetRectInfo", value: function () { 
for (var t = [], e = this[g].getShapesInfoByType("Rect"), n = 0, i = e.length;
n < i;
n++) {
var r = e[n], o = { aPoint: r.aPoint, szTips: r.szTips };
t.push(o) }
return t } }, { key: "JS_SetRegionInfo", value: function (t) {
var e = this;
this[g].clearAllShape();
var n = R.oTool.parseXmlFromStr(t);
if (this[g].setDrawStyle("#ff0000", "#343434", .3), 0 < (0, F.default)(n).find("DetectionRegionInfo").length) !function () { e[g].setShapeType("Rect");
var t = parseInt((0, F.default)(n).find("MaxRegionNum").eq(0).text(), 10);
e[g].setMaxShapeSupport(t), e[g].m_szDisplayMode = (0, F.default)(n).find("DisplayMode").eq(0).text(), e[g].m_szVideoFormat = (0, F.default)(n).find("videoFormat").eq(0).text(), e[g].m_iHorizontalResolution = parseInt((0, F.default)(n).find("HorizontalResolution").eq(0).text(), 10), e[g].m_iVerticalResolution = parseInt((0, F.default)(n).find("VerticalResolution").eq(0).text(), 10);
var o = [];
(0, F.default)(n).find("DetectionRegion").each(function () { 
for (var t = [], e = 0, n = (0, F.default)(this).find("positionX").length;
e < n;
e++) {
var i = Math.round((0, F.default)(this).find("positionX").eq(e).text()) * v[g].m_iCanvasWidth / v[g].m_iHorizontalResolution, r = (v[g].m_iVerticalResolution - Math.round((0, F.default)(this).find("positionY").eq(e).text())) * v[g].m_iCanvasHeight / v[g].m_iVerticalResolution;
t.push([i, r]) } 0 < t.length && (0 !== t[0][0] || 0 !== t[1][0] || 0 !== t[2][0] || 0 !== t[3][0]) && o.push({ aPoint: t, iEditType: "transparent" === v[g].m_szDisplayMode ? 1 : 0 }) }), e[g].setShapesInfoByType("Rect", o) }();
else if (0 < (0, F.default)(n).find("MoveDetection").length) { this[g].setShapeType("Grid");
var i = parseInt((0, F.default)(n).find("columnGranularity").eq(0).text(), 10), r = parseInt((0, F.default)(n).find("rowGranularity").eq(0).text(), 10), o = (0, F.default)(n).find("gridMap").eq(0).text();
this[g].setShapesInfoByType("Grid", [{ szGridMap: o, iGridColNum: i, iGridRowNum: r }]) }
return 0 } }, { key: "JS_GetRegionInfo", value: function () {
if (!this[g])
return "";
var t = this[g].getShapeType(), e = '<?xml version="1.0" encoding="utf-8"?>';
if ("Rect" === t) { e += "<DetectionRegionInfo>", e += "<videoFormat>" + this[g].m_szVideoFormat + "</videoFormat><RegionType>roi</RegionType>", e += "<ROI><HorizontalResolution>" + this[g].m_iHorizontalResolution + "</HorizontalResolution><VerticalResolution>" + this[g].m_iVerticalResolution + "</VerticalResolution></ROI>", e += "<DisplayMode>" + this[g].m_szDisplayMode + "</DisplayMode><MaxRegionNum>" + this[g].getMaxShapeSupport() + "</MaxRegionNum>", e += "<DetectionRegionList>";

for (var n = this[g].getShapesInfoByType("Rect"), i = 0, r = n.length;
i < r;
i++) {
var o = n[i].aPoint;
e += "<DetectionRegion><RegionCoordinatesList>", e += "<RegionCoordinates><positionX>" + Math.round(o[3][0] * this[g].m_iHorizontalResolution / this[g].m_iCanvasWidth) + "</positionX><positionY>" + (this[g].m_iVerticalResolution - Math.round(o[3][1] * this[g].m_iVerticalResolution / this[g].m_iCanvasHeight)) + "</positionY></RegionCoordinates>", e += "<RegionCoordinates><positionX>" + Math.round(o[2][0] * this[g].m_iHorizontalResolution / this[g].m_iCanvasWidth) + "</positionX><positionY>" + (this[g].m_iVerticalResolution - Math.round(o[2][1] * this[g].m_iVerticalResolution / this[g].m_iCanvasHeight)) + "</positionY></RegionCoordinates>", e += "<RegionCoordinates><positionX>" + Math.round(o[1][0] * this[g].m_iHorizontalResolution / this[g].m_iCanvasWidth) + "</positionX><positionY>" + (this[g].m_iVerticalResolution - Math.round(o[1][1] * this[g].m_iVerticalResolution / this[g].m_iCanvasHeight)) + "</positionY></RegionCoordinates>", e += "<RegionCoordinates><positionX>" + Math.round(o[0][0] * this[g].m_iHorizontalResolution / this[g].m_iCanvasWidth) + "</positionX><positionY>" + (this[g].m_iVerticalResolution - Math.round(o[0][1] * this[g].m_iVerticalResolution / this[g].m_iCanvasHeight)) + "</positionY></RegionCoordinates>", e += "</RegionCoordinatesList></DetectionRegion>" } e += "</DetectionRegionList>", e += "</DetectionRegionInfo>" }
else if ("Grid" === t) {
var a = this[g].getShapesInfoByType("Grid")[0];
a || (a = { iGridRowNum: 18, iGridColNum: 22, szGridMap: "" }), e += "<MoveDetection><videoFormat>PAL</videoFormat><RegionType>grid</RegionType>", e += "<Grid><rowGranularity>" + a.iGridRowNum + "</rowGranularity><columnGranularity>" + a.iGridColNum + "</columnGranularity></Grid>", e += "<DisplayMode>transparent</DisplayMode>", e += "<gridMap>" + a.szGridMap + "</gridMap></MoveDetection>" }
return e } }, { key: "JS_SetDrawStatus", value: function (t) {
return this[g] ? (this[g].setDrawStatus(t), 0) : -1 } }, { key: "JS_ClearRegion", value: function () {
return this[g] ? (this[g].clearAllShape(), 0) : -1 } }, { key: "JS_GetTextOverlay", value: function () {
if (!this[g])
return "";
var t = '<?xml version="1.0" encoding="utf-8"?>';
t += "<OSD>", t += "<videoResolutionWidth>" + this[g].m_iHorizontalResolution + "</videoResolutionWidth>", t += "<videoResolutionHeight>" + this[g].m_iVerticalResolution + "</videoResolutionHeight>";

for (var e = "", n = "", i = "", r = this[g].getShapesInfoByType("RectOSD"), o = 0, a = r.length;
o < a;
o++) {
var s = r[o], l = Math.round(s.iPositionX * this[g].m_iHorizontalResolution / this[g].m_iCanvasWidth), u = Math.round(s.iPositionY * this[g].m_iVerticalResolution / this[g].m_iCanvasHeight);
"overlay-date" === s.szOSDType ? (e += "<DateTimeOverlay><Type>" + s.szDateStyle + "</Type>", e += "<clockType>" + s.szClockType + "</clockType>", e += "<displayWeek>" + s.szDisplayWeek + "</displayWeek>", e += "<enabled>" + s.szEnabled + "</enabled>", e += "<positionX>" + l + "</positionX><positionY>" + u + "</positionY></DateTimeOverlay>") : "overlay-ch" === s.szOSDType ? (n += "<channelNameOverlay><enabled>" + s.szEnabled + "</enabled>", n += "<ChannelName>" + s.szText + "</ChannelName>", n += "<positionX>" + l + "</positionX><positionY>" + u + "</positionY></channelNameOverlay>") : "overlay-text" === s.szOSDType && (i += "<TextOverlay><id>" + s.szId + "</id><enabled>" + s.szEnabled + "</enabled>", i += "<displayText>" + s.szText + "</displayText>", i += "<positionX>" + l + "</positionX><positionY>" + u + "</positionY></TextOverlay>") }
return t += e, t += n, t += "<TextOverlayList>", t += i, t += "</TextOverlayList>", t += "</OSD>" } }, { key: "JS_SetTextOverlay", value: function (t) { this[g].setMaxShapeSupport(20);
var e = R.oTool.parseXmlFromStr(t);
if (this[g].clearShapeByType("RectOSD"), 0 < (0, F.default)(e).find("OSD").length) {
if (this[g].setDrawStyle("#ff0000", "#343434", .7), this[g].m_iHorizontalResolution = parseInt((0, F.default)(e).find("videoResolutionWidth").eq(0).text(), 10), this[g].m_iVerticalResolution = parseInt((0, F.default)(e).find("videoResolutionHeight").eq(0).text(), 10), 0 < (0, F.default)(e).find("channelNameOverlay").length) {
var n = (0, F.default)(e).find("channelNameOverlay").eq(0), i = (0, F.default)(n).find("ChannelName").eq(0).text(), r = (0, F.default)(n).find("enabled").eq(0).text(), o = Math.round((0, F.default)(n).find("positionX").eq(0).text()) * this[g].m_iCanvasWidth / this[g].m_iHorizontalResolution, a = Math.round((0, F.default)(n).find("positionY").eq(0).text()) * this[g].m_iCanvasHeight / this[g].m_iVerticalResolution;
this[g].addOSDShape(i, r, o, a, { szOSDType: "overlay-ch" }) }
if (0 < (0, F.default)(e).find("DateTimeOverlay").length) {
var s = (0, F.default)(e).find("DateTimeOverlay").eq(0), l = (0, F.default)(s).find("enabled").eq(0).text(), u = (0, F.default)(s).find("Type").eq(0).text() || (0, F.default)(s).find("type").eq(0).text(), c = (0, F.default)(s).find("displayWeek").eq(0).text(), f = (0, F.default)(s).find("clockType").eq(0).text(), h = "", d = "", p = new Date;
switch ("true" === c && (d = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][p.getDay()]), f = "24hour" === f ? "" : "AM/PM", u) { case "0": h = "YYYY-MM-DD " + d + " hh:mm:ss " + f;
break;
case "1": h = "MM-DD-YYYY " + d + " hh:mm:ss " + f;
break;
case "2": h = "CHR-YYYY-MM-DD " + d + " hh:mm:ss " + f;
break;
case "3": h = "CHR-MM-DD-YYYY " + d + " hh:mm:ss " + f;
break;
case "4": h = "DD-MM-YYYY " + d + " hh:mm:ss " + f;
break;
case "5": h = "CHR-DD-MM-YYYY " + d + " hh:mm:ss " + f }var y = Math.round((0, F.default)(s).find("positionX").eq(0).text()) * this[g].m_iCanvasWidth / this[g].m_iHorizontalResolution, m = Math.round((0, F.default)(s).find("positionY").eq(0).text()) * this[g].m_iCanvasHeight / this[g].m_iVerticalResolution;
this[g].addOSDShape(h, l, y, m, { szOSDType: "overlay-date", szDateStyle: u, szDisplayWeek: c, szClockType: f }) } 0 < (0, F.default)(e).find("TextOverlayList").length && (0, F.default)(e).find("TextOverlayList").eq(0).find("TextOverlay").each(function () {
var t = (0, F.default)(this).find("displayText").eq(0).text(), e = (0, F.default)(this).find("enabled").eq(0).text(), n = (0, F.default)(this).find("id").eq(0).text(), i = Math.round((0, F.default)(this).find("positionX").eq(0).text()) * v[g].m_iCanvasWidth / v[g].m_iHorizontalResolution, r = Math.round((0, F.default)(this).find("positionY").eq(0).text()) * v[g].m_iCanvasHeight / v[g].m_iVerticalResolution;
v[g].addOSDShape(t, e, i, r, { szOSDType: "overlay-text", szId: n }) }) }
return 0 } }, { key: "JS_ClearSnapInfo", value: function (t) {
return this[g] ? (0 === t ? this[g].clearShapeByType("Rect") : 1 === t ? this[g].clearShapeByType("Polygon") : 2 === t ? this[g].clearShapeByType("Line") : 3 === t ? (this[g].clearShapeByType("Rect"), this[g].clearShapeByType("Polygon")) : this[g].clearAllShape(), 0) : -1 } }, { key: "JS_ClearTargetPolygon", value: function (t) {
var e = R.oTool.parseXmlFromStr(t), n = this[g].getAllShapesInfo(), i = n.length;
if (0 < i) 
for (var r = 0;
r < i;
r++) {
var o = (0, F.default)(e).find("id").eq(0).text();
if ("Polygon" === n[r].szType && n[r].szId === o) { this[g].deleteShape(r);
break } } } }, { key: "JS_SetSnapPolygonInfo", value: function (t) { this[g].setShapeType("Polygon"), this[g].setMaxShapeSupport(20), this[g].setDrawStyle("#FFFF00", "#FFFF00", .1);
var c = R.oTool.parseXmlFromStr(t), e = this[g].getAllShapesInfo(), n = e.length;
if (0 < n) 
for (var i = 0;
i < n;
i++) {
var r = (0, F.default)(c).find("id").eq(0).text();
if ("Polygon" === e[i].szType && e[i].szId === r) { this[g].deleteShape(i);
break } }
var f = [];
return 0 < (0, F.default)(c).find("SnapPolygonList").length && (0, F.default)(c).find("SnapPolygonList").eq(0).find("SnapPolygon").each(function () {
var t = (0, F.default)(c).find("id").eq(0).text(), e = parseInt((0, F.default)(c).find("polygonType").eq(0).text() || "1", 10), n = (0, F.default)(c).find("Tips").eq(0).text() || (0, F.default)(c).find("tips").eq(0).text(), i = parseInt((0, F.default)(c).find("MinClosed").eq(0).text(), 10), r = parseInt((0, F.default)(c).find("PointNumMax").eq(0).text(), 10), o = parseInt((0, F.default)(c).find("EditType").eq(0).text(), 10) || 0, a = "true" === (0, F.default)(c).find("isClosed").eq(0).text(), s = "rgb(" + (0, F.default)(c).find("r").eq(0).text() + ", " + (0, F.default)(c).find("g").eq(0).text() + ", " + (0, F.default)(c).find("b").eq(0).text() + ")", l = s, u = [];
(0, F.default)(c).find("pointList").eq(0).find("point").each(function (t) { u[t] = [], u[t][0] = Math.round((0, F.default)(this).find("x").eq(0).text() * v[g].m_iCanvasWidth), u[t][1] = Math.round((0, F.default)(this).find("y").eq(0).text() * v[g].m_iCanvasHeight) }), 0 < u.length ? (f.push({ szId: t, iPolygonType: e, iMinClosed: i, iMaxPointNum: r, iEditType: o, aPoint: u, bClosed: a, szTips: n, szDrawColor: s, szFillColor: l, iTranslucent: .1 }), v[g].setDrawStatus(!1)) : (v[g].setCurrentShapeInfo({ szId: t, szTips: n, iMinClosed: i, iMaxPointNum: r, iPolygonType: e, szDrawColor: s, szFillColor: l, iTranslucent: .1 }), v[g].setDrawStatus(!0)) }), 0 < f.length && this[g].setShapesInfoByType("Polygon", f), 0 } }, { key: "JS_GetSnapPolygonInfo", value: function () { 
for (var t = "<?xml version='1.0' encoding='utf-8'?><SnapPolygonList>", e = this[g].getShapesInfoByType("Polygon"), n = 0, i = e.length;
n < i;
n++) {
var r = e[n];
t += "<SnapPolygon>", t += "<id>" + r.szId + "</id>", t += "<polygonType>" + r.iPolygonType + "</polygonType>", t += "<color>";
var o = r.szDrawColor.substring(4, r.szDrawColor.length - 1).split(",");
t += "<r>" + o[0] + "</r>", t += "<g>" + o[1] + "</g>", t += "<b>" + o[2] + "</b>", t += "</color>", t += "<tips>" + r.szTips + "</tips>", t += "<isClosed>" + r.bClosed + "</isClosed>";
var a = r.aPoint;
t += "<pointList>";

for (var s = 0, l = a.length;
s < l;
s++)
t += "<point><x>" + (a[s][0] / this[g].m_iCanvasWidth).toFixed(6) + "</x><y>" + (a[s][1] / this[g].m_iCanvasHeight).toFixed(6) + "</y></point>";
t += "</pointList>", t += "</SnapPolygon>" }
return t += "</SnapPolygonList>" } }, { key: "JS_SetSnapDrawMode", value: function () {
return this[g] ? (this[g].setDrawMutiShapeOneTime(!1), 0) : -1 } }, { key: "JS_SetSnapLineInfo", value: function (t) { this[g].setShapeType("Line"), this[g].setMaxShapeSupport(20), this[g].setDrawStyle("#FFFF00", "#FFFF00", .1);
var s = R.oTool.parseXmlFromStr(t), e = this[g].getAllShapesInfo(), n = e.length;
if (0 < n) 
for (var i = 0;
i < n;
i++) {
var r = (0, F.default)(s).find("id").eq(0).text();
if ("Line" === e[i].szType && e[i].szId === r) { this[g].deleteShape(i);
break } }
var l = [];
return 0 < (0, F.default)(s).find("SnapLineList").length && (0, F.default)(s).find("SnapLineList").eq(0).find("SnapLine").each(function () {
var t = (0, F.default)(s).find("id").eq(0).text(), e = parseInt((0, F.default)(s).find("LineTypeEx").eq(0).text(), 10), n = parseInt((0, F.default)(s).find("CustomType").text(), 10) || parseInt((0, F.default)(s).find("LineType").text(), 10), i = parseInt((0, F.default)(s).find("ArrowType").text(), 10) || 0, r = (0, F.default)(s).find("Tips").eq(0).text() || (0, F.default)(s).find("tips").eq(0).text(), o = "rgb(" + (0, F.default)(s).find("r").eq(0).text() + ", " + (0, F.default)(s).find("g").eq(0).text() + ", " + (0, F.default)(s).find("b").eq(0).text() + ")", a = [];
a[0] = [], a[1] = [], a[0][0] = Math.round((0, F.default)(s).find("StartPos").eq(0).find("x").eq(0).text() * v[g].m_iCanvasWidth), a[0][1] = Math.round((0, F.default)(s).find("StartPos").eq(0).find("y").eq(0).text() * v[g].m_iCanvasHeight), a[1][0] = Math.round((0, F.default)(s).find("EndPos").eq(0).find("x").eq(0).text() * v[g].m_iCanvasWidth), a[1][1] = Math.round((0, F.default)(s).find("EndPos").eq(0).find("y").eq(0).text() * v[g].m_iCanvasHeight), 0 < a.length && (l.push({ szId: t, iLineType: e, aPoint: a, szTips: r, iDirection: n, iArrowType: i, szDrawColor: o }), v[g].setDrawStatus(!1)) }), 0 < l.length && this[g].setShapesInfoByType("Line", l), 0 } }, { key: "JS_GetSnapLineInfo", value: function () { 
for (var t = "<?xml version='1.0' encoding='utf-8'?><SnapLineList>", e = this[g].getShapesInfoByType("Line"), n = 0, i = e.length;
n < i;
n++) { t += "<SnapLine>", t += "<id>" + e[n].szId + "</id>", t += "<LineTypeEx>" + e[n].iLineType + "</LineTypeEx>", t += "<CustomType>0</CustomType><MoveChange>0</MoveChange><ArrowType>" + e[n].iArrowType + "</ArrowType>", t += "<tips>" + e[n].szTips + "</tips>";
var r = e[n].aPoint;
t += "<StartPos><x>" + (r[0][0] / v[g].m_iCanvasWidth).toFixed(6) + "</x><y>" + (r[0][1] / v[g].m_iCanvasHeight).toFixed(6) + "</y></StartPos>", t += "<EndPos><x>" + (r[1][0] / v[g].m_iCanvasWidth).toFixed(6) + "</x><y>" + (r[1][1] / v[g].m_iCanvasHeight).toFixed(6) + "</y></EndPos>", t += "<LineSelected>false</LineSelected>", 0 < e[n].aCrossArrowPoint.length && (t += "<PDCArrow><Sp_x>" + (e[n].aCrossArrowPoint[0][0] / v[g].m_iCanvasWidth).toFixed(6) + "</Sp_x>", t += "<Sp_y>" + (e[n].aCrossArrowPoint[0][1] / v[g].m_iCanvasWidth).toFixed(6) + "</Sp_y>", t += "<Ep_x>" + (e[n].aCrossArrowPoint[1][0] / v[g].m_iCanvasWidth).toFixed(6) + "</Ep_x>", t += "<Ep_y>" + (e[n].aCrossArrowPoint[1][1] / v[g].m_iCanvasWidth).toFixed(6) + "</Ep_y></PDCArrow>"), t += "<PDCShowMark>false</PDCShowMark>", t += "<color><r>" + (e[n].szDrawColor.split(",")[0].split("(")[1] || "255") + "</r><g>" + (e[n].szDrawColor.split(",")[1] || "255") + "</g><b>" + (e[n].szDrawColor.split(",")[2].split(")")[0] || "0") + "</b></color>", t += "</SnapLine>" }
return t += "</SnapLineList>" } }, { key: "JS_FullScreenDisplay", value: function (t) {
if (t) { this[m] = t;
var e = (0, F.default)("#" + v[p].szId).get(0);
e.requestFullScreen ? e.requestFullScreen() : e.webkitRequestFullScreen ? e.webkitRequestFullScreen() : e.mozRequestFullScreen && e.mozRequestFullScreen() } } }, { key: "JS_FullScreenSingle", value: function (t) {
if (v[f][t].bPlay) {
var e = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || !1, n = d.find(".parent-wnd").eq(0).children().eq(t).children().eq(0).get(0);
if (e) {
if (d.find(".parent-wnd").eq(0).width() === (0, F.default)(window).width())
return;
document.exitFullscreen ? document.exitFullscreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.mozCancelFullScreen && document.mozCancelFullScreen() }
else
n.requestFullScreen ? n.requestFullScreen() : n.webkitRequestFullScreen ? n.webkitRequestFullScreen() : n.mozRequestFullScreen && n.mozRequestFullScreen(), v[S] = d.find(".parent-wnd").eq(0).children().eq(t).children().eq(0) } } }, { key: "JS_StartDownload", value: function (t, e, n, i) {
var r = t + "?playbackURI=" + (0, F.default)(R.oTool.parseXmlFromStr(i)).find("playbackURI").eq(0).text(), o = ".mp4";
0 < t.indexOf("picture/Streaming/tracks") && (r = t, o = ".jpg");
var a = r.indexOf("&name=") + 6, s = r.indexOf("&size=");
return n = r.substring(a, s), (0, F.default)("body").append('<a id="jsplugin_download_a" href="' + r + '" download=' + n + o + '><li id="jsplugin_download_li"></li></a>'), (0, F.default)("#jsplugin_download_li").trigger("click"), (0, F.default)("#jsplugin_download_a").remove(), 0 } }, { key: "JS_Resize", value: function (t, e) { try { d = (0, F.default)("#" + v[p].szId), 0 < e.indexOf("%") && (e = d.height() * e.replace("%", "") / 100), 0 < t.indexOf("%") && (t = d.width() * t.replace("%", "") / 100) } catch (t) { }
if (this[m] ? (t = (0, F.default)(window).width(), e = (0, F.default)(window).height(), (0, F.default)("#" + this[p].szId).css({ width: t, height: e }), this[m] = !1) : (0, F.default)("#" + this[p].szId).css({ width: t, height: e }), this[p].iWidth = t, this[p].iHeight = e, R.oTool.isFirefox()) 
for (var n = 0;
n < v[p].iMaxSplit * v[p].iMaxSplit;
n++)
v[f][n].oPlayCtrl && v[f][n].oPlayCtrl.PlayM4_ClearCanvas();
k(), v[S] && (t = (0, F.default)(window).width(), e = (0, F.default)(window).height(), v[S].css({ width: t, height: e }), v[S].find("canvas").attr("width", t - 2), v[S].find("canvas").attr("height", e - 2), v[S] = null), this[g].resizeCanvas(), this[g].canvasRedraw() } }, { key: "JS_WndCreate", value: function (t, e, n) { x(e, n), this[g].updateCanvas("canvas_draw0"), this[g].clearAllShape(), 0 === t ? (0, F.default)("#" + this[p].szId).hide() : (0, F.default)("#" + this[p].szId).show(), v.EventCallback.windowEventSelect(0) } }, { key: "JS_ExportDeviceConfig", value: function (t) {
return (0, F.default)("body").append('<a id="jsplugin_download_a" href="' + t + '"><li id="jsplugin_download_li"></li></a>'), (0, F.default)("#jsplugin_download_li").trigger("click"), (0, F.default)("#jsplugin_download_a").remove(), 0 } }, { key: "JS_OpenFileBrowser", value: function (t, e) {
var n = F.default.Deferred();
v[b] = null;
var i = "", r = window.document.createElement("input");
r.type = "file", "bmp" === e.toLowerCase() && (r.accept = "image/bmp"), 0 === t && r.setAttribute("webkitdirectory", ""), r.addEventListener("change", function () { 1 === t ? (v[b] = r.files[0], i = r.files[0].name) : 0 === t && (v[b] = r.files), n.resolve(i) });
var o = document.createEvent("MouseEvents");
return o.initEvent("click", !0, !0), r.dispatchEvent(o), n } }, { key: "JS_UploadFile", value: function (t, e, n, i) {
var r = 0, o = new XMLHttpRequest;
return o.onreadystatechange = function () { 4 === o.readyState && 200 !== o.status && (r = -1) }, o.open("put", t, !1), o.setRequestHeader("Content-Type", i), o.send(v[b]), r } }, { key: "JS_StartAsynUpload", value: function (t) {
var e = new XMLHttpRequest;
return e.onreadystatechange = function () { 4 === e.readyState && (v[w] = e.responseText) }, e.open("put", t, !0), e.send(v[b]), 0 } }, { key: "JS_StopAsynUpload", value: function () { v[b] = null, v[w] = "" } }, { key: "JS_GetUploadErrorInfo", value: function () {
return "string" == typeof v[w] && 0 < v[w].length ? v[w] : "" } }, { key: "JS_StartUpgradeEx", value: function (t, r) {
return new Promise(function (e, n) {
if (!t)
return n(), o;
if (!r)
return n(), o;
v[w] = 0;
var i = new XMLHttpRequest;
i.onreadystatechange = function () {
if (4 === i.readyState)
if (200 === i.status) v[w] = 100, e();
else
{ v[w] = 1;
var t = R.oTool.parseXmlFromStr(i.responseText);
"lowPrivilege" === (0, F.default)(t).find("subStatusCode").text() ? n(403) : n() } }, i.open("put", t, !0), i.send(v[b]), v[_] = r, setTimeout(function () { e() }, 3e3) }) } }, { key: "JS_UpgradeStatus", value: function () {
return 100 === v[w] ? 0 : v[w] } }, { key: "JS_UpgradeProgress", value: function () {
var t = 0, e = new XMLHttpRequest;
return e.onreadystatechange = function () { 4 === e.readyState && 200 === e.status && (t = parseInt((0, F.default)(R.oTool.parseXmlFromStr(e.responseText)).find("percent").text(), 10)) }, e.open("get", v[_], !1), e.send(null), 100 === v[w] ? 100 : t } }, { key: "JS_StopUpgrade", value: function () {
return v[b] = null, 0 } }, { key: "JS_ExportDeviceLog", value: function (t, e) {
var n = [], i = [];
n = n.concat((0, F.default)(t).find("searchMatchItem").toArray());

for (var r = 0;
r < n.length;
r++)
i[r] = [], i[r][0] = (0, F.default)(n[r]).find("logtime").text().replace("T", " ").replace("Z", ""), i[r][1] = (0, F.default)(n[r]).find("majortype").text(), i[r][2] = (0, F.default)(n[r]).find("minortype").text(), i[r][3] = (0, F.default)(n[r]).find("channelid").text(), i[r][4] = (0, F.default)(n[r]).find("userName").text(), i[r][5] = (0, F.default)(n[r]).find("remoteaddress").text();
var o = [];
function a(t) { o.push(t);
var e = t.slice("");
if (/^[\u4e00-\u9fa5]/.test(t)) 
for (var n = 0;
n < 30 - 2 * e.length;
n++)
o.push(" ");
else

for (var i = 0;
i < 30 - e.length;
i++)
o.push(" ") } a(" "), a((0, F.default)(t).find("laLogTime").text()), a((0, F.default)(t).find("laLogMajorType").text()), a((0, F.default)(t).find("laLogMinorType").text()), a((0, F.default)(t).find("laLogChannel").text()), a((0, F.default)(t).find("laLogRemoteUser").text()), a((0, F.default)(t).find("laLogRemoteIP").text()), o.push("\r\n");

for (var s = 0;
s < i.length;
s++) { a((s + 1).toString());

for (var l = 0;
l < 6;
l++)
a(i[s][l]);
o.push("\r\n") } o = o.join("");
var u = new Blob([o], { type: "text/plain" }), c = (window.URL || window.webkitURL).createObjectURL(u), f = window.document.createElement("a");
f.href = c, f.download = "Log.txt";
var h = document.createEvent("MouseEvents");
h.initEvent("click", !0, !0), f.dispatchEvent(h) } }, { key: "JS_GetWndContainer", value: function (t) {
return t < 0 || null == t ? -1 : d.find(".parent-wnd").eq(0).children().eq(t)[0] } }, { key: "JS_GetWndStatus", value: function (t) {
return t < 0 || null == t ? -1 : { bPlay: this[f][t].bPlay, bSound: this[s] === t, bSelect: this[f][t].bSelect, iRate: this[f][t].iRate } } }, { key: "JS_SelectWnd", value: function (t) { d.find(".parent-wnd").eq(0).children().eq(t).mousedown() } }]), i }() } function x(t, e) { t && e && (v[p].iWidth = t, v[p].iHeight = e), d = (0, F.default)("#" + v[p].szId), t = v[p].iWidth, e = v[p].iHeight;
try { 0 < v[p].iHeight.indexOf("%") && (e = d.height() * v[p].iHeight.replace("%", "") / 100), 0 < v[p].iWidth.indexOf("%") && (t = d.width() * v[p].iWidth.replace("%", "") / 100) } catch (t) { } 
for (var n = t % v[p].iCurrentSplit, i = e % v[p].iCurrentSplit, r = (t - n - 2 * v[p].iCurrentSplit) / v[p].iCurrentSplit, o = (e - i - 2 * v[p].iCurrentSplit) / v[p].iCurrentSplit, a = (t - n) / v[p].iCurrentSplit, s = (e - i) / v[p].iCurrentSplit, l = v[p].iCurrentSplit, u = '<div class="parent-wnd" style="overflow:hidden;width:100%; height:100%; position: relative;">', c = 0;
c < v[y];
c++) { t = r + (c % l == l - 1 ? n : 0), e = o + (c + l >= Math.pow(l, 2) ? i : 0);
var f = a + (c % l == l - 1 ? n : 0), h = s + (c + l >= Math.pow(l, 2) ? i : 0);
u += '<div style="float:left; background-color: ' + v[p].oStyle.background + "; position: relative; width: " + f + "px; height: " + h + 'px;"><canvas id="canvas' + c + '" class="play-window" style="border:1px solid ' + v[p].oStyle.border + ';" wid="' + c + '" width="' + t + '" height="' + e + '"></canvas><canvas id="canvas_draw' + c + '"  class="draw-window" style="position:absolute; top:0; left:0;" wid="' + c + '" width=' + f + " height=" + h + "></canvas></div>" } u += "</div>", d.html(u), d.find(".parent-wnd").eq(0).children().eq(0).find(".play-window").eq(0).css("border", "1px solid " + v[p].oStyle.borderSelect) } function T() { v.EventCallback = { loadEventHandler: function () { window.loadEventHandler && window.loadEventHandler() }, zoomEventResponse: function () { }, windowEventSelect: function (e) { v[P] !== e && (v[P] = e, (v[f][e].bEZoom || v[f][e].b3DZoom) && ((0, F.default)(".draw-window").unbind(), v[g].setDrawStatus(!1), v[g] = null, v[g] = new A.ESCanvas("canvas_draw" + e), v[g].setShapeType("Rect"), v[g].setDrawStyle("#ff0000", "", 0), v[f][e].bEZoom ? v[g].setDrawStatus(!0, function (t) { t.startPos && t.endPos && (t.startPos[0] > t.endPos[0] ? v[f][e].oPlayCtrl.PlayM4_SetDisplayRegion(null, !1) : v[f][e].oPlayCtrl.PlayM4_SetDisplayRegion({ left: t.startPos[0], top: t.startPos[1], right: t.endPos[0], bottom: t.endPos[1] }, !0)) }) : v[f][e].b3DZoom && v[g].setDrawStatus(!0, function (t) { v[C](t) })), window.GetSelectWndInfo && window.GetSelectWndInfo(e)) }, pluginErrorHandler: function (t, e, n) { window.PluginEventHandler && window.PluginEventHandler(t, e, n) }, windowEventOver: function (t) { window.windowEventOver && window.windowEventOver(t) }, windowEventOut: function (t) { window.windowEventOut && window.windowEventOut(t) }, windowEventUp: function (t) { window.windowEventUp && window.windowEventUp(t) }, windowFullCcreenChange: function (t) { window.windowFullCcreenChange && window.windowFullCcreenChange(t) }, firstFrameDisplay: function (t) { window.firstFrameDisplay && window.firstFrameDisplay(t) }, performanceLack: function () { window.performanceLack && window.performanceLack() } }, d.find(".parent-wnd").eq(0).children().each(function (e) {
var n = this;
(0, F.default)(n).unbind().bind("mousedown", function () { d.find(".parent-wnd").eq(0).find(".play-window").css("border", "1px solid " + v[p].oStyle.border), d.find(".parent-wnd").eq(0).children().eq(e).find(".play-window").eq(0).css("border", "1px solid " + v[p].oStyle.borderSelect), v.EventCallback.windowEventSelect(parseInt(d.find(".parent-wnd").eq(0).children().eq(e).find(".play-window").eq(0).attr("wid"), 10)) }), (0, F.default)(n).bind("mouseover", function (t) { v.EventCallback.windowEventOver(e), t.stopPropagation() }), (0, F.default)(n).bind("mouseout", function (t) { v.EventCallback.windowEventOut(e), t.stopPropagation() }), (0, F.default)(n).bind("mouseup", function () { v.EventCallback.windowEventUp(e) }), (0, F.default)(n).bind("dblclick", function (t) {
if (v[f][v[P]].bPlay) { document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen, (0, F.default)(n).get(0);
t.stopPropagation() } }) }), void 0 !== document.fullScreen ? document.addEventListener("fullscreenchange", function () {
var t = document.fullscreen || !1;
v.EventCallback.windowFullCcreenChange(t) }) : void 0 !== document.webkitIsFullScreen ? document.addEventListener("webkitfullscreenchange", function () {
var t = document.webkitIsFullScreen || !1;
v.EventCallback.windowFullCcreenChange(t) }) : void 0 !== document.mozFullScreen && document.addEventListener("mozfullscreenchange", function () {
var t = document.mozFullScreen || !1;
v.EventCallback.windowFullCcreenChange(t) }) } function k() {
var t = d.find(".parent-wnd").eq(0).children().length, e = v[p].iHeight, n = v[p].iWidth;
try { d = (0, F.default)("#" + v[p].szId), 0 < e.indexOf("%") && (e = d.height() * e.replace("%", "") / 100), 0 < n.indexOf("%") && (n = d.width() * n.replace("%", "") / 100) } catch (t) { } 
for (var i = n % v[p].iCurrentSplit, r = e % v[p].iCurrentSplit, o = (n - i - 2 * v[p].iCurrentSplit) / v[p].iCurrentSplit, a = (e - r - 2 * v[p].iCurrentSplit) / v[p].iCurrentSplit, s = (n - i) / v[p].iCurrentSplit, l = (e - r) / v[p].iCurrentSplit, u = v[p].iCurrentSplit, c = 0;
c < t;
c++) { n = o + (c % u == u - 1 ? i : 0), e = a + (c + u >= Math.pow(u, 2) ? r : 0);
var f = s + (c % u == u - 1 ? i : 0), h = l + (c + u >= Math.pow(u, 2) ? r : 0);
d.find(".parent-wnd").eq(0).children().eq(c).width(f), d.find(".parent-wnd").eq(0).children().eq(c).height(h), d.find(".parent-wnd").eq(0).children().eq(c).find(".draw-window").attr("width", f), d.find(".parent-wnd").eq(0).children().eq(c).find(".draw-window").attr("height", h), d.find(".parent-wnd").eq(0).children().eq(c).find(".play-window").attr("width", n), d.find(".parent-wnd").eq(0).children().eq(c).find(".play-window").attr("height", e) } d.find(".parent-wnd").eq(v[P]).find(".play-window").css("border", "1px solid " + v[p].oStyle.border), d.find(".parent-wnd").eq(v[P]).children().eq(0).find(".play-window").eq(0).css("border", "1px solid " + v[p].oStyle.borderSelect) } function D(t, e, o, n, i, r, a) {
if ((0, F.default)("#" + v[f][o].windowID).length) {
var s = !1;
n && i && (s = !0), v[f][o].bLoad = !0, u.openStream(t, e, function (t) {
if (t.bHead && !v[f][o].bPlay) v[f][o].bPlay = !0, v[f][o].aHead = new Uint8Array(t.buf), v[f][o].oPlayCtrl.PlayM4_OpenStream(t.buf, 40, 2097152), "" !== v[f][o].szSecretKey && (v[f][o].oPlayCtrl.PlayM4_SetSecretKey(1, v[f][o].szSecretKey, 128), v[f][o].szSecretKey = ""), 4 === v[f][o].aHead[8] ? v[f][o].oPlayCtrl.PlayM4_SetStreamOpenMode(0) : v[f][o].oPlayCtrl.PlayM4_SetStreamOpenMode(1), v[f][o].oPlayCtrl.PlayM4_SetInputBufSize(l), v[f][o].oPlayCtrl.PlayM4_Play(v[f][o].windowID);
else
{
var e = new Uint8Array(t.buf), n = v[f][o].oPlayCtrl.PlayM4_GetInputBufSize(), i = v[f][o].oPlayCtrl.PlayM4_GetYUVBufSize();
2 !== i || v[f][o].bFirstFrame || (v[f][o].bFirstFrame = !0, v.EventCallback.firstFrameDisplay(o));
var r = v[f][o].oPlayCtrl.PlayM4_GetDecodeFrameType();
.5 * l < n && n < .8 * l && 1 === v[f][o].iRate ? 1 === r || v[f][o].bFrameForward || (v[f][o].oPlayCtrl.PlayM4_SetDecodeFrameType(1), v.EventCallback.performanceLack()) : .8 * l <= n && (e = new Uint8Array([1, 2, 3, 4])), 10 < i && i < 15 && !v[f][o].bFrameForward ? 1 !== r && (v[f][o].oPlayCtrl.PlayM4_SetDecodeFrameType(1), v.EventCallback.performanceLack()) : 15 < i && (e = new Uint8Array([1, 2, 3, 4])), i < 10 && n < .5 * l && 0 !== r && 1 === v[f][o].iRate && v[f][o].oPlayCtrl.PlayM4_SetDecodeFrameType(0), t.statusString ? v.EventCallback.pluginErrorHandler(o, 1001, t) : t.type && "exception" === t.type ? v.EventCallback.pluginErrorHandler(o, 1002, t) : v[f][o].oPlayCtrl.PlayM4_InputData(e, e.length), e = null } v[f][o].szStorageUUID && c.inputData(v[f][o].szStorageUUID, t.buf), t = null }, function () { v[f][o].bPlay && (v.EventCallback.pluginErrorHandler(o, 1003), v[f][o].bPlay = !1, v[f][o].bFrameForward = !1, v[f][o].iRate = 1, v[f][o].oPlayCtrl && (v[f][o].oPlayCtrl.PlayM4_Stop(), v[f][o].oPlayCtrl.PlayM4_CloseStream())) }).then(function (t) { v[f][o].szStreamUUID = t, u.startPlay(t, n, i).then(function () { s ? (v[f][o].szPlayType = "playback", v[f][o].iRate = 1, v[f][o].oPlayCtrl.PlayM4_PlayRate(v[f][o].iRate)) : v[f][o].szPlayType = "realplay", r() }, function (t) { a(t) }) }, function (t) { a(t) }) } } }();
e.JSPlugin = o }, function (t, e) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 });
var n = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }();
var i = function () { function t() { !function (t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t), this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }
return n(t, [{ key: "$", value: function (t) {
var e = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, n = /^(?:\s*(<[\w\W]+>)[^>]*|.([\w-]*))$/;
if (e.test(t)) {
var i = e.exec(t);
return document.getElementById(i[2]) }
if (n.test(t)) { 
for (var r = n.exec(t), o = document.getElementsByTagName("*"), a = [], s = 0, l = o.length;
s < l;
s++)
o[s].className.match(new RegExp("(\\s|^)" + r[2] + "(\\s|$)")) && a.push(o[s]);
return a } } }, { key: "dateFormat", value: function (t, e) {
var n = { "M+": t.getMonth() + 1, "d+": t.getDate(), "h+": t.getHours(), "m+": t.getMinutes(), "s+": t.getSeconds(), "q+": Math.floor((t.getMonth() + 3) / 3), S: t.getMilliseconds() };

for (var i in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length))), n) new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 === RegExp.$1.length ? n[i] : ("00" + n[i]).substr(("" + n[i]).length)));
return e } }, { key: "downloadFile", value: function (t, e) {
var n = t;
t instanceof Blob || t instanceof File || (n = new Blob([t]));
var i = window.URL.createObjectURL(n), r = window.document.createElement("a");
r.href = i, r.download = e;
var o = document.createEvent("MouseEvents");
o.initEvent("click", !0, !0), r.dispatchEvent(o) } }, { key: "createxmlDoc", value: function () { 
for (var e, t = ["MSXML2.DOMDocument", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "Microsoft.XmlDom"], n = 0, i = t.length;
n < i;
n++)
try { e = new ActiveXObject(t[n]);
break } catch (t) { e = document.implementation.createDocument("", "", null);
break }
return e.async = "false", e } }, { key: "parseXmlFromStr", value: function (t) {
if (null === t || "" === t)
return null;
var e = this.createxmlDoc();
"Netscape" === navigator.appName || "Opera" === navigator.appName ? e = (new DOMParser).parseFromString(t, "text/xml") : e.loadXML(t);
return e } }, { key: "encode", value: function (t) {
var e, n, i, r, o, a, s, l = "", u = 0;

for (t = this._utf8_encode(t);
u < t.length;)
r = (e = t.charCodeAt(u++)) >> 2, o = (3 & e) << 4 | (n = t.charCodeAt(u++)) >> 4, a = (15 & n) << 2 | (i = t.charCodeAt(u++)) >> 6, s = 63 & i, isNaN(n) ? a = s = 64 : isNaN(i) && (s = 64), l = l + this._keyStr.charAt(r) + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(s);
return l } }, { key: "decode", value: function (t) {
var e, n, i, r, o, a, s = "", l = 0;

for (t = t.replace(/[^A-Za-z0-9+/=]/g, "");
l < t.length;)
e = this._keyStr.indexOf(t.charAt(l++)) << 2 | (r = this._keyStr.indexOf(t.charAt(l++))) >> 4, n = (15 & r) << 4 | (o = this._keyStr.indexOf(t.charAt(l++))) >> 2, i = (3 & o) << 6 | (a = this._keyStr.indexOf(t.charAt(l++))), s += String.fromCharCode(e), 64 !== o && (s += String.fromCharCode(n)), 64 !== a && (s += String.fromCharCode(i));
return s = this._utf8_decode(s) } }, { key: "_utf8_encode", value: function (t) { t = t.replace(/\r\n/g, "\n");

for (var e = "", n = 0;
n < t.length;
n++) {
var i = t.charCodeAt(n);
i < 128 ? e += String.fromCharCode(i) : (127 < i && i < 2048 ? e += String.fromCharCode(i >> 6 | 192) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128)), e += String.fromCharCode(63 & i | 128)) }
return e } }, { key: "_utf8_decode", value: function (t) { 
for (var e = "", n = 0, i = 0, r = 0;
n < t.length;)
if ((i = t.charCodeAt(n)) < 128) e += String.fromCharCode(i), n++;
else if (191 < i && i < 224) r = t.charCodeAt(n + 1), e += String.fromCharCode((31 & i) << 6 | 63 & r), n += 2;
else
{ r = t.charCodeAt(n + 1);
var o = t.charCodeAt(n + 2);
e += String.fromCharCode((15 & i) << 12 | (63 & r) << 6 | 63 & o), n += 3 }
return e } }, { key: "isFirefox", value: function () {
var t = !1, e = navigator.userAgent.toLowerCase(), n = "";
return e.match(/firefox\/([\d.]+)/) && (n = e.match(/firefox\/([\d.]+)/)[1], -1 < parseInt(n.split(".")[0], 10) && (t = !0)), t } }]), t }();
e.oTool = new i }, function (t, e, n) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 }), e.StreamClient = void 0;
var i, r = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }(), o = n(3), a = (i = o) && i.__esModule ? i : { default: i }, s = n(8), l = n(9), c = n(10), f = n(13);
var u = function () {
if ("undefined" != typeof Symbol) {
var _ = Symbol("WEBSOCKET"), P = Symbol("GETINDEX"), C = Symbol("PROTOCOLVERSION"), x = Symbol("CIPHERSUITES"), u = new s.DirectDeviceCustom, T = new l.DirectDevice, k = new c.LiveMedia, D = new f.LocalService;
return function () { function t() { !function (t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t), this[C] = "0.1", this[x] = 0, this[_] = [], this.ERRORS = {}, this[P] = function (t) { 
for (var e = -1, n = 0, i = this[_].length;
n < i;
n++)
if (this[_][n].id === t) { e = n;
break }
return e } }
return r(t, [{ key: "openStream", value: function (t, d, p, n) {
var y = this, e = t.split(":"), i = e[0], m = e[1].split("//")[1], v = Math.floor(e[2].split("/")[0]), r = (d = d || {}).sessionID || d.session || "", g = Math.floor(e[2].split("/")[1] / 100), S = Math.floor(e[2].split("/")[1] % 100) - 1;
if (d.token) {
var o = d.token || d.session || "";
r = o, t = -1 < t.indexOf("?") ? (g = Math.floor(e[2].split("?")[0].split("/")[1] / 100), S = Math.floor(e[2].split("?")[0].split("/")[1] % 100) - 1, i + "://" + m + ":" + v + "/?" + e[2].split("?")[1] + ":" + e[3] + "&version=" + y[C] + "&cipherSuites=" + y[x] + "&token=" + o) : i + "://" + m + ":" + v + "/?version=" + y[C] + "&cipherSuites=" + y[x] + "&token=" + o }
else
t = -1 < t.indexOf("?") ? (g = Math.floor(e[2].split("?")[0].split("/")[1] / 100), S = Math.floor(e[2].split("?")[0].split("/")[1] % 100) - 1, i + "://" + m + ":" + v + "/?" + e[2].split("?")[1] + ":" + e[3] + "&version=" + y[C] + "&cipherSuites=" + y[x] + "&sessionID=" + r) : i + "://" + m + ":" + v + "/?version=" + y[C] + "&cipherSuites=" + y[x] + "&sessionID=" + r;
var b = new window.WebSocket(t);
b.binaryType = "arraybuffer";
var w = a.default.v4();
return 0 === g && (S = 0), new Promise(function (f, h) { b.onopen = function () { d.playURL || d.sessionID || d.token || d.deviceSerial || (y[_].push(u.createClientObject(b, w, g, S)), f(w)) }, b.onmessage = function (t) {
if ("string" == typeof t.data) {
var e = JSON.parse(t.data), n = y[P](w);
if (e && e.version && e.cipherSuite) {
if (y[C] = e.version, y[x] = parseInt(e.cipherSuite, 10), e && e.PKD && e.rand) y[_].push(k.createClientObject(b, w, e.PKD, e.rand, d));
else
{
var i = "live://" + m + ":" + v + "/" + g + "/" + S;
-1 === y[x] ? y[_].push(D.createClientObject(b, w, i, d)) : y[_].push(T.createClientObject(b, w, i)) }
return void f(w) }
if (e && e.sdp) {
var r = T.getMediaFromSdp(e.sdp);
p({ bHead: !0, buf: r }) }
if (e && e.cmd && "end" === e.cmd && p({ type: "exception", cmd: e.cmd }), e && e.statusString && ("ok" === e.statusString.toLowerCase() && y[_][n].resolve && y[_][n].resolve(e), "ok" !== e.statusString.toLowerCase())) {
var o = T.getError(e);
-1 < n ? y[_][n].reject && y[_][n].reject(o) : h(o) } }
else
{
var a = {}, s = new Uint8Array(t.data);
if (64 === s.byteLength || 40 === s.byteLength) { 
for (var l = -1, u = s.byteLength, c = 0;
c < u;
c++)
if (73 === s[c] && 77 === s[c + 1] && 75 === s[c + 2] && 72 === s[c + 3]) { l = c;
break }
if (-1 !== l) a = { bHead: !0, buf: s.slice(l, l + 40) };
else
a = { bHead: !1, buf: s } }
else
a = { bHead: !1, buf: s };
p(a), t = a = s = null } }, b.onclose = function () { 
for (var t = 0, e = y[_].length;
t < e;
t++)
if (y[_][t].id === w) { y[_][t].resolve(), y[_].splice(t, 1), setTimeout(function () { n() }, 200);
break } h() } }) } }, { key: "startPlay", value: function (t, i, r) {
var o = this, a = this[P](t);
return i && r && "0.1" === o[C] && (i = i.replace(/-/g, "").replace(/:/g, ""), r = r.replace(/-/g, "").replace(/:/g, "")), new Promise(function (t, e) {
if (-1 < a) { o[_][a].resolve = t, o[_][a].reject = e;
var n = null;
i && r ? "0.1" !== o[C] ? 0 === o[x] ? n = k.playbackCmd(o[_][a], i, r) : 1 === o[x] ? n = T.playbackCmd(i, r, o[_][a].playURL) : -1 === o[x] && (n = D.playbackCmd(o[_][a], i, r)) : n = u.playbackCmd(i, r, o[_][a].iCurChannel, o[_][a].iCurStream) : 0 === o[_][a].iCurChannel && "0.1" === o[C] ? n = u.zeroPlayCmd(o[_][a].iCurChannel, o[_][a].iCurStream) : "0.1" !== o[C] ? 0 === o[x] ? n = k.playCmd(o[_][a]) : 1 === o[x] ? n = T.playCmd(o[_][a].playURL) : -1 === o[x] && (n = D.playCmd(o[_][a])) : n = u.playCmd(o[_][a].iCurChannel, o[_][a].iCurStream), o[_][a].socket.send(n), "0.1" === o[C] && t() }
else
"0.1" === o[C] && e() }) } }, { key: "singleFrame", value: function () { } }, { key: "setPlayRate", value: function (a, s) {
var l = this;
return new Promise(function (t, e) { 
for (var n = 0, i = l[_].length;
n < i;
n++)
if (l[_][n].id === a) {
if ("0.1" === l[C]) {
var r = u.playRateCmd(s);
l[_][n].socket.send(r), t();
break } l[_][n].resolve = t, l[_][n].reject = e;
var o = T.playRateCmd(s);
l[_][n].socket.send(o) } }) } }, { key: "seek", value: function (o, a, s) {
var l = this;
return new Promise(function (t, e) { 
for (var n = 0, i = l[_].length;
n < i;
n++)
if (l[_][n].id === o) { l[_][n].resolve = t, l[_][n].reject = e;
var r = k.seekCmd(a, s);
l[_][n].socket.send(r) } }) } }, { key: "pause", value: function (a) {
var s = this;
return new Promise(function (t, e) { 
for (var n = 0, i = s[_].length;
n < i;
n++)
if (s[_][n].id === a) {
if ("0.1" === s[C]) {
var r = u.pauseCmd();
s[_][n].socket.send(r), t();
break } s[_][n].resolve = t, s[_][n].reject = e;
var o = T.pauseCmd();
s[_][n].socket.send(o) } }) } }, { key: "transmission", value: function (r, o) {
var a = this;
return new Promise(function (t, e) { 
for (var n = 0, i = a[_].length;
n < i;
n++)
a[_][n].id === r && (a[_][n].resolve = t, a[_][n].reject = e, a[_][n].socket.send(o)) }) } }, { key: "resume", value: function (a) {
var s = this;
return new Promise(function (t, e) { 
for (var n = 0, i = s[_].length;
n < i;
n++)
if (s[_][n].id === a) {
if ("0.1" === s[C]) {
var r = u.resumeCmd();
s[_][n].socket.send(r), t();
break } s[_][n].resolve = t, s[_][n].reject = e;
var o = T.resumeCmd();
s[_][n].socket.send(o) } }) } }, { key: "stop", value: function (o) {
var a = this;
return new Promise(function (t, e) {
if (o) { 
for (var n = -1, i = 0, r = a[_].length;
i < r;
i++)
if (a[_][i].id === o) { n = i, a[_][i].resolve = t, a[_][i].socket.close(1e3, "CLOSE");
break } -1 === n && e() }
else
e() }) } }, { key: "stopAll", value: function () { 
for (var t = 0, e = this[_].length;
t < e;
t++)
this[_][t].socket.close(1e3, "CLOSE") } }]), t }() } }();
e.StreamClient = u }, function (t, e, n) { "use strict";
var i = n(4), r = n(7), o = r;
o.v1 = i, o.v4 = r, t.exports = o }, function (t, e, n) { "use strict";
var i = n(5), d = n(6), r = i(), p = [1 | r[0], r[1], r[2], r[3], r[4], r[5]], y = 16383 & (r[6] << 8 | r[7]), m = 0, v = 0;
t.exports = function (t, e, n) {
var i = e && n || 0, r = e || [], o = void 0 !== (t = t || {}).clockseq ? t.clockseq : y, a = void 0 !== t.msecs ? t.msecs : (new Date).getTime(), s = void 0 !== t.nsecs ? t.nsecs : v + 1, l = a - m + (s - v) / 1e4;
if (l < 0 && void 0 === t.clockseq && (o = o + 1 & 16383), (l < 0 || m < a) && void 0 === t.nsecs && (s = 0), 1e4 <= s) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
m = a, y = o;
var u = (1e4 * (268435455 & (a += 122192928e5)) + (v = s)) % 4294967296;
r[i++] = u >>> 24 & 255, r[i++] = u >>> 16 & 255, r[i++] = u >>> 8 & 255, r[i++] = 255 & u;
var c = a / 4294967296 * 1e4 & 268435455;
r[i++] = c >>> 8 & 255, r[i++] = 255 & c, r[i++] = c >>> 24 & 15 | 16, r[i++] = c >>> 16 & 255, r[i++] = o >>> 8 | 128, r[i++] = 255 & o;

for (var f = t.node || p, h = 0;
h < 6;
++h)
r[i + h] = f[h];
return e || d(r) } }, function (o, t) { (function (t) { "use strict";
var e, n = t.crypto || t.msCrypto;
if (n && n.getRandomValues) {
var i = new Uint8Array(16);
e = function () {
return n.getRandomValues(i), i } }
if (!e) {
var r = new Array(16);
e = function () { 
for (var t, e = 0;
e < 16;
e++)0 == (3 & e) && (t = 4294967296 * Math.random()), r[e] = t >>> ((3 & e) << 3) & 255;
return r } } o.exports = e }).call(t, function () {
return this }()) }, function (t, e) { "use strict";

for (var r = [], n = 0;
n < 256;
++n)
r[n] = (n + 256).toString(16).substr(1);
t.exports = function (t, e) {
var n = e || 0, i = r;
return i[t[n++]] + i[t[n++]] + i[t[n++]] + i[t[n++]] + "-" + i[t[n++]] + i[t[n++]] + "-" + i[t[n++]] + i[t[n++]] + "-" + i[t[n++]] + i[t[n++]] + "-" + i[t[n++]] + i[t[n++]] + i[t[n++]] + i[t[n++]] + i[t[n++]] + i[t[n++]] } }, function (t, e, n) { "use strict";
var a = n(5), s = n(6);
t.exports = function (t, e, n) {
var i = e && n || 0;
"string" == typeof t && (e = "binary" == t ? new Array(16) : null, t = null);
var r = (t = t || {}).random || (t.rng || a)();
if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, e) 
for (var o = 0;
o < 16;
++o)
e[i + o] = r[o];
return e || s(r) } }, function (t, e) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 });
var n = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }();
var i = function () {
if ("undefined" != typeof Symbol)
return function () { function t() { !function (t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t) }
return n(t, [{ key: "createClientObject", value: function (t, e, n, i) {
return { socket: t, id: e, iCurChannel: n, iCurStream: i, resolve: null, reject: null } } }, { key: "zeroPlayCmd", value: function (t, e) {
return new Uint8Array([0, 0, 0, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t + 1, 0, 0, 0, e, 0, 0, 4, 0]) } }, { key: "playCmd", value: function (t, e) {
return new Uint8Array([0, 0, 0, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t, 0, 0, 0, e, 0, 0, 4, 0]) } }, { key: "playbackCmd", value: function (t, e, n, i) {
var r = t.split("T")[0], o = t.split("T")[1], a = "0" + parseInt(r.substring(0, 4), 10).toString(16), s = parseInt(r.substring(4, 6), 10), l = parseInt(r.substring(6), 10), u = parseInt(o.substring(0, 2), 10), c = parseInt(o.substring(2, 4), 10), f = parseInt(o.substring(4, 6), 10), h = e.split("T")[0], d = e.split("T")[1], p = "0" + parseInt(h.substring(0, 4), 10).toString(16), y = parseInt(h.substring(4, 6), 10), m = parseInt(d.substring(0, 2), 10), v = parseInt(d.substring(2, 4), 10), g = parseInt(d.substring(4, 6), 10), S = [0, 0, 0, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n, 0, 0, parseInt(a.substring(0, 2), 16), parseInt(a.substring(2, 4), 16), 0, 0, 0, s, 0, 0, 0, l, 0, 0, 0, u, 0, 0, 0, c, 0, 0, 0, f, 0, 0, parseInt(p.substring(0, 2), 16), parseInt(p.substring(2, 4), 16), 0, 0, 0, y, 0, 0, 0, l, 0, 0, 0, m, 0, 0, 0, v, 0, 0, 0, g, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 0, 0];
return new Uint8Array(S) } }, { key: "playRateCmd", value: function (t) { 
for (var e = (parseInt(t, 10) >>> 0).toString(16).toLocaleUpperCase().toString(16), n = e.length;
n < 8;
n++)
e = "0" + e;

for (var i = [0, 0, 0, 0], r = 0, o = e.length;
r < o;
r += 2)
i[Math.floor(r / 2)] = parseInt(e.substring(r, r + 2), 16);
var a = [0, 0, 0, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i[0], i[1], i[2], i[3]];
return new Uint8Array(a) } }, { key: "pauseCmd", value: function () {
return new Uint8Array([0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) } }, { key: "resumeCmd", value: function () {
return new Uint8Array([0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) } }]), t }() }();
e.DirectDeviceCustom = i }, function (t, e) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 });
var n = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }();
var i = function () {
if ("undefined" != typeof Symbol)
return function () { function t() { !function (t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t) }
return n(t, [{ key: "createClientObject", value: function (t, e, n) {
return { socket: t, id: e, playURL: n, resolve: null, reject: null } } }, { key: "getMediaFromSdp", value: function (t) { 
for (var e = t.indexOf("MEDIAINFO=") + 10, n = t.slice(e, e + 80), i = [], r = 0, o = n.length / 2;
r < o;
r++)
i[r] = parseInt(n.slice(2 * r, 2 * r + 2), 16);
return new Uint8Array(i) } }, { key: "playCmd", value: function (t) {
var e = { sequence: 0, cmd: "realplay", url: t };
return JSON.stringify(e) } }, { key: "playbackCmd", value: function (t, e, n) {
var i = { sequence: 0, cmd: "playback", url: n, startTime: t, endTime: e };
return JSON.stringify(i) } }, { key: "playRateCmd", value: function (t) {
var e = { sequence: 0, cmd: "speed", rate: t };
return JSON.stringify(e) } }, { key: "pauseCmd", value: function () {
return JSON.stringify({ sequence: 0, cmd: "pause" }) } }, { key: "resumeCmd", value: function () {
return JSON.stringify({ sequence: 0, cmd: "resume" }) } }, { key: "getError", value: function (t) {
var e = 3001;
return t && (6 === parseInt(t.statusCode, 10) && "streamLimit" === t.subStatusCode ? e = 3002 : 4 === parseInt(t.statusCode, 10) && "badAuthorization" === t.subStatusCode && (e = 3003)), { iErrorNum: e, oError: t } } }]), t }() }();
e.DirectDevice = i }, function (t, e, n) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 }), e.LiveMedia = void 0;
var i = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }(), r = o(n(11)), s = o(n(12));
function o(t) {
return t && t.__esModule ? t : { default: t } }
var a = function () {
if ("undefined" != typeof Symbol)
return function () { function t() { !function (t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t) }
return i(t, [{ key: "createClientObject", value: function (t, e, n, i, r) {
var o = s.default.AES.encrypt((new Date).getTime().toString(), s.default.enc.Hex.parse("1234567891234567123456789123456712345678912345671234567891234567"), { mode: s.default.mode.CBC, iv: s.default.enc.Hex.parse("12345678912345671234567891234567"), padding: s.default.pad.Pkcs7 }).ciphertext.toString();
o.length < 64 && (o += o);
var a = s.default.AES.encrypt((new Date).getTime().toString(), s.default.enc.Hex.parse("12345678912345671234567891234567"), { mode: s.default.mode.CBC, iv: s.default.enc.Hex.parse("12345678912345671234567891234567"), padding: s.default.pad.Pkcs7 }).ciphertext.toString();
return { socket: t, id: e, PKD: n, rand: i, playURL: r.playURL || "", auth: r.auth || "", token: r.token || "", key: o, iv: a, resolve: null, reject: null } } }, { key: "playCmd", value: function (t) {
var e = { sequence: 0, cmd: "realplay", url: t.playURL, key: r.default.encrypt(t.iv + ":" + t.key, t.PKD).cipher.split("?")[0], authorization: s.default.AES.encrypt(t.rand + ":" + t.auth, s.default.enc.Hex.parse(t.key), { mode: s.default.mode.CBC, iv: s.default.enc.Hex.parse(t.iv), padding: s.default.pad.Pkcs7 }).ciphertext.toString(), token: s.default.AES.encrypt(t.token, s.default.enc.Hex.parse(t.key), { mode: s.default.mode.CBC, iv: s.default.enc.Hex.parse(t.iv), padding: s.default.pad.Pkcs7 }).ciphertext.toString() };
return JSON.stringify(e) } }, { key: "playbackCmd", value: function (t, e, n) {
var i = { sequence: 0, cmd: "playback", url: t.playURL, key: r.default.encrypt(t.iv + ":" + t.key, t.PKD).cipher.split("?")[0], authorization: s.default.AES.encrypt(t.rand + ":" + t.auth, s.default.enc.Hex.parse(t.key), { mode: s.default.mode.CBC, iv: s.default.enc.Hex.parse(t.iv), padding: s.default.pad.Pkcs7 }).ciphertext.toString(), token: s.default.AES.encrypt(t.token, s.default.enc.Hex.parse(t.key), { mode: s.default.mode.CBC, iv: s.default.enc.Hex.parse(t.iv), padding: s.default.pad.Pkcs7 }).ciphertext.toString(), startTime: e, endTime: n };
return JSON.stringify(i) } }, { key: "seekCmd", value: function (t, e) {
var n = { sequence: 0, cmd: "seek", startTime: t, endTime: e };
return JSON.stringify(n) } }]), t }() }();
e.LiveMedia = a }, function (t, e) { "use strict";
var n, h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
return typeof t } : function (t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }, r = "Netscape", o = 40;
function y(t, e, n) { null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e)) } function m() {
return new y(null) } n = "Microsoft Internet Explorer" == r ? (y.prototype.am = function (t, e, n, i, r, o) {
var a = 32767 & e;

for (e >>= 15;
0 <= --o;) {
var s = 32767 & this[t], l = this[t++] >> 15, u = e * s + l * a;
r = ((s = a * s + ((32767 & u) << 15) + n[i] + (1073741823 & r)) >>> 30) + (u >>> 15) + e * l + (r >>> 30), n[i++] = 1073741823 & s }
return r }, 30) : "Netscape" != r ? (y.prototype.am = function (t, e, n, i, r, o) { 
for (;
0 <= --o;) {
var a = e * this[t++] + n[i] + r;
r = Math.floor(a / 67108864), n[i++] = 67108863 & a }
return r }, 26) : (y.prototype.am = function (t, e, n, i, r, o) {
var a = 16383 & e;

for (e >>= 14;
0 <= --o;) {
var s = 16383 & this[t], l = this[t++] >> 14, u = e * s + l * a;
r = ((s = a * s + ((16383 & u) << 14) + n[i] + r) >> 28) + (u >> 14) + e * l, n[i++] = 268435455 & s }
return r }, 28), y.prototype.DB = n, y.prototype.DM = (1 << n) - 1, y.prototype.DV = 1 << n;
y.prototype.FV = Math.pow(2, 52), y.prototype.F1 = 52 - n, y.prototype.F2 = 2 * n - 52;
var a, s, l = "0123456789abcdefghijklmnopqrstuvwxyz", u = [];

for (a = "0".charCodeAt(0), s = 0;
s <= 9;
++s)
u[a++] = s;

for (a = "a".charCodeAt(0), s = 10;
s < 36;
++s)
u[a++] = s;

for (a = "A".charCodeAt(0), s = 10;
s < 36;
++s)
u[a++] = s;
function c(t) {
return l.charAt(t) } function f(t, e) {
var n = u[t.charCodeAt(e)];
return null == n ? -1 : n } function p(t) {
var e = m();
return e.fromInt(t), e } function g(t) {
var e, n = 1;
return 0 != (e = t >>> 16) && (t = e, n += 16), 0 != (e = t >> 8) && (t = e, n += 8), 0 != (e = t >> 4) && (t = e, n += 4), 0 != (e = t >> 2) && (t = e, n += 2), t >> 1 != 0 && (n += 1), n } function S(t) { this.m = t } function b(t) { this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t } function d(t, e) {
return t & e } function w(t, e) {
return t | e } function _(t, e) {
return t ^ e } function P(t, e) {
return t & ~e } function C(t) {
if (0 == t)
return -1;
var e = 0;
return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e } function x(t) { 
for (var e = 0;
0 != t;)
t &= t - 1, ++e;
return e } function T() { } function k(t) {
return t } function D(t) { this.r2 = m(), this.q3 = m(), y.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t } S.prototype.convert = function (t) {
return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t }, S.prototype.revert = function (t) {
return t }, S.prototype.reduce = function (t) { t.divRemTo(this.m, null, t) }, S.prototype.mulTo = function (t, e, n) { t.multiplyTo(e, n), this.reduce(n) }, S.prototype.sqrTo = function (t, e) { t.squareTo(e), this.reduce(e) }, b.prototype.convert = function (t) {
var e = m();
return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && 0 < e.compareTo(y.ZERO) && this.m.subTo(e, e), e }, b.prototype.revert = function (t) {
var e = m();
return t.copyTo(e), this.reduce(e), e }, b.prototype.reduce = function (t) { 
for (;
t.t <= this.mt2;)
t[t.t++] = 0;

for (var e = 0;
e < this.m.t;
++e) {
var n, i = (n = 32767 & t[e]) * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;

for (t[n = e + this.m.t] += this.m.am(0, i, t, e, 0, this.m.t);
t[n] >= t.DV;)
t[n] -= t.DV, t[++n]++ } t.clamp(), t.drShiftTo(this.m.t, t), 0 <= t.compareTo(this.m) && t.subTo(this.m, t) }, b.prototype.mulTo = function (t, e, n) { t.multiplyTo(e, n), this.reduce(n) }, b.prototype.sqrTo = function (t, e) { t.squareTo(e), this.reduce(e) }, y.prototype.copyTo = function (t) { 
for (var e = this.t - 1;
0 <= e;
--e)
t[e] = this[e];
t.t = this.t, t.s = this.s }, y.prototype.fromInt = function (t) { this.t = 1, this.s = t < 0 ? -1 : 0, 0 < t ? this[0] = t : t < -1 ? this[0] = t + DV : this.t = 0 }, y.prototype.fromString = function (t, e) {
var n;
if (16 == e) n = 4;
else if (8 == e) n = 3;
else if (256 == e) n = 8;
else if (2 == e) n = 1;
else if (32 == e) n = 5;
else
{
if (4 != e)
return void this.fromRadix(t, e);
n = 2 } this.s = this.t = 0;

for (var i = t.length, r = !1, o = 0;
0 <= --i;) {
var a = 8 == n ? 255 & t[i] : f(t, i);
a < 0 ? "-" == t.charAt(i) && (r = !0) : (r = !1, 0 == o ? this[this.t++] = a : o + n > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - o) - 1) << o, this[this.t++] = a >> this.DB - o) : this[this.t - 1] |= a << o, (o += n) >= this.DB && (o -= this.DB)) } 8 == n && 0 != (128 & t[0]) && (this.s = -1, 0 < o && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), r && y.ZERO.subTo(this, this) }, y.prototype.clamp = function () { 
for (var t = this.s & this.DM;
0 < this.t && this[this.t - 1] == t;)--this.t }, y.prototype.dlShiftTo = function (t, e) {
var n;

for (n = this.t - 1;
0 <= n;
--n)
e[n + t] = this[n];

for (n = t - 1;
0 <= n;
--n)
e[n] = 0;
e.t = this.t + t, e.s = this.s }, y.prototype.drShiftTo = function (t, e) { 
for (var n = t;
n < this.t;
++n)
e[n - t] = this[n];
e.t = Math.max(this.t - t, 0), e.s = this.s }, y.prototype.lShiftTo = function (t, e) {
var n, i = t % this.DB, r = this.DB - i, o = (1 << r) - 1, a = Math.floor(t / this.DB), s = this.s << i & this.DM;

for (n = this.t - 1;
0 <= n;
--n)
e[n + a + 1] = this[n] >> r | s, s = (this[n] & o) << i;

for (n = a - 1;
0 <= n;
--n)
e[n] = 0;
e[a] = s, e.t = this.t + a + 1, e.s = this.s, e.clamp() }, y.prototype.rShiftTo = function (t, e) { e.s = this.s;
var n = Math.floor(t / this.DB);
if (n >= this.t) e.t = 0;
else
{
var i = t % this.DB, r = this.DB - i, o = (1 << i) - 1;
e[0] = this[n] >> i;

for (var a = n + 1;
a < this.t;
++a)
e[a - n - 1] |= (this[a] & o) << r, e[a - n] = this[a] >> i;
0 < i && (e[this.t - n - 1] |= (this.s & o) << r), e.t = this.t - n, e.clamp() } }, y.prototype.subTo = function (t, e) { 
for (var n = 0, i = 0, r = Math.min(t.t, this.t);
n < r;)
i += this[n] - t[n], e[n++] = i & this.DM, i >>= this.DB;
if (t.t < this.t) { 
for (i -= t.s;
n < this.t;)
i += this[n], e[n++] = i & this.DM, i >>= this.DB;
i += this.s }
else
{ 
for (i += this.s;
n < t.t;)
i -= t[n], e[n++] = i & this.DM, i >>= this.DB;
i -= t.s } e.s = i < 0 ? -1 : 0, i < -1 ? e[n++] = this.DV + i : 0 < i && (e[n++] = i), e.t = n, e.clamp() }, y.prototype.multiplyTo = function (t, e) {
var n = this.abs(), i = t.abs(), r = n.t;

for (e.t = r + i.t;
0 <= --r;)
e[r] = 0;

for (r = 0;
r < i.t;
++r)
e[r + n.t] = n.am(0, i[r], e, r, 0, n.t);
e.s = 0, e.clamp(), this.s != t.s && y.ZERO.subTo(e, e) }, y.prototype.squareTo = function (t) { 
for (var e = this.abs(), n = t.t = 2 * e.t;
0 <= --n;)
t[n] = 0;

for (n = 0;
n < e.t - 1;
++n) {
var i = e.am(n, e[n], t, 2 * n, 0, 1);
(t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, i, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV, t[n + e.t + 1] = 1) } 0 < t.t && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)), t.s = 0, t.clamp() }, y.prototype.divRemTo = function (t, e, n) {
var i = t.abs();
if (!(i.t <= 0)) {
var r = this.abs();
if (r.t < i.t) null != e && e.fromInt(0), null != n && this.copyTo(n);
else
{ null == n && (n = m());
var o = m(), a = this.s, s = (t = t.s, this.DB - g(i[i.t - 1]));
if (0 < s ? (i.lShiftTo(s, o), r.lShiftTo(s, n)) : (i.copyTo(o), r.copyTo(n)), 0 != (r = o[(i = o.t) - 1])) {
var l = r * (1 << this.F1) + (1 < i ? o[i - 2] >> this.F2 : 0), u = this.FV / l, c = (l = (1 << this.F1) / l, 1 << this.F2), f = n.t, h = f - i, d = null == e ? m() : e;

for (o.dlShiftTo(h, d), 0 <= n.compareTo(d) && (n[n.t++] = 1, n.subTo(d, n)), y.ONE.dlShiftTo(i, d), d.subTo(o, o);
o.t < i;)
o[o.t++] = 0;

for (;
0 <= --h;) {
var p = n[--f] == r ? this.DM : Math.floor(n[f] * u + (n[f - 1] + c) * l);
if ((n[f] += o.am(0, p, n, h, 0, i)) < p) 
for (o.dlShiftTo(h, d), n.subTo(d, n);
n[f] < --p;)
n.subTo(d, n) } null != e && (n.drShiftTo(i, e), a != t && y.ZERO.subTo(e, e)), n.t = i, n.clamp(), 0 < s && n.rShiftTo(s, n), a < 0 && y.ZERO.subTo(n, n) } } } }, y.prototype.invDigit = function () {
if (this.t < 1)
return 0;
var t, e = this[0];
return 0 == (1 & e) ? 0 : 0 < (t = (t = (t = (t = (t = 3 & e) * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) ? this.DV - t : -t }, y.prototype.isEven = function () {
return 0 == (0 < this.t ? 1 & this[0] : this.s) }, y.prototype.exp = function (t, e) {
if (4294967295 < t || t < 1)
return y.ONE;
var n = m(), i = m(), r = e.convert(this), o = g(t) - 1;

for (r.copyTo(n);
0 <= --o;)
if (e.sqrTo(n, i), 0 < (t & 1 << o)) e.mulTo(i, r, n);
else
{
var a = n;
n = i, i = a }
return e.revert(n) }, y.prototype.toString = function (t) {
if (this.s < 0)
return "-" + this.negate().toString(t);
if (16 == t) t = 4;
else if (8 == t) t = 3;
else if (2 == t) t = 1;
else if (32 == t) t = 5;
else if (64 == t) t = 6;
else
{
if (4 != t)
return this.toRadix(t);
t = 2 }
var e, n = (1 << t) - 1, i = !1, r = "", o = this.t, a = this.DB - o * this.DB % t;
if (0 < o--) 
for (a < this.DB && 0 < (e = this[o] >> a) && (i = !0, r = c(e));
0 <= o;)
a < t ? (e = (this[o] & (1 << a) - 1) << t - a, e |= this[--o] >> (a += this.DB - t)) : (e = this[o] >> (a -= t) & n, a <= 0 && (a += this.DB, --o)), 0 < e && (i = !0), i && (r += c(e));
return i ? r : "0" }, y.prototype.negate = function () {
var t = m();
return y.ZERO.subTo(this, t), t }, y.prototype.abs = function () {
return this.s < 0 ? this.negate() : this }, y.prototype.compareTo = function (t) {
if (0 != (e = this.s - t.s))
return e;
var e, n = this.t;
if (0 != (e = n - t.t))
return e;

for (;
0 <= --n;)
if (0 != (e = this[n] - t[n]))
return e;
return 0 }, y.prototype.bitLength = function () {
return this.t <= 0 ? 0 : this.DB * (this.t - 1) + g(this[this.t - 1] ^ this.s & this.DM) }, y.prototype.mod = function (t) {
var e = m();
return this.abs().divRemTo(t, null, e), this.s < 0 && 0 < e.compareTo(y.ZERO) && t.subTo(e, e), e }, y.prototype.modPowInt = function (t, e) {
var n;
return n = t < 256 || e.isEven() ? new S(e) : new b(e), this.exp(t, n) }, y.ZERO = p(0), y.ONE = p(1), T.prototype.convert = k, T.prototype.revert = k, T.prototype.mulTo = function (t, e, n) { t.multiplyTo(e, n) }, T.prototype.sqrTo = function (t, e) { t.squareTo(e) }, D.prototype.convert = function (t) {
if (t.s < 0 || t.t > 2 * this.m.t)
return t.mod(this.m);
if (t.compareTo(this.m) < 0)
return t;
var e = m();
return t.copyTo(e), this.reduce(e), e }, D.prototype.revert = function (t) {
return t }, D.prototype.reduce = function (t) { 
for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
t.compareTo(this.r2) < 0;)
t.dAddOffset(1, this.m.t + 1);

for (t.subTo(this.r2, t);
0 <= t.compareTo(this.m);)
t.subTo(this.m, t) }, D.prototype.mulTo = function (t, e, n) { t.multiplyTo(e, n), this.reduce(n) }, D.prototype.sqrTo = function (t, e) { t.squareTo(e), this.reduce(e) };
var M = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], R = 67108864 / M[M.length - 1];
function E() { } function z() { this.j = this.i = 0, this.S = [] } y.prototype.chunkSize = function (t) {
return Math.floor(Math.LN2 * this.DB / Math.log(t)) }, y.prototype.toRadix = function (t) {
if (null == t && (t = 10), 0 == this.signum() || t < 2 || 36 < t)
return "0";
var e = this.chunkSize(t), n = p(e = Math.pow(t, e)), i = m(), r = m(), o = "";

for (this.divRemTo(n, i, r);
0 < i.signum();)
o = (e + r.intValue()).toString(t).substr(1) + o, i.divRemTo(n, i, r);
return r.intValue().toString(t) + o }, y.prototype.fromRadix = function (t, e) { this.fromInt(0), null == e && (e = 10);

for (var n = this.chunkSize(e), i = Math.pow(e, n), r = !1, o = 0, a = 0, s = 0;
s < t.length;
++s) {
var l = f(t, s);
l < 0 ? "-" == t.charAt(s) && 0 == this.signum() && (r = !0) : (a = e * a + l, ++o >= n && (this.dMultiply(i), this.dAddOffset(a, 0), a = o = 0)) } 0 < o && (this.dMultiply(Math.pow(e, o)), this.dAddOffset(a, 0)), r && y.ZERO.subTo(this, this) }, y.prototype.fromNumber = function (t, e, n) {
if ("number" == typeof e)
if (t < 2) this.fromInt(1);
else

for (this.fromNumber(t, n), this.testBit(t - 1) || this.bitwiseTo(y.ONE.shiftLeft(t - 1), w, this), this.isEven() && this.dAddOffset(1, 0);
!this.isProbablePrime(e);)
this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(y.ONE.shiftLeft(t - 1), this);
else
{
var i = 7 & t;
(n = []).length = 1 + (t >> 3), e.nextBytes(n), 0 < i ? n[0] &= (1 << i) - 1 : n[0] = 0, this.fromString(n, 256) } }, y.prototype.bitwiseTo = function (t, e, n) {
var i, r, o = Math.min(t.t, this.t);

for (i = 0;
i < o;
++i)
n[i] = e(this[i], t[i]);
if (t.t < this.t) { 
for (r = t.s & this.DM, i = o;
i < this.t;
++i)
n[i] = e(this[i], r);
n.t = this.t }
else
{ 
for (r = this.s & this.DM, i = o;
i < t.t;
++i)
n[i] = e(r, t[i]);
n.t = t.t } n.s = e(this.s, t.s), n.clamp() }, y.prototype.changeBit = function (t, e) {
var n = y.ONE.shiftLeft(t);
return this.bitwiseTo(n, e, n), n }, y.prototype.addTo = function (t, e) { 
for (var n = 0, i = 0, r = Math.min(t.t, this.t);
n < r;)
i += this[n] + t[n], e[n++] = i & this.DM, i >>= this.DB;
if (t.t < this.t) { 
for (i += t.s;
n < this.t;)
i += this[n], e[n++] = i & this.DM, i >>= this.DB;
i += this.s }
else
{ 
for (i += this.s;
n < t.t;)
i += t[n], e[n++] = i & this.DM, i >>= this.DB;
i += t.s } e.s = i < 0 ? -1 : 0, 0 < i ? e[n++] = i : i < -1 && (e[n++] = this.DV + i), e.t = n, e.clamp() }, y.prototype.dMultiply = function (t) { this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp() }, y.prototype.dAddOffset = function (t, e) {
if (0 != t) { 
for (;
this.t <= e;)
this[this.t++] = 0;

for (this[e] += t;
this[e] >= this.DV;)
this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e] } }, y.prototype.multiplyLowerTo = function (t, e, n) {
var i, r = Math.min(this.t + t.t, e);

for (n.s = 0, n.t = r;
0 < r;)
n[--r] = 0;

for (i = n.t - this.t;
r < i;
++r)
n[r + this.t] = this.am(0, t[r], n, r, 0, this.t);

for (i = Math.min(t.t, e);
r < i;
++r)
this.am(0, t[r], n, r, 0, e - r);
n.clamp() }, y.prototype.multiplyUpperTo = function (t, e, n) { --e;
var i = n.t = this.t + t.t - e;

for (n.s = 0;
0 <= --i;)
n[i] = 0;

for (i = Math.max(e - this.t, 0);
i < t.t;
++i)
n[this.t + i - e] = this.am(e - i, t[i], n, 0, 0, this.t + i - e);
n.clamp(), n.drShiftTo(1, n) }, y.prototype.modInt = function (t) {
if (t <= 0)
return 0;
var e = this.DV % t, n = this.s < 0 ? t - 1 : 0;
if (0 < this.t)
if (0 == e) n = this[0] % t;
else

for (var i = this.t - 1;
0 <= i;
--i)
n = (e * n + this[i]) % t;
return n }, y.prototype.millerRabin = function (t) {
var e = this.subtract(y.ONE), n = e.getLowestSetBit();
if (n <= 0)
return !1;
var i = e.shiftRight(n);
M.length < (t = t + 1 >> 1) && (t = M.length);

for (var r = m(), o = 0;
o < t;
++o) { r.fromInt(M[Math.floor(Math.random() * M.length)]);
var a = r.modPow(i, this);
if (0 != a.compareTo(y.ONE) && 0 != a.compareTo(e)) { 
for (var s = 1;
s++ < n && 0 != a.compareTo(e);)
if (0 == (a = a.modPowInt(2, this)).compareTo(y.ONE))
return !1;
if (0 != a.compareTo(e))
return !1 } }
return !0 }, y.prototype.clone = function () {
var t = m();
return this.copyTo(t), t }, y.prototype.intValue = function () {
if (this.s < 0) {
if (1 == this.t)
return this[0] - this.DV;
if (0 == this.t)
return -1 }
else
{
if (1 == this.t)
return this[0];
if (0 == this.t)
return 0 }
return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0] }, y.prototype.byteValue = function () {
return 0 == this.t ? this.s : this[0] << 24 >> 24 }, y.prototype.shortValue = function () {
return 0 == this.t ? this.s : this[0] << 16 >> 16 }, y.prototype.signum = function () {
return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1 }, y.prototype.toByteArray = function () {
var t = this.t, e = [];
e[0] = this.s;
var n, i = this.DB - t * this.DB % 8, r = 0;
if (0 < t--) 
for (i < this.DB && (n = this[t] >> i) != (this.s & this.DM) >> i && (e[r++] = n | this.s << this.DB - i);
0 <= t;)
i < 8 ? (n = (this[t] & (1 << i) - 1) << 8 - i, n |= this[--t] >> (i += this.DB - 8)) : (n = this[t] >> (i -= 8) & 255, i <= 0 && (i += this.DB, --t)), 0 != (128 & n) && (n |= -256), 0 == r && (128 & this.s) != (128 & n) && ++r, (0 < r || n != this.s) && (e[r++] = n);
return e }, y.prototype.equals = function (t) {
return 0 == this.compareTo(t) }, y.prototype.min = function (t) {
return this.compareTo(t) < 0 ? this : t }, y.prototype.max = function (t) {
return 0 < this.compareTo(t) ? this : t }, y.prototype.and = function (t) {
var e = m();
return this.bitwiseTo(t, d, e), e }, y.prototype.or = function (t) {
var e = m();
return this.bitwiseTo(t, w, e), e }, y.prototype.xor = function (t) {
var e = m();
return this.bitwiseTo(t, _, e), e }, y.prototype.andNot = function (t) {
var e = m();
return this.bitwiseTo(t, P, e), e }, y.prototype.not = function () { 
for (var t = m(), e = 0;
e < this.t;
++e)
t[e] = this.DM & ~this[e];
return t.t = this.t, t.s = ~this.s, t }, y.prototype.shiftLeft = function (t) {
var e = m();
return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e }, y.prototype.shiftRight = function (t) {
var e = m();
return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e }, y.prototype.getLowestSetBit = function () { 
for (var t = 0;
t < this.t;
++t)
if (0 != this[t])
return t * this.DB + C(this[t]);
return this.s < 0 ? this.t * this.DB : -1 }, y.prototype.bitCount = function () { 
for (var t = 0, e = this.s & this.DM, n = 0;
n < this.t;
++n)
t += x(this[n] ^ e);
return t }, y.prototype.testBit = function (t) {
var e = Math.floor(t / this.DB);
return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB) }, y.prototype.setBit = function (t) {
return this.changeBit(t, w) }, y.prototype.clearBit = function (t) {
return this.changeBit(t, P) }, y.prototype.flipBit = function (t) {
return this.changeBit(t, _) }, y.prototype.add = function (t) {
var e = m();
return this.addTo(t, e), e }, y.prototype.subtract = function (t) {
var e = m();
return this.subTo(t, e), e }, y.prototype.multiply = function (t) {
var e = m();
return this.multiplyTo(t, e), e }, y.prototype.divide = function (t) {
var e = m();
return this.divRemTo(t, e, null), e }, y.prototype.remainder = function (t) {
var e = m();
return this.divRemTo(t, null, e), e }, y.prototype.divideAndRemainder = function (t) {
var e = m(), n = m();
return this.divRemTo(t, e, n), [e, n] }, y.prototype.modPow = function (t, e) {
var n, i, r = t.bitLength(), o = p(1);
if (r <= 0)
return o;
n = r < 18 ? 1 : r < 48 ? 3 : r < 144 ? 4 : r < 768 ? 5 : 6, i = r < 8 ? new S(e) : e.isEven() ? new D(e) : new b(e);
var a = [], s = 3, l = n - 1, u = (1 << n) - 1;
if (a[1] = i.convert(this), 1 < n) 
for (r = m(), i.sqrTo(a[1], r);
s <= u;)
a[s] = m(), i.mulTo(r, a[s - 2], a[s]), s += 2;
var c, f = t.t - 1, h = !0, d = m();

for (r = g(t[f]) - 1;
0 <= f;) { 
for (l <= r ? c = t[f] >> r - l & u : (c = (t[f] & (1 << r + 1) - 1) << l - r, 0 < f && (c |= t[f - 1] >> this.DB + r - l)), s = n;
0 == (1 & c);)
c >>= 1, --s;
if ((r -= s) < 0 && (r += this.DB, --f), h) a[c].copyTo(o), h = !1;
else
{ 
for (;
1 < s;)
i.sqrTo(o, d), i.sqrTo(d, o), s -= 2;
0 < s ? i.sqrTo(o, d) : (s = o, o = d, d = s), i.mulTo(d, a[c], o) } 
for (;
0 <= f && 0 == (t[f] & 1 << r);)
i.sqrTo(o, d), s = o, o = d, d = s, --r < 0 && (r = this.DB - 1, --f) }
return i.revert(o) }, y.prototype.modInverse = function (t) {
var e = t.isEven();
if (this.isEven() && e || 0 == t.signum())
return y.ZERO;

for (var n = t.clone(), i = this.clone(), r = p(1), o = p(0), a = p(0), s = p(1);
0 != n.signum();) { 
for (;
n.isEven();)
n.rShiftTo(1, n), e ? (r.isEven() && o.isEven() || (r.addTo(this, r), o.subTo(t, o)), r.rShiftTo(1, r)) : o.isEven() || o.subTo(t, o), o.rShiftTo(1, o);

for (;
i.isEven();)
i.rShiftTo(1, i), e ? (a.isEven() && s.isEven() || (a.addTo(this, a), s.subTo(t, s)), a.rShiftTo(1, a)) : s.isEven() || s.subTo(t, s), s.rShiftTo(1, s);
0 <= n.compareTo(i) ? (n.subTo(i, n), e && r.subTo(a, r), o.subTo(s, o)) : (i.subTo(n, i), e && a.subTo(r, a), s.subTo(o, s)) }
return 0 != i.compareTo(y.ONE) ? y.ZERO : 0 <= s.compareTo(t) ? s.subtract(t) : s.signum() < 0 ? (s.addTo(t, s), s.signum() < 0 ? s.add(t) : s) : s }, y.prototype.pow = function (t) {
return this.exp(t, new T) }, y.prototype.gcd = function (t) {
var e = this.s < 0 ? this.negate() : this.clone();
if (t = t.s < 0 ? t.negate() : t.clone(), e.compareTo(t) < 0) {
var n = e;
e = t, t = n } n = e.getLowestSetBit();
var i = t.getLowestSetBit();
if (i < 0)
return e;

for (n < i && (i = n), 0 < i && (e.rShiftTo(i, e), t.rShiftTo(i, t));
0 < e.signum();)0 < (n = e.getLowestSetBit()) && e.rShiftTo(n, e), 0 < (n = t.getLowestSetBit()) && t.rShiftTo(n, t), 0 <= e.compareTo(t) ? (e.subTo(t, e), e.rShiftTo(1, e)) : (t.subTo(e, t), t.rShiftTo(1, t));
return 0 < i && t.lShiftTo(i, t), t }, y.prototype.isProbablePrime = function (t) {
var e, n = this.abs();
if (1 == n.t && n[0] <= M[M.length - 1]) { 
for (e = 0;
e < M.length;
++e)
if (n[0] == M[e])
return !0;
return !1 }
if (n.isEven())
return !1;

for (e = 1;
e < M.length;) { 
for (var i = M[e], r = e + 1;
r < M.length && i < R;)
i *= M[r++];

for (i = n.modInt(i);
e < r;)
if (i % M[e++] == 0)
return !1 }
return n.millerRabin(t) }, y.prototype.square = function () {
var t = m();
return this.squareTo(t), t }, function (r, o, l, t, a, s, u) { function c(t) {
var e, n, s = this, i = t.length, r = 0, o = s.i = s.j = s.m = 0;

for (s.S = [], s.c = [], i || (t = [i++]);
r < l;)
s.S[r] = r++;

for (r = 0;
r < l;
r++)
o = o + (e = s.S[r]) + t[r % i] & 255, n = s.S[o], s.S[r] = n, s.S[o] = e;
s.g = function (t) {
var e = s.S, n = s.i + 1 & 255, i = e[n], r = s.j + i & 255, o = e[r];
e[n] = o, e[r] = i;

for (var a = e[i + o & 255];
--t;)
o = e[r = r + (i = e[n = n + 1 & 255]) & 255], e[n] = o, e[r] = i, a = a * l + e[i + o & 255];
return s.i = n, s.j = r, a }, s.g(l) } function f(t, e, n, i) { 
for (t += "", i = n = 0;
i < t.length;
i++) {
var r = e, o = 255 & i, a = (n ^= 19 * e[255 & i]) + t.charCodeAt(i);
r[o] = 255 & a } 
for (i in t = "", e) t += String.fromCharCode(e[i]);
return t } o.seedrandom = function (t, e) {
var i, n = [];
t = f(function t(e, n, i, r, o) {
if (i = [], o = void 0 === e ? "undefined" : h(e), n && "object" == o) 
for (r in e)
if (r.indexOf("S") < 5) try { i.push(t(e[r], n - 1)) } catch (t) { }
return i.length ? i : e + ("string" != o ? "\0" : "") }(e ? [t, r] : arguments.length ? t : [(new Date).getTime(), r, window], 3), n);
return f((i = new c(n)).S, r), o.random = function () { 
for (var t = i.g(6), e = u, n = 0;
t < a;)
t = (t + n) * l, e *= l, n = i.g(1);

for (;
s <= t;)
t /= 2, e /= 2, n >>>= 1;
return (t + n) / e }, t }, u = o.pow(l, 6), a = o.pow(2, a), s = 2 * a, f(o.random(), r) }([], Math, 256, 0, 52), E.prototype.nextBytes = function (t) {
var e;

for (e = 0;
e < t.length;
e++)
t[e] = Math.floor(256 * Math.random()) }, z.prototype.init = function (t) {
var e, n, i;

for (e = 0;
e < 256;
++e)
this.S[e] = e;

for (e = n = 0;
e < 256;
++e)
n = n + this.S[e] + t[e % t.length] & 255, i = this.S[e], this.S[e] = this.S[n], this.S[n] = i;
this.j = this.i = 0 }, z.prototype.next = function () {
var t;
return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255] };
var I, A, F, O = 256;
function B() {
var t;
t = (new Date).getTime(), A[F++] ^= 255 & t, A[F++] ^= t >> 8 & 255, A[F++] ^= t >> 16 & 255, A[F++] ^= t >> 24 & 255, O <= F && (F -= O) }
if (null == A) {
var L;
if (A = [], F = 0, "Netscape" == r && o < "5" && window.crypto) {
var N = window.crypto.random(32);

for (L = 0;
L < N.length;
++L)
A[F++] = 255 & N.charCodeAt(L) } 
for (;
F < O;)
L = Math.floor(65536 * Math.random()), A[F++] = L >>> 8, A[F++] = 255 & L;
F = 0, B() } function q() {
if (null == I) { 
for (B(), (I = new z).init(A), F = 0;
F < A.length;
++F)
A[F] = 0;
F = 0 }
return I.next() } function H() { } H.prototype.nextBytes = function (t) {
var e;

for (e = 0;
e < t.length;
++e)
t[e] = q() };
var j = function (t) {
return function (t) { function v(t, e) {
var n = (65535 & t) + (65535 & e);
return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n } function g(t, e) {
return t >>> e | t << 32 - e }
return function (t) { 
for (var e = "", n = 0;
n < 4 * t.length;
n++)
e += "0123456789abcdef".charAt(t[n >> 2] >> 8 * (3 - n % 4) + 4 & 15) + "0123456789abcdef".charAt(t[n >> 2] >> 8 * (3 - n % 4) & 15);
return e }(function (t, e) {
var n, i, r, o, a, s, l, u, c, f, h, d, p = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], y = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], m = Array(64);

for (t[e >> 5] |= 128 << 24 - e % 32, t[15 + (e + 64 >> 9 << 4)] = e, c = 0;
c < t.length;
c += 16) { 
for (n = y[0], i = y[1], r = y[2], o = y[3], a = y[4], s = y[5], l = y[6], u = y[7], f = 0;
f < 64;
f++)
m[f] = f < 16 ? t[f + c] : v(v(v(g(m[f - 2], 17) ^ g(m[f - 2], 19) ^ m[f - 2] >>> 10, m[f - 7]), g(m[f - 15], 7) ^ g(m[f - 15], 18) ^ m[f - 15] >>> 3), m[f - 16]), h = v(v(v(v(u, g(a, 6) ^ g(a, 11) ^ g(a, 25)), a & s ^ ~a & l), p[f]), m[f]), d = v(g(n, 2) ^ g(n, 13) ^ g(n, 22), n & i ^ n & r ^ i & r), u = l, l = s, s = a, a = v(o, h), o = r, r = i, i = n, n = v(h, d);
y[0] = v(n, y[0]), y[1] = v(i, y[1]), y[2] = v(r, y[2]), y[3] = v(o, y[3]), y[4] = v(a, y[4]), y[5] = v(s, y[5]), y[6] = v(l, y[6]), y[7] = v(u, y[7]) }
return y }(function (t) { 
for (var e = [], n = 0;
n < 8 * t.length;
n += 8)
e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << 24 - n % 32;
return e }(t = function (t) { t = t.replace(/\r\n/g, "\n");

for (var e = "", n = 0;
n < t.length;
n++) {
var i = t.charCodeAt(n);
i < 128 ? e += String.fromCharCode(i) : (127 < i && i < 2048 ? e += String.fromCharCode(i >> 6 | 192) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128)), e += String.fromCharCode(63 & i | 128)) }
return e }(t)), 8 * t.length)) }(t) };
var W = function (t) {
return function (t) { function e(t, e) {
return t << e | t >>> 32 - e } function n(t) {
var e, n = "";

for (e = 7;
0 <= e;
e--)
n += (t >>> 4 * e & 15).toString(16);
return n }
var i, r, o, a, s, l, u, c = Array(80), f = 1732584193, h = 4023233417, d = 2562383102, p = 271733878, y = 3285377520;
o = (t = function (t) { t = t.replace(/\r\n/g, "\n");

for (var e = "", n = 0;
n < t.length;
n++) {
var i = t.charCodeAt(n);
i < 128 ? e += String.fromCharCode(i) : (127 < i && i < 2048 ? e += String.fromCharCode(i >> 6 | 192) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128)), e += String.fromCharCode(63 & i | 128)) }
return e }(t)).length;
var m = [];

for (i = 0;
i < o - 3;
i += 4)
r = t.charCodeAt(i) << 24 | t.charCodeAt(i + 1) << 16 | t.charCodeAt(i + 2) << 8 | t.charCodeAt(i + 3), m.push(r);
switch (o % 4) { case 0: i = 2147483648;
break;
case 1: i = t.charCodeAt(o - 1) << 24 | 8388608;
break;
case 2: i = t.charCodeAt(o - 2) << 24 | t.charCodeAt(o - 1) << 16 | 32768;
break;
case 3: i = t.charCodeAt(o - 3) << 24 | t.charCodeAt(o - 2) << 16 | t.charCodeAt(o - 1) << 8 | 128 }
for (m.push(i);
m.length % 16 != 14;)
m.push(0);

for (m.push(o >>> 29), m.push(o << 3 & 4294967295), t = 0;
t < m.length;
t += 16) { 
for (i = 0;
i < 16;
i++)
c[i] = m[t + i];

for (i = 16;
i <= 79;
i++)
c[i] = e(c[i - 3] ^ c[i - 8] ^ c[i - 14] ^ c[i - 16], 1);

for (r = f, o = h, a = d, s = p, l = y, i = 0;
i <= 19;
i++)
u = e(r, 5) + (o & a | ~o & s) + l + c[i] + 1518500249 & 4294967295, l = s, s = a, a = e(o, 30), o = r, r = u;

for (i = 20;
i <= 39;
i++)
u = e(r, 5) + (o ^ a ^ s) + l + c[i] + 1859775393 & 4294967295, l = s, s = a, a = e(o, 30), o = r, r = u;

for (i = 40;
i <= 59;
i++)
u = e(r, 5) + (o & a | o & s | a & s) + l + c[i] + 2400959708 & 4294967295, l = s, s = a, a = e(o, 30), o = r, r = u;

for (i = 60;
i <= 79;
i++)
u = e(r, 5) + (o ^ a ^ s) + l + c[i] + 3395469782 & 4294967295, l = s, s = a, a = e(o, 30), o = r, r = u;
f = f + r & 4294967295, h = h + o & 4294967295, d = d + a & 4294967295, p = p + s & 4294967295, y = y + l & 4294967295 }
return (u = n(f) + n(h) + n(d) + n(p) + n(y)).toLowerCase() }(t) };
function U(t, e) {
return new y(t, e) } function G() { this.n = null, this.e = 0, this.coeff = this.dmq1 = this.dmp1 = this.q = this.p = this.d = null } G.prototype.doPublic = function (t) {
return t.modPowInt(this.e, this.n) }, G.prototype.setPublic = function (t, e) { null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = U(t, 16), this.e = parseInt(e, 16)) : alert("Invalid RSA public key") }, G.prototype.encrypt = function (t) {
return null == (t = function (t, e) {
if (e < t.length + 11) throw "Message too long for RSA (n=" + e + ", l=" + t.length + ")";

for (var n = [], i = t.length - 1;
0 <= i && 0 < e;) {
var r = t.charCodeAt(i--);
n[--e] = r < 128 ? r : 127 < r && r < 2048 ? (n[--e] = 63 & r | 128, r >> 6 | 192) : (n[--e] = 63 & r | 128, n[--e] = r >> 6 & 63 | 128, r >> 12 | 224) } 
for (n[--e] = 0, i = new H, r = [];
2 < e;) { 
for (r[0] = 0;
0 == r[0];)
i.nextBytes(r);
n[--e] = r[0] }
return n[--e] = 2, n[--e] = 0, new y(n) }(t, this.n.bitLength() + 7 >> 3)) ? null : null == (t = this.doPublic(t)) ? null : 0 == (1 & (t = t.toString(16)).length) ? t : "0" + t }, G.prototype.doPrivate = function (t) {
if (null == this.p || null == this.q)
return t.modPow(this.d, this.n);
var e = t.mod(this.p).modPow(this.dmp1, this.p);

for (t = t.mod(this.q).modPow(this.dmq1, this.q);
e.compareTo(t) < 0;)
e = e.add(this.p);
return e.subtract(t).multiply(this.coeff).mod(this.p).multiply(this.q).add(t) }, G.prototype.setPrivate = function (t, e, n) { null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = U(t, 16), this.e = parseInt(e, 16), this.d = U(n, 16)) : alert("Invalid RSA private key") }, G.prototype.setPrivateEx = function (t, e, n, i, r, o, a, s) { null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = U(t, 16), this.e = parseInt(e, 16), this.d = U(n, 16), this.p = U(i, 16), this.q = U(r, 16), this.dmp1 = U(o, 16), this.dmq1 = U(a, 16), this.coeff = U(s, 16)) : alert("Invalid RSA private key") }, G.prototype.generate = function (t, e) {
var n = new E, i = t >> 1;
this.e = parseInt(e, 16);

for (var r = new y(e, 16);
;) { 
for (;
this.p = new y(t - i, 1, n), 0 != this.p.subtract(y.ONE).gcd(r).compareTo(y.ONE) || !this.p.isProbablePrime(10););

for (;
this.q = new y(i, 1, n), 0 != this.q.subtract(y.ONE).gcd(r).compareTo(y.ONE) || !this.q.isProbablePrime(10););
if (this.p.compareTo(this.q) <= 0) {
var o = this.p;
this.p = this.q, this.q = o } o = this.p.subtract(y.ONE);
var a = this.q.subtract(y.ONE), s = o.multiply(a);
if (0 == s.gcd(r).compareTo(y.ONE)) { this.n = this.p.multiply(this.q), this.d = r.modInverse(s), this.dmp1 = this.d.mod(o), this.dmq1 = this.d.mod(a), this.coeff = this.q.modInverse(this.p);
break } } }, G.prototype.decrypt = function (t) {
return null == (t = this.doPrivate(U(t, 16))) ? null : function (t, e) { 
for (var n = t.toByteArray(), i = 0;
i < n.length && 0 == n[i];)++i;
if (n.length - i != e - 1 || 2 != n[i])
return null;

for (++i;
0 != n[i];)
if (++i >= n.length)
return null;

for (var r = "";
++i < n.length;) {
var o = 255 & n[i];
o < 128 ? r += String.fromCharCode(o) : 191 < o && o < 224 ? (r += String.fromCharCode((31 & o) << 6 | 63 & n[i + 1]), ++i) : (r += String.fromCharCode((15 & o) << 12 | (63 & n[i + 1]) << 6 | 63 & n[i + 2]), i += 2) }
return r }(t, this.n.bitLength() + 7 >> 3) };
var V = [];
V.sha1 = "3021300906052b0e03021a05000414", V.sha256 = "3031300d060960864801650304020105000420";
var Y = [];
function X(t, e, n) { e /= 4;
t = (0, Y[n])(t), n = "00" + V[n] + t, t = "", e = e - 4 - n.length;

for (var i = 0;
i < e;
i += 2)
t += "ff";
return sPaddedMessageHex = "0001" + t + n } function J(t, e, n) {
return (i = t, r = e, o = n, a = new G, a.setPublic(r, o), a.doPublic(i)).toString(16).replace(/^1f+00/, "");
var i, r, o, a } function $(t) { 
for (var e in V) {
var n = V[e], i = n.length;
if (t.substring(0, i) == n)
return [e, t.substring(i)] }
return [] } Y.sha1 = W, Y.sha256 = j, G.prototype.signString = function (t, e) {
var n = X(t, this.n.bitLength(), e);
return this.doPrivate(U(n, 16)).toString(16) }, G.prototype.signStringWithSHA1 = function (t) {
return t = X(t, this.n.bitLength(), "sha1"), this.doPrivate(U(t, 16)).toString(16) }, G.prototype.signStringWithSHA256 = function (t) {
return t = X(t, this.n.bitLength(), "sha256"), this.doPrivate(U(t, 16)).toString(16) }, G.prototype.verifyString = function (t, e) { e = e.replace(/[ \n]+/g, "");
var n = this.doPublic(U(e, 16)).toString(16).replace(/^1f+00/, ""), i = $(n);
return 0 != i.length && (n = i[1]) == (i = (0, Y[i[0]])(t)) }, G.prototype.verifyHexSignatureForMessage = function (t, e) {
var n, i, r, o, a = U(t, 16);
return n = e, i = a, r = this.n.toString(16), o = this.e.toString(16), 0 != (r = $(i = J(i, r, o))).length && (i = r[1]) == (n = (0, Y[r[0]])(n)) };
var K, Z, Q = Z = { Sbox: [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22], ShiftRowTab: [0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11], Init: function () { Z.Sbox_Inv = Array(256);

for (var t = 0;
t < 256;
t++)
Z.Sbox_Inv[Z.Sbox[t]] = t;

for (Z.ShiftRowTab_Inv = Array(16), t = 0;
t < 16;
t++)
Z.ShiftRowTab_Inv[Z.ShiftRowTab[t]] = t;

for (Z.xtime = Array(256), t = 0;
t < 128;
t++)
Z.xtime[t] = t << 1, Z.xtime[128 + t] = t << 1 ^ 27 }, Done: function () { delete Z.Sbox_Inv, delete Z.ShiftRowTab_Inv, delete Z.xtime }, ExpandKey: function (t) {
var e, n = t.length, i = 1;
switch (n) { case 16: e = 176;
break;
case 24: e = 208;
break;
case 32: e = 240;
break;
default: alert("my.ExpandKey: Only key lengths of 16, 24 or 32 bytes allowed!") }
for (var r = n;
r < e;
r += 4) {
var o = t.slice(r - 4, r);
r % n == 0 ? (o = [Z.Sbox[o[1]] ^ i, Z.Sbox[o[2]], Z.Sbox[o[3]], Z.Sbox[o[0]]], 256 <= (i <<= 1) && (i ^= 283)) : 24 < n && r % n == 16 && (o = [Z.Sbox[o[0]], Z.Sbox[o[1]], Z.Sbox[o[2]], Z.Sbox[o[3]]]);

for (var a = 0;
a < 4;
a++)
t[r + a] = t[r + a - n] ^ o[a] } }, Encrypt: function (t, e) {
var n = e.length;
Z.AddRoundKey(t, e.slice(0, 16));

for (var i = 16;
i < n - 16;
i += 16)
Z.SubBytes(t, Z.Sbox), Z.ShiftRows(t, Z.ShiftRowTab), Z.MixColumns(t), Z.AddRoundKey(t, e.slice(i, i + 16));
Z.SubBytes(t, Z.Sbox), Z.ShiftRows(t, Z.ShiftRowTab), Z.AddRoundKey(t, e.slice(i, n)) }, Decrypt: function (t, e) {
var n = e.length;

for (Z.AddRoundKey(t, e.slice(n - 16, n)), Z.ShiftRows(t, Z.ShiftRowTab_Inv), Z.SubBytes(t, Z.Sbox_Inv), n -= 32;
16 <= n;
n -= 16)
Z.AddRoundKey(t, e.slice(n, n + 16)), Z.MixColumns_Inv(t), Z.ShiftRows(t, Z.ShiftRowTab_Inv), Z.SubBytes(t, Z.Sbox_Inv);
Z.AddRoundKey(t, e.slice(0, 16)) }, SubBytes: function (t, e) { 
for (var n = 0;
n < 16;
n++)
t[n] = e[t[n]] }, AddRoundKey: function (t, e) { 
for (var n = 0;
n < 16;
n++)
t[n] ^= e[n] }, ShiftRows: function (t, e) { 
for (var n = [].concat(t), i = 0;
i < 16;
i++)
t[i] = n[e[i]] }, MixColumns: function (t) { 
for (var e = 0;
e < 16;
e += 4) {
var n = t[e + 0], i = t[e + 1], r = t[e + 2], o = t[e + 3], a = n ^ i ^ r ^ o;
t[e + 0] ^= a ^ Z.xtime[n ^ i], t[e + 1] ^= a ^ Z.xtime[i ^ r], t[e + 2] ^= a ^ Z.xtime[r ^ o], t[e + 3] ^= a ^ Z.xtime[o ^ n] } }, MixColumns_Inv: function (t) { 
for (var e = 0;
e < 16;
e += 4) {
var n = t[e + 0], i = t[e + 1], r = t[e + 2], o = t[e + 3], a = n ^ i ^ r ^ o, s = Z.xtime[a], l = Z.xtime[Z.xtime[s ^ n ^ r]] ^ a;
a ^= Z.xtime[Z.xtime[s ^ i ^ o]], t[e + 0] ^= l ^ Z.xtime[n ^ i], t[e + 1] ^= a ^ Z.xtime[i ^ r], t[e + 2] ^= l ^ Z.xtime[r ^ o], t[e + 3] ^= a ^ Z.xtime[o ^ n] } } }, tt = (K = {}, Q.Init(), K.b256to64 = function (t) {
var e, n, i, r = "", o = 0, a = t.length;

for (i = 0;
i < a;
i++)
n = t.charCodeAt(i), 0 == o ? (r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 2 & 63), e = (3 & n) << 4) : 1 == o ? (r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e | n >> 4 & 15), e = (15 & n) << 2) : 2 == o && (r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e | n >> 6 & 3), r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & n)), 3 == (o += 1) && (o = 0);
return 0 < o && (r += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e), r += "="), 1 == o && (r += "="), r }, K.b64to256 = function (t) {
var e, n, i = "", r = 0, o = 0, a = t.length;

for (n = 0;
n < a;
n++)0 <= (e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(n))) && (r && (i += String.fromCharCode(o | e >> 6 - r & 255)), o = e << (r = r + 2 & 7) & 255);
return i }, K.b16to64 = function (t) {
var e, n, i = "";

for (t.length % 2 == 1 && (t = "0" + t), e = 0;
e + 3 <= t.length;
e += 3)
n = parseInt(t.substring(e, e + 3), 16), i += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 6) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & n);

for (e + 1 == t.length ? (n = parseInt(t.substring(e, e + 1), 16), i += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n << 2)) : e + 2 == t.length && (n = parseInt(t.substring(e, e + 2), 16), i += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 2) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((3 & n) << 4));
0 < (3 & i.length);)
i += "=";
return i }, K.b64to16 = function (t) {
var e, n, i = "", r = 0;

for (e = 0;
e < t.length && "=" != t.charAt(e);
++e)
v = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(e)), v < 0 || (r = 0 == r ? (i += c(v >> 2), n = 3 & v, 1) : 1 == r ? (i += c(n << 2 | v >> 4), n = 15 & v, 2) : 2 == r ? (i += c(n), i += c(v >> 2), n = 3 & v, 3) : (i += c(n << 2 | v >> 4), i += c(15 & v), 0));
return 1 == r && (i += c(n << 2)), i }, K.string2bytes = function (t) { 
for (var e = [], n = 0;
n < t.length;
n++)
e.push(t.charCodeAt(n));
return e }, K.bytes2string = function (t) { 
for (var e = "", n = 0;
n < t.length;
n++)
e += String.fromCharCode(t[n]);
return e }, K.blockXOR = function (t, e) { 
for (var n = Array(16), i = 0;
i < 16;
i++)
n[i] = t[i] ^ e[i];
return n }, K.blockIV = function () {
var t = new H, e = Array(16);
return t.nextBytes(e), e }, K.pad16 = function (t) {
var e = t.slice(0), n = (16 - t.length % 16) % 16;

for (i = t.length;
i < t.length + n;
i++)
e.push(0);
return e }, K.depad = function (t) { 
for (t = t.slice(0);
0 == t[t.length - 1];)
t = t.slice(0, t.length - 1);
return t }, K.encryptAESCBC = function (t, e) {
var n = e.slice(0);
Q.ExpandKey(n);

for (var i = K.string2bytes(t), r = (i = K.pad16(i), K.blockIV()), o = 0;
o < i.length / 16;
o++) {
var a = i.slice(16 * o, 16 * o + 16), s = r.slice(16 * o, 16 * o + 16);
a = K.blockXOR(s, a), Q.Encrypt(a, n), r = r.concat(a) }
return n = K.bytes2string(r), K.b256to64(n) }, K.decryptAESCBC = function (t, e) {
var n = e.slice(0);
Q.ExpandKey(n), t = K.b64to256(t);

for (var i = K.string2bytes(t), r = [], o = 1;
o < i.length / 16;
o++) {
var a = i.slice(16 * o, 16 * o + 16), s = i.slice(16 * (o - 1), 16 * (o - 1) + 16);
Q.Decrypt(a, n), a = K.blockXOR(s, a), r = r.concat(a) }
return r = K.depad(r), K.bytes2string(r) }, K.wrap60 = function (t) { 
for (var e = "", n = 0;
n < t.length;
n++)
n % 60 == 0 && 0 != n && (e += "\n"), e += t[n];
return e }, K.generateAESKey = function () {
var t = Array(16);
return (new H).nextBytes(t), t }, K.generateRSAKey = function (t, e) { Math.seedrandom(j(t));
var n = new G;
return n.generate(e, "10001"), n }, K.publicKeyString = function (t) {
return pubkey = t.n.toString(16) }, K.publicKeyID = function (t) {
return function (t) { function s(t, e) {
var n, i, r, o, a;
return r = 2147483648 & t, o = 2147483648 & e, a = (1073741823 & t) + (1073741823 & e), (n = 1073741824 & t) & (i = 1073741824 & e) ? 2147483648 ^ a ^ r ^ o : n | i ? 1073741824 & a ? 3221225472 ^ a ^ r ^ o : 1073741824 ^ a ^ r ^ o : a ^ r ^ o } function e(t, e, n, i, r, o, a) {
return s((t = s(t, s(s(e & n | ~e & i, r), a))) << o | t >>> 32 - o, e) } function n(t, e, n, i, r, o, a) {
return s((t = s(t, s(s(e & i | n & ~i, r), a))) << o | t >>> 32 - o, e) } function i(t, e, n, i, r, o, a) {
return s((t = s(t, s(s(e ^ n ^ i, r), a))) << o | t >>> 32 - o, e) } function r(t, e, n, i, r, o, a) {
return s((t = s(t, s(s(n ^ (e | ~i), r), a))) << o | t >>> 32 - o, e) } function o(t) {
var e, n = "", i = "";

for (e = 0;
e <= 3;
e++)
n += (i = "0" + (i = t >>> 8 * e & 255).toString(16)).substr(i.length - 2, 2);
return n }
var a, l, u, c, f, h, d, p, y = function (t) { 
for (var e, n = t.length, i = 16 * (((e = n + 8) - e % 64) / 64 + 1), r = Array(i - 1), o = 0, a = 0;
a < n;)
o = a % 4 * 8, r[e = (a - a % 4) / 4] |= t.charCodeAt(a) << o, a++;
return r[(a - a % 4) / 4] |= 128 << a % 4 * 8, r[i - 2] = n << 3, r[i - 1] = n >>> 29, r }(t = function (t) { t = t.replace(/\r\n/g, "\n");

for (var e = "", n = 0;
n < t.length;
n++) {
var i = t.charCodeAt(n);
i < 128 ? e += String.fromCharCode(i) : (127 < i && i < 2048 ? e += String.fromCharCode(i >> 6 | 192) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128)), e += String.fromCharCode(63 & i | 128)) }
return e }(t));

for (f = 1732584193, h = 4023233417, d = 2562383102, p = 271733878, t = 0;
t < y.length;
t += 16)
h = r(h = r(h = r(h = r(h = i(h = i(h = i(h = i(h = n(h = n(h = n(h = n(h = e(h = e(h = e(h = e(l = h, d = e(u = d, p = e(c = p, f = e(a = f, h, d, p, y[t + 0], 7, 3614090360), h, d, y[t + 1], 12, 3905402710), f, h, y[t + 2], 17, 606105819), p, f, y[t + 3], 22, 3250441966), d = e(d, p = e(p, f = e(f, h, d, p, y[t + 4], 7, 4118548399), h, d, y[t + 5], 12, 1200080426), f, h, y[t + 6], 17, 2821735955), p, f, y[t + 7], 22, 4249261313), d = e(d, p = e(p, f = e(f, h, d, p, y[t + 8], 7, 1770035416), h, d, y[t + 9], 12, 2336552879), f, h, y[t + 10], 17, 4294925233), p, f, y[t + 11], 22, 2304563134), d = e(d, p = e(p, f = e(f, h, d, p, y[t + 12], 7, 1804603682), h, d, y[t + 13], 12, 4254626195), f, h, y[t + 14], 17, 2792965006), p, f, y[t + 15], 22, 1236535329), d = n(d, p = n(p, f = n(f, h, d, p, y[t + 1], 5, 4129170786), h, d, y[t + 6], 9, 3225465664), f, h, y[t + 11], 14, 643717713), p, f, y[t + 0], 20, 3921069994), d = n(d, p = n(p, f = n(f, h, d, p, y[t + 5], 5, 3593408605), h, d, y[t + 10], 9, 38016083), f, h, y[t + 15], 14, 3634488961), p, f, y[t + 4], 20, 3889429448), d = n(d, p = n(p, f = n(f, h, d, p, y[t + 9], 5, 568446438), h, d, y[t + 14], 9, 3275163606), f, h, y[t + 3], 14, 4107603335), p, f, y[t + 8], 20, 1163531501), d = n(d, p = n(p, f = n(f, h, d, p, y[t + 13], 5, 2850285829), h, d, y[t + 2], 9, 4243563512), f, h, y[t + 7], 14, 1735328473), p, f, y[t + 12], 20, 2368359562), d = i(d, p = i(p, f = i(f, h, d, p, y[t + 5], 4, 4294588738), h, d, y[t + 8], 11, 2272392833), f, h, y[t + 11], 16, 1839030562), p, f, y[t + 14], 23, 4259657740), d = i(d, p = i(p, f = i(f, h, d, p, y[t + 1], 4, 2763975236), h, d, y[t + 4], 11, 1272893353), f, h, y[t + 7], 16, 4139469664), p, f, y[t + 10], 23, 3200236656), d = i(d, p = i(p, f = i(f, h, d, p, y[t + 13], 4, 681279174), h, d, y[t + 0], 11, 3936430074), f, h, y[t + 3], 16, 3572445317), p, f, y[t + 6], 23, 76029189), d = i(d, p = i(p, f = i(f, h, d, p, y[t + 9], 4, 3654602809), h, d, y[t + 12], 11, 3873151461), f, h, y[t + 15], 16, 530742520), p, f, y[t + 2], 23, 3299628645), d = r(d, p = r(p, f = r(f, h, d, p, y[t + 0], 6, 4096336452), h, d, y[t + 7], 10, 1126891415), f, h, y[t + 14], 15, 2878612391), p, f, y[t + 5], 21, 4237533241), d = r(d, p = r(p, f = r(f, h, d, p, y[t + 12], 6, 1700485571), h, d, y[t + 3], 10, 2399980690), f, h, y[t + 10], 15, 4293915773), p, f, y[t + 1], 21, 2240044497), d = r(d, p = r(p, f = r(f, h, d, p, y[t + 8], 6, 1873313359), h, d, y[t + 15], 10, 4264355552), f, h, y[t + 6], 15, 2734768916), p, f, y[t + 13], 21, 1309151649), d = r(d, p = r(p, f = r(f, h, d, p, y[t + 4], 6, 4149444226), h, d, y[t + 11], 10, 3174756917), f, h, y[t + 2], 15, 718787259), p, f, y[t + 9], 21, 3951481745), f = s(f, a), h = s(h, l), d = s(d, u), p = s(p, c);
return (o(f) + o(h) + o(d) + o(p)).toLowerCase() }(t) }, K.publicKeyFromString = function (t) { t = t.split("|")[0];
var e = new G;
return e.setPublic(t, "10001"), e }, K.encrypt = function (t, e, n) {
var i = "";
try { i += K.publicKeyFromString(e).encrypt(t) + "?" } catch (t) {
return { status: "Invalid public key" } }
return { status: "success", cipher: i } }, K.decrypt = function (t, e) {
var n = t.split("?");
return { status: "success", plaintext: e.decrypt(n[0]), signature: "unsigned" } }, K);
t.exports = tt }, function (t, e) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 });
var n, l, i, r, o, u, a, D = D || function (s, t) {
var e = {}, n = e.lib = {}, i = function () { }, r = n.Base = { extend: function (t) { i.prototype = this;
var e = new i;
return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function () { e.$super.init.apply(this, arguments) }), (e.init.prototype = e).$super = this, e }, create: function () {
var t = this.extend();
return t.init.apply(t, arguments), t }, init: function () { }, mixIn: function (t) { 
for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
t.hasOwnProperty("toString") && (this.toString = t.toString) }, clone: function () {
return this.init.prototype.extend(this) } }, l = n.WordArray = r.extend({ init: function (t, e) { t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length }, toString: function (t) {
return (t || a).stringify(this) }, concat: function (t) {
var e = this.words, n = t.words, i = this.sigBytes;
if (t = t.sigBytes, this.clamp(), i % 4) 
for (var r = 0;
r < t;
r++)
e[i + r >>> 2] |= (n[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 24 - (i + r) % 4 * 8;
else if (65535 < n.length) 
for (r = 0;
r < t;
r += 4)
e[i + r >>> 2] = n[r >>> 2];
else
e.push.apply(e, n);
return this.sigBytes += t, this }, clamp: function () {
var t = this.words, e = this.sigBytes;
t[e >>> 2] &= 4294967295 << 32 - e % 4 * 8, t.length = s.ceil(e / 4) }, clone: function () {
var t = r.clone.call(this);
return t.words = this.words.slice(0), t }, random: function (t) { 
for (var e = [], n = 0;
n < t;
n += 4)
e.push(4294967296 * s.random() | 0);
return new l.init(e, t) } }), o = e.enc = {}, a = o.Hex = { stringify: function (t) {
var e = t.words;
t = t.sigBytes;

for (var n = [], i = 0;
i < t;
i++) {
var r = e[i >>> 2] >>> 24 - i % 4 * 8 & 255;
n.push((r >>> 4).toString(16)), n.push((15 & r).toString(16)) }
return n.join("") }, parse: function (t) { 
for (var e = t.length, n = [], i = 0;
i < e;
i += 2)
n[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
return new l.init(n, e / 2) } }, u = o.Latin1 = { stringify: function (t) {
var e = t.words;
t = t.sigBytes;

for (var n = [], i = 0;
i < t;
i++)
n.push(String.fromCharCode(e[i >>> 2] >>> 24 - i % 4 * 8 & 255));
return n.join("") }, parse: function (t) { 
for (var e = t.length, n = [], i = 0;
i < e;
i++)
n[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
return new l.init(n, e) } }, c = o.Utf8 = { stringify: function (t) { try {
return decodeURIComponent(escape(u.stringify(t))) } catch (t) { throw Error("Malformed UTF-8 data") } }, parse: function (t) {
return u.parse(unescape(encodeURIComponent(t))) } }, f = n.BufferedBlockAlgorithm = r.extend({ reset: function () { this._data = new l.init, this._nDataBytes = 0 }, _append: function (t) { "string" == typeof t && (t = c.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes }, _process: function (t) {
var e = this._data, n = e.words, i = e.sigBytes, r = this.blockSize, o = i / (4 * r);
if (t = (o = t ? s.ceil(o) : s.max((0 | o) - this._minBufferSize, 0)) * r, i = s.min(4 * t, i), t) { 
for (var a = 0;
a < t;
a += r)
this._doProcessBlock(n, a);
a = n.splice(0, t), e.sigBytes -= i }
return new l.init(a, i) }, clone: function () {
var t = r.clone.call(this);
return t._data = this._data.clone(), t }, _minBufferSize: 0 });
n.Hasher = f.extend({ cfg: r.extend(), init: function (t) { this.cfg = this.cfg.extend(t), this.reset() }, reset: function () { f.reset.call(this), this._doReset() }, update: function (t) {
return this._append(t), this._process(), this }, finalize: function (t) {
return t && this._append(t), this._doFinalize() }, blockSize: 16, _createHelper: function (n) {
return function (t, e) {
return new n.init(e).finalize(t) } }, _createHmacHelper: function (n) {
return function (t, e) {
return new h.HMAC.init(n, e).finalize(t) } } });
var h = e.algo = {};
return e }(Math);
l = (n = D).lib.WordArray, n.enc.Base64 = { stringify: function (t) {
var e = t.words, n = t.sigBytes, i = this._map;
t.clamp(), t = [];

for (var r = 0;
r < n;
r += 3)
for (var o = (e[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 16 | (e[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255) << 8 | e[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, a = 0;
a < 4 && r + .75 * a < n;
a++)
t.push(i.charAt(o >>> 6 * (3 - a) & 63));
if (e = i.charAt(64)) 
for (;
t.length % 4;)
t.push(e);
return t.join("") }, parse: function (t) {
var e = t.length, n = this._map;
(i = n.charAt(64)) && -1 != (i = t.indexOf(i)) && (e = i);

for (var i = [], r = 0, o = 0;
o < e;
o++)
if (o % 4) {
var a = n.indexOf(t.charAt(o - 1)) << o % 4 * 2, s = n.indexOf(t.charAt(o)) >>> 6 - o % 4 * 2;
i[r >>> 2] |= (a | s) << 24 - r % 4 * 8, r++ }
return l.create(i, r) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, function (o) { function P(t, e, n, i, r, o, a) {
return ((t = t + (e & n | ~e & i) + r + a) << o | t >>> 32 - o) + e } function C(t, e, n, i, r, o, a) {
return ((t = t + (e & i | n & ~i) + r + a) << o | t >>> 32 - o) + e } function x(t, e, n, i, r, o, a) {
return ((t = t + (e ^ n ^ i) + r + a) << o | t >>> 32 - o) + e } function T(t, e, n, i, r, o, a) {
return ((t = t + (n ^ (e | ~i)) + r + a) << o | t >>> 32 - o) + e } 
for (var t = D, e = (i = t.lib).WordArray, n = i.Hasher, i = t.algo, k = [], r = 0;
r < 64;
r++)
k[r] = 4294967296 * o.abs(o.sin(r + 1)) | 0;
i = i.MD5 = n.extend({ _doReset: function () { this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878]) }, _doProcessBlock: function (t, e) { 
for (var n = 0;
n < 16;
n++) {
var i = t[a = e + n];
t[a] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8) } n = this._hash.words;
var r, o, a = t[e + 0], s = (i = t[e + 1], t[e + 2]), l = t[e + 3], u = t[e + 4], c = t[e + 5], f = t[e + 6], h = t[e + 7], d = t[e + 8], p = t[e + 9], y = t[e + 10], m = t[e + 11], v = t[e + 12], g = t[e + 13], S = t[e + 14], b = t[e + 15], w = n[0], _ = T(_ = T(_ = T(_ = T(_ = x(_ = x(_ = x(_ = x(_ = C(_ = C(_ = C(_ = C(_ = P(_ = P(_ = P(_ = P(_ = n[1], o = P(o = n[2], r = P(r = n[3], w = P(w, _, o, r, a, 7, k[0]), _, o, i, 12, k[1]), w, _, s, 17, k[2]), r, w, l, 22, k[3]), o = P(o, r = P(r, w = P(w, _, o, r, u, 7, k[4]), _, o, c, 12, k[5]), w, _, f, 17, k[6]), r, w, h, 22, k[7]), o = P(o, r = P(r, w = P(w, _, o, r, d, 7, k[8]), _, o, p, 12, k[9]), w, _, y, 17, k[10]), r, w, m, 22, k[11]), o = P(o, r = P(r, w = P(w, _, o, r, v, 7, k[12]), _, o, g, 12, k[13]), w, _, S, 17, k[14]), r, w, b, 22, k[15]), o = C(o, r = C(r, w = C(w, _, o, r, i, 5, k[16]), _, o, f, 9, k[17]), w, _, m, 14, k[18]), r, w, a, 20, k[19]), o = C(o, r = C(r, w = C(w, _, o, r, c, 5, k[20]), _, o, y, 9, k[21]), w, _, b, 14, k[22]), r, w, u, 20, k[23]), o = C(o, r = C(r, w = C(w, _, o, r, p, 5, k[24]), _, o, S, 9, k[25]), w, _, l, 14, k[26]), r, w, d, 20, k[27]), o = C(o, r = C(r, w = C(w, _, o, r, g, 5, k[28]), _, o, s, 9, k[29]), w, _, h, 14, k[30]), r, w, v, 20, k[31]), o = x(o, r = x(r, w = x(w, _, o, r, c, 4, k[32]), _, o, d, 11, k[33]), w, _, m, 16, k[34]), r, w, S, 23, k[35]), o = x(o, r = x(r, w = x(w, _, o, r, i, 4, k[36]), _, o, u, 11, k[37]), w, _, h, 16, k[38]), r, w, y, 23, k[39]), o = x(o, r = x(r, w = x(w, _, o, r, g, 4, k[40]), _, o, a, 11, k[41]), w, _, l, 16, k[42]), r, w, f, 23, k[43]), o = x(o, r = x(r, w = x(w, _, o, r, p, 4, k[44]), _, o, v, 11, k[45]), w, _, b, 16, k[46]), r, w, s, 23, k[47]), o = T(o, r = T(r, w = T(w, _, o, r, a, 6, k[48]), _, o, h, 10, k[49]), w, _, S, 15, k[50]), r, w, c, 21, k[51]), o = T(o, r = T(r, w = T(w, _, o, r, v, 6, k[52]), _, o, l, 10, k[53]), w, _, y, 15, k[54]), r, w, i, 21, k[55]), o = T(o, r = T(r, w = T(w, _, o, r, d, 6, k[56]), _, o, b, 10, k[57]), w, _, f, 15, k[58]), r, w, g, 21, k[59]), o = T(o, r = T(r, w = T(w, _, o, r, u, 6, k[60]), _, o, m, 10, k[61]), w, _, s, 15, k[62]), r, w, p, 21, k[63]);
n[0] = n[0] + w | 0, n[1] = n[1] + _ | 0, n[2] = n[2] + o | 0, n[3] = n[3] + r | 0 }, _doFinalize: function () {
var t = this._data, e = t.words, n = 8 * this._nDataBytes, i = 8 * t.sigBytes;
e[i >>> 5] |= 128 << 24 - i % 32;
var r = o.floor(n / 4294967296);

for (e[15 + (i + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), e[14 + (i + 64 >>> 9 << 4)] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8), t.sigBytes = 4 * (e.length + 1), this._process(), e = (t = this._hash).words, n = 0;
n < 4;
n++)
i = e[n], e[n] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
return t }, clone: function () {
var t = n.clone.call(this);
return t._hash = this._hash.clone(), t } }), t.MD5 = n._createHelper(i), t.HmacMD5 = n._createHmacHelper(i) }(Math), o = (i = (r = D).lib).Base, u = i.WordArray, a = (i = r.algo).EvpKDF = o.extend({ cfg: o.extend({ keySize: 4, hasher: i.MD5, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, e) { 
for (var n = (a = this.cfg).hasher.create(), i = u.create(), r = i.words, o = a.keySize, a = a.iterations;
r.length < o;) { s && n.update(s);
var s = n.update(t).finalize(e);
n.reset();

for (var l = 1;
l < a;
l++)
s = n.finalize(s), n.reset();
i.concat(s) }
return i.sigBytes = 4 * o, i } }), r.EvpKDF = function (t, e, n) {
return a.create(n).compute(t, e) }, D.lib.Cipher || function (t) {
var e = (d = D).lib, n = e.Base, a = e.WordArray, i = e.BufferedBlockAlgorithm, r = d.enc.Base64, o = d.algo.EvpKDF, s = e.Cipher = i.extend({ cfg: n.extend(), createEncryptor: function (t, e) {
return this.create(this._ENC_XFORM_MODE, t, e) }, createDecryptor: function (t, e) {
return this.create(this._DEC_XFORM_MODE, t, e) }, init: function (t, e, n) { this.cfg = this.cfg.extend(n), this._xformMode = t, this._key = e, this.reset() }, reset: function () { i.reset.call(this), this._doReset() }, process: function (t) {
return this._append(t), this._process() }, finalize: function (t) {
return t && this._append(t), this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (i) {
return { encrypt: function (t, e, n) {
return ("string" == typeof e ? p : h).encrypt(i, t, e, n) }, decrypt: function (t, e, n) {
return ("string" == typeof e ? p : h).decrypt(i, t, e, n) } } } });
e.StreamCipher = s.extend({ _doFinalize: function () {
return this._process(!0) }, blockSize: 1 });
var l = d.mode = {}, u = function (t, e, n) {
var i = this._iv;
i ? this._iv = void 0 : i = this._prevBlock;

for (var r = 0;
r < n;
r++)
t[e + r] ^= i[r] }, c = (e.BlockCipherMode = n.extend({ createEncryptor: function (t, e) {
return this.Encryptor.create(t, e) }, createDecryptor: function (t, e) {
return this.Decryptor.create(t, e) }, init: function (t, e) { this._cipher = t, this._iv = e } })).extend();
c.Encryptor = c.extend({ processBlock: function (t, e) {
var n = this._cipher, i = n.blockSize;
u.call(this, t, e, i), n.encryptBlock(t, e), this._prevBlock = t.slice(e, e + i) } }), c.Decryptor = c.extend({ processBlock: function (t, e) {
var n = this._cipher, i = n.blockSize, r = t.slice(e, e + i);
n.decryptBlock(t, e), u.call(this, t, e, i), this._prevBlock = r } }), l = l.CBC = c, c = (d.pad = {}).Pkcs7 = { pad: function (t, e) { 
for (var n, i = (n = (n = 4 * e) - t.sigBytes % n) << 24 | n << 16 | n << 8 | n, r = [], o = 0;
o < n;
o += 4)
r.push(i);
n = a.create(r, n), t.concat(n) }, unpad: function (t) { t.sigBytes -= 255 & t.words[t.sigBytes - 1 >>> 2] } }, e.BlockCipher = s.extend({ cfg: s.cfg.extend({ mode: l, padding: c }), reset: function () { s.reset.call(this);
var t = (e = this.cfg).iv, e = e.mode;
if (this._xformMode == this._ENC_XFORM_MODE)
var n = e.createEncryptor;
else
n = e.createDecryptor, this._minBufferSize = 1;
this._mode = n.call(e, this, t && t.words) }, _doProcessBlock: function (t, e) { this._mode.processBlock(t, e) }, _doFinalize: function () {
var t = this.cfg.padding;
if (this._xformMode == this._ENC_XFORM_MODE) { t.pad(this._data, this.blockSize);
var e = this._process(!0) }
else
e = this._process(!0), t.unpad(e);
return e }, blockSize: 4 });
var f = e.CipherParams = n.extend({ init: function (t) { this.mixIn(t) }, toString: function (t) {
return (t || this.formatter).stringify(this) } }), h = (l = (d.format = {}).OpenSSL = { stringify: function (t) {
var e = t.ciphertext;
return ((t = t.salt) ? a.create([1398893684, 1701076831]).concat(t).concat(e) : e).toString(r) }, parse: function (t) {
var e = (t = r.parse(t)).words;
if (1398893684 == e[0] && 1701076831 == e[1]) {
var n = a.create(e.slice(2, 4));
e.splice(0, 4), t.sigBytes -= 16 }
return f.create({ ciphertext: t, salt: n }) } }, e.SerializableCipher = n.extend({ cfg: n.extend({ format: l }), encrypt: function (t, e, n, i) { i = this.cfg.extend(i);
var r = t.createEncryptor(n, i);
return e = r.finalize(e), r = r.cfg, f.create({ ciphertext: e, key: n, iv: r.iv, algorithm: t, mode: r.mode, padding: r.padding, blockSize: t.blockSize, formatter: i.format }) }, decrypt: function (t, e, n, i) {
return i = this.cfg.extend(i), e = this._parse(e, i.format), t.createDecryptor(n, i).finalize(e.ciphertext) }, _parse: function (t, e) {
return "string" == typeof t ? e.parse(t, this) : t } })), d = (d.kdf = {}).OpenSSL = { execute: function (t, e, n, i) {
return i || (i = a.random(8)), t = o.create({ keySize: e + n }).compute(t, i), n = a.create(t.words.slice(e), 4 * n), t.sigBytes = 4 * e, f.create({ key: t, iv: n, salt: i }) } }, p = e.PasswordBasedCipher = h.extend({ cfg: h.cfg.extend({ kdf: d }), encrypt: function (t, e, n, i) {
return n = (i = this.cfg.extend(i)).kdf.execute(n, t.keySize, t.ivSize), i.iv = n.iv, (t = h.encrypt.call(this, t, e, n.key, i)).mixIn(n), t }, decrypt: function (t, e, n, i) {
return i = this.cfg.extend(i), e = this._parse(e, i.format), n = i.kdf.execute(n, t.keySize, t.ivSize, e.salt), i.iv = n.iv, h.decrypt.call(this, t, e, n.key, i) } }) }(), function () { 
for (var t = D, e = t.lib.BlockCipher, n = t.algo, a = [], i = [], r = [], o = [], s = [], l = [], u = [], c = [], f = [], h = [], d = [], p = 0;
p < 256;
p++)
d[p] = p < 128 ? p << 1 : p << 1 ^ 283;
var y = 0, m = 0;

for (p = 0;
p < 256;
p++) {
var v = (v = m ^ m << 1 ^ m << 2 ^ m << 3 ^ m << 4) >>> 8 ^ 255 & v ^ 99;
a[y] = v;
var g = d[i[v] = y], S = d[g], b = d[S], w = 257 * d[v] ^ 16843008 * v;
r[y] = w << 24 | w >>> 8, o[y] = w << 16 | w >>> 16, s[y] = w << 8 | w >>> 24, l[y] = w, w = 16843009 * b ^ 65537 * S ^ 257 * g ^ 16843008 * y, u[v] = w << 24 | w >>> 8, c[v] = w << 16 | w >>> 16, f[v] = w << 8 | w >>> 24, h[v] = w, y ? (y = g ^ d[d[d[b ^ g]]], m ^= d[d[m]]) : y = m = 1 }
var _ = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
n = n.AES = e.extend({ _doReset: function () { 
for (var t = (n = this._key).words, e = n.sigBytes / 4, n = 4 * ((this._nRounds = e + 6) + 1), i = this._keySchedule = [], r = 0;
r < n;
r++)
if (r < e) i[r] = t[r];
else
{
var o = i[r - 1];
r % e ? 6 < e && 4 == r % e && (o = a[o >>> 24] << 24 | a[o >>> 16 & 255] << 16 | a[o >>> 8 & 255] << 8 | a[255 & o]) : (o = a[(o = o << 8 | o >>> 24) >>> 24] << 24 | a[o >>> 16 & 255] << 16 | a[o >>> 8 & 255] << 8 | a[255 & o], o ^= _[r / e | 0] << 24), i[r] = i[r - e] ^ o } 
for (t = this._invKeySchedule = [], e = 0;
e < n;
e++)
r = n - e, o = e % 4 ? i[r] : i[r - 4], t[e] = e < 4 || r <= 4 ? o : u[a[o >>> 24]] ^ c[a[o >>> 16 & 255]] ^ f[a[o >>> 8 & 255]] ^ h[a[255 & o]] }, encryptBlock: function (t, e) { this._doCryptBlock(t, e, this._keySchedule, r, o, s, l, a) }, decryptBlock: function (t, e) {
var n = t[e + 1];
t[e + 1] = t[e + 3], t[e + 3] = n, this._doCryptBlock(t, e, this._invKeySchedule, u, c, f, h, i), n = t[e + 1], t[e + 1] = t[e + 3], t[e + 3] = n }, _doCryptBlock: function (t, e, n, i, r, o, a, s) { 
for (var l = this._nRounds, u = t[e] ^ n[0], c = t[e + 1] ^ n[1], f = t[e + 2] ^ n[2], h = t[e + 3] ^ n[3], d = 4, p = 1;
p < l;
p++) {
var y = i[u >>> 24] ^ r[c >>> 16 & 255] ^ o[f >>> 8 & 255] ^ a[255 & h] ^ n[d++], m = i[c >>> 24] ^ r[f >>> 16 & 255] ^ o[h >>> 8 & 255] ^ a[255 & u] ^ n[d++], v = i[f >>> 24] ^ r[h >>> 16 & 255] ^ o[u >>> 8 & 255] ^ a[255 & c] ^ n[d++];
h = i[h >>> 24] ^ r[u >>> 16 & 255] ^ o[c >>> 8 & 255] ^ a[255 & f] ^ n[d++], u = y, c = m, f = v } y = (s[u >>> 24] << 24 | s[c >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[255 & h]) ^ n[d++], m = (s[c >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[h >>> 8 & 255] << 8 | s[255 & u]) ^ n[d++], v = (s[f >>> 24] << 24 | s[h >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & c]) ^ n[d++], h = (s[h >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[c >>> 8 & 255] << 8 | s[255 & f]) ^ n[d++], t[e] = y, t[e + 1] = m, t[e + 2] = v, t[e + 3] = h }, keySize: 8 });
t.AES = e._createHelper(n) }(), e.default = D }, function (t, e) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 });
var n = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }();
var i = function () {
if ("undefined" != typeof Symbol)
return function () { function t() { !function (t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, t) }
return n(t, [{ key: "createClientObject", value: function (t, e, n, i) {
return { socket: t, id: e, playURL: n, deviceSerial: i.deviceSerial || "", verificationCode: i.verificationCode || "", resolve: null, reject: null } } }, { key: "playCmd", value: function (t) {
var e = { sequence: 0, cmd: "realplay", deviceSerial: t.deviceSerial, verificationCode: t.verificationCode, url: t.playURL };
return JSON.stringify(e) } }, { key: "playbackCmd", value: function (t, e, n) {
var i = { sequence: 0, cmd: "playback", deviceSerial: t.deviceSerial, verificationCode: t.verificationCode, url: t.playURL, startTime: e, endTime: n };
return JSON.stringify(i) } }]), t }() }();
e.LocalService = i }, function (t, e) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 });
var n = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }();
var s = 28944, l = 28945, u = 29217, c = 29280, h = 29281, d = 29282, p = 8193, y = !1, m = !1, v = { id: null, cmd: null, data: null, errorCode: 0, status: null };
e.JSPlayCtrl = function () { function o(t, e, a) {
if (function (t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }(this, o), null == t || void 0 === t || "string" != typeof t)
return 1;
if (this.szBasePath = t, !e || "function" != typeof e)
return 1;
this.fnCallBack = e, this.decodeWorker = null, this.streamOpenMode = null, this.bOpenStream = !1, this.audioRenderer = null, this.aAudioBuffer = [], this.iAudioBufferSize = 0, this.oSuperRender = null, this.aVideoFrameBuffer = [], this.YUVBufferSize = 1, this.szOSDTime = null, this.bPlaySound = !1, this.bPlay = !1, this.bPause = !1, this.bOnebyOne = !1, this.bPlayRateChange = !1, this.bAudioTypeSupport = !0, this.dataCallBackFun = null, this.nWidth = 0, this.nHeight = 0, this.sCanvasId = null, this.aDisplayBuf = null, this.bVisibility = !0, this.nDecFrameType = 0, this.iCanvasWidth = 0, this.iCanvasHeight = 0, this.iZoomNum = 0, this.iRatio_x = 1, this.iRatio_y = 1, this.stDisplayRect = { top: 0, left: 0, right: 0, bottom: 0 }, this.stYUVRect = { top: 0, left: 0, right: 0, bottom: 0 }, this.aInputDataLens = [], this.aInputDataBuffer = [], this.bIsGetYUV = !1, this.bIsFirstFrame = !0, this.iInputMaxBufSize = 5242880, this.bIsInput = !1, this.bIsInputBufOver = !1, this.iInputDataLen = 5e3;
var f = this;
if (this.setCallBack = function (t, e, n, i, r) {
var o = v;
o.id = a, o.cmd = e, o.data = n, o.errorCode = i, o.status = r, t.fnCallBack(o) }, !y) { y = !0;
var n = document.createElement("script");
n.type = "text/javascript", n.src = f.szBasePath + "AudioRenderer.js", document.getElementsByTagName("head")[0].appendChild(n), n.onload = n.onreadystatechange = function () { !this.readyState || "loaded" === this.readyState || this.readyState } }
if (!m) { m = !0;
var i = document.createElement("script");
i.type = "text/javascript", i.src = f.szBasePath + "SuperRender_10.js", document.getElementsByTagName("head")[0].appendChild(i), i.onload = i.onreadystatechange = function () { !this.readyState || "loaded" === this.readyState || this.readyState };
var r = document.createElement("script");
r.type = "text/javascript", r.src = f.szBasePath + "SuperRender_20.js", document.getElementsByTagName("head")[0].appendChild(r), r.onload = r.onreadystatechange = function () { !this.readyState || "loaded" === this.readyState || this.readyState } } this.convertErrorCode = function (t) { switch (t) { case 1:
return 0;
case 98:
return 1;
default:
return t } }, this.checkAudioType = function (t) {
var e, n, i = [t[12], t[13], 0, 0];
switch (255 & (e = i)[n = 0] | (255 & e[n + 1]) << 8 | (255 & e[n + 2]) << 16 | (255 & e[n + 3]) << 24) { case l: case s: case u: case d: case h: case c: case p:
return 0;
default:
return 16 } }, this.arrayBufferCopy = function (t) {
var e = t.byteLength, n = new Uint8Array(e), i = new Uint8Array(t), r = 0;

for (r = 0;
r < e;
r++)
n[r] = i[r];
return n }, this.inputDataFun = function () {
var t, e = 0;
if (f.bIsGetYUV = !1, f.bIsInputBufOver) t = new Uint8Array(1);
else
{ 
for (;
0 < f.aInputDataLens.length && !((e += f.aInputDataLens.shift()) > f.iInputDataLen););
t = f.aInputDataBuffer.splice(0, e) }
var n = new Uint8Array(t), i = { command: "InputData", data: n.buffer, dataSize: e };
f.bPlay && (f.bPause ? f.bOnebyOne && f.decodeWorker.postMessage(i, [i.data]) : f.decodeWorker.postMessage(i, [i.data])), n = t = null }, this.getPic = function (t, e) {
if (null == this.decodeWorker || null == this.oSuperRender)
return 2;
if (!this.bPlay)
return 2;
if (!t || "function" != typeof t)
return 1;
if (this.dataCallBackFun = t, 0 === this.iZoomNum) this.stYUVRect.left = 0, this.stYUVRect.top = 0, this.stYUVRect.right = 0, this.stYUVRect.bottom = 0;
else
{
if (0 === this.iCanvasWidth || 0 === this.iCanvasHeight) this.stYUVRect.left = 0, this.stYUVRect.top = 0, this.stYUVRect.right = 0, this.stYUVRect.bottom = 0;
else
{
var n = this.nWidth / this.iCanvasWidth, i = this.nHeight / this.iCanvasHeight;
this.stYUVRect.left = Math.round(this.stDisplayRect.left * n), this.stYUVRect.top = Math.round(this.stDisplayRect.top * i), this.stYUVRect.right = Math.round(this.stDisplayRect.right * n), this.stYUVRect.bottom = Math.round(this.stDisplayRect.bottom * i) }
if (this.stYUVRect.right - this.stYUVRect.left < 32 || this.stYUVRect.bottom - this.stYUVRect.top < 32)
return 1 }
if (null == this.aDisplayBuf)
return 2;
var r = { command: e, data: this.arrayBufferCopy(this.aDisplayBuf).buffer, width: this.nWidth, height: this.nHeight, rect: this.stYUVRect };
return this.decodeWorker.postMessage(r, [r.data]), 0 }, this.createWorker = function (c) {
if (window.Worker) {
if (null == this.decodeWorker && (this.decodeWorker = new Worker(f.szBasePath + "DecodeWorker.js"), null == this.decodeWorker))
return 60;
this.decodeWorker.onmessage = function (t) {
var e = null, n = t.data;
switch (n.function) { case "loaded": e = "loaded", c.setCallBack(c, "loaded", 0, 0, !0);
break;
case "SetStreamOpenMode": e = "SetStreamOpenMode";
break;
case "OpenStream": e = "OpenStream";
break;
case "InputData": e = "InputData", 11 === n.errorCode && (f.bIsInputBufOver = !0, f.inputDataFun()), 31 === n.errorCode && (f.bIsInputBufOver = !1);
break;
case "GetFrameData":
if (e = "GetFrameData", !f.bIsFirstFrame && 31 === n.errorCode) { f.bIsInputBufOver = !1, setTimeout(f.inputDataFun(), 5);
break }
if (f.bIsInputBufOver ? f.inputDataFun() : "videoType" === n.type && (0 < f.aInputDataLens.length && f.bIsInput ? (f.inputDataFun(), f.bIsInput = !1) : f.bIsGetYUV = !0, f.bIsFirstFrame = !1), f.bVisibility) switch (n.type) { case "videoType":
if (null == n.data || null == n.frameInfo)
return 1;
f.bIsFirstFrame = !1, c.nWidth = n.frameInfo.width, c.nHeight = n.frameInfo.height;
var i = new Object;
if (i.data = n.data, i.osdTime = n.osd, c.aVideoFrameBuffer.push(i), i = null, 20 < c.aVideoFrameBuffer.length && (c.bOnebyOne || c.aVideoFrameBuffer.splice(0, 5)), c.bOnebyOne && 15 <= c.aVideoFrameBuffer.length) { c.setCallBack(c, "OnebyOne", 0, 0, !1), c.bIsFirstFrame = !0;
break }
break;
case "audioType":
if (c.bPlaySound && !c.bPlayRateChange) { 
for (var r = new Uint8Array(n.data), o = c.aAudioBuffer.length, a = 0, s = r.length;
a < s;
a++)
c.aAudioBuffer[o + a] = r[a];
c.iAudioBufferSize++ , r = null, 25 <= c.iAudioBufferSize && (c.audioRenderer.Play(c.aAudioBuffer, c.aAudioBuffer.length, n.frameInfo), c.aAudioBuffer.splice(0, c.aAudioBuffer.length), c.aAudioBuffer.length = 0, c.iAudioBufferSize = 0) } }break;
case "PlaySound": e = "PlaySound";
break;
case "GetJPEG": e = "GetJPEG";
var l = n.data;
c.dataCallBackFun(l);
break;
case "GetBMP": e = "GetBMP";
var u = n.data;
c.dataCallBackFun(u) }"GetFrameData" !== e ? c.setCallBack(c, e, 0, c.convertErrorCode(n.errorCode), !0) : 16 === n.errorCode && c.setCallBack(c, e, 0, c.convertErrorCode(n.errorCode), !0) } } }, this.createWorker(f), this.draw = function () {
if (f.bPlay) { f.bPause || requestAnimationFrame(f.draw);
var t = f.aVideoFrameBuffer.length;
if (f.bOnebyOne && t <= 8 && f.setCallBack(f, "OnebyOne", 0, 31, !0), t > f.YUVBufferSize) {
var e = f.aVideoFrameBuffer.shift();
f.aDisplayBuf = e.data;
var n = new Uint8Array(f.aDisplayBuf);
f.oSuperRender.SR_DisplayFrameData(f.nWidth, f.nHeight, n), n = null, f.szOSDTime = e.osdTime, e = null } }
else
f.bPlay || (f.aVideoFrameBuffer.splice(0, f.aVideoFrameBuffer.length), f.aAudioBuffer.splice(0, f.aAudioBuffer.length)) } }
return n(o, [{ key: "PlayM4_SetStreamOpenMode", value: function (t) {
return null == t || void 0 === t ? 1 : 0 !== t && 1 !== t ? 1 : (this.streamOpenMode = t, 0) } }, { key: "PlayM4_OpenStream", value: function (t, e, n) {
if (null == this.decodeWorker)
return 2;
if (null == t || e <= 0 || n <= 0)
return 1;
var i = this.checkAudioType(t);
return this.bAudioTypeSupport = 0 === i, this.bPlay = !1, this.bPause = !1, this.bOnebyOne = !1, this.bIsFirstFrame = !0, this.bIsGetYUV = !1, this.bIsInput = !1, this.decodeWorker.postMessage({ command: "SetStreamOpenMode", data: this.streamOpenMode }), this.decodeWorker.postMessage({ command: "OpenStream", data: t, dataSize: e, bufPoolSize: n }), this.bOpenStream = !0, 0 } }, { key: "PlayM4_CloseStream", value: function () {
return null === this.decodeWorker || !1 === this.bOpenStream ? 2 : (this.PlayM4_Stop(), this.decodeWorker.postMessage({ command: "CloseStream" }), null !== this.oSuperRender && (this.oSuperRender.SR_Destroy(), this.oSuperRender = null), null !== this.audioRenderer && (this.audioRenderer.Stop(), this.audioRenderer = null), this.aAudioBuffer.splice(0, this.aAudioBuffer.length), this.aVideoFrameBuffer.splice(0, this.aVideoFrameBuffer.length), this.aInputDataBuffer.splice(0, this.aInputDataBuffer.length), this.aInputDataLens.splice(0, this.aInputDataLens.length), this.bOpenStream = !1, this.iAudioBufferSize = 0) } }, { key: "PlayM4_Destroy", value: function () {
return null === this.decodeWorker || (this.PlayM4_CloseStream(), this.decodeWorker.terminate(), this.decodeWorker = null), 0 } }, { key: "PlayM4_InputData", value: function (t, e) {
if (null === this.decodeWorker || !1 === this.bOpenStream)
return 2;
var n = this.aInputDataBuffer.length;
if (4 === e) {
var i = new Uint8Array(t.buffer);
if (1 === i[0] && 2 === i[1] && 3 === i[2] && 4 === i[3])
return this.bIsFirstFrame ? this.inputDataFun() : this.bIsGetYUV ? this.inputDataFun() : this.bIsInput = !0, i = null, 0 }
if (n > this.iInputMaxBufSize)
return 11;
var r = null, o = e;
switch (this.streamOpenMode) { case 1: r = new Uint8Array(t.buffer), this.aInputDataLens.push(e);
break;
case 0: o = e + 4;
var a = new Uint32Array([e]), s = new Uint8Array(a.buffer);
(r = new Uint8Array(o)).set(s, 0), r.set(t, 4), s = a = null, this.aInputDataLens.push(e + 4);
break;
default:
return 16 }
for (var l = 0;
l < o;
l++)
this.aInputDataBuffer[n + l] = r[l];
return r = null, this.bIsFirstFrame ? this.inputDataFun() : this.bIsGetYUV ? this.inputDataFun() : this.bIsInput = !0, 0 } }, { key: "PlayM4_Play", value: function (t) {
if (null === this.decodeWorker || !1 === this.bOpenStream)
return 2;
if (null !== t && "string" != typeof t)
return 1;
if (this.bOnebyOne && (this.bPlayRateChange = !1, this.bOnebyOne = !1, this.bPause = !1, this.draw()), this.bPlay)
return 0;
if (null == this.oSuperRender) {
var e = document.getElementById(t).getContext("webgl2");
if (this.oSuperRender = e ? new SuperRender2(t, this.szBasePath) : new SuperRender(t, this.szBasePath), null == this.oSuperRender)
return 61 }
return null == this.audioRenderer && (this.audioRenderer = new AudioRenderer, null == this.audioRenderer) ? 61 : (this.sCanvasId = t, this.bPlay = !0, this.bPause = !1, this.bOnebyOne = !1, this.bPlaySound = !1, this.bPlayRateChange = !1, this.draw(), 0) } }, { key: "PlayM4_Stop", value: function () {
return null == this.decodeWorker || null == this.oSuperRender ? 2 : this.bPlay ? (this.bPlaySound && (this.PlayM4_StopSound(), this.bPlaySound = !0), this.bPlay = !1, this.bOnebyOne = !1, this.bPause = !1, this.oSuperRender.SR_SetDisplayRect(null), this.iZoomNum = 0, this.oSuperRender.SR_DisplayFrameData(this.nWidth, this.nHeight, null), 0) : 2 } }, { key: "PlayM4_PlayRate", value: function (t) {
return null == this.decodeWorker ? 2 : (this.bPlayRateChange = 1 !== t, t < 1 && (t = 1), this.iInputDataLen = 5e3 * t, 0) } }, { key: "PlayM4_Pause", value: function (t) {
return null == this.decodeWorker || null == this.oSuperRender ? 2 : this.bPlay ? this.bOnebyOne ? 2 : "boolean" != typeof t ? 1 : (this.bPause = t, this.bIsFirstFrame = !0, t ? this.bPlaySound && (this.PlayM4_StopSound(), this.bPlaySound = !0) : (this.bPlaySound && this.PlayM4_PlaySound(), this.draw()), 0) : 2 } }, { key: "PlayM4_OneByOne", value: function () {
return null == this.decodeWorker || null == this.oSuperRender ? 2 : this.bPlay ? (this.iInputDataLen = 5e3, this.bPause = !0, this.bOnebyOne = !0, this.bPlayRateChange = !0, this.draw(), 0) : 2 } }, { key: "PlayM4_PlaySound", value: function (t) {
return null === this.decodeWorker || !1 === this.bOpenStream ? 2 : this.bAudioTypeSupport ? t < 0 || 16 < t ? 1 : null == this.audioRenderer && (this.audioRenderer = new AudioRenderer, null == this.audioRenderer) ? 61 : (this.audioRenderer.SetWndNum(t), this.bPlaySound = !0, 0) : 16 } }, { key: "PlayM4_StopSound", value: function () {
return null == this.decodeWorker || null == this.audioRenderer ? 2 : this.bPlaySound ? (this.bPlaySound = !1, 0) : 2 } }, { key: "PlayM4_SetDisplayBuf", value: function (t) {
return null == this.decodeWorker ? 2 : t <= 0 ? 1 : (this.YUVBufferSize = t, 0) } }, { key: "PlayM4_SetSecretKey", value: function (t, e, n) {
if (null == this.decodeWorker || !1 === this.bOpenStream)
return 2;
if (null == e)
return 1;
if (1 === t) {
if (128 !== n)
return 1;
if (null == e || void 0 === e)
return 1 }
else if (0 !== t)
return 1;
return this.decodeWorker.postMessage({ command: "SetSecretKey", data: e, nKeyType: t, nKeyLen: n }), 0 } }, { key: "PlayM4_SetDecodeFrameType", value: function (t) {
return null == this.decodeWorker || null == this.oSuperRender ? 2 : 0 !== t && 1 !== t ? 1 : (this.nDecFrameType = t, this.decodeWorker.postMessage({ command: "SetDecodeFrameType", data: t }), 0) } }, { key: "PlayM4_SetIFrameDecInterval", value: function (t) {
return 1 !== this.nDecFrameType ? 2 : t < 0 ? 1 : (this.decodeWorker.postMessage({ command: "SetIFrameDecInterval", data: t }), 0) } }, { key: "PlayM4_SetDisplayRegion", value: function (t, e) {
if (null === this.decodeWorker || !1 === this.bPlay || null === this.oSuperRender)
return 2;
if (null === this.canvasId)
return 2;
if (!0 === e) {
if (null == t)
return 1;
if ("number" != typeof t.left || "number" != typeof t.top || "number" != typeof t.right || "number" != typeof t.bottom)
return 1;
if (t.right < 0 || t.left < 0 || t.top < 0 || t.bottom < 0)
return 1;
var n = t.left, i = t.right, r = t.top, o = t.bottom;
if (i - n < 16 || o - r < 16 || i - n > this.nWidth || o - r > this.nHeight)
return 1;
var a = document.getElementById(this.sCanvasId).getBoundingClientRect();
this.iCanvasWidth = a.width, this.iCanvasHeight = a.height, 0 !== this.iZoomNum && (n = Math.round(n / this.iRatio_x) + this.stDisplayRect.left, r = Math.round(r / this.iRatio_y) + this.stDisplayRect.top, i = Math.round(i / this.iRatio_x) + this.stDisplayRect.left, o = Math.round(o / this.iRatio_y) + this.stDisplayRect.top), this.stDisplayRect = { top: r, left: n, right: i, bottom: o }, this.oSuperRender.SR_SetDisplayRect(this.stDisplayRect);
var s = i - n, l = o - r;
this.iRatio_x = this.iCanvasWidth / s, this.iRatio_y = this.iCanvasHeight / l, this.iZoomNum++ }
else
this.oSuperRender.SR_SetDisplayRect(null), this.iZoomNum = 0;
return (this.bPause || this.bOnebyOne || this.bPlayRateChange) && this.oSuperRender.SR_DisplayFrameData(this.nWidth, this.nHeight, new Uint8Array(this.aDisplayBuf)), 0 } }, { key: "PlayM4_GetBMP", value: function (t) {
return this.getPic(t, "GetBMP") } }, { key: "PlayM4_GetJPEG", value: function (t) {
return this.getPic(t, "GetJPEG") } }, { key: "PlayM4_SetVolume", value: function (t) {
return null == this.decodeWorker ? 2 : null == this.audioRenderer ? 2 : t < 0 || 100 < t ? 1 : (this.audioRenderer.SetVolume(t / 100), 0) } }, { key: "PlayM4_GetVolume", value: function (t) {
if (null == this.decodeWorker)
return 2;
if (null == this.audioRenderer)
return 2;
if (t && "function" == typeof t) {
var e = this.audioRenderer.GetVolume();
return null === e ? 63 : (t(10 * Math.round(10 * e)), 0) }
return 1 } }, { key: "PlayM4_GetOSDTime", value: function (t) {
return null == this.decodeWorker ? 2 : this.bPlay ? t && "function" == typeof t ? (t(this.szOSDTime), 0) : 1 : 2 } }, { key: "PlayM4_IsVisible", value: function (t) {
return this.bVisibility = t, 0 } }, { key: "PlayM4_GetSdkVersion", value: function () {
return "07020115" } }, { key: "PlayM4_GetInputBufSize", value: function () {
return this.aInputDataBuffer.length } }, { key: "PlayM4_SetInputBufSize", value: function (t) {
return 0 < t ? (this.iInputMaxBufSize = t, 0) : 1 } }, { key: "PlayM4_GetYUVBufSize", value: function () {
return this.aVideoFrameBuffer.length } }, { key: "PlayM4_ClearCanvas", value: function () {
return null == this.oSuperRender ? 2 : (this.oSuperRender.SR_DisplayFrameData(this.nWidth, this.nHeight, null), 0) } }, { key: "PlayM4_ReleaseInputBuffer", value: function () {
return null === this.aInputDataBuffer ? 2 : (this.aInputDataBuffer.splice(0, this.aInputDataBuffer.length), this.aInputDataLens.splice(0, this.aInputDataLens.length), 0) } }, { key: "PlayM4_GetDecodeFrameType", value: function () {
return this.nDecFrameType } }]), o }() }, function (t, e, n) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 }), e.StorageManager = void 0;
var i, o = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }(), r = n(3), c = (i = r) && i.__esModule ? i : { default: i }, a = n(1);
function l(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem, window.URL = window.URL || window.webkitURL;
var u = function () { function r(t, e, n, i) { l(this, r), this.szUUID = t, this.szFileName = e, this.iStreamType = n, this.szPath = "", this.bStart = !1, this.aStreamList = [], this.options = i }
return o(r, [{ key: "init", value: function () {
var n = this;
0 === this.iStreamType ? this.szPath = "Web/RecordFiles/" : 1 === this.iStreamType && (this.szPath = "Web/PlaybackFiles/"), this.szPath += this.getDateDir();
var i = n.szPath.split("/");
return new Promise(function (e) { window.requestFileSystem(window.TEMPORARY, n.options.iFileSize, function (t) { n.createDir(t.root, i, function () { e() }) }, n.errorHandler) }) } }, { key: "getDateDir", value: function () {
return a.oTool.dateFormat(new Date, "yyyy-MM-dd") } }, { key: "createDir", value: function (t, e, n) {
var i = this;
e.length ? t.getDirectory(e[0], { create: !0 }, function (t) { i.createDir(t, e.slice(1), n) }, i.errorHandler) : n() } }, { key: "errorHandler", value: function () { } }, { key: "writeFileHeader", value: function (n) {
var i = this;
window.requestFileSystem(window.TEMPORARY, i.options.iFileSize, function (t) { t.root.getFile(i.szPath + "/" + i.szFileName, { create: !0 }, function (t) { t.createWriter(function (t) { t.onwriteend = function () { i.bStart = !0, i.writeFile(t) }, t.onerror = function () { }, t.seek(t.length);
var e = new Blob([n]);
t.write(e) }, i.errorHandler) }, i.errorHandler) }, i.errorHandler) } }, { key: "writeFileContent", value: function (t) { this.aStreamList.push(t) } }, { key: "writeFile", value: function (t) {
var e = this;
if (this.bStart)
if (0 < this.aStreamList.length) {
var n = this.aStreamList.shift();
if (t.seek(t.length), t.length >= this.options.iFileSize)
return void (this.options.cbEventHandler && this.options.cbEventHandler(3001, this.szUUID));
var i = new Blob([n]);
t.write(i) }
else
setTimeout(function () { e.writeFile(t) }, 1e3) } }, { key: "stopWriteFile", value: function () {
var n = this;
return this.bStart = !1, this.aStreamList.length = 0, new Promise(function (e) { window.requestFileSystem(window.TEMPORARY, n.options.iFileSize, function (t) { t.root.getFile(n.szPath + "/" + n.szFileName, { create: !1 }, function (t) { t.file(function (t) { e(), a.oTool.downloadFile(t, t.name) }) }, n.errorHandler) }, n.errorHandler) }) } }]), r }(), f = function () { function s(t, e, n, i, r, o, a) { l(this, s), this.szBasePath = t, this.szUUID = e, this.szFileName = n, this.aHeadBuf = new Uint8Array(i), this.iPackType = r, this.iStreamType = o, this.oWorker = null, this.oFileSystem = null, this.options = a }
return o(s, [{ key: "init", value: function () {
var n = this;
return new Promise(function (t, e) { n.initFileSystem().then(function () { n.initWorker().then(function () { t(n.szUUID) }, function (t) { e(t) }) }, function (t) { e(t) }) }) } }, { key: "initFileSystem", value: function () {
var n = this;
return this.oFileSystem = new u(this.szUUID, this.szFileName, this.iStreamType, this.options), new Promise(function (t, e) { n.oFileSystem.init().then(function () { t() }, function (t) { e(t) }) }) } }, { key: "initWorker", value: function () {
var r = this;
return new Promise(function (i) { r.oWorker = new Worker(r.szBasePath + "/systemTransform-worker.min.js"), r.oWorker.onmessage = function (t) {
var e = t.data;
if ("loaded" === e.type) r.oWorker.postMessage({ type: "create", buf: r.aHeadBuf.buffer, len: 40, packType: r.iPackType }, [r.aHeadBuf.buffer]);
else if ("created" === e.type) i();
else if ("outputData" === e.type) {
var n = new Uint8Array(e.buf);
1 === e.dType ? r.oFileSystem.writeFileHeader(n) : r.oFileSystem.writeFileContent(n) } } }) } }, { key: "inputData", value: function (t) {
if (this.oWorker) {
var e = new Uint8Array(t);
this.oWorker.postMessage({ type: "inputData", buf: e.buffer, len: e.length }, [e.buffer]) } } }, { key: "stopRecord", value: function () {
var n = this;
return new Promise(function (t, e) { n.oWorker ? n.oWorker.postMessage({ type: "release" }) : e(), n.oFileSystem ? n.oFileSystem.stopWriteFile().then(function () { t() }, function () { e() }) : e() }) } }]), s }(), s = function () {
if ("undefined" != typeof Symbol) {
var u = Symbol("STORAGELIST");
return function () { function n(t, e) { l(this, n), this.szBasePath = t, this[u] = {}, this.options = { iFileSize: 1073741824 }, Object.assign(this.options, e) }
return o(n, [{ key: "startRecord", value: function (t, e, n, i, r) {
var o = this, a = c.default.v4(), s = Object.assign({}, this.options, r), l = new f(this.szBasePath, a, t, e, n, i, s);
return new Promise(function (e, n) { l.init().then(function (t) { o[u][t] = l, e(t) }, function (t) { n(t) }) }) } }, { key: "inputData", value: function (t, e) {
var n = this[u][t];
n && n.inputData(e) } }, { key: "stopRecord", value: function (i) {
var r = this;
return new Promise(function (t, e) {
var n = r[u][i];
n ? n.stopRecord().then(function () { delete r[u][i], t() }, function () { e() }) : e() }) } }]), n }() } }();
e.StorageManager = s }, function (t, e, n) { "use strict";
Object.defineProperty(e, "__esModule", { value: !0 }), e.ESCanvas = void 0;
var i, l = function () { function i(t, e) { 
for (var n = 0;
n < e.length;
n++) {
var i = e[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i) } }
return function (t, e, n) {
return e && i(t.prototype, e), n && i(t, n), t } }(), r = n(17), u = (i = r) && i.__esModule ? i : { default: i };
function x(t, e) {
if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return !e || "object" != typeof e && "function" != typeof e ? t : e } function T(t, e) {
if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e) } function k(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }
var o = function () {
if ("undefined" != typeof Symbol) {
var v = null, c = Symbol("CANVAS"), g = Symbol("CONTEXT"), f = Symbol("SHAPES"), h = Symbol("DRAWSTATUS"), d = Symbol("SHAPETYPE"), p = Symbol("MAXSHAPENUMSUPPORT"), i = Symbol("SHAPESTYLE"), y = Symbol("POLYGONDRAWING"), m = Symbol("CURRENTSHAPEINFO"), S = Symbol("DRAWSHAPEMULTIONETIME"), n = Symbol("EVENTCALLBACK"), r = function () { function t() { k(this, t), this.m_szId = "", this.m_aPoint = [], this.m_bChoosed = !1, this.m_szDrawColor = v[i].szDrawColor, this.m_szFillColor = v[i].szFillColor, this.m_iTranslucent = v[i].iTranslucent, this.m_iIndexChoosePoint = -1, this.m_iDriftStartX = 0, this.m_iDriftStartY = 0, this.m_oEdgePoints = { top: { x: 0, y: 0 }, left: { x: 0, y: 0 }, right: { x: 0, y: 0 }, bottom: { x: 0, y: 0 } }, this.m_szTips = "", this.m_iEditType = 0, this.m_iMinClosed = 3, this.m_iMaxPointNum = 11, this.m_bClosed = !1 }
return l(t, [{ key: "draw", value: function () { } }, { key: "drag", value: function (t, e) {
var n = this.m_aPoint.length, i = 0;

for (i = 0;
i < n;
i++)
if (this.m_aPoint[i][0] + t - this.m_iDriftStartX > v.m_iCanvasWidth || this.m_aPoint[i][1] + e - this.m_iDriftStartY > v.m_iCanvasHeight || this.m_aPoint[i][0] + t - this.m_iDriftStartX < 0 || this.m_aPoint[i][1] + e - this.m_iDriftStartY < 0)
return this.m_iDriftStartX = t, void (this.m_iDriftStartY = e);

for (i = 0;
i < n;
i++)
this.m_aPoint[i][0] = this.m_aPoint[i][0] + t - this.m_iDriftStartX, this.m_aPoint[i][1] = this.m_aPoint[i][1] + e - this.m_iDriftStartY;
this.m_iDriftStartX = t, this.m_iDriftStartY = e, this.setPointInfo(this.m_aPoint), P() } }, { key: "stretch", value: function (t, e) { 0 === this.m_iEditType && (-1 !== this.m_iIndexChoosePoint && (this.m_aPoint[this.m_iIndexChoosePoint][0] = t, this.m_aPoint[this.m_iIndexChoosePoint][1] = e), this.setPointInfo(this.m_aPoint), P()) } }, { key: "inShape", value: function (t, e) { 
for (var n = !1, i = this.m_aPoint.length, r = 0, o = i - 1;
r < i;
o = r++)
this.m_aPoint[r][1] > e != this.m_aPoint[o][1] > e && t < (this.m_aPoint[o][0] - this.m_aPoint[r][0]) * (e - this.m_aPoint[r][1]) / (this.m_aPoint[o][1] - this.m_aPoint[r][1]) + this.m_aPoint[r][0] && (n = !n);
return n } }, { key: "inArc", value: function (t, e, n) { 
for (var i = !1, r = 0, o = this.m_aPoint.length;
r < o;
r++) {
if (Math.sqrt((t - this.m_aPoint[r][0]) * (t - this.m_aPoint[r][0]) + (e - this.m_aPoint[r][1]) * (e - this.m_aPoint[r][1])) < n) { i = !0, this.m_iIndexChoosePoint = r;
break } }
return i } }, { key: "getMouseDownPoints", value: function (t, e) { this.m_iDriftStartX = t, this.m_iDriftStartY = e } }, { key: "getPointInfo", value: function () {
return this.m_aPoint } }, { key: "setPointInfo", value: function (t) { null != t && 0 < t.length && (this.m_aPoint = t, this.setEdgePoints(t)) } }, { key: "addPoint", value: function (t, e) { this.m_aPoint.length < this.m_iMaxPointNum && this.m_aPoint.push([t, e]), this.m_aPoint.length === this.m_iMaxPointNum && this.setPointInfo(this.m_aPoint) } }, { key: "setEdgePoints", value: function (t) { 
for (var e = 0, n = t.length;
e < n;
e++)0 === e ? (this.m_oEdgePoints.top.x = t[e][0], this.m_oEdgePoints.top.y = t[e][1], this.m_oEdgePoints.left.x = t[e][0], this.m_oEdgePoints.left.y = t[e][1], this.m_oEdgePoints.right.x = t[e][0], this.m_oEdgePoints.right.y = t[e][1], this.m_oEdgePoints.bottom.x = t[e][0], this.m_oEdgePoints.bottom.y = t[e][1]) : (t[e][1] < this.m_oEdgePoints.top.y && (this.m_oEdgePoints.top.x = t[e][0], this.m_oEdgePoints.top.y = t[e][1]), t[e][0] > this.m_oEdgePoints.right.x && (this.m_oEdgePoints.right.x = t[e][0], this.m_oEdgePoints.right.y = t[e][1]), t[e][1] > this.m_oEdgePoints.bottom.y && (this.m_oEdgePoints.bottom.x = t[e][0], this.m_oEdgePoints.bottom.y = t[e][1]), t[e][0] < this.m_oEdgePoints.left.x && (this.m_oEdgePoints.left.x = t[e][0], this.m_oEdgePoints.left.y = t[e][1])) } }]), t }(), b = function (t) { function e() { k(this, e);
var t = x(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
return t.m_szType = "Rect", t }
return T(e, r), l(e, [{ key: "setPointInfo", value: function (t) {
if (null != t) { 
for (var e = t[0][0], n = t[0][1], i = t[0][0], r = t[0][1], o = 0, a = t.length;
o < a;
o++)
e > t[o][0] && (e = t[o][0]), n > t[o][1] && (n = t[o][1]), i < t[o][0] && (i = t[o][0]), r < t[o][1] && (r = t[o][1]);
this.m_aPoint = [[e, n], [i, n], [i, r], [e, r]] } } }, { key: "draw", value: function () { v[g].fillStyle = this.m_szFillColor, v[g].strokeStyle = this.m_szDrawColor;
var t = this.m_aPoint[0][0], e = this.m_aPoint[0][1], n = this.m_aPoint[2][0] - t, i = this.m_aPoint[2][1] - e;
if (v[g].globalAlpha = this.m_iTranslucent, v[g].fillRect(t, e, n, i), v[g].globalAlpha = 1, v[g].fillText(this.m_szTips, (t + this.m_aPoint[2][0]) / 2, (e + this.m_aPoint[2][1]) / 2), this.m_bChoosed) {
var r = Math.round(n / 2), o = Math.round(i / 2);
if (0 === this.m_iEditType) 
for (var a = [t, t + r, t + n, t, t + n, t, t + r, t + n], s = [e, e, e, e + o, e + o, e + i, e + i, e + i], l = 0;
l < 8;
l++)
v[g].beginPath(), v[g].arc(a[l], s[l], 3, 0, 360, !1), v[g].fillStyle = this.m_szDrawColor, v[g].closePath(), v[g].fill() } v[g].strokeRect(t, e, n, i) } }, { key: "stretch", value: function (t, e) { 0 === this.m_iEditType && (0 === this.m_iIndexChoosePoint ? t < this.m_aPoint[2][0] && e < this.m_aPoint[2][1] && (this.m_aPoint[0][0] = t, this.m_aPoint[0][1] = e, this.m_aPoint[3][0] = t, this.m_aPoint[1][1] = e) : 1 === this.m_iIndexChoosePoint ? e < this.m_aPoint[2][1] && (this.m_aPoint[0][1] = e, this.m_aPoint[1][1] = e) : 2 === this.m_iIndexChoosePoint ? t > this.m_aPoint[3][0] && e < this.m_aPoint[3][1] && (this.m_aPoint[1][0] = t, this.m_aPoint[1][1] = e, this.m_aPoint[2][0] = t, this.m_aPoint[0][1] = e) : 3 === this.m_iIndexChoosePoint ? t < this.m_aPoint[2][0] && (this.m_aPoint[0][0] = t, this.m_aPoint[3][0] = t) : 4 === this.m_iIndexChoosePoint ? t > this.m_aPoint[0][0] && (this.m_aPoint[1][0] = t, this.m_aPoint[2][0] = t) : 5 === this.m_iIndexChoosePoint ? t < this.m_aPoint[1][0] && e > this.m_aPoint[1][1] && (this.m_aPoint[3][0] = t, this.m_aPoint[3][1] = e, this.m_aPoint[0][0] = t, this.m_aPoint[2][1] = e) : 6 === this.m_iIndexChoosePoint ? e > this.m_aPoint[1][1] && (this.m_aPoint[2][1] = e, this.m_aPoint[3][1] = e) : 7 === this.m_iIndexChoosePoint && t > this.m_aPoint[0][0] && e > this.m_aPoint[0][1] && (this.m_aPoint[2][0] = t, this.m_aPoint[2][1] = e, this.m_aPoint[1][0] = t, this.m_aPoint[3][1] = e), P()) } }, { key: "move", value: function (t) { P(), this.m_bChoosed = !0;
var e = t[0][0], n = t[0][1], i = t[1][0], r = t[1][1];
this.setPointInfo([[e, n], [i, n], [i, r], [e, r]]), this.draw() } }, { key: "inArc", value: function (t, e, n) { 
for (var i = this.m_aPoint[0][0], r = this.m_aPoint[0][1], o = this.m_aPoint[2][0] - i, a = this.m_aPoint[2][1] - r, s = Math.round(o / 2), l = Math.round(a / 2), u = [i, i + s, i + o, i, i + o, i, i + s, i + o], c = [r, r, r, r + l, r + l, r + a, r + a, r + a], f = 0;
f < 8;
f++) {
if (Math.sqrt((t - u[f]) * (t - u[f]) + (e - c[f]) * (e - c[f])) < n)
return this.m_iIndexChoosePoint = f, !0 }
return !1 } }]), e }(), s = function (t) { function i(t, e) { k(this, i);
var n = x(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this));
return n.m_szType = "RectOSD", n.m_szOSDType = "overlay-date", n.m_szText = t || "", n.m_szEnabled = e || "", n.m_szDateStyle = "", n.m_szClockType = "", n.m_szDisplayWeek = "", n.m_szId = "", n }
return T(i, r), l(i, [{ key: "draw", value: function () {
if ("true" === this.m_szEnabled) {
var t = this.m_aPoint[0][0], e = this.m_aPoint[0][1], n = this.m_aPoint[2][0] - t, i = this.m_aPoint[2][1] - e;
v[g].beginPath(), v[g].strokeStyle = this.m_szDrawColor, v[g].globalAlpha = 1, v[g].rect(t, e, n, i), v[g].font = "15px serif", v[g].strokeText(this.m_szText, t, e + 15), v[g].stroke() } } }, { key: "drag", value: function (t, e) {
var n = this.m_aPoint.length, i = 0;

for (i = 0;
i < n;
i++)
if (this.m_aPoint[i][1] + e - this.m_iDriftStartY > v.m_iCanvasHeight || this.m_aPoint[i][0] + t - this.m_iDriftStartX < 0 || this.m_aPoint[i][1] + e - this.m_iDriftStartY < 0)
return this.m_iDriftStartX = t, void (this.m_iDriftStartY = e);

for (i = 0;
i < n;
i++)
this.m_aPoint[i][0] = this.m_aPoint[i][0] + t - this.m_iDriftStartX, this.m_aPoint[i][1] = this.m_aPoint[i][1] + e - this.m_iDriftStartY;
this.m_iDriftStartX = t, this.m_iDriftStartY = e, this.setEdgePoints(this.m_aPoint), P() } }, { key: "stretch", value: function () { } }]), i }(), w = function (t) { function e() { k(this, e);
var t = x(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
return t.m_szType = "Grid", t.m_iGridColNum = 22, t.m_iGridRowNum = 18, t.m_szGridMap = "", t.m_aAddGridMap = [], t }
return T(e, r), l(e, [{ key: "draw", value: function () { 
for (var t = v.m_iCanvasWidth / this.m_iGridColNum, e = v.m_iCanvasHeight / this.m_iGridRowNum, n = "", i = 0;
i < this.m_iGridRowNum;
i++) { 
for (var r = this.m_szGridMap.substring(6 * i, 6 * i + 6), o = parseInt("f" + r, 16).toString(2).split("").slice(4), a = "", s = 0;
s < this.m_iGridColNum;
s++) {
var l = "";
l = "1" === o[s] ? (v[g].strokeStyle = this.m_szDrawColor, v[g].globalAlpha = 1, v[g].strokeRect(t * s, e * i, t, e), "1") : "0", this.m_aAddGridMap.length && 1 === this.m_aAddGridMap[i][s] && (v[g].strokeStyle = this.m_szDrawColor, v[g].strokeRect(t * s, e * i, t, e), l = "1"), a += l } n += parseInt("1111" + a + "00", 2).toString(16).substring(1) } this.m_szGridMap = n } }, { key: "move", value: function (t, e, n, i) {
var r = v.m_iCanvasWidth / this.m_iGridColNum, o = v.m_iCanvasHeight / this.m_iGridRowNum, a = Math.floor(t / r), s = Math.floor(e / o), l = Math.floor(Math.abs(n - t) / r), u = Math.floor(Math.abs(i - e) / o), c = 1, f = 1;
c = 0 < n - t ? 1 : -1, f = 0 < i - e ? 1 : -1;

for (var h = [], d = 0;
d < this.m_iGridRowNum;
d++) { h[d] = [];

for (var p = 0;
p < this.m_iGridColNum;
p++)
h[d][p] = 1 === c ? 1 === f ? s <= d && d <= s + u && a <= p && p <= a + l ? 1 : 0 : d <= s && s - u <= d && a <= p && p <= a + l ? 1 : 0 : 1 === f ? s <= d && d <= s + u && p <= a && a - l <= p ? 1 : 0 : d <= s && s - u <= d && p <= a && a - l <= p ? 1 : 0 } this.m_aAddGridMap = h, this.draw() } }]), e }(), o = function (t) { function e() { k(this, e);
var t = x(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
return t.m_szType = "Line", t.m_iLineType = 0, t.m_iDirection = 0, t.m_iArrowType = 0, t.m_aCrossArrowPoint = [], t }
return T(e, r), l(e, [{ key: "draw", value: function () { 0 === this.m_iLineType ? this.drawNormalLine() : 1 === this.m_iLineType ? this.drawArrowLine() : 3 === this.m_iLineType ? this.drawCrossLine() : 4 === this.m_iLineType && this.drawLineCount() } }, { key: "drawNormalLine", value: function () {
if (v[g].globalAlpha = 1, 0 < this.m_aPoint.length) { v[g].beginPath(), v[g].strokeStyle = this.m_szDrawColor, v[g].lineWidth = 2, v[g].moveTo(this.m_aPoint[0][0], this.m_aPoint[0][1]);

for (var t = 1, e = this.m_aPoint.length;
t < e;
t++)
v[g].lineTo(this.m_aPoint[t][0], this.m_aPoint[t][1]);
if (v[g].stroke(), this.m_bChoosed) 
for (var n = 0, i = this.m_aPoint.length;
n < i;
n++)
v[g].beginPath(), v[g].fillStyle = this.m_szDrawColor, v[g].arc(this.m_aPoint[n][0], this.m_aPoint[n][1], 3, 0, 2 * Math.PI, !0), v[g].closePath(), v[g].fill();
"" !== this.m_szTips && (v[g].strokeStyle = this.m_szDrawColor, v[g].fillText(this.m_szTips, this.m_aPoint[0][0] + 10, this.m_aPoint[0][1] + 4)) } } }, { key: "drawArrowLine", value: function (t, e, n, i, r, o, a, s) { o = void 0 !== o ? o : 30, a = void 0 !== a ? a : 10, s = void 0 !== s ? s : 1;
var l = 180 * Math.atan2(n - r, e - i) / Math.PI, u = (l + o) * Math.PI / 180, c = (l - o) * Math.PI / 180, f = a * Math.cos(u), h = a * Math.sin(u), d = a * Math.cos(c), p = a * Math.sin(c);
v[g].save(), v[g].beginPath();
var y = e - f, m = n - h;
v[g].moveTo(y, m), v[g].lineTo(e, n), y = e - d, m = n - p, v[g].lineTo(y, m), v[g].moveTo(e, n), v[g].lineTo(i, r), 1 === t && (y = i + f, m = r + h, v[g].moveTo(y, m), v[g].lineTo(i, r), y = i + d, m = r + p, v[g].lineTo(y, m)), v[g].strokeStyle = this.m_szDrawColor, v[g].lineWidth = s, v[g].stroke(), v[g].restore() } }, { key: "drawCrossLine", value: function () { this.drawNormalLine();
var t = (this.m_aPoint[0][0] + this.m_aPoint[1][0]) / 2, e = (this.m_aPoint[0][1] + this.m_aPoint[1][1]) / 2, n = 180 * Math.atan2(e - this.m_aPoint[0][1], t - this.m_aPoint[0][0]) / Math.PI, i = (n + 90) * Math.PI / 180, r = (n - 90) * Math.PI / 180, o = 25 * Math.cos(i), a = 25 * Math.sin(i), s = 25 * Math.cos(r), l = 25 * Math.sin(r), u = 0, c = 0;
u = t - o, c = e - a;
var f = 0, h = 0;
h = 0 === this.m_iDirection ? (f = -10, -15) : 1 === this.m_iDirection ? f = 10 : (f = 10, -15), 0 !== this.m_iDirection && this.drawArrowLine(0, u, c, t, e), v[g].strokeStyle = this.m_szDrawColor, v[g].font = "8px", v[g].strokeText("A", u + f, c + 4), u = t - s, c = e - l, 1 !== this.m_iDirection && this.drawArrowLine(0, u, c, t, e), v[g].strokeStyle = this.m_szDrawColor, v[g].font = "8px", v[g].strokeText("B", u + h, c + 4) } }, { key: "drawLineCount", value: function () { this.drawNormalLine();
var t = (this.m_aPoint[0][0] + this.m_aPoint[1][0]) / 2, e = (this.m_aPoint[0][1] + this.m_aPoint[1][1]) / 2, n = 180 * Math.atan2(e - this.m_aPoint[0][1], t - this.m_aPoint[0][0]) / Math.PI, i = (n + 90) * Math.PI / 180, r = (n - 90) * Math.PI / 180, o = 25 * Math.cos(i), a = 25 * Math.sin(i), s = 25 * Math.cos(r), l = 25 * Math.sin(r), u = 0, c = 0;
u = t - o, c = e - a, 1 === this.m_iArrowType ? (u = t - s, c = e - l, this.drawArrowLine(0, u, c, t, e)) : 0 === this.m_iArrowType && this.drawArrowLine(0, u, c, t, e), this.m_aCrossArrowPoint = [[t, e], [u, c]] } }, { key: "inShape", value: function (t, e) { 
for (var n = !1, i = 0, r = this.m_aPoint.length - 1;
i < r;
i++) {
var o = Math.sqrt((this.m_aPoint[i + 1][0] - this.m_aPoint[i][0]) * (this.m_aPoint[i + 1][0] - this.m_aPoint[i][0]) + (this.m_aPoint[i + 1][1] - this.m_aPoint[i][1]) * (this.m_aPoint[i + 1][1] - this.m_aPoint[i][1]));
Math.sqrt((t - this.m_aPoint[i][0]) * (t - this.m_aPoint[i][0]) + (e - this.m_aPoint[i][1]) * (e - this.m_aPoint[i][1])) + Math.sqrt((t - this.m_aPoint[i + 1][0]) * (t - this.m_aPoint[i + 1][0]) + (e - this.m_aPoint[i + 1][1]) * (e - this.m_aPoint[i + 1][1])) - o < 1 && (n = !0) }
return n } }]), e }(), _ = function (t) { function e() { k(this, e);
var t = x(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
return t.m_szType = "Polygon", t.m_iPolygonType = 1, t }
return T(e, r), l(e, [{ key: "setPointInfo", value: function (t) {
if (null != t) {
if (0 === this.m_iPolygonType) { 
for (var e = t[0][0], n = t[0][1], i = t[0][0], r = t[0][1], o = 0, a = t.length;
o < a;
o++)
e > t[o][0] && (e = t[o][0]), n > t[o][1] && (n = t[o][1]), i < t[o][0] && (i = t[o][0]), r < t[o][1] && (r = t[o][1]);
this.m_aPoint = [[e, n], [i, n], [i, r], [e, r]] }
else
this.m_iPolygonType, this.m_aPoint = t;
this.setEdgePoints(t) } } }, { key: "draw", value: function () {
if (0 < this.m_aPoint.length) { v[g].fillStyle = this.m_szFillColor, v[g].strokeStyle = this.m_szDrawColor, v[g].globalAlpha = 1;
var t = 0, e = 0;
if (this.m_bChoosed) 
for (t = 0, e = this.m_aPoint.length;
t < e;
t++)
v[g].beginPath(), v[g].arc(this.m_aPoint[t][0], this.m_aPoint[t][1], 3, 0, 360, !1), v[g].fillStyle = this.m_szDrawColor, v[g].closePath(), v[g].fill();

for (v[g].beginPath(), v[g].moveTo(this.m_aPoint[0][0], this.m_aPoint[0][1]), t = 0, e = this.m_aPoint.length;
t < e;
t++)0 !== t && v[g].lineTo(this.m_aPoint[t][0], this.m_aPoint[t][1]);
v[g].stroke(), this.m_bClosed && (v[g].fillText(this.m_szTips, (this.m_oEdgePoints.left.x + this.m_oEdgePoints.right.x) / 2, (this.m_oEdgePoints.top.y + this.m_oEdgePoints.bottom.y) / 2), v[g].closePath(), v[g].stroke(), v[g].globalAlpha = this.m_iTranslucent, v[g].fill()) } } }, { key: "move", value: function (t, e, n, i) {
if (1 === this.m_iPolygonType) {
if (this.m_aPoint.length < this.m_iMaxPointNum && 0 < this.m_aPoint.length) { v[g].fillStyle = this.m_szFillColor, v[g].strokeStyle = this.m_szDrawColor, v[g].globalAlpha = 1;
var r = 0, o = 0;

for (r = 0, o = this.m_aPoint.length;
r < o;
r++)
v[g].beginPath(), v[g].arc(this.m_aPoint[r][0], this.m_aPoint[r][1], 3, 0, 360, !1), v[g].fillStyle = this.m_szDrawColor, v[g].closePath(), v[g].fill();

for (v[g].beginPath(), v[g].moveTo(this.m_aPoint[0][0], this.m_aPoint[0][1]), r = 0, o = this.m_aPoint.length;
r < o;
r++)0 !== r && v[g].lineTo(this.m_aPoint[r][0], this.m_aPoint[r][1]);
v[g].lineTo(t, e), v[g].closePath(), v[g].stroke() } }
else if (0 === this.m_iPolygonType) { this.m_bChoosed = !0;
var a = n, s = i, l = t, u = e;
this.setPointInfo([[a, s], [l, s], [l, u], [a, u]]), this.draw() } } }, { key: "stretch", value: function (t, e) { 0 === this.m_iEditType && (1 === this.m_iPolygonType ? -1 !== this.m_iIndexChoosePoint && (this.m_aPoint[this.m_iIndexChoosePoint][0] = t, this.m_aPoint[this.m_iIndexChoosePoint][1] = e) : 0 === this.m_iIndexChoosePoint ? t < this.m_aPoint[2][0] && e < this.m_aPoint[2][1] && (this.m_aPoint[0][0] = t, this.m_aPoint[0][1] = e, this.m_aPoint[3][0] = t, this.m_aPoint[1][1] = e) : 1 === this.m_iIndexChoosePoint ? t > this.m_aPoint[3][0] && e < this.m_aPoint[3][1] && (this.m_aPoint[1][0] = t, this.m_aPoint[1][1] = e, this.m_aPoint[2][0] = t, this.m_aPoint[0][1] = e) : 2 === this.m_iIndexChoosePoint ? t > this.m_aPoint[0][0] && e > this.m_aPoint[0][1] && (this.m_aPoint[2][0] = t, this.m_aPoint[2][1] = e, this.m_aPoint[1][0] = t, this.m_aPoint[3][1] = e) : 3 === this.m_iIndexChoosePoint && t < this.m_aPoint[1][0] && e > this.m_aPoint[1][1] && (this.m_aPoint[3][0] = t, this.m_aPoint[3][1] = e, this.m_aPoint[0][0] = t, this.m_aPoint[2][1] = e), this.setPointInfo(this.m_aPoint), P()) } }]), e }();
return function () { function e(t) { k(this, e), (v = this)[c] = (0, u.default)("#" + t), this[g] = this[c][0].getContext("2d"), this[f] = [], this[h] = !1, this[d] = "Rect", this[p] = 10, this[S] = !0, this[m] = {}, this[n] = null, this[i] = { szDrawColor: "#ff0000", szFillColor: "#343434", iTranslucent: .7 }, this[y] = !1, this.m_iCanvasWidth = this[c].width(), this.m_iCanvasHeight = this[c].height(), this.m_iHorizontalResolution = 0, this.m_iVerticalResolution = 0, this.m_szDisplayMode = "", this.m_szVideoFormat = "", a(), this[f].length = 0 }
return l(e, [{ key: "setDrawMutiShapeOneTime", value: function (t) { this[S] = t } }, { key: "setMaxShapeSupport", value: function (t) { this[p] = t } }, { key: "getMaxShapeSupport", value: function () {
return this[p] } }, { key: "setDrawStatus", value: function (t, e) { this[h] = t, e && t && (this[n] = e), t || (this[n] = null) } }, { key: "setShapeType", value: function (t) { this[d] = t, P() } }, { key: "setCurrentShapeInfo", value: function (t) { this[m] = t || { szId: "", szTips: "", iMinClosed: 3, iMaxPointNum: 11, iPolygonType: 1 } } }, { key: "getShapeType", value: function () {
return this[d] } }, { key: "getAllShapesInfo", value: function () { 
for (var t = [], e = 0, n = this[f].length;
e < n;
e++)"Grid" === this[f][e].m_szType ? t.push({ szType: this[f][e].m_szType, szGridMap: this[f][e].m_szGridMap, iGridColNum: this[f][e].m_iGridColNum, iGridRowNum: this[f][e].m_iGridRowNum }) : "RectOSD" === this[f][e].m_szType ? t.push({ szType: this[f][e].m_szType, szText: this[f][e].m_szText, szEnabled: this[f][e].m_szEnabled, szOSDType: this[f][e].m_szOSDType, iPositionX: this[f][e].m_aPoint[0][0], iPositionY: this[f][e].m_aPoint[0][1], szDateStyle: this[f][e].m_szDateStyle, szClockType: this[f][e].m_szClockType, szDisplayWeek: this[f][e].m_szDisplayWeek, szId: this[f][e].m_szId }) : t.push({ szType: this[f][e].m_szType, aPoint: this[f][e].m_aPoint, szId: this[f][e].m_szId });
return t } }, { key: "getShapesInfoByType", value: function (t) { 
for (var e = [], n = 0, i = this[f].length;
n < i;
n++)
this[f][n].m_szType === t && ("Grid" === this[f][n].m_szType ? e.push({ szType: this[f][n].m_szType, szGridMap: this[f][n].m_szGridMap, iGridColNum: this[f][n].m_iGridColNum, iGridRowNum: this[f][n].m_iGridRowNum }) : "RectOSD" === this[f][n].m_szType ? e.push({ szType: this[f][n].m_szType, szText: this[f][n].m_szText, szEnabled: this[f][n].m_szEnabled, szOSDType: this[f][n].m_szOSDType, iPositionX: this[f][n].m_aPoint[0][0], iPositionY: this[f][n].m_aPoint[0][1], szDateStyle: this[f][n].m_szDateStyle, szClockType: this[f][n].m_szClockType, szDisplayWeek: this[f][n].m_szDisplayWeek, szId: this[f][n].m_szId }) : "Polygon" === t ? e.push({ szType: this[f][n].m_szType, szId: this[f][n].m_szId, iPolygonType: this[f][n].m_iPolygonType, iMinClosed: this[f][n].m_iMinClosed, iMaxPointNum: this[f][n].m_iMaxPointNum, iEditType: this[f][n].m_iEditType, aPoint: this[f][n].m_aPoint, bClosed: this[f][n].m_bClosed, szTips: this[f][n].m_szTips, szDrawColor: this[f][n].m_szDrawColor, szFillColor: this[f][n].m_szFillColor, iTranslucent: this[f][n].m_iTranslucent }) : "Line" === t ? e.push({ szType: this[f][n].m_szType, szId: this[f][n].m_szId, aPoint: this[f][n].m_aPoint, szTips: this[f][n].m_szTips, iLineType: this[f][n].m_iLineType, iDirection: this[f][n].m_iDirection, iArrowType: this[f][n].m_iArrowType, szDrawColor: this[f][n].m_szDrawColor, aCrossArrowPoint: this[f][n].m_aCrossArrowPoint }) : "Rect" === t ? e.push({ szType: this[f][n].m_szType, iEditType: this[f][n].m_iEditType, aPoint: this[f][n].m_aPoint, szTips: this[f][n].m_szTips, szDrawColor: this[f][n].m_szDrawColor, szFillColor: this[f][n].m_szFillColor, iTranslucent: this[f][n].m_iTranslucent }) : e.push({ szType: this[f][n].m_szType, aPoint: this[f][n].m_aPoint }));
return e } }, { key: "setShapesInfoByType", value: function (t, e) { e || (e = []);
var n = null;
if ("Rect" === t || "Polygon" === t || "Line" === t) 
for (var i = 0, r = e.length;
i < r;
i++)"Rect" === t ? ((n = new b).m_iEditType = e[i].iEditType, n.m_szTips = e[i].szTips, e[i].style && (n.m_szDrawColor = e[i].style.szDrawColor, n.m_szFillColor = e[i].style.szFillColor, n.m_iTranslucent = e[i].style.iTranslucent)) : "Polygon" === t ? (n = new _, 0 === e[i].iPolygonType ? n.m_bClosed = !0 : n.m_bClosed = e[i].bClosed, n.m_szTips = e[i].szTips, n.m_szId = e[i].szId || "", n.m_iPolygonType = e[i].iPolygonType, n.m_iMinClosed = e[i].iMinClosed || 3, n.m_iMaxPointNum = e[i].iMaxPointNum || 11, n.m_iEditType = e[i].iEditType, e[i].style && (n.m_szDrawColor = e[i].style.szDrawColor, n.m_szFillColor = e[i].style.szFillColor, n.m_iTranslucent = e[i].style.iTranslucent)) : "Line" === t && ((n = new o).m_iLineType = e[i].iLineType, n.m_szTips = e[i].szTips, n.m_szId = e[i].szId, n.m_iDirection = e[i].iDirection, n.m_iArrowType = e[i].iArrowType, e[i].style && (n.m_szDrawColor = e[i].style.szDrawColor), n.setPointInfo(e[i].aPoint)), n.setPointInfo(e[i].aPoint), 0 === i && (n.m_bChoosed = !0), C(n);
else
"Grid" === t && ((n = new w).m_szGridMap = e[0].szGridMap || "", n.m_iGridColNum = e[0].iGridColNum || 22, n.m_iGridRowNum = e[0].iGridRowNum || 18, C(n));
P() } }, { key: "addOSDShape", value: function (t, e, n, i, r) { n || i || (i = n = 0), r || (r = {});
var o = new s(t, e), a = 10 * t.length;
o.m_aPoint = [[n, i], [a + n, i], [a + n, i + 20], [n, i + 20]], o.m_szOSDType = r.szOSDType || "", o.m_szDateStyle = r.szDateStyle || "", o.m_szClockType = r.szClockType || "", o.m_szDisplayWeek = r.szDisplayWeek || "", o.m_szId = r.szId || "", C(o), P() } }, { key: "setCanvasSize", value: function (t, e) { 0 < t && 0 < e && (this.m_iCanvasWidth = t, this.m_iCanvasHeight = e, P()) } }, { key: "setDrawStyle", value: function (t, e, n) { this[i] = { szDrawColor: t, szFillColor: e, iTranslucent: n } } }, { key: "clearAllShape", value: function () { this[f].length = 0, P() } }, { key: "clearShapeByType", value: function (t) { 
for (var e = this[f].length;
0 < e;
e--)
this[f][e - 1].m_szType === t && ("Grid" === t ? (this[f][e - 1].m_szGridMap = "", this[f][e - 1].m_aAddGridMap = []) : this[f].splice(e - 1, 1));
P() } }, { key: "deleteShape", value: function (t) { this[f].length > t && this[f].splice(t, 1), P() } }, { key: "updateCanvas", value: function (t) { this[c] = (0, u.default)("#" + t), this[g] = this[c][0].getContext("2d"), this.m_iCanvasWidth = this[c].width(), this.m_iCanvasHeight = this[c].height(), a() } }, { key: "resizeCanvas", value: function () { this.m_iCanvasWidth = this[c].width(), this.m_iCanvasHeight = this[c].height() } }, { key: "canvasRedraw", value: function () { P() } }]), e }() } function P() { v[g].clearRect(0, 0, v.m_iCanvasWidth, v.m_iCanvasHeight);

for (var t = 0, e = v[f].length;
t < e;
t++)
v[f][t].draw() } function C(t) { v[f].length < v[p] && v[f].push(t) } function a() {
var r = !1, o = 0, a = 0, s = "draw", l = null;
function u() { 
for (var t = -1, e = 0, n = v[f].length;
e < n;
e++)
if (v[f][e].m_bChoosed) { t = e;
break }
return t } v[c][0].oncontextmenu = function () {
return !1 }, v[c][0].onselectstart = function () {
return !1 }, v[c].unbind(), v[c].bind("mousedown", function (t) {
if (2 === t.button) v[y] && l && l.m_aPoint.length >= l.m_iMinClosed - 1 && (l.m_bClosed = !0, v[y] = !1, l.setPointInfo(l.m_aPoint), C(l), P(), r = !1, v[S] || (v[h] = !1));
else if (0 === t.button) {
if (o = t.offsetX, a = t.offsetY, s = "draw", !v[y]) {
var e = u();
if (-1 !== e && v[f][e].inArc(t.offsetX, t.offsetY, 5) && (s = "stretch"), "stretch" !== s) 
for (var n = 0, i = v[f].length;
n < i;
n++)
v[f][n].inShape(t.offsetX, t.offsetY) ? (v[f][n].m_bChoosed = !0, v[f][n].getMouseDownPoints(t.offsetX, t.offsetY), s = "drag") : v[f][n].m_bChoosed = !1;
v[c][0].style.cursor = "drag" === s ? "move" : "default" }
if ("draw" === s && v[h]) {
if (v[p] <= v[f].length && "Grid" !== v[d])
return;
"Rect" === v[d] ? l = new b : "Grid" === v[d] ? 0 === v[f].length && C(l = new w) : "Polygon" === v[d] && (v[y] || (v[y] = !0, (l = new _).m_szId = v[m].szId || "", l.m_szTips = v[m].szTips || "", l.m_iMinClosed = v[m].iMinClosed || 3, l.m_iMaxPointNum = v[m].iMaxPointNum || 11, l.m_iPolygonType = v[m].iPolygonType, l.m_szDrawColor = v[m].szDrawColor, l.m_szFillColor = v[m].szFillColor, l.m_iTranslucent = v[m].iTranslucent), 1 === l.m_iPolygonType && (l.addPoint(o, a), l.m_aPoint.length === l.m_iMaxPointNum && (l.m_bClosed = !0, v[y] = !1, C(l), P(), r = !1, v[S] || (v[h] = !1)))) } r = !0 } }), v[c].bind("mousemove", function (t) {
if (v[y]) v[h] && r && ("Polygon" === v[d] && 0 === l.m_iPolygonType && (l.m_bClosed = !0), P(), l.move(t.offsetX, t.offsetY, o, a));
else
{
var e = u();
-1 < e ? r && v[h] && ("drag" === s ? v[f][e].drag(t.offsetX, t.offsetY) : "stretch" === s && v[f][e].stretch(t.offsetX, t.offsetY)) : v[h] && r && ("Rect" === v[d] ? l.move([[o, a], [t.offsetX, t.offsetY]]) : "Grid" === v[d] && v[f][0].move(o, a, t.offsetX, t.offsetY)) } }), v[c].bind("mouseup", function (t) {
if (v[c][0].style.cursor = "default", null != l && "draw" === s)
if ("Rect" === v[d]) {
if (2 < Math.abs(t.offsetX - o) && 2 < Math.abs(t.offsetY - a) && (C(l), v[S] || (v[h] = !1)), v[n]) {
var e = { startPos: [], endPos: [] };
t.offsetX > o && t.offsetY > a ? (e.startPos = l.m_aPoint[0] || [t.offsetX, t.offsetY], e.endPos = l.m_aPoint[2] || [t.offsetX, t.offsetY]) : (e.startPos = l.m_aPoint[2] || [t.offsetX, t.offsetY], e.endPos = l.m_aPoint[0] || [t.offsetX, t.offsetY]), v[n] && v[n](e), l = null, v.clearAllShape() } }
else
"Polygon" === v[d] && 0 === l.m_iPolygonType && v[y] && 2 < Math.abs(t.offsetX - o) && 2 < Math.abs(t.offsetY - a) && (C(l), v[y] = !1, v[S] || (v[h] = !1));
r = !!v[y], P() }), v[c].bind("dblclick", function () { v[h] && "Grid" === v[d] && (v[f][0].m_szGridMap = "fffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffcfffffc", P()) }), v[c].bind("mouseout", function () { v[c][0].style.cursor = "default", r = !!v[y] }) } }();
e.ESCanvas = o }, function (t, Ue, e) {
var Ge;
(function (je) { "use strict";
var t, e, We = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
return typeof t } : function (t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t };
t = "undefined" != typeof window ? window : void 0, e = function (P, t) {
var e = [], C = P.document, i = Object.getPrototypeOf, s = e.slice, y = e.concat, l = e.push, r = e.indexOf, n = {}, o = n.toString, p = n.hasOwnProperty, a = p.toString, u = a.call(Object), m = {};
function v(t, e) {
var n = (e = e || C).createElement("script");
n.text = t, e.head.appendChild(n).parentNode.removeChild(n) }
var x = function t(e, n) {
return new t.fn.init(e, n) }, c = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, f = /^-ms-/, h = /-([a-z])/g, d = function (t, e) {
return e.toUpperCase() };
function g(t) {
var e = !!t && "length" in t && t.length, n = x.type(t);
return "function" !== n && !x.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && 0 < e && e - 1 in t) } x.fn = x.prototype = { jquery: "3.2.1", constructor: x, length: 0, toArray: function () {
return s.call(this) }, get: function (t) {
return null == t ? s.call(this) : t < 0 ? this[t + this.length] : this[t] }, pushStack: function (t) {
var e = x.merge(this.constructor(), t);
return e.prevObject = this, e }, each: function (t) {
return x.each(this, t) }, map: function (n) {
return this.pushStack(x.map(this, function (t, e) {
return n.call(t, e, t) })) }, slice: function () {
return this.pushStack(s.apply(this, arguments)) }, first: function () {
return this.eq(0) }, last: function () {
return this.eq(-1) }, eq: function (t) {
var e = this.length, n = +t + (t < 0 ? e : 0);
return this.pushStack(0 <= n && n < e ? [this[n]] : []) }, end: function () {
return this.prevObject || this.constructor() }, push: l, sort: e.sort, splice: e.splice }, x.extend = x.fn.extend = function () {
var t, e, n, i, r, o, a = arguments[0] || {}, s = 1, l = arguments.length, u = !1;

for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" === (void 0 === a ? "undefined" : We(a)) || x.isFunction(a) || (a = {}), s === l && (a = this, s--);
s < l;
s++)
if (null != (t = arguments[s])) 
for (e in t) n = a[e], a !== (i = t[e]) && (u && i && (x.isPlainObject(i) || (r = Array.isArray(i))) ? (o = r ? (r = !1, n && Array.isArray(n) ? n : []) : n && x.isPlainObject(n) ? n : {}, a[e] = x.extend(u, o, i)) : void 0 !== i && (a[e] = i));
return a }, x.extend({ expando: "jQuery" + ("3.2.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (t) { throw new Error(t) }, noop: function () { }, isFunction: function (t) {
return "function" === x.type(t) }, isWindow: function (t) {
return null != t && t === t.window }, isNumeric: function (t) {
var e = x.type(t);
return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t)) }, isPlainObject: function (t) {
var e, n;
return !(!t || "[object Object]" !== o.call(t)) && (!(e = i(t)) || "function" == typeof (n = p.call(e, "constructor") && e.constructor) && a.call(n) === u) }, isEmptyObject: function (t) {
var e;

for (e in t)
return !1;
return !0 }, type: function (t) {
return null == t ? t + "" : "object" === (void 0 === t ? "undefined" : We(t)) || "function" == typeof t ? n[o.call(t)] || "object" : void 0 === t ? "undefined" : We(t) }, globalEval: function (t) { v(t) }, camelCase: function (t) {
return t.replace(f, "ms-").replace(h, d) }, each: function (t, e) {
var n, i = 0;
if (g(t)) 
for (n = t.length;
i < n && !1 !== e.call(t[i], i, t[i]);
i++);
else

for (i in t)
if (!1 === e.call(t[i], i, t[i]))
break;
return t }, trim: function (t) {
return null == t ? "" : (t + "").replace(c, "") }, makeArray: function (t, e) {
var n = e || [];
return null != t && (g(Object(t)) ? x.merge(n, "string" == typeof t ? [t] : t) : l.call(n, t)), n }, inArray: function (t, e, n) {
return null == e ? -1 : r.call(e, t, n) }, merge: function (t, e) { 
for (var n = +e.length, i = 0, r = t.length;
i < n;
i++)
t[r++] = e[i];
return t.length = r, t }, grep: function (t, e, n) { 
for (var i = [], r = 0, o = t.length, a = !n;
r < o;
r++)!e(t[r], r) !== a && i.push(t[r]);
return i }, map: function (t, e, n) {
var i, r, o = 0, a = [];
if (g(t)) 
for (i = t.length;
o < i;
o++)
null != (r = e(t[o], o, n)) && a.push(r);
else

for (o in t) null != (r = e(t[o], o, n)) && a.push(r);
return y.apply([], a) }, guid: 1, proxy: function (t, e) {
var n, i, r;
if ("string" == typeof e && (n = t[e], e = t, t = n), x.isFunction(t))
return i = s.call(arguments, 2), r = function () {
return t.apply(e || this, i.concat(s.call(arguments))) }, r.guid = t.guid = t.guid || x.guid++ , r }, now: Date.now, support: m }), "function" == typeof Symbol && (x.fn[Symbol.iterator] = e[Symbol.iterator]), x.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) { n["[object " + e + "]"] = e.toLowerCase() });
var S = function (n) {
var t, d, b, o, r, p, f, y, w, l, u, _, P, a, C, m, s, c, v, x = "sizzle" + 1 * new Date, g = n.document, T = 0, i = 0, h = at(), S = at(), k = at(), D = function (t, e) {
return t === e && (u = !0), 0 }, M = {}.hasOwnProperty, e = [], R = e.pop, E = e.push, z = e.push, I = e.slice, A = function (t, e) { 
for (var n = 0, i = t.length;
n < i;
n++)
if (t[n] === e)
return n;
return -1 }, F = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", O = "[\\x20\\t\\r\\n\\f]", B = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", L = "\\[" + O + "*(" + B + ")(?:" + O + "*([*^$|!~]?=)" + O + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + B + "))|)" + O + "*\\]", N = ":(" + B + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + L + ")*)|.*)\\)|)", q = new RegExp(O + "+", "g"), H = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"), j = new RegExp("^" + O + "*," + O + "*"), W = new RegExp("^" + O + "*([>+~]|" + O + ")" + O + "*"), U = new RegExp("=" + O + "*([^\\]'\"]*?)" + O + "*\\]", "g"), G = new RegExp(N), V = new RegExp("^" + B + "$"), Y = { ID: new RegExp("^#(" + B + ")"), CLASS: new RegExp("^\\.(" + B + ")"), TAG: new RegExp("^(" + B + "|[*])"), ATTR: new RegExp("^" + L), PSEUDO: new RegExp("^" + N), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)
n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"), bool: new RegExp("^(?:" + F + ")$", "i"), needsContext: new RegExp("^" + O + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", "i") }, X = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, $ = /^[^{]+\{\s*\[native \w/, K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Z = /[+~]/, Q = new RegExp("\\\\([\\da-f]{1,6}" + O + "?|(" + O + ")|.)", "ig"), tt = function (t, e, n) {
var i = "0x" + e - 65536;
return i != i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320) }, et = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, nt = function (t, e) {
return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t }, it = function () { _() }, rt = gt(function (t) {
return !0 === t.disabled && ("form" in t || "label" in t) }, { dir: "parentNode", next: "legend" });
try { z.apply(e = I.call(g.childNodes), g.childNodes), e[g.childNodes.length].nodeType } catch (t) { z = { apply: e.length ? function (t, e) { E.apply(t, I.call(e)) } : function (t, e) { 
for (var n = t.length, i = 0;
t[n++] = e[i++];);
t.length = n - 1 } } } function ot(t, e, n, i) {
var r, o, a, s, l, u, c, f = e && e.ownerDocument, h = e ? e.nodeType : 9;
if (n = n || [], "string" != typeof t || !t || 1 !== h && 9 !== h && 11 !== h)
return n;
if (!i && ((e ? e.ownerDocument || e : g) !== P && _(e), e = e || P, C)) {
if (11 !== h && (l = K.exec(t)))
if (r = l[1]) {
if (9 === h) {
if (!(a = e.getElementById(r)))
return n;
if (a.id === r)
return n.push(a), n }
else if (f && (a = f.getElementById(r)) && v(e, a) && a.id === r)
return n.push(a), n }
else
{
if (l[2])
return z.apply(n, e.getElementsByTagName(t)), n;
if ((r = l[3]) && d.getElementsByClassName && e.getElementsByClassName)
return z.apply(n, e.getElementsByClassName(r)), n }
if (d.qsa && !k[t + " "] && (!m || !m.test(t))) {
if (1 !== h) f = e, c = t;
else if ("object" !== e.nodeName.toLowerCase()) { 
for ((s = e.getAttribute("id")) ? s = s.replace(et, nt) : e.setAttribute("id", s = x), o = (u = p(t)).length;
o--;)
u[o] = "#" + s + " " + vt(u[o]);
c = u.join(","), f = Z.test(t) && yt(e.parentNode) || e }
if (c) try {
return z.apply(n, f.querySelectorAll(c)), n } catch (t) { } finally { s === x && e.removeAttribute("id") } } }
return y(t.replace(H, "$1"), e, n, i) } function at() {
var i = [];
return function t(e, n) {
return i.push(e + " ") > b.cacheLength && delete t[i.shift()], t[e + " "] = n } } function st(t) {
return t[x] = !0, t } function lt(t) {
var e = P.createElement("fieldset");
try {
return !!t(e) } catch (t) {
return !1 } finally { e.parentNode && e.parentNode.removeChild(e), e = null } } function ut(t, e) { 
for (var n = t.split("|"), i = n.length;
i--;)
b.attrHandle[n[i]] = e } function ct(t, e) {
var n = e && t, i = n && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
if (i)
return i;
if (n) 
for (;
n = n.nextSibling;)
if (n === e)
return -1;
return t ? 1 : -1 } function ft(e) {
return function (t) {
return "input" === t.nodeName.toLowerCase() && t.type === e } } function ht(n) {
return function (t) {
var e = t.nodeName.toLowerCase();
return ("input" === e || "button" === e) && t.type === n } } function dt(e) {
return function (t) {
return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && rt(t) === e : t.disabled === e : "label" in t && t.disabled === e } } function pt(a) {
return st(function (o) {
return o = +o, st(function (t, e) { 
for (var n, i = a([], t.length, o), r = i.length;
r--;)
t[n = i[r]] && (t[n] = !(e[n] = t[n])) }) }) } function yt(t) {
return t && void 0 !== t.getElementsByTagName && t } 
for (t in d = ot.support = {}, r = ot.isXML = function (t) {
var e = t && (t.ownerDocument || t).documentElement;
return !!e && "HTML" !== e.nodeName }, _ = ot.setDocument = function (t) {
var e, n, i = t ? t.ownerDocument || t : g;
return i !== P && 9 === i.nodeType && i.documentElement && (a = (P = i).documentElement, C = !r(P), g !== P && (n = P.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", it, !1) : n.attachEvent && n.attachEvent("onunload", it)), d.attributes = lt(function (t) {
return t.className = "i", !t.getAttribute("className") }), d.getElementsByTagName = lt(function (t) {
return t.appendChild(P.createComment("")), !t.getElementsByTagName("*").length }), d.getElementsByClassName = $.test(P.getElementsByClassName), d.getById = lt(function (t) {
return a.appendChild(t).id = x, !P.getElementsByName || !P.getElementsByName(x).length }), d.getById ? (b.filter.ID = function (t) {
var e = t.replace(Q, tt);
return function (t) {
return t.getAttribute("id") === e } }, b.find.ID = function (t, e) {
if (void 0 !== e.getElementById && C) {
var n = e.getElementById(t);
return n ? [n] : [] } }) : (b.filter.ID = function (t) {
var n = t.replace(Q, tt);
return function (t) {
var e = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
return e && e.value === n } }, b.find.ID = function (t, e) {
if (void 0 !== e.getElementById && C) {
var n, i, r, o = e.getElementById(t);
if (o) {
if ((n = o.getAttributeNode("id")) && n.value === t)
return [o];

for (r = e.getElementsByName(t), i = 0;
o = r[i++];)
if ((n = o.getAttributeNode("id")) && n.value === t)
return [o] }
return [] } }), b.find.TAG = d.getElementsByTagName ? function (t, e) {
return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : d.qsa ? e.querySelectorAll(t) : void 0 } : function (t, e) {
var n, i = [], r = 0, o = e.getElementsByTagName(t);
if ("*" !== t)
return o;

for (;
n = o[r++];)1 === n.nodeType && i.push(n);
return i }, b.find.CLASS = d.getElementsByClassName && function (t, e) {
if (void 0 !== e.getElementsByClassName && C)
return e.getElementsByClassName(t) }, s = [], m = [], (d.qsa = $.test(P.querySelectorAll)) && (lt(function (t) { a.appendChild(t).innerHTML = "<a id='" + x + "'></a><select id='" + x + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + O + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || m.push("\\[" + O + "*(?:value|" + F + ")"), t.querySelectorAll("[id~=" + x + "-]").length || m.push("~="), t.querySelectorAll(":checked").length || m.push(":checked"), t.querySelectorAll("a#" + x + "+*").length || m.push(".#.+[+~]") }), lt(function (t) { t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
var e = P.createElement("input");
e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && m.push("name" + O + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), a.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), m.push(",.*:") })), (d.matchesSelector = $.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && lt(function (t) { d.disconnectedMatch = c.call(t, "*"), c.call(t, "[s!='']:x"), s.push("!=", N) }), m = m.length && new RegExp(m.join("|")), s = s.length && new RegExp(s.join("|")), e = $.test(a.compareDocumentPosition), v = e || $.test(a.contains) ? function (t, e) {
var n = 9 === t.nodeType ? t.documentElement : t, i = e && e.parentNode;
return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i))) } : function (t, e) {
if (e) 
for (;
e = e.parentNode;)
if (e === t)
return !0;
return !1 }, D = e ? function (t, e) {
if (t === e)
return u = !0, 0;
var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
return n || (1 & (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !d.sortDetached && e.compareDocumentPosition(t) === n ? t === P || t.ownerDocument === g && v(g, t) ? -1 : e === P || e.ownerDocument === g && v(g, e) ? 1 : l ? A(l, t) - A(l, e) : 0 : 4 & n ? -1 : 1) } : function (t, e) {
if (t === e)
return u = !0, 0;
var n, i = 0, r = t.parentNode, o = e.parentNode, a = [t], s = [e];
if (!r || !o)
return t === P ? -1 : e === P ? 1 : r ? -1 : o ? 1 : l ? A(l, t) - A(l, e) : 0;
if (r === o)
return ct(t, e);

for (n = t;
n = n.parentNode;)
a.unshift(n);

for (n = e;
n = n.parentNode;)
s.unshift(n);

for (;
a[i] === s[i];)
i++;
return i ? ct(a[i], s[i]) : a[i] === g ? -1 : s[i] === g ? 1 : 0 }), P }, ot.matches = function (t, e) {
return ot(t, null, null, e) }, ot.matchesSelector = function (t, e) {
if ((t.ownerDocument || t) !== P && _(t), e = e.replace(U, "='$1']"), d.matchesSelector && C && !k[e + " "] && (!s || !s.test(e)) && (!m || !m.test(e))) try {
var n = c.call(t, e);
if (n || d.disconnectedMatch || t.document && 11 !== t.document.nodeType)
return n } catch (t) { }
return 0 < ot(e, P, null, [t]).length }, ot.contains = function (t, e) {
return (t.ownerDocument || t) !== P && _(t), v(t, e) }, ot.attr = function (t, e) { (t.ownerDocument || t) !== P && _(t);
var n = b.attrHandle[e.toLowerCase()], i = n && M.call(b.attrHandle, e.toLowerCase()) ? n(t, e, !C) : void 0;
return void 0 !== i ? i : d.attributes || !C ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null }, ot.escape = function (t) {
return (t + "").replace(et, nt) }, ot.error = function (t) { throw new Error("Syntax error, unrecognized expression: " + t) }, ot.uniqueSort = function (t) {
var e, n = [], i = 0, r = 0;
if (u = !d.detectDuplicates, l = !d.sortStable && t.slice(0), t.sort(D), u) { 
for (;
e = t[r++];)
e === t[r] && (i = n.push(r));

for (;
i--;)
t.splice(n[i], 1) }
return l = null, t }, o = ot.getText = function (t) {
var e, n = "", i = 0, r = t.nodeType;
if (r) {
if (1 === r || 9 === r || 11 === r) {
if ("string" == typeof t.textContent)
return t.textContent;

for (t = t.firstChild;
t;
t = t.nextSibling)
n += o(t) }
else if (3 === r || 4 === r)
return t.nodeValue }
else

for (;
e = t[i++];)
n += o(e);
return n }, (b = ot.selectors = { cacheLength: 50, createPseudo: st, match: Y, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (t) {
return t[1] = t[1].replace(Q, tt), t[3] = (t[3] || t[4] || t[5] || "").replace(Q, tt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4) }, CHILD: function (t) {
return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || ot.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && ot.error(t[0]), t }, PSEUDO: function (t) {
var e, n = !t[6] && t[2];
return Y.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && G.test(n) && (e = p(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3)) } }, filter: { TAG: function (t) {
var e = t.replace(Q, tt).toLowerCase();
return "*" === t ? function () {
return !0 } : function (t) {
return t.nodeName && t.nodeName.toLowerCase() === e } }, CLASS: function (t) {
var e = h[t + " "];
return e || (e = new RegExp("(^|" + O + ")" + t + "(" + O + "|$)")) && h(t, function (t) {
return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "") }) }, ATTR: function (n, i, r) {
return function (t) {
var e = ot.attr(t, n);
return null == e ? "!=" === i : !i || (e += "", "=" === i ? e === r : "!=" === i ? e !== r : "^=" === i ? r && 0 === e.indexOf(r) : "*=" === i ? r && -1 < e.indexOf(r) : "$=" === i ? r && e.slice(-r.length) === r : "~=" === i ? -1 < (" " + e.replace(q, " ") + " ").indexOf(r) : "|=" === i && (e === r || e.slice(0, r.length + 1) === r + "-")) } }, CHILD: function (p, t, e, y, m) {
var v = "nth" !== p.slice(0, 3), g = "last" !== p.slice(-4), S = "of-type" === t;
return 1 === y && 0 === m ? function (t) {
return !!t.parentNode } : function (t, e, n) {
var i, r, o, a, s, l, u = v !== g ? "nextSibling" : "previousSibling", c = t.parentNode, f = S && t.nodeName.toLowerCase(), h = !n && !S, d = !1;
if (c) {
if (v) { 
for (;
u;) { 
for (a = t;
a = a[u];)
if (S ? a.nodeName.toLowerCase() === f : 1 === a.nodeType)
return !1;
l = u = "only" === p && !l && "nextSibling" }
return !0 }
if (l = [g ? c.firstChild : c.lastChild], g && h) { 
for (d = (s = (i = (r = (o = (a = c)[x] || (a[x] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[p] || [])[0] === T && i[1]) && i[2], a = s && c.childNodes[s];
a = ++s && a && a[u] || (d = s = 0) || l.pop();)
if (1 === a.nodeType && ++d && a === t) { r[p] = [T, s, d];
break } }
else if (h && (d = s = (i = (r = (o = (a = t)[x] || (a[x] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[p] || [])[0] === T && i[1]), !1 === d) 
for (;
(a = ++s && a && a[u] || (d = s = 0) || l.pop()) && ((S ? a.nodeName.toLowerCase() !== f : 1 !== a.nodeType) || !++d || (h && ((r = (o = a[x] || (a[x] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[p] = [T, d]), a !== t)););
return (d -= m) === y || d % y == 0 && 0 <= d / y } } }, PSEUDO: function (t, o) {
var e, a = b.pseudos[t] || b.setFilters[t.toLowerCase()] || ot.error("unsupported pseudo: " + t);
return a[x] ? a(o) : 1 < a.length ? (e = [t, t, "", o], b.setFilters.hasOwnProperty(t.toLowerCase()) ? st(function (t, e) { 
for (var n, i = a(t, o), r = i.length;
r--;)
t[n = A(t, i[r])] = !(e[n] = i[r]) }) : function (t) {
return a(t, 0, e) }) : a } }, pseudos: { not: st(function (t) {
var i = [], r = [], s = f(t.replace(H, "$1"));
return s[x] ? st(function (t, e, n, i) { 
for (var r, o = s(t, null, i, []), a = t.length;
a--;)(r = o[a]) && (t[a] = !(e[a] = r)) }) : function (t, e, n) {
return i[0] = t, s(i, null, n, r), i[0] = null, !r.pop() } }), has: st(function (e) {
return function (t) {
return 0 < ot(e, t).length } }), contains: st(function (e) {
return e = e.replace(Q, tt), function (t) {
return -1 < (t.textContent || t.innerText || o(t)).indexOf(e) } }), lang: st(function (n) {
return V.test(n || "") || ot.error("unsupported lang: " + n), n = n.replace(Q, tt).toLowerCase(), function (t) {
var e;
do {
if (e = C ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
return (e = e.toLowerCase()) === n || 0 === e.indexOf(n + "-") } while ((t = t.parentNode) && 1 === t.nodeType);
return !1 } }), target: function (t) {
var e = n.location && n.location.hash;
return e && e.slice(1) === t.id }, root: function (t) {
return t === a }, focus: function (t) {
return t === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(t.type || t.href || ~t.tabIndex) }, enabled: dt(!1), disabled: dt(!0), checked: function (t) {
var e = t.nodeName.toLowerCase();
return "input" === e && !!t.checked || "option" === e && !!t.selected }, selected: function (t) {
return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected }, empty: function (t) { 
for (t = t.firstChild;
t;
t = t.nextSibling)
if (t.nodeType < 6)
return !1;
return !0 }, parent: function (t) {
return !b.pseudos.empty(t) }, header: function (t) {
return J.test(t.nodeName) }, input: function (t) {
return X.test(t.nodeName) }, button: function (t) {
var e = t.nodeName.toLowerCase();
return "input" === e && "button" === t.type || "button" === e }, text: function (t) {
var e;
return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase()) }, first: pt(function () {
return [0] }), last: pt(function (t, e) {
return [e - 1] }), eq: pt(function (t, e, n) {
return [n < 0 ? n + e : n] }), even: pt(function (t, e) { 
for (var n = 0;
n < e;
n += 2)
t.push(n);
return t }), odd: pt(function (t, e) { 
for (var n = 1;
n < e;
n += 2)
t.push(n);
return t }), lt: pt(function (t, e, n) { 
for (var i = n < 0 ? n + e : n;
0 <= --i;)
t.push(i);
return t }), gt: pt(function (t, e, n) { 
for (var i = n < 0 ? n + e : n;
++i < e;)
t.push(i);
return t }) } }).pseudos.nth = b.pseudos.eq, { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) b.pseudos[t] = ft(t);

for (t in { submit: !0, reset: !0 }) b.pseudos[t] = ht(t);
function mt() { } function vt(t) { 
for (var e = 0, n = t.length, i = "";
e < n;
e++)
i += t[e].value;
return i } function gt(s, t, e) {
var l = t.dir, u = t.next, c = u || l, f = e && "parentNode" === c, h = i++;
return t.first ? function (t, e, n) { 
for (;
t = t[l];)
if (1 === t.nodeType || f)
return s(t, e, n);
return !1 } : function (t, e, n) {
var i, r, o, a = [T, h];
if (n) { 
for (;
t = t[l];)
if ((1 === t.nodeType || f) && s(t, e, n))
return !0 }
else

for (;
t = t[l];)
if (1 === t.nodeType || f)
if (r = (o = t[x] || (t[x] = {}))[t.uniqueID] || (o[t.uniqueID] = {}), u && u === t.nodeName.toLowerCase()) t = t[l] || t;
else
{
if ((i = r[c]) && i[0] === T && i[1] === h)
return a[2] = i[2];
if ((r[c] = a)[2] = s(t, e, n))
return !0 }
return !1 } } function St(r) {
return 1 < r.length ? function (t, e, n) { 
for (var i = r.length;
i--;)
if (!r[i](t, e, n))
return !1;
return !0 } : r[0] } function bt(t, e, n, i, r) { 
for (var o, a = [], s = 0, l = t.length, u = null != e;
s < l;
s++)(o = t[s]) && (n && !n(o, i, r) || (a.push(o), u && e.push(s)));
return a } function wt(d, p, y, m, v, t) {
return m && !m[x] && (m = wt(m)), v && !v[x] && (v = wt(v, t)), st(function (t, e, n, i) {
var r, o, a, s = [], l = [], u = e.length, c = t || function (t, e, n) { 
for (var i = 0, r = e.length;
i < r;
i++)
ot(t, e[i], n);
return n }(p || "*", n.nodeType ? [n] : n, []), f = !d || !t && p ? c : bt(c, s, d, n, i), h = y ? v || (t ? d : u || m) ? [] : e : f;
if (y && y(f, h, n, i), m) 
for (r = bt(h, l), m(r, [], n, i), o = r.length;
o--;)(a = r[o]) && (h[l[o]] = !(f[l[o]] = a));
if (t) {
if (v || d) {
if (v) { 
for (r = [], o = h.length;
o--;)(a = h[o]) && r.push(f[o] = a);
v(null, h = [], r, i) } 
for (o = h.length;
o--;)(a = h[o]) && -1 < (r = v ? A(t, a) : s[o]) && (t[r] = !(e[r] = a)) } }
else
h = bt(h === e ? h.splice(u, h.length) : h), v ? v(null, e, h, i) : z.apply(e, h) }) } function _t(t) { 
for (var r, e, n, i = t.length, o = b.relative[t[0].type], a = o || b.relative[" "], s = o ? 1 : 0, l = gt(function (t) {
return t === r }, a, !0), u = gt(function (t) {
return -1 < A(r, t) }, a, !0), c = [function (t, e, n) {
var i = !o && (n || e !== w) || ((r = e).nodeType ? l(t, e, n) : u(t, e, n));
return r = null, i }];
s < i;
s++)
if (e = b.relative[t[s].type]) c = [gt(St(c), e)];
else
{
if ((e = b.filter[t[s].type].apply(null, t[s].matches))[x]) { 
for (n = ++s;
n < i && !b.relative[t[n].type];
n++);
return wt(1 < s && St(c), 1 < s && vt(t.slice(0, s - 1).concat({ value: " " === t[s - 2].type ? "*" : "" })).replace(H, "$1"), e, s < n && _t(t.slice(s, n)), n < i && _t(t = t.slice(n)), n < i && vt(t)) } c.push(e) }
return St(c) }
return mt.prototype = b.filters = b.pseudos, b.setFilters = new mt, p = ot.tokenize = function (t, e) {
var n, i, r, o, a, s, l, u = S[t + " "];
if (u)
return e ? 0 : u.slice(0);

for (a = t, s = [], l = b.preFilter;
a;) { 
for (o in n && !(i = j.exec(a)) || (i && (a = a.slice(i[0].length) || a), s.push(r = [])), n = !1, (i = W.exec(a)) && (n = i.shift(), r.push({ value: n, type: i[0].replace(H, " ") }), a = a.slice(n.length)), b.filter) !(i = Y[o].exec(a)) || l[o] && !(i = l[o](i)) || (n = i.shift(), r.push({ value: n, type: o, matches: i }), a = a.slice(n.length));
if (!n)
break }
return e ? a.length : a ? ot.error(t) : S(t, s).slice(0) }, f = ot.compile = function (t, e) {
var n, m, v, g, S, i, r = [], o = [], a = k[t + " "];
if (!a) { 
for (e || (e = p(t)), n = e.length;
n--;)(a = _t(e[n]))[x] ? r.push(a) : o.push(a);
(a = k(t, (m = o, g = 0 < (v = r).length, S = 0 < m.length, i = function (t, e, n, i, r) {
var o, a, s, l = 0, u = "0", c = t && [], f = [], h = w, d = t || S && b.find.TAG("*", r), p = T += null == h ? 1 : Math.random() || .1, y = d.length;

for (r && (w = e === P || e || r);
u !== y && null != (o = d[u]);
u++) {
if (S && o) { 
for (a = 0, e || o.ownerDocument === P || (_(o), n = !C);
s = m[a++];)
if (s(o, e || P, n)) { i.push(o);
break } r && (T = p) } g && ((o = !s && o) && l-- , t && c.push(o)) }
if (l += u, g && u !== l) { 
for (a = 0;
s = v[a++];)
s(c, f, e, n);
if (t) {
if (0 < l) 
for (;
u--;)
c[u] || f[u] || (f[u] = R.call(i));
f = bt(f) } z.apply(i, f), r && !t && 0 < f.length && 1 < l + v.length && ot.uniqueSort(i) }
return r && (T = p, w = h), c }, g ? st(i) : i))).selector = t }
return a }, y = ot.select = function (t, e, n, i) {
var r, o, a, s, l, u = "function" == typeof t && t, c = !i && p(t = u.selector || t);
if (n = n || [], 1 === c.length) {
if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === e.nodeType && C && b.relative[o[1].type]) {
if (!(e = (b.find.ID(a.matches[0].replace(Q, tt), e) || [])[0]))
return n;
u && (e = e.parentNode), t = t.slice(o.shift().value.length) } 
for (r = Y.needsContext.test(t) ? 0 : o.length;
r-- && (a = o[r], !b.relative[s = a.type]);)
if ((l = b.find[s]) && (i = l(a.matches[0].replace(Q, tt), Z.test(o[0].type) && yt(e.parentNode) || e))) {
if (o.splice(r, 1), !(t = i.length && vt(o)))
return z.apply(n, i), n;
break } }
return (u || f(t, c))(i, e, !C, n, !e || Z.test(t) && yt(e.parentNode) || e), n }, d.sortStable = x.split("").sort(D).join("") === x, d.detectDuplicates = !!u, _(), d.sortDetached = lt(function (t) {
return 1 & t.compareDocumentPosition(P.createElement("fieldset")) }), lt(function (t) {
return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href") }) || ut("type|href|height|width", function (t, e, n) {
if (!n)
return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2) }), d.attributes && lt(function (t) {
return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value") }) || ut("value", function (t, e, n) {
if (!n && "input" === t.nodeName.toLowerCase())
return t.defaultValue }), lt(function (t) {
return null == t.getAttribute("disabled") }) || ut(F, function (t, e, n) {
var i;
if (!n)
return !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null }), ot }(P);
x.find = S, x.expr = S.selectors, x.expr[":"] = x.expr.pseudos, x.uniqueSort = x.unique = S.uniqueSort, x.text = S.getText, x.isXMLDoc = S.isXML, x.contains = S.contains, x.escapeSelector = S.escape;
var b = function (t, e, n) { 
for (var i = [], r = void 0 !== n;
(t = t[e]) && 9 !== t.nodeType;)
if (1 === t.nodeType) {
if (r && x(t).is(n))
break;
i.push(t) }
return i }, w = function (t, e) { 
for (var n = [];
t;
t = t.nextSibling)1 === t.nodeType && t !== e && n.push(t);
return n }, _ = x.expr.match.needsContext;
function T(t, e) {
return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase() }
var k = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, D = /^.[^:#\[\.,]*$/;
function M(t, n, i) {
return x.isFunction(n) ? x.grep(t, function (t, e) {
return !!n.call(t, e, t) !== i }) : n.nodeType ? x.grep(t, function (t) {
return t === n !== i }) : "string" != typeof n ? x.grep(t, function (t) {
return -1 < r.call(n, t) !== i }) : D.test(n) ? x.filter(n, t, i) : (n = x.filter(n, t), x.grep(t, function (t) {
return -1 < r.call(n, t) !== i && 1 === t.nodeType })) } x.filter = function (t, e, n) {
var i = e[0];
return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? x.find.matchesSelector(i, t) ? [i] : [] : x.find.matches(t, x.grep(e, function (t) {
return 1 === t.nodeType })) }, x.fn.extend({ find: function (t) {
var e, n, i = this.length, r = this;
if ("string" != typeof t)
return this.pushStack(x(t).filter(function () { 
for (e = 0;
e < i;
e++)
if (x.contains(r[e], this))
return !0 }));

for (n = this.pushStack([]), e = 0;
e < i;
e++)
x.find(t, r[e], n);
return 1 < i ? x.uniqueSort(n) : n }, filter: function (t) {
return this.pushStack(M(this, t || [], !1)) }, not: function (t) {
return this.pushStack(M(this, t || [], !0)) }, is: function (t) {
return !!M(this, "string" == typeof t && _.test(t) ? x(t) : t || [], !1).length } });
var R, E = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
(x.fn.init = function (t, e, n) {
var i, r;
if (!t)
return this;
if (n = n || R, "string" != typeof t)
return t.nodeType ? (this[0] = t, this.length = 1, this) : x.isFunction(t) ? void 0 !== n.ready ? n.ready(t) : t(x) : x.makeArray(t, this);
if (!(i = "<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length ? [null, t, null] : E.exec(t)) || !i[1] && e)
return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
if (i[1]) {
if (e = e instanceof x ? e[0] : e, x.merge(this, x.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : C, !0)), k.test(i[1]) && x.isPlainObject(e)) 
for (i in e) x.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
return this }
return (r = C.getElementById(i[2])) && (this[0] = r, this.length = 1), this }).prototype = x.fn, R = x(C);
var z = /^(?:parents|prev(?:Until|All))/, I = { children: !0, contents: !0, next: !0, prev: !0 };
function A(t, e) { 
for (;
(t = t[e]) && 1 !== t.nodeType;);
return t } x.fn.extend({ has: function (t) {
var e = x(t, this), n = e.length;
return this.filter(function () { 
for (var t = 0;
t < n;
t++)
if (x.contains(this, e[t]))
return !0 }) }, closest: function (t, e) {
var n, i = 0, r = this.length, o = [], a = "string" != typeof t && x(t);
if (!_.test(t)) 
for (;
i < r;
i++)
for (n = this[i];
n && n !== e;
n = n.parentNode)
if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && x.find.matchesSelector(n, t))) { o.push(n);
break }
return this.pushStack(1 < o.length ? x.uniqueSort(o) : o) }, index: function (t) {
return t ? "string" == typeof t ? r.call(x(t), this[0]) : r.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (t, e) {
return this.pushStack(x.uniqueSort(x.merge(this.get(), x(t, e)))) }, addBack: function (t) {
return this.add(null == t ? this.prevObject : this.prevObject.filter(t)) } }), x.each({ parent: function (t) {
var e = t.parentNode;
return e && 11 !== e.nodeType ? e : null }, parents: function (t) {
return b(t, "parentNode") }, parentsUntil: function (t, e, n) {
return b(t, "parentNode", n) }, next: function (t) {
return A(t, "nextSibling") }, prev: function (t) {
return A(t, "previousSibling") }, nextAll: function (t) {
return b(t, "nextSibling") }, prevAll: function (t) {
return b(t, "previousSibling") }, nextUntil: function (t, e, n) {
return b(t, "nextSibling", n) }, prevUntil: function (t, e, n) {
return b(t, "previousSibling", n) }, siblings: function (t) {
return w((t.parentNode || {}).firstChild, t) }, children: function (t) {
return w(t.firstChild) }, contents: function (t) {
return T(t, "iframe") ? t.contentDocument : (T(t, "template") && (t = t.content || t), x.merge([], t.childNodes)) } }, function (i, r) { x.fn[i] = function (t, e) {
var n = x.map(this, r, t);
return "Until" !== i.slice(-5) && (e = t), e && "string" == typeof e && (n = x.filter(e, n)), 1 < this.length && (I[i] || x.uniqueSort(n), z.test(i) && n.reverse()), this.pushStack(n) } });
var F = /[^\x20\t\r\n\f]+/g;
function O(t) {
return t } function B(t) { throw t } function L(t, e, n, i) {
var r;
try { t && x.isFunction(r = t.promise) ? r.call(t).done(e).fail(n) : t && x.isFunction(r = t.then) ? r.call(t, e, n) : e.apply(void 0, [t].slice(i)) } catch (t) { n.apply(void 0, [t]) } } x.Callbacks = function (i) {
var t, n;
i = "string" == typeof i ? (t = i, n = {}, x.each(t.match(F) || [], function (t, e) { n[e] = !0 }), n) : x.extend({}, i);
var r, e, o, a, s = [], l = [], u = -1, c = function () { 
for (a = a || i.once, o = r = !0;
l.length;
u = -1)
for (e = l.shift();
++u < s.length;)!1 === s[u].apply(e[0], e[1]) && i.stopOnFalse && (u = s.length, e = !1);
i.memory || (e = !1), r = !1, a && (s = e ? [] : "") }, f = { add: function () {
return s && (e && !r && (u = s.length - 1, l.push(e)), function n(t) { x.each(t, function (t, e) { x.isFunction(e) ? i.unique && f.has(e) || s.push(e) : e && e.length && "string" !== x.type(e) && n(e) }) }(arguments), e && !r && c()), this }, remove: function () {
return x.each(arguments, function (t, e) { 
for (var n;
-1 < (n = x.inArray(e, s, n));)
s.splice(n, 1), n <= u && u-- }), this }, has: function (t) {
return t ? -1 < x.inArray(t, s) : 0 < s.length }, empty: function () {
return s && (s = []), this }, disable: function () {
return a = l = [], s = e = "", this }, disabled: function () {
return !s }, lock: function () {
return a = l = [], e || r || (s = e = ""), this }, locked: function () {
return !!a }, fireWith: function (t, e) {
return a || (e = [t, (e = e || []).slice ? e.slice() : e], l.push(e), r || c()), this }, fire: function () {
return f.fireWith(this, arguments), this }, fired: function () {
return !!o } };
return f }, x.extend({ Deferred: function (t) {
var o = [["notify", "progress", x.Callbacks("memory"), x.Callbacks("memory"), 2], ["resolve", "done", x.Callbacks("once memory"), x.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", x.Callbacks("once memory"), x.Callbacks("once memory"), 1, "rejected"]], r = "pending", a = { state: function () {
return r }, always: function () {
return s.done(arguments).fail(arguments), this }, catch: function (t) {
return a.then(null, t) }, pipe: function () {
var r = arguments;
return x.Deferred(function (i) { x.each(o, function (t, e) {
var n = x.isFunction(r[e[4]]) && r[e[4]];
s[e[1]](function () {
var t = n && n.apply(this, arguments);
t && x.isFunction(t.promise) ? t.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[e[0] + "With"](this, n ? [t] : arguments) }) }), r = null }).promise() }, then: function (e, n, i) {
var l = 0;
function u(r, o, a, s) {
return function () {
var n = this, i = arguments, t = function () {
var t, e;
if (!(r < l)) {
if ((t = a.apply(n, i)) === o.promise()) throw new TypeError("Thenable self-resolution");
e = t && ("object" === (void 0 === t ? "undefined" : We(t)) || "function" == typeof t) && t.then, x.isFunction(e) ? s ? e.call(t, u(l, o, O, s), u(l, o, B, s)) : (l++ , e.call(t, u(l, o, O, s), u(l, o, B, s), u(l, o, O, o.notifyWith))) : (a !== O && (n = void 0, i = [t]), (s || o.resolveWith)(n, i)) } }, e = s ? t : function () { try { t() } catch (t) { x.Deferred.exceptionHook && x.Deferred.exceptionHook(t, e.stackTrace), l <= r + 1 && (a !== B && (n = void 0, i = [t]), o.rejectWith(n, i)) } };
r ? e() : (x.Deferred.getStackHook && (e.stackTrace = x.Deferred.getStackHook()), P.setTimeout(e)) } }
return x.Deferred(function (t) { o[0][3].add(u(0, t, x.isFunction(i) ? i : O, t.notifyWith)), o[1][3].add(u(0, t, x.isFunction(e) ? e : O)), o[2][3].add(u(0, t, x.isFunction(n) ? n : B)) }).promise() }, promise: function (t) {
return null != t ? x.extend(t, a) : a } }, s = {};
return x.each(o, function (t, e) {
var n = e[2], i = e[5];
a[e[1]] = n.add, i && n.add(function () { r = i }, o[3 - t][2].disable, o[0][2].lock), n.add(e[3].fire), s[e[0]] = function () {
return s[e[0] + "With"](this === s ? void 0 : this, arguments), this }, s[e[0] + "With"] = n.fireWith }), a.promise(s), t && t.call(s, s), s }, when: function (t) {
var n = arguments.length, e = n, i = Array(e), r = s.call(arguments), o = x.Deferred(), a = function (e) {
return function (t) { i[e] = this, r[e] = 1 < arguments.length ? s.call(arguments) : t, --n || o.resolveWith(i, r) } };
if (n <= 1 && (L(t, o.done(a(e)).resolve, o.reject, !n), "pending" === o.state() || x.isFunction(r[e] && r[e].then)))
return o.then();

for (;
e--;)
L(r[e], a(e), o.reject);
return o.promise() } });
var N = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)
Error$/;
x.Deferred.exceptionHook = function (t, e) { P.console && P.console.warn && t && N.test(t.name) && P.console.warn("jQuery.Deferred exception: " + t.message, t.stack, e) }, x.readyException = function (t) { P.setTimeout(function () { throw t }) };
var q = x.Deferred();
function H() { C.removeEventListener("DOMContentLoaded", H), P.removeEventListener("load", H), x.ready() } x.fn.ready = function (t) {
return q.then(t).catch(function (t) { x.readyException(t) }), this }, x.extend({ isReady: !1, readyWait: 1, ready: function (t) { (!0 === t ? --x.readyWait : x.isReady) || (x.isReady = !0) !== t && 0 < --x.readyWait || q.resolveWith(C, [x]) } }), x.ready.then = q.then, "complete" === C.readyState || "loading" !== C.readyState && !C.documentElement.doScroll ? P.setTimeout(x.ready) : (C.addEventListener("DOMContentLoaded", H), P.addEventListener("load", H));
var j = function t(e, n, i, r, o, a, s) {
var l = 0, u = e.length, c = null == i;
if ("object" === x.type(i)) 
for (l in o = !0, i) t(e, n, l, i[l], !0, a, s);
else if (void 0 !== r && (o = !0, x.isFunction(r) || (s = !0), c && (n = s ? (n.call(e, r), null) : (c = n, function (t, e, n) {
return c.call(x(t), n) })), n)) 
for (;
l < u;
l++)
n(e[l], i, s ? r : r.call(e[l], l, n(e[l], i)));
return o ? e : c ? n.call(e) : u ? n(e[0], i) : a }, W = function (t) {
return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType };
function U() { this.expando = x.expando + U.uid++ } U.uid = 1, U.prototype = { cache: function (t) {
var e = t[this.expando];
return e || (e = {}, W(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, { value: e, configurable: !0 }))), e }, set: function (t, e, n) {
var i, r = this.cache(t);
if ("string" == typeof e) r[x.camelCase(e)] = n;
else

for (i in e) r[x.camelCase(i)] = e[i];
return r }, get: function (t, e) {
return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][x.camelCase(e)] }, access: function (t, e, n) {
return void 0 === e || e && "string" == typeof e && void 0 === n ? this.get(t, e) : (this.set(t, e, n), void 0 !== n ? n : e) }, remove: function (t, e) {
var n, i = t[this.expando];
if (void 0 !== i) {
if (void 0 !== e) { n = (e = Array.isArray(e) ? e.map(x.camelCase) : (e = x.camelCase(e)) in i ? [e] : e.match(F) || []).length;

for (;
n--;)
delete i[e[n]] } (void 0 === e || x.isEmptyObject(i)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando]) } }, hasData: function (t) {
var e = t[this.expando];
return void 0 !== e && !x.isEmptyObject(e) } };
var G = new U, V = new U, Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, X = /[A-Z]/g;
function J(t, e, n) {
var i, r;
if (void 0 === n && 1 === t.nodeType)
if (i = "data-" + e.replace(X, "-$&").toLowerCase(), "string" == typeof (n = t.getAttribute(i))) { try { n = "true" === (r = n) || "false" !== r && ("null" === r ? null : r === +r + "" ? +r : Y.test(r) ? JSON.parse(r) : r) } catch (t) { } V.set(t, e, n) }
else
n = void 0;
return n } x.extend({ hasData: function (t) {
return V.hasData(t) || G.hasData(t) }, data: function (t, e, n) {
return V.access(t, e, n) }, removeData: function (t, e) { V.remove(t, e) }, _data: function (t, e, n) {
return G.access(t, e, n) }, _removeData: function (t, e) { G.remove(t, e) } }), x.fn.extend({ data: function (n, t) {
var e, i, r, o = this[0], a = o && o.attributes;
if (void 0 !== n)
return "object" === (void 0 === n ? "undefined" : We(n)) ? this.each(function () { V.set(this, n) }) : j(this, function (t) {
var e;
if (o && void 0 === t)
return void 0 !== (e = V.get(o, n)) ? e : void 0 !== (e = J(o, n)) ? e : void 0;
this.each(function () { V.set(this, n, t) }) }, null, t, 1 < arguments.length, null, !0);
if (this.length && (r = V.get(o), 1 === o.nodeType && !G.get(o, "hasDataAttrs"))) { 
for (e = a.length;
e--;)
a[e] && 0 === (i = a[e].name).indexOf("data-") && (i = x.camelCase(i.slice(5)), J(o, i, r[i]));
G.set(o, "hasDataAttrs", !0) }
return r }, removeData: function (t) {
return this.each(function () { V.remove(this, t) }) } }), x.extend({ queue: function (t, e, n) {
var i;
if (t)
return e = (e || "fx") + "queue", i = G.get(t, e), n && (!i || Array.isArray(n) ? i = G.access(t, e, x.makeArray(n)) : i.push(n)), i || [] }, dequeue: function (t, e) { e = e || "fx";
var n = x.queue(t, e), i = n.length, r = n.shift(), o = x._queueHooks(t, e);
"inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete o.stop, r.call(t, function () { x.dequeue(t, e) }, o)), !i && o && o.empty.fire() }, _queueHooks: function (t, e) {
var n = e + "queueHooks";
return G.get(t, n) || G.access(t, n, { empty: x.Callbacks("once memory").add(function () { G.remove(t, [e + "queue", n]) }) }) } }), x.fn.extend({ queue: function (e, n) {
var t = 2;
return "string" != typeof e && (n = e, e = "fx", t--), arguments.length < t ? x.queue(this[0], e) : void 0 === n ? this : this.each(function () {
var t = x.queue(this, e, n);
x._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && x.dequeue(this, e) }) }, dequeue: function (t) {
return this.each(function () { x.dequeue(this, t) }) }, clearQueue: function (t) {
return this.queue(t || "fx", []) }, promise: function (t, e) {
var n, i = 1, r = x.Deferred(), o = this, a = this.length, s = function () { --i || r.resolveWith(o, [o]) };

for ("string" != typeof t && (e = t, t = void 0), t = t || "fx";
a--;)(n = G.get(o[a], t + "queueHooks")) && n.empty && (i++ , n.empty.add(s));
return s(), r.promise(e) } });
var $ = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, K = new RegExp("^(?:([+-])=|)(" + $ + ")([a-z%]*)$", "i"), Z = ["Top", "Right", "Bottom", "Left"], Q = function (t, e) {
return "none" === (t = e || t).style.display || "" === t.style.display && x.contains(t.ownerDocument, t) && "none" === x.css(t, "display") }, tt = function (t, e, n, i) {
var r, o, a = {};

for (o in e) a[o] = t.style[o], t.style[o] = e[o];

for (o in r = n.apply(t, i || []), e) t.style[o] = a[o];
return r };
function et(t, e, n, i) {
var r, o = 1, a = 20, s = i ? function () {
return i.cur() } : function () {
return x.css(t, e, "") }, l = s(), u = n && n[3] || (x.cssNumber[e] ? "" : "px"), c = (x.cssNumber[e] || "px" !== u && +l) && K.exec(x.css(t, e));
if (c && c[3] !== u) 
for (u = u || c[3], n = n || [], c = +l || 1;
c /= o = o || ".5", x.style(t, e, c + u), o !== (o = s() / l) && 1 !== o && --a;);
return n && (c = +c || +l || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = r)), r }
var nt = {};
function it(t, e) { 
for (var n, i, r, o, a, s, l, u = [], c = 0, f = t.length;
c < f;
c++)(i = t[c]).style && (n = i.style.display, e ? ("none" === n && (u[c] = G.get(i, "display") || null, u[c] || (i.style.display = "")), "" === i.style.display && Q(i) && (u[c] = (l = a = o = void 0, a = (r = i).ownerDocument, s = r.nodeName, (l = nt[s]) || (o = a.body.appendChild(a.createElement(s)), l = x.css(o, "display"), o.parentNode.removeChild(o), "none" === l && (l = "block"), nt[s] = l)))) : "none" !== n && (u[c] = "none", G.set(i, "display", n)));

for (c = 0;
c < f;
c++)
null != u[c] && (t[c].style.display = u[c]);
return t } x.fn.extend({ show: function () {
return it(this, !0) }, hide: function () {
return it(this) }, toggle: function (t) {
return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () { Q(this) ? x(this).show() : x(this).hide() }) } });
var rt = /^(?:checkbox|radio)$/i, ot = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, at = /^$|\/(?:java|ecma)
script/i, st = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
function lt(t, e) {
var n;
return n = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && T(t, e) ? x.merge([t], n) : n } function ut(t, e) { 
for (var n = 0, i = t.length;
n < i;
n++)
G.set(t[n], "globalEval", !e || G.get(e[n], "globalEval")) } st.optgroup = st.option, st.tbody = st.tfoot = st.colgroup = st.caption = st.thead, st.th = st.td;
var ct, ft, ht = /<|&#?\w+;/;
function dt(t, e, n, i, r) { 
for (var o, a, s, l, u, c, f = e.createDocumentFragment(), h = [], d = 0, p = t.length;
d < p;
d++)
if ((o = t[d]) || 0 === o)
if ("object" === x.type(o)) x.merge(h, o.nodeType ? [o] : o);
else if (ht.test(o)) { 
for (a = a || f.appendChild(e.createElement("div")), s = (ot.exec(o) || ["", ""])[1].toLowerCase(), l = st[s] || st._default, a.innerHTML = l[1] + x.htmlPrefilter(o) + l[2], c = l[0];
c--;)
a = a.lastChild;
x.merge(h, a.childNodes), (a = f.firstChild).textContent = "" }
else
h.push(e.createTextNode(o));

for (f.textContent = "", d = 0;
o = h[d++];)
if (i && -1 < x.inArray(o, i)) r && r.push(o);
else if (u = x.contains(o.ownerDocument, o), a = lt(f.appendChild(o), "script"), u && ut(a), n) 
for (c = 0;
o = a[c++];)
at.test(o.type || "") && n.push(o);
return f } ct = C.createDocumentFragment().appendChild(C.createElement("div")), (ft = C.createElement("input")).setAttribute("type", "radio"), ft.setAttribute("checked", "checked"), ft.setAttribute("name", "t"), ct.appendChild(ft), m.checkClone = ct.cloneNode(!0).cloneNode(!0).lastChild.checked, ct.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!ct.cloneNode(!0).lastChild.defaultValue;
var pt = C.documentElement, yt = /^key/, mt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, vt = /^([^.]*)(?:\.(.+)|)/;
function gt() {
return !0 } function St() {
return !1 } function bt() { try {
return C.activeElement } catch (t) { } } function wt(t, e, n, i, r, o) {
var a, s;
if ("object" === (void 0 === e ? "undefined" : We(e))) { 
for (s in "string" != typeof n && (i = i || n, n = void 0), e) wt(t, s, n, i, e[s], o);
return t }
if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), !1 === r) r = St;
else if (!r)
return t;
return 1 === o && (a = r, (r = function (t) {
return x().off(t), a.apply(this, arguments) }).guid = a.guid || (a.guid = x.guid++)), t.each(function () { x.event.add(this, e, r, i, n) }) } x.event = { global: {}, add: function (e, t, n, i, r) {
var o, a, s, l, u, c, f, h, d, p, y, m = G.get(e);
if (m) 
for (n.handler && (n = (o = n).handler, r = o.selector), r && x.find.matchesSelector(pt, r), n.guid || (n.guid = x.guid++), (l = m.events) || (l = m.events = {}), (a = m.handle) || (a = m.handle = function (t) {
return void 0 !== x && x.event.triggered !== t.type ? x.event.dispatch.apply(e, arguments) : void 0 }), u = (t = (t || "").match(F) || [""]).length;
u--;)
d = y = (s = vt.exec(t[u]) || [])[1], p = (s[2] || "").split(".").sort(), d && (f = x.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, f = x.event.special[d] || {}, c = x.extend({ type: d, origType: y, data: i, handler: n, guid: n.guid, selector: r, needsContext: r && x.expr.match.needsContext.test(r), namespace: p.join(".") }, o), (h = l[d]) || ((h = l[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, i, p, a) || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), r ? h.splice(h.delegateCount++, 0, c) : h.push(c), x.event.global[d] = !0) }, remove: function (t, e, n, i, r) {
var o, a, s, l, u, c, f, h, d, p, y, m = G.hasData(t) && G.get(t);
if (m && (l = m.events)) { 
for (u = (e = (e || "").match(F) || [""]).length;
u--;)
if (d = y = (s = vt.exec(e[u]) || [])[1], p = (s[2] || "").split(".").sort(), d) { 
for (f = x.event.special[d] || {}, h = l[d = (i ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = h.length;
o--;)
c = h[o], !r && y !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (h.splice(o, 1), c.selector && h.delegateCount-- , f.remove && f.remove.call(t, c));
a && !h.length && (f.teardown && !1 !== f.teardown.call(t, p, m.handle) || x.removeEvent(t, d, m.handle), delete l[d]) }
else

for (d in l) x.event.remove(t, d + e[u], n, i, !0);
x.isEmptyObject(l) && G.remove(t, "handle events") } }, dispatch: function (t) {
var e, n, i, r, o, a, s = x.event.fix(t), l = new Array(arguments.length), u = (G.get(this, "events") || {})[s.type] || [], c = x.event.special[s.type] || {};

for (l[0] = s, e = 1;
e < arguments.length;
e++)
l[e] = arguments[e];
if (s.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, s)) { 
for (a = x.event.handlers.call(this, s, u), e = 0;
(r = a[e++]) && !s.isPropagationStopped();)
for (s.currentTarget = r.elem, n = 0;
(o = r.handlers[n++]) && !s.isImmediatePropagationStopped();)
s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, void 0 !== (i = ((x.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, l)) && !1 === (s.result = i) && (s.preventDefault(), s.stopPropagation()));
return c.postDispatch && c.postDispatch.call(this, s), s.result } }, handlers: function (t, e) {
var n, i, r, o, a, s = [], l = e.delegateCount, u = t.target;
if (l && u.nodeType && !("click" === t.type && 1 <= t.button)) 
for (;
u !== this;
u = u.parentNode || this)
if (1 === u.nodeType && ("click" !== t.type || !0 !== u.disabled)) { 
for (o = [], a = {}, n = 0;
n < l;
n++)
void 0 === a[r = (i = e[n]).selector + " "] && (a[r] = i.needsContext ? -1 < x(r, this).index(u) : x.find(r, this, null, [u]).length), a[r] && o.push(i);
o.length && s.push({ elem: u, handlers: o }) }
return u = this, l < e.length && s.push({ elem: u, handlers: e.slice(l) }), s }, addProp: function (e, t) { Object.defineProperty(x.Event.prototype, e, { enumerable: !0, configurable: !0, get: x.isFunction(t) ? function () {
if (this.originalEvent)
return t(this.originalEvent) } : function () {
if (this.originalEvent)
return this.originalEvent[e] }, set: function (t) { Object.defineProperty(this, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) } }) }, fix: function (t) {
return t[x.expando] ? t : new x.Event(t) }, special: { load: { noBubble: !0 }, focus: { trigger: function () {
if (this !== bt() && this.focus)
return this.focus(), !1 }, delegateType: "focusin" }, blur: { trigger: function () {
if (this === bt() && this.blur)
return this.blur(), !1 }, delegateType: "focusout" }, click: { trigger: function () {
if ("checkbox" === this.type && this.click && T(this, "input"))
return this.click(), !1 }, _default: function (t) {
return T(t.target, "a") } }, beforeunload: { postDispatch: function (t) { void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result) } } } }, x.removeEvent = function (t, e, n) { t.removeEventListener && t.removeEventListener(e, n) }, x.Event = function (t, e) {
if (!(this instanceof x.Event))
return new x.Event(t, e);
t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? gt : St, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && x.extend(this, e), this.timeStamp = t && t.timeStamp || x.now(), this[x.expando] = !0 }, x.Event.prototype = { constructor: x.Event, isDefaultPrevented: St, isPropagationStopped: St, isImmediatePropagationStopped: St, isSimulated: !1, preventDefault: function () {
var t = this.originalEvent;
this.isDefaultPrevented = gt, t && !this.isSimulated && t.preventDefault() }, stopPropagation: function () {
var t = this.originalEvent;
this.isPropagationStopped = gt, t && !this.isSimulated && t.stopPropagation() }, stopImmediatePropagation: function () {
var t = this.originalEvent;
this.isImmediatePropagationStopped = gt, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation() } }, x.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, char: !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function (t) {
var e = t.button;
return null == t.which && yt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && mt.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which } }, x.event.addProp), x.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (t, r) { x.event.special[t] = { delegateType: r, bindType: r, handle: function (t) {
var e, n = t.relatedTarget, i = t.handleObj;
return n && (n === this || x.contains(this, n)) || (t.type = i.origType, e = i.handler.apply(this, arguments), t.type = r), e } } }), x.fn.extend({ on: function (t, e, n, i) {
return wt(this, t, e, n, i) }, one: function (t, e, n, i) {
return wt(this, t, e, n, i, 1) }, off: function (t, e, n) {
var i, r;
if (t && t.preventDefault && t.handleObj)
return i = t.handleObj, x(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
if ("object" !== (void 0 === t ? "undefined" : We(t)))
return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = St), this.each(function () { x.event.remove(this, t, n, e) });

for (r in t) this.off(r, e, t[r]);
return this } });
var _t = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, Pt = /<script|<style|<link/i, Ct = /checked\s*(?:[^=]|=\s*.checked.)/i, xt = /^true\/(.*)/, Tt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
function kt(t, e) {
return T(t, "table") && T(11 !== e.nodeType ? e : e.firstChild, "tr") && x(">tbody", t)[0] || t } function Dt(t) {
return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t } function Mt(t) {
var e = xt.exec(t.type);
return e ? t.type = e[1] : t.removeAttribute("type"), t } function Rt(t, e) {
var n, i, r, o, a, s, l, u;
if (1 === e.nodeType) {
if (G.hasData(t) && (o = G.access(t), a = G.set(e, o), u = o.events)) 
for (r in delete a.handle, a.events = {}, u) 
for (n = 0, i = u[r].length;
n < i;
n++)
x.event.add(e, r, u[r][n]);
V.hasData(t) && (s = V.access(t), l = x.extend({}, s), V.set(e, l)) } } function Et(n, i, r, o) { i = y.apply([], i);
var t, e, a, s, l, u, c = 0, f = n.length, h = f - 1, d = i[0], p = x.isFunction(d);
if (p || 1 < f && "string" == typeof d && !m.checkClone && Ct.test(d))
return n.each(function (t) {
var e = n.eq(t);
p && (i[0] = d.call(this, t, e.html())), Et(e, i, r, o) });
if (f && (e = (t = dt(i, n[0].ownerDocument, !1, n, o)).firstChild, 1 === t.childNodes.length && (t = e), e || o)) { 
for (s = (a = x.map(lt(t, "script"), Dt)).length;
c < f;
c++)
l = t, c !== h && (l = x.clone(l, !0, !0), s && x.merge(a, lt(l, "script"))), r.call(n[c], l, c);
if (s) 
for (u = a[a.length - 1].ownerDocument, x.map(a, Mt), c = 0;
c < s;
c++)
l = a[c], at.test(l.type || "") && !G.access(l, "globalEval") && x.contains(u, l) && (l.src ? x._evalUrl && x._evalUrl(l.src) : v(l.textContent.replace(Tt, ""), u)) }
return n } function zt(t, e, n) { 
for (var i, r = e ? x.filter(e, t) : t, o = 0;
null != (i = r[o]);
o++)
n || 1 !== i.nodeType || x.cleanData(lt(i)), i.parentNode && (n && x.contains(i.ownerDocument, i) && ut(lt(i, "script")), i.parentNode.removeChild(i));
return t } x.extend({ htmlPrefilter: function (t) {
return t.replace(_t, "<$1></$2>") }, clone: function (t, e, n) {
var i, r, o, a, s, l, u, c = t.cloneNode(!0), f = x.contains(t.ownerDocument, t);
if (!(m.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || x.isXMLDoc(t))) 
for (a = lt(c), i = 0, r = (o = lt(t)).length;
i < r;
i++)
s = o[i], l = a[i], void 0, "input" === (u = l.nodeName.toLowerCase()) && rt.test(s.type) ? l.checked = s.checked : "input" !== u && "textarea" !== u || (l.defaultValue = s.defaultValue);
if (e)
if (n) 
for (o = o || lt(t), a = a || lt(c), i = 0, r = o.length;
i < r;
i++)
Rt(o[i], a[i]);
else
Rt(t, c);
return 0 < (a = lt(c, "script")).length && ut(a, !f && lt(t, "script")), c }, cleanData: function (t) { 
for (var e, n, i, r = x.event.special, o = 0;
void 0 !== (n = t[o]);
o++)
if (W(n)) {
if (e = n[G.expando]) {
if (e.events) 
for (i in e.events) r[i] ? x.event.remove(n, i) : x.removeEvent(n, i, e.handle);
n[G.expando] = void 0 } n[V.expando] && (n[V.expando] = void 0) } } }), x.fn.extend({ detach: function (t) {
return zt(this, t, !0) }, remove: function (t) {
return zt(this, t) }, text: function (t) {
return j(this, function (t) {
return void 0 === t ? x.text(this) : this.empty().each(function () { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t) }) }, null, t, arguments.length) }, append: function () {
return Et(this, arguments, function (t) { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || kt(this, t).appendChild(t) }) }, prepend: function () {
return Et(this, arguments, function (t) {
if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
var e = kt(this, t);
e.insertBefore(t, e.firstChild) } }) }, before: function () {
return Et(this, arguments, function (t) { this.parentNode && this.parentNode.insertBefore(t, this) }) }, after: function () {
return Et(this, arguments, function (t) { this.parentNode && this.parentNode.insertBefore(t, this.nextSibling) }) }, empty: function () { 
for (var t, e = 0;
null != (t = this[e]);
e++)1 === t.nodeType && (x.cleanData(lt(t, !1)), t.textContent = "");
return this }, clone: function (t, e) {
return t = null != t && t, e = null == e ? t : e, this.map(function () {
return x.clone(this, t, e) }) }, html: function (t) {
return j(this, function (t) {
var e = this[0] || {}, n = 0, i = this.length;
if (void 0 === t && 1 === e.nodeType)
return e.innerHTML;
if ("string" == typeof t && !Pt.test(t) && !st[(ot.exec(t) || ["", ""])[1].toLowerCase()]) { t = x.htmlPrefilter(t);
try { 
for (;
n < i;
n++)1 === (e = this[n] || {}).nodeType && (x.cleanData(lt(e, !1)), e.innerHTML = t);
e = 0 } catch (t) { } } e && this.empty().append(t) }, null, t, arguments.length) }, replaceWith: function () {
var n = [];
return Et(this, arguments, function (t) {
var e = this.parentNode;
x.inArray(this, n) < 0 && (x.cleanData(lt(this)), e && e.replaceChild(t, this)) }, n) } }), x.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (t, a) { x.fn[t] = function (t) { 
for (var e, n = [], i = x(t), r = i.length - 1, o = 0;
o <= r;
o++)
e = o === r ? this : this.clone(!0), x(i[o])[a](e), l.apply(n, e.get());
return this.pushStack(n) } });
var It = /^margin/, At = new RegExp("^(" + $ + ")(?!px)[a-z%]+$", "i"), Ft = function (t) {
var e = t.ownerDocument.defaultView;
return e && e.opener || (e = P), e.getComputedStyle(t) };
function Ot(t, e, n) {
var i, r, o, a, s = t.style;
return (n = n || Ft(t)) && ("" !== (a = n.getPropertyValue(e) || n[e]) || x.contains(t.ownerDocument, t) || (a = x.style(t, e)), !m.pixelMarginRight() && At.test(a) && It.test(e) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o)), void 0 !== a ? a + "" : a } function Bt(t, e) {
return { get: function () {
if (!t())
return (this.get = e).apply(this, arguments);
delete this.get } } } !function () { function t() {
if (a) { a.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", pt.appendChild(o);
var t = P.getComputedStyle(a);
e = "1%" !== t.top, r = "2px" === t.marginLeft, n = "4px" === t.width, a.style.marginRight = "50%", i = "4px" === t.marginRight, pt.removeChild(o), a = null } }
var e, n, i, r, o = C.createElement("div"), a = C.createElement("div");
a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", o.appendChild(a), x.extend(m, { pixelPosition: function () {
return t(), e }, boxSizingReliable: function () {
return t(), n }, pixelMarginRight: function () {
return t(), i }, reliableMarginLeft: function () {
return t(), r } })) }();
var Lt = /^(none|table(?!-c[ea]).+)/, Nt = /^--/, qt = { position: "absolute", visibility: "hidden", display: "block" }, Ht = { letterSpacing: "0", fontWeight: "400" }, jt = ["Webkit", "Moz", "ms"], Wt = C.createElement("div").style;
function Ut(t) {
var e = x.cssProps[t];
return e || (e = x.cssProps[t] = function (t) {
if (t in Wt)
return t;

for (var e = t[0].toUpperCase() + t.slice(1), n = jt.length;
n--;)
if ((t = jt[n] + e) in Wt)
return t }(t) || t), e } function Gt(t, e, n) {
var i = K.exec(e);
return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e } function Vt(t, e, n, i, r) {
var o, a = 0;

for (o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0;
o < 4;
o += 2)"margin" === n && (a += x.css(t, n + Z[o], !0, r)), i ? ("content" === n && (a -= x.css(t, "padding" + Z[o], !0, r)), "margin" !== n && (a -= x.css(t, "border" + Z[o] + "Width", !0, r))) : (a += x.css(t, "padding" + Z[o], !0, r), "padding" !== n && (a += x.css(t, "border" + Z[o] + "Width", !0, r)));
return a } function Yt(t, e, n) {
var i, r = Ft(t), o = Ot(t, e, r), a = "border-box" === x.css(t, "boxSizing", !1, r);
return At.test(o) ? o : (i = a && (m.boxSizingReliable() || o === t.style[e]), "auto" === o && (o = t["offset" + e[0].toUpperCase() + e.slice(1)]), (o = parseFloat(o) || 0) + Vt(t, e, n || (a ? "border" : "content"), i, r) + "px") } function Xt(t, e, n, i, r) {
return new Xt.prototype.init(t, e, n, i, r) } x.extend({ cssHooks: { opacity: { get: function (t, e) {
if (e) {
var n = Ot(t, "opacity");
return "" === n ? "1" : n } } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { float: "cssFloat" }, style: function (t, e, n, i) {
if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
var r, o, a, s = x.camelCase(e), l = Nt.test(e), u = t.style;
if (l || (e = Ut(s)), a = x.cssHooks[e] || x.cssHooks[s], void 0 === n)
return a && "get" in a && void 0 !== (r = a.get(t, !1, i)) ? r : u[e];
"string" === (o = void 0 === n ? "undefined" : We(n)) && (r = K.exec(n)) && r[1] && (n = et(t, e, r), o = "number"), null != n && n == n && ("number" === o && (n += r && r[3] || (x.cssNumber[s] ? "" : "px")), m.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (u[e] = "inherit"), a && "set" in a && void 0 === (n = a.set(t, n, i)) || (l ? u.setProperty(e, n) : u[e] = n)) } }, css: function (t, e, n, i) {
var r, o, a, s = x.camelCase(e);
return Nt.test(e) || (e = Ut(s)), (a = x.cssHooks[e] || x.cssHooks[s]) && "get" in a && (r = a.get(t, !0, n)), void 0 === r && (r = Ot(t, e, i)), "normal" === r && e in Ht && (r = Ht[e]), "" === n || n ? (o = parseFloat(r), !0 === n || isFinite(o) ? o || 0 : r) : r } }), x.each(["height", "width"], function (t, a) { x.cssHooks[a] = { get: function (t, e, n) {
if (e)
return !Lt.test(x.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? Yt(t, a, n) : tt(t, qt, function () {
return Yt(t, a, n) }) }, set: function (t, e, n) {
var i, r = n && Ft(t), o = n && Vt(t, a, n, "border-box" === x.css(t, "boxSizing", !1, r), r);
return o && (i = K.exec(e)) && "px" !== (i[3] || "px") && (t.style[a] = e, e = x.css(t, a)), Gt(0, e, o) } } }), x.cssHooks.marginLeft = Bt(m.reliableMarginLeft, function (t, e) {
if (e)
return (parseFloat(Ot(t, "marginLeft")) || t.getBoundingClientRect().left - tt(t, { marginLeft: 0 }, function () {
return t.getBoundingClientRect().left })) + "px" }), x.each({ margin: "", padding: "", border: "Width" }, function (r, o) { x.cssHooks[r + o] = { expand: function (t) { 
for (var e = 0, n = {}, i = "string" == typeof t ? t.split(" ") : [t];
e < 4;
e++)
n[r + Z[e] + o] = i[e] || i[e - 2] || i[0];
return n } }, It.test(r) || (x.cssHooks[r + o].set = Gt) }), x.fn.extend({ css: function (t, e) {
return j(this, function (t, e, n) {
var i, r, o = {}, a = 0;
if (Array.isArray(e)) { 
for (i = Ft(t), r = e.length;
a < r;
a++)
o[e[a]] = x.css(t, e[a], !1, i);
return o }
return void 0 !== n ? x.style(t, e, n) : x.css(t, e) }, t, e, 1 < arguments.length) } }), ((x.Tween = Xt).prototype = { constructor: Xt, init: function (t, e, n, i, r, o) { this.elem = t, this.prop = n, this.easing = r || x.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (x.cssNumber[n] ? "" : "px") }, cur: function () {
var t = Xt.propHooks[this.prop];
return t && t.get ? t.get(this) : Xt.propHooks._default.get(this) }, run: function (t) {
var e, n = Xt.propHooks[this.prop];
return this.options.duration ? this.pos = e = x.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Xt.propHooks._default.set(this), this } }).init.prototype = Xt.prototype, (Xt.propHooks = { _default: { get: function (t) {
var e;
return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = x.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0 }, set: function (t) { x.fx.step[t.prop] ? x.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[x.cssProps[t.prop]] && !x.cssHooks[t.prop] ? t.elem[t.prop] = t.now : x.style(t.elem, t.prop, t.now + t.unit) } } }).scrollTop = Xt.propHooks.scrollLeft = { set: function (t) { t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now) } }, x.easing = { linear: function (t) {
return t }, swing: function (t) {
return .5 - Math.cos(t * Math.PI) / 2 }, _default: "swing" }, x.fx = Xt.prototype.init, x.fx.step = {};
var Jt, $t, Kt, Zt, Qt = /^(?:toggle|show|hide)$/, te = /queueHooks$/;
function ee() { $t && (!1 === C.hidden && P.requestAnimationFrame ? P.requestAnimationFrame(ee) : P.setTimeout(ee, x.fx.interval), x.fx.tick()) } function ne() {
return P.setTimeout(function () { Jt = void 0 }), Jt = x.now() } function ie(t, e) {
var n, i = 0, r = { height: t };

for (e = e ? 1 : 0;
i < 4;
i += 2 - e)
r["margin" + (n = Z[i])] = r["padding" + n] = t;
return e && (r.opacity = r.width = t), r } function re(t, e, n) { 
for (var i, r = (oe.tweeners[e] || []).concat(oe.tweeners["*"]), o = 0, a = r.length;
o < a;
o++)
if (i = r[o].call(n, e, t))
return i } function oe(o, t, e) {
var n, a, i = 0, r = oe.prefilters.length, s = x.Deferred().always(function () { delete l.elem }), l = function () {
if (a)
return !1;

for (var t = Jt || ne(), e = Math.max(0, u.startTime + u.duration - t), n = 1 - (e / u.duration || 0), i = 0, r = u.tweens.length;
i < r;
i++)
u.tweens[i].run(n);
return s.notifyWith(o, [u, n, e]), n < 1 && r ? e : (r || s.notifyWith(o, [u, 1, 0]), s.resolveWith(o, [u]), !1) }, u = s.promise({ elem: o, props: x.extend({}, t), opts: x.extend(!0, { specialEasing: {}, easing: x.easing._default }, e), originalProperties: t, originalOptions: e, startTime: Jt || ne(), duration: e.duration, tweens: [], createTween: function (t, e) {
var n = x.Tween(o, u.opts, t, e, u.opts.specialEasing[t] || u.opts.easing);
return u.tweens.push(n), n }, stop: function (t) {
var e = 0, n = t ? u.tweens.length : 0;
if (a)
return this;

for (a = !0;
e < n;
e++)
u.tweens[e].run(1);
return t ? (s.notifyWith(o, [u, 1, 0]), s.resolveWith(o, [u, t])) : s.rejectWith(o, [u, t]), this } }), c = u.props;

for (!function (t, e) {
var n, i, r, o, a;

for (n in t)
if (r = e[i = x.camelCase(n)], o = t[n], Array.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), (a = x.cssHooks[i]) && "expand" in a) 
for (n in o = a.expand(o), delete t[i], o) n in t || (t[n] = o[n], e[n] = r);
else
e[i] = r }(c, u.opts.specialEasing);
i < r;
i++)
if (n = oe.prefilters[i].call(u, o, c, u.opts))
return x.isFunction(n.stop) && (x._queueHooks(u.elem, u.opts.queue).stop = x.proxy(n.stop, n)), n;
return x.map(c, re, u), x.isFunction(u.opts.start) && u.opts.start.call(o, u), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always), x.fx.timer(x.extend(l, { elem: o, anim: u, queue: u.opts.queue })), u } x.Animation = x.extend(oe, { tweeners: { "*": [function (t, e) {
var n = this.createTween(t, e);
return et(n.elem, t, K.exec(e), n), n }] }, tweener: function (t, e) { 
for (var n, i = 0, r = (t = x.isFunction(t) ? (e = t, ["*"]) : t.match(F)).length;
i < r;
i++)
n = t[i], oe.tweeners[n] = oe.tweeners[n] || [], oe.tweeners[n].unshift(e) }, prefilters: [function (t, e, n) {
var i, r, o, a, s, l, u, c, f = "width" in e || "height" in e, h = this, d = {}, p = t.style, y = t.nodeType && Q(t), m = G.get(t, "fxshow");

for (i in n.queue || (null == (a = x._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () { a.unqueued || s() }), a.unqueued++ , h.always(function () { h.always(function () { a.unqueued-- , x.queue(t, "fx").length || a.empty.fire() }) })), e)
if (r = e[i], Qt.test(r)) {
if (delete e[i], o = o || "toggle" === r, r === (y ? "hide" : "show")) {
if ("show" !== r || !m || void 0 === m[i])
continue;
y = !0 } d[i] = m && m[i] || x.style(t, i) }
if ((l = !x.isEmptyObject(e)) || !x.isEmptyObject(d)) 
for (i in f && 1 === t.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], null == (u = m && m.display) && (u = G.get(t, "display")), "none" === (c = x.css(t, "display")) && (u ? c = u : (it([t], !0), u = t.style.display || u, c = x.css(t, "display"), it([t]))), ("inline" === c || "inline-block" === c && null != u) && "none" === x.css(t, "float") && (l || (h.done(function () { p.display = u }), null == u && (c = p.display, u = "none" === c ? "" : c)), p.display = "inline-block")), n.overflow && (p.overflow = "hidden", h.always(function () { p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2] })), l = !1, d) l || (m ? "hidden" in m && (y = m.hidden) : m = G.access(t, "fxshow", { display: u }), o && (m.hidden = !y), y && it([t], !0), h.done(function () { 
for (i in y || it([t]), G.remove(t, "fxshow"), d) x.style(t, i, d[i]) })), l = re(y ? m[i] : 0, i, h), i in m || (m[i] = l.start, y && (l.end = l.start, l.start = 0)) }], prefilter: function (t, e) { e ? oe.prefilters.unshift(t) : oe.prefilters.push(t) } }), x.speed = function (t, e, n) {
var i = t && "object" === (void 0 === t ? "undefined" : We(t)) ? x.extend({}, t) : { complete: n || !n && e || x.isFunction(t) && t, duration: t, easing: n && e || e && !x.isFunction(e) && e };
return x.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in x.fx.speeds ? i.duration = x.fx.speeds[i.duration] : i.duration = x.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () { x.isFunction(i.old) && i.old.call(this), i.queue && x.dequeue(this, i.queue) }, i }, x.fn.extend({ fadeTo: function (t, e, n, i) {
return this.filter(Q).css("opacity", 0).show().end().animate({ opacity: e }, t, n, i) }, animate: function (e, t, n, i) {
var r = x.isEmptyObject(e), o = x.speed(t, n, i), a = function () {
var t = oe(this, x.extend({}, e), o);
(r || G.get(this, "finish")) && t.stop(!0) };
return a.finish = a, r || !1 === o.queue ? this.each(a) : this.queue(o.queue, a) }, stop: function (r, t, o) {
var a = function (t) {
var e = t.stop;
delete t.stop, e(o) };
return "string" != typeof r && (o = t, t = r, r = void 0), t && !1 !== r && this.queue(r || "fx", []), this.each(function () {
var t = !0, e = null != r && r + "queueHooks", n = x.timers, i = G.get(this);
if (e) i[e] && i[e].stop && a(i[e]);
else

for (e in i) i[e] && i[e].stop && te.test(e) && a(i[e]);

for (e = n.length;
e--;)
n[e].elem !== this || null != r && n[e].queue !== r || (n[e].anim.stop(o), t = !1, n.splice(e, 1));
!t && o || x.dequeue(this, r) }) }, finish: function (a) {
return !1 !== a && (a = a || "fx"), this.each(function () {
var t, e = G.get(this), n = e[a + "queue"], i = e[a + "queueHooks"], r = x.timers, o = n ? n.length : 0;

for (e.finish = !0, x.queue(this, a, []), i && i.stop && i.stop.call(this, !0), t = r.length;
t--;)
r[t].elem === this && r[t].queue === a && (r[t].anim.stop(!0), r.splice(t, 1));

for (t = 0;
t < o;
t++)
n[t] && n[t].finish && n[t].finish.call(this);
delete e.finish }) } }), x.each(["toggle", "show", "hide"], function (t, i) {
var r = x.fn[i];
x.fn[i] = function (t, e, n) {
return null == t || "boolean" == typeof t ? r.apply(this, arguments) : this.animate(ie(i, !0), t, e, n) } }), x.each({ slideDown: ie("show"), slideUp: ie("hide"), slideToggle: ie("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (t, i) { x.fn[t] = function (t, e, n) {
return this.animate(i, t, e, n) } }), x.timers = [], x.fx.tick = function () {
var t, e = 0, n = x.timers;

for (Jt = x.now();
e < n.length;
e++)(t = n[e])() || n[e] !== t || n.splice(e--, 1);
n.length || x.fx.stop(), Jt = void 0 }, x.fx.timer = function (t) { x.timers.push(t), x.fx.start() }, x.fx.interval = 13, x.fx.start = function () { $t || ($t = !0, ee()) }, x.fx.stop = function () { $t = null }, x.fx.speeds = { slow: 600, fast: 200, _default: 400 }, x.fn.delay = function (i, t) {
return i = x.fx && x.fx.speeds[i] || i, t = t || "fx", this.queue(t, function (t, e) {
var n = P.setTimeout(t, i);
e.stop = function () { P.clearTimeout(n) } }) }, Kt = C.createElement("input"), Zt = C.createElement("select").appendChild(C.createElement("option")), Kt.type = "checkbox", m.checkOn = "" !== Kt.value, m.optSelected = Zt.selected, (Kt = C.createElement("input")).value = "t", Kt.type = "radio", m.radioValue = "t" === Kt.value;
var ae, se = x.expr.attrHandle;
x.fn.extend({ attr: function (t, e) {
return j(this, x.attr, t, e, 1 < arguments.length) }, removeAttr: function (t) {
return this.each(function () { x.removeAttr(this, t) }) } }), x.extend({ attr: function (t, e, n) {
var i, r, o = t.nodeType;
if (3 !== o && 8 !== o && 2 !== o)
return void 0 === t.getAttribute ? x.prop(t, e, n) : (1 === o && x.isXMLDoc(t) || (r = x.attrHooks[e.toLowerCase()] || (x.expr.match.bool.test(e) ? ae : void 0)), void 0 !== n ? null === n ? void x.removeAttr(t, e) : r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : r && "get" in r && null !== (i = r.get(t, e)) ? i : null == (i = x.find.attr(t, e)) ? void 0 : i) }, attrHooks: { type: { set: function (t, e) {
if (!m.radioValue && "radio" === e && T(t, "input")) {
var n = t.value;
return t.setAttribute("type", e), n && (t.value = n), e } } } }, removeAttr: function (t, e) {
var n, i = 0, r = e && e.match(F);
if (r && 1 === t.nodeType) 
for (;
n = r[i++];)
t.removeAttribute(n) } }), ae = { set: function (t, e, n) {
return !1 === e ? x.removeAttr(t, n) : t.setAttribute(n, n), n } }, x.each(x.expr.match.bool.source.match(/\w+/g), function (t, e) {
var a = se[e] || x.find.attr;
se[e] = function (t, e, n) {
var i, r, o = e.toLowerCase();
return n || (r = se[o], se[o] = i, i = null != a(t, e, n) ? o : null, se[o] = r), i } });
var le = /^(?:input|select|textarea|button)$/i, ue = /^(?:a|area)$/i;
function ce(t) {
return (t.match(F) || []).join(" ") } function fe(t) {
return t.getAttribute && t.getAttribute("class") || "" } x.fn.extend({ prop: function (t, e) {
return j(this, x.prop, t, e, 1 < arguments.length) }, removeProp: function (t) {
return this.each(function () { delete this[x.propFix[t] || t] }) } }), x.extend({ prop: function (t, e, n) {
var i, r, o = t.nodeType;
if (3 !== o && 8 !== o && 2 !== o)
return 1 === o && x.isXMLDoc(t) || (e = x.propFix[e] || e, r = x.propHooks[e]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : t[e] = n : r && "get" in r && null !== (i = r.get(t, e)) ? i : t[e] }, propHooks: { tabIndex: { get: function (t) {
var e = x.find.attr(t, "tabindex");
return e ? parseInt(e, 10) : le.test(t.nodeName) || ue.test(t.nodeName) && t.href ? 0 : -1 } } }, propFix: { 
for: "htmlFor", class: "className" } }), m.optSelected || (x.propHooks.selected = { get: function (t) {
var e = t.parentNode;
return e && e.parentNode && e.parentNode.selectedIndex, null }, set: function (t) {
var e = t.parentNode;
e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex) } }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { x.propFix[this.toLowerCase()] = this }), x.fn.extend({ addClass: function (e) {
var t, n, i, r, o, a, s, l = 0;
if (x.isFunction(e))
return this.each(function (t) { x(this).addClass(e.call(this, t, fe(this))) });
if ("string" == typeof e && e) 
for (t = e.match(F) || [];
n = this[l++];)
if (r = fe(n), i = 1 === n.nodeType && " " + ce(r) + " ") { 
for (a = 0;
o = t[a++];)
i.indexOf(" " + o + " ") < 0 && (i += o + " ");
r !== (s = ce(i)) && n.setAttribute("class", s) }
return this }, removeClass: function (e) {
var t, n, i, r, o, a, s, l = 0;
if (x.isFunction(e))
return this.each(function (t) { x(this).removeClass(e.call(this, t, fe(this))) });
if (!arguments.length)
return this.attr("class", "");
if ("string" == typeof e && e) 
for (t = e.match(F) || [];
n = this[l++];)
if (r = fe(n), i = 1 === n.nodeType && " " + ce(r) + " ") { 
for (a = 0;
o = t[a++];)
for (;
-1 < i.indexOf(" " + o + " ");)
i = i.replace(" " + o + " ", " ");
r !== (s = ce(i)) && n.setAttribute("class", s) }
return this }, toggleClass: function (r, e) {
var o = void 0 === r ? "undefined" : We(r);
return "boolean" == typeof e && "string" === o ? e ? this.addClass(r) : this.removeClass(r) : x.isFunction(r) ? this.each(function (t) { x(this).toggleClass(r.call(this, t, fe(this), e), e) }) : this.each(function () {
var t, e, n, i;
if ("string" === o) 
for (e = 0, n = x(this), i = r.match(F) || [];
t = i[e++];)
n.hasClass(t) ? n.removeClass(t) : n.addClass(t);
else
void 0 !== r && "boolean" !== o || ((t = fe(this)) && G.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === r ? "" : G.get(this, "__className__") || "")) }) }, hasClass: function (t) {
var e, n, i = 0;

for (e = " " + t + " ";
n = this[i++];)
if (1 === n.nodeType && -1 < (" " + ce(fe(n)) + " ").indexOf(e))
return !0;
return !1 } });
var he = /\r/g;
x.fn.extend({ val: function (n) {
var i, t, r, e = this[0];
return arguments.length ? (r = x.isFunction(n), this.each(function (t) {
var e;
1 === this.nodeType && (null == (e = r ? n.call(this, t, x(this).val()) : n) ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = x.map(e, function (t) {
return null == t ? "" : t + "" })), (i = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, e, "value") || (this.value = e)) })) : e ? (i = x.valHooks[e.type] || x.valHooks[e.nodeName.toLowerCase()]) && "get" in i && void 0 !== (t = i.get(e, "value")) ? t : "string" == typeof (t = e.value) ? t.replace(he, "") : null == t ? "" : t : void 0 } }), x.extend({ valHooks: { option: { get: function (t) {
var e = x.find.attr(t, "value");
return null != e ? e : ce(x.text(t)) } }, select: { get: function (t) {
var e, n, i, r = t.options, o = t.selectedIndex, a = "select-one" === t.type, s = a ? null : [], l = a ? o + 1 : r.length;

for (i = o < 0 ? l : a ? o : 0;
i < l;
i++)
if (((n = r[i]).selected || i === o) && !n.disabled && (!n.parentNode.disabled || !T(n.parentNode, "optgroup"))) {
if (e = x(n).val(), a)
return e;
s.push(e) }
return s }, set: function (t, e) { 
for (var n, i, r = t.options, o = x.makeArray(e), a = r.length;
a--;)((i = r[a]).selected = -1 < x.inArray(x.valHooks.option.get(i), o)) && (n = !0);
return n || (t.selectedIndex = -1), o } } } }), x.each(["radio", "checkbox"], function () { x.valHooks[this] = { set: function (t, e) {
if (Array.isArray(e))
return t.checked = -1 < x.inArray(x(t).val(), e) } }, m.checkOn || (x.valHooks[this].get = function (t) {
return null === t.getAttribute("value") ? "on" : t.value }) });
var de = /^(?:focusinfocus|focusoutblur)$/;
x.extend(x.event, { trigger: function (t, e, n, i) {
var r, o, a, s, l, u, c, f = [n || C], h = p.call(t, "type") ? t.type : t, d = p.call(t, "namespace") ? t.namespace.split(".") : [];
if (o = a = n = n || C, 3 !== n.nodeType && 8 !== n.nodeType && !de.test(h + x.event.triggered) && (-1 < h.indexOf(".") && (h = (d = h.split(".")).shift(), d.sort()), l = h.indexOf(":") < 0 && "on" + h, (t = t[x.expando] ? t : new x.Event(h, "object" === (void 0 === t ? "undefined" : We(t)) && t)).isTrigger = i ? 2 : 3, t.namespace = d.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = n), e = null == e ? [t] : x.makeArray(e, [t]), c = x.event.special[h] || {}, i || !c.trigger || !1 !== c.trigger.apply(n, e))) {
if (!i && !c.noBubble && !x.isWindow(n)) { 
for (s = c.delegateType || h, de.test(s + h) || (o = o.parentNode);
o;
o = o.parentNode)
f.push(o), a = o;
a === (n.ownerDocument || C) && f.push(a.defaultView || a.parentWindow || P) } 
for (r = 0;
(o = f[r++]) && !t.isPropagationStopped();)
t.type = 1 < r ? s : c.bindType || h, (u = (G.get(o, "events") || {})[t.type] && G.get(o, "handle")) && u.apply(o, e), (u = l && o[l]) && u.apply && W(o) && (t.result = u.apply(o, e), !1 === t.result && t.preventDefault());
return t.type = h, i || t.isDefaultPrevented() || c._default && !1 !== c._default.apply(f.pop(), e) || !W(n) || l && x.isFunction(n[h]) && !x.isWindow(n) && ((a = n[l]) && (n[l] = null), n[x.event.triggered = h](), x.event.triggered = void 0, a && (n[l] = a)), t.result } }, simulate: function (t, e, n) {
var i = x.extend(new x.Event, n, { type: t, isSimulated: !0 });
x.event.trigger(i, null, e) } }), x.fn.extend({ trigger: function (t, e) {
return this.each(function () { x.event.trigger(t, e, this) }) }, triggerHandler: function (t, e) {
var n = this[0];
if (n)
return x.event.trigger(t, e, n, !0) } }), x.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (t, n) { x.fn[n] = function (t, e) {
return 0 < arguments.length ? this.on(n, null, t, e) : this.trigger(n) } }), x.fn.extend({ hover: function (t, e) {
return this.mouseenter(t).mouseleave(e || t) } }), m.focusin = "onfocusin" in P, m.focusin || x.each({ focus: "focusin", blur: "focusout" }, function (n, i) {
var r = function (t) { x.event.simulate(i, t.target, x.event.fix(t)) };
x.event.special[i] = { setup: function () {
var t = this.ownerDocument || this, e = G.access(t, i);
e || t.addEventListener(n, r, !0), G.access(t, i, (e || 0) + 1) }, teardown: function () {
var t = this.ownerDocument || this, e = G.access(t, i) - 1;
e ? G.access(t, i, e) : (t.removeEventListener(n, r, !0), G.remove(t, i)) } } });
var pe = P.location, ye = x.now(), me = /\?/;
x.parseXML = function (t) {
var e;
if (!t || "string" != typeof t)
return null;
try { e = (new P.DOMParser).parseFromString(t, "text/xml") } catch (t) { e = void 0 }
return e && !e.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + t), e };
var ve = /\[\]$/, ge = /\r?\n/g, Se = /^(?:submit|button|image|reset|file)$/i, be = /^(?:input|select|textarea|keygen)/i;
function we(n, t, i, r) {
var e;
if (Array.isArray(t)) x.each(t, function (t, e) { i || ve.test(n) ? r(n, e) : we(n + "[" + ("object" === (void 0 === e ? "undefined" : We(e)) && null != e ? t : "") + "]", e, i, r) });
else if (i || "object" !== x.type(t)) r(n, t);
else

for (e in t) we(n + "[" + e + "]", t[e], i, r) } x.param = function (t, e) {
var n, i = [], r = function (t, e) {
var n = x.isFunction(e) ? e() : e;
i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n) };
if (Array.isArray(t) || t.jquery && !x.isPlainObject(t)) x.each(t, function () { r(this.name, this.value) });
else

for (n in t) we(n, t[n], e, r);
return i.join("&") }, x.fn.extend({ serialize: function () {
return x.param(this.serializeArray()) }, serializeArray: function () {
return this.map(function () {
var t = x.prop(this, "elements");
return t ? x.makeArray(t) : this }).filter(function () {
var t = this.type;
return this.name && !x(this).is(":disabled") && be.test(this.nodeName) && !Se.test(t) && (this.checked || !rt.test(t)) }).map(function (t, e) {
var n = x(this).val();
return null == n ? null : Array.isArray(n) ? x.map(n, function (t) {
return { name: e.name, value: t.replace(ge, "\r\n") } }) : { name: e.name, value: n.replace(ge, "\r\n") } }).get() } });
var _e = /%20/g, Pe = /#.*$/, Ce = /([?&])_=[^&]*/, xe = /^(.*?):[ \t]*([^\r\n]*)$/gm, Te = /^(?:GET|HEAD)$/, ke = /^\/\//, De = {}, Me = {}, Re = "*/".concat("*"), Ee = C.createElement("a");
function ze(o) {
return function (t, e) { "string" != typeof t && (e = t, t = "*");
var n, i = 0, r = t.toLowerCase().match(F) || [];
if (x.isFunction(e)) 
for (;
n = r[i++];)"+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(e)) : (o[n] = o[n] || []).push(e) } } function Ie(e, r, o, a) {
var s = {}, l = e === Me;
function u(t) {
var i;
return s[t] = !0, x.each(e[t] || [], function (t, e) {
var n = e(r, o, a);
return "string" != typeof n || l || s[n] ? l ? !(i = n) : void 0 : (r.dataTypes.unshift(n), u(n), !1) }), i }
return u(r.dataTypes[0]) || !s["*"] && u("*") } function Ae(t, e) {
var n, i, r = x.ajaxSettings.flatOptions || {};

for (n in e) void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
return i && x.extend(!0, t, i), t } Ee.href = pe.href, x.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: pe.href, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(pe.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Re, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": x.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (t, e) {
return e ? Ae(Ae(t, x.ajaxSettings), e) : Ae(x.ajaxSettings, t) }, ajaxPrefilter: ze(De), ajaxTransport: ze(Me), ajax: function (t, e) { "object" === (void 0 === t ? "undefined" : We(t)) && (e = t, t = void 0), e = e || {};
var c, f, h, n, d, i, p, y, r, o, m = x.ajaxSetup({}, e), v = m.context || m, g = m.context && (v.nodeType || v.jquery) ? x(v) : x.event, S = x.Deferred(), b = x.Callbacks("once memory"), w = m.statusCode || {}, a = {}, s = {}, l = "canceled", _ = { readyState: 0, getResponseHeader: function (t) {
var e;
if (p) {
if (!n) 
for (n = {};
e = xe.exec(h);)
n[e[1].toLowerCase()] = e[2];
e = n[t.toLowerCase()] }
return null == e ? null : e }, getAllResponseHeaders: function () {
return p ? h : null }, setRequestHeader: function (t, e) {
return null == p && (t = s[t.toLowerCase()] = s[t.toLowerCase()] || t, a[t] = e), this }, overrideMimeType: function (t) {
return null == p && (m.mimeType = t), this }, statusCode: function (t) {
var e;
if (t)
if (p) _.always(t[_.status]);
else

for (e in t) w[e] = [w[e], t[e]];
return this }, abort: function (t) {
var e = t || l;
return c && c.abort(e), u(0, e), this } };
if (S.promise(_), m.url = ((t || m.url || pe.href) + "").replace(ke, pe.protocol + "//"), m.type = e.method || e.type || m.method || m.type, m.dataTypes = (m.dataType || "*").toLowerCase().match(F) || [""], null == m.crossDomain) { i = C.createElement("a");
try { i.href = m.url, i.href = i.href, m.crossDomain = Ee.protocol + "//" + Ee.host != i.protocol + "//" + i.host } catch (t) { m.crossDomain = !0 } }
if (m.data && m.processData && "string" != typeof m.data && (m.data = x.param(m.data, m.traditional)), Ie(De, m, e, _), p)
return _;

for (r in (y = x.event && m.global) && 0 == x.active++ && x.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Te.test(m.type), f = m.url.replace(Pe, ""), m.hasContent ? m.data && m.processData && 0 === (m.contentType || "").indexOf("application/x-www-form-urlencoded") && (m.data = m.data.replace(_e, "+")) : (o = m.url.slice(f.length), m.data && (f += (me.test(f) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (f = f.replace(Ce, "$1"), o = (me.test(f) ? "&" : "?") + "_=" + ye++ + o), m.url = f + o), m.ifModified && (x.lastModified[f] && _.setRequestHeader("If-Modified-Since", x.lastModified[f]), x.etag[f] && _.setRequestHeader("If-None-Match", x.etag[f])), (m.data && m.hasContent && !1 !== m.contentType || e.contentType) && _.setRequestHeader("Content-Type", m.contentType), _.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Re + "; q=0.01" : "") : m.accepts["*"]), m.headers) _.setRequestHeader(r, m.headers[r]);
if (m.beforeSend && (!1 === m.beforeSend.call(v, _, m) || p))
return _.abort();
if (l = "abort", b.add(m.complete), _.done(m.success), _.fail(m.error), c = Ie(Me, m, e, _)) {
if (_.readyState = 1, y && g.trigger("ajaxSend", [_, m]), p)
return _;
m.async && 0 < m.timeout && (d = P.setTimeout(function () { _.abort("timeout") }, m.timeout));
try { p = !1, c.send(a, u) } catch (t) {
if (p) throw t;
u(-1, t) } }
else
u(-1, "No Transport");
function u(t, e, n, i) {
var r, o, a, s, l, u = e;
p || (p = !0, d && P.clearTimeout(d), c = void 0, h = i || "", _.readyState = 0 < t ? 4 : 0, r = 200 <= t && t < 300 || 304 === t, n && (s = function (t, e, n) { 
for (var i, r, o, a, s = t.contents, l = t.dataTypes;
"*" === l[0];)
l.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
if (i) 
for (r in s)
if (s[r] && s[r].test(i)) { l.unshift(r);
break }
if (l[0] in n) o = l[0];
else
{ 
for (r in n) {
if (!l[0] || t.converters[r + " " + l[0]]) { o = r;
break } a || (a = r) } o = o || a }
if (o)
return o !== l[0] && l.unshift(o), n[o] }(m, _, n)), s = function (t, e, n, i) {
var r, o, a, s, l, u = {}, c = t.dataTypes.slice();
if (c[1]) 
for (a in t.converters) u[a.toLowerCase()] = t.converters[a];

for (o = c.shift();
o;)
if (t.responseFields[o] && (n[t.responseFields[o]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = c.shift())
if ("*" === o) o = l;
else if ("*" !== l && l !== o) {
if (!(a = u[l + " " + o] || u["* " + o])) 
for (r in u)
if ((s = r.split(" "))[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) { !0 === a ? a = u[r] : !0 !== u[r] && (o = s[0], c.unshift(s[1]));
break }
if (!0 !== a)
if (a && t.throws) e = a(e);
else
try { e = a(e) } catch (t) {
return { state: "parsererror", error: a ? t : "No conversion from " + l + " to " + o } } }
return { state: "success", data: e } }(m, s, _, r), r ? (m.ifModified && ((l = _.getResponseHeader("Last-Modified")) && (x.lastModified[f] = l), (l = _.getResponseHeader("etag")) && (x.etag[f] = l)), 204 === t || "HEAD" === m.type ? u = "nocontent" : 304 === t ? u = "notmodified" : (u = s.state, o = s.data, r = !(a = s.error))) : (a = u, !t && u || (u = "error", t < 0 && (t = 0))), _.status = t, _.statusText = (e || u) + "", r ? S.resolveWith(v, [o, u, _]) : S.rejectWith(v, [_, u, a]), _.statusCode(w), w = void 0, y && g.trigger(r ? "ajaxSuccess" : "ajaxError", [_, m, r ? o : a]), b.fireWith(v, [_, u]), y && (g.trigger("ajaxComplete", [_, m]), --x.active || x.event.trigger("ajaxStop"))) }
return _ }, getJSON: function (t, e, n) {
return x.get(t, e, n, "json") }, getScript: function (t, e) {
return x.get(t, void 0, e, "script") } }), x.each(["get", "post"], function (t, r) { x[r] = function (t, e, n, i) {
return x.isFunction(e) && (i = i || n, n = e, e = void 0), x.ajax(x.extend({ url: t, type: r, dataType: i, data: e, success: n }, x.isPlainObject(t) && t)) } }), x._evalUrl = function (t) {
return x.ajax({ url: t, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, throws: !0 }) }, x.fn.extend({ wrapAll: function (t) {
var e;
return this[0] && (x.isFunction(t) && (t = t.call(this[0])), e = x(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () { 
for (var t = this;
t.firstElementChild;)
t = t.firstElementChild;
return t }).append(this)), this }, wrapInner: function (n) {
return x.isFunction(n) ? this.each(function (t) { x(this).wrapInner(n.call(this, t)) }) : this.each(function () {
var t = x(this), e = t.contents();
e.length ? e.wrapAll(n) : t.append(n) }) }, wrap: function (e) {
var n = x.isFunction(e);
return this.each(function (t) { x(this).wrapAll(n ? e.call(this, t) : e) }) }, unwrap: function (t) {
return this.parent(t).not("body").each(function () { x(this).replaceWith(this.childNodes) }), this } }), x.expr.pseudos.hidden = function (t) {
return !x.expr.pseudos.visible(t) }, x.expr.pseudos.visible = function (t) {
return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length) }, x.ajaxSettings.xhr = function () { try {
return new P.XMLHttpRequest } catch (t) { } };
var Fe = { 0: 200, 1223: 204 }, Oe = x.ajaxSettings.xhr();
m.cors = !!Oe && "withCredentials" in Oe, m.ajax = Oe = !!Oe, x.ajaxTransport(function (r) {
var o, a;
if (m.cors || Oe && !r.crossDomain)
return { send: function (t, e) {
var n, i = r.xhr();
if (i.open(r.type, r.url, r.async, r.username, r.password), r.xhrFields) 
for (n in r.xhrFields) i[n] = r.xhrFields[n];

for (n in r.mimeType && i.overrideMimeType && i.overrideMimeType(r.mimeType), r.crossDomain || t["X-Requested-With"] || (t["X-Requested-With"] = "XMLHttpRequest"), t) i.setRequestHeader(n, t[n]);
o = function (t) {
return function () { o && (o = a = i.onload = i.onerror = i.onabort = i.onreadystatechange = null, "abort" === t ? i.abort() : "error" === t ? "number" != typeof i.status ? e(0, "error") : e(i.status, i.statusText) : e(Fe[i.status] || i.status, i.statusText, "text" !== (i.responseType || "text") || "string" != typeof i.responseText ? { binary: i.response } : { text: i.responseText }, i.getAllResponseHeaders())) } }, i.onload = o(), a = i.onerror = o("error"), void 0 !== i.onabort ? i.onabort = a : i.onreadystatechange = function () { 4 === i.readyState && P.setTimeout(function () { o && a() }) }, o = o("abort");
try { i.send(r.hasContent && r.data || null) } catch (t) {
if (o) throw t } }, abort: function () { o && o() } } }), x.ajaxPrefilter(function (t) { t.crossDomain && (t.contents.script = !1) }), x.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)
script\b/ }, converters: { "text script": function (t) {
return x.globalEval(t), t } } }), x.ajaxPrefilter("script", function (t) { void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET") }), x.ajaxTransport("script", function (n) {
var i, r;
if (n.crossDomain)
return { send: function (t, e) { i = x("<script>").prop({ charset: n.scriptCharset, src: n.url }).on("load error", r = function (t) { i.remove(), r = null, t && e("error" === t.type ? 404 : 200, t.type) }), C.head.appendChild(i[0]) }, abort: function () { r && r() } } });
var Be, Le = [], Ne = /(=)\?(?=&|$)|\?\?/;
x.ajaxSetup({ jsonp: "callback", jsonpCallback: function () {
var t = Le.pop() || x.expando + "_" + ye++;
return this[t] = !0, t } }), x.ajaxPrefilter("json jsonp", function (t, e, n) {
var i, r, o, a = !1 !== t.jsonp && (Ne.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ne.test(t.data) && "data");
if (a || "jsonp" === t.dataTypes[0])
return i = t.jsonpCallback = x.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Ne, "$1" + i) : !1 !== t.jsonp && (t.url += (me.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
return o || x.error(i + " was not called"), o[0] }, t.dataTypes[0] = "json", r = P[i], P[i] = function () { o = arguments }, n.always(function () { void 0 === r ? x(P).removeProp(i) : P[i] = r, t[i] && (t.jsonpCallback = e.jsonpCallback, Le.push(i)), o && x.isFunction(r) && r(o[0]), o = r = void 0 }), "script" }), m.createHTMLDocument = ((Be = C.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Be.childNodes.length), x.parseHTML = function (t, e, n) {
return "string" != typeof t ? [] : ("boolean" == typeof e && (n = e, e = !1), e || (m.createHTMLDocument ? ((i = (e = C.implementation.createHTMLDocument("")).createElement("base")).href = C.location.href, e.head.appendChild(i)) : e = C), o = !n && [], (r = k.exec(t)) ? [e.createElement(r[1])] : (r = dt([t], e, o), o && o.length && x(o).remove(), x.merge([], r.childNodes)));
var i, r, o }, x.fn.load = function (t, e, n) {
var i, r, o, a = this, s = t.indexOf(" ");
return -1 < s && (i = ce(t.slice(s)), t = t.slice(0, s)), x.isFunction(e) ? (n = e, e = void 0) : e && "object" === (void 0 === e ? "undefined" : We(e)) && (r = "POST"), 0 < a.length && x.ajax({ url: t, type: r || "GET", dataType: "html", data: e }).done(function (t) { o = arguments, a.html(i ? x("<div>").append(x.parseHTML(t)).find(i) : t) }).always(n && function (t, e) { a.each(function () { n.apply(this, o || [t.responseText, e, t]) }) }), this }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) { x.fn[e] = function (t) {
return this.on(e, t) } }), x.expr.pseudos.animated = function (e) {
return x.grep(x.timers, function (t) {
return e === t.elem }).length }, x.offset = { setOffset: function (t, e, n) {
var i, r, o, a, s, l, u = x.css(t, "position"), c = x(t), f = {};
"static" === u && (t.style.position = "relative"), s = c.offset(), o = x.css(t, "top"), l = x.css(t, "left"), r = ("absolute" === u || "fixed" === u) && -1 < (o + l).indexOf("auto") ? (a = (i = c.position()).top, i.left) : (a = parseFloat(o) || 0, parseFloat(l) || 0), x.isFunction(e) && (e = e.call(t, n, x.extend({}, s))), null != e.top && (f.top = e.top - s.top + a), null != e.left && (f.left = e.left - s.left + r), "using" in e ? e.using.call(t, f) : c.css(f) } }, x.fn.extend({ offset: function (e) {
if (arguments.length)
return void 0 === e ? this : this.each(function (t) { x.offset.setOffset(this, e, t) });
var t, n, i, r, o = this[0];
return o ? o.getClientRects().length ? (i = o.getBoundingClientRect(), n = (t = o.ownerDocument).documentElement, r = t.defaultView, { top: i.top + r.pageYOffset - n.clientTop, left: i.left + r.pageXOffset - n.clientLeft }) : { top: 0, left: 0 } : void 0 }, position: function () {
if (this[0]) {
var t, e, n = this[0], i = { top: 0, left: 0 };
return "fixed" === x.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), T(t[0], "html") || (i = t.offset()), i = { top: i.top + x.css(t[0], "borderTopWidth", !0), left: i.left + x.css(t[0], "borderLeftWidth", !0) }), { top: e.top - i.top - x.css(n, "marginTop", !0), left: e.left - i.left - x.css(n, "marginLeft", !0) } } }, offsetParent: function () {
return this.map(function () { 
for (var t = this.offsetParent;
t && "static" === x.css(t, "position");)
t = t.offsetParent;
return t || pt }) } }), x.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, r) {
var o = "pageYOffset" === r;
x.fn[e] = function (t) {
return j(this, function (t, e, n) {
var i;
if (x.isWindow(t) ? i = t : 9 === t.nodeType && (i = t.defaultView), void 0 === n)
return i ? i[r] : t[e];
i ? i.scrollTo(o ? i.pageXOffset : n, o ? n : i.pageYOffset) : t[e] = n }, e, t, arguments.length) } }), x.each(["top", "left"], function (t, n) { x.cssHooks[n] = Bt(m.pixelPosition, function (t, e) {
if (e)
return e = Ot(t, n), At.test(e) ? x(t).position()[n] + "px" : e }) }), x.each({ Height: "height", Width: "width" }, function (a, s) { x.each({ padding: "inner" + a, content: s, "": "outer" + a }, function (i, o) { x.fn[o] = function (t, e) {
var n = arguments.length && (i || "boolean" != typeof t), r = i || (!0 === t || !0 === e ? "margin" : "border");
return j(this, function (t, e, n) {
var i;
return x.isWindow(t) ? 0 === o.indexOf("outer") ? t["inner" + a] : t.document.documentElement["client" + a] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + a], i["scroll" + a], t.body["offset" + a], i["offset" + a], i["client" + a])) : void 0 === n ? x.css(t, e, r) : x.style(t, e, n, r) }, s, n ? t : void 0, n) } }) }), x.fn.extend({ bind: function (t, e, n) {
return this.on(t, null, e, n) }, unbind: function (t, e) {
return this.off(t, null, e) }, delegate: function (t, e, n, i) {
return this.on(e, t, n, i) }, undelegate: function (t, e, n) {
return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n) } }), x.holdReady = function (t) { t ? x.readyWait++ : x.ready(!0) }, x.isArray = Array.isArray, x.parseJSON = JSON.parse, x.nodeName = T, void 0 === (Ge = function () {
return x }.apply(Ue, [])) || (je.exports = Ge);
var qe = P.jQuery, He = P.$;
return x.noConflict = function (t) {
return P.$ === x && (P.$ = He), t && P.jQuery === x && (P.jQuery = qe), x }, t || (P.jQuery = P.$ = x), x }, "object" === We(je) && "object" === We(je.exports) ? je.exports = t.document ? e(t, !0) : function (t) {
if (!t.document) throw new Error("jQuery requires a window with a document");
return e(t) } : e(t) }).call(Ue, e(18)(t)) }, function (t, e) { "use strict";
t.exports = function (t) {
return t.webpackPolyfill || (t.deprecate = function () { }, t.paths = [], t.children = [], t.webpackPolyfill = 1), t } }]) });