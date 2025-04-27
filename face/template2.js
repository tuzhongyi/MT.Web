/// <reference path="language.js" />
function FlipContainer(element, front_content, back_content, trigger) {
    var _this = this;
    this.Element = element;
    this.Front = this.Element.getElementsByClassName("front")[0];
    this.Back = this.Element.getElementsByClassName("back")[0];

    this.setFront = function (val) {
        this.Front.innerHTML = val;
    }

    this.setBack = function (val) {
        this.Back.innerHTML = val;
        this.Back.style.height = this.Front.offsetHeight + "px";
    }

    this.TriggerEvent = function (trigger, event) {
        trigger.addEventListener("click", function () {
            _this.Element.className += ' edit';
            if (event) event(_this);
        });
    }
    this.BackEvent = function (trigger, event) {
        trigger.addEventListener("click", function () {
            _this.Element.className = _this.Element.className.replace(" edit", "");
            if (event) event(_this);
        });

    }

    if (front_content) this.setFront(front_content);
    if (back_content) this.setBack(back_content);

}

function CardButton(element, className, id, href) {
    /// <signature>
    /// <summary>卡片按钮</summary>
    /// <param name="element" type="Element">父控件</param>
    /// <param name="className" type="String">样式名称</param>
    /// <field name='Element' type='Element'>控件元素</field>
    /// <field name='setClick' type='fun'>单击方法</field>
    /// </signature>
    this.Element = element.getElementsByClassName(className)[0];
    this.Element.elementId = id;
    var _href;
    this.getHref = function () {
        return _href;
    }
    this.setHref = function (val) {
        if (_href == val) return;
        _href = val;
        this.Element.href = _href;
    }
    this.setClick = function (fun) {
        this.Element.addEventListener("click", fun);
    }
    if (href) this.setHref(href);
}

function CardStatus(element, status, title, text, className) {
    var _status, _text, _title, _defaultClassName;
    _defaultClassName = "status ";
    this.Element = document.createElement("span");
    this.Element.setAttribute("data-toggle", "tooltip");
    this.Element.setAttribute("data-placement", "bottom");
    //<span class="label label-cyan">在线</span>
    this.getStatus = function () {
        return _status;
    }
    this.setStatus = function (val) {
        if (_status == val) return;
        _status = val;
    }
    this.getTitle = function () {
        return _title;
    }
    this.setTitle = function (val) {
        if (_title == val) return;
        _title = val;
        this.Element.title = _title;
    }
    this.getText = function () {
        return _text;
    }
    this.setText = function (val) {
        if (_text == val) return;
        _text = val;
        this.Element.innerHTML = _text;
    }

    this.setClassName = function (val) {
        this.Element.className = _defaultClassName + val;
    }


    this.setStatus(status);
    if (title) this.setTitle(title);
    if (text) this.setText(text);
    if (!className)
        className = "label label-cyan"
    this.setClassName(className);


}

