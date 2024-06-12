"use client";

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductReel from '@/components/ProductReel';
import { PRODUCT_CATEGORIES } from '@/config';
import { useState } from 'react';

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(search);
  };

  return (
    <MaxWidthWrapper>
      <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a book"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <button type="submit" className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600">
          Search
        </button>
      </form>
      <ProductReel
        title={label ?? 'Browse high-quality books'}
        query={{
          category,
          search: searchQuery,
          limit: 40,
          sort: sort === 'desc' || sort === 'asc' ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
