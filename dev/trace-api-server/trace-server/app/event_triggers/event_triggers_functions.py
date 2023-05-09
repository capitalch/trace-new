from .mail import send_email

async def onSuccessChangeUid(records, triggerParams):
    await send_email(subject='test', body='Testing',recipients=['capitalch@gmail.com'])
    pass