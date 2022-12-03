import { Badge, Navbar, Select } from "flowbite-react"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PlaygroundEditor from "../../../../components/playgroundEditor";
import ResultPane from "../../../../components/resultPane";
import logo from "../../../../public/logo.png";
import { supabase } from '../../../../common/supabase';

export default function Share({ initialPrompt, model, config }) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [result, setResult] = useState({
    output: '',
    tokens: '0',
    duration_s: '0.0'
  });

  const handleRun = () => { }

  const navbar = () => {
    return (
      <Navbar
        fluid={true}
        rounded={true}
        className='pt-4'
      >
        <Link href={`/`}>
          <Image src={logo} alt="LLMHub logo" className="inline mr-1" />
        </Link>
        <div className="flex md:order-2">
          <Badge
            color="pink"
            size="sm"
          >
            Mode: view & run
          </Badge>
        </div>
      </Navbar>
    )
  }

  const configPanel = () => {
    return (
      <div className="px-4 min-w-[18rem]">
        <h2 className="text-xs text-gray-800 mb-4">CONFIG</h2>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-800">Model</div>
            <div>{model}</div>
          </div>
          {Object.entries(config).map(([key, value], index) => {
            return (
              <div className="flex items-center justify-between" key={`config-${index}`}>
                <div className="text-xs text-gray-800">{key}</div>
                <div>{value}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <>
      {navbar()}
      <div className="max-h-screen px-5 mt-10 flex overflow-y-hidden scrollbar-hide">
        <div className='flex-1'>
          <div className="flex flex-col">
            <PlaygroundEditor
              prompt={prompt}
              setPrompt={setPrompt}
              handleRun={handleRun}
              handleDeploy={null}
              experimentHistory={null}
            />
            <ResultPane
              output={result.output}
              tokens={result.tokens}
              duration_s={result.duration_s}
            />
          </div>
        </div>
        {configPanel()}
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { workspaceId, id } = params
  console.log(params)
  let error, functions;
  (
    { data: functions, error } = await supabase
      .from('functions')
      .select(`
        experiments!functions_current_experiment_id_fkey (
          id,
          prompt,
          model,
          config
        )
      `)
      .eq('id', id)
  )

  const experiment = functions && functions[0].experiments;
  return {
    props: {
      initialPrompt: experiment.prompt || '',
      model: experiment.model || '',
      config: experiment.config || {}
    }
  };
}
