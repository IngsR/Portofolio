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
                    padding: '40px 55px',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    border: '1px solid #e2e8f0',
                }}
            >
                {/* Aksen Bar Kiri */}
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '12px',
                        height: '100%',
                        backgroundColor: '#0f172a',
                    }}
                />

                {/* Kiri: Foto Profil Besar (Aspect Ratio Terkunci, Tidak Gepeng) */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '380px',
                        height: '380px',
                        borderRadius: '40px',
                        backgroundColor: '#f8fafc',
                        border: '2.5px solid #e2e8f0',
                        boxShadow: '0 16px 36px rgba(15, 23, 42, 0.09)',
                        padding: '16px',
                        flexShrink: 0,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://ikhwann.my.id/profile.png"
                        alt="Ikhwan Ramadhan"
                        width="348"
                        height="348"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '30px',
                        }}
                    />
                </div>

                {/* Kanan: Informasi & Metadata Padat & Jelas */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flexGrow: 1,
                        marginLeft: '50px',
                    }}
                >
                    {/* Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '18px',
                        }}
                    >
                        <span
                            style={{
                                backgroundColor: '#f1f5f9',
                                color: '#0f172a',
                                border: '1.5px solid #cbd5e1',
                                padding: '8px 22px',
                                borderRadius: '100px',
                                fontSize: '15px',
                                fontWeight: '800',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Portofolio Resmi
                        </span>
                    </div>

                    {/* Nama Lengkap - Tebal & Jelas */}
                    <h1
                        style={{
                            fontSize: '66px',
                            fontWeight: '900',
                            color: '#090a0f',
                            lineHeight: '1.1',
                            margin: '0 0 14px 0',
                            letterSpacing: '-1.2px',
                        }}
                    >
                        Ikhwan Ramadhan
                    </h1>

                    {/* Role / Spesialisasi */}
                    <p
                        style={{
                            fontSize: '30px',
                            color: '#334155',
                            fontWeight: '700',
                            margin: '0 0 24px 0',
                            lineHeight: '1.3',
                        }}
                    >
                        Junior Frontend Engineer, SEO specialist
                    </p>

                    {/* Footer Info / URL & Tech Stack */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            borderTop: '2.5px solid #cbd5e1',
                            paddingTop: '22px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#64748b',
                                fontSize: '23px',
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
                                fontSize: '23px',
                                fontWeight: '800',
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
