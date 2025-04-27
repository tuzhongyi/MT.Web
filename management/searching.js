/// <reference path="../js/background/management/background_searching.js" />
function searching_load() {
    scrollHead = function () {
        var visibility = "visible";
        var display = "none";
        if (document.documentElement.scrollTop > 26) {
            visibility = "hidden";
            display = "block";
            if (getTag("head_classificationItemList"))
                getTag("head_classificationItemList").scrollTop = Property.Searching.scroll;
        }
        $(".page-top").css("visibility", visibility);
        document.getElementById("table_head").style.display = display;
        if (getTag("classificationItemList"))
            getTag("classificationItemList").scrollTop = Property.Searching.scroll;
    }
    window.addEventListener("scroll", scrollHead, false);

}

function operation_Click(sender, args) {
    var index = sender.parentElement.className.indexOf("open");
    if (index == -1) {
        setTimeout(function () {
            getTag(args).parentElement.className += " open";
        }, 500);
    }
}

function classificationFilter_Click(sender, args) {
    if (getTag("btn_searching").className.indexOf("searching-start") > -1)
        return
    var index = sender.parentElement.className.indexOf("open");
    if (index == -1) {
        setTimeout(function () {
            getTag(args).parentElement.className += " open";
        }, 500);
    }
}

function protocolType_OnChange(sender, args) {
    getTag("head_ddlProtocolType").value = sender.value;
    getTag("ddlProtocolType").value = sender.value
}
//列表项单击事件
//function GrouplistItem_Click(sender, args) {
//    tryCatch(function () {
//        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.GroupListItem);
//        Html.Control.Table.select(id);
//        changeAddBtn();
//    })
//};
function GroupListItem_SelectAll(args) {
    GroupListItem_Cancel();
    for (var i = 0; i < args.length; i++) {
        var id = args[i].id;
        Property.Searching.value[id].Selected = true;
    }
    Html.Control.Table.selectedCount = args.length;
    changeAddBtn();
};
function GroupListItem_Cancel() {
    for (var key in Property.Searching.value) {
        Property.Searching.value[key].Selected = false;
    }
    Html.Control.Table.selectedCount = 0;
    changeAddBtn();
};

function searching_Click(sender, args) {
    if (sender.className.indexOf("searching-stop") > -1) {
        //getTag("btn_add_device").className = getTag("btn_add_device").className.replace("btn-primary-outline", "btn-default");
        //getTag("head_btn_add_device").className = getTag("head_btn_add_device").className.replace("btn-primary-outline", "btn-default");
        getTag("ddlProtocolType").disabled = "disabled";
        getTag("head_ddlProtocolType").disabled = "disabled";
        Html.Control.Table.start(getTag("ddlProtocolType").value);
        var btnSearching = getTag("btn_searching");
        btnSearching.className = btnSearching.className.replace("btn-primary", "btn-danger");
        btnSearching.className = btnSearching.className.replace("searching-stop", "searching-start");
        btnSearching.innerHTML = "停&ensp;&ensp;止";
        var herdBtnSearching = getTag("head_btn_searching");
        herdBtnSearching.className = herdBtnSearching.className.replace("btn-primary", "btn-danger");
        herdBtnSearching.className = herdBtnSearching.className.replace("searching-stop", "searching-start");
        herdBtnSearching.innerHTML = "停&ensp;&ensp;止";
    }
    else {
        //getTag("btn_add_device").className = getTag("btn_add_device").className.replace("btn-default", "btn-primary-outline");
        //getTag("head_btn_add_device").className = getTag("head_btn_add_device").className.replace("btn-default", "btn-primary-outline");
        getTag("ddlProtocolType").disabled = "";
        getTag("head_ddlProtocolType").disabled = "";
        Html.Control.Table.stop();
        var btnSearching = getTag("btn_searching");
        btnSearching.className = btnSearching.className.replace("btn-danger", "btn-primary");
        btnSearching.className = btnSearching.className.replace("searching-start", "searching-stop");
        btnSearching.innerHTML = "搜&ensp;&ensp;索";
        var herdBtnSearching = getTag("head_btn_searching");
        herdBtnSearching.className = herdBtnSearching.className.replace("btn-danger", "btn-primary");
        herdBtnSearching.className = herdBtnSearching.className.replace("searching-start", "searching-stop");
        herdBtnSearching.innerHTML = "搜&ensp;&ensp;索";

    }
}

