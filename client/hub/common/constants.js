export const WORKSPACE_ID = 'test_id';

export const REDIRECT_NOTFOUND_OBJ = {
  redirect: {
    permanent: false,
    destination: "/notfound",
  },
  props: {},
};

const PROVIDER_TO_LOGOS = {
  "openai": <svg xmlns="http://www.w3.org/2000/svg" id="openai-symbol" viewBox="0 0 32 32" width={16} height={16}>
    <path d="M29.71,13.09A8.09,8.09,0,0,0,20.34,2.68a8.08,8.08,0,0,0-13.7,2.9A8.08,8.08,0,0,0,2.3,18.9,8,8,0,0,0,3,25.45a8.08,8.08,0,0,0,8.69,3.87,8,8,0,0,0,6,2.68,8.09,8.09,0,0,0,7.7-5.61,8,8,0,0,0,5.33-3.86A8.09,8.09,0,0,0,29.71,13.09Zm-12,16.82a6,6,0,0,1-3.84-1.39l.19-.11,6.37-3.68a1,1,0,0,0,.53-.91v-9l2.69,1.56a.08.08,0,0,1,.05.07v7.44A6,6,0,0,1,17.68,29.91ZM4.8,24.41a6,6,0,0,1-.71-4l.19.11,6.37,3.68a1,1,0,0,0,1,0l7.79-4.49V22.8a.09.09,0,0,1,0,.08L13,26.6A6,6,0,0,1,4.8,24.41ZM3.12,10.53A6,6,0,0,1,6.28,7.9v7.57a1,1,0,0,0,.51.9l7.75,4.47L11.85,22.4a.14.14,0,0,1-.09,0L5.32,18.68a6,6,0,0,1-2.2-8.18Zm22.13,5.14-7.78-4.52L20.16,9.6a.08.08,0,0,1,.09,0l6.44,3.72a6,6,0,0,1-.9,10.81V16.56A1.06,1.06,0,0,0,25.25,15.67Zm2.68-4-.19-.12-6.36-3.7a1,1,0,0,0-1.05,0l-7.78,4.49V9.2a.09.09,0,0,1,0-.09L19,5.4a6,6,0,0,1,8.91,6.21ZM11.08,17.15,8.38,15.6a.14.14,0,0,1-.05-.08V8.1a6,6,0,0,1,9.84-4.61L18,3.6,11.61,7.28a1,1,0,0,0-.53.91ZM12.54,14,16,12l3.47,2v4L16,20l-3.47-2Z" />
  </svg>,
  "cohere": <img
    src="https://cohere.ai/apple-touch-icon.png"
    viewBox="0 0 32 32"
    width={16}
    height={16}
  >
  </img>,
  "google": <img
    src="https://aeiljuispo.cloudimg.io/v7/https://s3.amazonaws.com/moonup/production/uploads/1584056834195-5dd96eb166059660ed1ee413.png?w=200&h=200&f=face"
    viewBox="0 0 32 32"
    width={16}
    height={16}
  >
  </img>,
  "salesforce":
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 92 64">
      <g fill="none" fillRule="evenodd">
        <path fill="#00A1E0" d="M38.05 6.98c2.948-3.071 7.055-4.978 11.595-4.978 6.035 0 11.302 3.366 14.106 8.363a19.494 19.494 0 0 1 7.974-1.695c10.886 0 19.71 8.902 19.71 19.885 0 10.983-8.824 19.885-19.71 19.885-1.331 0-2.629-.133-3.884-.386-2.469 4.403-7.177 7.379-12.578 7.379-2.261 0-4.4-.52-6.303-1.451C46.456 59.872 40.623 64 33.826 64c-7.078 0-13.112-4.48-15.427-10.761a15.176 15.176 0 0 1-3.137.327C6.833 53.567 0 46.663 0 38.146a15.442 15.442 0 0 1 7.631-13.357 17.662 17.662 0 0 1-1.46-7.053C6.171 7.94 14.122 0 23.93 0a17.73 17.73 0 0 1 14.12 6.98" />
        <path fill="#FFF" d="M13.244 33.19l.37-1.027c.059-.176.192-.118.246-.085.103.061.177.116.31.194 1.09.689 2.1.696 2.415.696.816 0 1.322-.432 1.322-1.015v-.03c0-.634-.78-.874-1.681-1.15l-.2-.064c-1.237-.352-2.56-.861-2.56-2.427v-.032c0-1.486 1.199-2.523 2.915-2.523l.188-.002c1.008 0 1.982.293 2.688.721.064.04.126.114.09.212l-.38 1.027c-.067.175-.25.059-.25.059a5.41 5.41 0 0 0-2.382-.611c-.728 0-1.196.386-1.196.91v.033c0 .611.802.872 1.732 1.175l.16.05c1.233.39 2.549.93 2.549 2.415v.031c0 1.605-1.166 2.602-3.041 2.602-.921 0-1.802-.142-2.734-.637-.176-.102-.35-.19-.522-.315-.018-.026-.097-.057-.04-.207zm27.457 0l.371-1.027c.054-.168.211-.106.245-.085.102.063.178.116.31.194 1.092.689 2.1.696 2.418.696.813 0 1.32-.432 1.32-1.015v-.03c0-.634-.779-.874-1.68-1.15l-.2-.064c-1.239-.352-2.562-.861-2.562-2.427v-.032c0-1.486 1.2-2.523 2.916-2.523l.187-.002c1.008 0 1.983.293 2.69.721.062.04.125.114.09.212-.035.091-.347.931-.38 1.027-.069.175-.25.059-.25.059a5.41 5.41 0 0 0-2.383-.611c-.728 0-1.196.386-1.196.91v.033c0 .611.801.872 1.732 1.175l.16.05c1.233.39 2.548.93 2.548 2.415v.031c0 1.605-1.165 2.602-3.04 2.602-.922 0-1.803-.142-2.734-.637-.176-.102-.35-.19-.523-.315-.018-.026-.097-.057-.039-.207zm20.31-4.829c.154.516.23 1.083.23 1.682 0 .6-.076 1.165-.23 1.681a3.77 3.77 0 0 1-.71 1.361 3.384 3.384 0 0 1-1.204.906c-.48.22-1.044.33-1.678.33-.634 0-1.2-.11-1.678-.33a3.384 3.384 0 0 1-1.204-.906 3.793 3.793 0 0 1-.711-1.36 5.909 5.909 0 0 1-.23-1.682c0-.6.077-1.166.23-1.682.154-.52.393-.978.71-1.36a3.442 3.442 0 0 1 1.205-.914c.479-.224 1.042-.337 1.678-.337.636 0 1.199.113 1.678.337.478.223.884.53 1.204.914.318.382.558.84.71 1.36zm-1.564 1.682c0-.907-.168-1.62-.502-2.12-.33-.496-.83-.736-1.526-.736-.696 0-1.192.24-1.518.736-.327.5-.494 1.213-.494 2.12 0 .906.167 1.624.496 2.128.324.502.82.745 1.516.745.696 0 1.196-.244 1.526-.745.332-.504.502-1.222.502-2.128zm14.422 2.63l.384 1.062c.05.13-.063.187-.063.187-.593.23-1.416.394-2.217.394-1.358 0-2.398-.391-3.092-1.163-.69-.77-1.042-1.817-1.042-3.116 0-.601.087-1.17.257-1.685.17-.52.425-.978.761-1.36a3.613 3.613 0 0 1 1.261-.914c.5-.223 1.088-.335 1.744-.335.443 0 .837.027 1.175.077.361.056.842.186 1.045.265.037.014.14.064.098.185-.148.417-.249.689-.386 1.069-.06.162-.182.108-.182.108-.515-.162-1.009-.236-1.654-.236-.775 0-1.357.258-1.737.763-.384.509-.599 1.176-.602 2.063-.003.973.241 1.694.673 2.14.431.445 1.033.67 1.791.67.307 0 .597-.02.858-.061.258-.041.5-.121.728-.21 0 0 .147-.055.2.097zm8.01-4.607c.341 1.194.163 2.225.157 2.282-.013.136-.153.138-.153.138l-5.299-.004c.033.805.226 1.375.616 1.762.383.379.991.622 1.814.623 1.258.003 1.795-.25 2.176-.391 0 0 .145-.052.2.092l.345.971c.07.163.014.22-.045.253-.332.183-1.137.525-2.669.529-.743.003-1.39-.103-1.923-.31a3.502 3.502 0 0 1-1.333-.883 3.497 3.497 0 0 1-.769-1.347 5.713 5.713 0 0 1-.239-1.692c0-.6.077-1.17.232-1.691.155-.525.396-.988.717-1.377a3.479 3.479 0 0 1 1.221-.93c.486-.229 1.088-.341 1.75-.341.567 0 1.085.122 1.516.308.332.142.666.399 1.008.767.216.232.545.74.678 1.241zm-5.27 1.107h3.78c-.039-.486-.134-.922-.352-1.25-.332-.496-.79-.769-1.485-.769-.696 0-1.19.273-1.517.769-.214.328-.352.746-.427 1.25zm-37.175-1.107c.34 1.194.165 2.225.159 2.282-.014.136-.154.138-.154.138l-5.3-.004c.034.805.226 1.375.617 1.762.383.379.99.622 1.813.623 1.258.003 1.797-.25 2.177-.391 0 0 .145-.052.199.092l.346.971c.07.163.014.22-.044.253-.334.183-1.14.525-2.67.529-.744.003-1.391-.103-1.923-.31a3.514 3.514 0 0 1-1.334-.883 3.506 3.506 0 0 1-.767-1.347 5.68 5.68 0 0 1-.241-1.692c0-.6.078-1.17.232-1.691a3.88 3.88 0 0 1 .718-1.377 3.488 3.488 0 0 1 1.22-.93c.488-.229 1.09-.341 1.75-.341a3.85 3.85 0 0 1 1.518.308c.332.142.666.399 1.007.767.216.232.545.74.677 1.241zm-5.271 1.107h3.782c-.04-.486-.135-.922-.352-1.25-.33-.496-.79-.769-1.485-.769-.696 0-1.191.273-1.516.769-.216.328-.353.746-.43 1.25zm-9.346-.253s.418.037.874.103v-.224c0-.707-.147-1.04-.436-1.263-.296-.226-.738-.343-1.31-.343 0 0-1.29-.016-2.31.538-.047.028-.086.044-.086.044s-.128.045-.174-.086L21 26.681c-.058-.145.047-.211.047-.211.477-.372 1.633-.597 1.633-.597a8.711 8.711 0 0 1 1.421-.131c1.058 0 1.877.246 2.434.733.558.489.842 1.277.842 2.339l.003 4.848s.011.14-.122.172c0 0-.195.054-.37.095-.177.041-.815.171-1.336.259a9.744 9.744 0 0 1-1.61.134c-.515 0-.987-.048-1.403-.143a2.92 2.92 0 0 1-1.079-.468 2.192 2.192 0 0 1-.69-.829c-.163-.333-.245-.74-.245-1.21 0-.461.097-.872.284-1.222.188-.348.446-.643.77-.874a3.425 3.425 0 0 1 1.105-.513c.413-.11.852-.167 1.306-.167.333 0 .611.007.827.024zm-2.109 3.724c-.003-.001.475.375 1.554.309.758-.046 1.43-.19 1.43-.19v-2.41s-.678-.111-1.439-.122c-1.079-.013-1.539.384-1.536.383-.318.226-.473.561-.473 1.025 0 .297.053.529.16.691.067.107.096.147.304.314zm44.855-6.455c-.05.145-.307.871-.4 1.112-.034.092-.09.155-.193.144 0 0-.304-.07-.582-.07-.191 0-.464.024-.71.1a1.586 1.586 0 0 0-.654.393c-.194.187-.351.45-.465.78-.116.332-.176.86-.176 1.39v3.948a.16.16 0 0 1-.16.161h-1.391a.162.162 0 0 1-.164-.16v-7.905c0-.089.065-.16.154-.16h1.357c.09 0 .154.071.154.16v.646c.203-.272.567-.512.896-.66.33-.15.699-.26 1.366-.22.347.021.798.116.889.151a.144.144 0 0 1 .079.19zm-13.07-3.663c.037.015.138.064.098.184l-.407 1.113c-.034.084-.056.134-.229.082a2.388 2.388 0 0 0-.707-.11c-.21 0-.4.027-.568.083a1.084 1.084 0 0 0-.444.274 1.545 1.545 0 0 0-.372.566c-.195.56-.27 1.157-.28 1.195h1.694c.143 0 .188.066.174.171l-.198 1.102c-.032.16-.177.154-.177.154h-1.746l-1.193 6.756a10.426 10.426 0 0 1-.466 1.78c-.187.489-.38.846-.69 1.187a2.43 2.43 0 0 1-.979.682c-.367.135-.813.204-1.3.204-.232 0-.482-.005-.777-.075a4.198 4.198 0 0 1-.485-.142c-.065-.023-.118-.106-.08-.212.036-.105.35-.964.392-1.077.054-.136.192-.084.192-.084.094.04.16.066.285.091.127.025.297.047.426.047.231 0 .441-.028.624-.09.22-.071.35-.2.484-.372.14-.181.254-.426.371-.755.117-.333.224-.773.316-1.306l1.188-6.633h-1.17c-.14 0-.188-.066-.172-.172l.196-1.102c.031-.16.18-.154.18-.154h1.201l.065-.358c.18-1.064.537-1.873 1.065-2.404.531-.535 1.286-.805 2.244-.805.274 0 .516.018.721.055.201.038.354.073.524.125zM30.817 33.986c0 .09-.062.161-.152.161H29.26c-.09 0-.151-.072-.151-.16V22.674c0-.087.062-.159.15-.159h1.406c.09 0 .152.072.152.16v11.311z" />
      </g>
    </svg>,
}

