import { gql } from "@apollo/client";

export const LIST_ALL_REPOSITORIES = gql`
  query listAllPublicRepositories($first: Int!, $after: String) {
    search(query: "is:public", type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            owner {
              login
              ... on User {
                name
              }
            }
            description
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_DETAILS = gql`
  query getRepositoryDetailsById($id: ID!) {
    node(id: $id) {
      ... on Repository {
        name
        owner {
          login
          ... on User {
            name
          }
        }
        description
        forks {
          totalCount
        }
        stargazers {
          totalCount
        }
        issues(states: OPEN) {
          totalCount
        }
        pullRequests(states: OPEN) {
          totalCount
        }
        defaultBranchRef {
          target {
            ... on Commit {
              history {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_REPOSITORIES_BY_NAME = gql`
  query searchPublicRepositoriesByName($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              login
              ... on User {
                name
              }
            }
            description
          }
        }
      }
    }
  }
`;
