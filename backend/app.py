from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from auth.routes import auth_bp
from blockchain.routes import blockchain_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(blockchain_bp)
from api.project_routes import project_bp
app.register_blueprint(project_bp)

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 3000))
    app.run(host='0.0.0.0', port=port, debug=True)
