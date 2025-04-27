/// <reference path="../howell.js/howell.js" />
/// <reference path="struct.js" />
/// <reference path="../howell.js/howell.convert.js" />
/// <reference path="BaseClient.js" />


(function (deviceId) {

    var hadScript =
    {
        httpService: "/js/howell.js/httpService.js",
        convert: "/js/howell.js/howell.convert.js",
        BaseClient: "/js/client/BaseClient.js"
    };
    for (var id in hadScript) {
        if (!document.getElementById(id)) {
            loadJS(id, document.location.protocol + "//" + document.location.host + hadScript[id]);
        }
    }
})();




function PUClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/v10/ecamera_service/pu/"
    var base = new BaseClient();

    this.PU = {
        PTZ: {
            Direction: function (puid, channelNo, control) {
                /// <summary>云台方向控制</summary>
                /// <param name="puid" type="String">ID</param>
                /// <param name="channelNo" type="Int32">通道号</param>
                /// <param name="control" type="PTZControl">云台控制</param>
                /// <returns type="Fault">状态</returns>
                return base.Put(contract.pu.ptz.direction(puid, channelNo), control);
            },
            Lens: function (puid, channelNo, control) {
                /// <summary>云台方向控制</summary>
                /// <param name="puid" type="String">ID</param>
                /// <param name="channelNo" type="Int32">通道号</param>
                /// <param name="control" type="LensControl">镜头控制</param>
                /// <returns type="Fault">状态</returns>
                return base.Put(contract.pu.ptz.lens(puid, channelNo), control);
            },
            Preset: function (puid, channelNo, control) {
                /// <summary>云台方向控制</summary>
                /// <param name="puid" type="String">ID</param>
                /// <param name="channelNo" type="Int32">通道号</param>
                /// <param name="control" type="PresetControl">预置点控制</param>
                /// <returns type="Fault">状态</returns>
                return base.Put(contract.pu.ptz.preset(puid, channelNo), control);
            }
        }
    }


    var contract = {
        pu: {
            list: function () {
                return baseUri + "/System/PUs";
            },
            item: function (puid) {
                return this.list() + "/" + puid;
            },
            ptz: {
                base: function (puid, channelNo) {
                    return contract.pu.item(puid) + "/Channels/" + channelNo + "/PTZ";
                },
                direction: function (puid, channelNo) {
                    return this.base(puid, channelNo) + "/Direction";
                },
                lens: function (puid, channelNo) {
                    return this.base(puid, channelNo) + "/Lens";
                },
                preset: function (puid, channelNo) {
                    return this.base(puid, channelNo) + "/Preset";
                }
            }
        }
    };
}

function PTZControl() {
    /// <signature>
    /// <summary>云台控制</summary>
    /// <field name='Direction' type='PTZDirection'>云台方向 默认：Stop N</field>
    /// <field name='Speed' type='Int32'>速度[0-255] 默认：30 N</field>
    /// </signature>

    this.Direction = PTZDirection.Stop;
    this.Speed = 30;
}

function LensControl() {
    /// <signature>
    /// <summary>镜头控制</summary>
    /// <field name='Lens' type='PTZLens'>镜头控制 默认：Stop N</field>
    /// <field name='Speed' type='Int32'>速度[0-255] 默认：30 N</field>
    /// </signature>
    this.Lens = PTZLens.Stop;
    this.Speed = 30;
}

function PresetControl() {
    /// <signature>
    /// <summary>预置点控制</summary>
    /// <field name='Preset' type='PTZPreset'>预置点控制 默认：Goto N</field>
    /// <field name='PresetNo' type='Int32'>预置点编号[0-255] 默认：0 N</field>
    /// <field name='Speed' type='Int32'>速度[0-255] 默认：30 N</field>
    /// </signature>
    this.Preset = PTZPreset.Goto;
    this.PresetNo = 0;
    this.Speed = 30;
}

///<var>预置点控制</var>
var PTZPreset = {
    /// <field type='String'>清除</field>
    Clear: "Clear",
    /// <field type='String'>设置</field>
    Set: "Set",
    /// <field type='String'>转向</field>
    Goto: "Goto"
};