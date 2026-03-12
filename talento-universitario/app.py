from flask import Flask, send_from_directory
from backend.routes.instituciones import instituciones_bp
from backend.routes.perfil_academico import perfil_bp

app = Flask(__name__, static_folder='.', static_url_path='')
app.secret_key = 'secret_key'

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

app.register_blueprint(instituciones_bp)
app.register_blueprint(perfil_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5500)