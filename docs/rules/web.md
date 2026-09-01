# Web rules — applies to tests/web/. No Salesforce habits here.
 
## Timing
- Project defaults: 30s per test, 5s per assertion.
- Needs longer? That is a performance finding. Report it; do not raise
  the timeout to hide it.
 
## Locators
- Universal order applies. XPath discouraged, not forbidden.
 
## Frames and dialogs
- Payment fields, maps, chat widgets are iframes. Match by title or src.
- Register page.on('dialog') BEFORE the click that triggers it.
 
## Network
- Stub what we do not own: third parties, error states, slow endpoints.
- Never stub our own responses to make a test pass.
- Block analytics and images when they cause flakiness.
- Prefer waitForResponse when the meaningful event is a request.
 
## Components
- Shadow DOM exists here too in web-component design systems.
- Virtualised grids build only visible rows. Filter.
- Canvas has nothing inside. Assert the data behind it.
 
## Authorisation
- Test restricted routes by navigating directly as the restricted user
  and asserting the status, not by checking a link is absent.
- Another user's record must return 403 or 404.
 
## Clean state
- Clear cookies and storage and unregister service workers before each run.
 
## Keyboard
- Use ControlOrMeta for shortcuts; Control alone breaks on a Mac.
- Clipboard reads need clipboard-read granted on the context.
 
## Do not
- Do not automate human-verification puzzles or live payment providers.
- No injection, session or dependency attacks. That is penetration
  testing: different tools, needs written authorisation.
