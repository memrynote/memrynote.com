# Features Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `src/pages/Features.tsx` with a docs-style two-column layout (sticky outline left, numbered+ruled feature list right) backed by typed data ported from `../memry/FEATURES.md`.

**Architecture:** Page composes a hero block, a two-column body (desktop) / pill-dropdown (mobile), and a bottom CTA. All feature content lives in `src/lib/features-data.ts`. A reusable `useScrollspy` hook drives both desktop outline highlighting and the mobile pill's "current section" indicator. No new dependencies.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Framer Motion, React Router v7, react-helmet-async. No test runner exists in this repo — verification is `npm run build` (typecheck) + `npm run dev` (visual check in browser).

**Spec:** [`docs/superpowers/specs/2026-04-07-features-page-design.md`](../specs/2026-04-07-features-page-design.md)

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `src/lib/features-data.ts` | **Create** | Typed feature data + `FEATURES_LAST_UPDATED` + `FEATURES_CADENCE` constants |
| `src/lib/seo.ts` | Modify | Update `PAGE_META.features.description` for new framing |
| `src/hooks/useScrollspy.ts` | **Create** (new dir) | Reusable IntersectionObserver scrollspy hook |
| `src/components/features-page/FeatureItem.tsx` | **Create** (new dir) | Single numbered+ruled feature row |
| `src/components/features-page/FeatureSection.tsx` | **Create** | Section header + list of FeatureItem |
| `src/components/features-page/FeaturesHero.tsx` | **Create** | Hero block (eyebrow, pre-release pill, title, subtitle, stats row) |
| `src/components/features-page/FeaturesOutline.tsx` | **Create** | Desktop sticky two-level outline (uses useScrollspy) |
| `src/components/features-page/FeaturesOutlineMobile.tsx` | **Create** | Mobile sticky pill + dropdown sheet |
| `src/components/features-page/FeaturesCTA.tsx` | **Create** | Bottom CTA block with WaitlistForm |
| `src/pages/Features.tsx` | **Replace** | Page shell composing all blocks |

The route in `src/App.tsx` does NOT change — the file path stays `src/pages/Features.tsx` and the export name `FeaturesPage` is preserved.

---

## Verification Commands

These are the only verification commands available in this repo:

| Command | What it checks |
|---|---|
| `npm run build` | TypeScript typecheck + Vite production build + prerender. Fails on any type error. |
| `npm run lint` | ESLint check |
| `npm run dev` | Vite dev server. Open `http://localhost:5173/features` to visually verify. |

---

## Task 1: Port FEATURES.md into typed data file

**Files:**
- Create: `src/lib/features-data.ts`

**Source:** `/Users/h4yfans/sideproject/memry/FEATURES.md` (94 features, 9 sections)

- [ ] **Step 1: Create the data file with full feature content**

Write `src/lib/features-data.ts`:

