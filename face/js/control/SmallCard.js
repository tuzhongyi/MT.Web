(function ($, window, document, undefined) {
    function SmallCard(element, options, templet) {
        this.guid = options.guid == '' ? Guid.NewGuid().ToString() : options.guid;
        this.element = element;
        this.templet$ = $.extend(true, {}, templet);;

        //传入形参
        this.options = {
            cardClass$: options.cardClass,
            iconImg$: options.iconImg,
            iconClass$: options.iconClass || 'area-icon-logo',
            titleText$: options.titleText,
            titleContent$: options.titleContent,
            editBtnClass$: options.editBtnClass,
            delBtnClass$: options.delBtnClass,
            otherBtnHtml$: options.otherBtnHtml,
            editClick$: options.editClick,
            delClick$: options.delClick,
            selectedClick$: options.selectedClick,
            textRow$: options.textRow,
            textRowLen$: options.textRowLen
        };
        this.init();
    }
    SmallCard.prototype = {
        init: function () {
      
            this.creatHtml();
            this.bindEvent();
        },
        creatHtml: function () {
            var me = this
                , cardClass = me.options.cardClass$
                , iconClass = me.options.iconClass$
                , iconImg = me.options.iconImg$
                , titleText = me.options.titleText$
                , titleContent = me.options.titleContent$
                , editBtnClass = me.options.editBtnClass$
                , delBtnClass = me.options.delBtnClass$
                , editClick = me.options.editClick$
                , otherBtnHtml = me.options.otherBtnHtml$
                // , textRow = me.options.textRow$
                // , textRowLen = me.options.textRowLen$
                , rootEl = me.templet$.find($('.controlArea'));
                rootEl.find($('.area-lab')).children().eq(0).text('');
                rootEl.find($('.area-lab')).children().eq(1).text('');
            rootEl.attr('id', me.guid);
            rootEl.addClass(cardClass);
            rootEl.children().eq(0).addClass(iconClass);
            rootEl.children().eq(0).children().eq(0).addClass(iconImg);
            //rootEl.children().eq(0).children().eq(0).attr('src', iconImg);
            rootEl.find($('.area-lab')).attr('title', titleText);
            rootEl.find($('.area-lab')).children().eq(0).text(titleContent);
            // if (textRow > 1) {
            //     if (titleContent.gblen() > textRowLen) {
            //         rootEl.find($('.area-lab')).children().eq(0).text(titleContent.substr(0, 11));
            //         if (titleContent.substr(11, 10).trim().gblen() >= textRowLen) {
            //             rootEl.find($('.area-lab')).children().eq(1).text(titleContent.substr(11, 10) + '...');
            //         }
            //         else
            //             rootEl.find($('.area-lab')).children().eq(1).text(titleContent.substr(11, 10));
            //     }
            //     else {
            //         rootEl.find($('.area-lab')).children().eq(0).text(titleContent);
            //     }
            // }
            // else {
            //     if (titleContent.gblen() > textRowLen) {
            //         rootEl.find($('.area-lab')).children().eq(0).text(titleContent.substr(0, 11) + '...');
            //     }
            // }
            rootEl.find($('.del_')).children().eq(0).addClass(delBtnClass);
            rootEl.find($('.edit_')).children().eq(0).addClass(editBtnClass);
            if (otherBtnHtml) {
                rootEl.find($('.edit_')).parent().append(otherBtnHtml);
            }
            me.element.append(me.templet$.html());
            rootEl.find($('.del_')).children().eq(0).removeClass(delBtnClass);
            rootEl.find($('.edit_')).children().eq(0).removeClass(editBtnClass);
            rootEl.children().eq(0).children().eq(0).removeClass(iconImg);
         
        },
        bindEvent: function () {
            var me = this; 
            $('#' + me.guid).on('click', function () {    
              
                if (me.options.selectedClick$) {
                    me.options.selectedClick$(me.guid,me.options.titleContent$);
                }
            });
            $('#' + me.guid).on('mousemove', function () {   
           
                $(this).children().eq(2).addClass('opacity-1');
                $(this).children().eq(2).removeClass('opacity-0');
            });
            $('#' + me.guid).on('mouseout', function () {  
                $(this).children().eq(2).addClass('opacity-0');
                $(this).children().eq(2).removeClass('opacity-1');
            });
            $('#' + me.guid).find($('.edit_')).on('click', function () {
                if (me.options.editClick$) {
                    me.options.editClick$(me.guid);

                }
            });
            $('#' + me.guid).find($('.del_')).on('click', function () {
                if (me.options.delClick$) {
                    me.options.delClick$(me.guid);
                }
            });
        }
    }
    $.fn.smallCard = function (options, templet) {
        return new SmallCard($(this), options, templet);
    }
})(jQuery, window, document);




