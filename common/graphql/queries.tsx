import { gql } from "@apollo/client"

export const LIST_BLOG = gql(`query {
  blogPosts {
    data {
      id
      attributes {
        Title
      }
    }
  }
}`)

export const SINGLE_BLOG = gql(`query ($blogId: ID!) {
  blogPosts(filters: {id: {eq: $blogId}}) {
    data {
      id
      attributes {
        Title
        Description
        Body
      }
    }
  }
}`)

export const LIST_ID = gql(`query {
  blogPosts {
    data {
      id
    }
  }
}`)