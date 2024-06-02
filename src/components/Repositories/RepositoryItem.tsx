import { Repository } from "../../redux/Reducers/repositoryReducer";

type RepositoryItemProps = {
  onClickRepository: (id: string) => Promise<void>;
  repo: Repository;
  index: number;
};

export default function RepositoryItem({ repo, index, onClickRepository }: RepositoryItemProps) {
  const changeBg = index % 2 !== 0;
  return (
    <tr
      onClick={() => onClickRepository(repo.id)}
      key={repo.id}
      className={`${changeBg ? "bg-gray-50" : ""} hover:scale-[1.005] hover:cursor-pointer transition ease-in-out delay-[0.2]`}
    >
      <td className="py-2 px-4">{repo.name}</td>
      <td className="py-2 px-4">{repo.owner.name ? repo.owner.name : repo.owner.login}</td>
      <td className="py-2 px-4">{repo.description}</td>
    </tr>
  );
}
