import { useRouter } from "next/router";
import { getFunctions } from "../../common/supabase";
import AuthSideBar from "../../components/sidebar";

export default function Settings({ functions }) {
  const router = useRouter();
  const { workspaceId } = router.query;

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} functions={functions} />
      <div className="h-full flex flex-col flex-1">
        Settings
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let { workspaceId } = params;

  return {
    props: {
      functions: await getFunctions(workspaceId)
    }
  };
}
