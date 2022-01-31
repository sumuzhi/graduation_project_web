import { RESIZE } from "../action_types";

export const resize_heightAction = (value) => {
  return { type: RESIZE, data: value }
}