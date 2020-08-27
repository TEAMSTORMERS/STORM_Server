### :zap:유저
|기능|URL| HTTP Method|
|----|---|------------|
|[이메일 중복 확인](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/1.%20%EC%9C%A0%EC%A0%80%20%EA%B4%80%EB%A0%A8%20%EB%B7%B0/%5BPOST%5D%20%EC%9D%B4%EB%A9%94%EC%9D%BC%20%EC%A4%91%EB%B3%B5%20%ED%99%95%EC%9D%B8.md)|/user/checkemail|POST|
|[회원가입](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/1.%20%EC%9C%A0%EC%A0%80%20%EA%B4%80%EB%A0%A8%20%EB%B7%B0/%5BPOST%5D%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.md)|/user/signup|POST|
|[로그인](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/1.%20%EC%9C%A0%EC%A0%80%20%EA%B4%80%EB%A0%A8%20%EB%B7%B0/%5BPOST%5D%20%EB%A1%9C%EA%B7%B8%EC%9D%B8.md)|/user/signin|POST|
|[마이페이지 조회](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/1.%20%EC%9C%A0%EC%A0%80%20%EA%B4%80%EB%A0%A8%20%EB%B7%B0/%5BGET%5D%20%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80%20%EC%A1%B0%ED%9A%8C.md)|/user/mypage/:user_idx|GET|
|[프로필 이미지 수정](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/1.%20%EC%9C%A0%EC%A0%80%20%EA%B4%80%EB%A0%A8%20%EB%B7%B0/%5BGET%5D%20%ED%94%84%EB%A1%9C%ED%95%84%20%EC%9D%B4%EB%AF%B8%EC%A7%80%20%EC%88%98%EC%A0%95.md)|/user/mypage/img|PUT|
|[프로필 닉네임 수정](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/1.%20%EC%9C%A0%EC%A0%80%20%EA%B4%80%EB%A0%A8%20%EB%B7%B0/%5BGET%5D%20%ED%94%84%EB%A1%9C%ED%95%84%20%EB%8B%89%EB%84%A4%EC%9E%84%20%EC%88%98%EC%A0%95.md)|/user/mypage/name|PUT|
|[비밀번호 확인](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/1.%20%EC%9C%A0%EC%A0%80%20%EA%B4%80%EB%A0%A8%20%EB%B7%B0/%5BPOST%5D%20%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%20%ED%99%95%EC%9D%B8.md)|/user/checkPassword|POST|
|[회원탈퇴](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/1.%20%EC%9C%A0%EC%A0%80%20%EA%B4%80%EB%A0%A8%20%EB%B7%B0/%5BPOST%5D%20%ED%9A%8C%EC%9B%90%ED%83%88%ED%87%B4.md)|/user/withdrawal|POST|

## </br>

### :zap:Main 뷰
|기능|URL| HTTP Method|
|----|---|------------|
|[참여한 프로젝트 조회](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/2.%20%EB%A9%94%EC%9D%B8%20%EB%B7%B0/%5BGET%5D%20%EC%B0%B8%EC%97%AC%ED%95%9C%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A1%B0%ED%9A%8C.md)|/project/user/:user_idx|GET|
|[프로젝트 팝업 - MEMBER](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/2.%20%EB%A9%94%EC%9D%B8%20%EB%B7%B0/%5BGET%5D%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%ED%8C%9D%EC%97%85.md)|/project/info/:project_code|GET|
|[프로젝트 참여 - MEMBER](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/2.%20%EB%A9%94%EC%9D%B8%20%EB%B7%B0/%5BPOST%5D%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%B0%B8%EC%97%AC.md)|/project/enter|POST|

## </br>

