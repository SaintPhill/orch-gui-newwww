export type Authorization = {
    access_token: string
    expires_in: number
    jti: string
    refresh_token: string
    scope: string
    token_type: string
};

export type UserInformation = {
    active: boolean
    authorities: string[]
    client_id: string
    display_name: string
    email: string
    exp: number
    first_name: string
    jti: string
    last_name: string
    middle_name: null
    scope: string[]
    tenant_id: number
    user_id: number
    user_name: string
    user_type: string
};
