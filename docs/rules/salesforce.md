# Salesforce rules — applies to tests/salesforce/
 
## Shadow DOM
- Playwright locators pierce open shadow roots. getByRole/getByLabel work.
- XPath never pierces shadow DOM. Never use it here.
- CSS combinators do not cross boundaries. Chain .locator() calls.
 
## Iframes
- Visualforce/Classic content is in an iframe. Enter with frameLocator.
- Match by name prefix (vfFrameId), not title. Titles are generated.
- On a detached frame error, re-resolve inside a toPass block. Never store
  a frame reference across steps.
 
## Waiting
- lightning-spinner must reach count 0 before asserting.
- Related lists load lazily: scrollIntoViewIfNeeded first.
- List views are virtualised. Filter, never scroll hunting.
 
## Navigation
- Deep-link: /lightning/r/<Object>/<id>/view, /lightning/o/<Object>/list
- Scope locators inside a modal to the dialog.
- Console apps: confirm the workspace tab is focused first.
 
## Form controls
- Lookups: fill, wait for options, click the option.
- Dates: fill ISO, press Escape. Never the calendar grid.
- Dependent picklists: controlling field first.
- Inline edit: field edit button, then the page-level save bar.
- File inputs are hidden. setInputFiles on the input.
 
## Backend timing
- A toast is a receipt, not a result.
- After any action that may start a Flow, approval, trigger or integration,
  poll the record via the API until it reaches the expected state.
- Assert both layers: what the user sees and what the record holds.
 
## Permissions
- Write core flows for the weakest user who does that job, not an admin.
- Record not found? Check visibility BEFORE the locator. Query as that user.
 
## Approvals and events
- Submitting locks the record. Own record per approval test, or recall.
- Verify approvals in both layers: screen and ProcessInstanceWorkitem.
- Platform events never appear on screen. Verify the effect, not the event.
 
## Search and mass actions
- Global search is debounced; results render at page level. Use
  pressSequentially, then find the option outside the search box.
- Mass actions run in the background. Wait for the progress indicator.
- The header checkbox selects rendered rows only.
 
## Portals
- Experience Cloud uses a different framework. Separate project and rules.
- Always cover the signed-out visitor as well as the portal user.
 
## Console and conditional dialogs
- Check aria-selected before clicking a workspace tab.
- Duplicate-record, unsaved-changes and session-timeout dialogs appear only
  sometimes. Check isVisible first, then act.
- Wait for .slds-backdrop to reach count 0 before clicking underneath.
 
## Flows
- Synchronise on the next screen appearing, never on elapsed time.
- Sub-flow screens need a longer timeout on that assertion, not the test.
- One test per branch, never one test containing the branching.
 
## Frames and components
- A dialog raised inside a frame lives inside that frame.
- Debounced search needs pressSequentially with a delay, not fill().
- Never page.evaluate into LWC internals. Salesforce isolates them.
 
## Background jobs
- Poll AsyncApexJob through the API. Never the Setup screen.
 
## Authorisation
- Every feature a profile should not reach needs a negative test.
- Never assert only that a button is hidden. Navigate directly to the
  restricted address as that persona and assert the refusal.
- For anything that matters, confirm the API refuses too.
- Check field-level access, not only whole records.
