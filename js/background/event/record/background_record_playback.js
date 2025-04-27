/// <reference path="../../../client/struct.js" />
Html.Control.AlertWindow.Playback = {
    player: null,
    load: function (id) {
        username = getCookie("username")
        sid = getCookie("sid");

        var example = "ws://192.168.21.241:8800/ws/video/howellps/vod/dev_id/slot/stream/begin_end/vod.mp4?user=howell&password=123456";



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

                    example = example.replace("dev_id", id.getDeviceId());
                    example = example.replace("slot", parseFloat(no));
                    example = example.replace("stream", 1);
                    example = example.replace("begin", beg);
                    example = example.replace("end", end);
                }
            }
        }


        var href = new Uri(example);
        href.Host = Client.Host;
        href.Port = Client.Port;
        href.Querys.user = username;
        href.Querys.password = sid;


        if (this.player)
            this.player.stop();

        this.player = new WSPlayer({
            elementId: "divVideo",
            url: href.toString()
        });
        this.player.play();
        this.player.clientWidth = 1024;
        this.player.clientHeight = 700;
        this.player.resize();
        // jwplayer("divVideo").setup({
        //     file: href.toString(),
        //     height: 700,
        //     width: 1024,
        //     stretching: "exactfit",
        //     autostart: true
        // });
    }
};