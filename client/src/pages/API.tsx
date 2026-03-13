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

Trackeep provides a comprehensive RESTful API for managing bookmarks, tasks, files, and notes. Built with modern web technologies and enhanced with AI capabilities, it offers powerful search, organization, and automation features.

**Base URL:** \`http://localhost:8080/api/v1\`

**Authentication:** Bearer Token (JWT)

**API Version:** v1.0.0

**Content-Type:** application/json (except file uploads)

## Quick Start

### 1. Get Your API Token
\`\`\`bash
curl -X POST http://localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'
\`\`\`

### 2. Make Your First API Call
\`\`\`bash
curl -X GET http://localhost:8080/api/v1/bookmarks \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
\`\`\`

## AI Services Integration

Trackeep integrates with multiple AI providers to enhance functionality:

### Mistral AI
- **Purpose:** General AI tasks, text processing, and content generation
- **Model:** mistral-small-latest (configurable)
- **Features:** Text summarization, content analysis, tag suggestions
- **Environment Variables:**
  - \`MISTRAL_API_KEY\`: Your Mistral API key
  - \`MISTRAL_MODEL\`: The model to use (default: mistral-small-latest)

### LongCat AI
- **Purpose:** Advanced AI features and specialized tasks
- **API Documentation:** https://longcat.chat/platform/docs/
- **Features:** Enhanced semantic search, content understanding
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

# Optional: Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/trackeep
REDIS_URL=redis://localhost:6379

# Optional: File Storage
UPLOAD_MAX_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=pdf,doc,docx,txt,md,jpg,png,gif

# Optional: Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60  # seconds
\`\`\`

## Authentication

### Register User
\`\`\`http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "preferences": {
    "theme": "dark",
    "language": "en"
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "preferences": {
      "theme": "dark",
      "language": "en"
    },
    "created_at": "2024-01-01T00:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
    "name": "John Doe",
    "preferences": {
      "theme": "dark",
      "language": "en"
    }
  },
  "expires_at": "2024-01-08T00:00:00Z"
}
\`\`\`

### Refresh Token
\`\`\`http
POST /auth/refresh
Authorization: Bearer <token>
\`\`\`

**Response:**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_at": "2024-01-08T00:00:00Z"
}
\`\`\`

### Logout
\`\`\`http
POST /auth/logout
Authorization: Bearer <token>
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Logged out successfully"
}
\`\`\`

## Bookmarks

### Get All Bookmarks
\`\`\`http
GET /bookmarks?page=1&limit=20&search=example&tag=important&sort=created_at&order=desc
Authorization: Bearer <token>
\`\`\`

**Query Parameters:**
- \`page\` (int): Page number (default: 1)
- \`limit\` (int): Items per page (default: 20, max: 100)
- \`search\` (string): Search in title, description, and URL
- \`tag\` (string): Filter by tag
- \`sort\` (string): Sort field (created_at, updated_at, title)
- \`order\` (string): Sort order (asc, desc)

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
      "favicon": "https://example.com/favicon.ico",
      "preview_image": "https://example.com/preview.jpg",
      "is_favorite": true,
      "visit_count": 15,
      "last_visited": "2024-01-01T12:00:00Z",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 20,
    "total_pages": 1,
    "has_next": false,
    "has_prev": false
  }
}
\`\`\`

### Get Bookmark by ID
\`\`\`http
GET /bookmarks/:id
Authorization: Bearer <token>
\`\`\`

**Response:**
\`\`\`json
{
  "id": 1,
  "title": "Example Bookmark",
  "url": "https://example.com",
  "description": "An example bookmark",
  "tags": ["important", "reference"],
  "favicon": "https://example.com/favicon.ico",
  "preview_image": "https://example.com/preview.jpg",
  "is_favorite": true,
  "visit_count": 15,
  "last_visited": "2024-01-01T12:00:00Z",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
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
  "tags": ["new", "example"],
  "is_favorite": false
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": 2,
  "title": "New Bookmark",
  "url": "https://example.com",
  "description": "A new bookmark",
  "tags": ["new", "example"],
  "favicon": "https://example.com/favicon.ico",
  "preview_image": null,
  "is_favorite": false,
  "visit_count": 0,
  "last_visited": null,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
\`\`\`

### Update Bookmark
\`\`\`http
PUT /bookmarks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Bookmark",
  "description": "Updated description",
  "tags": ["updated", "example"],
  "is_favorite": true
}
\`\`\`

### Delete Bookmark
\`\`\`http
DELETE /bookmarks/:id
Authorization: Bearer <token>
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Bookmark deleted successfully"
}
\`\`\`

### Import Bookmarks
\`\`\`http
POST /bookmarks/import
Authorization: Bearer <token>
Content-Type: application/json

{
  "source": "browser",
  "bookmarks": [
    {
      "title": "Imported Bookmark",
      "url": "https://example.com",
      "description": "Imported from browser",
      "tags": ["imported"]
    }
  ]
}
\`\`\`

## Notes

### Get All Notes
\`\`\`http
GET /notes?page=1&limit=20&search=example&tag=important&sort=updated_at&order=desc
Authorization: Bearer <token>
\`\`\`

**Response:**
\`\`\`json
{
  "notes": [
    {
      "id": 1,
      "title": "Meeting Notes",
      "content": "# Meeting Notes\\n\\nImportant discussion points...",
      "tags": ["meeting", "important"],
      "is_pinned": true,
      "word_count": 245,
      "read_time": 2,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 20,
    "total_pages": 1,
    "has_next": false,
    "has_prev": false
  }
}
\`\`\`

### Create Note
\`\`\`http
POST /notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Note",
  "content": "# New Note\\n\\nThis is the content...",
  "tags": ["new", "example"],
  "is_pinned": false
}
\`\`\`

### Update Note
\`\`\`http
PUT /notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Note",
  "content": "# Updated Note\\n\\nUpdated content...",
  "tags": ["updated"],
  "is_pinned": true
}
\`\`\`

## Tasks

### Get All Tasks
\`\`\`http
GET /tasks?page=1&limit=20&status=pending&priority=high&due_date=2024-01-15&sort=due_date&order=asc
Authorization: Bearer <token>
\`\`\`

**Query Parameters:**
- \`status\` (string): Filter by status (pending, in_progress, completed, cancelled)
- \`priority\` (string): Filter by priority (low, medium, high, urgent)
- \`due_date\` (string): Filter by due date (YYYY-MM-DD format)
- \`assigned_to\` (int): Filter by assigned user ID

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
      "assigned_to": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "progress": 65,
      "estimated_hours": 40,
      "actual_hours": 26,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 20,
    "total_pages": 1,
    "has_next": false,
    "has_prev": false
  }
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
  "due_date": "2024-01-15T00:00:00Z",
  "assigned_to": 1,
  "estimated_hours": 8
}
\`\`\`

### Update Task Progress
\`\`\`http
PATCH /tasks/:id/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "progress": 75,
  "actual_hours": 30
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
tags: ["document", "important"]
\`\`\`

**Response:**
\`\`\`json
{
  "id": 1,
  "filename": "document_20240101_123456.pdf",
  "original_name": "My Document.pdf",
  "file_size": 1024000,
  "file_type": "application/pdf",
  "mime_type": "application/pdf",
  "description": "File description",
  "tags": ["document", "important"],
  "download_url": "/files/download/1",
  "preview_url": "/files/preview/1",
  "created_at": "2024-01-01T00:00:00Z"
}
\`\`\`

### Get All Files
\`\`\`http
GET /files?page=1&limit=20&type=image&tag=document
Authorization: Bearer <token>
\`\`\`

### Download File
\`\`\`http
GET /files/download/:id
Authorization: Bearer <token>
\`\`\`

### Get File Preview
\`\`\`http
GET /files/preview/:id
Authorization: Bearer <token>
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
    "date_range": "last_30_days",
    "priority": ["high", "medium"]
  },
  "options": {
    "fuzzy": true,
    "boost_recent": true,
    "limit": 20
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "results": [
    {
      "type": "note",
      "id": 1,
      "title": "Project Management Notes",
      "content": "Important points about project management...",
      "score": 0.95,
      "highlights": ["<mark>project management</mark>", "best practices"],
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "query_time": 0.045
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
  "limit": 10,
  "threshold": 0.7
}
\`\`\`

### Search Suggestions
\`\`\`http
GET /search/suggestions?q=proj&limit=5
Authorization: Bearer <token>
\`\`\`

**Response:**
\`\`\`json
{
  "suggestions": [
    "project management",
    "project timeline",
    "project documentation",
    "project goals",
    "project resources"
  ]
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
  "max_length": 150,
  "style": "bullet_points"
}
\`\`\`

**Response:**
\`\`\`json
{
  "summary": "• Key point 1\\n• Key point 2\\n• Key point 3",
  "provider": "mistral",
  "word_count": 45,
  "original_word_count": 500,
  "compression_ratio": 0.09
}
\`\`\`

### Generate Tag Suggestions
\`\`\`http
POST /ai/tags/suggest
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Article about machine learning algorithms",
  "existing_tags": ["ai", "technology"],
  "limit": 10
}
\`\`\`

**Response:**
\`\`\`json
{
  "suggestions": [
    {
      "tag": "machine-learning",
      "confidence": 0.95
    },
    {
      "tag": "algorithms",
      "confidence": 0.88
    },
    {
      "tag": "data-science",
      "confidence": 0.82
    }
  ]
}
\`\`\`

### Extract Content from URL
\`\`\`http
POST /ai/extract
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://example.com/article",
  "extract_images": true,
  "max_length": 1000
}
\`\`\`

**Response:**
\`\`\`json
{
  "title": "Article Title",
  "content": "Extracted article content...",
  "images": [
    {
      "url": "https://example.com/image1.jpg",
      "alt": "Image description"
    }
  ],
  "author": "Author Name",
  "publish_date": "2024-01-01T00:00:00Z"
}
\`\`\`

## Webhooks

### Create Webhook
\`\`\`http
POST /webhooks
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["bookmark.created", "task.completed"],
  "secret": "webhook_secret_key",
  "active": true
}
\`\`\`

### List Webhooks
\`\`\`http
GET /webhooks
Authorization: Bearer <token>
\`\`\`

### Test Webhook
\`\`\`http
POST /webhooks/:id/test
Authorization: Bearer <token>
\`\`\`

## Analytics & Stats

### Get User Statistics
\`\`\`http
GET /stats/user
Authorization: Bearer <token>
\`\`\`

**Response:**
\`\`\`json
{
  "bookmarks": {
    "total": 156,
    "this_month": 23,
    "favorites": 42
  },
  "notes": {
    "total": 89,
    "this_month": 12,
    "pinned": 8
  },
  "tasks": {
    "total": 67,
    "completed": 45,
    "pending": 15,
    "overdue": 7
  },
  "files": {
    "total": 34,
    "total_size": 52428800,
    "this_month": 8
  },
  "storage": {
    "used": 52428800,
    "limit": 1073741824,
    "percentage": 4.88
  }
}
\`\`\`

### Get Activity Timeline
\`\`\`http
GET /stats/activity?limit=20&type=all
Authorization: Bearer <token>
\`\`\`

## Error Responses

All endpoints may return standard HTTP error responses:

\`\`\`json
{
  "error": {
    "message": "Error description",
    "code": "VALIDATION_ERROR",
    "status_code": 400,
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "request_id": "req_123456789"
}
\`\`\`

Common error codes:
- \`400\`: Bad Request - Invalid input data
- \`401\`: Unauthorized - Invalid or missing token
- \`403\`: Forbidden - Insufficient permissions
- \`404\`: Not Found - Resource doesn't exist
- \`409\`: Conflict - Resource already exists
- \`422\`: Unprocessable Entity - Validation failed
- \`429\`: Too Many Requests - Rate limit exceeded
- \`500\`: Internal Server Error - Server error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Authentication endpoints**: 10 requests per minute
- **Standard endpoints**: 100 requests per minute  
- **AI endpoints**: 20 requests per minute
- **File uploads**: 10 requests per minute
- **Search endpoints**: 50 requests per minute

Rate limit headers are included in all responses:
- \`X-RateLimit-Limit\`: Total requests allowed
- \`X-RateLimit-Remaining\`: Remaining requests
- \`X-RateLimit-Reset\`: Time when limit resets (Unix timestamp)
- \`X-RateLimit-Retry-After\`: Seconds to wait before retrying

## SDK & Libraries

### JavaScript/TypeScript
\`\`\`bash
npm install @trackeep/api-client
\`\`\`

\`\`\`typescript
import { TrackeepAPI } from '@trackeep/api-client';

const client = new TrackeepAPI({
  baseURL: 'http://localhost:8080/api/v1',
  token: 'your-jwt-token'
});

const bookmarks = await client.bookmarks.getAll();
const bookmark = await client.bookmarks.create({
  title: 'New Bookmark',
  url: 'https://example.com'
});
\`\`\`

### Python
\`\`\`bash
pip install trackeep-python
\`\`\`

\`\`\`python
from trackeep import TrackeepAPI

client = TrackeepAPI(
    base_url='http://localhost:8080/api/v1',
    token='your-jwt-token'
)

bookmarks = client.bookmarks.list()
bookmark = client.bookmarks.create({
    'title': 'New Bookmark',
    'url': 'https://example.com'
})
\`\`\`

## Changelog

### v1.0.0 (2024-01-01)
- Initial API release
- Basic CRUD operations for bookmarks, notes, tasks, files
- Authentication and authorization
- Basic search functionality
- AI integration with Mistral and LongCat

### Upcoming Features
- Real-time WebSocket connections
- Advanced collaboration features
- Enhanced AI capabilities
- Mobile API optimizations
- GraphQL endpoint`;

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
