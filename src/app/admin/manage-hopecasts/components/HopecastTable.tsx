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
  Radio,
  Play,
  Edit2,
  ExternalLink,
  Trash2,
  Tag,
  Plus,
} from 'lucide-react';
import { CategoryBadge, formatDate, formatPlays } from '../constants';
import type { Hopecast } from '@/types/admin';

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

interface HopecastTableProps {
  filtered: Hopecast[];
  isLoading: boolean;
  search: string;
  onEdit: (cast: Hopecast) => void;
  onDelete: (cast: Hopecast) => void;
  onCreateFirst: () => void;
}

export function HopecastTable({
  filtered,
  isLoading,
  search,
  onEdit,
  onDelete,
  onCreateFirst,
}: HopecastTableProps) {
  return (
    <Card className="hidden md:block border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-800/50">
            <TableRow className="hover:bg-transparent border-zinc-100 dark:border-zinc-800">
              {['Title', 'Categories', 'Plays', 'Date Added', 'Actions'].map(
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
            {isLoading && [...Array(3)].map((_, i) => <SkeletonRow key={i} />)}

            {!isLoading && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Radio className="h-5 w-5 text-zinc-400" />
                    </div>
                    <p className="font-bold text-zinc-500">
                      {search
                        ? 'No hopecasts match your search.'
                        : 'No hopecasts yet.'}
                    </p>
                    {!search && (
                      <Button
                        onClick={onCreateFirst}
                        className="h-9 px-5 rounded-xl bg-brand text-brand-foreground font-bold text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1.5" />
                        Create your first cast
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              filtered.map((cast) => (
                <TableRow
                  key={cast.id}
                  className="border-zinc-100 dark:border-zinc-800 h-20 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  {/* Title */}
                  <TableCell className="pl-8">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 bg-brand-muted rounded-xl flex items-center justify-center text-brand">
                        <Radio className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[240px]">
                          {cast.title}
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {(cast.name || cast.verse) && (
                            <p className="text-[10px] text-zinc-500 font-medium truncate max-w-[240px]">
                              {cast.name && <span>{cast.name}</span>}
                              {cast.name && cast.verse && (
                                <span className="mx-1">•</span>
                              )}
                              {cast.verse && <span>{cast.verse}</span>}
                            </p>
                          )}
                          <a
                            href={cast.mp4_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-brand hover:underline font-bold flex items-center gap-1 uppercase tracking-wider"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-2.5 w-2.5" />
                            View Source
                          </a>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Categories */}
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                      {cast.category_details?.length ? (
                        cast.category_details.map((cat, idx) => (
                          <CategoryBadge
                            key={cat.id}
                            name={cat.name}
                            index={idx}
                          />
                        ))
                      ) : (
                        <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          Uncategorised
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Plays */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-zinc-500 font-bold text-sm">
                      <Play className="h-3 w-3 fill-zinc-400 text-zinc-400" />
                      {formatPlays(cast.play_times)}
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-zinc-500 font-medium text-sm">
                    {formatDate(cast.created_at)}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-6">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(cast)}
                        className="h-8 w-8 rounded-full hover:bg-brand-muted group"
                      >
                        <Edit2 className="h-4 w-4 text-zinc-400 group-hover:text-brand transition-colors" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(cast)}
                        className="h-8 w-8 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 group"
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
    </Card>
  );
}
