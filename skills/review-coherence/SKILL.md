---
name: review-coherence
description: Compare a chapter of the book against the character, place and world sheets, story.md and book.md, and turn every potential incoherence into a question for the author. Use when the author wants to check a chapter or a scene for coherence with the rest of the book.
---

# Review the coherence of a chapter

You compare a chapter with the book's reference material and produce questions. You never decide who is right: the chapter or the sheet. The author does.

## Rules

- Only produce questions. Never answer them, never propose a fix, never suggest which side is correct.
- Word every question neutrally, without accusing the chapter or the sheet.
- Never edit the chapter or any sheet. The only files you write are `book/open-questions.md` and `book/changelog.md`.
- The author chooses which sheets are compared with the chapter. Never scan the chapter for other entities and never read sheets the author did not select, apart from the world sheet an entity points to.
- Never ask the author anything during the analysis. Skip what is unclear.
- A `TBD` field cannot be contradicted. Never ask a question about it.
- Style and writing quality are out of scope.
- Questions are stored in English. If the chapter is in another language, translate the quoted passage faithfully.

## Process

1. Find the chapter. The author must name it, and it must be in `book/chapters/`.
   - If the author named none, ask which chapter, and wait.
   - If the file is not in `book/chapters/`, tell the author to put it there and stop.
2. Find the entities to check. The author must list the characters, places and worlds that appear in the chapter, or the part of it, to review.
   - If the author listed none, ask which ones, and wait.
3. Check that `book/characters/`, `book/places/` and `book/worlds/` exist. If not, tell the author to run `init-book` first and stop.
4. Resolve the list (see Resolving the entities).
5. Read the chapter, the selected sheets, and `book/story.md` and `book/book.md` when they are non-empty. Read them as free text.
6. Analyze each entity, one at a time (see Analysis). Do not draft questions across entities beforehand.
7. Run the cross-cutting pass (see Cross-cutting pass).
8. Remove duplicates, save the questions, and log them (see Output).
9. Send the final message (see Final message).

## Resolving the entities

Match each name the author listed to a sheet on:

- The full name.
- The first name or the family name, only if exactly one sheet carries it.
- A nickname or a title that a sheet itself uses.

A name that matches no sheet, or several, is skipped. Never guess. Do not ask. Skipped names are given in the final message and never become questions. A listed name with no sheet is not an incoherence: note it for the final message.

If no listed name matches a sheet, say so, point to `create-character`, `create-place` and `create-world`, and stop.

## Analysis

Take the entities one by one. For each one, compare everything the chapter says or shows about it with its own sheet and with the sheet of the world it belongs to. Raise a question for:

1. **A direct contradiction** of a stated fact (eyes, age, location, history, rules of the world, relations).
2. **Behavior that does not match the sheet**: an action, reaction, line of dialogue or belief at odds with the stated personality, backstory, habits, obsessions, triggers, way of speaking or beliefs.
3. **A new fact the sheet does not have**: the chapter states something about the entity that the sheet does not record, or that the sheet marks `TBD`. Ask whether it should become canon.

For each question, keep:

- The entity, as named in its sheet.
- The chapter passage, quoted or closely paraphrased.
- The sheet and field it conflicts with, or the field the new fact would belong to.

If an entity has nothing to ask, note it as checked with no issue.

## Cross-cutting pass

After the entities, look at what only shows between the selected entities and across the book:

- Contradictions between two selected entities in the chapter (a distance, a date, two accounts of one event).
- Contradictions with `story.md` (events, order, who knows what, current state of the story).
- Contradictions with `book.md`.

Group these questions under a `Story` heading instead of an entity.

## Output

1. Read `book/open-questions.md`. Drop every question that already exists for the same chapter, entity and sheet field. Never remove or edit an existing entry: only an answer removes one, and that belongs to `update-bible`.
2. Append the remaining questions to `book/open-questions.md`, one entry per question, grouped under a heading per chapter and entity:

```markdown
## <chapter file> - <entity name>

- **Question:** Chapter says X ("quoted passage"). `characters/foo.md` → Eyes says Y. Which is right?
- **Sources:** chapters/03.md, characters/foo.md
- **Added:** YYYY-MM-DD
```

- Use the entity's name as in its sheet. Use `Story` in place of the entity name for cross-cutting questions.
- If the heading already exists in the file, add the entries under it.
- A question about a new fact reads like: `Chapter says X ("quoted passage"). The sheet has no record of this. Should it be added?`
- Use today's date.

3. Append one line to `book/changelog.md`: `YYYY-MM-DD - Added N open questions from chapters/<file>`. Skip it when N is 0. If `changelog.md` does not exist, do not create it; mention this in the final message.

## Final message

In this order:

1. The questions, grouped by entity, numbered continuously so the author can answer by number. Each one is self-contained: the passage, the sheet field, and the question. Show the questions you found, including those skipped as duplicates.
2. Listed names with no sheet. Offer `create-character`, `create-place` or `create-world`; do not create them.
3. Entities checked with no issue, in one line. If there are no questions at all, say that everything looks coherent.
4. How many questions were saved to `open-questions.md`, how many were skipped as duplicates, whether the changelog line was added, and any listed name skipped as unclear or ambiguous.
5. When there are questions, tell the author to answer them and then run `update-bible` to update the sheets and clear the answered entries.
