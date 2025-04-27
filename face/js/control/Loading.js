(function ($, window, document, undefined) {
    function Loading(element, options) {
        this.element = element;
        this.guid = !options.guid ? Guid.NewGuid().ToString() : options.guid;
        //传入形参
        this.options = {
            size$: options.size ? options.size : 25,
        }
        this.init();
        this.hideLoading = function () {
            $("#" + this.guid).addClass("hide");
        }
        this.showLoading = function () {
            $("#" + this.guid).removeClass("hide");
        }
        return this;
    }
    Loading.prototype = {
        init: function () {
            var _this = this;
            _this.element.css("position","relative");
            var tag = "<div class='load-container load5 hide' id='" + _this.guid + "'><div class='loader' style='font-size:" + _this.size + "px'>加载中...</div></div>";
            _this.element.append($(tag));
        }
    }

    $.fn.loading = function (options) {
        return new Loading($(this), options);
    }
})(jQuery, window, document); 