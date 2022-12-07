import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { supabase } from '../common/supabase';

export default function Welcome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleNewUser = async () => {
    // create new user & workspace & route
    let data, error;
    (
      { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            nickname: session.user.nickname
          },
        ])
        .select()
    )
    let workspaces;
    (
      { data: workspaces, error } = await supabase
        .from('workspaces')
        .insert([
          {
            name: 'inception',
            user_id: session.user.id,
            plan: 'free',
            interval: 'monthly',
            usage_tokens: 0,
          },
        ])
        .select()
    )
    router.push(`/${workspaces[0].id}`)
  }

  const handleExistingUser = async () => {
    // get associated workspace and route
    const { data: workspaces, error } = await supabase
      .from('workspaces')
      .select()
      .eq('user_id', session.user.id);

    router.push(`/${workspaces[0].id}`)
  }

  const handleUser = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id);
    return error || data.length === 0 ? await handleNewUser() : await handleExistingUser();
  }

  useEffect(() => {
    if (session && status === 'authenticated') {
      handleUser().catch(console.error);
    }
  }, [status])

  return (
    <div class="flex h-screen">
      <div className="m-auto text-3xl">
        {
          status === 'loading' ?
            <p>Loading...</p> :
            <p>Preparing your workspace...</p>
        }
      </div>
    </div>
  );
}
