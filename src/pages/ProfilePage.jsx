import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../components/css/profile.css";

/* ── Sidebar nav items ── */
const NAV_ITEMS = [
  {
    key: "profile",
    label: "Profile Details",
    path: "/profile",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    key: "orders",
    label: "Order History",
    path: "/orders",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    key: "addresses",
    label: "Saved Addresses",
    path: "/addresses",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    key: "payment",
    label: "Payment Methods",
    path: "/payment",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    key: "help",
    label: "Help Center & Returns",
    path: "/help",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

/* ── Default form data ── */
const DEFAULT_FORM = {
  firstName: "Priya",
  lastName: "Sharma",
  email: "priya.s@example.com",
  phone: "98765 43210",
  gender: "Female",
  dob: "1995-08-15",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [saved, setSaved] = useState({ ...DEFAULT_FORM });
  const [showToast, setShowToast] = useState(false);

  const initials = `${form.firstName?.[0] ?? ""}${form.lastName?.[0] ?? ""}`.toUpperCase();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDiscard = () => {
    setForm({ ...saved });
  };

  const handleSave = () => {
    setSaved({ ...form });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="profile-page">
      <Header />

      {/* Breadcrumb */}
      <div className="pr-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>My Account</span>
        <span>›</span>
        <span>Profile Details</span>
      </div>

      {/* Layout */}
      <div className="pr-layout">

        {/* ── Sidebar ── */}
        <aside className="pr-sidebar">
          {/* Avatar card */}
          <div className="pr-avatar-card">
            <div className="pr-avatar">{initials}</div>
            <div className="pr-avatar-info">
              <div className="pr-avatar-name">{form.firstName} {form.lastName}</div>
              <div className="pr-avatar-email">{form.email}</div>
            </div>
          </div>

          {/* Nav card */}
          <nav className="pr-nav-card">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`pr-nav-item${item.key === "profile" ? " active" : ""}`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Logout */}
            <button
              className="pr-nav-item pr-nav-item--logout"
              onClick={() => navigate("/")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="pr-main">
          {/* Content header */}
          <div className="pr-content-header">
            <div>
              <h1 className="pr-content-title">Profile Details</h1>
              <p className="pr-content-sub">Manage your personal information and contact details.</p>
            </div>
            <div className="pr-header-actions">
              <button className="pr-btn-discard" onClick={handleDiscard}>Discard</button>
              <button className="pr-btn-save" onClick={handleSave}>Save Changes</button>
            </div>
          </div>

          {/* ── Personal Information ── */}
          <div className="pr-card">
            <h2 className="pr-section-title">Personal Information</h2>
            <div className="pr-form-grid">

              {/* First Name */}
              <div className="pr-field">
                <label className="pr-label">First Name</label>
                <input
                  className="pr-input"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </div>

              {/* Last Name */}
              <div className="pr-field">
                <label className="pr-label">Last Name</label>
                <input
                  className="pr-input"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>

              {/* Email */}
              <div className="pr-field">
                <label className="pr-label">Email Address</label>
                <input
                  className="pr-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div className="pr-field">
                <label className="pr-label">Phone Number</label>
                <div className="pr-phone-wrap">
                  <span className="pr-phone-prefix">+91</span>
                  <input
                    className="pr-phone-input"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="98765 43210"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="pr-field">
                <label className="pr-label">Gender</label>
                <select
                  className="pr-select"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="pr-field">
                <label className="pr-label">Date of Birth</label>
                <input
                  className="pr-input"
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          {/* ── Change Password ── */}
          <div className="pr-card">
            <h2 className="pr-section-title">Change Password</h2>
            <div className="pr-form-grid">

              {/* Current Password */}
              <div className="pr-field pr-field--full">
                <label className="pr-label">Current Password</label>
                <input
                  className="pr-input"
                  name="currentPassword"
                  type="password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div className="pr-field">
                <label className="pr-label">New Password</label>
                <input
                  className="pr-input"
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirm New Password */}
              <div className="pr-field">
                <label className="pr-label">Confirm New Password</label>
                <input
                  className="pr-input"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
              </div>

            </div>
          </div>

        </main>
      </div>

      <Footer />

      {/* Toast */}
      {showToast && (
        <div className="pr-toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Profile saved successfully!
        </div>
      )}
    </div>
  );
}
