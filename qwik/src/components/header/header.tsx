
import ImgIconTransparent from '../../media/icon-transparent.png?jsx';
import { component$ } from "@builder.io/qwik";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={styles.container}>
        <div class={styles.logoContainer}>
          <ImgIconTransparent alt="File Server" class={styles.logoImage} />
          <h2 class={styles.logoText}>File Server</h2>
        </div>
        <nav class={styles.nav}>
          <ul class={styles.navList}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="https://github.com/upayanmazumder/File-Server">
                Repository
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});