```ts
export interface FeatureItem {
  slug: string
  title: string
  description: string
}

export interface FeatureSection {
  slug: string
  title: string
  features: FeatureItem[]
}

export const FEATURES_LAST_UPDATED = 'April 2026'
export const FEATURES_CADENCE = 'growing every week'

export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    slug: 'tasks',
    title: 'Tasks',
    features: [
      { slug: 'task-creation', title: 'Task creation', description: 'Capture tasks fast with a quick-add input that parses smart syntax, or open the full form for everything at once. Quick-add lets you stay in flow; the full form is there when you need to set every field deliberately.' },
      { slug: 'subtasks', title: 'Subtasks', description: 'Break big tasks into nested subtasks with their own due dates and status. Parent tasks show a progress badge (X of Y complete) so you always know how close you are to finishing. You can also promote a subtask to a top-level task or convert a task into a subtask of another.' },
      { slug: 'priority-levels', title: 'Priority levels', description: 'Mark tasks as None, Low, Medium, High, or Urgent so the most important work rises to the top. Filter and group by priority to triage what actually matters today.' },
      { slug: 'due-date-and-time', title: 'Due date and time', description: 'Set a due date and an optional specific time. Tasks without a time stay date-only, so you do not have to fake a time just to schedule something.' },
      { slug: 'start-date', title: 'Start date', description: 'Schedule when a task should become available, not just when it is due. Future-start tasks stay out of your "Today" view until they are actually actionable.' },
      { slug: 'repeating-tasks', title: 'Repeating tasks', description: 'Create recurring tasks with daily, weekly, monthly, or yearly schedules — including patterns like "every other Tuesday" or "the second Monday of the month". Choose to repeat from the due date or from the moment you complete it, and end the series after a date or a number of completions.' },
      { slug: 'custom-statuses-per-project', title: 'Custom statuses per project', description: 'Define your own workflow columns for each project — not just todo, doing, done. Each status has a name, a color, and a type (todo, in progress, or done) so completion still works correctly with custom labels.' },
      { slug: 'kanban-board', title: 'Kanban board', description: 'Drag tasks across status columns to move them through your workflow. Great for visual thinkers and for projects where state matters more than dates.' },
      { slug: 'list-view', title: 'List view', description: 'A virtualized scrolling list that handles thousands of tasks without lag. Pair it with grouping and sorting to slice your work however you think about it.' },
      { slug: 'grouping', title: 'Grouping', description: 'Group tasks by due date, priority, project, created date, or status. Collapse and expand groups to focus on one bucket at a time without losing context.' },
      { slug: 'filtering', title: 'Filtering', description: 'Filter by search, projects, priorities, due-date presets (today, tomorrow, this week, custom range), completion state, repeat type, and whether tasks have a specific time. Stack filters together to build the exact view you need.' },
      { slug: 'saved-filters', title: 'Saved filters', description: 'Name and star any filter combination so you can jump back to it in one click. Stop rebuilding the same view every morning.' },
      { slug: 'sorting', title: 'Sorting', description: 'Sort by due date, priority, status, created date, title, project, or completed date — ascending or descending. Each view remembers its own sort preference.' },
      { slug: 'bulk-actions', title: 'Bulk actions', description: 'Multi-select tasks with Shift or Cmd, then complete, delete, archive, move, reschedule, or re-prioritize them all at once. Triage sessions go from twenty clicks to two.' },
      { slug: 'drag-and-drop', title: 'Drag and drop', description: 'Drag tasks to reorder them, move them between projects, drop them into different status columns, or nest them as subtasks. Everything you can change with a menu, you can also change with a drag.' },
      { slug: 'task-duplication', title: 'Task duplication', description: 'Duplicate any task — including all its subtasks, tags, and linked notes — in one action. Perfect for repeatable processes you do not want to set up as a recurring task.' },
      { slug: 'archiving', title: 'Archiving', description: 'Archive tasks you do not need anymore without deleting them. Archived tasks stay searchable and recoverable, but disappear from your active views.' },
      { slug: 'tags', title: 'Tags', description: 'Tag tasks with multiple labels (up to 20 per task) for cross-cutting categorization that ignores project boundaries. Useful for things like @waiting, #energy-high, or client-acme.' },
      { slug: 'linked-notes', title: 'Linked notes', description: 'Connect any task to one or more notes for context, references, or meeting prep. Tasks created from a note keep a link back to their source automatically.' },
      { slug: 'task-statistics', title: 'Task statistics', description: 'See live counts of total, completed, overdue, due-today, and due-this-week tasks. A quick pulse on whether you are ahead or drowning.' },
    ],
  },
  {
    slug: 'projects',
    title: 'Projects',
    features: [
      { slug: 'project-creation', title: 'Project creation', description: 'Create projects with a name, description, color, and icon or emoji. The color and icon flow through every view, so you can recognize projects at a glance.' },
      { slug: 'custom-workflow-per-project', title: 'Custom workflow per project', description: 'Each project gets its own set of statuses, so a content calendar can use Idea → Drafting → Editing → Published while a bug tracker uses Backlog → In Progress → Review → Shipped. No more forcing every project into the same workflow.' },
      { slug: 'project-reordering', title: 'Project reordering', description: 'Drag projects in the sidebar to put your most important work at the top. The order persists across sessions and devices.' },
      { slug: 'project-archiving', title: 'Project archiving', description: 'Archive finished projects to clear your sidebar without losing the history. Reopen any time you need to look something up.' },
      { slug: 'per-project-stats', title: 'Per-project stats', description: 'Each project shows its task count, completed count, and overdue count. A glance at the sidebar tells you which projects are healthy and which are slipping.' },
    ],
  },
  {
    slug: 'inbox',
    title: 'Inbox',
    features: [
      { slug: 'quick-capture', title: 'Quick capture', description: 'A single input box that accepts text, links, images, voice, PDFs, web clips, and social posts. Get the thought out of your head in under a second; decide where it belongs later.' },
      { slug: 'auto-detection', title: 'Auto-detection', description: 'Memry recognizes what you are pasting — a URL becomes a link with a preview, an image becomes an image item, copied text becomes a note. You do not have to pick a type before capturing.' },
      { slug: 'link-previews', title: 'Link previews', description: 'Pasted links automatically fetch the page title, description, and favicon. You can scan your inbox without having to open every URL.' },
      { slug: 'voice-memos', title: 'Voice memos', description: 'Record audio directly into the inbox and get a transcription you can search and file. Perfect for capturing ideas while walking or driving.' },
      { slug: 'pdf-capture-with-ocr', title: 'PDF capture with OCR', description: 'Drop a PDF into the inbox and memry runs OCR so the text becomes searchable. Even scanned documents become first-class citizens of your knowledge base.' },
      { slug: 'drag-and-drop-and-clipboard-paste', title: 'Drag-and-drop and clipboard paste', description: 'Drop files from anywhere on your computer or paste images straight from the clipboard. Capture works the way your hands already work.' },
      { slug: 'smart-filing-suggestions', title: 'Smart filing suggestions', description: 'Memry suggests where to file each item based on your past filing patterns. The more you triage, the better the suggestions get.' },
      { slug: 'convert-to-task', title: 'Convert to task', description: 'Turn any inbox item into a full task in one click — keeping the original content as the task description. Great for "I need to do something about this" captures.' },
      { slug: 'convert-to-note', title: 'Convert to note', description: 'Expand an inbox item into a full note when you realize it deserves more than a one-liner. The capture becomes a starting point instead of a destination.' },
      { slug: 'snooze', title: 'Snooze', description: 'Defer items with one click using presets (one hour, tomorrow, next week) or pick a custom date and time. Add an optional reason so future-you remembers why you snoozed it.' },
      { slug: 'triage-mode', title: 'Triage mode', description: 'Step through your inbox one item at a time with a focused review interface and a progress indicator. Each item gets the same five actions: discard, convert to task, expand to note, file, or defer.' },
      { slug: 'duplicate-detection', title: 'Duplicate detection', description: 'Memry spots when you have captured similar items twice and offers to merge them. Less noise, fewer redundant entries.' },
      { slug: 'inbox-stats', title: 'Inbox stats', description: 'See capture counts by type, processing rate, filing patterns, and trends over time. Useful for spotting whether your inbox is becoming a black hole.' },
    ],
  },
  {
    slug: 'notes',
    title: 'Notes',
    features: [
      { slug: 'blocknote-editor', title: 'BlockNote editor', description: 'A modern block-based rich text editor where every paragraph, heading, list, and embed is its own draggable block. Type / anywhere to open a menu of every block type you can insert.' },
      { slug: 'rich-formatting', title: 'Rich formatting', description: 'Bold, italic, underline, strikethrough, headings (H1–H3), bullet and numbered lists, blockquotes, and code blocks with syntax highlighting. Everything you would expect from a serious writing tool.' },
      { slug: 'callout-blocks', title: 'Callout blocks', description: 'Insert Info (blue), Warning (amber), Error (red), or Success (green) callouts to highlight key points. Stored in Obsidian-compatible markdown so your content stays portable.' },
      { slug: 'inline-task-blocks', title: 'Inline task blocks', description: 'Create real, fully-featured tasks directly inside a note — they appear as checkboxes in the editor and as tasks in your task views. Toggling completion in either place updates the other.' },
      { slug: 'youtube-embeds', title: 'YouTube embeds', description: 'Paste a YouTube link and memry inlines a thumbnail with click-to-play. Reference videos in your notes without context-switching to a browser.' },
      { slug: 'file-attachments', title: 'File attachments', description: 'Drop any file into a note to attach it inline. PDFs get a built-in viewer with multi-page navigation and a thumbnail sidebar so you can read documents without leaving memry.' },
      { slug: 'tables', title: 'Tables', description: 'Insert and edit tables with rows, columns, and rich content inside each cell. For when bullet points are not structured enough.' },
      { slug: 'wiki-links', title: 'Wiki-links', description: 'Type [[Note Name]] (or [[Note Name|Display Text]]) to link between notes, with autocomplete as you type. Hover any wiki-link to preview the linked note without leaving the page.' },
      { slug: 'backlinks', title: 'Backlinks', description: 'Every note shows which other notes link to it, with a snippet of context from each one. Discover unexpected connections in your knowledge base.' },
      { slug: 'graph-view', title: 'Graph view', description: 'Visualize the network of links around any note as an interactive graph. Helps you see clusters and orphan notes you forgot about.' },
      { slug: 'inline-hash-tags', title: 'Inline hash tags', description: 'Type #tag-name anywhere inside a note to tag it inline. Tags are color-coded and clickable to filter your library.' },
      { slug: 'link-mentions', title: 'Link mentions', description: 'External links are rendered with their favicon, domain, and page title — not just a raw URL. Your notes stay readable even when they are link-heavy.' },
      { slug: 'ai-writing-commands', title: 'AI writing commands', description: 'Highlight text and use slash commands for summarize, expand, fix grammar, simplify, improve writing, extract action items, translate, or continue writing. Powered by Claude, with streaming output so you see the result as it generates.' },
      { slug: 'custom-properties', title: 'Custom properties', description: 'Add typed metadata fields to any note: text, number, checkbox, date, select, multiselect, URL, or rating. Turn your notes into a lightweight database without leaving the editor.' },
      { slug: 'templates', title: 'Templates', description: 'Create reusable note templates with predefined content and properties. Assign a default template per folder so new notes start with the right structure automatically.' },
      { slug: 'folders', title: 'Folders', description: 'Organize notes in a hierarchical folder tree with create, rename, delete, and drag-to-move. Each folder can have its own icon to make navigation feel personal.' },
      { slug: 'tags-with-usage-counts', title: 'Tags with usage counts', description: 'Browse all tags in the sidebar with the number of notes using each one. Click a tag to instantly see every note that has it.' },
      { slug: 'bookmarks', title: 'Bookmarks', description: 'Pin notes, tasks, projects, or folder views to a bookmarks section in the sidebar. Your most-used items stay one click away.' },
      { slug: 'emoji-icons', title: 'Emoji icons', description: 'Assign an emoji to any note as its visual identifier. Makes scanning long lists of notes far faster than reading titles.' },
      { slug: 'smart-paste-menu', title: 'Smart paste menu', description: 'Paste a link and memry asks whether to embed it as a link mention, a YouTube embed, or a file attachment when applicable. The right paste behavior depends on context, so memry asks instead of guessing.' },
      { slug: 'note-outline', title: 'Note outline', description: 'A live table of contents built from your headings, with click-to-scroll. Long notes stay navigable.' },
      { slug: 'local-only-notes', title: 'Local-only notes', description: 'Mark a note as local-only so it never leaves your device. For private journals, sensitive drafts, or anything you do not want synced.' },
      { slug: 'markdown-export', title: 'Markdown export', description: 'Export any note as plain markdown with frontmatter preserved. Your content stays yours — you can move it anywhere.' },
      { slug: 'note-reminders', title: 'Note reminders', description: 'Set a remind-at time on any note to be notified when it is due. Snooze or dismiss reminders without losing the note.' },
      { slug: 'highlight-reminders', title: 'Highlight reminders', description: 'Highlight a specific passage inside a note and set a reminder on just that selection. Memry remembers the exact text so you jump straight to it when the reminder fires.' },
    ],
  },
  {
    slug: 'journal',
    title: 'Journal',
    features: [
      { slug: 'daily-entries', title: 'Daily entries', description: 'One journal entry per date, with the same rich text editing as your notes. The day-based structure means your journaling habit is built into the app.' },
      { slug: 'calendar-views', title: 'Calendar views', description: 'Switch between Day view (full editor), Month view (calendar grid with previews), and Year view (monthly summaries). Zoom out to spot patterns, zoom in to write.' },
      { slug: 'activity-heatmap', title: 'Activity heatmap', description: 'A GitHub-style heatmap visualizes your journaling streak across the year, with five activity levels based on how much you wrote. Seeing the streak is half the motivation.' },
      { slug: 'wiki-links-and-tags-in-journal', title: 'Wiki-links and tags in journal', description: 'Use [[note links]] and #tags in journal entries the same way you do in notes. Your daily reflections become connected to the rest of your knowledge base.' },
      { slug: 'day-context-sidebar', title: 'Day context sidebar', description: 'While writing a journal entry, see that day\'s calendar events, due tasks, and overdue count alongside the editor. Reflect on the day with the actual context of the day in front of you.' },
      { slug: 'journal-stats', title: 'Journal stats', description: 'Track word count, character count, monthly entry count, and average activity level. Useful for habit tracking without needing a separate tool.' },
      { slug: 'journal-reminders', title: 'Journal reminders', description: 'Set reminders that point at a specific journal entry, not just a generic note. Great for "revisit this thought next month" workflows.' },
      { slug: 'default-template', title: 'Default template', description: 'Set a template that every new journal entry starts from. Define your own daily prompts once and they appear automatically.' },
      { slug: 'configurable-panels', title: 'Configurable panels', description: 'Toggle the schedule, tasks, AI connections, and stats footer panels on or off. Make the journal as minimal or as packed with context as you want.' },
    ],
  },
  {
    slug: 'reminders',
    title: 'Reminders',
    features: [
      { slug: 'reminders-on-notes-journal-and-highlights', title: 'Reminders on notes, journal, and highlights', description: 'Set a reminder on any note, journal entry, or even a highlighted passage of text inside a note. When it fires, you jump back to exactly the right place.' },
      { slug: 'snooze-and-dismiss', title: 'Snooze and dismiss', description: 'Defer reminders to a later time, or dismiss them when you are done. Bulk-dismiss multiple reminders at once during cleanup.' },
      { slug: 'upcoming-view', title: 'Upcoming view', description: 'See all reminders coming up in the next several days in one place. Prep for the week ahead at a glance.' },
      { slug: 'notifications-when-due', title: 'Notifications when due', description: 'Memry shows a system notification when a reminder triggers. You do not have to keep the app in front to stay on top of things.' },
      { slug: 'highlight-position-tracking', title: 'Highlight position tracking', description: 'Highlight reminders remember the exact text position they were set on. If the surrounding note changes, memry can still find your highlight.' },
    ],
  },
  {
    slug: 'search',
    title: 'Search',
    features: [
      { slug: 'global-search', title: 'Global search', description: 'Search across notes, journal entries, tasks, and inbox items at the same time. One query, every type of content.' },
      { slug: 'full-text-search', title: 'Full-text search', description: 'Built on FTS5 with Porter stemming, so searching for "running" also finds "run" and "runs". Fast, even on huge libraries.' },
      { slug: 'fuzzy-matching', title: 'Fuzzy matching', description: 'Find what you meant, not just what you typed. Typos no longer block you from finding your own notes.' },
      { slug: 'grouped-results', title: 'Grouped results', description: 'Results are grouped by content type (notes, journal, tasks, inbox) so you can scan the right section first. Less wading through irrelevant matches.' },
      { slug: 'filters-in-search', title: 'Filters in search', description: 'Narrow results by type, tags, or date range right from the search interface. Refine without restarting your query.' },
    ],
  },
  {
    slug: 'navigation-and-ui',
    title: 'Navigation and UI',
    features: [
      { slug: 'command-palette', title: 'Command palette', description: 'A keyboard-driven launcher for jumping anywhere or running any command in the app. The fastest way to navigate when your hands are already on the keyboard.' },
      { slug: 'multi-tab-interface', title: 'Multi-tab interface', description: 'Open multiple notes, tasks, and journal entries in tabs at the top of the window. Pin tabs you want to keep open; modified tabs show a dot indicator.' },
      { slug: 'sidebar', title: 'Sidebar', description: 'A persistent sidebar with sections for Inbox, Journal, Tasks, Projects, Notes tree, Tags, and Bookmarks. Each section is collapsible so you only see what you care about.' },
      { slug: 'keyboard-shortcuts', title: 'Keyboard shortcuts', description: 'Comprehensive shortcuts for navigation, editing, filtering, and triage — with a built-in shortcut reference modal. You can drive memry without ever touching the trackpad.' },
      { slug: 'vault-switcher', title: 'Vault switcher', description: 'Switch between separate vaults for different contexts (work, personal, side project). Each vault is fully isolated.' },
      { slug: 'light-and-dark-mode', title: 'Light and dark mode', description: 'Auto-match your system theme or pick light or dark manually. Easy on the eyes whatever time you work.' },
      { slug: 'accent-colors', title: 'Accent colors', description: 'Customize the app\'s accent color to match your taste. Small touches that make memry feel like yours.' },
      { slug: 'find-in-page', title: 'Find in page', description: 'Search within the current note, task list, or view. Fast in-page navigation without spinning up a global search.' },
      { slug: 'drag-and-drop-everywhere', title: 'Drag-and-drop everywhere', description: 'Reorder projects, tasks, notes, and folders by dragging. Drop files from your computer into the sidebar to import them as notes.' },
    ],
  },
  {
    slug: 'ai',
    title: 'AI',
    features: [
      { slug: 'inline-writing-commands', title: 'Inline writing commands', description: 'Highlight text and use slash commands for summarize, expand, fix grammar, simplify, improve, extract action items, translate, or continue writing. The AI edits inline with streaming output, so you watch the changes happen in real time.' },
      { slug: 'smart-filing', title: 'Smart filing', description: 'The inbox suggests where to file new items based on what you have filed before. The model learns from every correction so suggestions get sharper over time.' },
      { slug: 'ai-connections', title: 'AI connections', description: 'The journal can suggest related past entries based on what you are writing today. Helps you reconnect with ideas you would otherwise forget.' },
    ],
  },
]

export const TOTAL_FEATURE_COUNT = FEATURE_SECTIONS.reduce(
  (total, section) => total + section.features.length,
  0,
)

export const SECTION_COUNT = FEATURE_SECTIONS.length
```

