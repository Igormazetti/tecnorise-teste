import { UPDATE_OPEN_MODAL } from "../ActionTypes/modalActionTypes";

export interface UpdateOpenModalAction {
  type: typeof UPDATE_OPEN_MODAL;
  payload: boolean;
}

export const updateOpenModal = (isOpen: boolean): UpdateOpenModalAction => ({
  type: UPDATE_OPEN_MODAL,
  payload: isOpen,
});
