(function ($, window, document, undefined) {
    function ModelWindow(element, options, templet) {
        this.element = element;
        this.templet = $.extend(true, {}, templet); 
        this.pageIndex = 1;
        this.pageSize = 18;
        //传入形参
        this.options = {
            windowClass$: options.windowClass,
            allBtnClass$: options.allBtnClass || 'btn waves-effect waves-light btn-info',
            unAllBtnClass$: options.unAllBtnClass || 'btn waves-effect waves-light btn-info',
            downClass$: options.downClass,
            downIconImg$: options.downIconImg,
            isShowAllBtn$:options.isShowAllBtn,
            listViewDataModel$:options.listViewDataModel,
            finishCallBack$: options.finishCallBack,
            cancelCallBack$: options.cancelCallBack,
            selectedCallBack$: options.selectedCallBack
        }
        this.init();
    }
    ModelWindow.prototype = {
        init: function () {
            this.creatHtml();
            this.bindEvent();
        },
        getListViewPage:function(index,pageSize){

        },
        creatHtml: function () {
            var me = this
                , windowClass = me.options.windowClass$
                , allBtnClass = me.options.allBtnClass$
                , unAllBtnClass = me.options.unAllBtnClass$
                , downClass = me.options.downClass$
                , downIconImg = me.options.downIconImg$
                , isShowAllBtn = me.options.isShowAllBtn$
                , listViewDataModel = me.options.listViewDataModel$
                , rootEl = me.templet;
            rootEl.children().addClass(windowClass);
            rootEl.find($('.control-btn-box')).children().eq(0).addClass(allBtnClass);
            rootEl.find($('.control-btn-box')).children().eq(1).addClass(unAllBtnClass);
            rootEl.find($('.control-btn-box')).children().eq(0).attr('id', 'MWAllBtn');
            rootEl.find($('.control-btn-box')).children().eq(1).attr('id', 'MWUnAllBtn');

            rootEl.find($('.control-btn-box')).next().addClass(downClass);
            rootEl.find($('.control-btn-box')).next().attr('id', 'MVDownBtn');            
            rootEl.find($('.control-btn-box')).next().children().attr('src', downIconImg);
            rootEl.find($('#groupDevicesView2')).addClass('MVListView');
            // var arr = listViewDataModel.slice(0,me.pageSize);
            var arr = listViewDataModel;
                
            if(isShowAllBtn == false){
                $('#MWAllBtn').css('visibility','hidden');
                $('#MWUnAllBtn').css('visibility','hidden');
            }
            me.element.html(rootEl.html());
            $(".MVListView").html(''); 
            // if(listViewDataModel.length <= 18)
            //     $('#MVDownBtn').addClass('hide'); 
            // else
            //     $('#MVDownBtn').removeClass('hide'); 
            $('#MVDownBtn').addClass('hide'); 
            for(var i=0;i<arr.length;i++){               
                $(".MVListView").smallCard(arr[i], $('#template-list-item')); 
            }
        },
        bindEvent: function () {
            var me = this
                , rootEl = me.templet
                , listViewDataModel = me.options.listViewDataModel$
                , downClass = me.options.downClass$;   
            $('#MWAllBtn').on('click', function () {
                $(".MVListView").children().each(function () {
                    //$(this).children().css('background', '#636D76');
                    $(this).children().addClass('selected');
                });
                if (me.options.selectedCallBack$) {
                    me.options.selectedCallBack$(true); 
                }
            });
            $('#MWUnAllBtn').on('click', function () {
                $(".MVListView").children().each(function () {
                    //$(this).children().css('background', '');
                    $(this).children().removeClass('selected');
                });
                if (me.options.selectedCallBack$) {
                    me.options.selectedCallBack$(false); 
                }
            });
            $('#MVDownBtn').on('mouseover', function () {             
                $(this).children().attr('src', '../img/down1.png');
            });
            $('#MVDownBtn').on('mouseout', function () {
                $(this).children().attr('src', '../img/down2.png');
            });
            $('#MVDownBtn').on('click', function () {
                debugger;                         
                ++ me.pageIndex;   
                var arr = listViewDataModel.slice((me.pageIndex-1)* me.pageSize, me.pageIndex* me.pageSize);
                for(var i=0;i<arr.length;i++){                       
                    $(".MVListView").smallCard(arr[i], $('#template-list-item')); 
                }
                if(me.pageIndex == Math.ceil(listViewDataModel.length/me.pageSize)){
                    $('#MVDownBtn').addClass("hide");
                };
            });
            $('.finish-b').on('click', function () {   
                if (me.options.finishCallBack$) {
                    me.options.finishCallBack$();
                }
            });
            $('.cancel-b').on('click', function () {
                if (me.options.cancelCallBack$) {
                    me.options.cancelCallBack$();
                }
            });
        }
    }

    $.fn.modelWindow = function (options, templet) {
        return new ModelWindow($(this), options, templet);
    } 
})(jQuery, window, document); 