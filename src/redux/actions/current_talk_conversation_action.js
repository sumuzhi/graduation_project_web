import { SAVE_CURRENT_TALK_CONVERSATION } from "../action_types";

export const current_talk_conversation_action = (value) => {
  return { type: SAVE_CURRENT_TALK_CONVERSATION, data: value }
}