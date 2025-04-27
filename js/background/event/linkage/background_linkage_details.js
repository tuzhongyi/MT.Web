if (!this.Client)
    imported.loadJS("js/client/client.js");

Property["Linkage"] = {
    value: null,
    load: function (id) {
        return tryCatch(function () {
            Property.Linkage.value = Property.LinkageList.value[id];
            return Property.Linkage.value;
        });
    },
    modify: function (linkage) {
        return tryCatch(function () {
            return Client.Management().Event.Linkage.Set(linkage.ComponentId, linkage.EventType, linkage.EventState);
        });
    },
}


Html.Control["AlertWindow"] = {
    load: function (id) {
        var result = Property.Linkage.load(id);
        this.Name.set(Property.Name.get(result.ComponentId));
        this.EventType.set(result.EventType);
        this.EventState.set(result.EventState);
    },
    modify: function (linkage, oldId) {
        var args = new Object();
        args["Linkage"] = linkage;
        args["OldId"] = oldId;
        Property.Linkage.modify(linkage);
        AlertWindow.Close(PageEvent.Linkage.GroupListItemChanged, args);
    },
    Name: {
        set: function (value) {
            getTag("txtName").value = value;
        }
    },
    EventType: {
        set: function (value) {
            getTag("ddlDetailEventType").value = value;
        }
    },
    EventState: {
        set: function (value) {
            getTag("ddlDetailEventState").value = value;
        }
    }
}