import { WORKSPACE_ID } from "../../../../common/constants";
import AuthSideBar from "../../../../components/sidebar";

export default function Function() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={WORKSPACE_ID} />

      <div className="h-full flex flex-col overflow-y-auto flex-1">
        deployments page
      </div>
    </div>
  );
}
