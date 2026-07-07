type JsonLdData = Record<string, unknown>;

// Serialized via escaped text children instead of dangerouslySetInnerHTML
// (forbidden in this codebase). The unicode escapes keep the payload free of
// characters React would HTML-encode inside the script tag.
function serializeJsonLd(data: JsonLdData): string {
  return JSON.stringify(data)
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');
}

export function JsonLd({ data }: { data: JsonLdData }) {
  return <script type="application/ld+json">{serializeJsonLd(data)}</script>;
}
