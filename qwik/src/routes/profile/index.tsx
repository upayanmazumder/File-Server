import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {useSignOut, useSession} from '~/routes/plugin@auth';
import sessionStyles from "../../components/auth/session/session.module.css"
import { Form } from '@builder.io/qwik-city';

export default component$(() => {
  const session = useSession();
  const signOut = useSignOut();

  const isSignedIn = session.value?.user;

  return (
    <>

      <div role="presentation" class="ellipsis"></div>

      {isSignedIn ? (
        <div class="container container-center container-spacing-xl">

        <h3>
          Your <span class="highlight">Profile</span>
        </h3>
        <br />

        <div class={sessionStyles.userInfo}>
          <p>{session.value.user?.name}</p>
          <p>{session.value.user?.email}</p>
        </div>

        <Form action={signOut} class={sessionStyles.form}>
          <input type="hidden" name="redirectTo" value="/a/signedout" />
          <button class={sessionStyles.button}>Sign Out</button>
        </Form>

        </div>
      ) : (
        <div class="container container-center container-spacing-xl">
          You must be signed in!
        </div>
      )}

    </>
  );
});

export const head: DocumentHead = {
  title: "Profile",
  meta: [
    {
      name: "description",
      content: "Configure your profile",
    },
  ],
};
