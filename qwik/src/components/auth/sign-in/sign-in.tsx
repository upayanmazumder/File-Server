import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useSignIn } from '~/routes/plugin@auth';
import { BsGoogle } from "@qwikest/icons/bootstrap";
import signInStyles from './sign-in.module.css';
 
export default component$(() => {
  const signIn = useSignIn();
  return (
    <Form action={signIn} class={signInStyles.form}>
      <input type="hidden" name="providerId" value="google" />
      <input type="hidden" name="options.redirectTo" value="/a/signedin" />
      <button class={signInStyles.button}><BsGoogle /></button>
    </Form>
  );
});