import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getFunctions, supabase } from "../../common/supabase";
import AuthSideBar from "../../components/sidebar";
import { Button } from "flowbite-react";

export default function Settings({ functions, workspace }) {
  const router = useRouter();
  const { workspaceId } = router.query;

  const renderTokenUsage = () => {
    return (
      <>
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-green-700 dark:text-white">Token Usage</span>
          <span className="text-sm font-medium text-green-700 dark:text-white">{workspace.usage_tokens}/250k</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${workspace.usage_tokens/250000 * 100}%` }}></div>
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} functions={functions} />
      <div className="h-full flex flex-col flex-1 p-4">
        <h1 className="font-medium text-xl mb-20">Settings</h1>
        <div className="mb-4">Plan: Free</div>
        {renderTokenUsage()}
        <div className="mt-20">
          <Button
            size="sm"
            color={"failure"}
            onClick={e => {
              signOut({ callbackUrl: process.env.NEXT_PUBLIC_POST_SIGNOUT_URL })
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}

// TODO: handle missing workspaceId
export async function getServerSideProps({ params }) {
  let { workspaceId } = params;

  const { data: workspaces, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('id', workspaceId)

  return {
    props: {
      functions: await getFunctions(workspaceId),
      workspace: workspaces[0]
    }
  };
}
