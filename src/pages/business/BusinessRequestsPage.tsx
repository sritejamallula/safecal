import React from 'react';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Instrument } from '../../types';
import { FileCheck, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BusinessRequestsPage: React.FC = () => {
  const { instruments } = useData();

  const columns = [
    {
      header: 'Request / Instrument ID',
      accessor: (item: Instrument) => (
        <span className="font-mono font-bold text-blue-900">{item.id}</span>
      ),
    },
    {
      header: 'Instrument Type',
      accessor: (item: Instrument) => (
        <span className="font-bold text-slate-800">{item.type}</span>
      ),
    },
    {
      header: 'Assigned Inspector',
      accessor: (item: Instrument) => (
        <span className="text-slate-700">{item.inspectorName || 'Unassigned'}</span>
      ),
    },
    {
      header: 'Registered Date',
      accessor: (item: Instrument) => (
        <span className="text-slate-600">{item.createdDate}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (item: Instrument) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      header: 'Action',
      accessor: (item: Instrument) => (
        <Link
          to={`/verify?id=${item.id}`}
          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] inline-flex items-center space-x-1 transition"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verification Requests"
        subtitle="Track the real-time inspection pipeline for your registered devices"
      />

      <DataTable
        data={instruments}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Filter requests by ID or type..."
        searchFilterKey={(item) => `${item.id} ${item.type}`}
      />
    </div>
  );
};
