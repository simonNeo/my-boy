const devConfig = require('../db.dev.config.json');
const childProcess = require('child_process');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');
const { exit } = require('process');

const entityPath = path.resolve(__dirname, '../src/entity');
const modelOutPutPath = path.resolve(__dirname, './model/output');

const sequelize = new Sequelize(devConfig);
let isDirty = false;

const ignoreFiles = ['init-models.js', 'sequelizeMeta.js'];

const overwriteIfExist = true; // 当entity存在时，是否覆盖

const t1Fields = new Set(); // 记录下所有1长度的tinyInt
const boolFields = ['deleted', 'disabled', 'has_poop']; // 视为bool类型的字段

// 保存文件
function saveTextFile(content, path) {
  fs.writeFileSync(path, content, { flag: 'w' });
}

function getJSType(type, field) {
  const typeString = type.toString();

  if (typeString.startsWith('DOUBLE PRECISION')) {
    const len = typeString.replace('DOUBLE PRECISION', '').replace('(', '').replace(')', '');
    if (len) {
      return [`DOUBLE(${len})`, 'number'];
    }
    return ['DOUBLE', 'number'];
  }

  if (typeString.startsWith('VARCHAR')) {
    const len = typeString.replace('VARCHAR', '').replace('(', '').replace(')', '');
    if (len) {
      return [`STRING(${len})`, 'string'];
    }
    // 好像都有长度
    return ['STRING', 'string'];
  }

  const map = {
    INTEGER: ['INTEGER', 'number'],
    'INTEGER UNSIGNED': ['INTEGER.UNSIGNED', 'number'],
    'TINYINT UNSIGNED': ['TINYINT.UNSIGNED', 'number'],
    MEDIUMINT: ['INTEGER', 'number'],
    'MEDIUMINT UNSIGNED': ['MEDIUMINT.UNSIGNED', 'number'],
    BIGINT: ['BIGINT', 'number'],
    'BIGINT UNSIGNED': ['BIGINT.UNSIGNED', 'number'],
    DATETIME: ['DATE', 'Date'],
    TEXT: ['TEXT', 'string'],
    JSON: ['JSON', 'string'],
    TINYINT: ['TINYINT', 'number'],
    'TINYINT(1)': ['TINYINT', 'number'],
  };

  // 处理特殊tinyint(1)类型，filed为特殊值时，tinyint(1)视为boolean
  if (typeString === 'TINYINT(1)') {
    if (boolFields.includes(field)) {
      map['TINYINT(1)'] = ['BOOLEAN', 'boolean'];
    }
    if (!t1Fields.has(field)) {
      t1Fields.add(field);
      // console.log('tinyint(1)字段', field);
    }
  }
  const mapKeys = Object.keys(map);
  if (mapKeys.includes(typeString)) {
    return map[typeString];
  }
}

async function handleFile(file, index) {
  const fn = require(modelOutPutPath + '/' + file);
  const model = fn(sequelize, DataTypes);
  const attrMap = model.fieldRawAttributesMap;

  const tableName = model.tableName;
  const modelName = file.replace('.js', '');
  const modelNameUpper = modelName[0].toUpperCase() + modelName.slice(1);
  const modelNameUpperWithEntity = modelNameUpper + 'Entity';
  const outFilePath = path.resolve(entityPath, modelNameUpper + '.entity.ts');
  console.log(`正在处理: ${modelNameUpper}`);

  //文件已存在，跳过
  if (fs.existsSync(outFilePath)) {
    if (!overwriteIfExist) {
      console.log('文件已存在，跳过', modelName);
      return;
    }
  } else {
    isDirty = true;
  }

  // 生成对应的ts文件
  let fileContent = `import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: '${tableName}',
  underscored: true,
  modelName: '${modelNameUpperWithEntity}',
  createdAt: false,
  updatedAt: false,
})
export class ${modelNameUpperWithEntity} extends Model<${modelNameUpperWithEntity}> {\n`;
  for (const key in attrMap) {
    if (Object.hasOwnProperty.call(attrMap, key)) {
      const field = attrMap[key];
      const fieldStr = handleField(field);
      fileContent += fieldStr;
    }
  }
  fileContent += `}\n`;
  saveTextFile(fileContent, outFilePath);
}

function handleField(obj) {
  let { allowNull, primaryKey, fieldName, field, comment, autoIncrement, defaultValue, type } = obj;

  // 处理时间戳类型的默认值
  if (defaultValue) {
    if (defaultValue.val && defaultValue.val === 'CURRENT_TIMESTAMP') {
      defaultValue = 'DataType.NOW';
    } else if (typeof defaultValue === 'string') {
      defaultValue = `'${defaultValue}'`;
    }
  } else if (defaultValue === '') {
    defaultValue = "''";
  } else if (defaultValue === 0) {
    defaultValue = 0;
  }

  const typeStr = getJSType(type, field);
  let error = false;
  if (typeStr === undefined) {
    console.warn(`警告: ${type.toString()}不识别，字段：${field}`);
    error = true;
  }
  if (error) {
    console.log('请检查错误，然后重新运行');
    exit(0);
  }
  // if (comment && comment.startsWith('DEBIT_CARD')) {
  //   console.log(1, comment);
  //   console.log('=======');
  //   console.log(comment.replace(/\r\n/g, '\\n'));
  // }
  comment = comment ? comment.replace(/\r\n/g, '\\n') : '';

  const fieldStr = `@Column({
    type: DataType.${typeStr[0]},
    allowNull: ${!!allowNull},
    ${primaryKey ? 'primaryKey: true,\n' : ''}${comment ? `comment: '${comment}',\n` : ''}${autoIncrement ? 'autoIncrement: true,\n' : ''
    }${defaultValue !== undefined ? `defaultValue: ${defaultValue},\n` : ''}})
  ${fieldName}: ${typeStr[1]};\n
  `;
  return fieldStr;
}

async function main() {
  if (!fs.existsSync(modelOutPutPath)) {
    fs.mkdirSync(modelOutPutPath, { recursive: true });
  }

  //1. 生成model
  const { database, port, password, username, host, dialect } = devConfig;
  const params = `-o ${modelOutPutPath} --cm p --cp c --cf c -d ${database} -h ${host} -u ${username} -p ${port}${password ? ` -x ${password}` : ''
    } ${password} -e ${dialect}`;
  // console.log(params);
  childProcess.execSync(`yarn sequelize-auto ${params}`);
  console.log('model 已生成, 开始生成entity');

  //2. 用model生成entity
  // 读取models下面的文件
  const files = fs.readdirSync(modelOutPutPath);

  let validFiles = files.filter((r) => {
    const ext = path.extname(r);
    return !ignoreFiles.includes(r) && ext === '.js';
  });

  for (let index = 0; index < validFiles.length; index++) {
    const file = validFiles[index];
    await handleFile(file, index);
  }
  if (isDirty || overwriteIfExist) {
    console.log('entity 已生成, 开始格式化');
    // 3. 格式化
    childProcess.execSync('yarn eslint src/entity/*.ts --fix');
  }
  console.log(`entity已生成, 路径: ${entityPath}`);
}
main();
