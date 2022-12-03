import { Badge, Navbar } from "flowbite-react"
import Image from "next/image";
import Link from "next/link";
import PlaygroundEditor from "../../../../components/playgroundEditor";
import logo from "../../../../public/logo.png";

export default function Share() {
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

  const resultPane = () => {
    return (
      <div className='mt-[2px] h-[calc(25vh)] bg-[#f0f0f0] border rounded p-2 overflow-y-auto'>
        <div className="flex flex-col">
          {/* top bar */}
          <div className="flex gap-10 mb-4">
            <div className="flex flex-col">
              <div className="text-sm">1024</div>
              <div className="text-xs text-gray-800">tokens</div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm">2.4s</div>
              <div className="text-xs text-gray-800">duration</div>
            </div>
          </div>
          {/* output */}
          <p className="text-sm">
            Show results here...
          </p>
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
            {resultPane()}
          </div>
        </div>
        {configPanel()}
      </div>
    </>
  )
}
