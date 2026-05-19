'use client';

import { AlertCircle, RefreshCw, Search, Plus, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useManageOrganizations } from './hooks/useManageOrganizations';
import { DeleteModal } from './components/DeleteModal';
import { OrganizationModal } from './components/OrganizationModal';
import { OrganizationTable } from './components/OrganizationTable';

export default function ManageOrganizationsPage() {
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
    editTarget,
    setEditTarget,
    deleteMutation,
    isSavePending,
    handleSave,
  } = useManageOrganizations();

  if (isError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Failed to load organizations
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
          org={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteMutation.isPending}
        />
      )}

      {editTarget !== undefined && (
        <OrganizationModal
          initial={editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(undefined)}
          isPending={isSavePending}
        />
      )}

      <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-10">
        {/* ── Header ── */}
        <header className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter">
              Partner Organizations
            </h1>
            <p className="mt-2 text-zinc-500 font-medium text-sm sm:text-base">
              Manage organizations that partner with HopeBegins.
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
                placeholder="Search organizations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 rounded-xl border-none bg-white dark:bg-zinc-900 shadow-lg shadow-zinc-200/50 w-full"
              />
            </div>
            <Button
              onClick={() => setEditTarget(null)}
              className="h-10 px-5 rounded-xl bg-brand hover:bg-brand-hover text-brand-foreground font-bold text-xs uppercase tracking-widest shrink-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Organization
            </Button>
          </div>
        </header>

        {/* ── Mobile View (Cards) - Simplified for this task ── */}
        <div className="md:hidden space-y-3">
          {isLoading && (
            <div className="h-28 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 animate-pulse" />
          )}
          {!isLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16">
              <Building2 className="h-8 w-8 text-zinc-300" />
              <p className="font-bold text-zinc-500">No organizations found.</p>
            </div>
          )}
          {!isLoading &&
            filtered.map((org) => (
              <div
                key={org.id}
                className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="font-black text-sm">{org.name}</p>
                  <p className="text-xs text-zinc-500">
                    {org.is_active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditTarget(org)}
                    className="h-8 w-8 rounded-lg"
                  >
                    <Plus className="h-4 w-4 rotate-45" />{' '}
                    {/* Edit icon placeholder */}
                  </Button>
                </div>
              </div>
            ))}
        </div>

        {/* ── Desktop View (Table) ── */}
        <OrganizationTable
          filtered={filtered}
          isLoading={isLoading}
          search={search}
          onEdit={(org) => setEditTarget(org)}
          onDelete={(org) => setDeleteTarget(org)}
          onCreateFirst={() => setEditTarget(null)}
        />
      </div>
    </>
  );
}
