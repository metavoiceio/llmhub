from fastapi import APIRouter
from pydantic import BaseModel

from server.hub.db_ops.utils import supabase

router = APIRouter(prefix="/users")
table = supabase.table("users")


class UserCreateRequest(BaseModel):
    user_id: str


# create user
@router.post("/")
async def create_user(user: UserCreateRequest):
    table.insert({"id": user.user_id}).execute()
    # TODO: do we need to check for foreign keys manually here?


# read user
@router.get("/{user_id}")
async def get_user(user_id: str):
    # TODO: check what this returns
    # TODO: check if this works
    # TODO: check if this is efficient?
    return table.select("*").eq("id", user_id).execute()
