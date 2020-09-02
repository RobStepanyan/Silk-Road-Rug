from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from smtplib import SMTP_SSL
from email.mime.text import MIMEText


def send_email(request, user, html_path, to_email, mail_subject, mail_login, mail_pass):
    current_url = get_current_site(request)
    message = render_to_string(
        html_path,
        {
            'user': user,
            'request': request,
            'domain': current_url.domain,
            'uid': urlsafe_base64_encode(force_bytes(user.id)),
            'token': account_activation_token.make_token(user)
        }
    )

    try:
        with SMTP_SSL('smtp.yandex.ru', 465) as server:
            msg = MIMEText(message, 'html')
            msg['Subject'] = mail_subject
            msg['From'] = f'SilkRoadRugInc.com <{mail_login}>'

            server.login(mail_login, mail_pass)
            server.sendmail(from_addr=mail_login,
                            to_addrs=to_email, msg=msg.as_string())
        return
    except Exception:
        raise Exception
