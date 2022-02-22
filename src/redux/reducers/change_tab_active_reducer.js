import { CHANGETABACTIVE } from '../action_types'


export default function change_tab_active_to_talk_reducer(preState = "message", action) {
  let { type, data } = action
  if (type === CHANGETABACTIVE)
    return data
  return preState
}
