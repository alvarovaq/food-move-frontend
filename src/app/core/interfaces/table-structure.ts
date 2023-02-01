import { TypeValueTable } from "@core/enums/type-value-table";

export interface TableStructure {
    index: number;
    field: string;
    header: string;
    sort: boolean;
    type?: TypeValueTable
}