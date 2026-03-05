'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Category } from '@/types/hopecast';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12 max-w-3xl mx-auto">
      <Button
        variant="outline"
        onClick={() => onSelectCategory(null)}
        className={cn(
          'rounded-full px-5 py-2 h-auto text-[13px] font-medium transition-all border-zinc-200 shadow-none',
          selectedCategoryId === null
            ? 'bg-[#9dbd7b] text-white border-[#9dbd7b] hover:bg-[#8da370]'
            : 'text-zinc-400 hover:text-[#9dbd7b] hover:border-[#9dbd7b] bg-white'
        )}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            'rounded-full px-5 py-2 h-auto text-[13px] font-medium transition-all border-zinc-200 shadow-none',
            selectedCategoryId === category.id
              ? 'bg-[#9dbd7b] text-white border-[#9dbd7b] hover:bg-[#8da370]'
              : 'text-zinc-400 hover:text-[#9dbd7b] hover:border-[#9dbd7b] bg-white'
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
