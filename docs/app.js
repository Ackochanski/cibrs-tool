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

function showAllAttributes() {
    const results = document.getElementById('results');
    
    const attributes = {
        "Element 9: Location Type": {
            subtitle: "California requires specific location codes instead of FBI's general categories",
            sections: [
                {
                    title: "❌ DO NOT USE: 09 = Drug Store/Doctor's Office/Hospital",
                    note: "FBI code 09 is too broad. Use these specific CA codes instead:",
                    codes: [
                        { code: "DA", desc: "Drug Store/Pharmacy" },
                        { code: "DB", desc: "Doctor's Office" },
                        { code: "DC", desc: "Medical Clinic" },
                        { code: "DG", desc: "Hospital" },
                        { code: "DI", desc: "Marijuana Dispensary" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: 11 = Government/Public Building",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "GA", desc: "Library" },
                        { code: "GB", desc: "Museum" },
                        { code: "GC", desc: "Zoo" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: 20 = Residence/Home",
                    note: "FBI code 20 is too broad. Use these specific CA codes:",
                    codes: [
                        { code: "RA", desc: "Single Family Home" },
                        { code: "RB", desc: "Multiple Family Dwelling" },
                        { code: "RC", desc: "Apartment/Condo" },
                        { code: "RD", desc: "Hotel/Motel" },
                        { code: "RE", desc: "Garage (Residential)" },
                        { code: "RF", desc: "Yard (Residential)" },
                        { code: "RG", desc: "Driveway (Residential)" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: 25 = Other/Unknown",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "OA", desc: "Other" },
                        { code: "OF", desc: "Unknown" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: 53 = School—Elementary/Secondary",
                    note: "Use these specific CA codes by school level:",
                    codes: [
                        { code: "S1", desc: "School - Elementary" },
                        { code: "S2", desc: "School - Junior High" },
                        { code: "S3", desc: "School - High School" }
                    ]
                },
                {
                    title: "✅ Other Valid Codes (Use as-is)",
                    note: "These FBI codes are still valid in CA:",
                    codes: [
                        { code: "01", desc: "Air/Bus/Train Terminal" },
                        { code: "02", desc: "Bank/Savings and Loan" },
                        { code: "04", desc: "Church/Synagogue/Temple/Mosque" },
                        { code: "05", desc: "Commercial/Office Building" },
                        { code: "SA", desc: "Loan/Cash Advance (CA-specific)" }
                    ]
                }
            ]
        },
        
        "Element 13: Type Weapon/Force Involved": {
            subtitle: "California tracks specific weapon types, especially asphyxiation methods",
            sections: [
                {
                    title: "✅ Firearm Codes",
                    codes: [
                        { code: "11", desc: "Firearm (Type Not Stated)" },
                        { code: "12", desc: "Handgun" },
                        { code: "HA", desc: "Imitation Handgun (CA) - reports as Handgun to FBI", badge: "CA" },
                        { code: "13", desc: "Rifle" },
                        { code: "14", desc: "Shotgun" },
                        { code: "15", desc: "Other Firearm" }
                    ]
                },
                {
                    title: "✅ Other Weapons",
                    codes: [
                        { code: "20", desc: "Knife/Cutting Instrument" },
                        { code: "30", desc: "Blunt Object" },
                        { code: "35", desc: "Motor Vehicle/Vessel" },
                        { code: "40", desc: "Personal Weapons (hands, fists, feet)" },
                        { code: "50", desc: "Poison" },
                        { code: "60", desc: "Explosives" },
                        { code: "65", desc: "Fire/Incendiary Device" },
                        { code: "70", desc: "Drugs/Narcotics/Sleeping Pills" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: 85 = Asphyxiation (too general)",
                    note: "Use these specific CA asphyxiation codes:",
                    codes: [
                        { code: "AA", desc: "Drowning (CA)", badge: "CA" },
                        { code: "AB", desc: "Strangulation (CA)", badge: "CA" },
                        { code: "AC", desc: "Hanging (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: 90 = Other (too general)",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "OA", desc: "Other (CA)", badge: "CA" },
                        { code: "OB", desc: "BB/Pellet Gun (CA)", badge: "CA" },
                        { code: "OC", desc: "Taser/Stun Gun (CA)", badge: "CA" },
                        { code: "OD", desc: "Club/Blackjack (CA)", badge: "CA" },
                        { code: "OE", desc: "Brass Knuckles (CA)", badge: "CA" }
                    ]
                }
            ]
        },
        
        "Element 15: Property Description": {
            subtitle: "California property codes",
            sections: [
                {
                    title: "✅ Valid Property Codes",
                    codes: [
                        { code: "01", desc: "Aircraft" },
                        { code: "03", desc: "Automobiles" },
                        { code: "05", desc: "Buses" },
                        { code: "18", desc: "Firearms" },
                        { code: "88", desc: "Pending Inventory" }
                    ]
                },
                {
                    title: "✅ CA-Specific Property Codes",
                    codes: [
                        { code: "07", desc: "Clothes/Furs (CA) - reports as 88 to FBI", badge: "CA" },
                        { code: "46", desc: "Negotiable Instruments (CA) - reports as 18 to FBI", badge: "CA" },
                        { code: "77", desc: "Other (CA) - reports as 38 to FBI", badge: "CA" }
                    ]
                }
            ]
        },
        
        "Element 27/38/48: Sex (Victim/Offender/Arrestee)": {
            subtitle: "California includes non-binary and transgender categories (reported as Unknown to FBI)",
            sections: [
                {
                    title: "✅ Standard Sex Codes",
                    codes: [
                        { code: "M", desc: "Male" },
                        { code: "F", desc: "Female" },
                        { code: "U", desc: "Unknown" }
                    ]
                },
                {
                    title: "✅ CA Additional Gender Identity Codes",
                    note: "These CA codes are reported to FBI as 'U = Unknown'",
                    codes: [
                        { code: "1", desc: "Non-Binary (CA)", badge: "CA" },
                        { code: "2", desc: "Transgender - Presents Female (Born Male) (CA)", badge: "CA" },
                        { code: "3", desc: "Transgender - Presents Male (Born Female) (CA)", badge: "CA" }
                    ]
                }
            ]
        },
        
        "Element 28/39/49: Race (Victim/Offender/Arrestee)": {
            subtitle: "California requires granular ethnicity - DO NOT use generic 'A' or 'P' codes",
            sections: [
                {
                    title: "✅ Standard Race Codes",
                    codes: [
                        { code: "W", desc: "White" },
                        { code: "B", desc: "Black or African American" },
                        { code: "I", desc: "American Indian or Alaska Native" },
                        { code: "U", desc: "Unknown" }
                    ]
                },
                {
                    title: "✅ CA Hispanic/Latino Code",
                    note: "Reported to FBI as 'W = White'",
                    codes: [
                        { code: "1", desc: "Hispanic (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: A = Asian (too general)",
                    note: "Use these specific CA Asian ethnicity codes (all report as 'A' to FBI):",
                    codes: [
                        { code: "2", desc: "Chinese (CA)", badge: "CA" },
                        { code: "3", desc: "Cambodian (CA)", badge: "CA" },
                        { code: "4", desc: "Filipino (CA)", badge: "CA" },
                        { code: "5", desc: "Japanese (CA)", badge: "CA" },
                        { code: "6", desc: "Korean (CA)", badge: "CA" },
                        { code: "7", desc: "Laotian (CA)", badge: "CA" },
                        { code: "8", desc: "Vietnamese (CA)", badge: "CA" },
                        { code: "9", desc: "Asian Indian (CA)", badge: "CA" },
                        { code: "E", desc: "Other Asian (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: P = Pacific Islander (too general)",
                    note: "Use these specific CA Pacific Islander codes (all report as 'P' to FBI):",
                    codes: [
                        { code: "X", desc: "Native Hawaiian (CA)", badge: "CA" },
                        { code: "Y", desc: "Pacific Islander (CA)", badge: "CA" },
                        { code: "Z", desc: "Samoan (CA)", badge: "CA" },
                        { code: "V", desc: "Guamanian (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "✅ Other Race Code",
                    codes: [
                        { code: "S", desc: "Other (CA) - reports as 'U = Unknown' to FBI", badge: "CA" }
                    ]
                }
            ]
        },
        
        "Element 31: Aggravated Assault/Homicide Circumstances": {
            subtitle: "California uses specific circumstance codes",
            sections: [
                {
                    title: "❌ DO NOT USE: 01 = Argument (too general)",
                    note: "Use these specific CA argument codes (all report as '01' to FBI):",
                    codes: [
                        { code: "AD", desc: "Argument over Drugs (CA)", badge: "CA" },
                        { code: "AM", desc: "Argument over Money (CA)", badge: "CA" },
                        { code: "AP", desc: "Argument over Property (CA)", badge: "CA" },
                        { code: "AO", desc: "Argument Other (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "✅ Standard Circumstance Codes",
                    codes: [
                        { code: "02", desc: "Assault on Law Enforcement Officer" },
                        { code: "03", desc: "Drug Dealing" },
                        { code: "05", desc: "Juvenile Gang" },
                        { code: "06", desc: "Lovers' Triangle" },
                        { code: "07", desc: "Mercy Killing (Not Applicable to Aggravated Assault)" },
                        { code: "08", desc: "Other Felony Involved" },
                        { code: "10", desc: "Unknown Circumstances" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: 04 = Gangland (too general)",
                    note: "Use these specific CA gang-related codes (all report as '04' to FBI):",
                    codes: [
                        { code: "GD", desc: "Gang - Drive By (CA)", badge: "CA" },
                        { code: "GE", desc: "Gang - Execution (CA)", badge: "CA" },
                        { code: "GR", desc: "Gang - Retribution (CA)", badge: "CA" },
                        { code: "GO", desc: "Gang - Other (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "✅ CA Other Circumstance Codes",
                    note: "Report as '09 = Other Circumstances' to FBI",
                    codes: [
                        { code: "OL", desc: "Lover's Triangle (CA)", badge: "CA" },
                        { code: "OC", desc: "Child Abuse (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "✅ Justifiable Homicide Codes",
                    codes: [
                        { code: "30", desc: "Criminal Killed by Private Citizen" },
                        { code: "31", desc: "Criminal Killed by Police Officer" }
                    ]
                }
            ]
        },
        
        "Element 35: Relationship of Victim to Offender": {
            subtitle: "California uses 44 specific relationship codes - DO NOT use generic family codes",
            sections: [
                {
                    title: "❌ DO NOT USE: SE = Spouse (too general)",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "10", desc: "Victim was Husband (CA)", badge: "CA" },
                        { code: "11", desc: "Victim was Wife (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: CS = Common-Law Spouse (too general)",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "12", desc: "Victim was Common-Law Husband (CA)", badge: "CA" },
                        { code: "13", desc: "Victim was Common-Law Wife (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: PA = Parent (too general)",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "14", desc: "Victim was Father (CA)", badge: "CA" },
                        { code: "15", desc: "Victim was Mother (CA)", badge: "CA" },
                        { code: "24", desc: "Victim was Stepfather (CA)", badge: "CA" },
                        { code: "25", desc: "Victim was Stepmother (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: CH = Child (too general)",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "18", desc: "Victim was Son (CA)", badge: "CA" },
                        { code: "19", desc: "Victim was Daughter (CA)", badge: "CA" },
                        { code: "26", desc: "Victim was Stepson (CA)", badge: "CA" },
                        { code: "27", desc: "Victim was Stepdaughter (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: SB = Sibling (too general)",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "16", desc: "Victim was Brother (CA)", badge: "CA" },
                        { code: "17", desc: "Victim was Sister (CA)", badge: "CA" },
                        { code: "28", desc: "Victim was Stepbrother (CA)", badge: "CA" },
                        { code: "29", desc: "Victim was Stepsister (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: GP = Grandparent (too general)",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "20", desc: "Victim was Grandfather (CA)", badge: "CA" },
                        { code: "21", desc: "Victim was Grandmother (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "❌ DO NOT USE: GC = Grandchild (too general)",
                    note: "Use these specific CA codes:",
                    codes: [
                        { code: "22", desc: "Victim was Grandson (CA)", badge: "CA" },
                        { code: "23", desc: "Victim was Granddaughter (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "✅ In-Law Relationships",
                    codes: [
                        { code: "30", desc: "Victim was Father-in-Law (CA)", badge: "CA" },
                        { code: "31", desc: "Victim was Mother-in-Law (CA)", badge: "CA" },
                        { code: "32", desc: "Victim was Son-in-Law (CA)", badge: "CA" },
                        { code: "33", desc: "Victim was Daughter-in-Law (CA)", badge: "CA" },
                        { code: "34", desc: "Victim was Brother-in-Law (CA)", badge: "CA" },
                        { code: "35", desc: "Victim was Sister-in-Law (CA)", badge: "CA" }
                    ]
                },
                {
                    title: "✅ Romantic Relationships",
                    codes: [
                        { code: "40", desc: "Victim was Boyfriend/Girlfriend (CA)", badge: "CA" },
                        { code: "41", desc: "Victim was Ex-Boyfriend/Ex-Girlfriend (CA)", badge: "CA" },
                        { code: "42", desc: "Victim was Homosexual Relationship (CA)", badge: "CA" },
                        { code: "BG", desc: "Boyfriend/Girlfriend" },
                        { code: "XS", desc: "Ex-Spouse" },
                        { code: "HR", desc: "Homosexual Relationship" }
                    ]
                },
                {
                    title: "✅ Other Family & Foster",
                    codes: [
                        { code: "50", desc: "Victim was Other Family Member (CA)", badge: "CA" },
                        { code: "51", desc: "Victim was Foster Parent (CA)", badge: "CA" },
                        { code: "52", desc: "Victim was Foster Child (CA)", badge: "CA" },
                        { code: "53", desc: "Victim was Child of Boyfriend/Girlfriend (CA)", badge: "CA" },
                        { code: "CF", desc: "Child of Boyfriend/Girlfriend" }
                    ]
                },
                {
                    title: "✅ Non-Family Relationships",
                    codes: [
                        { code: "AQ", desc: "Acquaintance" },
                        { code: "BE", desc: "Babysittee" },
                        { code: "EE", desc: "Employee" },
                        { code: "ER", desc: "Employer" },
                        { code: "FR", desc: "Friend" },
                        { code: "NE", desc: "Neighbor" },
                        { code: "OK", desc: "Otherwise Known" },
                        { code: "ST", desc: "Stranger" }
                    ]
                },
                {
                    title: "✅ Special Codes",
                    codes: [
                        { code: "54", desc: "Victim was Gang Member (CA)", badge: "CA" },
                        {
