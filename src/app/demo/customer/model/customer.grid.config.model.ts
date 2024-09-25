import { GridColumnClass, PaginationConfig } from "src/app/theme/shared/data-table/data-table/grid.config.model";


export const app_customerTableConfig: GridColumnClass[] = [
    { id: 1, headerName: 'Name', field: 'name' },
    { id: 2, headerName: 'Mobile Number', field: 'phoneNumber' },
    { id: 3, headerName: 'Email', field: 'email' },
    { id: 4, headerName: 'Action', field: 'action', isAction: true, isView: true, isEdit: true, isDelete: true, }
];

export const app_customerBulkGridConfig: PaginationConfig = {
    pageOptions: [10, 20, 50],
    defaultPageSize: 1,
    showCurrentPageReport: true,
    paginator: true,
    totalRecords: 0
};
