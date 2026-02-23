export type UserType = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    age: number;
    role?: string;
    activities?: ActivityType[];
};

export type AssetType = {
    id: number;
    url: string;
};

export type ActivityType = {
    asset: AssetType;
    assetId: number;
    id: number;
    name: string;
    description: string;
    minAge: number;
    maxAge: number;
    time: string;
    weekday: string;
    instructorId: number;
    users?: UserType[];
};
