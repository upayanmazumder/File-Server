import { QwikAuth$ } from "@auth/qwik";
import GitHub from "@auth/qwik/providers/github";
import Google from "@auth/qwik/providers/google";
import Discord from "@auth/qwik/providers/discord";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [GitHub, Google, Discord],
  }),
);
