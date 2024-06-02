import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateOpenModal(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

const selector = (state: RootState) => state.modal;

export const isModalOpened = createSelector(selector, (s) => s.isOpen);

export const { updateOpenModal } = modalSlice.actions;
export default modalSlice.reducer;
