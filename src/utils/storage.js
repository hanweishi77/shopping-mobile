const INFO_KEY = 'mb_shopping_info'
const HISTORY_KEY = 'mb_history_search'

// 获取本地存储的token, userId
export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}

// token,userId存入本地localStorage
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 搜索历史存入本地localStorage
export const setHistorySearch = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}

//  获取本地localStorage存储的搜索历史
export const getHistorySearch = () => {
  const defaultArr = []
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : defaultArr
}
