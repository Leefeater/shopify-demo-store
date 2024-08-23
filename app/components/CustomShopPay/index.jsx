import React from 'react';
import { ShopPayButton } from '@shopify/hydrogen-react';

const ShopPayButtonComponent = ({ product }) => {
  // Extract the variant IDs from product.variants.nodes
  const variantIds = product.variants.nodes.map(variant => variant.id);

  return (
    <ShopPayButton variantIds={variantIds} className="shop-pay-button" />
  );
};

export default ShopPayButtonComponent;
