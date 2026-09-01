import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { jsPDF } from "jspdf";
import { CVContent, CVLanguage } from "../types";

/**
 * Downloads a Blob as a file with the given filename
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads a native Microsoft Word (.docx) Curriculum Vitae
 */
export async function exportCVToDocx(
  cv: CVContent,
  lang: CVLanguage
): Promise<void> {
  const borderBottom = {
    bottom: {
      style: BorderStyle.SINGLE,
      size: 12,
      color: "1e293b",
    },
  };

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 20, // 10pt
            color: "0f172a",
          },
          paragraph: {
            spacing: {
              after: 100,
              line: 276, // 1.15 line spacing
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // ── HEADER: Name ──
          new Paragraph({
            heading: HeadingLevel.TITLE,
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: cv.header.name,
                bold: true,
                size: 36, // 18pt
                color: "020617",
              }),
            ],
          }),

          // ── Subtitle / Role ──
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: cv.header.title,
                bold: true,
                size: 24, // 12pt
                color: "334155",
              }),
            ],
          }),

          // ── Contact Info Line ──
          new Paragraph({
            border: borderBottom,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: `${cv.header.email}  |  ` }),
              new TextRun({ text: `${cv.header.phone}  |  ` }),
              new TextRun({ text: `${cv.header.github}  |  ` }),
              new TextRun({ text: `${cv.header.linkedin}  |  ` }),
              new TextRun({ text: `${cv.header.website}  |  ` }),
              new TextRun({ text: `${cv.header.location}  |  ` }),
              new TextRun({ text: cv.header.birthInfo }),
            ],
          }),

          // ── Summary ──
          new Paragraph({
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: cv.summary,
              }),
            ],
          }),

          // ── 1. SECTION: INTERNSHIP EXPERIENCE ──
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            border: borderBottom,
            spacing: { before: 180, after: 120 },
            children: [
              new TextRun({
                text: cv.labels.internship,
                bold: true,
                size: 22,
                color: "020617",
              }),
            ],
          }),

          ...cv.internship.flatMap((exp) => [
            // Role & Period
            new Paragraph({
              spacing: { before: 100, after: 40 },
              children: [
                new TextRun({
                  text: exp.role,
                  bold: true,
                  size: 21,
                  color: "0f172a",
                }),
                new TextRun({
                  text: ` (${exp.period})`,
                  italics: true,
                  size: 19,
                  color: "475569",
                }),
              ],
            }),
            // Company & Location
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: `${exp.company} • ${exp.location} (${exp.type})`,
                  bold: true,
                  size: 19,
                  color: "334155",
                }),
              ],
            }),
            // Live Demo Link if present
            ...(exp.link
              ? [
                  new Paragraph({
                    spacing: { after: 40 },
                    children: [
                      new TextRun({
                        text: `${cv.labels.liveDemoLabel}: `,
                        bold: true,
                        size: 19,
                      }),
                      new TextRun({
                        text: exp.link,
                        size: 19,
                        color: "1d4ed8",
                      }),
                    ],
                  }),
                ]
              : []),
            // Achievements as numbered list
            ...exp.achievements.map(
              (ach, i) =>
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({
                      text: `${i + 1}. `,
                      bold: true,
                      size: 19,
                      color: "0f172a",
                    }),
                    new TextRun({ text: ach, size: 19 }),
                  ],
                })
            ),
            // Tech stack line
            new Paragraph({
              spacing: { before: 40, after: 140 },
              children: [
                new TextRun({
                  text: `${cv.labels.techStackLabel}: `,
                  bold: true,
                  size: 19,
                }),
                new TextRun({
                  text: exp.techStack.join(", "),
                  size: 19,
                  color: "334155",
                }),
              ],
            }),
          ]),

          // ── 2. SECTION: EDUCATION ──
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            border: borderBottom,
            spacing: { before: 180, after: 120 },
            children: [
              new TextRun({
                text: cv.labels.education,
                bold: true,
                size: 22,
                color: "020617",
              }),
            ],
          }),

          ...cv.education.flatMap((edu) => [
            new Paragraph({
              spacing: { before: 60, after: 40 },
              children: [
                new TextRun({
                  text: edu.degree,
                  bold: true,
                  size: 21,
                  color: "0f172a",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: edu.institution,
                  size: 19,
                  color: "334155",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 140 },
              children: [
                new TextRun({
                  text: edu.period,
                  size: 18,
                  italics: true,
                  color: "64748b",
                }),
              ],
            }),
          ]),

          // ── 3. SECTION: FEATURED PORTFOLIO PROJECTS ──
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            border: borderBottom,
            spacing: { before: 180, after: 120 },
            children: [
              new TextRun({
                text: cv.labels.projects,
                bold: true,
                size: 22,
                color: "020617",
              }),
            ],
          }),

          ...cv.projects.flatMap((proj) => [
            // Title & Period
            new Paragraph({
              spacing: { before: 100, after: 40 },
              children: [
                new TextRun({
                  text: `${proj.title} (${proj.role})`,
                  bold: true,
                  size: 21,
                  color: "0f172a",
                }),
                ...(proj.period
                  ? [
                      new TextRun({
                        text: ` (${proj.period})`,
                        italics: true,
                        size: 19,
                        color: "475569",
                      }),
                    ]
                  : []),
              ],
            }),
            // Live Demo Link
            ...(proj.link
              ? [
                  new Paragraph({
                    spacing: { after: 40 },
                    children: [
                      new TextRun({
                        text: `${cv.labels.liveDemoLabel}: `,
                        bold: true,
                        size: 19,
                      }),
                      new TextRun({
                        text: proj.link,
                        size: 19,
                        color: "1d4ed8",
                      }),
                    ],
                  }),
                ]
              : []),
            // Description
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: proj.description,
                  size: 19,
                }),
              ],
            }),
            // Tech stack line
            new Paragraph({
              spacing: { before: 40, after: 140 },
              children: [
                new TextRun({
                  text: `${cv.labels.techStackLabel}: `,
                  bold: true,
                  size: 19,
                }),
                new TextRun({
                  text: proj.techStack.join(", "),
                  size: 19,
                  color: "334155",
                }),
              ],
            }),
          ]),

          // ── 4. SECTION: CERTIFICATIONS ──
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            border: borderBottom,
            spacing: { before: 180, after: 120 },
            children: [
              new TextRun({
                text: cv.labels.certifications,
                bold: true,
                size: 22,
                color: "020617",
              }),
            ],
          }),

          ...Object.entries(cv.certificationsByIssuer).flatMap(
            ([issuer, certs]) => [
              new Paragraph({
                spacing: { before: 80, after: 40 },
                children: [
                  new TextRun({
                    text: issuer.toUpperCase(),
                    bold: true,
                    size: 19,
                    color: "1e293b",
                  }),
                ],
              }),
              ...certs.map(
                (cert) =>
                  new Paragraph({
                    bullet: { level: 0 },
                    spacing: { after: 40 },
                    children: [
                      new TextRun({ text: cert.title, size: 19 }),
                      new TextRun({
                        text: ` (${cert.issueDate})`,
                        italics: true,
                        size: 18,
                        color: "64748b",
                      }),
                    ],
                  })
              ),
            ]
          ),

          // ── 5. SECTION: TECHNICAL SKILLS ──
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            border: borderBottom,
            spacing: { before: 180, after: 120 },
            children: [
              new TextRun({
                text: cv.labels.technicalSkills,
                bold: true,
                size: 22,
                color: "020617",
              }),
            ],
          }),

          ...cv.skills.map(
            (skill) =>
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: `${skill.category}: `,
                    bold: true,
                    size: 19,
                    color: "0f172a",
                  }),
                  new TextRun({
                    text: skill.items,
                    size: 19,
                    color: "334155",
                  }),
                ],
              })
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const langSuffix = lang.toUpperCase();
  downloadBlob(blob, `CV_Ikhwan_Ramadhan_${langSuffix}.docx`);
}

