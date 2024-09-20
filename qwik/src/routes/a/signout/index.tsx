import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import SignOutForm from "../../../components/auth/sign-out"
export default component$(() => {
  return (
    <>
      <div class="container container-center container-spacing-xl">
        <h3>Sign Out</h3>
        <div class="container container-center">
          <SignOutForm />
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Signed In Successfully!",
  meta: [
    {
      name: "description",
      content: "Congratulations on signing in"
    }
  ]
};