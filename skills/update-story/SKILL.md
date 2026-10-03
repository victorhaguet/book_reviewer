---
name: update-story
description: Add one chapter to book/story.md, the short running summary of the story. Reads the named chapter, drafts its summary, and writes it once the author approves. Use when the author has a new chapter and wants story.md updated.
---

# Update the story summary

You add one chapter at a time to `book/story.md`, the short summary of what happened and what is happening in the story. You summarize facts that are in the chapter. You never invent, interpret or judge.

## Rules

- The author names the chapter file in the invocation. If not, ask once which chapter file to add. If none is given, stop. Never guess.
- Read only the named chapter and `book/story.md`. Never read `book.md`, the sheets, other chapters or `open-questions.md`.
- You edit only `book/story.md` and `book/changelog.md`. Never edit a chapter.
- Nothing is written before the author approves the new draft.
- `story.md` and `changelog.md` are stored in English. Talk to the author in the language of the book: infer it from the author's messages and the chapter. If the author edits the draft in another language, translate faithfully before writing.
- `story.md` describes the story only up to the chapter just added. Never write what happens later, planned events or the ending.
- Events only: who does what, where, and what changes. No style comments, no interpretation, no foreshadowing. Summarize heavily: keep only the important parts of the chapter.
- Do not comment on the author's edits. Record them as given, fixing only grammar and formatting.

## Structure of story.md

```
# Story

## The story so far
<older chapters, condensed: one sentence per chapter, or merged into arcs>

## Recent chapters
### <chapter file>
<2-4 sentences>

## Current state
<where the story stands now, who knows what, open threads>
```

- Keep at most 3 chapters in "Recent chapters", in chapter order.
- Target about 600 words for the whole file. If the new version goes over, tell the author and condense further.
- If `story.md` is empty, create the structure above with the first chapter.

## Process

1. Check that `book/chapters/` and `book/story.md` exist. If not, tell the author to run `init-book` first and stop.
2. Find the chapter file named by the author in `book/chapters/`. If it does not exist, tell the author and stop.
3. Read `book/story.md` and the chapter.
4. If the chapter already has an entry in `story.md` (in "Recent chapters" or in "The story so far"), tell the author only that, and stop. The author will say what to do next.
5. If an earlier chapter (by file name order in `book/chapters/`) has no entry in `story.md`, tell the author which one is missing and ask whether to continue. If they decline, stop. If they continue, add the entry in chapter order and describe "Current state" as of the latest chapter summarized.
6. Draft:
   - The entry for the chapter.
   - If "Recent chapters" would exceed 3 chapters, the condensed version of the oldest one, merged into "The story so far".
   - The updated "Current state".
7. Show the author the draft of all the changes, in the author's language. Wait. The author approves, or edits.
8. Write the approved version in `book/story.md`.
9. Append to `book/changelog.md`: `YYYY-MM-DD - Updated story.md: added <chapter file>`. If `changelog.md` does not exist, do not create it and mention this in the final message.
10. Send the final message.

## Final message

Keep it short, in the author's language:

1. The chapter added, and the chapter condensed if any.
2. The word count of `story.md`, with a warning if it is over the target.
3. Whether the changelog line was added.
