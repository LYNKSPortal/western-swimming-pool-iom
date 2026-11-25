export type PersonDetails = {
  title: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  dateOfBirth: string;
  gender: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  postcode: string;
  county: string;
  email: string;
  additionalEmails: string;
  phoneType: string;
  phone: string;
  additionalPhones: string;
  medicalConsent: boolean;
  medicalConditions: string;
  medicalNotes: string;
};

export const titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Mx", "Other"];
export const genderOptions = ["Not set", "Male", "Female"];
export const phoneTypeOptions = ["Home", "Mobile", "Work"];

export function emptyPerson(): PersonDetails {
  return {
    title: titleOptions[0],
    firstName: "",
    lastName: "",
    preferredName: "",
    dateOfBirth: "",
    gender: genderOptions[0],
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    postcode: "",
    county: "",
    email: "",
    additionalEmails: "",
    phoneType: phoneTypeOptions[0],
    phone: "",
    additionalPhones: "",
    medicalConsent: false,
    medicalConditions: "",
    medicalNotes: "",
  };
}

export function displayName(person: Pick<PersonDetails, "title" | "firstName" | "lastName">) {
  return [person.title, person.firstName, person.lastName].filter(Boolean).join(" ");
}

export function normalizePerson(person: PersonDetails): PersonDetails {
  const normalized: PersonDetails = {
    ...person,
    firstName: person.firstName.trim(),
    lastName: person.lastName.trim(),
    preferredName: person.preferredName.trim(),
    dateOfBirth: person.dateOfBirth.trim(),
    addressLine1: person.addressLine1.trim(),
    addressLine2: person.addressLine2.trim(),
    addressLine3: person.addressLine3.trim(),
    city: person.city.trim(),
    postcode: person.postcode.trim(),
    county: person.county.trim(),
    email: person.email.trim(),
    additionalEmails: person.additionalEmails.trim(),
    phone: person.phone.trim(),
    additionalPhones: person.additionalPhones.trim(),
    medicalConditions: person.medicalConditions.trim(),
    medicalNotes: person.medicalNotes.trim(),
  };
  if (!normalized.medicalConsent) {
    normalized.medicalConditions = "";
    normalized.medicalNotes = "";
  }
  return normalized;
}
