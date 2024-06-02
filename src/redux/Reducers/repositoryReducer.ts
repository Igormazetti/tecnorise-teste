import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Repository {
  id: string;
  name: string;
  owner: { name: string; login: string };
  description: string;
}

export interface RepositoryDetails {
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  };
  description: string;
  forks: {
    totalCount: number;
  };
  issues: {
    totalCount: number;
  };
  name: string;
  owner: {
    name: string;
    login: string;
  };
  pullRequests: {
    totalCount: number;
  };
  stargazers: {
    totalCount: number;
  };
}

interface RepositoryState {
  repositories: Repository[];
  repositoryDetails: RepositoryDetails;
}

const initialState: RepositoryState = {
  repositories: [],
  repositoryDetails: {} as RepositoryDetails,
};

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    setRepository(state, action: PayloadAction<Repository[]>) {
      state.repositories = action.payload;
    },
    setRepositoryDetails(state, action: PayloadAction<RepositoryDetails>) {
      state.repositoryDetails = action.payload;
    },
  },
});

const selector = (state: RootState) => state.repositories;

export const selectRepositories = createSelector(selector, (s) => s.repositories);

export const selectRepositoryDetails = createSelector(selector, (s) => s.repositoryDetails);

export const { setRepository, setRepositoryDetails } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
