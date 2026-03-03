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
  content?: string;
}

interface CodeBlock {
  type: 'json' | 'http' | 'bash' | 'javascript';
  content: string;
  title?: string;
}

const extractSections = (content: string): Section[] => {
  const lines = content.split('\n');
  const sections: Section[] = [];
  let currentContent = '';
  
  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      // Save previous section content
      if (sections.length > 0) {
        sections[sections.length - 1].content = currentContent.trim();
      }
      currentContent = '';
      
      const level = match[1].length;
      const title = match[2];
      const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      sections.push({ id, title, level });
    } else if (sections.length > 0) {
      currentContent += line + '\n';
    }
  });
  
  // Save content for last section
  if (sections.length > 0) {
    sections[sections.length - 1].content = currentContent.trim();
  }
  
  return sections;
};

const extractCodeBlocks = (content: string): CodeBlock[] => {
  const blocks: CodeBlock[] = [];
  const regex = /```(json|http|bash|javascript)\n([\s\S]*?)```/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    blocks.push({
      type: match[1] as CodeBlock['type'],
      content: match[2].trim()
    });
  }
  
  return blocks;
};

const formatJSON = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return jsonString;
  }
};

const renderMarkdown = (content: string, onCopyCode: (code: string) => void) => {
  let processedContent = content
    .replace(/```json\n([\s\S]*?)```/g, (match, code) => {
      const formattedCode = formatJSON(code);
      const codeId = Math.random().toString(36).substr(2, 9);
      return `<div class="code-block-wrapper mb-6" data-code-id="${codeId}">
        <div class="flex items-center justify-between bg-[#1a1f2e] border border-white/10 rounded-t-lg px-4 py-2">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="text-white/60 text-sm ml-2">JSON</span>
          </div>
          <button onclick="copyCode('${codeId}', \`${formattedCode.replace(/`/g, '\`')}\`)" class="flex items-center gap-1 text-white/60 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span class="text-sm">Copy</span>
          </button>
        </div>
        <pre class="bg-[#1a1f2e] border border-white/10 border-t-0 rounded-b-lg p-4 overflow-x-auto"><code class="text-green-400 text-sm font-mono">${formattedCode}</code></pre>
      </div>`;
    })
    .replace(/```http\n([\s\S]*?)```/g, (match, code) => {
      const codeId = Math.random().toString(36).substr(2, 9);
      return `<div class="code-block-wrapper mb-6" data-code-id="${codeId}">
        <div class="flex items-center justify-between bg-[#1a1f2e] border border-white/10 rounded-t-lg px-4 py-2">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="text-white/60 text-sm ml-2">HTTP</span>
          </div>
          <button onclick="copyCode('${codeId}', \`${code.replace(/`/g, '\`')}\`)" class="flex items-center gap-1 text-white/60 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span class="text-sm">Copy</span>
          </button>
        </div>
        <pre class="bg-[#1a1f2e] border border-white/10 border-t-0 rounded-b-lg p-4 overflow-x-auto"><code class="text-blue-400 text-sm font-mono">${code}</code></pre>
      </div>`;
    })
    .replace(/```bash\n([\s\S]*?)```/g, (match, code) => {
      const codeId = Math.random().toString(36).substr(2, 9);
      return `<div class="code-block-wrapper mb-6" data-code-id="${codeId}">
        <div class="flex items-center justify-between bg-[#1a1f2e] border border-white/10 rounded-t-lg px-4 py-2">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="text-white/60 text-sm ml-2">Bash</span>
          </div>
          <button onclick="copyCode('${codeId}', \`${code.replace(/`/g, '\`')}\`)" class="flex items-center gap-1 text-white/60 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span class="text-sm">Copy</span>
          </button>
        </div>
        <pre class="bg-[#1a1f2e] border border-white/10 border-t-0 rounded-b-lg p-4 overflow-x-auto"><code class="text-yellow-400 text-sm font-mono">${code}</code></pre>
      </div>`;
    })
    .replace(/^### (.*$)/gim, '<h3 id="$1" class="text-xl font-bold text-white mb-4 mt-8 cursor-pointer hover:text-[#39b9ff] transition-colors">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 id="$1" class="text-2xl font-bold text-white mb-6 mt-10 border-b border-white/10 pb-3 cursor-pointer hover:text-[#39b9ff] transition-colors">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 id="$1" class="text-4xl font-bold text-white mb-8 mt-12 cursor-pointer hover:text-[#39b9ff] transition-colors">$1</h1>')
    .replace(/\*\*(.*)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.*)\*/g, '<em class="text-white/80 italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="px-2 py-1 bg-[#1a1f2e] text-[#39b9ff] rounded text-sm font-mono">$1</code>')
    .replace(/^- (.*$)/gim, '<li class="text-white/80 mb-2 ml-4 list-disc">$1</li>')
    .replace(/^\*\*Response:\*\*/gim, '<p class="text-sm font-semibold text-[#39b9ff] mb-2 mt-4">Response:</p>')
    .replace(/^\*\*Query Parameters:\*\*/gim, '<p class="text-sm font-semibold text-[#39b9ff] mb-2 mt-4">Query Parameters:</p>')
    .replace(/^\*\*Environment Variables:\*\*/gim, '<p class="text-sm font-semibold text-[#39b9ff] mb-2 mt-4">Environment Variables:</p>')
    .replace(/^- \`([^`]+)\` (.*$)/gim, '<div class="flex items-start gap-3 mb-2"><code class="px-2 py-1 bg-[#1a1f2e] text-[#39b9ff] rounded text-sm font-mono shrink-0">$1</code><span class="text-white/80 text-sm">$2</span></div>')
    .replace(/^- \*\*([^*]+)\*\*: (.*)$/gim, '<div class="flex items-start gap-3 mb-2"><span class="text-white font-semibold text-sm shrink-0 w-24">$1:</span><span class="text-white/80 text-sm">$2</span></div>')
    .replace(/^- \*\*([^*]+)\*\*$/gim, '<li class="text-white font-semibold mb-2 ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-white/80 mb-4">')
    .replace(/^(?!<[h|c|p|l|d|<])/gim, '<p class="text-white/80 mb-4">')
    .replace(/(<p class="text-white\/80 mb-4">)(?!<[h|c|p|l|d])/gim, '$1')
    .replace(/(<\/p>)(?!<[h|c|p|l|d|\s|$])/gim, '$1<p class="text-white/80 mb-4">');
  
  return processedContent;
};

export default function APIPage() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [searchType, setSearchType] = useState<'all' | 'endpoints' | 'content'>('all');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const sections = useMemo(() => extractSections(API_DOCS), []);
  const codeBlocks = useMemo(() => extractCodeBlocks(API_DOCS), []);
  const renderedContent = useMemo(() => renderMarkdown(API_DOCS, copyToClipboard), [API_DOCS, copyToClipboard]);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      for (const element of sectionElements) {
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(element.id);
          break;
        }
      }
    };

    // Only add scroll listener, don't auto-scroll on load
    window.addEventListener('scroll', handleScroll);
    // Set initial active section to first section (Overview)
    if (sections.length > 0) {
      setActiveSection(sections[0].id);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  useEffect(() => {
    // Add global copy function for code blocks
    (window as any).copyCode = (codeId: string, code: string) => {
      copyToClipboard(code);
    };
    
    return () => {
      delete (window as any).copyCode;
    };
  }, [copyToClipboard]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const filteredSections = useMemo(() => {
    return sections.filter(section => {
      const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (section.content && section.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (searchType === 'endpoints') {
        return matchesSearch && (section.title.includes('GET') || section.title.includes('POST') || section.title.includes('PUT') || section.title.includes('DELETE'));
      }
      
      if (searchType === 'content') {
        return matchesSearch && !section.title.includes('GET') && !section.title.includes('POST') && !section.title.includes('PUT') && !section.title.includes('DELETE');
      }
      
      return matchesSearch;
    });
  }, [sections, searchTerm, searchType]);

  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-500/30 text-yellow-300 px-1 rounded">$1</mark>');
  };

  return (
    <div className="min-h-screen bg-[#0f1115]">
      {/* Navigation - Same as main app */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          "bg-[#0f1115]/80 backdrop-blur-xl border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo - Using Trackeep SVG */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#39b9ff" d="M797.56,348.33c30.91,6.66,83.06,31.07,87.21,66.41,3.15,26.85-13.06,79.89-19.48,108.33-18.08,80.05-35.49,169.43-58.24,247.51-37.84,129.87-259.97,143.84-369.81,131-79.98-9.34-191.79-42.13-218.72-127.8l-79.09-341.68c-6.97-50.68,49.68-73.96,89.21-85.61,54.67-16.12,110.4-16.62,167.08-15.62l-45.47,16.39c-44.91,18.53-101.62,26.35-145.23,45.5-15.84,6.96-26.94,19.89-14.58,36.36,18.56,24.72,115.14,56.1,146.77,62.89,82.16,17.65,152.89,2.18,231.43-22.46,54.98-17.25,130.36-44.86,168.52-89.18,25.27-29.35,31.42-69.3,44.38-104.84l-243.09,42.99-2,3.82c-1.45,15.08-2.76,30.11-6.03,44.92-31.75,143.69-186.99,93.71-283.19,53.84l1.47-2.15c82.39-23.86,163.75-50.91,245.03-78.2,5.91-3.48,5.08-25.81,7.22-33.55,3.45-12.47,12.22-19.65,23.97-24.08l282.88-49.24c14.15,3.11,20.4,11.87,18.9,26.37l-29.13,88.06v.02ZM841.24,457.54l-19.61,14.59c-113.51,75.99-355.25,76.96-485.87,53.37-58.02-10.48-91.56-24.33-143.96-48.22-1.22-.56-3.68-1.88-4.26-.11,9.51,23.92,8.86,56.35,22.36,78.1,28.12,45.3,113.96,67.69,163.71,76.52,72.61,12.88,148.98,14.98,222.29,7.73,63.62-6.3,204.67-30.25,226.3-101.29,7.88-25.88,11.16-54.64,19.03-80.69h0ZM806.3,607.51l-30.5,18.26c-131.73,66.26-405.38,65.51-535.38-4.91-6.49-3.51-12.31-8.25-18.62-11.96-1.12-.66-2.56-2.94-3.72-.65,11.55,32.54,8.2,71.49,34.17,96.87,59.84,58.47,212.94,70.07,292.78,66.97,63.99-2.48,191.09-21.71,233.65-73.56,19.02-23.17,17.88-63.15,27.62-91.02h0ZM774.26,744.37c-13.76,6.59-26.7,15.08-40.78,21.08-119.06,50.77-329.26,50.83-447.48-2.37-12.39-5.57-23.46-13.36-35.88-18.71,6.11,30.5,22.34,54.66,47.59,72.51,97.85,69.2,342.24,69.95,436.47-5.6,21.95-17.59,34.7-39.15,40.08-66.92h0Z"/>
                  <rect fill="#39b9ff" x="186.46" y="68.76" width="21.26" height="21.26" rx="2.24" ry="2.24"/>
                  <rect fill="#39b9ff" x="237.34" y="47.44" width="21.26" height="21.26" rx="2.24" ry="2.24"/>
                  <rect fill="#39b9ff" x="144.77" y="100.13" width="21.26" height="21.26" rx="2.24" ry="2.24"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Trackeep
              </span>
            </Link>
            
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">
                Home
              </Link>
              <Link href="/api" className="text-sm font-medium text-[#39b9ff]">
                API Docs
              </Link>
              <a 
                href="https://demo.trackeep.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1"
              >
                Live Demo
                <ExternalLink size={12} className="opacity-60" />
              </a>
              <a 
                href="https://github.com/Dvorinka/Trackeep" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1"
              >
                GitHub
                <ExternalLink size={12} className="opacity-60" />
              </a>
            </div>
            
            {/* GitHub CTA */}
            <div className="hidden lg:flex items-center">
              <a
                href="https://github.com/Dvorinka/Trackeep"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full bg-[#39b9ff] text-[#0a0e18] hover:bg-[#5cc8ff] transition-all duration-200 hover:shadow-[0_0_20px_rgba(57,185,255,0.3)]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with proper spacing for fixed nav */}
      <div className="pt-16">
      {/* Header Section */}
      <div className="sticky top-16 z-40 bg-[#0f1115]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#39b9ff] to-[#2d8bc4] flex items-center justify-center shadow-lg shadow-[#39b9ff]/20">
                <Book size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">API Documentation</h1>
                <p className="text-sm text-white/60">Complete REST API reference for Trackeep</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">API Live</span>
              </div>
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#39b9ff] hover:text-[#5cc8ff] transition-colors border border-[#39b9ff]/30 rounded-lg hover:border-[#39b9ff]/50"
              >
                Back to Home
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-40">
              {/* API Status Card */}
              <div className="mb-6 p-4 bg-gradient-to-br from-[#39b9ff]/10 to-[#2d8bc4]/10 border border-[#39b9ff]/20 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white">API Status</h3>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Base URL</span>
                    <code className="text-[#39b9ff] font-mono">localhost:8080</code>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Version</span>
                    <span className="text-white">v1</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Auth</span>
                    <span className="text-white">JWT Bearer</span>
                  </div>
                </div>
              </div>
              {/* Enhanced Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#1a1f2e] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#39b9ff]/50 focus:bg-[#1a1f2e]/80 transition-all"
                  />
                  <button
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                  >
                    <Filter size={16} />
                  </button>
                </div>
                
                {showAdvancedSearch && (
                  <div className="mt-3 p-3 bg-[#1a1f2e] border border-white/10 rounded-lg">
                    <div className="text-sm text-white/60 mb-2">Filter by type:</div>
                    <div className="space-y-2">
                      {['all', 'endpoints', 'content'].map((type) => (
                        <label key={type} className="flex items-center gap-2 text-sm text-white/80 cursor-pointer hover:bg-white/5 p-1 rounded">
                          <input
                            type="radio"
                            name="searchType"
                            value={type}
                            checked={searchType === type}
                            onChange={(e) => setSearchType(e.target.value as any)}
                            className="text-[#39b9ff] focus:ring-[#39b9ff]/50"
                          />
                          <span className="capitalize">{type === 'all' ? 'All Content' : type === 'endpoints' ? 'API Endpoints' : 'Documentation'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                {searchTerm && (
                  <div className="mt-3 p-2 bg-[#39b9ff]/10 border border-[#39b9ff]/20 rounded-lg">
                    <div className="text-sm text-[#39b9ff] font-medium">
                      {filteredSections.length} result{filteredSections.length !== 1 ? 's' : ''} found
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Navigation */}
              <div className="space-y-1">
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Quick Navigation</h3>
                </div>
                {filteredSections.map((section) => {
                  const isExpanded = expandedSections.has(section.id);
                  const hasSubSections = sections.some(s => 
                    s.level > section.level && 
                    s.title.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  const isActive = activeSection === section.id;
                  
                  return (
                    <div key={section.id}>
                      <div className="flex items-center gap-1">
                        {hasSubSections && (
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="p-1 text-white/30 hover:text-white/60 transition-colors"
                          >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                        )}
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`flex-1 text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive
                              ? 'bg-[#39b9ff]/20 text-[#39b9ff] font-medium border-l-2 border-[#39b9ff]'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                          style={{ paddingLeft: `${(section.level - 1) * 12 + (hasSubSections ? 6 : 12)}px` }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: highlightText(section.title) }} />
                        </button>
                      </div>
                      
                      {isExpanded && hasSubSections && (
                        <div className="ml-4 mt-1 space-y-1">
                          {sections
                            .filter(s => s.level > section.level && s.title.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(subSection => {
                              const isSubActive = activeSection === subSection.id;
                              return (
                                <button
                                  key={subSection.id}
                                  onClick={() => scrollToSection(subSection.id)}
                                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                                    isSubActive
                                      ? 'bg-[#39b9ff]/10 text-[#39b9ff] font-medium border-l border-[#39b9ff]'
                                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                                  }`}
                                  style={{ paddingLeft: `${(subSection.level - 1) * 12 + 12}px` }}
                                >
                                  <span dangerouslySetInnerHTML={{ __html: highlightText(subSection.title) }} />
                                </button>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {copiedCode && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2">
                <Check size={16} />
                Code copied to clipboard!
              </div>
            )}
            
            <div className="prose prose-invert max-w-none">
              <div 
                className="markdown-content text-white/80"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />
              
              {/* Interactive API Examples Section */}
              <div className="mt-12 p-6 bg-[#1a1f2e] border border-white/10 rounded-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Code size={24} className="text-[#39b9ff]" />
                  Try the API
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-[#0f1115] border border-white/5 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Test</h3>
                    <p className="text-white/60 text-sm mb-4">Test the API endpoints directly from your browser.</p>
                    <a
                      href="http://localhost:8080/api/v1/bookmarks"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#39b9ff] text-[#0f1115] rounded-lg text-sm font-semibold hover:bg-[#5cc8ff] transition-colors"
                    >
                      Test API
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <div className="p-4 bg-[#0f1115] border border-white/5 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Postman Collection</h3>
                    <p className="text-white/60 text-sm mb-4">Import our Postman collection for easy testing.</p>
                    <a
                      href="https://github.com/Dvorinka/Trackeep/blob/main/postman-collection.json"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors"
                    >
                      Download Collection
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/40">
                  Need help? <a href="https://github.com/Dvorinka/Trackeep" className="text-[#39b9ff] hover:text-[#5cc8ff] transition-colors">Visit our GitHub</a>
                </div>
                <a
                  href="https://github.com/Dvorinka/Trackeep/blob/main/API.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#39b9ff] hover:text-[#5cc8ff] transition-colors"
                >
                  View on GitHub
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
