const offenseRequirements = {
  "13A": {
    name: "Aggravated Assault",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": {
        element: "UCR Offense Code",
        value: "13A",
        mandatory: "Yes",
        validation: "Must be valid NIBRS offense code"
      },
      "9": {
        element: "Location Type",
        mandatory: "Yes",
        caRequirement: "Use CA codes: DA-DI (medical), RA-RG (residential), S1-S3 (schools), etc.",
        droppedCodes: "Cannot use: 09, 20, 25, 53",
        xmlFormat: "<nibrs:LocationCategoryCode>RA</nibrs:LocationCategoryCode>"
      },
      "13": {
        element: "Type Weapon/Force Involved",
        mandatory: "Yes for 13A",
        caRequirement: "CA codes: HA (Imitation Handgun)→12, AA-AC (Asphyxiation)→85, OA-OE→90",
        validation: "At least one weapon code required for aggravated assault",
        xmlFormat: "<j:ForceCategoryCode>12</j:ForceCategoryCode>"
      },
      "8A": {
        element: "Bias Motivation",
        mandatory: "Yes",
        caRequirement: "CA code: BA (Anti-Citizenship)→33",
        validation: "Use 88=None if not hate crime",
        xmlFormat: "<j:OffenseFactorBiasMotivationCode>88</j:OffenseFactorBiasMotivationCode>"
      },
      "31": {
        element: "Aggravated Assault/Homicide Circumstances",
        mandatory: "Yes for 13A",
        caValues: "CA codes: 01→30, 04→01, 09→02",
        validation: "Required for all aggravated assaults",
        xmlFormat: "<j:AggravatedAssaultHomicideFactorCode>01</j:AggravatedAssaultHomicideFactorCode>"
      },
      "25": {
        element: "Type of Victim",
        mandatory: "Yes",
        validation: "I=Individual, L=Law Enforcement, etc."
      },
      "C42-C45": {
        element: "CA Offense Details (CJIS Code, Type, Section, Level)",
        mandatory: "Yes (CA Requirement)",
        caRequirement: "Must provide valid combination from CA DOJ Offense Code Table",
        example: "CJIS: 48089, Type: PC, Section: 148.10(A), Level: F",
        errors: "CA843-847, CA892",
        xmlFormat: "<ca:CACJISCode>48089</ca:CACJISCode>"
      }
    }
  },

  "09A": {
    name: "Murder/Non-Negligent Manslaughter",
    category: "Group A - Crimes Against Persons",
    requiredElements: {
      "6": {
        element: "UCR Offense Code",
        value: "09A",
        mandatory: "Yes"
      },
      "9": {
        element: "Location Type",
        mandatory: "Yes",
        caRequirement: "Use CA codes (DA-DI, RA-RG, S1-S3, etc.)"
      },
      "13": {
        element: "Type Weapon/Force Involved",
        mandatory: "Yes",
        caRequirement: "CA codes: HA→12, AA-AC→85, OA-OE→90"
      },
      "31": {
        element: "Aggravated Assault/Homicide Circumstances",
        mandatory: "Yes for 09A",
        caValues: "CA codes: 01→30, 04→01, 09→02",
        validation: "Mandatory for all homicides"
      },
      "C31": {
        element: "Homicide Victim First Name",
        mandatory: "Yes (CA Requirement for 09A/09B/09C)",
        format: "2-20 characters",
        errors: "CA938-940",
        xmlFormat: "<ca:HomicideVictimFirstName>James</ca:HomicideVictimFirstName>"
      },
      "C32": {
        element: "Homicide Victim Middle Name",
        mandatory: "Optional",
        xmlFormat: "<ca:HomicideVictimMiddleName>Tiberius</ca:HomicideVictimMiddleName>"
      },
      "C33": {
        element: "Homicide Victim Last Name",
        mandatory: "Yes (CA Requirement for 09A/09B/09C)",
        format: "2-25 characters",
        errors: "CA942-944",
        xmlFormat: "<ca:HomicideVictimLastName>Kirk</ca:HomicideVictimLastName>"
      },
      "C42-C45": {
        element: "CA Offense Details",
        mandatory: "Yes (CA Requirement)",
        caRequirement: "Valid CJIS code + Type + Section + Level combination"
      }
    }
  },

  "220": {
    name: "Burglary/Breaking & Entering",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": {
        element: "UCR Offense Code",
        value: "220",
        mandatory: "Yes"
      },
      "9": {
        element: "Location Type",
        mandatory: "Yes",
        caRequirement: "Use CA codes (DA-DI, RA-RG, S1-S3, etc.)",
        validation: "Location determines if residential/commercial burglary"
      },
      "10": {
        element: "Number of Premises Entered",
        mandatory: "Yes",
        validation: "1-99"
      },
      "11": {
        element: "Method of Entry",
        mandatory: "Yes",
        validation: "F=Force, N=No Force"
      },
      "13": {
        element: "Type Weapon/Force Involved",
        mandatory: "Conditional - only if force used",
        caRequirement: "CA codes: HA→12, AA-AC→85, OA-OE→90"
      },
      "15": {
        element: "Property Description",
        mandatory: "Conditional - if property taken",
        caRequirement: "CA codes: 07→88, 46→18, 77→38"
      },
      "C42-C45": {
        element: "CA Offense Details",
        mandatory: "Yes (CA Requirement)"
      }
    }
  },

  "23D": {
    name: "Theft From Building",
    category: "Group A - Crimes Against Property",
    requiredElements: {
      "6": {
        element: "UCR Offense Code",
        value: "23D",
        mandatory: "Yes"
      },
      "9": {
        element: "Location Type",
        mandatory: "Yes",
        caRequirement: "Use CA codes"
      },
      "15": {
        element: "Property Description",
        mandatory: "Yes",
        caRequirement: "CA codes: 07→88, 46→18, 77→38",
        validation: "At least one property type required"
      },
      "16": {
        element: "Value of Property",
        mandatory: "Yes",
        validation: "1-999999999"
      },
      "C42-C45": {
        element: "CA Offense Details",
        mandatory: "Yes"
      }
    }
  },

  "520": {
    name: "Weapon Law Violations",
    category: "Group A - Crimes Against Society",
    requiredElements: {
      "6": {
        element: "UCR Offense Code",
        value: "520",
        mandatory: "Yes"
      },
      "9": {
        element: "Location Type",
        mandatory: "Yes",
        caRequirement: "Use CA codes"
      },
      "13": {
        element: "Type Weapon/Force Involved",
        mandatory: "Yes",
        caRequirement: "Specify weapon type - CA codes: HA→12, OA-OE→90",
        validation: "Weapon code required for weapon offense"
      },
      "C42-C45": {
        element: "CA Offense Details",
        mandatory: "Yes"
      }
    }
  },

  "ALL": {
    name: "Elements Required for ALL Offenses",
    category: "Universal Requirements",
    requiredElements: {
      "1": {
        element: "ORI Number",
        mandatory: "Yes",
        format: "9-character NCIC ORI",
        validation: "Must be valid, active CA ORI"
      },
      "2": {
        element: "Incident Number",
        mandatory: "Yes",
        format: "12-character alphanumeric",
        validation: "Unique per ORI per year"
      },
      "3": {
        element: "Incident Date/Hour",
        mandatory: "Yes",
        validation: "Cannot be in future"
      },
      "4": {
        element: "Cleared Exceptionally",
        mandatory: "Conditional",
        validation: "Required if incident cleared exceptionally"
      },
      "C1": {
        element: "Zip Code",
        mandatory: "Yes (CA Requirement)",
        format: "5-digit numeric",
        caRequirement: "Valid California zip code",
        errors: "CA820-821"
      },
      "C2": {
        element: "ARRC Indicator",
        mandatory: "Yes (CA Requirement)",
        values: "Y or N",
        errors: "CA822-823"
      },
      "C3": {
        element: "Identity Theft Indicator",
        mandatory: "Yes (CA Requirement)",
        values: "Y or N",
        errors: "CA824-825"
      },
      "C4": {
        element: "Gang Activity Indicator",
        mandatory: "Yes (CA Requirement)",
        values: "Y or N",
        errors: "CA826-828"
      },
      "C5": {
        element: "Gang Type",
        mandatory: "Conditional (when C4=Y)",
        values: "01-08",
        errors: "CA829-831"
      }
    }
  }
};
