# RentReadyCheck: plan to attract relevant visitors

Prepared 6 October 2026. Start with free methods; allow roughly 5–7 hours a week for the first month. The audience is US first-time renters, hourly workers, and roommates preparing to apply for an apartment. Recommendations below are experiments, not traffic forecasts.

## What the audit establishes

- All 30 URLs in the live sitemap return HTTP 200, have canonical URLs pointing to themselves, and have no page-level `noindex` directive. Sampled responses also have no `X-Robots-Tag` header blocking indexing. These checks do not establish Google's indexing status.
- The live robots.txt allows crawling and identifies a working sitemap with 30 URLs. Having a sitemap does not establish that Google has indexed those pages.
- Exact domain and `site:rentreadycheck.com` searches in the available search tool returned no results. This is a weak-visibility signal, not proof of Google exclusion. Search Console is the authoritative next check.
- The homepage title and heading lead with “Rent Readiness Score.” That can be a useful product feature, but its search demand has not been established. Several other pages already answer concrete income and rent questions.
- The main US affordability calculator is at `/rent-referencing-calculator/`; roommate and co-signer tools also retain UK vocabulary in their URLs. Their visible content uses US terms. This inconsistency is worth cleaning up, but there is no evidence it is the principal cause of zero visitors.
- `/us-rent-affordability-calculator/` is currently an explanatory guide linking to the main calculator. Its title accurately describes that role; avoid creating a second competing copy of the same calculator.
- Vercel Analytics and some calculator result events are present in the source. Production collection and the dashboard's date range have not been verified. Missing analytics strings in initial HTML do not establish a problem with client-side tracking.
- The About page describes the tools but does not identify their creator. The rent-amount pages mostly reuse one template; the salary and hourly-pay pages offer more developed examples.

## Priority 1: establish search visibility and a trustworthy baseline

Do this before spending time on a large content expansion.

1. Open or create the Google Search Console property for `rentreadycheck.com`, verify ownership if necessary, and submit `https://rentreadycheck.com/sitemap.xml`.
2. Inspect the homepage, main affordability calculator, rent split calculator, move-in calculator, and the $50,000 and $20/hour pages. Record whether Google knows each URL, whether it is indexed, and Google's selected canonical. Request indexing of important new or changed pages where appropriate.
3. Resolve the specific issues reported. If pages are discovered but not indexed, assess their usefulness, internal links, and differentiation rather than repeatedly requesting indexing.
4. In Vercel, confirm the production project, domain, and date range. Generate a controlled visit and calculator interaction from a browser without blocking extensions, then confirm collection. Keep this test out of the growth baseline.
5. Record weekly Google impressions, clicks, top queries, landing pages, visitors, and visitors who actively use a calculator.

