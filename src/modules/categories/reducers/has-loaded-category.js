import { UPDATE_HAS_LOADED_TOPIC } from 'modules/categories/actions/update-has-loaded-category';

export default function (hasLoadedCategory = {}, action) {
  switch (action.type) {
    case UPDATE_HAS_LOADED_CATEGORY:
      return ({
        ...hasLoadedCategory,
        ...action.hasLoadeCategory
      });
    default:
      return hasLoadedCategory;
  }
}