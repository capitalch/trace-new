# from app.event_triggers import onSuccessChangeUid
from .event_triggers_functions import on_success_send_mail

event_triggers_map = {
    "on_success_send_mail": on_success_send_mail
}
