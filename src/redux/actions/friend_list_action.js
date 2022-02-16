import { DELETEFRIENDSLISTS, SAVE_FRIENDS_LIST } from "../action_types";

export const friends_list_action = (value) => {
  return { type: SAVE_FRIENDS_LIST, data: value }
}

export const delete_friends_list_action = value => {
  return { type: DELETEFRIENDSLISTS, data: value }
}