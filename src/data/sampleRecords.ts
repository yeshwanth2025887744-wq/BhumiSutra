import { SampleLandRecord as BaseSample } from './sampleRecords';

export interface SampleLandRecord {
  id: string;
  name: string;
  kannadaName?: string;
  state: string;
  portal: string;
  documentType: string;
  surveyNumber: string;
  extent: string;
  recordedOwner: string;
  kannadaOwner?: string;
  fatherOrHusbandName: string;
  villageTaluk: string;
  district: string;
  khataNumber: string;
  soilType: string;
  isDeceased: boolean;
  deceasedClues: string;
  encumbrances: string;
  confidenceScore: number;
  sampleFamily: {
    id?: string;
    name: string;
    kannada_name?: string;
    relationship: string;
    aadhaarName: string;
    age: number;
    phone?: string;
    phoneNumber?: string;
    gender: 'Male' | 'Female' | 'Other';
    maritalStatus: string;
    isNocOrRelinquishing: boolean;
    currentCity?: string;
    consentStatus?: 'PENDING' | 'VERIFIED' | 'SIGNED_NOC' | 'OBJECTED';
  }[];
  rawDocumentText: string;
  historicalComparison: {
    original_khatedar: string;
    original_year: string;
    mutation_number: string;
    historical_extent: string;
    mismatches: {
      field: string;
      historical_val: string;
      current_val: string;
      status: 'MATCH' | 'REVIEW' | 'MISMATCH';
      risk: string;
    }[];
  };
  spatialBoundaries: {
    north_boundary: string;
    south_boundary: string;
    east_boundary: string;
    west_boundary: string;
    tippani_sketch_area: string;
    boundary_shift_risk: 'LOW' | 'MEDIUM' | 'HIGH';
    encroachment_notes: string;
  };
  bankabilityScore: {
    score: number;
    tier: 'High Collateral Readiness' | 'Moderate Readiness - Clarifications Needed' | 'Critical Revenue Gaps';
    breakdown: {
      title_chain: number;
      id_match: number;
      encumbrance: number;
      concurrence: number;
    };
    pacsChecklist: {
      item: string;
      category: 'Available' | 'Missing' | 'Requires Official Confirmation';
      priority: 'HIGH' | 'MEDIUM' | 'OPTIONAL';
      action: string;
    }[];
  };
}

