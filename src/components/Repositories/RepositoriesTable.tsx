import { Repository } from "../../redux/Reducers/repositoryReducer";
import RepositoryItem from "./RepositoryItem";

type RepositoriesTableProps = {
  onClickRepository: (id: string) => Promise<void>;
  repositories: Repository[];
};

export default function RepositoriesTable({ repositories, onClickRepository }: RepositoriesTableProps) {
  return (
    <div className="max-w-[380px] overflow-x-auto lg:overflow-hidden lg:max-w-full lg:w-full">
      <table className="w-full bg-white rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b border-gray-200 text-start rounded-tl-[8px] min-w-[200px] lg:min-w-[280px] ">Nome</th>
            <th className="py-2 px-4 border-b border-gray-200 text-start">Proprietário</th>
            <th className="py-2 px-4 border-b border-gray-200 text-start rounded-tr-[8px] min-w-[300px]">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {repositories.map((repo, index) => (
            <RepositoryItem key={repo.id} repo={repo} index={index} onClickRepository={onClickRepository} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
