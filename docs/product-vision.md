# Product Vision — Ritual

## 1. Vision & Mission

### Vision Statement

A world where the gap between who you are and who you want to be is visible, measurable, and closeable — one daily check-in at a time.

### Mission Statement

Ritual makes the honest truth about your habits impossible to ignore — a single dashboard view that shows, in under three seconds, exactly which routines are running and which are slipping.

### Founder's Why

Dominic has spent eight years building monitoring systems for infrastructure. Dashboards, alerts, metrics, uptime — the entire discipline rests on one principle: you cannot improve what you cannot see. He knows precisely what a Grafana dashboard looks like at 2am when something is wrong. He knows what it feels like when the data is clear and unambiguous and the next action is obvious.

At some point the irony became hard to ignore. The same person who could tell you exactly how many 9s a Kubernetes cluster had achieved last month could not tell you whether he'd gone running more than twice in the past three weeks. The infrastructure was monitored. The person running it was not.

Ritual is the monitoring dashboard for the rest of his life. Not because habits are a DevOps problem — they're not — but because the underlying discipline is identical: measure, visualize, act. The problem with every habit tracker he'd tried wasn't the idea. It was that they required too much trust. They assumed you'd gamify your way into consistency, or spend twenty minutes weekly doing a Notion retrospective, or remember to open the app at the right moment. Ritual assumes none of that. It just shows you the data. What you do with it is your business.

### Core Values

**Clarity over comfort.** Ritual will not soften bad news. If you've broken a fourteen-day streak, Ritual shows you a broken fourteen-day streak. No gentle reframing, no "but you still did great!" It shows what happened. Founders and users can trust the data because the data is never manipulated to protect feelings.

**Speed as a first-class feature.** Every second Ritual adds to a check-in is friction that erodes the habit of using the product. The target is three seconds from app open to complete situational awareness. This is a hard constraint, not a goal. Feature work that compromises this number should be rejected or deferred.

**One job, done completely.** Ritual tracks habits. That's it. It will not become a journal, a goal-setter, a mood tracker, or a social platform. Every feature request gets evaluated against one question: does this make the core job faster, clearer, or more honest? If not, it doesn't belong in this product.

**Ownership and control.** Users' data belongs to users. This isn't just a privacy platitude — it informs product decisions. Ritual should be the kind of app you'd feel comfortable self-hosting, even if you don't. No dark patterns, no engagement optimization, no streak monetization mechanics designed to keep you anxious.

### Strategic Pillars

**Speed to truth.** The product must deliver situational awareness faster than any competitor. This means ruthless UI minimalism, aggressive caching, and a data model designed for read performance on the dashboard query.

**Zero cognitive load at check-in time.** The act of checking in must be effortless. If you're tired, distracted, or in a hurry, the app should be usable. This rules out complex navigation, multi-step flows, or any interaction that requires decision-making during check-in.

**Personal before public.** Version one is built for Dominic. It ships when he'd use it daily without hesitation. Only then does it open to others. This keeps the product honest — there's no pressure to add features that serve an imaginary user while the real user (him) gets a worse product.

**Design as the differentiator.** The minimalist, emoji-driven visual language inspired by streak.kevinchromik.de is a genuine product advantage. Most habit trackers look like enterprise software. Ritual should look like something you'd actually want to open in the morning.

### Success Looks Like

In twelve months, Ritual is Dominic's daily habit-tracking system. He opens it every morning and it takes under five seconds to know where he stands. He's tracked at least three habits consistently for ninety days and can actually point to data showing improvement. The app is deployed publicly, and a few hundred people with similar DevOps-or-technical backgrounds have signed up and use it regularly — not because he marketed it aggressively, but because he shared it once and it resonated. The codebase is clean enough that a new contributor could add a feature in an afternoon. Ritual hasn't tried to become Habitica. It still does exactly one thing.

---

## 2. User Research

### Primary Persona

