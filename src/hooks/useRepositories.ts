import { useLazyQuery } from "@apollo/client";
import { GET_REPOSITORY_DETAILS, LIST_ALL_REPOSITORIES, SEARCH_REPOSITORIES_BY_NAME } from "../graphql/Query";

import { selectRepositories, selectRepositoryDetails, setRepository, setRepositoryDetails } from "../redux/Reducers/repositoryReducer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useModal } from "./useModal";
import { handleFormatRepositoryResponse } from "../shared/utils";
import { useState } from "react";

interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const useRepositories = () => {
  const dispatch = useAppDispatch();
  const repositories = useAppSelector(selectRepositories);
  const repositoriyDetails = useAppSelector(selectRepositoryDetails);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);

  const { handlers } = useModal();

  const [getRepositories, { loading: repositoriesLoading }] = useLazyQuery(LIST_ALL_REPOSITORIES);

  const [getRepositoryDetails, { loading: repositoryDetailsLoading }] = useLazyQuery(GET_REPOSITORY_DETAILS);

  const [getRepositoryByName, { loading: repositoryByNameLoading }] = useLazyQuery(SEARCH_REPOSITORIES_BY_NAME);

  async function handleGetRepositories(after: string | null) {
    const { data } = await getRepositories({ variables: { first: 10, after } });
    setPageInfo(data.search.pageInfo);
    const properData = handleFormatRepositoryResponse(data);
    dispatch(setRepository(properData));
  }

  function updateCursorHistory(newCursor: string) {
    setCursorHistory((prevHistory) => [...prevHistory, newCursor]);
  }

  function substituteCursorHistory(newHistory: string[]) {
    setCursorHistory(newHistory);
  }

  function resetCursorHistory() {
    setCursorHistory([]);
  }

  async function handleClickRepository(id: string) {
    handlers.handleToggleModal();
    const { data } = await getRepositoryDetails({ variables: { id } });
    dispatch(setRepositoryDetails(data.node));
  }

  async function handleSearchByName(name: string, after: string | null) {
    const { data } = await getRepositoryByName({ variables: { query: name, first: 10, after } });
    setPageInfo(data.search.pageInfo);
    const properData = handleFormatRepositoryResponse(data);
    dispatch(setRepository(properData));
  }

  return {
    handlers: {
      handleGetRepositories,
      handleClickRepository,
      handleSearchByName,
      updateCursorHistory,
      resetCursorHistory,
      substituteCursorHistory,
    },
    states: {
      repositoriesLoading,
      repositoryDetailsLoading,
      repositoryByNameLoading,
      repositories,
      repositoriyDetails,
      pageInfo,
      cursorHistory,
    },
  };
};
