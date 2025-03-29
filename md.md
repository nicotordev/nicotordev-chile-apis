# AI Prompt for HTML to JSON Parsing

## Task Overview
Your task is to analyze HTML content provided by the user and extract structured data according to the specified `NewsArticle` model schema below. You must strictly adhere to the provided schema and formatting rules.

### Schema: `NewsArticle`

```json
{
  "id": "Unique generated identifier (CUID format)",
  "externalId": "Unique external identifier (optional)",
  "url": "Complete URL of the article (required, unique)",
  "title": "Title of the article",
  "snippet": "Brief text summary or snippet from the article",
  "sourceDomain": "Domain of the source website",
  "sourceUrl": "URL of the source website",
  "author": "Author's name if available",
  "publishedAt": "Publication date in ISO 8601 format",
  "scrapedAt": "Scrape date in ISO 8601 format",
  "category": "Article category if identifiable",
  "tags": ["Array of relevant tags"],
  "language": "Language code (ISO 639-1)",
  "country": "Country code if identifiable (ISO 3166-1 alpha-2)",
  "thumbnailUrl": "URL to the thumbnail image if available",
  "isProcessed": false,
  "isDuplicate": false,
  "scraperName": "Name of scraper or extraction tool used",
  "extractionMethod": "Extraction method used (optional)"
}
```

## Guidelines for Extraction

### DO:
- Extract exact data as it appears in the HTML.
- Format dates strictly in ISO 8601 (e.g., `2025-03-25T10:00:00Z`).
- Return tags as an array of strings, even if only one tag is present.
- Provide valid URLs (absolute URLs are mandatory).
- Use the provided schema as output format.
- Generate a unique `id` using CUID format if possible.
- Set default boolean values (`isProcessed` and `isDuplicate`) to `false`.

### DO NOT:
- Invent or assume data not present in the HTML.
- Omit mandatory fields (`url`, `title`, `snippet`, `sourceDomain`, `sourceUrl`, `publishedAt`).
- Provide relative URLs or incomplete links.
- Alter the schema structure or naming conventions.

## Practical Example

### Input HTML (example):

```html
<html>
<head><title>Example News</title></head>
<body>
  <article>
    <h1>Breaking News: Example Event</h1>
    <p class="author">Jane Doe</p>
    <time datetime="2025-03-25T10:00:00Z">March 25, 2025</time>
    <div class="snippet">An example event has occurred...</div>
    <a href="https://example.com/news/example-event">Read more</a>
    <img src="https://example.com/thumbnail.jpg" alt="Thumbnail">
    <div class="tags">
      <span>Event</span>
      <span>Breaking News</span>
    </div>
  </article>
</body>
</html>
```

### Expected JSON Output:

```json
{
  "id": "clt6eqt9m0000xyz123abc456",
  "externalId": null,
  "url": "https://example.com/news/example-event",
  "title": "Breaking News: Example Event",
  "snippet": "An example event has occurred...",
  "sourceDomain": "example.com",
  "sourceUrl": "https://example.com",
  "author": "Jane Doe",
  "publishedAt": "2025-03-25T10:00:00Z",
  "scrapedAt": "2025-03-25T12:00:00Z",
  "category": null,
  "tags": ["Event", "Breaking News"],
  "language": "en",
  "country": null,
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "isProcessed": false,
  "isDuplicate": false,
  "scraperName": "ExampleScraper",
  "extractionMethod": null
}
```

## Final Instructions
- Provide results in valid JSON array format, even if only one article is processed.
- Ensure consistency and accuracy in extracted data.
- Clearly indicate if mandatory data is missing from the HTML.

# REAL INPUT

```html
{{HTML}}
```