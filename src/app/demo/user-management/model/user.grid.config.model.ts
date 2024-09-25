import { GridColumnClass, PaginationConfig } from "src/app/theme/shared/data-table/data-table/grid.config.model";


export const app_userTableConfig: GridColumnClass[] = [
    { id: 1, headerName: 'Name', field: '' },
    { id: 2, headerName: 'Email', field: '' },
    { id: 2, headerName: 'Phone Number', field: '' },
    { id: 3, headerName: 'Role', field: '' },
    { id: 4, headerName: 'Action', field: 'action' }
];

export const app_userBulkGridConfig: PaginationConfig = {
    pageOptions: [10, 20, 50],
    defaultPageSize: 1,
    showCurrentPageReport: true,
    paginator: true,
    totalRecords: 0
};
