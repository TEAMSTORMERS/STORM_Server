### :zap:유저
|기능|URL| HTTP Method|
|----|---|------------|
|[이메일 중복 확인]()|/user/checkemail|POST|
|[회원가입]()|/user/signup|POST|
|[로그인]()|/user/signin|POST|
|[마이페이지 조회]()|/user/mypage/:user_idx|GET|
|[프로필 이미지 수정]()|/user/mypage/img|PUT|
|[프로필 닉네임 수정]()|/user/mypage/name|PUT|
|[비밀번호 확인]()|/user/checkPassword|POST|
|[회원탈퇴]()|/user/withdrawal|POST|

## </br>

### :zap:Main 뷰
|기능|URL| HTTP Method|
|----|---|------------|
|[참여한 프로젝트 조회]()|/project/user/:user_idx|GET|
|[프로젝트 팝업 - MEMBER]()|/project/info/:project_code|GET|
|[프로젝트 참여 - MEMBER]()|/project/enter|POST|

## </br>

### :zap:프로젝트 진행
|기능|URL| HTTP Method|
|----|---|------------|
|[프로젝트 추가 - HOST]()|/project|POST|
|[프로젝트 정보 조회]()|/project/:project_idx|GET|
|[프로젝트 상태 변경 - HOST]()|/project/status/:project_idx|PUT|
|[라운드 카운트 조회 - HOST]()|/round/count/:project_idx|GET|
|[라운드 설정 - HOST]()|/round/setting|POST|
|[라운드 정보 조회]()|/round/info/:round_idx|GET|
|[라운드 참여 - MEMBER]()|/round/enter|POST|
|[라운드 나가기]()|/round/leave/:user_idx/:project_idx/:round_idx	|DELETE|
|[라운드 참여자 목록 조회]()|/round/memberList/:project_idx/:round_idx|GET|
|[카드 추가]()|/card|POST|
|[라운드 카드 리스트 조회]()|/round/cardList/:project_idx/:round_idx/:user_idx|GET|
|[카드 스크랩]()|/card/scrap|POST|
|[카드 스크랩 취소]()|/card/scrap/:user_idx/:card_idx|DELETE|
|[카드 메모 추가]()|/card/memo|POST|
|[카드 메모 수정]()|/card/memo|PUT|
|[프로젝트 종료 - HOST]()|/project/finish|PUT|

## </br>

### :zap:최종 정리 뷰
|기능|URL| HTTP Method|
|----|---|------------|
|[최종 프로젝트 정보 조회]()|/project/finalInfo/:project_idx|GET|
|[스크랩한 카드 조회]()|/project/finalScarpList/:user_idx/:project_idx|GET|
|[라운드 별 정보 조회]()|/roundFinalInfo/:user_idx/:project_idx|GET|

## </br>

### :zap:소켓
* [소켓 사용설명서]()