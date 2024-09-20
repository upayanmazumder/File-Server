import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import SignInForm from "../../../components/auth/sign-in/sign-in";

export default component$(() => {

  return (
    <>

      <div role="presentation" class="ellipsis"></div>
      <div class="container container-center container-spacing-xl">

        <h3>
          Sign in 
        </h3>
        <div class="container container-center">
        <SignInForm />
        </div>
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
