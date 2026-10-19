from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import threading
import webbrowser

ROOT = Path(__file__).resolve().parent
PORT = 8000


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)


url = f"http://localhost:{PORT}"
server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
print(f"ECCode Chinese Keyboard Studio is running at {url}")
print("Keep this window open while using the app. Press Ctrl+C to stop.")
threading.Timer(1.0, lambda: webbrowser.open(url)).start()

try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    server.server_close()
