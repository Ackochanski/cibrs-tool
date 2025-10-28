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
        
        if (details.occurrence) {
            html += `<div class="info-row"><strong>Occurrence:</strong><span>${details.occurrence}</span></div>`;
        }
        
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
    
    for (const [category, codes] of Object.entries(categories)) {
        if (codes.length === 0) continue;
        
        html += `<div class="category-section">`;
        html += `<div class="category-title">${category} (${codes.length})</div>`;
        html += `</div>`;
        
        codes.sort((a, b) => {
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

function showAllAttributes() {
    const results = document.getElementById('results');
    
    const attributes = {
        "Element 9: Location Type": {
            subtitle: "Use California granular codes instead of FBI rolled-up codes",
            values: [
                { code: "DA", desc: "Drug Store/Pharmacy (CA)", mapsTo: "09 (FBI)" },
                { code: "DB", desc: "Doctor's Office (CA)", mapsTo: "09 (FBI)" },
                { code: "DC", desc: "Medical Clinic (CA)", mapsTo: "09 (FBI)" },
                { code: "DG", desc: "Hospital (CA)", mapsTo: "09 (FBI)" },
                { code: "DI", desc: "Marijuana Dispensary (CA)", mapsTo: "09 (FBI)" },
                { code: "GA", desc: "Library (CA)", mapsTo: "11 (FBI)" },
                { code: "GB", desc: "Museum (CA)", mapsTo: "11 (FBI)" },
                { code: "GC", desc: "Zoo (CA)", mapsTo: "11 (FBI)" },
                { code: "RA", desc: "Single Family Home (CA)", mapsTo: "20 (FBI)" },
                { code: "RB", desc: "Multiple Family Dwelling (CA)", mapsTo: "20 (FBI)" },
                { code: "RC", desc: "Apartment/Condo (CA)", mapsTo: "20 (FBI)" },
                { code: "RD", desc: "Hotel/Motel (CA)", mapsTo: "20 (FBI)" },
                { code: "RE", desc: "Garage Residential (CA)", mapsTo: "20 (FBI)" },
                { code: "RF", desc: "Yard Residential (CA)", mapsTo: "20 (FBI)" },
                { code: "RG", desc: "Driveway Residential (CA)", mapsTo: "20 (FBI)" },
                { code: "SA", desc: "Loan/Cash Advance (CA)", mapsTo: "24 (FBI)" },
                { code: "OA", desc: "Other (CA)", mapsTo: "25 (FBI)" },
                { code: "OF", desc: "Unknown (CA)", mapsTo: "25 (FBI)" },
                { code: "S1", desc: "School - Elementary (CA)", mapsTo: "53 (FBI)" },
                { code: "S2", desc: "School - Junior High (CA)", mapsTo: "53 (FBI)" },
                { code: "S3", desc: "School - High School (CA)", mapsTo: "53 (FBI)" }
            ]
        },
        
        "Element 13: Type Weapon/Force Involved": {
            subtitle: "California weapon codes including imitation firearms and asphyxiation types",
            values: [
                { code: "11", desc: "Firearm (Type Not Stated)" },
                { code: "12", desc: "Handgun" },
                { code: "HA", desc: "Imitation Handgun (CA)", mapsTo: "12 (FBI)" },
                { code: "13", desc: "Rifle" },
                { code: "14", desc: "Shotgun" },
                { code: "15", desc: "Other Firearm" },
                { code: "20", desc: "Knife/Cutting Instrument" },
                { code: "30", desc: "Blunt Object" },
                { code: "35", desc: "Motor Vehicle/Vessel" },
                { code: "40", desc: "Personal Weapons (hands, fists, feet)" },
                { code: "50", desc: "Poison" },
                { code: "60", desc: "Explosives" },
                { code: "65", desc: "Fire/Incendiary Device" },
                { code: "70", desc: "Drugs/Narcotics/Sleeping Pills" },
                { code: "85", desc: "Asphyxiation" },
                { code: "AA", desc: "Drowning (CA)", mapsTo: "85 (FBI)" },
                { code: "AB", desc: "Strangulation (CA)", mapsTo: "85 (FBI)" },
                { code: "AC", desc: "Hanging (CA)", mapsTo: "85 (FBI)" },
                { code: "OA", desc: "Other (CA)", mapsTo: "90 (FBI)" },
                { code: "OB", desc: "BB/Pellet Gun (CA)", mapsTo: "90 (FBI)" },
                { code: "OC", desc: "Taser/Stun Gun (CA)", mapsTo: "90 (FBI)" },
                { code: "OD", desc: "Club/Blackjack (CA)", mapsTo: "90 (FBI)" },
                { code: "OE", desc: "Brass Knuckles (CA)", mapsTo: "90 (FBI)" }
            ]
        },
        
        "Element 15: Property Description": {
            subtitle: "California property codes for detailed tracking",
            values: [
                { code: "01", desc: "Aircraft" },
                { code: "03", desc: "Automobiles" },
                { code: "05", desc: "Buses" },
                { code: "07", desc: "Clothes/Furs (CA)", mapsTo: "88 (FBI)" },
                { code: "18", desc: "Firearms" },
                { code: "46", desc: "Negotiable Instruments (CA)", mapsTo: "18 (FBI)" },
                { code: "77", desc: "Other (CA)", mapsTo: "38 (FBI)" },
                { code: "88", desc: "Pending Inventory" }
            ]
        },
        
        "Element 27/38/48: Sex (Victim/Offender/Arrestee)": {
            subtitle: "California includes non-binary and transgender categories",
            values: [
                { code: "M", desc: "Male" },
                { code: "F", desc: "Female" },
                { code: "U", desc: "Unknown" },
                { code: "1", desc: "Non-Binary (CA)", mapsTo: "U (FBI)" },
                { code: "2", desc: "Transgender - Presents Female Born Male (CA)", mapsTo: "U (FBI)" },
                { code: "3", desc: "Transgender - Presents Male Born Female (CA)", mapsTo: "U (FBI)" }
            ]
        },
        
        "Element 28/39/49: Race (Victim/Offender/Arrestee)": {
            subtitle: "California uses granular ethnicity codes",
            values: [
                { code: "W", desc: "White" },
                { code: "1", desc: "Hispanic (CA)", mapsTo: "W (FBI)" },
                { code: "B", desc: "Black or African American" },
                { code: "I", desc: "American Indian or Alaska Native" },
                { code: "2", desc: "Chinese (CA)", mapsTo: "A (FBI)" },
                { code: "3", desc: "Cambodian (CA)", mapsTo: "A (FBI)" },
                { code: "4", desc: "Filipino (CA)", mapsTo: "A (FBI)" },
                { code: "5", desc: "Japanese (CA)", mapsTo: "A (FBI)" },
                { code: "6", desc: "Korean (CA)", mapsTo: "A (FBI)" },
                { code: "7", desc: "Laotian (CA)", mapsTo: "A (FBI)" },
                { code: "8", desc: "Vietnamese (CA)", mapsTo: "A (FBI)" },
                { code: "9", desc: "Asian Indian (CA)", mapsTo: "A (FBI)" },
                { code: "E", desc: "Other Asian (CA)", mapsTo: "A (FBI)" },
                { code: "X", desc: "Native Hawaiian (CA)", mapsTo: "P (FBI)" },
                { code: "Y", desc: "Pacific Islander (CA)", mapsTo: "P (FBI)" },
                { code: "Z", desc: "Samoan (CA)", mapsTo: "P (FBI)" },
                { code: "V", desc: "Guamanian (CA)", mapsTo: "P (FBI)" },
                { code: "U", desc: "Unknown" },
                { code: "S", desc: "Other (CA)", mapsTo: "U (FBI)" }
            ]
        },
        
        "Element 31: Aggravated Assault/Homicide Circumstances": {
            subtitle: "Circumstances surrounding assault or homicide",
            values: [
                { code: "AD", desc: "Argument over Drugs (CA)", mapsTo: "01 (FBI)" },
                { code: "AM", desc: "Argument over Money (CA)", mapsTo: "01 (FBI)" },
                { code: "AP", desc: "Argument over Property (CA)", mapsTo: "01 (FBI)" },
                { code: "AO", desc: "Argument Other (CA)", mapsTo: "01 (FBI)" },
                { code: "02", desc: "Assault on Law Enforcement Officer" },
                { code: "03", desc: "Drug Dealing" },
                { code: "GD", desc: "Gang - Drive By (CA)", mapsTo: "04 (FBI)" },
                { code: "GE", desc: "Gang - Execution (CA)", mapsTo: "04 (FBI)" },
                { code: "GR", desc: "Gang - Retribution (CA)", mapsTo: "04 (FBI)" },
                { code: "GO", desc: "Gang - Other (CA)", mapsTo: "04 (FBI)" },
                { code: "05", desc: "Juvenile Gang" },
                { code: "06", desc: "Lovers Triangle" },
                { code: "07", desc: "Mercy Killing (Not Applicable to Aggravated Assault)" },
                { code: "08", desc: "Other Felony Involved" },
                { code: "OL", desc: "Lovers Triangle (CA)", mapsTo: "09 (FBI)" },
                { code: "OC", desc: "Child Abuse (CA)", mapsTo: "09 (FBI)" },
                { code: "10", desc: "Unknown Circumstances" },
                { code: "30", desc: "Criminal Killed by Private Citizen" },
                { code: "31", desc: "Criminal Killed by Police Officer" }
            ]
        },
        
        "Element 35: Relationship of Victim to Offender": {
            subtitle: "California uses 44 specific relationship codes",
            values: [
                { code: "10", desc: "Victim was Husband (CA)", mapsTo: "SE (FBI)" },
                { code: "11", desc: "Victim was Wife (CA)", mapsTo: "SE (FBI)" },
                { code: "12", desc: "Victim was Common-Law Husband (CA)", mapsTo: "CS (FBI)" },
                { code: "13", desc: "Victim was Common-Law Wife (CA)", mapsTo: "CS (FBI)" },
                { code: "14", desc: "Victim was Father (CA)", mapsTo: "PA (FBI)" },
                { code: "15", desc: "Victim was Mother (CA)", mapsTo: "PA (FBI)" },
                { code: "16", desc: "Victim was Brother (CA)", mapsTo: "SB (FBI)" },
                { code: "17", desc: "Victim was Sister (CA)", mapsTo: "SB (FBI)" },
                { code: "18", desc: "Victim was Son (CA)", mapsTo: "CH (FBI)" },
                { code: "19", desc: "Victim was Daughter (CA)", mapsTo: "CH (FBI)" },
                { code: "20", desc: "Victim was Grandfather (CA)", mapsTo: "GP (FBI)" },
                { code: "21", desc: "Victim was Grandmother (CA)", mapsTo: "GP (FBI)" },
                { code: "22", desc: "Victim was Grandson (CA)", mapsTo: "GC (FBI)" },
                { code: "23", desc: "Victim was Granddaughter (CA)", mapsTo: "GC (FBI)" },
                { code: "24", desc: "Victim was Stepfather (CA)", mapsTo: "PA (FBI)" },
                { code: "25", desc: "Victim was Stepmother (CA)", mapsTo: "PA (FBI)" },
                { code: "26", desc: "Victim was Stepson (CA)", mapsTo: "CH (FBI)" },
                { code: "27", desc: "Victim was Stepdaughter (CA)", mapsTo: "CH (FBI)" },
                { code: "28", desc: "Victim was Stepbrother (CA)", mapsTo: "SB (FBI)" },
                { code: "29", desc: "Victim was Stepsister (CA)", mapsTo: "SB (FBI)" },
                { code: "30", desc: "Victim was Father-in-Law (CA)", mapsTo: "IL (FBI)" },
                { code: "31", desc: "Victim was Mother-in-Law (CA)", mapsTo: "IL (FBI)" },
                { code: "32", desc: "Victim was Son-in-Law (CA)", mapsTo: "IL (FBI)" },
                { code: "33", desc: "Victim was Daughter-in-Law (CA)", mapsTo: "IL (FBI)" },
                { code: "34", desc: "Victim was Brother-in-Law (CA)", mapsTo: "IL (FBI)" },
                { code: "35", desc: "Victim was Sister-in-Law (CA)", mapsTo: "IL (FBI)" },
                { code: "40", desc: "Victim was Boyfriend/Girlfriend (CA)", mapsTo: "XS (FBI)" },
                { code: "41", desc: "Victim was Ex-Boyfriend/Ex-Girlfriend (CA)", mapsTo: "XS (FBI)" },
                { code: "42", desc: "Victim was Homosexual Relationship (CA)", mapsTo: "XS (FBI)" },
                { code: "50", desc: "Victim was Other Family Member (CA)", mapsTo: "OF (FBI)" },
                { code: "51", desc: "Victim was Foster Parent (CA)", mapsTo: "OF (FBI)" },
                { code: "52", desc: "Victim was Foster Child (CA)", mapsTo: "OF (FBI)" },
                { code: "53", desc: "Victim was Child of Boyfriend/Girlfriend (CA)", mapsTo: "BG (FBI)" },
                { code: "54", desc: "Victim was Gang Member (CA)", mapsTo: "RU (FBI)" },
                { code: "AQ", desc: "Acquaintance" },
                { code: "BE", desc: "Babysittee" },
                { code: "BG", desc: "Boyfriend/Girlfriend" },
                { code: "CF", desc: "Child of Boyfriend/Girlfriend" },
                { code: "EE", desc: "Employee" },
                { code: "ER", desc: "Employer" },
                { code: "FR", desc: "Friend" },
                { code: "HR", desc: "Homosexual Relationship" },
                { code: "NE", desc: "Neighbor" },
                { code: "OK", desc: "Otherwise Known" },
                { code: "RU", desc: "Relationship Unknown" },
                { code: "ST", desc: "Stranger" },
                { code: "VO", desc: "Victim was Offender" },
                { code: "XS", desc: "Ex-Spouse" }
            ]
        },
        
        "Element C5: Gang Type": {
            subtitle: "California gang classification (mandatory when Gang Activity Indicator = Y)",
            values: [
                { code: "01", desc: "Prison Gang/Security Threat Group" },
                { code: "02", desc: "Street Gang" },
                { code: "03", desc: "Outlaw Motorcycle Gangs" },
                { code: "04", desc: "Organized Crime" },
                { code: "05", desc: "Terrorist/Subversive Groups" },
                { code: "06", desc: "Juvenile Gang" },
                { code: "07", desc: "Other" },
                { code: "08", desc: "Unknown" }
            ]
        },
        
        "Element C12: Hate Crime Offensive Act": {
            subtitle: "Type of hate crime act (mandatory when offense has bias motivation)",
            values: [
                { code: "01", desc: "Harassing Communication" },
                { code: "02", desc: "Bombing/Explosion" },
                { code: "03", desc: "Cross Burning" },
                { code: "04", desc: "Damage to Home/Building" },
                { code: "05", desc: "Damage to Vehicle" },
                { code: "06", desc: "Daubing of Swastika" },
                { code: "07", desc: "Disturbing Public Assembly/Meeting" },
                { code: "08", desc: "Graffiti" },
                { code: "09", desc: "Hanging in Effigy" },
                { code: "10", desc: "Rock Throwing" },
                { code: "11", desc: "Threatening Communication" },
                { code: "12", desc: "Verbal Slurs" },
                { code: "13", desc: "Other" },
                { code: "14", desc: "Unknown" }
            ]
        },
        
        "Element C51: Arrestee Suspected of Using": {
            subtitle: "Substance use by arrestee (up to 3 values, N is mutually exclusive)",
            values: [
                { code: "A", desc: "Alcohol" },
                { code: "M", desc: "Marijuana" },
                { code: "O", desc: "Other Drugs" },
                { code: "N", desc: "None (Mutually Exclusive - cannot combine with A/M/O)" }
            ]
        },
        
        "Element C61: Disposition of Arrestee 18 and Over": {
            subtitle: "Disposition for adult arrestees (Age ≥ 18)",
            values: [
                { code: "A", desc: "Referred to Other Authority" },
                { code: "R", desc: "Released" },
                { code: "C", desc: "Complaint Sought" }
            ]
        },
        
        "Element 52: Disposition of Arrestee Under 18": {
            subtitle: "Disposition for juvenile arrestees (Age < 18)",
            values: [
                { code: "1", desc: "Referred to Probation (CA)", mapsTo: "R (FBI)" },
                { code: "2", desc: "Referred to Other Authority (CA)", mapsTo: "R (FBI)" },
                { code: "H", desc: "Handled Within Department" }
            ]
        },
        
        "Element 30/51: Resident Status": {
            subtitle: "Residency status of victim or arrestee",
            values: [
                { code: "R", desc: "Resident" },
                { code: "1", desc: "Resides in County, but not in jurisdiction (CA)", mapsTo: "N (FBI)" },
                { code: "2", desc: "Resides in State, but not jurisdiction (CA)", mapsTo: "N (FBI)" },
                { code: "3", desc: "Resides Out-of-State (CA)", mapsTo: "N (FBI)" },
                { code: "U", desc: "Unknown" }
            ]
        }
    };
    
    let html = `
        <button onclick="location.reload()" class="back-btn">← Back to Search</button>
        <div class="attribute-directory">
            <div class="code-directory-header">
                <h2>CIBRS Picklist Attributes Reference</h2>
                <p style="margin-top: 8px; opacity: 0.9;">Valid values for California CIBRS data elements with controlled vocabularies</p>
            </div>
    `;
    
    for (const [elementName, data] of Object.entries(attributes)) {
        html += `<div class="attribute-card">`;
        html += `<h3>${elementName}</h3>`;
        html += `<div class="attribute-card-subtitle">${data.subtitle}</div>`;
        
        html += `<table class="value-table">`;
        html += `<thead><tr>
            <th style="width: 100px;">Code</th>
            <th>Description</th>
            <th style="width: 150px;">FBI Mapping</th>
        </tr></thead>`;
        html += `<tbody>`;
        
        for (const item of data.values) {
            const isCA = item.desc.includes('(CA)');
            const badge = isCA ? '<span class="ca-only-badge">CA ONLY</span>' : '';
            const mapsTo = item.mapsTo ? `<span class="value-maps-to">→ ${item.mapsTo}</span>` : '';
            
            html += `<tr>
                <td><span class="value-code">${item.code}</span>${badge}</td>
                <td class="value-desc">${item.desc.replace(' (CA)', '')}</td>
                <td>${mapsTo}</td>
            </tr>`;
        }
        
        html += `</tbody></table>`;
        html += `</div>`;
    }
    
    html += `</div>`;
    
    results.innerHTML = html;
}
