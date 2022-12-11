import PlaygroundHistory from "./playgroundHistory"

export default function PlaygroundEditor({
  prompt, setPrompt, handleRun, experimentHistory, isRunning, handleDeploy, currentDeployment,
  promptVariables, setPromptVariables
}) {

  const renderPromptVariables = () => {
    return Object.entries(promptVariables).map(([key, value], idx) => {
      const id = `prompt-variable-floating-${idx}`
      return <div className="relative" key={id}>
        <input
          type="text"
          id={id}
          name={key}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={event => {
            setPromptVariables({
              ...promptVariables,
              [key]: event.target.value
            })
          }}
          value={value}
        />
        <label
          htmlFor={id}
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
            {key}
        </label>
      </div>
    });
  }

  return (
    <div className="flex">
      <form onSubmit={handleRun} className='flex-1'>
        <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-500">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-900">
            <label htmlFor="prompt" className="sr-only">Your prompt</label>
            <textarea
              id="prompt"
              rows="18"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-900 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
              placeholder="Enter prompt..."
              onChange={event => {
                let matches = event.target.value.match(/{{(.+?)}}/g);
                if (matches) matches = matches.map(match => match.replace(/{{|}}/g, ''));

                let matchesObj = {}
                if (matches) matches.forEach((m, idx) => matchesObj[m] = '')

                setPromptVariables(matchesObj)
                setPrompt(event.target.value)
              }}
              value={prompt}
              required
              disabled={!handleRun}
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <button
                type="submit"
                className="focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg py-2.5 px-4 text-xs mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isRunning || !handleRun}
              >
                Run
              </button>
              {experimentHistory && <PlaygroundHistory history={experimentHistory} currentDeployment={currentDeployment} />}
            </div>
            <div className="flex pl-0 space-x-1 sm:pl-2">
              {
                handleDeploy && <button
                  className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isRunning || experimentHistory && experimentHistory.length === 0}
                  onClick={handleDeploy}
                >
                  Deploy
                </button>
              }
            </div>
          </div>
        </div>
      </form>
      {/* TODO: use grid to fix width and avoid popping effect */}
      <div className="p-2 px-4 py-4 flex flex-col gap-1">
        <div className="text-xs mb-4">PROMPT VARIABLES</div>
        {
          Object.keys(promptVariables).length > 0 ? 
            renderPromptVariables() :
            <>
              <div className="text-sm">No variables found</div>
              <div className="text-sm">Create via<code className="font-mono m-2 p-1 bg-gray-100 border rounded-sm dark:text-gray-700">&#123;&#123;variable&#125;&#125;</code></div>
            </>
        }
      </div>
    </div>
  )
}
