# RecycLens

AI-powered waste classification: scan an item and get back its material category, a
confidence score, and disposal instructions. Built as a computer-vision proof of
concept, with an active pivot underway toward a B2B hardware product — an
AI-driven sorting system that runs on a physical conveyor line.

## Live Demo

- **Frontend:** [recyc-lens.vercel.app](https://recyc-lens.vercel.app/)
- **Backend:** not deployed anywhere right now — see [Current State](#current-state-read-this-first) below.

## Table of Contents

- [Current State (read this first)](#current-state-read-this-first)
- [Architecture](#architecture)
- [The ML Model](#the-ml-model)
- [Tech Stack](#tech-stack)
- [Repo Structure](#repo-structure)
- [Local Setup](#local-setup)
- [Roadmap](#roadmap)
  - [1. Model: accuracy, interpretability, and honesty about what it can do](#1-model-accuracy-interpretability-and-honesty-about-what-it-can-do)
  - [2. Hardware: from phone scanner to sorting line](#2-hardware-from-phone-scanner-to-sorting-line)
  - [3. YC-readiness: what's actually missing](#3-yc-readiness-whats-actually-missing)

---

## Current State (read this first)

This section exists so nobody — including future-you — has to reverse-engineer
what's real by reading every file. As of this write-up:

- **The frontend defaults to mock mode.** [`waste-ui/src/lib/api.ts`](waste-ui/src/lib/api.ts)
  fakes every classification result client-side (`mockClassify()`, ~1.5s simulated
  delay, cycles through categories) unless `NEXT_PUBLIC_USE_MOCK=false` is set. **The
  scanner you see on Vercel is not talking to the PyTorch model at all right now.**
- **The backend is not hosted anywhere.** No Render/Fly/Railway config exists in this
  repo. It only runs if someone starts it locally with `uvicorn` (see
  [Local Setup](#local-setup)). This is a known, deliberate limitation, not a bug —
  free-tier hosting sleeps/shuts down and breaks real-time ML demos.
- **The frontend and backend don't speak the same contract**, even if you flip mock
  mode off:

  | | Frontend expects (`lib/api.ts`) | Backend actually provides (`src/app.py`) |
  |---|---|---|
  | Route | `POST /api/classify` | `POST /classify` |
  | Request body | JSON `{ image: base64string }` | `multipart/form-data`, a `file` field |
  | Response | `{ category, confidence, instructions, processing_time_ms }` | `{ label, confidence }` |
  | Categories | 15 (includes E-Waste, Medical, plain "Glass") | 12 (battery, biological, brown/green/white-glass, cardboard, clothes, metal, paper, plastic, shoes, trash) |

  This was an intentional sequencing choice (UI built first, decoupled from the
  model, on purpose) — but it means **reconciling this table is real work**, not a
  config flag. See the roadmap below.
- **Training claims vs. training code**: the original project description mentions
  data augmentation (random crop/flip). [`src/data.py`](src/data.py) currently only
  resizes + normalizes — no augmentation is actually applied. Worth fixing before
  the next training run, not just the docs.
- **No per-class metrics exist yet.** [`src/evaluate.py`](src/evaluate.py) reports a
  single aggregate test accuracy number. There's no confusion matrix, no per-class
  precision/recall, and the training data is heavily imbalanced by folder size
  (`clothes/` is ~138MB, `trash/` is ~3.4MB) — the aggregate number is very likely
  hiding weak classes.

None of this is a criticism of where the project is — it's the map of what "done"
actually requires, written down once so it doesn't have to get rediscovered.

## Architecture

```
┌─────────────────────┐        mock (default)        ┌──────────────────────┐
│   waste-ui (Next.js) │ ─────────────────────────────▶  fake result, ~1.5s  │
│   Scanner component  │                               └──────────────────────┘
│                       │        real (opt-in)         ┌──────────────────────┐
│                       │ ─────────────────────────────▶  FastAPI (localhost)  │
└─────────────────────┘   NEXT_PUBLIC_USE_MOCK=false   │  ResNet-18 TorchScript │
                                                         │  + MongoDB logging    │
                                                         └──────────────────────┘
```

- **Frontend** — a Next.js 15 / TypeScript / Tailwind app in [`waste-ui/`](waste-ui).
  Dark-themed, single-page: hero, drag-and-drop/camera scanner, a live-feeling
  analytics dashboard (Recharts), a "how it works" walkthrough, a waste-category
  breakdown, and a "what's next" section describing the hardware pivot.
- **Backend** — a FastAPI app in [`src/app.py`](src/app.py). Loads a TorchScript
  ResNet-18 checkpoint, accepts an uploaded image, returns a label + confidence, and
  logs the prediction to MongoDB via `motor` ([`src/db.py`](src/db.py)).
- **Model** — trained via transfer learning in [`src/train.py`](src/train.py), using
  a Kaggle waste-classification dataset staged in `data/raw/` and `data/test/`.

## The ML Model

- **Architecture:** ResNet-18, ImageNet-pretrained, final FC layer replaced and
  retrained for 12 waste classes.
- **Training:** 5 epochs, Adam (`lr=1e-3`), batch size 32, 224×224 input,
  ImageNet normalization, 80/20 train/val split via `random_split`.
- **Best checkpoint:** [`models/epoch3_val0.8991.ts`](models/epoch3_val0.8991.ts) —
  89.91% validation accuracy, exported with `torch.jit.script` for
  framework-independent serving.
- **Classes (12):** `battery`, `biological`, `brown-glass`, `cardboard`, `clothes`,
  `green-glass`, `metal`, `paper`, `plastic`, `shoes`, `trash`, `white-glass`.
- **Data source:** [Kaggle Waste Classification Dataset](https://www.kaggle.com/datasets/techsash/waste-classification-data).

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS v4, Recharts, lucide-react |
| Backend | FastAPI, Uvicorn |
| ML | PyTorch, TorchVision (ResNet-18 transfer learning), TorchScript export |
| Data | MongoDB Atlas or local, via Motor (async driver) |
| Hosting | Frontend on Vercel; backend currently local-only |

## Repo Structure

```
RecycLens/
├── src/                     # backend + ML pipeline
│   ├── app.py               # FastAPI app — POST /classify
│   ├── train.py             # ResNet-18 transfer-learning training loop
│   ├── evaluate.py          # aggregate test-set accuracy
│   ├── data.py               # ImageFolder dataloaders
│   ├── split_data.py        # train/test split utility
│   └── db.py                 # MongoDB (motor) connection
├── models/                  # exported TorchScript checkpoints
├── data/
│   ├── raw/                  # training images, one folder per class
│   └── test/                 # held-out test images
├── tests/
│   └── test_api.py          # manual smoke test against a running API
├── waste-ui/                 # Next.js frontend
│   └── src/
│       ├── app/               # routes, layout, global styles/theme tokens
│       ├── components/        # Hero, Scanner, Dashboard, Categories, Roadmap, Nav, Footer
│       └── lib/                # mock classifier, mock analytics, waste category data, API client
├── requirements.txt
└── README.md
```

## Local Setup

**Backend:**

```bash
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# .env
echo "MONGO_URL=your_mongodb_connection_string" > .env

uvicorn src.app:app --reload --host 0.0.0.0 --port 8000
```

The dataset (if retraining) goes in `data/raw/<class-name>/`, downloaded from the
[Kaggle dataset](https://www.kaggle.com/datasets/techsash/waste-classification-data)
above. `python -m src.split_data` carves out a test split; `python -m src.train`
trains and saves the best checkpoint to `models/`.

**Frontend:**

```bash
cd waste-ui
npm install
npm run dev
```

Runs at `http://localhost:3000` in mock mode by default — no backend required to
see the full UI. To point it at a local backend instead, you'd need to first close
the contract gap described in [Current State](#current-state-read-this-first), then
set `NEXT_PUBLIC_USE_MOCK=false` and `NEXT_PUBLIC_API_URL=http://localhost:8000`.

---

## Roadmap

Three workstreams, roughly in the order they unblock each other.

### 1. Model: accuracy, interpretability, and honesty about what it can do

Right now the model is a single accuracy number from a clean Kaggle test split.
That's not enough to trust it in front of a camera on a moving belt, and it's not
enough to make a compelling technical story either. Concretely:

- **Confusion matrix + per-class precision/recall/F1**, not just aggregate accuracy.
  With classes this imbalanced (`clothes` ~138MB of images vs. `trash` ~3.4MB),
  aggregate accuracy is almost certainly masking a few weak classes — likely the
  glass sub-types (`brown`/`green`/`white`) confusing each other, and whichever
  class has the least data.
- **Grad-CAM / class-activation heatmaps** overlaid on sample predictions, per
  class. This does two jobs at once: it's a debugging tool (is the model actually
  looking at the object, or at background/lighting artifacts?), and it's a far
  better demo visual than a confidence percentage — "here's what the model sees"
  reads as substance in a way a progress bar doesn't.
- **Actual data augmentation.** The docs have claimed random crop/flip for a while;
  the code doesn't do it. Fix `src/data.py` before the next training run — it's
  probably free accuracy, especially for the underrepresented classes.
- **Embedding visualization** (t-SNE/UMAP on penultimate-layer features) to see
  which classes actually cluster apart and which overlap — turns "the model is
  confused" into "the model is confused specifically about X vs Y," which is
  what tells you whether the fix is more data, better augmentation, or that two
  classes should just be merged.
- **Track the hardest examples** (highest per-sample loss) to target future data
  collection instead of gathering more data uniformly.

### 2. Hardware: from phone scanner to sorting line

This is a materially different engineering problem from what exists today, not an
extension of it. The differences that actually change the approach:

- **Serving model flips from pull to push.** Today, FastAPI waits for a request and
  answers once. A Jetson Nano runs continuous inference on a camera feed — no HTTP
  round trip per item. That also means **an object appears across multiple
  frames** as it moves down the belt, so you need tracking/debounce logic to trigger
  the diverter exactly once per item, not once per frame.
- **Latency becomes a hard physical deadline, not a UX nicety.** The web app can
  take a second and nobody minds. On a belt, you have exactly as long as it takes
  an item to travel from the camera's field of view to the diverter gate — a number
  set by belt speed, not by you. That likely means benchmarking actual fps on the
  Nano and probably swapping ResNet-18 for something lighter (MobileNetV3, or a
  quantized/pruned model) if it can't hit the frame budget.
- **Export path changes.** TorchScript is fine for a CPU/GPU-agnostic FastAPI
  server; it is not the fast path on a Jetson. Getting real throughput means
  ONNX → TensorRT (FP16, possibly INT8) — a genuinely different export and
  validation step, since quantization can shift per-class accuracy in ways the
  current TorchScript checkpoint has never been tested for.
- **New failure-mode severity.** A wrong label in the web app means a person reads
  bad instructions and can double check. A wrong label on the belt means a physical
  mis-sort — the exact contamination problem this is trying to solve. The current
  API contract has no concept of "uncertain, route to manual review" — that needs
  a confidence threshold and a manual-review fallback path that doesn't exist yet.
- **New I/O surface entirely.** GPIO control for a servo-actuated diverter is new
  code — this is where the LiDAR project's motor-control firmware experience
  actually transfers, but it's still net-new integration work, not a port.
- **Data distribution shift.** Kaggle photos are clean, single-object, studio-lit.
  Belt footage has motion blur, industrial lighting, possibly multiple items in
  frame, dirt and moisture. Expect accuracy to drop hard on first contact with real
  footage — budget real time for filming actual sorting scenarios and retraining
  against them, not just against Kaggle.

### 3. YC-readiness: what's actually missing

Building on the earlier B2B-pivot analysis (recycling facilities lose money to
sorting errors/contamination; a sub-$2K edge-hardware sorter is the wedge against
$500K optical sorters) — the concrete gap between "this repo" and "fundable":

- **A physical prototype demo (even a rough one) outweighs more frontend polish.**
  YC would be funding the hardware thesis, not the web app. A 30-second video of an
  item getting correctly diverted on a real conveyor mock is worth more than any
  further UI work in this repo.
- **One real conversation with a recycling facility** — even an informal one where
  someone says "we'd pay for this" — is worth more than a pitch deck. This is the
  cheapest, highest-signal thing to go do next, and it doesn't require the hardware
  to exist yet.
- **Real numbers, not placeholders.** The pitch currently leans on round numbers
  ($500K optical sorters, sub-$2K solution, "billions" lost to contamination).
  Before pitching this seriously: find a citable source for the industry loss
  figure, and once there's a prototype, get real measurements — accuracy and fps on
  actual belt footage (not the Kaggle test set), and an actual bill-of-materials
  cost for the rig.
- **The current repo is a strong software portfolio piece — it is not yet evidence
  of the hardware thesis.** That's the single biggest gap this roadmap exists to
  close, and it's the frame to hold while prioritizing the two workstreams above:
  anything that doesn't move toward "a camera correctly diverting a real item on a
  real belt" is lower priority right now, however polished it makes the app look.
