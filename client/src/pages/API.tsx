/*
 * Trackeep API Documentation Page
 * Design: Clean, readable documentation with syntax highlighting
 * Layout: Full-width documentation with sidebar navigation
 * Colors: Dark theme with blue accents matching the main site
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Book, Check, ChevronRight, Copy, ExternalLink, Search } from "lucide-react";
import { Link } from "wouter";

const API_DOCS = `# Trackeep API Documentation

## Overview

Trackeep provides a RESTful API for managing bookmarks, tasks, files, and notes. All API endpoints (except authentication) require a valid JWT token. The application also integrates with AI services (Mistral and LongCat) for enhanced functionality.

**Base URL:** \`http://localhost:8080/api/v1\`

**Authentication:** Bearer Token (JWT)

## AI Services Integration

Trackeep integrates with multiple AI providers to enhance functionality:

### Mistral AI
- **Purpose:** General AI tasks and text processing
- **Model:** mistral-small-latest (configurable)
- **Environment Variables:**
  - \`MISTRAL_API_KEY\`: Your Mistral API key
  - \`MISTRAL_MODEL\`: The model to use (default: mistral-small-latest)

### LongCat AI
- **Purpose:** Advanced AI features and specialized tasks
- **API Documentation:** https://longcat.chat/platform/docs/
- **Environment Variables:**
  - \`LONGCAT_API_KEY\`: Your LongCat API key
  - \`LONGCAT_BASE_URL\`: LongCat API base URL (default: https://api.longcat.chat)
- **API Key Format:** \`ak_xxxxxxxxxxxxxxxxxxxxxxxxxxx\`
- **Supported Formats:** OpenAI API Format and Anthropic API Format
- **Endpoints:**
  - OpenAI Format: \`https://api.longcat.chat/openai\`
  - Anthropic Format: \`https://api.longcat.chat/anthropic\`
- **Supported Models:** LongCat-Flash-Chat and others
- **Authentication:** Bearer token in Authorization header

## Environment Configuration

To use AI features, configure the following environment variables in your \`.env\` file:

\`\`\`bash
# Mistral AI Configuration
MISTRAL_API_KEY=your_mistral_api_key_here
MISTRAL_MODEL=mistral-small-latest

# LongCat AI Configuration
LONGCAT_API_KEY=ak_2886WQ2oE7rX3Ll3XD3pj1oM8iB4u
LONGCAT_BASE_URL=https://api.longcat.chat
\`\`\`

## Authentication

### Register User
\`\`\`http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
\`\`\`

### Login
\`\`\`http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
\`\`\`

## Bookmarks

### Get All Bookmarks
\`\`\`http
GET /bookmarks?page=1&limit=20&search=example&tag=important
Authorization: Bearer <token>
\`\`\`

**Query Parameters:**
- \`page\` (int): Page number (default: 1)
- \`limit\` (int): Items per page (default: 20)
- \`search\` (string): Search in title and description
- \`tag\` (string): Filter by tag

**Response:**
\`\`\`json
{
  "bookmarks": [
    {
      "id": 1,
      "title": "Example Bookmark",
      "url": "https://example.com",
      "description": "An example bookmark",
      "tags": ["important", "reference"],
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
\`\`\`

### Create Bookmark
\`\`\`http
POST /bookmarks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Bookmark",
  "url": "https://example.com",
  "description": "A new bookmark",
  "tags": ["new", "example"]
}
\`\`\`

## Notes

### Get All Notes
\`\`\`http
GET /notes?page=1&limit=20&search=example&tag=important
Authorization: Bearer <token>
\`\`\`

**Response:**
\`\`\`json
{
  "notes": [
    {
      "id": 1,
      "title": "Meeting Notes",
      "content": "Important meeting notes...",
      "tags": ["meeting", "important"],
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
\`\`\`

### Create Note
\`\`\`http
POST /notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Note",
  "content": "Note content",
  "tags": ["new", "example"]
}
\`\`\`

## Tasks

### Get All Tasks
\`\`\`http
GET /tasks?page=1&limit=20&status=pending&priority=high
Authorization: Bearer <token>
\`\`\`

**Query Parameters:**
- \`page\` (int): Page number
- \`limit\` (int): Items per page
- \`status\` (string): Filter by status (pending, in_progress, completed)
- \`priority\` (string): Filter by priority (low, medium, high)

**Response:**
\`\`\`json
{
  "tasks": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the Trackeep project",
      "status": "in_progress",
      "priority": "high",
      "due_date": "2024-01-15T00:00:00Z",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
\`\`\`

### Create Task
\`\`\`http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "due_date": "2024-01-15T00:00:00Z"
}
\`\`\`

## Files

### Upload File
\`\`\`http
POST /files/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary data>
description: "File description"
\`\`\`

### Get All Files
\`\`\`http
GET /files?page=1&limit=20&type=image
Authorization: Bearer <token>
\`\`\`

**Response:**
\`\`\`json
{
  "files": [
    {
      "id": 1,
      "filename": "document.pdf",
      "original_name": "My Document.pdf",
      "file_size": 1024000,
      "file_type": "application/pdf",
      "description": "Important document",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
\`\`\`

## Search

### Enhanced Search
\`\`\`http
POST /search/enhanced
Authorization: Bearer <token>
Content-Type: application/json

{
  "query": "project management",
  "filters": {
    "type": ["notes", "bookmarks"],
    "tags": ["work"],
    "date_range": "last_30_days"
  }
}
\`\`\`

### Semantic Search
\`\`\`http
POST /search/semantic
Authorization: Bearer <token>
Content-Type: application/json

{
  "query": "machine learning algorithms",
  "content_types": ["notes", "bookmarks"],
  "limit": 10
}
\`\`\`

## AI Features

### Summarize Content
\`\`\`http
POST /ai/summarize
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Long text to summarize...",
  "provider": "mistral",
  "max_length": 150
}
\`\`\`

**Response:**
\`\`\`json
{
  "summary": "Concise summary of the content...",
  "provider": "mistral",
  "word_count": 45
}
\`\`\`

### Generate Tag Suggestions
\`\`\`http
POST /ai/tags/suggest
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Article about machine learning algorithms",
  "existing_tags": ["ai", "technology"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "suggestions": ["machine-learning", "algorithms", "data-science", "ml"]
}
\`\`\`

## Error Responses

All endpoints may return standard HTTP error responses:

\`\`\`json
{
  "error": "Error message",
  "status_code": 400,
  "details": "Additional error details"
}
\`\`\`

Common status codes:
- \`400\`: Bad Request
- \`401\`: Unauthorized
- \`403\`: Forbidden
- \`404\`: Not Found
- \`500\`: Internal Server Error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Standard endpoints: 100 requests per minute
- AI endpoints: 20 requests per minute
- File uploads: 10 requests per minute

Rate limit headers are included in all responses:
- \`X-RateLimit-Limit\`: Total requests allowed
- \`X-RateLimit-Remaining\`: Remaining requests
- \`X-RateLimit-Reset\`: Time when limit resets (Unix timestamp)`;

interface Section {
  id: string;
  title: string;
  level: number;
  content: string;
}

interface HeadingBlock {
  type: "heading";
  id: string;
  level: number;
  text: string;
}

interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

interface LabelBlock {
  type: "label";
  text: string;
}

interface ListItem {
  text: string;
  depth: number;
}

interface ListBlock {
  type: "list";
  items: ListItem[];
}

interface CodeBlock {
  type: "code";
  language: string;
  content: string;
}

type DocBlock = HeadingBlock | ParagraphBlock | LabelBlock | ListBlock | CodeBlock;

interface ParsedDocument {
  blocks: DocBlock[];
  sections: Section[];
}

const NAV_OFFSET = 152;

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const createSlugger = () => {
  const usage = new Map<string, number>();

  return (text: string): string => {
    const base = slugify(text) || "section";
    const count = (usage.get(base) ?? 0) + 1;
    usage.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  };
};

const formatJSONBlock = (jsonString: string): string => {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 2);
  } catch {
    return jsonString;
  }
};

const parseAPIContent = (markdown: string): ParsedDocument => {
  const blocks: DocBlock[] = [];
  const sections: Section[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const nextSlug = createSlugger();
  let lineIndex = 0;
  let currentSectionIndex = -1;

  const appendSectionContent = (value: string) => {
    const cleanValue = value.trim();
    if (!cleanValue || currentSectionIndex < 0) {
      return;
    }
    const current = sections[currentSectionIndex];
    current.content = current.content ? `${current.content} ${cleanValue}` : cleanValue;
  };

  while (lineIndex < lines.length) {
    const line = lines[lineIndex];
    const trimmed = line.trim();

    if (!trimmed) {
      lineIndex += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      const id = nextSlug(title);
      blocks.push({ type: "heading", id, level, text: title });
      sections.push({ id, title, level, content: "" });
      currentSectionIndex = sections.length - 1;
      lineIndex += 1;
      continue;
    }

    const codeFenceMatch = trimmed.match(/^```(\w+)?$/);
    if (codeFenceMatch) {
      const language = (codeFenceMatch[1] ?? "text").toLowerCase();
      lineIndex += 1;
      const snippetLines: string[] = [];

      while (lineIndex < lines.length && !lines[lineIndex].trim().startsWith("```")) {
        snippetLines.push(lines[lineIndex]);
        lineIndex += 1;
      }

      if (lineIndex < lines.length) {
        lineIndex += 1;
      }

      const snippetContent = snippetLines.join("\n").trimEnd();
      blocks.push({
        type: "code",
        language,
        content: snippetContent,
      });
      appendSectionContent(snippetContent);
      continue;
    }

    const labelMatch = trimmed.match(/^\*\*([^*]+):\*\*$/);
    if (labelMatch) {
      const label = `${labelMatch[1]}:`;
      blocks.push({ type: "label", text: label });
      appendSectionContent(label);
      lineIndex += 1;
      continue;
    }

    if (/^(\s*)-\s+/.test(line)) {
      const items: ListItem[] = [];
      while (lineIndex < lines.length) {
        const listMatch = lines[lineIndex].match(/^(\s*)-\s+(.*)$/);
        if (!listMatch) {
          break;
        }

        const depth = Math.floor(listMatch[1].length / 2);
        const itemText = listMatch[2].trim();
        items.push({ text: itemText, depth });
        appendSectionContent(itemText);
        lineIndex += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraphLines = [trimmed];
    lineIndex += 1;

    while (lineIndex < lines.length) {
      const lookAheadLine = lines[lineIndex];
      const lookAheadTrimmed = lookAheadLine.trim();

      if (!lookAheadTrimmed) {
        lineIndex += 1;
        break;
      }

      if (
        /^(#{1,6})\s+/.test(lookAheadLine) ||
        /^```/.test(lookAheadTrimmed) ||
        /^(\s*)-\s+/.test(lookAheadLine) ||
        /^\*\*([^*]+):\*\*$/.test(lookAheadTrimmed)
      ) {
        break;
      }

      paragraphLines.push(lookAheadTrimmed);
      lineIndex += 1;
    }

    const paragraphText = paragraphLines.join(" ");
    blocks.push({ type: "paragraph", text: paragraphText });
    appendSectionContent(paragraphText);
  }

  return { blocks, sections };
};

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightQuery = (text: string, query: string): ReactNode => {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return text;
  }

  const splitRegex = new RegExp(`(${escapeRegExp(normalizedQuery)})`, "gi");
  const parts = text.split(splitRegex);

  return parts.map((part, index) => {
    if (!part) {
      return null;
    }

    const matches = part.toLowerCase() === normalizedQuery.toLowerCase();
    if (!matches) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    return (
      <mark key={`${part}-${index}`} className="rounded bg-[#39b9ff]/20 px-1 text-[#8edaff]">
        {part}
      </mark>
    );
  });
};

const renderInline = (text: string): ReactNode => {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|https?:\/\/\S+)/g).filter(Boolean);

  return tokens.map((token, index) => {
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={`${token}-${index}`}
          className="rounded bg-[#1a1f2e] px-1.5 py-0.5 font-mono text-[0.85em] text-[#8edaff]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={`${token}-${index}`} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (token.startsWith("http://") || token.startsWith("https://")) {
      let url = token;
      let trailing = "";

      while (/[),.!?;:]$/.test(url)) {
        trailing = `${url.at(-1) ?? ""}${trailing}`;
        url = url.slice(0, -1);
      }

      return (
        <span key={`${token}-${index}`}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-[#68c9ff] underline-offset-2 hover:text-[#8edaff] hover:underline"
          >
            {url}
          </a>
          {trailing}
        </span>
      );
    }

    return <span key={`${token}-${index}`}>{token}</span>;
  });
};

function CodeSnippet({
  snippetId,
  language,
  content,
  copiedSnippetId,
  onCopy,
}: {
  snippetId: string;
  language: string;
  content: string;
  copiedSnippetId: string | null;
  onCopy: (snippetId: string, code: string) => void;
}) {
  const normalizedLanguage = language || "text";
  const uppercaseLanguage = normalizedLanguage.toUpperCase();
  const formattedContent = normalizedLanguage === "json" ? formatJSONBlock(content) : content;
  const isCopied = copiedSnippetId === snippetId;

  const codeColor =
    normalizedLanguage === "json"
      ? "text-green-300"
      : normalizedLanguage === "http"
        ? "text-blue-300"
        : normalizedLanguage === "bash"
          ? "text-yellow-200"
          : "text-white/90";

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-[#111522]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#1a1f2e] px-4 py-2.5">
        <span className="font-mono text-xs uppercase tracking-wide text-white/60">{uppercaseLanguage}</span>
        <button
          type="button"
          onClick={() => onCopy(snippetId, formattedContent)}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
        >
          {isCopied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className={`font-mono text-sm leading-relaxed ${codeColor}`}>{formattedContent}</code>
      </pre>
    </div>
  );
}

export default function APIPage() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const documentModel = useMemo(() => parseAPIContent(API_DOCS), []);

  const sections = useMemo(
    () => documentModel.sections.filter((section) => section.level >= 2 && section.level <= 3),
    [documentModel.sections],
  );

  const filteredSections = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return sections;
    }

    return sections.filter((section) => {
      return section.title.toLowerCase().includes(query) || section.content.toLowerCase().includes(query);
    });
  }, [sections, searchTerm]);

  useEffect(() => {
    if (filteredSections.length === 0) {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveSection((visibleEntries[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: "-170px 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    filteredSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    if (!filteredSections.some((section) => section.id === activeSection)) {
      setActiveSection(filteredSections[0].id);
    }

    return () => observer.disconnect();
  }, [filteredSections, activeSection]);

  const handleCopy = async (snippetId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSnippetId(snippetId);
      setTimeout(() => {
        setCopiedSnippetId((current) => (current === snippetId ? null : current));
      }, 1800);
    } catch (error) {
      console.error("Failed to copy code block:", error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-[#0f1115]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0f1115]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg">
              <svg width="32" height="32" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#39b9ff" d="M797.56,348.33c30.91,6.66,83.06,31.07,87.21,66.41,3.15,26.85-13.06,79.89-19.48,108.33-18.08,80.05-35.49,169.43-58.24,247.51-37.84,129.87-259.97,143.84-369.81,131-79.98-9.34-191.79-42.13-218.72-127.8l-79.09-341.68c-6.97-50.68,49.68-73.96,89.21-85.61,54.67-16.12,110.4-16.62,167.08-15.62l-45.47,16.39c-44.91,18.53-101.62,26.35-145.23,45.5-15.84,6.96-26.94,19.89-14.58,36.36,18.56,24.72,115.14,56.1,146.77,62.89,82.16,17.65,152.89,2.18,231.43-22.46,54.98-17.25,130.36-44.86,168.52-89.18,25.27-29.35,31.42-69.3,44.38-104.84l-243.09,42.99-2,3.82c-1.45,15.08-2.76,30.11-6.03,44.92-31.75,143.69-186.99,93.71-283.19,53.84l1.47-2.15c82.39-23.86,163.75-50.91,245.03-78.2,5.91-3.48,5.08-25.81,7.22-33.55,3.45-12.47,12.22-19.65,23.97-24.08l282.88-49.24c14.15,3.11,20.4,11.87,18.9,26.37l-29.13,88.06v.02ZM841.24,457.54l-19.61,14.59c-113.51,75.99-355.25,76.96-485.87,53.37-58.02-10.48-91.56-24.33-143.96-48.22-1.22-.56-3.68-1.88-4.26-.11,9.51,23.92,8.86,56.35,22.36,78.1,28.12,45.3,113.96,67.69,163.71,76.52,72.61,12.88,148.98,14.98,222.29,7.73,63.62-6.3,204.67-30.25,226.3-101.29,7.88-25.88,11.16-54.64,19.03-80.69h0ZM806.3,607.51l-30.5,18.26c-131.73,66.26-405.38,65.51-535.38-4.91-6.49-3.51-12.31-8.25-18.62-11.96-1.12-.66-2.56-2.94-3.72-.65,11.55,32.54,8.2,71.49,34.17,96.87,59.84,58.47,212.94,70.07,292.78,66.97,63.99-2.48,191.09-21.71,233.65-73.56,19.02-23.17,17.88-63.15,27.62-91.02h0ZM774.26,744.37c-13.76,6.59-26.7,15.08-40.78,21.08-119.06,50.77-329.26,50.83-447.48-2.37-12.39-5.57-23.46-13.36-35.88-18.71,6.11,30.5,22.34,54.66,47.59,72.51,97.85,69.2,342.24,69.95,436.47-5.6,21.95-17.59,34.7-39.15,40.08-66.92h0Z" />
                <rect fill="#39b9ff" x="186.46" y="68.76" width="21.26" height="21.26" rx="2.24" ry="2.24" />
                <rect fill="#39b9ff" x="237.34" y="47.44" width="21.26" height="21.26" rx="2.24" ry="2.24" />
                <rect fill="#39b9ff" x="144.77" y="100.13" width="21.26" height="21.26" rx="2.24" ry="2.24" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Trackeep</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="text-sm font-medium text-white/60 transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/api" className="text-sm font-medium text-[#39b9ff]">
              API Docs
            </Link>
            <a
              href="https://demo.trackeep.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              Live Demo
              <ExternalLink size={12} className="opacity-60" />
            </a>
            <a
              href="https://github.com/Dvorinka/Trackeep"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              GitHub
              <ExternalLink size={12} className="opacity-60" />
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <header className="sticky top-16 z-40 border-b border-white/10 bg-[#0f1115]/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#39b9ff] to-[#2d8bc4] shadow-lg shadow-[#39b9ff]/20">
                  <Book size={22} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white sm:text-2xl">API Documentation</h1>
                  <p className="text-sm text-white/55">Complete REST API reference for Trackeep</p>
                </div>
              </div>
              <a
                href="/"
                className="hidden items-center gap-1.5 rounded-lg border border-[#39b9ff]/30 px-3 py-2 text-sm text-[#39b9ff] transition-colors hover:border-[#39b9ff]/60 hover:text-[#8edaff] sm:flex"
              >
                Back to Home
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 lg:hidden">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/50">Jump to section</label>
            <select
              value={activeSection}
              onChange={(event) => scrollToSection(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#1a1f2e] px-3 py-2.5 text-sm text-white focus:border-[#39b9ff]/60 focus:outline-none"
            >
              <option value="">Select section</option>
              {filteredSections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-40 space-y-6">
                <div className="rounded-xl border border-[#39b9ff]/20 bg-gradient-to-br from-[#39b9ff]/10 to-[#2d8bc4]/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white">API Status</h2>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <dl className="space-y-2 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-white/60">Base URL</dt>
                      <dd className="font-mono text-[#8edaff]">localhost:8080</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-white/60">Version</dt>
                      <dd className="text-white">v1</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-white/60">Endpoints</dt>
                      <dd className="text-white">{sections.length}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/50">Search docs</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="text"
                      placeholder="Find endpoint or topic"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#1a1f2e] py-2.5 pl-10 pr-3 text-sm text-white placeholder-white/30 focus:border-[#39b9ff]/60 focus:outline-none"
                    />
                  </div>
                  {searchTerm && (
                    <p className="mt-2 text-xs text-[#8edaff]">
                      {filteredSections.length} result{filteredSections.length === 1 ? "" : "s"}
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-white/10 bg-[#121723] p-2">
                  <div className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-white/45">Quick Navigation</div>
                  <div className="max-h-[56vh] space-y-1 overflow-y-auto pr-1">
                    {filteredSections.length === 0 && (
                      <p className="px-2 py-2 text-sm text-white/50">No matching sections.</p>
                    )}
                    {filteredSections.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full rounded-lg py-2 text-left text-sm transition ${
                          activeSection === section.id
                            ? "border-l-2 border-[#39b9ff] bg-[#39b9ff]/15 text-[#8edaff]"
                            : "text-white/65 hover:bg-white/5 hover:text-white"
                        }`}
                        style={{ paddingLeft: `${12 + Math.max(0, section.level - 2) * 14}px`, paddingRight: "10px" }}
                      >
                        {highlightQuery(section.title, searchTerm)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <section className="min-w-0">
              {copiedSnippetId && (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-400">
                  <Check size={16} />
                  Snippet copied to clipboard.
                </div>
              )}

              <article className="rounded-2xl border border-white/8 bg-[#10141f] p-5 sm:p-8">
                {documentModel.blocks.map((block, index) => {
                  if (block.type === "heading") {
                    const headingLevel = Math.min(block.level, 4);
                    const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
                    const headingClassName =
                      headingLevel === 1
                        ? "mb-6 mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                        : headingLevel === 2
                          ? "mb-5 mt-11 border-b border-white/10 pb-3 text-2xl font-bold text-white"
                          : headingLevel === 3
                            ? "mb-4 mt-8 text-xl font-semibold text-[#d5ecff]"
                            : "mb-3 mt-6 text-lg font-semibold text-white";

                    return (
                      <HeadingTag id={block.id} key={`${block.id}-${index}`} className={`scroll-mt-40 ${headingClassName}`}>
                        {block.text}
                      </HeadingTag>
                    );
                  }

                  if (block.type === "paragraph") {
                    return (
                      <p key={`paragraph-${index}`} className="mb-4 leading-7 text-white/78">
                        {renderInline(block.text)}
                      </p>
                    );
                  }

                  if (block.type === "label") {
                    return (
                      <p key={`label-${index}`} className="mb-2 mt-5 text-sm font-semibold tracking-wide text-[#8edaff]">
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={`list-${index}`} className="mb-5 space-y-2">
                        {block.items.map((item, itemIndex) => (
                          <li
                            key={`list-item-${index}-${itemIndex}`}
                            className="flex items-start gap-3 text-white/74"
                            style={{ marginLeft: `${item.depth * 16}px` }}
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39b9ff]/75" />
                            <span className="leading-6">{renderInline(item.text)}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <CodeSnippet
                      key={`code-${index}`}
                      snippetId={`snippet-${index}`}
                      language={block.language}
                      content={block.content}
                      copiedSnippetId={copiedSnippetId}
                      onCopy={handleCopy}
                    />
                  );
                })}
              </article>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-[#121723] p-4">
                  <h3 className="mb-2 text-base font-semibold text-white">Quick Test</h3>
                  <p className="mb-4 text-sm text-white/60">Open an endpoint directly to verify your local API responds.</p>
                  <a
                    href="http://localhost:8080/api/v1/bookmarks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#39b9ff] px-4 py-2 text-sm font-semibold text-[#0f1115] transition-colors hover:bg-[#6acfff]"
                  >
                    Open Endpoint
                    <ExternalLink size={14} />
                  </a>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#121723] p-4">
                  <h3 className="mb-2 text-base font-semibold text-white">Postman Collection</h3>
                  <p className="mb-4 text-sm text-white/60">Import the collection for fast endpoint testing and collaboration.</p>
                  <a
                    href="https://github.com/Dvorinka/Trackeep/blob/main/postman-collection.json"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Download
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <footer className="mt-10 border-t border-white/10 pt-6">
                <div className="flex flex-col gap-3 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
                  <p>
                    Need more details?{" "}
                    <a
                      href="https://github.com/Dvorinka/Trackeep/blob/main/API.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8edaff] transition-colors hover:text-[#bce8ff]"
                    >
                      Read full API.md
                    </a>
                  </p>
                  <a
                    href="https://github.com/Dvorinka/Trackeep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#8edaff] transition-colors hover:text-[#bce8ff]"
                  >
                    GitHub Repository
                    <ExternalLink size={13} />
                  </a>
                </div>
              </footer>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
