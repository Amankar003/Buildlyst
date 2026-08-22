import sys
import os

# Fix windows encoding issue for printing emojis/special characters
sys.stdout.reconfigure(encoding='utf-8')

# Ensure the app directory can be imported
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.chat_service import get_reply

def run_tests():
    test_cases = [
        ("Test 1 (Greeting)", "hii"),
        ("Test 2 (Info)", "What does Buildlyst do?"),
        ("Test 3 (Project/Business)", "I own a gym and need a website."),
        ("Test 4 (Restaurant AI)", "I want an AI chatbot for my restaurant."),
        ("Test 5 (Pricing)", "How much does it cost?"),
        ("Test 6 (Technical)", "Would RAG or fine-tuning be better for a company knowledge chatbot?"),
        ("Test 7 (Hire/Project)", "I want to hire Buildlyst for a project."),
        ("Test 8 (Out of domain)", "What is the capital of France?"),
    ]
    
    # We will test using a single session to see context, but also isolated to prevent contamination.
    # To test isolated behavior, we use different conversation IDs.
    print("Running Chatbot Tests...\n" + "="*50)
    for name, user_msg in test_cases:
        print(f"\n{name}\nUser: {user_msg}")
        try:
            reply, _ = get_reply(user_msg, conversation_id=None)
            print(f"Bot: {reply}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    run_tests()
