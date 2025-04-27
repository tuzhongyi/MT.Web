/// <reference path="../enum.js" />
/// <reference path="../struct.js" />
/// <reference path="../../howell.js/howell.js" />
/// <reference path="../struct.js" />
/// <reference path="../BaseClient.js" />


(function (deviceId) {

    var hadScript =
    {
        httpService: "/js/howell.js/httpService.js",
        convert: "/js/howell.js/howell.convert.js",
        BaseClient: "/js/client/BaseClient.js",
    };
    for (var id in hadScript) {
        if (!document.getElementById(id)) {
            loadJS(id, document.location.protocol + "//" + document.location.host + hadScript[id]);
        }
    }
})();



function MediumClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/Medium";
    var base = new BaseClient();

    var contract =
    {
        version: baseUri + "/System/Version",
        picture: {
            list: function () {
                return baseUri + "/Pictures";
            },
            item: function (id) {
                return this.list() + "/" + id;
            },
            data: function (id) {
                return this.item(id) + "/Data";
            }
        }
    };

    this.getVersion = function () {
        return base.Get(contract.version);
    }
    this.Picture = {
        List: function (beginTime, endTime, videoInputChannelId, pageIndex, pageSize) {
            var result = base.Get(contract.picture.list(), getParams(this.List));
            return Convert(result, new PictureList());
        },
        Create: function (picture) {
            return base.Post(contract.picture.list(), picture);
        },
        Get: function (pictureId) {
            var result = base.Get(contract.picture.item(pictureId));
            return Convert(result, new Picture());
        },
        Delete: function (pictureId) {
            return base.Delete(contract.picture.item(pictureId));
        },
        Data: function (pictureId) {
            return contract.picture.data(pictureId);
        }
    };
}