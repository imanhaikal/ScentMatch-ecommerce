import { afterEach, describe, expect, it, vi } from "vitest";

interface MockLocalProduct {
  id: string;
  name: string;
  artisan: string;
  price: number;
  images: string[];
  description: string;
  category: "Extract" | "Parfum" | "Cologne";
  stock: number;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  reviews: [];
}

const mockedProducts = vi.hoisted(() => ({ PRODUCTS: [] as MockLocalProduct[] }));

vi.mock("@/data/products", () => mockedProducts);

import { getProductsPage } from "./products";

const originalEnv = process.env;

function productNode(id: string, handle: string, title: string, concentration = "Parfum") {
  return {
    id: `gid://shopify/Product/${id}`,
    handle,
    title,
    vendor: "ScentMatch",
    description: `${title} description`,
    featuredImage: null,
    images: { edges: [] },
    variants: {
      edges: [
        {
          node: {
            id: `gid://shopify/ProductVariant/${id}`,
            availableForSale: true,
            quantityAvailable: 10,
            price: { amount: "199.00", currencyCode: "MYR" },
          },
        },
      ],
    },
    artisan: null,
    concentration: { value: concentration },
    topNotes: null,
    heartNotes: null,
    baseNotes: null,
    shortDescription: null,
  };
}

function localProduct(id: number) {
  return {
    id: `perfume-${id}`,
    name: `Perfume ${id}`,
    artisan: "ScentMatch",
    price: 100 + id,
    images: ["/santal-vol-1.jpg"],
    description: `Perfume ${id} description`,
    category: "Parfum",
    stock: 10,
    notes: {
      top: "Bergamot",
      heart: "Rose",
      base: "Musk",
    },
    reviews: [],
  };
}

function productsResponse(
  edges: Array<{ node: ReturnType<typeof productNode> }>,
  pageInfo: { hasNextPage: boolean; endCursor: string | null },
) {
  return {
    ok: true,
    json: async () => ({
      data: {
        products: {
          edges,
          pageInfo,
        },
      },
    }),
  };
}

