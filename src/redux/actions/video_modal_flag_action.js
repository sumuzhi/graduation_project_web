import { VIDEOMODALFLAG } from "../action_types";

export const change_video_modal_flag_action = (value) => {
  return { type: VIDEOMODALFLAG, data: value }
}
