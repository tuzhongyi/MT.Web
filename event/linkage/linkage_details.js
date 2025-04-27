

function item_load() {
    tryCatch(function () {
        DropDownList.Create("ddlDetailEventType", ControlModel.EnumAndLanguage, EventType, Language.Enum.EventType);
        DropDownList.Create("ddlDetailEventState", ControlModel.EnumAndLanguage, EventState, Language.Enum.EventState);
        var id = Html.Current.Id.get();
        if (id)
            Html.Control.AlertWindow.load(id);
    });
}
function ddlDetailEventType_OnChanged(sender, args) {
    Html.Control.AlertWindow.EventType.set(args);
}

function ddlDetailEventState_OnChanged(sender, args) {
    Html.Control.AlertWindow.EventState.set(args);
}

function btnDetailLinkage_Click(sender, args) {
    var linkage = Property.Linkage.value;
    linkage.EventType = getTag("ddlDetailEventType").value;
    linkage.EventState = getTag("ddlDetailEventState").value;
    Html.Control.AlertWindow.modify(linkage, Html.Current.Id.get());
    return false;
}