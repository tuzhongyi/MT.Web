#ifndef rtmp_server_def_include_h
#define rtmp_server_def_include_h

#define RTMP_SERVER_API	extern "C"__declspec(dllexport)

//关于rtmp url说明
//举例"rtmp://192.168.128.253/stream?dev_id=00310101031111111000002000000000&slot=1&stream=2&mode=live&user=admin&password=12345"
//?后面为需要传入的参数
//192.168.128.253为rtmp server的IP地址
//dev_id:设备ID
//slot:设备通道,从1开始
//stream:流序号,1表示主码流 2表示子码流
//mode: live为预览流 playback为录像流
//user:用户名
//password:密码

//回放url
//rtmp://192.168.128.253/stream?dev_id=00310101031111111000002000000000&slot=1&stream=2&mode=playback&user=admin&password=12345&beg=2016-01-14T00:18:18Z&end=2016-01-14T00:25:04Z
//beg:文件开始时间
//end:文件结束时间

/************************************************************************/
/* 初始化需要一开始调用，只需调用一次                                                */
/*media_svr_ip:媒体流服务器IP地址														*/
/*media_svr_port:媒体流服务器端口号													*/
/*log_dir:日志文件夹路径,如果为NULL，则不写日志									*/
/************************************************************************/
RTMP_SERVER_API BOOL __stdcall hw_rtmp_server_init(const char* media_svr_ip,short media_svr_port,const char* log_dir);

/************************************************************************/
/* 启动rtmp 服务				                                                                     */
/************************************************************************/
RTMP_SERVER_API BOOL __stdcall hw_rtmp_server_start();

/************************************************************************/
/* 停止rtmp 服务				                                                                     */
/************************************************************************/
RTMP_SERVER_API BOOL __stdcall hw_rtmp_server_stop();

#endif