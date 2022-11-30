import { useRouter } from "next/router";
import AuthSideBar from "../../components/sidebar";
import { getFunctions } from '../../common/supabase';

export default function Workspace({ functions }) {
  const router = useRouter();
  const { workspaceId } = router.query;

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} functions={functions} />
      <div className="h-full flex flex-col flex-1" />
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
