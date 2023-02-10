export class Cart {
    id?: number
    taxRate: number
    newCart: boolean = true

    products: TrimmedProduct[]

    addProduct(product: TrimmedProduct) {
        this.products.push(product)
    }

    calculateCost(): number {
        let totalCost: number = 0
        this.products.forEach(p => {
            if (p.saleModifier != 0) {
                totalCost += p.calculateSalePrice()
            } else {
                totalCost += p.calculateTotalPrice()
            }
        })
        return Math.round(totalCost * 100) / 100
    }

    calculateCostAfterTax(): number {
        let cost: number = 0
        this.products.forEach(p => {
            let itemCost: number = (p.singleCost * p.quantity)
            if (p.isTaxed) {
                cost += (itemCost * this.taxRate) + itemCost
            } else {
                cost += itemCost
            }
        })

        return Math.round(cost * 100) / 100
    }

    deleteProduct(product: TrimmedProduct): void {
        this.products = this.products.filter(p => p.upc != product.upc)
    }

    constructor(options: { taxRate: number, id?: number }) {
        this.taxRate = options.taxRate
        this.products = []
        this.id = options.id
    }
}

export class TrimmedProduct {
    upc: string
    name: string
    singleCost: number
    saleModifier: number
    quantity: number
    isTaxed: boolean

    increaseQuantity(): void {
        this.quantity++

    }

    decreaseQuantity(): void {
        if (this.quantity - 1 != 0) {
            this.quantity--
        }
    }

    calculateSalePrice(): number {
        let newSalePrice: number = (this.singleCost - (this.singleCost * this.saleModifier)) * this.quantity
        return Math.round(newSalePrice * 100) / 100
    }

    calculateTotalPrice(): number {
        let price: number = this.quantity * this.singleCost
        return Math.round(price * 100) / 100
    }

    constructor(options: { upc: string, name: string, singleCost: number, saleModifier: number, isTaxed: boolean, quantity?: number }) {
        this.upc = options.upc
        this.name = options.name
        this.saleModifier = options.saleModifier
        this.quantity = options.quantity ?? 1
        this.singleCost = options.singleCost
        this.isTaxed = options.isTaxed
    }
}

export class Transaction {
    cost: number
    paymentCard: string
    products: TransactionProduct[]

    transactionID?: string

    constructor(cost: number, paymentCard: string, products: TransactionProduct[]) {
        this.cost = cost
        this.paymentCard = paymentCard
        this.products = products
    }
}

export class TransactionProduct {
    upc: string
    quantity: number

    constructor(upc: string, quantity: number) {
        this.upc = upc
        this.quantity = quantity
    }
}