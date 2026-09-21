import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Server-rendered markdown for articles, styled with the spectral prose theme. */
export function Markdown({ content }: { content: string }) {
  return (
    <div
      className="prose-spectral prose max-w-none
        prose-headings:font-display prose-headings:tracking-tight
        prose-h2:mt-12 prose-h2:text-2xl prose-h2:font-semibold
        prose-h3:mt-8 prose-h3:text-xl
        prose-p:leading-relaxed
        prose-a:font-medium prose-a:text-navy-700 prose-a:underline-offset-2
        prose-strong:text-ink-900
        prose-blockquote:rounded-r-xl prose-blockquote:border-l-4 prose-blockquote:border-gold-400
        prose-blockquote:bg-gold-50/50 prose-blockquote:px-5 prose-blockquote:py-1
        prose-blockquote:font-display prose-blockquote:not-italic prose-blockquote:text-navy-900
        prose-li:marker:text-navy-500
        prose-hr:border-ink-900/10
        prose-table:overflow-hidden prose-table:rounded-lg prose-th:bg-navy-50"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
