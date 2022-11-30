import Link from "next/link";

export default function FunctionsNavbar({ workspaceId, functionId, mode }) {
  const selectPlayground = mode === 'playground' && 'border-b-2 border-green-500';
  const selectDeployments = mode === 'deployments' && 'border-b-2 border-green-500';

  return (
    <div className="w-full flex item-center gap-2 mt-4">
      <Link
        className={selectPlayground}
        href={`/${workspaceId}/functions/${functionId}`}
      >
        Playground
      </Link>
      <Link
        className={selectDeployments}
        href={`/${workspaceId}/functions/${functionId}/deployments`}
      >
        Deployments
      </Link>
      <div className="grow"></div>
      <button className="text-sm">Share</button>
    </div>
  );
}