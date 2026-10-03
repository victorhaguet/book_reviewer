---
name: create-place
description: Interview the author about a place they have in mind and save it as a place sheet in the book project. A place is a single human-scale location (a market, a home, a tavern); communities and societies belong to create-world. Use when the author wants to create, add, or describe a new place.
---

# Create a place

A place is a single human-scale location: a market, a home, a tavern, a street. A community or a society is not a place; those belong to `create-world`.

The author is the only source of ideas. You collect and record; you never invent.

## Rules

- Never propose, suggest, or fill in a value. No example answers, no menus of options.
- Ask **one question at a time**. Every answer is free text.
- Never ask for clarification or a more precise answer. If the author says the place is "old", the place is old.
- Nothing is mandatory. The author may answer "I don't know" to any question.
- Record answers as given. Do not reword, embellish, or interpret. Fix only grammar and formatting.
- The sheet is stored in English. If the author answers in another language, translate faithfully without changing meaning or tone.
- "I don't know" or a skipped question is recorded as `TBD`. A deliberate "none" or "no relation" is recorded as `None`.

## Process

1. Check that `book/places/` exists in the current directory. If not, tell the author to run `init-book` first and stop.
2. Tell the author, in one short message, that they can answer "I don't know" to any question and that you will not suggest anything.
3. Let the author describe the place in their own words, then start the interview. Do not ask again anything they already said.
4. Ask the questions below in order, one at a time, one per field.
5. Derive the file name, check for conflicts, write the file, and log it in the changelog (see Output).
6. Send the final message (see Final message).

## Questions

One question per field, in this order.

### 1. General information

1. Name of the place.
2. World where the place is. List the sheets in `book/worlds/` and ask which one. If there are none, ask the question as free text.
3. Location.
4. Role of the place.
5. Management of the place.

### 2. History

6. Construction date (when it was built).
7. Objective (why it was built).
8. Builders (who built it).
9. Evolution (how it evolved).

### 3. Description

10. Factual description of the place.

### 4. Atmosphere

Ask in this order:

11. Touch.
12. Taste.
13. Hearing.
14. Sight.
15. Smell.

## Output

Write `book/places/<slug>.md`.

- `<slug>`: lowercase, hyphen-separated, ASCII only. Built from the place's name. If the author gave no name, build a short descriptive slug from the first answers.
- If the file already exists, do not overwrite it. Tell the author to use `update-bible` and stop.
- Use English headings, in this structure. Every field appears, with `TBD` when unanswered:

```markdown
# <Name>

## General information

- **Name:**
- **World:**
- **Location:**
- **Role:**
- **Management:**

## History

- **Construction date:**
- **Objective:**
- **Builders:**
- **Evolution:**

## Description

<factual description>

## Atmosphere

- **Touch:**
- **Taste:**
- **Hearing:**
- **Sight:**
- **Smell:**
```

- If the author gave no name, write `TBD` in the `# <Name>` heading and in the **Name:** field.
- **World:** when the author's answer designates an existing sheet in `book/worlds/`, link it: `[Name](../worlds/<slug>.md)`. Otherwise (no matching sheet, or "I don't know") write the plain name as given, or `TBD`. Never write a link to a file that does not exist.
- Do not ask about characters or other places and do not link to them.
- Do not show the sheet to the author and do not ask for confirmation before saving.
- Then append one line to `book/changelog.md`: `YYYY-MM-DD - Created place: places/<slug>.md`, using today's date. If `changelog.md` does not exist, do not create it; mention this in the final message.

## Final message

Keep it short:

- The path of the created file.
- Whether the changelog line was added.
- A named world that has no sheet yet. Offer `create-world`; do not create it.
- Names the author gave that look like characters. Offer `create-character`; do not create them.

Do not create, edit, or delete any file other than the new sheet and the changelog line. Leave `open-questions.md` untouched.