- [ ] **Step 2: Verify it typechecks**

```bash
npm run build
```

Expected: clean build, no TS errors.

- [ ] **Step 3: Sanity-check counts in a Node REPL**

```bash
node --input-type=module -e "import('./src/lib/features-data.ts').then(m => console.log('total:', m.TOTAL_FEATURE_COUNT, 'sections:', m.SECTION_COUNT))" 2>/dev/null || node --input-type=module --experimental-strip-types -e "import('./src/lib/features-data.ts').then(m => console.log('total:', m.TOTAL_FEATURE_COUNT, 'sections:', m.SECTION_COUNT))"
```

Expected: `total: 94 sections: 9`

If the Node command fails due to ts loader issues, skip — the build in Step 2 already typechecked the file. The visual check in later tasks will verify the counts render correctly.

- [ ] **Step 4: Commit**

```bash
git add src/lib/features-data.ts
git commit -m "feat: add typed features data ported from FEATURES.md"
```

---

## Task 2: Update SEO meta for /features

**Files:**
- Modify: `src/lib/seo.ts:24-29`

The current description references "four pillars" which is no longer the framing.

- [ ] **Step 1: Update the features entry in PAGE_META**

In `src/lib/seo.ts`, replace the existing `features` block:

```ts
  features: {
    title: 'Features — Memry',
    description:
      'Inbox, notes, tasks & journal — four pillars of thought in one app. Wiki-links, Kanban, daily journal, AI clustering, all local-first.',
    path: '/features',
  },
```

