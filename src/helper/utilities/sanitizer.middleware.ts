import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { sanitize } from 'perfect-express-sanitizer';

@Injectable()
export class SanitizerMiddleware implements NestMiddleware {

    private async handleObjects(value: object, method: any, level = 4) {
        const containsInjection = [];
        const keys = Object.keys(value);
        for (const key of keys) {
            containsInjection.push(await method(JSON.stringify(key), level));
        }
        const values = Object.values(value);
        for (const val of values) {
            containsInjection.push(await method(JSON.stringify(val), level));
        }
        return containsInjection.some(val => val === true);
    }
    async use(req: any, res: any, next: (error?: any) => void) {
        // checks in headers
        // const sqlInHeader = await this.handleObjects(req.headers, sanitize.detectSqlInj);
        // const xssInHeader = await this.handleObjects(req.headers, sanitize.detectXss)

        let sqlInBody = true;
        let xssInBody = true;
        // checks in body
        if (req.headers['backoffice'] !== true) {
            sqlInBody = await this.handleObjects(req.body, sanitize.detectSqlInj);
            xssInBody = await this.handleObjects(req.body, sanitize.detectXss)
        }


        // checks in query
        const sqlInQuery = await this.handleObjects(req.query, sanitize.detectSqlInj);
        const xssInQuery = await this.handleObjects(req.query, sanitize.detectXss)


        // checks in route params
        const sqlInParams = await this.handleObjects(req.params, sanitize.detectSqlInj);
        const xssInParams = await this.handleObjects(req.params, sanitize.detectXss)

        if (sqlInBody || sqlInQuery || sqlInParams ||
            xssInBody || xssInQuery || xssInParams) {
            const error = {
                en: 'something went wrong, please remove these special characters from any text (#,\',\",;,--)',
                ar: "حدث خطأ ما ، يرجى إزالة هذه الأحرف الخاصة من أي نص (#,',\",;,--)"
            };
            if (req.headers['language'] === 'ar')
                throw new BadRequestException(error.ar);
            else if (req.headers['language'] === 'en')
                throw new BadRequestException(error.en);
        }
        next();
    }

}