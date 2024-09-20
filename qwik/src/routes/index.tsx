import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {

  return (
    <>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center container-spacing-xl">

        <h3>
          Welcome to <span class="highlight">File Server</span>
          <br /> by Upayan
        </h3>
        <br />
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
