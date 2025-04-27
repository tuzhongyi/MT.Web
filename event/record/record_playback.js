/// <reference path="../../js/howell.js/howell.js" />
function record_playback_load() {
    tryCatch(function () {
    var id = Html.Current.Id.get();    
        Html.Control.AlertWindow.Playback.load(id);
    });
}