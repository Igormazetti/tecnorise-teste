import { SET_REPOSITORIES } from "../ActionTypes/repositoryActions";

export interface Repository {
  id: string;
  name: string;
  owner: { name: string; login: string };
  description: string;
}

export interface SetRepositoryModalAction {
  type: typeof SET_REPOSITORIES;
  payload: Repository;
}

export const setRepository = (data: Repository): SetRepositoryModalAction => ({
  type: SET_REPOSITORIES,
  payload: data,
});
