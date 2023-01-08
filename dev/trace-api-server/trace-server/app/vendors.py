from fastapi import APIRouter, Body, Depends, FastAPI,  Form,  Header, HTTPException,  Path, Query, Request,  status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from ariadne import load_schema_from_path, make_executable_schema, QueryType, MutationType
from ariadne.asgi import GraphQL, graphql
# from asyncpg import connect, Connection, create_pool, Record
# from asyncpg.prepared_stmt import PreparedStatement
from pydantic import BaseModel, ValidationError
# from jose import jwt
import jwt
from passlib.context import CryptContext
from typing import Any, List
from asyncio import set_event_loop_policy, WindowsSelectorEventLoopPolicy
# import asyncio
