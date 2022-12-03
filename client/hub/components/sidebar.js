import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { HiChartBar } from 'react-icons/hi';
import { BsGearWide, BsBraces, BsThreeDots } from 'react-icons/bs';
import logo from "../public/logo.png";
import NewFunctionModal from './newFunctionModal';
import { BASE_API_URL } from '../common/constants';

export default function AuthSideBar({ workspaceId, functions }) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFunctionName, setNewFunctionName] = useState('');

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  }

  const handleCreateFunction = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const res = await fetch(`${BASE_API_URL}/${workspaceId}/functions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newFunctionName
      })
    });

    if (res.status < 300) {
      refreshData();
      setIsModalOpen(false);
      setNewFunctionName('');
    } else {
      // TODO sidroopdaska: error handling
      console.log(error);
    }
  }

  useEffect(() => {
    setIsRefreshing(false);
  }, [functions])

  const renderFunctions = () => {
    return functions.map((funcData, _index) => {
      return (
        <Link
          key={funcData.id}
          id={funcData.id}
          role={"button"}
          tabIndex={0}
          className="group p-1 rounded flex items-center text-start dark:hover:bg-gray-800 hover:bg-gray-100 gap-1"
          href={`/${workspaceId}/functions/${funcData.id}`}
        >
          <div className="p-1 h-6 flex items-center justify-center rounded" >
            <BsBraces />
          </div>
          <div className="flex flex-1 leading-none text-sm">
            {funcData.name}
          </div>
          {/* <button className='p-1 opacity-0 group-hover:opacity-100 group-hover:border group-hover:bg-gray-200 rounded-lg'><BsThreeDots /></button> */}
        </Link>
      );
    })
  }

  return (
    <>
      <div className="hidden sm:flex select-auto w-[260px] max-w-[530px] min-w-[200px] box-border shrink-0 min-h-screen" >
        <div className="flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-200 border-r-1 dark:border-gray-800 px-2 overflow-auto w-full">
          {/* sidebar header */}
          <Link className="pt-4 flex items-center px-1 text-sm" href={`/${workspaceId}`}>
            <Image src={logo} alt="LLMHub logo" className="inline mr-1" />
            &nbsp;{workspaceId}
          </Link>

          {/* functions */}
          <div className="pt-8 grow">
            <div className='px-2 pb-2 flex flex-row items-center justify-between'>
              <div className="text-gray-500 text-xs p-1">Functions</div>
              <div
                className='hover:border hover:bg-gray-200' role='button' tabIndex={0}
                onClick={(_e) => setIsModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </div>
            </div>

            {/* render functions */}
            <div className='max-h-[70vh] overflow-y-auto'>
              {renderFunctions()}
            </div>
          </div>

          {/* aux actions pane */}
          <div className="flex flex-col pt-6 mb-4">
            <Link className="flex items-center px-2 interact-bounce hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded" href={`/${workspaceId}/usage`}>
              <HiChartBar />
              <span className="text-sm ml-2 mr-1 text-gray-700 dark:text-gray-300">Usage</span>
            </Link>
            <Link className="flex items-center px-2 interact-bounce hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded" href={`/${workspaceId}/settings`}>
              <BsGearWide />
              <span className="text-sm ml-2 mr-1 text-gray-700 dark:text-gray-300">Settings</span>
            </Link>
          </div>
        </div>
      </div>
      <NewFunctionModal
        show={isModalOpen}
        onClose={(_e) => setIsModalOpen(false)}
        handleCreateFunction={handleCreateFunction}
        newFunctionName={newFunctionName}
        setNewFunctionName={setNewFunctionName}
      />
    </>
  );
}
