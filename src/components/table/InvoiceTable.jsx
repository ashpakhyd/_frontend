// components/InvoiceTable.js
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const InvoiceTable = ({ invoices, onEdit, onDelete }) => {
    const productTemplate = (rowData) => {
        return (
            <ul>
                {rowData.products.map((product) => (
                    <li key={product._id}>
                        {product.productName} - Qty: {product.qty}
                    </li>
                ))}
            </ul>
        );
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button 
                    icon="pi pi-pencil" 
                    className="mr-2" 
                    onClick={() => onEdit(rowData._id)} 
                    tooltip="Edit"
                    tooltipOptions={{ position: 'top' }}
                />
                <Button 
                    icon="pi pi-trash" 
                    severity="danger" 
                    onClick={() => onDelete(rowData._id)} 
                    tooltip="Delete"
                    tooltipOptions={{ position: 'top' }}
                />
            </div>
        );
    };

    return (
        <DataTable value={invoices} paginator rows={10}>
            <Column field="invoiceNumber" header="Invoice Number" />
            <Column field="invoiceDate" header="Invoice Date" body={(rowData) => new Date(rowData.invoiceDate).toLocaleDateString()} />
            <Column field="dueDate" header="Due Date" body={(rowData) => new Date(rowData.dueDate).toLocaleDateString()} />
            <Column field="clientName" header="Client Name" />
            <Column field="truckNumber" header="Truck Number" />
            <Column field="driverName" header="Driver Name" />
            <Column header="Products" body={productTemplate} />
            <Column header="Actions" body={actionTemplate} />
        </DataTable>
    );
};

export default InvoiceTable;
