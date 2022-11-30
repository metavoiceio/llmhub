import { BsSliders } from "react-icons/bs";
import { SUPPORTED_MODELS, RENDER_CONFIG_INDEX } from "../common/constants";

export default function PlaygroundToolbar(
  { selectedModel, setSelectedModel, modelConfigs, setModelConfigs }
) {
  const modelSelect = () => {
    return (
      <select
        id="models"
        className="block p-2 w-[10rem] text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedModel}
        onChange={event => setSelectedModel(event.target.value)}
      >
        {
          SUPPORTED_MODELS.map((m, index) => <option value={m} key={`${m}-${index}`}>{m}</option>)
        }
      </select>
    )
  }

  const settingsDropdown = () => {
    const renderConfig = RENDER_CONFIG_INDEX[selectedModel];
    const selectedModelConfig = modelConfigs[selectedModel];

    return (
      <>
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="settingsDropdown"
          className="inline-flex items-center p-2 text-md font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <BsSliders />
        </button>
        <div
          id="settingsDropdown"
          className="hidden z-10 w-70 bg-white shadow-md rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioHelperButton">
            {
              Object.entries(renderConfig).map(([key, value], index) => {
                return (
                  <li key={index}>
                    <div className="flex flex-col p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <label htmlFor={key} className="font-medium text-gray-900 dark:text-gray-300">
                        {value.friendlyName}
                      </label>
                      <input
                        type="number"
                        id={key}
                        name={key}
                        min={value.min}
                        max={value.max}
                        step={value.step}
                        className="w-full px-2 py-2 outline-none text-sm border-y focus:border-blue-500"
                        value={selectedModelConfig[key]}
                        onInput={event => setModelConfigs({
                          ...modelConfigs,
                          [selectedModel]: {
                            ...selectedModelConfig,
                            [key]: parseFloat(event.target.value)
                          }
                        })}
                      />
                    </div>
                  </li>
                )
              })
            }
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