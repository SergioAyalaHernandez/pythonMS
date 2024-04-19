async function obtenerMedicamentos() {
    const response = await fetch('http://localhost:8000/medicamentos');
    const data = await response.json();

    mostrarMedicamentos(data);
}

function mostrarMedicamentos(data) {
    const medicamentosContainer = document.getElementById('medicamentos-container');
    medicamentosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar la tabla
    const tablaMedicamentos = crearTablaMedicamentos(data);
    medicamentosContainer.appendChild(tablaMedicamentos);
}

function crearTablaMedicamentos(data) {
    const tabla = document.createElement('table');
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>URL</th>
            </tr>
        </thead>
        <tbody>
            ${data.map(medicamento => `
                <tr>
                    <td>${medicamento.id}</td>
                    <td>${medicamento.nombre}</td>
                    <td><a href="${medicamento.url}" target="_blank">${medicamento.url}</a></td>
                </tr>
            `).join('')}
        </tbody>
    `;
    return tabla;
}
document.getElementById('obtener-medicamentos').addEventListener('click', obtenerMedicamentos);
async function obtenerMedicamentoPorId(id) {
    const response = await fetch(`http://localhost:8000/medicamentos/${id}`);
    const data = await response.json();
    console.log(data);
}
obtenerMedicamentoPorId(1); // Ejemplo de ID

// scripts.js

async function crearMedicamento(nombre, url) {
    const response = await fetch('http://localhost:8000/medicamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: nombre, url: url })
    });
    const data = await response.json();

    if (response.ok) {
        // Creación exitosa, actualizar la vista
        const medicamentosContainer = document.getElementById('medicamentos-container');
        const nuevoMedicamentoElement = document.createElement('div');
        nuevoMedicamentoElement.id = `medicamento-${data.id}`;
        nuevoMedicamentoElement.innerHTML = `
            <p>ID: ${data.id}</p>
            <p>Nombre: ${data.nombre}</p>
            <p>URL: <a href="${data.url}" target="_blank">${data.url}</a></p>
        `;
        medicamentosContainer.appendChild(nuevoMedicamentoElement);
    } else {
        console.error('Error al crear el medicamento:', data.error);
    }
}

document.getElementById('crear-medicamento').addEventListener('click', function() {
    const nuevoNombre = prompt('Ingrese el nombre del nuevo medicamento:');
    const nuevaURL = prompt('Ingrese la URL del nuevo medicamento:');
    if (nuevoNombre && nuevaURL) {
        crearMedicamento(nuevoNombre, nuevaURL);
    } else {
        console.error('Debe ingresar el nombre y la URL del medicamento.');
    }
});


// scripts.js

async function actualizarMedicamento(id, nombre, url) {
    const response = await fetch(`http://localhost:8000/medicamentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: nombre, url: url })
    });
    const data = await response.json();

    if (response.ok) {
        // Actualización exitosa, actualizar la vista
        const medicamentoElement = document.getElementById(`medicamento-${id}`);
        if (medicamentoElement) {
            medicamentoElement.innerHTML = `
                <p>ID: ${data.id}</p>
                <p>Nombre: ${data.nombre}</p>
                <p>URL: <a href="${data.url}" target="_blank">${data.url}</a></p>
            `;
        } else {
            console.error('No se encontró el elemento a actualizar.');
        }
    } else {
        console.error('Error al actualizar el medicamento:', data.error);
    }
}

document.getElementById('actualizar-medicamento').addEventListener('click', function() {
    const idAActualizar = prompt('Ingrese el ID del medicamento a actualizar:');
    if (idAActualizar) {
        const nuevoNombre = prompt('Ingrese el nuevo nombre:');
        const nuevaURL = prompt('Ingrese la nueva URL:');
        actualizarMedicamento(parseInt(idAActualizar), nuevoNombre, nuevaURL);
    }
});


async function eliminarMedicamento(id) {
    const response = await fetch(`http://localhost:8000/medicamentos/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();

    if (response.ok) {
        // Eliminación exitosa, actualizar la vista
        const medicamentoElement = document.getElementById(`medicamento-${id}`);
        if (medicamentoElement) {
            medicamentoElement.remove(); // Eliminar el elemento de la lista
        } else {
            console.error('No se encontró el elemento a eliminar.');
        }
    } else {
        console.error('Error al eliminar el medicamento:', data.error);
    }
}

document.getElementById('eliminar-medicamento').addEventListener('click', function() {
    const idAEliminar = prompt('Ingrese el ID del medicamento a eliminar:');
    if (idAEliminar) {
        eliminarMedicamento(parseInt(idAEliminar)); // Convertir a número
    }
});


document.getElementById('obtener-medicamentos').addEventListener('click', obtenerMedicamentos);
    document.getElementById('obtener-medicamento').addEventListener('click', function() {
        obtenerMedicamentoPorId(1); // Ejemplo de ID
    });
    document.getElementById('crear-medicamento').addEventListener('click', function() {
        crearMedicamento('Nuevo Medicamento', 'https://ejemplo.com/nuevo');
    });
    document.getElementById('actualizar-medicamento').addEventListener('click', function() {
        actualizarMedicamento(1, 'Paracetamol Modificado', 'https://ejemplo.com/paracetamol-modificado');
    });
    document.getElementById('eliminar-medicamento').addEventListener('click', function() {
        eliminarMedicamento(1); // Ejemplo de ID
    });
