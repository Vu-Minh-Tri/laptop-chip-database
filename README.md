# Laptop Chip Database

An open, searchable database of laptop processors and graphics chips.

## Features

- Search sample laptop CPU and GPU entries and filter by chip type.
- Browse a searchable, maker-filtered glossary of common processor and graphics model suffixes and related labels.
- Glossary entries explain where terms are suffixes, product tiers, architectures, or legacy labels, and note that meanings can vary by generation.

## Development

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Data quality

The chip entries are illustrative sample data. Before relying on specifications, add sources and exact laptop configurations. Suffix definitions are intentionally described as common usage rather than universal rules: verify each complete model number against manufacturer specifications.
