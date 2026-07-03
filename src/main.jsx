import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  ['About', '#about'],
  ['Race Categories', '#race-categories'],
  ['Prizes', '#prizes'],
  ['Sponsors', '#sponsors'],
  ['Register', '#registration'],
  ['Contact Us', '#contact']
];

const onlineImages = {
  shoes: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80',
  town: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  mapEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=34.9820%2C0.9980%2C35.0180%2C1.0340&layer=mapnik&marker=1.0167%2C35.0000'
};

const objectives = [
  {
    title: 'Promote Kitale Town',
    copy: 'Position Kitale as a vibrant destination for sport, agriculture, hospitality, and tourism.',
    icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z'
  },
  {
    title: 'Health & Wellness',
    copy: 'Inspire families, professionals, schools, churches, and corporate teams to move together.',
    icon: 'M12 21s-7-4.35-9.33-9.8C.88 7.02 3.9 3.5 7.63 4.31A5.23 5.23 0 0 1 12 7.02a5.23 5.23 0 0 1 4.37-2.71c3.73-.81 6.75 2.71 4.96 6.89C19 16.65 12 21 12 21Z'
  },
  {
    title: 'Brand Affinity',
    copy: 'Connect sponsors with a proud, active community through a memorable regional experience.',
    icon: 'M8.7 12.2 11 14.5a3 3 0 0 0 4.24 0l3.54-3.54a3 3 0 0 0-4.24-4.24l-.7.7m-4.68 9.16-.7.7a3 3 0 0 1-4.24-4.24l3.54-3.54a3 3 0 0 1 4.24 0l2.3 2.3'
  }
];

const raceCategories = [
  { distance: '21KM', title: 'Half Marathon', detail: 'Elite endurance race starting and finishing at Kitale Stadium.' },
  { distance: '15KM', title: 'Race', detail: 'A serious middle-distance route for trained community runners.' },
  { distance: '10KM', title: 'Race', detail: 'Fast, vibrant road race through the heart of Kitale town.' },
  { distance: '10KM', title: "CEO's Challenge", detail: 'Executive challenge for leaders, teams, and brand champions.' },
  { distance: '5KM', title: 'Family Fun Run', detail: 'Inclusive community run for families, schools, and first-timers.' }
];

const prizeRows = [
  ['1st', 'Ksh 1.5M', 'Ksh 500k', 'Ksh 250k', 'Ksh 150k'],
  ['2nd', 'Ksh 1M', 'Ksh 250k', 'Ksh 150k', 'Ksh 100k'],
  ['3rd', 'Ksh 500k', 'Ksh 150k', 'Ksh 100k', 'Ksh 50k']
];

const otherPrizes = [
  ['Children 10-18', 'Shopping vouchers across all distances for young finishers and standout performers.'],
  ['Elderly 50-70', 'Shopping vouchers recognizing consistency, courage, and lifelong wellness.'],
  ['Persons with Disabilities', 'Shopping vouchers across all distances in an inclusive race experience.'],
  ['Corporate Groups', 'Appreciation plaques for organizations that show up with team spirit.'],
  ['Church Groups', 'Appreciation plaques for faith communities participating together.'],
  ['School Groups', 'Appreciation plaques for institutions building the next generation of runners.']
];

const sponsorTiers = [
  {
    name: 'Platinum Sponsor',
    price: 'Ksh. 5,000,000',
    featured: true,
    perks: ['First right of refusal', '20 running kits', 'Premium booth space', 'VIP access', 'Speaking slot', 'Top-tier venue and media visibility']
  },
  {
    name: 'Gold Sponsor',
    price: 'Ksh. 3,000,000',
    perks: ['10 running kits', 'Branded booth space', 'VIP access', 'Co-sponsoring reception', 'Strong logo placement']
  },
  {
    name: 'Silver Sponsor',
    price: 'Ksh. 1,000,000',
    perks: ['6 running kits', 'Booth with 1 staff member', 'Logo placement', 'Speaking slot', 'Event mention']
  },
  {
    name: 'Bronze Sponsor',
    price: 'Ksh. 500,000',
    perks: ['4 running kits', 'Booth with 1 staff member', 'Logo placement', 'Venue signage', 'Community visibility']
  }
];

