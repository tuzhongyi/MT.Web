/// <reference path="../../../client/struct.js" />
Html.Control.AlertWindow.Playback = {
    load: function (id)
    {
        username = getCookie("username")
        sid = getCookie("sid");

        var example = "rtmp://192.168.21.245/stream?dev_id=00310101031111111000002000000000&slot=1&stream=1&mode=playback&user=admin&password=12345&beg=2016-01-14T00:18:18Z&end=2016-01-14T00:25:04Z";

        var href = new Uri(example);
        href.Host = Client.Host;
        href.Querys.user = username;
        href.Querys.password = sid;


        var record = Property.RecordList.value[id];

        var list = Client.Management().Event.Linkage.List(record.ComponentId);

        if (list.EventLinkage && list.EventLinkage.length > 0) {
            if (list.EventLinkage[0] && list.EventLinkage[0].VideoPlaybackIdentifier && list.EventLinkage[0].VideoPlaybackIdentifier.length > 0) {
                if (list.EventLinkage[0].VideoPlaybackIdentifier[0]) {
                    var videoId = list.EventLinkage[0].VideoPlaybackIdentifier[0].VideoInputChannelId;
                    var id = new Id(videoId);
                    var no = id.ModuleId.No;
                    //var no = list.EventLinkage[0].VideoPlaybackIdentifier[0].StreamNo;
                    var date = Convert.ToDate(record.AlarmTime);
                    date.setSeconds(date.getSeconds() + list.EventLinkage[0].VideoPlaybackIdentifier[0].BeginTime);
                    var beg = date.toISOString();
                    date.setSeconds(date.getSeconds() - list.EventLinkage[0].VideoPlaybackIdentifier[0].BeginTime + list.EventLinkage[0].VideoPlaybackIdentifier[0].EndTime);
                    var end = date.toISOString();
                    
                    href.Querys.dev_id = id.getDeviceId();;
                    href.Querys.slot = parseFloat(no);
                    href.Querys.beg = beg;
                    href.Querys.end = end;
                }
            }
        }        

        jwplayer("divVideo").setup({
            file: href.toString(),
            height: 700,
            width: 1024,
            stretching: "exactfit",
            autostart: true
        });
    }
};