const offenseRequirements = {
  "09A": {
    name: "Murder and Nonnegligent Manslaughter",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "3": { element: "Incident Date/Hour", mandatory: "Yes" },
      "6": { element: "UCR Offense Code", value: "09A", mandatory: "Yes" },
      "8A": { element: "Bias Motivation", mandatory: "Yes", caRequirement: "BA (Anti-Citizenship)→33" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes (DA-DI, RA-RG, S1-S3, etc.)", droppedCodes: "Cannot use: 09, 20, 25, 53" },
      "13": { element: "Type Weapon/Force", mandatory: "Yes", caRequirement: "HA→12, AA-AC→85, OA-OE→90" },
      "31": { element: "Homicide Circumstances", mandatory: "Yes", caValues: "01→30, 04→01, 09→02" },
      "25": { element: "Type of Victim", mandatory: "Yes", validation: "I=Individual required" },
      "26": { element: "Age of Victim", mandatory: "Yes" },
      "27": { element: "Sex of Victim", mandatory: "Yes" },
      "28": { element: "Race of Victim", mandatory: "Yes", caRequirement: "Use CA codes: 1-9,E,X-Z,V,S instead of A,P" },
      "C31": { element: "Homicide Victim First Name", mandatory: "Yes (CA)", format: "2-20 characters", errors: "CA938-940" },
      "C33": { element: "Homicide Victim Last Name", mandatory: "Yes (CA)", format: "2-25 characters", errors: "CA942-944" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)", caRequirement: "CJIS Code + Type + Section + Level" }
    }
  },

  "09B": {
    name: "Negligent Manslaughter",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "09B", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "13": { element: "Type Weapon/Force", mandatory: "Yes" },
      "31": { element: "Homicide Circumstances", mandatory: "Yes" },
      "C31": { element: "Homicide Victim First Name", mandatory: "Yes (CA)" },
      "C33": { element: "Homicide Victim Last Name", mandatory: "Yes (CA)" }
    }
  },

  "09C": {
    name: "Justifiable Homicide",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "09C", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "13": { element: "Type Weapon/Force", mandatory: "Yes" },
      "31": { element: "Homicide Circumstances", mandatory: "Yes" },
      "C31": { element: "Homicide Victim First Name", mandatory: "Yes (CA)" },
      "C33": { element: "Homicide Victim Last Name", mandatory: "Yes (CA)" }
    }
  },

  "100": {
    name: "Kidnapping/Abduction",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "100", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "13": { element: "Type Weapon/Force", mandatory: "Conditional" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "35": { element: "Relationship Victim to Offender", mandatory: "Yes", caRequirement: "Use CA codes 10-54 instead of SE,CS,PA,CH,etc." }
    }
  },

  "11A": {
    name: "Rape",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "11A", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "13": { element: "Type Weapon/Force", mandatory: "Conditional" },
      "25": { element: "Type of Victim", mandatory: "Yes", validation: "Must be Individual" },
      "26": { element: "Age of Victim", mandatory: "Yes" },
      "27": { element: "Sex of Victim", mandatory: "Yes" },
      "28": { element: "Race of Victim", mandatory: "Yes", caRequirement: "Use CA granular codes" }
    }
  },

  "11B": {
    name: "Sodomy",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "11B", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "26": { element: "Age of Victim", mandatory: "Yes" }
    }
  },

  "11C": {
    name: "Sexual Assault With An Object",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "11C", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "13": { element: "Type Weapon/Force", mandatory: "Conditional" },
      "25": { element: "Type of Victim", mandatory: "Yes" }
    }
  },

  "11D": {
    name: "Fondling",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "11D", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "26": { element: "Age of Victim", mandatory: "Yes" }
    }
  },

  "120": {
    name: "Robbery",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "120", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "13": { element: "Type Weapon/Force", mandatory: "Conditional", caRequirement: "HA→12, AA-AC→85, OA-OE→90" },
      "15": { element: "Property Description", mandatory: "Yes", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Yes" },
      "25": { element: "Type of Victim", mandatory: "Yes" }
    }
  },

  "13A": {
    name: "Aggravated Assault",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "13A", mandatory: "Yes" },
      "8A": { element: "Bias Motivation", mandatory: "Yes", caRequirement: "BA (Anti-Citizenship)→33" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes (DA-DI, RA-RG, S1-S3)", droppedCodes: "09, 20, 25, 53" },
      "13": { element: "Type Weapon/Force", mandatory: "Yes", caRequirement: "HA (Imitation Handgun)→12, AA-AC (Asphyxiation)→85, OA-OE→90", validation: "At least one weapon code required" },
      "31": { element: "Aggravated Assault Circumstances", mandatory: "Yes", caValues: "01→30, 04→01, 09→02" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "35": { element: "Relationship Victim to Offender", mandatory: "Yes", caRequirement: "Use CA codes 10-54", validation: "Modified Error 472C" },
      "C12": { element: "Hate Crime Offensive Act", mandatory: "Conditional (if bias≠88)", values: "01-14", errors: "CA890-891" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)", example: "CJIS:48089, Type:PC, Section:148.10(A), Level:F" }
    }
  },

  "13B": {
    name: "Simple Assault",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "13B", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "13": { element: "Type Weapon/Force", mandatory: "Conditional", validation: "Cannot use firearm codes (11-15, HA) - Error 269C" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "35": { element: "Relationship Victim to Offender", mandatory: "Yes", caRequirement: "Use CA codes 10-54" }
    }
  },

  "13C": {
    name: "Intimidation",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "13C", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "35": { element: "Relationship Victim to Offender", mandatory: "Yes", caRequirement: "Use CA codes 10-54" }
    }
  },

  "200": {
    name: "Arson",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "200", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "15": { element: "Property Description", mandatory: "Yes", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Yes" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)" }
    }
  },

  "210": {
    name: "Extortion/Blackmail",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "210", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "13": { element: "Type Weapon/Force", mandatory: "Conditional" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "25": { element: "Type of Victim", mandatory: "Yes" }
    }
  },

  "220": {
    name: "Burglary/Breaking & Entering",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "220", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes", validation: "Location determines residential vs commercial" },
      "10": { element: "Number of Premises Entered", mandatory: "Yes", validation: "1-99" },
      "11": { element: "Method of Entry", mandatory: "Yes", validation: "F=Force, N=No Force" },
      "13": { element: "Type Weapon/Force", mandatory: "Conditional - only if force used" },
      "15": { element: "Property Description", mandatory: "Conditional - if property taken", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Conditional - if property taken" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)" }
    }
  },

  "23A": {
    name: "Pocket-picking",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "23A", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "15": { element: "Property Description", mandatory: "Yes", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "23B": {
    name: "Purse-snatching",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "23B", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "23C": {
    name: "Shoplifting",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "23C", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", validation: "Typically retail/commercial" },
      "15": { element: "Property Description", mandatory: "Yes", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "23D": {
    name: "Theft From Building",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "23D", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "15": { element: "Property Description", mandatory: "Yes", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Yes", validation: "1-999999999" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)" }
    }
  },

  "23E": {
    name: "Theft From Coin-Operated Machine",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "23E", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "23F": {
    name: "Theft From Motor Vehicle",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "23F", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "23G": {
    name: "Theft of Motor Vehicle Parts/Accessories",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "23G", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "23H": {
    name: "All Other Larceny",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "23H", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "15": { element: "Property Description", mandatory: "Yes", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "240": {
    name: "Motor Vehicle Theft",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "240", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes", validation: "Must be vehicle type" },
      "16": { element: "Value of Property", mandatory: "Yes" },
      "19": { element: "Recovered Motor Vehicle", mandatory: "Conditional" }
    }
  },

  "250": {
    name: "Counterfeiting/Forgery",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "250", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Conditional" }
    }
  },

  "26A": {
    name: "False Pretenses/Swindle/Confidence Game",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "26A", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "26B": {
    name: "Credit Card/ATM Fraud",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "26B", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "26C": {
    name: "Impersonation",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "26C", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Conditional" }
    }
  },

  "26D": {
    name: "Welfare Fraud",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "26D", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "26E": {
    name: "Wire Fraud",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "26E", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "270": {
    name: "Embezzlement",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "270", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "280": {
    name: "Stolen Property Offenses",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "280", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Yes" },
      "16": { element: "Value of Property", mandatory: "Yes" }
    }
  },

  "290": {
    name: "Destruction/Damage/Vandalism of Property",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "290", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "15": { element: "Property Description", mandatory: "Yes", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Yes" },
      "25": { element: "Type of Victim", mandatory: "Yes" }
    }
  },

  "35A": {
    name: "Drug/Narcotic Violations",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "35A", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "20": { element: "Type Drug Measurement", mandatory: "Conditional" },
      "21": { element: "Estimated Drug Quantity", mandatory: "Conditional" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)" }
    }
  },

  "35B": {
    name: "Drug Equipment Violations",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "35B", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Conditional" }
    }
  },

  "370": {
    name: "Pornography/Obscene Material",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "370", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" }
    }
  },

  "40A": {
    name: "Betting/Wagering",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "40A", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" }
    }
  },

  "40B": {
    name: "Operating/Promoting/Assisting Gambling",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "40B", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" }
    }
  },

  "40C": {
    name: "Gambling Equipment Violations",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "40C", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "15": { element: "Property Description", mandatory: "Conditional" }
    }
  },

  "510": {
    name: "Bribery",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "510", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" }
    }
  },

  "520": {
    name: "Weapon Law Violations",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "520", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "13": { element: "Type Weapon/Force", mandatory: "Yes", caRequirement: "Specify weapon - HA→12, OA-OE→90", validation: "Weapon code required for weapon offense" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)" }
    }
  },

  "64A": {
    name: "Human Trafficking, Commercial Sex Acts",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "64A", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "26": { element: "Age of Victim", mandatory: "Yes" }
    }
  },

  "64B": {
    name: "Human Trafficking, Involuntary Servitude",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "64B", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "26": { element: "Age of Victim", mandatory: "Yes" }
    }
  },

  "720": {
    name: "Animal Cruelty",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "720", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "25": { element: "Type of Victim", mandatory: "Yes", validation: "Must be Animal" }
    }
  },

  "90A": {
    name: "Bad Checks",
    category: "Group B Arrest - Financial",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90A", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes", caRequirement: "CA codes: 1=Non-Binary, 2=Trans-Female, 3=Trans-Male (not sent to FBI)" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes: 1=Hispanic, 2-9+E (Asian), X-Z+V (Pacific), S=Other" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)", caRequirement: "CJIS Code + Type + Section + Level" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)", values: "A=Alcohol, M=Marijuana, O=Other, N=None", errors: "CAA30-CAA33" },
      "C61": { element: "Disposition of Arrestee 18+", mandatory: "Conditional (Age≥18)", values: "A=Referred, R=Released, C=Complaint", errors: "CAA34-CAA36" }
    }
  },

  "90B": {
    name: "Curfew/Loitering/Vagrancy Violations",
    category: "Group B Arrest - Public Order",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90B", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)" }
    }
  },

  "90C": {
    name: "Disorderly Conduct",
    category: "Group B Arrest - Public Order",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90C", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)" },
      "C61": { element: "Disposition of Arrestee 18+", mandatory: "Conditional (Age≥18)" }
    }
  },

  "90D": {
    name: "Driving Under the Influence",
    category: "Group B Arrest - DUI/Traffic",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90D", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes", caRequirement: "CA codes: 1=Non-Binary, 2=Trans-Female, 3=Trans-Male" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes: 1=Hispanic, 2-9+E, X-Z+V, S=Other" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)", caRequirement: "Must provide CJIS Code, Code Type, Section, Level", errors: "CAA23-CAA26, CAA40, CAA90" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)", values: "A=Alcohol, M=Marijuana, O=Other, N=None (mutually exclusive)", validation: "No duplicates allowed; N cannot combine with A/M/O", errors: "CAA30-CAA33" },
      "C61": { element: "Disposition of Arrestee 18+", mandatory: "Conditional (when Age≥18)", values: "A=Referred to Other Authority, R=Released, C=Complaint Sought", errors: "CAA34-CAA36" }
    }
  },

  "90E": {
    name: "Drunkenness",
    category: "Group B Arrest - Alcohol",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90E", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)", validation: "Typically A=Alcohol" },
      "C61": { element: "Disposition of Arrestee 18+", mandatory: "Conditional (Age≥18)" }
    }
  },

  "90F": {
    name: "Family Offenses, Nonviolent",
    category: "Group B Arrest - Family",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90F", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)" }
    }
  },

  "90G": {
    name: "Liquor Law Violations",
    category: "Group B Arrest - Alcohol",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90G", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes" },
      "52": { element: "Disposition of Arrestee Under 18", mandatory: "Conditional (Age<18)", values: "1=Referred to Probation, 2=Referred to Other Authority" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)" }
    }
  },

  "90H": {
    name: "Peeping Tom",
    category: "Group B Arrest - Sex Offense",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90H", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)" }
    }
  },

  "90I": {
    name: "Runaway",
    category: "Group B Arrest - Status Offense",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90I", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes", validation: "Must be under 18" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes" },
      "52": { element: "Disposition of Arrestee Under 18", mandatory: "Yes", values: "1=Referred to Probation, 2=Referred to Other Authority" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)" }
    }
  },

  "90J": {
    name: "Trespass of Real Property",
    category: "Group B Arrest - Property",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90J", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)" },
      "C61": { element: "Disposition of Arrestee 18+", mandatory: "Conditional (Age≥18)" }
    }
  },

  "90Z": {
    name: "All Other Offenses",
    category: "Group B Arrest - Miscellaneous",
    requiredElements: {
      "45": { element: "Arrest UCR Code", value: "90Z", mandatory: "Yes" },
      "46": { element: "Arrest Date", mandatory: "Yes" },
      "47": { element: "Age of Arrestee", mandatory: "Yes" },
      "48": { element: "Sex of Arrestee", mandatory: "Yes", caRequirement: "CA codes: 1=Non-Binary, 2=Trans-Female, 3=Trans-Male" },
      "49": { element: "Race of Arrestee", mandatory: "Yes", caRequirement: "Use CA codes: 1=Hispanic, 2-9+E, X-Z+V, S=Other" },
      "C42-C45": { element: "CA Offense Details", mandatory: "Yes (CA)", caRequirement: "CJIS Code + Type + Section + Level" },
      "C51": { element: "Arrestee Suspected of Using", mandatory: "Yes (CA)", values: "A, M, O, or N" },
      "C61": { element: "Disposition of Arrestee 18+", mandatory: "Conditional (Age≥18)" }
    }
  },

  "26F": {
    name: "Identity Theft",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "26F", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes", caRequirement: "Use CA codes" },
      "15": { element: "Property Description", mandatory: "Yes", caRequirement: "07→88, 46→18, 77→38" },
      "16": { element: "Value of Property", mandatory: "Yes" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "C3": { element: "Identity Theft Indicator", mandatory: "Should be Y", note: "This is the identity theft offense" }
    }
  },

  "36A": {
    name: "Incest",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "36A", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "35": { element: "Relationship Victim to Offender", mandatory: "Yes", caRequirement: "Use CA codes 10-54" }
    }
  },

  "36B": {
    name: "Statutory Rape",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": { element: "UCR Offense Code", value: "36B", mandatory: "Yes" },
      "9": { element: "Location Type", mandatory: "Yes" },
      "25": { element: "Type of Victim", mandatory: "Yes" },
      "26": { element: "Age of Victim", mandatory: "Yes", validation: "Must be under statutory age" },
      "35": { element: "Relationship Victim to Offender", mandatory: "Yes", caRequirement: "Use CA codes 10-54" }
    }
  },

  "ALL": {
    name: "Elements Required for ALL Offenses",
    category: "Universal Requirements",
    requiredElements: {
      "1": { element: "ORI Number", mandatory: "Yes", format: "9-character NCIC ORI", validation: "Must be valid, active CA ORI" },
      "2": { element: "Incident Number", mandatory: "Yes", format: "12-character alphanumeric", validation: "Unique per ORI per year" },
      "3": { element: "Incident Date/Hour", mandatory: "Yes", validation: "Cannot be in future" },
      "4": { element: "Cleared Exceptionally", mandatory: "Conditional", validation: "Required if incident cleared exceptionally" },
      "5": { element: "Exceptional Clearance Date", mandatory: "Conditional", validation: "Required when Element 4 present" },
      "C1": { element: "Zip Code", mandatory: "Yes (CA)", format: "5-digit numeric", caRequirement: "Valid California zip code", errors: "CA820-821", xmlFormat: "<ca:ZipCode>90210</ca:ZipCode>" },
      "C2": { element: "ARRC Indicator", mandatory: "Yes (CA)", values: "Y or N", errors: "CA822-823", xmlFormat: "<ca:ARRCIndicator>N</ca:ARRCIndicator>" },
      "C3": { element: "Identity Theft Indicator", mandatory: "Yes (CA)", values: "Y or N", errors: "CA824-825", xmlFormat: "<ca:IdentityTheftIndicator>N</ca:IdentityTheftIndicator>" },
      "C4": { element: "Gang Activity Indicator", mandatory: "Yes (CA)", values: "Y or N", errors: "CA826-828", validation: "Should be Y when offense has gang info", xmlFormat: "<ca:GangActivityIndicator>Y</ca:GangActivityIndicator>" },
      "C5": { element: "Gang Type", mandatory: "Conditional (when C4=Y)", values: "01-08: Prison Gang, Street Gang, OMG, Organized Crime, Terrorist, Juvenile, Other, Unknown", errors: "CA829-831", xmlFormat: "<ca:GangType>02</ca:GangType>" }
    }
  }
};
