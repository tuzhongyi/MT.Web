
function PageClient() {
    this.Host = document.location.hostname;    
    this.HlsPort = 8800;
    this.PUPort = 8820;

    var head = document.getElementsByTagName("HEAD").item(0);
    var $head = $(head);

    var host = document.location.protocol + "//" + document.location.host;

    if (!this.BaseClient)
    {
        try { $head.append($('<script src="' + host + '/js/client/BaseClient.js"></script>')[0]); } catch (ex) { }
    }
    this.PU = function () {
        if (!window.PUClient) {
            try { $head.append($('<script src="' + host + '/js/client/pu.js"></script>')[0]); } catch (ex) { }
        }
        return new PUClient(this.Host, this.PUPort);
    }
}
var Client = new PageClient();
