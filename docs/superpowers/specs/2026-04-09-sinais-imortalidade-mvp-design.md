# Sinais de Imortalidade — MVP Design

Date: 2026-04-09
Project: Sinais de Imortalidade
Status: Approved in brainstorming

## 1. Product thesis

Sinais de Imortalidade is an editorial product about immortality, longevity, biotechnology, and the technological end of mortality.

The MVP focuses on the concrete product: an AI-native editorial site with two content formats:
- **Sinais** — short, high-frequency, factual signal posts
- **Análises** — deeper, structured, argumentative editorial pieces

The larger Blog Engine vision is explicitly out of scope for the MVP, but the architecture should not block future expansion.

## 2. MVP goal

The MVP must prove that an AI-native editorial operation can:
- maintain exceptional signal curation
- produce well-grounded analyses
- operate with high factual reliability
- begin building owned audience through the website and newsletter

Primary success indicators:
- analyses are consistently well-founded and valuable
- signal curation is strong enough that important developments are not missed
- editorial quality wins over blind automation or channel expansion

## 3. Core editorial principles

If there is any trade-off:
1. **Editorial quality wins** over full autonomy
2. **Editorial quality wins** over multichannel expansion
3. **Factual reliability wins** over speed

The biggest risk is factual error or weak interpretation. The system must therefore favor:
- traceability
- clear sourcing
- evidence-backed claims
- cautious interpretation

## 4. Audience

Primary audience:
- people already interested in longevity, biotech, and adjacent future-facing science

Secondary audience:
- curious aspirational readers who are fascinated by the topic but may not yet have deep domain knowledge

Editorial density:
- **Sinais** should be accessible and quick to understand
- **Análises** should be denser, deeper, and more interpretive

## 5. Channel scope

### In scope
- **Website**
- **Newsletter**

### Out of scope for MVP
- Telegram
- X/Twitter
- YouTube
- Spotify/podcast
- Instagram
- TikTok

Future direction to preserve structurally:
- likely first expansion channel: **X/Twitter**
- later possible expansion: **Spotify/podcast with synthetic voice**

## 6. Content model

### 6.1 Sinais

Purpose:
- capture what matters now
- provide short, rigorous editorial updates
- maintain daily pulse and freshness on the homepage

Target cadence:
- **5–6 signals per day**
- published in **a few windows throughout the day**

Signal structure:
- what happened
- why it matters
- source

Signal characteristics:
- short
- factual
- individual URLs
- optimized for permalink, search, sharing, related content, and archive value

### 6.2 Análises

Purpose:
- provide deeper interpretation
- build authority and originality
- become the strongest differentiator of the publication

Target cadence:
- **2 analyses per week**

Analysis characteristics:
- argumentative and structured
- based on accumulated context, not just a single news item
- include a small set of reusable editorial blocks
- use consistent visual treatment
- remain highlighted on the homepage longer than signals

Analyses are not simply “successful signals expanded.” They are a separate editorial format that may reference signals but should follow their own thematic logic.

## 7. Homepage and UX

The homepage must be **signal-first**, while still giving analyses a persistent premium position.

### Homepage priorities
- emphasize what is new now
- make signal discovery feel alive and current
- maintain strong visibility for 1–2 analyses
- support newsletter capture without making it the primary first impression

### Recommended homepage structure
- one main signal highlight near the top
- additional recent signals presented in a scan-friendly format
- a persistent featured analyses section
- short manifesto section below core content
- newsletter signup as an important secondary CTA
- strong footer with navigation and context

### CTA hierarchy
- **Primary CTA:** open the featured analysis
- **Secondary CTA:** explore recent content / signals
- **Secondary but important:** newsletter signup

### Responsive requirement
The MVP must work well on both **mobile and desktop**. This is mandatory.

## 8. Reading experiences

### Signal page
Each signal should have its own page with:
- title
- short summary of what happened
- why it matters
- source
- subtheme and tags
- related content
- newsletter CTA

### Analysis page
Each analysis page should support:
- comfortable long-form reading
- clear hierarchy
- editorial block variations
- related content
- consistent visual identity
- strong mobile readability

## 9. Discovery and information architecture

The archive should be organized primarily by **chronology**, with complementary access paths.

### Discovery methods in MVP
- chronology
- subtheme filters
- content type separation (Sinais vs Análises)
- full-text search
- related content

### Search requirement
Search should cover:
- title
- summary/excerpt
- body content

No advanced filtering system is required for MVP.

### Taxonomy
- one central thesis: immortality / end of mortality through technology
- six fixed **subthemes** organize the editorial universe
- tags add flexible detail

Subtheme-dedicated landing pages are out of scope for MVP. Filters are sufficient.

## 10. Newsletter

Newsletter is in scope as light audience capture and retention, not direct monetization.

### Newsletter strategy
- email-based newsletter signup from day one
- **2 sends per week**
- curated digest format
- mix of signals and analyses, with **emphasis on signals**

### Newsletter role
- build owned audience
- turn site discovery into subscriber retention
- create future monetization leverage without charging yet

## 11. Transparency about AI

AI use should be **present but not overemphasized**.

Recommended approach:
- explain the AI-native editorial process in institutional pages
- emphasize quality, methodology, and curation rather than “AI-generated” branding
- do not place loud AI disclaimers on every content page in the MVP

Best locations for transparency:
- About / Manifesto
- Metodologia

## 12. Institutional pages

Minimum institutional surface for MVP:
- Homepage
- Signal page
- Analysis page
- Search/results page
- About / Manifesto page
- Metodologia page

