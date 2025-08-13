from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/sensor", methods = ["POST"])
def sensor():
    nombre = request.json  ['nombre']
    valor = request.json  ['valor']
    print(f"nombre :{nombre} , valor : {valor}") #se ve en la terminal
    return "ok" #se ve en postman
#lo corremos en postman ya que en el navegador no se puede utilizar el POST
