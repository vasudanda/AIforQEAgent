# Team conventions
 
- Salesforce tests in tests/salesforce/, web tests in tests/web/
- One test file per user flow
- Page Object Model beyond 3 steps; objects in pages/
- Test names say what is verified, not what is clicked
- Name the persona when a test depends on permissions
- Every address and credential from environment variables
- Create records via API; clean up in afterEach
- Results export as JUnit XML for qTest
