// Helper function to calculate methadone MEQ based on dose
function methadoneMEQ(dose) {
    if (dose >= 61) return dose * 12;
    else if (dose >= 41) return dose * 10;
    else if (dose >= 21) return dose * 8;
    else if (dose >= 1) return dose * 4;
    return 0;
}

// Function to safely parse float and default to zero if NaN
function safeParseFloat(value, defaultValue = 0) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
}

function resetInputs() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = ''; // Reset number inputs
    });
    updateMorphineEquivalence(); // Update to reset all outputs
}

document.getElementById('resetButton').addEventListener('click', resetInputs);

document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});

// Main function to update Morphine Equivalence and Total Morphine based on inputs
function updateMorphineEquivalence() {
    let hmo = safeParseFloat(document.getElementById('hmo').value);
    let hmiv = safeParseFloat(document.getElementById('hmiv').value);
    let kadian = safeParseFloat(document.getElementById('kadian').value);
    let methadone = safeParseFloat(document.getElementById('methadone').value);
    let fentanyl = safeParseFloat(document.getElementById('fentanyl').value);
    let oxycodone = safeParseFloat(document.getElementById('oxycodone').value);
    // NEW: Sufentanil input (daily dose in mcg)
    let sufentanil = safeParseFloat(document.getElementById('sufentanil')?.value);
    let SfentanylPts = safeParseFloat(document.getElementById('SfentanylPts').value);
    let SfentanylPct = safeParseFloat(document.getElementById('SfentanylPct').value, 4.4); // Default to 4%

    // Log values for debugging
    console.log('SfentanylPts:', SfentanylPts);
    console.log('SfentanylPct:', SfentanylPct);

    // Conversion calculations for each drug, rounded to nearest whole number
    //NEW hmo without negative inputs
    let hmoMEQ = 0;
    if (hmo > 0) {
        hmoMEQ = hmo * 4;
    }
    let m0 = Math.round(hmo) + ' mg';
    
    let m1 = Math.round(hmiv * 5) + ' mg';
    let m2 = Math.round(kadian) + ' mg';
    let m3 = Math.round(methadoneMEQ(methadone)) + ' mg';
    let m4 = Math.round(fentanyl * 4) + ' mg';
    //let m5 = Math.round(oxycodone * 1.5) + ' mg';

    //NEW: Oxycodone without negative inputs UNFINISHED
    let oxycodoneMEQ = 0;
    if (oxycodone > 0) {
        oxycodoneMEQ = oxycodone * 1.5;
    }
    let m5 = Math.round(oxycodoneMEQ) + ' mg';
    //NEW: Oxycodone without negative inputs UNFINISHED
    
    // NEW: Sufentanil => 1 mcg = 3 mg morphine
    // If user entered X mcg, total mg = X * 3
    let sufentanilMEQ = 0;
    if (sufentanil > 0) {
        sufentanilMEQ = sufentanil * 3;
    }
    let m7 = Math.round(sufentanilMEQ) + ' mg';

    let m6 = Math.round(SfentanylPts * (SfentanylPct * 100)) + ' mg'; // Assuming percentage calculation

    // Display converted values
    document.getElementById('m0').placeholder = m0;
    document.getElementById('m1').placeholder = m1;
    document.getElementById('m2').placeholder = m2;
    document.getElementById('m3').placeholder = m3;
    document.getElementById('m4').placeholder = m4;
    document.getElementById('m5').placeholder = m5;
    // NEW: Display the Sufentanil MEQ
    if (document.getElementById('m7')) {
        document.getElementById('m7').placeholder = m7;
    }
    document.getElementById('m6').placeholder = m6;

    // Calculate the subtotal for the first six drugs
    let subtotal = Math.round(parseFloat(m0)) + Math.round(parseFloat(m1)) + Math.round(parseFloat(m2)) +
                   Math.round(parseFloat(m3)) + Math.round(parseFloat(m4)) + Math.round(parseFloat(m5)) + Math.round(parseFloat(m7));
    document.getElementById('subtotal').textContent = subtotal + ' mg'; // Display as whole number

    // Calculate the total Morphine Equivalence for all drugs
    let totalMorphine = subtotal + Math.round(parseFloat(m6));
    document.getElementById('totalMorphine').textContent = totalMorphine + ' mg'; // Display as whole number
}

// Initialization and event listeners
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateMorphineEquivalence);
});
document.addEventListener('DOMContentLoaded', updateMorphineEquivalence);
