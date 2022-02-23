import { MESSAGELIST, ADDMESSAGEFLAG, DELETEMESSAGEFLAG, PUSHMESSAGETOLIST } from "../action_types";

export const set_message_list_action = (value) => {
  return { type: MESSAGELIST, data: value }
}

export const update_message_list_action = (value) => {
  return { type: ADDMESSAGEFLAG, data: value }
}

export const push_message_list_action = (value) => {
  return { type: PUSHMESSAGETOLIST, data: value }
}


export const delete_message_list_action = (value) => {
  return { type: DELETEMESSAGEFLAG, data: value }
}