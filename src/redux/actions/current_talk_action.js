import { SAVE_CURRENT_TALK_FRIEND } from "../action_types";

export const current_talk_action = (value) => {
  return { type: SAVE_CURRENT_TALK_FRIEND, data: value }
}