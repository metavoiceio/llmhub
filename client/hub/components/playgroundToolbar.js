import { BsSliders } from "react-icons/bs";

export default function PlaygroundToolbar() {
  const modelSelect = () => {
    return <select id="small" className="block p-2 w-[10rem] text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value="text-davinci-003">text-davinci-003</option>
      <option value="text-davinci-002">text-davinci-002</option>
      <option value="code-davinci-002">code-davinci-002</option>
    </select>
  }

  const settingsDropdown = () => {
    return (
      <>
        <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-md font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
          <BsSliders />
        </button>
        <div id="dropdownDots" className="hidden z-10 w-70 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioHelperButton">
            <li>
              <div className="flex flex-col p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <label htmlFor="temperature" className="font-medium text-gray-900 dark:text-gray-300">
                  Temperature
                </label>
                <input type="number" id="temperature" name="temperature" min={0.0} max={1.0} step={0.1} className="w-full px-2 py-2 outline-none text-sm border-y focus:border-blue-500" />
                <p className="text-xs font-normal text-gray-500 dark:text-gray-300">0.0: shy, 0.5: moderate & 1.0: creative</p>
              </div>
            </li>
            <li>
              <div className="flex flex-col p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <label htmlFor="frequencyPenalty" className="font-medium text-gray-900 dark:text-gray-300">
                  Frequency penalty
                </label>
                <input type="number" id="frequencyPenalty" name="frequencyPenalty" min={0.0} max={1.0} step={0.1} className="w-full px-2 py-2 outline-none text-sm border-y focus:border-blue-500" />
              </div>
            </li>
            <li>
              <div className="flex flex-col p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <label htmlFor="presencePenalty" className="font-medium text-gray-900 dark:text-gray-300">
                  Presence penalty
                </label>
                <input type="number" id="presencePenalty" name="presencePenalty" min={0.0} max={1.0} step={0.1} className="w-full px-2 py-2 outline-none text-sm border-y focus:border-blue-500" />
              </div>
            </li>
          </ul>
        </div>
      </>
    )
  }

  return (
    <div className="flex items-center gap-1 mt-4 mb-2">
      {modelSelect()}
      {settingsDropdown()}
    </div>
  );
}