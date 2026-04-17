from flask import Flask, request, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/status')
def status():
    return {"logado": False}

@app.route('/receber', methods=['POST'])
def recebe_dados():
    nome = request.form.get('nome')
    print(nome)

    return redirect('http://127.0.0.1:5500/graficos.html')

app.run(debug=True)