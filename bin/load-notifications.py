#!/usr/bin/env python3
# Fetch notifications from main server and show them on this computer
import os
import sys
import time
import requests

HOST="10.7.0.1"
PORT="3005"
interval=5

def notify(message, title=None, priority="normal", time=5000):
    """Sends a notification using libnotify"""
    os.system(f"notify-send -t {time} -a {__file__} '{title}' '{message}'")

if __name__ == "__main__":
    while True:
        time.sleep(interval)

        # Get next unread notification
        r = requests.get("http://%s:%s/" % (HOST, PORT))
        if r.status_code == 204:
            continue
        if r.status_code != 200:
            print("Failed to load notifications...", file=sys.stderr)

        # Show notification with libnotify
        notification = r.json();
        print("Notification", notification)
        notify(notification.get("message"), notification.get("title"))
