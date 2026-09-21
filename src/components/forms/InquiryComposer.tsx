"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Copy } from "lucide-react";

const labels: Record<string, string> = {
  name: "Name", email: "Work email", organization: "Organization", role: "Role",
  interest: "Interest", message: "Message", country: "Country / region",
  markets: "Markets", research: "Research area", track: "Partnership track",
};

/** Prepare a reviewable message without claiming an email has been sent.
 *  The standing "nothing is sent automatically" line above the form was
 *  removed; the handoff is carried by the submit verb ("Prepare … email") and
 *  restated in the draft panel below, which says outright that the inquiry has
 *  not been sent. */
export function InquiryComposer({ recipient, subject, children }: {
  recipient: string; subject: string; children: ReactNode;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [sourceChanged, setSourceChanged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const draftHeading = useRef<HTMLHeadingElement>(null);
  const hasDraft = draft !== null;
  useEffect(() => { if (hasDraft) draftHeading.current?.focus(); }, [hasDraft]);

  return (
    <div>
      <form ref={formRef} onChange={() => { if (draft !== null) setSourceChanged(true); setCopyStatus(""); }}
        onClick={(event) => {
          if (draft !== null && (event.target as HTMLElement).closest('[data-inquiry-option][aria-pressed="false"]')) setSourceChanged(true);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const body = Array.from(data.entries()).filter(([name, value]) => labels[name] && String(value).trim())
            .map(([name, value]) => `${labels[name]}: ${String(value).trim()}`).join("\n\n");
          setDraft(body + "\n\nI consent to being contacted about this inquiry.");
          setCopyStatus("");
          setSourceChanged(false);
        }}
        className="rounded-sm border border-ink-900/12 bg-white p-6 md:p-8">
        {draft !== null && <p className="mb-5 text-sm text-navy-800">Preparing another email replaces the draft below with the current form details.</p>}
        {children}
      </form>
      {draft !== null && <section className="email-draft" aria-label="Your email draft">
        <h3 ref={draftHeading} tabIndex={-1}>Your email is ready to review.</h3>
        <p>To: <a href={`mailto:${recipient}`} className="underline">{recipient}</a><br />Subject: {subject}</p>
        <p>Open your email app to send this message. If it does not open, copy the draft below into an email. Your inquiry has not been sent.</p>
        {sourceChanged && <div className="mt-4 border-l-2 border-navy-700 pl-4" role="status"><p>The form details have changed. Your draft edits are preserved below.</p><button type="button" className="mt-2 cursor-pointer text-sm font-semibold underline" onClick={() => formRef.current?.requestSubmit()}>Rebuild draft from form (replaces draft edits)</button></div>}
        <label className="sr-only" htmlFor="inquiry-email-draft">Email draft</label>
        <textarea id="inquiry-email-draft" value={draft} onChange={(event) => { setDraft(event.target.value); setCopyStatus(""); }} />
        <div className="email-draft-actions">
          <a className="editorial-button" href={`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`}>Open email app <ArrowUpRight size={17} /></a>
          <button type="button" onClick={async () => {
            try { await navigator.clipboard.writeText(`To: ${recipient}\nSubject: ${subject}\n\n${draft}`); setCopyStatus("Draft copied."); }
            catch { setCopyStatus("Select the draft text above and copy it manually."); }
          }} className="inline-flex items-center gap-2"><Copy size={16} />Copy draft</button>
        </div>
        <p role="status">{copyStatus}</p>
      </section>}
    </div>
  );
}
