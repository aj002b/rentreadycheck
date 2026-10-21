# Google Analytics setup — 21 October 2026

The owner created the RentReadyCheck Analytics account/property in the existing signed-in Google account. No data stream was present when setup was inspected. Created the web stream `RentReadyCheck website` for `https://rentreadycheck.com`, stream ID `16177089091`, Measurement ID `G-DL5BRPJLFV`. This ID is public, not an authentication credential. No API secret was created.

Enhanced measurement is off. The implementation sends explicit page views and selected interactions, avoiding automatic form/search/history measurement. Added the event-scoped custom dimension `Calculator name` with parameter `calculator_name`; the saved row was verified in Analytics. No new terms were accepted by the agent and no paid service was purchased.

## Website behavior

- Google tag loads only on rentreadycheck.com after an explicit Allow Google Analytics choice. Declining or having no saved choice does not load it. Local and Vercel preview domains never load the production tag.
- Choices are stored in a new local-storage preference, with an in-memory fallback if storage is blocked. Dismissing the old informational notice is not consent.
- Privacy settings in the footer reopens the banner. Withdrawing permission immediately sets Google's property-specific disable flag, updates consent, and expires the site's GA cookies without clearing calculator inputs. Existing data is not deleted.
- Advertising storage, ad user data, ad personalization, Google signals and ad personalization signals remain disabled.
- Explicit page_view events cover route navigation and suppress duplicate views for the same sanitized URL. URLs and referrers remove non-campaign query parameters and fragments using the existing privacy filter.
- Only calculator_used, calculator_card_click and tool_share are forwarded. Custom parameters are limited to tool name, page path and a fixed share method. Financial inputs and calculator result categories are not forwarded to Google. Existing Vercel reporting remains in place.
- The privacy policy describes the additional optional service, cookies and withdrawal controls. Its sitemap modification date is updated.

## Verification

All 69 tests pass, including eight new privacy and lifecycle tests covering missing/declined consent, legacy notice dismissal, script loading, sanitized URLs/referrers, duplicate page views, route changes, event parameter filtering, withdrawal/regrant, preview isolation and blocked storage. ESLint and the production static build pass.

Browser verification of the production build confirmed rejection persists across page navigation, allowing hides the banner, the choice survives reload, and footer settings allow withdrawal. Mobile checked at 390 by 844; controls are readable and fit the screen. Viewport reset after testing. The preview contains no Google tag even after allowing, as intended by the production-domain guard. Tests with a simulated production origin verify the post-consent tag and command payload without making external requests.

Screenshots are saved in the chat's local visualization folder. Production deployment and actual event receipt in Analytics remain pending; no historical usage is claimed or replayed. After publication, verify a controlled calculator_used event and page_view in the property's Realtime report before relying on the reports.

## References

- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.google.com/analytics/devguides/collection/ga4/events
- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.google.com/tag-platform/security/guides/privacy
- Local Next.js guides for scripts, Client Components and usePathname were read before implementation.
