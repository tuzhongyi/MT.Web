(function ($, window, document, undefined) {
    function ModelWindowTabs(element, options, templet) {
        this.element = element;
        this.templet = $.extend(true, {}, templet);
        this.pageIndex = 1;
        this.pageSize = 18;
        //传入形参
        this.options = {
            windowClass$: options.windowClass,
            tablsText$: options.tablsText,
            downClass$: options.downClass,
            downIconImg$: options.downIconImg,
            tabViewData$: options.tabViewData,
            finishCall$: options.finishCall,
            cancelCall$: options.cancelCall,
            selectedTabIndexCall$: options.selectedTabIndexCall
        }

        this.init();
    }
    ModelWindowTabs.prototype = {
        tabs: new Array(),
        init: function () {
            this.creatHtml();
            this.bindEvent();
        },
        creatHtml: function () {
            var me = this
                , windowClass = me.options.windowClass$
                , tablsText = me.options.tablsText$
                , downClass = me.options.downClass$
                , downIconImg = me.options.downIconImg$
                , tabViewData = me.options.tabViewData$
                , rootEl = me.templet;
            rootEl.children().addClass(windowClass);
            var rootUl = $('<div />');

            if (tablsText != null) {
                var ul = $('<ul />', {
                    // class: 'nav nav-pills m-b-30 tabs-ul'
                    class: 'nav customtab nav-tabs'
                }).appendTo(rootUl);
                ul.attr('role', 'tablist');
                for (var a = 0; a < tablsText.length; a++) {
                    var atv = a == 0 ? 'active' : '';
                    var li = $('<li />', {
                        class: atv
                        , style: 'width:100px;text-align:center;'
                    });
                    li.attr('role', 'presentation');
                    li.appendTo(ul);
                    var b = $('<a />', {
                        href: '#navpills-' + (a + 1),
                    });
                    var c = $('<span />', {
                        class: "visible-xs"
                    });
                    $('<i />', {
                        class: "ti-user"
                    }).appendTo(c);
                    c.appendTo(b)
                    $('<span />', {
                        class: "hidden-xs",
                        text: tablsText[a]
                    }).appendTo(b);
                    var dot = $('<div />', {
                        class: 'hide dot'
                    }).appendTo(b);

                    $('<label/>').appendTo(dot);
                    this.tabs.push({
                        text: tablsText[a],
                        dot: dot
                    })
                    b.attr('data-toggle', 'tab');
                    b.attr('role', 'tab');
                    b.attr('tab-index', a);
                    b.attr('aria-controls', 'navpills-' + a);
                    b.attr('aria-expanded', a == 0 ? false : true);
                    b.appendTo(li);
                }
                rootEl.find($('.control-btn-box')).html(rootUl.html());
                rootEl.find($('.control-btn-box')).next().addClass(downClass);
                rootEl.find($('.control-btn-box')).next().attr('id', 'MVDownBtn');
                rootEl.find($('.control-btn-box')).next().children().attr('src', downIconImg);
                rootEl.find($('#groupDevicesView')).addClass('MVListView');
                rootUl = $('<div />');
                var div = $('<div />', {
                    class: 'tab-content br-n pn',
                    style: 'margin-top: 0px;'
                }).appendTo(rootUl);
                for (var a = 1; a <= tablsText.length; a++) {
                    var atv = a == 1 ? 'active' : '';
                    var div2 = $('<div />', {
                        class: 'tab-pane ' + atv,
                        id: 'navpills-' + a
                    }).appendTo(div);
                }
                me.element.html(rootEl.html());

            }

            $(".MVListView").html('');
            $(".MVListView").html(rootUl.html());
            // if (tabViewData != null) {
            //     for (var a = 0; a < tabViewData.length; a++) {
            //         var data = tabViewData[a].slice(0, me.pageSize);
            //         for (var i = 0; i < data.length; i++) {
            //             $("#navpills-" + (a + 1)).smallCard(data[i], $('#template-list-item'));
            //         }
            //     }
            // }
            // if (tabViewData.length <= 18)
            //     $('#MVDownBtn').addClass('hide');
            if (tabViewData != null) {
                for (var a = 0; a < tabViewData.length; a++) {
                    var data = tabViewData[a];
                    for (var i = 0; i < data.length; i++) {
                        $("#navpills-" + (a + 1)).smallCard(data[i], $('#template-list-item'));
                    }
                }
            }
            $('#MVDownBtn').addClass('hide');
        },
        bindEvent: function () {
            var me = this
                , rootEl = me.templet
                , tabViewData = me.options.tabViewData$
                , downClass = me.options.downClass$
                , tabIndex = 0
                , tabContent = new Array();
            for (var a = 0; a < tabViewData.length; a++) {
                tabContent.push({
                    pageIndex: 1
                    , pageSize: 18
                    , dataModels: tabViewData[a]
                })
            }
            $('.tabsControl').on('click', function () {
                tabIndex = parseInt($(this).attr('tab-index'));
                if (me.options.selectedTabIndexCall$) {
                    me.options.selectedTabIndexCall$(tabIndex);
                }
            });


            $('#MVDownBtn').on('mouseover', function () {
                $(this).children().attr('src', '../img/down1.png');
            });
            $('#MVDownBtn').on('mouseout', function () {
                $(this).children().attr('src', '../img/down2.png');
            });
            $('#MVDownBtn').on('click', function () {
                var data = tabContent[tabIndex];
                ++data.pageIndex;
                if (data.pageIndex > data.dataModels.length) return false;
                var arr = data.dataModels.slice((data.pageIndex - 1) * data.pageSize, data.pageIndex * data.pageSize);
                for (var i = 0; i < arr.length; i++) {
                    $("#navpills-" + (tabIndex + 1)).smallCard(arr[i], $('#template-list-item'));
                }
            });
            $('.finish-b').on('click', function () {
                if (me.options.finishCall$) {
                    me.options.finishCall$();
                }
            });

            $('.cancel-b').on('click', function () {
                if (me.options.cancelCall$) {
                    me.options.cancelCall$();
                }
            });

        }
    }

    $.fn.modelWindowTabs = function (options, templet) {
        return new ModelWindowTabs($(this), options, templet);
    }
})(jQuery, window, document); 