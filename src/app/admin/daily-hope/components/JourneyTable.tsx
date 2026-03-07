'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  User,
  Mail,
  Calendar,
  Trash2,
  CheckCircle2,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { HopeJourney } from '@/types/admin';

function formatDate(dateStr: string) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function SkeletonRow() {
  return (
    <TableRow className="h-20 border-zinc-100 dark:border-zinc-800">
      {[...Array(5)].map((_, i) => (
        <TableCell key={i} className={i === 0 ? 'pl-8' : ''}>
          <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse w-3/4" />
        </TableCell>
      ))}
    </TableRow>
  );
}

interface JourneyTableProps {
  filtered: HopeJourney[];
  isLoading: boolean;
  search: string;
  onDelete: (journey: HopeJourney) => void;
  // Pagination props
  page: number;
  setPage: (p: number) => void;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function JourneyTable({
  filtered,
  isLoading,
  search,
  onDelete,
  page,
  setPage,
  totalCount,
  hasNext,
  hasPrev,
}: JourneyTableProps) {
  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <Card className="hidden md:block border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto min-h-[500px]">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-800/50">
            <TableRow className="hover:bg-transparent border-zinc-100 dark:border-zinc-800">
              {['Subscriber', 'Current Day', 'Status', 'Joined', 'Actions'].map(
                (h, i) => (
                  <TableHead
                    key={h}
                    className={`font-black uppercase tracking-widest text-[10px] py-6 ${i === 0 ? 'pl-8' : ''} ${i === 4 ? 'pr-6 text-right' : ''}`}
                  >
                    {h}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && [...Array(5)].map((_, i) => <SkeletonRow key={i} />)}

            {!isLoading && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Search className="h-5 w-5 text-zinc-400" />
                    </div>
                    <p className="font-bold text-zinc-500">
                      {search
                        ? 'No subscribers match your search.'
                        : 'No subscribers yet.'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              filtered.map((journey) => (
                <TableRow
                  key={journey.id}
                  className="border-zinc-100 dark:border-zinc-800 h-20 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  {/* Subscriber */}
                  <TableCell className="pl-8">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 bg-brand-muted rounded-xl flex items-center justify-center text-brand">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {journey.first_name} {journey.last_name}
                        </p>
                        <p className="text-xs text-zinc-500 font-medium flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {journey.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Current Day */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-lg text-brand">
                        Day {journey.current_day}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                        of Journey
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {journey.is_active ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Finished
                      </span>
                    )}
                  </TableCell>

                  {/* Date Joined */}
                  <TableCell className="text-zinc-500 font-medium text-sm">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      {formatDate(journey.created_at)}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-6">
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(journey)}
                        className="h-9 w-9 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 group transition-all"
                      >
                        <Trash2 className="h-4 w-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* ── Desktop Pagination Footer ── */}
      {totalPages > 1 && (
        <div className="p-6 bg-zinc-50/50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Showing{' '}
            <span className="text-zinc-900 dark:text-white">
              {(page - 1) * PAGE_SIZE + 1}-
              {Math.min(page * PAGE_SIZE, totalCount)}
            </span>{' '}
            of{' '}
            <span className="text-zinc-900 dark:text-white">{totalCount}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasPrev || isLoading}
              onClick={() => setPage(page - 1)}
              className="h-9 rounded-xl font-bold border-zinc-200 dark:border-zinc-700"
            >
              <ChevronLeft className="h-4 w-4 mr-1.5" />
              Previous
            </Button>
            <div className="flex items-center gap-1 px-4">
              <span className="text-xs font-black text-brand">Page {page}</span>
              <span className="text-xs font-medium text-zinc-400">
                / {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={!hasNext || isLoading}
              onClick={() => setPage(page + 1)}
              className="h-9 rounded-xl font-bold border-zinc-200 dark:border-zinc-700"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
