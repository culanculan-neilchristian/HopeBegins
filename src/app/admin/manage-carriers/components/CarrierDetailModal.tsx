import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Mail, Phone, User as UserIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import type { HopeCarrier } from '@/types/admin';

interface CarrierDetailModalProps {
  carrier: HopeCarrier;
  onClose: () => void;
  onApprove: (e: React.MouseEvent, id: string) => void;
  isApproving: boolean;
}

export function CarrierDetailModal({
  carrier,
  onClose,
  onApprove,
  isApproving,
}: CarrierDetailModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`${carrier.first_name} ${carrier.last_name}`}
      icon={<UserIcon className="h-6 w-6 text-brand" />}
      description=""
    >
      <div className="space-y-6">
        {/* badges */}
        <div className="flex items-center gap-2 mb-6 shrink-0 flex-wrap">
          <Badge className="bg-brand text-white border-none rounded-full px-3 text-[10px] font-black uppercase tracking-[0.2em] h-5">
            Hope Carrier
          </Badge>
          {carrier.is_approved ? (
            <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-none rounded-full px-3 text-[10px] font-black uppercase tracking-[0.2em] h-5">
              Approved
            </Badge>
          ) : (
            <Badge className="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-none rounded-full px-3 text-[10px] font-black uppercase tracking-[0.2em] h-5">
              Pending
            </Badge>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden mb-6 shrink-0">
          <div className="p-4 text-center border-r border-zinc-100 dark:border-zinc-800">
            <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">
              {carrier.prayer_count}
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Prayers
            </div>
          </div>
          <div className="p-4 text-center border-r border-zinc-100 dark:border-zinc-800">
            <div className="text-sm font-black text-zinc-900 dark:text-zinc-100 italic break-words leading-tight">
              {carrier.church_community || '—'}
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Community
            </div>
          </div>
          <div className="p-4 text-center">
            <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 italic">
              #{carrier.id.slice(0, 4)}
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              ID
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-3 mb-6 shrink-0">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-transparent space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <Mail className="h-3 w-3" /> Email Address
            </div>
            <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm break-words">
              {carrier.email}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-transparent space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <Phone className="h-3 w-3" /> Phone Number
            </div>
            <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
              {carrier.phone || 'No phone provided'}
            </div>
          </div>
        </div>

        {/* Application reason */}
        <div className="space-y-2 mb-6 shrink-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Application Reason
          </p>
          <div className="p-4 rounded-2xl bg-brand-muted/10 dark:bg-brand/5 border border-brand/10 text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed italic text-sm break-words">
            &quot;{carrier.carrier_reason || 'No reason provided.'}&quot;
          </div>
        </div>

        {/* Footer — same pattern as AssignCarrierModal */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
            Joined {format(new Date(carrier.date_joined), 'PPPP')}
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-12 rounded-2xl font-bold border border-zinc-200 dark:border-zinc-700"
            >
              Close
            </Button>
            {!carrier.is_approved && (
              <Button
                onClick={(e) => onApprove(e, carrier.id)}
                disabled={isApproving}
                className="flex-1 h-12 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-bold shadow-lg shadow-brand/20"
              >
                {isApproving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Approve Application'
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
