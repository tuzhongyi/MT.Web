var Language =
{
    system:
    {
        undefined: "未知",
        none: "无"
    },
    service:
    {
        exception:
        {
            ServiceException:
            {
                code_0: "操作成功",
                code_1: "登录失败：未知的用户名或错误密码",
                code_2: "没有足够的安全权限",
                code_3: "资源未找到",
                code_4: "数据格式不正确",
                code_5: "资源已存在",
                code_6: "无法删除正在使用的资源",
                code_7: "无法删除对象本身",
                code_8: "非首次登录系统，无法在没有口令的情况下创建管理员帐号",
                code_9: "不支持的操作，请换用其他操作",
                code_10: "设备出错，请检查网络是否正常或设备信息是否正确",
                code_11: "非法的操作",
                code_12: "关联关系已存在。如果要修改关联关系，前选择忽略现有的关联",
                code_13: "无法通过现有参数获取唯一值。如果要继续该操作请指定更多的参数值",
                code_14: "无法找到可达的摄像机信息",
                code_15: "唯一性资源已存在",
                code_16: "系统信息资源不存在",
                code_17: "标识符(Id)格式非法",
                code_18: "标示符(Id)已存在",
                code_19: "重复的用户名",
                code_20: "请求出错。由于语法格式有误，服务器无法理解此请求。不作修改，客户程序就无法重复此请求",
                code_21: "未授权。此错误表明传输给服务器的证书与登录服务器所需的证书不匹配",
                code_22: "服务器内部错误"
            },
            AlarmCenterException: {
                1: "非法功能",
                2: "非法数据地址",
                3: "非法数据值",
                4: "从站设备故障",
                5: "确认",
                6: "从属设备忙",
                8: "存储奇偶性差错",
                10: "不可用网关路径",
                11: "网关目标设备响应失败",
                32: "帧错误",
                33: "参数不可修改",
                34: "参数运行时不可修改",
                35: "参数受密码保护",
                36: "非上位机控制，上位机命令无效",
                401: "未授权",
                403: "禁止访问",
                404: "未找到指定资源",
                500: "服务器内部错误",
            }
        }
    },
    js:
    {
        dataTables:
            {
                search: "搜索",
                noneData: "没有数据",
                show: "显示",
                entries: "条数据"
            }
    },
    Enum:
    {
        FaceSetType: {
            None: "全部",
            WhiteList: "白名单",
            BlackList: "黑名单"
        },
        bool: {
            "true": "是",
            "false": "否"
        },
        DeviceClassification:
            {
                None: "无",
                IPCamera: "IP摄像机",
                DVS: "数字视频服务器",
                NVR: "网络视频录像机",
                DVR: "数字硬盘录像机",
                DigitalMatrix: "数字矩阵",
                HDDecoder: "高清解码器",
                AnalogMatrix: "模拟矩阵",
                VAS: "视频分析服务器",
                AAM: "模拟报警主机",
                NAM: "网络报警主机",
                VPS: "视频处理服务器",
                IntegratedMatrix: "综合矩阵",
                MatrixControlUnit: "数字矩阵控制单元",
                StreamingMediaServer: "流媒体服务器",
                DecodingUnit: "解码单元",
                EncodingUnit: "编码单元",
                NVS: "网络视频服务器",
                DataServer: "数据服务器",
                AcquisitionServer: "数据采集服务器",
                SystemGateway: "系统网关",
                Camera: "模拟摄像机",
                UltrasonicProbe: "超声波报警探头",
                ExtensionUnit: "扩展设备单元",
                RFIDAntenna: "RFID天线",
                Detector: "智能检测器",
                PDCCamera: "客流统计相机",
                RadarCamera: "雷达摄像机",
                ParkingDetector: "停车信息检测器",
                GuideScreen: "引导屏",
                FDCamera: "人脸识别前端设备",
                FDNVR: "人脸识别后端设备"
            },
        CameraType:
            {
                None: "无/未知",
                Gun: "枪机",
                Ball: "球机",
                HalfBall: "半球",
                AIO: "一体机"
            },
        TeardownReason:
            {
                None: "无/未知",
                Manual: "本地手动的",
                Network: "网络手动的",
                SystemAbnormal: "系统异常",
                StorageMediumAbnormal: "存储介质异常",
                WatchDog: "看门狗"
            },
        IRCutState:
            {
                OFF: "普通滤光模式",
                ON: "红外滤光模式"
            },

        //彩色转黑白模式
        DayNightState:
            {
                OFF: "彩色模式",
                ON: "黑白模式"
            },
        //摄像机或视频源信号状态
        SignalState:
            {
                Normal: "正常", Interrupted: "信号中断"
            },
        //录像状态
        RecordState:
            {
                OFF: "未录像", ON: "正常录像"
            },
        //存储方式
        StorageType:
            {
                None: "未录像", Internal: "设备内部存储,如硬盘,SD卡等", External: "设备外部存储,如磁盘阵列,网络等"
            },

        //卷标类型
        VolumeType: {
            None: "未录像", VirtualDisk: "虚拟磁盘", RAID0: "RAID0", RAID1: "RAID1", RAID0Plus1: "RAID0+1", RAID5: "RAID5", RAID6: "RAID6"
        },
        //存储介质
        StorageMediumType: {
            None: "未录像", HDD: "硬盘", Flash: "闪存", SDIO: "安全数字输入输出卡"
        },
        //存储媒介状态
        StorageMediumState: {
            Normal: "正常运行", Writing: "正在写入", Unformatted: "未被格式化", Dormancy: "休眠", Offline: "脱机，媒介由于无法工作而被剔除，无法识别", Error: "无法正常读写,错写盘错误率较高"
        },
        //网络地址获取方式
        NetworkAddressingType: {

            Static: "静态获取", Dynamic: "动态获取", APIPA: "自动私有"
        },
        //网口线缆类型
        NetworkCableType: {
            RJ45: "RJ45接口", Fiber: "光纤接口", Wireless: "无线设备"
        },
        //网口连接速率和双工模式
        NetworkSpeedDuplex: {
            Auto: "自适应", Half10MBase: "10兆半", Full10MBase: "10兆全", Half100MBase: "100兆半", Full100MBase: "100兆全", Half1000MBase: "1000兆半", Full1000MBase: "1000兆全"
        },
        //网口工作模式
        NetworkInterfaceWorkMode: {
            Disable: "禁用", Enable: "启用", Bridge: "桥接或对等", Balancing: "负载均衡"
        },
        //事件类型
        EventType: {
            None: "无联动信息",
            IO: "IO输入，当IO输入状态改变时触发",
            VMD: "运动侦测，当视频中有运动物体时触发",
            Videoloss: "视频信号丢失，当视频输入信号中断时触发",
            IRCut: "红外滤光片切换模式ON/OFF",
            DayNight: "彩色转黑白模式ON/OFF ",
            RecordState: "录像状态 ON/OFF",
            StorageMediumFailure: "存储介质丢失或损坏，当硬盘无法识别或由于读写失败过于频繁而被卸载时触发",
            RAIDFailure: "创建RAID(磁盘冗余阵列)失败",
            RecordingFailure: "录像状态异常，指定的视频源处于录像状态时无法正常录像",
            BadVideo: "不正常的视频，当视频源有干扰或扭曲时触发",
            POS: "非法的销售点",
            FanFailure: "风扇异常",
            CpuUsage: "CPU使用率异常，当CPU的使用率超过指定阀值时触发",
            MemoryUsage: "内存使用率异常，当Memory的使用率超过指定阀值时触发",
            Temperature: "温度异常，当温度超过指定阀值时触发",
            Pressure: "压力异常，当压力超过指定阀值时触发",
            Voltage: "电压异常，当电压超出指定范围时触发",
            MaximumConnections: "超出视频连接上限, 当视频连接数已达上限时又有新的视频请求连接时触发",
            NetworkBitrate: "网络码率异常，当网口码流超过指定阀值时触发",
            VideoBitrate: "视频码率异常，当视频码率低于或超过指定阀值时触发",
            Squint: "聚焦模糊",
            VideoTurned: "视频转动",
            //Jitter: "视频抖动",
            //Freeze: "视频冻结",
            //Blocked: "视频遮挡",
            //LostFocus: "视频失焦",
            //Noise: "视频噪声",
            //ColorCast: "视频偏色",
            //AbnormalBrightness: "亮度异常",
            //AbnormalContrast: "对比度异常",
            //SceneChanged: "场景改变",
            //Moved: "视频移位",
            Online: "设备上线",
            Offline: "设备下线",
            Intrusion: "区域入侵",
            Tripwire: "越线(拌线)",
            Loitering: "滞留/徘徊",
            Unattended: "抛弃物",
            Removal: "物品遗失",
            Retrograde: "逆向入侵",
            FaceDetect:"人脸识别事件",
            FaceMatch:"人脸比中事件"
            
            //Counting: "计数",
            //Crowed: "拥挤",
            //ATMSlot: "ATM机插卡口异常",
            //ATMKeyBoard: "ATM机键盘异常",
            //ATMDamage: "ATM、设备破坏物品",
            //BackRoomNumberLimit: "ATM加钞间人数异常",
            //BackRoomCrouched: "ATM加钞间目标下蹲",
        },
        //事件触发状态
        EventState: {
            Inactive: "当不符合事件触发条件时的状态", Active: "当符合事件触发条件时的状态"
        },

        //视频编码类型
        VideoCodecType: {
            None: "None", H264: "H.264", MJPEG: "Motion Jpeg", MPEG4: "Mpeg-4"
        },

        //视频码率控制类型
        VideoQualityControlType: { VBR: "变码率", CBR: "定码率" },

        //用户操作类型
        OperationType: {
            None: "无状态", RealPlay: "预览视频", PlayBack: "回放视频", Download: "下载视频", RecordStopped: "停止录像", Reboot: "重启设备", IPAddressModified: "IP地址被修改", NetworkSpeedDiagnosticsStarted: "网络测速开始", NetworkSpeedDiagnosticsStopped: "网络测速停止"
        },

        //视频接口类型
        VideoInterfaceType: {
            None: "未知", BNC: "同轴电缆接插件", HDMI: "高清晰度多媒体接口(High Definition Multimedia Interface)", VGA: "视频图形阵列(Video Graphics Array)", DVI: "数字化视像接口(Digital Visual Interface)", DisplayPort: "高清数字显示接口", Bus: "数据总线"
        },

        //解码通道状态
        DecodingChannelState: {
            Disabled: "关闭", Dormant: "休眠", Connecting: "正在连接", Connected: "已连接", Decoding: "正在解码", Abnormal: "异常"
        },

        //报警探头类型
        AlarmInProbeType: {
            None: "未知类型", Panic: "紧急按钮", Perimeter: "边界", EntranceGuard: "门禁"
        },

        //报警输入触发类型
        IOInputTriggeringType: {
            Low: "低电平", High: "高电平", Falling: "电平下降", Rasing: "电平上升"
        },

        //IO输出触发类型
        IOOutputTriggeringType: {
            Low: "低电平", High: "高电平"
        },

        //IO输入输出状态
        IOState: {
            Inactive: "未触发", Active: "触发"
        },

        //布撤防类型
        ArmType: {
            Disarm: "撤防", Arm: "布防", ByPass: "旁路"
        },

        //性别
        Sex: {
            None: "未指定或保密", Male: "男性", Female: "女性"
        },
        //用户权限
        UserPermission: {
            Anonymous: "匿名权限", Operator: "操作者权", Administrator: "管理员权限", Extended: "扩展用户权限"
        },

        //用户详细权限
        UserPermissions: {
            None: "无",
            Information: "系统信息",
            System: "系统设置",
            User: "用户管理",
            Device: "操作权限",
            All: "全部权限"
        },

        //设备权限
        DevicePermissions: {
            None: "无",
            System: "系统",
            Media: "媒体",
            Logs: "日志",
            All: "所有权限"
        },

        //视频源权限
        VideoSourcePermissions: {
            None: "无权限",
            Preview: "预览",
            Playback: "回放",
            PTZ: "云台",
            Download: "下载",
            All: "完全控制权限"
        },

        //视频输出源权限
        VideoOutSourcePermissions: {
            None: "无权限",
            All: "完全控制权限"
        },

        SystemFaultType: {
            None: "未知",
            Offline: "断线",
            StorageMediumAbnormal: "存储介质异常",
            Videoloss: "视频丢失"
        },

        SystemWarningType: {
            None: "未知",
            CPUUsage: "CPU过高",
            MemoryUsage: "内存过高",
            NetworkUsage: "网口使用率过高",
            SuperHeat: "设备过热",
            VoltageInstability: "电压不稳",
            VideoHighLoad: "视频连接负载过高",
            VideoNetworkInstability: "视频通道的网络状态不稳定",
            Teardown: "异常上下线",
            VideoConnectionFailure: "视频连接的失败率过高"
        },
        StorageMediumAbnormalType:
        {
            None: "未知",
            ReadTimeout: "读取数据超时",
            WriteTimeout: "写入数据超时",
            Dormancy: "介质休眠",
            Offline: "介质下线",
            Online: "介质上线",
            Full: "介质已满",
            BeginFormat: "开始格式化",
            EndFormat: "结束格式化",
            SMARTAbnormal: "SMART信息异常"
        },
        VideoDisconnectReason: {
            None: "未知",
            ClientClosed: "客户端关闭",
            ServerClosed: "服务端关闭",
            FrontEndClosed: "前端连接已关闭",
            SendTimeout: "发送超时"

        },
        VideoConnectFailedReason: {
            None: "未知",
            Idle: "空闲状态,说明没有有效的连接信息",
            BeyondLoad: "前端连接已关闭",
            FrontEndClosed: "前端连接已关闭",
            SendTimeout: "发送超时"

        },
        VideoNetworkState: {
            None: "未知",
            Idle: "空闲状态,说明没有有效的连接信息",
            Established: "已连接",
            Closed: "连接已关闭"

        },
        IPVersion: {
            IPv4: "IPv4",
            IPv6: "IPv6",
            Dual: "IPv4+IPv6"
        },

        //报警输出访问权限
        IOOutputPermissions: {
            None: "无",//无
            All: "全部权限"//全部权限
        },

        //报警输入访问权限
        IOInputPermissions: {
            None: "无",//无
            Receiving: "接收",//接收
            Bypass: "旁路",//旁路
            All: "全部权限"//全部权限

        },
        NoticeClassification: {
            None: "未知",
            Emergency: "紧急",
            Warning: "重要/警告",
            Info: "一般信息"
        },
        ObjectType: {
            None: "未知",
            People: "人",
            Vehicle: "车"
        },
        BaudRate: {
            BR1200: "1200",
            BR2400: "2400",
            BR4800: "4800",
            BR9600: "9600",
            BR19200: "19200",
            BR38400: "38400",
            BR57600: "57600",
            BR115200: "115200"
        },
        ConnectionMode: {
            UDP: "UDP传输",
            TCPServer: "TCP服务端被连接",
            TCPClient: "TCP客户端连接中心服务器",
        },
        //车牌颜色
        PlateColor: {
            None: "未知",
            Blue: "蓝色",
            White: "白色",
            Black: "黑色",
            Yellow: "黄色"
        },
        //车辆颜色
        VehicleColor: {
            None: "未知",
            White: "白色",
            Gray: "灰色",
            Yellow: "黄色",
            Pink: "粉色",
            Red: "红色",
            Purple: "紫色",
            Green: "绿色",
            Blue: "蓝色",
            Brown: "棕色",
            Black: "黑色",
            Other: "其它颜色"
        },
        //用户操作类型
        UserOperationType: {
            None: "无",
            Login: "用户登录",
            Logout: "用户注销",
            RealPlay: "预览视频",
            VodPlay: "回放视频",
            Download: "下载视频",
            PTZ: "云台控制",
            DecoderSwitch: "解码器切换",
            CreateUser: "创建用户信息",
            DeleteUser: "删除用户信息",
            SetUser: "修改用户信息",
            CreateDevice: "添加设备信息",
            DeleteDevice: "删除设备信息",
            SetDevice: "修改设备信息"
        },
        //视频流来源类型
        StreamSourceType: {
            Auto: "自适应",
            Device: "设备来源",
            Platform: "平台来源"
        }
    },
    page:
{
    navigation:
        {
            device:
                {
                    base: "设备管理",
                    list: "设备列表",
                    slim: "设备信息"
                },
            user:
                {
                    base: "用户管理"
                },
            department:
                {
                    base: "输入通道管理"
                },
            permission:
                {
                    base: "权限管理"
                }
        },
    login:
        {
            manager: "管理员账号",
            username: "用户名",
            password: "密码",
            login: "登&ensp;&ensp;&ensp;&ensp;录",
            regist: "注&ensp;&ensp;&ensp;&ensp;册:"
        },
    device:
        {
            list:
                {

                }
        }
},
    Display:
        {
            DeviceClassification:
                {
                    All: "全部",
                    None: "未知",
                    IPCamera: "IP摄像机",
                    DVS: "数字视频服务器",
                    NVR: "网络视频录像机",
                    DVR: "数字硬盘录像机",
                    DigitalMatrix: "数字矩阵",
                    HDDecoder: "高清解码器",
                    AnalogMatrix: "模拟矩阵",
                    VAS: "视频分析服务器",
                    AAM: "模拟报警主机",
                    NAM: "网络报警主机",
                    VPS: "视频处理服务器",
                    IntegratedMatrix: "综合矩阵",
                    MatrixControlUnit: "数字矩阵控制单元",
                    StreamingMediaServer: "流媒体服务器",
                    DecodingUnit: "解码单元",
                    EncodingUnit: "编码单元",
                    NVS: "网络视频服务器",
                    DataServer: "数据服务器",
                    AcquisitionServer: "数据采集服务器",
                    SystemGateway: "系统网关",
                    Camera: "模拟摄像机",
                    UltrasonicProbe: "超声波报警探头",
                    RFIDAntenna: "RFID天线",
                    Detector: "智能检测器",
                    ExtensionUnit: "扩展设备单元",
                    PDCCamera: "客流统计相机",
                    RadarCamera: "雷达摄像机",
                    ParkingDetector: "停车信息检测器",
                    GuideScreen: "引导屏",
                    FDCamera: "人脸识别前端设备",
                    FDNVR: "人脸识别后端设备"
                },
            EventType:
                {
                    All: "全部",
                    None: "未设置联动",
                    IO: "IO输入",
                    VMD: "运动侦测",
                    Videoloss: "视频信号丢失",
                    IRCut: "红外滤光片切换模式",
                    DayNight: "彩色转黑白模式",
                    RecordState: "录像状态",
                    StorageMediumFailure: "存储介质丢失或损坏",
                    RAIDFailure: "创建RAID(磁盘冗余阵列)失败",
                    RecordingFailure: "录像状态异常",
                    BadVideo: "不正常的视频",
                    POS: "非法的销售点",
                    FanFailure: "风扇异常",
                    CpuUsage: "CPU使用率异常",
                    MemoryUsage: "内存使用率异常",
                    Temperature: "温度异常",
                    Pressure: "压力异常",
                    Voltage: "电压异常",
                    MaximumConnections: "超出视频连接上限",
                    NetworkBitrate: "网络码率异常",
                    VideoBitrate: "视频码率异常",
                    Squint: "聚焦模糊",
                    VideoTurned: "视频转动",
                    //Jitter: "视频抖动",
                    //Freeze: "视频冻结",
                    //Blocked: "视频遮挡",
                    //LostFocus: "视频失焦",
                    //Noise: "视频噪声",
                    //ColorCast: "视频偏色",
                    //AbnormalBrightness: "亮度异常",
                    //AbnormalContrast: "对比度异常",
                    //SceneChanged: "场景改变",
                    //Moved: "视频移位",
                    Online: "设备上线",
                    Offline: "设备下线",
                    Intrusion: "区域入侵",
                    Tripwire: "越线(拌线)",
                    Loitering: "滞留/徘徊",
                    Unattended: "抛弃物",
                    Removal: "物品遗失",
                    Retrograde: "逆向入侵",
                    FaceDetect:"人脸识别",
                    FaceMatch:"人脸比中"
                    //Counting: "计数",
                    //Crowed: "拥挤",
                    //ATMSlot: "ATM机插卡口异常",
                    //ATMKeyBoard: "ATM机键盘异常",
                    //ATMDamage: "ATM、设备破坏物品",
                    //BackRoomNumberLimit: "ATM加钞间人数异常",
                    //BackRoomCrouched: "ATM加钞间目标下蹲",
                },
            EventState:
                {
                    Inactive: "不触发",
                    Active: "触发"
                },
            DownloadTaskState: {
                None: "未知",
                Error: "异常",
                Broken: "中断",
                Finished: "完成"
            },
            //用户操作类型
            UserOperationType: {
                All: "全部",
                Login: "用户登录",
                Logout: "用户注销",
                RealPlay: "预览视频",
                VodPlay: "回放视频",
                Download: "下载视频",
                PTZ: "云台控制",
                DecoderSwitch: "解码器切换",
                CreateUser: "创建用户信息",
                DeleteUser: "删除用户信息",
                SetUser: "修改用户信息",
                CreateDevice: "添加设备信息",
                DeleteDevice: "删除设备信息",
                SetDevice: "修改设备信息"
            }
        }
}
var UTF8 = new Object();
UTF8.fromChinese = function (val) {

    //--------把中文字符转换成Utf8编码------------------------//
    function EncodeUtf8(s1) {
        var s = escape(s1);
        var sa = s.split("%");
        var retV = "";
        if (sa[0] != "") {
            retV = sa[0];
        }
        for (var i = 1; i < sa.length; i++) {

            if (sa[i].substring(0, 1) == "u") {
                retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));
                if (sa[i].length > 5) {
                    retV += sa[i].substring(5);
                }

            }
            else retV += "%" + sa[i];
        }

        return retV;
    }
    function Str2Hex(s) {
        var c = "";
        var n;
        var ss = "0123456789ABCDEF";
        var digS = "";
        for (var i = 0; i < s.length; i++) {
            c = s.charAt(i);
            n = ss.indexOf(c);
            digS += Dec2Dig(eval(n));

        }
        //return value;
        return digS;
    }
    function Dec2Dig(n1) {
        var s = "";
        var n2 = 0;
        for (var i = 0; i < 4; i++) {
            n2 = Math.pow(2, 3 - i);
            if (n1 >= n2) {
                s += '1';
                n1 = n1 - n2;
            }
            else
                s += '0';

        }
        return s;

    }
    function Dig2Dec(s) {
        var retV = 0;
        if (s.length == 4) {
            for (var i = 0; i < 4; i++) {
                retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
            }
            return retV;
        }
        return -1;
    }
    function Hex2Utf8(s) {
        var retS = "";
        var tempS = "";
        var ss = "";
        if (s.length == 16) {
            tempS = "1110" + s.substring(0, 4);
            tempS += "10" + s.substring(4, 10);
            tempS += "10" + s.substring(10, 16);
            var sss = "0123456789ABCDEF";
            for (var i = 0; i < 3; i++) {
                retS += "%";
                ss = tempS.substring(i * 8, (eval(i) + 1) * 8);



                retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
                retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
            }
            return retS;
        }
        return "";
    }

    return EncodeUtf8(val);
}
UTF8.toChinese = function (val) {
    function utf8CodeToChineseChar(strUtf8) {
        var iCode, iCode1, iCode2;
        iCode = parseInt("0x" + strUtf8.substr(1, 2));
        iCode1 = parseInt("0x" + strUtf8.substr(4, 2));
        iCode2 = parseInt("0x" + strUtf8.substr(7, 2));

        return String.fromCharCode(((iCode & 0x0F) << 12) |
  ((iCode1 & 0x3F) << 6) |
  (iCode2 & 0x3F));
    }

    //   将   UTF8   编码的   URL   中的中文部分（<   0xFFFF）转换过来   
    function chineseFromUtf8Url(strUtf8) {
        var bstr = "";
        var nOffset = 0; //   processing   point   on   strUtf8   

        if (strUtf8 == "")
            return "";

        nOffset = strUtf8.indexOf("%e");

        if (nOffset == -1)
            nOffset = strUtf8.indexOf("%E");

        if (nOffset == -1)
            return strUtf8;

        while (nOffset != -1) {
            bstr += strUtf8.substr(0, nOffset);
            strUtf8 = strUtf8.substr(nOffset, strUtf8.length - nOffset);
            if (strUtf8 == "" || strUtf8.length < 9)       //   bad   string   
                return bstr;

            bstr += utf8CodeToChineseChar(strUtf8.substr(0, 9));
            strUtf8 = strUtf8.substr(9, strUtf8.length - 9);
            nOffset = strUtf8.indexOf("%e");
            if (nOffset == -1)
                nOffset = strUtf8.indexOf("%E");
        }

        return bstr + strUtf8;
    }

    function unicodeFromUtf8(strUtf8) {
        var bstr = "";
        var nTotalChars = strUtf8.length; //   total   chars   to   be   processed.   
        var nOffset = 0; //   processing   point   on   strUtf8   
        var nRemainingBytes = nTotalChars; //   how   many   bytes   left   to   be   converted   
        var nOutputPosition = 0;
        var iCode, iCode1, iCode2; //   the   value   of   the   unicode.   

        while (nOffset < nTotalChars) {
            iCode = strUtf8.charCodeAt(nOffset);
            if ((iCode & 0x80) == 0) //   1   byte.   
            {
                if (nRemainingBytes < 1) //   not   enough   data   
                    break;

                bstr += String.fromCharCode(iCode & 0x7F);
                nOffset++;
                nRemainingBytes -= 1;
            }
            else if ((iCode & 0xE0) == 0xC0) //   2   bytes   
            {
                iCode1 = strUtf8.charCodeAt(nOffset + 1);
                if (nRemainingBytes < 2 || //   not   enough   data   
    (iCode1 & 0xC0) != 0x80) //   invalid   pattern   
                {
                    break;
                }

                bstr += String.fromCharCode(((iCode & 0x3F) << 6) | (iCode1 & 0x3F));
                nOffset += 2;
                nRemainingBytes -= 2;
            }
            else if ((iCode & 0xF0) == 0xE0) //   3   bytes   
            {
                iCode1 = strUtf8.charCodeAt(nOffset + 1);
                iCode2 = strUtf8.charCodeAt(nOffset + 2);
                if (nRemainingBytes < 3 || //   not   enough   data   
    (iCode1 & 0xC0) != 0x80 || //   invalid   pattern   
    (iCode2 & 0xC0) != 0x80) {
                    break;
                }

                bstr += String.fromCharCode(((iCode & 0x0F) << 12) |
  ((iCode1 & 0x3F) << 6) |
  (iCode2 & 0x3F));
                nOffset += 3;
                nRemainingBytes -= 3;
            }
            else //   4   or   more   bytes   --   unsupported   
                break;
        }

        if (nRemainingBytes != 0) {
            //   bad   UTF8   string.   
            return "";
        }

        return bstr;
    }

    return chineseFromUtf8Url(val);
}