const registrationCategories = [
  { name: '21KM Half Marathon', fee: 'Ksh 2,500' },
  { name: '15KM Race', fee: 'Ksh 2,000' },
  { name: '10KM Race', fee: 'Ksh 1,500' },
  { name: "10KM CEO's Challenge", fee: 'Ksh 5,000' },
  { name: '5KM Family Fun Run', fee: 'Ksh 1,000' }
];

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

function formatMoney(amount, currency = 'KES') {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount || 0);
}

function Icon({ path, className = 'h-6 w-6' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-surface/92 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10" aria-label="Primary navigation">
        <a href="#top" className="flex items-center gap-3 text-green-900">
          <img src="/kitale-logo.jpeg" alt="Kitale Half Marathon logo" className="h-12 w-12 rounded-full object-cover ring-2 ring-green-200" />
          <span className="brand-heading text-lg uppercase leading-tight sm:text-xl">Kitale Half Marathon</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={label} className="font-label text-sm font-bold uppercase text-ink transition hover:text-orange-700" href={href}>
              {label}
            </a>
          ))}
          <a className="rounded-xl bg-orange-600 px-5 py-3 font-label text-sm font-bold uppercase text-white transition hover:-translate-y-0.5 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-100" href="#registration">
            Register Now
          </a>
        </div>
        <button
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line text-green-900 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-surface px-4 pb-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 pt-3">
            {navItems.map(([label, href]) => (
              <a key={label} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-label text-sm font-bold uppercase text-ink hover:bg-slatekit-50" href={href}>
                {label}
              </a>
            ))}
            <a onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-orange-600 px-5 py-3 text-center font-label text-sm font-bold uppercase text-white" href="#registration">
              Register Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function AdminDashboard() {
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kitale_admin_auth')) || { token: '', admin: null };
    } catch {
      return { token: '', admin: null };
    }
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [data, setData] = useState({ summary: null, registrations: [] });
  const [loadState, setLoadState] = useState({ status: 'idle', message: '' });
  const [loginState, setLoginState] = useState({ status: 'idle', message: '' });

  async function handleLogin(event) {
    event.preventDefault();
    setLoginState({ status: 'loading', message: 'Signing in...' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Login failed.');
      }

      const nextAuth = { token: result.token, admin: result.admin };
      localStorage.setItem('kitale_admin_auth', JSON.stringify(nextAuth));
      setAuth(nextAuth);
      setLoginForm({ email: '', password: '' });
      setLoginState({ status: 'success', message: 'Signed in.' });
      setLoadState({ status: 'idle', message: '' });
    } catch (error) {
      setLoginState({ status: 'error', message: error.message || 'Login failed.' });
    }
  }

  function logout() {
    localStorage.removeItem('kitale_admin_auth');
    setAuth({ token: '', admin: null });
    setData({ summary: null, registrations: [] });
    setLoadState({ status: 'idle', message: '' });
  }

  async function loadRegistrations(event) {
    event?.preventDefault();
    setLoadState({ status: 'loading', message: 'Loading registrations...' });

    try {
      const params = new URLSearchParams();

      if (query.trim()) {
        params.set('search', query.trim());
      }

      if (status) {
        params.set('status', status);
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/registrations?${params}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Could not load registrations.');
      }

      setData(result);
      setLoadState({ status: 'success', message: `Loaded ${result.registrations.length} registration(s).` });
    } catch (error) {
      setLoadState({ status: 'error', message: error.message || 'Could not load registrations.' });
    }
  }

  useEffect(() => {
    if (auth.token) {
      loadRegistrations();
    }
  }, [auth.token]);

  if (!auth.token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-8 text-ink sm:px-6 lg:px-10">
        <section className="w-full max-w-xl">
          <a href="/" className="mx-auto mb-8 flex w-fit items-center gap-3 text-green-900">
            <img src="/kitale-logo.jpeg" alt="Kitale Half Marathon logo" className="h-14 w-14 rounded-full object-cover ring-2 ring-green-200" />
            <span className="brand-heading text-2xl uppercase">Kitale Half Marathon</span>
          </a>

          <form onSubmit={handleLogin} className="rounded-[1.5rem] border border-line bg-white p-6 shadow-soft sm:p-8">
            <p className="font-label text-sm font-bold uppercase text-orange-700">Admin access</p>
            <h1 className="mt-2 font-display text-4xl font-black text-green-900">Login first</h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              Enter your admin email and password to access registrations and payment records.
            </p>

            <div className="mt-6 grid gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-muted">Email address</span>
                <input
                  value={loginForm.email}
                  onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                  required
                  type="email"
                  className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40"
                  placeholder="admin@kitalehalfmarathon.co.ke"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-muted">Password</span>
                <input
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                  required
                  type="password"
                  className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40"
                  placeholder="Password"
                />
              </label>
              <button type="submit" disabled={loginState.status === 'loading'} className="rounded-xl bg-orange-600 px-6 py-3 font-label font-bold uppercase text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70">
                {loginState.status === 'loading' ? 'Signing in...' : 'Login'}
              </button>
            </div>

            {loginState.message && (
              <p className={`mt-4 rounded-xl px-4 py-3 text-sm ${loginState.status === 'error' ? 'bg-red-50 text-red-900' : 'bg-green-200/30 text-green-950'}`}>
                {loginState.message}
              </p>
            )}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 text-ink sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
          <a href="/" className="flex items-center gap-3 text-green-900">
            <img src="/kitale-logo.jpeg" alt="Kitale Half Marathon logo" className="h-12 w-12 rounded-full object-cover ring-2 ring-green-200" />
            <span className="brand-heading text-xl uppercase">Kitale Half Marathon</span>
          </a>
          <a href="/" className="rounded-xl border border-line px-4 py-2 text-sm font-bold text-green-900 transition hover:bg-green-200/20">
            Back to website
          </a>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="font-label text-sm font-bold uppercase text-orange-700">Registration backend</p>
            <h1 className="mt-2 font-display text-4xl font-black text-green-900">Admin registrations</h1>
            <p className="mt-4 leading-7 text-muted">
              This is the backend view for submitted runners. It reads from MongoDB through protected admin login and shows registration plus payment status.
            </p>
            {auth.admin && (
              <div className="mt-5 rounded-2xl border border-line bg-white p-4">
                <p className="text-sm font-semibold text-muted">Signed in as</p>
                <p className="mt-1 font-bold text-green-900">{auth.admin.name}</p>
                <p className="text-sm text-muted">{auth.admin.email} / {auth.admin.role}</p>
                <button onClick={logout} className="mt-4 rounded-xl border border-line px-4 py-2 text-sm font-bold text-green-900 transition hover:bg-green-200/20">
                  Logout
                </button>
              </div>
            )}
          </div>

          <form onSubmit={loadRegistrations} className="rounded-[1.5rem] border border-line bg-white p-5 shadow-soft">
            <h2 className="font-display text-2xl font-black text-green-900">Registration filters</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-[0.8fr_1fr_auto]">
              <label className="block">
                <span className="text-sm font-semibold text-muted">Payment status</span>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40"
                >
                  <option value="">All statuses</option>
                  <option value="pending_payment">Pending payment</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-muted">Search</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="search"
                  className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40"
                  placeholder="Registration number, name, email, or phone"
                />
              </label>
              <button type="submit" disabled={loadState.status === 'loading'} className="self-end rounded-xl bg-orange-600 px-6 py-3 font-label font-bold uppercase text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70">
                {loadState.status === 'loading' ? 'Loading...' : 'Load'}
              </button>
            </div>
            {loadState.message && (
              <p className={`mt-4 rounded-xl px-4 py-3 text-sm ${loadState.status === 'error' ? 'bg-red-50 text-red-900' : 'bg-green-200/30 text-green-950'}`}>
                {loadState.message}
              </p>
            )}
          </form>
        </div>

        {data.summary && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Total', data.summary.total],
              ['Paid', data.summary.paid],
              ['Pending', data.summary.pendingPayment],
              ['Cancelled', data.summary.cancelled]
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.25rem] border border-line bg-white p-5">
                <p className="font-label text-sm font-bold uppercase text-muted">{label}</p>
                <p className="mt-2 font-display text-4xl font-black text-green-900">{value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-[1080px] w-full text-left">
              <thead className="bg-green-900 text-white">
                <tr>
                  {['Registration', 'Runner', 'Category', 'Amount', 'Payment', 'Phone', 'Submitted'].map((heading) => (
                    <th key={heading} className="px-5 py-4 text-sm font-bold uppercase">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.registrations.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8 text-center text-muted" colSpan="7">
                      No registrations loaded yet.
                    </td>
                  </tr>
                ) : (
                  data.registrations.map((registration) => (
                    <tr key={registration._id} className="align-top odd:bg-white even:bg-slatekit-50/70">
                      <td className="px-5 py-4 font-bold text-green-900">{registration.registrationNumber}</td>
                      <td className="px-5 py-4">
                        <p className="font-semibold">{registration.fullName}</p>
                        <p className="text-sm text-muted">{registration.email}</p>
                      </td>
                      <td className="px-5 py-4">{registration.category}</td>
                      <td className="px-5 py-4 font-semibold">{formatMoney(registration.feeAmount, registration.currency)}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${registration.status === 'paid' ? 'bg-green-200 text-green-950' : 'bg-orange-100 text-orange-700'}`}>
                          {registration.status.replace('_', ' ')}
                        </span>
                        <p className="mt-2 text-sm text-muted">{registration.payment?.provider || 'manual'} / {registration.payment?.status || 'pending'}</p>
                      </td>
                      <td className="px-5 py-4">{registration.phone}</td>
                      <td className="px-5 py-4 text-sm text-muted">{formatDate(registration.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[92svh] overflow-hidden pt-20">
      <img src="/kitale-hero.png" alt="Distance runners on a Kitale road with green fields and highlands at sunrise" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green-950 via-green-950/52 to-green-950/10" />
      <div className="mx-auto flex min-h-[calc(92svh-5rem)] max-w-7xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 md:pb-16 lg:px-10">
        <div className="max-w-4xl text-white">
          <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/12 px-4 py-2 font-label text-sm font-bold uppercase backdrop-blur">
            Sunday, 29th November 2026 | Kitale Stadium, Kenya
          </p>
          <h1 className="marathon-heading max-w-6xl text-[3.35rem] uppercase leading-[0.86] tracking-wide text-white sm:text-7xl lg:text-9xl">
            <span className="block whitespace-nowrap">Kitale Half</span>
            <span className="block">Marathon</span>
          </h1>
          <div className="mt-4 h-2 w-40 skew-x-[-18deg] rounded-full bg-gradient-to-r from-orange-600 via-green-200 to-white" />
          <p className="mt-5 font-display text-2xl font-extrabold italic text-green-200 sm:text-4xl">
            "I've got Kitale Vibe"
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#registration" className="rounded-xl bg-orange-600 px-7 py-4 text-center font-label text-base font-bold uppercase text-white transition hover:-translate-y-1 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-100">
              Register for the Run
            </a>
            <a href="#sponsors" className="rounded-xl border-2 border-white px-7 py-4 text-center font-label text-base font-bold uppercase text-white transition hover:-translate-y-1 hover:bg-white hover:text-green-900">
              Become a Partner
            </a>
          </div>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {['Kitale Stadium Start/Finish', 'Mt. Elgon Gateway', '7k+ Local Reach'].map((item) => (
            <div key={item} className="rounded-2xl border border-white/20 bg-white/12 p-4 font-label text-sm font-bold uppercase text-white backdrop-blur">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div>
          <p className="font-label text-sm font-bold uppercase text-orange-700">Organized by Top Brand PR</p>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight text-green-900 sm:text-5xl">
            A race for Kitale's speed, soil, and spirit.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
            <p>
              Kitale Half Marathon is a vibrant road-running experience created to celebrate the town, energize the community, and invite partners into a proud regional story.
            </p>
            <p>
              Known as Kenya's food basket, Kitale brings together rich agricultural heritage, warm hospitality, and tourism appeal near Mt. Elgon National Park, approximately 11km away.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative min-h-72 overflow-hidden rounded-[2rem] shadow-soft">
            <img src={onlineImages.shoes} alt="Runner tying shoes before a road race" className="h-full min-h-72 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-display text-3xl font-black text-white">Green miles. Big finish.</p>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-[2rem] border border-line bg-white sm:mt-10">
            <img src={onlineImages.town} alt="Green countryside landscape representing Kitale and Mt. Elgon tourism appeal" className="h-full min-h-72 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-900/72 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-display text-3xl font-black text-white">Mt. Elgon gateway.</p>
          </div>
        </div>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {objectives.map((item) => (
          <article key={item.title} className="rounded-[2rem] border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-green-900">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-900 text-white">
              <Icon path={item.icon} />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink">{item.title}</h3>
            <p className="mt-3 leading-7 text-muted">{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RaceCategories() {
  return (
    <section id="race-categories" className="bg-green-900 py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-label text-sm font-bold uppercase text-green-200">Choose your distance</p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase italic sm:text-5xl">Race Categories</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-green-200">
            Every category starts and finishes at Kitale Stadium, then meanders through the heart of Kitale town with the crowd carrying the vibe from start gun to final stride.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {raceCategories.map((race) => (
            <article key={`${race.distance}-${race.title}`} className="group flex min-h-64 flex-col justify-between rounded-[1.5rem] border border-white/10 bg-green-800 p-6 transition hover:-translate-y-1 hover:bg-orange-600">
              <div className="font-display text-5xl font-black italic">{race.distance}</div>
              <div>
                <h3 className="font-display text-xl font-bold uppercase">{race.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/78 group-hover:text-white">{race.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-5 overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-5 lg:grid-cols-[1fr_0.72fr]">
          <div className="relative min-h-80 overflow-hidden rounded-[1.5rem] bg-slatekit-900">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,95,24,.95),rgba(74,33,8,.72)),radial-gradient(circle_at_18%_22%,rgba(180,220,114,.68),transparent_22%),radial-gradient(circle_at_70%_65%,rgba(234,216,184,.48),transparent_24%)]" />
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-75" viewBox="0 0 720 360" fill="none">
              <path d="M65 260C150 180 190 310 285 210C370 120 420 262 505 174C555 122 594 128 660 84" stroke="white" strokeWidth="16" strokeLinecap="round" opacity=".88" />
              <path d="M65 260C150 180 190 310 285 210C370 120 420 262 505 174C555 122 594 128 660 84" stroke="#6b330d" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <iframe
              title="Kitale Stadium route area map"
              src={onlineImages.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-green-950/55 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/88 p-5 text-green-900 backdrop-blur">
              <p className="font-label text-sm font-bold uppercase text-orange-700">Route Plan</p>
              <p className="mt-2 font-display text-2xl font-bold">Kitale Stadium loop through town</p>
              <a className="mt-3 inline-flex font-label text-sm font-bold uppercase text-orange-700 hover:text-orange-600" href="https://www.openstreetmap.org/?mlat=1.0167&mlon=35.0000#map=14/1.0167/35.0000" target="_blank" rel="noreferrer">
                Open larger map
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center p-3 lg:p-7">
            <p className="font-label text-sm font-bold uppercase text-green-200">Start. Flow. Finish.</p>
            <h3 className="mt-3 font-display text-3xl font-black">Built for runners and spectators.</h3>
            <p className="mt-4 leading-7 text-green-200">
              The route is designed as an energetic town showcase, giving athletes a clear stadium finish and partners high-visibility touchpoints across race day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Prizes() {
  const [tab, setTab] = useState('cash');

  return (
    <section id="prizes" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="text-center">
        <p className="font-label text-sm font-bold uppercase text-orange-700">Winnings & rewards</p>
        <h2 className="mt-3 font-display text-4xl font-black text-green-900 sm:text-5xl">Prizes & Awards</h2>
        <div className="mt-6 inline-flex rounded-full bg-slatekit-50 p-1">
          {[
            ['cash', 'Cash Prizes'],
            ['other', 'Other Prizes']
          ].map(([value, label]) => (
            <button key={value} onClick={() => setTab(value)} className={`rounded-full px-5 py-2 font-label text-sm font-bold uppercase transition ${tab === value ? 'bg-green-900 text-white' : 'text-muted hover:text-green-900'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {tab === 'cash' ? (
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left">
              <caption className="sr-only">Cash prize structure by race category</caption>
              <thead className="bg-green-900 text-white">
                <tr>
                  {['Position', '21KM Men & Women', '15KM Race', '10KM Race', '5KM Race'].map((head) => (
                    <th key={head} className="px-5 py-5 font-label text-sm font-bold uppercase">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {prizeRows.map((row) => (
                  <tr key={row[0]} className="odd:bg-white even:bg-slatekit-50/70">
                    {row.map((cell, index) => (
                      <td key={cell} className={`px-5 py-5 ${index === 0 ? 'font-display text-xl font-black italic text-green-900' : 'font-semibold text-ink'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 border-t border-line p-5 md:grid-cols-3">
            {['Customized Plaque', 'Branded Merchandise', 'Trophy'].map((item) => (
              <div key={item} className="rounded-2xl bg-orange-100 p-5">
                <p className="font-label text-sm font-bold uppercase text-orange-700">CEO's Challenge</p>
                <p className="mt-2 font-display text-xl font-bold text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {otherPrizes.map(([title, copy]) => (
            <article key={title} className="rounded-[1.5rem] border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-orange-600">
              <h3 className="font-display text-2xl font-bold text-green-900">{title}</h3>
              <p className="mt-3 leading-7 text-muted">{copy}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Sponsors() {
  return (
    <section id="sponsors" className="bg-slatekit-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-label text-sm font-bold uppercase text-orange-700">Sponsorship & partnerships</p>
          <h2 className="mt-3 font-display text-4xl font-black text-green-900 sm:text-5xl">Partner with the Kitale Vibe.</h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Reach 7k+ residents, build brand affinity, unlock media visibility, and create legacy impact in a town event designed for community pride and sponsor value.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {sponsorTiers.map((tier) => (
            <article key={tier.name} className={`relative rounded-[1.5rem] border bg-white p-6 transition hover:-translate-y-1 ${tier.featured ? 'border-orange-600 shadow-soft' : 'border-line'}`}>
              {tier.featured && <p className="absolute right-5 top-5 rounded-full bg-orange-600 px-3 py-1 font-label text-xs font-bold uppercase text-white">Lead Tier</p>}
              <h3 className="pr-16 font-display text-2xl font-black text-green-900">{tier.name}</h3>
              <p className="mt-3 font-display text-3xl font-black text-orange-700">{tier.price}</p>
              <ul className="mt-6 space-y-3">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-sm leading-6 text-muted">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-900 text-white">
                      <svg aria-hidden="true" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`mt-7 block rounded-xl px-5 py-3 text-center font-label text-sm font-bold uppercase transition ${tier.featured ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-green-900 text-white hover:bg-green-800'}`}>
                Enquire Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegisterBand() {
  const [selectedCategory, setSelectedCategory] = useState(registrationCategories[0]);
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
    registration: null,
    payment: null
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitState({ status: 'loading', message: 'Submitting registration...', registration: null, payment: null });

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.category = selectedCategory.name;

    try {
      const response = await fetch(`${API_BASE_URL}/api/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Registration could not be submitted.');
      }

      setSubmitState({
        status: 'success',
        message: result.message,
        registration: result.registration,
        payment: result.payment
      });
      form.reset();
      setSelectedCategory(registrationCategories[0]);
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Registration could not be submitted. Please try again.',
        registration: null,
        payment: null
      });
    }
  }

  return (
    <section id="registration" className="bg-green-950 px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-label text-sm font-bold uppercase text-green-200">Registration process</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl">Register for Sunday, 29th November 2026.</h2>
            <p className="mt-5 leading-8 text-green-200">
              Choose your race, enter participant details, then submit your registration interest. The event team can connect this form to payment or ticketing when the backend is ready.
            </p>
            <div className="mt-8 grid gap-3">
              {['Select category', 'Enter runner details', 'Confirm fee and submit'].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/8 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 font-bold">{index + 1}</span>
                  <span className="font-semibold">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/12 bg-white p-5 text-ink shadow-soft sm:p-7">
            {submitState.status === 'success' && (
              <div className="mb-6 rounded-2xl border border-green-200 bg-green-200/30 p-4 text-green-950" role="status">
                <p className="font-bold">Registration captured.</p>
                <p className="mt-1 text-sm">{submitState.message}</p>
                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <p><strong>Registration:</strong> {submitState.registration?.registrationNumber}</p>
                  <p><strong>Payment:</strong> {submitState.payment?.status} ({submitState.payment?.currency} {submitState.payment?.amount})</p>
                </div>
              </div>
            )}
            {submitState.status === 'error' && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900" role="alert">
                <p className="font-bold">Registration not submitted.</p>
                <p className="mt-1 text-sm">{submitState.message}</p>
              </div>
            )}

            <fieldset>
              <legend className="font-display text-2xl font-black text-green-900">1. Select Your Challenge</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {registrationCategories.map((category) => (
                  <label key={category.name} className={`cursor-pointer rounded-2xl border p-4 transition hover:-translate-y-0.5 ${selectedCategory.name === category.name ? 'border-orange-600 bg-orange-100' : 'border-line bg-slatekit-50'}`}>
                    <input
                      type="radio"
                      name="category"
                      value={category.name}
                      checked={selectedCategory.name === category.name}
                      onChange={() => setSelectedCategory(category)}
                      className="sr-only"
                    />
                    <span className="block font-bold text-green-900">{category.name}</span>
                    <span className="mt-1 block text-sm text-muted">{category.fee}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8">
              <h3 className="font-display text-2xl font-black text-green-900">2. Participant Details</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-muted">Full name</span>
                  <input required type="text" name="fullName" className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40" placeholder="Jane Wanjiku" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-muted">Phone number</span>
                  <input required type="tel" name="phone" className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40" placeholder="+254 700 000 000" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-muted">Email address</span>
                  <input required type="email" name="email" className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40" placeholder="runner@example.com" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-muted">Age group</span>
                  <select required name="ageGroup" className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40">
                    <option value="">Select age group</option>
                    <option>10-18</option>
                    <option>19-34</option>
                    <option>35-49</option>
                    <option>50-70</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-muted">Gender</span>
                  <select required name="gender" className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40">
                    <option value="">Select gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Prefer not to say</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-muted">T-shirt size</span>
                  <select required name="shirtSize" className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40">
                    <option value="">Select size</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-muted">Emergency contact name</span>
                  <input type="text" name="emergencyContactName" className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40" placeholder="Contact person" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-muted">Emergency contact phone</span>
                  <input type="tel" name="emergencyContactPhone" className="mt-2 h-12 w-full rounded-xl border border-line px-4 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40" placeholder="+254 700 000 000" />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-semibold text-muted">Notes</span>
                <textarea name="notes" rows="3" className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none transition focus:border-green-900 focus:ring-4 focus:ring-green-200/40" placeholder="Team name, accessibility note, or other race-day information" />
              </label>
            </div>

            <div className="mt-8 rounded-2xl bg-green-900 p-5 text-white">
              <p className="font-label text-sm font-bold uppercase text-green-200">3. Confirmation</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-display text-2xl font-black">{selectedCategory.name}</p>
                  <p className="text-green-200">Registration fee: {selectedCategory.fee}</p>
                </div>
                <button type="submit" disabled={submitState.status === 'loading'} className="rounded-xl bg-orange-600 px-6 py-4 font-label font-bold uppercase text-white transition hover:-translate-y-1 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-70">
                  {submitState.status === 'loading' ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted">
              By submitting, the participant confirms the information is accurate and agrees to be contacted by the Kitale Half Marathon team.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-slatekit-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <img src="/kitale-logo.jpeg" alt="Kitale Half Marathon logo" className="h-14 w-14 rounded-full object-cover" />
            <p className="brand-heading text-3xl">Kitale Half Marathon</p>
          </div>
          <p className="mt-4 max-w-lg leading-7 text-white/70">
            Organized by Top Brand PR. A high-energy road race celebrating Kitale, wellness, tourism, and community pride.
          </p>
          <div className="mt-6 flex gap-3">
            {['f', 'x', 'ig'].map((social) => (
              <a key={social} aria-label={`Social link ${social}`} href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 font-label font-bold uppercase text-white transition hover:bg-green-900">
                {social}
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-label text-sm font-bold uppercase text-green-200">Links</p>
            <div className="mt-4 flex flex-col gap-3">
              {navItems.slice(0, 5).map(([label, href]) => (
                <a key={label} href={href} className="text-white/70 hover:text-white">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-label text-sm font-bold uppercase text-green-200">Contact Us</p>
            <div className="mt-4 flex flex-col gap-3 text-white/70">
              <a href="mailto:info@kitalehalfmarathon.co.ke" className="hover:text-white">info@kitalehalfmarathon.co.ke</a>
              <span>Kitale Stadium, Kenya</span>
              <span>Top Brand PR</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/60">
        Copyright 2026 Kitale Half Marathon. Organized by Top Brand PR.
      </div>
    </footer>
  );
}

function App() {
  if (window.location.pathname === '/admin') {
    return <AdminDashboard />;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <RaceCategories />
        <Prizes />
        <Sponsors />
        <RegisterBand />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
