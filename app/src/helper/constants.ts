
export const typeArr = [
  {
    id: 1,
    text: '喂奶',
  },
  {
    id: 2,
    text: '换尿不湿',
  },
  {
    id: 3,
    text: '开始睡觉',
  },
  {
    id: 4,
    text: '睡醒',
  },
  {
    id: 5,
    text: '其他',
  },
]

export const feedTypeArr = [
  {
    id: 1,
    text: '亲喂',
  },
  {
    id: 2,
    text: '瓶喂',
  },
]

export const milkTypeArr = [
  {
    id: 1,
    text: '母乳',
  },
  {
    id: 2,
    text: '奶粉',
  },
]


export function getUrl() {
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  } else {
    // return 'https://your_server_address.com';
  }
}

export const YEAR_1997 = new Date(1997, 0, 1, 0, 0, 0, 0)