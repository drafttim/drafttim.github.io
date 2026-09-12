import type { Paper } from '../types';

export const papers: Paper[] = [
  {
    title: "Adaptive Testing for Segmenting Watermarked Texts From Language Models",
    conference: "STAT",
    year: 2025,
    abstract: "The rapid adoption of large language models (LLMs), such as GPT-4 and Claude 3.5, underscores the need to distinguish LLM-generated text from human-written content to mitigate the spread of misinformation and misuse in education. One promising approach to address this issue is the watermark technique, which embeds subtle statistical signals into LLM-generated text to enable reliable identification. In this paper, we first generalize the likelihood-based LLM detection method of a previous study by introducing a flexible weighted formulation, and further adapt this approach to the inverse transform sampling method. Moving beyond watermark detection, we extend this adaptive detection strategy to tackle the more challenging problem of segmenting a given text into watermarked and non-watermarked substrings. In contrast to the approach in a previous study, which relies on accurate estimation of next-token probabilities that are highly sensitive to prompt estimation, our proposed framework removes the need for precise prompt estimation. Extensive numerical experiments demonstrate that the proposed methodology is both effective and robust in accurately segmenting texts containing a mixture of watermarked and non-watermarked content.",
    tags: ["LLM Security", "Watermark"],
    authors: ["Xingchi Li", "Xiaochi Liu", "Guanxun Li"],
    status: "Published",
    pdfUrl: "https://arxiv.org/pdf/2511.06645",
    sourceUrl: "https://arxiv.org/abs/2511.06645"
  },
];
