import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { BsSliders } from "react-icons/bs";
import { MODELS_INFO, RENDER_CONFIG_INDEX } from "../common/constants";

export default function PlaygroundToolbar(
  { selectedModel, setSelectedModel, modelConfigs, setModelConfigs }
) {
  const [error, setError] = useState('');

  const modelSelect = () => {
    console.log(selectedModel);
    return (
      <Dropdown
        label={selectedModel}
      >
        {
          Object.keys(MODELS_INFO).map((model, index) => {
            let toReturn = [];
            if (model === 'code-davinci-002') {
              toReturn.push(<Dropdown.Divider key={`${index}-divider`} />)
            }
            toReturn.push(<Dropdown.Item key={index} onClick={() => setSelectedModel(model)}>
              <div className="flex gap-1 items-center justify-between w-full">
                <div className="text-sm font-medium truncate">
                  {MODELS_INFO[model].description.logo}
                </div>
                <div className="px-0.1 text-gray-300">
                  •
                </div>
                <div className="text-sm grow">
                  {model}
                </div>
                <div className="flex gap-0.5 justify-end">
                  <div className="flex flex-col items-center">
                    <svg width="16" height="16">
                      {/* TODO: change colour */}
                      <circle cx="8" cy="8" r={MODELS_INFO[model].description.rep_size} fill="currentColor" className="bg-gray-800 dark:text-gray-100" />
                    </svg>
                  </div>

                  <div>
                    <code className="text-xs bg-gray-100 rounded-lg p-1 text-green-400">
                      {MODELS_INFO[model].description.token_max_length}
                    </code>
                  </div>
                </div>
              </div>
            </Dropdown.Item>)

            return toReturn;
          })
        }
      </Dropdown>
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
            className="w-full px-2 py-2 rounded outline-none text-xs border focus:border-blue-500 dark:bg-gray-700"
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
          <div className="ml-1 dark:hover:bg-gray-700 rounded p-2">
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
                      className="w-full px-2 py-2 rounded outline-none text-xs border-y focus:border-blue-500 dark:bg-gray-700"
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
