from fastapi import APIRouter
from pydantic import BaseModel

from server.hub.db_ops.utils import supabase

router = APIRouter(prefix="/usage")
table = supabase.table("usage")


class UsageCreationRequest(BaseModel):
    prompt_id: str
    user_id: str
    app_id: str
    input: str
    output: str
    num_tokens: int


# (create usage) run -> usage
@router.post("/")
async def create_usage(request: UsageCreationRequest):
    table.insert(
        {
            "prompt_id": request.prompt_id,
            "user_id": request.user_id,
            "app_id": request.app_id,
            "input": request.input,
            "output": request.output,
            "num_tokens": request.num_tokens,
        }
    ).execute()
    # TODO: do we need to check for foreign keys manually here?
