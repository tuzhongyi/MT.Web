if (!this.Client)
    imported.loadJS("/js/client/client.js");

Ultrasonic = {
    Property: {
        deviceId: null,
        inputId: null,
        load: function (deviceId, inputId) {
            return Client.Management().Device.IO.Input.Ultrasonic.Get(deviceId, inputId);
        },
        modify: function (deviceId, inputId, ultrasonic) {
            try {
                Client.Management().Device.IO.Input.Ultrasonic.Set(deviceId, inputId, ultrasonic);
            }
            catch (e) {
                return e.number;
            }
        },
    },
    Html: {
        Control: {
            load: function (deviceId, inputId, deviceName, inputName) {
                var result = Ultrasonic.Property.load(deviceId, inputId);
                this.Name.set(deviceName);
                this.InputName.set(inputName);
                this.Interval.set(result.Interval);
                this.Range.set(result.Range);
                this.MaxRange.set(result.MaxRange);
            },
            modify: function (deviceId, inputId, ultrasonicInformation) {
                var code = Ultrasonic.Property.modify(deviceId, inputId, ultrasonicInformation);
                if (code) {
                    AlertWindow.Close(function (code) {
                        $.confirm({
                            text: "操作失败",
                            okButton: "确定",
                            cancelButtonClass: "hide-tag",
                        });
                    }, code);
                }
                else {
                    AlertWindow.Close(function () {
                        $.confirm({
                            text: "操作成功",
                            okButton: "确定",
                            cancelButtonClass: "hide-tag",
                        });
                    });
                }
            },
            Name: {
                value: null,
                get: function () {
                    return this.value;
                },
                set: function (value) {
                    getTag("txtName").value = value;
                    this.value = value;
                }
            },
            InputName: {
                value: null,
                get: function () {
                    return this.value;
                },
                set: function (value) {
                    getTag("InputName").value = value;
                    this.value = value;
                }
            },
            Interval: {
                value: null,
                get: function () {
                    return this.value;
                },
                set: function (value) {
                    getTag("txtInterval").value = value;
                    this.value = value;
                }
            },
            Range: {
                value: null,
                get: function () {
                    return this.value;
                },
                set: function (value) {
                    getTag("txtRange").value = value;
                    this.value = value;
                }
            },
            MaxRange: {
                value: null,
                get: function () {
                    return this.value;
                },
                set: function (value) {
                    getTag("txtMaxRange").value = value;
                    this.value = value;
                }
            },
        }
    }
}