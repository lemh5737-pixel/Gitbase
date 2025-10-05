// middleware.js

import { NextResponse } from 'next/server';

// Fungsi ini akan dijalankan sebelum setiap request
export function middleware(request) {
  // Ambil header 'accept' dari request yang masuk
  const acceptHeader = request.headers.get('accept');

  // Cek apakah request meminta halaman HTML
  // Jika header 'accept' tidak ada atau tidak mengandung 'text/html',
  // kita asumsikan ini bukan browser dan kita blokir.
  if (!acceptHeader || !acceptHeader.includes('text/html')) {
    // Kembalikan respons Forbidden 403
    return new NextResponse('Forbidden: This endpoint can only be accessed from a browser.', { status: 403 });
  }

  // Jika header-nya valid (berasal dari browser), lanjutkan request
  return NextResponse.next();
}

// Konfigurasi 'matcher' untuk menentukan path mana yang akan diproses oleh middleware.
// Ini adalah bagian terpenting untuk memastikan API Anda tidak diblokir.
export const config = {
  matcher: [
    /*
     * Cocokkan semua path request, KECUALI:
     * 1. /api/... (API routes)
     * 2. /_next/static/... (file statis Next.js)
     * 3. /_next/image/... (file optimasi gambar Next.js)
     * 4. /favicon.ico (favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
