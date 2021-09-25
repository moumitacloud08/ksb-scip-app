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
        public statisticalGoodsNumber: string,
        public purchaseOrderNumber: string,
        public scipNumber: string,
        public scipRelavent: string,
        public materialCategory: string,
        public submitStatus: string,
        public casnumber: string,
        public isAddShow: boolean = true,
        public isDeleteShow: boolean = false,
        public isInvalid: boolean = false,
        public isClearData: boolean = true,
        public rowId: Number = 0,
        public isSubRow: boolean = false,
        public isSCIPSpanShow: boolean = true,
        public isSCIPEditShow: boolean = false,
        public isStatSpanShow: boolean = true,
        public isStatEditShow: boolean = false,
        public isCasSpanShow: boolean = true,
        public isCasEditShow: boolean = false,
        public isMatSpanShow: boolean = true,
        public isMatEditShow: boolean = false,
      ) {}
  }