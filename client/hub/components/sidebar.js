import Image from 'next/image';
import { HiChartBar } from 'react-icons/hi';
import { BsGearWide } from 'react-icons/bs';
import logo from "../public/logo.png";

export default function AuthSideBar() {
  return (
    < div className="hidden sm:flex select-auto w-[260px] max-w-[530px] min-w-[200px] box-border shrink-0 min-h-screen" >
      <div className="flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-200 border-r-1 dark:border-gray-800 px-2 overflow-auto w-full">
        <div className="pt-4 flex items-center px-1 text-sm">
          <Image src={logo} />&nbsp;
          {"<workspace_id>"}
        </div>
        <div className="flex flex-col pt-8 gap-0">
          <a className="flex items-center px-2 interact-bounce hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded" href="workspace/settings">
            <BsGearWide />
            <span class="text-sm ml-2 mr-1 text-gray-700 dark:text-gray-300">Dashboard</span>
          </a>
          <a className="flex items-center px-2 interact-bounce hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded" href="workspace/stats">
            <HiChartBar />
            <span class="text-sm ml-2 mr-1 text-gray-700 dark:text-gray-300">Stats</span>
          </a>
          <a className="flex items-center px-2 interact-bounce hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded" href="workspace/settings">
            <BsGearWide />
            <span class="text-sm ml-2 mr-1 text-gray-700 dark:text-gray-300">Settings</span>
          </a>
        </div>
        <div className="pt-8">
          <div className='px-2 pb-2 flex flex-row items-center justify-between'>
            <div className="text-gray-500 text-xs p-1">Functions</div>
            <a className='hover:border'
              href="javascript:void(0)" onClick={() => console.log('Create new function')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