function SmallCard(element) {
    /// <signature>
    /// <summary>小卡片</summary>
    /// <param name="element" type="Element">控件元素</param>
    /// <field name="Icon" type="CardIcon">图标</param>
    /// <field name="Text" type="CardText">文字</param>
    /// <field name='DeleteButton' type='CardButton'>删除按钮</field>
    /// <field name='SetButton' type='CardButton'>设置按钮</field>
    /// </signature>


    function SmallCardIcon(element, background, bgclass, icon, title) {
        /// <signature>
        /// <summary>卡片图标</summary>
        /// <param name="element" type="element">父控件</param>
        /// <param name="background" type="String">背景色</param>
        /// <param name="bgclass" type="String">背景色类</param>
        /// <param name="icon" type="String">图标</param>
        /// <param name="title" type="String">提示信息</param>
        /// <field name='Background' type='span'>控件中图标所在背景的span</field>
        /// <field name='Icon' type='i'>控件中的图片控件</field>
        /// <field name='getBackground' type='String'>获取背景色</field>
        /// <field name='setBackground' type='String'>设置背景色</field>
        /// <field name='getSrc' type='String'>获取图片路径</field>
        /// <field name='setSrc' type='String'>设置图片路径</field>
        /// <field name='getTitle' type='String'>获取图片提示信息</field>
        /// <field name='setTitle' type='String'>设置图片提示信息</field>
        /// </signature>
        var _background, _bgclass, _title, _icon;
        var defaultBgClass = "align-self-center round ";

        this.Background = element.getElementsByClassName("round")[0];
        this.Icon = this.Background.getElementsByTagName("i")[0];

        this.getBackground = function () {
            return _background;
        }
        this.setBackground = function (val) {
            if (_background == val) return;
            _background = val;
            this.Background.style.backgroundColor = _background;
        }

        this.getBackgroundClass = function () {
            if (!_bgclass)
                _bgclass = defaultBgClass;
            return _bgclass;

        }
        this.setBackgroundClass = function (val) {
            if (_bgclass == val) return;
            _bgclass = defaultBgClass + val;
            this.Background.className = _bgclass;
        }

        this.getIcon = function () {
            return _icon;
        }
        this.setIcon = function (val) {
            if (_icon == val) return;
            _icon = val;
            this.Icon.className = _icon;
        }

        this.getTitle = function () {
            return _title;
        }
        this.setTitle = function (val) {
            if (_title == val) return;
            _title = val;
            this.Icon.title = _title;
        }



        if (background) this.setBackground(background);
        if (bgclass) this.setBackgroundClass(bgclass);
        if (icon) this.setIcon(icon);
        if (title) this.setTitle(title);

    }
    function SmallCardText(element, text, subtext) {
        /// <signature>
        /// <summary>卡牌文字</summary>
        /// <param name="element" type="Element">父控件</param>
        /// <param name="text" type="String">文字内容</param>
        /// <param name="subtext" type="String">附文字内容</param>
        /// <field name='Element' type='Element'>控件元素</field>
        /// <field name='SubElement' type='Element'>附控件元素</field>
        /// <field name='getText' type='String'>获取文字内容</field>
        /// <field name='setText' type='String'>设置文字内容</field>
        /// <field name='getSubText' type='String'>获取附文字内容</field>
        /// <field name='setSubText' type='String'>设置附文字内容</field>
        /// </signature>
        var _text, _subtext;

        this.Element = element.getElementsByClassName("text")[0];
        this.SubElement = element.getElementsByClassName("subtext")[0];



        this.getText = function () {
            return _text;
        }
        this.setText = function (val) {
            if (_text == val) return;
            _text = val;
            this.Element.title = _text;
            this.Element.innerHTML = val;
        }
        this.getSubText = function () {
            return _subtext;
        }
        this.setSubText = function (val) {
            if (_subtext == val) return;
            _subtext = val;
            this.SubElement.title = _subtext;
            this.SubElement.innerHTML = val;
        }

        if (text) this.setText(text);
        if (subtext) this.setSubText(subtext);
    }


    var _selected, _enabled, _defaultClass, _statuses, _this;
    _selected = false;
    _enabled = true;
    _statuses = element.getElementsByClassName("statuses")[0];
    _this = this;
    this.Element = element.getElementsByClassName("card small")[0];
    _defaultClass = this.Element.className;
    this.Icon = new SmallCardIcon(element, "#000000", "", "", "");
    this.Text = new SmallCardText(element, "", "");
    this.DeleteButton = new CardButton(element, "btn-del", element.id);
    this.SetButton = new CardButton(element, "btn-set", element.id);
    this.getSelected = function () {
        return _selected;
    }
    this.setSelected = function (val) {
        if (_selected == val) return;
        _selected = val;
        this.Element.className = this.Element.className.replace(" ribbon-wrapper", "");
        if (_selected)
            this.Element.className += " ribbon-wrapper";
    }

    this.getEnabled = function () {
        return _enabled;
    }
    this.setClassName = function (val) {
        this.Element.className = _defaultClass + " " + val;
    }
    this.setEnabled = function (val) {
        if (_enabled == val) return;
        _enabled = val;
    }

    element.addEventListener("click", function () {
        if (_this.getEnabled())
            _this.setSelected(!_selected);
    });
    this.Status = new Dictionary();
    this.addStatus = function (status, title, text, className) {
        if (this.Status[status]) {
            var ex = new EventException();
            ex.name = "status was existed";
            ex.code = 0;
            ex.message = "status was existed";
            throw ex;
        }
        var card = new CardStatus(_statuses, status, title, text, className);
        this.Status[status] = card;
        _statuses.appendChild(card.Element);
    }
    this.setStatus = function (status, action) {
        this.Status[status].Element.style.display = action ? "" : "none";
    }
}

