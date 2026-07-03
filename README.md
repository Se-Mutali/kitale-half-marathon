# Kitale Half Marathon

Landing page, registration form, and MongoDB-backed API for Kitale Half Marathon.

## Local Setup

1. Install dependencies:

   ```bash
   npm.cmd install
   ```

2. Create `.env` from `.env.example` and update values if needed:

   ```bash
   copy .env.example .env
   ```

3. Start MongoDB locally, or use a MongoDB Atlas connection string:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/kitale-half-marathon
   ```

4. Start the API:

   ```bash
   npm.cmd run dev:api
   ```

5. Create or update the first admin login manually, if needed:

   ```bash
   npm.cmd run seed:admin
   ```

   The app also creates/updates this admin automatically on startup when `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set.

6. Start the frontend in another terminal:

   ```bash
   npm.cmd run dev
   ```

## API Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/registrations`
- `GET /api/registrations/:registrationNumber`
- `GET /api/payments/:paymentId`
- `POST /api/payments/:paymentId/manual-confirm`
- `GET /api/admin/registrations`

Manual payment confirmation requires:

```http
Authorization: Bearer your-admin-jwt
```

The admin registrations dashboard is available at:

```text
/admin
```

Login with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values from `.env`.

For local development, open:

```text
http://127.0.0.1:5173/admin
```

Make sure the API is also running with:

```bash
npm.cmd run dev:api
```

If another project is already using port `4000`, this project is configured to use:

```text
http://127.0.0.1:4020/admin
```

## Payment Notes

The current backend creates a pending payment record for every registration. It does not collect card details or sensitive payment data. A real provider such as M-Pesa STK Push, Pesapal, Flutterwave, Paystack, or Stripe can be integrated later by updating the payment provider flow and storing only provider references/statuses.
