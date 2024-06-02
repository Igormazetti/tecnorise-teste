import { isModalOpened, updateOpenModal } from "../redux/Reducers/modalReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useModal = () => {
  const modalOpened = useAppSelector(isModalOpened);
  const dispatch = useAppDispatch();
  function handleToggleModal() {
    if (modalOpened) {
      dispatch(updateOpenModal(false));
      return;
    }

    dispatch(updateOpenModal(true));
  }

  return {
    handlers: {
      handleToggleModal,
    },
    states: {
      isModalOpened: modalOpened,
    },
  };
};
