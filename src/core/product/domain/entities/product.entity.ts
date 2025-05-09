export class Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  createdAt: Date
  updatedAt: Date

  constructor(init: Partial<Product> = {}) {
    Object.assign(this, init)
  }
}
