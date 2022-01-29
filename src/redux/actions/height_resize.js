import { RESIZE } from "../action_types";

export const resize_height = (value) => {
  return { type: RESIZE, data: value }
}