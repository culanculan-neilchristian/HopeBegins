import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-[#6b634d] py-10 px-6 text-white mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Button
            variant="outline"
            asChild
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg px-6 font-poppins font-bold uppercase tracking-widest text-[10px]"
          >
            <Link href="/be-carrier">I Want to Be a Hope Carrier</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg px-6 font-poppins font-bold uppercase tracking-widest text-[10px]"
          >
            <Link href="/login/carrier">Carrier Login</Link>
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="font-poppins font-black text-xl tracking-tighter opacity-90">
            HopeBegins Today
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60 font-poppins">
            Faith-Driven Mental Health Support
          </div>
          <div className="pt-8 text-[10px] opacity-40">
            © 2026 HOPEBEGINS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