function addDevide_Click(sender, args) {
    if (Html.Control.Table.selectedCount == 0)
        return;
    if (getTag("btn_searching").className.indexOf("searching-start") > -1) {
        $.confirm({
            text: "是否停止搜索并添加选中设备至数据库？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                AlertWindow.Close();
                searching_Click(getTag("btn_searching"));
                addDevide();
            },
        });
    }
    else {
        addDevide();
    }
}

function addDevide() {
    var arr = Property.Searching.value.toArray();
    for (var i = 0; i < arr.length; i++) {

        switch (arr[i].ProtocolType) {
            case ProtocolType.Howell8000:
            case ProtocolType.UniView:
            case ProtocolType.DaHua:
            case ProtocolType.Honeywell:
                var sender = document.createElement("a");
                sender.href = "management/searching/searching_details.htm";
                AlertWindow.Show(sender, -1);
                return;
            default:
                break;
        }

        // 2020-6-12 查志磊
        // if (arr[i].ProtocolType == "Howell8000") {
        //     var sender = document.createElement("a");
        //     sender.href = "management/searching/searching_details.htm";
        //     AlertWindow.Show(sender, -1);
        //     return;
        // }
    }
    addDevideToDB();
}

function addDevideToDB(userName, password) {
    var count = Property.Searching.add(userName, password);
    if (count == 0)
        return;
    $.confirm({
        text: count + "个设备添加至数据库",
        alert: true,
        okButton: "确定"
    });
}

function classificationFilter_Onscroll(sender) {
    Property.Searching.scroll = sender.scrollTop;
}

//列表项单击事件
function TableTr_Click(sender, args) {
    tryCatch(function () {
        Html.Control.Table.select(sender.id);
    })
};

function chk_existed_Click(sender, args) {
    var isChecked = sender.checked ? true : false;
    var tags = document.getElementsByName("chk_existed");
    for (var i = 0; i < tags.length; i++) {
        tags[i].checked = isChecked;
    }
    Html.Control.Table.changeDisplay();
}

function changeAddBtn() {
    var btn = $(getTag("btn_add_device"));
    var btnHead = $(getTag("head_btn_add_device"));
    var removeCss = "btn-primary-outline";
    var addCss = "btn-default";
    if (Html.Control.Table.selectedCount > 0) {
        var effectiveCount = 0;
        var arr = Property.Searching.value.toArray();
        for (var i = 0; i < arr.length; i++) {
            if (Property.Searching.value[arr[i].Id].Selected && Property.Searching.value[arr[i].Id].ExistedInDatabase == false) {
                effectiveCount++;
            }
        }
        if (effectiveCount > 0) {
            removeCss = "btn-default";
            addCss = "btn-primary-outline";
        }
    }
    btn.removeClass(removeCss);
    btn.addClass(addCss);
    btnHead.removeClass(removeCss);
    btnHead.addClass(addCss);
}

function chk_IPName_Click(sender, args) {
    var isChecked = sender.checked ? true : false;
    var tags = document.getElementsByName("chk_IPName");
    for (var i = 0; i < tags.length; i++) {
        tags[i].checked = isChecked;
    }

    var trs = document.getElementsByClassName("group_");
    for (var i = 0; i < trs.length; i++) {
        var td = trs[i].getElementsByClassName("td-name")[0];
        var name = Property.Searching.value[trs[i].id].Name;
        if (isChecked) {
            var uri = new Uri(Property.Searching.value[trs[i].id].Uri);
            name = uri.Host
        }
        td.title = name;
        td.innerHTML = name;
    }
}