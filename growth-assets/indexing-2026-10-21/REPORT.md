# Search and calculator priorities — 21 October 2026

## Indexing

Fetched the production sitemap and all 55 canonical pages with a Googlebot user-agent string. This checks user-agent behavior, not verified Googlebot IP handling. All returned HTTP 200 with zero redirects, one self-referencing canonical, one H1 and no noindex in robots metadata. Robots.txt permits crawling and references the working sitemap. Raw results: live-pages.json, sitemap.xml, robots.txt.

Rechecked all 17 URLs in the historical Search Console redirect-error export. Sixteen now redirect once to a working canonical page (HTTP 200). The deliberately retired UK calculator redirects once to HTTP 404, remains absent from the current sitemap, and has no equivalent UK replacement. Its retirement is preserved. Results: historical-redirects.json. No current redirect repair was indicated.

Search Console sitemap report: Success, last read 21 October 2026, 55 discovered pages. No unchanged sitemap resubmission was needed. Individual URL inspections confirm both the roommate calculator and moving-out savings guide are now indexed; these were previously pending in the earlier audit. The aggregate indexing report is dated 12 October, before the expansion to 55 pages, and still shows 24 indexed / 29 excluded. Excluded URLs are not equivalent to broken current content pages. No repeat indexing request was submitted.

## Search opportunity and changes

Search Console Web comparison: 22 September–19 October versus 25 August–21 September. Overall: 3 versus 1 clicks; approximately 1,980 versus 543 impressions; 0.2% CTR in both; average position 18.4 versus 36.3. Exported page and query tables are saved in this folder, with Filters.csv recording the report filters.

| Page | Impressions | Clicks | Average position |
| --- | ---: | ---: | ---: |
| $20/hour guide | 400 | 0 | 8.41 |
| Income for $2,000 rent | 113 | 0 | 10.74 |
| Income for $1,200 rent | 108 | 0 | 8.73 |
| Income for $800 rent | 106 | 0 | 6.85 |

These are candidates for a search click-through experiment, not proof that metadata caused low CTR. The $20/hour title now identifies the calculator, and its shorter description retains all three comparison figures and the full-time gross-pay assumptions. A hero link jumps directly to its existing editable calculator. Rent-amount descriptions now lead with the 3x answer and invite the reader to compare 2.5x and 3x in the calculator. This shared description applies to all 14 rent-amount guides. Sitemap modification dates are updated for the 15 pages whose metadata changed. Google may choose different search snippets; no traffic uplift is claimed before measurement.

## Calculator tracking

Existing Vercel calculator_used tracking requires an interaction and a valid result, and counts once per mounted calculator after a 600ms debounce. Roommate and co-signer tools were missing the calculatorName/resultReady props; the readiness assessment did not invoke the engagement hook. These three gaps are fixed. The usage event contains the tool name and path, not entered amounts. Existing result-view events remain separate from active use.

Local browser verification in Vercel development debug mode: no usage event for the invalid score submission; one for a valid score despite a repeated submission; one additional event for a valid roommate estimate; one for a valid co-signer estimate. Debug mode sends no analytics requests to the server. usage-verification.json records the observed console evidence. These checks do not prove production event delivery or reporting.

The Vercel Hobby dashboard does not expose custom-event reporting. The owner chose free Google Analytics if an existing account was available. The signed-in Google account instead shows the initial Welcome / Start measuring screen, so no existing property was available there. No new account, terms acceptance, cookies, paid upgrade, or Google Analytics tag was added. A new Analytics account/property and a consent-aware integration remain necessary if the owner chooses that reporting route.

## Validation and release

All 61 tests pass. ESLint and the production static build pass. All 55 exported pages have one self-canonical and one H1. The $20/hour calculator anchor works in the browser; its metadata contains the mathematically verified figures. Three calculators were checked with synthetic values in a local browser.

Prepared on codex/search-priorities for review. Production release and post-release measurement are pending. Keep the prior untracked reports and receipts intact.
