var SignalList = Html.Control.PopoverWindow.SignalList;
//Association

//用户选择事件
function Signal_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Signal.list);
        SignalList.select(id);
    });
}

function Signal_BatchModify(sender, args) {
    if (Html.Control.PopoverWindow.SignalList.selectedCount <= 0)
        return;
    AlertWindow.Show(sender, -1);
}

function Signal_BatchEliminate() {
    if (Html.Control.PopoverWindow.SignalList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定消除所有选中的报警器的报警？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.PopoverWindow.SignalList.batchEliminate();
        }
    });
}


function SignalEliminate_Click(sender, No) {
    stopPropagation();
    if (sender.childNodes[0].childNodes[0].className.indexOf("green") > -1) {
        $.confirm({
            text: "该报警器没有报警,无需消警",
            okButton: "确定",
            cancelButtonClass: "hide-tag",
        });
        return;
    }
    $.confirm({
        text: "确定消除该报警器的报警?",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.PopoverWindow.SignalList.eliminate(No);
        }
    });
}

function SignalEdit_Click(sender, No) {
    stopPropagation();
    AlertWindow.Show(sender, -1);
    return false;
}

function Signal_PageChange(index) {
    SignalList.clear();
    SignalList.load(index);
}

//已绑定的用户当前页全部选中事件
function Signal_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Signal.list);
        if (!Property.SignalList.get(id).Selected)
            SignalList.select(id);
    }
    SignalList.selectAll();
}

//已绑定的用户全部选中事件
function Signal_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Signal.list);
        if (!Property.SignalList.get(id).Selected)
            SignalList.select(id);
    }
}

function Signal_SelectedInverse(items) {
    SignalList.selectInverse();
}

//已绑定的用户当前页全部选择取消事件
function Signal_SelectedCancel(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Signal.list);
        if (Property.SignalList.get(id).Selected)
            SignalList.select(id);
    }
    SignalList.selectCancel();
}