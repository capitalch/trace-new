from fastapi import FastAPI, APIRouter, Request, Body, Form, HTTPException, status, Path, Query, Header, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ariadne import load_schema_from_path, make_executable_schema, QueryType
from ariadne.asgi import GraphQL, graphql
from ariadne.constants import PLAYGROUND_HTML
from asyncpg import connect, create_pool
from pydantic import BaseModel
from starlette.exceptions import HTTPException as SarletHttpException


class Settings(BaseModel):
    key: str = 'ABCD'
    value: str = 'hhhfg'

settings = Settings()
