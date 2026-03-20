# 🎬 Movie Space 웹서비스 (React + TypeScript + Vite)

React, TypeScript, Firebase, TailwindCSS, Redux Toolkit, i18next 등을 활용한 **영화 시청 및 구독 웹사이트**입니다.  
영화 데이터는 TMDB API를 기반으로 가져오며, 다국어(영어/한국어) 지원 및 Firebase 인증 기능을 포함하고 있습니다.

---

## 🚀 주요 기술 스택
  
| 구분  |           기술                     |
|------|------------------------------------|
| **Frontend** | React 18, TypeScript, Vite |
| **상태관리** | Redux Toolkit, React-Redux  |
| **스타일링** | Tailwind CSS                |
| **국제화(i18n)** | i18next, react-i18next  |
| **폼 처리 및 검증** | React Hook Form, Yup  |
| **API 통신** | Axios                      |
| **인증/데이터 관리** | Firebase             |
| **라우팅** | React Router v7              |
| **품질 관리** | ESLint, TypeScript ESLint |

---


  
## 📦 화면구현 3개 설명  

### 1. 로그인 이전 화면 ( i18next 다국어번역 메뉴버튼)
### 2,로그인화면 (firebase 연동, 로그인 인증)
### 3. 로그인 이후 화면 ( 캐러셀 react-slick)

<img width="3837" height="2072" alt="1 화면3개" src="https://github.com/user-attachments/assets/74ab084c-82e0-4132-b1ac-973ef34a8fdb" />


  
## 3-1. 로그인 이후 화면 더 자세히 설명  

### 영화 목록을 캐러셀 형태로 제공
🖥 화면 구현1. 로그인 이전 화면서비스 소개 및 진입 화면i18next를 활용한 다국어 번역 메뉴 버튼 제공언어 전환 시 한국어/영어 화면을 즉시 확인 가능2. 로그인 화면Firebase와 연동된 로그인 기능 구현이메일/비밀번호 기반 인증 지원인증 성공 시 메인 서비스 화면으로 이동3. 로그인 이후 화면영화 목록을 캐러셀 형태로 제공react-slick을 사용해 부드러운 슬라이드 UI 구현첫 페이지에서는 좌측 화살표를 표시하지 않도록 처리한 페이지 이동 후부터 좌측 화살표가 표시되도록 구현3-1. 영화 상세 화면클릭한 영화의 상세 정보를 확인할 수 있는 화면영화의 기본 정보와 예고편을 함께 제공사용자가 영화 정보를 더 직관적으로 탐색할 수 있도록 구성
<img width="3828" height="2069" alt="2 영어 한국어 다국어 api" src="https://github.com/user-attachments/assets/4414b7d8-fa40-491f-84c0-5bd9065cdfea" />


  
## 3-2.  클릭한 영화 상세화면구현  
<img width="1905" height="1901" alt="3 캐러셀 영화 상세
  화면" src="https://github.com/user-attachments/assets/ad619fcc-4168-4126-826a-b9d7fa6ba8fc" />

## 📦 설치 및 실행 방법

### 1️⃣ 의존성 설치
```bash
npm install



## 🚀 주요 기능
Firebase 로그인/회원가입

영화 캐러셀(react-slick)로 부드럽게 영화 탐색

YouTube API 예고편 자동 재생

영화 정보(출시일/평점/개요 등) 제공

프로필 관리

반응형 UI와 한국어/영어 다국어 지원


