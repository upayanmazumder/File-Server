import { component$, useStylesScoped$ } from '@builder.io/qwik';
import headerStyles from './header.css?inline';
import FS from "../../media/upayan.svg";

export default component$(() => {
    const title = 'File Server';

    useStylesScoped$(headerStyles);

    return (
        <header class="header">
            <img src={FS} alt={title} width="100" height="100"/>
            <h1 class="title">{title}</h1>
        </header>
    );
});