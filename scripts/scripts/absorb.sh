#!/bin/bash
mkdir -p docs/playwright
for f in .github/agents/*.agent.md; do
  case "$f" in *ai-for-qe*) continue;; esac
  mv "$f" "docs/playwright/$(basename "${f%.agent.md}").md"
done
bash scripts/absorb.sh