### :zap:프로젝트 진행
|기능|URL| HTTP Method|
|----|---|------------|
|[프로젝트 추가 - HOST](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BPOST%5D%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%B6%94%EA%B0%80.md)|/project|POST|
|[프로젝트 정보 조회](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BGET%5D%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A0%95%EB%B3%B4%20%EC%A1%B0%ED%9A%8C.md)|/project/:project_idx|GET|
|[프로젝트 삭제(1라운드설정중)](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BDELETE%5D%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%82%AD%EC%A0%9C.md)|/project/leave/:project_idx|DELETE|
|[프로젝트 상태 변경 - HOST](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BPUT%5D%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%83%81%ED%83%9C%20%EB%B3%80%EA%B2%BD.md)|/project/status/:project_idx|PUT|
|[라운드 카운트 조회 - HOST](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BGET%5D%20%EB%9D%BC%EC%9A%B4%EB%93%9C%20%EC%B9%B4%EC%9A%B4%ED%8A%B8%20%EC%A1%B0%ED%9A%8C.md)|/round/count/:project_idx|GET|
|[라운드 설정 - HOST](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BPOST%5D%20%EB%9D%BC%EC%9A%B4%EB%93%9C%20%EC%84%A4%EC%A0%95.md)|/round/setting|POST|
|[라운드 정보 조회](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BGET%5D%20%EB%9D%BC%EC%9A%B4%EB%93%9C%20%EC%A0%95%EB%B3%B4%20%EC%A1%B0%ED%9A%8C.md)|/round/info/:round_idx|GET|
|[라운드 참여 - MEMBER](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BPOST%5D%20%EB%9D%BC%EC%9A%B4%EB%93%9C%20%EC%B0%B8%EC%97%AC.md)|/round/enter|POST|
|[라운드 나가기](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BDELETE%5D%20%EB%9D%BC%EC%9A%B4%EB%93%9C%20%EB%82%98%EA%B0%80%EA%B8%B0.md)|/round/leave/:user_idx/:project_idx/:round_idx	|DELETE|
|[라운드 참여자 목록 조회](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BGET%5D%20%EB%9D%BC%EC%9A%B4%EB%93%9C%20%EC%B0%B8%EC%97%AC%EC%9E%90%20%EB%AA%A9%EB%A1%9D%20%EC%A1%B0%ED%9A%8C.md)|/round/memberList/:project_idx/:round_idx|GET|
|[카드 추가](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BPOST%5D%20%EC%B9%B4%EB%93%9C%20%EC%B6%94%EA%B0%80.md)|/card|POST|
|[라운드 카드 리스트 조회](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BGET%5D%20%EB%9D%BC%EC%9A%B4%EB%93%9C%20%EC%B9%B4%EB%93%9C%20%EB%A6%AC%EC%8A%A4%ED%8A%B8%20%EC%A1%B0%ED%9A%8C.md)|/round/cardList/:project_idx/:round_idx/:user_idx|GET|
|[카드 스크랩](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BPOST%5D%20%EC%B9%B4%EB%93%9C%20%EC%8A%A4%ED%81%AC%EB%9E%A9.md)|/card/scrap|POST|
|[카드 스크랩 취소](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BDELETE%5D%20%EC%B9%B4%EB%93%9C%20%EC%8A%A4%ED%81%AC%EB%9E%A9%20%EC%B7%A8%EC%86%8C.md)|/card/scrap/:user_idx/:card_idx|DELETE|
|[카드 메모 추가](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BPOST%5D%20%EC%B9%B4%EB%93%9C%20%EB%A9%94%EB%AA%A8%20%EC%B6%94%EA%B0%80.md)|/card/memo|POST|
|[카드 메모 수정](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BPUT%5D%20%EC%B9%B4%EB%93%9C%20%EB%A9%94%EB%AA%A8%20%EC%88%98%EC%A0%95.md)|/card/memo|PUT|
|[프로젝트 종료 - HOST](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/3.%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A7%84%ED%96%89%20%EB%B7%B0/%5BPUT%5D%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A2%85%EB%A3%8C.md)|/project/finish|PUT|

## </br>

### :zap:최종 정리 뷰
|기능|URL| HTTP Method|
|----|---|------------|
|[최종 프로젝트 정보 조회](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/4.%20%EC%B5%9C%EC%A2%85%20%EC%A0%95%EB%A6%AC%20%EB%B7%B0/%5BGET%5D%20%EC%B5%9C%EC%A2%85%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A0%95%EB%B3%B4%20%EC%A1%B0%ED%9A%8C.md)|/project/finalInfo/:project_idx|GET|
|[스크랩한 카드 조회](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/4.%20%EC%B5%9C%EC%A2%85%20%EC%A0%95%EB%A6%AC%20%EB%B7%B0/%5BGET%5D%20%EC%8A%A4%ED%81%AC%EB%9E%A9%ED%95%9C%20%EC%B9%B4%EB%93%9C%20%EC%A1%B0%ED%9A%8C.md)|/project/finalScrpList/:user_idx/:project_idx|GET|
|[라운드 별 정보 조회](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/4.%20%EC%B5%9C%EC%A2%85%20%EC%A0%95%EB%A6%AC%20%EB%B7%B0/%5BGET%5D%20%EB%9D%BC%EC%9A%B4%EB%93%9C%EB%B3%84%20%EC%A0%95%EB%B3%B4%20%EC%A1%B0%ED%9A%8C.md)|/roundFinalInfo/:user_idx/:project_idx|GET|

## </br>

### :zap:소켓
* [소켓 사용설명서](https://github.com/TEAMSTORMERS/STORM_Server/blob/addWiki/STORM_Wiki/5.%20%EC%86%8C%EC%BC%93/SOCKET.md)
