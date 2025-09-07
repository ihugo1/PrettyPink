import { PRODUCT_SORT_LABELS, type ProductSortOptions } from '../../constants/productSort';

export const useProductSortOptions = () => {
  const options = Object.entries(PRODUCT_SORT_LABELS).map(([value, label]) => ({
    value: value as ProductSortOptions,
    label
  }));
  
  const getLabelByValue = (value: ProductSortOptions) => PRODUCT_SORT_LABELS[value];
  
  return { options, getLabelByValue };
};