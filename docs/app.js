function search() {
    const input = document.getElementById('searchInput').value.trim().toUpperCase();
    const results = document.getElementById('results');
    
    if (!input) {
        results.innerHTML = '<div class="error-msg">Please enter a NIBRS offense code (e.g., 13A, 09A, 220, 90D)</div>';
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
                • 90D (DUI)<br>
                • ALL (Universal requirements)<br><br>
                Or click "View All Codes" to see the complete list.
            </div>`;
        return;
    }
    
    displayCodeDetails(input, data);
}

function displayCodeDetails(code, data) {
    const results = document.getElementById('results');
    let html = `<div class="result">`;
    html += `<h2>${code}: ${data.name}</h2>`;
    html += `<p style="color: #4a5568; margin-bottom: 20px;">${data.category}</p>`;
    
    html += `<h3 style="margin-top: 20px; color: #2c4a64;">Required Data Elements:</h3>`;
    
    for (const [elemNum, details] of Object.entries(data.requiredElements)) {
        html += `<div class="code-item">`;
        html += `<h4 style="color: #3d5f7a; margin-bottom: 10px;">Element ${elemNum}: ${details.element}</h4>`;
        
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
            html += `<div class="warning" style="background: #ffe5e8;"><strong>⛔ Dropped:</strong> ${details.droppedCodes}</div>`;
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
        
        if (details.note) {
            html += `<div class="info-row"><strong>Note:</strong><span>${details.note}</span></div>`;
        }
        
        if (details.values) {
            html += `<div class="info-row"><strong>Values:</strong><span>${details.values}</span></div>`;
        }
        
        if (details.xmlFormat) {
            html += `<div class="xml-code">${escapeHtml(details.xmlFormat)}</div>`;
        }
        
        html += `</div>`;
    }
    
    html += `</div>`;
    
    results.innerHTML = html;
}

function showAllCodes() {
    const results = document.getElementById('results');
    
    // Organize codes by category
    const categories = {
        "Group A - Crimes Against Persons": [],
        "Group A - Crimes Against Property": [],
        "Group A - Crimes Against Society": [],
        "Group B Arrest - DUI/Traffic": [],
        "Group B Arrest - Alcohol": [],
        "Group B Arrest - Public Order": [],
        "Group B Arrest - Financial": [],
        "Group B Arrest - Family": [],
        "Group B Arrest - Sex Offense": [],
        "Group B Arrest - Status Offense": [],
        "Group B Arrest - Property": [],
        "Group B Arrest - Miscellaneous": [],
        "Universal Requirements": []
    };
    
    // Sort codes into categories
    for (const [code, data] of Object.entries(offenseRequirements)) {
        if (!categories[data.category]) {
            categories[data.category] = [];
        }
        categories[data.category].push({ code, name: data.name, category: data.category });
    }
    
    let html = `
        <button onclick="location.reload()" class="back-btn">← Back to Search</button>
        <div class="code-directory">
            <div class="code-directory-header">
                <h2>All NIBRS/CIBRS Offense Codes</h2>
                <p style="margin-top: 8px; opacity: 0.9;">Click any code to view validation requirements</p>
            </div>
    `;
    
    // Display each category
    for (const [category, codes] of Object.entries(categories)) {
        if (codes.length === 0) continue;
        
        html += `<div class="category-section">`;
        html += `<div class="category-title">${category} (${codes.length})</div>`;
        html += `</div>`;
        
        // Sort codes
        codes.sort((a, b) => {
            // Numbers first, then letters
            const aNum = parseInt(a.code);
            const bNum = parseInt(b.code);
            if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
            return a.code.localeCompare(b.code);
        });
        
        for (const item of codes) {
            html += `
                <div class="code-card" onclick="searchCode('${item.code}')">
                    <div class="code-card-number">${item.code}</div>
                    <div class="code-card-name">${item.name}</div>
                    <div class="code-card-category">${item.category}</div>
                </div>
            `;
        }
    }
    
    html += `</div>`;
    
    results.innerHTML = html;
}

function searchCode(code) {
    document.getElementById('searchInput').value = code;
    search();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function escapeHtml(text) {
    const map = {'<': '&lt;', '>': '&gt;', '&': '&amp;'};
    return text.replace(/[<>&]/g, m => map[m]);
}

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') search();
});
