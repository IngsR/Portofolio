import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ProjectItem } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  ArrowUpRight, 
  Github, 
  FileText, 
  Code, 
  Calendar
} from 'lucide-react';

interface MarkdownViewerModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const MarkdownViewerModal: React.FC<MarkdownViewerModalProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'rendered' | 'raw'>('rendered');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(project.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([project.markdownContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${project.slug || 'project'}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border border-black/20 dark:border-white/20 text-slate-900 dark:text-white">
                {project.category}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-white/40 font-mono">
                {project.slug}.md
              </span>
            </div>
            <h2 className="font-black font-display text-lg sm:text-2xl text-slate-950 dark:text-white uppercase tracking-tight truncate">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Tab switch */}
            <div className="flex items-center border border-black/10 dark:border-white/10 p-0.5 text-xs font-mono">
              <button
                onClick={() => setActiveTab('rendered')}
                className={`flex items-center gap-1 px-3 py-1 uppercase tracking-wider transition-all ${
                  activeTab === 'rendered'
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                    : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RENDERED</span>
              </button>
              <button
                onClick={() => setActiveTab('raw')}
                className={`flex items-center gap-1 px-3 py-1 uppercase tracking-wider transition-all ${
                  activeTab === 'raw'
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                    : 'text-slate-600 dark:text-white/60 hover:text-black dark:hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RAW .MD</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Tutup modal"
              className="p-1.5 border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Toolbar (Copy, Download, External Links) */}
        <div className="px-4 sm:px-6 py-3 bg-white dark:bg-[#0a0a0a] border-b border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-white/50 text-[11px]">
            <span className="flex items-center gap-1 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.publishedDate}</span>
            </span>
            <span>//</span>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span key={tag} className="px-1.5 py-0.2 border border-black/10 dark:border-white/10 text-[10px] uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1 px-3 py-1 border border-black/20 dark:border-white/20 text-slate-900 dark:text-white uppercase tracking-wider text-[10px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY .MD'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1 px-3 py-1 border border-black/20 dark:border-white/20 text-slate-900 dark:text-white uppercase tracking-wider text-[10px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DOWNLOAD .MD</span>
            </button>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-wider text-[10px]"
              >
                <span>LIVE DEMO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                title="GitHub Repo"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white">
          {activeTab === 'rendered' ? (
            <div className="markdown-content max-w-none prose dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.markdownContent}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="space-y-2 font-mono">
              <div className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40 flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                <span>RAW MARKDOWN SOURCE ({project.markdownContent.length} CHARS)</span>
                <span>UTF-8</span>
              </div>
              <pre className="p-4 bg-[#050505] text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-white/10 whitespace-pre-wrap select-all">
                {project.markdownContent}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 px-6 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-white/40">
          <span className="uppercase tracking-wider">DOC // GITHUB FLAVORED MARKDOWN</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-black/20 dark:border-white/20 text-slate-900 dark:text-white uppercase tracking-widest text-[10px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            [ CLOSE ]
          </button>
        </div>

      </div>
    </div>
  );
};
