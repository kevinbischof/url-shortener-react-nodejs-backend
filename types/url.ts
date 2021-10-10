export type Basic = {
    id: number
}

export type Url = Basic & {
    url: string
    short: string
    hitCount: number
}