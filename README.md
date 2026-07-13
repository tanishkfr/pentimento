# Pentimento

**A machine-written memoir that must yield to its subject.**

Pentimento is a research-through-design investigation into algorithmic autobiography. It asks what software owes a person when it turns an archive into a story about their life.

Its answer is **sovereign ink**: a human correction is not feedback beside the document. It becomes the document's leading text, and the machine's withdrawn interpretation remains visible beneath it as an underpainting.

## Interaction

**Read → inspect evidence → let stand, reframe, or strike → recompose → preserve lineage.**

The experience opens directly inside a contested edition. Resolve every claim and settle a second draft. Every reply remains revisable before settlement; finished chapters keep their evidence inspectable; print and the downloadable session record preserve authorship lineage.

Maya’s edition is visibly labeled as an authored fictional research probe. A Letterboxd CSV can also be imported and is processed only in the browser; the raw archive is never included in the session record.

## Run

```sh
cd app
npm install
npm run dev
```

Production verification:

```sh
npx tsc --noEmit
npm run build
```

See [CASESTUDY.md](CASESTUDY.md) for the design argument and [RESEARCH.md](RESEARCH.md) for the research record.
