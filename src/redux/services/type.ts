export type TUser = {
  type: "User" | "Organization" | string;
  id: string;
  bio?: string;
  description?: string;
  avatarUrl: string;
  url: string;
  name: string;
  login: string;
  location: string;
  repositories: {
    totalCount: number;
  };
};

export type TUsersResponse = {
  userCount: number;
  users: TUser[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
};

export type TRepository = {
  type: "Repository" | string;
  id: string;
  url: string;
  description: string;
  name: string;
  nameWithOwner: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  language: {
    color: string;
    name: string;
  };
  starred: number;
  topics: {
    topics: { url: string; topic: { name: string } }[];
  };
  updatedAt: string;
};

export type TRepositoriesResponse = {
  repositoryCount: number;
  repositories: TRepository[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
};
