import { IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class CreateDemo2Dto {
    @IsNotEmpty({
        message: '名称不能为空',
    })
    @MinLength(1, {
        message: '名称不能少于 1 位',
    })
    @MaxLength(4, {
        message: '名称不能超过 4 位',
    })
    name:string
}
