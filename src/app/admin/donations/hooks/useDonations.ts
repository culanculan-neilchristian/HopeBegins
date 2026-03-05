import { useState, useMemo } from 'react';

export const CHART_DATA = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 6000 },
  { name: 'Apr', amount: 8000 },
  { name: 'May', amount: 5000 },
  { name: 'Jun', amount: 9000 },
  { name: 'Jul', amount: 12000 },
];

export const DONATIONS = [
  {
    id: '1',
    name: 'Grace L.',
    date: '2026-02-19',
    type: 'ONE_TIME',
    amount: 100,
  },
  {
    id: '2',
    name: 'Anonymous',
    date: '2026-02-18',
    type: 'MONTHLY',
    amount: 25,
  },
  {
    id: '3',
    name: 'Mark S.',
    date: '2026-02-17',
    type: 'ONE_TIME',
    amount: 50,
  },
  {
    id: '4',
    name: 'Michael Chen',
    date: '2026-02-15',
    type: 'ONE_TIME',
    amount: 200,
  },
  {
    id: '5',
    name: 'Emma Watson',
    date: '2026-02-14',
    type: 'MONTHLY',
    amount: 40,
  },
  {
    id: '6',
    name: 'David Miller',
    date: '2026-02-12',
    type: 'ONE_TIME',
    amount: 75,
  },
  {
    id: '7',
    name: 'Anonymous',
    date: '2026-02-10',
    type: 'MONTHLY',
    amount: 100,
  },
  {
    id: '8',
    name: 'Sarah Johnson',
    date: '2026-02-08',
    type: 'ONE_TIME',
    amount: 500,
  },
];

export function useDonations() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'ONE_TIME' | 'MONTHLY'>(
    'ALL'
  );
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const totalRaised = DONATIONS.reduce((s, d) => s + d.amount, 0);
  const totalDonors = DONATIONS.length;
  const monthlyTotal = DONATIONS.filter((d) => d.type === 'MONTHLY').reduce(
    (s, d) => s + d.amount,
    0
  );
  const avgDonation = Math.round(totalRaised / DONATIONS.length);

  const handleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy(field);
      setSortDir('desc');
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...DONATIONS]
      .filter((d) => {
        const matchSearch = d.name.toLowerCase().includes(q);
        const matchType = typeFilter === 'ALL' || d.type === typeFilter;
        return matchSearch && matchType;
      })
      .sort((a, b) => {
        const mul = sortDir === 'asc' ? 1 : -1;
        if (sortBy === 'date')
          return (
            mul * (new Date(a.date).getTime() - new Date(b.date).getTime())
          );
        return mul * (a.amount - b.amount);
      });
  }, [search, typeFilter, sortBy, sortDir]);

  return {
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    sortBy,
    sortDir,
    handleSort,
    filtered,
    stats: {
      totalRaised,
      totalDonors,
      monthlyTotal,
      avgDonation,
    },
  };
}
