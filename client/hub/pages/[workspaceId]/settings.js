import { useRouter } from "next/router";
import { BASE_API_URL } from "../../common/constants";
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
  const res = await fetch(`${BASE_API_URL}/functions`, { method: 'GET' });
  const data = JSON.parse(await res.json());

  return {
    props: {
      functions: data
    }
  };
}
