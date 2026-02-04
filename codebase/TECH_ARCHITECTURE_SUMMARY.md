# Tech Architecture Summary — Yoga Cueing Practice App

This document summarizes the current architecture of the MVP so it can be refactored into a production-grade app while reusing existing features.

---

## 1. High-Level Overview

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 15 (App Router) | SSR/SSG, API routes, single-page flow |
| **Language** | TypeScript | Type safety, shared types |
| **Styling** | Tailwind CSS | Utility-first, theme tokens, mobile-first |
| **State** | React `useState` (client) | Local UI state; no global store |
| **Transcription** | OpenAI Whisper | Speech-to-text for cueing audio |
| **Evaluation** | Google Gemini 2.5 Pro | Structured feedback (score, strengths, improvements, vocabulary) |
| **Audio Capture** | MediaRecorder API | Browser-based recording (WebM) |
| **Content** | File-based (Markdown + YAML) | Pose definitions in `knowledge/` |

**Deployment:** Railway (Nixpacks build, `npm run build` + `npm run start`).

---

## 2. Application Flow

```
[Pose Selection] → [Pose Details] → [Record] → [Transcribe] → [Evaluate] → [Feedback]
       ↑                  ↑              ↑          ↑              ↑
   PoseSelector     PoseDetails    VoiceRecorder   /api/transcribe  /api/evaluate
```

- **App state:** `pose-selection` | `pose-details` | `recording` | `processing` | `feedback`
- **Orchestration:** `YogaApp.tsx` holds `selectedPose`, `appState`, `feedback`, `error` and wires child components and API calls.
- **Recording pipeline:** User records → blob sent to `/api/transcribe` → transcript sent with pose to `/api/evaluate` → `EvaluationFeedback` shown in `FeedbackDisplay` + `ElevatedCues`.

---

## 3. Directory & Module Map

| Path | Role |
|------|------|
| **`app/`** | Next.js App Router: root layout, single page, global CSS |
| **`app/page.tsx`** | Server component: loads poses via `getAllPoses()`, renders `<YogaApp initialPoses={poses} />` |
| **`app/layout.tsx`** | Root layout: Inter + Lora fonts, viewport/meta, no auth |
| **`app/globals.css`** | Tailwind layers, touch targets, safe-area, no-scrollbar |
| **`app/api/transcribe/route.ts`** | POST: multipart audio → OpenAI Whisper → `{ transcript }` |
| **`app/api/evaluate/route.ts`** | POST: `{ transcript, pose }` → Gemini 2.5 Pro → JSON matching `EvaluationFeedback` |
| **`components/YogaApp.tsx`** | Client root: state machine, API orchestration, layout by `appState` |
| **`components/PoseSelector.tsx`** | Search, category filter, scroll behavior, pose list → `onSelect(pose)` |
| **`components/PoseDetails.tsx`** | Full pose view (script, alignment, breath, anatomy, etc.) + “Start recording” |
| **`components/VoiceRecorder.tsx`** | Mic permission, MediaRecorder, 15–30s limit, wake lock, cue tips, `onComplete(blob)` |
| **`components/FeedbackDisplay.tsx`** | Score, transcript, breath cue, strengths, improvements, forbidden words |
| **`components/ElevatedCues.tsx`** | “Elevated vocabulary” suggestions (original → suggestion) |
| **`lib/types.ts`** | `Pose`, `EvaluationFeedback`, `AppState`, and supporting interfaces |
| **`lib/poses.ts`** | Server-only: `getAllPoses()` — reads `knowledge/manifest.json` + `knowledge/poses/*.md` |
| **`lib/pose-utils.ts`** | Pure: `getPoseById`, `getPosesByCategory`, `searchPoses`, `getCategories` |
| **`lib/theme.ts`** | Design tokens (colors); Tailwind extends from these in `tailwind.config.ts` |
| **`lib/constants.json`** | Lookups: anatomy, chakras, props, categories (human-readable names from IDs) |
| **`lib/evaluateYogaSession.ts`** | **Unused in MVP:** different evaluation contract (`YogaEvaluationResponse`), uses `generateText` from `ai` SDK (not in deps), reads `YOGA_EVALUATION_PROMPT.md` — candidate for future “advanced” evaluation |
| **`knowledge/manifest.json`** | List of pose IDs (and title/category) to load |
| **`knowledge/poses/*.md`** | One file per pose: YAML frontmatter (full `Pose` shape) + optional body |
| **`config/theme.config.ts`** | Theme config (if used beyond `lib/theme.ts`) |

**Out of scope / legacy:** `poses.json` (replaced by knowledge base), `app/page_22.tsx` (deleted).

---

## 4. Data Models

### 4.1 Pose (from knowledge base)

- **Source:** YAML frontmatter in `knowledge/poses/<id>.md`.
- **Key fields:** `id`, `names` (sanskrit, english, phonetic), `description`, `category[]`, `difficulty_level`, `drishti`, `impact`, `anatomy`, `props`, `prop_guidance`, `assists`, `flow`, **`cueing`** (foundation, alignment, breath_instruction, forbidden_words, elevated_vocabulary).
- **Type:** `Pose` in `lib/types.ts` (matches YAML structure).

### 4.2 Evaluation feedback (API → UI)

- **Source:** Gemini response in `/api/evaluate`; parsed and returned as JSON.
- **Type:** `EvaluationFeedback` in `lib/types.ts`: `score` (1–10), `strengths[]`, `improvements[]`, `transcript`, `breathCue`, `forbiddenWordsUsed`, `elevatedSuggestions[]`.
- **Note:** API prompt also defines `clarityAndPacing`; if Gemini returns it, consider adding to `EvaluationFeedback` and UI.

