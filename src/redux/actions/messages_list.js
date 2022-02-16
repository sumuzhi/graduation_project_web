import { GETMESSAGELIST,UPDATEMESSAGELIST } from "../action_types";

export const get_message_list_action = (value) => {
  return { type: GETMESSAGELIST, data: value }
}

export const update_message_list_action = (value) => {
  return { type: UPDATEMESSAGELIST, data: value }
}