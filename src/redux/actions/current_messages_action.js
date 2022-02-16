import { DELETECURRENTTALKMESSAGES, GETMESSAGES, PUSHMESSAGE } from "../action_types";

export const current_messages_action = (value) => {
  return { type: GETMESSAGES, data: value }
}

export const push_send_action = value => {
  return { type: PUSHMESSAGE, data: value }
}
export const delete_current_talk_messages_action = value => {
  return { type: DELETECURRENTTALKMESSAGES, data: value }
}