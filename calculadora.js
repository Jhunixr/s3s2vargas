// Calculadora de Ganancias en Apuestas //

document.getElementById('apuestaForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    

    const BONO_ADICIONAL = 0.05; // 5%
    const LIMITE_CUOTAS_BONO = 3.0;
    

    const resultadoDiv = document.getElementById('resultado');
    
    try {

        const monto = parseFloat(document.getElementById('monto').value);
        const cuotas = parseFloat(document.getElementById('cuotas').value);

        if (isNaN(monto) || monto <= 0) {
            throw new Error("El monto debe ser un número mayor a cero");
        }
        
        if (isNaN(cuotas) || cuotas < 1) {
            throw new Error("Las cuotas deben ser un número mayor o igual a 1");
        }
        
        // Calcular ganancia base
        let ganancia = monto * cuotas;
        let mensajeBono = "";
        let aplicaBono = false;
        
        // Verificar si aplica bono adicional
        if (cuotas > LIMITE_CUOTAS_BONO) {
            const bono = ganancia * BONO_ADICIONAL;
            ganancia += bono;
            mensajeBono = ` (incluye bono del ${BONO_ADICIONAL * 100}%)`;
            aplicaBono = true;
        }
        

        let resultadoHTML = `
            <h3>Resultado del cálculo:</h3>
            <p><strong>Monto apostado:</strong> $${monto.toFixed(2)}</p>
            <p><strong>Cuotas:</strong> ${cuotas.toFixed(2)}</p>
            <p><strong>Ganancia potencial:</strong> $${ganancia.toFixed(2)}${mensajeBono}</p>
        `;
        
        if (aplicaBono) {
            resultadoHTML += `<p class="info">¡Felicitaciones! Obtuviste un bono por arriesgarte con las cuotas altas.</p>`;
        }
        
        resultadoDiv.innerHTML = resultadoHTML;
        
    } catch (error) {
        resultadoDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
});