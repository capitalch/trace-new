from ariadne import QueryType, make_executable_schema, load_schema_from_path
from ariadne.asgi import GraphQL
from ariadne.constants import PLAYGROUND_HTML
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List,  Tuple