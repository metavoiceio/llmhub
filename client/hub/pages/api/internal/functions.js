// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handleGet = (req) => {
  const rand = Math.floor(Math.random() * 10);
  const ret =  [...Array(rand).keys()].map((value, index) => {
    return {
      id: value,
      name: 'Untitled'
    }
  });

  return JSON.stringify(ret);
}

const handlePost = async (req) => {
  console.log(await req.json());
  const ret = {
    id: Math.floor(Math.random() * 10),
    name: 'Untitled'
  };

  return JSON.stringify(ret);
}

export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json(handleGet(req));
  if (req.method === 'POST') return res.status(201).json(await handlePost(res));
}
