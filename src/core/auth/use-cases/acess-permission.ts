import { AcessPermission } from "../types";

export type OutsideAcessPermission<A> = (data: AcessPermission) => Promise<A>;

type AcessPermissionType = <A>(
  outsideAcessPermission: OutsideAcessPermission<A>
) => (data: AcessPermission) => Promise<A>;

export const outAccessPermission: AcessPermissionType = (outsideAcessPermission) => async (data) => {

  const result = await outsideAcessPermission(data);

  return result;
};


