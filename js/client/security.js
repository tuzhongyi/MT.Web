/// <reference path="../howell.js/howell.js" />
/// <reference path="struct.js" />




(function () {

    var hadScript =
    {
        httpService: "/js/howell.js/httpService.js",
        convert: "/js/howell.js/howell.convert.js",
        BaseClient: "/js/client/BaseClient.js",
    };
    for (var id in hadScript) {
        if (!document.getElementById(id)) {
            loadJS(id, document.location.protocol + "//" + document.location.host + hadScript[id]);
        }
    }
})();




function SecurityClient(host, port) {
    var baseUri = "http://" + host + (port ? ":" + port : "") + "/howell/ver10/data_service/security";

    var base = new BaseClient();

    var contract =
    {
        version: baseUri + "/System/Version",
        reboot: baseUri + "/Reboot",
        shutdown: baseUri + "/Shutdown",
        user:
        {
            list: function () {
                return baseUri + "/Users";
            },
            item: function (userId) {
                return baseUri + "/Users/" + userId;
            },
            del: function (userId) {
                return baseUri + "/Users/" + userId + "/Delete";
            },
            priority: {
                copyfrom: function (userId) {
                    return contract.user.item(userId) + "/Priority/CopyFrom";
                }
            },
            groups: {
                list: function (userId) {
                    return contract.user.item(userId) + "/Groups";
                },
                item: function (userId, groupsId) {
                    return this.list(userId) + "/" + groupsId;
                }
            },
            session: {
                item: function () {
                    /// <signature>
                    /// <summary>用户会话 v2.1</summary>
                    /// </signature>
                    return baseUri + "/Users/Sessions"
                },
                current: function () {
                    return this.item() + "/Current";
                }
            },
            status:
            {
                list: function () {
                    return baseUri + "/Users/Status";
                },
                item: function (id) {
                    return baseUri + "/Users/" + id + "/Status";
                }
            },
            department:
            {
                list: function (userId) {
                    return baseUri + "/Users/" + userId + "/Departments";
                },
                item: function (userId, departmentId) {
                    return baseUri + "/Users/" + userId + "/Departments/" + departmentId;
                },
                del: function (userId, departmentId) {
                    return baseUri + "/Users/" + userId + "/Departments/" + departmentId + "/Delete";
                }
            },
            device:
            {
                list: function (userId) {
                    return baseUri + "/Users/" + userId + "/Devices";
                },
                item: function (userId, deviceId) {
                    return baseUri + "/Users/" + userId + "/Devices/" + deviceId;
                },
                del: function (userId, deviceId) {
                    return baseUri + "/Users/" + userId + "/Devices/" + deviceId + "/Delete";
                }
            },
            map:
            {
                list: function (userId) {
                    return baseUri + "/Users/" + userId + "/Maps";
                },
                item: function (userId, mapId) {
                    return baseUri + "/Users/" + userId + "/Maps/" + mapId;
                },
                group:
                {
                    list: function (userId) {
                        return baseUri + "/Users/" + userId + "/Maps/Groups";
                    },
                    item: function (userId, groupId) {
                        return baseUri + "/Users/" + userId + "/Maps/Groups/" + groupId + "";
                    },

                    child: function (userId, groupId) {
                        return baseUri + "/Users/" + userId + "/Maps/Groups/" + groupId + "/ChildGroups";
                    },
                    map:
                    {
                        list: function (userId, groupId) {
                            return baseUri + "/Users/" + userId + "/Maps/Groups/" + groupId + "/Maps";
                        },
                        item: function (userId, groupId, mapId) {
                            return baseUri + "/Users/" + userId + "/Maps/Groups/" + groupId + "/Maps/" + mapId;
                        }
                    }
                }
            },
            video:
            {
                input:
                {
                    list: function (userId) {
                        return baseUri + "/Users/" + userId + "/Video/Inputs/Channels";
                    },
                    item: function (userId, channelId) {
                        return baseUri + "/Users/" + userId + "/Video/Inputs/Channels/" + channelId + "";
                    },
                    group:
                    {
                        list: function (userId) {
                            return baseUri + "/Users/" + userId + "/Video/Inputs/Channels/Groups";
                        },
                        item: function (userId, groupId) {
                            return baseUri + "/Users/" + userId + "/Video/Inputs/Channels/Groups/" + groupId + "";
                        },
                        child: function (userId, groupId) {
                            return baseUri + "/Users/" + userId + "/Video/Inputs/Channels/Groups/" + groupId + "/ChildGroups";;
                        },
                        channel:
                        {
                            list: function (userId, groupId) {
                                return baseUri + "/Users/" + userId + "/Video/Inputs/Channels/Groups/" + groupId + "/Channels";
                            },
                            item: function (userId, groupId, channelId) {
                                return baseUri + "Users/" + userId + "/Video/Inputs/Channels/Groups/" + groupId + "/Channels/" + channelId + "";
                            }
                        }
                    }
                },
                output:
                {
                    list: function (userId) {
                        return baseUri + "/Users/" + userId + "/Video/Outputs/Channels";
                    },
                    item: function (userId, channelId) {
                        return baseUri + "/Users/" + userId + "/Video/Outputs/Channels/" + channelId + "";
                    }
                },
            },
            linkage:
            {
                list: function (userId) {
                    return baseUri + "/Users/" + userId + "/Linkages";
                },
                item: function (userId, linkageId) {
                    return baseUri + "/Users/" + userId + "/Linkages/" + linkageId + "";
                }
            },
            io:
            {
                input:
                {
                    list: function (userId) {
                        return baseUri + "/Users/" + userId + "/IO/Inputs/Channels";
                    },
                    item: function (userId, channelId) {
                        return baseUri + "/Users/" + userId + "/IO/Inputs/Channels/" + channelId + "";
                    }

                },
                output:
                {
                    list: function (userId) {
                        return baseUri + "/Users/" + userId + "/IO/Outputs/Channels";
                    },
                    item: function (userId, channelId) {
                        return baseUri + "/Users/" + userId + "/IO/Outputs/Channels/" + channelId + "";
                    }

                },
            },
        },
        department:
        {
            list: function (departmentId) {
                return baseUri + "/Departments";
            },
            item: function (departmentId) {
                return baseUri + "/Departments/" + departmentId + "";
            },
            del: function (departmentId) {
                return baseUri + "/Departments/" + departmentId + "/Delete";
            },
            user:
            {
                list: function (departmentId) {
                    return baseUri + "/Departments/" + departmentId + "/Users";
                },
                item: function (departmentId, userId) {
                    return baseUri + "/Departments/" + departmentId + "/Users/" + userId;
                },
                del: function (departmentId, userId) {
                    return baseUri + "/Departments/" + departmentId + "/Users/" + userId + "/Delete";
                }
            },
            device:
            {
                list: function (departmentId) {
                    return baseUri + "/Departments/" + departmentId + "/Devices";
                },
                item: function (departmentId, deviceId) {
                    return baseUri + "/Departments/" + departmentId + "/Devices/" + deviceId;
                },
                del: function (departmentId, deviceId) {
                    return baseUri + "/Departments/" + departmentId + "/Devices/" + deviceId + "/Delete";
                }
            },
            map:
            {
                list: function (departmentId) {
                    return baseUri + "/Departments/" + departmentId + "/Maps";
                },
                item: function (departmentId, mapId) {
                    return baseUri + "/Departments/" + departmentId + "/Maps/" + mapId + "";
                },
                group:
                {
                    list: function (departmentId) {
                        return baseUri + "/Departments/" + departmentId + "/Maps/Groups";
                    },
                    item: function (departmentId, groupId) {
                        return baseUri + "/Departments/" + departmentId + "/Maps/Groups/" + groupId + "";
                    },
                    child: function (departmentId, groupId) {
                        return baseUri + "/Departments/" + departmentId + "/Maps/Groups/" + groupId + "/ChildGroups";
                    },
                    map:
                    {
                        list: function (departmentId, groupId) {
                            return baseUri + "/Departments/" + departmentId + "/Maps/Groups/" + groupId + "/Maps";
                        },
                        item: function (departmentId, groupId, mapId) {
                            return baseUri + "/Departments/" + departmentId + "/Maps/Groups/" + groupId + "/Maps/" + mapId + "";
                        }
                    }
                }
            },
            video:
            {
                input:
                {

                    list: function (departmentId) {
                        return baseUri + "/Departments/" + departmentId + "/Video/Inputs/Channels";
                    },
                    item: function (departmentId, channelId) {
                        return baseUri + "/Departments/" + departmentId + "/Video/Inputs/Channels/" + channelId + "";
                    },
                    group:
                    {
                        list: function (departmentId) {
                            return baseUri + "/Departments/" + departmentId + "/Video/Inputs/Channels/Groups";
                        },
                        item: function (departmentId, groupId) {
                            return baseUri + "Departments/" + departmentId + "/Video/Inputs/Channels/Groups/" + groupId + "";
                        },
                        child: function (departmentId, groupId) {
                            return baseUri + "/Departments/" + departmentId + "/Video/Inputs/Channels/Groups/" + groupId + "/ChildGroups";
                        },
                        channel:
                        {
                            list: function (departmentId, groupId) {
                                return baseUri + "/Departments/" + departmentId + "/Video/Inputs/Channels/Groups/" + groupId + "/Channels";
                            },
                            item: function (departmentId, groupId, channelId) {
                                return baseUri + "/Departments/" + departmentId + "/Video/Inputs/Channels/Groups/" + groupId + "/Channels/" + channelId + "";
                            }
                        }

                    }
                },
                output:
                {
                    list: function (departmentId) {
                        return baseUri + "/Departments/" + departmentId + "/Video/Outputs/Channels";
                    },
                    item: function (departmentId, channelId) {
                        return baseUri + "/Departments/" + departmentId + "/Video/Outputs/Channels/" + channelId + "";
                    }
                }
            },
            io:
            {
                input:
                {
                    list: function (departmentId) {
                        return baseUri + "/Departments/" + departmentId + "/IO/Inputs/Channels";
                    },
                    item: function (departmentId, channelId) {
                        return baseUri + "/Departments/" + departmentId + "/IO/Inputs/Channels/" + channelId + "";
                    }

                },
                output:
                {
                    list: function (departmentId) {
                        return baseUri + "/Departments/" + departmentId + "/IO/Outputs/Channels";
                    },
                    item: function (departmentId, channelId) {
                        return baseUri + "/Departments/" + departmentId + "/IO/Outputs/Channels/" + channelId + "";
                    }

                },
            },
            linkage:
            {
                list: function (departmentId) {
                    return baseUri + "/Departments/" + departmentId + "/Linkages";
                },
                item: function (departmentId, linkageId) {
                    return baseUri + "/Departments/" + departmentId + "/Linkages/" + linkageId + "";
                }
            }
        },
        permission:
        {
            video:
            {
                input:
                {
                    user:
                    {
                        list: function (channelId) {
                            return baseUri + "/Permissions/Video/Inputs/Channels/" + channelId + "/Users";
                        },
                        item: function (channelId, userId) {
                            return baseUri + "/Permissions/Video/Inputs/Channels/" + channelId + "/Users/" + userId + "";
                        },
                        del: function (channelId, userId) {
                            return baseUri + "/Permissions/Video/Inputs/Channels/" + channelId + "/Users/" + userId + "/Delete";
                        }
                    },
                    department:
                    {
                        list: function (channelId) {
                            return baseUri + "/Permissions/Video/Inputs/Channels/" + channelId + "/Departments";
                        },
                        item: function (channelId, departmentId) {
                            return baseUri + "/Permissions/Video/Inputs/Channels/" + channelId + "/Departments/" + departmentId + "";
                        },
                        del: function (channelId, departmentId) {
                            return baseUri + "/Permissions/Video/Inputs/Channels/" + channelId + "/Departments/" + departmentId + "/Delete";
                        }
                    }

                },
                output:
                {
                    user:
                    {
                        list: function (channelId) {
                            return baseUri + "/Permissions/Video/Outputs/Channels/" + channelId + "/Users";
                        },
                        item: function (channelId, userId) {
                            return baseUri + "/Permissions/Video/Outputs/Channels/" + channelId + "/Users/" + userId + "";
                        },
                        del: function (channelId, userId) {
                            return baseUri + "/Permissions/Video/Outputs/Channels/" + channelId + "/Users/" + userId + "/Delete";
                        }
                    },
                    department:
                    {
                        list: function (channelId) {
                            return baseUri + "/Permissions/Video/Outputs/Channels/" + channelId + "/Departments";
                        },
                        item: function (channelId, departmentId) {
                            return baseUri + "/Permissions/Video/Outputs/Channels/" + channelId + "/Departments/" + departmentId + "";
                        },
                        del: function (channelId, departmentId) {
                            return baseUri + "/Permissions/Video/Outputs/Channels/" + channelId + "/Departments/" + departmentId + "/Delete"
                        }
                    }
                }
            },
            io:
            {
                input:
                {
                    user:
                    {
                        list: function (channelId) {
                            return baseUri + "/Permissions/IO/Inputs/Channels/" + channelId + "/Users";
                        },
                        item: function (channelId, userId) {
                            return baseUri + "/Permissions/IO/Inputs/Channels/" + channelId + "/Users/" + userId + "";
                        },
                        del: function (channelId, userId) {
                            return baseUri + "/Permissions/IO/Inputs/Channels/" + channelId + "/Users/" + userId + "/Delete";
                        }
                    },
                    department:
                    {
                        list: function (channelId) {
                            return baseUri + "/Permissions/IO/Inputs/Channels/" + channelId + "/Departments";
                        },
                        item: function (channelId, departmentId) {
                            return baseUri + "/Permissions/IO/Inputs/Channels/" + channelId + "/Departments/" + departmentId + "";
                        },
                        del: function (channelId, departmentId) {
                            return baseUri + "/Permissions/IO/Inputs/Channels/" + channelId + "/Departments/" + departmentId + "/Delete";
                        }
                    }

                },
                output:
                {
                    user:
                    {
                        list: function (channelId) {
                            return baseUri + "/Permissions/IO/Outputs/Channels/" + channelId + "/Users";
                        },
                        item: function (channelId, userId) {
                            return baseUri + "/Permissions/IO/Outputs/Channels/" + channelId + "/Users/" + userId + "";
                        },
                        del: function (channelId, userId) {
                            return baseUri + "/Permissions/IO/Outputs/Channels/" + channelId + "/Users/" + userId + "/Delete";
                        }
                    },
                    department:
                    {
                        list: function (channelId) {
                            return baseUri + "/Permissions/IO/Outputs/Channels/" + channelId + "/Departments";
                        },
                        item: function (channelId, departmentId) {
                            return baseUri + "/Permissions/IO/Outputs/Channels/" + channelId + "/Departments/" + departmentId + "";
                        },
                        del: function (channelId, departmentId) {
                            return baseUri + "/Permissions/IO/Outputs/Channels/" + channelId + "/Departments/" + departmentId + "/Delete"
                        }
                    }
                }
            },
            device:
            {
                user:
                {
                    list: function (deviceId) {
                        return baseUri + "/Permissions/Devices/" + deviceId + "/Users";
                    },
                    item: function (deviceId, userId) {
                        return baseUri + "/Permissions/Devices/" + deviceId + "/Users/" + userId + "";
                    },
                    del: function (deviceId, userId) {
                        return baseUri + "/Permissions/Devices/" + deviceId + "/Users/" + userId + "/Delete";
                    }
                },
                department:
                {
                    list: function (deviceId) {
                        return baseUri + "/Permissions/Devices/" + deviceId + "/Departments";
                    },
                    item: function (deviceId, departmentId) {
                        return baseUri + "/Permissions/Devices/" + deviceId + "/Departments/" + departmentId + "";
                    },
                    del: function (deviceId, departmentId) {
                        return baseUri + "/Permissions/Devices/" + deviceId + "/Departments/" + departmentId + "/Delete";
                    }
                }
            }
        }
    };


    this.getVersion = function () {
        var result = base.Get(contract.version);
        return Convert(result, new ServiceVersion());
    }

    this.Reboot = function () {
        var result = base.Post(contract.reboot);
    }

    this.Shutdown = function () {
        var result = base.Post(contract.shutdown);
    }

    this.User =
    {
        List: function (pageIndex, pageSize, permission, search) {
            var result = base.Get(contract.user.list(), getParams(this.List));
            return Convert(result, new UserList());
        },
        Get: function (userId) {
            var result = base.Get(contract.user.item(userId));
            return Convert(result, new User());
        },
        Set: function (user) {
            return base.Put(contract.user.item(user.Id), user);
        },
        Create: function (user) {
            return base.Post(contract.user.list(), user);
        },
        Delete: function (userId) {
            return base.Delete(contract.user.item(userId));
        },
        Priority: {
            CopyFrom: function (userId, sufferUserId) {
                /// <summary>将指定的用户权限拷贝到当前用户上</summary>
                /// <param name="userId" type="Id">用户Id</param>
                /// <param name="sufferUserId" type="Id">被拷贝的用户Id</param>
                /// <returns type="Fault">错误信息</returns>
                return base.Post(contract.user.priority.copyfrom(userId), sufferUserId);
            }
        },
        Groups: {
            List: function (userId, pageIndex, pageSize, groupType) {
                /// <summary>获取分组信息</summary>
                /// <param name="userId" type="Id">用户Id</param>
                /// <param name="pageIndex" type="Int32">页码[1-n]</param>
                /// <param name="pageSize" type="Int32">分页大小[1-100]</param>
                /// <param name="groupType" type="GroupType">分组类型</param>
                /// <returns type="Security.GroupList">分组信息</returns>
                var result = base.Get(contract.user.groups.list(userId), getParams(this.List, 1));
                return Convert(result, new Security.GroupList());
            },
            Create: function (userId, group) {
                /// <summary>创建分组信息</summary>
                /// <param name="userId" type="Id">用户Id</param>
                /// <param name="group" type="Security.Group">分组信息</param>
                /// <returns type="Fault">错误信息</returns>
                return base.Post(contract.user.groups.list(userId), group);
            },
            Delete: function (userId, groupId) {
                /// <summary>删除分组信息</summary>
                /// <param name="userId" type="Id">用户Id</param>
                /// <param name="groupId" type="Id">分组Id</param>
                /// <returns type="Fault">错误信息</returns>
                return base.Delete(contract.user.groups.item(userId, groupId));
            },
            Set: function (userId, groupId, group) {
                /// <summary>设置分组信息</summary>
                /// <param name="userId" type="Id">用户Id</param>
                /// <param name="groupId" type="Id">分组Id</param>
                /// <param name="group" type="Security.Group">分组信息</param>
                /// <returns type="Fault">错误信息</returns>
                return base.Put(contract.user.groups.item(userId, groupId), group);
            },
            Get: function (userId, groupId) {
                /// <summary>获取分组信息</summary>
                /// <param name="userId" type="Id">用户Id</param>
                /// <param name="groupId" type="Id">分组Id</param>
                /// <returns type="Security.Group">分组项</returns>
                var result = base.Get(contract.user.groups.item(userId, groupId));
                return Convert(result, new Security.Group());
            }
        },
        Session: {
            List: function (userId, beginTime, endTime, pageIndex, pageSize) {
                /// <summary>查询当前在线用户会话信息</summary>
                /// <param name="userId" type="Id">用户Id</param>
                /// <param name="beginTime" type="Date">开始时间</param>
                /// <param name="endTime" type="Date">结束时间</param>
                /// <param name="pageIndex" type="Int32">页码[1-n]</param>
                /// <param name="pageSize" type="Int32">分页大小[1-100]</param>
                /// <returns type="UserSessionList">在线状态</returns>
                var result = base.Get(contract.user.session.item(), getParams(this.Get));
                return Convert(result, new UserSessionList());
            },
            Current: function (userId, pageIndex, pageSize) {
                /// <summary>查询当前在线用户会话信息</summary>
                /// <param name="userId" type="Id">用户Id</param>
                /// <param name="pageIndex" type="Int32">页码[1-n]</param>
                /// <param name="pageSize" type="Int32">分页大小[1-100]</param>
                /// <returns type="UserSessionList">在线状态</returns>
                var result = base.Get(contract.user.session.current(), getParams(this.Current))
            }
        },
        Status: {
            List: function (isOnline, pageIndex, pageSize) {
                /// <summary>查询用户在线状态</summary>
                /// <param name="isOnline" type="Boolean">是否在线</param>
                /// <param name="PageIndex" type="Int32">页码[1-n]</param>
                /// <param name="PageSize" type="Int32">分页大小[1-100]</param>
                /// <returns type="UserStatus">在线状态</returns>
                var result = base.Get(contract.user.status.list(), getParams(this.List));
                return Convert(result, new UserStatusList());
            },
            Get: function (userId) {
                /// <summary>查询用户在线状态</summary>
                /// <param name="userId" type="Id">用户Id</param>
                /// <returns type="UserStatus">在线状态</returns>
                var result = base.Get(contract.user.status.item(userId));
                return Convert(result, new UserStatus());
            }
        },
        Department:
        {
            List: function (userId, pageIndex, pageSize, permission, inversed) {
                var result = base.Get(contract.user.department.list(userId), getParams(this.List, 1));
                return Convert(result, new DepartmentList());
            },
            Get: function (userId, departmentId) {
                var result = base.Get(contract.user.department.item(userId, departmentId));
                return Convert(result, new Department());
            },
            Association: function (userId, departmentId) {
                return base.Post(contract.user.department.item(userId, departmentId));
            },
            Delete: function (userId, departmentId) {
                return base.Delete(contract.user.department.item(userId, departmentId));
            }
        },
        Device:
        {
            List: function (userId, pageIndex, pageSize, inversed) {
                var result = base.Get(contract.user.device.list(userId), getParams(this.List, 1));
                return Convert(result, new DeviceList());
            },
            Create: function (userId, devicePermission) {
                return base.Post(contract.user.device.list(userId), devicePermission);
            },
            Get: function (userId, deviceId) {
                var result = base.Get(contract.user.device.item(userId, deviceId));
                return Convert(result, new Device());
            },
            Set: function (userId, devicePermission) {
                return base.Put(contract.user.device.item(userId, devicePermission.Id), devicePermission);
            },
            Delete: function (userId, deviceId) {
                return base.Delete(contract.user.device.item(userId, deviceId));
            }
        },
        Map:
        {
            List: function (userId, pageIndex, pageSize, inversed) {
                var result = base.Get(contract.user.map.list(userId), getParams(this.List, 1));
                return Convert(result, new MapList());
            },
            Get: function (userId, mapId) {
                var result = base.Get(contract.user.map.item(userId, mapId));
                return Convert(result, new Map());
            },
            Association: function (userId, mapId) {
                return base.Post(contract.user.map.item(userId, mapId));
            },
            Set: function (userId, map) {
                return base.Put(contract.user.map.item(userId, map.Id), map);
            },
            Delete: function (userId, mapId) {
                return base.Delete(contract.user.map.item(userId, mapId));
            },
            Group:
            {
                List: function (userId, pageIndex, pageSize) {
                    var result = base.Get(contract.user.map.group.list(userId), getParams(this.List, 1));
                    return Convert(result, new MapGroupList());
                },
                Create: function (userId, group) {
                    return base.Post(contract.user.map.group.list(userId), group);
                },
                Get: function (userId, groupId) {
                    var result = base.Get(contract.user.map.group.item(userId, groupId));
                    return Convert(result, new MapGroup());
                },
                Set: function (userId, group) {
                    return base.Put(contract.user.map.group.item(userId, group.Id), group);
                },
                Delete: function (userId, groupId) {
                    return base.Delete(contract.user.map.group.item(userId, groupId));
                },
                Child: function (userId, groupId, pageIndex, pageSize) {
                    var result = base.Get(contract.user.map.group.child(userId, groupId));
                    return Convert(result, new MapGroupList());
                },
                Map:
                {
                    List: function (userId, groupId, pageIndex, pageSize) {
                        var result = base.Get(contract.user.map.group.map.list(userId, groupId));
                        return Convert(result, new MapList());
                    },
                    Get: function (userId, groupId, mapId) {
                        var result = base.Get(contract.user.map.group.map.item(userId, groupId, mapId));
                        return Convert(result, new Map());
                    },
                    Association: function (userId, groupId, mapId) {
                        return base.Post(contract.user.map.group.map.item(userId, groupId, mapId));
                    },
                    Delete: function (userId, groupId, mapId) {
                        return base.Delete(contract.user.map.group.map.item(userId, groupId, mapId));
                    }
                }
            }
        },
        IO:
        {
            Input:
            {
                List: function (userId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.user.io.input.list(userId), getParams(this.List, 1));
                    return Convert(result, new IOInputChannelPermissionList());
                },
                Create: function (userId, input) {
                    return base.Post(contract.user.io.input.list(userId), input);
                },
                Get: function (userId, inputId) {
                    var result = base.Get(contract.user.io.input.item(userId, inputId));
                    return Convert(result, new IOInputChannelPermission());
                },
                Set: function (userId, input) {
                    return base.Put(contract.user.io.input.item(userId, input.Id), input);
                },
                Delete: function (userId, inputId) {
                    return base.Delete(contract.user.io.input.item(userId, inputId));
                },
            },
            Output:
            {
                List: function (userId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.user.io.output.list(userId), getParams(this.List, 1));
                    return Convert(result, new IOOutputChannelPermissionList());
                },
                Create: function (userId, output) {
                    return base.Post(contract.user.io.output.list(userId), output);
                },
                Get: function (userId, outputId) {
                    var result = base.Get(contract.user.io.output.item(userId, outputId));
                    return Convert(result, new IOOutputChannelPermission());
                },
                Set: function (userId, output) {
                    return base.Put(contract.user.io.output.item(userId, output.Id), output);
                },
                Delete: function (userId, outputId) {
                    return base.Delete(contract.user.io.output.item(userId, outputId));
                }
            }
        },
        Video:
        {
            Input:
            {
                List: function (userId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.user.video.input.list(userId), getParams(this.List, 1));
                    return Convert(result, new VideoInputChannelPermissionList());
                },
                Create: function (userId, input) {
                    return base.Post(contract.user.video.input.list(userId), input);
                },
                Get: function (userId, inputId) {
                    var result = base.Get(contract.user.video.input.item(userId, inputId));
                    return Convert(result, new VideoInputChannelPermission());
                },
                Set: function (userId, input) {
                    return base.Put(contract.user.video.input.item(userId, input.Id), input);
                },
                Delete: function (userId, inputId) {
                    return base.Delete(contract.user.video.input.item(userId, inputId));
                },
                Group:
                {
                    List: function (userId, pageIndex, pageSize) {
                        var result = base.Get(contract.user.video.input.group.list(userId), getParams(this.List, 1));
                        return Convert(result, new VideoInputChannelGroupList());
                    },
                    Create: function (userId, group) {
                        return base.Post(contract.user.video.input.group.list(userId), group);
                    },
                    Get: function (userId, groupId) {
                        var result = base.Get(contract.user.video.input.group.item(userId, groupId));
                        return Convert(result, new VideoInputChannelGroup());
                    },
                    Set: function (userId, group) {
                        return base.Put(contract.user.video.input.group.item(userId, group.Id), group);
                    },
                    Delete: function (userId, groupId) {
                        return base.Delete(contract.user.video.input.group.item(userId, groupId));
                    },
                    Child: function (userId, groupId, pageIndex, pageSize) {
                        var result = base.Get(contract.user.video.input.group.child(userId, groupId), getParams(this.Child, 2));
                        return Convert(result, new VideoInputChannelGroupList());
                    },
                    Channel:
                    {
                        List: function (userId, groupId, pageIndex, pageSize) {
                            var result = base.Get(contract.user.video.input.group.channel.list(userId, groupId), getParams(this.List, 2));
                            return Convert(result, new VideoInputChannelGroupList());
                        },
                        Get: function (userId, groupId, channelId) {
                            var result = base.Get(contract.user.video.input.group.channel.item(userId, groupId, channelId));
                            return Convert(result, new VideoInputChannelGroup());
                        },
                        Association: function (userId, groupId, channelId) {
                            return base.Post(contract.user.video.input.group.channel.item(userId, groupId, channelId))
                        },
                        Delete: function (userId, groupId, channelId) {
                            return base.Delete(contract.user.video.input.group.channel.item(userId, groupId, channelId))
                        }
                    }
                }
            },
            Output:
            {
                List: function (userId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.user.video.output.list(userId), getParams(this.List, 1));
                    return Convert(result, new VideoOutputChannelPermissionList());
                },
                Create: function (userId, output) {
                    return base.Post(contract.user.video.output.list(userId), output);
                },
                Get: function (userId, outputId) {
                    var result = base.Get(contract.user.video.output.item(userId, outputId));
                    return Convert(result, new VideoOutputChannelPermission());
                },
                Set: function (userId, output) {
                    return base.Put(contract.user.video.output.item(userId, output.Id), output);
                },
                Delete: function (userId, outputId) {
                    return base.Delete(contract.user.video.output.item(userId, outputId));
                }
            }
        },
        Linkage:
        {
            List: function (userId, pageIndex, pageSize) {
                var result = base.Get(contract.user.linkage.list(userId), getParams(this.List, 1));
                return Convert(result, new LinkageList());
            },
            Create: function (userId, linkage) {
                return base.Post(contract.user.linkage.list(userId), linkage);
            },
            Get: function (userId, linkageId) {
                var result = base.Get(contract.user.linkage.item(userId, linkageId));
                return Convert(result, new Linkage());
            },
            Set: function (userId, linkage) {
                return base.Put(contract.user.linkage.item(userId, linkage.Id), linkage);
            },
            Delete: function (userId, linkageId) {
                return base.Delete(contract.user.linkage.item(userId, linkageId));
            }
        }
    };

    this.Department = {
        List: function (pageIndex, pageSize, permission, search) {
            var result = base.Get(contract.department.list(), getParams(this.List))
            return Convert(result, new DepartmentList());
        },
        Create: function (department) {
            return base.Post(contract.department.list(), department);
        },
        Get: function (departmentId) {
            var result = base.Get(contract.department.item(departmentId));
            return Convert(result, new Department());
        },
        Delete: function (departmentId) {
            return base.Delete(contract.department.item(departmentId));
        },
        Set: function (department) {
            return base.Put(contract.department.item(department.Id), department);
        },
        User:
        {
            List: function (departmentId, pageIndex, pageSize, permission, inversed) {
                var result = base.Get(contract.department.user.list(departmentId), getParams(this.List, 1));
                return Convert(result, new UserList());
            },
            Get: function (departmentId, userId) {
                var result = base.Get(contract.department.user.item(departmentId, userId));
                return Convert(result, new User());
            },
            Association: function (departmentId, userId) {
                return base.Post(contract.department.user.item(departmentId, userId));
            },
            Delete: function (departmentId, userId) {
                return base.Delete(contract.department.user.item(departmentId, userId));
            }
        },
        Device:
        {
            List: function (departmentId, pageIndex, pageSize, inversed) {
                var result = base.Get(contract.department.device.list(departmentId), getParams(this.List, 1));
                return Convert(result, new DeviceList());
            },
            Get: function (departmentId, deviceId) {
                var result = base.Get(contract.department.device.item(departmentId, deviceId));
                return Convert(result, new Device());
            },
            Create: function (departmentId, device) {
                return base.Post(contract.department.device.list(departmentId), device);
            },
            Set: function (departmentId, device) {
                return base.Put(contract.department.device.item(departmentId, device.Id), device);
            },
            Delete: function (departmentId, deviceId) {
                return base.Delete(contract.department.device.item(departmentId, deviceId));
            }
        },
        Map:
        {
            List: function (departmentId, pageIndex, pageSize, inversed) {
                var result = base.Get(contract.department.map.list(departmentId), getParams(this.List, 1));
                return Convert(result, new MapList());
            },
            Get: function (departmentId, mapId) {
                var result = base.Get(contract.department.map.item(departmentId, mapId));
                return Convert(result, new Map());
            },
            Association: function (departmentId, mapId) {
                return base.Post(contract.department.map.item(departmentId, mapId));
            },
            Set: function (departmentId, map) {
                return base.Put(contract.department.map.item(departmentId, map.Id), map);
            },
            Delete: function (departmentId, mapId) {
                return base.Delete(contract.department.map.item(departmentId, mapId));
            },
            Group:
            {
                List: function (departmentId, pageIndex, pageSize) {
                    var result = base.Get(contract.department.map.group.list(departmentId), getParams(this.List, 1));
                    return Convert(result, new MapGroupList());
                },
                Create: function (departmentId, group) {
                    return base.Post(contract.department.map.group.list(departmentId), group);
                },
                Get: function (departmentId, groupId) {
                    var result = base.Get(contract.department.map.group.item(departmentId, groupId));
                    return Convert(result, new MapGroup());
                },
                Set: function (departmentId, group) {
                    return base.Put(contract.department.map.group.item(departmentId, group.Id), group);
                },
                Delete: function (departmentId, groupId) {
                    return base.Delete(contract.department.map.group.item(departmentId, groupId));
                },
                Child: function (departmentId, groupId, pageIndex, pageSize) {
                    var result = base.Get(contract.department.map.group.child(departmentId, groupId));
                    return Convert(result, new MapGroupList());
                },
                Map:
                {
                    List: function (departmentId, groupId, pageIndex, pageSize) {
                        var result = base.Get(contract.department.map.group.map.list(departmentId, groupId));
                        return Convert(result, new MapGroupList());
                    },
                    Get: function (departmentId, groupId, mapId) {
                        var result = base.Get(contract.department.map.group.map.item(departmentId, groupId, mapId));
                        return Convert(result, new MapGroup());
                    },
                    Association: function (departmentId, groupId, mapId) {
                        return base.Post(contract.department.map.group.map.item(departmentId, groupId, mapId));
                    },
                    Delete: function (departmentId, groupId, mapId) {
                        return base.Delete(contract.department.map.group.map.item(departmentId, groupId, mapId));
                    }
                }
            }
        },
        Video:
        {
            Input:
            {
                List: function (departmentId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.department.video.input.list(departmentId), getParams(this.List, 1));
                    return Convert(result, new VideoInputChannelPermissionList());
                },
                Create: function (departmentId, input) {
                    return base.Post(contract.department.video.input.list(departmentId), input);
                },
                Get: function (departmentId, inputId) {
                    var result = base.Get(contract.department.video.input.item(departmentId, inputId));
                    return Convert(result, new VideoInputChannelPermission());
                },
                Set: function (departmentId, input) {
                    return base.Put(contract.department.video.input.item(departmentId, input.Id), input);
                },
                Delete: function (departmentId, inputId) {
                    return base.Delete(contract.department.video.input.item(departmentId, inputId));
                },
                Group:
                {
                    List: function (departmentId, pageIndex, pageSize) {
                        var result = base.Get(contract.department.video.input.group.list(departmentId), getParams(this.List, 1));
                        return Convert(result, new VideoInputChannelGroupList());
                    },
                    Create: function (departmentId, group) {
                        return base.Post(contract.department.video.input.group.list(departmentId), group);
                    },
                    Get: function (departmentId, groupId) {
                        var result = base.Get(contract.department.video.input.group.item(departmentId, groupId));
                        return Convert(result, new VideoInputChannelGroup());
                    },
                    Set: function (departmentId, group) {
                        return base.Put(contract.department.video.input.group.item(departmentId, group.Id), group);
                    },
                    Delete: function (departmentId, groupId) {
                        return base.Delete(contract.department.video.input.group.item(departmentId, groupId));
                    },
                    Child: function (departmentId, groupId, pageIndex, pageSize) {
                        var result = base.Get(contract.department.video.input.group.child(departmentId, groupId), getParams(this.Child, 2));
                        return Convert(result, new VideoInputChannelGroupList());
                    },
                    Channel:
                    {
                        List: function (departmentId, groupId, pageIndex, pageSize) {
                            var result = base.Get(contract.department.video.input.group.channel.list(departmentId, groupId), getParams(this.List, 2));
                            return Convert(result, new VideoInputChannelGroupList());
                        },
                        Get: function (departmentId, groupId, channelId) {
                            var result = base.Get(contract.department.video.input.group.channel.item(departmentId, groupId, channelId));
                            return Convert(result, new VideoInputChannelGroup());
                        },
                        Association: function (departmentId, groupId, channelId) {
                            return base.Post(contract.department.video.input.group.channel.item(departmentId, groupId, channelId))
                        },
                        Delete: function (departmentId, groupId, channelId) {
                            return base.Delete(contract.department.video.input.group.channel.item(departmentId, groupId, channelId))
                        }
                    }
                }
            },
            Output:
            {
                List: function (departmentId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.department.video.output.list(departmentId), getParams(this.List, 1));
                    return Convert(result, new VideoOutputChannelPermissionList());
                },
                Create: function (departmentId, output) {
                    return base.Post(contract.department.video.output.list(departmentId), output);
                },
                Get: function (departmentId, outputId) {
                    var result = base.Get(contract.department.video.output.item(departmentId, outputId));
                    return Convert(result, new VideoOutputChannelPermission());
                },
                Set: function (departmentId, output) {
                    return base.Put(contract.department.video.output.item(departmentId, output.Id), output);
                },
                Delete: function (departmentId, outputId) {
                    return base.Delete(contract.department.video.output.item(departmentId, outputId));
                }
            }
        },
        IO:
        {
            Input:
            {
                List: function (departmentId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.department.io.input.list(departmentId), getParams(this.List, 1));
                    return Convert(result, new IOInputChannelPermissionList());
                },
                Create: function (departmentId, input) {
                    return base.Post(contract.department.io.input.list(departmentId), input);
                },
                Get: function (departmentId, inputId) {
                    var result = base.Get(contract.department.io.input.item(departmentId, inputId));
                    return Convert(result, new IOInputChannelPermission());
                },
                Set: function (departmentId, input) {
                    return base.Put(contract.department.io.input.item(departmentId, input.Id), input);
                },
                Delete: function (departmentId, inputId) {
                    return base.Delete(contract.department.io.input.item(departmentId, inputId));
                },
            },
            Output:
            {
                List: function (departmentId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.department.io.output.list(departmentId), getParams(this.List, 1));
                    return Convert(result, new IOOutputChannelPermissionList());
                },
                Create: function (departmentId, output) {
                    return base.Post(contract.department.io.output.list(departmentId), output);
                },
                Get: function (departmentId, outputId) {
                    var result = base.Get(contract.department.io.output.item(departmentId, outputId));
                    return Convert(result, new IOOutputChannelPermission());
                },
                Set: function (departmentId, output) {
                    return base.Put(contract.department.io.output.item(departmentId, output.Id), output);
                },
                Delete: function (departmentId, outputId) {
                    return base.Delete(contract.department.io.output.item(departmentId, outputId));
                }
            }
        },


        Linkage:
        {
            List: function (departmentId, pageIndex, pageSize) {
                var result = base.Get(contract.department.linkage.list(departmentId), getParams(this.List, 1));
                return Convert(result, new LinkageList());
            },
            Create: function (departmentId, linkage) {
                return base.Post(contract.department.linkage.list(departmentId), linkage);

            },
            Get: function (departmentId, linkageId) {
                var result = base.Get(contract.department.linkage.item(departmentId, linkageId));
                return Convert(result, new Linkage());
            },
            Set: function (departmentId, linkage) {
                return base.Put(contract.department.linkage.item(departmentId, linkage.Id), linkage);
            },
            Delete: function (departmentId, linkageId) {
                return base.Delete(contract.department.linkage.item(departmentId, linkageId));
            }
        }
    };
    this.Permission =
    {
        Video:
        {
            Input: {
                User: {
                    List: function (inputId, pageIndex, pageSize, inversed) {
                        var result = base.Get(contract.permission.video.input.user.list(inputId), getParams(this.List, 1));
                        return Convert(result, new UserList());
                    },
                    Get: function (inputId, userId) {
                        var result = base.Get(contract.permission.video.input.user.item(inputId, userId));
                        return Convert(result, new User());
                    },
                    Delete: function (inputId, userId) {
                        return base.Delete(contract.permission.video.input.user.item(inputId, userId));
                    }
                },
                Department: {
                    List: function (inputId, pageIndex, pageSize, inversed) {
                        var result = base.Get(contract.permission.video.input.department.list(inputId), getParams(this.List, 1));
                        return Convert(result, new DepartmentList());
                    },
                    Get: function (inputId, departmentId) {
                        var result = base.Get(contract.permission.video.input.department.item(inputId, departmentId))
                        return Convert(result, new Department());
                    },
                    Delete: function (inputId, departmentId) {
                        return base.Delete(contract.permission.video.input.department.item(inputId, departmentId));
                    }
                }
            },
            Output:
            {
                User: {
                    List: function (outputId, pageIndex, pageSize, inversed) {
                        var result = base.Get(contract.permission.video.output.user.list(outputId), getParams(this.List, 1));
                        return Convert(result, new UserList());
                    },
                    Get: function (outputId, userId) {
                        var result = base.Get(contract.permission.video.output.user.item(outputId, userId))
                        return Convert(result, new User());
                    },
                    Delete: function (outputId, userId) {
                        return base.Delete(contract.permission.video.output.user.item(outputId, userId));
                    }
                },
                Department: {
                    List: function (outputId, pageIndex, pageSize, inversed) {
                        var result = base.Get(contract.permission.video.output.department.list(outputId), getParams(this.List, 1));
                        return Convert(result, new DepartmentList());
                    },
                    Get: function (outputId, departmentId) {
                        var result = base.Get(contract.permission.video.output.department.item(outputId, departmentId));
                        return Convert(result, new Department());
                    },
                    Delete: function (outputId, departmentId) {
                        return base.Delete(contract.permission.video.output.department.item(outputId, departmentId));
                    }
                }
            }
        },
        IO:
        {
            Input: {
                User: {
                    List: function (inputId, pageIndex, pageSize, inversed) {
                        var result = base.Get(contract.permission.io.input.user.list(inputId), getParams(this.List, 1));
                        return Convert(result, new UserList());
                    },
                    Get: function (inputId, userId) {
                        var result = base.Get(contract.permission.io.input.user.item(inputId, userId));
                        return Convert(result, new User());
                    },
                    Delete: function (inputId, userId) {
                        return base.Delete(contract.permission.io.input.user.item(inputId, userId));
                    }
                },
                Department: {
                    List: function (inputId, pageIndex, pageSize, inversed) {
                        var result = base.Get(contract.permission.io.input.department.list(inputId), getParams(this.List, 1));
                        return Convert(result, new DepartmentList());
                    },
                    Get: function (inputId, departmentId) {
                        var result = base.Get(contract.permission.io.input.department.item(inputId, departmentId));
                        return Convert(result, new Department());
                    },
                    Delete: function (inputId, departmentId) {
                        return base.Delete(contract.permission.io.input.department.item(inputId, departmentId));
                    }
                }
            },
            Output:
            {
                User: {
                    List: function (outputId, pageIndex, pageSize, inversed) {
                        var result = base.Get(contract.permission.io.output.user.list(outputId), getParams(this.List, 1));
                        return Convert(result, new UserList());
                    },
                    Get: function (outputId, userId) {
                        var result = base.Get(contract.permission.io.output.user.item(outputId, userId));
                        return Convert(result, new User());
                    },
                    Delete: function (outputId, userId) {
                        return base.Delete(contract.permission.io.output.user.item(outputId, userId));
                    }
                },
                Department: {
                    List: function (outputId, pageIndex, pageSize, inversed) {
                        var result = base.Get(contract.permission.io.output.department.list(outputId), getParams(this.List, 1));
                        return Convert(result, new DepartmentList());
                    },
                    Get: function (outputId, departmentId) {
                        var result = base.Get(contract.permission.io.output.department.item(outputId, departmentId));
                        return Convert(result, new Department());
                    },
                    Delete: function (outputId, departmentId) {
                        return base.Delete(contract.permission.io.output.department.item(outputId, departmentId));
                    }
                }
            }
        },


        Device: {
            User:
            {
                List: function (deviceId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.permission.device.user.list(deviceId), getParams(this.List, 1));
                    return Convert(result, new UserList());
                },
                Get: function (deviceId, userId) {
                    var result = base.Get(contract.permission.device.user.item(deviceId, userId));
                    return Convert(result, new User());
                },
                Delete: function (deviceId, userId) {
                    return base.Delete(contract.permission.device.user.item(deviceId, userId));
                }
            },
            Departments:
            {
                List: function (deviceId, pageIndex, pageSize, inversed) {
                    var result = base.Get(contract.permission.device.department.list(deviceId), getParams(this.List, 1));
                    return Convert(result, new DepartmentList());
                },
                Get: function (deviceId, departmentId) {
                    var result = base.Get(contract.permission.device.department.item(deviceId, departmentId));
                    return Convert(result, new Department());
                },
                Delete: function (deviceId, departmentId) {
                    return base.Delete(contract.permission.device.department.item(deviceId, departmentId));
                }
            }
        }
    }
}

