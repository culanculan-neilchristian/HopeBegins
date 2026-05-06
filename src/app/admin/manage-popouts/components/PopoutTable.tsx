import React from 'react';
import { Edit2, Trash2, ExternalLink, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PopoutItem } from '@/services/siteSettingsService';

interface Props {
  filtered: PopoutItem[];
  isLoading: boolean;
  onEdit: (item: PopoutItem) => void;
  onDelete: (item: PopoutItem) => void;
  onCreateFirst: () => void;
}

export function PopoutTable({ filtered, isLoading, onEdit, onDelete, onCreateFirst }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden">
        <div className="p-12 flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 animate-pulse" />
          <div className="h-4 w-32 bg-zinc-50 dark:bg-zinc-800 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden">
        <div className="p-20 flex flex-col items-center justify-center text-center gap-6">
          <div className="h-20 w-20 rounded-3xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
            <MousePointer2 className="h-10 w-10 text-zinc-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight">No pop-outs found</h3>
            <p className="text-zinc-500 font-medium max-w-xs mx-auto">
              You haven't created any engagement pop-outs yet.
            </p>
          </div>
          <Button
            onClick={onCreateFirst}
            className="h-12 px-8 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-black uppercase tracking-widest"
          >
            Create Your First Pop-out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden hidden md:block">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-zinc-400">Message</th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-zinc-400">Button</th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-zinc-400">Link</th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-zinc-400 text-center">Status</th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
            {filtered.map((item) => (
              <tr key={item.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-5">
                  <span className="font-black text-sm tracking-tight">{item.message}</span>
                </td>
                <td className="px-6 py-5 text-sm">
                   <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-bold text-xs">
                     {item.button_text}
                   </span>
                </td>
                <td className="px-6 py-5 text-sm text-zinc-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-[200px]">{item.link}</span>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    item.is_active 
                      ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-zinc-50 text-zinc-400 dark:bg-zinc-800/50'
                  }`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      className="h-9 w-9 rounded-xl hover:bg-white dark:hover:bg-zinc-800 shadow-sm transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item)}
                      className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
