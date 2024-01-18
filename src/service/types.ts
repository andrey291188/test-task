export interface DataType {
    accountId: string,
    email: string,
    authToken: string,
    creationDate: string,
    profile: ProfileType[]
}

export interface ProfileType {
    profileId: string,
    country: string,
    marketplace: string,
    campaigns: CampaignsType[]
}

export interface CampaignsType {
    campaignId: string,
            clicks: number,
            cost: number,
            date: string
}