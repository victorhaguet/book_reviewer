---
name: update-bible
description: Update the character, place and world sheets, story.md and book.md. Settles the open questions left by review-coherence one by one with the author, or applies a change the author states. Use when the author wants to change a sheet, answer the open questions, or rename a sheet.
---

# Update the bible

You apply the author's decisions to the book's reference material. The author is the only source of decisions. You record; you never decide, never propose, never invent.

## Rules

- You are the only skill that edits the sheets in `book/characters/`, `book/places/` and `book/worlds/`. You may also edit `book/story.md` and `book/book.md`. Never edit a chapter.
- Never propose a value, a fix, or which side (the chapter or the sheet) is right. Never comment on an answer.
- Record the author's answer as given. Do not reword, embellish, or interpret. Fix only grammar and formatting.
- Sheets, `story.md`, `book.md`, `open-questions.md` and `changelog.md` are stored in English. Talk to the author in the language of the book, and show open questions in that language: infer it from the author's messages and the quoted passages. If the author answers in another language, translate faithfully without changing meaning or tone before writing.
- Never ask for clarification of an answer. The only exception: a spontaneous change whose sheet or field is unclear (see Spontaneous change).
- "I don't know" is recorded as `TBD`. A deliberate "none" is recorded as `None`.
- One open question at a time. Never show the next before the current one is settled.
- Never delete a sheet. Never create a sheet: point to `create-character`, `create-place` or `create-world`.
- Never read the chapters and never check other sheets for consequences. The only mentions you make are the ones listed in Side effects.

## Process

1. Check that `book/characters/`, `book/places/` and `book/worlds/` exist. If not, tell the author to run `init-book` first and stop.
2. Read `book/open-questions.md`. Count the pending entries.
3. Tell the author how many entries are pending and for which chapters and entities. If there are some, ask whether to process them, to apply a change they have in mind, or both. If there are none and the author gave no change, ask which change to make.
   - If the author arrived with a change in the invocation, apply it first (see Spontaneous change), then offer the pending entries.
4. Run what the author chose: Open questions, Spontaneous change, or both.
5. Send the final message (see Final message).

## Open questions

Go through `book/open-questions.md` in file order, one entry at a time.

1. Show the entry in the author's language: the entity, the chapter passage, the sheet and field, and the question. Wait.
2. Apply the answer:
   - **The sheet is right.** Change nothing. Close the entry.
   - **The chapter is right.** Write the author's wording in the field of the sheet (or in `story.md` or `book.md`). Close the entry.
   - **A new fact becomes canon.** Write it in the field it belongs to, replacing `TBD` if there was one. Close the entry.
   - **A new fact is refused.** Change nothing. Close the entry.
   - **Postponed.** Leave the entry untouched and go on. No changelog line.
3. If the author wants to stop, leave all unprocessed entries as they are.

Closing an entry means removing it from `open-questions.md`. When a heading `## <chapter file> - <entity name>` has no entry left, remove the heading too.

When the answer is an edit that is not obvious (the author's answer does not say what to write, or says several things at once), write only what the author said. Do not ask again.

## Spontaneous change

The author states a change. Never apply it before you know all three of these: the sheet, the field, the value.

1. If the sheet or the field is unclear or ambiguous, ask once for them and wait. If the value is missing, ask once for it. Never guess an edit. Never ask a second time: "I don't know" is recorded as `TBD`.
2. Apply the change to the field. Replace the old value. Keep the structure and every other field of the sheet as they are.
3. A change that creates an incoherence **inside the sheet** (the new value contradicts another field of the same sheet) is shown to the author, who decides what to write.
4. For a free-text file (`story.md`, `book.md`), write the author's wording where the author says, or at the end of the file.

### Renaming

The author may rename a character, a place or a world. Then:

1. Rename the file to the new slug (lowercase, hyphen-separated, ASCII only). If a file with that slug already exists, do not overwrite it: tell the author and stop.
2. Update the title and the name field in the sheet.
3. Update every link to the old file in the other sheets, and every path in the `Sources` of `open-questions.md`.
4. Update the visible name in those links.

## Side effects

Only mention them in the final message. Never read, check or edit the sheets concerned.

- **Relation changed on a character.** The other character's sheet may be outdated.
- **World or place changed.** Name the characters and places whose `World` field links to it. Find them by searching for the link, not by reading the sheets.
- **Any change.** The chapters may need a new `review-coherence`.

## Changelog

Append to `book/changelog.md`, one line per settled entry or per spontaneous change, with today's date:

- Settled entry: `YYYY-MM-DD - Resolved open question (<chapter file> - <entity>): <outcome>`, where `<outcome>` is `sheet kept`, `chapter kept`, `new fact refused`, or `<file> → <field>: <old value> → <new value>`.
- Spontaneous change: `YYYY-MM-DD - Updated <file> → <field>: <old value> → <new value>`.
- Rename: `YYYY-MM-DD - Renamed <old file> to <new file>`.

If `changelog.md` does not exist, do not create it; mention this in the final message.

## Final message

Keep it short, in the author's language:

1. The changes made: the file, the field and the new value.
2. How many entries were settled, how many remain pending.
3. The side effects (see Side effects).
4. Whether the changelog lines were added.
