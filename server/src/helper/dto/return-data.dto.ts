export class ReturnDataDto {
  /**
   * 状态码,1为成功其他为失败。特殊的，8000代表登陆失效，其他状态码码根据业务接口自定义。
   * 状态码不为1时，msg中会包含错误信息
   * @example 1
   */
  code: number;

  /**
   * 错误信息，当code为1时忽略
   * @example 成功
   */
  msg: string;

  /**
   * 数据体（范型），根据实际业务接口自定义
   */
  data: any;
}
