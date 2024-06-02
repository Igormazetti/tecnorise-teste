import { useEffect, useState } from "react";
import { useRepositories } from "./hooks/useRepositories";
import TableLoadingSkeleton from "./shared/TableLoadingSkeleton";
import RepositoriesTable from "./components/Repositories/RepositoriesTable";
import { useModal } from "./hooks/useModal";
import Modal from "./components/RepositoryDetails/Modal";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const { handlers, states } = useRepositories();
  const { handlers: ModalHandlers, states: ModalStates } = useModal();

  const [after, setAfter] = useState<string | null>(null);
  const [search, setSearch] = useState<string>();
  const [isInitialSearch, setIsInitialSearch] = useState<boolean>(true);

  const debouncedPayload = useDebounce({
    value: search,
    delay: 500,
  });

  const handleNextPage = () => {
    if (states.pageInfo && states.pageInfo.hasNextPage) {
      setAfter(states.pageInfo.endCursor);
      handlers.updateCursorHistory(states.pageInfo.endCursor);
      setIsInitialSearch(false);
    }
  };

  const handlePreviousPage = () => {
    const cursorHistory = [...states.cursorHistory];
    if (cursorHistory.length > 1) {
      cursorHistory.pop();
      setAfter(cursorHistory[cursorHistory.length - 1]);
    } else {
      cursorHistory.pop();
      setAfter(null);
    }
    handlers.substituteCursorHistory(cursorHistory);
    setIsInitialSearch(false);
  };

  useEffect(() => {
    if (debouncedPayload) {
      if (isInitialSearch) {
        setAfter(null);
        handlers.resetCursorHistory();
      }
      handlers.handleSearchByName(debouncedPayload, after);
    } else {
      handlers.handleGetRepositories(after);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPayload, after]);

  useEffect(() => {
    if (!states.repositories.length) {
      handlers.handleGetRepositories(after);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsInitialSearch(true);
  }, [debouncedPayload]);

  return (
    <div className="h-full p-4 pb-8 w-full">
      <div className="w-full">
        <h1 className="w-full text-center text-[30px] font-bold mb-16">Teste Tecnorise</h1>

        <div className="flex justify-center mb-8 w-full">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-[300px] lg:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Search repositories..."
          />
        </div>

        {states.repositoriesLoading || states.repositoryByNameLoading ? (
          <TableLoadingSkeleton />
        ) : (
          <>
            <RepositoriesTable repositories={states.repositories} onClickRepository={handlers.handleClickRepository} />
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={!after}
                className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={handleNextPage}
                disabled={!states.pageInfo?.hasNextPage}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Próxima
              </button>
            </div>
          </>
        )}
        <Modal
          isOpened={ModalStates.isModalOpened}
          repositoryDetails={states.repositoriyDetails}
          onClose={ModalHandlers.handleToggleModal}
          isLoading={states.repositoryDetailsLoading}
        />
      </div>
    </div>
  );
}

export default App;
