'use client';

import React from 'react';
import { 
  AlertCircle, 
  RefreshCw, 
  Search, 
  Plus, 
  MousePointer2, 
  Settings2, 
  Clock, 
  Power 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useManagePopouts } from './hooks/useManagePopouts';
import { DeleteModal } from './components/DeleteModal';
import { PopoutModal } from './components/PopoutModal';
import { PopoutTable } from './components/PopoutTable';

export default function ManagePopoutsPage() {
  const {
    settings,
    isSettingsLoading,
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
    updateSettingsMutation,
    saveMutation,
    handleSave,
  } = useManagePopouts();

  if (isError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Failed to load pop-out settings
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
          item={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteMutation.isPending}
        />
      )}

      {editTarget !== undefined && (
        <PopoutModal
          initial={editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(undefined)}
          isPending={saveMutation.isPending}
        />
      )}

      <div className="p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-12">
        {/* ── Header ── */}
        <header className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter">
              Engagement Pop-outs
            </h1>
            <p className="mt-2 text-zinc-500 font-medium text-sm sm:text-base">
              Manage randomized notifications that appear in the lower-left corner.
              {!isLoading && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                  {filtered.length} Active Items
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
                placeholder="Search messages..."
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
              New Pop-out
            </Button>
          </div>
        </header>

        {/* ── Global Settings Section ── */}
        {!isSettingsLoading && settings && (
          <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 sm:p-8 shadow-xl">
             <div className="flex items-center gap-3 mb-6">
                <Settings2 className="h-5 w-5 text-brand" />
                <h2 className="text-xl font-black tracking-tight italic">Global Settings</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                {/* Master Toggle */}
                <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${settings.is_enabled ? 'bg-green-100 text-green-600' : 'bg-zinc-200 text-zinc-500'}`}>
                         <Power className="h-5 w-5" />
                      </div>
                      <div>
                         <p className="font-black text-sm uppercase tracking-wider">Status</p>
                         <p className="text-xs text-zinc-500 font-medium">{settings.is_enabled ? 'Enabled' : 'Disabled'}</p>
                      </div>
                   </div>
                   <button 
                      onClick={() => updateSettingsMutation.mutate({ is_enabled: !settings.is_enabled })}
                      disabled={updateSettingsMutation.isPending}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settings.is_enabled ? 'bg-brand' : 'bg-zinc-300'}`}
                   >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.is_enabled ? 'translate-x-6' : ''}`} />
                   </button>
                </div>

                {/* Interval Setting */}
                <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                         <Clock className="h-5 w-5" />
                      </div>
                      <div>
                         <p className="font-black text-sm uppercase tracking-wider">Interval</p>
                         <p className="text-xs text-zinc-500 font-medium">Every {settings.interval_seconds} seconds</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <Input 
                        type="number"
                        className="w-20 h-9 rounded-lg text-center font-bold"
                        defaultValue={settings.interval_seconds}
                        onBlur={(e) => {
                           const val = parseInt(e.target.value);
                           if (val !== settings.interval_seconds) {
                              updateSettingsMutation.mutate({ interval_seconds: val });
                           }
                        }}
                      />
                      <span className="text-xs font-black text-zinc-400 uppercase">Sec</span>
                   </div>
                </div>
             </div>
          </section>
        )}

        {/* ── Pop-out Items Table ── */}
        <PopoutTable
          filtered={filtered}
          isLoading={isLoading}
          onEdit={(item) => setEditTarget(item)}
          onDelete={(item) => setDeleteTarget(item)}
          onCreateFirst={() => setEditTarget(null)}
        />

        {/* ── Mobile List View ── */}
        <div className="md:hidden space-y-3">
           {!isLoading && filtered.length > 0 && filtered.map((item) => (
              <div key={item.id} className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
                <div>
                   <p className="font-black text-sm tracking-tight">{item.message}</p>
                   <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Button: {item.button_text}</p>
                </div>
                <div className="flex gap-2">
                   <Button variant="ghost" size="icon" onClick={() => setEditTarget(item)} className="h-8 w-8 rounded-lg">
                      <Plus className="h-4 w-4 rotate-45" />
                   </Button>
                </div>
              </div>
           ))}
        </div>
      </div>
    </>
  );
}