with:

```ts
  features: {
    title: 'Every feature, so far — Memry',
    description:
      'A complete index of what Memry can do today. 94 features across tasks, projects, inbox, notes, journal, reminders, search, and AI — and growing every week.',
    path: '/features',
  },
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo.ts
git commit -m "feat: update /features SEO meta for new framing"
```

---

## Task 3: Create useScrollspy hook

**Files:**
- Create: `src/hooks/useScrollspy.ts` (also creates the `src/hooks/` directory)

This hook drives both the desktop outline and the mobile pill. It watches a list of element IDs and returns the currently-active one based on scroll position.

- [ ] **Step 1: Create the hook file**

Write `src/hooks/useScrollspy.ts`:

```ts
import { useEffect, useRef, useState } from 'react'

interface UseScrollspyOptions {
  rootMargin?: string
}

interface UseScrollspyResult {
  activeId: string | null
  suppressFor: (ms: number) => void
}

const DEFAULT_ROOT_MARGIN = '-96px 0px -55% 0px'

export function useScrollspy(
  ids: string[],
  options: UseScrollspyOptions = {},
): UseScrollspyResult {
  const [activeId, setActiveId] = useState<string | null>(null)
  const suppressedUntilRef = useRef<number>(0)
  const lastSeenRef = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || ids.length === 0) {
      return
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < suppressedUntilRef.current) {
          return
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aIndex = ids.indexOf(a.target.id)
            const bIndex = ids.indexOf(b.target.id)
            return aIndex - bIndex
          })

        if (visible.length > 0) {
          const nextId = visible[0].target.id
          lastSeenRef.current = nextId
          setActiveId(nextId)
          return
        }

        if (lastSeenRef.current) {
          setActiveId(lastSeenRef.current)
        }
      },
      {
        rootMargin: options.rootMargin ?? DEFAULT_ROOT_MARGIN,
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids, options.rootMargin])

  const suppressFor = (ms: number) => {
    suppressedUntilRef.current = Date.now() + ms
  }

  return { activeId, suppressFor }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useScrollspy.ts
git commit -m "feat: add useScrollspy hook for outline navigation"
```

