import { useRouter } from "next/router";
import { getFunctions, supabase } from "../../../../common/supabase";
import AuthSideBar from "../../../../components/sidebar";

// TODO sidroopdaska: error handling
export default function Function({ functions, deployments }) {
  const router = useRouter();
  const { workspaceId, id } = router.query;

  const renderDeployments = () => {
    return <p>have {deployments.length} deployments to render</p>
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} functions={functions} />

      <div className="h-full flex flex-col overflow-y-auto flex-1">
        {
          deployments.length === 0 ? <p>No deployments have been made.</p> : renderDeployments()
        }
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let { workspaceId, id } = params;

  // fetch deployments for function
  const { data: deployments, error } = await supabase
    .from('deployments')
    .select('*')
    .eq('function_id', id)
    .order('created_at', { ascending: false });

  console.log(error);

  return {
    props: {
      functions: await getFunctions(workspaceId),
      deployments
    }
  };
}
