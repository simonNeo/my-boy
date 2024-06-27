import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';

export interface SMSOneReqOption {
  phone: string;
  signName: string; // 短信签名
  templateCode: string; // 短信模板
  templateParam: { [key: string]: any }; // 短信模板变量对应的实际值，JSON格式
}
export default class AliSMSClient {
  static createClient(accessKeyId: string, accessKeySecret: string): Dysmsapi20170525 {
    const config = new $OpenApi.Config({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
    });
    config.endpoint = `dysmsapi.aliyuncs.com`;
    return new Dysmsapi20170525(config);
  }
  static createRequest(option: SMSOneReqOption) {
    const req = new $Dysmsapi20170525.SendSmsRequest();
    req.phoneNumbers = option.phone;
    req.signName = option.signName;
    req.templateCode = option.templateCode;
    if (option.templateParam) {
      req.templateParam = JSON.stringify(option.templateParam);
    }
    return req;
  }
}