---

## Task 4: Create FeatureItem component

**Files:**
- Create: `src/components/features-page/FeatureItem.tsx`

Single numbered+ruled feature row. Pure presentational.

- [ ] **Step 1: Create the component**

Write `src/components/features-page/FeatureItem.tsx`:

```tsx
import type { FeatureItem as FeatureItemData } from '@/lib/features-data'

interface FeatureItemProps {
  sectionSlug: string
  feature: FeatureItemData
  index: number
}

export function FeatureItem({ sectionSlug, feature, index }: FeatureItemProps) {
  const anchorId = `${sectionSlug}-${feature.slug}`
  const numberLabel = String(index + 1).padStart(2, '0')

  return (
    <article
      id={anchorId}
      className="border-t border-border py-7 first:border-t-0"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] text-terracotta tabular-nums shrink-0 pt-1.5">
          {numberLabel}
        </span>
        <h3 className="font-serif text-[20px] leading-tight text-ink">
          {feature.title}
        </h3>
      </div>
      <p className="mt-2 pl-[calc(1rem+10px)] text-[15px] leading-relaxed text-muted max-w-[60ch]">
        {feature.description}
      </p>
    </article>
  )
}
```

Note: the body text indent (`pl-[calc(1rem+10px)]`) aligns with the title — the number column is `gap-4` (1rem) + the mono text width (~10px). This is approximate; visual check in Task 10 confirms alignment.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/features-page/FeatureItem.tsx
git commit -m "feat: add FeatureItem component"
```

---

## Task 5: Create FeatureSection component

**Files:**
- Create: `src/components/features-page/FeatureSection.tsx`

Section header with title, terracotta underline, count, and a list of FeatureItem children. Section header animates in via Framer Motion when it scrolls into view; individual items do not animate.

- [ ] **Step 1: Create the component**

Write `src/components/features-page/FeatureSection.tsx`:

```tsx
import { motion } from 'framer-motion'
import type { FeatureSection as FeatureSectionData } from '@/lib/features-data'
import { FeatureItem } from './FeatureItem'

