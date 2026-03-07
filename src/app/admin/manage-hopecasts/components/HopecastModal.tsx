import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Loader2 } from 'lucide-react';
import { categoryStyle } from '../constants';
import type {
  Hopecast,
  HopecastCategory,
  HopecastPayload,
} from '@/types/admin';

interface HopecastModalProps {
  initial?: Hopecast | null;
  categories: HopecastCategory[];
  onSave: (payload: HopecastPayload) => void;
  onClose: () => void;
  isPending: boolean;
}

export function HopecastModal({
  initial,
  categories,
  onSave,
  onClose,
  isPending,
}: HopecastModalProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [name, setName] = useState(initial?.name ?? '');
  const [verse, setVerse] = useState(initial?.verse ?? '');
  const [mp4Link, setMp4Link] = useState(initial?.mp4_link ?? '');
  const [selectedCats, setSelectedCats] = useState<string[]>(
    initial?.category_details?.map((c) => c.id) ?? []
  );

  const toggleCat = (id: string) =>
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !mp4Link.trim()) return;
    onSave({
      title: title.trim(),
      name: name.trim(),
      verse: verse.trim(),
      mp4_link: mp4Link.trim(),
      categories: selectedCats,
    });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={initial ? 'Edit Hopecast' : 'New Hopecast'}
      description={
        initial
          ? 'Update the details below.'
          : 'Fill in the details to publish a new cast.'
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5 block">
            Title
          </label>
          <Input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Morning Light"
            className="h-12 rounded-2xl border-zinc-200 dark:border-zinc-700 font-medium focus-visible:ring-brand/30"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5 block">
              Author / speaker Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="h-12 rounded-2xl border-zinc-200 dark:border-zinc-700 font-medium focus-visible:ring-brand/30"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5 block">
              Scripture Verse
            </label>
            <Input
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              placeholder="e.g. Psalm 23:1"
              className="h-12 rounded-2xl border-zinc-200 dark:border-zinc-700 font-medium focus-visible:ring-brand/30"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5 block">
            Content URL
          </label>
          <Input
            required
            type="url"
            value={mp4Link}
            onChange={(e) => setMp4Link(e.target.value)}
            placeholder="https://youtube.com/... or https://vimeo.com/..."
            className="h-12 rounded-2xl border-zinc-200 dark:border-zinc-700 font-medium focus-visible:ring-brand/30"
          />
          <p className="text-xs text-zinc-400 mt-1.5 font-medium">
            Paste a YouTube, Vimeo, Google Drive, or direct mp4/audio link.
          </p>
        </div>

        {categories.length > 0 && (
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 block">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => {
                const s = categoryStyle(idx);
                const selected = selectedCats.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCat(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${
                      selected
                        ? `${s.bg} ${s.color} ${s.border} ring-2 ring-offset-1 ring-current`
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 h-12 rounded-2xl font-bold border border-zinc-200 dark:border-zinc-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending || !title.trim() || !mp4Link.trim()}
            className="flex-1 h-12 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-bold"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : initial ? (
              'Save Changes'
            ) : (
              'Publish'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