describe("Shopify product fetching", () => {
  afterEach(() => {
    process.env = originalEnv;
    mockedProducts.PRODUCTS = [];
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("fetches only the requested Shopify products page", async () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "scentmatch.myshopify.com",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "token",
      SHOPIFY_STOREFRONT_API_VERSION: "2026-04",
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        productsResponse(
          [
            { node: productNode("1", "santal-vol-1", "Santal Vol. 1") },
            { node: productNode("2", "oud-noir", "Oud Noir") },
          ],
          { hasNextPage: true, endCursor: "cursor-2" },
        ),
      )
      .mockResolvedValueOnce(
        productsResponse(
          [{ node: productNode("3", "iris-smoke", "Iris Smoke") }],
          { hasNextPage: false, endCursor: "cursor-3" },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);

    const result = await getProductsPage(2, 2);

    expect(result.products.map((product) => product.handle)).toEqual(["iris-smoke"]);
    expect(result.currentPage).toBe(2);
    expect(result.hasPreviousPage).toBe(true);
    expect(result.hasNextPage).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string).variables).toEqual({
      first: 2,
      after: null,
      query: null,
    });
    expect(JSON.parse(fetchMock.mock.calls[1][1]?.body as string).variables).toEqual({
      first: 2,
      after: "cursor-2",
      query: null,
    });
  });

  it("paginates fallback products without Shopify config", async () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "",
    };
    mockedProducts.PRODUCTS = Array.from({ length: 50 }, (_, index) => localProduct(index + 1));

    const result = await getProductsPage(2, 24);

    expect(result.products.map((product) => product.id)).toEqual([
      "perfume-25",
      "perfume-26",
      "perfume-27",
      "perfume-28",
      "perfume-29",
      "perfume-30",
      "perfume-31",
      "perfume-32",
      "perfume-33",
      "perfume-34",
      "perfume-35",
      "perfume-36",
      "perfume-37",
      "perfume-38",
      "perfume-39",
      "perfume-40",
      "perfume-41",
      "perfume-42",
      "perfume-43",
      "perfume-44",
      "perfume-45",
      "perfume-46",
      "perfume-47",
      "perfume-48",
    ]);
    expect(result.currentPage).toBe(2);
    expect(result.hasPreviousPage).toBe(true);
    expect(result.hasNextPage).toBe(true);
  });

  it("passes search queries to Shopify before pagination", async () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "scentmatch.myshopify.com",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "token",
      SHOPIFY_STOREFRONT_API_VERSION: "2026-04",
    };
    const fetchMock = vi.fn().mockResolvedValueOnce(
      productsResponse(
        [{ node: productNode("3", "iris-smoke", "Iris Smoke") }],
        { hasNextPage: false, endCursor: "cursor-3" },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await getProductsPage(1, 24, "Iris Smoke");

    expect(result.products.map((product) => product.handle)).toEqual(["iris-smoke"]);
    expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string).variables).toEqual({
      first: 24,
      after: null,
      query: "Iris Smoke",
    });
  });

  it("searches fallback products before slicing pages", async () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "",
    };
    mockedProducts.PRODUCTS = Array.from({ length: 50 }, (_, index) => localProduct(index + 1));
    mockedProducts.PRODUCTS[29] = {
      ...mockedProducts.PRODUCTS[29],
      name: "Hidden Iris Smoke",
    };

    const result = await getProductsPage(1, 24, "hidden iris");

    expect(result.products.map((product) => product.id)).toEqual(["perfume-30"]);
    expect(result.currentPage).toBe(1);
    expect(result.hasPreviousPage).toBe(false);
    expect(result.hasNextPage).toBe(false);
  });

  it("filters fallback products by category before slicing pages", async () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "",
    };
    mockedProducts.PRODUCTS = Array.from({ length: 50 }, (_, index) => localProduct(index + 1));
    mockedProducts.PRODUCTS[29] = {
      ...mockedProducts.PRODUCTS[29],
      category: "Extract",
    };

    const result = await getProductsPage(1, 24, undefined, "Extract");

    expect(result.products.map((product) => product.id)).toEqual(["perfume-30"]);
    expect(result.currentPage).toBe(1);
    expect(result.hasPreviousPage).toBe(false);
    expect(result.hasNextPage).toBe(false);
  });

  it("filters Shopify products by category before slicing pages", async () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "scentmatch.myshopify.com",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "token",
      SHOPIFY_STOREFRONT_API_VERSION: "2026-04",
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        productsResponse(
          [
            { node: productNode("1", "santal-vol-1", "Santal Vol. 1", "Parfum") },
            { node: productNode("2", "oud-noir", "Oud Noir", "Parfum") },
          ],
          { hasNextPage: true, endCursor: "cursor-2" },
        ),
      )
      .mockResolvedValueOnce(
        productsResponse(
          [{ node: productNode("3", "iris-extract", "Iris Extract", "Extract") }],
          { hasNextPage: false, endCursor: "cursor-3" },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);

    const result = await getProductsPage(1, 2, undefined, "Extract");

    expect(result.products.map((product) => product.handle)).toEqual(["iris-extract"]);
    expect(result.currentPage).toBe(1);
    expect(result.hasPreviousPage).toBe(false);
    expect(result.hasNextPage).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("returns an empty Shopify page when the requested page is beyond the catalog", async () => {
    process.env = {
      ...originalEnv,
      SHOPIFY_STORE_DOMAIN: "scentmatch.myshopify.com",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: "token",
      SHOPIFY_STOREFRONT_API_VERSION: "2026-04",
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        productsResponse(
          [{ node: productNode("1", "santal-vol-1", "Santal Vol. 1") }],
          { hasNextPage: false, endCursor: "cursor-1" },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);

    const result = await getProductsPage(2, 24);

    expect(result.products).toEqual([]);
    expect(result.currentPage).toBe(2);
    expect(result.hasPreviousPage).toBe(true);
    expect(result.hasNextPage).toBe(false);
  });
});
