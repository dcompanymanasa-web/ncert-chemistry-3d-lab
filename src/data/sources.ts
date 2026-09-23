export interface SourceCitation {
  id: string;
  title: string;
  publisher: string;
  edition: string;
  chapter: string;
  pages: string;
  url?: string;
  officialDocCode: string;
  description: string;
}

export const NCERT_SOURCES: Record<string, SourceCitation> = {
  NCERT_CLASS_10_CH1: {
    id: "NCERT_CLASS_10_CH1",
    title: "Science — Textbook for Class X: Chapter 1 Chemical Reactions and Equations",
    publisher: "National Council of Educational Research and Training (NCERT)",
    edition: "Latest National Curriculum Framework (NCF) aligned edition",
    chapter: "Chapter 1: Chemical Reactions and Equations",
    pages: "Pages 1–16",
    url: "https://www.ncert.nic.in/textbook/pdf/jesc1ps.pdf",
    officialDocCode: "jesc1ps.pdf",
    description: "Official NCERT Class 10 Science textbook chapter covering chemical changes, balancing chemical equations, types of chemical reactions (combination, decomposition, displacement, double displacement, oxidation and reduction), corrosion, and rancidity."
  }
};