var Security = {
    GroupList: function GroupList() {
        /// <signature>
        /// <summary>分组信息</summary>
        /// <field name='Page' type='Page'>分页信息，如果没有分页信息，则表示一次性获取所有的结果。	Y</field>
        /// <field name='Group' type='Security.Group[]'>分组列表	Y</field>
        /// </signature>

        this.Page = new Page();
        this.Group = new Array();
    },
    Group: function () {
        /// <signature>
        /// <summary>分组信息</summary>
        /// <field name='Id' type='String'>唯一标识符 (只读) N/R</field>
        /// <field name='Name' type='String'>名字 N</field>
        /// <field name='CreationTime' type='DateTime'>创建时间	N/R</field>
        /// <field name='GroupType' type='GroupType'>分组类型 N</field>
        /// <field name='GroupItem' type='Security.GroupItem[]'>分组项列表	Y</field>
        /// </signature>

        this.Id = "";
        this.Name = "";
        this.CreationTime = new Date();
        this.GroupType = GroupType.None;
        this.GroupItem = new Array();

        this.GroupItemSpecified = false;
    },
    GroupItem: function () {
        /// <signature>
        /// <summary>分组项</summary>
        /// <field name='ComponentId' type='String'>组件唯一标识符 Y</field>
        /// <field name='Name' type='String'>名称 Y</field>
        /// <field name='GroupItemType' type='GroupItemType'>分组项类型	N</field>
        /// <field name='GroupItem' type='Security.GroupItem[]'>子项	Y</field>
        /// </signature>

        this.ComponentId = "";
        this.Name = "";
        this.GroupItemType = GroupItemType.None;
        this.GroupItem = new Array();

        this.ComponentIdSpecified = false;
        this.NameSpecified = false;
        this.GroupItemSpecified = false;
    }
}