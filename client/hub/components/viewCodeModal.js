import { Accordion, Modal } from "flowbite-react"
import { useState } from "react"
import CodeSnippet from "./codeSnippet";

const setupCli = `npm install -g llmhub
llmhub auth`;

const integrateInCode = (url, inputKeys) => {
  let input = '{\n';
  inputKeys.forEach((k, idx) => {
    input += `\t${k}: 'VARIABLE VALUE GOES HERE',\n`
  })
  input += '}'
  const ret = `const LLMHub = require("llmhub")
const llmhub = new LLMHub('${url}')
llmhub.run(${input}).then(({ output }) => { console.log(output) });`

  return ret;
}

export default function ViewCodeModal({ shareUrl, inputKeys }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={e => setIsOpen(true)}
      >
        View Code
      </button>
      <Modal
        show={isOpen}
        size="3xl"
        onClose={e => setIsOpen(false)}
      >
        <Modal.Header>
          View Code
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm font-light">You can use the following code to start integrating your current function and associated settings into your application.</p>

          <Accordion flush={true} alwaysOpen={true} className="mb-4">
            <Accordion.Panel>
              <Accordion.Title>
                One-time setup
              </Accordion.Title>
              <Accordion.Content>
                <p className="text-sm font-light">
                  Run the following once per machine instance
                </p>
                <CodeSnippet
                  codeString={setupCli}
                  language={'bash'}
                />
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

          <CodeSnippet
            codeString={integrateInCode(shareUrl, inputKeys)}
            language={'js'}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
