'use client';

import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Eye, Trash2, CheckCircle2, MessageCircle, X } from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  projectType: string;
  location: string | null;
  approxBudget: string | null;
  projectSize: string | null;
  message: string;
  status: string;
  notes: string | null;
  createdAt: Date | string;
}

interface Props {
  initialEnquiries: Enquiry[];
}

export default function AdminEnquiriesTable({ initialEnquiries }: Props) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [updating, setUpdating] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-amber-950/80 text-amber-400 border-amber-700/50';
      case 'CONTACTED':
        return 'bg-sky-950/80 text-sky-400 border-sky-700/50';
      case 'IN_PROGRESS':
        return 'bg-indigo-950/80 text-indigo-400 border-indigo-700/50';
      case 'CLOSED':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50';
      default:
        return 'bg-studio-800 text-studio-300 border-white/10';
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (e) {
      console.error('Error changing status', e);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedEnquiry.id, notes: notesInput }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) =>
            e.id === selectedEnquiry.id ? { ...e, notes: notesInput } : e
          )
        );
        setSelectedEnquiry({ ...selectedEnquiry, notes: notesInput });
      }
    } catch (e) {
      console.error('Error saving notes', e);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (e) {
      console.error('Error deleting enquiry', e);
    }
  };

  return (
    <>
      <div className="border border-white/10 overflow-x-auto bg-studio-900/40">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-studio-950 text-studio-400 font-mono uppercase tracking-wider text-[10px] border-b border-white/10">
            <tr>
              <th className="p-4">Client Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Discipline</th>
              <th className="p-4">Location</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-studio-500 font-light">
                  No enquiries recorded.
                </td>
              </tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-white">
                    {enq.name}
                    {enq.notes && (
                      <span className="block text-[10px] text-accent font-mono">
                        Has notes
                      </span>
                    )}
                  </td>
                  <td className="p-4 space-y-0.5 font-mono text-[11px]">
                    <div className="text-studio-300">{enq.phone}</div>
                    {enq.email && <div className="text-studio-500">{enq.email}</div>}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-[10px] text-studio-300 uppercase">
                      {enq.projectType}
                    </span>
                  </td>
                  <td className="p-4 text-studio-300">
                    {enq.location || '—'}
                  </td>
                  <td className="p-4 font-mono text-[11px] text-studio-400">
                    {formatDate(enq.createdAt)}
                  </td>
                  <td className="p-4">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      className={`px-2 py-1 border text-[10px] font-mono uppercase rounded-none focus:outline-none cursor-pointer bg-studio-950 ${getStatusBadge(
                        enq.status
                      )}`}
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEnquiry(enq);
                        setNotesInput(enq.notes || '');
                      }}
                      className="p-1.5 bg-white/5 hover:bg-accent text-studio-300 hover:text-studio-950 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(enq.id)}
                      className="p-1.5 bg-white/5 hover:bg-red-500 text-studio-300 hover:text-white transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Enquiry Details Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-2xl w-full bg-studio-900 border border-white/15 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-fade-in shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent block">
                  Lead Specification
                </span>
                <h3 className="text-xl font-heading font-light text-white">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-studio-400 hover:text-white bg-white/5 rounded-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Meta details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-studio-500 block uppercase text-[10px]">Phone</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-white hover:text-accent">
                  {selectedEnquiry.phone}
                </a>
              </div>
              <div>
                <span className="text-studio-500 block uppercase text-[10px]">Email</span>
                <span className="text-white">{selectedEnquiry.email || 'None'}</span>
              </div>
              <div>
                <span className="text-studio-500 block uppercase text-[10px]">Discipline</span>
                <span className="text-accent">{selectedEnquiry.projectType}</span>
              </div>
              <div>
                <span className="text-studio-500 block uppercase text-[10px]">Location</span>
                <span className="text-white">{selectedEnquiry.location || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-studio-500 block uppercase text-[10px]">Budget</span>
                <span className="text-white">{selectedEnquiry.approxBudget || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-studio-500 block uppercase text-[10px]">Scale / Area</span>
                <span className="text-white">{selectedEnquiry.projectSize || 'Not specified'}</span>
              </div>
            </div>

            {/* Client Message */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-studio-400 block">
                Project Message
              </span>
              <div className="p-4 bg-studio-950 border border-white/10 text-sm text-studio-200 font-light whitespace-pre-wrap leading-relaxed">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-studio-400 block">
                Studio Internal Follow-up Notes
              </span>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add meeting notes, agreed budget, or follow-up date..."
                className="w-full p-3 bg-studio-950 border border-white/15 text-xs text-white placeholder-studio-600 focus:outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={updating}
                className="px-4 py-2 bg-accent text-studio-950 text-xs font-semibold uppercase tracking-wider hover:bg-accent-hover transition-colors"
              >
                {updating ? 'Saving Notes...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
