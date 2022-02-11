import { SENDMESSAGE } from "../action_types";

export const socket_send_action = (value) => {
  return { type: SENDMESSAGE, data: value }
}