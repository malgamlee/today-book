# 오늘의 책📚
이전 개인프로젝트 [book-store-app](https://github.com/malgamlee/bookStore-app)을 리팩토링한 프로젝트입니다. 계속해서 리팩토링을 진행할 예정입니다.

## 배포 링크
🔗 https://today-book.vercel.app/

## Dependencies

<span><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/stylelint-263238?style=flat-square&logo=stylelint&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/></span>


<span><img src="https://img.shields.io/badge/recoil-FFFF00?style=flat-square&logo=recoil&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/store-00FF00?style=flat-square&logo=store&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/classnames-000000?style=flat-square&logoColor=white"/></span>

## 실행 화면과 기능
### 메인 화면
<img width="700" alt="image" src="https://user-images.githubusercontent.com/88325253/178211673-24bdccce-7db0-4f3d-a605-7b57a61244b3.png">

- 상단의 nav를 통해서 다른 페이지로 이동할 수 있습니다.

### 검색 기능
<img width="569" alt="image" src="https://user-images.githubusercontent.com/88325253/179391669-6a6b1b15-3e94-467f-accf-616ceaf3a5cf.png">

- nav의 검색 버튼을 클릭하면 위와 같이 검색창이 등장합니다.
- 최근 검색한 목록을 확인할 수 있습니다.

<img width="551" alt="image" src="https://user-images.githubusercontent.com/88325253/179392895-0d45781c-520c-4883-a8bc-d3bc2c1ee5d2.png">
<img width="540" alt="image" src="https://user-images.githubusercontent.com/88325253/179392910-e2ab26fd-77c2-462c-89d5-7356e5179eb6.png">

- 검색을 하면 입력한 위와 같이 책 목록이 출력됩니다.
- 작가 이름을 입력할 경우 작가의 책 목록이 출력됩니다. 
- 책 제목을 입력할 경우 해당 단어가 포함된 책들이 출력됩니다.
- 작가가 여러 명일 경우
  - 작가 이름을 입력했을 때, `해당 작가 외 n명`으로 표시됩니다. 
  - 책 재목을 입력했을 때, `첫 번째 작가 외 n명`으로 표시됩니다.
- 검색 목록에서 클릭을 할 경우, 클릭한 도서에 대한 상세 페이지로 이동합니다.
- 검색창에서 엔터를 누를 경우, 입력한 내용에 대한 검색 페이지로 이동합니다.

### 책 상세 페이지
<img width="551" alt="image" src="https://user-images.githubusercontent.com/88325253/179393012-be7a2d10-58ef-4a99-84d8-0b91378c4c90.png">

- 검색 목록에서 도서를 선택할 경우, 위와 같이 도서 상세 페이지로 이동합니다.
- 책 표지, 작가, 출판사, 출판 날짜를 확인할 수 있습니다.
- 별점을 통해 책을 평가할 수 있습니다.
- `읽고싶어요`, `읽고있어요` 버튼으로 읽고 있거나 읽고 싶은 책을 스크랩할 수 있습니다.
- 작품 소개를 통해 해당 도서에 대한 소개를 볼 수 있습니다.
  - 카카오 도서 검색 api에서 제공하는 도서 소개 내용에 제한이 있기 때문에 `더보기`버튼을 통해 다음 책 검색 페이지로 이동할 수 있습니다.
- 저자의 다른 도서를 통해 다른 책들을 볼 수 있습니다.
  - 책 표지를 클릭하면 해당 도서애 대한 상세 내용을 확인할 수 있습니다.
  - `더보기` 버튼을 클릭하면 저자의 다른 도서를 모두 확인할 수 있습니다.

### 검색 페이지
<img width="652" alt="image" src="https://user-images.githubusercontent.com/88325253/179393240-d15d971e-b0c2-4fac-b91d-d61d071035ef.png">

- 검색 기능에서 엔터를 누르거나, 상세 페이지에서 저자의 책 더보기 버튼을 눌렀을 때 해당 페이지로 이동합니다.
- 무한스크롤을 통해 도서가 출력됩니다.

### 마이페이지
<img width="378" alt="image" src="https://user-images.githubusercontent.com/88325253/179905541-eabe0022-ec9c-4420-b636-d5592d189539.png">

- 도서 상세 페이지에서 평가했던 도서, 읽고 싶은 도서, 읽고 있는 도서를 확인할 수 있는 버튼 세 개가 있습니다.
- 버튼의 오른쪽 모서리에는 저장된 도서가 총 몇 권인지 출력됩니다.

<img width="374" alt="image" src="https://user-images.githubusercontent.com/88325253/179905774-73eac5a1-53e0-41a3-84c4-4af260361b4b.png">

- 저장된 도서가 출력됩니다. 
- 도서 클릭 시, 도서 상세 페이지로 이동합니다.
- 상단의 breadcrumb을 통해 현재 페이지가 무슨 페이지인지 확인할 수 있고, 클릭하여 이전 페이지로 이동할 수 있습니다.

### 반응형 적용
#### 메인 화면
<img width="419" alt="image" src="https://user-images.githubusercontent.com/88325253/179391628-c0f87465-0414-4765-a617-dea3c2fd192e.png">

- 미디어 쿼리를 이용해 반응형으로 구현했습니다
- 화면의 크기가 일정 이하로 줄어들 경우 상단의 메뉴바의 디자인이 변경됩니다.

#### 도서 상세 페이지
<img width="349" alt="image" src="https://user-images.githubusercontent.com/88325253/179905328-7628b5c6-83cc-4fca-af79-eebc74eae297.png">

