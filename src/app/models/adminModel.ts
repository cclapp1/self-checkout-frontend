export class Product {
    upc?: number
    productName?: string
    price?: number
    saleModifier?: number
    discontinued?: boolean
    departmentId?: number
    departmentName?: string
    quantity?: number
    taxedTf?: boolean

    constructor(upc?: number, departmentName?: string, departmentId?: number, productName?: string, price?: number, saleModifier?: number, discontinued?: boolean, quantity?: number, taxed?: boolean) {
        this.upc = upc
        this.productName = productName
        this.departmentId = departmentId
        this.price = price
        this.saleModifier = saleModifier
        this.discontinued = discontinued
        this.quantity = quantity
        this.taxedTf = taxed
        this.departmentName = departmentName
    }
}
export class Department {
    Name: string
    ID: number
    Products?: Product[]

    addProducts(products: Product[]): void {
        this.Products = products
    }

    constructor(name: string, ID: number) {
        this.Name = name
        this.ID = ID
    }
}