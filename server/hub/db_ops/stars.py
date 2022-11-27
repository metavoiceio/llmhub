from fastapi import APIRouter
from pydantic import BaseModel

from server.hub.db_ops.utils import supabase

router = APIRouter(prefix="/stars")
table = supabase.table("stars")


class AddStarRequest(BaseModel):
    user_id: str
    app_id: str


# (create) star
@router.post("/")
async def create_star(request: AddStarRequest):
    table.insert({"user_id": request.user_id, "app_id": request.app_id}).execute()
    # TODO: do we need to check for foreign keys manually here?


# get stars for a given app
@router.get("/{app_id}")
async def get_star(app_id: str):
    # TODO: check what this returns
    # TODO: check if this works
    # TODO: check if this is efficient?
    return len(table.select("*").eq("app_id", app_id).execute())


# (delete) unstar
@router.delete()
async def delete_star(user_id: str, app_id: str):
    # TODO: verify!
    table.delete().eq("user_id", user_id).eq("app_id", app_id).execute()
