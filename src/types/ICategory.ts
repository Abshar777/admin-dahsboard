interface ICategory {
    _id:string;
    category: string;
    discountExpiresIn?: Date;
    discountInPercentage: number;
    discountStatus: "expired" | "active" | "disabled";
    isDisabled: boolean;
    isDeleted: {
      status: boolean;
      deletedBy?:string;
      deletedTime: Date;
    };
  }