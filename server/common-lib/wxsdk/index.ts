import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.weixin.qq.com/cgi-bin',
});

let ACCESS_TOKEN = null;
let OPEN_CONFIG = {
  appId: '',
  secret: '',
};

let LazyGetAccessToken = async () => null; // 获取token
let LazyRefreshAccessToken = async (accessToken: string, expiresIn: string) => null; // 刷新token
// const ErrorCode = {
//   BUSY: -1, // 系统繁忙，此时请开发者稍候再试
//   SUCCESS: 0, // 请求成功
//   INVALID_CREDENTIAL: 40001, // 获取access_token时AppSecret错误，或者access_token无效
// };

axiosInstance.interceptors.request.use((config) => {
  if (ACCESS_TOKEN) {
    config.params = {
      ...config.params,
      access_token: ACCESS_TOKEN,
    };
  }
  return config;
});

axiosInstance.interceptors.response.use((res) => {
  if (res.data?.errcode || res.data?.errcode === 0) {
    console.log('微信返回了错误');
    console.log('url' + res.config.url);
    console.log('params', res.config.params);
    console.log('body', res.config.data);
    throw new Error(res?.data?.errmsg);
  }
  return res.data;
});

async function initSDK(config, onReadAccessToken, onWriteAccessToken) {
  OPEN_CONFIG = {
    appId: config.appId,
    secret: config.secret,
  };
  LazyGetAccessToken = onReadAccessToken;
  LazyRefreshAccessToken = onWriteAccessToken;
  try {
    ACCESS_TOKEN = await LazyGetAccessToken();
    if (!ACCESS_TOKEN) {
      await forceRefreshAccessToken();
    }
    console.log('初始化微信SDK成功');
  } catch (error) {
    throw error;
  }
}
async function forceRefreshAccessToken() {
  const res = await axiosInstance.get<any, { access_token: string; expires_in: string }>('/token', {
    params: {
      grant_type: 'client_credential',
      appid: OPEN_CONFIG.appId,
      secret: OPEN_CONFIG.secret,
    },
  });
  ACCESS_TOKEN = res.access_token;
  console.log('刷新token成功', ACCESS_TOKEN);
  try {
    await LazyRefreshAccessToken(res.access_token, res.expires_in);
  } catch (error) {}
}

// 创建菜单
async function createMenu(menu) {
  return await axiosInstance.post('/menu/create', menu);
}

// 创建草稿
async function createDraft(draft) {
  return await axiosInstance.post('/draft/add', draft);
}
// 获取素材列表
async function materialList(param) {
  return await axiosInstance.post('/material/batchget_material', param);
}
// 获取永久素材
async function getMaterial(mediaId) {
  return await axiosInstance.get('/material/get_material', { params: { media_id: mediaId } });
}
// 获取临时素材
async function getTempMaterial(mediaId) {
  return await axiosInstance.get('/media/get', { params: { media_id: mediaId } });
}

// 发表草稿
async function publishDraft(mediaId) {
  return await axiosInstance.post('/freepublish/submit', { media_id: mediaId });
}

module.exports = {
  initSDK,
  createMenu,
  createDraft,
  publishDraft,
  materialList,
  getMaterial,
  getTempMaterial,
};
