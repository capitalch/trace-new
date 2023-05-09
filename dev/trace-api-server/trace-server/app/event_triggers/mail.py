from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app import Config

mail_conf = ConnectionConfig(
    MAIL_USERNAME=Config.MAIL_USER_NAME,
    MAIL_PASSWORD=Config.MAIL_PASSWORD,
    MAIL_FROM=Config.MAIL_FROM,
    MAIL_PORT=Config.MAIL_PORT,
    MAIL_SERVER=Config.MAIL_SERVER,
    
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=False
)

async def send_email(subject: str, body: str, recipients: list[str]):
    body = f'<html><p>This is a paragraph</p><button>My button</button> </html>'
    message = MessageSchema(subject=subject, body=body,recipients=recipients, subtype=MessageType.html,)
   
    fm = FastMail(mail_conf)
    await fm.send_message(message)
    return {"message": "Email sent successfully"}