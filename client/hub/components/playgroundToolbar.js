import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { BsSliders } from "react-icons/bs";
import { SUPPORTED_MODELS, RENDER_CONFIG_INDEX } from "../common/constants";

export default function PlaygroundToolbar(
  { selectedModel, setSelectedModel, modelConfigs, setModelConfigs }
) {
  const [error, setError] = useState('');

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

  const renderStopSequences = (selectedModelConfig) => {
    return (
      <li key='stopSequenceKey'>
        <div className="flex flex-col p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <label htmlFor={'stopSequences'} className="mb-1 font-medium text-gray-900 dark:text-gray-300">
            Stop Sequences
          </label>
          <input
            id={"stopSequences"}
            name={"stopSequences"}
            className="w-full px-2 py-2 rounded outline-none text-xs border focus:border-blue-500"
            value={selectedModelConfig['stopSequences']}
            onInput={event => {
              if (event.target.value.split(',').length > 4) {
                setError('Provided more than four example sequences. Only first four will be considered')
              } else {
                setError('')
              }

              setModelConfigs({
                ...modelConfigs,
                [selectedModel]: {
                  ...selectedModelConfig,
                  'stopSequences': event.target.value
                }
              })
            }}
          />
          <span>Max. four comma separated sequences</span>
          <span className="text-xs text-red-500 break-normal">{error}</span>
        </div>
      </li>
    )
  }

  // TODO sidroopdaska: change this to be inline on the playground
  const settingsDropdown = () => {
    const renderConfig = RENDER_CONFIG_INDEX[selectedModel];
    const selectedModelConfig = modelConfigs[selectedModel];

    return (
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <div className="ml-2">
            <BsSliders className="text-lg" />
          </div>
        }
      >
        <ul className="p-2 text-xs text-gray-700 dark:text-gray-200 max-w-[15rem]" aria-labelledby="dropdownRadioHelperButton">
          {
            Object.entries(renderConfig).map(([key, value], index) => {
              if (key === 'stopSequences') return renderStopSequences(selectedModelConfig);
              return (
                <li key={index}>
                  <div className="flex flex-col p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label htmlFor={key} className="mb-1 font-medium text-gray-900 dark:text-gray-300">
                      {value.friendlyName}
                    </label>
                    <input
                      type="number"
                      id={key}
                      name={key}
                      min={value.min}
                      max={value.max}
                      step={value.step}
                      className="w-full px-2 py-2 rounded outline-none text-xs border-y focus:border-blue-500"
                      value={selectedModelConfig[key]}
                      onInput={event => setModelConfigs({
                        ...modelConfigs,
                        [selectedModel]: {
                          ...selectedModelConfig,
                          [key]: parseFloat(event.target.value)
                        }
                      })
                      }
                    />
                    <span>{value.helper}</span>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </Dropdown>
    )
  }

  return (
    <div className="flex items-center gap-1 mt-4 mb-2">
      {modelSelect()}
      {settingsDropdown()}
    </div>
  );
}

// TODO: replace input.number with range
{/* <li>
  <form>
    <div>
      <input id="rangeInput" type="range" min="0" max="200" onInput={event => {
        console.log(event.target.value);
        document.getElementById('amount').value = event.target.value;
      }} />
      <input id="amount" type="number" defaultValue="100" min="0" max="200" onInput={event => {
        document.getElementById('rangeInput').value = event.target.value;
        // document.getElementById('amount').value = document.getElementById('rangeInput').value;
        console.log(document.getElementById('rangeInput').value);
      }} />
    </div>
  </form>
</li> */}