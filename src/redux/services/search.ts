import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";

import { TRepositoriesResponse, TUsersResponse } from "./type";
import { graphqlBaseQuery } from "@/utils/graphqlBaseQuery";

type TParams = {
  first?: number;
  last?: number;
  query: string;
  after?: string;
  before?: string;
};

const getUsersQuery = gql`
  query searchUsersQuery(
    $first: Int
    $last: Int
    $query: String!
    $after: String
    $before: String
  ) {
    search(
      query: $query
      type: USER
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      userCount
      users: nodes {
        type: __typename
        ... on Organization {
          id
          login
          name
          description
          avatarUrl
          url
          location
          repositories {
            totalCount
          }
        }
        ... on User {
          id
          bio
          avatarUrl
          url
          name
          login
          location
          repositories {
            totalCount
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

const getRepositoriesQuery = gql`
  query searchRepositoriesQuery(
    $first: Int
    $last: Int
    $query: String!
    $after: String
    $before: String
  ) {
    search(
      query: $query
      type: REPOSITORY
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      repositoryCount
      repositories: nodes {
        type: __typename
        ... on Repository {
          id
          url
          nameWithOwner
          name
          owner {
            login
            avatarUrl
          }
          description
          language: primaryLanguage {
            color
            name
          }
          starred: stargazerCount
          topics: repositoryTopics(first: 5) {
            topics: nodes {
              url
              topic {
                name
              }
            }
          }
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

export const searchApi = createApi({
  reducerPath: "search",
  baseQuery: graphqlBaseQuery({ baseUrl: "https://api.github.com/graphql" }),
  endpoints: (builder) => ({
    getUsers: builder.query<TUsersResponse, TParams>({
      query: ({ first, last, query, after, before }: TParams) => ({
        body: getUsersQuery,
        variables: { first, last, query, after, before },
      }),
      transformResponse: (response: { search: TUsersResponse }) =>
        response.search,
    }),
    getRepositories: builder.query<TRepositoriesResponse, TParams>({
      query: ({ first, last, query, after, before }: TParams) => ({
        body: getRepositoriesQuery,
        variables: { first, last, query, after, before },
      }),
      transformResponse: (response: { search: TRepositoriesResponse }) =>
        response.search,
    }),
  }),
});

export const { useGetUsersQuery, useGetRepositoriesQuery } = searchApi;
