# 📚 BookStore-App 📚

## 배포 링크
[🔗 링크](https://book-store-app-xi.vercel.app/)

## Dependencies
<span>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/>
<img src="https://img.shields.io/badge/store.js-FEC111?style=flat-square"/>
<img src="https://img.shields.io/badge/Recoil-006600?style=flat-square"/>
<img src="https://img.shields.io/badge/ReactSlick-E4637C?style=flat-square"/>
</span>

## 구현 상세 설명

### 메인 화면

<img width="377" alt="main" src="https://user-images.githubusercontent.com/88325253/173997113-2630cc53-56a9-4395-ac46-a40e1d0dfec1.png">

- `bookStore-App`의 메인화면 입니다.
- 상단에는 로고, 장바구니, 좋아요, 마이 페이지 버튼이 있고, 클릭 시 해당 영역으로 이동합니다.
- 장바구니 버튼은 목록이 비어 있을 경우 0을 출력하고, 목록에 데이터가 있을 경우 데이터의 수 만큼 숫자가 출력됩니다.
  - `recoil`을 이용하여 실시간으로 장바구니 버튼을 클릭할 때마다 출력하는 수가 바뀌도록 구현했습니다. 

### 검색 화면

* 입력창을 클릭하면 위와 같이 입력하는 창이 등장합니다. 모바일 화면에서 원활한 검색을 위해 위와 같이 구현했습니다.
* 입력창에 타이핑을 하면 `카카오 도서 검색 api`에서 받아온 데이터들이 아래에 출력됩니다. 

#### 검색창에서 엔터키를 눌렀을 때
<span>
<img src="https://user-images.githubusercontent.com/88325253/173997393-31cc7ffe-75f0-4afc-b449-b936433a470c.gif" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/173998308-bc7d199c-b7db-419f-a906-fd960be5d0b7.gif" width="30%" height="30%"/>
</span>

* 검색 결과가 1 ~ 9개 사이일 때, 로딩 없이 검색 결과가 출력됩니다.
* 검색 결과가 10개 이상일 때, 로딩이 발생하며 `무한 스크롤`을 통해 결과가 출력됩니다.

#### 검색창에서 클릭했을 때, 검색 결과가 없을 때

<span>
<img src="https://user-images.githubusercontent.com/88325253/173997382-6d87ee13-f16e-4a2a-9424-78cea8703b8b.gif" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/173997359-7c948f8c-f218-480f-8ead-c631bad842bd.gif" width="30%" height="30%"/>
</span>

* 검색창에 입력한 후, 엔터키를 누르지 않으면 데이터 목록이 출력됩니다.
  * 데이터 목록은 책 제목, 저자 순서로 출력됩니다.
  * 데이터 목록 위에 커서를 가져다 대면 어느 부분을 가리키고 있는지 알 수 있습니다.
  * 데이터 목록 중 하나를 클릭하면 해당 도서에 대한 상세 페이지로 이동합니다.
* 검색 결과가 없을 때, 해당 검색어에 대한 결과가 없다는 페이지가 출력됩니다.


### 도서 상세 페이지

<span>
<img width="377" alt="sale book detail page " src="https://user-images.githubusercontent.com/88325253/174001612-3138e6ed-a2de-435e-a011-b2885b50631b.png">
<img width="367" alt="soldout book detail page" src="https://user-images.githubusercontent.com/88325253/174001601-203e5c59-f80e-4895-a77e-50600f1454bf.png">
</span>

- 앞서 검색 화면에서 선택했던 도서의 상세 내용이 담긴 페이지입니다.
- 첵 표지, 제목, 작가, 츨핀사, 출판 날짜, 판매가, 작품 소개글과 좋아요, 장바구니, 구매하기 버튼으로 이루어져 있습니다.
- 판매중이거나 품절일 경우 가격이나 버튼 부분이 달라집니다.
  - 판매 중일 경우, 판매 가격이 출력되고, 구매 버튼이 활성화됩니다.
  - 품절일 경우, 정가가 출력되고 그 위에 가로줄이 그어집니다. 또한 구매 버튼이 비활성화됩니다.


![click_like_cart](https://user-images.githubusercontent.com/88325253/174002201-8ef302f4-708e-49e2-ba4e-d2b5a8160627.gif)

- 하트 모양의 좋아요 버튼을 클릭하면 `localstorage`를 이용해 `좋아요 목록`에 저장됩니다.
- 카트 모양의 장바구니 버튼을 클릭하면 `localstorage`를 이용해 `장바구니 목록`에 저장됩니다.
- 상단의 nav의 장바구니 버튼 옆에 수가 증가하게 됩니다.

![infinity](https://user-images.githubusercontent.com/88325253/174005145-e09d9834-0b8e-49b8-be3d-990864de094f.gif)

- 저자의 다른 도서를 확인할 수 있습니다.
- `더보기` 버튼을 클릭할 경우, 검색 결과 페이지로 이동하며 로딩이 발생하며 `무한 스크롤`을 통해 결과가 출력됩니다.


### 장바구니 페이지

<span>
<img src="https://user-images.githubusercontent.com/88325253/174002449-76f849cc-4d53-498c-997d-da7798545b0e.png" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/174002461-365f87a3-25ad-4b9a-9105-7131f73642f4.gif" width="30%" height="30%"/>
</span>

- 앞서 저장했던 장바구니 데이터가 출력되는 목록입니다.
- 상품의 수, 총 금액, 배송비, 결제 예상 금액을 보여줍니다.
  - 품절일 경우, 상품의 수, 총 금액, 결제 예상 금액에 포함되지 않습니다.
- 삭제 버튼을 클릭하면 목록에서 사라집니다.
- 품절 상품일 경우, `품절된 상품입니다.` 라는 문구가 등장합니다.
- 목록이 비었을 경우, `장바구니가 비었습니다.` 라는 화면이 출력됩니다.

### 좋아요 페이지

<span>
<img src="https://user-images.githubusercontent.com/88325253/174003931-aa575cec-8735-4dd7-bc09-ffd9fbbdbc1c.gif" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/174004043-53353247-bb8f-4c49-9f8e-75647d2808d2.gif" width="30%" height="30%"/>
</span>

- 앞서 저장했던 좋아요 데이터가 출력되는 목록입니다.
- 상단의 검색창을 통해 퍼지문자열을 적용하여 검색을 할 수 있습니다.
  - 단어 검색, 초성 검색
- 삭제 버튼을 클릭하면 목록에서 사라집니다.
- 품절 상품일 경우, `품절된 상품입니다.` 라는 문구가 등장합니다.
- 목록이 비었을 경우, `좋아요를 누른 항목이 없습니다.` 라는 화면이 출력됩니다.

### 마이페이지 

#### 저장 목록 전체 삭제

<span>
<img src="https://user-images.githubusercontent.com/88325253/174005600-239d8d57-5578-4e62-9079-309b78e119d5.gif" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/174005639-05568025-8198-435e-b774-22e07f105786.gif" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/174005647-3f5bf5b6-e7db-4509-951d-144688966fef.gif" width="30%" height="30%"/>
</span>

- `localStorage`에 저장되었던 장바구니, 좋아요, 검색 기록 데이터를 모두 삭제할 수 있습니다.

#### 다크 모드

<span>
<img src="https://user-images.githubusercontent.com/88325253/174006282-48eb694f-c259-4304-b07e-b1e838e8c0de.gif" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/88325253/174006310-3ca85e63-223a-4335-bfca-4c2e99f875e2.gif" width="30%" height="30%"/>
</span>

- 마이페이지 하단의 다크모드 토글을 클릭하면 화면 색이 변경된다.
- 모든 페이지의 화면이 다크모드에 맞게 적용된 모습을 확인할 수 있다.

## 회고
초반에 제작을 할 때, 전체 화면을 이용해 구현하기엔 넣을 기능이나 데이터가 부족하다고 생각하여 모바일 화면으로 구현했습니다.
