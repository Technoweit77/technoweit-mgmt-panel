import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileDownloadIcon from '@mui/icons-material/FileDownload';


const CustomTable = ({ data = [],
    enableExpoertData = false,
    columns = [], enableSelection = false, onSelectedBooksChange, onAddClick, addButtonLabel = "Add New" }) => {
    const [rowSelection, setRowSelection] = useState({});


    let handleExportData = () => {
        alert("Exporting all data is not implemented yet.");
    }

    // Effect to notify parent component about selected books
    useEffect(() => {
        if (enableSelection && onSelectedBooksChange) {
            const selectedBooks = Object.keys(rowSelection).map((key) => data[key]);
            onSelectedBooksChange(selectedBooks);
        }
    }, [rowSelection, data, enableSelection, onSelectedBooksChange]);

    // Configure the table
    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnResizing: true,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableRowSelection: enableSelection,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        positionToolbarAlertBanner: "bottom",
        enableFullScreenToggle: true,
        enableColumnActions: false,
        enableSorting: true,
        enableSelection:true,
        enableColumnVisibilityToggle: false,
        enableDensityToggle: true,
        defaultDisplayColumn: { minSize: 40 },
        initialState: {
            density: "compact",
            showColumnFilters: false,
            showGlobalFilter: true,
            columnPinning: {
                left: ['mrt-row-expand', 'mrt-row-select'],
                right: ['mrt-row-actions'],
            },
        },
        muiTopToolbarProps: {
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // stack on xs, row on sm+
            justifyContent: "flex-end",
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            px: 2,
            py: 1,
        },
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    justifyContent: 'left',
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                }}
            >
                <Button
                    //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                    disabled={!enableExpoertData}
                    onClick={handleExportData}
                    startIcon={<FileDownloadIcon />}
                >
                    Export All Data
                </Button>
                {onAddClick && (
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={onAddClick}
                        sx={{
                            borderRadius: 2,
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": { bgcolor: "primary.dark" },
                            width: { xs: "100%", sm: "auto" }, // full width on mobile

                        }}
                    >
                        {addButtonLabel}
                    </Button>
                )}
            </Box>
        )
    });

    return (
        <Box>
            <MaterialReactTable table={table} />
        </Box>
    );
};

export default CustomTable;