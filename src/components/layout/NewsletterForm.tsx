"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [prepared, setPrepared] = useState(false);
  return (
    <div className="newsletter-composer">
      <form onSubmit={(event) => { event.preventDefault(); setPrepared(true); }}>
        <label htmlFor="newsletter-email" className="sr-only">Email address for updates</label>
        <input id="newsletter-email" name="email" type="email" autoComplete="email" required value={email}
          onChange={(event) => { setEmail(event.target.value); setPrepared(false); }}
          placeholder="Your email address" />
        <button type="submit" aria-label="Prepare updates request"><ArrowUpRight size={20} /></button>
      </form>
      {prepared ? <p role="status">One more step: <a href={`mailto:${site.email}?subject=${encodeURIComponent("Email updates request")}&body=${encodeURIComponent("I'd like to receive " + site.name + " email updates at " + email + ". Please let me know how to subscribe.")}`}>send your request by email</a>. You are not subscribed yet.</p>
      : <p></p>}
    </div>
  );
}
