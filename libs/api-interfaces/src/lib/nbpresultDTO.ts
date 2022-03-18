export interface NBPResultDTO{
    rates: NBPRate[]
}

export interface NBPRate {
    effectiveDate: string,
    mid: number
}

