export const WORKSPACE_ID = 'test_id';

export const REDIRECT_NOTFOUND_OBJ = {
  redirect: {
    permanent: false,
    destination: "/notfound",
  },
  props: {},
};

export const INITIAL_MODEL_CONFIGS = {
  'text-davinci-003': {
    temperature: 0.7,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0,
    maximumLength: 256,
    stopSequences: "",
  },
  'code-davinci-002': {
    temperature: 0.7,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0,
    maximumLength: 256,
    stopSequences: "",
  },
  'code-cushman-001': {
    temperature: 0.7,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0,
    maximumLength: 256,
    stopSequences: "",
  },
  'text-curie-001': {
    temperature: 0.7,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0,
    maximumLength: 256,
    stopSequences: "",
  },
  'text-babbage-001': {
    temperature: 0.7,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0,
    maximumLength: 256,
    stopSequences: "",
  },
  'text-ada-001': {
    temperature: 0.7,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0,
    maximumLength: 256,
    stopSequences: "",
  }
};

const TOKEN_MAX_LENGTHS = [4000, 8000, 2048, 2048, 2048, 2048];

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
