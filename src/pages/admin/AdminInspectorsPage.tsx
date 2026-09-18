import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { MOCK_INSPECTORS } from '../../services/mockData';
import { Inspector } from '../../types';

export const AdminInspectorsPage: React.FC = () => {
  const columns = [
    {
      header: 'Badge / Name',
      accessor: (item: Inspector) => (
        <div>
          <span className="font-bold text-slate-900">{item.name}</span>
          <span className="text-[10px] text-slate-500 font-mono block">Badge: {item.badgeNumber}</span>
        </div>
      ),
    },
    {
      header: 'Designation',
      accessor: (item: Inspector) => <span className="font-semibold text-slate-800">{item.designation}</span>,
    },
    {
      header: 'Assigned Jurisdiction',
      accessor: (item: Inspector) => <span className="text-slate-700">{item.district}, AP</span>,
    },
    {
      header: 'Pending Tasks',
      accessor: (item: Inspector) => (
        <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">{item.assignedCount} Pending</span>
      ),
    },
    {
      header: 'Completed Inspections',
      accessor: (item: Inspector) => (
        <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">{item.completedCount} Completed</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Legal Metrology Inspector Roster"
        subtitle="Active field verification officers and statutory inspection throughput"
      />

      <DataTable
        data={MOCK_INSPECTORS}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search inspector name or district..."
        searchFilterKey={(item) => `${item.name} ${item.district}`}
      />
    </div>
  );
};
