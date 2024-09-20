import { component$ } from '@builder.io/qwik';
import { useSession } from '~/routes/plugin@auth';
 
export default component$(() => {
  const session = useSession();
  return (
    <div class="container container-center">
      <p>{session.value?.user?.email}</p>
    </div>
  );
});
 