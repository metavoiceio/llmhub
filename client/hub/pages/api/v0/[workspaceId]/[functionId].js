export default function handler(req, res) {
  const { workspaceId, functionId } = req.query
  res.end(`/api/v0/${workspaceId}/${functionId}`);
}
