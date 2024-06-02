import { RepositoryDetails } from "../../redux/Reducers/repositoryReducer";
import LoadingSkeleton from "../../shared/LoadingSkeleton";

interface ModalProps {
  isOpened: boolean;
  repositoryDetails: RepositoryDetails;
  onClose: () => void;
  isLoading: boolean;
}

export default function Modal({ isOpened, repositoryDetails, onClose, isLoading }: ModalProps) {
  const handleRepositoryOwnerName = () => {
    if (!repositoryDetails.owner) {
      return "";
    }

    if (!repositoryDetails.owner.name) {
      return repositoryDetails.owner.login;
    }

    return repositoryDetails.owner.name;
  };
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden={!isOpened}
      className={`${
        isOpened ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      {isOpened && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}
      <div className="relative p-4 w-full max-w-2xl max-h-full z-50">
        <div className="relative bg-gray-100 rounded-lg shadow dark:bg-gray-300">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-400">
            <h3 className="text-xl font-semibold ">Detalhes do repositório {isLoading ? "" : repositoryDetails?.name}</h3>
            <button
              type="button"
              className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {isLoading ? (
            <div className="flex w-full justify-center">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed ">Proprietário: {handleRepositoryOwnerName()}</p>
              <p className="text-base leading-relaxed ">
                Total de commits: {repositoryDetails?.defaultBranchRef?.target?.history?.totalCount}
              </p>
              <p className="text-base leading-relaxed ">Issues abertas: {repositoryDetails?.issues?.totalCount}</p>
              <p className="text-base leading-relaxed ">Pull requests: {repositoryDetails?.pullRequests?.totalCount}</p>
              <p className="text-base leading-relaxed ">Total de estrelas: {repositoryDetails?.stargazers?.totalCount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
