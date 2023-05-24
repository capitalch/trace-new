from .mail import send_email
from app.vendors import BaseModel, status
from app import AppHttpException, Messages


class EmailParams(BaseModel):
    subject: str
    body: str
    recipents: list[str]


async def on_success_send_mail(records, triggerParams: EmailParams):
    try:
        subject = triggerParams.get('subject', None)
        email = triggerParams.get('email', None)
        body = triggerParams.get('body', None)
        if((subject == None) or (email == None) or (body == None)):
            raise Exception
        await send_email(subject=subject, body=body, recipients=[email])
    except Exception as e:
        raise AppHttpException(
            detail=Messages.err_email_send_error, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, error_code='e1016'
        )

