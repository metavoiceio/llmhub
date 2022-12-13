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
  "salesforce": <img
    src="https://aeiljuispo.cloudimg.io/v7/https://s3.amazonaws.com/moonup/production/uploads/1602756670970-noauth.jpeg?w=200&h=200&f=face"
    viewBox="0 0 32 32"
    width={16}
    height={16}
  >
  </img>,
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
