import { HttpService } from "@nestjs/axios";
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestsWithBodyEnum, RequestsWithoutBodyEnum } from "../enums/requests.enum";
import { firstValueFrom } from "rxjs";
import { BadRequestException } from "@nestjs/common";

export async function requests(
    url,
    data: {},
    methods: AxiosRequestConfig,
    methodType: RequestsWithBodyEnum | RequestsWithoutBodyEnum = RequestsWithoutBodyEnum.GET,
    status: number = 200,
    message = "something went wrong please try again later"
) {
    try {
        let httpService = new HttpService();
        let response: AxiosResponse;
        if (Object.values(RequestsWithBodyEnum).includes(methodType as RequestsWithBodyEnum))
            response = (await firstValueFrom(httpService[methodType](url, data ?? {}, methods ?? {})));

        else
            response = (await firstValueFrom(httpService[methodType](url, methods ?? {})))

        if (response.status != status)
            throw new BadRequestException(message);
        return response.data;
    } catch (e) {
        console.log(e);

        throw new BadRequestException(message);
    }
}