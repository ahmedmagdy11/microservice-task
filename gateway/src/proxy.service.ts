import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { config } from 'dotenv';
config()

@Injectable()
export class ProxyService {
    private authUrl = process.env.AUTH_SERVICE_URL;
    private machineUrl = process.env.MACHINE_SERVICE_URL;
    private hmacSecret = process.env.HMAC_SECRET;

    signBody(body: any) {
        const json = JSON.stringify(body || {});
        return crypto
            .createHmac('sha256', this.hmacSecret as string)
            .update(json)
            .digest('hex');
    }

    async forwardToAuth(path: string, method: string, body?: any) {
        return axios({
            url: `${this.authUrl}${path}`,
            method,
            data: body,
        }).then((res) => res.data);
    }

    async forwardToMachine(path: string, method: string, body: any, userId: string, idempotencyKey?: string) {
        return axios({
            url: `${this.machineUrl}${path}`,
            method,
            data: body,
            headers: {
                'X-User-Id': userId,
                'X-Signature': this.signBody(body),
                'Iidempotency-Key': idempotencyKey
            },
        }).then((res) => res.data);
    }
}
