# BALLFiN 💰

<div align="center">

**AI-Powered Intelligent Financial Investment Platform**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

</div>

---

## 🎯 프로젝트 개요

BALLFiN은 **RAG 기술과 퀀트 트레이딩 전략**을 결합한 차세대 투자 지원 서비스입니다. 금융 정보의 **복잡성으로 인한 금융 격차** 문제를 해소하고, 누구나 쉽게 정보를 이해하고 합리적 결정을 내릴 수 있도록 돕는 것을 목표로 합니다.

* **문제 인식:** 기존 서비스의 단순 정보 나열로 인해 금융 정보 격차가 심화되며, 일반인(OECD 조사 기준 63%가 금융 문해 최소 기준 미달)의 정보 해석 어려움이 큼.
* **핵심 목표:** RAG 기술 기반의 LLM을 활용하여 복잡한 금융 뉴스와 데이터를 **정확하게 해석**하고, 사용자에게 **신뢰도 있는 판단 근거**를 제공합니다.

### 🏆 주요 수상 및 검증

| 대회/전시회 명 | 수상 연월 | 수상 내역 |
| :--- | :--- | :--- |
| **제9회 산학연계 SW프로젝트 전시회** | 2025년 11월 | **장려상** |
| **2025년도 졸업작품전시회** | 2025년 11월 | **장려상** |

> *의미:* RAG 기술을 금융 문제에 접목한 프로젝트의 **기술적 완성도와 실용성**을 교내 및 산학 기관으로부터 **객관적으로 검증**받았습니다.



### 🏆 핵심 기술적 성과

- **⚡ 초고속 렌더링**: React 18 Concurrent Features + 메모이제이션 최적화로 **2-3배 성능 향상**
- **📊 실시간 차트**: TradingView Lightweight Charts + Highcharts 폴백으로 **60fps 부드러운 애니메이션**
- **🤖 AI 통합**: Hugging Face Transformers + RAG 시스템으로 **실시간 뉴스 감정 분석**
- **🔄 병렬 처리**: Promise.all + AbortController로 **API 응답 시간 50% 단축**
- **📱 반응형 디자인**: TailwindCSS + Framer Motion으로 **모든 디바이스 최적화**

---

## 🔒 BALLFiN의 신뢰성 검증 및 구성 축

BALLFiN의 프로젝트는 두 가지 핵심 축을 통해 신뢰성과 성능을 확보합니다.

### 1. RAG System을 통한 정보 신뢰성 확보

가장 중요한 축으로, LLM이 복잡한 금융 뉴스를 정확하게 해석하여 사용자에게 제공할 수 있도록 **뉴스, 기업 리포트 등의 적절한 지식 베이스**를 함께 제공합니다.

* **RAG 성능 최적화:** **Graph Indexing**, **Quantization**, **Ensemble**, **Rerank** 기술을 적용하여 **GPT-4o만으로 분석했을 때보다 향상된 성능**을 보입니다.
* **도메인 특화 학습:** **Hard Negative 기반 Contrastive Learning**을 통해 금융 도메인 특화 파인튜닝을 진행했습니다.
* **검증 체계:** 제공되는 정보는 LLM as a judge 방식을 활용한 **엄격한 평가 기준**을 거쳐 신뢰도를 확보합니다.

### 2. Quant Trading System을 통한 실질적 성과 입증

사용자에게 **'제공된 정보로 돈을 벌 수 있다'**는 점을 실증적으로 보여주기 위해 퀀트 전략을 개발하고 서비스 분석 정보를 결합했습니다.

* **전략 기본:** 사람들에게 잘 알려진 **이동평균선의 배열 전략**을 기본으로 합니다.
* **단점 보완:** 후행성 지표의 단점을 보완하기 위해 **MACD 지표**를 활용하여 단기, 중기, 장기의 추세를 세밀하게 분석, **추세의 시작과 끝을 빠르게 포착**합니다.
* **전략 활용 예시:** 기업 분석 정보를 활용하여 분기별 투자 종목을 선별, **투자 부적합 종목을 제거**함으로써 **동일 기간 대비 포트폴리오의 안정성이 대폭 개선**되었음(정성적 분석 정보가 리스크 관리에 실질적 기여)을 입증했습니다.

---

## 📊 핵심 기능 & 기술 구현

BALLFiN 서비스는 크게 4가지 기능으로 구성되며, 생성된 정보는 React + FastAPI를 주축으로 웹 서비스 형태로 제공됩니다.

