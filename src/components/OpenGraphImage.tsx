import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const alt = 'Ikhwan Ramadhan - Frontend Engineer, SEO specialist';
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
                    backgroundImage:
                        'radial-gradient(circle at 20% 25%, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
                    padding: '60px 80px',
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
                        width: '10px',
                        height: '100%',
                        backgroundColor: '#0f172a',
                    }}
                />

                {/* Left: Foto Profil Card (Aspect Ratio Locked, No Distortion) */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '280px',
                        height: '280px',
                        borderRadius: '36px',
                        backgroundColor: '#ffffff',
                        border: '2px solid #e2e8f0',
                        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
                        padding: '16px',
                        flexShrink: 0,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://ikhwann.my.id/profile.png"
                        alt="Ikhwan Ramadhan"
                        width="248"
                        height="248"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '24px',
                        }}
                    />
                </div>

                {/* Right: Personal Info & Metadata */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flexGrow: 1,
                        marginLeft: '60px',
                    }}
                >
                    {/* Category / Badge */}
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
                                border: '1.5px solid #cbd5e1',
                                padding: '6px 20px',
                                borderRadius: '100px',
                                fontSize: '15px',
                                fontWeight: '700',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Portofolio Resmi
                        </span>
                    </div>

                    {/* Full Name */}
                    <h1
                        style={{
                            fontSize: '56px',
                            fontWeight: '900',
                            color: '#0f172a',
                            lineHeight: '1.15',
                            margin: '0 0 12px 0',
                            letterSpacing: '-0.8px',
                        }}
                    >
                        Ikhwan Ramadhan
                    </h1>

                    {/* Role & Tagline */}
                    <p
                        style={{
                            fontSize: '26px',
                            color: '#475569',
                            fontWeight: '600',
                            margin: '0 0 24px 0',
                            lineHeight: '1.3',
                        }}
                    >
                        Frontend Engineer, SEO specialist
                    </p>

                    {/* Footer Info / Tech Stack & URL */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            borderTop: '2px solid #e2e8f0',
                            paddingTop: '20px',
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