**Dominic, 32, Senior DevOps Engineer.** He wakes at 7am, checks Slack before getting out of bed (a habit he'd like to break), and runs a medium-sized infrastructure operation at a tech company. His days are interruption-driven. He's technically fluent — he lives in terminals, reads documentation, and builds tools rather than buying them when he has the patience. He's tried Habitica (too gamified, felt like work), Streaks on iOS (good concept, too closed, couldn't see enough data), and a Notion template (spent more time maintaining the template than actually using it). He knows exactly what he wants to change about himself. He just can't see whether he's making progress. The emotional experience is low-grade frustration: not failure, exactly, but a persistent sense that the system isn't working and he doesn't know why. He'd switch to something new immediately if it loaded fast, showed him the truth without ceremony, and let him configure it once without ever having to configure it again.

### Secondary Personas

**The adjacent techie.** A software engineer, data analyst, or product manager who shares Dominic's distaste for gamification and his preference for data over encouragement. They found Ritual through Twitter/X or a tech community post. They're not in a dramatic self-improvement phase — they just want something clean to track their gym days and reading. They'll tolerate a rough launch if the core UX is right and the design doesn't embarrass them.

**The skeptical-but-curious.** Someone who has tried and abandoned multiple habit trackers and is deeply skeptical another one will work. They're drawn to Ritual's stark positioning — "no XP, no quests, just clarity" — because it matches their own frustration. They're a convert waiting to happen, but only if the product actually delivers on its promise in the first three minutes.

### Jobs To Be Done

**Functional:** Know, in under ten seconds every morning, whether I'm on track with my habits. Add a new habit in under thirty seconds. Review my weekly completion rates without having to build a spreadsheet.

**Emotional:** Feel like I'm not lying to myself. Get the calm, slightly uncomfortable satisfaction of seeing the honest truth about my behavior. Avoid the anxiety of "I wonder if I'm still doing the thing."

**Social:** Be the kind of person who actually follows through on things — not to perform it for others, but to feel it internally. (This product is not a social network. The social job is internal, not external.)

### Pain Points

**Ranked by severity:**

1. **Invisibility of failure (critical).** Habits die quietly. You miss a day, miss another, and by the time you notice, it's been three weeks. The pain is that you don't know you've failed until you've fully failed. Ritual solves this by making the current state impossible to miss. This is the core problem.

2. **Check-in friction (high).** Opening a habit tracker app requires a conscious decision. Any friction — loading time, confusing UI, too many steps — and the check-in doesn't happen. This compounds over time. Ritual must minimize friction to sub-five-second check-ins.

3. **Broken trust in the data (medium).** Many apps use engagement mechanics that distort the truth: freeze streak features, partial credit, "recovery" mechanics. These break the fundamental relationship between user and data. Once a user suspects the app is softening the data, the data becomes useless. Ritual's strict honesty is a feature, not a limitation.

4. **Feature overload (medium).** Most habit trackers eventually add social features, journals, mood tracking, or AI coaching. These additions make the product feel heavier and the core use case harder to reach. The pain isn't these features themselves — it's that they're in the way.

5. **Loss of ownership (low-medium).** App disappears, changes pricing, gets acquired. Data is trapped or lost. For a personal productivity tool, this is a persistent low-level anxiety. Ritual's architecture (exportable data, clean schema) should make data migration trivial.

### Current Alternatives & Competitive Landscape

**Streaks (iOS):** Strong visual design, streak-focused, genuinely good core UX. Weaknesses: iOS-only (no web), closed ecosystem, limited analytics. Relevant because this is the closest thing to what Ritual wants to be. Switching from Streaks requires accepting a web-first experience, which is a real tradeoff for mobile-first users.

**Habitica:** Gamified habit tracking with RPG mechanics. Strong community, unique approach. Weaknesses: the gamification is the entire point, which is exactly what Ritual's target user dislikes. Not a direct competitor — they're solving a different emotional job.

