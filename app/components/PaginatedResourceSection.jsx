import * as React from 'react';
import { Pagination } from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection> is a component that encapsulates the previous and next behaviors throughout your application.
 * @param {Class<Pagination<NodesType>>['connection']}
 */
export function PaginatedResourceSection({
  connection,
  children,
  resourcesClassName,
}) {
  const [sortOption, setSortOption] = React.useState('featured');

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortNodes = (nodes) => {
    // assuming for the challenge we are simply "front end sorting"
    // in produciton this would simply adjust the query params that fetch the products
    switch (sortOption) {
      case 'price-low-high':
        return [...nodes].sort((a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
        );
      case 'price-high-low':
        return [...nodes].sort((a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
        );
      case 'featured':
      default:
        return nodes;
    }
  };

  return (
    <Pagination connection={connection}>
      {({ nodes, isLoading, PreviousLink, NextLink }) => {
        const sortedNodes = sortNodes(nodes);
        const resourcesMarkup = sortedNodes.map((node, index) => children({ node, index }));

        return (
          <div>
            <div className="sorting-controls">
              <label htmlFor="sort-options">Sort by:</label>
              <select id="sort-options" value={sortOption} onChange={handleSortChange}>
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </div>
        );
      }}
    </Pagination>
  );
}
