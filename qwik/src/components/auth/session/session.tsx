import { component$ } from '@builder.io/qwik';
import { useSession } from '~/routes/plugin@auth';
import sessionStyles from "./session.module.css";
import SignOut from '../sign-out';
import SignIn from '../sign-in/sign-in';

export default component$(() => {
  const session = useSession();

  // Check if the user is signed in
  const isSignedIn = session.value?.user;

  return (
    <div class={sessionStyles.wrapper}>
      {isSignedIn ? (
        <>
          <img 
            width="80" 
            height="80" 
            src={session.value.user?.image ?? ''} 
            loading="lazy"  
            alt={session.value.user?.name ?? 'User Icon'} 
            class={sessionStyles.profilepic} 
          />
          <div class={sessionStyles.info}>
            <p class={sessionStyles.name}>{session.value.user?.name}</p>
            <p class={sessionStyles.email}>{session.value.user?.email}</p>
          </div>
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
});
