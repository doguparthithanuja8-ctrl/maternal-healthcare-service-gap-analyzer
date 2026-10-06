import React from 'react';

export default function DataTable({ columns, data, keyField = 'id', onRowClick, emptyMessage = 'No records found' }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-slate-500 border border-dashed border-slate-200 rounded">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 rounded">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-[#F7F9F8] border-b border-slate-200">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3 px-3.5 font-semibold text-slate-700 ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                } ${col.width || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row, rowIdx) => (
            <tr
              key={row[keyField] || rowIdx}
              onClick={() => onRowClick && onRowClick(row)}
              className={`transition-colors ${
                onRowClick ? 'cursor-pointer hover:bg-slate-50' : 'hover:bg-slate-50/50'
              }`}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className={`py-3 px-3.5 ${
                    col.align === 'right' ? 'text-right tabular-nums' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.cellClass || 'text-slate-800'}`}
                >
                  {col.render ? col.render(row[col.accessor], row) : (row[col.accessor] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
