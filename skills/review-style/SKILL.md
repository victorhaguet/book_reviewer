---
name: review-style
description: Correct objective errors in a chapter (after the author's approval) and highlight passages that may need a reformulation, without ever rewriting them. Use when the author wants a chapter proofread or its style reviewed.
---

# Review the style of a chapter

You work in two steps on one chapter: a correction step, which fixes objective errors only after the author approves each one, and a restyle step, which highlights passages that may need a reformulation. How the book reads is the author's work. You never rewrite it.

## Rules

- Never modify the chapter without telling the author first. The only edits are the approved corrections of step 1.
- Only objective errors are corrected (see Correction). When in doubt, it is not an error: list it as doubtful and leave it.
- Never propose a replacement wording for a doubtful case or for a restyle highlight, not even as an example.
- Never read or edit the sheets, `book/story.md` or `book/book.md`. Read only the chapter. The files you write are the chapter (approved corrections only), `book/style-notes.md` and `book/changelog.md`.
- Write messages, explanations and style notes in the language of the chapter. Quoted passages stay verbatim.
- Coherence with the rest of the book is out of scope.

## Process

1. Find the chapter. The author must name it, and it must be in `book/chapters/`.
   - If the author named none, ask which chapter, and wait.
   - If the file is not in `book/chapters/`, tell the author to put it there and stop.
   - The author may limit the review to a passage. Otherwise review the whole chapter.
2. Find the steps to run. Run both by default. If the author asked only for corrections or only for style, run only that step.
3. Read the chapter.
4. Run step 1 (see Correction), then step 2 (see Restyle). Step 2 always works on the current text, whether corrections were applied or declined.
5. Log what happened (see Changelog).
6. Send the final message (see Final message).

## Correction

### What is an error

Only these, in the language of the chapter:

- Spelling and typos.
- Agreement (gender, number, participles).
- Conjugation.
- Doubled words.
- Misused punctuation, including mismatched quotation marks, brackets and dashes.

Everything else is a choice and is never corrected: word choice, repetition, rhythm, register, sentence length, a heavy but grammatical construction.

### What is never corrected

- Names and terms that look invented, since you do not know the book's vocabulary. If a name is spelled in two different ways in the chapter, list it as doubtful.
- Anything that could be deliberate: a fragment, a run-on, a character's way of speaking, a foreign or invented word, a passage in a language you cannot identify. List it as doubtful.
- Dialogue follows the same rules as the rest of the text. A typo or a grammar error is proposed like any other, marked "in dialogue". Whatever could be a character's way of speaking is doubtful.

### Proposal

Edit nothing yet. Show:

1. The proposed corrections, numbered continuously, each with: the location (a quoted excerpt long enough to find), before → after, and the category.
2. The doubtful cases under a separate heading, not numbered: the passage and the reason for the doubt. Propose no fix.

Then ask the author which corrections to apply: `all`, `none`, or numbers such as `1-4, 7`. Wait. A silent or unclear reply applies nothing.

If there are no corrections and no doubtful cases, say so and go on.

### Applying

Apply only the approved corrections, with the smallest possible edit: the erroneous characters or word, nothing around them. Never touch a doubtful case. Report what was applied and what was declined.

## Restyle

Highlight the passages that may need a reformulation. Never reformulate. Use these categories:

- A repeated word or structure close by.
- A very long or very dense sentence.
- An awkward or ambiguous construction.
- A cliché.
- A break of rhythm or register.

Each highlight has a quoted excerpt long enough to find, a category, and a short neutral reason. Never write what the passage should say instead.

Delete `book/style-notes.md` if it exists, then write it again with this single section:

```markdown
## <chapter file>

- **Excerpt:** "quoted passage"
  **Category:** repeated word
  **Reason:** neutral explanation
```

If there is nothing to highlight, write the section with a line saying so. The file is created if missing. Do not delete it when the author asked for corrections only.

## Changelog

Append lines to `book/changelog.md`, skipping any line whose N is 0:

- `YYYY-MM-DD - Corrected N errors in chapters/<file>`, followed by one indented line per correction: `"before" → "after"`.
- `YYYY-MM-DD - Declined N proposed corrections in chapters/<file>`
- `YYYY-MM-DD - Flagged N doubtful cases in chapters/<file>`
- `YYYY-MM-DD - Wrote N style notes for chapters/<file> in style-notes.md`

If `changelog.md` does not exist, do not create it; mention this in the final message.

## Final message

In this order:

1. Step 1: what was applied (before → after), what was declined, and the doubtful cases left untouched.
2. Step 2: the number of style notes, per category, and that they are in `book/style-notes.md`. Do not list them in the message.
3. Whether the changelog lines were added.
