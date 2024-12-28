import type { JwtPayload } from 'jwt-decode';

export {};

declare global {
  export namespace Types {
    export namespace Auth {
      export type Response = {
        clientId: string;
        client_id: string;
        credential: string;
        select_by: string;
      };
    }

    export namespace Password {
      export type Self = {
        id: number;
        created_at: string;
        title: string;
        password: string;
        clientId: string;
      };
    }

    export namespace Utils {
      export type JwtToken = JwtPayload & {
        azp: string;
        email: string;
        email_verified: boolean;
        name: string;
        picture: string;
        given_name: string;
        family_name: string;
      };

      export type MenuItem = { title: string; icon: string; route: string; disabled?: ComputedRef<boolean>; show?: ComputedRef<boolean> };
    }
  }
}
