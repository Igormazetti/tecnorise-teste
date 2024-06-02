import { Repository } from "../../redux/Reducers/repositoryReducer";

interface Edge {
  node: Repository;
}

interface RepositoryResponse {
  search: {
    edges: Edge[];
  };
}

export function handleFormatRepositoryResponse(data: RepositoryResponse): Repository[] {
  return data.search?.edges.map((repo: Edge) => repo.node);
}
