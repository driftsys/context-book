# Context Engineering

A reference book on context engineering: history, key figures, glossary, tools, and the SDD/TDD techniques for working with coding agents.

Published at <https://driftsys.github.io/context-book/>, with a French translation at <https://driftsys.github.io/context-book/fr/>.

Built with [mdBook](https://github.com/rust-lang/mdBook) and published via GitHub Pages.

## Layout

- `src/`: the English edition (the reference version).
- `fr/src/`: the French edition, with the same file names. Headings carry explicit ids (`## Titre {#english-slug}`) so that anchors are identical in both languages.
- `lang-switch.js`: adds an EN/FR switch to the menu bar that keeps the reader on the same page.

When you change a chapter in `src/`, update its counterpart in `fr/src/`.

## Local build

```sh
mdbook serve          # English
mdbook serve fr       # French
```

To build both as they are deployed (French under `book/fr/`):

```sh
mdbook build && mdbook build fr
```
