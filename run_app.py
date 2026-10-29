from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import threading
import webbrowser

ROOT = Path(__file__).resolve().parent

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
port = server.server_address[1]
url = f'http://127.0.0.1:{port}'
print(f'ECCode Code Studio is running at {url}')
print('Keep this window open while using the app. Press Ctrl+C to stop.')
threading.Timer(0.8, lambda: webbrowser.open(url)).start()
try:
    server.serve_forever()
except KeyboardInterrupt:
    print('\nServer stopped.')
finally:
    server.server_close()
