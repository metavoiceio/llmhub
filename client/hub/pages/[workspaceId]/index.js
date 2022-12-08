import { useRouter } from "next/router";
import AuthSideBar from "../../components/sidebar";
import { getFunctions } from '../../common/supabase';
import { useEffect, useState } from "react";

export default function Workspace({ functions }) {
  const router = useRouter();
  const { workspaceId } = router.query;
  const [forkUrl, setForkUrl] = useState('')

  useEffect(() => {
    setForkUrl(router.query.fork ? `${window.location.origin}${router.query.fork}` : '');
  })

  return (
    <div className="flex flex-col sm:flex-row min-h-screen dark:bg-gray-900">
      <AuthSideBar workspaceId={workspaceId} functions={functions} forkUrl={forkUrl} />
      <div className="h-full flex flex-col flex-1 dark:bg-gray-900" />
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
