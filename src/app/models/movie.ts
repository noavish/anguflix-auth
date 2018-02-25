import Review from "./review";

export default class Movie {
    _id : string
    imgUrl: string
    title: string
    year: number
    price: number
    shortDescription: string
    fullDescription: string
    director: string
    reviews: Review[]
}

