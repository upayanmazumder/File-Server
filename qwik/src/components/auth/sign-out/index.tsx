import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useSignOut } from '~/routes/plugin@auth';

export default component$(() => {
    const signOut = useSignOut();
    return (
      <Form action={signOut}>
        <input type="hidden" name="redirectTo" value="/a/signedout" />
        <button>Sign Out</button>
      </Form>
    );
  });