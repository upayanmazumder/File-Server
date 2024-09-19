import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useSignIn } from '~/routes/plugin@auth';
 
export default component$(() => {
  const signIn = useSignIn();
  return (
    <Form action={signIn}>
      <input type="hidden" name="providerId" value="github" />
      <input type="hidden" name="options.redirectTo" value="https://fs.upayan.space/" />
      <button>Sign In</button>
    </Form>
  );
});