# Technical Centre UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the bilingual Technical Centre and its guides as a responsive, visual V12 knowledge experience with reduced CTA repetition.

**Architecture:** Extend the existing shared React components and guide data model rather than adding a parallel layout. Header menu state remains local; Home, guide-index and article presentation consume the established bilingual data and SEO pipeline.

**Tech Stack:** React 18, React Router, Vite, Tailwind-compatible project CSS, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-01-technical-centre-ux-design.md`

## Global Constraints

- Work only on `platform-v3`; no merge or push.
- Preserve `/api/send-quote`, its payload, `QuoteForm`, WhatsApp and floating quote behavior.
- Preserve all existing URLs, canonical, hreflang and structured data.
- Keep the approved V12 visual language and responsive behavior.
- Use no new UI library and make no unsupported claims.

---

### Task 1: Responsive shared header

**Files:** Modify `src/components/Header.jsx`, `src/index.css`; test `src/components/components.test.jsx`.

**Interfaces:** Preserve existing Header props. Add a native menu button with `aria-expanded`, `aria-controls` and a collapsible navigation container.

- [ ] Add failing tests for menu semantics and required links.
- [ ] Verify the tests fail because no toggle exists.
- [ ] Add local menu state and responsive V12 styles.
- [ ] Verify component tests pass.

### Task 2: Home Technical Centre discovery

**Files:** Create `src/components/TechnicalCentreFeature.jsx`; modify `src/pages/HomePage.jsx`, `src/index.css`; test `src/pages/pages.test.jsx`.

**Interfaces:** Consume only `language`; emit one image-led section linked to the existing guide index.

- [ ] Add failing tests for section order, topic cues and bilingual destination.
- [ ] Verify the tests fail because the feature is absent.
- [ ] Implement the feature and responsive styles.
- [ ] Verify page tests pass.

### Task 3: Visual guide hub and articles

**Files:** Modify `src/pages/GuidesIndexPage.jsx`, `src/pages/GuidePage.jsx`, `src/components/GuideCards.jsx`, `src/components/OfficialSources.jsx`, `src/data/guides.mjs`, `src/index.css`; test `src/pages/guides.test.jsx`, `src/data/guides.test.js`.

**Interfaces:** Preserve guide route objects and SEO fields. Render the same content as image cards, contents navigation, numbered sections, checklist, related guides/services and source cards; remove article quote forms and dominant quote panels.

- [ ] Add failing tests for four visual cards, absent author promotion, article navigation, source names and CTA/form reduction.
- [ ] Verify expected failures.
- [ ] Reorder and enrich the guide data without changing URLs.
- [ ] Implement hub and article composition.
- [ ] Verify guide and SEO tests pass.

### Task 4: Runtime verification

**Files:** Update tests only if a verified regression requires coverage.

**Interfaces:** No production API changes.

- [ ] Run the complete test suite.
- [ ] Run the production build.
- [ ] Start the local server and check all catalogued routes.
- [ ] Inspect Home, guide indexes and representative ES/EN guides at desktop, split, tablet and mobile widths.
- [ ] Confirm no console errors, overflow or protected-file changes.
