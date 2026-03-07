'use client';

import { ForgotPasswordForm } from './components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfa] dark:bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[#b4c392]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="mb-12 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="text-center">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 font-poppins tracking-tighter uppercase italic">
            HopeBegins
          </h1>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mt-1 pr-1 border-r-2 border-[#b4c392]">
            Password Recovery
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center animate-in fade-in zoom-in-95 duration-500 delay-200">
        <ForgotPasswordForm />
      </div>

      <footer className="mt-12 text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
        © 2026 HOPEBEGINS. STANDING IN THE GAP.
      </footer>
    </main>
  );
}
