export class purchasedetails {
    // public lineItemNumber: number;
    // public statisticalGoodsNumber: number;
    // public purchaseOrderNumber: number
    // public scipNumber: number
    // public scipRelavent: string
    // public materialCategory: string
    // public submitStatus: string
    // public casnumber: number
   

    constructor(
        public lineItemNumber: string,
        public statisticalGoodsNumber: number,
        public purchaseOrderNumber: number,
        public scipNumber: number,
        public scipRelavent: string,
        public materialCategory: string,
        public submitStatus: string,
        public casnumber: number,
        public isAddShow: boolean = true,
        public isDeleteShow: boolean = false,
        public isInvalid: boolean = false,
        public isClearData: boolean = true
      ) {}
  }