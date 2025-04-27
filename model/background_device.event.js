var PageEvent = {
    Device:
    {
        GroupListItemChanged: null,
        GroupListReload: null,
        GroupListUserIconButtonChanged: null,
        GroupListDepartmentIconButtonChanged: null,
        GroupListNetworkIconButtonChanged: null,
        GroupListMediumIconButtonChanged: null,
        GroupListIOInputIconButtonChanged: null,
        GroupListIOOutputIconButtonChanged: null,
        GroupListVideoInputIconButtonChanged: null,
        GroupListVideoOutputIconButtonChanged: null,
        User: {
            AddUserToDevice: null,
            BatchAddUsersToDevice: null,
        },
        Department: {
            AddDepartmentToDevice: null,
            BatchAddDepartmentsToDevice: null,
        },
        Network: {
            BatchAddNetworksToDevice: null,
        },
        Medium: {
            BatchAddMediumsToDevice: null,
        },
        Video:{
            Input: {
                BatchAddInputsToDevice: null,
                GroupListItemClick: null,
                GroupListItemRemoveButtonClick: null,
                GroupListChanged: null,
                GroupListReload: null,
                GroupListUserIconButtonChanged: null,
                GroupListDepartmentIconButtonChanged: null,
                User: {
                    AddUserToInput: null,
                    BatchAddUserToInput: null,
                },
                Department: {
                    AddDepartmentToInput: null,
                    BatchAddDepartmentToInput: null,
                },
                Streaming: {
                    ModifyStreamingListItem:null
                }
            },
            Output: {
                GroupListItemClick: null,
                GroupListItemRemoveButtonClick: null,
                GroupListChanged: null,
                GroupListReload: null,
                GroupListUserIconButtonChanged: null,
                GroupListDepartmentIconButtonChanged: null,
                User: {
                    AddUserToOutput: null,
                    BatchAddUserToOutput: null,
                },
                Department: {
                    AddDepartmentToOutput: null,
                    BatchAddDepartmentToOutput: null,
                }
            },
            Decoding: {
                GroupListItemClick: null,
                GroupListItemRemoveButtonClick: null,
                GroupListChanged: null,
                GroupListReload: null,
            }
        },
        IO: {
            Input: {
                GroupListItemClick: null,
                GroupListItemRemoveButtonClick: null,
                GroupListChanged: null,
                GroupListReload: null,
                GroupListUserIconButtonChanged: null,
                GroupListDepartmentIconButtonChanged: null,
                User: {
                    AddUserToInput: null,
                    BatchAddUserToInput: null,
                },
                Department: {
                    AddDepartmentToInput: null,
                    BatchAddDepartmentToInput: null,
                },
            },
            Output: {
                GroupListItemClick: null,
                GroupListItemRemoveButtonClick: null,
                GroupListChanged: null,
                GroupListReload: null,
                GroupListUserIconButtonChanged: null,
                GroupListDepartmentIconButtonChanged: null,
                User: {
                    AddUserToOutput: null,
                    BatchAddUserToOutput: null,
                },
                Department: {
                    AddDepartmentToOutput: null,
                    BatchAddDepartmentToOutput: null,
                }
            }
        }
    },
}