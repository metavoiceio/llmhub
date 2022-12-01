import { useRouter } from "next/router";
import { getFunctions } from "../../../../common/supabase";
import AuthSideBar from "../../../../components/sidebar";

export default function Function({ functions }) {
  const router = useRouter();
  const { workspaceId, id } = router.query;

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} functions={functions} />

      <div className="h-full flex flex-col overflow-y-auto flex-1">
        Deployments page
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let { workspaceId, id } = params;

  return {
    props: {
      functions: await getFunctions(workspaceId),
    }
  };
}