export const SAMPLE_LAND_RECORDS: SampleLandRecord[] = [
  {
    id: 'karnataka-devanahalli',
    name: 'Devanahalli Ancestral Farm (Late Mallappa Gowda) - Bengaluru Rural',
    kannadaName: 'ದೇವನಹಳ್ಳಿ ಪಿತ್ರಾರ್ಜಿತ ಜಮೀನು (ಲೇಟ್ ಮಲ್ಲಪ್ಪ ಗೌಡ) - ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',
    state: 'Karnataka',
    portal: 'Bhoomi Karnataka Land Records (ಭೂಮಿ ಕಂದಾಯ ಪೋರ್ಟಲ್)',
    documentType: 'Form No. 16 (Rule 58) RTC Pahani Extract (ನಮೂನೆ ೧೬)',
    surveyNumber: '142/2B',
    extent: '2 Acres 18 Guntas',
    recordedOwner: 'Late Sri Mallappa Gowda',
    kannadaOwner: 'ಲೇಟ್ ಶ್ರೀ ಮಲ್ಲಪ್ಪ ಗೌಡ ಬಿನ್ ಲೇಟ್ ನಂಜಪ್ಪ ಗೌಡ',
    fatherOrHusbandName: 'Late Nanjappa Gowda',
    villageTaluk: 'Vijayapura Hobli, Devanahalli Taluk',
    district: 'Bengaluru Rural, Karnataka',
    khataNumber: 'Khata No. 512',
    soilType: 'Kushki (Dry Agricultural Land)',
    isDeceased: true,
    deceasedClues: 'Recorded in Column 9 with prefix "Late". Column 12 remarks state demise on 14/08/2023 with Varasa mutation pending.',
    encumbrances: 'Canara Bank Devanahalli Branch Crop Loan mortgage charge ₹3,50,000/- marked under MR No. 34/2019-20 in Column 11.',
    confidenceScore: 0.98,
    sampleFamily: [
      {
        id: 'heir-1',
        name: 'Gowramma',
        kannada_name: 'ಗೌರಮ್ಮ',
        relationship: 'Surviving Widow (Wife)',
        aadhaarName: 'Gowramma M.',
        age: 62,
        gender: 'Female',
        maritalStatus: 'Widowed',
        isNocOrRelinquishing: false,
        currentCity: 'Devanahalli (Village)',
        phoneNumber: '+91 98450 XXXXX',
        consentStatus: 'VERIFIED',
      },
      {
        id: 'heir-2',
        name: 'Venkatesh Gowda',
        kannada_name: 'ವೆಂಕಟೇಶ್ ಗೌಡ',
        relationship: 'Son (Class I Heir)',
        aadhaarName: 'M. Venkatesh Gowda',
        age: 39,
        gender: 'Male',
        maritalStatus: 'Married',
        isNocOrRelinquishing: false,
        currentCity: 'Bengaluru (Whitefield)',
        phoneNumber: '+91 99001 XXXXX',
        consentStatus: 'VERIFIED',
      },
      {
        id: 'heir-3',
        name: 'Latha Devi',
        kannada_name: 'ಲತಾ ದೇವಿ',
        relationship: 'Daughter (Class I Coparcener under HSA 2005)',
        aadhaarName: 'Latha Ramesh',
        age: 36,
        gender: 'Female',
        maritalStatus: 'Married',
        isNocOrRelinquishing: false,
        currentCity: 'Mysuru (Vijayanagar)',
        phoneNumber: '+91 97412 XXXXX',
        consentStatus: 'PENDING',
      },
    ],
    rawDocumentText: `ಕರ್ನಾಟಕ ಸರ್ಕಾರ - ಕಂದಾಯ ಇಲಾಖೆ
ಭೂಮಿ ಗಣಕೀಕೃತ ಪಹಣಿ (RTC) ನಮೂನೆ ೧೬
ಜಿಲ್ಲೆ: ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ | ತಾಲೂಕು: ದೇವನಹಳ್ಳಿ | ಹೊಬಳಿ: ವಿಜಯಪುರ | ಗ್ರಾಮ: ಚಿಕ್ಕಸಣ್ಣೆ
ಸರ್ವೆ ನಂಬರ್: 142/2B | ಹಿಸ್ಸಾ: 2 | ಖಾತೆ ನಂ: 512
ಒಟ್ಟು ವಿಸ್ತೀರ್ಣ: 2-18-00 (೨ ಎಕರೆ ೧೮ ಗುಂಟೆ) | ಖರಾಬು 'ಬಿ': 0-02-00 | ಸಾಗುವಳಿ ವಿಸ್ತೀರ್ಣ: 2-16-00
ಕಾಲಂ ೯ (ಕಬ್ಜೇದಾರರ ಹೆಸರು): ಲೇಟ್ ಶ್ರೀ ಮಲ್ಲಪ್ಪ ಗೌಡ ಬಿನ್ ಲೇಟ್ ನಂಜಪ್ಪ ಗೌಡ
ಕಾಲಂ ೧೧ (ಇತರ ಹಕ್ಕುಗಳು / ಋಣಭಾರ): ಕೆನರಾ ಬ್ಯಾಂಕ್ ದೇವನಹಳ್ಳಿ ಶಾಖೆ ಕೃಷಿ ಸಾಲ ರೂ. ೩,೫೦,೦೦೦/- MR No. 34/2019-20
ಕಾಲಂ ೧೨ (ಷರಾ): ಖಾತೆದಾರ ಮಲ್ಲಪ್ಪ ಗೌಡರು ದಿನಾಂಕ 14/08/2023 ರಂದು ನಿಧನರಾಗಿದ್ದು, ವಾರಸುದಾರರ ನಮೂನೆ ೨೧ ಅರ್ಜಿ ಬಾಕಿ ಇರುತ್ತದೆ.`,
    historicalComparison: {
      original_khatedar: 'Nanjappa Gowda (Grandfather)',
      original_year: '1998 (Handwritten Pahani)',
      mutation_number: 'MR No. 12/2008-09 (Family Partition)',
      historical_extent: '2 Acres 20 Guntas',
      mismatches: [
        {
          field: 'Khatedar Surname',
          historical_val: 'Mallappa N. Gowda',
          current_val: 'Mallappa Gowda (Initial omitted)',
          status: 'REVIEW',
          risk: 'Spelling and initial mismatch triggers automatic objection by Village Accountant during scrutiny.',
        },
        {
          field: 'Total Extent',
          historical_val: '2 Acres 20 Guntas',
          current_val: '2 Acres 18 Guntas (2 Guntas Pot Kharab reduction)',
          status: 'REVIEW',
          risk: '2 Guntas demarcated as Kharab B for village road path in 2012 survey.',
        },
        {
          field: 'Survey Number',
          historical_val: 'Old Sy. 142',
          current_val: 'Sy. 142/2B (Podi Durasti sub-division)',
          status: 'MATCH',
          risk: 'Podi Durasti correctly confirmed by ADLR survey department.',
        },
      ],
    },
    spatialBoundaries: {
      north_boundary: 'Survey No. 141 Halla (Seasonal Stream / Nala)',
      south_boundary: 'Grama Bandi Raste (Village Cart Road - 15 ft width)',
      east_boundary: 'Survey No. 143/1 Kenchappa s/o Muniyappa agricultural land',
      west_boundary: 'Survey No. 142/2A Narayana Gowda (Brother’s partitioned share)',
      tippani_sketch_area: '2 Acres 18 Guntas (Conforms to Mojini Podi Sketch)',
      boundary_shift_risk: 'MEDIUM',
      encroachment_notes: 'Southern cart track widened in 2021 Gram Panchayat paving; potential 0.5 Gunta alignment variance on southern fence line.',
    },
    bankabilityScore: {
      score: 72,
      tier: 'Moderate Readiness - Clarifications Needed',
      breakdown: {
        title_chain: 20, // out of 25
        id_match: 18,    // out of 25
        encumbrance: 14, // out of 25 (active crop loan)
        concurrence: 20, // out of 25 (daughter signature pending)
      },
      pacsChecklist: [
        {
          item: 'Current Year Certified RTC (Bhoomi Digital Signed)',
          category: 'Available',
          priority: 'HIGH',
          action: 'Extracted from Bhoomi server with valid Barcode.',
        },
        {
          item: 'Genealogical Family Tree Certificate (Vamshavriksha from Nadakacheri)',
          category: 'Missing',
          priority: 'HIGH',
          action: 'Apply on Seva Sindhu / Nadakacheri portal with VAO field mahazar report.',
        },
        {
          item: 'Bank No Due Certificate (NDC) for Canara Bank Loan ₹3.50L',
          category: 'Missing',
          priority: 'HIGH',
          action: 'Approach Canara Bank Devanahalli branch to close loan or get Form 22 clearance memo.',
        },
        {
          item: 'One and the Same Person Notarized Affidavit for "M. N. Mallappa"',
          category: 'Requires Official Confirmation',
          priority: 'MEDIUM',
          action: 'Execute on ₹50 e-Stamp paper to resolve Aadhaar vs RTC initial difference.',
        },
        {
          item: 'Co-Heir Digital Consent / Hakku Bidu Patra from Latha Ramesh (Mysuru)',
          category: 'Requires Official Confirmation',
          priority: 'HIGH',
          action: 'Send remote consensus link to sign e-NOC before Revenue Inspector hearing.',
        },
      ],
    },
  },
  {
    id: 'karnataka-mandya',
    name: 'Mandya Sugarcane Plot (Late Channappa) - Multi-City Heirs',
    kannadaName: 'ಮಂಡ್ಯ ಕಬ್ಬಿನ ಗದ್ದೆ (ಲೇಟ್ ಚನ್ನಪ್ಪ) - ಬೇರೆ ನಗರಗಳಲ್ಲಿರುವ ವಾರಸುದಾರರು',
    state: 'Karnataka',
    portal: 'Bhoomi Karnataka Land Records',
    documentType: 'RTC Form 16 (Irrigated Bagayat)',
    surveyNumber: '88/4A',
    extent: '1 Acre 32 Guntas',
    recordedOwner: 'Late Channappa Patel',
    kannadaOwner: 'ಲೇಟ್ ಚನ್ನಪ್ಪ ಪಟೇಲ್ ಬಿನ್ ಕರಿಯಪ್ಪ',
    fatherOrHusbandName: 'Late Kariyappa Patel',
    villageTaluk: 'Koppa Hobli, Maddur Taluk',
    district: 'Mandya District, Karnataka',
    khataNumber: 'Khata No. 204',
    soilType: 'Tari (Canal Irrigated Sugarcane)',
    isDeceased: true,
    deceasedClues: 'Owner deceased in 2021; children live in Bengaluru, Hubballi, and Dubai.',
    encumbrances: 'Apex Bank Mandya DCCB crop loan ₹1,20,000/-',
    confidenceScore: 0.96,
    sampleFamily: [
      {
        id: 'heir-m1',
        name: 'Basavaraju C.',
        kannada_name: 'ಬಸವರಾಜು ಸಿ.',
        relationship: 'Son (Elder)',
        aadhaarName: 'Basavaraj Patel',
        age: 44,
        gender: 'Male',
        maritalStatus: 'Married',
        isNocOrRelinquishing: false,
        currentCity: 'Bengaluru (Koramangala)',
        phoneNumber: '+91 94480 XXXXX',
        consentStatus: 'VERIFIED',
      },
      {
        id: 'heir-m2',
        name: 'Shivakumar C.',
        kannada_name: 'ಶಿವಕುಮಾರ್ ಸಿ.',
        relationship: 'Son (Younger)',
        aadhaarName: 'Shivakumar Channappa',
        age: 38,
        gender: 'Male',
        maritalStatus: 'Married',
        isNocOrRelinquishing: false,
        currentCity: 'Dubai, UAE (Expat)',
        phoneNumber: '+971 50 XXXXX',
        consentStatus: 'PENDING',
      },
      {
        id: 'heir-m3',
        name: 'Sujatha C.',
        kannada_name: 'ಸುಜಾತಾ ಸಿ.',
        relationship: 'Daughter (Class I Coparcener)',
        aadhaarName: 'Sujatha Manjunath',
        age: 41,
        gender: 'Female',
        maritalStatus: 'Married',
        isNocOrRelinquishing: true, // Wishes to give NOC
        currentCity: 'Hubballi (Vidyanagar)',
        phoneNumber: '+91 98860 XXXXX',
        consentStatus: 'SIGNED_NOC',
      },
    ],
    rawDocumentText: `ಕರ್ನಾಟಕ ಸರ್ಕಾರ - ಮಂಡ್ಯ ಜಿಲ್ಲೆ, ಮದ್ದೂರು ತಾಲೂಕು, ಕೊಪ್ಪ ಹೊಬಳಿ
ಸರ್ವೆ ನಂ: 88/4A | ವಿಸ್ತೀರ್ಣ: 1-32-00 | ನೀರಾವರಿ ಕಬ್ಬಿನ ಗದ್ದೆ
ಖಾತೆದಾರ: ಲೇಟ್ ಚನ್ನಪ್ಪ ಪಟೇಲ್ ಬಿನ್ ಕರಿಯಪ್ಪ
ಋಣಭಾರ: ಮಂಡ್ಯ DCC ಬ್ಯಾಂಕ್ ಕೃಷಿ ಸಾಲ ರೂ. ೧,೨೦,೦೦೦/-
ಷರಾ: ಖಾತೆದಾರರ ನಿಧನಾನಂತರ ವಾರಸುದಾರರು ಬೇರೆ ನಗರಗಳಲ್ಲಿದ್ದು ಒಪ್ಪಿಗೆ ಪತ್ರ ಬಾಕಿ ಇದೆ.`,
    historicalComparison: {
      original_khatedar: 'Kariyappa Patel',
      original_year: '1984',
      mutation_number: 'MR No. 04/1997',
      historical_extent: '1 Acre 32 Guntas',
      mismatches: [
        {
          field: 'Khatedar Initials',
          historical_val: 'Channappa K.',
          current_val: 'Channappa Patel',
          status: 'REVIEW',
          risk: 'Caste surname added in 1997 mutation; Aadhaar of sons reflects initials.',
        },
      ],
    },
    spatialBoundaries: {
      north_boundary: 'Kaveri Distributary Canal Dist-4',
      south_boundary: 'Sy. 89 Ningegowda Sugarcane field',
      east_boundary: 'Field bund (Varambu) bordering Sy. 88/4B',
      west_boundary: 'PWD Paved Canal Road',
      tippani_sketch_area: '1 Acre 32 Guntas',
      boundary_shift_risk: 'LOW',
      encroachment_notes: 'Canal bund well demarcated; physical stone markers (Gadi Kallu) intact.',
    },
    bankabilityScore: {
      score: 65,
      tier: 'Moderate Readiness - Clarifications Needed',
      breakdown: {
        title_chain: 22,
        id_match: 16,
        encumbrance: 15,
        concurrence: 12, // Expat sibling signature required
      },
      pacsChecklist: [
        {
          item: 'Online Digital Power of Attorney / NOC from Dubai Expat Heir',
          category: 'Missing',
          priority: 'HIGH',
          action: 'Indian Consulate Dubai attestation or digital Aadhaar e-Sign workflow.',
        },
        {
          item: 'Relinquishment Deed (Hakku Bidu Patra) from Sujatha (Hubballi)',
          category: 'Available',
          priority: 'HIGH',
          action: 'Drafted and digitally verified via BhumiSutra.',
        },
        {
          item: 'Mandya DCC Bank Clearance NDC',
          category: 'Requires Official Confirmation',
          priority: 'MEDIUM',
          action: 'Clear outstanding balance of ₹1,20,000 at Koppa PACCS.',
        },
      ],
    },
  },
  {
    id: 'maharashtra-haveli',
    name: 'Maharashtra 7/12 Extract (Satbara) - Haveli Taluka, Pune',
    kannadaName: 'ಮಹಾರಾಷ್ಟ್ರ ಸಾತ್-ಬಾರಾ ದಾಖಲೆ (ಹವೇಲಿ, ಪುಣೆ)',
    state: 'Maharashtra',
    portal: 'Mahabhulekh (e-Ferfar Portal)',
    documentType: 'Maharashtra Land Revenue Code Form VII & XII (Satbara)',
    surveyNumber: 'Gat No. 318/1',
    extent: '0 Hectare 85 Are (approx 2.1 Acres)',
    recordedOwner: 'Swargiya Dnyaneshwar Tukaram Patil',
    fatherOrHusbandName: 'Tukaram Patil',
    villageTaluk: 'Wagholi, Taluka Haveli',
    district: 'Pune District, Maharashtra',
    khataNumber: 'Khata No. 489',
    soilType: 'Jirayat (Rainfed) / Bagayat (Well Irrigated)',
    isDeceased: true,
    deceasedClues: 'Prefix "Swargiya" in Gaon Namuna 7. Ferfar pencil entry records death report.',
    encumbrances: 'Bank of Maharashtra Wagholi Branch Tractor Term Loan ₹4,20,000 lien registered vide Ferfar No. 1290.',
    confidenceScore: 0.96,
    sampleFamily: [
      {
        id: 'heir-p1',
        name: 'Sumitra Dnyaneshwar Patil',
        relationship: 'Surviving Widow (Wife)',
        aadhaarName: 'Sumitra Patil',
        age: 64,
        gender: 'Female',
        maritalStatus: 'Widowed',
        isNocOrRelinquishing: false,
        currentCity: 'Pune (Wagholi)',
        consentStatus: 'VERIFIED',
      },
      {
        id: 'heir-p2',
        name: 'Sanjay Dnyaneshwar Patil',
        relationship: 'Elder Son (Class I Heir)',
        aadhaarName: 'Sanjay D. Patil',
        age: 41,
        gender: 'Male',
        maritalStatus: 'Married',
        isNocOrRelinquishing: false,
        currentCity: 'Mumbai (Thane)',
        consentStatus: 'VERIFIED',
      },
      {
        id: 'heir-p3',
        name: 'Sunita Dnyaneshwar Patil',
        relationship: 'Daughter (Class I Coparcener)',
        aadhaarName: 'Sunita Nilesh Kamble',
        age: 34,
        gender: 'Female',
        maritalStatus: 'Married',
        isNocOrRelinquishing: false,
        currentCity: 'Pune (Kothrud)',
        consentStatus: 'PENDING',
      },
    ],
    rawDocumentText: `MAHABHULEKH GAON NAMUNA 7/12 - HAVELI PUNE
Gat No. 318/1 | Extent: 0.85.00 Hectares | Khata 489
Bhogvatdar: Swargiya Dnyaneshwar Tukaram Patil
Itar Hakka: Bank of Maharashtra Tractor Karj Rs. 4,20,000/-`,
    historicalComparison: {
      original_khatedar: 'Tukaram Patil',
      original_year: '1979',
      mutation_number: 'Ferfar No. 892',
      historical_extent: '0 He 85 Are',
      mismatches: [],
    },
    spatialBoundaries: {
      north_boundary: 'Gat No. 317 Grampanchayat boundary',
      south_boundary: 'Nagar Highway Service Road',
      east_boundary: 'Gat No. 318/2 Kulkarni farm',
      west_boundary: 'Natural Nullah drainage line',
      tippani_sketch_area: '0.85 Hectares',
      boundary_shift_risk: 'LOW',
      encroachment_notes: 'Service road expansion in 2018 maintained buffer zone.',
    },
    bankabilityScore: {
      score: 80,
      tier: 'High Collateral Readiness',
      breakdown: {
        title_chain: 24,
        id_match: 20,
        encumbrance: 16,
        concurrence: 20,
      },
      pacsChecklist: [
        {
          item: 'Waras Tapasani Panchanama by Talathi',
          category: 'Missing',
          priority: 'HIGH',
          action: 'Apply on Mahabhulekh e-Ferfar portal for legal heir inquiry.',
        },
      ],
    },
  },
];
