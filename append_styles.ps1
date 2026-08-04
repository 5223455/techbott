$css = @"

/* ==========================================
   SPECIFICATIONS TABLE STYLING
   ========================================== */
.spec-table,
.table.table-bordered {
    width: 100%;
    margin-bottom: 2rem;
    background-color: #fff;
    border-collapse: collapse;
    font-size: 14.5px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    border-radius: 8px;
    overflow: hidden;
}

.spec-table th,
.spec-table thead th,
.table.table-bordered th,
.table.table-bordered thead th {
    background-color: var(--primary) !important;
    color: #ffffff !important;
    font-weight: 600;
    padding: 14px 18px !important;
    border: 1px solid var(--primary-dark) !important;
    text-align: left;
    white-space: nowrap;
}

.spec-table td,
.table.table-bordered td {
    padding: 14px 18px !important;
    border: 1px solid #eaedf1 !important;
    color: #555;
    vertical-align: middle;
}

.spec-table td:first-child,
.table.table-bordered td:first-child,
.spec-table th:first-child,
.table.table-bordered th:first-child {
    font-weight: 600;
    color: #2c3e50;
    background-color: #fcfcfc;
    width: 200px;
}
.spec-table th:first-child,
.table.table-bordered th:first-child {
    background-color: var(--primary-dark) !important;
    color: #fff;
}

.spec-table tbody tr:hover td,
.table.table-bordered tbody tr:hover td {
    background-color: #f8faff;
}
"@

Add-Content -Path "c:\Users\saket\Downloads\public_html (1)\css\style.css" -Value $css
