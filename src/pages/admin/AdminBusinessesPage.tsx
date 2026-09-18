import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { MOCK_BUSINESSES } from '../../services/mockData';
import { Business } from '../../types';

export const AdminBusinessesPage: React.FC = () => {
  const columns = [
    {
      header: 'Business ID / Name',
      accessor: (item: Business) => (
        <div>
          <span className="font-bold text-slate-900">{item.name}</span>
          <span className="text-[10px] text-slate-500 font-mono block">ID: {item.id}</span>
        </div>
      ),
    },
    {
      header: 'Proprietor',
      accessor: (item: Business) => <span className="font-semibold text-slate-800">{item.ownerName}</span>,
    },
    {
      header: 'Category',
      accessor: (item: Business) => <span className="text-slate-700">{item.category}</span>,
    },
    {
      header: 'District',
      accessor: (item: Business) => <span className="text-slate-700">{item.district}, AP</span>,
    },
    {
      header: 'Trade License',
      accessor: (item: Business) => <span className="font-mono text-slate-800">{item.tradeLicenseNo}</span>,
    },
    {
      header: 'Instruments Count',
      accessor: (item: Business) => (
        <span className="font-extrabold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full">{item.totalInstruments} Devices</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Commercial Business Registry"
        subtitle="Registered commercial establishments onboarded under Legal Metrology"
      />

      <DataTable
        data={MOCK_BUSINESSES}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search business name, district, or license no..."
        searchFilterKey={(item) => `${item.name} ${item.ownerName} ${item.district}`}
      />
    </div>
  );
};
