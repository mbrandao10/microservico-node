import { LoginType } from "@/core/auth/types";
import { CreateUserType, ResetPasswordType, UpdateUserType } from "@/core/user/types";
import { CreateOrganizationType, UpdateOrganizationType } from "@/core/organization/types";
import { CreateCompanieType, UpdateCompanieType } from "@/core/companie/types";
import { CreateGroupCompanyType, UpdateGroupCompanyType } from "@/core/group-companies/types";
import { CreateServiceType, UpdateServiceType } from "@/core/service/types";

//------------------ Users ------------------//

export type RegisterUserInDB<T> = (input: CreateUserType) => Promise<T>;

export type UpdateUserInDB<T> = (input: UpdateUserType) => Promise<T>;

export type FindByIdUserType = {
  user_id: string;
};

export type FindByIdUserInDB<T> = (input: FindByIdUserType) => Promise<T>;

export type FindAllUserType = {
  page?: string;
  search?: string;
};

export type FindAllUserInDB<T> = (input: FindAllUserType) => Promise<T>;

export type DeleteUserType = {
  user_id: string;
};

export type DeleteUserInDB = (input: DeleteUserType) => Promise<void>;

export type FindByUserUserType = {
  user_id: string;
};

export type FindByUserUserInDB<T> = (input: FindByUserUserType) => Promise<T>;

export type RecoveryPasswordType = {
  email: string;
};

export type RecoveryPasswordInDB<T> = (
  input: RecoveryPasswordType
) => Promise<T>;


export type ResetPasswordInDB = (input: ResetPasswordType) => Promise<void>;


//------------------ Auth ------------------//

export type AuthUserInDB<T> = (input: LoginType) => Promise<T>;


export type LogoutUserType = {
  user_id: string;
};

export type LogoutUserInDB = (input: LogoutUserType) => Promise<void>;

//------------------ Organization ------------------//

export type RegisterOrganizationInDB<T> = (input: CreateOrganizationType) => Promise<T>;

export type UpdateOrganizationInDB<T> = (input: UpdateOrganizationType) => Promise<T>;

export type FindAllOrganizationType = {
  page?: string;
  search?: string;
};

export type FindAllOrganizationInDB<T> = (input: FindAllOrganizationType) => Promise<T>;

export type FindByIdOrganizationType = {
  organization_id: string;
};

export type FindByIdOrganizationInDB<T> = (input: FindByIdOrganizationType) => Promise<T>;

export type DeleteOrganizationType = {
  organization_id: string;
};

export type DeleteOrganizationInDB = (input: DeleteOrganizationType) => Promise<void>;


//------------------ Companie ------------------//

export type RegisterCompanieInDB<T> = (input: CreateCompanieType) => Promise<T>;

export type UpdateCompanieInDB<T> = (input: UpdateCompanieType) => Promise<T>;

export type FindAllCompanieType = {
  page?: string;
  search?: string;
};

export type FindAllCompanieInDB<T> = (input: FindAllCompanieType) => Promise<T>;

export type FindByIdCompanieType = {
  companie_id: string;
};

export type FindByIdCompanieInDB<T> = (input: FindByIdCompanieType) => Promise<T>;

export type DeleteCompanieType = {
  companie_id: string;
};

export type DeleteCompanieInDB = (input: DeleteCompanieType) => Promise<void>;

export type FindCompanyByOrganizationIdType = {
  organization_id: string;
};

export type FindompanyByOrganizationIdInDB<T> = (input: FindCompanyByOrganizationIdType) => Promise<T>;

//------------------ Service ------------------//

export type RegisterServiceInDB<T> = (input: CreateServiceType) => Promise<T>;

export type UpdateServiceInDB<T> = (input: UpdateServiceType) => Promise<T>;

export type FindAllServiceType = {
  page?: string;
  search?: string;
};

export type FindAllServiceInDB<T> = (input: FindAllServiceType) => Promise<T>;

export type FindByIdServiceType = {
  service_id: string;
};

export type FindByIdServiceInDB<T> = (input: FindByIdServiceType) => Promise<T>;

export type DeleteServiceType = {
  service_id: string;
};

export type DeleteServiceInDB = (input: DeleteServiceType) => Promise<void>;

export type FindServiceByCompanyIdType = {
  companie_id: string;
};

export type FindServiceByCompanyIdInDB<T> = (input: FindServiceByCompanyIdType) => Promise<T>;

//------------------ Group Company ------------------//

export type RegisterGroupCompanyInDB<T> = (input: CreateGroupCompanyType) => Promise<T>;

export type UpdateGroupCompanyInDB<T> = (input: UpdateGroupCompanyType) => Promise<T>;

export type FindAllGroupCompanyType = {
  page?: string;
  search?: string;
};

export type FindAllGroupCompanyInDB<T> = (input: FindAllGroupCompanyType) => Promise<T>;

export type FindByIdGroupCompanyType = {
  group_company_id: string;
};

export type FindByIdGroupCompanyInDB<T> = (input: FindByIdGroupCompanyType) => Promise<T>;

export type DeleteGroupCompanyType = {
  group_company_id: string;
};

export type DeleteGroupCompanyInDB = (input: DeleteGroupCompanyType) => Promise<void>;

export type FindByIdsGroupCompanyType = {
  group_company_id: string[];
};

export type FindByIdsGroupCompanyInDB<T> = (input: FindByIdsGroupCompanyType) => Promise<T>;

