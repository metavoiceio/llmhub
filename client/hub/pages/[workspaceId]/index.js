// sidebar - move to top on mobile view
import { useRouter } from "next/router";
import AuthSideBar from "../../components/sidebar";

export default function Workspace() {
  const router = useRouter();
  const { workspaceId } = router.query;

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} />
      <div className="h-full flex flex-col flex-1" />
    </div>
  );
}
