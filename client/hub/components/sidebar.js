import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { HiChartBar } from 'react-icons/hi';
import { BsGearWide, BsBraces, BsThreeDots } from 'react-icons/bs';
import logo from "../public/android-chrome-233x233.png";
import NewFunctionModal from './newFunctionModal';
import { toast } from 'react-toastify';
import { Tooltip } from 'flowbite-react';

export default function AuthSideBar({ workspaceId, functions, forkUrl, functionId = '' }) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFunctionName, setNewFunctionName] = useState('');
  const [functionToFork, setFunctionToFork] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (forkUrl) {
      setIsModalOpen(true)
      setFunctionToFork(forkUrl)
    }
  }, [forkUrl])

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  }

  const handleCreateFunction = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsRunning(true);

    const res = await fetch(`/api/internal/${workspaceId}/functions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newFunctionName,
        functionToFork
      })
    });

    if (res.status < 300) {
      refreshData();
      toast("Function successfully created!", { type: 'success' });
    } else {
      console.log(await res.json());
      toast("Unable to make function", { type: 'error' });
    }
    setIsModalOpen(false);
    setNewFunctionName('');
    setFunctionToFork('');
    setIsRunning(false);
  }

  useEffect(() => {
    setIsRefreshing(false);
  }, [functions])

  const renderFunctions = () => {
    return functions.map((funcData, _index) => {
      const highlight = parseInt(functionId) === funcData.id ? 'bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700' : 'dark:hover:bg-gray-700 hover:bg-gray-200'
      return (
        <Link
          key={funcData.id}
          id={funcData.id}
          role={"button"}
          tabIndex={0}
          className={`group p-1 rounded flex items-center text-start gap-1 ${highlight} text-black hover:text-black`}
          href={`/${workspaceId}/functions/${funcData.id}`}
        >
          <div className="p-1 h-6 flex items-center justify-center rounded">
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
    <div
      onClick={e => setShowSidebar(false)}
      className={showSidebar ? `fixed z-100 w-full bg-black` : null}
    >
      <button className={`sm:hidden ${showSidebar && 'hidden'} px-4 py-2`}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          setShowSidebar(!showSidebar)
        }}
      >
        <svg width="1.2em" height="1.2em" viewBox="0 0 27 32" fill="currentColor" aria-hidden="true" focusable="false" className="rs-icon" aria-label="bars" data-category="legacy"><path d="M27.429 24v2.286c0 .625-.518 1.143-1.143 1.143H1.143A1.151 1.151 0 010 26.286V24c0-.625.518-1.143 1.143-1.143h25.143c.625 0 1.143.518 1.143 1.143zm0-9.143v2.286c0 .625-.518 1.143-1.143 1.143H1.143A1.151 1.151 0 010 17.143v-2.286c0-.625.518-1.143 1.143-1.143h25.143c.625 0 1.143.518 1.143 1.143zm0-9.143V8c0 .625-.518 1.143-1.143 1.143H1.143A1.151 1.151 0 010 8V5.714c0-.625.518-1.143 1.143-1.143h25.143c.625 0 1.143.518 1.143 1.143z"></path></svg>
      </button>
      <div
        className={`${!showSidebar && 'hidden'} sm:flex select-auto w-[260px] max-w-[530px] min-w-[200px] box-border shrink-0`}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className="flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-200 border-r-[1px] dark:border-r-gray-500 px-2 overflow-auto w-full h-[100vh]">
          {/* sidebar header */}
          <Link className="pt-4 flex items-center px-1 text-sm text-black" href={`/${workspaceId}`}>
            <Image src={logo} alt="LLMHub logo" className="inline mr-1" width={48} />
            &nbsp;{workspaceId}
          </Link>

          {/* functions */}
          <div className="pt-8 grow">
            <div className='px-2 pb-2 flex flex-row items-center justify-between'>
              <div className="text-gray-500 text-xs p-1 dark:text-gray-400">Functions</div>
              <Tooltip
                style="light"
                content="Self-contained task. Equivalent to one prompt of a LLM."
                placement="bottom"
                className='font-normal max-w-[15rem]'
              >
                <button
                  className='hover:border hover:bg-gray-200 dark:hover:bg-gray-600 rounded' role='button' tabIndex={0}
                  onClick={(_e) => setIsModalOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </button>
              </Tooltip>
            </div>

            {/* render functions */}
            <div className='max-h-[70vh] overflow-y-auto flex flex-col gap-1'>
              {renderFunctions()}
            </div>
          </div>

          {/* aux actions pane */}
          <div className="flex flex-col pt-6 mb-8">
            {/* <Link className="flex items-center px-2 interact-bounce hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded" href={`/${workspaceId}/usage`}>
              <HiChartBar />
              <span className="text-sm ml-2 mr-1 text-gray-700 dark:text-gray-300">Usage</span>
            </Link> */}
            <Link className="flex items-center px-2 interact-bounce hover:bg-gray-100 dark:hover:bg-gray-800 py-1 rounded" href={`/${workspaceId}/settings`}>
              <BsGearWide className='text-black' />
              <span className="text-sm ml-2 mr-1 dark:text-gray-300 text-black">Settings</span>
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
        functionToFork={functionToFork}
        setFunctionToFork={setFunctionToFork}
        isRunning={isRunning}
      />
    </div>
  );
}
