import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from 'redux-thunk';
import reducers from './reducers'


const loadState = () => {
  try {
    let username = localStorage.getItem('username')
    let number_id = localStorage.getItem('number_id')
    let userPhotoImg = localStorage.getItem('userPhotoImg') // 也能够容错一下不支持localStorage的状况下，用其余本地存储
    let userInfo = {
      username: username,
      number_id: number_id,
      userPhotoImg: userPhotoImg,
      isLogin: username ? true : false
    }
    if (userInfo === null) {
      return undefined;
    } else {
      return JSON.parse(userInfo);
    }
  } catch (err) {
    // ... 错误处理
    return undefined;
  }
}


export default createStore(
  reducers,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk))
)