/**
 * Generates and downloads a clean, native vector PDF Curriculum Vitae
 * Vector text is crisp at any zoom level, fully selectable, ATS-friendly, and lightweight.
 */
export async function exportCVToPdf(
  cv: CVContent,
  lang: CVLanguage
): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const leftMargin = 12;
  const rightMargin = 198;
  const contentWidth = rightMargin - leftMargin; // 186mm
  let y = 10;

  const checkPage = (heightNeeded: number) => {
    if (y + heightNeeded > 284) {
      doc.addPage();
      y = 10;
    }
  };

  const renderSectionHeading = (title: string) => {
    checkPage(8);
    y += 1;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), leftMargin, y);
    y += 1.4;
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, rightMargin, y);
    y += 3.2;
  };

  // ── HEADER: Name & Title ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text(cv.header.name, leftMargin, y);
  y += 5.5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text(cv.header.title, leftMargin, y);
  y += 4.2;

  // ── Contact Information Line ──
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  const contactText = `${cv.header.email}   |   ${cv.header.phone}   |   ${cv.header.github}   |   ${cv.header.linkedin}   |   ${cv.header.website}   |   ${cv.header.location}   |   ${cv.header.birthInfo}`;
  const contactLines = doc.splitTextToSize(contactText, contentWidth);
  doc.text(contactLines, leftMargin, y);
  y += contactLines.length * 3.4 + 1.2;

  // Divider
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.25);
  doc.line(leftMargin, y, rightMargin, y);
  y += 3;

  // ── Bio / Summary ──
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  const summaryLines = doc.splitTextToSize(cv.summary, contentWidth);
  doc.text(summaryLines, leftMargin, y);
  y += summaryLines.length * 3.5 + 1.5;

  // Divider
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.25);
  doc.line(leftMargin, y, rightMargin, y);
  y += 2.5;

  // ── 1. SECTION: INTERNSHIP EXPERIENCE ──
  renderSectionHeading(cv.labels.internship);

  for (const exp of cv.internship) {
    checkPage(12);

    // Role & Period
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, leftMargin, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.setTextColor(71, 85, 105);
    doc.text(exp.period, rightMargin, y, { align: "right" });
    y += 3.5;

    // Company & Location & Type
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    doc.text(`${exp.company} • ${exp.location} (${exp.type})`, leftMargin, y);
    y += 3.4;

    // Live link if present
    if (exp.link) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.8);
      doc.setTextColor(15, 23, 42);
      const linkPrefix = `${cv.labels.liveDemoLabel}: `;
      doc.text(linkPrefix, leftMargin, y);
      const linkPrefixWidth = doc.getTextWidth(linkPrefix);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.8);
      doc.setTextColor(29, 78, 216);
      doc.text(exp.link, leftMargin + linkPrefixWidth, y);
      y += 3.4;
    }

    // Achievements (Numbered List)
    exp.achievements.forEach((ach, i) => {
      checkPage(6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.8);
      doc.setTextColor(15, 23, 42);
      doc.text(`${i + 1}.`, leftMargin + 1, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.8);
      doc.setTextColor(15, 23, 42);
      const achLines = doc.splitTextToSize(ach, contentWidth - 7);
      doc.text(achLines, leftMargin + 5.5, y);
      y += achLines.length * 3.3 + 0.8;
    });

    // Tech Stack
    checkPage(5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.setTextColor(15, 23, 42);
    const techPrefix = `${cv.labels.techStackLabel}: `;
    doc.text(techPrefix, leftMargin, y);
    const prefixWidth = doc.getTextWidth(techPrefix);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    const stackLines = doc.splitTextToSize(
      exp.techStack.join(", "),
      contentWidth - prefixWidth
    );
    doc.text(stackLines, leftMargin + prefixWidth, y);
    y += stackLines.length * 3.3 + 2;
  }

  // ── 2. SECTION: EDUCATION ──
  renderSectionHeading(cv.labels.education);

  for (const edu of cv.education) {
    checkPage(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.degree, leftMargin, y);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(edu.period, rightMargin, y, { align: "right" });
    y += 3.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    doc.text(edu.institution, leftMargin, y);
    y += 3.5;
  }

  // ── 3. SECTION: FEATURED PORTFOLIO PROJECTS ──
  renderSectionHeading(cv.labels.projects);

  for (const proj of cv.projects) {
    checkPage(12);

    // Title, Role & Period
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${proj.title} (${proj.role})`, leftMargin, y);

    if (proj.period) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.8);
      doc.setTextColor(71, 85, 105);
      doc.text(proj.period, rightMargin, y, { align: "right" });
    }
    y += 3.5;

    // Link
    if (proj.link) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.8);
      doc.setTextColor(15, 23, 42);
      const linkPrefix = `${cv.labels.liveDemoLabel}: `;
      doc.text(linkPrefix, leftMargin, y);
      const linkPrefixWidth = doc.getTextWidth(linkPrefix);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.8);
      doc.setTextColor(29, 78, 216);
      doc.text(proj.link, leftMargin + linkPrefixWidth, y);
      y += 3.4;
    }

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(15, 23, 42);
    const descLines = doc.splitTextToSize(proj.description, contentWidth);
    doc.text(descLines, leftMargin, y);
    y += descLines.length * 3.3 + 0.8;

    // Tech Stack
    checkPage(5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.setTextColor(15, 23, 42);
    const techPrefix = `${cv.labels.techStackLabel}: `;
    doc.text(techPrefix, leftMargin, y);
    const prefixWidth = doc.getTextWidth(techPrefix);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    const stackLines = doc.splitTextToSize(
      proj.techStack.join(", "),
      contentWidth - prefixWidth
    );
    doc.text(stackLines, leftMargin + prefixWidth, y);
    y += stackLines.length * 3.3 + 2;
  }

  // ── 4. SECTION: CERTIFICATIONS ──
  renderSectionHeading(cv.labels.certifications);

  for (const [issuer, certs] of Object.entries(cv.certificationsByIssuer)) {
    checkPage(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(issuer.toUpperCase(), leftMargin, y);
    y += 3;

    for (const cert of certs) {
      checkPage(5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.8);
      doc.setTextColor(15, 23, 42);
      doc.text(cert.title, leftMargin + 2, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(cert.issueDate, rightMargin, y, { align: "right" });
      y += 3.2;
    }
    y += 0.8;
  }

  // ── 5. SECTION: TECHNICAL SKILLS ──
  renderSectionHeading(cv.labels.technicalSkills);

  for (const skill of cv.skills) {
    checkPage(5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.setTextColor(15, 23, 42);
    const catPrefix = `${skill.category}: `;
    doc.text(catPrefix, leftMargin, y);
    const catWidth = doc.getTextWidth(catPrefix);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    const skillLines = doc.splitTextToSize(
      skill.items,
      contentWidth - catWidth
    );
    doc.text(skillLines, leftMargin + catWidth, y);
    y += skillLines.length * 3.3 + 1;
  }

  const langSuffix = lang.toUpperCase();
  doc.save(`CV_Ikhwan_Ramadhan_${langSuffix}.pdf`);
}
