# PostHog post-wizard report

The wizard has completed a full PostHog integration for the Recurrly Expo app. The SDK was installed, a PostHog client was configured using `expo-constants` and `app.config.js` extras, a `PostHogProvider` was added to the root layout with manual screen tracking via `useEffect`, and `posthog.capture()` / `posthog.identify()` calls were added at all key conversion and engagement points. Auth screens previously had PostHog code commented out — those are now fully wired up.

| Event name | Description | File |
|---|---|---|
| `user_signed_in` | Fired when a user successfully completes sign-in via email and password. | `app/(auth)/sign-in.tsx` |
| `user_sign_in_failed` | Fired when a sign-in attempt fails due to an error. | `app/(auth)/sign-in.tsx` |
| `user_signed_up` | Fired when a new user completes email verification and finishes sign-up. | `app/(auth)/sign-up.tsx` |
| `user_sign_up_failed` | Fired when a sign-up attempt fails due to an error. | `app/(auth)/sign-up.tsx` |
| `user_signed_out` | Fired when a user signs out from the settings screen. | `app/(tabs)/settings.tsx` |
| `subscription_expanded` | Fired when a user expands a subscription card on the home dashboard. | `app/(tabs)/index.tsx` |
| `subscription_detail_viewed` | Fired when a user opens a subscription detail page. | `app/subscriptions/[id].tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/520255/dashboard/1874340)
- [New sign-ups over time (wizard)](https://us.posthog.com/project/520255/insights/LtANfhYA)
- [Sign-in/Sign-up conversion funnel (wizard)](https://us.posthog.com/project/520255/insights/udJJCBPm)
- [Sign-out events (wizard)](https://us.posthog.com/project/520255/insights/OULBdlWR)
- [Subscription engagement (wizard)](https://us.posthog.com/project/520255/insights/YZ1s67lu)
- [Auth failures (wizard)](https://us.posthog.com/project/520255/insights/uPubYcV3)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` to `.env.example` and any onboarding scripts so collaborators know what to set.
- [ ] Confirm the returning-visitor path also calls `identify` — a handler that only identifies on fresh login can leave returning sessions on anonymous distinct IDs.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-expo/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
