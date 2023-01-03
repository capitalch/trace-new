from fastapi import APIRouter, Body, Depends, FastAPI,  Form,  Header, HTTPException,  Path, Query, Request,  status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ariadne import load_schema_from_path, make_executable_schema, QueryType
from ariadne.asgi import GraphQL, graphql
from asyncpg import connect, create_pool
from pydantic import BaseModel
from typing import Any