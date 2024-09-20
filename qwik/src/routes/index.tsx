import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Session from "../components/auth/session/session";
import { Form } from '@builder.io/qwik-city';
import { useSignIn } from '~/routes/plugin@auth';

export default component$(() => {
  const signIn = useSignIn();
  return (
    <>
   
      <Session />
      <div role="presentation" class="ellipsis"></div>
      <div role="presentation" class="ellipsis ellipsis-purple"></div>

      <div class="container container-center container-spacing-xl">
      <Form action={signIn}>
        <input type="hidden" name="providerId" value="github" />
        <input type="hidden" name="options.redirectTo" value="/auth/signed-in/" />
        <button>Sign-in with Github</button>
        </Form>

        <Form action={signIn}>
        <input type="hidden" name="providerId" value="google" />
        <input type="hidden" name="options.redirectTo" value="/auth/signed-in/" />
        <button>Sign-in with Google</button>
        </Form>

        <Form action={signIn}>
        <input type="hidden" name="providerId" value="discord" />
        <input type="hidden" name="options.redirectTo" value="/auth/signed-in/" />
        <button>Sign-in with Discord</button>
        </Form>
        <h3>
          You can <span class="highlight">count</span>
          <br /> on me
        </h3>
        This file server is under active development

      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
