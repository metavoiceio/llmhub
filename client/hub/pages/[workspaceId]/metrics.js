import { useRouter } from "next/router";
import { BASE_API_URL } from "../../common/constants";
import AuthSideBar from "../../components/sidebar";

export default function Metrics({ functions }) {
  const router = useRouter();
  const { workspaceId } = router.query;

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} functions={functions} />
      <div className="h-full flex flex-col flex-1">
        <div className="flex gap-1 items-center">
          <div className="w-full max-w-[200px] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <h1 className="mt-8 mb-1 text-3xl font-medium text-gray-900 dark:text-white">85%</h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">Tokens</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">1,000 / 100,000</span>
            </div>
          </div>
          <div className="w-full max-w-[200px] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <h1 className="mt-8 mb-1 text-3xl font-medium text-gray-900 dark:text-white">850</h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">API calls</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Unlimited</span>
            </div>
          </div>
        </div>
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
