from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


medicamentos = [
    {'id': 1, 'nombre': 'Paracetamol', 'url': 'https://ejemplo.com/paracetamol'},
    {'id': 2, 'nombre': 'Ibuprofeno', 'url': 'https://ejemplo.com/ibuprofeno'}
]

@app.route('/medicamentos', methods=['GET'])
def get_medicamentos():
    return jsonify(medicamentos)


@app.route('/medicamentos/<int:id>', methods=['GET'])
def get_medicamento(id):
    for medicamento in medicamentos:
        if medicamento['id'] == id:
            return jsonify(medicamento)
    return jsonify({'error': 'Medicamento no encontrado'}), 404


@app.route('/medicamentos', methods=['POST'])
def crear_medicamento():
    nuevo_medicamento = {
        'id': len(medicamentos) + 1,
        'nombre': request.json['nombre'],
        'url': request.json['url']
    }
    medicamentos.append(nuevo_medicamento)
    return jsonify(nuevo_medicamento), 201


@app.route('/medicamentos/<int:id>', methods=['PUT'])
def actualizar_medicamento(id):
    for medicamento in medicamentos:
        if medicamento['id'] == id:
            medicamento['nombre'] = request.json.get('nombre', medicamento['nombre'])
            medicamento['url'] = request.json.get('url', medicamento['url'])
            return jsonify(medicamento)
    return jsonify({'error': 'Medicamento no encontrado'}), 404


@app.route('/medicamentos/<int:id>', methods=['DELETE'])
def eliminar_medicamento(id):
    for i, medicamento in enumerate(medicamentos):
        if medicamento['id'] == id:
            del medicamentos[i]
            return jsonify({'message': 'Medicamento eliminado correctamente'})
    return jsonify({'error': 'Medicamento no encontrado'}), 404

@app.route('/index')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=8000)