function InfoCard(element) {

    this.Element = element.getElementsByClassName("card info")[0];
    var _selected = false,
        _enabled = true,
        _defaultClass = this.Element.className,
        _statuses = element.getElementsByClassName("statuses")[0],
        _this = this;




    function LeftElement(element, text, subs) {
        this.Element = element.getElementsByClassName("left")[0];
        this.MainText = element.getElementsByClassName("text")[0];

        var _mainText, _infos;

        this.getMainText = function () {
            return _mainText;
        }
        this.setMainText = function (val) {
            if (_mainText == val) return;
            _mainText = val;
            this.MainText.innerHTML = _mainText;
        }
        this.getInfos = function () {
            return _infos;
        }
        this.setInfos = function (vals) {
            var elements = this.Element.getElementsByClassName("subtext");
            for (var i = 0; i < elements.length; i++) {
                this.Element.removeChild(elements[i]);
            }

            if (vals) {
                for (var i = 0, index = 0; i < vals.length; i++) {
                    if (is.Array(vals[i])) {
                        var group = document.createElement("div");
                        group.className = "card-group";
                        for (var j = 0; j < vals[i].length; j++) {

                            var h = document.createElement("h6");

                            h.className = "text-muted subtext col-sm-6 p-l-0 p-r-0 text-nowrap ";
                            h.className += index++;
                            if (j % 2 == 0) h.className += " b-r ";
                            h.innerHTML = vals[i][j];
                            group.appendChild(h);
                        }

                        this.Element.appendChild(group);
                        continue;
                    }
                    var h6 = document.createElement("h6");

                    h6.className = "text-muted subtext ";
                    h6.className += index++;
                    h6.innerHTML = vals[i];
                    this.Element.appendChild(h6);
                }
            }
        }
        this.getInfo = function (index) {
            var info = this.Element.getElementsByClassName(index)[0];
            return info.innerHTML;
        }
        this.setInfo = function (index, val) {
            var info = this.Element.getElementsByClassName(index)[0];
            info.innerHTML = val;
        }


        this.setMainText(text);
        this.setInfos(subs);

    }

    function RightElement(element, content) {
        this.Element = element.getElementsByClassName("right")[0];

        var _content = content;

        this.getContent = function () {
            return _content;
        }
        this.setContent = function (val) {
            if (_content == val) return;
            _content = val;
            this.Element.innerHTML = _content;
        }
    }

    this.Left = new LeftElement(this.Element, "无");
    this.Right = new RightElement(this.Element, null);
    this.DeleteButton = new CardButton(element, "btn-del", element.id);
    this.SetButton = new CardButton(element, "btn-set", element.id);


    this.getSelected = function () {
        return _selected;
    }
    this.setSelected = function (val) {
        if (_selected == val) return;
        _selected = val;
        this.Element.className = _defaultClass;
        if (_selected)
            this.Element.className += " ribbon-wrapper";
    }
    this.getEnabled = function () {
        return _enabled;
    }
    this.setEnabled = function (val) {
        if (_enabled == val) return;
        _enabled = val;
    }


    element.addEventListener("click", function () {
        if (_this.getEnabled())
            _this.setSelected(!_selected);
    });



    this.Status = new Dictionary();
    this.addStatus = function (status, title, text, className) {
        if (this.Status[status]) {
            var ex = new EventException();
            ex.name = "status was existed";
            ex.code = 0;
            ex.message = "status was existed";
            throw ex;
        }
        var card = new CardStatus(_statuses, status, title, text, className);
        this.Status[status] = card;
        _statuses.appendChild(card.Element);
    }
    this.setStatus = function (status, action) {
        this.Status[status].Element.style.display = action ? "" : "none";
    }
}

