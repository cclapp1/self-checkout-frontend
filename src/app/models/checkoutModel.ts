export class Cart {
    taxRate: number

    products: TrimmedProduct[]

    addProduct(product: TrimmedProduct) {
        this.products.push(product)
    }

    calculateCost(): number {
        let totalCost: number = 0
        this.products.forEach(p => {
            totalCost += p.totalPrice
        })
        return Math.round(totalCost * 100) / 100
    }

    calculateCostAfterTax(): number {
        let cost: number = this.calculateCost()
        let costAfterTax: number = (cost * this.taxRate) + cost

        return Math.round(costAfterTax * 100) / 100
    }

    deleteProduct(product: TrimmedProduct): void {
        this.products = this.products.filter(p => p.upc != product.upc)
    }

    constructor(taxRate: number) {
        this.taxRate = taxRate
        this.products = []
    }
}

export class TrimmedProduct {
    upc: string
    name: string
    totalPrice: number
    singlePrice: number

    saleModifier: number
    quantity: number

    formatTotalPrice(): number {
        return Math.round(this.totalPrice * 100) / 100
    }

    increaseQuantity(): void {
        this.quantity++
        this.totalPrice = this.singlePrice * this.quantity

        if (this.saleModifier != 0) {
            this.totalPrice = this._calculateSalePrice()
        }
    }

    decreaseQuantity(): void {
        if (this.quantity - 1 != 0) {
            this.quantity--
            this.totalPrice = this.singlePrice * this.quantity
        }

        if (this.saleModifier != 0) {
            this.totalPrice = this._calculateSalePrice()
        }
    }

    private _calculateSalePrice(): number {
        let newSalePrice: number = (this.singlePrice - (this.singlePrice * this.saleModifier)) * this.quantity
        return Math.round(newSalePrice * 100) / 100
    }

    constructor(upc: string, name: string, price: number, saleModifier: number) {
        this.upc = upc
        this.name = name
        this.totalPrice = price
        this.saleModifier = saleModifier
        this.quantity = 1
        this.singlePrice = price

        if (this.saleModifier != 0) {
            this.totalPrice = this._calculateSalePrice()
        }
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