function modbus_network_load() {
    tryCatch(function () {
        var id = Html.Current.Id.get();
        Html.Control.AlertWindow.Network.load(id);
    });
}

function btnNetwork_Click(sender, args) {
    var networkInformation = new NetworkInformation();
    networkInformation.IPAddress = getTag("txtIPAddress").value;
    networkInformation.Port = parseInt(getTag("txtPort").value);
    networkInformation.Submask = getTag("txtSubmask").value;
    networkInformation.Gateway = getTag("txtGateway").value;
    networkInformation.PhysicalAddress = getTag("txtPhysicalAddress").value;
    networkInformation.DNS = getTag("txtDNS").value;
    networkInformation.CentralServer.IPAddress = getTag("txtCentralServerIPAddress").value;
    networkInformation.CentralServer.Port = parseInt(getTag("txtCentralServerPort").value);
    networkInformation.DNSSpecified = true;
    networkInformation.CentralServerSpecified = true;
    Html.Control.AlertWindow.Network.modify(networkInformation);
    return false;
}