Google says sitemap submission helps discovery and crawl requests do not guarantee indexing; crawling can take days to weeks. [Google's crawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). Use [URL inspection and indexing guidance](https://support.google.com/webmasters/answer/10264824?hl=en) and the [Search Console performance report](https://support.google.com/webmasters/answer/10268906?hl=en).

## Priority 2: promote three useful tools immediately

Begin with affordability, move-in costs, and fair roommate rent splitting. Send people to the tool relevant to their question. These provide clear reasons to visit without requiring people to know the brand or understand the score.

### Helpful community participation

Find active discussions about first apartments, moving out, and unequal roommate incomes in relevant Reddit communities and local or student housing groups. Read each community's current rules before participating. Give a complete useful answer; when links are permitted and relevant, disclose that you built the calculator and link to the specific tool. Where links are not permitted, contribute the answer without a promotional link.

Draft structure:

> There are two separate things to estimate here: the landlord's income requirement and the cash needed before move-in. You can compare the requirement in the listing with your gross income, then list the deposit, first month's rent, moving costs, and utilities. I built RentReadyCheck, which has a free move-in cost calculator if a tool would help: [link]. It doesn't predict application approval.

Adapt this to the actual question. Aim for three useful contributions per week; judge the channel by relevant visits and tool usage.

### Partnerships with people who already help renters

Build a list of 20 suitable organizations: university off-campus housing teams, financial coaching services, renter education nonprofits, and small housing newsletters. Contact five per week with one tool matched to their audience. Offer a resource for a real need, such as comparing roommate rent splits or planning upfront moving costs.

One verified prospect for evaluation is [Temple University's off-campus living team](https://studentaffairs.temple.edu/living-temple/campus-housing), which helps students make housing decisions. This is a prospect, not a relationship or endorsement. Student audiences may find rent splitting and move-in costs more useful than employment-income checks.

Draft message, to personalize before sending:

> Subject: Free rent planning tool for your off-campus housing resources
>
> Hello [name], I created RentReadyCheck, a free US renter planning site. I saw your [specific resource] and thought the [rent split / move-in cost] calculator might help students [specific task]. It requires no account and gives an estimate with its assumptions explained. Would you consider reviewing it for your resources? [direct tool link]

No messages have been sent. Measure replies, actual resource placements, and referral visitors. A useful resource placement can bring visitors even if it does not change search rankings.

### Short demonstrations

Publish two brief demonstrations per week on a social channel you can maintain. Each should solve one task and end with the relevant tool's link where the platform supports it. Example topics:

- Comparing the 3x income check with the 30% housing-cost budgeting guideline.
- Splitting rent when roommates have different incomes.
- Listing the cash costs that occur before moving into an apartment.
- Changing weekly hours in the existing $20/hour calculator.

Use clearly labeled hypothetical examples. Test topics and calls to action; track site visits rather than video views alone. Repurpose the same demonstration across channels only where it fits.

## Priority 3: strengthen search pages around specific renter questions

Start by improving existing pages. Candidate queries below are hypotheses based on the site's tools and observed search results; search volume and ranking difficulty have not been measured.

| Visitor's question | Existing destination | Improvement to test |
| --- | --- | --- |
| How much income do I need for $1,500 rent? | `/how-much-income-to-rent-1500/` | Put a concise numerical answer first, add monthly and annual figures, and include a calculator with the rent prefilled directly on the page. |
| How much rent can I afford making $20 an hour? | `/how-much-rent-can-i-afford-making-20-an-hour/` | Promote the existing full-time and part-time comparisons; improve it using queries Search Console actually reports. |
| How much rent can I afford on $50,000? | `/how-much-rent-can-i-afford-on-50000-a-year/` | Keep the useful comparison of budgeting and screening rules; add clearly sourced explanations and a relevant next step. |
| How much should I save before moving out? | `/how-much-should-i-save-before-moving-out/` | Add a worked move-in budget and an editable calculation tied to the example. |
| How should roommates split rent? | `/rent-split-calculator/` | Make equal, income-based, and room-size examples easy to compare; publish one practical demonstration. |

For each priority page, include an immediate answer, a useful tool, explicit assumptions, original worked examples, and links to relevant next steps. Add genuine creator information, a calculation methodology, and sources for factual claims. Update review dates when the substance is reviewed. Explain that the readiness score is the site's planning model, including how its weights work, so visitors understand what it measures.

Google emphasizes originality, clear sourcing, accurate authorship, and usefulness to the intended audience. [Google's content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

After the existing pages start receiving impressions or repeated questions, consider one new guide about variable hours or irregular pay. Validate the need first. Avoid producing dozens of near-identical salary or city pages; each new page should add a distinct useful answer.

## Priority 4: clarify positioning and make useful results shareable

Test a homepage title such as **“Rent Affordability & Move-In Cost Calculators | RentReadyCheck”** and a heading such as **“Work out what you can afford before you apply.”** Keep the readiness score as a feature with a clear explanation. This is a positioning experiment; evidence of increased clicks or usage is needed to judge it.

If renaming the main route to `/rent-affordability-calculator/`, use a permanent redirect from the existing URL, update internal links, canonicals, and the sitemap, and verify the production response. The project uses static export, so arrange the redirect through the hosting configuration. Maintain one canonical calculator page. Do not prioritize a broad URL migration over discovery and distribution.

Add a “Share this tool” action first. A later shareable hypothetical result or downloadable moving checklist could give visitors a reason to recommend it. Share the tool URL by default; personal financial inputs should not be placed in public links automatically. Measure real referral visits after introducing sharing.

## First 30 days

| Period | Work | Reviewable outcome |
| --- | --- | --- |
| Days 1–3 | Verify search status and production analytics; select the three lead tools. | Baseline and indexing status recorded for six priority pages. |
| Days 4–7 | Improve one existing landing page, prepare one demonstration, and identify 20 relevant partner prospects. | One stronger page, two short demos, first five personalized outreach drafts. |
| Week 2 | Make five partner approaches, contribute three useful community answers, publish two demos, improve a second page. | Referral traffic by source and evidence of calculator use. |
| Week 3 | Repeat the best distribution channel; add creator/methodology information and improve a third page. | Early query data and a clearer explanation of the tools. |
| Week 4 | Compare channels and pages; follow up where appropriate; choose the next content improvement from observed questions. | A decision to continue, change, or stop each experiment. |

Community posts, publishing, and sending outreach are proposed actions; this plan does not record their completion.

## Measurement and decision rules

The first month's purpose is to find a repeatable source of relevant visitors. An optional experiment target is the first 100 relevant visits and 20 visitors actively using a tool; these are goals, not expected results.

Track these weekly:

- Search discovery: priority pages indexed, impressions, clicks, and queries.
- Acquisition: relevant visitors by source and landing page. Exclude your own testing where possible.
- Usefulness: visitors who enter or change inputs and receive a result. Existing `calculator_result_view` events may be emitted on result display or updates; they should not automatically be interpreted as completed calculations or unique people.
- Distribution: personalized approaches, replies, resource placements, community referral visits, and visits from demonstrations.

Use consistently named campaign links, for example `?utm_source=instagram&utm_medium=social&utm_campaign=move_in_demo_01`. Confirm the chosen analytics dashboard exposes campaign data before relying on it; otherwise track available referrers and landing pages.

If the priority pages are unindexed, investigate Search Console's actual reason. If indexed pages have few impressions, improve relevance and external discovery. If impressions rise but clicks remain low, review the title, search position, and query match. If referrals bring visitors who do not use the tools, check that the linked page solves the promised task.

After ten personalized approaches with no replies, revise the audience or pitch. After several demonstrations, compare actual site visits and tool usage by topic. Build on channels showing repeated evidence, while acknowledging that small samples are noisy and four weeks may be too early to judge organic search.

## Spending

Use free distribution and measurement first. A small paid test can be considered once analytics works, the destination is useful, and there is a reason to value each visitor. At that point set a fixed cap, target a specific renter task, and measure cost per active calculator user. A free calculator site's revenue per visitor is currently unknown, so paying for sustained traffic would be premature.

Avoid buying links or bulk SEO pages. Google's policies identify ranking-focused link schemes and scaled content without user value as spam. [Google's spam policies](https://developers.google.com/search/docs/essentials/spam-policies).

The first concrete step is Search Console verification, followed immediately by promoting the three existing tools and improving one landing page. More visitors cannot be established from this audit alone; the plan supplies the experiments and measurements needed to pursue that outcome.
