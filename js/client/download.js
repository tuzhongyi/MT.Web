/// <reference path="../BaseClient.js" />

function DownloadClient(host, port, cookieKey) {

    var base = new BaseClient(cookieKey);

    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/download_service";
    var contract =
    {
        tasks: {
            create: function () {
                return baseUri + "/Medium/Files/Tasks"
            },
            item: function (tasksId) {
                return this.create() + "/" + tasksId;
            },
            data: function (tasksId) {
                return this.item(tasksId) + "/Data";
            },
            records: {
                list: function () {
                    return baseUri + "/Medium/Files/Tasks/Records";
                },
                item: function (tasksId) {
                    return this.list() + "/" + tasksId;
                }
            }
        }
    }

    this.Tasks = {
        Create: function (DeviceId, Channel, Stream, BeginTime, EndTime, FileFormat) {
            return base.Post(contract.tasks.create(), null, getParams(this.Create));
        },
        Get: function (tasksId) {
            var result = base.Get(contract.tasks.item(tasksId));
            return Convert(result, new FileDownloadTask());
        },
        Delete: function (tasksId) {
            return base.Delete(contract.tasks.item(tasksId));
        },
        Data: function (tasksId) {
            return contract.tasks.data(tasksId);
        },
        Records: {
            List: function (pageIndex, pageSize, beginTime, endTime, deviceId, userName) {
                var result = base.Get(contract.tasks.records.list(), getParams(this.List));
                return Convert(result, new FileDownloadTaskRecordList());
            },
            Get: function (tasksId) {
                var result = base.Get(contract.tasks.records.item(tasksId));
                return Convert(result, new FileDownloadTaskRecord());
            }
        }
    };
}