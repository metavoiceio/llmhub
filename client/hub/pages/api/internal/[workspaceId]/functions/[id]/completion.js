function mockCompletionApiCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      output: 'This is a generated output by a LLM'
    }), 2000);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(500).json({ error: 'Invalid request' });

  console.log(req.body);

  // call completion API
  await mockCompletionApiCall();

  // update db

  // return to frontend
  return res.status(201).json({ status: 'success' })
}
