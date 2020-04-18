#!/usr/bin/env python3
# Fetch notifications from main server and show them on this computer
import os
import sys
import time
import requests
import subprocess

HTTP_SERVER=os.getenv("HTTP_SERVER", "http://127.0.0.1:3000")
POLL_INT=int(os.getenv("POLL_INT", 5))

def notify(message, title=None, priority="normal", time=5000):
    """Sends a notification using libnotify"""
    app_name = os.path.basename(__file__)
    subprocess.run(["notify-send",
                    "-t", str(time),
                    "-a", app_name,
                    title,
                    message])

if __name__ == "__main__":
    while True:
        time.sleep(POLL_INT)

        # Get next unread notification
        r = requests.get("%s/" % (HTTP_SERVER))
        if r.status_code == 204:
            continue
        if r.status_code != 200:
            print("Failed to load notifications...", file=sys.stderr)

        # Show notification with libnotify
        notification = r.json();
        print("Notification", notification)
        notify(notification.get("message"), notification.get("title"))