**Notion/Spreadsheets:** Maximum flexibility, zero dedicated UX. Strong among power users who want control. Weakness: too slow for daily check-ins, requires ongoing maintenance, no visual streak representation. Users who switch from Notion to Ritual are trading flexibility for speed — that's a good trade for this persona.

**Doing nothing / mental tracking:** A surprisingly common alternative. The user just tries to remember. Works for very short streaks, fails completely over weeks. No switching cost — Ritual just needs to be fast enough to be worth opening.

**Loop Habit Tracker (Android, open-source):** Clean, data-focused, no gamification. Closest philosophical match to Ritual. Weaknesses: Android-only, older design, no web access. A meaningful benchmark for what Ritual should feel like.

### Key Assumptions to Validate

1. **"I will use this app every morning."** The entire value prop rests on daily habit. Validate: After launch, track whether Dominic actually opens Ritual daily for 30 consecutive days. If not, diagnose the friction.

2. **"Three seconds is fast enough."** The magic moment assumes that sub-five-second dashboard load is achievable and meaningful. Validate: Measure actual time-to-interactive on a deployed instance. Test on a slow connection.

3. **"Others will want this too."** The public launch assumption. Validate: Share the app in one technical community (e.g. a Hacker News "Show HN" post). If 50+ people sign up, the assumption holds. If 5 do, the appeal is more niche than expected.

4. **"No gamification is a selling point."** This is the main differentiation claim. It could be wrong — gamification might work better for more people than expected. Validate: Look at conversion rates for users who try Ritual and return daily vs. those who don't. Survey: do users cite the clean/honest UX as the reason they stayed?

5. **"Web-first is acceptable."** The primary use case is a morning ritual — which often happens on a phone. A web app on mobile is meaningfully worse than a native app. Validate: What percentage of Dominic's own check-ins happen on desktop vs. mobile? If >50% mobile, fast-track the React Native port.

6. **"The design reference (streak.kevinchromik.de style) resonates with the target audience."** It resonates with Dominic. Others may want something different. Validate: Share a design mockup before launch. Observe reactions.

7. **"A free model is sustainable for Dominic's motivation."** Free tools often get deprioritized by their builders. Validate: After six months, is Dominic still maintaining and improving Ritual? If motivation is lagging, consider a donation or "pay what you want" model to create skin in the game.

### User Journey Map

**Awareness:** Dominic sees a tweet or HN post: "Built my own habit tracker because nothing else was honest enough." He recognizes himself in the description. He clicks because he's curious and mildly skeptical.

**Consideration:** He lands on a simple marketing page. No long copy — just the product screenshot, the core promise ("your habits, in three seconds"), and a sign-up button. He spends less than a minute before deciding to try it. The low-friction sign-up is critical here. If email verification adds a step, some will bounce.

**First use:** He signs in with email. He's taken to an empty dashboard. The empty state is clear: "No habits yet. Add your first one." He adds "Running" with a 🏃 emoji. He adds "Reading" with a 📚 emoji. He completes today's check-in for both. The streak counter shows "Day 1." He closes the app.

**Return visit (Day 2):** He opens the app the next morning. His two habits are there. He checks them off. It takes four seconds. He notices the streak counter is now "Day 2." This is a small but genuine positive signal. The loop is established.

**Magic moment (Day 7–14):** He's built a real streak. He opens the dashboard and sees: Running 🏃 12 days ✓, Reading 📚 12 days ✓, Cold shower ❄️ 4 days ✓. It's all there, instant, clear. He doesn't want to break the chains. This is the moment the product becomes a habit itself.

**Habit formation:** By Week 4, opening Ritual is itself a morning ritual. He's added and removed habits as his real-life routines have shifted. He's used the stats view to notice that his reading consistency is much higher on weekdays than weekends — a genuine insight he acts on.

**Advocacy:** He builds it well enough, the design is sharp enough, that he mentions it in a reply to someone asking about habit trackers. A few people sign up.

---

## 3. Product Strategy

### Product Principles

