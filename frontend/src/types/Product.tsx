import type { Review } from "./Review"

export type Product ={
    id: string,
    name: string,
    description: string,
    image: string,
    reviews: Review[]
}