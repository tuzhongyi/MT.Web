#ifndef rtmp_server_def_include_h
#define rtmp_server_def_include_h

#define RTMP_SERVER_API	extern "C"__declspec(dllexport)

//����rtmp url˵��
//����"rtmp://192.168.128.253/stream?dev_id=00310101031111111000002000000000&slot=1&stream=2&mode=live&user=admin&password=12345"
//?����Ϊ��Ҫ����Ĳ���
//192.168.128.253Ϊrtmp server��IP��ַ
//dev_id:�豸ID
//slot:�豸ͨ��,��1��ʼ
//stream:�����,1��ʾ������ 2��ʾ������
//mode: liveΪԤ���� playbackΪ¼����
//user:�û���
//password:����

//�ط�url
//rtmp://192.168.128.253/stream?dev_id=00310101031111111000002000000000&slot=1&stream=2&mode=playback&user=admin&password=12345&beg=2016-01-14T00:18:18Z&end=2016-01-14T00:25:04Z
//beg:�ļ���ʼʱ��
//end:�ļ�����ʱ��

/************************************************************************/
/* ��ʼ����Ҫһ��ʼ���ã�ֻ�����һ��                                                */
/*media_svr_ip:ý����������IP��ַ														*/
/*media_svr_port:ý�����������˿ں�													*/
/*log_dir:��־�ļ���·��,���ΪNULL����д��־									*/
/************************************************************************/
RTMP_SERVER_API BOOL __stdcall hw_rtmp_server_init(const char* media_svr_ip,short media_svr_port,const char* log_dir);

/************************************************************************/
/* ����rtmp ����				                                                                     */
/************************************************************************/
RTMP_SERVER_API BOOL __stdcall hw_rtmp_server_start();

/************************************************************************/
/* ֹͣrtmp ����				                                                                     */
/************************************************************************/
RTMP_SERVER_API BOOL __stdcall hw_rtmp_server_stop();

#endif