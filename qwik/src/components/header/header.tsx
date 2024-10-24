import { component$, useStylesScoped$ } from '@builder.io/qwik';
import headerStyles from './header.css?inline';
import Upayan from "../../media/upayan.svg";
import Auth from "../auth/session/session"

export default component$(() => {
    const title = 'Upayan';

    useStylesScoped$(headerStyles);

    return (
        <header class="header">
            <img src={Upayan} alt="Upayan" width="100" height="100"/>
            <h1 class="title">{title}</h1>

            <Auth />
        </header>
    );
});