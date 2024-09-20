import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            <QwikLogo height={50} width={143} />
          </a>
        </div>
        <ul>
          <li>
            <a
              href="/"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/a/signin/"
            >
              Sign In
            </a>
          </li>
          <li>
            <a
              href="/a/signout/"
            >
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});
