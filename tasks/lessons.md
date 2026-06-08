# Lessons

- When moving a catalog from full-client data to page-by-page server pagination, move search/filter responsibilities that must span the full catalog to the server/URL layer at the same time. Client-side search or product-type filtering only sees the current page and will hide matching products on other pages.
