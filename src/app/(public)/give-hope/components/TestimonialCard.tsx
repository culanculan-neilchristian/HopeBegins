export function TestimonialCard() {
  return (
    <section className="px-6 pb-8 max-w-2xl mx-auto">
      <div
        className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: '#eff3e8' }}
      >
        <blockquote className="text-zinc-600 dark:text-zinc-300 text-lg font-medium italic leading-relaxed mb-4">
          &ldquo;I submitted a prayer request at my lowest. Within hours, I
          received a message that someone had prayed for me. That moment changed
          everything.&rdquo;
        </blockquote>
        <cite
          className="text-sm font-bold not-italic"
          style={{ color: '#acc487' }}
        >
          — A HopeBegins Community Member
        </cite>
      </div>
    </section>
  );
}