**Fast by default.** Every UI decision should ask: "Does this add time to the check-in?" If yes, it needs a very strong justification. Loading states should be skeleton-based and sub-100ms. Navigation should be minimal. The dashboard is the default view, always.

**Honest by design.** Ritual does not have a "freeze streak" feature. It does not have partial credit. It does not have recovery mechanics that soften the impact of a missed day. If you missed a day, your streak is zero. This is a product principle, not a missing feature. The moment Ritual starts negotiating with reality is the moment it becomes useless.

**Minimal by intention.** Features are not added because they're good ideas. They're added because removing them would make the product worse for Dominic. This is a high bar. Most feature ideas, including good ones, should be deferred.

**Data is yours.** The data model should support export at any time. The UI should make export obvious and easy. This isn't a legal/compliance thing — it's a trust thing. A user who knows they can leave whenever they want is more likely to stay.

**Responsive from day one.** Even though the primary launch is web-first, the layout must work on mobile from the start. The mobile web experience is a meaningful part of the value proposition — morning check-ins often happen on a phone. A desktop-only web app fails half the use cases.

**Design as product, not decoration.** The visual language — minimal, emoji-driven, streak-focused — is load-bearing. It is what makes Ritual feel different from Notion and better than a spreadsheet. The design system must be established before the first feature is built, not retrofitted afterward.

### Market Differentiation

The habit tracker market is large and crowded, but most products fall into two categories: gamified apps that turn habit tracking into a hobby (Habitica, Finch), and productivity tools that treat habits as one feature among many (Notion, Todoist). There's a thin middle ground — clean, data-focused apps like Streaks or Loop — that do the core job well but remain either platform-restricted (iOS only) or visually dated.

Ritual competes in that middle ground, but with a sharper point of view: the core value proposition is instant situational awareness, not streak maintenance. The distinction matters. Streak apps want you to build the longest possible streak. Ritual wants you to see the truth about your habits — whether that's a 30-day streak or a brutal zero. The visual language, the copy, and the data model all serve this end. There's no streak-freeze, no gentle encouragement, no gamification layer. Just the data.

For the specific user Ritual is built for — the technically-minded person who applies systems-thinking to their own behavior — this is the natural fit. They don't want a motivational app. They want a monitoring dashboard.

### Magic Moment Design

The magic moment: **Open the dashboard → see all habits with streak status → know your situation in under three seconds.**

For this to happen reliably:

1. **The dashboard must load fast.** Convex's reactive queries mean the dashboard data is pre-subscribed — the UI renders with data already present, not after a loading spinner. This is the architectural decision that makes the three-second target achievable.

2. **The dashboard must be scannable.** Habits are displayed as cards with: emoji icon, habit name, streak count, today's check-in status. Color coding: green for completed today, neutral for not yet completed, red/dimmed for broken streak. The user's eye moves across the row in under a second per habit.

3. **The dashboard must be the default view.** No intermediate screens, no onboarding nudges after Day 1. The first thing a returning user sees is their habits.

4. **The check-in must be one tap.** Completing a habit is a single interaction — tap the card, or tap a checkbox. No confirmation dialogs, no "great job!" interstitials. The completion registers, the streak counter updates, the user is done.

The magic moment is achievable in the MVP. The architecture supports it. The UI must be designed around it from the start.

### MVP Definition

**In Scope (v1 — buildable in 4–6 weeks):**

- **Habit management (CRUD):** Create a habit with name, emoji, and optional category. Edit or delete existing habits. No limits on habit count. *Essential because the product doesn't exist without it.*

- **Daily check-in:** Mark a habit as complete for today. Check-in resets at midnight local time. One check-in per day per habit (no "undo" in v1). *Essential because this is the core user action.*

- **Streak tracking:** Calculate and display the current streak for each habit (consecutive days with a check-in). Break the streak if a day is missed — no forgiveness mechanics. Display the all-time best streak per habit. *Essential because streaks are the primary motivational signal.*