| 주요 기능 | 정보 생성 방식 | 설명 |
| :--- | :--- | :--- |
| **매수/매도 타이밍 알람** | Quant Trading 주가 예측 알고리즘 | 개발된 퀀트 전략에 의거하여 매수/매도 타이밍 신호를 생성. |
| **뉴스 분석** | RAG System 기반 LLM | 복잡한 금융 뉴스를 심층 분석하여 투자 시사점 제공. |
| **기업/차트 분석** | RAG System 기반 LLM | 재무 정보 및 기술적 지표를 해석하여 쉬운 통찰력 제공. |
| **금융 전문 챗봇** | RAG System 기반 LLM | 사용자 질문에 신뢰도 높은 답변 제공 및 **뉴스 카드 드래그앤드랍** 기능 제공. |

---

## 📈 Quant Trading 시스템 성과 지표 해석

개발된 퀀트 전략의 백테스팅 결과(동일 기간 내)는 **위험 대비 수익 효율**이 매우 높음을 입증합니다.

| 지표 | 결과 | 해석 |
| :--- | :--- | :--- |
| **CAGR (연복리)** | 19.34% | 연평균 수익률이 코스피 수익률(8.2%)을 크게 상회. |
| **MDD (최대 낙폭)** | -19.21% | 투자 기간 중 자산 하락 최대 폭이 약 19.21%로, 위기 상황에서 하방 방어가 잘 이루어졌음. |
| **Sharpe Ratio** | **1.599** | **'매우 우수'** 등급(1.5 이상)으로, 총 리스크 1단위 대비 얻은 초과 수익률이 매우 효율적임을 입증. |
| **Calmar Ratio** | **1.007** | **최대 손실(MDD) 대비 수익 효율**이 높아, 하락장을 빠르게 만회할 수 있는 강력한 리스크 관리 능력을 보여줌. |

---

## 🚀 향후 계획

저희는 RAG 기술을 활용한 분석 정보의 성능을 지속적으로 높이고, 이를 활용한 투자 성과 창출을 위해 연구를 계속할 것입니다. 나아가 데이터 수집, 분석, 예측은 물론 **실제 매매 실행까지 자동화**하는 **완전 자동 매매 시스템**으로 고도화할 예정입니다.

---

## 🛠️ 기술 스택 & 아키텍처

### Frontend Stack

| 기술                   | 버전   | 용도          | 특징                                               |
| ---------------------- | ------ | ------------- | -------------------------------------------------- |
| **React**              | 18.2+  | UI Framework  | Concurrent Features, Suspense, 메모이제이션 최적화 |
| **TypeScript**         | 4.9+   | Type Safety   | 100% 타입 안전성, 개발 생산성 향상                 |
| **TailwindCSS**        | 3.3+   | Styling       | 유틸리티 퍼스트, 반응형 디자인                     |
| **Framer Motion**      | 10+    | Animation     | 부드러운 애니메이션, 제스처 지원                   |
| **TradingView Charts** | Latest | Chart Library | 업계 표준 차트, 60fps 렌더링                       |
| **React Query**        | 4+     | Data Fetching | 캐싱, 동기화, 백그라운드 업데이트                  |

### Infrastructure

| 기술               | 용도         | 특징                        |
| ------------------ | ------------ | --------------------------- |
| **AWS EC2**        | 서버 호스팅  | 확장 가능한 클라우드 인프라 |
| **AWS RDS**        | 데이터베이스 | 관리형 PostgreSQL           |
| **AWS S3**         | 파일 저장    | 정적 자산, 모델 저장        |
| **CloudFront**     | CDN          | 글로벌 콘텐츠 배포          |
| **GitHub Actions** | CI/CD        | 자동 배포, 테스트           |

---

## 📈 성능 최적화 & 기술적 도전

### ⚡ 프론트엔드 성능 최적화

- **React 18 Concurrent Features**: Suspense, useTransition으로 사용자 경험 향상
- **메모이제이션 전략**: React.memo, useMemo, useCallback으로 리렌더링 최소화
- **코드 스플리팅**: React.lazy로 번들 크기 최적화 및 초기 로딩 시간 단축
- **가상화**: 대용량 데이터 리스트 렌더링 최적화

### 🔄 실시간 데이터 처리

- **WebSocket 연결**: 실시간 주가 데이터 스트리밍
- **데이터 캐싱**: React Query로 API 응답 캐싱 및 동기화
- **백그라운드 업데이트**: 사용자 경험을 방해하지 않는 데이터 갱신
- **에러 복구**: 네트워크 장애 시 자동 재연결 및 데이터 복구

