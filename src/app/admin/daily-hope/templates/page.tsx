'use client';

import { useState, useEffect } from 'react';
import {
  Mail,
  RefreshCw,
  Save,
  AlertCircle,
  Eye,
  CheckCircle2,
  ChevronRight,
  Send,
  Loader2,
  Layout,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dailyHopeService, EmailTemplate } from '@/services/dailyHopeService';
import { toast } from 'sonner';
import { Editor, Provider, Toolbar, BtnBold, BtnItalic, BtnLink, BtnUnderline, BtnStrikeThrough, BtnBulletList, BtnNumberedList, BtnClearFormatting } from 'react-simple-wysiwyg';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from 'next/link';
import { DailyHopeNav } from '../components/DailyHopeNav';

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [editingSubject, setEditingSubject] = useState('');
  const [saving, setSaving] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const data = await dailyHopeService.getEmailTemplates();
      setTemplates(data);
      if (data.length > 0 && !selectedTemplate) {
        handleSelectTemplate(data[0]);
      }
    } catch (error) {
      toast.error('Failed to load email templates');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditingContent(template.html_content);
    setEditingSubject(template.subject);
  };

  const handleSave = async () => {
    if (!selectedTemplate) return;

    try {
      setSaving(true);
      await dailyHopeService.updateEmailTemplate(selectedTemplate.id, {
        subject: editingSubject,
        html_content: editingContent,
      });
      toast.success(`Day ${selectedTemplate.day_number} template updated!`);
      fetchTemplates();
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading && templates.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-brand animate-spin" />
          <p className="font-black italic uppercase tracking-widest text-xs text-zinc-400">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-12 max-w-[1600px] mx-auto min-h-screen">
      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/daily-hope" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-brand transition-colors">
              Daily Hope
            </Link>
            <ChevronRight className="h-3 w-3 text-zinc-300" />
            <span className="text-xs font-black uppercase tracking-widest text-brand">
              Email Templates
            </span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter">
            Journey Emails
          </h1>
          <div className="mt-6">
            <DailyHopeNav />
          </div>
          <p className="mt-2 text-zinc-500 font-medium text-sm sm:text-base max-w-2xl">
            Edit the content and design of the 21-day automated email campaign. 
            Changes apply immediately to all active participants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsPreviewOpen(true)}
            disabled={!selectedTemplate}
            className="h-11 px-6 rounded-2xl border-zinc-200 font-black uppercase tracking-widest text-xs hover:bg-zinc-50 transition-all gap-2"
          >
            <Eye className="h-4 w-4" /> Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !selectedTemplate}
            className="h-11 px-8 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-black uppercase tracking-widest text-xs shadow-xl shadow-brand/20 transition-all gap-2"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Sidebar (Day List) ── */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-2 shadow-xl shadow-zinc-200/40 dark:shadow-none overflow-hidden">
             <div className="p-4 border-b border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                   <Layout className="h-3 w-3" /> Journey Map
                </span>
                <span className="text-[10px] font-black text-brand bg-brand-muted/20 px-2 py-0.5 rounded-full">
                  21 Days
                </span>
             </div>
             <div className="max-h-[600px] overflow-y-auto custom-scrollbar p-2 space-y-1">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTemplate(t)}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group ${
                      selectedTemplate?.id === t.id
                        ? 'bg-brand text-brand-foreground shadow-lg shadow-brand/20'
                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-black text-sm ${
                        selectedTemplate?.id === t.id ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'
                      }`}>
                        {t.day_number}
                      </div>
                      <span className="font-bold text-sm truncate max-w-[120px]">
                        {t.subject.split(':').pop()?.trim()}
                      </span>
                    </div>
                    {selectedTemplate?.id === t.id && <ChevronRight className="h-4 w-4" />}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border border-amber-100 dark:border-amber-900/20">
            <div className="flex items-start gap-3">
               <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-black text-amber-900 dark:text-amber-200 text-xs uppercase tracking-wider mb-1">Important</h4>
                 <p className="text-xs text-amber-700/80 dark:text-amber-300/60 leading-relaxed font-medium">
                   Be careful with layout changes. These emails use standard HTML tables for maximum compatibility with email clients like Outlook.
                 </p>
               </div>
            </div>
          </div>
        </aside>

        {/* ── Main Editor ── */}
        <main className="lg:col-span-9 space-y-6">
          {selectedTemplate ? (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden">
              {/* Subject Input */}
              <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Mail className="h-3 w-3" /> Email Subject
                </label>
                <Input
                  value={editingSubject}
                  onChange={(e) => setEditingSubject(e.target.value)}
                  placeholder="Enter email subject line..."
                  className="text-xl font-black italic tracking-tight border-none bg-zinc-50 dark:bg-zinc-800/50 h-14 rounded-2xl focus-visible:ring-brand px-6"
                />
              </div>

              {/* Editor */}
              <div className="p-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-4">
                  <Settings className="h-3 w-3" /> HTML Content Editor
                </label>
                <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-800/20">
                   <Provider>
                    <div className="border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2">
                      <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <div className="w-px h-6 bg-zinc-100 mx-2" />
                        <BtnLink />
                        <BtnBulletList />
                        <BtnNumberedList />
                        <div className="w-px h-6 bg-zinc-100 mx-2" />
                        <BtnClearFormatting />
                      </Toolbar>
                    </div>
                    <Editor 
                      value={editingContent} 
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="min-h-[500px] p-6 focus:outline-none text-zinc-600 dark:text-zinc-300 font-medium"
                    />
                  </Provider>
                </div>
              </div>

              <div className="p-8 bg-zinc-50 dark:bg-zinc-800/30 flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="h-11 px-8 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-black uppercase tracking-widest text-xs shadow-xl shadow-brand/20 transition-all gap-2"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Template
                  </Button>
              </div>
            </div>
          ) : (
             <div className="h-[600px] rounded-3xl border-2 border-dashed border-zinc-100 flex items-center justify-center">
                <p className="text-zinc-400 font-black uppercase tracking-widest text-xs italic">Select a day to start editing</p>
             </div>
          )}
        </main>
      </div>

      {/* ── Preview Modal ── */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-none rounded-[40px] bg-white dark:bg-zinc-900">
          <DialogHeader className="p-8 border-b border-zinc-50 dark:border-zinc-800 shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-black italic tracking-tighter">Email Preview</DialogTitle>
                <p className="text-zinc-500 font-medium text-sm mt-1">This is how the email will look to subscribers.</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live View</span>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-8 bg-zinc-50 dark:bg-zinc-950/50">
             <div className="max-w-[600px] mx-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden ring-1 ring-zinc-100 dark:ring-zinc-800">
                <div dangerouslySetInnerHTML={{ __html: editingContent }} />
             </div>
          </div>

          <DialogFooter className="p-8 border-t border-zinc-50 dark:border-zinc-800 shrink-0 flex items-center sm:justify-between bg-white dark:bg-zinc-900">
            <div className="hidden sm:flex items-center gap-4 text-zinc-400">
               <div className="flex items-center gap-2">
                 <Mail className="h-4 w-4" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">{editingSubject}</span>
               </div>
            </div>
            <Button
              onClick={() => setIsPreviewOpen(false)}
              className="h-11 px-8 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase tracking-widest text-xs"
            >
              Done Previewing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
