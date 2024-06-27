import { IsNotEmpty } from 'class-validator';

export class IdRequiredDto {
  /**
   * ID
   */
  @IsNotEmpty({ message: '请填写ID' })
  id: string;
}

export class IdOptionalDto {
  /**
   * ID
   */
  id?: string;
}
