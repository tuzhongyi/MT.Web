(function ($, window, document, undefined) {
    //定义分页类
    function Paging(element, options) {
        this.element = element;
        //传入形参
        this.options = {
            pageNo: options.pageNo || 1,
            totalPage: options.totalPage,
            totalSize: options.totalSize,
            callback: options.callback
        };
        //根据形参初始化分页html和css代码
        this.init();
    }
    //对Paging的实例对象添加公共的属性和方法
    Paging.prototype = {
        constructor: Paging,
        init: function () {
            this.creatHtml();
            this.bindEvent();
        },
        creatHtml: function () {
            var me = this;
            var pageDiv = $('<div/>');;
            var current = me.options.pageNo;
            var total = me.options.totalPage;
            var totalNum = me.options.totalSize;
            var content = $('<ul />', {
                class: 'pagination pagination-split m-t-30'
            }).appendTo(pageDiv);;
            var firstLi = $('<li />', {
                class: current == 1 ?'footable-page-arrow disabled text-center':'footable-page-arrow  text-center'
               
            }).appendTo(content);

            var firstA = $('<a />', {
                href: '#first',
                text: '«',
                id: 'firstPage'
            });
            firstA.appendTo(firstLi);
            firstA.attr("data-page", "first");

            var prevLi = $('<li />', {
                class:  current == 1 ?'footable-page-arrow disabled text-center':'footable-page-arrow  text-center'
               
            }).appendTo(content);

            var prevtA = $('<a />', {
                href: '#prev',
                text: '‹',
                id: 'prePage'
            });
            prevtA.appendTo(prevLi);
            prevtA.attr("data-page", "prev");
            //总页数大于6时候
            if (total > 6) {
                //当前页数小于5时显示省略号
                if (current < 5) {
                    for (var i = 1; i < 6; i++) {
                        if (current == i) {
                            var Li = $('<li />', {
                                class: 'footable-page active text-center '
                            }).appendTo(content);

                            var A = $('<a />', {
                                href: '#prev',
                                text: i,
                            });
                            A.appendTo(Li);
                            A.attr("data-page", i);
                        } else {
                            var Li = $('<li />', {
                                class: 'footable-page   text-center'
                            }).appendTo(content);

                            var A = $('<a />', {
                                href: '#prev',
                                text: i,
                            });
                            A.appendTo(Li);
                            A.attr("data-page", i);
                        }
                    }

                    var Li = $('<li />', {
                        class: 'footable-page   text-center',
                        text: '. . .'
                    }).appendTo(content);


                    Li = $('<li />', {
                        class: 'footable-page   text-center'
                    }).appendTo(content);

                    var A = $('<a />', {
                        href: '#prev',
                        text: total,
                    });
                    A.appendTo(Li);
                    A.attr("data-page", total);
                } else {
                    //判断页码在末尾的时候
                    if (current < total - 3) {
                        for (var i = current - 2; i < current + 3; i++) {
                            if (current == i) {
                                var Li = $('<li />', {
                                    class: 'footable-page active text-center '
                                }).appendTo(content);

                                var A = $('<a />', {
                                    href: '#prev',
                                    text: i,
                                });
                                A.appendTo(Li);
                                A.attr("data-page", i);
                            } else {
                                var Li = $('<li />', {
                                    class: 'footable-page   text-center'
                                }).appendTo(content);

                                var A = $('<a />', {
                                    href: '#prev',
                                    text: i,
                                });
                                A.appendTo(Li);
                                A.attr("data-page", i);
                            }
                        }
                        var Li = $('<li />', {
                            class: 'footable-page   text-center',
                            text: '. . .'
                        }).appendTo(content);

                        Li = $('<li />', {
                            class: 'footable-page   text-center'
                        }).appendTo(content);

                        var A = $('<a />', {
                            href: '#prev',
                            text: total,
                        });
                        A.appendTo(Li);
                        A.attr("data-page", total);
                        //页码在中间部分时候	
                    } else {
                        var Li = $('<li />', {
                            class: 'footable-page   text-center'
                        }).appendTo(content);

                        var A = $('<a />', {
                            href: '#prev',
                            text: 1,
                        });
                        A.appendTo(Li);
                        A.attr("data-page", 1);

                        Li = $('<li />', {
                            class: 'footable-page   text-center',
                            text: '. . .'
                        }).appendTo(content);
                        for (var i = total - 4; i < total + 1; i++) {
                            if (current == i) {
                                var Li = $('<li />', {
                                    class: 'footable-page active text-center '
                                }).appendTo(content);

                                var A = $('<a />', {
                                    href: '#prev',
                                    text: i,
                                });
                                A.appendTo(Li);
                                A.attr("data-page", i);
                            } else {
                                var Li = $('<li />', {
                                    class: 'footable-page   text-center'
                                }).appendTo(content);

                                var A = $('<a />', {
                                    href: '#prev',
                                    text: i,
                                });
                                A.appendTo(Li);
                                A.attr("data-page", i);
                            }
                        }
                    }
                }
                //页面总数小于6的时候
            } else {
                for (var i = 1; i < total + 1; i++) {
                    if (current == i) {
                        var Li = $('<li />', {
                            class: 'footable-page active text-center '
                        }).appendTo(content);

                        var A = $('<a />', {
                            href: '#prev',
                            text: i,
                        });
                        A.appendTo(Li);
                        A.attr("data-page", i);
                    } else {
                        var Li = $('<li />', {
                            class: 'footable-page   text-center'
                        }).appendTo(content);

                        var A = $('<a />', {
                            href: '#prev',
                            text: i,
                        });
                        A.appendTo(Li);
                        A.attr("data-page", i);
                    }
                }
            }
            var nextLi = $('<li />', {
                class:  current == total ?'footable-page-arrow text-center disabled' : 'footable-page-arrow text-center'             
            }).appendTo(content);

            var nextA = $('<a />', {
                href: '#next',
                text: '›',
                id: 'nextPage'
            });
            nextA.appendTo(nextLi);
            nextA.attr("data-page", "next");

            var lastLi = $('<li />', {
                class:  current == total ? 'footable-page-arrow text-center disabled':'footable-page-arrow text-center'
            }).appendTo(content);

            var lastA = $('<a />', {
                href: '#last',
                text: '»',
                id: 'lastPage'
            });
            lastA.appendTo(lastLi);
            lastA.attr("data-page", "last");
            me.element.html(pageDiv.html());
        },
        //添加页面操作事件
        bindEvent: function () {
            var me = this;
            me.element.off('click', 'a');
            me.element.on('click', 'a', function () { 
                var num = $(this).html();
               
                var id = $(this).attr("id");
                if (id == "prePage") { 
                    if($(this).parent().hasClass('disabled') == true){
                        return false;
                    }
                    if (me.options.pageNo == 1) {
                        me.options.pageNo = 1;
                    } else {
                        me.options.pageNo = +me.options.pageNo - 1;
                    }
                } else if (id == "nextPage") {
                    if($(this).parent().hasClass('disabled') == true){
                        return false;
                    }
                    if (me.options.pageNo == me.options.totalPage) {
                        me.options.pageNo = me.options.totalPage
                    } else {
                        me.options.pageNo = +me.options.pageNo + 1;
                    }

                } else if (id == "firstPage") {
                    if($(this).parent().hasClass('disabled') == true){
                        return false;
                    }
                    me.options.pageNo = 1;
                } else if (id == "lastPage") {
                    if($(this).parent().hasClass('disabled') == true){
                        return false;
                    }
                    me.options.pageNo = me.options.totalPage;
                } else {
                    me.options.pageNo = +num;
                }
                me.creatHtml();
                if (me.options.callback) {
                    me.options.callback(me.options.pageNo);
                   
                }
            });
        }
    };
    //通过jQuery对象初始化分页对象
    $.fn.paging = function (options) {
        return new Paging($(this), options);
    }
})(jQuery, window, document);