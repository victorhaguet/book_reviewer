---
name: write-book-card
description: Interview the author to write book/book.md, the card of the whole book (premise, genre, POV, tense, tone, audience, themes, ending). Runs once, when the book starts. Use when book.md is empty. Later changes go through update-bible.
---

# Write the book card

You interview the author to fill `book/book.md`. The author is the only source of decisions. You record; you never decide, never propose, never invent.

## Rules

- You edit only `book/book.md` and `book/changelog.md`.
- Run only once. If `book/book.md` is not empty, tell the author that the card is already written and that changes go through `update-bible`, then stop.
- Never read the chapters, the sheets or any other file.
- Never propose a value. Never comment on an answer. Never ask for clarification of an answer.
- Record each answer as given. Do not reword, embellish, or interpret. Fix only grammar and formatting.
- `book.md` and `changelog.md` are stored in English. Talk to the author in the language of the book: infer it from the author's messages. If the author answers in another language, translate faithfully without changing meaning or tone.
- "I don't know" is recorded as `TBD`. A deliberate "none" is recorded as `None`.
- One field at a time. Never show the next field before the current one is answered.

## Template

```
# Book

## Premise
## Genre
## POV
## Tense
## Tone
## Audience
## Themes
## Ending
```

Each field is short, 1 to 3 lines.

## Process

1. Check that `book/book.md` exists. If not, tell the author to run `init-book` first and stop. If it is not empty, see Rules and stop.
2. Tell the author what is about to happen: you will ask eight questions, one at a time, to write the card of the book; the answers are recorded as given; `TBD` is allowed for anything not decided yet; and later changes go through `update-bible`.
3. Ask the fields in this order, waiting for each answer: premise, genre, POV, tense, tone, audience, themes, ending.
4. Write the template in `book/book.md` with the recorded answers.
5. Append to `book/changelog.md`: `YYYY-MM-DD - Wrote book.md`. If `changelog.md` does not exist, do not create it and mention this in the final message.
6. Send the final message.

## Final message

Keep it short, in the author's language:

1. That `book.md` is written, and which fields are `TBD`.
2. That later changes go through `update-bible`.
3. Whether the changelog line was added.
