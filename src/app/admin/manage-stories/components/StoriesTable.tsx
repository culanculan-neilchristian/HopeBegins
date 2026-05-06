'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HopeStory } from '@/services/hopeStoryService';
import { Check, X, Trash2, User, Clock, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

interface StoriesTableProps {
  stories: HopeStory[];
  isLoading: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (story: HopeStory) => void;
}

export function StoriesTable({
  stories,
  isLoading,
  onApprove,
  onReject,
  onDelete,
}: StoriesTableProps) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
        <Clock className="h-12 w-12 text-zinc-300 mb-4" />
        <p className="text-zinc-500 font-bold">No hope stories found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xl shadow-zinc-200/50 dark:shadow-none">
      <Table>
        <TableHeader className="bg-zinc-50/50 dark:bg-zinc-800/50">
          <TableRow className="hover:bg-transparent border-zinc-100 dark:border-zinc-800">
            <TableHead className="w-[200px] font-black uppercase tracking-widest text-[10px]">Author</TableHead>
            <TableHead className="font-black uppercase tracking-widest text-[10px]">Testimonial</TableHead>
            <TableHead className="w-[120px] font-black uppercase tracking-widest text-[10px]">Status</TableHead>
            <TableHead className="w-[150px] font-black uppercase tracking-widest text-[10px]">Date</TableHead>
            <TableHead className="w-[180px] text-right font-black uppercase tracking-widest text-[10px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stories.map((story) => (
            <TableRow key={story.id} className="border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {story.photo ? (
                      <img src={story.photo} alt={story.full_name} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{story.full_name}</p>
                    {story.occupation && (
                      <p className="text-xs text-zinc-500 truncate">{story.occupation}</p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 max-w-md">
                  {story.testimonial}
                </p>
              </TableCell>
              <TableCell>
                <Badge 
                  className={`
                    rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border-none
                    ${story.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                    ${story.status === 'REJECTED' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : ''}
                    ${story.status === 'PENDING' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                  `}
                >
                  {story.status}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-zinc-500 font-medium">
                {format(new Date(story.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {story.status !== 'APPROVED' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onApprove(story.id)}
                      className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      title="Approve"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  {story.status !== 'REJECTED' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onReject(story.id)}
                      className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                      title="Reject"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(story)}
                    className="h-8 w-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
