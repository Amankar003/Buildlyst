"""
Lead & subscriber storage — SQLite operations.
"""

import logging
import sqlite3
from app.database import get_db
from app.models.schemas import ContactRequest

logger = logging.getLogger("buildlyst.storage")


def save_lead(data: ContactRequest) -> int:
    """
    Insert a new lead into the leads table.
    Returns the new row id.
    """
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO leads (name, email, company, project_type, message)
            VALUES (?, ?, ?, ?, ?)
            """,
            (data.name, data.email, data.company, data.project_type.value, data.message),
        )
        conn.commit()
        lead_id = cursor.lastrowid
        logger.info("Lead saved — id=%d, email=%s", lead_id, data.email)
        return lead_id


def subscribe_email(email: str) -> dict:
    """
    Add an email to the subscribers table.
    Returns {"success": True/False, "message": "..."}.
    """
    with get_db() as conn:
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO subscribers (email) VALUES (?)",
                (email,),
            )
            conn.commit()
            logger.info("New subscriber: %s", email)
            return {"success": True, "message": "Successfully subscribed to the newsletter!"}
        except sqlite3.IntegrityError:
            logger.info("Duplicate subscriber attempt: %s", email)
            return {"success": False, "message": "This email is already subscribed."}
        except Exception as e:
            logger.error("Subscriber insert failed: %s", str(e))
            return {"success": False, "message": "An error occurred. Please try again later."}
