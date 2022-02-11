import { GETMESSAGES, PUSHMESSAGE } from "../action_types";

export const current_messages_action = (value) => {
  return { type: GETMESSAGES, data: value }
}

export const push_send_action = value => {
  return { type: PUSHMESSAGE, data: value }
}