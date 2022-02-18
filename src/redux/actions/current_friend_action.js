import { SETCURRENTFRIENDINFO } from "../action_types";

export const current_friend_action = (value) => {
  return { type: SETCURRENTFRIENDINFO, data: value }
}