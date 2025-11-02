function search() {
  const inputEl = document.getElementById('searchInput');
  const input = (inputEl ? inputEl.value : '').trim().toUpperCase();
  const results = document.getElementById('results');

  if (!input) {
    results.innerHTML = '<div class="error-msg">Please enter a NIBRS offense code (e.g., 13A, 09A, 220, 90D)</div>';
    return;
  }

  // Check if offenseRequirements is loaded
  if (typeof offenseRequirements === 'undefined') {
    results.innerHTML = '<div class="error-msg">Error: Offense requirements data not loaded. Please refresh the page.</div>';
    return;
  }

  const data = offenseRequirements[input];

  if (!data) {
    results.innerHTML = `
      <div class="error-msg">
        Offense code "${escapeHtml(input)}" not found.<br><br>
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
  html += `<h2>${escapeHtml(code)}: ${escapeHtml(data.name)}</h2>`;
  html += `<p style="color: #4a5568; margin-bottom: 20px;">${escapeHtml(data.category)}</p>`;

  html += `<h3 style="margin-top: 20px; color: #2c4a64;">Required Data Elements:</h3>`;

  // Sort element numbers numerically when possible
  const entries = Object.entries(data.requiredElements || {}).sort((a, b) => {
    const an = Number(a[0]);
    const bn = Number(b[0]);
    if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
    return a[0].localeCompare(b[0], undefined, { numeric: true });
  });

  for (const [elemNum, details] of entries) {
    const d = details || {};
    html += `<div class="code-item">`;
    html += `<h4 style="color: #3d5f7a; margin-bottom: 10px;">Element ${escapeHtml(elemNum)}: ${escapeHtml(d.element)}</h4>`;

    if (d.value != null) {
      html += `<div class="info-row"><strong>Value:</strong><span>${escapeHtml(d.value)}</span></div>`;
    }

    if (d.mandatory != null) {
      html += `<div class="info-row"><strong>Mandatory:</strong><span>${escapeHtml(d.mandatory)}</span></div>`;
    }

    if (d.occurrence) {
      html += `<div class="info-row"><strong>Occurrence:</strong><span>${escapeHtml(d.occurrence)}</span></div>`;
    }

    if (d.format) {
      html += `<div class="info-row"><strong>Format:</strong><span>${escapeHtml(d.format)}</span></div>`;
    }

    if (d.caRequirement) {
      html += `<div class="warning"><strong>🔶 CA Requirement:</strong> ${escapeHtml(d.caRequirement)}</div>`;
    }

    if (d.droppedCodes) {
      html += `<div class="warning" style="background: #ffe5e8;"><strong>⛔ Dropped:</strong> ${escapeHtml(d.droppedCodes)}</div>`;
    }

    if (d.caValues) {
      html += `<div class="info-row"><strong>CA Values:</strong><span>${escapeHtml(d.caValues)}</span></div>`;
    }

    if (d.validation) {
      html += `<div class="info-row"><strong>Validation:</strong><span>${escapeHtml(d.validation)}</span></div>`;
    }

    if (d.errors) {
      html += `<div class="info-row"><strong>Error Codes:</strong><span>${escapeHtml(d.errors)}</span></div>`;
    }

    if (d.example) {
      html += `<div class="info-row"><strong>Example:</strong><span>${escapeHtml(d.example)}</span></div>`;
    }

    if (d.note) {
      html += `<div class="info-row"><strong>Note:</strong><span>${escapeHtml(d.note)}</span></div>`;
    }

    if (d.values) {
      html += `<div class="info-row"><strong>Values:</strong><span>${escapeHtml(d.values)}</span></div>`;
    }

    if (d.xmlFormat) {
      html += `<div class="xml-code">${escapeHtml(d.xmlFormat)}</div>`;
    }

    html += `</div>`;
  }

  html += `</div>`;

  results.innerHTML = html;
}

function showAllCodes() {
  const results = document.getElementById('results');

  // Check if offenseRequirements is loaded
  if (typeof offenseRequirements === 'undefined') {
    results.innerHTML = '<div class="error-msg">Error: Offense requirements data not loaded. Please refresh the page.</div>';
    return;
  }

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
    const cat = data.category || 'Uncategorized';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ code, name: data.name, category: cat });
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

    codes.sort((a, b) => {
      const aNum = parseInt(a.code, 10);
      const bNum = parseInt(b.code, 10);
      if (!isNaN(aNum) && !isNaN(bNum) && aNum !== bNum) return aNum - bNum;
      return a.code.localeCompare(b.code, undefined, { numeric: true });
    });

    html += `<div class="category-section">`;
    html += `<div class="category-title">${escapeHtml(category)} (${codes.length})</div>`;

    for (const item of codes) {
      html += `
        <div class="code-card" data-code="${escapeHtml(item.code)}">
          <div class="code-card-number">${escapeHtml(item.code)}</div>
          <div class="code-card-name">${escapeHtml(item.name)}</div>
          <div class="code-card-category">${escapeHtml(item.category)}</div>
        </div>
      `;
    }

    html += `</div>`; // close category-section after its cards
  }

  html += `</div>`;
  results.innerHTML = html;
  
  // Add event delegation for code card clicks
  results.addEventListener('click', function(e) {
    const codeCard = e.target.closest('.code-card');
    if (codeCard && codeCard.dataset.code) {
      searchCode(codeCard.dataset.code);
    }
  });
}

function searchCode(code) {
  const el = document.getElementById('searchInput');
  if (el) el.value = code;
  search();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text ?? '').replace(/[&<>"']/g, m => map[m]);
}

// Safely attach the Enter handler after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') search();
    });
  }
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
        { code: "55", desc: "Victim was Foster Sibling (CA)", mapsTo: "SB (FBI)" },
        { code: "56", desc: "Victim was Student (CA)", mapsTo: "AQ (FBI)" },
        { code: "57", desc: "Victim was Client (CA)", mapsTo: "AQ (FBI)" },
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

    "Element C24: Victim By Association Type": {
      subtitle: "Type of association when victim is targeted due to association (mandatory when C23=Y)",
      values: [
        { code: "01", desc: "Advocacy for" },
        { code: "02", desc: "Identified with" },
        { code: "03", desc: "On the grounds owned or rented by" },
        { code: "04", desc: "Adjacent to" }
      ]
    },

    "Element C25: Victim By Association Relation": {
      subtitle: "What the victim is associated with (mandatory when C23=Y)",
      values: [
        { code: "01", desc: "Community Center" },
        { code: "02", desc: "Education Facility" },
        { code: "03", desc: "Family" },
        { code: "04", desc: "Individual" },
        { code: "05", desc: "Office" },
        { code: "06", desc: "Meeting Hall" },
        { code: "07", desc: "Place of Worship" },
        { code: "08", desc: "Private Institution" },
        { code: "09", desc: "Public Agency" },
        { code: "10", desc: "Library" },
        { code: "11", desc: "Other Person" },
        { code: "12", desc: "Other Group" },
        { code: "13", desc: "Other Entity" }
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
    html += `<h3>${escapeHtml(elementName)}</h3>`;
    html += `<div class="attribute-card-subtitle">${escapeHtml(data.subtitle)}</div>`;

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
      const mapsTo = item.mapsTo ? `<span class="value-maps-to">→ ${escapeHtml(item.mapsTo)}</span>` : '';

      html += `<tr>
        <td><span class="value-code">${escapeHtml(item.code)}</span>${badge}</td>
        <td class="value-desc">${escapeHtml(item.desc.replace(' (CA)', ''))}</td>
        <td>${mapsTo}</td>
      </tr>`;
    }

    html += `</tbody></table>`;
    html += `</div>`;
  }

  html += `</div>`;

  results.innerHTML = html;
}

function showElementReference() {
  const results = document.getElementById('results');

  const elements = {
    "Administrative Segment": [
      { num: "1",  name: "ORI Number",                          desc: "Originating Agency Identifier",                   mandatory: "Yes",          format: "9-Character Alphanumeric" },
      { num: "2",  name: "Incident Number",                      desc: "Unique identifier for the incident",             mandatory: "Yes",          format: "12-Character Alphanumeric" },
      { num: "3",  name: "Incident Date/Hour",                   desc: "When the incident occurred",                     mandatory: "Yes",          format: "Date/Time" },
      { num: "4",  name: "Cleared Exceptionally",                desc: "Why the incident was cleared without arrest",    mandatory: "Conditional",  format: "1-Character Code" },
      { num: "5",  name: "Exceptional Clearance Date",           desc: "Date incident was exceptionally cleared",        mandatory: "Conditional",  format: "Date" },
      { num: "C1", name: "Zip Code (CA)",                        desc: "California zip code where incident occurred",    mandatory: "Yes",          format: "5-Character Numeric", caOnly: true },
      { num: "C2", name: "ARRC Indicator (CA)",                  desc: "Arrest and Referral to Court indicator",         mandatory: "Yes",          format: "Y or N", caOnly: true },
      { num: "C3", name: "Identity Theft Indicator (CA)",        desc: "Whether incident involves identity theft",       mandatory: "Yes",          format: "Y or N", caOnly: true },
      { num: "C4", name: "Gang Activity Indicator (CA)",         desc: "Whether incident is gang-related",               mandatory: "Yes",          format: "Y or N", caOnly: true },
      { num: "C5", name: "Gang Type (CA)",                       desc: "Classification of gang involvement",             mandatory: "Conditional (when C4=Y)", format: "01-08", caOnly: true }
    ],
    "Offense Segment": [
      { num: "6",  name: "UCR Offense Code",                     desc: "NIBRS offense classification",                   mandatory: "Yes",          format: "3-Character Code" },
      { num: "7",  name: "Offense Attempted/Completed",          desc: "Whether offense was completed",                  mandatory: "Yes",          format: "A or C" },
      { num: "8A", name: "Bias Motivation",                      desc: "Hate crime bias type",                           mandatory: "Yes",          format: "2-Character Code" },
      { num: "9",  name: "Location Type",                        desc: "Where the offense occurred",                     mandatory: "Yes",          format: "2-Character Code" },
      { num: "10", name: "Number of Premises Entered",           desc: "For burglary offenses",                          mandatory: "Conditional",  format: "1-2 Digit Numeric" },
      { num: "11", name: "Method of Entry",                      desc: "Force or No Force",                              mandatory: "Conditional",  format: "F or N" },
      { num: "12", name: "Type Criminal Activity",               desc: "Drug activity, gang info, etc.",                 mandatory: "Conditional",  format: "1-Character Code" },
      { num: "13", name: "Type Weapon/Force Involved",           desc: "Weapons used in offense",                        mandatory: "Conditional",  format: "2-3 Character Code" },
      { num: "C12",name: "Hate Crime Offensive Act (CA)",        desc: "Type of hate crime act performed",               mandatory: "Conditional",  format: "01-14", caOnly: true },
      { num: "C42",name: "CJIS Code (CA)",                       desc: "California offense code",                        mandatory: "Yes",          format: "5-Character Numeric", caOnly: true },
      { num: "C43",name: "CA Code Type (CA)",                    desc: "Type of California law (PC, HS, VC, etc.)",      mandatory: "Yes",          format: "2-Character Alpha", caOnly: true },
      { num: "C44",name: "CA Offense Code Section (CA)",         desc: "Specific section of California law",             mandatory: "Yes",          format: "25-Character Alphanumeric", caOnly: true },
      { num: "C45",name: "CA Offense Level (CA)",                desc: "Felony, Misdemeanor, or Status",                 mandatory: "Yes",          format: "F, M, or S", caOnly: true }
    ],
    "Property Segment": [
      { num: "14", name: "Type Property Loss/Etc.",              desc: "What happened to property",                      mandatory: "Conditional",  format: "1-2 Digit Numeric" },
      { num: "15", name: "Property Description",                 desc: "Type of property involved",                      mandatory: "Conditional",  format: "2-Character Code" },
      { num: "16", name: "Value of Property",                    desc: "Dollar value",                                   mandatory: "Conditional",  format: "1-9 Digit Numeric" },
      { num: "17", name: "Date Recovered",                       desc: "When property was recovered",                    mandatory: "Conditional",  format: "Date" },
      { num: "18", name: "Number of Stolen Motor Vehicles",      desc: "Count of vehicles stolen",                       mandatory: "Conditional",  format: "1-2 Digit Numeric" },
      { num: "19", name: "Number of Recovered Motor Vehicles",   desc: "Count of vehicles recovered",                    mandatory: "Conditional",  format: "1-2 Digit Numeric" },
      { num: "20", name: "Suspected Drug Type",                  desc: "Type of drug involved",                          mandatory: "Conditional",  format: "1-Character Code" },
      { num: "21", name: "Estimated Drug Quantity",              desc: "Amount of drugs",                                mandatory: "Conditional",  format: "Decimal" },
      { num: "22", name: "Type Drug Measurement",                desc: "Unit of measure (grams, ounces, etc.)",          mandatory: "Conditional",  format: "2-Character Code" }
    ],
    "Victim Segment": [
      { num: "23", name: "Victim Sequence Number",               desc: "Identifies victim within incident",              mandatory: "Yes",          format: "1-3 Digit Numeric" },
      { num: "24", name: "Victim Connected to UCR Offense",      desc: "Links victim to offense",                        mandatory: "Yes",          format: "3-Character Code" },
      { num: "25", name: "Type of Victim",                       desc: "Individual, Business, Society, etc.",            mandatory: "Yes",          format: "1-Character Code" },
      { num: "26", name: "Age of Victim",                        desc: "Age or age range",                               mandatory: "Conditional",  format: "Age value" },
      { num: "27", name: "Sex of Victim",                        desc: "Male, Female, Unknown",                          mandatory: "Conditional",  format: "M, F, U, or CA codes" },
      { num: "28", name: "Race of Victim",                       desc: "Racial/ethnic classification",                   mandatory: "Conditional",  format: "1-Character Code" },
      { num: "29", name: "Ethnicity of Victim",                  desc: "Hispanic or Not Hispanic",                       mandatory: "Conditional",  format: "H, N, or U" },
      { num: "30", name: "Resident Status of Victim",            desc: "Resident or Nonresident",                        mandatory: "Conditional",  format: "R, N, or U" },
      { num: "31", name: "Aggravated Assault/Homicide Circumstances", desc: "Circumstances of violent crime",           mandatory: "Conditional",  format: "2-Character Code" },
      { num: "32", name: "Additional Justifiable Homicide Circumstances", desc: "For justifiable homicides",            mandatory: "Conditional",  format: "1-Character Code" },
      { num: "33", name: "Type of Injury",                       desc: "Physical injuries sustained",                    mandatory: "Conditional",  format: "1-Character Code" },
      { num: "34", name: "Offender Number to be Related",        desc: "Links victim to offender",                       mandatory: "Conditional",  format: "1-3 Digit Numeric" },
      { num: "35", name: "Relationship of Victim to Offender",   desc: "How victim knows offender",                      mandatory: "Conditional",  format: "2-Character Code" },
      { num: "C21",name: "Senior Citizen Indicator (CA)",        desc: "Whether victim is age 60+",                      mandatory: "Conditional",  format: "Y or N", caOnly: true },
      { num: "C23",name: "Victim by Association Indicator (CA)", desc: "Victim targeted due to association",             mandatory: "Conditional",  format: "Y or N", caOnly: true },
      { num: "C24",name: "Victim by Association Type (CA)",      desc: "Type of association (when C23=Y)",               mandatory: "Conditional (when C23=Y)",  format: "01-04", caOnly: true },
      { num: "C25",name: "Victim by Association Relation (CA)",  desc: "What victim is associated with (when C23=Y)",     mandatory: "Conditional (when C23=Y)",  format: "01-13", caOnly: true },
      { num: "C31",name: "Homicide Victim First Name (CA)",      desc: "First name for homicide victims",                mandatory: "Conditional (09A/B/C)", format: "2-20 Characters", caOnly: true },
      { num: "C32",name: "Homicide Victim Middle Name (CA)",     desc: "Middle name for homicide victims",               mandatory: "Optional",     format: "2-20 Characters", caOnly: true },
      { num: "C33",name: "Homicide Victim Last Name (CA)",       desc: "Last name for homicide victims",                 mandatory: "Conditional (09A/B/C)", format: "2-25 Characters", caOnly: true }
    ],
    "Offender Segment": [
      { num: "36", name: "Offender Sequence Number",             desc: "Identifies offender within incident",            mandatory: "Yes",          format: "1-3 Digit Numeric" },
      { num: "37", name: "Age of Offender",                      desc: "Age or age range",                               mandatory: "Yes",          format: "Age value" },
      { num: "38", name: "Sex of Offender",                      desc: "Male, Female, Unknown",                          mandatory: "Yes",          format: "M, F, U, or CA codes" },
      { num: "39", name: "Race of Offender",                     desc: "Racial/ethnic classification",                   mandatory: "Yes",          format: "1-Character Code" }
    ],
    "Arrestee Segment": [
      { num: "40", name: "Arrestee Sequence Number",             desc: "Identifies arrestee within incident",            mandatory: "Yes",          format: "1-3 Digit Numeric" },
      { num: "41", name: "Arrest Transaction Number",            desc: "Unique arrest identifier",                       mandatory: "Yes",          format: "12-Character Alphanumeric" },
      { num: "42", name: "Arrest Date",                          desc: "Date of arrest",                                 mandatory: "Yes",          format: "Date" },
      { num: "43", name: "Type of Arrest",                       desc: "On-view, Warrant, Summoned",                     mandatory: "Yes",          format: "1-Character Code" },
      { num: "44", name: "Multiple Arrestee Segments Indicator", desc: "More than one arrestee",                         mandatory: "Yes",          format: "C or N" },
      { num: "45", name: "UCR Arrest Offense Code",              desc: "Offense arrested for",                           mandatory: "Yes",          format: "3-Character Code" },
      { num: "46", name: "Arrestee was Armed With",              desc: "Weapons possessed during arrest",                mandatory: "Conditional",  format: "2-3 Character Code" },
      { num: "47", name: "Age of Arrestee",                      desc: "Age or age range",                               mandatory: "Yes",          format: "Age value" },
      { num: "48", name: "Sex of Arrestee",                      desc: "Male, Female, Unknown",                          mandatory: "Yes",          format: "M, F, U, or CA codes" },
      { num: "49", name: "Race of Arrestee",                     desc: "Racial/ethnic classification",                   mandatory: "Yes",          format: "1-Character Code" },
      { num: "50", name: "Ethnicity of Arrestee",                desc: "Hispanic or Not Hispanic",                       mandatory: "Yes",          format: "H, N, or U" },
      { num: "51", name: "Resident Status of Arrestee",          desc: "Resident or Nonresident",                        mandatory: "Yes",          format: "R, N, or U" },
      { num: "52", name: "Disposition of Arrestee Under 18",     desc: "How juvenile was processed",                     mandatory: "Conditional (Age &lt; 18)", format: "1-Character Code" },
      { num: "C51",name: "Arrestee Suspected of Using (CA)",     desc: "Substance use by arrestee",                      mandatory: "Yes",          format: "A, M, O, or N (up to 3)", caOnly: true },
      { num: "C61",name: "Disposition of Arrestee 18+ (CA)",     desc: "How adult was processed",                        mandatory: "Conditional (Age ≥ 18)", format: "A, R, or C", caOnly: true }
    ]
  };

  let html = `
    <button onclick="location.reload()" class="back-btn">← Back to Search</button>
    <div class="attribute-directory">
      <div class="code-directory-header">
        <h2>NIBRS/CIBRS Data Element Reference</h2>
        <p style="margin-top: 8px; opacity: 0.9;">Complete list of all data elements organized by segment</p>
      </div>
  `;

  for (const [segmentName, elemList] of Object.entries(elements)) {
    html += `<div class="attribute-card">`;
    html += `<h3>${escapeHtml(segmentName)}</h3>`;

    html += `<table class="value-table">`;
    html += `<thead><tr>
      <th style="width: 80px;">Element</th>
      <th style="width: 250px;">Name</th>
      <th>Description</th>
      <th style="width: 120px;">Mandatory</th>
      <th style="width: 150px;">Format</th>
    </tr></thead>`;
    html += `<tbody>`;

    for (const elem of elemList) {
      const badge = elem.caOnly ? '<span class="ca-only-badge">CA</span>' : '';
      html += `<tr>
        <td><span class="value-code">${escapeHtml(elem.num)}</span>${badge}</td>
        <td style="font-weight: 600; color: #2c4a64;">${escapeHtml(elem.name)}</td>
        <td class="value-desc">${escapeHtml(elem.desc)}</td>
        <td>${escapeHtml(elem.mandatory)}</td>
        <td style="font-family: 'Courier New', monospace; font-size: 13px; color: #5a7c9c;">${escapeHtml(elem.format)}</td>
      </tr>`;
    }

    html += `</tbody></table>`;
    html += `</div>`;
  }

  html += `</div>`;

  results.innerHTML = html;
}
