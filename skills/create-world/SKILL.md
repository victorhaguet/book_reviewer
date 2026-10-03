---
name: create-world
description: Interview the author about a world they have in mind and save it as a world sheet in the book project. A world is a community or society, something far larger than a single human-scale place. Use when the author wants to create, add, or describe a new world, society, or community.
---

# Create a world

A world is a community or society: large, and not human-scale. A market, a home, or any other single place is not a world; those belong to `create-place`. A world may have no fixed territory (a nomadic people, a diaspora).

The author is the only source of ideas. You collect and record; you never invent.

## Rules

- Never propose, suggest, or fill in a value. No example answers, no menus of options.
- Ask **one question at a time**. Every answer is free text.
- Never ask for clarification or a more precise answer. If the author says the world is "big", the world is big.
- Nothing is mandatory. The author may answer "I don't know" to any question.
- Record answers as given. Do not reword, embellish, or interpret. Fix only grammar and formatting.
- The sheet is stored in English. If the author answers in another language, translate faithfully without changing meaning or tone.
- "I don't know" or a skipped question is recorded as `TBD`. A deliberate "none" or "no relation" is recorded as `None`.

## Process

1. Check that `book/worlds/` exists in the current directory. If not, tell the author to run `init-book` first and stop.
2. Tell the author, in one short message, that they can answer "I don't know" to any question and that you will not suggest anything.
3. Let the author describe the world in their own words, then start the interview. Do not ask again anything they already said.
4. Ask the questions below in order, one at a time. Ask the question of every field, one per field.
5. Derive the file name, check for conflicts, write the file, and log it in the changelog (see Output).
6. Send the final message (see Final message).

## Questions

One question per field, in this order.

### 1. Identity

1. Name of the world.
2. Location. `None` is valid, for a world without a fixed territory.
3. Role of the world.

### 2. Geography

4. Weather.
5. Size.
6. Terrain and geography (mountains, sea, etc.).
7. Wild animals.
8. Natural dangers.
9. Extra particularities.

### 3. Demography

10. Number of inhabitants.
11. Social classes.
12. Name of the inhabitants (the demonym).
13. Economic system.

### 4. Political power

14. Political system.
15. Official language.
16. Religion.
17. Capital.

### 5. Past

18. History of the world. Ask this first.
19. Consequences of that history. Ask this second, after the history.

## Output

Write `book/worlds/<slug>.md`.

- `<slug>`: lowercase, hyphen-separated, ASCII only. Built from the world's name. If the author gave no name, build a short descriptive slug from the first answers.
- If the file already exists, do not overwrite it. Tell the author to use `update-bible` and stop.
- Use English headings, in this structure. Every field appears, with `TBD` when unanswered:

```markdown
# <Name>

## Identity

- **Name:**
- **Location:**
- **Role:**

## Geography

- **Weather:**
- **Size:**
- **Terrain:**
- **Wild animals:**
- **Natural dangers:**
- **Extra particularities:**

## Demography

- **Number of inhabitants:**
- **Social classes:**
- **Name of the inhabitants:**
- **Economic system:**

## Political power

- **Political system:**
- **Official language:**
- **Religion:**
- **Capital:**

## Past

- **History:**
- **Consequences:**
```

- Do not ask about characters or places and do not link to other sheets.
- Do not show the sheet to the author and do not ask for confirmation before saving.
- Then append one line to `book/changelog.md`: `YYYY-MM-DD - Created world: worlds/<slug>.md`, using today's date. If `changelog.md` does not exist, do not create it; mention this in the final message.

## Final message

Keep it short:

- The path of the created file.
- Whether the changelog line was added.
- Places in this world have no sheet yet. Offer `create-place` for them; do not create them.

Do not create, edit, or delete any file other than the new sheet and the changelog line. Leave `open-questions.md` untouched.
