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
