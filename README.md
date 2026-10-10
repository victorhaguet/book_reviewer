# Book Reviewer

[![App CI](https://github.com/victorhaguet/book_reviewer/actions/workflows/app.yml/badge.svg)](https://github.com/victorhaguet/book_reviewer/actions/workflows/app.yml)

A [Claude Code](https://claude.com/claude-code) plugin for fiction authors. It helps you keep track of your book (characters, places, worlds, story so far), checks your chapters for coherence with that material, and proofreads them.

## Philosophy

**You are the only source of ideas.** Book Reviewer is a reviewer and a record keeper, not a co-writer.

- It never invents, suggests, or fills in a value. When it interviews you, there are no example answers and no menus of options.
- It never rewrites your prose. It fixes objective errors (typos, agreement, conjugation) only after you approve each one, and it highlights passages that may need a reformulation without proposing any wording.
- It never decides who is right. When your chapter and your notes disagree, it asks you a neutral question and you choose.
- Everything you tell it is recorded as you said it. Nothing is reworded, embellished or interpreted.

The feedback you get is explicit: questions and highlights, nothing that nudges your story in a direction you did not choose.

## Install

In Claude Code, run:

```
/plugin marketplace add victorhaguet/book_reviewer
/plugin install book-reviewer@book-reviewer
```

The skills are then available as `/book-reviewer:<skill>`, for example `/book-reviewer:init-book`.

## How to use it

Open Claude Code in the folder of your book project, then follow these steps. Skills must be run from that folder, since they look for the `book/` folder in the current directory.

1. **Initialize the book.** Run `/book-reviewer:init-book`. It creates this template, empty:

   ```
   book/
   ├── characters/
   ├── places/
   ├── worlds/
   ├── chapters/
   ├── book.md
   ├── story.md
   ├── open-questions.md
   └── changelog.md
   ```

2. **Write the book card.** `init-book` chains into `write-book-card`, which interviews you about the premise, genre, point of view, tense, tone, audience, themes and ending. It runs once.
3. **Describe your world.** Run `create-world`, `create-place` and `create-character` as often as you like. Each one interviews you one question at a time and saves a sheet. You can answer "I don't know" to anything; it is recorded as `TBD`.
4. **Write your chapters.** This part is yours. Put each chapter file in `book/chapters/`.
5. **Summarize the chapter.** Run `update-story` with the chapter file. It drafts a short summary of the events, and writes it to `book/story.md` once you approve.
6. **Check coherence.** Run `review-coherence` with the chapter and the characters, places and worlds that appear in it. It compares them with the sheets and saves neutral questions in `book/open-questions.md`.
7. **Settle the questions.** Run `update-bible`. It goes through the open questions one by one, and you decide for each whether the chapter or the sheet is right. You can also use it to change a sheet or `book.md` at any time.
8. **Proofread and review the style.** Run `review-style` with the chapter. It corrects objective errors you approve, then lists passages that may need a reformulation in `book/style-notes.md`.

Repeat steps 4 to 8 for each new chapter. Every change made by a skill is logged in `book/changelog.md`.

## Skills

| Skill | What it does | When to use it |
| --- | --- | --- |
| `init-book` | Creates the empty `book/` folder template. | Starting a new book. |
| `write-book-card` | Interviews you to write `book/book.md`, the card of the whole book. | Once, at the start (`init-book` launches it). |
| `create-character` | Interviews you and saves a character sheet. | Adding a character. |
| `create-place` | Interviews you and saves a sheet for a single human-scale place (a tavern, a home, a market). | Adding a place. |
| `create-world` | Interviews you and saves a sheet for a community or society. | Adding a world. |
| `update-story` | Adds one chapter to `book/story.md`, the running summary, after your approval. | After writing a chapter. |
| `review-coherence` | Compares a chapter with the sheets, `story.md` and `book.md`, and turns each possible incoherence into a question. | After writing or rewriting a chapter. |
| `update-bible` | Applies your decisions to the sheets, `story.md` and `book.md`; settles the open questions. | After `review-coherence`, or to change a sheet. |
| `review-style` | Fixes objective errors with your approval and highlights passages that may need a reformulation. | When a chapter is ready to be proofread. |

## Run the app from source

A desktop version of Book Reviewer is in progress in the [`app/`](app/) folder (Electron, React, TypeScript). It is run from source; there is no installer yet. You need [Node.js](https://nodejs.org/) 22 or later.

```
cd app
npm install
npm run dev
```

`npm run dev` opens the app window and reloads the interface as you edit it. Other commands, also run from `app/`:

| Command | What it does |
| --- | --- |
| `npm test` | Runs all the tests once. |
| `npm run test:watch` | Re-runs the tests as you edit. |
| `npm run test:coverage` | Runs the tests with coverage; fails under 90% lines, branches, functions or statements. |
| `npm run typecheck` | Checks the TypeScript types of all three layers. |
| `npm run lint` | Runs ESLint; any warning fails. |
| `npm run format` | Formats the code with Prettier (`npm run format:check` only checks). |
| `npm run build` | Builds the app into `app/out/`. |

The code is split into three layers: `src/core` (plain TypeScript, no Electron or React), `src/main` (the Electron main process, which delegates to core) and `src/renderer` (the React interface, which talks to the main process only through the typed API in `src/shared/ipc-api.ts`).

## License

MIT, see [LICENSE](LICENSE).
