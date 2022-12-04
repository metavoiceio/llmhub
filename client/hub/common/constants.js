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
  'text-davinci-002': {
    temperature: 0.7,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0,
    maximumLength: 256,
    stopSequences: "",
  }
};

export const SUPPORTED_MODELS = Object.keys(INITIAL_MODEL_CONFIGS);
export const RENDER_CONFIG_INDEX = {
  'text-davinci-003': {
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
      max: 4000,
      helper: '',
      friendlyName: 'Maximum length',
      default: 256,
      step: 10
    },
    stopSequences: {}
  },
  'text-davinci-002': {
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
      max: 4000,
      helper: '',
      friendlyName: 'Maximum length',
      default: 256,
      step: 10
    },
    stopSequences: {}
  }
}

// TODO sidroopdaska: replace with above
export const ATTR_FRIENDLY_NAME_INDEX = {
  'temperature': 'Temperature',
  'presencePenalty': 'Presence Penalty',
  'frequencyPenalty': 'Frequency Penalty',
  'maximumLength': 'Maximum length',
  'stopSequences': 'Stop Sequences',
}
