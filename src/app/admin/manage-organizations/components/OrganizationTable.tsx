'use client';

import {
  Edit2,
  Trash2,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Organization } from '@/types/admin';
import { format } from 'date-fns';

interface Props {
  filtered: Organization[];
  isLoading: boolean;
  search: string;
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
  onCreateFirst: () => void;
}

export function OrganizationTable({
  filtered,
  isLoading,
  search,
  onEdit,
  onDelete,
  onCreateFirst,
}: Props) {
  if (isLoading) {
    return (
      <div className="hidden md:block w-full overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="p-12 flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-brand/10 flex items-center justify-center">
            <div className="h-6 w-6 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-zinc-400 font-bold animate-pulse">
            Loading organizations...
          </p>
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="hidden md:block w-full overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="p-16 flex flex-col items-center justify-center gap-4">
          <div className="h-16 w-16 rounded-3xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-zinc-300" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-black italic tracking-tight">
              {search ? 'No matches found' : 'No organizations yet'}
            </h3>
            <p className="text-zinc-500 font-medium text-sm mt-1">
              {search
                ? 'Try a different search term or clear the filter.'
                : 'Get started by adding your first partner organization.'}
            </p>
          </div>
          {!search && (
            <Button
              onClick={onCreateFirst}
              className="mt-2 h-10 px-6 rounded-xl bg-brand text-brand-foreground font-black uppercase tracking-widest text-xs"
            >
              Add First Organization
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block w-full overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Organization
            </th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Status
            </th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Created
            </th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
          {filtered.map((org) => (
            <tr
              key={org.id}
              className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-brand/10 transition-colors">
                    <Building2 className="h-5 w-5 text-zinc-400 group-hover:text-brand transition-colors" />
                  </div>
                  <div>
                    <div className="font-black text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
                      {org.name}
                    </div>
                    {org.description && (
                      <div className="text-xs text-zinc-500 font-medium mt-0.5 line-clamp-1 max-w-xs">
                        {org.description}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                {org.is_active ? (
                  <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-none px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                  </Badge>
                ) : (
                  <Badge className="bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border-none px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                    <XCircle className="h-3 w-3 mr-1" /> Inactive
                  </Badge>
                )}
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(org.created_at), 'MMM d, yyyy')}
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(org)}
                    className="h-9 w-9 rounded-xl hover:bg-white dark:hover:bg-zinc-800 hover:text-brand hover:shadow-sm"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(org)}
                    className="h-9 w-9 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500"
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
  );
}
