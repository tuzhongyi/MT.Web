"use strict";
var vertexYUVShader = ["#version 300 es", "layout(location = 0) in vec4 vertexPos;", "layout(location = 1) in vec2 texturePos;", "out vec2 textureCoord;", "void main()", "{", "gl_Position = vertexPos;", "textureCoord = texturePos;", "}"].join("\n");
var fragmentYUVShader = ["#version 300 es", "precision highp float;", "in vec2 textureCoord;", "out vec4 fragColor;", "uniform sampler2D ySampler;", "uniform sampler2D uSampler;", "uniform sampler2D vSampler;", "const mat4 YUV2RGB = mat4", "(", "1.1643828125, 0, 1.59602734375, -.87078515625,", "1.1643828125, -.39176171875, -.81296875, .52959375,", "1.1643828125, 2.017234375, 0, -1.081390625,", "0, 0, 0, 1", ");", "void main(void) {", "float y = texture(ySampler,  textureCoord).r;", "float u = texture(uSampler,  textureCoord).r;", "float v = texture(vSampler,  textureCoord).r;", "fragColor = vec4(y, u, v, 1) * YUV2RGB;", "}"].join("\n");
var vertexLineShader = ["#version 300 es", "layout(location = 0) in vec4 vertexPosLine;", "void main()", "{", "gl_Position = vertexPosLine;", "}"].join("\n");
var fragmentLineShader = ["#version 300 es", "precision highp float;", "uniform mediump float fRcom;", "uniform mediump float fGcom;", "uniform mediump float fBcom;", "out vec4 fragColor;", "void main()", "{", "fragColor = vec4(fRcom,fGcom,fBcom,1.0);", "}"].join("\n");
(function (e, r) { e.SuperRender2 = r() })(this, function () {
    function e(e) {
        this.canvasElement = document.getElementById(e);
        this.initContextGL();
        if (this.contextGL) {
            this.YUVProgram = this.initProgram(vertexYUVShader, fragmentYUVShader);
            this.LineProgram = this.initProgram(vertexLineShader, fragmentLineShader);
            this.initBuffers();
            this.initTextures()
        }
    } e.prototype.initContextGL = function () {
        var e = this.canvasElement;
        var r = null;
        try { r = e.getContext("webgl2") } catch (e) { r = null } if (!r || typeof r.getParameter !== "function") { r = null } this.contextGL = r;
        console.log("WebGL2.0")
    };
    e.prototype.initProgram = function (e, r) {
        var t = this.contextGL;
        var a = t.createShader(t.VERTEX_SHADER);
        t.shaderSource(a, e);
        t.compileShader(a);
        if (!t.getShaderParameter(a, t.COMPILE_STATUS)) { console.log("Vertex shader failed to compile: " + t.getShaderInfoLog(a)) }
        var i = t.createShader(t.FRAGMENT_SHADER);
        t.shaderSource(i, r);
        t.compileShader(i);
        if (!t.getShaderParameter(i, t.COMPILE_STATUS)) { console.log("Fragment shader failed to compile: " + t.getShaderInfoLog(i)) }
        var o = t.createProgram();
        t.attachShader(o, a);
        t.attachShader(o, i);
        t.linkProgram(o);
        if (!t.getProgramParameter(o, t.LINK_STATUS)) { console.log("Program failed to compile: " + t.getProgramInfoLog(o)) } t.deleteShader(a);
        t.deleteShader(i);
        return o
    };
    e.prototype.initBuffers = function () {
        var e = this.contextGL;
        var r = e.createBuffer();
        e.bindBuffer(e.ARRAY_BUFFER, r);
        e.bufferData(e.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), e.STATIC_DRAW);
        e.bindBuffer(e.ARRAY_BUFFER, null);
        var t = e.createBuffer();
        e.bindBuffer(e.ARRAY_BUFFER, t);
        e.bufferData(e.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), e.DYNAMIC_DRAW);
        e.bindBuffer(e.ARRAY_BUFFER, null);
        var a = e.createBuffer();
        e.bindBuffer(e.ARRAY_BUFFER, a);
        e.bufferData(e.ARRAY_BUFFER, 16, e.DYNAMIC_DRAW);
        e.bindBuffer(e.ARRAY_BUFFER, null);
        this.vertexPosBuffer = r;
        this.texturePosBuffer = t;
        this.vertexLineBuffer = a
    };
    e.prototype.initTextures = function () {
        var e = this.contextGL;
        var r = this.YUVProgram;
        e.useProgram(r);
        var t = this.initTexture();
        var a = e.getUniformLocation(r, "ySampler");
        e.uniform1i(a, 0);
        this.yTextureRef = t;
        var i = this.initTexture();
        var o = e.getUniformLocation(r, "uSampler");
        e.uniform1i(o, 1);
        this.uTextureRef = i;
        var n = this.initTexture();
        var f = e.getUniformLocation(r, "vSampler");
        e.uniform1i(f, 2);
        this.vTextureRef = n;
        e.useProgram(null)
    };
    e.prototype.initTexture = function () {
        var e = this.contextGL;
        var r = e.createTexture();
        e.bindTexture(e.TEXTURE_2D, r);
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR);
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR);
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
        e.bindTexture(e.TEXTURE_2D, null);
        return r
    };
    e.prototype.SR_DisplayFrameData = function (e, r, t) {
        if (e <= 0 || r <= 0) { return }
        var a = this.contextGL;
        if (null == t) {
            a.clearColor(0, 0, 0, 0);
            a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
            return
        }
        var i = this.canvasElement;
        this.nWindowWidth = i.width;
        this.nWindowHeight = i.height;
        var o = this.nWindowWidth;
        var n = this.nWindowHeight;
        a.clearColor(.8, .8, 1, 1);
        a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
        a.viewport(0, 0, o, n);
        this.updateFrameData(e, r, t);
        var f = this.YUVProgram;
        a.useProgram(f);
        var u = this.vertexPosBuffer;
        a.bindBuffer(a.ARRAY_BUFFER, u);
        var s = a.getAttribLocation(f, "vertexPos");
        a.enableVertexAttribArray(s);
        a.vertexAttribPointer(s, 2, a.FLOAT, false, 0, 0);
        a.bindBuffer(a.ARRAY_BUFFER, null);
        var v = this.texturePosBuffer;
        a.bindBuffer(a.ARRAY_BUFFER, v);
        var l = a.getAttribLocation(f, "texturePos");
        a.enableVertexAttribArray(l);
        a.vertexAttribPointer(l, 2, a.FLOAT, false, 0, 0);
        a.bindBuffer(a.ARRAY_BUFFER, null);
        a.drawArrays(a.TRIANGLE_STRIP, 0, 4);
        a.disableVertexAttribArray(s);
        a.disableVertexAttribArray(l);
        a.useProgram(null)
    };
    e.prototype.updateFrameData = function (e, r, t) {
        var a = this.contextGL;
        var i = this.yTextureRef;
        var o = this.uTextureRef;
        var n = this.vTextureRef;
        var f = t;
        var u = e * r;
        var s = f.subarray(0, u);
        a.activeTexture(a.TEXTURE0);
        a.bindTexture(a.TEXTURE_2D, i);
        a.texImage2D(a.TEXTURE_2D, 0, a.LUMINANCE, e, r, 0, a.LUMINANCE, a.UNSIGNED_BYTE, s);
        var v = e / 2 * r / 2;
        var l = f.subarray(u, u + v);
        a.activeTexture(a.TEXTURE1);
        a.bindTexture(a.TEXTURE_2D, o);
        a.texImage2D(a.TEXTURE_2D, 0, a.LUMINANCE, e / 2, r / 2, 0, a.LUMINANCE, a.UNSIGNED_BYTE, l);
        var R = v;
        var m = f.subarray(u + v, u + v + R);
        a.activeTexture(a.TEXTURE2);
        a.bindTexture(a.TEXTURE_2D, n);
        a.texImage2D(a.TEXTURE_2D, 0, a.LUMINANCE, e / 2, r / 2, 0, a.LUMINANCE, a.UNSIGNED_BYTE, m)
    };
    e.prototype.SR_DrawLine = function (e, r, t, a) {
        var i = this.contextGL;
        var o = this.nWindowWidth;
        var n = this.nWindowHeight;
        var f = this.LineProgram;
        i.useProgram(f);
        var u = i.getUniformLocation(f, "fRcom");
        i.uniform1f(u, t.fR);
        var s = i.getUniformLocation(f, "fGcom");
        i.uniform1f(s, t.fG);
        var v = i.getUniformLocation(f, "fBcom");
        i.uniform1f(v, t.fB);
        var l = e.fX / o * 2 - 1;
        var R = -(e.fY / n) * 2 + 1;
        var m = r.fX / o * 2 - 1;
        var h = -(r.fY / n) * 2 + 1;
        var E = this.vertexLineBuffer;
        i.bindBuffer(i.ARRAY_BUFFER, E);
        i.bufferSubData(i.ARRAY_BUFFER, 0, new Float32Array([l, R, m, h]));
        var T = i.getAttribLocation(f, "vertexPosLine");
        i.enableVertexAttribArray(T);
        i.vertexAttribPointer(T, 2, i.FLOAT, false, 0, 0);
        i.bindBuffer(i.ARRAY_BUFFER, null);
        i.drawArrays(i.LINES, 0, 2);
        i.disableVertexAttribArray(T);
        i.useProgram(null)
    };
    e.prototype.SR_SetDisplayRect = function (e) {
        var r = this.contextGL;
        var t = this.nWindowWidth;
        var a = this.nWindowHeight;
        var i = null;
        if (e && t > 0 && a > 0) {
            var o = e.left / t;
            var n = e.top / a;
            var f = e.right / t;
            var u = e.bottom / a;
            i = new Float32Array([f, n, o, n, f, u, o, u])
        } else { i = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]) }
        var s = this.texturePosBuffer;
        r.bindBuffer(r.ARRAY_BUFFER, s);
        r.bufferSubData(r.ARRAY_BUFFER, 0, i);
        r.bindBuffer(r.ARRAY_BUFFER, null)
    };
    e.prototype.SR_Destroy = function () {
        var e = this.contextGL;
        var r = this.YUVProgram;
        e.deleteProgram(r);
        var t = this.LineProgram;
        e.deleteProgram(t);
        var a = this.vertexPosBuffer;
        var i = this.texturePosBuffer;
        var o = this.vertexLineBuffer;
        e.deleteBuffer(a);
        e.deleteBuffer(i);
        e.deleteBuffer(o);
        var n = this.yTextureRef;
        var f = this.uTextureRef;
        var u = this.vTextureRef;
        e.deleteTexture(n);
        e.deleteTexture(f);
        e.deleteTexture(u)
    };
    return e
});