import type { Project } from '../types';
import demoMp4 from '../components/src/assets/demo.mp4';

export const projectList: Project[] = [
  {
    title: {
      en: "SOFT-Cauchy Watermark Detection",
      zh: "水印识别 SOFT-Cauchy"
    },
    description: {
      en: "An innovative watermark detection scheme that addresses the critical performance degradation of watermark signals under adversarial attacks.",
      zh: "一个创新的水印方案，解决当前水印信号在面临人为攻击时检验性能急剧下降的问题。"
    },
    tech: ["PyTorch", "Soft Prompting", "Statistical Analysis"],
    status: 'In Progress',
    repoUrl: 'https://github.com/drafttim/llm-watermark-adaptive-cauthy-main',
    details: {
      problem: {
        en: "Existing watermark detection systems suffer severe performance drops when facing adversarial attacks, as traditional methods struggle with output probability prediction and are vulnerable to localized manipulations.",
        zh: "现有水印检测系统在面对对抗性攻击时性能严重下降，传统方法难以准确预测输出概率，且易受局部操纵攻击的影响。"
      },
      solution: {
        en: "Implemented soft prompt training approach to overcome output probability prediction challenges, combined with Cauchy combination strategy to defend against localized attacks.",
        zh: "采用软提示词训练思路攻克输出概率预测难题，结合柯西组合策略有效防御局部攻击。"
      },
      features: {
        en: [
          "Soft Prompt-Based Training",
          "Cauchy Combination Defense",
          "Robust Output Probability Prediction",
          "Localized Attack Resistance"
        ],
        zh: [
          "基于软提示词的训练",
          "柯西组合防御机制",
          "鲁棒的输出概率预测",
          "局部攻击抵抗能力"
        ]
      }
    }
  },
  {
    title: {
      en: "CardioSentinel",
      zh: "心鉴 CardioSentinel"
    },
    description: {
      en: "An AI-powered system for early detection of chronic heart disease and personalized healthcare guidance using multimodal deep learning and LLM fine-tuning.",
      zh: "一套完整的系统，能够实现慢性心脏病的早期识别并针对患者个人情况提供个性化建议。"
    },
    tech: ["PyTorch", "LoRA/QLoRA", "VAE", "DPO"],
    status: 'Complete',
    details: {
      problem: {
        en: "Traditional cardiovascular diagnosis relies on manual interpretation of heterogeneous medical data (ECG, imaging, lab results), lacking early detection and personalized treatment recommendations. Existing AI models struggle to integrate multimodal data effectively.",
        zh: "传统心血管疾病诊断依赖人工解读异构医疗数据（心电图、影像、生化指标），缺乏早期预警能力和个性化治疗建议。现有AI模型难以有效整合多模态数据。"
      },
      solution: {
        en: "Developed VAE-driven multimodal fusion model encoding cardiac data into unified latent space, achieving 1% accuracy improvement. Fine-tuned Llama-3.0-8B using LoRA/QLoRA with 8,851 GPT-4-generated, clinician-verified samples, applying DPO alignment and safety filtering.",
        zh: "开发基于VAE的多模态融合模型将心脏数据编码到统一潜在空间，准确率提升1%。采用LoRA/QLoRA微调Llama-3.0-8B，使用8,851条GPT-4生成并经医生审核的样本，通过DPO对齐与安全过滤确保可靠性。"
      },
      features: {
        en: [
          "VAE-Based Multimodal Fusion",
          "Parameter-Efficient LLM Fine-Tuning (LoRA/QLoRA)",
          "GPT-4 Knowledge Distillation",
          "Direct Preference Optimization (DPO)"
        ],
        zh: [
          "基于VAE的多模态融合",
          "参数高效的大模型微调（LoRA/QLoRA）",
          "GPT-4知识蒸馏",
          "直接偏好优化（DPO）"
        ]
      },
      videoUrl: demoMp4
    }
  }
];
