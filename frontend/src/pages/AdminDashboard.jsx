import React, { useEffect, useState } from 'react';
import { 
  Users, Calendar, Clock, Activity, ShieldCheck, Check, 
  X, Search, Filter, AlertCircle, RefreshCw, Eye, Sparkles, FileText, ToggleLeft, ToggleRight
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [packages, setPackages] = useState([]);
  const [showPricing, setShowPricing] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  
  // Filters
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppt, setSelectedAppt] = useState(null);
  
  // Package edit state
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStatus, setEditStatus] = useState('Active');
  const [editRemarks, setEditRemarks] = useState('');
  const [savingPkg, setSavingPkg] = useState(false);

  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const statsRes = await fetch('http://localhost:5000/api/stats');
      const apptsRes = await fetch('http://localhost:5000/api/appointments');
      const pkgsRes = await fetch('http://localhost:5000/api/packages');
      const configRes = await fetch('http://localhost:5000/api/config');
      
      if (statsRes.ok && apptsRes.ok && pkgsRes.ok && configRes.ok) {
        const statsData = await statsRes.json();
        const apptsData = await apptsRes.json();
        const pkgsData = await pkgsRes.json();
        const configData = await configRes.json();
        
        setStats(statsData);
        setAppointments(apptsData);
        setPackages(pkgsData);
        setShowPricing(configData.showPricing);
      } else {
        setError('Failed to fetch data from APIs.');
      }
    } catch (err) {
      setError('Connection error: could not connect to backend server. Make sure the Node server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTogglePricing = async () => {
    const nextVal = !showPricing;
    setShowPricing(nextVal);
    try {
      await fetch('http://localhost:5000/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ showPricing: nextVal }),
      });
      // Re-fetch packages to reflect masked vs. visible prices
      const pkgsRes = await fetch('http://localhost:5000/api/packages');
      if (pkgsRes.ok) {
        const pkgsData = await pkgsRes.json();
        setPackages(pkgsData);
      }
    } catch (err) {
      alert('Failed to update pricing configuration.');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setAppointments(appointments.map(a => a.id === id ? updated : a));
        // Refresh stats
        const statsRes = await fetch('http://localhost:5000/api/stats');
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } else {
        alert('Failed to update status.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSelectPkg = (pkg) => {
    setSelectedPkg(pkg);
    setEditPrice(pkg.price);
    setEditStatus(pkg.status);
    setEditRemarks(pkg.remarks || '');
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    setSavingPkg(true);
    try {
      const res = await fetch(`http://localhost:5000/api/packages/${selectedPkg.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: editPrice,
          status: editStatus,
          remarks: editRemarks
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setPackages(packages.map(p => p.id === selectedPkg.id ? updated : p));
        setSelectedPkg(null);
        alert('Package updated successfully.');
      } else {
        alert('Failed to update package details.');
      }
    } catch (err) {
      alert('Connection error.');
    } finally {
      setSavingPkg(false);
    }
  };

  const filteredAppts = appointments.filter(a => {
    const statusMatch = filterStatus === 'All' || a.status === filterStatus;
    const searchMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.phone.includes(searchTerm) ||
                        a.appointmentType.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="admin-page animate-fade-in">
      {/* Header */}
      <section className="section bg-secondary border-bottom">
        <div className="container flex-row-between flex-wrap gap-4">
          <div>
            <span className="badge badge-gold mb-2">GenSek Internal Portal</span>
            <h1>Clinician Administration</h1>
            <p className="small-text text-muted">
              Manage clinical panels, appointments, and toggle user-facing pricing rules.
            </p>
          </div>
          <div className="flex-row-center gap-3">
            <button onClick={fetchData} className="btn btn-secondary flex-row-center gap-2">
              <RefreshCw size={16} /> Sync
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="container mt-6">
          <div className="form-alert error-alert">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Global Config & Stats */}
      <section className="section pt-6 pb-6">
        <div className="container grid grid-2" style={{ gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
          {/* Stats */}
          {stats ? (
            <div className="grid grid-3" style={{ gap: '16px' }}>
              <div className="card text-center" style={{ padding: '16px' }}>
                <Clock size={16} className="text-gold text-center-icon mb-1" />
                <span className="xsmall-text text-muted">Pending Approvals</span>
                <h3 className="text-gold mt-1">{stats.pending}</h3>
              </div>
              <div className="card text-center" style={{ padding: '16px' }}>
                <ShieldCheck size={16} className="text-accent text-center-icon mb-1" />
                <span className="xsmall-text text-muted">Confirmed Slots</span>
                <h3 className="text-accent mt-1">{stats.confirmed}</h3>
              </div>
              <div className="card text-center" style={{ padding: '16px' }}>
                <Activity size={16} className="text-secondary text-center-icon mb-1" />
                <span className="xsmall-text text-muted">Total Requests</span>
                <h3 className="mt-1">{stats.totalAppointments}</h3>
              </div>
            </div>
          ) : (
            <p className="text-muted">Loading stats...</p>
          )}

          {/* Pricing Toggle Control */}
          <div className="card flex-row-between" style={{ padding: '20px' }}>
            <div>
              <h4 style={{ fontSize: '1rem' }}>Public Pricing Visibility</h4>
              <p className="xsmall-text text-muted mt-1">
                Toggle to show or hide genetic packages pricing on the website.
              </p>
            </div>
            <button 
              onClick={handleTogglePricing} 
              className="btn-link"
              style={{ padding: 0, display: 'flex', alignItems: 'center' }}
            >
              {showPricing ? (
                <ToggleRight size={38} className="text-accent" />
              ) : (
                <ToggleLeft size={38} className="text-light" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Active Appointments & Records Details */}
      <section className="section section-light pt-6">
        <div className="container grid grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
          {/* Table */}
          <div className="card" style={{ padding: '24px' }}>
            <div className="flex-row-between flex-wrap gap-4 mb-6">
              <h3 style={{ fontSize: '1.25rem' }}>Appointments List</h3>
              <div className="flex-row-center gap-2 flex-wrap">
                <div className="flex-row-center gap-2 border px-3 py-1 rounded-md bg-primary">
                  <Search size={14} className="text-light" />
                  <input
                    type="text"
                    className="small-search-input"
                    placeholder="Search patient..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex-row-center gap-2 border px-3 py-1 rounded-md bg-primary">
                  <Filter size={14} className="text-light" />
                  <select
                    className="small-select-filter"
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <p className="text-center py-12 text-muted">Loading...</p>
            ) : filteredAppts.length > 0 ? (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Preference</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppts.map((appt) => (
                      <tr key={appt.id} className={selectedAppt?.id === appt.id ? 'active-row' : ''}>
                        <td>
                          <strong>{appt.name}</strong>
                          <div className="xsmall-text text-muted">Age: {appt.age} &bull; {appt.phone}</div>
                        </td>
                        <td>
                          <div className="small-text">{appt.mode}</div>
                          <div className="xsmall-text text-muted">{appt.location}</div>
                        </td>
                        <td>
                          <div className="xsmall-text">{appt.appointmentType}</div>
                          <div className="xsmall-text text-muted">{appt.date}</div>
                        </td>
                        <td>
                          <span className={`badge badge-status-${appt.status.toLowerCase()}`}>
                            {appt.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex-row-center gap-1">
                            <button
                              onClick={() => setSelectedAppt(appt)}
                              className="action-btn btn-view"
                              title="Details"
                            >
                              <Eye size={14} />
                            </button>
                            {appt.status === 'Pending' && (
                              <button
                                onClick={() => handleUpdateStatus(appt.id, 'Confirmed')}
                                disabled={updatingId === appt.id}
                                className="action-btn btn-confirm"
                                title="Confirm"
                              >
                                <Check size={14} />
                              </button>
                            )}
                            {appt.status === 'Confirmed' && (
                              <button
                                onClick={() => handleUpdateStatus(appt.id, 'Completed')}
                                disabled={updatingId === appt.id}
                                className="action-btn btn-complete"
                                title="Complete"
                              >
                                <Check size={14} />
                              </button>
                            )}
                            {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                              <button
                                onClick={() => handleUpdateStatus(appt.id, 'Cancelled')}
                                disabled={updatingId === appt.id}
                                className="action-btn btn-cancel"
                                title="Cancel"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-12 text-muted">No appointments found.</p>
            )}
          </div>

          {/* Details Column with Double Report View */}
          <div className="card">
            <h3>Record Details</h3>
            {selectedAppt ? (
              <div className="selected-appt-details mt-4">
                <div className="detail-item mb-3">
                  <strong>Patient:</strong>
                  <p className="small-text">{selectedAppt.name} (Age: {selectedAppt.age})</p>
                </div>
                <div className="detail-item mb-3">
                  <strong>Contact:</strong>
                  <p className="small-text">{selectedAppt.phone} &bull; {selectedAppt.email}</p>
                </div>
                <div className="detail-item mb-3">
                  <strong>Mode & Location:</strong>
                  <p className="small-text">{selectedAppt.mode} session &bull; {selectedAppt.location}</p>
                  <p className="xsmall-text text-muted">{selectedAppt.date} &bull; {selectedAppt.timeSlot}</p>
                </div>
                
                {/* Double Report Attachment Render */}
                <div className="detail-item mb-3 border-top pt-3">
                  <strong>Attached Files:</strong>
                  <div className="mt-2 flex-col gap-2">
                    <div className="flex-row-center gap-2 p-2 bg-primary rounded-md">
                      <Sparkles size={14} className="text-accent" />
                      <span className="xsmall-text text-limit-3">
                        <strong>Genetic:</strong> {selectedAppt.geneticReport ? selectedAppt.geneticReport : 'None'}
                      </span>
                    </div>
                    <div className="flex-row-center gap-2 p-2 bg-primary rounded-md">
                      <FileText size={14} className="text-gold" />
                      <span className="xsmall-text text-limit-3">
                        <strong>Medical:</strong> {selectedAppt.medicalReport ? selectedAppt.medicalReport : 'None'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-item mb-3">
                  <strong>Reason & Symptoms:</strong>
                  <div className="reason-box p-3 bg-primary rounded-md mt-1">
                    <p className="xsmall-text">{selectedAppt.reason}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="xsmall-text text-muted text-center py-12">Select an appointment row to review details.</p>
            )}
          </div>
        </div>
      </section>

      {/* Package Management Section */}
      <section className="section section-light pt-0">
        <div className="container grid grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
          {/* Packages List */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 className="mb-6" style={{ fontSize: '1.25rem' }}>Packages List & Status</h3>
            {loading ? (
              <p className="text-muted">Loading packages database...</p>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Package Name</th>
                      <th>Sample</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg) => (
                      <tr key={pkg.id}>
                        <td>
                          <strong>{pkg.name}</strong>
                          <div className="xsmall-text text-muted">{pkg.tat}</div>
                        </td>
                        <td>
                          <span className="badge" style={{ fontSize: '0.75rem' }}>{pkg.sampleType}</span>
                        </td>
                        <td>
                          <div className="xsmall-text text-muted">{pkg.category.split(' ')[0]}</div>
                        </td>
                        <td>
                          <span className="small-text font-bold">
                            {typeof pkg.price === 'number' ? `Rs. ${pkg.price}` : pkg.price}
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-status-${pkg.status === 'Active' ? 'completed' : 'cancelled'}`}>
                            {pkg.status}
                          </span>
                        </td>
                        <td>
                          <button onClick={() => handleSelectPkg(pkg)} className="btn-link small-text">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Edit Package Fields Form */}
          <div className="card">
            <h3>Edit Package</h3>
            {selectedPkg ? (
              <form onSubmit={handleSavePackage} className="mt-4">
                <div className="detail-item mb-4">
                  <strong>Selected:</strong>
                  <p className="small-text">{selectedPkg.name}</p>
                </div>
                
                <div className="form-group">
                  <label>Package Price (Rs.) *</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={editPrice}
                    onChange={e => setEditPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Status *</label>
                  <select
                    className="form-control"
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Remarks / Administration Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={editRemarks}
                    onChange={e => setEditRemarks(e.target.value)}
                    placeholder="E.g. Price needs review, high priority..."
                  ></textarea>
                </div>

                <div className="grid grid-2 gap-2 mt-6">
                  <button type="button" onClick={() => setSelectedPkg(null)} className="btn btn-secondary w-full">
                    Cancel
                  </button>
                  <button type="submit" disabled={savingPkg} className="btn btn-primary w-full">
                    {savingPkg ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            ) : (
              <p className="xsmall-text text-muted text-center py-12">Click Edit next to any package row to update pricing and settings.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
