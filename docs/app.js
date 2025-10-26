function search() {
    const input = document.getElementById('searchInput').value.trim().toUpperCase();
    const results = document.getElementById('results');
    
    if (!input) {
        results.innerHTML = '<div class="error-msg">Please enter a NIBRS offense code (e.g., 13A, 09A, 220, 520)</div>';
        return;
    }
    
    const data = offenseRequirements[input];
    
    if (!data) {
        results.innerHTML = `
            <div class="error-msg">
                Offense code "${input}" not found.<br><br>
                <strong>Try these codes:</strong><br>
                • 13A (Aggravated Assault)<br>
                • 09A (Murder/Homicide)<br>
                • 220 (Burglary)<br>
                • 23D (Theft From Building)<br>
                • 520 (Weapon Law Violations)<br>
                • ALL (Universal requirements)
            </div>`;
        return;
    }
    
    let html = `<div class="result">`;
    html += `<h2>${input}: ${data.name}</h2>`;
    html += `<p style="color: #666; margin-bottom: 20px;">${data.category}</p>`;
    
    html += `<h3 style="margin-top: 20px; color: #1a5490;">Required Data Elements:</h3>`;
    
    for (const [elemNum, details] of Object.entries(data.requiredElements)) {
        html += `<div class="code-item">`;
        html += `<h4 style="color: #d9534f; margin-bottom: 10px;">Element ${elemNum}: ${details.element}</h4>`;
        
        if (details.value) {
            html += `<div class="info-row"><strong>Value:</strong><span>${details.value}</span></div>`;
        }
        
        html += `<div class="info-row"><strong>Mandatory:</strong><span>${details.mandatory}</span></div>`;
        
        if (details.format) {
            html += `<div class="info-row"><strong>Format:</strong><span>${details.format}</span></div>`;
        }
        
        if (details.caRequirement) {
            html += `<div class="warning"><strong>🔶 CA Requirement:</strong> ${details.caRequirement}</div>`;
        }
        
        if (details.droppedCodes) {
            html += `<div class="warning" style="background: #f8d7da;"><strong>⛔ Dropped:</strong> ${details.droppedCodes}</div>`;
        }
        
        if (details.caValues) {
            html += `<div class="info-row"><strong>CA Values:</strong><span>${details.caValues}</span></div>`;
        }
        
        if (details.validation) {
            html += `<div class="info-row"><strong>Validation:</strong><span>${details.validation}</span></div>`;
        }
        
        if (details.errors) {
            html += `<div class="info-row"><strong>Error Codes:</strong><span>${details.errors}</span></div>`;
        }
        
        if (details.example) {
            html += `<div class="info-row"><strong>Example:</strong><span>${details.example}</span></div>`;
        }
        
        if (details.xmlFormat) {
            html += `<div class="xml-code">${escapeHtml(details.xmlFormat)}</div>`;
        }
        
        html += `</div>`;
    }
    
    html += `</div>`;
    
    results.innerHTML = html;
}

function escapeHtml(text) {
    const map = {'<': '&lt;', '>': '&gt;', '&': '&amp;'};
    return text.replace(/[<>&]/g, m => map[m]);
}

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') search();
});