export const MODELS_INFO = {
  'text-davinci-003': {
    description: {
      token_max_length: 4000,
      logo: PROVIDER_TO_LOGOS["openai"],
      rep_size: 6,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'text-davinci-002': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["openai"],
      rep_size: 6,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'text-curie-001': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["openai"],
      rep_size: 4,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'text-babbage-001': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["openai"],
      rep_size: 3,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'text-ada-001': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["openai"],
      rep_size: 2,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'cohere-command-xlarge-20221108': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["cohere"],
      rep_size: 6,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'cohere-xlarge': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["cohere"],
      rep_size: 6,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'cohere-large': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["cohere"],
      rep_size: 4,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'cohere-medium': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["cohere"],
      rep_size: 3,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'flan-t5-xl': {
    description: {
      token_max_length: 1000,
      logo: PROVIDER_TO_LOGOS["google"],
      rep_size: 3.5,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'code-davinci-002': {
    description: {
      token_max_length: 8000,
      logo: PROVIDER_TO_LOGOS["openai"],
      rep_size: 6,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'code-cushman-001': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["openai"],
      rep_size: 5,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
  'codegen-16B-multi': {
    description: {
      token_max_length: 2048,
      logo: PROVIDER_TO_LOGOS["salesforce"],
      rep_size: 5,
    },
    config:
    {
      temperature: 0.7,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maximumLength: 256,
      stopSequences: "",
    },
  },
}

export const INITIAL_MODEL_CONFIGS = {};
Object.keys(MODELS_INFO).forEach((model_name, index) => {
  INITIAL_MODEL_CONFIGS[model_name] = MODELS_INFO[model_name].config;
});
// TODO: This model has no parameters!
// TODO: parameters for models for different providers will have different moving
// TODO: add top_p

const TOKEN_MAX_LENGTHS = Object.keys(MODELS_INFO).map((model_name, index) => {
  return MODELS_INFO[model_name].description.token_max_length;
});

export const SUPPORTED_MODELS = Object.keys(INITIAL_MODEL_CONFIGS);
export const RENDER_CONFIG_INDEX = {};
Object.keys(INITIAL_MODEL_CONFIGS).forEach((key, index) => {
  RENDER_CONFIG_INDEX[key] = {
    temperature: {
      min: 0.0,
      max: 1.0,
      default: 0.7,
      helper: 'Rigid: 0.0, Moderate: 0.5 & Creative 1.0',
      friendlyName: 'Temperature',
      step: 0.1
    },
    frequencyPenalty: {
      min: 0.0,
      max: 1.0,
      helper: '',
      default: 0.0,
      friendlyName: 'Frequency Penalty',
      step: 0.1
    },
    presencePenalty: {
      min: 0.0,
      max: 1.0,
      helper: '',
      default: 0.0,
      friendlyName: 'Presence Penalty',
      step: 0.1
    },
    maximumLength: {
      min: 1,
      // TODO: Note: this is the MAX length of the prompt+input, whereas this is only accounting for the input.
      // TODO: fix using MODELS_INFO
      max: TOKEN_MAX_LENGTHS[index],
      helper: '',
      friendlyName: 'Maximum length',
      default: 256,
      step: 10
    },
    stopSequences: {}
  }
});

// TODO sidroopdaska: replace with above
export const ATTR_FRIENDLY_NAME_INDEX = {
  'temperature': 'Temperature',
  'presencePenalty': 'Presence Penalty',
  'frequencyPenalty': 'Frequency Penalty',
  'maximumLength': 'Maximum length',
  'stopSequences': 'Stop Sequences',
}
