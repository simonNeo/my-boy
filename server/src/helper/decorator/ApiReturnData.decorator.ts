import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ReturnDataDto } from '../dto/return-data.dto';
export const ApiWrappedResponse = <TModel extends Type<any>>(
  model: TModel,
  options?: {
    isArray?: boolean;
    hasPage?: boolean;
  },
) => {
  if (options?.hasPage) {
    options.isArray = true;
  }
  let contentSchema = {};
  const dataProperties = {} as { content: any; page?: any };
  let isBaseType = false;
  const baseMaps = {
    Boolean: 'boolean',
    String: 'string',
    Number: 'number',
    Object: 'object',
  };
  const mapKeys = Object.keys(baseMaps);
  if (model?.name && mapKeys.includes(model.name)) {
    // 基础类型
    isBaseType = true;
    contentSchema = options?.isArray
      ? { type: 'array', items: { type: baseMaps[model.name] } }
      : { type: baseMaps[model.name] };
  } else {
    contentSchema = options?.isArray
      ? { type: 'array', items: { $ref: getSchemaPath(model) } }
      : { $ref: getSchemaPath(model) };
  }
  dataProperties.content = contentSchema;
  if (options?.hasPage) {
    dataProperties.page = {
      properties: {
        pageIndex: { type: 'number', example: '1' },
        pageSize: { type: 'number', example: '10' },
        pageTotal: { type: 'number', example: '100' },
      },
    };
  }
  return applyDecorators(
    ApiExtraModels(ReturnDataDto, !isBaseType && model),
    ApiOkResponse({
      schema: {
        title: `WrappedResponseOf${model.name}`,
        allOf: [
          {
            $ref: getSchemaPath(ReturnDataDto),
          },
          {
            properties: {
              data: {
                properties: dataProperties,
              },
            },
          },
        ],
      },
    }),
  );
};