function BindingCard(element) {
    function ChildElement(element, classname, content) {
        this.Element = element.getElementsByClassName(classname)[0];
        this.setContent = function (content) {
            this.Element.innerHTML = content;
            this.BindingChangedEvent(content);
        }
        if (content)
            this.setContent(content);

        this.BindingChangedEvent = function (content) { }
    }

    function IconElement(element, classname) {
        var _defaultClassname;
        this.Element = element.getElementsByClassName("icon")[0];
        _defaultClassname = this.Element.className;
        this.setIconByClassname = function (classname) {
            this.Element.className = _defaultClassname + " " + classname;
        }
        if (!classname) classname = "mdi mdi-shuffle-variant";
        this.setIconByClassname(classname);
    }

    this.Left = new ChildElement(element, "left");
    this.Right = new ChildElement(element, "right");
    this.Icon = new IconElement(element);
}
function ThreeBindingCard(element) {
    function ChildElement(element, classname, content) {
        this.Element = element.getElementsByClassName(classname)[0];
        this.setContent = function (content) {
            this.Element.innerHTML = content;
            this.BindingChangedEvent(content);
        }
        if (content)
            this.setContent(content);

        this.BindingChangedEvent = function (content) { }
    }

    function IconElement(element, classname) {

        this.Elements = element.getElementsByClassName("icon");

        var _defaultClassname = this.Elements[0].className;

        this.setIconByClassname = function (classname) {
            for (var i = 0; i < this.Elements.length; i++) {
                this.Elements[i].className = _defaultClassname + " " + classname;
            }
        }
        if (!classname) classname = "mdi mdi-shuffle-variant";
        this.setIconByClassname(classname);
    }

    this.First = new ChildElement(element, "first");
    this.Second = new ChildElement(element, "second");
    this.Third = new ChildElement(element, "third");
    this.Icon = new IconElement(element);
}




function DateTimeCard(element, date) {

    this.Element = element;


    function ValueElement(element, classname, callback) {
        this.Element = element.getElementsByClassName(classname)[0];

        var _value, _callback;
        _callback = callback;
        this.get = function () {
            return _value;
        }
        this.set = function (value) {
            if (_value == value) return;
            _value = value;
            this.Element.innerHTML = _value;
            if (_callback) _callback(_value);
        }
    }
    function DayOfWeekElement(element, callback) {
        this.Element = element.getElementsByClassName("week")[0];

        var _value, _callback;
        _callback = callback;

        if (!window.chinese)
            window.chinese = {
                sunday: "星期日",
                monday: "星期一",
                tuesday: "星期二",
                wednesday: "星期三",
                thursday: "星期四",
                friday: "星期五",
                saturday: "星期六"
            }


        var weeks = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

        this.get = function () {
            return _value;
        }
        this.set = function (value) {
            if (_value == value) return;
            _value = value;
            this.Element.innerHTML = chinese[weeks[_value]];
            if (_callback) _callback(_value);
        }
    }


    function TimeElement(element) {
        this.Element = element.getElementsByClassName("time")[0];
        var _this = this;
        var _value = new Date();
        this.Hour = new ValueElement(this.Element, "hour", function (hour) {
            var date = _this.get();
            date.setHours(hour);
            _this.set(date);
        });
        this.Minute = new ValueElement(this.Element, "minute", function (minute) {
            var date = _this.get();
            date.setMinutes(minute);
            _this.set(date);
        });
        this.Second = new ValueElement(this.Element, "second", function (second) {
            var date = _this.get();
            date.setSeconds(second);
            _this.set(date);
        });

        this.get = function () {
            return _value;
        }
        this.set = function (value) {
            if (_value == value) return;
            _value = value;
            this.Hour.set(_value.format('HH'));
            this.Minute.set(_value.format('mm'));
            this.Second.set(_value.format('ss'));
        }
    }

    function DateElement(element, date) {
        this.Element = element.getElementsByClassName("date")[0];
        var _this = this;
        var _value = new Date();

        this.Year = new ValueElement(this.Element, "year", function (year) {
            var date = _this.get();
            date.setYear(year);
            _this.set(date);
        })
        this.Month = new ValueElement(this.Element, "month", function (month) {
            var date = _this.get();
            date.setLocationMonth(month);
            _this.set(date);
        })
        this.Day = new ValueElement(this.Element, "day", function (day) {
            var date = _this.get();
            date.setDate(day);
            _this.set(date);
        })
        this.DayOfWeek = new DayOfWeekElement(this.Element, function (day) {
            var date = _this.get();
            date.setDate(day);
            _this.set(date);
        })

        this.get = function () {
            return _value;
        }
        this.set = function (value) {
            if (_value == value) return;
            _value = value;
            this.Year.set(_value.format('yyyy'));
            this.Month.set(_value.format('MM'));
            this.Day.set(_value.format('dd'));
            this.DayOfWeek.set(_value.getDay());
        }
    }
    var _value;

    this.Time = new TimeElement(this.Element);
    this.Date = new DateElement(this.Element);

    this.get = function () {
        return _value;
    }
    this.set = function (value) {
        this.Time.set(value);
        this.Date.set(value);
    }

    if (date) this.set(date);
}



