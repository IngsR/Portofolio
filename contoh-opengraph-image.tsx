import { ImageResponse } from '@vercel/og';

// Konfigurasi ukuran standar OpenGraph (1200x630 px)
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff',
                    padding: '60px 80px',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Kiri: Foto Profil (Aspect Ratio Terkunci, Tidak Gepeng) */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '260px',
                        height: '260px',
                        borderRadius: '32px',
                        backgroundColor: '#f8fafc',
                        border: '2px solid #e2e8f0',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                        padding: '16px',
                        flexShrink: 0,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://ikhwann.my.id/profile.png"
                        alt="Ikhwan Ramadhan"
                        width="220"
                        height="220"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '20px',
                        }}
                    />
                </div>

                {/* Kanan: Informasi & Metadata */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flexGrow: 1,
                        marginLeft: '60px',
                    }}
                >
                    {/* Badge / Kategori */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        <span
                            style={{
                                backgroundColor: '#f1f5f9',
                                color: '#0f172a',
                                border: '1px solid #cbd5e1',
                                padding: '6px 18px',
                                borderRadius: '100px',
                                fontSize: '16px',
                                fontWeight: '700',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Portofolio Resmi
                        </span>
                    </div>

                    {/* Nama Lengkap */}
                    <h1
                        style={{
                            fontSize: '52px',
                            fontWeight: '900',
                            color: '#000000',
                            lineHeight: '1.15',
                            margin: '0 0 12px 0',
                            letterSpacing: '-0.5px',
                        }}
                    >
                        Ikhwan Ramadhan
                    </h1>

                    {/* Pekerjaan / Spesialisasi */}
                    <p
                        style={{
                            fontSize: '24px',
                            color: '#334155',
                            fontWeight: '500',
                            margin: '0 0 20px 0',
                            lineHeight: '1.3',
                        }}
                    >
                        Frontend Engineer, SEO specialist
                    </p>

                    {/* Footer / URL & Tech Stack */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            borderTop: '1px solid #e2e8f0',
                            paddingTop: '18px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#64748b',
                                fontSize: '20px',
                                fontWeight: '600',
                            }}
                        >
                            🌐 ikhwann.my.id
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#0f172a',
                                fontSize: '20px',
                                fontWeight: '700',
                            }}
                        >
                            • Next.js · Angular · React · TypeScript
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
