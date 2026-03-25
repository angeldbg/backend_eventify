function actualizarTicket(boton, cambio) {
    const card = boton.closest('.ticket-card');
    const cantidadSpan = card.querySelector('.cantidad');
    let cantidad = parseInt(cantidadSpan.innerText) + cambio;

    if (cantidad < 0) cantidad = 0;
    if (cantidad > 10) {
        alert("Máximo 10 entradas por persona");
        cantidad = 10;
    }

    cantidadSpan.innerText = cantidad;
    calcularTotalGlobal();
}

function calcularTotalGlobal() {
    let total = 0;
    const cards = document.querySelectorAll('.ticket-card');
    cards.forEach(card => {
        const precio = parseInt(card.getAttribute('data-precio'));
        const cantidad = parseInt(card.querySelector('.cantidad').innerText);
        total += precio * cantidad;
    });
    document.getElementById('total-general').innerText = `Total: €${total}`;
}

async function procesarCompra() {
    const totalTexto = document.getElementById('total-general').innerText;
    const totalValor = parseInt(totalTexto.replace('Total: €', ''));

    if (totalValor === 0) {
        alert("❌ Selecciona al menos un ticket.");
        return;
    }

    const tickets = [];
    document.querySelectorAll('.ticket-card').forEach(card => {
        const cant = parseInt(card.querySelector('.cantidad').innerText);
        if (cant > 0) {
            tickets.push({
                tipo: card.querySelector('h3').innerText,
                cantidad: cant
            });
        }
    });

    try {
        const respuesta = await fetch('http://127.0.0.1:3000/api/comprar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: tickets, total: totalValor })
        });
        if (respuesta.ok) {
            alert("✅ ¡Compra guardada en la base de datos!");
            location.reload();
        }
    } catch (error) {
        alert("❌ Error al conectar con el servidor.");
    }
}

async function validarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const status = document.getElementById('form-status');

    if (nombre.length < 3) {
        status.innerText = "❌ Por favor, ingresa un nombre válido.";
        status.style.color = "#ff4d4d";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        status.innerText = "❌ El formato del correo no es válido.";
        status.style.color = "#ff4d4d";
        return;
    }

    // En esta parte envio los datos del formulario al backend para guardarlos.
    try {
        const res = await fetch('http://127.0.0.1:3000/api/contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, mensaje })
        });
        
        if (res.ok) {
            status.innerText = "✅ ¡Mensaje guardado en MongoDB!";
            status.style.color = "#2ed573";
            document.getElementById('contact-form').reset();
        }
    } catch (e) {
        status.innerText = "❌ Error al conectar con el servidor.";
    }
}