Date.prototype.getLocationMonth = function () {
    return this.getMonth() + 1;
}
Date.prototype.setLocationMonth = function (month) {
    return this.setMonth(month - 1) + 1;
}

function PictureCard(element) {
    /// <signature>
    /// <summary>照片卡片</summary>
    /// <param name="element" type="Element">控件元素</param>
    /// <field name="Img" type="PictureCardImg">图片</param>
    /// <field name="Text" type="PictureCardText">文字</param>
    /// <field name="Data" type="PictureCardData">文字</param>
    /// <field name='DeleteButton' type='CardButton'>删除按钮</field>
    /// <field name='SetButton' type='CardButton'>设置按钮</field>
    /// </signature>


    function PictureCardImg(element, src) {
        /// <signature>
        /// <summary>卡片图标</summary>
        /// <param name="element" type="element">父控件</param>
        /// <param name="src" type="String">图片路径</param>
        /// <field name='Img' type='String'>控件中图片所在背景的img</field>
        /// <field name='getSrc' type='String'>获取图片路径</field>
        /// <field name='setSrc' type='String'>设置图片路径</field>
        /// </signature>
        var _src;
        this.Img = element.getElementsByTagName("img")[0];
        this.getSrc = function () {
            return _src;
        }
        this.setSrc = function (val) {
            if (_src == val) return;
            _src = val;
            this.Img.src = val;
        }

        if (src) this.setSrc(src);
    }

    function PictureCardText(element, text) {
        /// <signature>
        /// <summary>卡牌文字</summary>
        /// <param name="element" type="Element">父控件</param>
        /// <param name="text" type="String">文字内容</param>
        /// <field name='Element' type='Element'>控件元素</field>
        /// <field name='getText' type='String'>获取文字内容</field>
        /// <field name='setText' type='String'>设置文字内容</field>
        /// </signature>
        var _text;

        this.Element = element.getElementsByClassName("text")[0];

        this.getText = function () {
            return _text;
        }
        this.setText = function (val) {
            if (_text == val) return;
            _text = val;
            this.Element.title = _text;
            this.Element.innerHTML = val;
        }

        if (text) this.setText(text);
    }

    function PictureCardData(element, data) {
        /// <signature>
        /// <summary>卡牌数据</summary>
        /// <param name="element" type="Element">父控件</param>
        /// <param name="data" type="Object[]">文字集合</param>
        /// <param name="KeyElements" type="Element[]">父控件</param>
        /// <param name="ValueElements" type="Element[]">父控件</param>
        /// <field name='getData' type='String'>获取文字内容</field>
        /// <field name='setData' type='String'>设置文字内容</field>
        /// </signature>
        var _data;

        this.KeyElements = element.getElementsByClassName("data-key")[0].getElementsByClassName("subtext");
        this.ValueElements = element.getElementsByClassName("data-value")[0].getElementsByClassName("subtext");

        this.getData = function () {
            return _data;
        }
        this.setData = function (val) {
            _data = val;
            for (var i = 0; i < _data.length; i++) {
                this.KeyElements[i].title = _data[i].key;
                this.KeyElements[i].innerHTML = _data[i].key;
                this.ValueElements[i].title = _data[i].value;
                this.ValueElements[i].innerHTML = _data[i].value;
            }
        }

        if (data) this.setData(data);
    }

    var _selected, _enabled, _defaultClass, _statuses, _this;
    _selected = false;
    _enabled = true;
    _statuses = element.getElementsByClassName("statuses")[0];
    _this = this;
    this.Element = element.getElementsByClassName("card picture")[0];
    _defaultClass = this.Element.className;
    this.Img = new PictureCardImg(element, "");
    this.Text = new PictureCardText(element, "");
    this.Data = new PictureCardData(element, null);
    this.DeleteButton = new CardButton(element, "btn-del", element.id);
    this.SetButton = new CardButton(element, "btn-set", element.id);
    this.getSelected = function () {
        return _selected;
    }
    this.setSelected = function (val) {
        if (_selected == val) return;
        _selected = val;
        this.Element.className = this.Element.className.replace(" ribbon-wrapper", "");
        if (_selected)
            this.Element.className += " ribbon-wrapper";
    }

    this.getEnabled = function () {
        return _enabled;
    }
    this.setClassName = function (val) {
        this.Element.className = _defaultClass + " " + val;
    }
    this.setEnabled = function (val) {
        if (_enabled == val) return;
        _enabled = val;
    }

    element.addEventListener("click", function () {
        if (_this.getEnabled())
            _this.setSelected(!_selected);
    });
    this.Status = new Dictionary();
    this.addStatus = function (status, title, text, className) {
        if (this.Status[status]) {
            var ex = new EventException();
            ex.name = "status was existed";
            ex.code = 0;
            ex.message = "status was existed";
            throw ex;
        }
        var card = new CardStatus(_statuses, status, title, text, className);
        this.Status[status] = card;
        _statuses.appendChild(card.Element);
    }
    this.setStatus = function (status, action) {
        this.Status[status].Element.style.display = action ? "" : "none";
    }
}

