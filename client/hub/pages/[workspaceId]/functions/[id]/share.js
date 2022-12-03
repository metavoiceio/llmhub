import { Badge, Navbar } from "flowbite-react"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PlaygroundEditor from "../../../../components/playgroundEditor";
import ResultPane from "../../../../components/resultPane";
import logo from "../../../../public/logo.png";

export default function Share() {
  const [result, setResult] = useState({
    output: '',
    tokens: '0',
    duration_s: '0.0'
  });

  const navbar = () => {
    return (
      <Navbar
        fluid={true}
        rounded={true}
        className='pt-4'
      >
        <Navbar.Brand href="https://flowbite.com/">
          <Link href={`http://localhost:3000`}>
            <Image src={logo} alt="LLMHub logo" className="inline mr-1" />
          </Link>
        </Navbar.Brand>
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
            <div>text-davinci-003</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-800">Temperature</div>
            <div>0.7</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-800">Frequency Penalty</div>
            <div>0.7</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-800">Presence penalty</div>
            <div>0.7</div>
          </div>
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
            <PlaygroundEditor />
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
