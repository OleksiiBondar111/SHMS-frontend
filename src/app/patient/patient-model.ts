interface InsuranceDTO extends EntityDTO {
  providerName?: string;
  policyName: string;
}

export interface PatientDTO extends EntityDTO {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  email: string;
  status: string
  imageId: string;
  insurance: InsuranceDTO

}

export interface EntityDTO extends IdDTO {
  lastModified?: Date;
  createdAt?: Date;
}

export interface IdDTO {
  id: number;
}
