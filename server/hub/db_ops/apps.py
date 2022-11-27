from fastapi import APIRouter
from pydantic import BaseModel

from server.hub.db_ops.utils import supabase

router = APIRouter(prefix="/apps")
table = supabase.table("apps")


class AppCreationRequest(BaseModel):
    current_prompt_id: str
    owner_id: str


class AppUpdateRequest(BaseModel):
    app_id: str
    current_prompt_id: str


# create app
@router.post("/")
async def create_app(request: AppCreationRequest):
    table.insert(
        {"current_prompt_id": request.current_prompt_id, "owner_id": request.owner_id}
    ).execute()
    # TODO: do we need to check for foreign keys manually here?


# (update app) deploy -> update current_prompt_id in apps table
@router.put("/")
async def update_app(request: AppUpdateRequest):
    table.update({"current_prompt_id": request.current_prompt_id}).eq(
        "id", request.app_id
    ).execute()


# read app
@router.get("/{app_id}")
async def get_app(app_id: str):
    return table.select("*").eq("id", app_id).execute()
