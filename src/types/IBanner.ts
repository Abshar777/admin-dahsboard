export interface IBanner {
    _id: string;
    images: string;
    isDeleted: {
        status: boolean;
        deletedBy?: string;
        deletedTime: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}