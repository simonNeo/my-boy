import { IsNotEmpty } from 'class-validator';

export class KeywordRequiredDto {
  /**
   * 关键字
   */
  @IsNotEmpty({ message: '请填写关键字' })
  keyword: string;
}

export class KeywordOptionalDto {
  /**
   * 关键字
   */
  keyword?: string;
}
