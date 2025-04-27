/// <reference path="../../js/howell.js/howell.js" />
/// <reference path="../../js/jquery/jquery-1.10.2.min.js" />


function item_load() {
    tryCatch(function () {
        DropDownList.Create("ddlPermission", ControlModel.Language, UserPermission, Language.Enum.UserPermission);
        Html.Control.AlertWindow.DetailPermission.value = new Object();

        var id = Html.Current.Id.get();
        if (id) {
            Html.Control.AlertWindow.load(id);
            Html.Control.AlertWindow.IsModify.set(true);
            getTag("txtName").setAttribute("readonly", "readonly");
            getTag("namePrompt").style.visibility = "hidden";

            for (var p in Html.Control.AlertWindow.DetailPermission.value) {
                getTag("chk" + p).checked = true;
            }

            getTag("txtDetailPermission").value = Html.Control.AlertWindow.DetailPermission.getLanguageString();
        }
        else
            Html.Control.AlertWindow.IsModify.set(false);
    });
}
function ddlPermission_OnChanged(sender, args) {
    Html.Control.AlertWindow.Permission.set(args);
}


function chkDetailPermission_Click(sender, args) {
    var value = sender.checked;
    Html.Control.AlertWindow.DetailPermission.set(args, value);
    getTag("txtDetailPermission").value = Html.Control.AlertWindow.DetailPermission.getLanguageString();
}

function btnDetailUser_Click(sender, args) {
    var user = new User();
    if (Property.User.value)
        user = Property.User.value;
    user.Id = Html.Current.Id.get();

    user.Username = getTag("txtName").value;

    user.Nickname = getTag("txtNickname").value;
    user.NicknameSpecified = true;

    user.Mobile = getTag("txtMobile").value;
    user.MobileSpecified = true;

    user.Phone = getTag("txtPhone").value;
    user.PhoneSpecified = true;

    user.UniformedId = getTag("txtUniformedId").value;
    user.UniformedIdSpecified = true;

    user.Duty = getTag("txtDuty").value;
    user.DutySpecified = true;

    user.Information = getTag("txtInformation").value;
    user.InformationSpecified = true;

    user.Sex = getTag("rdoMale").checked ? Sex.Male : getTag("rdoFemale").checked ? Sex.Female : Sex.None;
    user.SexSpecified = true;

    user.Permission = getTag("ddlPermission").value;
    user.DetailPermission = UserPermissions.None;
    if (user.Permission == UserPermission.Extended) {
        user.DetailPermission = Html.Control.AlertWindow.DetailPermission.getString();
    }
    user.DetailPermissionSpecified = true;

    user.Password = hex_md5(getTag("txtPassword").value).toLocaleLowerCase();

    if (Html.Control.AlertWindow.IsModify.get()) {
        if (getTag("txtPassword").value == "")
            user.Password = "";
        Html.Control.AlertWindow.modify(user);
    }
    else {
        Html.Control.AlertWindow.create(user);
    }
    return false;
}

function btnNextStep_Click(sender, args) {
    var isModify = Html.Control.AlertWindow.IsModify.get();
    
    var result = true;

    if (!isModify)
        result = checkName();

    if (!result)
        return result;

    result = checkNickname();
    if (!result)
        return result

    result = checkPassword(isModify);
    if (!result)
        return result;

    getTag("btnLastStep").style.display = "block";
    getTag("btnNextStep").style.display = "none";
    getTag("btnDetailUser").style.display = "block";
    getTag("page1").style.display = "none";
    getTag("page2").style.display = "block";
}

function btnLastStep_Click(sender, args) {
    getTag("btnLastStep").style.display = "none";
    getTag("btnNextStep").style.display = "block";
    getTag("btnDetailUser").style.display = "none";
    getTag("page1").style.display = "block";
    getTag("page2").style.display = "none";
}

function checkName() {
    var re = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{5,32}$");

    return changeStyle("txtName", !re.test(getTag("txtName").value));
}

function checkNickname() {
    //var nickname = getTag("txtNickname").value;
    //var reChinese = new RegExp("[\u4e00-\u9fa5]");
    //var re1 = new RegExp("^[\u4e00-\u9fa5a-zA-Z0-9_]{2,16}$");
    //var re2 = new RegExp("^[a-zA-Z0-9_]{6,32}$");
    //var haveChinese = reChinese.test(nickname);
    //if (haveChinese)
    //    return changeStyle("txtNickname", !re1.test(nickname));
    //return changeStyle("txtNickname", !re2.test(nickname));
    var nickname = getTag("txtNickname").value;
    var re = new RegExp("^[\u4e00-\u9fa5a-zA-Z0-9_]{1,120}$");
    return changeStyle("txtNickname", !re.test(nickname));
}

function checkPassword(isModify) {

    var isNull = "";

    if (isModify) {
        isNull = "|^$";
    }
    var re = new RegExp("^[a-zA-Z0-9_]{6,32}$" + isNull);

    var pwRes = changeStyle("txtPassword", !re.test(getTag("txtPassword").value));
        
    if (!pwRes)
        return false;
    return changeStyle("txtConfirmPassword", getTag("txtConfirmPassword").value != getTag("txtPassword").value);
}

function changeStyle(id, isError) {
    var control = $("#" + id);
    if (isError) {
        control.addClass("error");
        return false;
    }
    $("#" + id).removeClass("error");
    return true;
}