export default function handler(req, res) {
  const { workspaceId } = req.query
  res.end(`/${workspaceId}`)
}