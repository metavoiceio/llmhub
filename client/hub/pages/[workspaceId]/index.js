import { useRouter } from "next/router";
import AuthSideBar from "../../components/sidebar";
import supabase from '../../common/supabase';
import { doesWorkspaceExist } from "../../common/validation";
import { REDIRECT_NOTFOUND_OBJ } from "../../common/constants";

// TODO: error handling, incorrect workspaceId
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
  workspaceId = workspaceId.split('-')[1];

  // validate workspace
  if (!doesWorkspaceExist(workspaceId)) return REDIRECT_NOTFOUND_OBJ;

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