var Templates = {
    getSmallCard: function () {
        return document.getElementById("template").getElementsByClassName("card small")[0];
    },
    getInfoCard: function () {
        return document.getElementById("template").getElementsByClassName("card info")[0];
    },
    getFlipContainer: function () {
        return document.getElementById("template").getElementsByClassName("flip-container")[0];
    },
    getBindingCard: function () {
        return document.getElementById("template").getElementsByClassName("card binding")[0];
    },
    getThreeBindingCard: function () {
        return document.getElementById("template").getElementsByClassName("card binding-three")[0];
    },
    getDateTimeCard: function () {
        return document.getElementById("template").getElementsByClassName("card datetime")[0];
    }
}


// function PictureContrastCard(element) {
//     /// <signature>
//     /// <summary>照片卡片</summary>
//     /// <param name="element" type="Element">控件元素</param>
//     /// <field name="Img" type="PictureCardImg">图片</param>
//     /// <field name="Text" type="PictureCardText">文字</param>
//     /// <field name="Data" type="PictureCardData">文字</param>
//     /// <field name='DeleteButton' type='CardButton'>删除按钮</field>
//     /// <field name='SetButton' type='CardButton'>设置按钮</field>
//     /// </signature>


//     function PictureCardImg(element, src, css) {
//         /// <signature>
//         /// <summary>卡片图标</summary>
//         /// <param name="element" type="element">父控件</param>
//         /// <param name="src" type="String">图片路径</param>
//         /// <field name='Img' type='String'>控件中图片所在背景的img</field>
//         /// <field name='getSrc' type='String'>获取图片路径</field>
//         /// <field name='setSrc' type='String'>设置图片路径</field>
//         /// </signature>
//         var _src;
//         this.Img = element.getElementsByTagName("img")[0];
//         this.getSrc = function () {
//             return _src;
//         }
//         this.setSrc = function (val) {
//             if (_src == val) return;
//             _src = val;
//             this.Img.src = val;
//         }

