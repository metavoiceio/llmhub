export const WORKSPACE_ID = 'test_id';
export const BASE_API_URL = 'http://localhost:3000/api/internal'

export const REDIRECT_NOTFOUND_OBJ = {
  redirect: {
    permanent: false,
    destination: "/notfound",
  },
  props: {},
};

export const INITIAL_MODEL_CONFIGS = {
  'text-davinci-003': {
    temperature: 0.0,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0
  },
  'text-davinci-002': {
    temperature: 0.0,
    presencePenalty: 0.0,
    frequencyPenalty: 0.0
  }
};

export const SUPPORTED_MODELS = Object.keys(INITIAL_MODEL_CONFIGS);
export const RENDER_CONFIG_INDEX = {
  'text-davinci-003': {
    temperature: {
      min: 0.0,
      max: 1.0,
      helper: '',
      friendlyName: 'Temperature',
      step: 0.1
    },
    frequencyPenalty: {
      min: 0.0,
      max: 1.0,
      helper: '',
      friendlyName: 'Frequency Penalty',
      step: 0.1
    },
    presencePenalty: {
      min: 0.0,
      max: 1.0,
      helper: '',
      friendlyName: 'Presence Penalty',
      step: 0.1
    }
  },
  'text-davinci-002': {
    temperature: {
      min: 0.0,
      max: 1.0,
      helper: '',
      friendlyName: 'Temperature',
      step: 0.1
    },
    frequencyPenalty: {
      min: 0.0,
      max: 1.0,
      helper: '',
      friendlyName: 'Frequency Penalty',
      step: 0.1
    },
    presencePenalty: {
      min: 0.0,
      max: 1.0,
      helper: '',
      friendlyName: 'Presence Penalty',
      step: 0.1
    }
  }
}

export const ATTR_FRIENDLY_NAME_INDEX = {
  'temperature': 'Temperature',
  'presencePenalty': 'Presence Penalty',
  'frequencyPenalty': 'Frequency Penalty',
}
