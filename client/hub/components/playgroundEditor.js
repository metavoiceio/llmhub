import PlaygroundHistory from "./playgroundHistory"
import PromptVariables from "./promptVariables";

// TODO sidroopdaska: move <PromptVariables /> back into this function and better handle
// share mode
export default function PlaygroundEditor({
  prompt, setPrompt, handleRun, experimentHistory, isRunning, handleDeploy, currentDeployment,
  promptVariables, setPromptVariables, isSharing
}) {
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
              disabled={isSharing}
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
      {!isSharing &&
        <PromptVariables
          promptVariables={promptVariables}
          setPromptVariables={setPromptVariables}
        />
      }
    </div>
  )
}