interface FeatureSectionProps {
  section: FeatureSectionData
  isFirst: boolean
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export function FeatureSection({ section, isFirst }: FeatureSectionProps) {
  const featureCount = section.features.length

  return (
    <section
      id={section.slug}
      className={isFirst ? 'pt-4' : 'pt-24'}
    >
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="border-t border-border pt-12 pb-2"
      >
        <h2 className="font-serif text-[40px] leading-none text-ink">
          {section.title}
        </h2>
        <div className="mt-4 h-[2px] w-10 bg-terracotta" />
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
          {featureCount} {featureCount === 1 ? 'feature' : 'features'}
        </p>
      </motion.header>

      <div className="mt-4">
        {section.features.map((feature, index) => (
          <FeatureItem
            key={feature.slug}
            sectionSlug={section.slug}
            feature={feature}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/features-page/FeatureSection.tsx
git commit -m "feat: add FeatureSection component"
```

---

## Task 6: Create FeaturesHero component

**Files:**
- Create: `src/components/features-page/FeaturesHero.tsx`

Hero block: eyebrow date, pre-release pill, title, subtitle, stats row.

- [ ] **Step 1: Create the component**

Write `src/components/features-page/FeaturesHero.tsx`:

```tsx
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import {
  FEATURES_CADENCE,
  FEATURES_LAST_UPDATED,
  SECTION_COUNT,
  TOTAL_FEATURE_COUNT,
} from '@/lib/features-data'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export function FeaturesHero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Everything in Memry · Updated {FEATURES_LAST_UPDATED}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/8 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta">
              Pre-release
            </span>
          </div>

          <h1 className="mt-6 font-serif text-[44px] leading-[1.05] text-ink md:text-[64px]">
            Every feature, so far.
          </h1>

          <p className="mt-6 font-serif text-lg leading-relaxed text-muted md:text-xl">
            {TOTAL_FEATURE_COUNT} features across {SECTION_COUNT} sections — and
            growing. Memry is in active development; this page reflects what's
            shipped today, not the full vision.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
            <span>{TOTAL_FEATURE_COUNT} features</span>
            <span aria-hidden="true">·</span>
            <span>{SECTION_COUNT} sections</span>
            <span aria-hidden="true">·</span>
            <span>{FEATURES_CADENCE}</span>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/features-page/FeaturesHero.tsx
git commit -m "feat: add FeaturesHero component"
```

---

## Task 7: Create FeaturesOutline component (desktop)

**Files:**
- Create: `src/components/features-page/FeaturesOutline.tsx`

Sticky two-level outline. Active section auto-expands and shows nested features. Click any item smooth-scrolls + suppresses scrollspy briefly.

- [ ] **Step 1: Create the component**

Write `src/components/features-page/FeaturesOutline.tsx`:

```tsx
import { useMemo } from 'react'
import { useScrollspy } from '@/hooks/useScrollspy'
import { FEATURE_SECTIONS } from '@/lib/features-data'
import { cn } from '@/lib/utils'

const SCROLLSPY_SUPPRESS_MS = 600

export function FeaturesOutline() {
  const observedIds = useMemo(() => {
    const ids: string[] = []
    for (const section of FEATURE_SECTIONS) {
      ids.push(section.slug)
      for (const feature of section.features) {
        ids.push(`${section.slug}-${feature.slug}`)
      }
    }
    return ids
  }, [])

  const { activeId, suppressFor } = useScrollspy(observedIds)

  const activeSectionSlug = useMemo(() => {
    if (!activeId) return FEATURE_SECTIONS[0]?.slug ?? null
    if (FEATURE_SECTIONS.some((s) => s.slug === activeId)) return activeId
    const dashIndex = activeId.indexOf('-')
    if (dashIndex === -1) return activeId
    const candidate = activeId.slice(0, dashIndex)
    if (FEATURE_SECTIONS.some((s) => s.slug === candidate)) return candidate
    const longest = FEATURE_SECTIONS.map((s) => s.slug)
      .filter((slug) => activeId.startsWith(`${slug}-`))
      .sort((a, b) => b.length - a.length)[0]
    return longest ?? null
  }, [activeId])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    suppressFor(SCROLLSPY_SUPPRESS_MS)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <nav
      aria-label="Features outline"
      className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4"
    >
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
        On this page
      </p>

      <ul className="mt-4 space-y-1">
        {FEATURE_SECTIONS.map((section) => {
          const isActiveSection = section.slug === activeSectionSlug
          const featureCount = section.features.length

          return (
            <li key={section.slug}>
              <a
                href={`#${section.slug}`}
                onClick={(e) => handleClick(e, section.slug)}
                aria-current={isActiveSection ? 'location' : undefined}
                className={cn(
                  'flex items-center justify-between gap-3 rounded px-2 py-1.5 font-serif text-[15px] transition-colors',
                  isActiveSection
                    ? 'text-ink font-medium'
                    : 'text-muted hover:text-ink',
                )}
              >
                <span className="flex items-center gap-2">
                  {isActiveSection && (
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                  )}
                  {section.title}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-muted">
                  {featureCount}
                </span>
              </a>

              {isActiveSection && (
                <ul className="mt-1 ml-3 border-l border-border pl-3 space-y-0.5">
                  {section.features.map((feature) => {
                    const featureId = `${section.slug}-${feature.slug}`
                    const isActiveFeature = activeId === featureId
                    return (
                      <li key={feature.slug}>
                        <a
                          href={`#${featureId}`}
                          onClick={(e) => handleClick(e, featureId)}
                          aria-current={isActiveFeature ? 'location' : undefined}
                          className={cn(
                            'flex items-center gap-2 rounded px-2 py-1 text-[13px] transition-colors',
                            isActiveFeature
                              ? 'text-terracotta'
                              : 'text-ink/70 hover:text-ink',
                          )}
                        >
                          {isActiveFeature && (
                            <span className="h-1 w-1 rounded-full bg-terracotta" />
                          )}
                          {feature.title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/features-page/FeaturesOutline.tsx
git commit -m "feat: add FeaturesOutline desktop sticky nav"
```

---

## Task 8: Create FeaturesOutlineMobile component

**Files:**
- Create: `src/components/features-page/FeaturesOutlineMobile.tsx`

Sticky pill below the fixed header with a dropdown sheet. Reuses the same scrollspy as the desktop outline. The pill shows the current section and "X of N" position counter.

- [ ] **Step 1: Create the component**

Write `src/components/features-page/FeaturesOutlineMobile.tsx`:

```tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollspy } from '@/hooks/useScrollspy'
import { FEATURE_SECTIONS } from '@/lib/features-data'
import { cn } from '@/lib/utils'

const SCROLLSPY_SUPPRESS_MS = 600

export function FeaturesOutlineMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const pillRef = useRef<HTMLButtonElement>(null)

  const observedIds = useMemo(() => {
    const ids: string[] = []
    for (const section of FEATURE_SECTIONS) {
      ids.push(section.slug)
      for (const feature of section.features) {
        ids.push(`${section.slug}-${feature.slug}`)
      }
    }
    return ids
  }, [])

  const { activeId, suppressFor } = useScrollspy(observedIds)

  const activeSectionIndex = useMemo(() => {
    if (!activeId) return 0
    const direct = FEATURE_SECTIONS.findIndex((s) => s.slug === activeId)
    if (direct !== -1) return direct
    const longest = FEATURE_SECTIONS.map((s, i) => ({ slug: s.slug, index: i }))
      .filter((entry) => activeId.startsWith(`${entry.slug}-`))
      .sort((a, b) => b.slug.length - a.slug.length)[0]
    return longest?.index ?? 0
  }, [activeId])

  const activeSection = FEATURE_SECTIONS[activeSectionIndex]
  const activeSectionSlug = activeSection?.slug ?? null

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        pillRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavigate = (id: string) => {
    setIsOpen(false)
    const target = document.getElementById(id)
    if (!target) return
    suppressFor(SCROLLSPY_SUPPRESS_MS)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <>
      <div className="md:hidden sticky top-[72px] z-30 px-5 py-3 bg-paper/80 backdrop-blur-sm">
        <button
          ref={pillRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3 rounded-full border border-border bg-card px-4 py-2.5 shadow-card"
        >
          <span className="flex items-center gap-2 font-serif text-[15px] text-ink">
            <ChevronDown className="h-4 w-4 text-muted" strokeWidth={2} />
            {activeSection?.title ?? 'Sections'}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {activeSectionIndex + 1} of {FEATURE_SECTIONS.length}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Features outline"
            className="md:hidden fixed left-4 right-4 top-[124px] z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-elevated"
          >
            <div className="p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                On this page
              </p>
              <ul className="mt-3 space-y-1">
                {FEATURE_SECTIONS.map((section) => {
                  const isActiveSection = section.slug === activeSectionSlug
                  return (
                    <li key={section.slug}>
                      <button
                        type="button"
                        onClick={() => handleNavigate(section.slug)}
                        className={cn(
                          'flex w-full items-center justify-between gap-3 rounded px-2 py-2 font-serif text-[16px] transition-colors',
                          isActiveSection ? 'text-ink font-medium' : 'text-muted',
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {isActiveSection && (
                            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                          )}
                          {section.title}
                        </span>
                        <span className="font-mono text-[11px] tabular-nums text-muted">
                          {section.features.length}
                        </span>
                      </button>

                      {isActiveSection && (
                        <ul className="mt-1 ml-3 border-l border-border pl-3 space-y-0.5">
                          {section.features.map((feature) => {
                            const featureId = `${section.slug}-${feature.slug}`
                            const isActiveFeature = activeId === featureId
                            return (
                              <li key={feature.slug}>
                                <button
                                  type="button"
                                  onClick={() => handleNavigate(featureId)}
                                  className={cn(
                                    'flex w-full items-center gap-2 rounded px-2 py-1.5 text-[14px] text-left transition-colors',
                                    isActiveFeature
                                      ? 'text-terracotta'
                                      : 'text-ink/70',
                                  )}
                                >
                                  {feature.title}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/features-page/FeaturesOutlineMobile.tsx
git commit -m "feat: add FeaturesOutlineMobile pill+dropdown"
```

---

## Task 9: Create FeaturesCTA component

**Files:**
- Create: `src/components/features-page/FeaturesCTA.tsx`

Bottom CTA block with the existing centered WaitlistForm.

- [ ] **Step 1: Create the component**

Write `src/components/features-page/FeaturesCTA.tsx`:

```tsx
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { WaitlistForm } from '@/components/shared/WaitlistForm'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export function FeaturesCTA() {
  return (
    <section className="bg-paper-alt py-24 mt-24">
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="text-center"
        >
          <h2 className="font-serif text-[36px] leading-tight text-ink">
            And there's more.
          </h2>
          <p className="mt-4 font-serif text-lg italic text-muted">
            Memry ships new features every week.
            <br />
            Get on the waitlist to follow along.
          </p>
          <div className="mt-8">
            <WaitlistForm variant="centered" />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/features-page/FeaturesCTA.tsx
git commit -m "feat: add FeaturesCTA component"
```

---

## Task 10: Replace Features.tsx page shell

**Files:**
- Modify (replace contents): `src/pages/Features.tsx`

Replaces the entire 369-line existing page with a thin shell that composes the blocks. The route in `App.tsx` does NOT change.

- [ ] **Step 1: Replace the file contents**

Overwrite `src/pages/Features.tsx`:

```tsx
import { Container } from '@/components/layout/Container'
import { PageHead } from '@/components/shared/PageHead'
import { FeatureSection } from '@/components/features-page/FeatureSection'
import { FeaturesCTA } from '@/components/features-page/FeaturesCTA'
import { FeaturesHero } from '@/components/features-page/FeaturesHero'
import { FeaturesOutline } from '@/components/features-page/FeaturesOutline'
import { FeaturesOutlineMobile } from '@/components/features-page/FeaturesOutlineMobile'
import { FEATURE_SECTIONS } from '@/lib/features-data'

export function FeaturesPage() {
  return (
    <main>
      <PageHead page="features" />

      <FeaturesHero />

      <FeaturesOutlineMobile />

      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <FeaturesOutline />
          </aside>

          <div className="min-w-0">
            <div className="max-w-[680px]">
              {FEATURE_SECTIONS.map((section, index) => (
                <FeatureSection
                  key={section.slug}
                  section={section}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <FeaturesCTA />
    </main>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: clean build, prerender succeeds.

- [ ] **Step 3: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:5173/features` and check:

1. **Hero block**
   - "EVERYTHING IN MEMRY · UPDATED APRIL 2026" eyebrow appears
   - Pre-release pill is visible below the eyebrow
   - "Every feature, so far." title in serif
   - Subtitle says "94 features across 9 sections — and growing."
   - Stats row shows "94 features · 9 sections · growing every week"

2. **Desktop outline (>= 768px)**
   - Sticky sidebar visible on the left
   - "On this page" label at top
   - All 9 section names listed with feature counts (20, 5, 13, 25, 9, 5, 5, 9, 3)
   - "Tasks" section is auto-expanded showing all 20 sub-features
   - As you scroll down, the active section changes; sub-list expands/collapses accordingly
   - Click any sub-feature → smooth scroll to that anchor; outline stays correct

3. **Content area**
   - Each section has a top rule, large serif title, terracotta underline, "X features" mono label
   - Each feature has a numbered prefix (01, 02, …), serif title, body text indented under it
   - Hairline rules between features
   - First feature in a section has no top rule (the section header has its own)
   - Body text wraps at ~60ch

4. **Mobile (< 768px) — resize browser to ~390px wide**
   - Desktop outline is hidden
   - Sticky pill appears below the header with chevron + section name + "X of 9"
   - Tap pill → dropdown opens with backdrop scrim
   - Dropdown shows the same outline; tap a section → smooth-scrolls + closes
   - Press Escape → dropdown closes
   - Pill updates as you scroll between sections

5. **CTA section**
   - "And there's more." appears below the AI section on a `bg-paper-alt` strip
   - Waitlist form renders centered

6. **Existing header/footer**
   - Existing header still appears at top
   - Existing footer still appears at the very bottom

If anything is off, fix in this same task before committing.

- [ ] **Step 4: Verify lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Features.tsx
git commit -m "feat: replace Features page with docs-style outline + content"
```

---

## Task 11: Final cleanup verification

- [ ] **Step 1: Confirm no orphaned imports remain**

```bash
npm run build
```

Expected: clean build, no TS warnings about unused imports.

- [ ] **Step 2: Check that route still works from the main nav**

```bash
npm run dev
```

Open `http://localhost:5173/`, click any link in the header that points to `/features`, and confirm the new page renders.

Also test deep link: open `http://localhost:5173/features#tasks-subtasks` directly — should scroll to the Subtasks feature on load (the existing `ScrollToHash` in `App.tsx` handles this).

- [ ] **Step 3: Check accessibility basics with browser devtools**

In the dev server, open devtools → Lighthouse → Accessibility audit on `/features`. Expected score: 95+. Investigate any flagged contrast or aria issues. If anything fails:

- Active outline link should have `aria-current="location"` (already in code)
- Mobile dropdown should have `role="dialog"` and `aria-label` (already in code)
- All headings should have a single h1 (the hero) — h2 for sections, h3 for features

- [ ] **Step 4: Verify reduced-motion fallback**

In macOS System Settings → Accessibility → Display → enable "Reduce motion". Reload the page. The Framer Motion entrance animations should be disabled or instant. (Framer Motion respects `prefers-reduced-motion` by default for `whileInView` animations.)

If smooth-scroll on outline clicks feels jarring with reduced motion, update `FeaturesOutline.tsx` and `FeaturesOutlineMobile.tsx` to detect the preference and pass `behavior: 'auto'` instead of `'smooth'`. Quick fix:

```ts
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

target.scrollIntoView({
  behavior: prefersReducedMotion ? 'auto' : 'smooth',
  block: 'start',
})
```

Apply to both files if needed.

- [ ] **Step 5: Final commit (only if Task 11 changes were made)**

```bash
git add -A
git commit -m "chore: respect prefers-reduced-motion in features outline scroll"
```

If no changes were needed in this task, skip the commit.

---

## Self-Review Checklist

Run through this after completing all tasks:

- [ ] Spec section "Hero Block" → covered in Task 6 (FeaturesHero)
- [ ] Spec section "Two-Column Body Layout" → covered in Task 10 (Features.tsx grid)
- [ ] Spec section "Outline (Left Sidebar) — Desktop" → covered in Task 7 (FeaturesOutline)
- [ ] Spec section "Outline — Mobile" → covered in Task 8 (FeaturesOutlineMobile)
- [ ] Spec section "Right Content Area" → covered in Tasks 4 + 5 (FeatureItem + FeatureSection)
- [ ] Spec section "Bottom CTA Section" → covered in Task 9 (FeaturesCTA)
- [ ] Spec section "Data Shape" → covered in Task 1 (features-data.ts)
- [ ] Spec section "Component Breakdown" → matches Tasks 1, 3-10 file paths
- [ ] Spec section "Scrollspy Hook Contract" → covered in Task 3
- [ ] Spec section "Routing & SEO" → covered in Task 2 (seo.ts) + Task 10 (PageHead reused)
- [ ] Spec section "Accessibility" → covered in Task 7/8 markup + Task 11 verification
- [ ] Spec section "What This Replaces" → covered in Task 10 (Features.tsx overwrite)
- [ ] All file paths in tasks match the "Component Breakdown" table in the spec
- [ ] All counts (94 features, 9 sections, 20/5/13/25/9/5/5/9/3) match the corrected spec
- [ ] No tasks reference unused or undefined types/functions
