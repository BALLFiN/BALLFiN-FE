export interface NewsItem {
  id: number;
  title: string;
  content: string;
  source: string;
  date: string;
  url: string;
  imageUrl?: string;
  sentiment: "positive" | "negative" | "neutral";
  impact: "positive" | "negative" | "neutral";
  summary: string;
  analysis: string;
}

export const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "삼성전자, 차세대 반도체 기술 개발 성공",
    content: "삼성전자가 차세대 반도체 기술을 개발했다...",
    source: "매일경제",
    date: "2024-03-20",
    url: "https://example.com/news/1",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
    sentiment: "positive",
    impact: "positive",
    summary: "삼성전자가 새로운 반도체 기술을 개발했습니다.",
    analysis:
      "이번 기술 개발로 삼성전자의 시장 점유율이 증가할 것으로 예상됩니다.",
  },
  {
    id: 2,
    title: "현대자동차, 전기차 판매 부진",
    content: "현대자동차의 전기차 판매가 예상보다 저조하다...",
    source: "한국경제",
    date: "2024-03-19",
    url: "https://example.com/news/2",
    imageUrl: "https://images.unsplash.com/photo-1551830820-330a71b99659",
    sentiment: "negative",
    impact: "negative",
    summary: "현대자동차의 전기차 판매가 부진합니다.",
    analysis: "전기차 시장 경쟁이 심화되면서 판매가 부진한 것으로 분석됩니다.",
  },
  {
    id: 3,
    title: "SK하이닉스, 메모리 반도체 가격 상승",
    content: "SK하이닉스의 메모리 반도체 가격이 상승했다...",
    source: "조선일보",
    date: "2024-03-18",
    url: "https://example.com/news/3",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    sentiment: "positive",
    impact: "positive",
    summary: "SK하이닉스의 메모리 반도체 가격이 상승했습니다.",
    analysis: "반도체 시장의 수요 증가로 가격이 상승한 것으로 분석됩니다.",
  },
  {
    id: 4,
    title: "LG전자, 가전제품 판매 호조",
    content: "LG전자의 가전제품 판매가 호조세를 보이고 있다...",
    source: "중앙일보",
    date: "2024-03-17",
    url: "https://example.com/news/4",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    sentiment: "positive",
    impact: "positive",
    summary: "LG전자의 가전제품 판매가 호조세를 보입니다.",
    analysis: "신제품 출시와 마케팅 효과로 판매가 증가한 것으로 분석됩니다.",
  },
  {
    id: 5,
    title: "네이버, AI 서비스 투자 확대",
    content: "네이버가 AI 서비스 개발을 위한 투자를 확대했다...",
    source: "매일경제",
    date: "2024-03-16",
    url: "https://example.com/news/5",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    sentiment: "positive",
    impact: "positive",
    summary: "네이버가 AI 서비스 개발을 위한 투자를 확대했습니다.",
    analysis: "AI 기술 개발을 통한 미래 성장을 위한 전략적 투자로 분석됩니다.",
  },
  {
    id: 6,
    title: "카카오, 모바일 게임 매출 감소",
    content: "카카오의 모바일 게임 매출이 감소했다...",
    source: "한국경제",
    date: "2024-03-15",
    url: "https://example.com/news/6",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    sentiment: "negative",
    impact: "negative",
    summary: "카카오의 모바일 게임 매출이 감소했습니다.",
    analysis: "게임 시장 경쟁 심화로 매출이 감소한 것으로 분석됩니다.",
  },
  {
    id: 7,
    title: "삼성바이오로직스, 신약 개발 성공",
    content: "삼성바이오로직스가 새로운 항암제 개발에 성공했다...",
    source: "조선일보",
    date: "2024-03-14",
    url: "https://example.com/news/7",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    sentiment: "positive",
    impact: "positive",
    summary: "삼성바이오로직스가 새로운 항암제 개발에 성공했습니다.",
    analysis: "신약 개발 성공으로 향후 매출 증가가 기대됩니다.",
  },
  {
    id: 8,
    title: "현대모비스, 자율주행 기술 개발 지연",
    content: "현대모비스의 자율주행 기술 개발이 지연되고 있다...",
    source: "중앙일보",
    date: "2024-03-13",
    url: "https://example.com/news/8",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
    sentiment: "negative",
    impact: "negative",
    summary: "현대모비스의 자율주행 기술 개발이 지연되고 있습니다.",
    analysis: "기술적 난관으로 개발 일정이 지연된 것으로 분석됩니다.",
  },
  {
    id: 9,
    title: "POSCO, 친환경 철강 생산 확대",
    content: "POSCO가 친환경 철강 생산을 확대한다...",
    source: "매일경제",
    date: "2024-03-12",
    url: "https://example.com/news/9",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112c4e1b1d",
    sentiment: "positive",
    impact: "positive",
    summary: "POSCO가 친환경 철강 생산을 확대합니다.",
    analysis: "친환경 철강 수요 증가에 대응한 전략적 결정으로 분석됩니다.",
  },
  {
    id: 10,
    title: "KT, 5G 서비스 품질 문제 발생",
    content: "KT의 5G 서비스 품질 문제가 발생했다...",
    source: "한국경제",
    date: "2024-03-11",
    url: "https://example.com/news/10",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    sentiment: "negative",
    impact: "negative",
    summary: "KT의 5G 서비스 품질 문제가 발생했습니다.",
    analysis: "네트워크 인프라 문제로 서비스 품질이 저하된 것으로 분석됩니다.",
  },
  {
    id: 11,
    title: "현대차, 전기차 신모델 출시... 시장 반응 긍정적",
    source: "조선비즈",
    date: "2025-03-19",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/03/19/0000000003",
    summary:
      "현대차가 새로운 전기차 모델을 출시했으며, 초기 시장 반응이 매우 긍정적이다.",
    analysis:
      "이 뉴스는 현대차의 전기차 경쟁력 강화를 시사하는 긍정적인 신호입니다. 새로운 모델의 성공적인 출시는 전기차 시장에서의 시장점유율 확대와 수익성 개선을 기대할 수 있게 합니다. 특히 긍정적인 초기 반응은 향후 판매 실적 상승으로 이어질 가능성이 높습니다.",
  },
  {
    id: 12,
    title: "카카오, AI 챗봇 '카카오톡 챗봇' 출시... 사용자 호응도 높아",
    source: "서울경제",
    date: "2025-03-19",
    impact: "positive",
    url: "https://www.sedaily.com/NewsView/2024031900004",
    summary:
      "카카오가 AI 챗봇 서비스를 출시했으며, 초기 사용자들의 반응이 매우 긍정적이다.",
    analysis:
      "카카오의 AI 챗봇 출시는 디지털 서비스 경쟁력 강화를 위한 중요한 전환점이 될 것으로 보입니다. 특히 카카오톡 플랫폼과의 연계를 통한 시너지 효과가 기대되며, AI 서비스 시장에서의 입지 강화가 예상됩니다.",
  },
  {
    id: 13,
    title: "SK하이닉스, 중국 시장 점유율 하락... 현지 경쟁사 성장세 뚜렷",
    source: "한국경제",
    date: "2025-03-18",
    impact: "negative",
    url: "https://www.hankyung.com/economy/article/2024031800005",
    summary:
      "SK하이닉스의 중국 내 메모리 시장 점유율이 전년 대비 2.5% 하락했다.",
    analysis:
      "SK하이닉스의 중국 시장 점유율 하락은 단기적으로 실적에 부담 요인이 될 것으로 전망됩니다. 현지 경쟁업체들의 급속 성장과 가격 경쟁력이 주요 원인으로 분석되며, 중국 시장에서의 경쟁력 강화가 필요한 시점입니다.",
  },
  {
    id: 14,
    title: "LG에너지솔루션, 2차전지 신공장 착공... 글로벌 시장점유율 확대",
    source: "매일경제",
    date: "2025-03-18",
    impact: "positive",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/18/0000000006",
    summary: "LG에너지솔루션이 미국에 2차전지 신공장을 착공했다.",
    analysis:
      "LG에너지솔루션의 미국 신공장 착공은 글로벌 시장점유율 확대를 위한 중요한 전략적 진전입니다. 특히 미국 정부의 인플레이션 감축법(IRA) 혜택을 받을 수 있어 경쟁력 강화가 기대됩니다.",
  },
  {
    id: 15,
    title:
      "네이버클라우드, AI 서비스 매출 2배 성장... 클라우드 시장 경쟁력 강화",
    source: "조선비즈",
    date: "2025-03-17",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/03/17/0000000007",
    summary: "네이버클라우드의 AI 서비스 매출이 전년 대비 2배 이상 성장했다.",
    analysis:
      "네이버클라우드의 AI 서비스 매출 성장은 클라우드 시장에서의 경쟁력 강화를 시사합니다. 특히 AI 서비스에 대한 수요 증가가 지속되고 있어 향후 성장성이 기대됩니다.",
  },
  {
    id: 16,
    title: "카카오뱅크, 1분기 순이익 감소... 금리 상승 영향",
    source: "서울경제",
    date: "2025-03-17",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024031700008",
    summary: "카카오뱅크의 1분기 순이익이 전년 대비 감소했다.",
    analysis:
      "카카오뱅크의 순이익 감소는 금리 상승에 따른 비용 증가가 주요 원인으로 분석됩니다. 금융 시장의 불확실성이 지속되는 가운데, 수익성 개선을 위한 전략 수립이 필요한 시점입니다.",
  },
  {
    id: 17,
    title: "삼성바이오로직스, 신약 개발 파트너십 확대... R&D 역량 강화",
    source: "한국경제",
    date: "2025-03-16",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024031600009",
    summary:
      "삼성바이오로직스가 글로벌 제약사와 신약 개발 파트너십을 확대했다.",
    analysis:
      "삼성바이오로직스의 파트너십 확대는 신약 개발 역량 강화를 위한 긍정적인 신호입니다. 특히 글로벌 제약사와의 협력을 통해 R&D 경쟁력이 향상될 것으로 기대됩니다.",
  },
  {
    id: 18,
    title: "현대중공업, 조선 수주 감소... 중국 경쟁사 영향",
    source: "매일경제",
    date: "2025-03-16",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/16/0000000010",
    summary: "현대중공업의 1분기 조선 수주가 전년 대비 감소했다.",
    analysis:
      "현대중공업의 수주 감소는 중국 조선업체들의 가격 경쟁력 강화가 주요 원인으로 분석됩니다. 조선업의 경쟁 환경이 더욱 치열해지는 가운데, 기술력 강화를 통한 경쟁력 확보가 필요합니다.",
  },
  {
    id: 19,
    title: "KT, 5G 네트워크 확장... 시장점유율 상승세",
    source: "한국경제",
    date: "2025-03-15",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024031500011",
    summary:
      "KT가 5G 네트워크를 전국적으로 확장하며 통신 시장 점유율이 상승했다.",
    analysis:
      "KT의 5G 네트워크 확장은 통신 시장에서의 경쟁력 강화를 시사합니다. 특히 5G 서비스의 안정성과 커버리지 개선이 사용자 만족도 향상으로 이어질 것으로 기대됩니다.",
  },
  {
    id: 20,
    title: "롯데케미칼, 1분기 실적 부진... 원자재 가격 상승 영향",
    source: "매일경제",
    date: "2025-03-15",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/15/0000000012",
    summary: "롯데케미칼의 1분기 실적이 원자재 가격 상승으로 인해 부진했다.",
    analysis:
      "롯데케미칼의 실적 부진은 원자재 가격 상승이 주요 원인으로 분석됩니다. 글로벌 공급망 불안정성이 지속되는 가운데, 원가 관리와 가격 전략 수립이 필요한 시점입니다.",
  },
  {
    id: 21,
    title: "네이버파이낸셜, 금융 서비스 확대... 시장 진출 본격화",
    source: "조선비즈",
    date: "2025-03-14",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/03/14/0000000013",
    summary:
      "네이버파이낸셜이 새로운 금융 서비스를 출시하며 시장 진출을 본격화했다.",
    analysis:
      "네이버파이낸셜의 금융 서비스 확대는 핀테크 시장에서의 경쟁력 강화를 시사합니다. 특히 네이버 플랫폼과의 연계를 통한 시너지 효과가 기대됩니다.",
  },
  {
    id: 22,
    title: "삼성SDI, 2차전지 수출 감소... 중국 경쟁사 영향",
    source: "서울경제",
    date: "2025-03-14",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024031400014",
    summary:
      "삼성SDI의 2차전지 수출이 중국 경쟁사들의 가격 경쟁으로 인해 감소했다.",
    analysis:
      "삼성SDI의 수출 감소는 중국 기업들의 가격 경쟁력 강화가 주요 원인으로 분석됩니다. 기술력 강화와 원가 경쟁력 확보를 위한 전략 수립이 필요합니다.",
  },
  {
    id: 23,
    title: "카카오게임즈, 신작 게임 출시... 시장 반응 긍정적",
    source: "한국경제",
    date: "2025-03-13",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024031300015",
    summary:
      "카카오게임즈가 새로운 모바일 게임을 출시했으며, 초기 반응이 매우 긍정적이다.",
    analysis:
      "카카오게임즈의 신작 출시는 게임 시장에서의 경쟁력 강화를 시사합니다. 특히 긍정적인 초기 반응은 향후 매출 성장으로 이어질 가능성이 높습니다.",
  },
  {
    id: 24,
    title: "SK텔레콤, 통신 시장 점유율 하락... 5G 경쟁 심화",
    source: "매일경제",
    date: "2025-03-13",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/13/0000000016",
    summary: "SK텔레콤의 통신 시장 점유율이 5G 경쟁 심화로 인해 하락했다.",
    analysis:
      "SK텔레콤의 시장점유율 하락은 통신 시장의 경쟁 심화가 주요 원인으로 분석됩니다. 서비스 품질 개선과 차별화된 전략 수립이 필요한 시점입니다.",
  },
  {
    id: 25,
    title: "LG화학, 신소재 개발 성공... 미래 성장동력 확보",
    source: "조선비즈",
    date: "2025-03-12",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/03/12/0000000017",
    summary: "LG화학이 새로운 소재 개발에 성공하며 미래 성장동력을 확보했다.",
    analysis:
      "LG화학의 신소재 개발은 미래 성장동력 확보를 위한 중요한 진전입니다. 특히 친환경 소재 개발을 통해 지속가능한 성장 기반을 마련했습니다.",
  },
  {
    id: 26,
    title: "현대모비스, 자율주행 부문 실적 부진... 투자 확대 필요",
    source: "서울경제",
    date: "2025-03-12",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024031200018",
    summary: "현대모비스의 자율주행 부문 실적이 예상보다 부진했다.",
    analysis:
      "현대모비스의 자율주행 부문 실적 부진은 기술 개발과 투자 확대가 필요한 시점임을 시사합니다. 미래 모빌리티 시장에서의 경쟁력 확보를 위해 R&D 투자를 강화해야 합니다.",
  },
  {
    id: 27,
    title: "삼성생명, 디지털 보험 서비스 확대... 고객 만족도 상승",
    source: "한국경제",
    date: "2025-03-11",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024031100019",
    summary: "삼성생명이 디지털 보험 서비스를 확대하며 고객 만족도가 상승했다.",
    analysis:
      "삼성생명의 디지털 서비스 확대는 보험 시장의 디지털 전환을 가속화할 것으로 보입니다. 특히 젊은 고객층의 만족도 향상이 새로운 성장 동력이 될 것으로 기대됩니다.",
  },
  {
    id: 28,
    title: "네이버웹툰, 해외 시장 진출 지연... 현지화 전략 재검토",
    source: "매일경제",
    date: "2025-03-11",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/11/0000000020",
    summary: "네이버웹툰의 해외 시장 진출이 예상보다 지연되고 있다.",
    analysis:
      "네이버웹툰의 해외 진출 지연은 현지화 전략의 재검토가 필요한 시점임을 시사합니다. 특히 각 지역별 특성을 고려한 맞춤형 전략 수립이 필요합니다.",
  },
  {
    id: 29,
    title: "SK바이오팜, 신약 개발 성공... 글로벌 시장 진출 기대",
    source: "조선비즈",
    date: "2025-03-10",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/03/10/0000000021",
    summary: "SK바이오팜이 새로운 항암제 개발에 성공했다.",
    analysis:
      "SK바이오팜의 신약 개발 성공은 글로벌 제약 시장에서의 경쟁력 강화를 시사합니다. 특히 임상 시험 결과가 긍정적이어서 시장 진출이 기대됩니다.",
  },
  {
    id: 30,
    title: "카카오스타일, 패션 플랫폼 실적 부진... 경쟁 심화",
    source: "서울경제",
    date: "2025-03-10",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024031000022",
    summary: "카카오스타일의 패션 플랫폼 실적이 경쟁 심화로 인해 부진했다.",
    analysis:
      "카카오스타일의 실적 부진은 패션 플랫폼 시장의 경쟁 심화가 주요 원인으로 분석됩니다. 차별화된 서비스와 브랜드 가치 강화가 필요한 시점입니다.",
  },
  {
    id: 31,
    title: "LG전자, 가전 시장 점유율 상승... 프리미엄 전략 성공",
    source: "한국경제",
    date: "2025-03-09",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024030900023",
    summary: "LG전자의 가전 시장 점유율이 프리미엄 전략으로 상승했다.",
    analysis:
      "LG전자의 시장점유율 상승은 프리미엄 전략의 성공을 보여줍니다. 특히 고급 가전 시장에서의 경쟁력 강화가 수익성 개선으로 이어질 것으로 기대됩니다.",
  },
  {
    id: 32,
    title: "현대건설, 건설 수주 감소... 부동산 시장 침체 영향",
    source: "매일경제",
    date: "2025-03-09",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/09/0000000024",
    summary: "현대건설의 건설 수주가 부동산 시장 침체로 인해 감소했다.",
    analysis:
      "현대건설의 수주 감소는 부동산 시장의 침체가 주요 원인으로 분석됩니다. 해외 시장 진출과 신규 사업 다각화를 통한 위험 분산이 필요합니다.",
  },
  {
    id: 33,
    title: "삼성카드, 디지털 결제 서비스 확대... 시장점유율 상승",
    source: "조선비즈",
    date: "2025-03-08",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/03/08/0000000025",
    summary: "삼성카드가 디지털 결제 서비스를 확대하며 시장점유율이 상승했다.",
    analysis:
      "삼성카드의 디지털 서비스 확대는 결제 시장에서의 경쟁력 강화를 시사합니다. 특히 모바일 결제 시장에서의 입지 강화가 기대됩니다.",
  },
  {
    id: 34,
    title: "네이버파이낸셜, 금융 서비스 실적 부진... 규제 영향",
    source: "서울경제",
    date: "2025-03-08",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024030800026",
    summary: "네이버파이낸셜의 금융 서비스 실적이 규제 강화로 인해 부진했다.",
    analysis:
      "네이버파이낸셜의 실적 부진은 금융 규제 강화가 주요 원인으로 분석됩니다. 규제 대응과 서비스 혁신을 통한 경쟁력 강화가 필요합니다.",
  },
  {
    id: 35,
    title: "SK이노베이션, 친환경 사업 확대... 미래 성장동력 확보",
    source: "한국경제",
    date: "2025-03-07",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024030700027",
    summary: "SK이노베이션이 친환경 사업을 확대하며 미래 성장동력을 확보했다.",
    analysis:
      "SK이노베이션의 친환경 사업 확대는 지속가능한 성장을 위한 중요한 전략입니다. 특히 탄소중립 시대에 대비한 비즈니스 모델 전환이 기대됩니다.",
  },
  {
    id: 36,
    title: "카카오뱅크, 금융 서비스 실적 부진... 경쟁 심화",
    source: "매일경제",
    date: "2025-03-07",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/07/0000000028",
    summary: "카카오뱅크의 금융 서비스 실적이 경쟁 심화로 인해 부진했다.",
    analysis:
      "카카오뱅크의 실적 부진은 금융 시장의 경쟁 심화가 주요 원인으로 분석됩니다. 차별화된 서비스와 고객 경험 개선이 필요한 시점입니다.",
  },
  {
    id: 37,
    title: "LG생활건강, 뷰티 시장 진출 성공... 글로벌 브랜드화",
    source: "조선비즈",
    date: "2025-03-06",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/03/06/0000000029",
    summary:
      "LG생활건강이 뷰티 시장 진출에 성공하며 글로벌 브랜드화를 달성했다.",
    analysis:
      "LG생활건강의 뷰티 시장 진출 성공은 글로벌 브랜드 가치 상승을 시사합니다. 특히 K-뷰티 트렌드를 활용한 시장 확대가 기대됩니다.",
  },
  {
    id: 30,
    title: "현대오일뱅크, 정유 사업 실적 부진... 원유 가격 변동성",
    source: "서울경제",
    date: "2025-03-06",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024030600030",
    summary:
      "현대오일뱅크의 정유 사업 실적이 원유 가격 변동성으로 인해 부진했다.",
    analysis:
      "현대오일뱅크의 실적 부진은 원유 가격 변동성이 주요 원인으로 분석됩니다. 원가 관리와 수익성 개선을 위한 전략 수립이 필요합니다.",
  },
  {
    id: 31,
    title: "삼성물산, 건설 수주 증가... 해외 시장 진출 성공",
    source: "한국경제",
    date: "2025-03-05",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024030500031",
    summary: "삼성물산의 건설 수주가 해외 시장 진출 성공으로 증가했다.",
    analysis:
      "삼성물산의 수주 증가는 해외 시장에서의 경쟁력 강화를 시사합니다. 특히 대형 프로젝트 수주를 통해 글로벌 입지가 강화될 것으로 기대됩니다.",
  },
  {
    id: 32,
    title: "네이버웹툰, 콘텐츠 제작 실적 부진... 투자 확대 필요",
    source: "매일경제",
    date: "2025-03-05",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/05/0000000032",
    summary: "네이버웹툰의 콘텐츠 제작 실적이 예상보다 부진했다.",
    analysis:
      "네이버웹툰의 실적 부진은 콘텐츠 제작 투자 확대가 필요한 시점임을 시사합니다. 특히 독창적인 콘텐츠 개발을 통한 경쟁력 강화가 필요합니다.",
  },
  {
    id: 33,
    title: "SK텔레콤, 5G 서비스 확대... 시장점유율 상승",
    source: "조선비즈",
    date: "2025-03-04",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/03/04/0000000033",
    summary: "SK텔레콤이 5G 서비스를 확대하며 시장점유율이 상승했다.",
    analysis:
      "SK텔레콤의 5G 서비스 확대는 통신 시장에서의 경쟁력 강화를 시사합니다. 특히 5G 네트워크의 안정성과 커버리지 개선이 사용자 만족도 향상으로 이어질 것으로 기대됩니다.",
  },
  {
    id: 34,
    title: "카카오스타일, 패션 플랫폼 실적 부진... 경쟁 심화",
    source: "서울경제",
    date: "2025-03-04",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024030400034",
    summary: "카카오스타일의 패션 플랫폼 실적이 경쟁 심화로 인해 부진했다.",
    analysis:
      "카카오스타일의 실적 부진은 패션 플랫폼 시장의 경쟁 심화가 주요 원인으로 분석됩니다. 차별화된 서비스와 브랜드 가치 강화가 필요한 시점입니다.",
  },
  {
    id: 35,
    title: "LG전자, 가전 시장 점유율 상승... 프리미엄 전략 성공",
    source: "한국경제",
    date: "2025-03-03",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024030300035",
    summary: "LG전자의 가전 시장 점유율이 프리미엄 전략으로 상승했다.",
    analysis:
      "LG전자의 시장점유율 상승은 프리미엄 전략의 성공을 보여줍니다. 특히 고급 가전 시장에서의 경쟁력 강화가 수익성 개선으로 이어질 것으로 기대됩니다.",
  },
  {
    id: 36,
    title: "현대건설, 건설 수주 감소... 부동산 시장 침체 영향",
    source: "매일경제",
    date: "2025-03-03",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/03/0000000036",
    summary: "현대건설의 건설 수주가 부동산 시장 침체로 인해 감소했다.",
    analysis:
      "현대건설의 수주 감소는 부동산 시장의 침체가 주요 원인으로 분석됩니다. 해외 시장 진출과 신규 사업 다각화를 통한 위험 분산이 필요합니다.",
  },
  {
    id: 37,
    title: "삼성카드, 디지털 결제 서비스 확대... 시장점유율 상승",
    source: "조선비즈",
    date: "2025-03-02",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/03/02/0000000037",
    summary: "삼성카드가 디지털 결제 서비스를 확대하며 시장점유율이 상승했다.",
    analysis:
      "삼성카드의 디지털 서비스 확대는 결제 시장에서의 경쟁력 강화를 시사합니다. 특히 모바일 결제 시장에서의 입지 강화가 기대됩니다.",
  },
  {
    id: 38,
    title: "네이버파이낸셜, 금융 서비스 실적 부진... 규제 영향",
    source: "서울경제",
    date: "2025-03-02",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024030200038",
    summary: "네이버파이낸셜의 금융 서비스 실적이 규제 강화로 인해 부진했다.",
    analysis:
      "네이버파이낸셜의 실적 부진은 금융 규제 강화가 주요 원인으로 분석됩니다. 규제 대응과 서비스 혁신을 통한 경쟁력 강화가 필요합니다.",
  },
  {
    id: 39,
    title: "SK이노베이션, 친환경 사업 확대... 미래 성장동력 확보",
    source: "한국경제",
    date: "2025-03-01",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024030100039",
    summary: "SK이노베이션이 친환경 사업을 확대하며 미래 성장동력을 확보했다.",
    analysis:
      "SK이노베이션의 친환경 사업 확대는 지속가능한 성장을 위한 중요한 전략입니다. 특히 탄소중립 시대에 대비한 비즈니스 모델 전환이 기대됩니다.",
  },
  {
    id: 40,
    title: "카카오뱅크, 금융 서비스 실적 부진... 경쟁 심화",
    source: "매일경제",
    date: "2025-03-01",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/03/01/0000000040",
    summary: "카카오뱅크의 금융 서비스 실적이 경쟁 심화로 인해 부진했다.",
    analysis:
      "카카오뱅크의 실적 부진은 금융 시장의 경쟁 심화가 주요 원인으로 분석됩니다. 차별화된 서비스와 고객 경험 개선이 필요한 시점입니다.",
  },
  {
    id: 41,
    title: "LG생활건강, 뷰티 시장 진출 성공... 글로벌 브랜드화",
    source: "조선비즈",
    date: "2025-02-29",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/02/29/0000000041",
    summary:
      "LG생활건강이 뷰티 시장 진출에 성공하며 글로벌 브랜드화를 달성했다.",
    analysis:
      "LG생활건강의 뷰티 시장 진출 성공은 글로벌 브랜드 가치 상승을 시사합니다. 특히 K-뷰티 트렌드를 활용한 시장 확대가 기대됩니다.",
  },
  {
    id: 42,
    title: "현대오일뱅크, 정유 사업 실적 부진... 원유 가격 변동성",
    source: "서울경제",
    date: "2025-02-29",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024022900042",
    summary:
      "현대오일뱅크의 정유 사업 실적이 원유 가격 변동성으로 인해 부진했다.",
    analysis:
      "현대오일뱅크의 실적 부진은 원유 가격 변동성이 주요 원인으로 분석됩니다. 원가 관리와 수익성 개선을 위한 전략 수립이 필요합니다.",
  },
  {
    id: 43,
    title: "삼성물산, 건설 수주 증가... 해외 시장 진출 성공",
    source: "한국경제",
    date: "2025-02-28",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024022800043",
    summary: "삼성물산의 건설 수주가 해외 시장 진출 성공으로 증가했다.",
    analysis:
      "삼성물산의 수주 증가는 해외 시장에서의 경쟁력 강화를 시사합니다. 특히 대형 프로젝트 수주를 통해 글로벌 입지가 강화될 것으로 기대됩니다.",
  },
  {
    id: 44,
    title: "네이버웹툰, 콘텐츠 제작 실적 부진... 투자 확대 필요",
    source: "매일경제",
    date: "2025-02-28",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/02/28/0000000044",
    summary: "네이버웹툰의 콘텐츠 제작 실적이 예상보다 부진했다.",
    analysis:
      "네이버웹툰의 실적 부진은 콘텐츠 제작 투자 확대가 필요한 시점임을 시사합니다. 특히 독창적인 콘텐츠 개발을 통한 경쟁력 강화가 필요합니다.",
  },
  {
    id: 45,
    title: "SK텔레콤, 5G 서비스 확대... 시장점유율 상승",
    source: "조선비즈",
    date: "2025-02-27",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/02/27/0000000045",
    summary: "SK텔레콤이 5G 서비스를 확대하며 시장점유율이 상승했다.",
    analysis:
      "SK텔레콤의 5G 서비스 확대는 통신 시장에서의 경쟁력 강화를 시사합니다. 특히 5G 네트워크의 안정성과 커버리지 개선이 사용자 만족도 향상으로 이어질 것으로 기대됩니다.",
  },
  {
    id: 46,
    title: "카카오스타일, 패션 플랫폼 실적 부진... 경쟁 심화",
    source: "서울경제",
    date: "2025-02-27",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024022700046",
    summary: "카카오스타일의 패션 플랫폼 실적이 경쟁 심화로 인해 부진했다.",
    analysis:
      "카카오스타일의 실적 부진은 패션 플랫폼 시장의 경쟁 심화가 주요 원인으로 분석됩니다. 차별화된 서비스와 브랜드 가치 강화가 필요한 시점입니다.",
  },
  {
    id: 47,
    title: "LG전자, 가전 시장 점유율 상승... 프리미엄 전략 성공",
    source: "한국경제",
    date: "2025-02-26",
    impact: "positive",
    url: "https://www.hankyung.com/economy/article/2024022600047",
    summary: "LG전자의 가전 시장 점유율이 프리미엄 전략으로 상승했다.",
    analysis:
      "LG전자의 시장점유율 상승은 프리미엄 전략의 성공을 보여줍니다. 특히 고급 가전 시장에서의 경쟁력 강화가 수익성 개선으로 이어질 것으로 기대됩니다.",
  },
  {
    id: 48,
    title: "현대건설, 건설 수주 감소... 부동산 시장 침체 영향",
    source: "매일경제",
    date: "2025-02-26",
    impact: "negative",
    url: "https://www.mk.co.kr/news/economy/view/2024/02/26/0000000048",
    summary: "현대건설의 건설 수주가 부동산 시장 침체로 인해 감소했다.",
    analysis:
      "현대건설의 수주 감소는 부동산 시장의 침체가 주요 원인으로 분석됩니다. 해외 시장 진출과 신규 사업 다각화를 통한 위험 분산이 필요합니다.",
  },
  {
    id: 49,
    title: "삼성카드, 디지털 결제 서비스 확대... 시장점유율 상승",
    source: "조선비즈",
    date: "2025-02-25",
    impact: "positive",
    url: "https://biz.chosun.com/industry/company/2024/02/25/0000000049",
    summary: "삼성카드가 디지털 결제 서비스를 확대하며 시장점유율이 상승했다.",
    analysis:
      "삼성카드의 디지털 서비스 확대는 결제 시장에서의 경쟁력 강화를 시사합니다. 특히 모바일 결제 시장에서의 입지 강화가 기대됩니다.",
  },
  {
    id: 50,
    title: "네이버파이낸셜, 금융 서비스 실적 부진... 규제 영향",
    source: "서울경제",
    date: "2025-02-25",
    impact: "negative",
    url: "https://www.sedaily.com/NewsView/2024022500050",
    summary: "네이버파이낸셜의 금융 서비스 실적이 규제 강화로 인해 부진했다.",
    analysis:
      "네이버파이낸셜의 실적 부진은 금융 규제 강화가 주요 원인으로 분석됩니다. 규제 대응과 서비스 혁신을 통한 경쟁력 강화가 필요합니다.",
  },
];
