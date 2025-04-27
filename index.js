/// <reference path="jquery/jquery-3.6.0.min.js" />
/// <reference path="js/howell.js/howell.js" />

var scrollHead = null;
function loadContent (uri) {
  var head = document.getElementById("table_head");
  if (head) {
    head.style.display = "none";
    head.innerHTML = ""
  }
  if (scrollHead) {
    window.removeEventListener("scroll", scrollHead, false);
    scrollHead = null;
  }
  toClearInterval();
  LazyLoadPage = null;
  loadOtherPage("divLoadContent", base64decode(uri));
  loadTableHead();
}

function loadOtherPage (id, uri) {
  var element = document.createElement("div");
  var vessel = document.getElementById(id);
  vessel.innerHTML = "";
  var request = new XMLHttpRequest();
  request.open("GET", uri, false);
  request.send(null);
  var page = request.responseText;
  page = page.substr(page.indexOf("<body>"));
  page = page.substr(6, page.indexOf("</body>") - 6);
  element.innerHTML = page;
  $($.parseHTML(element.outerHTML, document, true)).appendTo(vessel);
}

function loadTableHead () {
  var loading = document.getElementById("table_loading_head");
  if (loading) {
    var head = document.getElementById("table_head");
    if (head) {
      head.className = loading.className;
      head.innerHTML = loading.innerHTML;
    }
    loading.parentElement.removeChild(loading);

  }
}
function indexInit () {
  var url = new Uri(document.location);
  if (url.Querys && url.Querys.page) {
    loadContent(url.Querys.page);
  }
  else {
    loadContent(base64encode("health.htm"));
  }
}

function Goto (map, isNew) {
  if (map == Navigation.login) {

  }
  url = document.location.protocol + "//" + document.location.host + map;
  if (isNew) {
    window.open(url);
    return
  }
  document.location = document.location.protocol + "//" + document.location.host + map;
}

var Navigation =
{
  login: {
    manager: "/manager.htm",
    _default: "/default.htm"
  },
  health: "/health.htm",
  event: {
    linkage: {
      list: "/event/linkages.htm",
    },
    record: {
      list: "/event/records.htm",
    }
  },
  security:
  {
    user:
    {
      list: "/security/users.htm",
      details: "/security/user_details.htm",
      status: "/security/user/user_status.htm",
      department: "/security/department/user_users.htm",
      device: "/security/department/user_devices.htm",
      input: "/security/department/user_inputs.htm",
      output: "/security/department/user_outputs.htm"
    },
    department:
    {
      list: "/security/departments.htm",
      details: "/security/department_details.htm",
      user: "/security/department/department_users.htm",
      device: "/security/department/department_devices.htm",
      input: "/security/department/department_inputs.htm",
      output: "/security/department/department_outputs.htm"
    },
    device:
    {
      list: "/management/devices.htm"
    },
    permissions:
    {
    }
  },
  management:
  {
    device:
    {
      list: "/management/devices.htm",
      searching: "/management/searching.htm",
      association: "/management/device/video/input/device_video_input_association.htm",
      pseudo_code: "/management/device/video/input/device_video_input_pseudo_code.htm"
    },
    platform: {
      list: "/management/platforms.htm"
    },
    gis: {
      map: {
        dispatch: "/management/gis/gis_dispatch.htm"
      }
    }
  },
  map: "/map/center.html",
  annunciator: {
    modbus: "/annunciator/modbus.htm",
  },
  video: "/video1.htm",
  download: {
    video: "/download/download_video.htm",
    record: "/download/download_video_record.htm"
  },
  help: "/helper.htm",
  about: "/about.htm",
  detector: "/detector/detectors.htm",
  index: "/index.htm",
  gps: {
    device: {
      list: "/gps/devices.htm"
    }
  },
  vehicle: {
    list: "/vehicle/vehicles.htm",
    device: {
      list: "/vehicle/devices.htm",
      record: "/vehicle/device/device_records.htm"
    }
  },
  logs: {
    user: {
      operations: "/logs/user/user_operations.htm"
    }
  }
}

function loadScripts (urls, callback) {
  if (urls.length > 0) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = urls[0];
    urls.splice(0, 1)
    if (typeof (callback) != "undefined") {
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            if (urls.length > 0) {
              setTimeout(function () {
                loadScripts(urls, callback);
              });
            }
            else
              callback();
          }
        };
      } else {
        script.onload = function () {
          if (urls.length > 0) {
            setTimeout(function () {
              loadScripts(urls, callback);
            });
          }
          else
            callback();
        };
      }
    }
    document.getElementById("pageHead").appendChild(script);
  }
}

function setUrlRandomParams (url) {
  var i = url.indexOf("?");
  url += i > -1 ? "&" : "?";
  url += "r=" + Math.random();

  return url;
}

function logout () {

  try {
    Client.Authentication().logout();
  }
  catch (ex) { }

  setCookie("username", "", null, new Date());
  var page = getCookie("page");
  if (page) {
    document.location = page;
    return;
  }
  Goto(Navigation.login._default);

}

function reboot () {
  stopPropagation();
  $.confirm({
    text: "确定要重启服务器吗？",
    okButton: "确定",
    cancelButton: "取消",
    confirm: function () {
      tryCatch(function () {
        Client.Security().Reboot();
      });
    }
  });
}

function shutdown () {
  stopPropagation();
  $.confirm({
    text: "确定要关闭服务器吗？",
    okButton: "确定",
    cancelButton: "取消",
    confirm: function () {
      tryCatch(function () {
        Client.Security().Shutdown();
      });
    }
  });
}
//if (userAgent.indexOf("compatible") > -1 || userAgent.indexOf("MSIE") > -1) {
//    Navigation.video = "/video.htm";
//}; //判断是否IE浏览器
