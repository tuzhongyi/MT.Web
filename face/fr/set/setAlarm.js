function autoCloseClick() {
    if ($('#autoCloseCheck').is(":checked")) {
        $('.bootstrap-touchspin').find('button').removeAttr('disabled', true);
        $('#autoCloseInterval').removeAttr('disabled', true);
    }
    else {
        $('.bootstrap-touchspin').find('button').attr('disabled', true);
        $('#autoCloseInterval').attr('disabled', true);
    }
}
function setAlarmInit() {
    $("#autoCloseInterval").TouchSpin({
        min: 5,
        max: Number.MAX_VALUE,
        buttonup_class: 'btn btn-secondary btn-outline',
        buttondown_class: 'btn btn-secondary btn-outline ',
        step: 1,
        postfix: '秒'
    });
    var autoCloseMode = getCookie("autoCloseMode");
    var alarmAutoCloseInterval = getCookie("alarmAutoCloseInterval");
    if (alarmAutoCloseInterval) {
        document.getElementById("autoCloseInterval").value = alarmAutoCloseInterval;
    }
    if (autoCloseMode && autoCloseMode == "hand") {
        document.getElementById("autoCloseCheck").checked = false;
        autoCloseClick();
    }
}

function alarmPromptSave(){
    setCookie("autoCloseMode", document.getElementById("autoCloseCheck").checked?"auto":"hand","/");
    setCookie("alarmAutoCloseInterval", document.getElementById("autoCloseInterval").value,"/");
    $.toast({
        heading: chinese.save + chinese.success,
        position: 'bottom-right',
        loaderBg: '#ff6849',
        icon: 'success',
        hideAfter: 3500,
        stack: 6
    });
}