### About / Manifesto
Purpose:
- explain the editorial thesis
- frame why the publication exists
- establish identity and ambition

### Metodologia
Purpose:
- explain how topics are chosen
- explain source standards
- explain review and fact-checking
- explain the role of AI in the process
- build reader trust

Recommended page name: **Metodologia**

## 13. Publishing architecture

### Recommended stack
- **Next.js**
- **static-first approach**
- simple deployment, likely on **Vercel**

Rationale:
- enough simplicity for MVP publishing speed
- enough flexibility for future expansion
- avoids early migration pressure that a narrower blog-only stack might create

### Out of scope in initial architecture
- CMS
- database as primary content source
- admin panel
- authentication
- backoffice complexity

## 14. Content storage model

### Published content
Published site content should live in **structured files in the repository**.

This enables:
- reliable agent publication
- Git versioning
- simple deploy flow
- low operational friction

The human editor should not need to manually write Markdown for the system to work.

### Obsidian role
Obsidian is **not** the website publishing source.

Obsidian is the source of truth for:
- product decisions
- invariants
- future ideas
- editorial memory
- analysis research backlog
- research notes and context

In short:
- **Obsidian = memory and research**
- **repo = publication**

## 15. Analysis pipeline

Analyses should emerge from a **living editorial queue**, not from a simple linear queue.

### Research model
The agent should:
- identify promising themes
- create and update research threads
- accumulate notes, sources, and context over time
- keep multiple analysis candidates alive simultaneously
- rank them continuously

### Promotion logic
A topic should move from research toward draft based on a **composite score**, not on first-in-first-out order.

The score should measure:
- editorial relevance to the site thesis
- factual readiness / source strength
- novelty relative to what has already been written

Factual readiness is especially important.

### Minimal statuses for analyses
- research
- draft
- review
- published

Score is metadata, not its own status.

## 16. Signal pipeline

Signals can use a more ephemeral workflow than analyses, but they still require curation.

### Requirements
- anti-duplication checks
- factual checking
- light editorial review
- ability to hold items that raise concern

### Anti-repetition rule
The system should not use a short memory window only. It should maintain long-term editorial memory.

A new signal may publish if it adds:
- a meaningful development
- a new angle
- a relevant update to an ongoing story

A repeated headline with no meaningful addition should not publish.

When appropriate, a new signal may reference the earlier related one.

## 17. Editorial memory

Editorial memory is a central part of the product.

It should help the system know:
- what has already been published
- what is already in draft
- what is too similar to recent or historical content
- when an item is a duplicate versus a real update

This memory should live primarily in Obsidian for research and internal tracking.

## 18. AI-native editorial capabilities

The MVP should be designed around a set of editorial capabilities rather than hard-coding a specific runtime model.

Core capabilities:
1. Research / scouting
2. Editorial memory
3. Ranking / scoring
4. Writing
5. Fact-check
6. Editorial review
7. Publishing

These may later be implemented as:
- skills
- prompt modules
- pipelines
- or separate agents where supported

## 19. Manual editorial asset

A **versioned editorial manual for the agent** is a core MVP asset.

It should define:
- core thesis
- accepted subthemes
- tone and style
- relevance rules
- source standards
- quality bar
- balance across subthemes
- what not to publish

This manual applies to both signals and analyses.

## 20. Quality control rules

### Mandatory checks for all content
Every content item should pass through:
- **fact-check**
- **editorial review**

For signals this can be lighter.
For analyses this must be deeper.

### Fact-check authority model
The fact-checker should not be the autonomous final decision-maker in MVP.

Instead, it should:
- signal risk
- classify issues by severity
- trigger human attention when necessary

For signals:
- if a meaningful alert appears, the signal should be held and Henrique should be alerted

For analyses:
- fact-check output feeds human approval and final decision

### Analysis review model
Analyses should be produced almost fully by the agent, but initially require Henrique’s review before publication.

Henrique’s review checks:
- factual rigor
- editorial quality
- adherence to the project thesis

## 21. Images and visual treatment

### Signals
- images are **not required** for every signal
- a standout signal may receive special visual treatment when justified

### Analyses
- analyses should have consistent visual treatment
- visuals should ideally be generated in a controlled way or built from a reusable editorial system

The MVP should avoid depending on externally sourced imagery without clear licensing.

## 22. Interaction scope

In scope:
- reading
- newsletter signup
- simple content sharing

Out of scope:
- comments
- user accounts
- favorites
- complex reactions

## 23. Monetization

Direct monetization is **out of scope** for MVP.

In scope:
- light audience capture
- newsletter subscriber growth
- future monetization readiness

No paid newsletter, ads, or SaaS monetization should be part of the first release.

## 24. Explicitly out of scope

- multichannel publishing
- Blog Engine multi-tenant productization
- dashboards and advanced backoffice tools
- direct monetization
- subtheme landing pages
- custom art direction per article
- immortality clock / forecast feature

## 25. Future ideas to preserve in product memory

These should be preserved in Obsidian as future directions:
- X/Twitter as first likely expansion channel
- Spotify/podcast generated from the editorial operation
- immortality forecast / “clock” that updates as research evolves
- stronger cross-channel promotion fed by site content
- eventual evolution toward a broader Blog Engine concept

## 26. Recommended MVP framing

The recommended MVP is:

**A signal-first editorial website with AI-native operations behind the scenes, strong factual safeguards, deep analysis, and a publication model simple enough to launch quickly but structured enough to expand later.**
