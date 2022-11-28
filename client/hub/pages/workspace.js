// represents the authenticated page
// code out sidebar - move to top on mobile view
// support functions
import AuthSideBar from "../components/sidebar";

export default function Workspace() {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen">
            {/* sidebar */}
            <AuthSideBar />
            {/* topbar */}
            <div className="sm:hidden block">
            </div>
            {/* main area */}
            <div className="h-full flex flex-col overflow-y-auto flex-1">
                <p>test</p>
            </div>
        </div>
    );
}
