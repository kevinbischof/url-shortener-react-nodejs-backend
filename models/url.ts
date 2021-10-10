import {Url} from "../types/url";
import { OkPacket, RowDataPacket } from "mysql2";
import pool from "../db";
import {generateShortUrl} from "../helper/helper";

export const create = (url: Url, callback: Function) => {
    const queryString = "INSERT INTO urls (url, short, hitCount) VALUES (?, ?, ?)"

    pool.query(
        queryString,
        [url.url, generateShortUrl(), 0],
        (err, result) => {
            if (err || !result) {callback(err)}
            if (result) {
                const insertId = (<OkPacket> result).insertId;
                findOneById(insertId, (err: Error, url: Url) => {
                    if (err) {
                        {callback(err)}
                    }
                    callback(null, url);
                })
            }
        }
    );
};

export const findOneById = (id: number, callback: Function) => {

    const queryString = `SELECT * FROM urls WHERE id = ?`

    pool.query(queryString, id, (err, result) => {
        if (err) {callback(err)}

        const row = (<RowDataPacket> result)[0];

        if (!row) callback({name: 'id_not_found', message: 'id not found'});

        if (row) {
            const url: Url =  {
                id: row.id,
                url: row.url,
                short: row.short,
                hitCount: row.hitCount + 1,
            }

            // Increase hitCount by One
            const queryString = `UPDATE urls SET hitCount=? WHERE id=?`;
            pool.query(queryString, [url.hitCount, url.id]);

            callback(null, url);
        }
    });
}

export const findOneByShortUrl = (short: string, callback: Function) => {

    const queryString = `SELECT * FROM urls WHERE short = ?`

    pool.query(queryString, short, (err, result) => {
        if (err) {callback(err)}

        const row = (<RowDataPacket> result)[0];

        if (!row) callback({name: 'short_not_found', message: 'short url not found'});

        if (row) {
            const url: Url =  {
                id: row.id,
                url: row.url,
                short: row.short,
                hitCount: row.hitCount + 1,
            }

            // Increase hitCount by One
            const queryString = `UPDATE urls SET hitCount=? WHERE id=?`;
            pool.query(queryString, [url.hitCount, url.id]);

            callback(null, url);
        }
    });
}

export const findOneByUrl = (url: Url, callback: Function) => {

    const queryString = `SELECT * FROM urls WHERE url = ?`

    pool.query(queryString, url.url, (err, result) => {
        if (err) {callback(err)}

        const row = (<RowDataPacket> result)[0];

        if (!row) callback({name: 'url_not_found', message: 'url not found'});

        if (row) {
            const url: Url =  {
                id: row.id,
                url: row.url,
                short: row.short,
                hitCount: row.hitCount + 1,
            }
            console.log('url from db: ', url)

            // Increase hitCount by One
            const queryString = `UPDATE urls SET hitCount=? WHERE id=?`;
            pool.query(queryString, [url.hitCount, url.id]);

            callback(null, url);
        }
    });
}

export const findAll = (callback: Function) => {
    const queryString = `SELECT * FROM urls`

    pool.query(queryString, (err, result) => {
        if (err) {callback(err)}

        const rows = <RowDataPacket[]> result;
        const urls: Url[] = [];

        rows.forEach(row => {
            const url: Url =  {
                id: row.id,
                url: row.url,
                short: row.short,
                hitCount: row.hitCount,
            }
            urls.push(url);
        });
        callback(null, urls);
    });
}

export const update = (url: Url, returnUrl: boolean = false, callback: Function) => {
    const queryString = `UPDATE urls SET hitCount=? WHERE id=?`;

    if (!url.id) callback({message: 'no id'})
    if (!url.hitCount) callback({message: 'no hitCount'})

    if (url.id && url.hitCount) {
        pool.query(
            queryString,
            [url.hitCount, url.id],
            (err, result) => {
                if (err || !result) {callback(err)}
                if (result && returnUrl) {
                    findOneById(url.id, (err: Error, url: Url) => {
                        if (err) {
                            {callback(err)}
                        }
                        callback(null, url);
                    })
                }
            }
        );
    }

}