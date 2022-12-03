
export default function ResultPane({ output, num_tokens, duration_s }) {
  return (
    <div className='mt-[2px] h-[calc(25vh)] bg-[#f0f0f0] border rounded p-2 px-6 overflow-y-auto'>
      <div className="flex flex-col">
        {/* top bar */}
        <div className="flex gap-10 mb-4">
          <div className="flex flex-col">
            <div className="text-sm">{num_tokens}</div>
            <div className="text-xs text-gray-800">num_tokens</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm">{duration_s}s</div>
            <div className="text-xs text-gray-800">duration</div>
          </div>
        </div>
        {/* output */}
        <div className="text-sm">
          {
            output ?
              output :
              <span>
                Click<code className="font-mono m-2 p-2 bg-gray-100 border rounded-sm">Run</code>to execute prompt
              </span>
          }
        </div>
      </div>
    </div>
  )
}
