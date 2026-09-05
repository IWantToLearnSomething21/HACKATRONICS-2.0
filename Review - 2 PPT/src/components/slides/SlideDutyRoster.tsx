import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, UserCheck, Phone, Smartphone, AlertCircle, 
  ShieldCheck, RefreshCw, CheckCircle2, ChevronRight, Stethoscope
} from 'lucide-react';
import { SlideData, StaffMember } from '../../types';
import { INITIAL_STAFF } from '../../data/slidesData';

interface SlideDutyRosterProps {
  slide: SlideData;
}

export const SlideDutyRoster: React.FC<SlideDutyRosterProps> = ({ slide }) => {
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [selectedStaffId, setSelectedStaffId] = useState<string>('s1');
  const [failoverMessage, setFailoverMessage] = useState<string | null>(null);

  const selectedStaff = staffList.find(s => s.id === selectedStaffId) || staffList[0];

  const handleStatusChange = (staffId: string, newStatus: StaffMember['status']) => {
    setStaffList(prev => prev.map(s => {
      if (s.id === staffId) {
        return { ...s, status: newStatus };
      }
      return s;
    }));

    if (newStatus === 'In OR (Surgical)') {
      const staffMember = staffList.find(s => s.id === staffId);
      setFailoverMessage(`Failover Activated: ${staffMember?.name} entered OR. All Tier 2/3 alert dispatches auto-routed to secondary responder Dr. Priya Sharma, MD.`);
      setTimeout(() => setFailoverMessage(null), 6000);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative overflow-hidden bg-slate-900 text-slate-100">
      {/* Slide Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
        <div>
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>{slide.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            {slide.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-300">
            Real-Time Escalation Synchronization
          </span>
        </div>
      </div>

      {/* Failover Toast Banner */}
      {failoverMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-center gap-2 z-10 shadow-lg"
        >
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{failoverMessage}</span>
        </motion.div>
      )}

      {/* Main Grid: Staff Cards & Detailed Shift Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-auto z-10 flex-1 overflow-hidden">
        {/* Left: Interactive Staff List */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-slate-800 p-3 overflow-y-auto max-h-[300px] lg:max-h-[340px] space-y-2">
          {staffList.map(staff => {
            const isSelected = selectedStaff.id === staff.id;
            return (
              <div
                key={staff.id}
                onClick={() => setSelectedStaffId(staff.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected 
                    ? 'bg-slate-800 border-teal-400 ring-1 ring-teal-500/30 text-white' 
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${staff.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0`}>
                    {staff.name.split(' ')[1]?.[0] || 'D'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-display text-slate-100">
                      {staff.name}
                    </h4>
                    <span className="text-[10px] text-teal-400 font-mono">
                      {staff.role} • Priority Tier {staff.tierPriority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    staff.status === 'On Duty' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : staff.status === 'In OR (Surgical)'
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {staff.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Staff Shift Console & Failover Logic */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between shadow-2xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase">
                Active Clinician Handoff
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{selectedStaff.pagerNumber}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-display">
                {selectedStaff.name}
              </h3>
              <p className="text-xs text-teal-300 font-mono mt-0.5">
                {selectedStaff.role}
              </p>
            </div>

            {/* Quick Status Selector */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-400 block">Update Shift Status:</span>
              <div className="grid grid-cols-2 gap-1.5">
                {(['On Duty', 'In OR (Surgical)', 'On Break', 'Standby'] as StaffMember['status'][]).map(statusOpt => (
                  <button
                    key={statusOpt}
                    onClick={() => handleStatusChange(selectedStaff.id, statusOpt)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-all text-center ${
                      selectedStaff.status === statusOpt
                        ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                    }`}
                  >
                    {statusOpt}
                  </button>
                ))}
              </div>
            </div>

            {/* Assigned Bed Coverage */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-400 text-[10px]">Assigned Labor Suites:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedStaff.assignedBeds.map(bed => (
                  <span key={bed} className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700 text-[10px]">
                    {bed}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 font-mono mt-3">
            <span className="text-teal-300 font-semibold">Automatic Roster Link:</span> PagerDuty and Voice TTS dispatches route dynamically to available staff.
          </div>
        </div>
      </div>

      {/* Bottom Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-slate-800/60 z-10">
        {slide.keyStats?.map((stat, i) => (
          <div key={i} className="space-y-0.5">
            <span className="text-lg sm:text-xl font-extrabold text-white font-mono tracking-tight">
              {stat.value}
            </span>
            <p className="text-xs font-semibold text-teal-400">{stat.label}</p>
            <p className="text-[10px] text-slate-400 truncate">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
