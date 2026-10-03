---
name: create-character
description: Interview the author about a character they have in mind and save it as a character sheet in the book project. Use when the author wants to create, add, or describe a new character.
---

# Create a character

The author is the only source of ideas. You collect and record; you never invent.

## Rules

- Never propose, suggest, or fill in a value. No example answers, no menus of options.
- Ask **one question at a time**. Every answer is free text.
- Never ask for clarification or a more precise answer. If the author says the character is "old", the character is old.
- Nothing is mandatory. The author may answer "I don't know" to any question.
- Record answers as given. Do not reword, embellish, or interpret. Fix only grammar and formatting.
- The sheet is stored in English. If the author answers in another language, translate faithfully without changing meaning or tone.
- "I don't know" or a skipped question is recorded as `TBD`. A deliberate "none" or "no relation" is recorded as `None`.

## Process

1. Check that `book/characters/` exists in the current directory. If not, tell the author to run `init-book` first and stop.
2. Tell the author, in one short message, that they can answer "I don't know" to any question and that you will not suggest anything.
3. Let the author describe the character in their own words, then start the interview. Do not ask again anything they already said.
4. Ask the questions below in order, one at a time, one per field.
5. Derive the file name, check for conflicts, write the file, and log it in the changelog (see Output).
6. Send the final message (see Final message).

## Questions

One question per field, in this order. Never group several fields in one question. The only exception is name and family name, which are asked together.

### 1. Characteristics

Identity:

1. Name and family name.
2. Age.
3. Activity.
4. Role in the book.
5. Social origins.
6. World where the character lives. List the sheets in `book/worlds/` and ask which one. If there are none, ask the question as free text.
7. Love situation.

Expression:

8. Facial expressions.
9. Language expression (how they speak).
10. Habits.
11. Obsessions.
12. Triggers (what triggers them).

Physical:

13. Color of the eyes.
14. Size.
15. Clothes.
16. Physical distinction.
17. Voice.
18. Gait.

### 2. Backstory and personality

Backstory:

19. Past.
20. Traumas.
21. Successes.
22. Failures.
23. Flaws.
24. Hopes.
25. Deceptions.
26. Evolution.

Personality:

27. Behavior in public.
28. Beliefs (what they believe in).
29. Qualities.
30. Defaults (faults).
31. Special character aspects.
32. What makes them different from the others.

### 3. Relations

First, one question per category: family, partner (if any), friends, colleagues, children, other characters.

Then list the sheets in `book/characters/` (excluding the new character) that the author has not already mentioned. For each one, ask how the new character relates to them. "No relation" and "I don't know" are valid answers.

## Output

Write `book/characters/<slug>.md`.

- `<slug>`: lowercase, hyphen-separated, ASCII only. Built from the character's name. If the author gave no name, build a short descriptive slug from the first answers.
- If the file already exists, do not overwrite it. Tell the author to use `update-bible` and stop.
- Use English headings, in this structure. Every field appears, with `TBD` when unanswered:

```markdown
# <Name Family name>

## Characteristics

- **Name / family name:**
- **Age:**
- **Activity:**
- **Role in the book:**
- **Social origins:**
- **World:**
- **Love situation:**
- **Facial expressions:**
- **Language expression:**
- **Habits:**
- **Obsessions:**
- **Triggers:**

### Physical

- **Eyes:**
- **Size:**
- **Clothes:**
- **Physical distinction:**
- **Voice:**
- **Gait:**

## Backstory

- **Past:**
- **Traumas:**
- **Successes:**
- **Failures:**
- **Flaws:**
- **Hopes:**
- **Deceptions:**
- **Evolution:**

## Personality

- **Behavior in public:**
- **Beliefs:**
- **Qualities:**
- **Defaults:**
- **Special aspects:**
- **What makes them different:**

## Relations

- **Family:**
- **Partner:**
- **Friends:**
- **Colleagues:**
- **Children:**
- **Other characters:**
```

- **World:** when the world has a sheet, link it: `[Name](../worlds/<slug>.md)`. Otherwise write the plain name as given.
- Under Relations, when a related character has a sheet, link it: `[Name](<slug>.md)`. Otherwise write the plain name.
- The loop answers go under **Other characters**, one line per character.
- Do not show the sheet to the author and do not ask for confirmation before saving.
- Then append one line to `book/changelog.md`: `YYYY-MM-DD - Created character: characters/<slug>.md`, using today's date. If `changelog.md` does not exist, do not create it; mention this in the final message.

## Final message

Keep it short:

- The path of the created file.
- Named characters who have no sheet yet. Offer to create them later; do not create them.
- A named world that has no sheet yet. Offer `create-world`; do not create it.
- Whether the changelog line was added.
- Existing sheets that need a reciprocal relation update. Point to `update-bible` for that.

Do not create, edit, or delete any file other than the new sheet and the changelog line. Leave `open-questions.md` untouched.
