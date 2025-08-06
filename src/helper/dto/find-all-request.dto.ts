import { IsOptional } from "class-validator";

export class FindAllRequest{
    @IsOptional()
    take:number;
    @IsOptional()
    page:number;
}