- **Dashboard view:** All habits visible on one screen. Today's completion status. Current streak. Habit emoji/icon. Fast load — data should be visible within one second of app open for returning users. *Essential because this is the magic moment.*

- **Weekly statistics view:** Completion rate per habit over the past 7 and 30 days. Visual streak representation (contribution-graph-style calendar). Best streak. *Essential because this is where the honest truth lives — are you actually improving?*

- **Authentication:** Email/password sign-in via Convex Auth. No social login in v1 (scope risk). *Essential because the app needs to know whose data it's showing.*

- **Onboarding:** Minimal — after sign-in, empty dashboard with clear call-to-action to add first habit. No wizard, no guided tour, no permission prompts. *Essential because a confused first-time user is a lost user.*

### Explicitly Out of Scope

**Social features (shares, following, leaderboards):** Tempting because it seems like a growth lever. Deferred because it fundamentally changes the product's privacy model and trust relationship with data. Reconsider at v3 if there's explicit user demand.

**Reminders and notifications:** High-value for retention, but complex to implement correctly across platforms (push notifications on web are inconsistent, especially mobile). Deferred to v1.5. Web push notifications are the right approach when this is built.

**Habit templates / pre-built libraries:** Nice UX shortcut for new users. Low value for Dominic personally — he knows what habits he wants. Deferred to v2.

**Calendar integration (sync with Google Calendar, etc.):** Out of scope permanently unless there's an extremely compelling use case. Habits are not appointments.

**"Habit stacking" or dependency features:** Complex data model with limited proven value. Deferred indefinitely.

**Mobile native app (iOS/Android):** The target architecture (Next.js + Convex) is web-first. A React Native port is technically feasible but represents a separate workstream. Deferred to v2 or a dedicated sprint after v1 is stable.

**Streak-freeze / recovery mechanics:** Deliberately excluded. This is a product principle, not a deferred feature.

### Feature Priority (MoSCoW)

