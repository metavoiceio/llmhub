import { useRouter } from "next/router";
import { REDIRECT_NOTFOUND_OBJ } from "../../common/constants";
import supabase from "../../common/supabase";
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
  workspaceId = workspaceId.split('-')[1];

  // validate workspace
  if (!doesWorkspaceExist(workspaceId)) return REDIRECT_NOTFOUND_OBJ

  // get functions
  let { data: functions, error } = await supabase
    .from('functions')
    .select(`*`)
    .eq('workspace_id', workspaceId);

  return {
    props: {
      functions
    }
  };
}
