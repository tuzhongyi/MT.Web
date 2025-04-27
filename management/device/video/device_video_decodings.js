function device_video_decodings_load() {
    //$($.parseHTML(loadPage("device_video_decodings.js.htm"), document, true)).insertAfter(getTag("sc"));
    var win = new AlertWindow("", "<a class='btn btn-xs btn-primary-outline pull-right div-xsgroup' style='font-size:14px;padding-left:14px;'><i class='icon-plus'></i></a>", "decoding/device_video_decoding_add.htm", -1);
    document.getElementById("btnAdd").appendChild(win);
    var url = new Uri(document.location);
    if (url.Querys && url.Querys.deviceId)
        Html.Control.GroupList.Create(url.Querys.deviceId, "glistPanel");
    else {//正式发布时删除
        url.Querys["deviceId"] = "00310101031111111000001000000000";
        document.location = url.toString();
    }

    var lazy = getTag("divLazyload");
    lazy.appendChild(new LazyLoadControl("load-more", "加载中……", lazyLoad));
    window.setTimeout(function () {
        document.documentElement.scrollTop = 0;
        isOnscroll = true;
    }, 100);
}

function GroupListItem_SelectAll(args) {
    Html.Control.GroupList.Select.All();
};
function GroupListItem_Cancel(sender, args) {
    Html.Control.GroupList.Select.Cancel();
};
function batchRemoveVideoDecodings_Click(sender, args) {
    if (Html.Control.GroupList.Count.Selected > 0) {
        $.confirm({
            text: "确定要删除所有选中的通道吗？",
            okButton: "确定",
            cancelButton: "取消",
            confirm: function () {
                Html.Control.GroupList.BatchRemove();//批量删除，并返回删除的条数                   
            }
        });
    }

}

//延迟加载事件
function lazyLoad(index) {
    tryCatch(function () {
        Html.Control.GroupList.Load(index + 1, Property.PageSize);
    });
}
PageEvent.Device.Video.Decoding.GroupListItemRemoveButtonClick = function (sender, args) {

    $.confirm({
        text: "确定要删除这个通道吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.GroupList.Remove(args);
        }
    });

    stopPropagation();
}