/// <reference path="health.js" />
//var Client = {

//    Host: document.location.hostname,
//    Port: 8800,
//    Security: function () {
//        if (!this.SecurityClient)
//            imported.loadJS("/js/client/security.js");
//        return new SecurityClient(this.Host, this.Port, cookieKey);
//    },
//    Management: function () {
//        if (!this.ManagementClient)
//            imported.loadJS("/js/client/management.js");
//        return new ManagementClient(this.Host, this.Port, cookieKey);
//    },
//    System: function () {
//        if (!this.SystemClient)
//            imported.loadJS("/js/client/system.js");
//        return new SystemClient(this.Host, this.Port, cookieKey);
//    },
//    Health: function () {
//        if (!this.HealthClient)
//            imported.loadJS("/js/client/health.js");
//        return new HealthClient(this.Host, this.Port, cookieKey);
//    },
//    Authentication: function () {

//    }
//};



function PageClient() {
    this.Host = document.location.hostname;
    this.Port = document.location.port;
    this.SessionID = "";
    this.ADCPort = 8803;
    this.VideoPort = 8812;
    this.HlsPort = document.location.port;
    this.PUPort = 8820;
    this.DownloadPort = document.location.port;
    this.ProxyPort = 8800;
    this.OfflineMapPort = 8880;

    if (WebConfig) {
        this.Host = WebConfig.Host ? WebConfig.Host : this.Host;
        this.Port = WebConfig.Port?WebConfig.Port:this.Port;
        this.ADCPort = WebConfig.ADCPort?WebConfig.ADCPort:this.ADCPort;
        this.VideoPort = WebConfig.VideoPort?WebConfig.VideoPort: this.VideoPort;
        this.HlsPort = WebConfig.HlsPort?WebConfig.HlsPort: this.HlsPort;
        this.PUPort = WebConfig.PUPort?WebConfig.PUPort:this.PUPort;
        this.DownloadPort = WebConfig.DownloadPort?WebConfig.DownloadPort:this.DownloadPort;
        this.ProxyPort = WebConfig.ProxyPort?WebConfig.ProxyPort: this.ProxyPort;
        this.OfflineMapPort = WebConfig.OfflineMapPort?WebConfig.OfflineMapPort:  this.OfflineMapPort;
    }

    var head = document.getElementsByTagName("HEAD").item(0);
    var $head = $(head);

    var host = document.location.protocol + "//" + document.location.host;

    if (!this.BaseClient)
    {
        try { $head.append($('<script src="' + host + '/js/client/BaseClient.js"></script>')[0]); } catch (ex) { }
    }

    

    this.Security = function () {
        if (!window.SecurityClient) {
            try { $head.append($('<script src="' + host + '/js/client/security.js"></script>')[0]); } catch (ex) { }
        }
        return new SecurityClient(this.Host, this.Port);
    }
    this.Management = function () {
        if (!window.ManagementClient) {
            try { $head.append($('<script src="' + host + '/js/client/management.js"></script>')[0]); } catch (ex) { }
        }
            //imported.loadJS("/js/client/management.js");
        return new ManagementClient(this.Host, this.Port);
    }
    this.System = function () {
        if (!window.SystemClient)
            imported.loadJS("/js/client/system.js");
        return new SystemClient(this.Host, this.Port);
    }
    this.Health = function () {
        if (!window.HealthClient)
            imported.loadJS("/js/client/health.js");
        return new HealthClient(this.Host, this.Port);
    }
    this.Authentication = function () {
        if (!window.AuthenticationClient)
            imported.loadJS("/js/client/authentication.js");
        return new AuthenticationClient(this.Host, this.Port);
    }
    this.ADC = function () {
        if (!window.ADCClient)
            imported.loadJS("/js/client/adc.js");
        return new ADCClient(this.Host, this.ADCPort);
    }
    this.Modbus = function () {
        if (!window.ModbusClient)
            imported.loadJS("/js/client/modbus.js");
        return new ModbusClient(this.Host, this.Port);
    }
    this.PU = function () {
        if (!window.PUClient) {
            try { $head.append($('<script src="' + host + '/js/client/pu.js"></script>')[0]); } catch (ex) { }
        }
        return new PUClient(this.Host, this.PUPort);
    }
    this.Download = function () {
        if (!window.DownloadClient) {
            try { $head.append($('<script src="' + host + '/js/client/download.js"></script>')[0]); } catch (ex) { }
        }
        return new DownloadClient(this.Host, this.DownloadPort);
    }
    this.GPS = function () {
        if (!window.GPSClient) {
            try { $head.append($('<script src="' + host + '/js/client/gps.js"></script>')[0]); } catch (ex) { }
        }
        return new GPSClient(this.Host, this.Port);
    }
    this.Vehicle = function () {
        if (!window.VehicleClient) {
            try { $head.append($('<script src="' + host + '/js/client/vehicle.js"></script>')[0]); } catch (ex) { }
        }
        return new VehicleClient(this.Host, this.Port);
    }
    this.Logs = function () {
        if (!window.LogsClient) {
            try { $head.append($('<script src="' + host + '/js/client/logs.js"></script>')[0]); } catch (ex) { }
        }
        return new LogsClient(this.Host, this.Port);
    }
    this.Medium = function () {
        if (!window.MediumClient) {
            try { $head.append($('<script src="' + host + '/js/client/medium.js"></script>')[0]); } catch (ex) { }
        }
        return new MediumClient(this.Host, this.Port);
    }
}
var Client = new PageClient();
var isLoadNav = true;
