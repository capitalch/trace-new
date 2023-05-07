from fastapi import FastAPI, Request
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import BaseModel
app = FastAPI()


class EmailMessage(BaseModel):
    subject: str
    recipients: list[str]
    body: str


@app.get('/api')
async def api():
    return ({"message": "ok"})

# @app.middleware("http")
# async def process(request:Request, call_next):
#     response = await call_next(request)
#     return(response)

conf = ConnectionConfig(
    MAIL_USERNAME="admin@kushinfotech.in",
    MAIL_PASSWORD="su$hant123",
    MAIL_FROM="admin@kushinfotech.in",
    MAIL_PORT=587,
    MAIL_SERVER="mail.kushinfotech.in",
    # MAIL_TLS = True,
    # MAIL_SSL = False,
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=False
)


@app.post("/send-email/")
async def send_email():
    body = f'<html><p>This is a paragraph</p><button>My button</button> </html>'
    message = MessageSchema(subject='Subject', body=body,recipients=['capitalch@gmail.com'], subtype=MessageType.html,)
    # email_data = {
    #     "subject": "Test email",
    #     "body": "Test email",
    #     "recipients": ["capitalch@gmail.com"],
    # }
    # message = MessageSchema(**email_data)
    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "Email sent successfully"}
