import { component$ } from '@builder.io/qwik';
import { useSession } from '~/routes/plugin@auth';
import sessionStyles from "./session.module.css";
export default component$(() => {
  const session = useSession();
  const imageUrl = session.value?.user?.image ?? '';
  return (
    <div class={sessionStyles.wrapper}>
      <img width="80" height="80" src={imageUrl} loading="lazy"  alt={session.value?.user?.name ?? 'User Icon'} class={sessionStyles.profilepic}></img>
      <div class={sessionStyles.info}>
        <p class={sessionStyles.name}>{session.value?.user?.name}</p>
        <p class={sessionStyles.email}>{session.value?.user?.email}</p>
      </div>
    </div>
  );
});
 