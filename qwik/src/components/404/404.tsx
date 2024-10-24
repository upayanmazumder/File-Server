import { component$} from "@builder.io/qwik";
import { BsEmojiFrownFill } from "@qwikest/icons/bootstrap"
import styles404 from "./404.module.css"
export default component$(() => {
    return (
        <div class={`container container-center ${styles404.card}`}>
            <h1>404 - Page Not Found</h1>
            <div class={styles404.icon}><BsEmojiFrownFill/></div>
            <div class="container">
                <p>Sorry, the page you are looking for does not exist.</p>
                <br />
                <p>Please check the URL or return to the homepage.</p>
            </div>
        </div>
  );
});
