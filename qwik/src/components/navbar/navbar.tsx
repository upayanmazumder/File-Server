import { component$ } from '@builder.io/qwik';
import styles from './navbar.module.css';
import { BsHouse, BsPersonBadge, BsPatchCheck, BsBasket, BsPersonRolodex } from '@qwikest/icons/bootstrap';

export default component$(() => {
    const navItems = [
        { name: 'Home', href: '/', icon: BsHouse },
        { name: 'About', href: '/#about', icon: BsPersonBadge },
        { name: 'Certificates', href: '/certificates', icon: BsPatchCheck },
        { name: 'Services', href: '/#services', icon: BsBasket },
        { name: 'Contact', href: '/#contact', icon: BsPersonRolodex }
    ];

    return (
        <nav class={styles.nav}>
            <ul class={styles.navList}>
                {navItems.map(({ name, href, icon: Icon }) => (
                    <li key={name} class={styles.navItem}>
                        <a href={href} class={styles.navLink}>
                            <Icon class={styles.navIcon} />{' '}
                            {name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
});
