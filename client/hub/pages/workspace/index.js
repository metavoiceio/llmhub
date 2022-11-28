// represents the authenticated page
// sidebar - move to top on mobile view
import AuthSideBar from "../../components/sidebar";
import { WORKSPACE_ID } from "../../common/constants";

export default function Workspace() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* sidebar */}
      <AuthSideBar workspaceId={WORKSPACE_ID} />
      {/* main area */}
      <div className="h-full flex flex-col flex-1">
      </div>
    </div>
  );
}