---

## 5. API Contracts

### POST `/api/transcribe`

- **Request:** `multipart/form-data`, field `audio` (File; e.g. `recording.webm`).
- **Response:** `{ transcript: string }`.
- **Errors:** 400 if no file; 500 on Whisper failure.
- **Env:** `OPENAI_API_KEY`.

### POST `/api/evaluate`

- **Request:** `application/json` — `{ transcript: string, pose: Pose }`.
- **Response:** JSON matching `EvaluationFeedback` (plus `transcript` re-attached).
- **Errors:** 400 if missing transcript/pose; 500 on Gemini/parse failure.
- **Env:** `GEMINI_API_KEY`.
- **Prompt:** Inline in route: system prompt (scoring philosophy, JSON schema) + user prompt (pose cueing + transcript).

---

## 6. Frontend Patterns

- **No global state:** All state in `YogaApp`; no Redux/Zustand/Context.
- **Server data:** Poses loaded once in `app/page.tsx` and passed as `initialPoses` (no client fetch for pose list).
- **Client components:** All main UI is `"use client"` (YogaApp, PoseSelector, PoseDetails, VoiceRecorder, FeedbackDisplay, ElevatedCues).
- **Theme:** Single source in `lib/theme.ts`; Tailwind `theme.extend.colors` and utilities (e.g. `touch-target`, safe-area) in `tailwind.config.ts` and `globals.css`.
- **Icons:** Lucide React.
- **Mobile:** Viewport meta, touch targets, Wake Lock in VoiceRecorder, safe-area utilities.

---

## 7. Configuration & Environment

- **Env:** `.env.local` (see `.env.local.example`): `OPENAI_API_KEY`, `GEMINI_API_KEY`.
- **Build:** `next build`; no special env at build time for pose loading (manifest + markdown read at runtime on server).
- **Deploy:** Railway with Nixpacks; `railway.toml` defines build/start; secrets via Railway env.

---

## 8. MVP Features to Reuse in Production

| Feature | Location | Reuse strategy |
|---------|----------|----------------|
| Pose knowledge base | `knowledge/`, `lib/poses.ts`, `lib/types` | Keep format; consider CMS or DB later for authoring; keep types and loader pattern |
| Pose selector + search/filter | `PoseSelector`, `pose-utils` | Keep UX; add pagination/virtualization if pose set grows |
| Pose detail view | `PoseDetails`, `constants.json` | Keep; consider lazy-loading or splitting by section |
| Recording flow | `VoiceRecorder` | Keep MediaRecorder + wake lock; add upload progress, retries, format fallbacks |
| Transcription | `/api/transcribe` | Keep Whisper; add idempotency, rate limits, optional storage of audio/transcript |
| Evaluation prompt + schema | `/api/evaluate` | Extract prompt to template/file; version schema; consider `lib/evaluateYogaSession` for richer rubric |
| Feedback UI | `FeedbackDisplay`, `ElevatedCues` | Keep; align with any new evaluation schema (e.g. clarityAndPacing, dimensions) |
| Theme system | `lib/theme.ts`, Tailwind config, globals | Keep; extend with design tokens for theming/white-label |
| Types | `lib/types.ts` | Single source of truth; add API DTOs if you introduce BFF or separate backend |

---

## 9. Gaps & Refactor Priorities for Production

1. **Auth & users:** No auth; no user-specific data. Add auth (e.g. NextAuth, Clerk) and associate recordings/evaluations to users.
2. **Persistence:** No DB; no history. Add storage for recordings, transcripts, and evaluations for progress and replay.
3. **Evaluation duality:** Two evaluation paths — API route (Gemini, current UI) vs `lib/evaluateYogaSession.ts` (different schema, `ai` SDK). Unify or clearly separate “simple” vs “advanced” evaluation and one set of types.
4. **Error handling:** Minimal; generic messages. Add structured errors, logging, and optional user-facing error boundaries.
5. **Rate limiting & cost:** No limits on transcribe/evaluate. Add rate limits and usage tracking for production.
6. **Security:** API keys in env (good); validate request size and sanitize pose payload in evaluate.
7. **SEO & metadata:** Minimal; fine for app. Improve if you add marketing or public pose pages.
8. **Testing:** No tests in tree. Add unit tests for `pose-utils`, evaluation parsing, and E2E for main flow.
9. **Monitoring:** No APM or error reporting. Add logging and error tracking (e.g. Sentry) for production.
10. **Content pipeline:** Poses are code-repo files. For production, consider admin UI or CMS for `knowledge/` or migrate to DB with same schema.

---

## 10. Suggested Next Steps

1. **Stabilize evaluation:** Either adopt `lib/evaluateYogaSession.ts` and wire it to the API (and add `ai` SDK), or remove it and extend the current Gemini route with any needed fields (e.g. clarityAndPacing).
2. **Extract prompts:** Move system/user prompts from `app/api/evaluate/route.ts` into `docs/` or `lib/prompts/` and load at runtime for easier iteration and A/B tests.
3. **Introduce data layer:** Define persistence for users, sessions, recordings, and evaluations; keep existing types as core domain models.
4. **Add auth:** Protect API routes and associate all user-generated data to a user ID.
5. **Incremental UI:** Keep current screens; add history/dashboard when persistence exists; reuse PoseSelector, PoseDetails, VoiceRecorder, FeedbackDisplay, and ElevatedCues as-is where possible.

This architecture summary should be enough to plan the refactor and reuse MVP features in a production-grade version of the app.
