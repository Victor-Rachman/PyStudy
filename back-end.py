from flask import Flask, request, redirect, session
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "123"
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5500"])

@app.route('/status')
def status():
    return {"logado": session.get("logado", False)}

@app.route('/login', methods=['POST'])
def recebe_dados():
    nome = request.form.get('nome')
    session['logado'] = True

    return redirect('http://127.0.0.1:5500/graficos.html')

app.run(debug=True)