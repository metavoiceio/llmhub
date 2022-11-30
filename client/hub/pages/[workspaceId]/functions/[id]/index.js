
import { useRouter } from "next/router";
import { useState } from "react";
import { getFunctions, supabase } from "../../../../common/supabase";
import FunctionsNavbar from "../../../../components/functionsNavBar";
import PlaygroundEditor from "../../../../components/playgroundEditor";
import PlaygroundToolbar from "../../../../components/playgroundToolbar";
import AuthSideBar from "../../../../components/sidebar";

const initialConfig = {
  temperature: 0.0,
  presencePenalty: 0.0,
  frequencyPenalty: 0.0
};

export default function Function({ functions, selectedFunction }) {
  const router = useRouter();
  const { workspaceId, id } = router.query;
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('text-davinci-003');
  const [modelConfig, setModelConfig] = useState(initialConfig);

  const handleRun = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(prompt);
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} functions={functions} />

      <div className="h-full flex flex-col overflow-y-auto flex-1 mx-4">
        <FunctionsNavbar workspaceId={workspaceId} functionId={id} mode="playground" />
        <PlaygroundToolbar
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          modelConfig={modelConfig}
          setModelConfig={setModelConfig}
        />
        <PlaygroundEditor
          prompt={prompt}
          setPrompt={setPrompt}
          handleRun={handleRun}
        />
        {/* {renderResultsPane()} */}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let { workspaceId, id } = params;

  // get selected function
  let { data: selectedFunction, error } = await supabase
    .from('functions')
    .select(`*`)
    .eq('id', id);

  return {
    props: {
      functions: await getFunctions(workspaceId),
      selectedFunction: selectedFunction[0]
    }
  };
}
