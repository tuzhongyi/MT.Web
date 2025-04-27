/// <reference path="../js/jquery/jquery-3.6.0.min.js" />
/// <reference path="../js/howell.js/guid.js" />


var MapPointAngleEvent = {
  onmousedown: null,
  onmousseover: null,
  onmouseup: null
};

var MapZoomLevel = 0;
var transforms = ["transform", "-ms-transform", "-moz-transform", "-webkit-transform", "-o-transform"];

function MapControl (control) {
  //是否开始绘画
  var isDrag = false;

  var _this = this;
  //是否可编辑（是否能布点）
  this.CanEdit = false;
  var nn6 = document.getElementById && !document.all;
  //地图图片
  var _img;
  //
  var offsetX = 0;
  var offsetY = 0;
  var points = new PointList();



  this.CanDrag = true;
  this.Point = function () { return points; };
  this.getImage = function () { return _img; };
  //设置坐标
  this.SetCoordinate = function (x, y) {
    map.style.top = -y + 327;
    map.style.left = -x + 400;
  }

  var creater = {
    parent: this,
    Map: function () {
      var map = document.createElement("div");
      map.className = "dragAble";
      return map;
    },
    Zoom: function () {
      var zoom = {
        level: 0,
        up: function (up) {
          up.className = "control up";
          up.title = "向上"
          up.onclick = function () {
            map.style.top = (parseInt(map.style.top) + 100) + "px";
          }
        },
        down: function (down) {
          down.className = "control down";
          down.title = "向下"
          down.onclick = function () {
            map.style.top = (parseInt(map.style.top) - 100) + "px";
          }
        },
        left: function (left) {
          left.className = "control left";
          left.onclick = function () {
            map.style.left = (parseInt(map.style.left) + 100) + "px";
          }
          left.title = "向左"
        },
        right: function (right) {
          right.className = "control right";
          right.onclick = function () {
            map.style.left = (parseInt(map.style.left) - 100) + "px";
          }
          right.title = "向右"
        },
        "in": function (_in) {
          _in.className = "control in";
          _in.onclick = function () {
            //var centerX = map.offsetLeft - offsetX + _img.width / 2;
            //var centerY = map.offsetTop - offsetY + _img.height / 2

            //_img.height *= 1.2;
            //_img.width *= 1.2;

            //map.style.top = centerY - _img.height / 2 + "px";
            //map.style.left = centerX - _img.width / 2 + "px";

            //points.reload(map, _img.width, _img.height);
            //MapZoomLevel++;

            var oldWidth = _img.width;
            var oldHeigth = _img.height;

            _img.height = Math.round(_img.height * 1.2);
            _img.width = Math.round(_img.width * 1.2);

            var newWidth = _img.width;
            var newHeigth = _img.height;

            var centerX = Math.round(newWidth - oldWidth) / 2;
            var centerY = Math.round(newHeigth - oldHeigth) / 2;

            map.style.top = parseInt(map.style.top) - centerY + "px";
            map.style.left = parseInt(map.style.left) - centerX + "px";

            points.reload(map, _img.width, _img.height);
            MapZoomLevel++;
          }
          _in.title = "放大";

        },
        out: function (out) {
          out.className = "control out";
          out.onclick = function () {
            //var centerX = map.offsetLeft - offsetX + _img.width / 2;
            //var centerY = map.offsetTop - offsetY + _img.height / 2

            //_img.height /= 1.2;
            //_img.width /= 1.2;

            //map.style.top = centerY - _img.height / 2 + "px";
            //map.style.left = centerX - _img.width / 2 + "px";

            //points.reload(map, _img.width, _img.height);

            //MapZoomLevel--;

            var oldWidth = _img.width;
            var oldHeigth = _img.height;

            _img.height = Math.round(_img.height / 1.2);
            _img.width = Math.round(_img.width / 1.2);

            var newWidth = _img.width;
            var newHeigth = _img.height;

            var centerX = Math.round(oldWidth - newWidth) / 2;
            var centerY = Math.round(oldHeigth - newHeigth) / 2;

            map.style.top = parseInt(map.style.top) + centerY + "px";
            map.style.left = parseInt(map.style.left) + centerX + "px";

            points.reload(map, _img.width, _img.height);

            MapZoomLevel--;
          }
          out.title = "缩小";
        },
        restore: function (restore) {
          restore.className = "control restore";
          restore.title = "还原";
          restore.onclick = function () {
            _img.width = _img.oldWidth;
            _img.height = _img.oldHeight;



            map.style.top = Math.round((map.parentElement.offsetHeight - _img.height) / 2) + "px";
            map.style.left = Math.round((map.parentElement.offsetWidth - _img.width) / 2) + "px";

            points.reload(map, _img.width, _img.height);
          }
        }
      }


      var table = document.createElement("table");
      table.border = "0";
      table.cellSpacing = "2";
      table.cellPadding = "0";
      table.className = "zoom";

      for (var i = 0; i < 5; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
          var td = document.createElement("td");
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      try {
        if (table.rows.length > 0) {
          zoom.up(table.rows[0].cells[1]);
          zoom.left(table.rows[1].cells[0]);
          zoom.right(table.rows[1].cells[2]);
          zoom.down(table.rows[2].cells[1]);
          zoom.restore(table.rows[1].cells[1]);
          zoom["in"](table.rows[3].cells[1]);
          zoom.out(table.rows[4].cells[1]);
        }
        else {
          zoom.up(table.childNodes[0].childNodes[1]);
          zoom.left(table.childNodes[1].childNodes[0]);
          zoom.right(table.childNodes[1].childNodes[2]);
          zoom.down(table.childNodes[2].childNodes[1]);
          zoom.restore(table.childNodes[1].childNodes[1]);
          zoom["in"](table.childNodes[3].childNodes[1]);
          zoom.out(table.childNodes[4].childNodes[1]);
        }
      }
      catch (ex) { }
      finally {
        return table;
      }

    }
  };


  var map = creater.Map();
  var zoom = creater.Zoom();

  function getRealLeft (element) {
    if (element.offsetLeft > 0)
      return element.offsetLeft;
    return getRealLeft(element.parentElement);
  }
  function getRealTop (element) {
    if (element.offsetTop > 0)
      return element.offsetTop;
    return getRealTop(element.parentElement);
  }


  map.ondblclick = function (e) {
    if (!_this.CanEdit) return;
    var evt = e ? e : window.event;

    var evtX = 0; //evt.x;
    var evtY = 0;// evt.y;

    if (!evtX && evt.clientX)
      evtX = evt.clientX;
    if (!evtY && evt.clientY)
      evtY = evt.clientY;

    var x = (evtX - getRealLeft(this.parentElement) - this.offsetLeft - 7);
    var y = (evtY - getRealTop(this.parentElement) - this.offsetTop - 140 + document.body.scrollTop);

    var point = new Point(Guid.NewGuid().ToString(), x, y, _img.width, _img.height);

    var html = point.toHtml();
    this.appendChild(html);

    html.click();

    points.List[point.Id] = point;

  }

  control.onmousewheel = function (e) {
    var evt = e ? e : window.event;
    if (evt.wheelDelta > 0 || evt.detail < 0) {
      $(".control.in")[0].onclick();
    }
    else if (evt.wheelDelta < 0 || evt.detail > 0) {
      $(".control.out")[0].onclick();
    }
  }

  if (/Firefox/i.test(navigator.userAgent)) {
    control.addEventListener("DOMMouseScroll", control.onmousewheel, false);
  }

  control.appendChild(map);
  control.appendChild(zoom);




  control.onmousedown = function (e) {
    var evt = e ? e : window.event;
    var oDragHandle = nn6 ? evt.target : event.srcElement;
    var topElement = "HTML";
    while (oDragHandle.tagName != topElement && oDragHandle.className != "dragAble") {
      oDragHandle = nn6 ? oDragHandle.parentNode : oDragHandle.parentElement;
    }
    if (oDragHandle.className == "dragAble") {
      isDrag = true;
      oDragObj = oDragHandle;
      nTY = parseInt(oDragObj.style.top + 0);
      y = nn6 ? evt.clientY : event.clientY;
      nTX = parseInt(oDragObj.style.left + 0);
      x = nn6 ? evt.clientX : event.clientX;

      if (MapPointAngleEvent.onmousedown)
        MapPointAngleEvent.onmousedown();

      document.onmousemove = function (e) {
        var evt = e ? e : window.event;
        if (isDrag && _this.CanDrag) {
          oDragObj.style.top = (nn6 ? nTY + evt.clientY - y : nTY + event.clientY - y) + "px";
          oDragObj.style.left = (nn6 ? nTX + evt.clientX - x : nTX + event.clientX - x) + "px";
          return false;
        }
        if (isDrag && (!_this.CanDrag)) {
          var ps = $(".point.camera.selected")

          if (ps.length == 0)
            return;
          var point = ps[0];
          var angle = points.List[point.id].RotateChangeEvent(evt, point, nTX, nTY);



          for (var index in transforms) {
            try {
              $(".point.selected .img").css(transforms[index], "rotate(" + angle + "deg)")
            } catch (e) { }
          }
          if (MapPointAngleEvent.onmousseover)
            MapPointAngleEvent.onmousseover(angle);
        }

      }
      return false;
    }
  };
  document.onmouseup = function () {
    isDrag = false;
    if (MapPointAngleEvent.onmouseup)
      MapPointAngleEvent.onmouseup();
  }

  this.Load = {
    parent: this,
    Image: function (img) {
      _img = img;
      map.innerHTML = "";

      //Math.max(_img.width, _img.height);
      if (_img.height > _img.width)
        this.height = map.parentElement.offsetHeight;
      else
        _img.width = map.parentElement.offsetWidth
      //this.height = map.parentElement.offsetHeight;
      //this.width = map.parentElement.offsetWidth;
      map.appendChild(_img);

      _img.onload = function () {

        map.style.top = (map.parentElement.offsetHeight - this.height) / 2 + "px";
        map.style.left = (map.parentElement.offsetWidth - this.width) / 2 + "px";

        offsetX = map.offsetLeft;
        offsetY = map.offsetTop;


        _img.oldHeight = img.height;
        _img.oldWidth = img.width;
      }
      return _img;
    },
    Point: function () {
      this.parent.Point().reload(map);
    }
  }
};

var AlarmStatus = {
  Alarm: "alarm",
  DisAlarm: "disalarm"
};

function Point (id, x, y, width, height, key, text) {
  /// <signature>
  /// <summary>地图点位</summary>
  /// <field name='Id' type='String'>地图子项唯一标识符 N</field>
  /// <field name='Binding' type='MapItemType'>绑定ID</field>
  /// <field name='Percentage' type='String'>坐标百分比</field>
  /// <field name='X'>X</field>
  /// <field name='Y'>Y</field>
  /// <field name='toHtml' type='Double'>顺时针旋转角度[0-360],默认：0 Y</field>
  /// </signature>



  this.Status = AlarmStatus.DisAlarm;

  var _x = x, _y = y, _width, _height

  this.Id = id;
  this.Binding = key;
  this.Text = text;
  this.Type = "";
  this.Angle = 0.0;
  this.Percentage = {
    X: function () { return _x },
    Y: function () { return _y }
  }

  this.X = {
    get: function (width) {
      if (!width)
        return _x * _width;
      return _x * width;
    },
    set: function (value, width) {
      _width = width;
      _x = value / width;
    }
  }
  this.Y = {
    get: function (height) {
      if (!height)
        return _y * _height;
      return _y * height;
    },
    set: function (value, height) {
      _height = height;
      _y = value / height;
    }
  }

  {
    _width = width;
    _height = height;
    if (_x) this.X.set(_x, _width);
    if (_y) this.Y.set(_y, _height);
  }

  this.toHtml = function () {
    var point = document.createElement("div");

    var img = document.createElement("div");

    point.className = "point";

    img.className = "img";

    switch (this.Type) {
      case "Camera":
        img.className += " camera";
        break;
      case "Annunciator":
        img.className += " annunciator";
        //img.className += " " + this.Status;
        break;
      default:
        break;
    }
    point.appendChild(img);
    point.style.top = this.Y.get() + "px";
    point.style.left = this.X.get() + "px";
    point.id = this.Id;

    if (this.Angle != 0) {
      $img = $(img);
      for (var index in transforms) {
        try {
          $img.css(transforms[index], "rotate(" + this.Angle + "deg)");
        } catch (e) { }
      }
    }


    point.onclick = function () {
      $(".point.selected").removeClass("selected");
      this.className += " selected";
    }
    point.ondblclick = function () {
      if (PointDoubleClickEvent)
        PointDoubleClickEvent(this);
    }
    return point;
  }

  this.DoubleClick = null;

  this.getSelected = function () {
    var point = $(".point.selected")[0];
    if (point) {
      return this.value[point.id];
    }
    return null;
  }

  this.bind = function (key, text, control, type) {
    this.Binding = key;
    this.Text = text;
    if (type)
      this.Type = type;
    if (control) {

      if (this.Type)
        control.className += " " + this.Type.toLowerCase();
      var lbl = document.createElement("label");
      lbl.innerText = text;
      var lbls = control.getElementsByTagName("label");
      if (lbls.length > 0)
        control.removeChild(lbls[0]);
      control.appendChild(lbl);
      var left = -(lbl.offsetWidth / 2 - control.offsetWidth / 2);
      lbl.style.marginLeft = left + "px";

    }
  }

  this.insertMap = function (map) {
    var point = this.toHtml();
    map.appendChild(point);
    if (this.Binding)
      this.bind(this.Binding, this.Text, point);
  }
  this.zoomChange = function (width, height) {
    if (width)
      _width = width;;
    if (height)
      _height = height;
  }
  this.RotateChangeEvent = function (e, control, x, y) {
    var evt = e ? e : window.event;
    var cx = 22.5;
    var cy = 22.5;
    var containerOffset = $(control).offset();
    var offsetX = containerOffset['left'];
    var offsetY = containerOffset['top'];


    var mouseX = evt.clientX - offsetX;//计算出鼠标相对于画布顶点的位置,无pageX时用clientY + body.scrollTop - body.clientTop代替,可视区域y+body滚动条所走的距离-body的border-top,不用offsetX等属性的原因在于，鼠标会移出画布
    var mouseY = evt.clientY - offsetY;

    var ox = mouseX - cx;//cx,cy为圆心
    var oy = mouseY - cy;
    var to = Math.abs(ox / oy);
    var angle = Math.atan(to) / (2 * Math.PI) * 360;//鼠标相对于旋转中心的角度
    if (ox < 0 && oy < 0)//相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系
    {
      angle = -angle;
    } else if (ox < 0 && oy > 0)//左下角,3象限
    {
      angle = -(180 - angle)
    } else if (ox > 0 && oy < 0)//右上角，1象限
    {
      angle = angle;
    } else if (ox > 0 && oy > 0)//右下角，2象限
    {
      angle = 180 - angle;
    }
    return angle - this.Angle;
  }

}
var PointDoubleClickEvent = null;

var index = 0;
var has = -1;
var array = ["disalarm", "alarm"]

function cutImg () {

  var i = 0;
  for (var id in dic) {
    i++;
    var point = document.getElementById(id);
    if (point) {
      point.childNodes[0].className = dic[id] + " " + array[index];
    }
  }
  index = (index + 1) % 2;
}

var dic = new Object();

Point.changeAlarmStatus = function (point, state) {
  switch (state) {
    case AlarmStatus.Alarm:
      if (has < 0) {
        has = setInterval("cutImg()", 500);
      }
      dic[point.id] = point.childNodes[0].className;
      break;
    case AlarmStatus.DisAlarm:

      setTimeout(function () {
        if (dic[point.id]) {
          point.childNodes[0].className = dic[point.id];
          delete dic[point.id];
        }
      }, 500);
      break;
  }


}

function PointList () {
  this.List = new Dictionary();
  this.hide = function () {
    var points = $(".point");
    var result = new Array();
    for (var i = 0; i < points.length; i++) {
      result.push(points[i].id);
      points[i].parentNode.removeChild(points[i]);
    }
    return result;
  }
  this.reload = function (map, width, height) {
    this.hide();
    var list = this.List.toArray();
    for (var i = 0; i < list.length; i++) {
      list[i].zoomChange(width, height);
      list[i].insertMap(map);
    }
  }
  this.add = function (x, y, map) {
    var point = new Point(Guid.NewGuid().ToString(), x, y, map.Image.width, map.Image.height);
    point.insertMap(map);
    this.List[point.Id] = point;
  }
  this.clear = function () {
    this.hide();
    this.List = new Dictionary();
  }
  this.Delete = function (id) {
    var point = document.getElementById(id);
    if (point) {
      point.parentElement.removeChild(point);
      delete this.List[id];
    }
  }
  this.Selected = {
    parent: this,
    get: function () {
      return $(".point.selected")[0];
    },
    "delete": function () {
      var point = this.get();
      if (point) {
        delete this.parent.List[point.id];
        point.parentElement.removeChild(point);
      }
    }
  }

}

//旋转
function Rotation (id, angle) {
  this.Angle = angle;

  var container = $$("idContainer");
  var src = "point.png";
  options = {
    onPreLoad: function () { container.style.backgroundImage = "url('point.png')"; },
    onLoad: function () { container.style.backgroundImage = ""; }
  },
    it = new ImageTrans(container, options);
  it.load(src);

}





