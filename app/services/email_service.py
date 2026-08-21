"""
Email service — sends contact-form notifications via SMTP.
Falls back gracefully if SMTP is not configured (logs instead).
"""

import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import get_settings
from app.models.schemas import ContactRequest

logger = logging.getLogger("buildlyst.email")


def send_contact_email(data: ContactRequest) -> bool:
    """
    Send a formatted notification email for a new lead.
    Returns True on success, False on failure.
    """
    settings = get_settings()

    if not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
        logger.warning("SMTP credentials not configured — skipping email send.")
        logger.info(
            "Would have sent email for lead: %s <%s> | project: %s",
            data.name, data.email, data.project_type.value,
        )
        return True  # Don't block the form submission

    subject = f"[Buildlyst Lead] {data.project_type.value} — {data.name}"

    html_body = f"""
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0;">🚀 New Lead from Buildlyst</h2>
        </div>
        <div style="background: #1e1b2e; color: #e2e8f0; padding: 24px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #a78bfa;"><strong>Name</strong></td><td>{data.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #a78bfa;"><strong>Email</strong></td><td><a href="mailto:{data.email}" style="color: #60a5fa;">{data.email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #a78bfa;"><strong>Company</strong></td><td>{data.company or "—"}</td></tr>
                <tr><td style="padding: 8px 0; color: #a78bfa;"><strong>Project Type</strong></td><td>{data.project_type.value}</td></tr>
            </table>
            <hr style="border: 1px solid #334155; margin: 16px 0;">
            <p style="line-height: 1.6;">{data.message}</p>
        </div>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = settings.SMTP_FROM_EMAIL or settings.SMTP_USERNAME
    msg["To"] = settings.CONTACT_RECIPIENT_EMAIL
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.sendmail(msg["From"], [msg["To"]], msg.as_string())
        logger.info("Email sent successfully for lead: %s", data.email)
        return True
    except Exception as e:
        logger.error("Failed to send email: %s", str(e))
        return False
