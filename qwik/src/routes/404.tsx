import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Four04 from "../components/404/404";

export default component$(() => {
  return (
    <>
      <Four04/>
    </>
  );
});

export const head: DocumentHead = {
  title: "404 - Page Not Found",
  meta: [
    {
      name: "description",
      content: "The page you are looking for does not exist.",
    },
  ],
};
