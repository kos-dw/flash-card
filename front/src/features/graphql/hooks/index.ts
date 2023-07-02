/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import gql from 'graphql-tag';
import * as Urql from 'urql';

import type {
  CardUpdateMutation,
  CardUpdateMutationVariables,
  CardFindAllQueryVariables,
  CardFindAllQuery,
  CardCreateMutation,
  CardCreateMutationVariables,
  CategoryFindAllQueryVariables,
  CategoryFindAllQuery,
  CardEraseMutation,
  CardEraseMutationVariables,
  SignInMutation,
  SignInMutationVariables,
  UserDataQuery,
  UserDataQueryVariables,
} from '../codegen/graphql';

export const CardFindAllDocument = gql`
  query CardFindAll {
    wordCollections {
      data {
        id
        attributes {
          title
          japanese
          category {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export function useCardFindAllQuery(
  options?: Omit<Urql.UseQueryArgs<CardFindAllQueryVariables>, 'query'>
) {
  return Urql.useQuery<CardFindAllQuery, CardFindAllQueryVariables>({
    query: CardFindAllDocument,
    ...options,
  });
}
export const CategoryFindAllDocument = gql`
  query CategoryFindAll {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export function useCategoryFindAllQuery(
  options?: Omit<Urql.UseQueryArgs<CategoryFindAllQueryVariables>, 'query'>
) {
  return Urql.useQuery<CategoryFindAllQuery, CategoryFindAllQueryVariables>({
    query: CategoryFindAllDocument,
    ...options,
  });
}
export const UserDataDocument = gql`
  query UserData {
    me {
      id
      username
      email
    }
  }
`;

export function useUserDataQuery(
  options?: Omit<Urql.UseQueryArgs<UserDataQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserDataQuery, UserDataQueryVariables>({
    query: UserDataDocument,
    ...options,
  });
}
export const CardUpdateDocument = gql`
  mutation CardUpdate(
    $id: ID!
    $title: String!
    $japanese: String!
    $category: ID!
  ) {
    updateWordCollection(
      id: $id
      data: { title: $title, japanese: $japanese, category: $category }
    ) {
      data {
        id
        attributes {
          title
          japanese
          category {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export function useCardUpdateMutation() {
  return Urql.useMutation<CardUpdateMutation, CardUpdateMutationVariables>(
    CardUpdateDocument
  );
}
export const CardCreateDocument = gql`
  mutation CardCreate($title: String!, $japanese: String!, $category: ID!) {
    createWordCollection(
      data: { title: $title, japanese: $japanese, category: $category }
    ) {
      data {
        id
        attributes {
          title
          japanese
          category {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export function useCardCreateMutation() {
  return Urql.useMutation<CardCreateMutation, CardCreateMutationVariables>(
    CardCreateDocument
  );
}
export const CardEraseDocument = gql`
  mutation CardErase($id: ID!) {
    deleteWordCollection(id: $id) {
      data {
        id
      }
    }
  }
`;

export function useCardEraseMutation() {
  return Urql.useMutation<CardEraseMutation, CardEraseMutationVariables>(
    CardEraseDocument
  );
}
export const SignInDocument = gql`
  mutation SignIn($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      user {
        id
        username
        email
      }
      jwt
    }
  }
`;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument
  );
}