**Must Have (MVP):**
- Habit CRUD (create, edit, delete)
- Daily check-in (one tap per habit per day)
- Streak tracking (current streak, best streak, break on missed day)
- Dashboard view (all habits, today's status, current streak)
- Weekly/monthly statistics view
- Email/password authentication
- Minimal onboarding

**Should Have (v1.5):**
- Web push notifications / reminders
- Data export (CSV or JSON)
- Dark mode
- Habit archiving (hide without deleting)

**Could Have (v2):**
- React Native / Expo mobile app
- Habit templates
- Multiple check-ins per day (for habits like "drink 8 glasses of water")
- Custom streak reset time (not always midnight)

**Won't Have (this time):**
- Social features
- AI coaching or insight generation
- Calendar sync
- Gamification mechanics
- Streak freeze or recovery

### Core User Flows

**Flow 1: First-time habit creation**
Trigger: User completes sign-in and sees empty dashboard.
Steps: 1. Click "Add habit" CTA → 2. Type habit name → 3. Select emoji from picker → 4. Select category (optional) → 5. Save.
Outcome: New habit appears on dashboard with streak = 0, today's check-in available.
Success criteria: Flow completable in under 30 seconds, no page reload.

**Flow 2: Morning check-in**
Trigger: User opens app in the morning.
Steps: 1. See dashboard → 2. Tap each habit card or checkbox → 3. Habit shows as completed.
Outcome: All completed habits show green status. Streak counters updated.
Success criteria: Completing three habits takes under 10 seconds. No navigation required.

**Flow 3: Weekly review**
Trigger: User wants to understand their patterns.
Steps: 1. Navigate to stats view → 2. See completion rates and contribution graph for all habits → 3. Identify weakest habit.
Outcome: User has actionable information about which habits need attention.
Success criteria: The worst-performing habit is visually obvious within 5 seconds of opening the stats view.

### Success Metrics

**Primary metric:** Daily Active Usage — does Dominic open Ritual and complete at least one check-in on at least 20 of every 30 days?

**Secondary metrics:**
- Time-to-first-check-in for new users (target: < 60 seconds from sign-up)
- Dashboard load time for returning users (target: < 1s to visible data)
- 30-day retention (target: > 50% of new users still active after 30 days)

**Leading indicators:**
- Streak count for primary habits (rising = product is working)
- Time spent in app (target: low — 30-60 seconds daily; high time = friction)

**Good vs. great thresholds:**
- Good: Dominic uses Ritual 15+ days per month. Great: 25+ days per month.
- Good: Dashboard loads in under 2 seconds. Great: under 1 second on first visit.
- Good: 30% of new users return after 30 days. Great: 50%.

### Risks

1. **The mobile UX is bad.** The web app on mobile is the primary use case for morning check-ins but the hardest to get right. Risk: high likelihood, high impact. Mitigation: Mobile-first responsive design from Day 1. Test on iPhone Safari and Android Chrome before launch.

2. **Streak-based motivation doesn't work for Dominic.** The entire product model rests on streaks as the motivational signal. If Dominic uses the product for two weeks and finds the streaks don't actually change his behavior, the core hypothesis is wrong. Risk: medium likelihood, existential impact. Mitigation: Build fast, use personally, be honest about whether it's working.

3. **Convex has unexpected limitations.** Convex is powerful but opinionated. There may be edge cases — timezone handling, offline behavior, complex queries — that require workarounds. Risk: medium likelihood, medium impact. Mitigation: Validate Convex's timezone handling early (critical for streak resets). Prototype the core data model before building UI.

4. **The project stalls as a side project.** Slow progress, competing priorities, loss of motivation. Risk: medium likelihood, high impact. Mitigation: Keep v1 scope ruthlessly small. Ship something usable to Dominic personally within 4 weeks. A working personal tool is more motivating than a half-finished feature list.

5. **Design doesn't hold up.** The visual language inspired by streak.kevinchromik.de is referenced but not yet designed for Ritual. If the design system isn't established early, the app ends up looking like a generic Next.js CRUD app. Risk: medium likelihood, medium impact. Mitigation: Run `/plaid design` before any UI work begins. Lock in the design tokens first.

6. **Timezone edge cases break streaks.** Midnight resets sound simple but become complex with users in different timezones, travel, DST changes. Risk: medium likelihood, high annoyance. Mitigation: Store all check-ins in UTC with user timezone attached. Calculate streak client-side in local time.

7. **The free model removes financial incentive to maintain the product.** Without revenue, the motivation to keep improving Ritual may fade after initial launch excitement. Risk: low-medium likelihood, high long-term impact. Mitigation: Keep infrastructure costs near zero (Convex free tier, Vercel hobby tier). Consider a voluntary "buy me a coffee" option at public launch.

---

## 4. Brand Strategy

### Positioning Statement

For the technically-minded person who wants to build lasting habits but finds gamified apps patronizing and productivity suites too heavy, Ritual is the habit tracker that shows you the honest truth about your routines. Unlike apps that soften bad data with gamification mechanics and recovery features, Ritual treats you like an adult who can handle the facts.

### Brand Personality

If Ritual were a person, they'd be the friend who's a doctor — the one you call when you actually want to know what's wrong, not when you want to be reassured. They don't have bedside manner. They give you the results, explain what they mean, and let you decide what to do. They're not cold — they care, but they express it through accuracy, not warmth. They'd never send you a push notification saying "you're doing great!" when you're clearly not. They'd tell you you've missed three check-ins and ask if you want to talk about it. They'd listen, then show you a chart.

Visually and tonally, Ritual is a tool that respects your intelligence. It doesn't congratulate you for using it. It doesn't make you feel bad for skipping a day. It shows you what happened. Clean sans-serif type. Data ink over decorative ink. Emoji as function, not as charm.

### Voice & Tone Guide

**The voice is constant:** precise, direct, factual, respectful of the user's intelligence.

**The tone shifts by context:**

| Context | Tone | DO | DON'T |
|---|---|---|---|
| Empty state | Inviting, minimal | "No habits yet. Add your first one." | "Your habit journey starts here! 🌱 Let's go!" |
| Streak broken | Factual, no drama | "5-day streak ended. Today is a new start." | "Oh no! Don't break the chain! You can do it! 💪" |
| All habits complete | Quiet satisfaction | "All habits complete today." | "Amazing work! You crushed it today! 🎉" |
| Error state | Clear, actionable | "Couldn't save. Check your connection and try again." | "Oops! Something went wrong. Please try again later!" |
| Onboarding | Direct, minimal | "Add your first habit to get started." | "Welcome to Ritual! We're so excited to help you on your journey to being your best self." |

### Messaging Framework

**Tagline:** The honest truth about your habits.

**Homepage headline:** Your habits. Three seconds. Every morning.

**Value propositions:**
1. *Instant clarity* — Open the dashboard, know exactly where you stand. No digging, no loading, no ceremony.
2. *Brutal honesty* — No streak-freeze, no partial credit, no gentle reframing. If you missed a day, you missed a day.
3. *Zero overhead* — One tap per habit per day. Nothing to configure, nothing to maintain, no system to manage.

**Objection handlers:**
- *"I've tried habit trackers before and they didn't stick."* → Most habit trackers add friction or incentivize engagement over honesty. Ritual is designed for speed and clarity, not retention metrics.
- *"Why not just use a spreadsheet?"* → You could. But you won't open a spreadsheet every morning. Ritual takes three seconds.
- *"Why build your own when X exists?"* → Because no existing tool matched exactly this philosophy. Now it does.

### Elevator Pitches

**5 seconds:** Ritual shows you the honest truth about your habits in under three seconds, every morning.

**30 seconds:** Most habit trackers either gamify your behavior or require too much maintenance. Ritual does one thing: shows you, in a single dashboard view, which habits are running and which are slipping — no XP, no journal, no nudges. Open it in the morning, see the truth, close it, live your life.

**2 minutes:** I build monitoring systems for a living. Dashboards, alerts, uptime metrics — the whole discipline rests on one idea: you can't improve what you can't see. I applied that to my own habits and realized I was basically flying blind. I'd started and stopped a dozen trackers. Habitica was too much like a game, Notion templates required maintenance, Streaks was iOS-only and I wanted web access. So I built Ritual. It's a habit tracker that looks like a monitoring dashboard and thinks like one too: fast, data-first, no softening. Open it, see your streaks, tap your check-ins, done. It's free, it's web-first with mobile web support, and I'm opening it to others because I assume I'm not the only person who thinks about their own behavior like infrastructure.

### Competitive Differentiation Narrative

The habit tracking market can be sorted into two buckets: apps that motivate through gamification and social pressure, and apps that are productivity tools with habit tracking tacked on. The first category has Habitica as its most honest expression — full RPG mechanics, community quests, the whole thing. The second category is every Notion template and Todoist integration that exists. Both approaches share a flaw: they prioritize engagement and flexibility over honest signal.

The underserved position is the technically-minded user who wants neither. They don't want to fight a dragon to prove they went to the gym. They don't want to spend Sunday maintaining a database. They want to look at a screen for three seconds and know whether their habits are working. Ritual occupies this position with intention: data-forward design, no gamification mechanics, aggressive minimalism, and an honesty policy that makes the data trustworthy. It's closer in spirit to a monitoring dashboard than to a game, and for a specific user, that's exactly the right frame.

---

## 5. Visual Design

Visual design tokens (colors, typography, spacing, components, motion) live in `docs/design.md`. That file does not yet exist. Run `/plaid design` with image references — use streak.kevinchromik.de as the primary style reference — to generate it before any UI work begins.

The design system should reflect the brand personality above: precise, minimal, emoji-forward, streak-focused. The contribution-graph-style streak visualization and emoji habit icons are load-bearing design elements that must be established in the design system, not improvised during implementation.
