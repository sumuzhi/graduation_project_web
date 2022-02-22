import { CHANGETABACTIVE } from "../action_types";

export const change_tab_active_action = (value) => {
  return { type: CHANGETABACTIVE, data: value }
}