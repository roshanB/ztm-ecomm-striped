import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : [] //Tried_reason_why_shop_page_not_throwing_error []
);

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => (collections ? collections[collectionUrlParam] : null) //Tried_reason_why_collection_page_throwing_error null
    //Tried_null_checks_on_selectors_also_return_null_so_that_components_can_render_accordingly
  );

export const selectIsFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  // (shop) => shop.collections && shop.collections.length // Tried_this_did_not_work_following_did_double_bang
  (shop) => !!shop.collections
);
