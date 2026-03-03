import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { notify } from '@/lib/notifications';
import type { HopeCarrier } from '@/types/admin';

export function useManageCarriers() {
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'ACTIVE'>('ALL');
    const [selectedCarrier, setSelectedCarrier] = useState<HopeCarrier | null>(null);

    const { data: carriers = [], isLoading } = useQuery({
        queryKey: ['admin', 'carriers'],
        queryFn: () => adminService.getCarriers(),
    });

    const approveMutation = useMutation({
        mutationFn: (id: string) => adminService.approveCarrier(id),
        onSuccess: (updatedCarrier) => {
            notify.success(`${updatedCarrier.first_name} has been approved!`);
            queryClient.invalidateQueries({ queryKey: ['admin', 'carriers'] });
            if (selectedCarrier?.id === updatedCarrier.id) {
                setSelectedCarrier(updatedCarrier);
            }
        },
        onError: (error: any) => {
            notify.error(error.message || 'Failed to approve carrier');
        },
    });

    const filteredCarriers = carriers.filter((carrier) => {
        const matchesSearch =
            carrier.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            carrier.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            carrier.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            filterStatus === 'ALL' ||
            (filterStatus === 'PENDING' && !carrier.is_approved) ||
            (filterStatus === 'ACTIVE' && carrier.is_approved);

        return matchesSearch && matchesStatus;
    });

    const handleApprove = (e: React.MouseEvent | React.FocusEvent, id: string) => {
        if (e && 'stopPropagation' in e) e.stopPropagation();
        approveMutation.mutate(id);
    };

    return {
        carriers,
        filteredCarriers,
        isLoading,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        selectedCarrier,
        setSelectedCarrier,
        approveMutation,
        handleApprove,
    };
}
