import { component$ } from '@builder.io/qwik';
import { useSession } from '~/routes/plugin@auth';
 
export default component$(() => {
  const session = useSession();
  return <p>{session.value?.user?.email}</p>;
});
 