var RelayList = Html.Control.PopoverWindow.RelayList;
//Association

//用户选择事件
function Relay_Selected(sender, args) {
    tryCatch(function () {
        var id = Info.ControlIdPrefix.getId(sender.id, Info.ControlIdPrefix.Relay.list);
        RelayList.select(id);
    });
}

function Relay_BatchModify(switchState) {
    if (Html.Control.PopoverWindow.RelayList.selectedCount <= 0)
        return;
    $.confirm({
        text: "确定要" + (switchState == SwitchState.OFF ? "关闭" : "开启") + "所有选中的设备吗？",
        okButton: "确定",
        cancelButton: "取消",
        confirm: function () {
            Html.Control.PopoverWindow.RelayList.batchModify(switchState);
        }
    });
}

function Relay_PageChange(index) {
    RelayList.clear();
    RelayList.load(index);
}

//已绑定的用户当前页全部选中事件
function Relay_SelectedCurrent(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Relay.list);
        if (!Property.RelayList.get(id).Selected)
            RelayList.select(id);
    }
}


function Relay_SelectedAll(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Relay.list);
        if (!Property.RelayList.get(id).Selected)
            RelayList.select(id);
    }
    RelayList.selectAll();
}


function Relay_SelectedInverse() {
    RelayList.selectInverse();
}

//已绑定的用户当前页全部选择取消事件
function Relay_SelectedCancel(items) {
    for (var i = 0; i < items.length; i++) {
        var id = Info.ControlIdPrefix.getId(items[i].id, Info.ControlIdPrefix.Relay.list);
        if(Property.RelayList.get(id).Selected)
            RelayList.select(id);
    }
    RelayList.selectCancel();
}