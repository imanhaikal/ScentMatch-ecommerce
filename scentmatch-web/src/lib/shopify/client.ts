interface ShopifyGraphQLError {
  message: string;
}

interface ShopifyGraphQLResponse<TData> {
  data?: TData;
  errors?: ShopifyGraphQLError[];
}

export interface ShopifyConfig {
  endpoint: string;
  token: string;
}

const DEFAULT_API_VERSION = "2026-04";

function normalizeDomain(domain: string) {
  return domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function getShopifyConfig(): ShopifyConfig {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || DEFAULT_API_VERSION;

  if (!domain || !token) {
    throw new Error(
      "Missing Shopify environment variables: SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN are required.",
    );
  }

  return {
    endpoint: `https://${normalizeDomain(domain)}/api/${version}/graphql.json`,
    token,
  };
}

export async function shopifyFetch<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const config = getShopifyConfig();
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": config.token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront API request failed with status ${response.status}.`);
  }

  const json = (await response.json()) as ShopifyGraphQLResponse<TData>;

  if (json.errors?.length) {
    throw new Error(`Shopify Storefront API error: ${json.errors.map((error) => error.message).join("; ")}`);
  }

  if (!json.data) {
    throw new Error("Shopify Storefront API returned no data.");
  }

  return json.data;
}
