import { VIDEOMODALFLAG } from '../action_types'


export default function video_modal_refucer(preState = false, action) {
  let { type, data } = action
  if (type === VIDEOMODALFLAG)
    return data
  return preState
}
