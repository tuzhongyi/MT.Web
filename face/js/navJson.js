var NavJson = {
    //客流
    PDC: {
        //主页设置
        IndexSet: {
            //显示尺寸
            DisplaySize: 2,
            //图表
            Chart: {
                DisplaySize: 2,
                //折线图
                LineChart: {
                    DisplaySize: 2,
                    //设备
                    Device: {
                        DisplaySize: 2,
                        //当前一小时
                        Hour: "Hour",
                        //当天
                        Day: "Hour",
                        //当月
                        Month: "Month",
                        //当年
                        Year: "Year"
                    },
                    //组
                    Group: {
                        DisplaySize: 2,
                        //当前一小时
                        Hour: "Hour",
                        //当天
                        Day: "Hour",
                        //当月
                        Month: "Month",
                        //当年
                        Year: "Year"
                    }
                },
                //饼图
                ArcChart: {
                    DisplaySize: 2,
                    //设备
                    Device:"Device",
                    //组
                    Group: "Group"
                },
            },
            //一般统计
            OrdinaryStatistics: {
                DisplaySize: 2,
                //设备
                Device: {
                    DisplaySize: 2,
                    LeaveNumber:"LeaveNumber",
                    EnterNumber: "EnterNumber",
                    LastNLeaveNumber:"LastNLeaveNumber",
                    LastNEnterNumber: "LastNLeaveNumber",
                    Count:"Count"
                },
                //组
                Group: {
                    DisplaySize: 2,
                    LeaveNumber: "LeaveNumber",
                    EnterNumber: "EnterNumber",
                    LastNLeaveNumber: "LastNLeaveNumber",
                    LastNEnterNumber: "LastNLeaveNumber",
                }
            },
        }
    }
}