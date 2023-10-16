import { List_Product_Image } from "../products/list_product_image";

export class List_Basket_Item {
    basketItemId: string;
    name: string;
    price: number;
    quantity: number;
    productImageFiles: List_Product_Image[];
    imagePath: string;
}

