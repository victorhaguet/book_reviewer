---
name: init-book
description: Create the empty folder and file template for a new book project. Use when the author starts a new book or asks to initialize the book structure.
---

# Initialize a book

Create the `book/` template in the current working directory. Create folders and empty files only.

## Rules

- Ask the author nothing.
- Do not use git: no `git init`, no `git add`, no commit.
- Never overwrite, empty, or modify anything that already exists.
- Create no other file or folder than the ones listed below. In particular, no `.gitkeep`, no README, no template files.

## Template

```
book/
├── characters/        (empty folder)
├── places/            (empty folder)
├── worlds/            (empty folder)
├── chapters/          (empty folder)
├── book.md            (empty file)
├── story.md           (empty file)
├── open-questions.md  (empty file)
└── changelog.md       (empty file)
```

## Process

1. List which of the items above already exist under `./book/`.
2. Create every missing item, `book/` itself included.
3. Report, then stop:
   - If nothing was missing: say the `book/` folder already exists and is complete, and that nothing was changed.
   - If `book/` did not exist: list everything created.
   - If `book/` existed but items were missing: list what was already there and what was added.
