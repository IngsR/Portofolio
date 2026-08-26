import { Code, Download, Eye, Plus, X } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ProjectCategory, ProjectItem } from "../types";

interface MarkdownEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProject: (newProject: ProjectItem) => void;
}

const TEMPLATE_MARKDOWN = `# Project Title

## Overview
Tuliskan ringkasan masalah, tujuan, dan hasil utama project ini.

---

## Fitur Utama
- Jelaskan kemampuan penting yang tersedia.
- Jelaskan manfaatnya bagi pengguna.

## Code Sample
\`\`\`typescript
export function getProjectData(slug: string) {
  return fetchProjectBySlug(slug);
}
\`\`\`
`;

export const MarkdownEditorModal: React.FC<MarkdownEditorModalProps> = ({
  isOpen,
  onClose,
  onSaveProject,
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("Frontend / React");
  const [shortDesc, setShortDesc] = useState("");
  const [tags, setTags] = useState("React, TypeScript, JavaScript, CSS");
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  );
  const [markdownContent, setMarkdownContent] = useState(TEMPLATE_MARKDOWN);
  const [activeView, setActiveView] = useState<"split" | "edit" | "preview">(
    "split",
  );
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("Harap masukkan judul proyek.");
      return;
    }
    if (!shortDesc.trim()) {
      setErrorMsg("Harap masukkan ringkasan singkat proyek.");
      return;
    }
    if (!markdownContent.trim()) {
      setErrorMsg("Isi Markdown tidak boleh kosong.");
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      slug: slug || `project-${Date.now()}`,
      title: title.trim(),
      shortDescription: shortDesc.trim(),
      category: category === "Semua" ? "Frontend / React" : category,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      image:
        image.trim() ||
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      publishedDate: "Just Now",
      ...(demoUrl.trim() ? { demoUrl: demoUrl.trim() } : {}),
      ...(githubUrl.trim() ? { githubUrl: githubUrl.trim() } : {}),
      metrics: [
        { label: "Status", value: "Live" },
        { label: "Docs", value: "Markdown" },
      ],
      markdownContent: markdownContent.trim(),
    };

    onSaveProject(newProject);
    onClose();
  };

  const handleDownloadDraft = () => {
    const element = document.createElement("a");
    const file = new Blob([markdownContent], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/\s+/g, "-") || "new-project"}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      <div
        className="relative w-full max-w-5xl h-[94vh] flex flex-col bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 dark:text-white/40 mb-1">
              MARKDOWN COMPOSER //
            </div>
            <h2 className="font-black font-display text-lg sm:text-xl text-slate-950 dark:text-white uppercase tracking-tight">
              PROJECT DOCUMENTATION EDITOR
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Controls */}
            <div className="hidden sm:flex items-center border border-black/10 dark:border-white/10 p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveView("edit")}
                className={`px-3 py-1 uppercase tracking-wider ${activeView === "edit" ? "bg-black text-white dark:bg-white dark:text-black font-bold" : "text-slate-600 dark:text-white/60"}`}
              >
                EDIT ONLY
              </button>
              <button
                type="button"
                onClick={() => setActiveView("split")}
                className={`px-3 py-1 uppercase tracking-wider ${activeView === "split" ? "bg-black text-white dark:bg-white dark:text-black font-bold" : "text-slate-600 dark:text-white/60"}`}
              >
                SPLIT
              </button>
              <button
                type="button"
                onClick={() => setActiveView("preview")}
                className={`px-3 py-1 uppercase tracking-wider ${activeView === "preview" ? "bg-black text-white dark:bg-white dark:text-black font-bold" : "text-slate-600 dark:text-white/60"}`}
              >
                PREVIEW ONLY
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSave}
          className="flex-1 flex flex-col overflow-hidden"
        >
          {/* Metadata Inputs */}
          <div className="p-4 bg-black/[0.01] dark:bg-white/[0.01] border-b border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                required
                placeholder="E.G. PULSE - MICRO-SAAS"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#0f0f10] border border-black/10 dark:border-white/10 text-slate-950 dark:text-white uppercase text-xs focus:border-black dark:focus:border-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#0f0f10] border border-black/10 dark:border-white/10 text-slate-950 dark:text-white uppercase text-xs focus:border-black dark:focus:border-white outline-none"
              >
                <option value="Web App">Web App</option>
                <option value="Frontend / React">Frontend / React</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Mobile & UI/UX">Mobile & UI/UX</option>
                <option value="Open Source">Open Source</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40">
                TAGS (COMMA SEPARATED)
              </label>
              <input
                type="text"
                placeholder="REACT, TYPESCRIPT, JAVASCRIPT"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#0f0f10] border border-black/10 dark:border-white/10 text-slate-950 dark:text-white uppercase text-xs focus:border-black dark:focus:border-white outline-none"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40">
                SUMMARY DESCRIPTION *
              </label>
              <input
                type="text"
                required
                placeholder="BRIEF ONE-SENTENCE SUMMARY..."
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#0f0f10] border border-black/10 dark:border-white/10 text-slate-950 dark:text-white text-xs focus:border-black dark:focus:border-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40">
                DEMO URL (OPTIONAL)
              </label>
              <input
                type="url"
                placeholder="HTTPS://..."
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#0f0f10] border border-black/10 dark:border-white/10 text-slate-950 dark:text-white text-xs focus:border-black dark:focus:border-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/40">
                GITHUB URL (OPTIONAL)
              </label>
              <input
                type="url"
                placeholder="HTTPS://GITHUB.COM/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#0f0f10] border border-black/10 dark:border-white/10 text-slate-950 dark:text-white text-xs focus:border-black dark:focus:border-white outline-none"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="px-4 py-2 bg-rose-500/10 text-rose-500 text-xs font-mono border-b border-rose-500/20">
              {errorMsg}
            </div>
          )}

          {/* Editor & Live Preview Area */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10 overflow-hidden">
            {/* Editor Pane */}
            {(activeView === "split" || activeView === "edit") && (
              <div className="flex flex-col h-full overflow-hidden bg-[#0a0a0a] text-white">
                <div className="px-4 py-2 bg-black border-b border-white/10 text-[10px] font-mono flex items-center justify-between text-white/50 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" />
                    <span>MARKDOWN SOURCE (GFM)</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleDownloadDraft}
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>DOWNLOAD .MD</span>
                  </button>
                </div>
                <textarea
                  value={markdownContent}
                  onChange={(e) => {
                    setMarkdownContent(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  className="flex-1 w-full p-4 bg-[#0a0a0a] text-slate-100 font-mono text-xs sm:text-sm resize-none focus:outline-none leading-relaxed selection:bg-white selection:text-black"
                  placeholder="Type markdown content..."
                  spellCheck={false}
                />
              </div>
            )}

            {/* Preview Pane */}
            {(activeView === "split" || activeView === "preview") && (
              <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-[#0a0a0a]">
                <div className="px-4 py-2 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/10 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest flex items-center justify-between text-slate-500 dark:text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>LIVE OUTPUT PREVIEW</span>
                  </span>
                  <span>SYNCED</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-slate-900 dark:text-white">
                  <div className="markdown-content max-w-none prose dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {markdownContent}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black/20 dark:border-white/20 text-slate-700 dark:text-white/70 uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              [ CANCEL ]
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs hover:opacity-85 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>COMMIT TO REPOSITORY</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
