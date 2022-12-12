{/* TODO sidroopdaska: use grid to fix width and avoid popping effect */ }
export default function PromptVariables({ promptVariables, setPromptVariables }) {
  const renderVariables = () => {
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
    <div className="p-2 px-4 py-4 flex flex-col gap-1">
      <div className="text-xs mb-4">PROMPT VARIABLES</div>
      {
        Object.keys(promptVariables).length > 0 ?
          renderVariables() :
          <>
            <div className="text-sm">No variables found</div>
            <div className="text-sm">Create via<code className="font-mono m-2 p-1 bg-gray-100 border rounded-sm dark:text-gray-700">&#123;&#123;variable&#125;&#125;</code></div>
          </>
      }
    </div>
  )
}
