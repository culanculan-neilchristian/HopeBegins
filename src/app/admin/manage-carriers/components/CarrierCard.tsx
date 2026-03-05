import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { HopeCarrier } from '@/types/admin';

interface CarrierCardProps {
  carrier: HopeCarrier;
  onSelect: (carrier: HopeCarrier) => void;
  onApprove: (e: React.MouseEvent, id: string) => void;
  isApproving: boolean;
}

export function CarrierCard({
  carrier,
  onSelect,
  onApprove,
  isApproving,
}: CarrierCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="p-4 border-none shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all group bg-white dark:bg-zinc-900 rounded-2xl hover:shadow-md hover:ring-2 hover:ring-brand/10 cursor-pointer overflow-hidden"
        onClick={() => onSelect(carrier)}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div className="h-9 w-9 rounded-xl bg-brand/5 dark:bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
              <UserIcon className="h-4 w-4 stroke-[2.5px]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                  {carrier.first_name} {carrier.last_name}
                </p>
                <Badge
                  className={`px-2 py-0 rounded-full text-[10px] font-black uppercase tracking-widest border-none flex-shrink-0 ${
                    carrier.is_approved
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                      : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                  }`}
                >
                  {carrier.is_approved ? 'Active' : 'Pending'}
                </Badge>
              </div>
              <div className="flex items-center gap-x-3 gap-y-0.5 flex-wrap text-xs font-medium text-zinc-400">
                <span className="truncate max-w-[200px]">{carrier.email}</span>
                <span className="hidden sm:inline text-zinc-300">•</span>
                <span className="text-rose-500 font-bold">
                  {carrier.prayer_count} prayers
                </span>
                <span className="hidden sm:inline text-zinc-300">•</span>
                <span className="italic">
                  Joined {format(new Date(carrier.date_joined), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {!carrier.is_approved && (
              <Button
                onClick={(e) => onApprove(e, carrier.id)}
                disabled={isApproving}
                className="bg-brand hover:bg-brand/90 text-white font-bold px-4 h-8 rounded-xl text-xs transition-all hover:scale-105 active:scale-95"
              >
                {isApproving ? (
                  <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Approve'
                )}
              </Button>
            )}
            <div className="h-8 w-8 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-brand-muted/30 group-hover:text-brand transition-colors duration-300">
              <Eye className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
