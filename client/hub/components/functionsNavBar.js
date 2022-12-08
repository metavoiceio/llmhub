import Link from "next/link";
import { useState } from "react";
import { Popover, ArrowContainer } from 'react-tiny-popover'

export default function FunctionsNavbar({ workspaceId, functionId, mode, allowShare }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const selectPlayground = mode === 'playground' ? 'border-b-2 border-green-500' : '';
  const selectDeployments = mode === 'deployments' ? 'border-b-2 border-green-500' : '';
  return (
    <div className="w-full flex item-center gap-2 mt-4">
      <Link
        className={`${selectPlayground} text-sm`}
        href={`/${workspaceId}/functions/${functionId}`}
      >
        Playground
      </Link>
      <Link
        className={`${selectDeployments} text-sm`}
        href={`/${workspaceId}/functions/${functionId}/deployments`}
      >
        Deployments
      </Link>
      <div className="grow"></div>
      <Popover
        isOpen={isPopoverOpen}
        positions={['bottom']}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={({ position, childRect, popoverRect }) => (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={'white'}
            arrowSize={6}
            arrowStyle={{ opacity: 0.5 }}
            className='popover-arrow-container'
            arrowClassName='popover-arrow'
          >
            <div
              className="z-50 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 p-2 rounded-lg text-xs flex flex-col w-fit dark:bg-gray-700"
            >
              {
                allowShare ?
                  <>
                    <div className="px-2 mb-4 mt-2 truncate">
                      <span className="text-blue-400 underline">
                        {window.location.origin}/{workspaceId}/functions/{functionId}/share
                      </span>
                    </div>
                    <div className="px-2 flex items-center">🌐 Anyone can view & share</div>
                  </>
                  : <p className="px-2">⚠️ You must deploy to share</p>
              }

            </div>
          </ArrowContainer>
        )}
      >
        <button
          className="text-sm hover:bg-gray-200 focus:outline-none focus:ring-gray-300 rounded-lg px-3 py-1.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          Share
        </button>
      </Popover>
    </div>
  );
}
