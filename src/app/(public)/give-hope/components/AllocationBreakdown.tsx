const ALLOCATIONS = [
  { percent: '40%', label: 'Technology & Platform', description: 'Keeping HopeBegins accessible and free for everyone' },
  { percent: '30%', label: 'Content Creation', description: 'Producing HopeCasts, devotionals, and Daily Hope Drops' },
  { percent: '20%', label: 'Outreach & Growth', description: 'Reaching more people who need hope' },
  { percent: '10%', label: 'Operations', description: 'Supporting the team and volunteers behind HopeBegins' },
];

export function AllocationBreakdown() {
  return (
    <section className="px-6 pb-8 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins text-center mb-6">
          Where Your Hope Seed Goes
        </h2>
        <div className="space-y-4">
          {ALLOCATIONS.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div
                className="shrink-0 h-12 w-14 rounded-xl flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: '#eff3e8', color: '#acc487' }}
              >
                {item.percent}
              </div>
              <div>
                <p className="font-bold text-zinc-700 dark:text-zinc-200 text-sm">{item.label}</p>
                <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
