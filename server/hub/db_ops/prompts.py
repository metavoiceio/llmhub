from fastapi import APIRouter
from pydantic import BaseModel

from server.hub.db_ops.utils import supabase

router = APIRouter(prefix="/prompts")
table = supabase.table("prompts")


class PromptCreationRequest(BaseModel):
    instruction: str
    owner_id: str
    app_id: int


# create prompt
@router.post("/")
async def create_prompt(request: PromptCreationRequest):
    table.insert(
        {"instruction": request.instruction, "owner_id": request.owner_id, "app_id": request.app_id}
    ).execute()
    # TODO: do we need to check for foreign keys manually here?


# read prompt
@router.get("/{prompt_id}")
async def get_prompt(prompt_id: str):
    return table.select("*").eq("id", prompt_id).execute()
