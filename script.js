let currentStep = 1;

function showStep(step) {
    document.querySelectorAll('.step').forEach(stepElement => {
        stepElement.style.display = 'none';
    });
    const currentStepElement = document.getElementById(`step-${step}`);
    currentStepElement.style.display = 'block';
    
    // Automatically focus on the first input field or select element in the current step
    const inputField = currentStepElement.querySelector('input, select');
    if (inputField) {
        inputField.focus();
    }
}

function nextStep(step) {
    currentStep = step + 1;
    showStep(currentStep);
}

function prevStep(step) {
    currentStep = step - 1;
    showStep(currentStep);
}

function calculateEstimate() {
    const height = parseFloat(document.getElementById('height').value);
    const radius1 = parseFloat(document.getElementById('radius1').value);
    const radius2 = parseFloat(document.getElementById('radius2').value);
    const canopyHeight = parseFloat(document.getElementById('canopyHeight').value);
    const density = parseInt(document.getElementById('density').value);
    const trimLevel = parseInt(document.getElementById('trimLevel').value);

    // BasicTrim Calculation
    const basicTrim = (height * 3) + (radius1 * 1.5) + (radius2 * 1.5) + (canopyHeight * 2);

    // Trim Level and Density Multipliers
    const multipliers = {
        1: {1: 1.1, 2: 1.2, 3: 1.7, 4: 4.3},
        2: {1: 1.4, 2: 1.6, 3: 2.2, 4: 5.1},
        3: {1: 1.7, 2: 2.0, 3: 2.8, 4: 6.2},
        4: {1: 2.0, 2: 2.4, 3: 3.4, 4: 7.2}
    };

    const multiplier = multipliers[density][trimLevel];
    const cost = basicTrim * multiplier;

    document.getElementById('result').innerText = `Estimated Cost: $${cost.toFixed(2)}`;
    document.getElementById('downloadButton').style.display = 'block'; // Show the download button
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const height = document.getElementById('height').value;
    const radius1 = document.getElementById('radius1').