import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronRight,
  Trash2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { StatusBadge, CategoryBadge } from './PrayerBadges';
import { ExpandedDetail } from './ExpandedDetail';
import { formatDate } from '../constants';
import type { Prayer, PrayerCategory, PrayerStatus } from '@/types/admin';

// ── Skeleton row for loading state ──
function SkeletonRow() {
  return (
    <TableRow className="h-20 border-zinc-100 dark:border-zinc-800">
      {[...Array(6)].map((_, i) => (
        <TableCell key={i} className={i === 1 ? 'pl-8' : ''}>
          <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse w-3/4" />
        </TableCell>
      ))}
    </TableRow>
  );
}

// ── Single prayer row (+ inline expanded panel) ──
interface PrayerTableRowProps {
  prayer: Prayer;
  isExpanded: boolean;
  isUpdating: boolean;
  onToggle: () => void;
  onMarkPrayed: () => void;
  onStatusChange: (status: PrayerStatus) => void;
  onAssign: () => void;
  onSendFollowUp: () => void;
  onDelete: () => void;
}

function PrayerTableRow({
  prayer,
  isExpanded,
  isUpdating,
  onToggle,
  onMarkPrayed,
  onAssign,
  onSendFollowUp,
  onDelete,
}: PrayerTableRowProps) {
  return (
    <>
      <TableRow
        onClick={onToggle}
        className={`border-zinc-100 dark:border-zinc-800 h-20 cursor-pointer transition-colors ${
          isExpanded
            ? 'bg-brand-muted/30 dark:bg-brand/5 border-l-4 border-l-brand hover:bg-brand-muted/40'
            : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30'
        }`}
      >
        <TableCell className="pl-6 w-8">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-brand" />
          ) : (
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          )}
        </TableCell>
        <TableCell>
          <p
            className={`font-bold ${isExpanded ? 'text-brand' : 'text-zinc-900 dark:text-zinc-100'}`}
          >
            {prayer.isAnonymous || !prayer.shareFirstName
              ? 'Anonymous'
              : prayer.title}
          </p>
          <p className="text-xs text-zinc-400 font-medium mt-0.5">
            {prayer.isAnonymous ? 'Anonymous' : prayer.email}
            {prayer.assigned_to_email && (
              <span className="ml-1 text-blue-500">
                → {prayer.assigned_to_email}
              </span>
            )}
          </p>
        </TableCell>
        <TableCell>
          <CategoryBadge category={prayer.category as PrayerCategory} />
        </TableCell>
        <TableCell>
          {isUpdating ? (
            <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
          ) : (
            <StatusBadge status={prayer.status} />
          )}
        </TableCell>
        <TableCell className="text-zinc-500 font-medium text-sm">
          {formatDate(prayer.created_at)}
        </TableCell>
        <TableCell className="pr-6 text-right">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 group"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
          </Button>
        </TableCell>
      </TableRow>

      {isExpanded && (
        <TableRow className="border-l-4 border-l-brand bg-white dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-900 border-zinc-100 dark:border-zinc-800">
          <TableCell colSpan={6} className="pl-6 pr-6 pb-6 pt-0">
            <div className="border-2 border-brand/30 dark:border-brand/20 rounded-2xl p-5 bg-brand-muted/20 dark:bg-brand/5">
              <ExpandedDetail
                prayer={prayer}
                onMarkPrayed={onMarkPrayed}
                onAssign={onAssign}
                onSendFollowUp={onSendFollowUp}
                isPending={isUpdating}
              />
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

// ── Full desktop table ──
interface PrayerTableProps {
  filtered: Prayer[];
  isLoading: boolean;
  expandedId: string | null;
  statusMutationPending: boolean;
  statusMutationVariableId?: string;
  search: string;
  statusFilter: string;
  onToggle: (id: string) => void;
  onMarkPrayed: (p: Prayer) => void;
  onStatusChange: (p: Prayer, s: PrayerStatus) => void;
  onAssign: (p: Prayer) => void;
  onSendFollowUp: (p: Prayer) => void;
  onDelete: (p: Prayer) => void;
}

export function PrayerTable({
  filtered,
  isLoading,
  expandedId,
  statusMutationPending,
  statusMutationVariableId,
  search,
  statusFilter,
  onToggle,
  onMarkPrayed,
  onStatusChange,
  onAssign,
  onSendFollowUp,
  onDelete,
}: PrayerTableProps) {
  return (
    <Card className="hidden md:block border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden">
      <Table>
        <TableHeader className="bg-zinc-50 dark:bg-zinc-800/50">
          <TableRow className="hover:bg-transparent border-zinc-100 dark:border-zinc-800">
            <TableHead className="w-8 pl-6" />
            {['Prayer Request', 'Category', 'Status', 'Date', 'Actions'].map(
              (h, i) => (
                <TableHead
                  key={h}
                  className={`font-black uppercase tracking-widest text-[10px] py-6 ${i === 4 ? 'pr-6 text-right' : ''}`}
                >
                  {h}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && [...Array(4)].map((_, i) => <SkeletonRow key={i} />)}

          {!isLoading && filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-20 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-zinc-400" />
                  </div>
                  <p className="font-bold text-zinc-500">
                    {search || statusFilter !== 'ALL'
                      ? 'No prayers match your filters.'
                      : 'No prayer requests yet.'}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            filtered.map((prayer) => (
              <PrayerTableRow
                key={prayer.id}
                prayer={prayer}
                isExpanded={expandedId === prayer.id}
                isUpdating={
                  statusMutationPending &&
                  statusMutationVariableId === prayer.id
                }
                onToggle={() => onToggle(prayer.id)}
                onMarkPrayed={() => onMarkPrayed(prayer)}
                onStatusChange={(status) => onStatusChange(prayer, status)}
                onAssign={() => onAssign(prayer)}
                onSendFollowUp={() => onSendFollowUp(prayer)}
                onDelete={() => onDelete(prayer)}
              />
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}
