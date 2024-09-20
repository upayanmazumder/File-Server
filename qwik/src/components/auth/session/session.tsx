import { component$ } from '@builder.io/qwik';
import { useSession } from '~/routes/plugin@auth';
import sessionStyles from "./session.module.css";
import { Form } from '@builder.io/qwik-city';
import { useSignIn, useSignOut } from '~/routes/plugin@auth';
import { BsGoogle } from "@qwikest/icons/bootstrap";
import haha from "../../../media/authentication/unknown-person.png"
export default component$(() => {
  const session = useSession();
  const signIn = useSignIn();
  const signOut = useSignOut();

  // Check if the user is signed in
  const isSignedIn = session.value?.user;

  return (
    <div class={sessionStyles.container}>
      {isSignedIn ? (
        <>
          <div class={sessionStyles.imgContainer}>
            <img 
              class={sessionStyles.img}
              src={session.value.user?.image ?? haha} 
              loading="lazy"  
              alt={session.value.user?.name ?? 'User Icon'} 
              width="80" 
              height="80" 
            />
          </div>
          <div class={sessionStyles.userInfo}>
            <p>{session.value.user?.name}</p>
            <p>{session.value.user?.email}</p>
          </div>
          
          <Form action={signOut} class={sessionStyles.form}>
            <input type="hidden" name="redirectTo" value="/a/signedout" />
            <button class={sessionStyles.button}>Sign Out</button>
          </Form>
        </>
      ) : (
        <Form action={signIn} class={sessionStyles.form}>
          <input type="hidden" name="providerId" value="google" />
          <input type="hidden" name="options.redirectTo" value="/a/signedin" />
          <button class={sessionStyles.iconButton}>
            <BsGoogle />
          </button>
        </Form>
      )}
    </div>
  );
});