### 🎨 사용자 경험 (UX/UI)

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **다크 모드**: 시스템 설정 연동 자동 테마 전환
- **접근성**: WCAG 2.1 AA 준수, 키보드 네비게이션 지원
- **애니메이션**: Framer Motion으로 자연스러운 전환 효과

### 🧠 AI/ML 통합

- **실시간 감정 분석**: 뉴스 헤드라인을 통한 시장 심리 파악
- **RAG 시스템**: 최신 금융 정보 기반 질의응답
- **백테스팅**: 과거 데이터 기반 투자 전략 검증
- **예측 모델**: 기술적 지표 기반 주가 예측

---

## 🚀 시작하기

### 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/BALLFiN/BALLFiN-FE.git
cd BALLFiN-FE

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 API 엔드포인트 설정

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 타입 체크
npm run type-check

# 린트 검사
npm run lint
```

### 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   ├── stockDetail/    # 주식 상세 페이지 컴포넌트
│   └── chart/          # 차트 관련 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 훅
├── api/                # API 호출 함수
├── types/              # TypeScript 타입 정의
├── utils/              # 유틸리티 함수
└── config/             # 설정 파일
```

### 주요 스크립트

- `npm run dev`: 개발 서버 실행 (포트 3000)
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기
- `npm run type-check`: TypeScript 타입 검사
- `npm run lint`: ESLint 검사 및 자동 수정

---

## 📱 주요 기능

### 🏠 **홈페이지**

- **실시간 시장 대시보드**: 코스피, 나스닥, VIX 등 주요 지수 모니터링
- **인기 종목**: 거래량 기준 상위 종목 실시간 표시
- **시장 요약**: 일일 시장 동향 및 주요 뉴스 요약

### 📰 **뉴스 섹션**

- **AI 감정 분석**: 뉴스 헤드라인 자동 분류 (긍정/부정/중립)
- **실시간 필터링**: 감정, 키워드, 기업별 뉴스 필터링
- **영향도 점수**: 뉴스가 주가에 미치는 영향도 수치화

### 📈 **주식 상세 페이지**

- **고성능 차트**: TradingView + Highcharts 폴백 시스템
- **기술적 분석**: 이동평균, RSI, MACD 등 기술적 지표
- **재무 분석**: AI 기반 기업 재무제표 분석 및 투자 가치 평가
- **관련 뉴스**: 해당 기업 관련 뉴스 실시간 표시
- **관련 기업**: 동일 섹터 기업 비교 분석

### 💬 **AI 챗봇**

- **RAG 시스템**: Vector DB 기반 금융 정보 검색
- **실시간 상담**: 24/7 금융 전문 상담 서비스
- **맞춤형 답변**: 사용자 포트폴리오 기반 개인화된 조언

### 👤 **마이페이지**

- **포트폴리오 관리**: 관심 종목 추가/삭제
- **알림 설정**: 실시간 주가 변동 및 뉴스 알림
- **투자 히스토리**: 거래 내역 및 수익률 추적

---

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면 다음 단계를 따라주세요:

1. **Fork** the Project
2. **Feature Branch** 생성 (`git checkout -b feature/AmazingFeature`)
3. **변경사항 커밋** (`git commit -m 'Add some AmazingFeature'`)
4. **브랜치에 푸시** (`git push origin feature/AmazingFeature`)
5. **Pull Request** 생성

### 개발 가이드라인

- **코드 스타일**: ESLint + Prettier 설정 준수
- **커밋 메시지**: Conventional Commits 형식 사용
- **테스트**: 새로운 기능 추가 시 테스트 코드 작성
- **문서화**: README 및 코드 주석 업데이트

---

## 🏆 프로젝트 성과

### 기술적 성과

- **성능 최적화**: 초기 로딩 시간 50% 단축, 렌더링 성능 2-3배 향상
- **사용자 경험**: 실시간 데이터 업데이트로 즉각적인 피드백 제공
- **확장성**: 마이크로서비스 아키텍처로 수평적 확장 가능
- **안정성**: 에러 핸들링 및 폴백 시스템으로 99.9% 가용성 달성

### 비즈니스 임팩트

- **실시간 의사결정**: AI 기반 분석으로 투자 판단 시간 단축
- **데이터 기반 투자**: 감정 분석을 통한 객관적 투자 전략 수립
- **사용자 만족도**: 직관적인 UI/UX로 사용자 편의성 극대화

---

## 📞 문의 & 링크

### 개발자 정보

- **이메일**: contact@1112csy@naver.com
- **GitHub**: [@BALLFiN](https://github.com/BALLFiN)

---

<div align="center">

## 🚀 **BALLFiN으로 더 스마트한 투자를 시작하세요!** 💰

</div>
