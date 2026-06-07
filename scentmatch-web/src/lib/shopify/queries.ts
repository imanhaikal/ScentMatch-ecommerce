const PRODUCT_FIELDS = `#graphql
  fragment ScentProductFields on Product {
    id
    handle
    title
    description
    featuredImage {
      url
      altText
    }
    images(first: 8) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 1) {
      edges {
        node {
          id
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
        }
      }
    }
    artisan: metafield(namespace: "custom", key: "artisan") {
      value
    }
    concentration: metafield(namespace: "custom", key: "concentration") {
      value
    }
    topNotes: metafield(namespace: "custom", key: "top_notes") {
      value
    }
    heartNotes: metafield(namespace: "custom", key: "heart_notes") {
      value
    }
    baseNotes: metafield(namespace: "custom", key: "base_notes") {
      value
    }
    shortDescription: metafield(namespace: "custom", key: "short_description") {
      value
    }
  }
`;

export const PRODUCTS_QUERY = `#graphql
  ${PRODUCT_FIELDS}

  query ScentProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...ScentProductFields
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `#graphql
  ${PRODUCT_FIELDS}

  query ScentProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ScentProductFields
    }
  }
`;

export const CART_CREATE_MUTATION = `#graphql
  mutation ScentCartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `#graphql
  mutation ScentCartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `#graphql
  mutation ScentCartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `#graphql
  mutation ScentCartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;
