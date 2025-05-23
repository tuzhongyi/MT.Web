/*! bootstrap-timepicker v0.2.3 
* http://jdewit.github.com/bootstrap-timepicker 
* Copyright (c) 2013 Joris de Wit 
* MIT License 
*/

(function (b, h, e, g) {
  var f = function (a, c) { this.widget = ""; this.$element = b(a); this.defaultTime = c.defaultTime; this.disableFocus = c.disableFocus; this.isOpen = c.isOpen; this.minuteStep = c.minuteStep; this.modalBackdrop = c.modalBackdrop; this.secondStep = c.secondStep; this.showInputs = c.showInputs; this.showMeridian = c.showMeridian; this.showSeconds = c.showSeconds; this.template = c.template; this.appendWidgetTo = c.appendWidgetTo; this._init() }; f.prototype = {
    constructor: f, _init: function () {
      var a = this; if (this.$element.parent().hasClass("input-group") ||
        this.$element.parent().hasClass("input-append")) this.$element.parent(".input-group, .input-append").find(".input-group-addon,.add-on").on({ "click.timepicker": b.proxy(this.showWidget, this) }), this.$element.on({ "focus.timepicker": b.proxy(this.highlightUnit, this), "click.timepicker": b.proxy(this.highlightUnit, this), "keydown.timepicker": b.proxy(this.elementKeydown, this), "blur.timepicker": b.proxy(this.blurElement, this) }); else if (this.template) this.$element.on({
          "focus.timepicker": b.proxy(this.showWidget,
            this), "click.timepicker": b.proxy(this.showWidget, this), "blur.timepicker": b.proxy(this.blurElement, this)
        }); else this.$element.on({ "focus.timepicker": b.proxy(this.highlightUnit, this), "click.timepicker": b.proxy(this.highlightUnit, this), "keydown.timepicker": b.proxy(this.elementKeydown, this), "blur.timepicker": b.proxy(this.blurElement, this) }); this.$widget = !1 !== this.template ? b(this.getTemplate()).prependTo(this.$element.parents(this.appendWidgetTo)).on("click", b.proxy(this.widgetClick, this)) : !1; this.showInputs &&
          !1 !== this.$widget && this.$widget.find("input").each(function () { b(this).on({ "click.timepicker": function () { b(this).select() }, "keydown.timepicker": b.proxy(a.widgetKeydown, a) }) }); this.setDefaultTime(this.defaultTime)
    }, blurElement: function () { this.highlightedUnit = g; this.updateFromElementVal() }, decrementHour: function () {
      if (this.showMeridian) if (1 === this.hour) this.hour = 12; else { if (12 === this.hour) return this.hour--, this.toggleMeridian(); if (0 === this.hour) return this.hour = 11, this.toggleMeridian(); this.hour-- } else 0 ===
        this.hour ? this.hour = 23 : this.hour--; this.update()
    }, decrementMinute: function (a) { a = a ? this.minute - a : this.minute - this.minuteStep; 0 > a ? (this.decrementHour(), this.minute = a + 60) : this.minute = a; this.update() }, decrementSecond: function () { var a = this.second - this.secondStep; 0 > a ? (this.decrementMinute(!0), this.second = a + 60) : this.second = a; this.update() }, elementKeydown: function (a) {
      switch (a.keyCode) {
        case 9: this.updateFromElementVal(); switch (this.highlightedUnit) {
          case "hour": a.preventDefault(); this.highlightNextUnit(); break;
          case "minute": if (this.showMeridian || this.showSeconds) a.preventDefault(), this.highlightNextUnit(); break; case "second": this.showMeridian && (a.preventDefault(), this.highlightNextUnit())
        }break; case 27: this.updateFromElementVal(); break; case 37: a.preventDefault(); this.highlightPrevUnit(); this.updateFromElementVal(); break; case 38: a.preventDefault(); switch (this.highlightedUnit) {
          case "hour": this.incrementHour(); this.highlightHour(); break; case "minute": this.incrementMinute(); this.highlightMinute(); break; case "second": this.incrementSecond();
            this.highlightSecond(); break; case "meridian": this.toggleMeridian(), this.highlightMeridian()
        }break; case 39: a.preventDefault(); this.updateFromElementVal(); this.highlightNextUnit(); break; case 40: switch (a.preventDefault(), this.highlightedUnit) { case "hour": this.decrementHour(); this.highlightHour(); break; case "minute": this.decrementMinute(); this.highlightMinute(); break; case "second": this.decrementSecond(); this.highlightSecond(); break; case "meridian": this.toggleMeridian(), this.highlightMeridian() }
      }
    }, formatTime: function (a,
      c, b, d) { return (10 > a ? "0" + a : a) + ":" + (10 > c ? "0" + c : c) + (this.showSeconds ? ":" + (10 > b ? "0" + b : b) : "") + (this.showMeridian ? " " + d : "") }, getCursorPosition: function () { var a = this.$element.get(0); if ("selectionStart" in a) return a.selectionStart; if (e.selection) { a.focus(); var c = e.selection.createRange(), b = e.selection.createRange().text.length; c.moveStart("character", -a.value.length); return c.text.length - b } }, getTemplate: function () {
        var a, c, b, d, e; this.showInputs ? (c = '<input type="text" name="hour" class="bootstrap-timepicker-hour form-control" maxlength="2"/>',
          b = '<input type="text" name="minute" class="bootstrap-timepicker-minute form-control" maxlength="2"/>', d = '<input type="text" name="second" class="bootstrap-timepicker-second form-control" maxlength="2"/>', e = '<input type="text" name="meridian" class="bootstrap-timepicker-meridian form-control" maxlength="2"/>') : (c = '<span class="bootstrap-timepicker-hour"></span>', b = '<span class="bootstrap-timepicker-minute"></span>', d = '<span class="bootstrap-timepicker-second"></span>', e = '<span class="bootstrap-timepicker-meridian"></span>');
        c = '<table><tr><td><a  data-action="incrementHour"><i class="icon-chevron-up"></i></a></td><td class="separator">&ensp;</td><td><a  data-action="incrementMinute"><i class="icon-chevron-up"></i></a></td>' + (this.showSeconds ? '<td class="separator">&ensp;</td><td><a  data-action="incrementSecond"><i class="icon-chevron-up"></i></a></td>' : "") + (this.showMeridian ? '<td class="separator">&ensp;</td><td class="meridian-column"><a  data-action="toggleMeridian"><i class="icon-chevron-up"></i></a></td>' :
          "") + "</tr><tr><td>" + c + '</td> <td class="separator">:</td><td>' + b + "</td> " + (this.showSeconds ? '<td class="separator">:</td><td>' + d + "</td>" : "") + (this.showMeridian ? '<td class="separator">&ensp;</td><td>' + e + "</td>" : "") + '</tr><tr><td><a  data-action="decrementHour"><i class="icon-chevron-down"></i></a></td><td class="separator"></td><td><a  data-action="decrementMinute"><i class="icon-chevron-down"></i></a></td>' + (this.showSeconds ? '<td class="separator">&ensp;</td><td><a  data-action="decrementSecond"><i class="icon-chevron-down"></i></a></td>' :
            "") + (this.showMeridian ? '<td class="separator">&ensp;</td><td><a  data-action="toggleMeridian"><i class="icon-chevron-down"></i></a></td>' : "") + "</tr></table>"; switch (this.template) {
              case "modal": a = '<div class="bootstrap-timepicker-widget modal fade" data-backdrop="' + (this.modalBackdrop ? "true" : "false") + '"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>Pick a Time</h3></div><div class="modal-body">' +
                c + '</div><div class="modal-footer"><a  class="btn btn-primary" data-dismiss="modal">OK</a></div></div></div></div>'; break; case "dropdown": a = '<div class="bootstrap-timepicker-widget dropdown-menu">' + c + "</div>"
            }return a
      }, getTime: function () { return this.formatTime(this.hour, this.minute, this.second, this.meridian) }, hideWidget: function () {
        !1 !== this.isOpen && (this.showInputs && this.updateFromWidgetInputs(), this.$element.trigger({
          type: "hide.timepicker", time: {
            value: this.getTime(), hours: this.hour, minutes: this.minute,
            seconds: this.second, meridian: this.meridian
          }
        }), "modal" === this.template && this.$widget.modal ? this.$widget.modal("hide") : this.$widget.removeClass("open"), b(e).off("mousedown.timepicker"), this.isOpen = !1)
      }, highlightUnit: function () {
        this.position = this.getCursorPosition(); 0 <= this.position && 2 >= this.position ? this.highlightHour() : 3 <= this.position && 5 >= this.position ? this.highlightMinute() : 6 <= this.position && 8 >= this.position ? this.showSeconds ? this.highlightSecond() : this.highlightMeridian() : 9 <= this.position && 11 >= this.position &&
          this.highlightMeridian()
      }, highlightNextUnit: function () { switch (this.highlightedUnit) { case "hour": this.highlightMinute(); break; case "minute": this.showSeconds ? this.highlightSecond() : this.showMeridian ? this.highlightMeridian() : this.highlightHour(); break; case "second": this.showMeridian ? this.highlightMeridian() : this.highlightHour(); break; case "meridian": this.highlightHour() } }, highlightPrevUnit: function () {
        switch (this.highlightedUnit) {
          case "hour": this.highlightMeridian(); break; case "minute": this.highlightHour();
            break; case "second": this.highlightMinute(); break; case "meridian": this.showSeconds ? this.highlightSecond() : this.highlightMinute()
        }
      }, highlightHour: function () { var a = this.$element.get(0); this.highlightedUnit = "hour"; a.setSelectionRange && setTimeout(function () { a.setSelectionRange(0, 2) }, 0) }, highlightMinute: function () { var a = this.$element.get(0); this.highlightedUnit = "minute"; a.setSelectionRange && setTimeout(function () { a.setSelectionRange(3, 5) }, 0) }, highlightSecond: function () {
        var a = this.$element.get(0); this.highlightedUnit =
          "second"; a.setSelectionRange && setTimeout(function () { a.setSelectionRange(6, 8) }, 0)
      }, highlightMeridian: function () { var a = this.$element.get(0); this.highlightedUnit = "meridian"; a.setSelectionRange && (this.showSeconds ? setTimeout(function () { a.setSelectionRange(9, 11) }, 0) : setTimeout(function () { a.setSelectionRange(6, 8) }, 0)) }, incrementHour: function () { if (this.showMeridian) { if (11 === this.hour) return this.hour++, this.toggleMeridian(); 12 === this.hour && (this.hour = 0) } 23 === this.hour ? this.hour = 0 : (this.hour++, this.update()) },
    incrementMinute: function (a) { a = a ? this.minute + a : this.minute + this.minuteStep - this.minute % this.minuteStep; 59 < a ? (this.incrementHour(), this.minute = a - 60) : this.minute = a; this.update() }, incrementSecond: function () { var a = this.second + this.secondStep - this.second % this.secondStep; 59 < a ? (this.incrementMinute(!0), this.second = a - 60) : this.second = a; this.update() }, remove: function () { b("document").off(".timepicker"); this.$widget && this.$widget.remove(); delete this.$element.data().timepicker }, setDefaultTime: function (a) {
      if (this.$element.val()) this.updateFromElementVal();
      else if ("current" === a) { var c = new Date; a = c.getHours(); var b = Math.floor(c.getMinutes() / this.minuteStep) * this.minuteStep, c = Math.floor(c.getSeconds() / this.secondStep) * this.secondStep, d = "AM"; this.showMeridian && (0 === a ? a = 12 : 12 <= a ? (12 < a && (a -= 12), d = "PM") : d = "AM"); this.hour = a; this.minute = b; this.second = c; this.meridian = d; this.update() } else !1 === a ? (this.second = this.minute = this.hour = 0, this.meridian = "AM") : this.setTime(a)
    }, setTime: function (a) {
      var c; this.showMeridian ? (a = a.split(" "), c = a[0].split(":"), this.meridian =
        a[1]) : c = a.split(":"); this.hour = parseInt(c[0], 10); this.minute = parseInt(c[1], 10); this.second = parseInt(c[2], 10); isNaN(this.hour) && (this.hour = 0); isNaN(this.minute) && (this.minute = 0); if (this.showMeridian) { 12 < this.hour ? this.hour = 12 : 1 > this.hour && (this.hour = 12); if ("am" === this.meridian || "a" === this.meridian) this.meridian = "AM"; else if ("pm" === this.meridian || "p" === this.meridian) this.meridian = "PM"; "AM" !== this.meridian && "PM" !== this.meridian && (this.meridian = "AM") } else 24 <= this.hour ? this.hour = 23 : 0 > this.hour && (this.hour =
          0); 0 > this.minute ? this.minute = 0 : 60 <= this.minute && (this.minute = 59); this.showSeconds && (isNaN(this.second) ? this.second = 0 : 0 > this.second ? this.second = 0 : 60 <= this.second && (this.second = 59)); this.update()
    }, showWidget: function () {
      if (!this.isOpen && !this.$element.is(":disabled")) {
        var a = this; b(e).on("mousedown.timepicker", function (c) { 0 === b(c.target).closest(".bootstrap-timepicker-widget").length && a.hideWidget() }); this.$element.trigger({
          type: "show.timepicker", time: {
            value: this.getTime(), hours: this.hour, minutes: this.minute,
            seconds: this.second, meridian: this.meridian
          }
        }); this.disableFocus && this.$element.blur(); this.updateFromElementVal(); if ("modal" === this.template && this.$widget.modal) this.$widget.modal("show").on("hidden", b.proxy(this.hideWidget, this)); else !1 === this.isOpen && this.$widget.addClass("open"); this.isOpen = !0
      }
    }, toggleMeridian: function () { this.meridian = "AM" === this.meridian ? "PM" : "AM"; this.update() }, update: function () {
      this.$element.trigger({
        type: "changeTime.timepicker", time: {
          value: this.getTime(), hours: this.hour, minutes: this.minute,
          seconds: this.second, meridian: this.meridian
        }
      }); this.updateElement(); this.updateWidget()
    }, updateElement: function () { this.$element.val(this.getTime()).change() }, updateFromElementVal: function () { var a = this.$element.val(); a && this.setTime(a) }, updateWidget: function () {
      if (!1 !== this.$widget) {
        var a = 10 > this.hour ? "0" + this.hour : this.hour, c = 10 > this.minute ? "0" + this.minute : this.minute, b = 10 > this.second ? "0" + this.second : this.second; this.showInputs ? (this.$widget.find("input.bootstrap-timepicker-hour").val(a), this.$widget.find("input.bootstrap-timepicker-minute").val(c),
          this.showSeconds && this.$widget.find("input.bootstrap-timepicker-second").val(b), this.showMeridian && this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)) : (this.$widget.find("span.bootstrap-timepicker-hour").text(a), this.$widget.find("span.bootstrap-timepicker-minute").text(c), this.showSeconds && this.$widget.find("span.bootstrap-timepicker-second").text(b), this.showMeridian && this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))
      }
    }, updateFromWidgetInputs: function () {
      if (!1 !==
        this.$widget) { var a = b("input.bootstrap-timepicker-hour", this.$widget).val() + ":" + b("input.bootstrap-timepicker-minute", this.$widget).val() + (this.showSeconds ? ":" + b("input.bootstrap-timepicker-second", this.$widget).val() : "") + (this.showMeridian ? " " + b("input.bootstrap-timepicker-meridian", this.$widget).val() : ""); this.setTime(a) }
    }, widgetClick: function (a) { a.stopPropagation(); a.preventDefault(); if (a = b(a.target).closest("a").data("action")) this[a]() }, widgetKeydown: function (a) {
      var c = b(a.target).closest("input").attr("name");
      switch (a.keyCode) {
        case 9: if (this.showMeridian) { if ("meridian" === c) return this.hideWidget() } else if (this.showSeconds) { if ("second" === c) return this.hideWidget() } else if ("minute" === c) return this.hideWidget(); this.updateFromWidgetInputs(); break; case 27: this.hideWidget(); break; case 38: a.preventDefault(); switch (c) { case "hour": this.incrementHour(); break; case "minute": this.incrementMinute(); break; case "second": this.incrementSecond(); break; case "meridian": this.toggleMeridian() }break; case 40: switch (a.preventDefault(),
          c) { case "hour": this.decrementHour(); break; case "minute": this.decrementMinute(); break; case "second": this.decrementSecond(); break; case "meridian": this.toggleMeridian() }
      }
    }
  }; b.fn.timepicker = function (a) { var c = Array.apply(null, arguments); c.shift(); return this.each(function () { var e = b(this), d = e.data("timepicker"), g = "object" === typeof a && a; d || e.data("timepicker", d = new f(this, b.extend({}, b.fn.timepicker.defaults, g, b(this).data()))); "string" === typeof a && d[a].apply(d, c) }) }; b.fn.timepicker.defaults = {
    defaultTime: "current",
    disableFocus: !1, isOpen: !1, minuteStep: 15, modalBackdrop: !1, secondStep: 15, showSeconds: !1, showInputs: !0, showMeridian: !0, template: "dropdown", appendWidgetTo: ".bootstrap-timepicker"
  }; b.fn.timepicker.Constructor = f
})(jQuery, window, document);
