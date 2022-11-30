export default function handler(req, res) {
  const { workspaceId, id } = req.query
  res.end(`/${workspaceId}/functions/${id}/completion`)
}