//         if (src) this.setSrc(src);
//     }

//     function PictureCardText(element, text) {
//         /// <signature>
//         /// <summary>卡牌文字</summary>
//         /// <param name="element" type="Element">父控件</param>
//         /// <param name="text" type="String">文字内容</param>
//         /// <field name='Element' type='Element'>控件元素</field>
//         /// <field name='getText' type='String'>获取文字内容</field>
//         /// <field name='setText' type='String'>设置文字内容</field>
//         /// </signature>
//         var _text;

//         this.Element = element.getElementsByClassName("text")[0];

//         this.getText = function () {
//             return _text;
//         }
//         this.setText = function (val) {
//             if (_text == val) return;
//             _text = val;
//             this.Element.title = _text;
//             this.Element.innerHTML = val;
//         }

//         if (text) this.setText(text);
//     }

//     function PictureCardData(element, data) {
//         /// <signature>
//         /// <summary>卡牌数据</summary>
//         /// <param name="element" type="Element">父控件</param>
//         /// <param name="data" type="Object[]">文字集合</param>
//         /// <param name="KeyElements" type="Element[]">父控件</param>
//         /// <param name="ValueElements" type="Element[]">父控件</param>
//         /// <field name='getData' type='String'>获取文字内容</field>
//         /// <field name='setData' type='String'>设置文字内容</field>
//         /// </signature>
//         var _data;

//         this.KeyElements = element.getElementsByClassName("data-key")[0].getElementsByClassName("subtext");
//         this.ValueElements = element.getElementsByClassName("data-value")[0].getElementsByClassName("subtext");

//         this.getData = function () {
//             return _data;
//         }
//         this.setData = function (val) {
//             _data = val;
//             for (var i = 0; i < _data.length; i++) {
//                 this.KeyElements[i].title = _data[i].key;
//                 this.KeyElements[i].innerHTML = _data[i].key;
//                 this.ValueElements[i].title = _data[i].value;
//                 this.ValueElements[i].innerHTML = _data[i].value;
//             }
//         }

//         if (data) this.setData(data);
//     }

//     var _selected, _enabled, _defaultClass, _statuses, _this;
//     _selected = false;
//     _enabled = true;
//     _statuses = element.getElementsByClassName("statuses")[0];
//     _this = this;
//     this.Element = element.getElementsByClassName("card picture")[0];
//     _defaultClass = this.Element.className;
//     this.Img = new PictureCardImg(element, "");
//     this.Text = new PictureCardText(element, "");
//     this.Data = new PictureCardData(element, null);
//     this.DeleteButton = new CardButton(element, "btn-del", element.id);
//     this.SetButton = new CardButton(element, "btn-set", element.id);
//     this.getSelected = function () {
//         return _selected;
//     }
//     this.setSelected = function (val) {
//         if (_selected == val) return;
//         _selected = val;
//         this.Element.className = this.Element.className.replace(" ribbon-wrapper", "");
//         if (_selected)
//             this.Element.className += " ribbon-wrapper";
//     }

//     this.getEnabled = function () {
//         return _enabled;
//     }
//     this.setClassName = function (val) {
//         this.Element.className = _defaultClass + " " + val;
//     }
//     this.setEnabled = function (val) {
//         if (_enabled == val) return;
//         _enabled = val;
//     }

//     element.addEventListener("click", function () {
//         if (_this.getEnabled())
//             _this.setSelected(!_selected);
//     });
//     this.Status = new Dictionary();
//     this.addStatus = function (status, title, text, className) {
//         if (this.Status[status]) {
//             var ex = new EventException();
//             ex.name = "status was existed";
//             ex.code = 0;
//             ex.message = "status was existed";
//             throw ex;
//         }
//         var card = new CardStatus(_statuses, status, title, text, className);
//         this.Status[status] = card;
//         _statuses.appendChild(card.Element);
//     }
//     this.setStatus = function (status, action) {
//         this.Status[status].Element.style.display = action ? "" : "none";
//     }
// }
