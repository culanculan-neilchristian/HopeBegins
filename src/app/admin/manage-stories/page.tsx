'use client';

import React from 'react';
import { AlertCircle, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useManageStories } from './hooks/useManageStories';
import { StoriesTable } from './components/StoriesTable';
import { DeleteModal } from './components/DeleteModal';

export default function ManageStoriesPage() {
  const {
    filtered,
    isLoading,
    isFetching,
    isError,
    refetch,
    search,
    setSearch,
    deleteTarget,
    setDeleteTarget,
    updateStatusMutation,
    deleteMutation,
  } = useManageStories();

  if (isError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Failed to load hope stories
        </h2>
        <p className="text-zinc-500 font-medium">
          Check your connection or try again.
        </p>
        <Button
          onClick={() => refetch()}
          className="mt-2 h-10 px-6 rounded-xl bg-brand text-brand-foreground font-bold"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      {deleteTarget && (
        <DeleteModal
          story={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteMutation.isPending}
        />
      )}

      <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-10">
        <header className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter">
              Hope Stories
            </h1>
            <p className="mt-2 text-zinc-500 font-medium text-sm sm:text-base">
              Review and manage testimonials submitted by the community.
              {!isLoading && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                  {filtered.length} Total
                  {isFetching && (
                    <RefreshCw className="h-3 w-3 animate-spin text-brand ml-1" />
                  )}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-shrink-0">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search stories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 rounded-xl border-none bg-white dark:bg-zinc-900 shadow-lg shadow-zinc-200/50 w-full"
              />
            </div>
          </div>
        </header>

        <StoriesTable
          stories={filtered}
          isLoading={isLoading}
          onApprove={(id) =>
            updateStatusMutation.mutate({ id, status: 'APPROVED' })
          }
          onReject={(id) =>
            updateStatusMutation.mutate({ id, status: 'REJECTED' })
          }
          onDelete={(story) => setDeleteTarget(story)}
        />
      </div>
    </>
  );
}
