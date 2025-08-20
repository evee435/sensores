from flask import Flask, g, request, jsonify
import sqlite3

app = Flask(__name__)

def dict_factory(cursor, row):
 """Arma un diccionario con los valores de la fila."""
 fields = [column[0] for column in cursor.description]
 return {key: value for key, value in zip(fields, row)}

def abrirConexion():
  if 'db' not in g:
     g.db = sqlite3.connect("valores.sqlite")
     g.db.row_factory = dict_factory
  return g.db


def cerrarConexion(e=None):
   db = g.pop('db', None)
   if db is not None:
       db.close()

app.teardown_appcontext(cerrarConexion)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/sensor", methods = ["POST"])
def sensor():
    abrirConexion()
    nombre = request.json  ['nombre']
    valor = request.json  ['valor']
    print(f"nombre :{nombre} , valor : {valor}") #se ve en la terminal

    cerrarConexion()
    res = {"resultado": "ok"} #return jsonify ({"resultado":"ok"})
    return jsonify(res)  #se ve en postman
#cuando el objeto es muy grande conviene usar una intermedia,
#jsonify convierte diccionarios y lista(listas simples) a JSON valido
#lo corremos en postman ya que en el navegador no se puede utilizar el POST

#agregue codigo de conexion a la basa de datos