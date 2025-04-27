

function item_load() {
    tryCatch(function () {
        DropDownList.Create("ddlPermission", ControlModel.Language, UserPermission, Language.Enum.UserPermission);
        Html.Control.AlertWindow.DetailPermission.value = new Object();
        var id = Html.Current.Id.get();
        if (id) {
            Html.Control.AlertWindow.load(id);
            Html.Control.AlertWindow.IsModify.set(true);
            
            
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

function btnDetailDepartment_Click(sender, args) {
    var department = new Department();
    if (Property.Department.value)
        department = Property.Department.value;
    department.Id = Html.Current.Id.get();
    department.Name = getTag("txtName").value;
    department.Information = getTag("txtInformation").value;
    department.InformationSpecified = true;
    department.Permission = getTag("ddlPermission").value;
    department.DetailPermission = UserPermissions.None;
    if (department.Permission == UserPermission.Extended) {
        department.DetailPermission = Html.Control.AlertWindow.DetailPermission.getString();
    }
    department.DetailPermissionSpecified = true;

    if (Html.Control.AlertWindow.IsModify.get()) 
        Html.Control.AlertWindow.modify(department);    
    else
        Html.Control.AlertWindow.create(department);

    return false;
}