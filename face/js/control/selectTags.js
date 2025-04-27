(function ($, window, document, undefined) {
    function SelectTags(element, options) {
        this.element = element;

        //传入形参
        this.options = {
            tagsClass$: options.tagsClass,
            tagsWidthClass$: options.tagsWidthClass,
            tagsCardClass$: options.tagsCardClass,
            tagsCardModels$: options.tagsCardModels,
            tagsCardCloseCall$: options.tagsCardCloseCall
        };
        this.init();
    }
    SelectTags.prototype = {
        init: function () {

            this.creatHtml();
            this.bindEvent();
        },
        creatHtml: function () {
            var me = this
                , tagsClass = me.options.tagsClass$
                , tagsWidthClass = me.options.tagsWidthClass$
                , tagsCardClass = me.options.tagsCardClass$
                , tagsCardModels = me.options.tagsCardModels$
                , tagsRoot = $('<div />')
                , tags = $('<div />', {
                    class: tagsClass,
                    style: "display: initial;border:0;margin-left:6px"
                }).appendTo(tagsRoot);

            for (var index = 0; index < tagsCardModels.length; index++) {
                var span = $('<label />', {
                    class: 'tag label label-info b-rad-2 tags-card-p' + tagsCardClass,                   
                    style:'display: inline-block;padding: 5px 15px; margin-top:1px;'
                }).appendTo(tags);
                $('<label />',{
                    style:"line-height: 26px;margin-bottom: 0px;font-size:15px",
                    text: tagsCardModels[index].val
                }).appendTo(span);
                // var span2 = $('<span />', {
                //     class: 'f-b m-l-10 card-x cursor-pointer tagsCardX',
                //     text: 'X'
                //    // style: "padding:2.4px 7.2px 3.6px 7.2px"
                // }).appendTo(span);
                // $(span2).attr('data-role', 'remove');
                var i = $('<i />',{
                    class: 'fa  ti-close card-x cursor-pointer tagsCardX',
                    style:'font-size:12px;margin-left: 15px;'
                }).appendTo(span);
                $(i).attr('tagsCardId', tagsCardModels[index].id);
                $(i).attr('tagsCard', tagsCardModels[index].val);
            }

            me.element.append(tagsRoot.html());
        },
        addTag: function (tagsCardModels) {
            var me = this 
                , tags = $('<div />');              

            for (var index = 0; index < tagsCardModels.length; index++) {
                var span = $('<span />', {
                    class: 'tag label label-info b-rad-2 tags-card-p' + tagsCardClass,
                    text: tagsCardModels[index].val
                }).appendTo(tags);

                var i = $('<i />',{
                    class: 'ion ion-close card-x cursor-pointer tagsCardX',
                }).appendTo(span);

                // var span2 = $('<span />', {
                //     class: 'f-b m-l-10 card-x cursor-pointer tagsCardX',
                //     text: 'X',
                //     style: "padding:2.4px 7.2px 3.6px 7.2px"
                // }).appendTo(span);
                // $(span2).attr('data-role', 'remove');
                $(i).attr('tagsCardId', tagsCardModels[index].id);
            }
            this.bindEvent();
        },
        bindEvent: function () {
            var me = this;
            $('.tagsCardX').on('click', function () {

                if (me.options.tagsCardCloseCall$) {
                    me.options.tagsCardCloseCall$(this,$(this).attr('tagscardid'),$(this).attr('tagscard'));
                }
            });
        }
    }
    $.fn.selectTags = function (options) {
        return new SelectTags($(this), options);
    }
})(jQuery, window, document);




