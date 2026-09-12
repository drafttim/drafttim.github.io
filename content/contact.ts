import type { Localized } from '../types';

export interface ContactContent {
  title: string;
  subtitle: string;
  freq: string;
  digitalKey: string;
  type: string;
  size: string;
  mailbox: string;
  repository: string;
  name: string;
  role: string;
  roleValue: string;
  unit: string;
  unitValue: string;
}

export const contactContent: Localized<ContactContent> = {
  en: {
    title: 'Comms Uplink',
    subtitle: '/// Contact Me',
    freq: 'Available Frequencies',
    digitalKey: 'WECHAT',
    type: 'TYPE',
    size: 'SIZE',
    mailbox: 'Mailbox',
    repository: 'Code Repository',
    name: 'XiaochiLiu',
    role: 'ROLE',
    roleValue: 'RESEARCH_FELLOW',
    unit: 'UNIT',
    unitValue: 'BEIJING_NORMAL_UNIVERSITY',
  },
  zh: {
    title: '联络方式',
    subtitle: '/// 联系我 Contact Me',
    freq: '可用频率',
    digitalKey: 'WECHAT',
    type: '类型',
    size: '大小',
    mailbox: '电子邮箱',
    repository: '代码仓库',
    name: '刘骁驰',
    role: '角色',
    roleValue: '研究助理 RESEARCH_FELLOW',
    unit: '单位',
    unitValue: '北京师范大学 BNU',
  },
};
