export function generateShortUrl(): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const shortUrl = []
    for (let i = 0; i < 4; i++) {
        shortUrl.push(alphabet[Math.floor(Math.random() * alphabet.length)])
    }
    return shortUrl.join('')
}