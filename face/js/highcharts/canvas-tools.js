﻿/*
 A class to parse color values
 @author Stoyan Stefanov <sstoo@gmail.com>
 @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 Use it if you like it

 canvg.js - Javascript SVG parser and renderer on Canvas
 MIT Licensed 
 Gabe Lerner (gabelerner@gmail.com)
 http://code.google.com/p/canvg/

 Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/

 Highcharts JS v3.0.10 (2014-03-10)
 CanVGRenderer Extension module

 (c) 2011-2012 Torstein Honsi, Erik Olsson

 License: www.highcharts.com/license
*/
function RGBColor(m) {
    this.ok = !1; m.charAt(0) == "#" && (m = m.substr(1, 6)); var m = m.replace(/ /g, ""), m = m.toLowerCase(), a = {
        aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd", blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff", darkblue: "00008b",
        darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dodgerblue: "1e90ff", feldspar: "d19275", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "ff00ff",
        gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgrey: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa",
        lightslateblue: "8470ff", lightslategray: "778899", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370d8", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080",
        oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "d87093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", red: "ff0000", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd",
        slategray: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", violetred: "d02090", wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32"
    }, c; for (c in a) m == c && (m = a[c]); var d = [{ re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, example: ["rgb(123, 234, 45)", "rgb(255,234,245)"], process: function (b) { return [parseInt(b[1]), parseInt(b[2]), parseInt(b[3])] } }, {
        re: /^(\w{2})(\w{2})(\w{2})$/,
        example: ["#00ff00", "336699"], process: function (b) { return [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] }
    }, { re: /^(\w{1})(\w{1})(\w{1})$/, example: ["#fb0", "f0f"], process: function (b) { return [parseInt(b[1] + b[1], 16), parseInt(b[2] + b[2], 16), parseInt(b[3] + b[3], 16)] } }]; for (c = 0; c < d.length; c++) { var b = d[c].process, k = d[c].re.exec(m); if (k) channels = b(k), this.r = channels[0], this.g = channels[1], this.b = channels[2], this.ok = !0 } this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r; this.g = this.g < 0 || isNaN(this.g) ? 0 :
    this.g > 255 ? 255 : this.g; this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b; this.toRGB = function () { return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")" }; this.toHex = function () { var b = this.r.toString(16), a = this.g.toString(16), d = this.b.toString(16); b.length == 1 && (b = "0" + b); a.length == 1 && (a = "0" + a); d.length == 1 && (d = "0" + d); return "#" + b + a + d }; this.getHelpXML = function () {
        for (var b = [], k = 0; k < d.length; k++) for (var c = d[k].example, j = 0; j < c.length; j++) b[b.length] = c[j]; for (var h in a) b[b.length] = h; c = document.createElement("ul");
        c.setAttribute("id", "rgbcolor-examples"); for (k = 0; k < b.length; k++) try { var l = document.createElement("li"), o = new RGBColor(b[k]), n = document.createElement("div"); n.style.cssText = "margin: 3px; border: 1px solid black; background:" + o.toHex() + "; color:" + o.toHex(); n.appendChild(document.createTextNode("test")); var q = document.createTextNode(" " + b[k] + " -> " + o.toRGB() + " -> " + o.toHex()); l.appendChild(n); l.appendChild(q); c.appendChild(l) } catch (p) { } return c
    }
}
if (!window.console) window.console = {}, window.console.log = function () { }, window.console.dir = function () { }; if (!Array.prototype.indexOf) Array.prototype.indexOf = function (m) { for (var a = 0; a < this.length; a++) if (this[a] == m) return a; return -1 };
(function () {
    function m() {
        var a = { FRAMERATE: 30, MAX_VIRTUAL_PIXELS: 3E4 }; a.init = function (c) {
            a.Definitions = {}; a.Styles = {}; a.Animations = []; a.Images = []; a.ctx = c; a.ViewPort = new function () {
                this.viewPorts = []; this.Clear = function () { this.viewPorts = [] }; this.SetCurrent = function (a, b) { this.viewPorts.push({ width: a, height: b }) }; this.RemoveCurrent = function () { this.viewPorts.pop() }; this.Current = function () { return this.viewPorts[this.viewPorts.length - 1] }; this.width = function () { return this.Current().width }; this.height = function () { return this.Current().height };
                this.ComputeSize = function (a) { return a != null && typeof a == "number" ? a : a == "x" ? this.width() : a == "y" ? this.height() : Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2) }
            }
        }; a.init(); a.ImagesLoaded = function () { for (var c = 0; c < a.Images.length; c++) if (!a.Images[c].loaded) return !1; return !0 }; a.trim = function (a) { return a.replace(/^\s+|\s+$/g, "") }; a.compressSpaces = function (a) { return a.replace(/[\s\r\t\n]+/gm, " ") }; a.ajax = function (a) {
            var d; return (d = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")) ?
            (d.open("GET", a, !1), d.send(null), d.responseText) : null
        }; a.parseXml = function (a) { if (window.DOMParser) return (new DOMParser).parseFromString(a, "text/xml"); else { var a = a.replace(/<!DOCTYPE svg[^>]*>/, ""), d = new ActiveXObject("Microsoft.XMLDOM"); d.async = "false"; d.loadXML(a); return d } }; a.Property = function (c, d) {
            this.name = c; this.value = d; this.hasValue = function () { return this.value != null && this.value !== "" }; this.numValue = function () {
                if (!this.hasValue()) return 0; var b = parseFloat(this.value); (this.value + "").match(/%$/) &&
                (b /= 100); return b
            }; this.valueOrDefault = function (b) { return this.hasValue() ? this.value : b }; this.numValueOrDefault = function (b) { return this.hasValue() ? this.numValue() : b }; var b = this; this.Color = { addOpacity: function (d) { var c = b.value; if (d != null && d != "") { var f = new RGBColor(b.value); f.ok && (c = "rgba(" + f.r + ", " + f.g + ", " + f.b + ", " + d + ")") } return new a.Property(b.name, c) } }; this.Definition = {
                getDefinition: function () { var d = b.value.replace(/^(url\()?#([^\)]+)\)?$/, "$2"); return a.Definitions[d] }, isUrl: function () {
                    return b.value.indexOf("url(") ==
                    0
                }, getFillStyle: function (b) { var d = this.getDefinition(); return d != null && d.createGradient ? d.createGradient(a.ctx, b) : d != null && d.createPattern ? d.createPattern(a.ctx, b) : null }
            }; this.Length = {
                DPI: function () { return 96 }, EM: function (b) { var d = 12, c = new a.Property("fontSize", a.Font.Parse(a.ctx.font).fontSize); c.hasValue() && (d = c.Length.toPixels(b)); return d }, toPixels: function (d) {
                    if (!b.hasValue()) return 0; var c = b.value + ""; return c.match(/em$/) ? b.numValue() * this.EM(d) : c.match(/ex$/) ? b.numValue() * this.EM(d) / 2 : c.match(/px$/) ?
                    b.numValue() : c.match(/pt$/) ? b.numValue() * 1.25 : c.match(/pc$/) ? b.numValue() * 15 : c.match(/cm$/) ? b.numValue() * this.DPI(d) / 2.54 : c.match(/mm$/) ? b.numValue() * this.DPI(d) / 25.4 : c.match(/in$/) ? b.numValue() * this.DPI(d) : c.match(/%$/) ? b.numValue() * a.ViewPort.ComputeSize(d) : b.numValue()
                }
            }; this.Time = { toMilliseconds: function () { if (!b.hasValue()) return 0; var a = b.value + ""; if (a.match(/s$/)) return b.numValue() * 1E3; a.match(/ms$/); return b.numValue() } }; this.Angle = {
                toRadians: function () {
                    if (!b.hasValue()) return 0; var a = b.value +
                    ""; return a.match(/deg$/) ? b.numValue() * (Math.PI / 180) : a.match(/grad$/) ? b.numValue() * (Math.PI / 200) : a.match(/rad$/) ? b.numValue() : b.numValue() * (Math.PI / 180)
                }
            }
        }; a.Font = new function () {
            this.Styles = ["normal", "italic", "oblique", "inherit"]; this.Variants = ["normal", "small-caps", "inherit"]; this.Weights = "normal,bold,bolder,lighter,100,200,300,400,500,600,700,800,900,inherit".split(","); this.CreateFont = function (d, b, c, e, f, g) {
                g = g != null ? this.Parse(g) : this.CreateFont("", "", "", "", "", a.ctx.font); return {
                    fontFamily: f ||
                    g.fontFamily, fontSize: e || g.fontSize, fontStyle: d || g.fontStyle, fontWeight: c || g.fontWeight, fontVariant: b || g.fontVariant, toString: function () { return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(" ") }
                }
            }; var c = this; this.Parse = function (d) {
                for (var b = {}, d = a.trim(a.compressSpaces(d || "")).split(" "), k = !1, e = !1, f = !1, g = !1, j = "", h = 0; h < d.length; h++) if (!e && c.Styles.indexOf(d[h]) != -1) { if (d[h] != "inherit") b.fontStyle = d[h]; e = !0 } else if (!g && c.Variants.indexOf(d[h]) != -1) {
                    if (d[h] != "inherit") b.fontVariant =
                    d[h]; e = g = !0
                } else if (!f && c.Weights.indexOf(d[h]) != -1) { if (d[h] != "inherit") b.fontWeight = d[h]; e = g = f = !0 } else if (k) d[h] != "inherit" && (j += d[h]); else { if (d[h] != "inherit") b.fontSize = d[h].split("/")[0]; e = g = f = k = !0 } if (j != "") b.fontFamily = j; return b
            }
        }; a.ToNumberArray = function (c) { for (var c = a.trim(a.compressSpaces((c || "").replace(/,/g, " "))).split(" "), d = 0; d < c.length; d++) c[d] = parseFloat(c[d]); return c }; a.Point = function (a, d) {
            this.x = a; this.y = d; this.angleTo = function (b) { return Math.atan2(b.y - this.y, b.x - this.x) }; this.applyTransform =
            function (b) { var a = this.x * b[1] + this.y * b[3] + b[5]; this.x = this.x * b[0] + this.y * b[2] + b[4]; this.y = a }
        }; a.CreatePoint = function (c) { c = a.ToNumberArray(c); return new a.Point(c[0], c[1]) }; a.CreatePath = function (c) { for (var c = a.ToNumberArray(c), d = [], b = 0; b < c.length; b += 2) d.push(new a.Point(c[b], c[b + 1])); return d }; a.BoundingBox = function (a, d, b, k) {
            this.y2 = this.x2 = this.y1 = this.x1 = Number.NaN; this.x = function () { return this.x1 }; this.y = function () { return this.y1 }; this.width = function () { return this.x2 - this.x1 }; this.height = function () {
                return this.y2 -
                this.y1
            }; this.addPoint = function (b, a) { if (b != null) { if (isNaN(this.x1) || isNaN(this.x2)) this.x2 = this.x1 = b; if (b < this.x1) this.x1 = b; if (b > this.x2) this.x2 = b } if (a != null) { if (isNaN(this.y1) || isNaN(this.y2)) this.y2 = this.y1 = a; if (a < this.y1) this.y1 = a; if (a > this.y2) this.y2 = a } }; this.addX = function (b) { this.addPoint(b, null) }; this.addY = function (b) { this.addPoint(null, b) }; this.addBoundingBox = function (b) { this.addPoint(b.x1, b.y1); this.addPoint(b.x2, b.y2) }; this.addQuadraticCurve = function (b, a, d, c, k, l) {
                d = b + 2 / 3 * (d - b); c = a + 2 / 3 * (c -
                a); this.addBezierCurve(b, a, d, d + 1 / 3 * (k - b), c, c + 1 / 3 * (l - a), k, l)
            }; this.addBezierCurve = function (b, a, d, c, k, l, o, n) {
                var q = [b, a], p = [d, c], t = [k, l], m = [o, n]; this.addPoint(q[0], q[1]); this.addPoint(m[0], m[1]); for (i = 0; i <= 1; i++) b = function (b) { return Math.pow(1 - b, 3) * q[i] + 3 * Math.pow(1 - b, 2) * b * p[i] + 3 * (1 - b) * Math.pow(b, 2) * t[i] + Math.pow(b, 3) * m[i] }, a = 6 * q[i] - 12 * p[i] + 6 * t[i], d = -3 * q[i] + 9 * p[i] - 9 * t[i] + 3 * m[i], c = 3 * p[i] - 3 * q[i], d == 0 ? a != 0 && (a = -c / a, 0 < a && a < 1 && (i == 0 && this.addX(b(a)), i == 1 && this.addY(b(a)))) : (c = Math.pow(a, 2) - 4 * c * d, c < 0 || (k =
                (-a + Math.sqrt(c)) / (2 * d), 0 < k && k < 1 && (i == 0 && this.addX(b(k)), i == 1 && this.addY(b(k))), a = (-a - Math.sqrt(c)) / (2 * d), 0 < a && a < 1 && (i == 0 && this.addX(b(a)), i == 1 && this.addY(b(a)))))
            }; this.isPointInBox = function (b, a) { return this.x1 <= b && b <= this.x2 && this.y1 <= a && a <= this.y2 }; this.addPoint(a, d); this.addPoint(b, k)
        }; a.Transform = function (c) {
            var d = this; this.Type = {}; this.Type.translate = function (b) {
                this.p = a.CreatePoint(b); this.apply = function (b) { b.translate(this.p.x || 0, this.p.y || 0) }; this.applyToPoint = function (b) {
                    b.applyTransform([1,
                    0, 0, 1, this.p.x || 0, this.p.y || 0])
                }
            }; this.Type.rotate = function (b) {
                b = a.ToNumberArray(b); this.angle = new a.Property("angle", b[0]); this.cx = b[1] || 0; this.cy = b[2] || 0; this.apply = function (b) { b.translate(this.cx, this.cy); b.rotate(this.angle.Angle.toRadians()); b.translate(-this.cx, -this.cy) }; this.applyToPoint = function (b) {
                    var a = this.angle.Angle.toRadians(); b.applyTransform([1, 0, 0, 1, this.p.x || 0, this.p.y || 0]); b.applyTransform([Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0]); b.applyTransform([1, 0, 0, 1, -this.p.x ||
                    0, -this.p.y || 0])
                }
            }; this.Type.scale = function (b) { this.p = a.CreatePoint(b); this.apply = function (b) { b.scale(this.p.x || 1, this.p.y || this.p.x || 1) }; this.applyToPoint = function (b) { b.applyTransform([this.p.x || 0, 0, 0, this.p.y || 0, 0, 0]) } }; this.Type.matrix = function (b) { this.m = a.ToNumberArray(b); this.apply = function (b) { b.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]) }; this.applyToPoint = function (b) { b.applyTransform(this.m) } }; this.Type.SkewBase = function (b) {
                this.base = d.Type.matrix; this.base(b); this.angle =
                new a.Property("angle", b)
            }; this.Type.SkewBase.prototype = new this.Type.matrix; this.Type.skewX = function (b) { this.base = d.Type.SkewBase; this.base(b); this.m = [1, 0, Math.tan(this.angle.Angle.toRadians()), 1, 0, 0] }; this.Type.skewX.prototype = new this.Type.SkewBase; this.Type.skewY = function (b) { this.base = d.Type.SkewBase; this.base(b); this.m = [1, Math.tan(this.angle.Angle.toRadians()), 0, 1, 0, 0] }; this.Type.skewY.prototype = new this.Type.SkewBase; this.transforms = []; this.apply = function (b) { for (var a = 0; a < this.transforms.length; a++) this.transforms[a].apply(b) };
            this.applyToPoint = function (b) { for (var a = 0; a < this.transforms.length; a++) this.transforms[a].applyToPoint(b) }; for (var c = a.trim(a.compressSpaces(c)).split(/\s(?=[a-z])/), b = 0; b < c.length; b++) { var k = c[b].split("(")[0], e = c[b].split("(")[1].replace(")", ""); this.transforms.push(new this.Type[k](e)) }
        }; a.AspectRatio = function (c, d, b, k, e, f, g, j, h, l) {
            var d = a.compressSpaces(d), d = d.replace(/^defer\s/, ""), o = d.split(" ")[0] || "xMidYMid", d = d.split(" ")[1] || "meet", n = b / k, q = e / f, p = Math.min(n, q), m = Math.max(n, q); d == "meet" && (k *=
            p, f *= p); d == "slice" && (k *= m, f *= m); h = new a.Property("refX", h); l = new a.Property("refY", l); h.hasValue() && l.hasValue() ? c.translate(-p * h.Length.toPixels("x"), -p * l.Length.toPixels("y")) : (o.match(/^xMid/) && (d == "meet" && p == q || d == "slice" && m == q) && c.translate(b / 2 - k / 2, 0), o.match(/YMid$/) && (d == "meet" && p == n || d == "slice" && m == n) && c.translate(0, e / 2 - f / 2), o.match(/^xMax/) && (d == "meet" && p == q || d == "slice" && m == q) && c.translate(b - k, 0), o.match(/YMax$/) && (d == "meet" && p == n || d == "slice" && m == n) && c.translate(0, e - f)); o == "none" ? c.scale(n,
            q) : d == "meet" ? c.scale(p, p) : d == "slice" && c.scale(m, m); c.translate(g == null ? 0 : -g, j == null ? 0 : -j)
        }; a.Element = {}; a.Element.ElementBase = function (c) {
            this.attributes = {}; this.styles = {}; this.children = []; this.attribute = function (b, d) { var c = this.attributes[b]; if (c != null) return c; c = new a.Property(b, ""); d == !0 && (this.attributes[b] = c); return c }; this.style = function (b, d) {
                var c = this.styles[b]; if (c != null) return c; c = this.attribute(b); if (c != null && c.hasValue()) return c; c = this.parent; if (c != null && (c = c.style(b), c != null && c.hasValue())) return c;
                c = new a.Property(b, ""); d == !0 && (this.styles[b] = c); return c
            }; this.render = function (b) { if (this.style("display").value != "none" && this.attribute("visibility").value != "hidden") { b.save(); this.setContext(b); if (this.attribute("mask").hasValue()) { var a = this.attribute("mask").Definition.getDefinition(); a != null && a.apply(b, this) } else this.style("filter").hasValue() ? (a = this.style("filter").Definition.getDefinition(), a != null && a.apply(b, this)) : this.renderChildren(b); this.clearContext(b); b.restore() } }; this.setContext =
            function () { }; this.clearContext = function () { }; this.renderChildren = function (b) { for (var a = 0; a < this.children.length; a++) this.children[a].render(b) }; this.addChild = function (b, d) { var c = b; d && (c = a.CreateElement(b)); c.parent = this; this.children.push(c) }; if (c != null && c.nodeType == 1) {
                for (var d = 0; d < c.childNodes.length; d++) { var b = c.childNodes[d]; b.nodeType == 1 && this.addChild(b, !0) } for (d = 0; d < c.attributes.length; d++) b = c.attributes[d], this.attributes[b.nodeName] = new a.Property(b.nodeName, b.nodeValue); b = a.Styles[c.nodeName];
                if (b != null) for (var k in b) this.styles[k] = b[k]; if (this.attribute("class").hasValue()) for (var d = a.compressSpaces(this.attribute("class").value).split(" "), e = 0; e < d.length; e++) { b = a.Styles["." + d[e]]; if (b != null) for (k in b) this.styles[k] = b[k]; b = a.Styles[c.nodeName + "." + d[e]]; if (b != null) for (k in b) this.styles[k] = b[k] } if (this.attribute("style").hasValue()) {
                    b = this.attribute("style").value.split(";"); for (d = 0; d < b.length; d++) a.trim(b[d]) != "" && (c = b[d].split(":"), k = a.trim(c[0]), c = a.trim(c[1]), this.styles[k] = new a.Property(k,
                    c))
                } this.attribute("id").hasValue() && a.Definitions[this.attribute("id").value] == null && (a.Definitions[this.attribute("id").value] = this)
            }
        }; a.Element.RenderedElementBase = function (c) {
            this.base = a.Element.ElementBase; this.base(c); this.setContext = function (d) {
                if (this.style("fill").Definition.isUrl()) { var b = this.style("fill").Definition.getFillStyle(this); if (b != null) d.fillStyle = b } else if (this.style("fill").hasValue()) b = this.style("fill"), this.style("fill-opacity").hasValue() && (b = b.Color.addOpacity(this.style("fill-opacity").value)),
                d.fillStyle = b.value == "none" ? "rgba(0,0,0,0)" : b.value; if (this.style("stroke").Definition.isUrl()) { if (b = this.style("stroke").Definition.getFillStyle(this), b != null) d.strokeStyle = b } else if (this.style("stroke").hasValue()) b = this.style("stroke"), this.style("stroke-opacity").hasValue() && (b = b.Color.addOpacity(this.style("stroke-opacity").value)), d.strokeStyle = b.value == "none" ? "rgba(0,0,0,0)" : b.value; if (this.style("stroke-width").hasValue()) d.lineWidth = this.style("stroke-width").Length.toPixels(); if (this.style("stroke-linecap").hasValue()) d.lineCap =
                this.style("stroke-linecap").value; if (this.style("stroke-linejoin").hasValue()) d.lineJoin = this.style("stroke-linejoin").value; if (this.style("stroke-miterlimit").hasValue()) d.miterLimit = this.style("stroke-miterlimit").value; if (typeof d.font != "undefined") d.font = a.Font.CreateFont(this.style("font-style").value, this.style("font-variant").value, this.style("font-weight").value, this.style("font-size").hasValue() ? this.style("font-size").Length.toPixels() + "px" : "", this.style("font-family").value).toString();
                this.attribute("transform").hasValue() && (new a.Transform(this.attribute("transform").value)).apply(d); this.attribute("clip-path").hasValue() && (b = this.attribute("clip-path").Definition.getDefinition(), b != null && b.apply(d)); if (this.style("opacity").hasValue()) d.globalAlpha = this.style("opacity").numValue()
            }
        }; a.Element.RenderedElementBase.prototype = new a.Element.ElementBase; a.Element.PathElementBase = function (c) {
            this.base = a.Element.RenderedElementBase; this.base(c); this.path = function (d) {
                d != null && d.beginPath();
                return new a.BoundingBox
            }; this.renderChildren = function (d) {
                this.path(d); a.Mouse.checkPath(this, d); d.fillStyle != "" && d.fill(); d.strokeStyle != "" && d.stroke(); var b = this.getMarkers(); if (b != null) {
                    if (this.style("marker-start").Definition.isUrl()) { var c = this.style("marker-start").Definition.getDefinition(); c.render(d, b[0][0], b[0][1]) } if (this.style("marker-mid").Definition.isUrl()) for (var c = this.style("marker-mid").Definition.getDefinition(), e = 1; e < b.length - 1; e++) c.render(d, b[e][0], b[e][1]); this.style("marker-end").Definition.isUrl() &&
                    (c = this.style("marker-end").Definition.getDefinition(), c.render(d, b[b.length - 1][0], b[b.length - 1][1]))
                }
            }; this.getBoundingBox = function () { return this.path() }; this.getMarkers = function () { return null }
        }; a.Element.PathElementBase.prototype = new a.Element.RenderedElementBase; a.Element.svg = function (c) {
            this.base = a.Element.RenderedElementBase; this.base(c); this.baseClearContext = this.clearContext; this.clearContext = function (d) { this.baseClearContext(d); a.ViewPort.RemoveCurrent() }; this.baseSetContext = this.setContext;
            this.setContext = function (d) {
                d.strokeStyle = "rgba(0,0,0,0)"; d.lineCap = "butt"; d.lineJoin = "miter"; d.miterLimit = 4; this.baseSetContext(d); this.attribute("x").hasValue() && this.attribute("y").hasValue() && d.translate(this.attribute("x").Length.toPixels("x"), this.attribute("y").Length.toPixels("y")); var b = a.ViewPort.width(), c = a.ViewPort.height(); if (typeof this.root == "undefined" && this.attribute("width").hasValue() && this.attribute("height").hasValue()) {
                    var b = this.attribute("width").Length.toPixels("x"), c = this.attribute("height").Length.toPixels("y"),
                    e = 0, f = 0; this.attribute("refX").hasValue() && this.attribute("refY").hasValue() && (e = -this.attribute("refX").Length.toPixels("x"), f = -this.attribute("refY").Length.toPixels("y")); d.beginPath(); d.moveTo(e, f); d.lineTo(b, f); d.lineTo(b, c); d.lineTo(e, c); d.closePath(); d.clip()
                } a.ViewPort.SetCurrent(b, c); if (this.attribute("viewBox").hasValue()) {
                    var e = a.ToNumberArray(this.attribute("viewBox").value), f = e[0], g = e[1], b = e[2], c = e[3]; a.AspectRatio(d, this.attribute("preserveAspectRatio").value, a.ViewPort.width(), b, a.ViewPort.height(),
                    c, f, g, this.attribute("refX").value, this.attribute("refY").value); a.ViewPort.RemoveCurrent(); a.ViewPort.SetCurrent(e[2], e[3])
                }
            }
        }; a.Element.svg.prototype = new a.Element.RenderedElementBase; a.Element.rect = function (c) {
            this.base = a.Element.PathElementBase; this.base(c); this.path = function (d) {
                var b = this.attribute("x").Length.toPixels("x"), c = this.attribute("y").Length.toPixels("y"), e = this.attribute("width").Length.toPixels("x"), f = this.attribute("height").Length.toPixels("y"), g = this.attribute("rx").Length.toPixels("x"),
                j = this.attribute("ry").Length.toPixels("y"); this.attribute("rx").hasValue() && !this.attribute("ry").hasValue() && (j = g); this.attribute("ry").hasValue() && !this.attribute("rx").hasValue() && (g = j); d != null && (d.beginPath(), d.moveTo(b + g, c), d.lineTo(b + e - g, c), d.quadraticCurveTo(b + e, c, b + e, c + j), d.lineTo(b + e, c + f - j), d.quadraticCurveTo(b + e, c + f, b + e - g, c + f), d.lineTo(b + g, c + f), d.quadraticCurveTo(b, c + f, b, c + f - j), d.lineTo(b, c + j), d.quadraticCurveTo(b, c, b + g, c), d.closePath()); return new a.BoundingBox(b, c, b + e, c + f)
            }
        }; a.Element.rect.prototype =
        new a.Element.PathElementBase; a.Element.circle = function (c) { this.base = a.Element.PathElementBase; this.base(c); this.path = function (d) { var b = this.attribute("cx").Length.toPixels("x"), c = this.attribute("cy").Length.toPixels("y"), e = this.attribute("r").Length.toPixels(); d != null && (d.beginPath(), d.arc(b, c, e, 0, Math.PI * 2, !0), d.closePath()); return new a.BoundingBox(b - e, c - e, b + e, c + e) } }; a.Element.circle.prototype = new a.Element.PathElementBase; a.Element.ellipse = function (c) {
            this.base = a.Element.PathElementBase; this.base(c);
            this.path = function (d) { var b = 4 * ((Math.sqrt(2) - 1) / 3), c = this.attribute("rx").Length.toPixels("x"), e = this.attribute("ry").Length.toPixels("y"), f = this.attribute("cx").Length.toPixels("x"), g = this.attribute("cy").Length.toPixels("y"); d != null && (d.beginPath(), d.moveTo(f, g - e), d.bezierCurveTo(f + b * c, g - e, f + c, g - b * e, f + c, g), d.bezierCurveTo(f + c, g + b * e, f + b * c, g + e, f, g + e), d.bezierCurveTo(f - b * c, g + e, f - c, g + b * e, f - c, g), d.bezierCurveTo(f - c, g - b * e, f - b * c, g - e, f, g - e), d.closePath()); return new a.BoundingBox(f - c, g - e, f + c, g + e) }
        }; a.Element.ellipse.prototype =
        new a.Element.PathElementBase; a.Element.line = function (c) {
            this.base = a.Element.PathElementBase; this.base(c); this.getPoints = function () { return [new a.Point(this.attribute("x1").Length.toPixels("x"), this.attribute("y1").Length.toPixels("y")), new a.Point(this.attribute("x2").Length.toPixels("x"), this.attribute("y2").Length.toPixels("y"))] }; this.path = function (d) { var b = this.getPoints(); d != null && (d.beginPath(), d.moveTo(b[0].x, b[0].y), d.lineTo(b[1].x, b[1].y)); return new a.BoundingBox(b[0].x, b[0].y, b[1].x, b[1].y) };
            this.getMarkers = function () { var a = this.getPoints(), b = a[0].angleTo(a[1]); return [[a[0], b], [a[1], b]] }
        }; a.Element.line.prototype = new a.Element.PathElementBase; a.Element.polyline = function (c) {
            this.base = a.Element.PathElementBase; this.base(c); this.points = a.CreatePath(this.attribute("points").value); this.path = function (d) {
                var b = new a.BoundingBox(this.points[0].x, this.points[0].y); d != null && (d.beginPath(), d.moveTo(this.points[0].x, this.points[0].y)); for (var c = 1; c < this.points.length; c++) b.addPoint(this.points[c].x,
                this.points[c].y), d != null && d.lineTo(this.points[c].x, this.points[c].y); return b
            }; this.getMarkers = function () { for (var a = [], b = 0; b < this.points.length - 1; b++) a.push([this.points[b], this.points[b].angleTo(this.points[b + 1])]); a.push([this.points[this.points.length - 1], a[a.length - 1][1]]); return a }
        }; a.Element.polyline.prototype = new a.Element.PathElementBase; a.Element.polygon = function (c) {
            this.base = a.Element.polyline; this.base(c); this.basePath = this.path; this.path = function (a) {
                var b = this.basePath(a); a != null && (a.lineTo(this.points[0].x,
                this.points[0].y), a.closePath()); return b
            }
        }; a.Element.polygon.prototype = new a.Element.polyline; a.Element.path = function (c) {
            this.base = a.Element.PathElementBase; this.base(c); c = this.attribute("d").value; c = c.replace(/,/gm, " "); c = c.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm, "$1 $2"); c = c.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm, "$1 $2"); c = c.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, "$1 $2"); c = c.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, "$1 $2"); c = c.replace(/([0-9])([+\-])/gm,
            "$1 $2"); c = c.replace(/(\.[0-9]*)(\.)/gm, "$1 $2"); c = c.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm, "$1 $3 $4 "); c = a.compressSpaces(c); c = a.trim(c); this.PathParser = new function (d) {
                this.tokens = d.split(" "); this.reset = function () { this.i = -1; this.previousCommand = this.command = ""; this.start = new a.Point(0, 0); this.control = new a.Point(0, 0); this.current = new a.Point(0, 0); this.points = []; this.angles = [] }; this.isEnd = function () { return this.i >= this.tokens.length - 1 }; this.isCommandOrEnd = function () {
                    return this.isEnd() ?
                    !0 : this.tokens[this.i + 1].match(/^[A-Za-z]$/) != null
                }; this.isRelativeCommand = function () { return this.command == this.command.toLowerCase() }; this.getToken = function () { this.i += 1; return this.tokens[this.i] }; this.getScalar = function () { return parseFloat(this.getToken()) }; this.nextCommand = function () { this.previousCommand = this.command; this.command = this.getToken() }; this.getPoint = function () { return this.makeAbsolute(new a.Point(this.getScalar(), this.getScalar())) }; this.getAsControlPoint = function () {
                    var b = this.getPoint();
                    return this.control = b
                }; this.getAsCurrentPoint = function () { var b = this.getPoint(); return this.current = b }; this.getReflectedControlPoint = function () { return this.previousCommand.toLowerCase() != "c" && this.previousCommand.toLowerCase() != "s" ? this.current : new a.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y) }; this.makeAbsolute = function (b) { if (this.isRelativeCommand()) b.x = this.current.x + b.x, b.y = this.current.y + b.y; return b }; this.addMarker = function (b, a, d) {
                    d != null && this.angles.length > 0 && this.angles[this.angles.length -
                    1] == null && (this.angles[this.angles.length - 1] = this.points[this.points.length - 1].angleTo(d)); this.addMarkerAngle(b, a == null ? null : a.angleTo(b))
                }; this.addMarkerAngle = function (b, a) { this.points.push(b); this.angles.push(a) }; this.getMarkerPoints = function () { return this.points }; this.getMarkerAngles = function () { for (var b = 0; b < this.angles.length; b++) if (this.angles[b] == null) for (var a = b + 1; a < this.angles.length; a++) if (this.angles[a] != null) { this.angles[b] = this.angles[a]; break } return this.angles }
            }(c); this.path = function (d) {
                var b =
                this.PathParser; b.reset(); var c = new a.BoundingBox; for (d != null && d.beginPath() ; !b.isEnd() ;) switch (b.nextCommand(), b.command.toUpperCase()) {
                    case "M": var e = b.getAsCurrentPoint(); b.addMarker(e); c.addPoint(e.x, e.y); d != null && d.moveTo(e.x, e.y); for (b.start = b.current; !b.isCommandOrEnd() ;) e = b.getAsCurrentPoint(), b.addMarker(e, b.start), c.addPoint(e.x, e.y), d != null && d.lineTo(e.x, e.y); break; case "L": for (; !b.isCommandOrEnd() ;) {
                        var f = b.current, e = b.getAsCurrentPoint(); b.addMarker(e, f); c.addPoint(e.x, e.y); d != null &&
                        d.lineTo(e.x, e.y)
                    } break; case "H": for (; !b.isCommandOrEnd() ;) e = new a.Point((b.isRelativeCommand() ? b.current.x : 0) + b.getScalar(), b.current.y), b.addMarker(e, b.current), b.current = e, c.addPoint(b.current.x, b.current.y), d != null && d.lineTo(b.current.x, b.current.y); break; case "V": for (; !b.isCommandOrEnd() ;) e = new a.Point(b.current.x, (b.isRelativeCommand() ? b.current.y : 0) + b.getScalar()), b.addMarker(e, b.current), b.current = e, c.addPoint(b.current.x, b.current.y), d != null && d.lineTo(b.current.x, b.current.y); break; case "C": for (; !b.isCommandOrEnd() ;) {
                        var g =
                        b.current, f = b.getPoint(), j = b.getAsControlPoint(), e = b.getAsCurrentPoint(); b.addMarker(e, j, f); c.addBezierCurve(g.x, g.y, f.x, f.y, j.x, j.y, e.x, e.y); d != null && d.bezierCurveTo(f.x, f.y, j.x, j.y, e.x, e.y)
                    } break; case "S": for (; !b.isCommandOrEnd() ;) g = b.current, f = b.getReflectedControlPoint(), j = b.getAsControlPoint(), e = b.getAsCurrentPoint(), b.addMarker(e, j, f), c.addBezierCurve(g.x, g.y, f.x, f.y, j.x, j.y, e.x, e.y), d != null && d.bezierCurveTo(f.x, f.y, j.x, j.y, e.x, e.y); break; case "Q": for (; !b.isCommandOrEnd() ;) g = b.current, j = b.getAsControlPoint(),
                    e = b.getAsCurrentPoint(), b.addMarker(e, j, j), c.addQuadraticCurve(g.x, g.y, j.x, j.y, e.x, e.y), d != null && d.quadraticCurveTo(j.x, j.y, e.x, e.y); break; case "T": for (; !b.isCommandOrEnd() ;) g = b.current, j = b.getReflectedControlPoint(), b.control = j, e = b.getAsCurrentPoint(), b.addMarker(e, j, j), c.addQuadraticCurve(g.x, g.y, j.x, j.y, e.x, e.y), d != null && d.quadraticCurveTo(j.x, j.y, e.x, e.y); break; case "A": for (; !b.isCommandOrEnd() ;) {
                        var g = b.current, h = b.getScalar(), l = b.getScalar(), f = b.getScalar() * (Math.PI / 180), o = b.getScalar(), j = b.getScalar(),
                        e = b.getAsCurrentPoint(), n = new a.Point(Math.cos(f) * (g.x - e.x) / 2 + Math.sin(f) * (g.y - e.y) / 2, -Math.sin(f) * (g.x - e.x) / 2 + Math.cos(f) * (g.y - e.y) / 2), q = Math.pow(n.x, 2) / Math.pow(h, 2) + Math.pow(n.y, 2) / Math.pow(l, 2); q > 1 && (h *= Math.sqrt(q), l *= Math.sqrt(q)); o = (o == j ? -1 : 1) * Math.sqrt((Math.pow(h, 2) * Math.pow(l, 2) - Math.pow(h, 2) * Math.pow(n.y, 2) - Math.pow(l, 2) * Math.pow(n.x, 2)) / (Math.pow(h, 2) * Math.pow(n.y, 2) + Math.pow(l, 2) * Math.pow(n.x, 2))); isNaN(o) && (o = 0); var p = new a.Point(o * h * n.y / l, o * -l * n.x / h), g = new a.Point((g.x + e.x) / 2 + Math.cos(f) *
                        p.x - Math.sin(f) * p.y, (g.y + e.y) / 2 + Math.sin(f) * p.x + Math.cos(f) * p.y), m = function (b, a) { return (b[0] * a[0] + b[1] * a[1]) / (Math.sqrt(Math.pow(b[0], 2) + Math.pow(b[1], 2)) * Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2))) }, s = function (b, a) { return (b[0] * a[1] < b[1] * a[0] ? -1 : 1) * Math.acos(m(b, a)) }, o = s([1, 0], [(n.x - p.x) / h, (n.y - p.y) / l]), q = [(n.x - p.x) / h, (n.y - p.y) / l], p = [(-n.x - p.x) / h, (-n.y - p.y) / l], n = s(q, p); if (m(q, p) <= -1) n = Math.PI; m(q, p) >= 1 && (n = 0); j == 0 && n > 0 && (n -= 2 * Math.PI); j == 1 && n < 0 && (n += 2 * Math.PI); q = new a.Point(g.x - h * Math.cos((o + n) /
                        2), g.y - l * Math.sin((o + n) / 2)); b.addMarkerAngle(q, (o + n) / 2 + (j == 0 ? 1 : -1) * Math.PI / 2); b.addMarkerAngle(e, n + (j == 0 ? 1 : -1) * Math.PI / 2); c.addPoint(e.x, e.y); d != null && (m = h > l ? h : l, e = h > l ? 1 : h / l, h = h > l ? l / h : 1, d.translate(g.x, g.y), d.rotate(f), d.scale(e, h), d.arc(0, 0, m, o, o + n, 1 - j), d.scale(1 / e, 1 / h), d.rotate(-f), d.translate(-g.x, -g.y))
                    } break; case "Z": d != null && d.closePath(), b.current = b.start
                } return c
            }; this.getMarkers = function () {
                for (var a = this.PathParser.getMarkerPoints(), b = this.PathParser.getMarkerAngles(), c = [], e = 0; e < a.length; e++) c.push([a[e],
                b[e]]); return c
            }
        }; a.Element.path.prototype = new a.Element.PathElementBase; a.Element.pattern = function (c) {
            this.base = a.Element.ElementBase; this.base(c); this.createPattern = function (d) {
                var b = new a.Element.svg; b.attributes.viewBox = new a.Property("viewBox", this.attribute("viewBox").value); b.attributes.x = new a.Property("x", this.attribute("x").value); b.attributes.y = new a.Property("y", this.attribute("y").value); b.attributes.width = new a.Property("width", this.attribute("width").value); b.attributes.height = new a.Property("height",
                this.attribute("height").value); b.children = this.children; var c = document.createElement("canvas"); c.width = this.attribute("width").Length.toPixels("x"); c.height = this.attribute("height").Length.toPixels("y"); b.render(c.getContext("2d")); return d.createPattern(c, "repeat")
            }
        }; a.Element.pattern.prototype = new a.Element.ElementBase; a.Element.marker = function (c) {
            this.base = a.Element.ElementBase; this.base(c); this.baseRender = this.render; this.render = function (d, b, c) {
                d.translate(b.x, b.y); this.attribute("orient").valueOrDefault("auto") ==
                "auto" && d.rotate(c); this.attribute("markerUnits").valueOrDefault("strokeWidth") == "strokeWidth" && d.scale(d.lineWidth, d.lineWidth); d.save(); var e = new a.Element.svg; e.attributes.viewBox = new a.Property("viewBox", this.attribute("viewBox").value); e.attributes.refX = new a.Property("refX", this.attribute("refX").value); e.attributes.refY = new a.Property("refY", this.attribute("refY").value); e.attributes.width = new a.Property("width", this.attribute("markerWidth").value); e.attributes.height = new a.Property("height",
                this.attribute("markerHeight").value); e.attributes.fill = new a.Property("fill", this.attribute("fill").valueOrDefault("black")); e.attributes.stroke = new a.Property("stroke", this.attribute("stroke").valueOrDefault("none")); e.children = this.children; e.render(d); d.restore(); this.attribute("markerUnits").valueOrDefault("strokeWidth") == "strokeWidth" && d.scale(1 / d.lineWidth, 1 / d.lineWidth); this.attribute("orient").valueOrDefault("auto") == "auto" && d.rotate(-c); d.translate(-b.x, -b.y)
            }
        }; a.Element.marker.prototype =
        new a.Element.ElementBase; a.Element.defs = function (c) { this.base = a.Element.ElementBase; this.base(c); this.render = function () { } }; a.Element.defs.prototype = new a.Element.ElementBase; a.Element.GradientBase = function (c) {
            this.base = a.Element.ElementBase; this.base(c); this.gradientUnits = this.attribute("gradientUnits").valueOrDefault("objectBoundingBox"); this.stops = []; for (c = 0; c < this.children.length; c++) this.stops.push(this.children[c]); this.getGradient = function () { }; this.createGradient = function (d, b) {
                var c = this; this.attribute("xlink:href").hasValue() &&
                (c = this.attribute("xlink:href").Definition.getDefinition()); for (var e = this.getGradient(d, b), f = 0; f < c.stops.length; f++) e.addColorStop(c.stops[f].offset, c.stops[f].color); if (this.attribute("gradientTransform").hasValue()) {
                    c = a.ViewPort.viewPorts[0]; f = new a.Element.rect; f.attributes.x = new a.Property("x", -a.MAX_VIRTUAL_PIXELS / 3); f.attributes.y = new a.Property("y", -a.MAX_VIRTUAL_PIXELS / 3); f.attributes.width = new a.Property("width", a.MAX_VIRTUAL_PIXELS); f.attributes.height = new a.Property("height", a.MAX_VIRTUAL_PIXELS);
                    var g = new a.Element.g; g.attributes.transform = new a.Property("transform", this.attribute("gradientTransform").value); g.children = [f]; f = new a.Element.svg; f.attributes.x = new a.Property("x", 0); f.attributes.y = new a.Property("y", 0); f.attributes.width = new a.Property("width", c.width); f.attributes.height = new a.Property("height", c.height); f.children = [g]; g = document.createElement("canvas"); g.width = c.width; g.height = c.height; c = g.getContext("2d"); c.fillStyle = e; f.render(c); return c.createPattern(g, "no-repeat")
                } return e
            }
        };
        a.Element.GradientBase.prototype = new a.Element.ElementBase; a.Element.linearGradient = function (c) {
            this.base = a.Element.GradientBase; this.base(c); this.getGradient = function (a, b) {
                var c = b.getBoundingBox(), e = this.gradientUnits == "objectBoundingBox" ? c.x() + c.width() * this.attribute("x1").numValue() : this.attribute("x1").Length.toPixels("x"), f = this.gradientUnits == "objectBoundingBox" ? c.y() + c.height() * this.attribute("y1").numValue() : this.attribute("y1").Length.toPixels("y"), g = this.gradientUnits == "objectBoundingBox" ?
                c.x() + c.width() * this.attribute("x2").numValue() : this.attribute("x2").Length.toPixels("x"), c = this.gradientUnits == "objectBoundingBox" ? c.y() + c.height() * this.attribute("y2").numValue() : this.attribute("y2").Length.toPixels("y"); return a.createLinearGradient(e, f, g, c)
            }
        }; a.Element.linearGradient.prototype = new a.Element.GradientBase; a.Element.radialGradient = function (c) {
            this.base = a.Element.GradientBase; this.base(c); this.getGradient = function (a, b) {
                var c = b.getBoundingBox(), e = this.gradientUnits == "objectBoundingBox" ?
                c.x() + c.width() * this.attribute("cx").numValue() : this.attribute("cx").Length.toPixels("x"), f = this.gradientUnits == "objectBoundingBox" ? c.y() + c.height() * this.attribute("cy").numValue() : this.attribute("cy").Length.toPixels("y"), g = e, j = f; this.attribute("fx").hasValue() && (g = this.gradientUnits == "objectBoundingBox" ? c.x() + c.width() * this.attribute("fx").numValue() : this.attribute("fx").Length.toPixels("x")); this.attribute("fy").hasValue() && (j = this.gradientUnits == "objectBoundingBox" ? c.y() + c.height() * this.attribute("fy").numValue() :
                this.attribute("fy").Length.toPixels("y")); c = this.gradientUnits == "objectBoundingBox" ? (c.width() + c.height()) / 2 * this.attribute("r").numValue() : this.attribute("r").Length.toPixels(); return a.createRadialGradient(g, j, 0, e, f, c)
            }
        }; a.Element.radialGradient.prototype = new a.Element.GradientBase; a.Element.stop = function (c) {
            this.base = a.Element.ElementBase; this.base(c); this.offset = this.attribute("offset").numValue(); c = this.style("stop-color"); this.style("stop-opacity").hasValue() && (c = c.Color.addOpacity(this.style("stop-opacity").value));
            this.color = c.value
        }; a.Element.stop.prototype = new a.Element.ElementBase; a.Element.AnimateBase = function (c) {
            this.base = a.Element.ElementBase; this.base(c); a.Animations.push(this); this.duration = 0; this.begin = this.attribute("begin").Time.toMilliseconds(); this.maxDuration = this.begin + this.attribute("dur").Time.toMilliseconds(); this.getProperty = function () { var a = this.attribute("attributeType").value, b = this.attribute("attributeName").value; return a == "CSS" ? this.parent.style(b, !0) : this.parent.attribute(b, !0) }; this.initialValue =
            null; this.removed = !1; this.calcValue = function () { return "" }; this.update = function (a) {
                if (this.initialValue == null) this.initialValue = this.getProperty().value; if (this.duration > this.maxDuration) if (this.attribute("repeatCount").value == "indefinite") this.duration = 0; else return this.attribute("fill").valueOrDefault("remove") == "remove" && !this.removed ? (this.removed = !0, this.getProperty().value = this.initialValue, !0) : !1; this.duration += a; a = !1; if (this.begin < this.duration) a = this.calcValue(), this.attribute("type").hasValue() &&
                (a = this.attribute("type").value + "(" + a + ")"), this.getProperty().value = a, a = !0; return a
            }; this.progress = function () { return (this.duration - this.begin) / (this.maxDuration - this.begin) }
        }; a.Element.AnimateBase.prototype = new a.Element.ElementBase; a.Element.animate = function (c) { this.base = a.Element.AnimateBase; this.base(c); this.calcValue = function () { var a = this.attribute("from").numValue(), b = this.attribute("to").numValue(); return a + (b - a) * this.progress() } }; a.Element.animate.prototype = new a.Element.AnimateBase; a.Element.animateColor =
        function (c) { this.base = a.Element.AnimateBase; this.base(c); this.calcValue = function () { var a = new RGBColor(this.attribute("from").value), b = new RGBColor(this.attribute("to").value); if (a.ok && b.ok) { var c = a.r + (b.r - a.r) * this.progress(), e = a.g + (b.g - a.g) * this.progress(), a = a.b + (b.b - a.b) * this.progress(); return "rgb(" + parseInt(c, 10) + "," + parseInt(e, 10) + "," + parseInt(a, 10) + ")" } return this.attribute("from").value } }; a.Element.animateColor.prototype = new a.Element.AnimateBase; a.Element.animateTransform = function (c) {
            this.base =
            a.Element.animate; this.base(c)
        }; a.Element.animateTransform.prototype = new a.Element.animate; a.Element.font = function (c) {
            this.base = a.Element.ElementBase; this.base(c); this.horizAdvX = this.attribute("horiz-adv-x").numValue(); this.isArabic = this.isRTL = !1; this.missingGlyph = this.fontFace = null; this.glyphs = []; for (c = 0; c < this.children.length; c++) {
                var d = this.children[c]; if (d.type == "font-face") this.fontFace = d, d.style("font-family").hasValue() && (a.Definitions[d.style("font-family").value] = this); else if (d.type == "missing-glyph") this.missingGlyph =
                d; else if (d.type == "glyph") d.arabicForm != "" ? (this.isArabic = this.isRTL = !0, typeof this.glyphs[d.unicode] == "undefined" && (this.glyphs[d.unicode] = []), this.glyphs[d.unicode][d.arabicForm] = d) : this.glyphs[d.unicode] = d
            }
        }; a.Element.font.prototype = new a.Element.ElementBase; a.Element.fontface = function (c) { this.base = a.Element.ElementBase; this.base(c); this.ascent = this.attribute("ascent").value; this.descent = this.attribute("descent").value; this.unitsPerEm = this.attribute("units-per-em").numValue() }; a.Element.fontface.prototype =
        new a.Element.ElementBase; a.Element.missingglyph = function (c) { this.base = a.Element.path; this.base(c); this.horizAdvX = 0 }; a.Element.missingglyph.prototype = new a.Element.path; a.Element.glyph = function (c) { this.base = a.Element.path; this.base(c); this.horizAdvX = this.attribute("horiz-adv-x").numValue(); this.unicode = this.attribute("unicode").value; this.arabicForm = this.attribute("arabic-form").value }; a.Element.glyph.prototype = new a.Element.path; a.Element.text = function (c) {
            this.base = a.Element.RenderedElementBase;
            this.base(c); if (c != null) { this.children = []; for (var d = 0; d < c.childNodes.length; d++) { var b = c.childNodes[d]; b.nodeType == 1 ? this.addChild(b, !0) : b.nodeType == 3 && this.addChild(new a.Element.tspan(b), !1) } } this.baseSetContext = this.setContext; this.setContext = function (b) { this.baseSetContext(b); if (this.style("dominant-baseline").hasValue()) b.textBaseline = this.style("dominant-baseline").value; if (this.style("alignment-baseline").hasValue()) b.textBaseline = this.style("alignment-baseline").value }; this.renderChildren =
            function (b) {
                for (var a = this.style("text-anchor").valueOrDefault("start"), c = this.attribute("x").Length.toPixels("x"), d = this.attribute("y").Length.toPixels("y"), j = 0; j < this.children.length; j++) {
                    var h = this.children[j]; h.attribute("x").hasValue() ? h.x = h.attribute("x").Length.toPixels("x") : (h.attribute("dx").hasValue() && (c += h.attribute("dx").Length.toPixels("x")), h.x = c); c = h.measureText(b); if (a != "start" && (j == 0 || h.attribute("x").hasValue())) {
                        for (var l = c, o = j + 1; o < this.children.length; o++) {
                            var n = this.children[o];
                            if (n.attribute("x").hasValue()) break; l += n.measureText(b)
                        } h.x -= a == "end" ? l : l / 2
                    } c = h.x + c; h.attribute("y").hasValue() ? h.y = h.attribute("y").Length.toPixels("y") : (h.attribute("dy").hasValue() && (d += h.attribute("dy").Length.toPixels("y")), h.y = d); d = h.y; h.render(b)
                }
            }
        }; a.Element.text.prototype = new a.Element.RenderedElementBase; a.Element.TextElementBase = function (c) {
            this.base = a.Element.RenderedElementBase; this.base(c); this.getGlyph = function (a, b, c) {
                var e = b[c], f = null; if (a.isArabic) {
                    var g = "isolated"; if ((c == 0 || b[c -
                    1] == " ") && c < b.length - 2 && b[c + 1] != " ") g = "terminal"; c > 0 && b[c - 1] != " " && c < b.length - 2 && b[c + 1] != " " && (g = "medial"); if (c > 0 && b[c - 1] != " " && (c == b.length - 1 || b[c + 1] == " ")) g = "initial"; typeof a.glyphs[e] != "undefined" && (f = a.glyphs[e][g], f == null && a.glyphs[e].type == "glyph" && (f = a.glyphs[e]))
                } else f = a.glyphs[e]; if (f == null) f = a.missingGlyph; return f
            }; this.renderChildren = function (c) {
                var b = this.parent.style("font-family").Definition.getDefinition(); if (b != null) {
                    var k = this.parent.style("font-size").numValueOrDefault(a.Font.Parse(a.ctx.font).fontSize),
                    e = this.parent.style("font-style").valueOrDefault(a.Font.Parse(a.ctx.font).fontStyle), f = this.getText(); b.isRTL && (f = f.split("").reverse().join("")); for (var g = a.ToNumberArray(this.parent.attribute("dx").value), j = 0; j < f.length; j++) {
                        var h = this.getGlyph(b, f, j), l = k / b.fontFace.unitsPerEm; c.translate(this.x, this.y); c.scale(l, -l); var o = c.lineWidth; c.lineWidth = c.lineWidth * b.fontFace.unitsPerEm / k; e == "italic" && c.transform(1, 0, 0.4, 1, 0, 0); h.render(c); e == "italic" && c.transform(1, 0, -0.4, 1, 0, 0); c.lineWidth = o; c.scale(1 /
                        l, -1 / l); c.translate(-this.x, -this.y); this.x += k * (h.horizAdvX || b.horizAdvX) / b.fontFace.unitsPerEm; typeof g[j] != "undefined" && !isNaN(g[j]) && (this.x += g[j])
                    }
                } else c.strokeStyle != "" && c.strokeText(a.compressSpaces(this.getText()), this.x, this.y), c.fillStyle != "" && c.fillText(a.compressSpaces(this.getText()), this.x, this.y)
            }; this.getText = function () { }; this.measureText = function (c) {
                var b = this.parent.style("font-family").Definition.getDefinition(); if (b != null) {
                    var c = this.parent.style("font-size").numValueOrDefault(a.Font.Parse(a.ctx.font).fontSize),
                    k = 0, e = this.getText(); b.isRTL && (e = e.split("").reverse().join("")); for (var f = a.ToNumberArray(this.parent.attribute("dx").value), g = 0; g < e.length; g++) { var j = this.getGlyph(b, e, g); k += (j.horizAdvX || b.horizAdvX) * c / b.fontFace.unitsPerEm; typeof f[g] != "undefined" && !isNaN(f[g]) && (k += f[g]) } return k
                } b = a.compressSpaces(this.getText()); if (!c.measureText) return b.length * 10; c.save(); this.setContext(c); b = c.measureText(b).width; c.restore(); return b
            }
        }; a.Element.TextElementBase.prototype = new a.Element.RenderedElementBase;
        a.Element.tspan = function (c) { this.base = a.Element.TextElementBase; this.base(c); this.text = c.nodeType == 3 ? c.nodeValue : c.childNodes.length > 0 ? c.childNodes[0].nodeValue : c.text; this.getText = function () { return this.text } }; a.Element.tspan.prototype = new a.Element.TextElementBase; a.Element.tref = function (c) { this.base = a.Element.TextElementBase; this.base(c); this.getText = function () { var a = this.attribute("xlink:href").Definition.getDefinition(); if (a != null) return a.children[0].getText() } }; a.Element.tref.prototype = new a.Element.TextElementBase;
        a.Element.a = function (c) {
            this.base = a.Element.TextElementBase; this.base(c); this.hasText = !0; for (var d = 0; d < c.childNodes.length; d++) if (c.childNodes[d].nodeType != 3) this.hasText = !1; this.text = this.hasText ? c.childNodes[0].nodeValue : ""; this.getText = function () { return this.text }; this.baseRenderChildren = this.renderChildren; this.renderChildren = function (b) {
                if (this.hasText) {
                    this.baseRenderChildren(b); var c = new a.Property("fontSize", a.Font.Parse(a.ctx.font).fontSize); a.Mouse.checkBoundingBox(this, new a.BoundingBox(this.x,
                    this.y - c.Length.toPixels("y"), this.x + this.measureText(b), this.y))
                } else c = new a.Element.g, c.children = this.children, c.parent = this, c.render(b)
            }; this.onclick = function () { window.open(this.attribute("xlink:href").value) }; this.onmousemove = function () { a.ctx.canvas.style.cursor = "pointer" }
        }; a.Element.a.prototype = new a.Element.TextElementBase; a.Element.image = function (c) {
            this.base = a.Element.RenderedElementBase; this.base(c); a.Images.push(this); this.img = document.createElement("img"); this.loaded = !1; var d = this; this.img.onload =
            function () { d.loaded = !0 }; this.img.src = this.attribute("xlink:href").value; this.renderChildren = function (b) { var c = this.attribute("x").Length.toPixels("x"), d = this.attribute("y").Length.toPixels("y"), f = this.attribute("width").Length.toPixels("x"), g = this.attribute("height").Length.toPixels("y"); f == 0 || g == 0 || (b.save(), b.translate(c, d), a.AspectRatio(b, this.attribute("preserveAspectRatio").value, f, this.img.width, g, this.img.height, 0, 0), b.drawImage(this.img, 0, 0), b.restore()) }
        }; a.Element.image.prototype = new a.Element.RenderedElementBase;
        a.Element.g = function (c) { this.base = a.Element.RenderedElementBase; this.base(c); this.getBoundingBox = function () { for (var c = new a.BoundingBox, b = 0; b < this.children.length; b++) c.addBoundingBox(this.children[b].getBoundingBox()); return c } }; a.Element.g.prototype = new a.Element.RenderedElementBase; a.Element.symbol = function (c) {
            this.base = a.Element.RenderedElementBase; this.base(c); this.baseSetContext = this.setContext; this.setContext = function (c) {
                this.baseSetContext(c); if (this.attribute("viewBox").hasValue()) {
                    var b =
                    a.ToNumberArray(this.attribute("viewBox").value), k = b[0], e = b[1]; width = b[2]; height = b[3]; a.AspectRatio(c, this.attribute("preserveAspectRatio").value, this.attribute("width").Length.toPixels("x"), width, this.attribute("height").Length.toPixels("y"), height, k, e); a.ViewPort.SetCurrent(b[2], b[3])
                }
            }
        }; a.Element.symbol.prototype = new a.Element.RenderedElementBase; a.Element.style = function (c) {
            this.base = a.Element.ElementBase; this.base(c); for (var c = c.childNodes[0].nodeValue + (c.childNodes.length > 1 ? c.childNodes[1].nodeValue :
            ""), c = c.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, ""), c = a.compressSpaces(c), c = c.split("}"), d = 0; d < c.length; d++) if (a.trim(c[d]) != "") for (var b = c[d].split("{"), k = b[0].split(","), b = b[1].split(";"), e = 0; e < k.length; e++) {
                var f = a.trim(k[e]); if (f != "") {
                    for (var g = {}, j = 0; j < b.length; j++) { var h = b[j].indexOf(":"), l = b[j].substr(0, h), h = b[j].substr(h + 1, b[j].length - h); l != null && h != null && (g[a.trim(l)] = new a.Property(a.trim(l), a.trim(h))) } a.Styles[f] = g; if (f == "@font-face") {
                        f = g["font-family"].value.replace(/"/g,
                        ""); g = g.src.value.split(","); for (j = 0; j < g.length; j++) if (g[j].indexOf('format("svg")') > 0) { l = g[j].indexOf("url"); h = g[j].indexOf(")", l); l = g[j].substr(l + 5, h - l - 6); l = a.parseXml(a.ajax(l)).getElementsByTagName("font"); for (h = 0; h < l.length; h++) { var o = a.CreateElement(l[h]); a.Definitions[f] = o } }
                    }
                }
            }
        }; a.Element.style.prototype = new a.Element.ElementBase; a.Element.use = function (c) {
            this.base = a.Element.RenderedElementBase; this.base(c); this.baseSetContext = this.setContext; this.setContext = function (a) {
                this.baseSetContext(a);
                this.attribute("x").hasValue() && a.translate(this.attribute("x").Length.toPixels("x"), 0); this.attribute("y").hasValue() && a.translate(0, this.attribute("y").Length.toPixels("y"))
            }; this.getDefinition = function () { var a = this.attribute("xlink:href").Definition.getDefinition(); if (this.attribute("width").hasValue()) a.attribute("width", !0).value = this.attribute("width").value; if (this.attribute("height").hasValue()) a.attribute("height", !0).value = this.attribute("height").value; return a }; this.path = function (a) {
                var b =
                this.getDefinition(); b != null && b.path(a)
            }; this.renderChildren = function (a) { var b = this.getDefinition(); b != null && b.render(a) }
        }; a.Element.use.prototype = new a.Element.RenderedElementBase; a.Element.mask = function (c) {
            this.base = a.Element.ElementBase; this.base(c); this.apply = function (a, b) {
                var c = this.attribute("x").Length.toPixels("x"), e = this.attribute("y").Length.toPixels("y"), f = this.attribute("width").Length.toPixels("x"), g = this.attribute("height").Length.toPixels("y"), j = b.attribute("mask").value; b.attribute("mask").value =
                ""; var h = document.createElement("canvas"); h.width = c + f; h.height = e + g; var l = h.getContext("2d"); this.renderChildren(l); var o = document.createElement("canvas"); o.width = c + f; o.height = e + g; var n = o.getContext("2d"); b.render(n); n.globalCompositeOperation = "destination-in"; n.fillStyle = l.createPattern(h, "no-repeat"); n.fillRect(0, 0, c + f, e + g); a.fillStyle = n.createPattern(o, "no-repeat"); a.fillRect(0, 0, c + f, e + g); b.attribute("mask").value = j
            }; this.render = function () { }
        }; a.Element.mask.prototype = new a.Element.ElementBase; a.Element.clipPath =
        function (c) { this.base = a.Element.ElementBase; this.base(c); this.apply = function (a) { for (var b = 0; b < this.children.length; b++) this.children[b].path && (this.children[b].path(a), a.clip()) }; this.render = function () { } }; a.Element.clipPath.prototype = new a.Element.ElementBase; a.Element.filter = function (c) {
            this.base = a.Element.ElementBase; this.base(c); this.apply = function (a, b) {
                var c = b.getBoundingBox(), e = this.attribute("x").Length.toPixels("x"), f = this.attribute("y").Length.toPixels("y"); if (e == 0 || f == 0) e = c.x1, f = c.y1; var g =
                this.attribute("width").Length.toPixels("x"), j = this.attribute("height").Length.toPixels("y"); if (g == 0 || j == 0) g = c.width(), j = c.height(); c = b.style("filter").value; b.style("filter").value = ""; var h = 0.2 * g, l = 0.2 * j, o = document.createElement("canvas"); o.width = g + 2 * h; o.height = j + 2 * l; var n = o.getContext("2d"); n.translate(-e + h, -f + l); b.render(n); for (var q = 0; q < this.children.length; q++) this.children[q].apply(n, 0, 0, g + 2 * h, j + 2 * l); a.drawImage(o, 0, 0, g + 2 * h, j + 2 * l, e - h, f - l, g + 2 * h, j + 2 * l); b.style("filter", !0).value = c
            }; this.render =
            function () { }
        }; a.Element.filter.prototype = new a.Element.ElementBase; a.Element.feGaussianBlur = function (c) {
            function d(a, c, d, f, g) {
                for (var j = 0; j < g; j++) for (var h = 0; h < f; h++) for (var l = a[j * f * 4 + h * 4 + 3] / 255, o = 0; o < 4; o++) {
                    for (var n = d[0] * (l == 0 ? 255 : a[j * f * 4 + h * 4 + o]) * (l == 0 || o == 3 ? 1 : l), q = 1; q < d.length; q++) {
                        var p = Math.max(h - q, 0), m = a[j * f * 4 + p * 4 + 3] / 255, p = Math.min(h + q, f - 1), p = a[j * f * 4 + p * 4 + 3] / 255, s = d[q], r; m == 0 ? r = 255 : (r = Math.max(h - q, 0), r = a[j * f * 4 + r * 4 + o]); m = r * (m == 0 || o == 3 ? 1 : m); p == 0 ? r = 255 : (r = Math.min(h + q, f - 1), r = a[j * f * 4 + r * 4 + o]); n +=
                        s * (m + r * (p == 0 || o == 3 ? 1 : p))
                    } c[h * g * 4 + j * 4 + o] = n
                }
            } this.base = a.Element.ElementBase; this.base(c); this.apply = function (a, c, e, f, g) { var e = this.attribute("stdDeviation").numValue(), c = a.getImageData(0, 0, f, g), e = Math.max(e, 0.01), j = Math.ceil(e * 4) + 1; mask = []; for (var h = 0; h < j; h++) mask[h] = Math.exp(-0.5 * (h / e) * (h / e)); e = mask; j = 0; for (h = 1; h < e.length; h++) j += Math.abs(e[h]); j = 2 * j + Math.abs(e[0]); for (h = 0; h < e.length; h++) e[h] /= j; tmp = []; d(c.data, tmp, e, f, g); d(tmp, c.data, e, g, f); a.clearRect(0, 0, f, g); a.putImageData(c, 0, 0) }
        }; a.Element.filter.prototype =
        new a.Element.feGaussianBlur; a.Element.title = function () { }; a.Element.title.prototype = new a.Element.ElementBase; a.Element.desc = function () { }; a.Element.desc.prototype = new a.Element.ElementBase; a.Element.MISSING = function (a) { console.log("ERROR: Element '" + a.nodeName + "' not yet implemented.") }; a.Element.MISSING.prototype = new a.Element.ElementBase; a.CreateElement = function (c) {
            var d = c.nodeName.replace(/^[^:]+:/, ""), d = d.replace(/\-/g, ""), b = null, b = typeof a.Element[d] != "undefined" ? new a.Element[d](c) : new a.Element.MISSING(c);
            b.type = c.nodeName; return b
        }; a.load = function (c, d) { a.loadXml(c, a.ajax(d)) }; a.loadXml = function (c, d) { a.loadXmlDoc(c, a.parseXml(d)) }; a.loadXmlDoc = function (c, d) {
            a.init(c); var b = function (a) { for (var b = c.canvas; b;) a.x -= b.offsetLeft, a.y -= b.offsetTop, b = b.offsetParent; window.scrollX && (a.x += window.scrollX); window.scrollY && (a.y += window.scrollY); return a }; if (a.opts.ignoreMouse != !0) c.canvas.onclick = function (c) { c = b(new a.Point(c != null ? c.clientX : event.clientX, c != null ? c.clientY : event.clientY)); a.Mouse.onclick(c.x, c.y) },
            c.canvas.onmousemove = function (c) { c = b(new a.Point(c != null ? c.clientX : event.clientX, c != null ? c.clientY : event.clientY)); a.Mouse.onmousemove(c.x, c.y) }; var k = a.CreateElement(d.documentElement), e = k.root = !0, f = function () {
                a.ViewPort.Clear(); c.canvas.parentNode && a.ViewPort.SetCurrent(c.canvas.parentNode.clientWidth, c.canvas.parentNode.clientHeight); if (a.opts.ignoreDimensions != !0) {
                    if (k.style("width").hasValue()) c.canvas.width = k.style("width").Length.toPixels("x"), c.canvas.style.width = c.canvas.width + "px"; if (k.style("height").hasValue()) c.canvas.height =
                    k.style("height").Length.toPixels("y"), c.canvas.style.height = c.canvas.height + "px"
                } var b = c.canvas.clientWidth || c.canvas.width, d = c.canvas.clientHeight || c.canvas.height; a.ViewPort.SetCurrent(b, d); if (a.opts != null && a.opts.offsetX != null) k.attribute("x", !0).value = a.opts.offsetX; if (a.opts != null && a.opts.offsetY != null) k.attribute("y", !0).value = a.opts.offsetY; if (a.opts != null && a.opts.scaleWidth != null && a.opts.scaleHeight != null) {
                    var f = 1, g = 1; k.attribute("width").hasValue() && (f = k.attribute("width").Length.toPixels("x") /
                    a.opts.scaleWidth); k.attribute("height").hasValue() && (g = k.attribute("height").Length.toPixels("y") / a.opts.scaleHeight); k.attribute("width", !0).value = a.opts.scaleWidth; k.attribute("height", !0).value = a.opts.scaleHeight; k.attribute("viewBox", !0).value = "0 0 " + b * f + " " + d * g; k.attribute("preserveAspectRatio", !0).value = "none"
                } a.opts.ignoreClear != !0 && c.clearRect(0, 0, b, d); k.render(c); e && (e = !1, a.opts != null && typeof a.opts.renderCallback == "function" && a.opts.renderCallback())
            }, g = !0; a.ImagesLoaded() && (g = !1, f());
            a.intervalID = setInterval(function () { var b = !1; g && a.ImagesLoaded() && (g = !1, b = !0); a.opts.ignoreMouse != !0 && (b |= a.Mouse.hasEvents()); if (a.opts.ignoreAnimation != !0) for (var c = 0; c < a.Animations.length; c++) b |= a.Animations[c].update(1E3 / a.FRAMERATE); a.opts != null && typeof a.opts.forceRedraw == "function" && a.opts.forceRedraw() == !0 && (b = !0); b && (f(), a.Mouse.runEvents()) }, 1E3 / a.FRAMERATE)
        }; a.stop = function () { a.intervalID && clearInterval(a.intervalID) }; a.Mouse = new function () {
            this.events = []; this.hasEvents = function () {
                return this.events.length !=
                0
            }; this.onclick = function (a, d) { this.events.push({ type: "onclick", x: a, y: d, run: function (a) { if (a.onclick) a.onclick() } }) }; this.onmousemove = function (a, d) { this.events.push({ type: "onmousemove", x: a, y: d, run: function (a) { if (a.onmousemove) a.onmousemove() } }) }; this.eventElements = []; this.checkPath = function (a, d) { for (var b = 0; b < this.events.length; b++) { var k = this.events[b]; d.isPointInPath && d.isPointInPath(k.x, k.y) && (this.eventElements[b] = a) } }; this.checkBoundingBox = function (a, d) {
                for (var b = 0; b < this.events.length; b++) {
                    var k =
                    this.events[b]; d.isPointInBox(k.x, k.y) && (this.eventElements[b] = a)
                }
            }; this.runEvents = function () { a.ctx.canvas.style.cursor = ""; for (var c = 0; c < this.events.length; c++) for (var d = this.events[c], b = this.eventElements[c]; b;) d.run(b), b = b.parent; this.events = []; this.eventElements = [] }
        }; return a
    } this.canvg = function (a, c, d) {
        if (a == null && c == null && d == null) for (var c = document.getElementsByTagName("svg"), b = 0; b < c.length; b++) {
            a = c[b]; d = document.createElement("canvas"); d.width = a.clientWidth; d.height = a.clientHeight; a.parentNode.insertBefore(d,
            a); a.parentNode.removeChild(a); var k = document.createElement("div"); k.appendChild(a); canvg(d, k.innerHTML)
        } else d = d || {}, typeof a == "string" && (a = document.getElementById(a)), a.svg == null ? (b = m(), a.svg = b) : (b = a.svg, b.stop()), b.opts = d, a = a.getContext("2d"), typeof c.documentElement != "undefined" ? b.loadXmlDoc(a, c) : c.substr(0, 1) == "<" ? b.loadXml(a, c) : b.load(a, c)
    }
})();
if (CanvasRenderingContext2D) CanvasRenderingContext2D.prototype.drawSvg = function (m, a, c, d, b) { canvg(this.canvas, m, { ignoreMouse: !0, ignoreAnimation: !0, ignoreDimensions: !0, ignoreClear: !0, offsetX: a, offsetY: c, scaleWidth: d, scaleHeight: b }) };
(function (m) {
    var a = m.css, c = m.CanVGRenderer, d = m.SVGRenderer, b = m.extend, k = m.merge, e = m.addEvent, f = m.createElement, g = m.discardElement; b(c.prototype, d.prototype); b(c.prototype, {
        create: function (a, b, c, d) { this.setContainer(b, c, d); this.configure(a) }, setContainer: function (a, b, c) {
            var d = a.style, e = a.parentNode, g = d.left, d = d.top, k = a.offsetWidth, m = a.offsetHeight, s = { visibility: "hidden", position: "absolute" }; this.init.apply(this, [a, b, c]); this.canvas = f("canvas", { width: k, height: m }, { position: "relative", left: g, top: d }, a);
            this.ttLine = f("div", null, s, e); this.ttDiv = f("div", null, s, e); this.ttTimer = void 0; this.hiddenSvg = a = f("div", { width: k, height: m }, { visibility: "hidden", left: g, top: d }, e); a.appendChild(this.box)
        }, configure: function (b) {
            var c = this, d = b.options.tooltip, f = d.borderWidth, g = c.ttDiv, m = d.style, p = c.ttLine, t = parseInt(m.padding, 10), m = k(m, { padding: t + "px", "background-color": d.backgroundColor, "border-style": "solid", "border-width": f + "px", "border-radius": d.borderRadius + "px" }); d.shadow && (m = k(m, {
                "box-shadow": "1px 1px 3px gray",
                "-webkit-box-shadow": "1px 1px 3px gray"
            })); a(g, m); a(p, { "border-left": "1px solid darkgray" }); e(b, "tooltipRefresh", function (d) {
                var e = b.container, f = e.offsetLeft, e = e.offsetTop, k; g.innerHTML = d.text; k = b.tooltip.getPosition(g.offsetWidth, g.offsetHeight, { plotX: d.x, plotY: d.y }); a(g, { visibility: "visible", left: k.x + "px", top: k.y + "px", "border-color": d.borderColor }); a(p, { visibility: "visible", left: f + d.x + "px", top: e + b.plotTop + "px", height: b.plotHeight + "px" }); c.ttTimer !== void 0 && clearTimeout(c.ttTimer); c.ttTimer = setTimeout(function () {
                    a(g,
                    { visibility: "hidden" }); a(p, { visibility: "hidden" })
                }, 3E3)
            })
        }, destroy: function () { g(this.canvas); this.ttTimer !== void 0 && clearTimeout(this.ttTimer); g(this.ttLine); g(this.ttDiv); g(this.hiddenSvg); return d.prototype.destroy.apply(this) }, color: function (a, b, c) { a && a.linearGradient && (a = a.stops[a.stops.length - 1][1]); return d.prototype.color.call(this, a, b, c) }, draw: function () { window.canvg(this.canvas, this.hiddenSvg.innerHTML) }
    })
})(Highcharts);