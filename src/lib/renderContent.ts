import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Decode HTML entities (e.g. &lt; &amp; &quot;) back to characters.
 * Used when markdown was stored escaped inside a code block.
 */
function decodeHtmlEntities(str: string): string {
  const el = document.createElement('textarea');
  el.innerHTML = str;
  return el.value;
}

/**
 * If the entire content is a single markdown code block
 * (e.g. <pre><code class="language-markdown">...</code></pre>), return the
 * raw markdown inside it. Otherwise return null.
 *
 * This handles posts that were pasted as a code block by mistake.
 */
function unwrapMarkdownCodeBlock(content: string): string | null {
  // Drop trailing empty paragraphs / line breaks the editor appends.
  const trimmed = content
    .trim()
    .replace(/(?:\s*<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>)+\s*$/gi, '')
    .trim();
  const match = trimmed.match(
    /^<pre>\s*<code[^>]*class=["'][^"']*language-markdown[^"']*["'][^>]*>([\s\S]*?)<\/code>\s*<\/pre>$/i
  );
  if (!match) return null;
  return decodeHtmlEntities(match[1]);
}

/**
 * Heuristic: does this content look like rendered HTML (TipTap output)
 * rather than raw markdown?
 */
function looksLikeHtml(content: string): boolean {
  return /<(p|div|h[1-6]|ul|ol|li|blockquote|br|img|a|strong|em|table|figure)[\s/>]/i.test(
    content
  );
}

/**
 * Turn stored post content into safe, rendered HTML.
 *
 * Handles three cases transparently so old and new posts both render:
 *  1. Markdown accidentally saved inside a code block -> unwrap + parse.
 *  2. Existing TipTap HTML -> pass through (already HTML).
 *  3. Plain markdown -> parse to HTML.
 *
 * Output is always sanitized before it reaches dangerouslySetInnerHTML.
 */
export function renderBlogContent(content: string): string {
  if (!content) return '';

  let html: string;

  const unwrapped = unwrapMarkdownCodeBlock(content);
  if (unwrapped !== null) {
    html = marked.parse(unwrapped) as string;
  } else if (looksLikeHtml(content)) {
    html = content;
  } else {
    html = marked.parse(content) as string;
  }

  return DOMPurify.sanitize(html);
}
